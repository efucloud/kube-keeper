package tools

import (
	"context"
	"fmt"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/k8scluster"
	"github.com/efucloud/kube-keeper/pkg/structs"
	"github.com/mark3labs/mcp-go/mcp"
	corev1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/tools/remotecommand"
	"path/filepath"
	"strings"
)

// ReadPodFile 读取 Pod 中某容器指定路径的文件内容
func ReadPodFile() (mcp.Tool, func(context.Context, mcp.CallToolRequest) (*mcp.CallToolResult, error)) {
	tool := mcp.NewTool("read_pod_file",
		mcp.WithTitleAnnotation("Pod容器中文件内容获取"),
		mcp.WithDescription("读取 Kubernetes Pod 中某个容器内指定文件的内容（仅支持文本文件，建议小于 1MB）"),
		mcp.WithString("namespace", mcp.Required(), mcp.Description("Pod 所在命名空间")),
		mcp.WithString("pod", mcp.Required(), mcp.Description("Pod 名称")),
		mcp.WithString("container", mcp.Description("容器名称（若省略，使用第一个容器）")),
		mcp.WithString("path", mcp.Required(), mcp.Description("要读取的文件绝对路径，如 /app/config.yaml")),
		mcp.WithString("reason", mcp.Description("需要使用该工具的原因")),

		mcp.WithDestructiveHintAnnotation(false),
		mcp.WithReadOnlyHintAnnotation(true),
	)

	handler := func(ctx context.Context, request mcp.CallToolRequest) (*mcp.CallToolResult, error) {
		namespace, err := request.RequireString("namespace")
		if err != nil {
			return mcp.NewToolResultError("missing required field: namespace"), nil
		}
		podName, err := request.RequireString("pod")
		if err != nil {
			return mcp.NewToolResultError("missing required field: pod"), nil
		}
		filePath := strings.TrimSpace(request.GetString("path", ""))
		if filePath == "" {
			return mcp.NewToolResultError("missing required field: path"), nil
		}

		// 安全校验
		if !filepath.IsAbs(filePath) {
			return mcp.NewToolResultError("file path must be absolute"), nil
		}
		if strings.Contains(filePath, "..") {
			return mcp.NewToolResultError("file path must not contain '..'"), nil
		}

		// 获取上下文

		clusterCode, ok := ctx.Value(config2.RequestClusterCode).(string)
		if !ok {
			config2.Logger.Error("missing cluster code in context")
			return mcp.NewToolResultError("missing cluster code in context"), nil
		}
		accountId, ok := ctx.Value(config2.RequestUserId).(string)
		if !ok {
			return mcp.NewToolResultError("missing account ID in context"), nil
		}

		requestInfo := structs.RequestInfo{
			ClusterCode: clusterCode,
			AccountId:   accountId,
			Namespace:   namespace,
		}
		_, userClient, er := k8scluster.GetClusterAndUserClientSet(ctx, requestInfo)
		if er.IsNotNil() {
			return mcp.NewToolResultError(fmt.Sprintf("failed to get Kubernetes client: %v", er.Err)), nil
		}

		// 获取 Pod
		pod, err := userClient.K8sClientSet.CoreV1().Pods(namespace).Get(ctx, podName, metav1.GetOptions{})
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("pod not found: %v", err)), nil
		}

		containerName := request.GetString("container", "")
		if containerName == "" {
			if len(pod.Spec.Containers) == 0 {
				return mcp.NewToolResultError("pod has no containers"), nil
			}
			containerName = pod.Spec.Containers[0].Name
		}

		// 使用 cat 读取文件
		cmd := []string{"cat", filePath}

		execReq := userClient.K8sClientSet.CoreV1().RESTClient().
			Post().
			Namespace(namespace).
			Resource("pods").
			Name(podName).
			SubResource("exec").
			VersionedParams(&corev1.PodExecOptions{
				Container: containerName,
				Command:   cmd,
				Stdout:    true,
				Stderr:    true,
			}, metav1.ParameterCodec)

		exec, err := remotecommand.NewSPDYExecutor(userClient.Config, "POST", execReq.URL())
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("exec setup failed: %v", err)), nil
		}

		var stdout, stderr strings.Builder
		err = exec.StreamWithContext(ctx, remotecommand.StreamOptions{
			Stdout: &stdout,
			Stderr: &stderr,
			Tty:    false,
		})

		if err != nil {
			errMsg := stderr.String()
			if errMsg == "" {
				errMsg = err.Error()
			}
			return mcp.NewToolResultError(fmt.Sprintf("failed to read file: %s", errMsg)), nil
		}

		content := stdout.String()
		// 可选：截断超大文件（例如 > 500KB）
		if len(content) > 500*1024 {
			content = content[:500*1024] + "\n\n[TRUNCATED: file too large]"
		}

		return &mcp.CallToolResult{
			Content: []mcp.Content{
				mcp.TextContent{Type: "text", Text: content},
			},
		}, nil
	}

	return tool, handler
}

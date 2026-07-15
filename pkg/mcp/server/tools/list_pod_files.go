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

// ListPodFiles 列出 Pod 中某容器指定目录下的文件和子目录
func ListPodFiles() (mcp.Tool, func(context.Context, mcp.CallToolRequest) (*mcp.CallToolResult, error)) {
	tool := mcp.NewTool("list_pod_files",
		mcp.WithTitleAnnotation("获取Pod容器中文件列表"),
		mcp.WithDescription("列出 Kubernetes Pod 中某个容器内指定目录下的文件和子目录（不递归）"),
		mcp.WithString("namespace", mcp.Required(), mcp.Description("Pod 所在命名空间")),
		mcp.WithString("pod", mcp.Required(), mcp.Description("Pod 名称")),
		mcp.WithString("container", mcp.Description("容器名称（若省略，使用第一个容器）")),
		mcp.WithString("path", mcp.Required(), mcp.Description("要列出的目录路径，如 /app/logs。必须是绝对路径。")),
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
		path := strings.TrimSpace(request.GetString("path", ""))
		if path == "" {
			return mcp.NewToolResultError("missing required field: path"), nil
		}

		// 安全校验：必须是绝对路径，且不能包含 ".."
		if !filepath.IsAbs(path) {
			return mcp.NewToolResultError("path must be an absolute path (e.g., /app/logs)"), nil
		}
		if strings.Contains(path, "..") {
			return mcp.NewToolResultError("path must not contain '..' for security reasons"), nil
		}

		// 获取上下文中的集群信息

		clusterCode, ok := ctx.Value(config2.RequestClusterCode).(string)
		if !ok {
			config2.Logger.Error("missing cluster code in context")
			return mcp.NewToolResultError("missing cluster code in context"), nil
		}
		accountId, ok := ctx.Value(config2.RequestUserId).(string)
		if !ok {
			return mcp.NewToolResultError("missing account ID in context"), nil
		}

		// 获取客户端
		requestInfo := structs.RequestInfo{
			ClusterCode: clusterCode,
			AccountId:   accountId,
			Namespace:   namespace,
			ClusterId:   "", // 可选，根据你的 GetClusterAndUserClientSet 实现调整
		}
		_, userClient, er := k8scluster.GetClusterAndUserClientSet(ctx, requestInfo)
		if er.IsNotNil() {
			return mcp.NewToolResultError(fmt.Sprintf("failed to get Kubernetes client: %v", er.Err)), nil
		}

		// 获取 Pod 以确定容器名
		pod, err := userClient.K8sClientSet.CoreV1().Pods(namespace).Get(ctx, podName, metav1.GetOptions{})
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("failed to get pod %s/%s: %v", namespace, podName, err)), nil
		}

		containerName := request.GetString("container", "")
		if containerName == "" {
			if len(pod.Spec.Containers) == 0 {
				return mcp.NewToolResultError("pod has no containers"), nil
			}
			containerName = pod.Spec.Containers[0].Name
		}

		// 构造 ls 命令（-A 显示隐藏文件，-1 每行一个）
		cmd := []string{"sh", "-c", fmt.Sprintf("ls -A1 '%s'", path)}

		// 执行 exec
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
			return mcp.NewToolResultError(fmt.Sprintf("failed to create SPDY executor: %v", err)), nil
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
			return mcp.NewToolResultError(fmt.Sprintf("failed to list files: %s", errMsg)), nil
		}

		output := strings.TrimSpace(stdout.String())
		if output == "" {
			output = "Directory is empty."
		}

		return &mcp.CallToolResult{
			Content: []mcp.Content{
				mcp.TextContent{Type: "text", Text: output},
			},
		}, nil
	}

	return tool, handler
}

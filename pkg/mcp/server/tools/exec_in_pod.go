package tools

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/k8scluster"
	"github.com/efucloud/kube-keeper/pkg/structs"
	"github.com/mark3labs/mcp-go/mcp"
	corev1 "k8s.io/api/core/v1"
	k8serrors "k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes/scheme"
	"k8s.io/client-go/tools/remotecommand"
	"strings"
	"time"
)

// ExecInPod 在 Pod 容器中执行命令并返回输出
func ExecInPod() (mcp.Tool, func(context.Context, mcp.CallToolRequest) (*mcp.CallToolResult, error)) {
	tool := mcp.NewTool("exec_in_pod",
		mcp.WithTitleAnnotation("Pod容器中命令执行"),
		mcp.WithDescription("在KubernetesPod 的容器中执行一条非交互式Shell命令"),
		mcp.WithString("podName", mcp.Required(), mcp.Description("Pod名称")),
		mcp.WithString("namespace", mcp.Required(), mcp.Description("Pod所在命名空间")),
		mcp.WithString("command", mcp.Required(), mcp.Description("要执行的Shell命令，例如 'ps aux' 或 'cat /etc/os-release'")),
		mcp.WithString("container", mcp.Description("容器名称（可选）。若未指定，默认使用第一个容器。")),
		mcp.WithNumber("timeoutSeconds", mcp.Description("命令执行超时时间（秒），默认 30 秒，最大 300 秒")),
		mcp.WithString("reason", mcp.Description("需要使用该工具的原因")),

		mcp.WithDestructiveHintAnnotation(false),
	)

	handler := func(ctx context.Context, request mcp.CallToolRequest) (*mcp.CallToolResult, error) {
		// === 1. 提取上下文信息 ===

		clusterCode, ok := ctx.Value(config2.RequestClusterCode).(string)
		if !ok {
			config2.Logger.Error("missing cluster code in context")
			return mcp.NewToolResultError("missing cluster code in context"), nil
		}
		accountId, ok := ctx.Value(config2.RequestUserId).(string)
		if !ok {
			return mcp.NewToolResultError("missing account ID in context"), nil
		}

		// === 2. 解析参数 ===
		podName, err := request.RequireString("podName")
		if err != nil || strings.TrimSpace(podName) == "" {
			return mcp.NewToolResultError("podName is required and cannot be empty"), nil
		}
		podName = strings.TrimSpace(podName)

		namespace, err := request.RequireString("namespace")
		if err != nil || strings.TrimSpace(namespace) == "" {
			return mcp.NewToolResultError("namespace is required and cannot be empty"), nil
		}
		namespace = strings.TrimSpace(namespace)

		commandStr, err := request.RequireString("command")
		if err != nil || strings.TrimSpace(commandStr) == "" {
			return mcp.NewToolResultError("command is required and cannot be empty"), nil
		}
		commandStr = strings.TrimSpace(commandStr)

		container := strings.TrimSpace(request.GetString("container", ""))
		timeoutSec := request.GetInt("timeoutSeconds", 30)
		if timeoutSec <= 0 {
			timeoutSec = 30
		}
		if timeoutSec > 300 {
			timeoutSec = 300 // 最大 5 分钟
		}

		// === 3. 获取客户端 ===
		requestInfo := structs.RequestInfo{
			ClusterCode: clusterCode,
			AccountId:   accountId,
			Namespace:   namespace,
		}
		_, userClient, er := k8scluster.GetClusterAndUserClientSet(ctx, requestInfo)
		if er.IsNotNil() {
			return mcp.NewToolResultError(fmt.Sprintf("failed to get user client: %v", er.Err)), nil
		}

		// === 4. 若未指定 container，获取第一个容器名 ===
		if container == "" {
			pod, err := userClient.K8sClientSet.CoreV1().Pods(namespace).Get(ctx, podName, metav1.GetOptions{})
			if err != nil {
				if k8serrors.IsNotFound(err) {
					return mcp.NewToolResultError(fmt.Sprintf("pod '%s' not found in namespace '%s'", podName, namespace)), nil
				}
				return mcp.NewToolResultError(fmt.Sprintf("failed to fetch pod spec: %v", err)), nil
			}
			if len(pod.Spec.Containers) == 0 {
				return mcp.NewToolResultError(fmt.Sprintf("pod '%s' has no containers", podName)), nil
			}
			container = pod.Spec.Containers[0].Name
		}
		config2.Logger.Debugf("tool exec_in_pod called, namespace: %s pod: %s container: %s command: %s", namespace, podName, container, commandStr)

		// === 5. 构造 exec 请求 ===
		req := userClient.K8sClientSet.CoreV1().RESTClient().
			Post().
			Namespace(namespace).
			Resource("pods").
			Name(podName).
			SubResource("exec").
			VersionedParams(&corev1.PodExecOptions{
				Container: container,
				Command:   []string{"/bin/sh", "-c", commandStr},
				Stdout:    true,
				Stderr:    true,
				TTY:       false,
			}, scheme.ParameterCodec)

		// === 6. 创建 SPDY 执行器 ===
		executor, err := remotecommand.NewSPDYExecutor(userClient.Config, "POST", req.URL())
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("failed to create exec executor: %v", err)), nil
		}

		// === 7. 设置超时 context ===
		ctxWithTimeout, cancel := context.WithTimeout(ctx, time.Duration(timeoutSec)*time.Second)
		defer cancel()

		var stdout, stderr bytes.Buffer
		streamOpts := remotecommand.StreamOptions{
			Stdout: &stdout,
			Stderr: &stderr,
			Tty:    false,
		}

		// === 8. 执行命令 ===
		if err := executor.StreamWithContext(ctxWithTimeout, streamOpts); err != nil {
			if ctxWithTimeout.Err() == context.DeadlineExceeded {
				return mcp.NewToolResultError(fmt.Sprintf("command timed out after %d seconds", timeoutSec)), nil
			}
			return mcp.NewToolResultError(fmt.Sprintf("failed to execute command: %v", err)), nil
		}

		// === 9. 构造结果 ===
		stdoutStr := stdout.String()
		stderrStr := stderr.String()

		// 注意：无法可靠获取容器内命令的 exit code，设为 -1 表示未知
		resultMap := map[string]interface{}{
			"stdout":    stdoutStr,
			"stderr":    stderrStr,
			"exitCode":  -1, // Kubernetes remotecommand 不返回 exit code
			"podName":   podName,
			"container": container,
			"command":   commandStr,
		}

		resultBytes, _ := json.Marshal(resultMap)

		// 文本输出：合并 stdout 和 stderr
		var textOutput string
		if stdoutStr != "" || stderrStr != "" {
			textOutput = stdoutStr
			if stderrStr != "" {
				if textOutput != "" {
					textOutput += "\n"
				}
				textOutput += "[STDERR]: " + stderrStr
			}
		} else {
			textOutput = "(no output)"
		}
		config2.Logger.Debugf("tool exec_in_pod called, result: %s", string(resultBytes))

		return &mcp.CallToolResult{
			Content: []mcp.Content{
				mcp.TextContent{
					Type: "text",
					Text: textOutput,
				},
			},
			StructuredContent: json.RawMessage(resultBytes),
		}, nil
	}

	return tool, handler
}

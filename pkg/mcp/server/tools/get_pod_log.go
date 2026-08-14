package tools

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/k8scluster"
	"github.com/efucloud/kube-keeper/pkg/structs"
	"time"

	"github.com/mark3labs/mcp-go/mcp"
	"io"
	corev1 "k8s.io/api/core/v1"
	k8serrors "k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"strings"
)

const (
	// 默认只拉取最近日志片段，避免一次返回超大日志导致失败。
	defaultTailLines = 500
	maxTailLines     = 5000

	defaultLimitBytes = 1 * 1024 * 1024  // 1MiB
	maxLimitBytes     = 10 * 1024 * 1024 // 10MiB
	maxSinceSeconds   = 7 * 24 * 3600

	defaultLogReadTimeout = 45 * time.Second
	defaultReason         = "collect pod logs for troubleshooting"
)

// GetPodLogs 获取 Pod 容器的日志（非流式）
func GetPodLogs() (mcp.Tool, func(context.Context, mcp.CallToolRequest) (*mcp.CallToolResult, error)) {
	tool := mcp.NewTool("get_pod_log",
		mcp.WithTitleAnnotation("Pod容器日志获取"),
		mcp.WithDescription(`通过 Kubernetes apiserver 获取 Pod 容器日志，用于**故障排查、错误分析和运行状态诊断**。`),
		mcp.WithString("podName",
			mcp.Required(),
			mcp.Description("目标 Pod 的名称，例如 'web-7d5b8f9c4-xk2lq'")),
		mcp.WithString("namespace",
			mcp.Required(),
			mcp.Description("Pod 所在的命名空间，例如 'default'、'prod'")),
		mcp.WithString("container",
			mcp.Description("容器名称（可选）。如果 Pod 有多个容器，请指定要查的日志容器；若未指定，默认返回第一个容器的日志。")),
		mcp.WithNumber("tailLines",
			mcp.Description("仅返回日志末尾 N 行（例如 50、100）。适用于快速查看最新输出。")),
		mcp.WithNumber("sinceSeconds",
			mcp.Description("仅返回最近 N 秒内的日志（例如 300 表示最近 5 分钟）。")),
		mcp.WithString("sinceTime",
			mcp.Description("仅返回某个时间点之后的日志，RFC3339 格式（例如 2026-03-13T00:08:32Z）。与 sinceSeconds 二选一。")),
		mcp.WithNumber("limitBytes",
			mcp.Description("最大返回字节数（默认 1MiB，最大 10MiB），用于避免日志过大导致调用失败。")),
		mcp.WithBoolean("timestamps",
			mcp.Description("是否在每行日志前追加 kubelet 时间戳，默认 false。")),
		mcp.WithBoolean("previous",
			mcp.Description("是否获取**前一个已终止容器**的日志（适用于 Pod 崩溃重启场景）。设为 true 可查看崩溃前的最后输出。")),
		mcp.WithString("reason",
			mcp.Description("获取日志的原因（可选），例如：'排查 web Pod 启动时连接数据库超时的问题'。")),

		mcp.WithDestructiveHintAnnotation(false),
		mcp.WithReadOnlyHintAnnotation(true),
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

		reason := strings.TrimSpace(request.GetString("reason", ""))
		if reason == "" {
			reason = defaultReason
		}

		container := strings.TrimSpace(request.GetString("container", ""))
		tailLines := request.GetInt("tailLines", -1)
		sinceSeconds := request.GetInt("sinceSeconds", -1)
		sinceTimeRaw := strings.TrimSpace(request.GetString("sinceTime", ""))
		limitBytes := request.GetInt("limitBytes", defaultLimitBytes)
		timestamps := request.GetBool("timestamps", false)
		previous := request.GetBool("previous", false)

		requestInfo := structs.RequestInfo{
			ClusterCode: clusterCode,
			AccountId:   accountId,
			Namespace:   namespace,
		}
		config2.Logger.Debugf("tool get_pod_log called, namespace: %s pod: %s container: %s previous: %t reason: %s", namespace, podName, container, previous, reason)

		_, userClient, er := k8scluster.GetClusterAndUserClientSet(ctx, requestInfo)
		if er.IsNotNil() {
			return mcp.NewToolResultError(fmt.Sprintf("failed to get user client: %v", er.Err)), nil
		}

		// === 4. 若未指定 container，自动获取第一个容器名 ===
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

		// === 5. 构造日志选项 ===
		logOpts := &corev1.PodLogOptions{
			Container:  container,
			Previous:   previous,
			Timestamps: timestamps,
			// Follow: false (默认，且不暴露)
		}
		if tailLines < -1 {
			return mcp.NewToolResultError("tailLines must be greater than or equal to 0"), nil
		}
		if tailLines > maxTailLines {
			tailLines = maxTailLines
		}
		if tailLines > 0 {
			tl := int64(tailLines)
			logOpts.TailLines = &tl
		}

		if sinceSeconds < -1 {
			return mcp.NewToolResultError("sinceSeconds must be greater than or equal to 0"), nil
		}
		if sinceSeconds > maxSinceSeconds {
			sinceSeconds = maxSinceSeconds
		}
		if sinceSeconds > 0 {
			ss := int64(sinceSeconds)
			logOpts.SinceSeconds = &ss
		}

		var sinceTime *metav1.Time
		if sinceTimeRaw != "" {
			parsed, err := time.Parse(time.RFC3339, sinceTimeRaw)
			if err != nil {
				return mcp.NewToolResultError("sinceTime must be RFC3339 format, for example: 2026-03-13T00:08:32Z"), nil
			}
			mt := metav1.NewTime(parsed.UTC())
			sinceTime = &mt
			logOpts.SinceTime = sinceTime
		}
		if logOpts.SinceSeconds != nil && logOpts.SinceTime != nil {
			return mcp.NewToolResultError("sinceSeconds and sinceTime cannot be used together"), nil
		}

		if logOpts.TailLines == nil && logOpts.SinceSeconds == nil && logOpts.SinceTime == nil {
			tl := int64(defaultTailLines)
			logOpts.TailLines = &tl
			tailLines = defaultTailLines
		}

		if limitBytes <= 0 {
			limitBytes = defaultLimitBytes
		}
		if limitBytes > maxLimitBytes {
			limitBytes = maxLimitBytes
		}
		lb := int64(limitBytes)
		logOpts.LimitBytes = &lb

		// === 6. 获取并读取日志 ===
		logCtx, cancel := context.WithTimeout(ctx, defaultLogReadTimeout)
		defer cancel()

		req := userClient.K8sClientSet.CoreV1().Pods(namespace).GetLogs(podName, logOpts)
		stream, err := req.Stream(logCtx)
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("failed to retrieve logs: %v", err)), nil
		}
		defer stream.Close()

		buf := new(bytes.Buffer)
		if _, err := io.Copy(buf, stream); err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("error reading log data: %v", err)), nil
		}

		logContent := buf.String()
		logBytes := len(logContent)
		truncated := int64(logBytes) >= lb

		result := map[string]interface{}{
			"podName":      podName,
			"namespace":    namespace,
			"container":    container,
			"previous":     previous,
			"reason":       reason,
			"tailLines":    tailLines,
			"sinceSeconds": sinceSeconds,
			"sinceTime":    sinceTimeRaw,
			"limitBytes":   limitBytes,
			"logBytes":     logBytes,
			"truncated":    truncated,
			"logs":         logContent,
		}
		data, _ := json.Marshal(result)

		// === 7. 返回结果 ===
		return &mcp.CallToolResult{
			Content: []mcp.Content{
				mcp.TextContent{
					Type: "text",
					Text: logContent,
				},
			},
			StructuredContent: json.RawMessage(data),
		}, nil
	}

	return tool, handler
}

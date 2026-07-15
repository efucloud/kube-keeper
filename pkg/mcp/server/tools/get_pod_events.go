package tools

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/k8scluster"
	"github.com/mark3labs/mcp-go/mcp"
	corev1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"sort"
	"strings"
)

// GetPodEvents 获取指定 Pod 的事件摘要
func GetPodEvents() (mcp.Tool, func(context.Context, mcp.CallToolRequest) (*mcp.CallToolResult, error)) {
	tool := mcp.NewTool("get_pod_events",
		mcp.WithTitleAnnotation("Pod 事件查询"),
		mcp.WithDescription("查询指定 Pod 的 Kubernetes Events，按时间倒序返回，便于定位调度、拉镜像、探针与重启等问题。"),
		mcp.WithString("podName", mcp.Required(), mcp.Description("Pod 名称，例如 web-7d5b8f9c4-xk2lq。")),
		mcp.WithString("namespace", mcp.Required(), mcp.Description("Pod 所在命名空间，例如 default。")),
		mcp.WithNumber("limit", mcp.Description("最大返回事件数，默认 20，最大 100。")),
		mcp.WithBoolean("warningsOnly", mcp.Description("是否仅返回 Warning 类型事件，默认 false。")),
		mcp.WithString("reason", mcp.Required(), mcp.Description("调用原因，例如：排查 Pod CrashLoopBackOff 根因。")),
		mcp.WithDestructiveHintAnnotation(false),
		mcp.WithReadOnlyHintAnnotation(true),
	)

	handler := func(ctx context.Context, request mcp.CallToolRequest) (*mcp.CallToolResult, error) {

		clusterCode, ok := ctx.Value(config.RequestClusterCode).(string)
		if !ok {
			return mcp.NewToolResultError("missing cluster code in context"), nil
		}

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

		limit := request.GetInt("limit", 20)
		if limit <= 0 {
			limit = 20
		}
		if limit > 100 {
			limit = 100
		}
		warningsOnly := request.GetBool("warningsOnly", false)

		_, adminClient, er := k8scluster.GetClusterAndAdminClientSetByCode(ctx, clusterCode)
		if er.IsNotNil() {
			return mcp.NewToolResultError(fmt.Sprintf("failed to initialize cluster client: %v", er.Err)), nil
		}

		fieldSelector := fmt.Sprintf("involvedObject.kind=Pod,involvedObject.name=%s", podName)
		eventList, err := adminClient.K8sClientSet.CoreV1().Events(namespace).List(ctx, metav1.ListOptions{
			FieldSelector: fieldSelector,
		})
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("failed to list pod events: %v", err)), nil
		}

		type eventItem struct {
			Type           string `json:"type"`
			Reason         string `json:"reason"`
			Message        string `json:"message"`
			Count          int32  `json:"count"`
			Source         string `json:"source,omitempty"`
			FirstTimestamp string `json:"firstTimestamp,omitempty"`
			LastTimestamp  string `json:"lastTimestamp,omitempty"`
		}

		items := make([]corev1.Event, 0, len(eventList.Items))
		for _, item := range eventList.Items {
			if warningsOnly && item.Type != corev1.EventTypeWarning {
				continue
			}
			items = append(items, item)
		}

		sort.Slice(items, func(i, j int) bool {
			ti := items[i].LastTimestamp.Time
			if ti.IsZero() {
				ti = items[i].EventTime.Time
			}
			tj := items[j].LastTimestamp.Time
			if tj.IsZero() {
				tj = items[j].EventTime.Time
			}
			return ti.After(tj)
		})

		out := make([]eventItem, 0, len(items))
		for _, e := range items {
			source := e.Source.Component
			if e.Source.Host != "" {
				source = fmt.Sprintf("%s/%s", e.Source.Component, e.Source.Host)
			}
			out = append(out, eventItem{
				Type:           e.Type,
				Reason:         e.Reason,
				Message:        e.Message,
				Count:          e.Count,
				Source:         source,
				FirstTimestamp: e.FirstTimestamp.UTC().Format("2006-01-02T15:04:05Z"),
				LastTimestamp:  e.LastTimestamp.UTC().Format("2006-01-02T15:04:05Z"),
			})
			if len(out) >= limit {
				break
			}
		}

		result := map[string]interface{}{
			"podName":      podName,
			"namespace":    namespace,
			"warningsOnly": warningsOnly,
			"total":        len(out),
			"events":       out,
		}
		data, _ := json.Marshal(result)

		return &mcp.CallToolResult{
			Content: []mcp.Content{
				mcp.TextContent{Type: "text", Text: string(data)},
			},
			StructuredContent: json.RawMessage(data),
		}, nil
	}

	return tool, handler
}

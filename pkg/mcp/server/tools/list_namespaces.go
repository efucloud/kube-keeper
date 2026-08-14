package tools

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/k8scluster"
	"strings"

	"github.com/mark3labs/mcp-go/mcp"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

// ListNamespaces 列出集群中的命名空间
func ListNamespaces() (mcp.Tool, func(context.Context, mcp.CallToolRequest) (*mcp.CallToolResult, error)) {
	tool := mcp.NewTool("list_namespaces",
		mcp.WithTitleAnnotation("命名空间列表查询"),
		mcp.WithDescription("列出当前集群可见命名空间，便于用户在未指定 namespace 时快速选择目标范围。"),
		mcp.WithString("nameContains", mcp.Description("按名称模糊过滤（可选），例如 'prod'。")),
		mcp.WithNumber("limit", mcp.Description("最大返回条数，默认 50，最大 500。")),
		mcp.WithString("reason", mcp.Required(), mcp.Description("调用原因，例如：用户未指定 namespace，需要提供可选命名空间。")),
		mcp.WithDestructiveHintAnnotation(false),
		mcp.WithReadOnlyHintAnnotation(true),
	)

	handler := func(ctx context.Context, request mcp.CallToolRequest) (*mcp.CallToolResult, error) {

		clusterCode, ok := ctx.Value(config.RequestClusterCode).(string)
		if !ok {
			return mcp.NewToolResultError("missing cluster code in context"), nil
		}

		nameContains := strings.ToLower(strings.TrimSpace(request.GetString("nameContains", "")))
		limit := request.GetInt("limit", 50)
		if limit <= 0 {
			limit = 50
		}
		if limit > 500 {
			limit = 500
		}

		_, adminClient, er := k8scluster.GetClusterAndAdminClientSetByCode(ctx, clusterCode)
		if er.IsNotNil() {
			return mcp.NewToolResultError(fmt.Sprintf("failed to initialize cluster client: %v", er.Err)), nil
		}

		nsList, err := adminClient.K8sClientSet.CoreV1().Namespaces().List(ctx, metav1.ListOptions{})
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("failed to list namespaces: %v", err)), nil
		}

		type namespaceItem struct {
			Name      string `json:"name"`
			Status    string `json:"status"`
			CreatedAt string `json:"createdAt"`
		}

		items := make([]namespaceItem, 0, len(nsList.Items))
		for _, ns := range nsList.Items {
			name := ns.Name
			if nameContains != "" && !strings.Contains(strings.ToLower(name), nameContains) {
				continue
			}
			items = append(items, namespaceItem{
				Name:      name,
				Status:    string(ns.Status.Phase),
				CreatedAt: ns.CreationTimestamp.UTC().Format("2006-01-02T15:04:05Z"),
			})
			if len(items) >= limit {
				break
			}
		}

		result := map[string]interface{}{
			"total":      len(items),
			"namespaces": items,
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

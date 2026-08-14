package tools

import (
	"context"
	"encoding/json"
	"fmt"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/k8scluster"
	"github.com/efucloud/kube-keeper/pkg/structs"
	"github.com/mark3labs/mcp-go/mcp"
	k8serrors "k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"strings"
)

// CordonNode 将节点标记为不可调度（cordon），新 Pod 不会调度到该节点
func CordonNode() (mcp.Tool, func(context.Context, mcp.CallToolRequest) (*mcp.CallToolResult, error)) {
	tool := mcp.NewTool("node_cordon",
		mcp.WithTitleAnnotation("设置节点不可调度"),
		mcp.WithDescription("将指定节点标记为不可调度（cordon）。"),
		mcp.WithString("nodeName", mcp.Required(), mcp.Description("节点名称")),
		mcp.WithString("reason", mcp.Description("需要使用该工具的原因")),

		mcp.WithDestructiveHintAnnotation(true),
	)

	handler := func(ctx context.Context, request mcp.CallToolRequest) (*mcp.CallToolResult, error) {
		nodeName, err := request.RequireString("nodeName")
		if err != nil || strings.TrimSpace(nodeName) == "" {
			return mcp.NewToolResultError("nodeName is required and cannot be empty"), nil
		}
		nodeName = strings.TrimSpace(nodeName)

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
		}
		_, userClient, er := k8scluster.GetClusterAndUserClientSet(ctx, requestInfo)
		if er.IsNotNil() {
			return mcp.NewToolResultError(fmt.Sprintf("failed to get user client: %v", er.Err)), nil
		}

		node, err := userClient.K8sClientSet.CoreV1().Nodes().Get(ctx, nodeName, metav1.GetOptions{})
		if err != nil {
			if k8serrors.IsNotFound(err) {
				return mcp.NewToolResultError(fmt.Sprintf("node '%s' not found", nodeName)), nil
			}
			return mcp.NewToolResultError(fmt.Sprintf("failed to get node: %v", err)), nil
		}

		if node.Spec.Unschedulable {
			return &mcp.CallToolResult{
				Content: []mcp.Content{mcp.TextContent{Type: "text", Text: fmt.Sprintf("node '%s' is already cordoned", nodeName)}},
			}, nil
		}

		node.Spec.Unschedulable = true
		_, err = userClient.K8sClientSet.CoreV1().Nodes().Update(ctx, node, metav1.UpdateOptions{})
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("failed to cordon node: %v", err)), nil
		}

		msg := fmt.Sprintf("node '%s' has been cordoned successfully", nodeName)
		return &mcp.CallToolResult{
			Content:           []mcp.Content{mcp.TextContent{Type: "text", Text: msg}},
			StructuredContent: json.RawMessage(`{"status":"success","message":"` + msg + `"}`),
		}, nil
	}
	return tool, handler
}

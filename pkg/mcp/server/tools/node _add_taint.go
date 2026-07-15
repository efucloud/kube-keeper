package tools

import (
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
	"strings"
)

// AddTaintToNode 为节点添加一个污点
func AddTaintToNode() (mcp.Tool, func(context.Context, mcp.CallToolRequest) (*mcp.CallToolResult, error)) {
	tool := mcp.NewTool("node_add_taint",
		mcp.WithTitleAnnotation("增加节点污点"),
		mcp.WithDescription("为指定节点添加一个污点（taint"),
		mcp.WithString("nodeName", mcp.Required(), mcp.Description("节点名称")),
		mcp.WithString("key", mcp.Required(), mcp.Description("污点的 key")),
		mcp.WithString("value", mcp.Description("污点的 value（可选）")),
		mcp.WithString("effect", mcp.Required(), mcp.Description("污点效果，必须是 NoSchedule、PreferNoSchedule 或 NoExecute")),
		mcp.WithString("reason", mcp.Description("需要使用该工具的原因")),

		mcp.WithDestructiveHintAnnotation(true),
	)

	handler := func(ctx context.Context, request mcp.CallToolRequest) (*mcp.CallToolResult, error) {
		nodeName, err := request.RequireString("nodeName")
		if err != nil || strings.TrimSpace(nodeName) == "" {
			return mcp.NewToolResultError("nodeName is required and cannot be empty"), nil
		}
		nodeName = strings.TrimSpace(nodeName)

		key, err := request.RequireString("key")
		if err != nil || strings.TrimSpace(key) == "" {
			return mcp.NewToolResultError("taint key is required"), nil
		}
		key = strings.TrimSpace(key)

		value := strings.TrimSpace(request.GetString("value", ""))
		effectStr, err := request.RequireString("effect")
		if err != nil {
			return mcp.NewToolResultError("taint effect is required"), nil
		}
		effectStr = strings.TrimSpace(effectStr)

		var effect corev1.TaintEffect
		switch effectStr {
		case string(corev1.TaintEffectNoSchedule), string(corev1.TaintEffectPreferNoSchedule), string(corev1.TaintEffectNoExecute):
			effect = corev1.TaintEffect(effectStr)
		default:
			return mcp.NewToolResultError("invalid taint effect. Must be NoSchedule, PreferNoSchedule, or NoExecute"), nil
		}

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

		newTaint := corev1.Taint{
			Key:    key,
			Value:  value,
			Effect: effect,
		}

		// Check if taint already exists
		for _, t := range node.Spec.Taints {
			if t.Key == key && t.Value == value && t.Effect == effect {
				return &mcp.CallToolResult{
					Content: []mcp.Content{mcp.TextContent{Type: "text", Text: fmt.Sprintf("taint '%s=%s:%s' already exists on node '%s'", key, value, effect, nodeName)}},
				}, nil
			}
		}

		node.Spec.Taints = append(node.Spec.Taints, newTaint)
		_, err = userClient.K8sClientSet.CoreV1().Nodes().Update(ctx, node, metav1.UpdateOptions{})
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("failed to add taint: %v", err)), nil
		}

		msg := fmt.Sprintf("taint '%s=%s:%s' added to node '%s'", key, value, effect, nodeName)
		return &mcp.CallToolResult{
			Content:           []mcp.Content{mcp.TextContent{Type: "text", Text: msg}},
			StructuredContent: json.RawMessage(`{"status":"success","message":"` + msg + `"}`),
		}, nil
	}
	return tool, handler
}

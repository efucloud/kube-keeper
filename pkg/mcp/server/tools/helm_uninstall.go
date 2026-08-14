package tools

import (
	"context"
	"encoding/json"
	"fmt"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/k8scluster"
	"github.com/efucloud/kube-keeper/pkg/structs"
	"github.com/efucloud/kube-keeper/pkg/utils"
	"github.com/mark3labs/mcp-go/mcp"
	"helm.sh/helm/v3/pkg/action"
	"strings"
	"time"
)

// HelmUninstall 卸载 Helm Release
func HelmUninstall() (mcp.Tool, func(context.Context, mcp.CallToolRequest) (*mcp.CallToolResult, error)) {
	tool := mcp.NewTool("helm_uninstall",
		mcp.WithTitleAnnotation("Helm卸载"),
		mcp.WithDescription("卸载 Helm Release 并删除相关资源。"),
		mcp.WithString("namespace", mcp.Required(), mcp.Description("Release 所在命名空间")),
		mcp.WithString("release_name", mcp.Required(), mcp.Description("要卸载的 Release 名称")),
		mcp.WithString("reason", mcp.Description("需要使用该工具的原因")),
		mcp.WithDestructiveHintAnnotation(true),
	)

	handler := func(ctx context.Context, request mcp.CallToolRequest) (*mcp.CallToolResult, error) {
		namespace := strings.TrimSpace(request.GetString("namespace", ""))
		releaseName := strings.TrimSpace(request.GetString("release_name", ""))
		if namespace == "" || releaseName == "" {
			return mcp.NewToolResultError("namespace and release_name are required"), nil
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
			return mcp.NewToolResultError(fmt.Sprintf("failed to get cluster client: %v", er.Err)), nil
		}

		cfg := userClient.Config // *rest.Config
		// ✅ 修复点：使用 helmActionConfigFromRestConfig 正确初始化
		actionConfig, err := utils.HelmActionConfigFromRestConfig(cfg, namespace)
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("failed to init Helm action config: %v", err)), nil
		}
		client := action.NewUninstall(actionConfig)
		client.Wait = true
		client.Timeout = 5 * time.Minute

		resp, err := client.Run(releaseName)
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("helm uninstall failed: %v", err)), nil
		}

		result := map[string]interface{}{
			"success":      true,
			"release_name": releaseName,
			"namespace":    namespace,
			"info":         resp.Info,
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

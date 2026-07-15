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
	"helm.sh/helm/v3/pkg/chart"
	"helm.sh/helm/v3/pkg/chart/loader"
	"helm.sh/helm/v3/pkg/cli"
	"k8s.io/apimachinery/pkg/util/yaml"
	"strings"
	"time"
)

// HelmUpgrade 升级已存在的 Helm Release
func HelmUpgrade() (mcp.Tool, func(context.Context, mcp.CallToolRequest) (*mcp.CallToolResult, error)) {
	tool := mcp.NewTool("helm_upgrade",
		mcp.WithTitleAnnotation("Helm升级"),
		mcp.WithDescription("升级已安装的 Helm Release。"),
		mcp.WithString("namespace", mcp.Required(), mcp.Description("Release 所在命名空间")),
		mcp.WithString("release_name", mcp.Required(), mcp.Description("要升级的 Release 名称")),
		mcp.WithString("chart", mcp.Description("新的 Chart 引用（可选，若省略则复用原 Chart）")),
		mcp.WithString("version", mcp.Description("新 Chart 版本（可选）")),
		mcp.WithString("values", mcp.Description("更新的 values YAML（可选）")),
		mcp.WithString("reason", mcp.Description("需要使用该工具的原因")),
		mcp.WithDestructiveHintAnnotation(true),
	)

	handler := func(ctx context.Context, request mcp.CallToolRequest) (*mcp.CallToolResult, error) {
		namespace := strings.TrimSpace(request.GetString("namespace", ""))
		releaseName := strings.TrimSpace(request.GetString("release_name", ""))
		if namespace == "" || releaseName == "" {
			return mcp.NewToolResultError("namespace and release_name are required"), nil
		}

		chartRef := strings.TrimSpace(request.GetString("chart", ""))
		version := strings.TrimSpace(request.GetString("version", ""))
		valuesYAML := request.GetString("values", "")

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

		var values map[string]interface{}
		if valuesYAML != "" {
			if err := yaml.Unmarshal([]byte(valuesYAML), &values); err != nil {
				return mcp.NewToolResultError(fmt.Sprintf("invalid values YAML: %v", err)), nil
			}
		}

		client := action.NewUpgrade(actionConfig)
		client.Namespace = namespace
		client.Wait = true
		client.Timeout = 5 * time.Minute

		if version != "" {
			client.Version = version
		}

		var chartRequested *chart.Chart
		if chartRef != "" {
			settings := cli.New()
			cp, err := client.ChartPathOptions.LocateChart(chartRef, settings)
			if err != nil {
				return mcp.NewToolResultError(fmt.Sprintf("failed to locate chart: %v", err)), nil
			}
			chartRequested, err = loader.Load(cp)
			if err != nil {
				return mcp.NewToolResultError(fmt.Sprintf("failed to load chart: %v", err)), nil
			}
		}

		rel, err := client.Run(releaseName, chartRequested, values)
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("helm upgrade failed: %v", err)), nil
		}

		result := map[string]interface{}{
			"status":       rel.Info.Status.String(),
			"revision":     rel.Version,
			"namespace":    rel.Namespace,
			"release_name": rel.Name,
			"notes":        rel.Info.Notes,
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

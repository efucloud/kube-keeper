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
	"gopkg.in/yaml.v3"
	"helm.sh/helm/v3/pkg/action"
	"helm.sh/helm/v3/pkg/chart/loader"
	"helm.sh/helm/v3/pkg/cli"
	corev1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"strings"
	"time"
)

// HelmInstall 安装 Helm Chart 到指定命名空间
func HelmInstall() (mcp.Tool, func(context.Context, mcp.CallToolRequest) (*mcp.CallToolResult, error)) {
	tool := mcp.NewTool("helm_install",
		mcp.WithTitleAnnotation("Helm部署"),
		mcp.WithDescription("在 Kubernetes 集群中安装 Helm Chart。支持从 OCI 仓库或本地 Chart 路径安装（当前仅支持 OCI）。"),
		mcp.WithString("namespace", mcp.Required(), mcp.Description("目标命名空间")),
		mcp.WithString("release_name", mcp.Required(), mcp.Description("Helm Release 名称")),
		mcp.WithString("chart", mcp.Required(), mcp.Description("Chart 引用，如 'oci://registry.example.com/charts/myapp' 或 'bitnami/nginx'")),
		mcp.WithString("version", mcp.Description("Chart 版本（可选，若省略则使用 latest）")),
		mcp.WithString("values", mcp.Description("YAML 格式的 values 配置（可选）")),
		mcp.WithBoolean("create_namespace", mcp.Description("是否自动创建命名空间（默认 false）")),
		mcp.WithString("reason", mcp.Description("需要使用该工具的原因")),
		mcp.WithDestructiveHintAnnotation(true),
	)

	handler := func(ctx context.Context, request mcp.CallToolRequest) (*mcp.CallToolResult, error) {
		namespace := strings.TrimSpace(request.GetString("namespace", ""))
		releaseName := strings.TrimSpace(request.GetString("release_name", ""))
		chartRef := strings.TrimSpace(request.GetString("chart", ""))
		if namespace == "" || releaseName == "" || chartRef == "" {
			return mcp.NewToolResultError("namespace, release_name, and chart are required"), nil
		}

		version := strings.TrimSpace(request.GetString("version", ""))
		valuesYAML := request.GetString("values", "")
		createNS := request.GetBool("create_namespace", false)

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

		// 获取 kubeconfig (rest.Config)
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
		// 自动创建 namespace（如果需要）
		if createNS {
			clientset := userClient.K8sClientSet
			if _, err := clientset.CoreV1().Namespaces().Get(ctx, namespace, metav1.GetOptions{}); err != nil {
				nsObj := &corev1.Namespace{ObjectMeta: metav1.ObjectMeta{Name: namespace}}
				if _, err := clientset.CoreV1().Namespaces().Create(ctx, nsObj, metav1.CreateOptions{}); err != nil {
					return mcp.NewToolResultError(fmt.Sprintf("failed to create namespace: %v", err)), nil
				}
			}
		}

		// 解析 values
		var values map[string]interface{}
		if valuesYAML != "" {
			if err := yaml.Unmarshal([]byte(valuesYAML), &values); err != nil {
				return mcp.NewToolResultError(fmt.Sprintf("invalid values YAML: %v", err)), nil
			}
		}

		// 执行 install
		client := action.NewInstall(actionConfig)
		client.Namespace = namespace
		client.ReleaseName = releaseName
		client.Wait = true
		client.Timeout = 5 * time.Minute

		if version != "" {
			client.Version = version
		}
		settings := cli.New()
		// 加载 Chart（支持 OCI 和 repo）
		cp, err := client.ChartPathOptions.LocateChart(chartRef, settings)
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("failed to locate chart: %v", err)), nil
		}

		chartRequested, err := loader.Load(cp)
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("failed to load chart: %v", err)), nil
		}

		rel, err := client.Run(chartRequested, values)
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("helm install failed: %v", err)), nil
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

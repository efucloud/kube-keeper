package tools

import (
	"context"
	"fmt"
	"github.com/efucloud/common"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/k8scluster"
	"github.com/efucloud/kube-keeper/pkg/structs"
	"github.com/efucloud/kube-keeper/pkg/utils"
	"github.com/mark3labs/mcp-go/mcp"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	"strings"
)

// GetClusterResourcesNumber 获取集群中某类型的资源数量
func GetClusterResourcesNumber() (mcp.Tool, func(context.Context, mcp.CallToolRequest) (*mcp.CallToolResult, error)) {
	tool := mcp.NewTool("get_cluster_resources_number",
		mcp.WithTitleAnnotation("获取集群中某类型的资源数量"),
		mcp.WithDescription("列出Kubernetes集群中各种指定类型的资源对象，如Namespace，Deployment，Service，Secret等，凡事集群中的任何类型资源，均可以通过该接口获取列表数据，能够通过工具prometheus_query和prometheus_query_range时就不要使用该工具"),
		mcp.WithString("kind", mcp.Required(), mcp.Description("资源类型，如Pod、Deployment等")),
		mcp.WithString("apiVersion", mcp.Required(), mcp.Description("API 版本，如 v1、apps/v1、tekton.dev/v1beta1")),
		mcp.WithString("namespace", mcp.Description("目标命名空间。集群级资源留空。")),
		mcp.WithString("labelSelector", mcp.Description("标签选择器，例如'app=nginx,tier=backend'。多个条件为 AND 关系。")),
		mcp.WithString("fieldSelector", mcp.Description("字段选择器，例如'metadata.name=my-pod' 或 'status.phase=Running'。注意：并非所有字段都可筛选。")),
		mcp.WithString("reason", mcp.Description("需要使用该工具的原因")),

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

		// === 2. 解析请求参数 ===
		kind, err := request.RequireString("kind")
		if err != nil {
			return mcp.NewToolResultError("missing required field: kind"), nil
		}
		apiVersion, err := request.RequireString("apiVersion")
		if err != nil {
			return mcp.NewToolResultError("missing required field: apiVersion"), nil
		}
		namespace := strings.TrimSpace(request.GetString("namespace", ""))
		labelSelector := strings.TrimSpace(request.GetString("labelSelector", ""))
		fieldSelector := strings.TrimSpace(request.GetString("fieldSelector", ""))

		// === 3. 构造 ListOptions ===
		listOpts := metav1.ListOptions{
			LabelSelector: labelSelector,
			FieldSelector: fieldSelector,
			Limit:         1, // 启用 Kubernetes 原生 limit
		}
		config2.Logger.Debugf("tool list_cluster_resources called, kind: %s apiVersion: %s namespace: %s labelSelector: %s fieldSelector: %s", kind, apiVersion, namespace, labelSelector, fieldSelector)

		// === 4. 获取客户端 ===
		cluster, adminClient, er := k8scluster.GetClusterAndAdminClientSetByCode(ctx, clusterCode)
		if er.IsNotNil() {
			return mcp.NewToolResultError(fmt.Sprintf("failed to initialize cluster client: %v", er.Err)), nil
		}

		requestInfo := structs.RequestInfo{
			ClusterCode: clusterCode,
			AccountId:   accountId,
			Namespace:   namespace,
			ClusterId:   cluster.ID,
		}
		_, userClient, er := k8scluster.GetClusterAndUserClientSet(ctx, requestInfo)
		if er.IsNotNil() {
			return mcp.NewToolResultError(fmt.Sprintf("failed to get user client: %v", er.Err)), nil
		}

		// === 5. 获取 GVR 映射 ===
		mapping, err := adminClient.GetResourceMapping(apiVersion, kind)
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("unsupported resource type %s/%s: %v", apiVersion, kind, err)), nil
		}

		// === 6. 执行 List 操作 ===
		var list *unstructured.UnstructuredList
		if namespace == "" {
			config2.Logger.Infof("cluster: %s ready to list cluster resource: %s/%s", clusterCode, apiVersion, kind)
			// 集群级资源
			list, err = userClient.DynamicClient.Resource(mapping.Resource).List(ctx, listOpts)
		} else {
			config2.Logger.Infof("cluster: %s ready to list namespace: %s resource: %s/%s", clusterCode, namespace, apiVersion, kind)
			// 命名空间级资源
			list, err = userClient.DynamicClient.Resource(mapping.Resource).Namespace(namespace).List(ctx, listOpts)
		}

		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("failed to list resources: %v", err)), nil
		}
		for i := range list.Items {
			utils.CleanUnstructuredForAI(&list.Items[i])
		}
		number := common.String2Int(list.GetContinue(), 0) + 1
		config2.Logger.Debugf("tool list_cluster_resources called, result numbers: %d", number)
		return &mcp.CallToolResult{
			Content: []mcp.Content{
				mcp.TextContent{Type: "text", Text: fmt.Sprintf("%d", number)},
			},
		}, nil
	}

	return tool, handler
}

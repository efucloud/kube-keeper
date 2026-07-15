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
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
)

// UpdateClusterResource 更新集群中的已有资源对象
func UpdateClusterResource() (mcp.Tool, func(context.Context, mcp.CallToolRequest) (*mcp.CallToolResult, error)) {
	tool := mcp.NewTool("update_cluster_resource",
		mcp.WithTitleAnnotation("Kubernetes资源修改"),
		mcp.WithDescription("更新集群中已存在的资源对象，如 Deployment、Service 等。需提供完整的YAML（含 resourceVersion）"),
		mcp.WithString("name", mcp.Required(), mcp.Description("资源对象名称")),
		mcp.WithString("kind", mcp.Required(), mcp.Description("资源对象类型，如 Pod, Deployment 等")),
		mcp.WithString("apiVersion", mcp.Required(), mcp.Description("API 版本，如 v1, apps/v1")),
		mcp.WithString("namespace", mcp.Description("命名空间；集群级资源留空")),
		mcp.WithString("content", mcp.Required(), mcp.Description("更新后的完整资源YAML，必须包含metadata.resourceVersion")),
		mcp.WithString("reason", mcp.Description("需要使用该工具的原因")),
		mcp.WithDestructiveHintAnnotation(true),
	)
	handler := func(ctx context.Context, request mcp.CallToolRequest) (*mcp.CallToolResult, error) {
		// 1. 从 context 获取租户和集群信息

		clusterCode, ok := ctx.Value(config2.RequestClusterCode).(string)
		if !ok {
			return mcp.NewToolResultError("missing cluster in context"), nil
		}
		accountId, ok := ctx.Value(config2.RequestUserId).(string)
		if !ok {
			return mcp.NewToolResultError("missing account user info in context"), nil
		}

		name, err := request.RequireString("name")
		if err != nil {
			return mcp.NewToolResultError("missing required field: name"), nil
		}
		kind, err := request.RequireString("kind")
		if err != nil {
			return mcp.NewToolResultError("missing required field: kind"), nil
		}
		apiVersion, err := request.RequireString("apiVersion")
		if err != nil {
			return mcp.NewToolResultError("missing required field: apiVersion"), nil
		}
		namespace := request.GetString("namespace", "")
		content, err := request.RequireString("content")
		if err != nil {
			return mcp.NewToolResultError("missing cluster resource content"), nil
		}

		// 2. 将 YAML 转为 Unstructured
		requestObj, err := utils.YamlToUnstructured(content)
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("failed to parse YAML: %v", err)), nil
		}

		// 3. 校验必要字段：name 和 namespace 应与参数一致（避免混淆）
		if requestObj.GetName() == "" {
			requestObj.SetName(name)
		} else if requestObj.GetName() != name {
			return mcp.NewToolResultError("name in YAML does not match 'name' parameter"), nil
		}

		if namespace != "" {
			if requestObj.GetNamespace() == "" {
				requestObj.SetNamespace(namespace)
			} else if requestObj.GetNamespace() != namespace {
				return mcp.NewToolResultError("namespace in YAML does not match 'namespace' parameter"), nil
			}
		} else {
			// 集群级资源不应有 namespace
			if requestObj.GetNamespace() != "" {
				return mcp.NewToolResultError("cluster-scoped resource should not have namespace"), nil
			}
		}
		config2.Logger.Debugf("tool update_cluster_resource called, kind: %s apiVersion: %s namespace: %s name: %s", kind, apiVersion, namespace, name)
		// 4. 获取客户端
		cluster, adminClient, er := k8scluster.GetClusterAndAdminClientSetByCode(ctx, clusterCode)
		if er.IsNotNil() {
			return mcp.NewToolResultError(er.Err.Error()), nil
		}

		var requestInfo structs.RequestInfo
		requestInfo.ClusterCode = clusterCode
		requestInfo.AccountId = accountId
		requestInfo.Namespace = namespace
		requestInfo.ClusterId = cluster.ID

		_, userClient, er := k8scluster.GetClusterAndUserClientSet(ctx, requestInfo)
		if er.IsNotNil() {
			return mcp.NewToolResultError(er.Err.Error()), nil
		}

		// 5. 获取 GVR 映射
		mapping, err := adminClient.GetResourceMapping(apiVersion, kind)
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("failed to get resource mapping for %s/%s: %v", apiVersion, kind, err)), nil
		}

		// 6. 执行更新
		var updatedObj *unstructured.Unstructured
		if namespace == "" {
			config2.Logger.Infof("cluster: %s ready to update cluster resource: %s/ %s", clusterCode, mapping.Resource.GroupVersion(), namespace)
			// 集群级资源
			updatedObj, err = userClient.DynamicClient.Resource(mapping.Resource).Update(ctx, requestObj, metav1.UpdateOptions{})
		} else {
			config2.Logger.Infof("cluster: %s ready to update namespace: %s resource: %s/ %s", clusterCode, namespace, mapping.Resource.GroupVersion(), namespace)
			// 命名空间级资源
			updatedObj, err = userClient.DynamicClient.Resource(mapping.Resource).Namespace(namespace).Update(ctx, requestObj, metav1.UpdateOptions{})
		}
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("failed to update resource: %v", err)), nil
		}
		utils.CleanUnstructuredForAI(updatedObj)
		// 7. 返回结果
		objBytes, _ := json.Marshal(updatedObj)
		config2.Logger.Debugf("tool update_cluster_resource called, result: %s", string(objBytes))

		jsonStr := string(objBytes)
		result := &mcp.CallToolResult{
			Content: []mcp.Content{
				mcp.TextContent{
					Type: "text",
					Text: jsonStr,
				},
			},
			StructuredContent: json.RawMessage(objBytes),
		}
		return result, nil
	}
	return tool, handler
}

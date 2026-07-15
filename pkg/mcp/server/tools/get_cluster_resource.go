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
	k8serrors "k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	"strings"
)

// GetClusterResource 获取集群中指定的资源对象
func GetClusterResource() (mcp.Tool, func(context.Context, mcp.CallToolRequest) (*mcp.CallToolResult, error)) {
	tool := mcp.NewTool("get_cluster_resource",
		mcp.WithTitleAnnotation("Kubernetes资源获取"),
		mcp.WithDescription("获取Kubernetes集群中指定的资源对象。需提供资源名称、类型（kind）、API 版本。命名空间级资源需指定 namespace；集群级资源（如 Namespace、Node）请留空namespace。"),
		mcp.WithString("name", mcp.Required(), mcp.Description("资源对象的 metadata.name")),
		mcp.WithString("kind", mcp.Required(), mcp.Description("资源类型，如Pod、Deployment、Service等")),
		mcp.WithString("apiVersion", mcp.Required(), mcp.Description("API组和版本，如 v1、apps/v1、rbac.authorization.k8s.io/v1")),
		mcp.WithString("namespace", mcp.Description("资源所在命名空间、集群级资源请留空。")),
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
		name, err := request.RequireString("name")
		if err != nil || strings.TrimSpace(name) == "" {
			return mcp.NewToolResultError("resource name is required and cannot be empty"), nil
		}
		name = strings.TrimSpace(name)

		kind, err := request.RequireString("kind")
		if err != nil {
			return mcp.NewToolResultError("missing required field: kind"), nil
		}
		apiVersion, err := request.RequireString("apiVersion")
		if err != nil {
			return mcp.NewToolResultError("missing required field: apiVersion"), nil
		}
		namespace := request.GetString("namespace", "")
		namespace = strings.TrimSpace(namespace)

		// === 3. 获取客户端 ===
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

		// === 4. 获取 GVR 映射 ===
		mapping, err := adminClient.GetResourceMapping(apiVersion, kind)
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("unsupported resource type %s/%s: %v", apiVersion, kind, err)), nil
		}
		config2.Logger.Debugf("tool get_cluster_resource called, kind: %s apiVersion: %s namespace: %s name: %s", kind, apiVersion, namespace, name)

		// === 5. 执行 Get 操作 ===
		var obj *unstructured.Unstructured
		if namespace == "" {
			config2.Logger.Infof("cluster: %s ready to get cluster resource: %s/ %s",
				clusterCode, mapping.Resource.GroupVersion(), namespace)
			obj, err = userClient.DynamicClient.Resource(mapping.Resource).Get(ctx, name, metav1.GetOptions{})
		} else {
			config2.Logger.Infof("cluster: %s ready to get namespace: %s resource: %s/ %s",
				clusterCode, namespace, mapping.Resource.GroupVersion(), namespace)
			obj, err = userClient.DynamicClient.Resource(mapping.Resource).Namespace(namespace).Get(ctx, name, metav1.GetOptions{})
		}

		if err != nil {
			// 友好处理 "not found"
			if k8serrors.IsNotFound(err) {
				scope := "cluster-scoped"
				if namespace != "" {
					scope = fmt.Sprintf("namespaced (namespace=%s)", namespace)
				}
				return mcp.NewToolResultError(fmt.Sprintf("resource %s '%s' not found (%s/%s)", scope, name, apiVersion, kind)), nil
			}
			return mcp.NewToolResultError(fmt.Sprintf("failed to retrieve resource: %v", err)), nil
		}
		utils.CleanUnstructuredForAI(obj)
		// === 6. 返回结果 ===
		objBytes, _ := json.Marshal(obj)
		config2.Logger.Debugf("tool get_cluster_resource called, result: %s %s", obj.GroupVersionKind(), obj.GetName())

		return &mcp.CallToolResult{
			Content: []mcp.Content{
				mcp.TextContent{Type: "text", Text: string(objBytes)},
			},
			StructuredContent: json.RawMessage(objBytes),
		}, nil
	}

	return tool, handler
}

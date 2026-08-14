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

// DeleteClusterResource 删除集群中的指定资源对象
func DeleteClusterResource() (mcp.Tool, func(context.Context, mcp.CallToolRequest) (*mcp.CallToolResult, error)) {
	tool := mcp.NewTool("delete_cluster_resource",
		mcp.WithTitleAnnotation("Kubernetes资源删除"),
		mcp.WithDescription("删除Kubernetes集群中的单个资源对象。例如删除efucloud命名空间下的Pod或某个Namespace。"),
		mcp.WithString("name", mcp.Required(), mcp.Description("要删除的资源对象名称")),
		mcp.WithString("kind", mcp.Required(), mcp.Description("资源类型，如 Pod、Deployment等")),
		mcp.WithString("apiVersion", mcp.Required(), mcp.Description("API 版本，如 v1、apps/v1")),
		mcp.WithString("namespace", mcp.Description("资源所在命名空间、集群级资源留空。")),
		mcp.WithString("reason", mcp.Description("需要使用该工具的原因")),
		mcp.WithDestructiveHintAnnotation(true),
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
		namespace := strings.TrimSpace(request.GetString("namespace", ""))

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
		config2.Logger.Debugf("tool delete_cluster_resource called, kind: %s apiVersion: %s namespace: %s name: %s", kind, apiVersion, namespace, name)

		// === 5. 执行删除操作 ===
		var deleteErr error
		if namespace == "" {
			config2.Logger.Infof("cluster: %s ready to delete cluster resource: %s/ %s",
				clusterCode, mapping.Resource.GroupVersion(), namespace)
			// 集群级资源
			deleteErr = userClient.DynamicClient.Resource(mapping.Resource).Delete(ctx, name, metav1.DeleteOptions{})
		} else {
			config2.Logger.Infof("cluster: %s ready to delete namespace: %s resource: %s/ %s",
				clusterCode, namespace, mapping.Resource.GroupVersion(), namespace)
			// 命名空间级资源
			deleteErr = userClient.DynamicClient.Resource(mapping.Resource).Namespace(namespace).Delete(ctx, name, metav1.DeleteOptions{})
		}

		if deleteErr != nil {
			if k8serrors.IsNotFound(deleteErr) {
				scope := "cluster-scoped"
				if namespace != "" {
					scope = fmt.Sprintf("namespaced (ns=%s)", namespace)
				}
				return mcp.NewToolResultError(fmt.Sprintf("resource %s '%s' not found, nothing to delete", scope, name)), nil
			}
			return mcp.NewToolResultError(fmt.Sprintf("failed to delete resource: %v", deleteErr)), nil
		}

		// === 6. 返回成功结果 ===
		resultMsg := fmt.Sprintf("resource %s/%s '%s' deleted successfully", apiVersion, kind, name)
		if namespace != "" {
			resultMsg = fmt.Sprintf("resource %s/%s '%s' in namespace '%s' deleted successfully", apiVersion, kind, name, namespace)
		}
		config2.Logger.Debugf("tool delete_cluster_resource called, result: %s", resultMsg)

		return &mcp.CallToolResult{
			Content: []mcp.Content{
				mcp.TextContent{
					Type: "text",
					Text: resultMsg,
				},
			},
			StructuredContent: json.RawMessage(`{"status":"success","message":"` + resultMsg + `"}`),
		}, nil
	}

	return tool, handler
}

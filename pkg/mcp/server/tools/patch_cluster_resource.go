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
	"k8s.io/apimachinery/pkg/types"
	"strings"
)

// PatchClusterResource 使用 JSON Patch 更新集群资源
func PatchClusterResource() (mcp.Tool, func(context.Context, mcp.CallToolRequest) (*mcp.CallToolResult, error)) {
	tool := mcp.NewTool("patch_cluster_resource",
		mcp.WithTitleAnnotation("Kubernetes资源Patch修改"),
		mcp.WithDescription("使用JSON Patch (RFC 6902) 更新Kubernetes资源。无需提供完整YAML，只需描述变更操作。例如：[{\"op\":\"replace\",\"path\":\"/spec/replicas\",\"value\":3}]"),
		mcp.WithString("name", mcp.Required(), mcp.Description("资源对象名称")),
		mcp.WithString("kind", mcp.Required(), mcp.Description("资源类型，如Pod、Deployment 等")),
		mcp.WithString("apiVersion", mcp.Required(), mcp.Description("API版本，如apps/v1")),
		mcp.WithString("namespace", mcp.Description("命名空间；集群级资源留空")),
		mcp.WithObject("patch", mcp.Required(), mcp.Description("JSON Patch操作数组，格式为application/json-patch+json，例如：[{\"op\":\"add\",\"path\":\"/metadata/labels/env\",\"value\":\"prod\"}]")),
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

		// === 2. 解析参数 ===
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
		args := request.GetArguments()
		patchObj, ok := args["patch"]
		if !ok {
			return mcp.NewToolResultError("patch content is required"), nil
		}

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

		// === 5. 获取 GVR ===
		mapping, err := adminClient.GetResourceMapping(apiVersion, kind)
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("unsupported resource %s/%s: %v", apiVersion, kind, err)), nil
		}
		config2.Logger.Debugf("tool patch_cluster_resource called, kind: %s apiVersion: %s namespace: %s name: %s", kind, apiVersion, namespace, name)

		// === 6. 执行 Patch ===
		var patched *unstructured.Unstructured
		patchBytes, err := json.Marshal(patchObj)
		if err != nil {
			return mcp.NewToolResultError("patch content is not validate"), nil
		}
		if namespace == "" {
			config2.Logger.Infof("cluster: %s ready to patch cluster resource: %s/ %s",
				clusterCode, mapping.Resource.GroupVersion(), namespace)
			patched, err = userClient.DynamicClient.Resource(mapping.Resource).Patch(
				ctx, name, types.JSONPatchType, patchBytes, metav1.PatchOptions{})
		} else {
			config2.Logger.Infof("cluster: %s ready to patch namespace: %s resource: %s/ %s",
				clusterCode, namespace, mapping.Resource.GroupVersion(), namespace)
			patched, err = userClient.DynamicClient.Resource(mapping.Resource).Namespace(namespace).Patch(
				ctx, name, types.JSONPatchType, patchBytes, metav1.PatchOptions{})
		}
		config2.Logger.Infof("resource; %s patch data: %s", mapping.Resource.String(), string(patchBytes))
		if err != nil {
			if k8serrors.IsNotFound(err) {
				scope := "cluster-scoped"
				if namespace != "" {
					scope = fmt.Sprintf("namespaced (ns=%s)", namespace)
				}
				return mcp.NewToolResultError(fmt.Sprintf("resource %s '%s' not found", scope, name)), nil
			}
			return mcp.NewToolResultError(fmt.Sprintf("failed to patch resource: %v", err)), nil
		}
		utils.CleanUnstructuredForAI(patched)
		// === 7. 返回结果 ===
		objBytes, _ := json.Marshal(patched)

		return &mcp.CallToolResult{
			Content: []mcp.Content{
				mcp.TextContent{Type: "text", Text: string(objBytes)},
			},
			StructuredContent: patched,
		}, nil
	}

	return tool, handler
}

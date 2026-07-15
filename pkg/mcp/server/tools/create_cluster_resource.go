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

// CreateClusterResource 创建集群资源
func CreateClusterResource() (mcp.Tool, func(context.Context, mcp.CallToolRequest) (*mcp.CallToolResult, error)) {
	tool := mcp.NewTool("create_cluster_resource",
		mcp.WithTitleAnnotation("Kubernetes资源创建"),
		mcp.WithDescription(`在 Kubernetes 集群中**创建新的资源对象**（如 Deployment、Service、Pod、Namespace 等）。`),
		mcp.WithString("kind",
			mcp.Required(),
			mcp.Description("资源类型，例如：Deployment、Pod、Service、Namespace、ConfigMap、CronJob")),
		mcp.WithString("apiVersion",
			mcp.Required(),
			mcp.Description("API 组版本，例如：v1（Pod/Service）、apps/v1（Deployment）、batch/v1（CronJob）")),
		mcp.WithString("namespace",
			mcp.Description("目标命名空间。仅用于**命名空间级资源**（如 Pod、Deployment）。集群级资源（如 Namespace、ClusterRole、StorageClass）必须留空此字段。")),
		mcp.WithString("content",
			mcp.Required(),
			mcp.Description("完整的、有效的 Kubernetes 资源 YAML 内容。必须包含 apiVersion、kind、metadata.name。 ")),
		mcp.WithString("reason",
			mcp.Required(), // ← 强制提供创建理由，用于安全审计
			mcp.Description("必须说明创建该资源的业务或运维目的，例如：'为测试环境部署 Nginx 服务' 或 '创建生产数据库备份 CronJob'")),
		mcp.WithDestructiveHintAnnotation(true), // 已正确设置
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
		namespace := request.GetString("namespace", "")
		content, err := request.RequireString("content")
		if err != nil {
			return mcp.NewToolResultError("missing required field: content"), nil
		}
		// === 3. 转换 YAML 为 Unstructured ===
		obj, err := utils.YamlToUnstructured(content)
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("failed to parse YAML: %v", err)), nil
		}
		config2.Logger.Debugf("tool create_cluster_resource called, kind: %s apiVersion: %s namespace: %s name: %s", kind, obj.GetAPIVersion(), namespace, obj.GetName())
		// === 4. 校验一致性（防御性编程）===
		if obj.GetKind() == "" {
			obj.SetKind(kind)
		} else if obj.GetKind() != kind {
			return mcp.NewToolResultError(fmt.Sprintf("kind in YAML (%s) does not match parameter (%s)", obj.GetKind(), kind)), nil
		}

		if obj.GetAPIVersion() == "" {
			obj.SetAPIVersion(apiVersion)
		} else if obj.GetAPIVersion() != apiVersion {
			return mcp.NewToolResultError(fmt.Sprintf("apiVersion in YAML (%s) does not match parameter (%s)", obj.GetAPIVersion(), apiVersion)), nil
		}

		// 处理 namespace：参数优先，YAML 可覆盖但需一致
		if namespace != "" {
			if obj.GetNamespace() == "" {
				obj.SetNamespace(namespace)
			} else if obj.GetNamespace() != namespace {
				return mcp.NewToolResultError(fmt.Sprintf("namespace in YAML (%s) conflicts with parameter (%s)", obj.GetNamespace(), namespace)), nil
			}
		} else {

			// 集群级资源：确保 YAML 中无 namespace
			if obj.GetNamespace() != "" {
				return mcp.NewToolResultError("cluster-scoped resource must not have namespace set in YAML"), nil
			}
		}

		// === 5. 获取客户端 ===
		cluster, adminClient, er := k8scluster.GetClusterAndAdminClientSetByCode(ctx, clusterCode)
		if er.IsNotNil() {
			return mcp.NewToolResultError(fmt.Sprintf("failed to get cluster client: %v", er.Err)), nil
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

		// === 6. 获取 GVR 映射 ===
		mapping, err := adminClient.GetResourceMapping(apiVersion, kind)
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("unsupported resource type %s/%s: %v", apiVersion, kind, err)), nil
		}

		// === 7. 执行创建 ===
		var created *unstructured.Unstructured
		if namespace == "" {
			config2.Logger.Infof("cluster: %s ready to create cluster resource: %s/ %s", clusterCode, obj.GroupVersionKind(), obj.GetName())
			created, err = userClient.DynamicClient.Resource(mapping.Resource).Create(ctx, obj, metav1.CreateOptions{})
		} else {
			config2.Logger.Infof("cluster: %s ready to create namespace: %s resource: %s/ %s",
				clusterCode, namespace, obj.GroupVersionKind(), obj.GetName())
			created, err = userClient.DynamicClient.Resource(mapping.Resource).Namespace(namespace).Create(ctx, obj, metav1.CreateOptions{})
		}
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("failed to create resource: %v", err)), nil
		}
		utils.CleanUnstructuredForAI(created)
		// === 8. 返回结果 ===
		objBytes, _ := json.Marshal(created)
		config2.Logger.Debugf("tool create_cluster_resource called, result: %s", string(objBytes))
		return &mcp.CallToolResult{
			Content: []mcp.Content{
				mcp.TextContent{Type: "text", Text: string(objBytes)},
			},
			StructuredContent: json.RawMessage(objBytes),
		}, nil
	}

	return tool, handler
}

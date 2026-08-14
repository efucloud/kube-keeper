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

// DrainNode 清空节点上的所有可驱逐 Pod，并设置节点为不可调度
func DrainNode() (mcp.Tool, func(context.Context, mcp.CallToolRequest) (*mcp.CallToolResult, error)) {
	tool := mcp.NewTool("node_drain",
		mcp.WithTitleAnnotation("节点驱逐"),
		mcp.WithDescription("清空节点上的所有可驱逐Pod。"),
		mcp.WithString("nodeName", mcp.Required(), mcp.Description("节点名称")),
		mcp.WithBoolean("force", mcp.Description("是否强制删除由控制器管理的Pod通常不需要）")),
		mcp.WithBoolean("deleteEmptyDirData", mcp.Description("是否删除使用emptyDir的Pod（谨慎使用）")),
		mcp.WithString("reason", mcp.Description("需要使用该工具的原因")),

		mcp.WithDestructiveHintAnnotation(true),
	)

	handler := func(ctx context.Context, request mcp.CallToolRequest) (*mcp.CallToolResult, error) {
		nodeName, err := request.RequireString("nodeName")
		if err != nil || strings.TrimSpace(nodeName) == "" {
			return mcp.NewToolResultError("nodeName is required and cannot be empty"), nil
		}
		nodeName = strings.TrimSpace(nodeName)

		force := request.GetBool("force", false)
		deleteEmptyDirData := request.GetBool("deleteEmptyDirData", false)

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

		// Step 1: Cordon the node
		node, err := userClient.K8sClientSet.CoreV1().Nodes().Get(ctx, nodeName, metav1.GetOptions{})
		if err != nil {
			if k8serrors.IsNotFound(err) {
				return mcp.NewToolResultError(fmt.Sprintf("node '%s' not found", nodeName)), nil
			}
			return mcp.NewToolResultError(fmt.Sprintf("failed to get node: %v", err)), nil
		}

		if !node.Spec.Unschedulable {
			node.Spec.Unschedulable = true
			_, err = userClient.K8sClientSet.CoreV1().Nodes().Update(ctx, node, metav1.UpdateOptions{})
			if err != nil {
				return mcp.NewToolResultError(fmt.Sprintf("failed to cordon node: %v", err)), nil
			}
		}

		// Step 2: List all pods on the node
		pods, err := userClient.K8sClientSet.CoreV1().Pods(metav1.NamespaceAll).List(ctx, metav1.ListOptions{
			FieldSelector: fmt.Sprintf("spec.nodeName=%s", nodeName),
		})
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("failed to list pods on node: %v", err)), nil
		}

		var deletedPods []string
		for _, pod := range pods.Items {
			// Skip mirror pods and static pods
			if pod.Annotations != nil {
				if _, ok := pod.Annotations["kubernetes.io/config.mirror"]; ok {
					continue
				}
				if _, ok := pod.Annotations["kubernetes.io/config.source"]; ok && pod.Annotations["kubernetes.io/config.source"] == "file" {
					continue
				}
			}

			// Skip DaemonSet pods unless force=true
			controllerRef := metav1.GetControllerOf(&pod)
			if controllerRef != nil && controllerRef.Kind == "DaemonSet" && !force {
				continue
			}

			// Skip pods with emptyDir if deleteEmptyDirData=false
			if !deleteEmptyDirData {
				for _, vol := range pod.Spec.Volumes {
					if vol.EmptyDir != nil {
						goto SKIP_POD
					}
				}
			}

			err = userClient.K8sClientSet.CoreV1().Pods(pod.Namespace).Delete(ctx, pod.Name, metav1.DeleteOptions{})
			if err != nil && !k8serrors.IsNotFound(err) {
				return mcp.NewToolResultError(fmt.Sprintf("failed to delete pod %s/%s: %v", pod.Namespace, pod.Name, err)), nil
			}
			deletedPods = append(deletedPods, fmt.Sprintf("%s/%s", pod.Namespace, pod.Name))
			continue

		SKIP_POD:
		}

		msg := fmt.Sprintf("node '%s' drained successfully. Deleted %d pods.", nodeName, len(deletedPods))
		if len(deletedPods) > 0 {
			msg += "\nDeleted pods: " + strings.Join(deletedPods, ", ")
		}

		return &mcp.CallToolResult{
			Content:           []mcp.Content{mcp.TextContent{Type: "text", Text: msg}},
			StructuredContent: json.RawMessage(`{"status":"success","message":"` + strings.ReplaceAll(msg, `"`, `\"`) + `"}`),
		}, nil
	}
	return tool, handler
}

package tools

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/k8scluster"
	"github.com/efucloud/kube-keeper/pkg/structs"
	"regexp"
	"strconv"
	"strings"

	"github.com/efucloud/kube-keeper/pkg/utils"
	openapiv2 "github.com/google/gnostic-models/openapiv2"
	"github.com/mark3labs/mcp-go/mcp"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	"k8s.io/client-go/discovery"
)

// GetClusterResourcesOverview 完美复现 kubectl get -o wide 行为（无 gjson）
func GetClusterResourcesOverview() (mcp.Tool, func(context.Context, mcp.CallToolRequest) (*mcp.CallToolResult, error)) {
	tool := mcp.NewTool("get_cluster_resources_overview",
		mcp.WithTitleAnnotation("获取Kubernetes资源列表概览（宽格式）"),
		mcp.WithDescription("列出资源并使用与 'kubectl get -o wide' 完全一致的列定义（通过解析 OpenAPI）。命名空间级资源包含 namespace 字段。能够通过工具prometheus_query和prometheus_query_range时就不要使用该工具"),
		mcp.WithString("kind", mcp.Required(), mcp.Description("资源类型，如 Pod、Deployment、MyCRD")),
		mcp.WithString("apiVersion", mcp.Required(), mcp.Description("API 版本，如 v1、apps/v1")),
		mcp.WithString("namespace", mcp.Description("命名空间（仅对 namespaced 资源有效；若未提供，则不指定 namespace，行为与 kubectl 一致）")),
		mcp.WithString("labelSelector", mcp.Description("标签选择器")),
		mcp.WithString("fieldSelector", mcp.Description("字段选择器")),
		mcp.WithNumber("limit", mcp.Description("最大返回条数（1-1000）")),
		mcp.WithString("reason", mcp.Description("调用目的")),
		mcp.WithDestructiveHintAnnotation(false),
		mcp.WithReadOnlyHintAnnotation(true),
	)

	handler := func(ctx context.Context, request mcp.CallToolRequest) (*mcp.CallToolResult, error) {
		// === 1. Context ===

		clusterCode, ok := ctx.Value(config.RequestClusterCode).(string)
		if !ok {
			return mcp.NewToolResultError("missing cluster code"), nil
		}
		accountId, ok := ctx.Value(config.RequestUserId).(string)
		if !ok {
			return mcp.NewToolResultError("missing account ID"), nil
		}

		// === 2. Parse args ===
		kind := strings.TrimSpace(request.GetString("kind", ""))
		apiVersion := strings.TrimSpace(request.GetString("apiVersion", ""))
		namespace := strings.TrimSpace(request.GetString("namespace", ""))
		labelSelector := strings.TrimSpace(request.GetString("labelSelector", ""))
		fieldSelector := strings.TrimSpace(request.GetString("fieldSelector", ""))
		limit := request.GetInt("limit", 500)
		if limit <= 0 || limit > 1000 {
			limit = 20
		}

		if kind == "" || apiVersion == "" {
			return mcp.NewToolResultError("kind and apiVersion are required"), nil
		}

		// === 3. Get RESTMapping to determine scope ===
		cluster, adminClient, er := k8scluster.GetClusterAndAdminClientSetByCode(ctx, clusterCode)
		if er.IsNotNil() {
			return mcp.NewToolResultError(fmt.Sprintf("client init failed: %v", er.Err)), nil
		}

		mapping, err := adminClient.GetResourceMapping(apiVersion, kind)
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("unsupported resource %s.%s: %v", kind, apiVersion, err)), nil
		}

		isNamespaced := mapping.Scope.Name() == "namespace"

		// === 4. Fetch OpenAPI and extract print columns ===
		discoveryClient, err := discovery.NewDiscoveryClientForConfig(adminClient.Config)
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("failed to create discovery client: %v", err)), nil
		}

		openapiDoc, err := discoveryClient.OpenAPISchema()
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("failed to fetch OpenAPI schema: %v", err)), nil
		}

		gvk := metav1.GroupVersionKind{
			Group:   mapping.GroupVersionKind.Group,
			Version: mapping.GroupVersionKind.Version,
			Kind:    mapping.GroupVersionKind.Kind,
		}

		// Build field definitions (NAME, AGE, NAMESPACE, etc.)
		fieldDefs := buildFieldDefinitions(openapiDoc, gvk, isNamespaced)

		// === 5. List resources ===
		listOpts := metav1.ListOptions{
			LabelSelector: labelSelector,
			FieldSelector: fieldSelector,
			Limit:         int64(limit),
		}

		requestInfo := structs.RequestInfo{
			ClusterCode: clusterCode,
			AccountId:   accountId,
			Namespace:   "",
			ClusterId:   cluster.ID,
		}
		_, userClient, er := k8scluster.GetClusterAndUserClientSet(ctx, requestInfo)
		if er.IsNotNil() {
			return mcp.NewToolResultError(fmt.Sprintf("user client error: %v", er.Err)), nil
		}

		var list *unstructured.UnstructuredList
		if isNamespaced {
			list, err = userClient.DynamicClient.Resource(mapping.Resource).Namespace(namespace).List(ctx, listOpts)
		} else {
			list, err = userClient.DynamicClient.Resource(mapping.Resource).List(ctx, listOpts)
		}
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("list failed: %v", err)), nil
		}

		// === 6. Extract fields without gjson ===
		var result []map[string]interface{}
		for _, item := range list.Items {
			utils.CleanUnstructuredForAI(&item)
			row := extractRowFromItem(&item, fieldDefs)
			result = append(result, row)
		}

		resultBytes, _ := json.Marshal(result)
		return &mcp.CallToolResult{
			Content: []mcp.Content{
				mcp.TextContent{Type: "text", Text: string(resultBytes)},
			},
			StructuredContent: json.RawMessage(resultBytes),
		}, nil
	}

	return tool, handler
}

// --- Field Definition and Extraction ---

type FieldDef struct {
	Name     string
	JSONPath string
}

var arrayIndexRegex = regexp.MustCompile(`^([a-zA-Z0-9_]+)  $ ([0-9]+) $   $ `)

// builtinWideColumns defines the -o wide columns for built-in resources (matching kubectl exactly)
var builtinWideColumns = map[string][]FieldDef{
	// Core v1
	"v1/Pod": {
		{Name: "READY", JSONPath: ".status.containerStatuses"},
		{Name: "STATUS", JSONPath: ".status.phase"},
		{Name: "RESTARTS", JSONPath: ".status.containerStatuses"},
		{Name: "IP", JSONPath: ".status.podIP"},
		{Name: "NODE", JSONPath: ".spec.nodeName"},
		{Name: "NOMINATED NODE", JSONPath: ".status.nominatedNodeName"},
	},
	"v1/Service": {
		{Name: "CLUSTER-IP", JSONPath: ".spec.clusterIP"},
		{Name: "EXTERNAL-IP", JSONPath: ".status.loadBalancer.ingress"},
		{Name: "PORT(S)", JSONPath: ".spec.ports"},
	},
	"v1/ConfigMap": {},
	"v1/Secret":    {},
	"v1/PersistentVolume": {
		{Name: "CAPACITY", JSONPath: ".spec.capacity.storage"},
		{Name: "ACCESS MODES", JSONPath: ".spec.accessModes"},
		{Name: "CLAIM", JSONPath: ".spec.claimRef.name"},
		{Name: "STORAGECLASS", JSONPath: ".spec.storageClassName"},
		{Name: "REASON", JSONPath: ".status.reason"},
	},
	"v1/PersistentVolumeClaim": {
		{Name: "STATUS", JSONPath: ".status.phase"},
		{Name: "VOLUME", JSONPath: ".spec.volumeName"},
		{Name: "CAPACITY", JSONPath: ".status.capacity.storage"},
		{Name: "ACCESS MODES", JSONPath: ".status.accessModes"},
		{Name: "STORAGECLASS", JSONPath: ".spec.storageClassName"},
	},
	"v1/Node": {
		{Name: "STATUS", JSONPath: ".status.conditions"},
		{Name: "ROLES", JSONPath: ".metadata.labels"},
		{Name: "VERSION", JSONPath: ".status.nodeInfo.kubeletVersion"},
		{Name: "INTERNAL-IP", JSONPath: ".status.addresses"},
		{Name: "OS-IMAGE", JSONPath: ".status.nodeInfo.osImage"},
		{Name: "KERNEL-VERSION", JSONPath: ".status.nodeInfo.kernelVersion"},
		{Name: "CONTAINER-RUNTIME", JSONPath: ".status.nodeInfo.containerRuntimeVersion"},
	},
	"v1/Namespace": {
		{Name: "STATUS", JSONPath: ".status.phase"},
	},
	"v1/Event": {
		{Name: "LAST SEEN", JSONPath: ".lastTimestamp"},
		{Name: "TYPE", JSONPath: ".type"},
		{Name: "REASON", JSONPath: ".reason"},
		{Name: "OBJECT", JSONPath: ".involvedObject"},
		{Name: "MESSAGE", JSONPath: ".message"},
	},

	// apps/v1
	"apps/v1/Deployment": {
		{Name: "READY", JSONPath: ".status.readyReplicas"},
		{Name: "UP-TO-DATE", JSONPath: ".status.updatedReplicas"},
		{Name: "AVAILABLE", JSONPath: ".status.availableReplicas"},
	},
	"apps/v1/StatefulSet": {
		{Name: "READY", JSONPath: ".status.readyReplicas"},
	},
	"apps/v1/DaemonSet": {
		{Name: "DESIRED", JSONPath: ".status.desiredNumberScheduled"},
		{Name: "CURRENT", JSONPath: ".status.currentNumberScheduled"},
		{Name: "READY", JSONPath: ".status.numberReady"},
		{Name: "UP-TO-DATE", JSONPath: ".status.updatedNumberScheduled"},
		{Name: "AVAILABLE", JSONPath: ".status.numberAvailable"},
	},
	"apps/v1/ReplicaSet": {
		{Name: "DESIRED", JSONPath: ".spec.replicas"},
		{Name: "CURRENT", JSONPath: ".status.replicas"},
		{Name: "READY", JSONPath: ".status.readyReplicas"},
	},

	// batch/v1
	"batch/v1/Job": {
		{Name: "COMPLETIONS", JSONPath: ".status.succeeded"},
		{Name: "DURATION", JSONPath: ".status.completionTime"},
	},
	"batch/v1/CronJob": {
		{Name: "SCHEDULE", JSONPath: ".spec.schedule"},
		{Name: "SUSPEND", JSONPath: ".spec.suspend"},
		{Name: "ACTIVE", JSONPath: ".status.active"},
		{Name: "LAST SCHEDULE", JSONPath: ".status.lastScheduleTime"},
	},

	// networking.k8s.io/v1
	"networking.k8s.io/v1/Ingress": {
		{Name: "CLASS", JSONPath: ".spec.ingressClassName"},
		{Name: "HOSTS", JSONPath: ".spec.rules"},
		{Name: "ADDRESS", JSONPath: ".status.loadBalancer.ingress"},
		{Name: "PORTS", JSONPath: ".spec.tls"},
	},

	// storage.k8s.io/v1
	"storage.k8s.io/v1/StorageClass": {
		{Name: "PROVISIONER", JSONPath: ".provisioner"},
		{Name: "RECLAIM POLICY", JSONPath: ".reclaimPolicy"},
		{Name: "VOLUMEBINDINGMODE", JSONPath: ".volumeBindingMode"},
		{Name: "ALLOW VOLUME EXPANSION", JSONPath: ".allowVolumeExpansion"},
	},

	// rbac.authorization.k8s.io/v1
	"rbac.authorization.k8s.io/v1/RoleBinding": {
		{Name: "ROLE", JSONPath: ".roleRef.name"},
	},
	"rbac.authorization.k8s.io/v1/ClusterRoleBinding": {
		{Name: "ROLE", JSONPath: ".roleRef.name"},
	},

	// autoscaling/v1
	"autoscaling/v1/HorizontalPodAutoscaler": {
		{Name: "REFERENCE", JSONPath: ".spec.scaleTargetRef"},
		{Name: "TARGETS", JSONPath: ".status.currentCPUUtilizationPercentage"},
		{Name: "MINPODS", JSONPath: ".spec.minReplicas"},
		{Name: "MAXPODS", JSONPath: ".spec.maxReplicas"},
		{Name: "REPLICAS", JSONPath: ".status.currentReplicas"},
	},
}

func buildApiVersion(group, version string) string {
	if group == "" && version == "v1" {
		return "v1"
	}
	if group == "" {
		return version
	}
	return group + "/" + version
}

// buildFieldDefinitions mimics kubectl's column selection logic:
// - For CRDs: uses x-kubernetes-print-columns from OpenAPI (priority >= 1 for wide)
// - For built-in resources: uses hardcoded definitions matching 'kubectl get -o wide'
func buildFieldDefinitions(doc *openapiv2.Document, gvk metav1.GroupVersionKind, isNamespaced bool) []FieldDef {
	apiVersion := buildApiVersion(gvk.Group, gvk.Version)
	builtinKey := apiVersion + "/" + gvk.Kind

	// Step 1: Try OpenAPI (for CRDs)
	defKey := getStandardOpenAPIListKey(apiVersion, gvk.Kind)
	printCols := extractPrintColumnsFromOpenAPI(doc, defKey)

	var defs []FieldDef
	hasPrintColumns := false
	for _, col := range printCols {
		if col.Priority == 0 || col.Priority >= 1 {
			if col.JSONPath != "" && col.Name != "" {
				defs = append(defs, FieldDef{Name: col.Name, JSONPath: col.JSONPath})
				hasPrintColumns = true
			}
		}
	}

	// Step 2: Fallback to builtin if no printColumns found
	if !hasPrintColumns {
		if builtinDefs, exists := builtinWideColumns[builtinKey]; exists {
			defs = append(defs, builtinDefs...)
		}
	}

	// Step 3: Ensure NAME and AGE
	hasName, hasAge := false, false
	for _, d := range defs {
		if d.Name == "NAME" {
			hasName = true
		}
		if d.Name == "AGE" {
			hasAge = true
		}
	}
	if !hasName {
		defs = append([]FieldDef{{Name: "NAME", JSONPath: ".metadata.name"}}, defs...)
	}
	if !hasAge {
		defs = append(defs, FieldDef{Name: "AGE", JSONPath: ".metadata.creationTimestamp"})
	}

	// Step 4: Add NAMESPACE for namespaced resources (at end)
	if isNamespaced {
		defs = append(defs, FieldDef{Name: "NAMESPACE", JSONPath: ".metadata.namespace"})
	}

	return defs
}

// extractRowFromItem extracts values using JSONPath-like navigation
func extractRowFromItem(item *unstructured.Unstructured, defs []FieldDef) map[string]interface{} {
	row := make(map[string]interface{})
	obj := item.Object
	for _, def := range defs {
		row[def.Name] = getValueByJSONPath(obj, def.JSONPath)
	}
	return row
}

// getValueByJSONPath supports paths like .metadata.name or .status.conditions[0].type
func getValueByJSONPath(obj interface{}, path string) interface{} {
	if !strings.HasPrefix(path, ".") {
		return nil
	}
	parts := strings.Split(path[1:], ".")
	return navigate(obj, parts)
}

// navigate walks the object by path parts
func navigate(current interface{}, parts []string) interface{} {
	if len(parts) == 0 || current == nil {
		return current
	}

	key := parts[0]
	remaining := parts[1:]

	// Check if key contains [index], e.g., "conditions[0]"
	actualKey := key
	arrayIndex := -1
	if matches := arrayIndexRegex.FindStringSubmatch(key); len(matches) == 3 {
		actualKey = matches[1]
		if idx, err := strconv.Atoi(matches[2]); err == nil {
			arrayIndex = idx
		}
	}

	if m, ok := current.(map[string]interface{}); ok {
		next, exists := m[actualKey]
		if !exists {
			return nil
		}
		if arrayIndex >= 0 {
			if arr, ok := next.([]interface{}); ok && arrayIndex < len(arr) {
				return navigate(arr[arrayIndex], remaining)
			}
			return nil
		}
		return navigate(next, remaining)
	}

	return nil
}

// --- OpenAPI Helpers (unchanged) ---

type PrintColumn struct {
	Name     string
	JSONPath string
	Priority int
}

func getStandardOpenAPIListKey(apiVersion, kind string) string {
	if apiVersion == "v1" {
		return fmt.Sprintf("io.k8s.api.core.v1.%sList", kind)
	}
	parts := strings.SplitN(apiVersion, "/", 2)
	if len(parts) != 2 {
		return ""
	}
	group, version := parts[0], parts[1]
	cleanGroup := strings.ReplaceAll(group, ".", "_")
	return fmt.Sprintf("io.k8s.api.%s.%s.%sList", cleanGroup, version, kind)
}

func extractPrintColumnsFromOpenAPI(doc *openapiv2.Document, defKey string) []PrintColumn {
	if doc == nil || doc.Definitions == nil {
		return nil
	}

	var targetSchema *openapiv2.Schema
	for _, namedSchema := range doc.Definitions.AdditionalProperties {
		if namedSchema == nil {
			continue
		}
		if namedSchema.Name == defKey {
			targetSchema = namedSchema.Value
			break
		}
	}
	if targetSchema == nil {
		return nil
	}

	for _, ext := range targetSchema.VendorExtension {
		if ext == nil || ext.Name != "x-kubernetes-print-columns" {
			continue
		}
		raw := ext.GetValue().GetValue()
		if raw == nil {
			continue
		}

		var cols []map[string]interface{}
		if err := json.Unmarshal(raw.Value, &cols); err != nil {
			continue
		}

		var result []PrintColumn
		for _, col := range cols {
			name, nameOK := col["name"].(string)
			jsonPath, jsonPathOK := col["jsonPath"].(string)
			priority := 0
			if p, ok := col["priority"].(float64); ok {
				priority = int(p)
			}
			if nameOK && jsonPathOK && name != "" && jsonPath != "" {
				result = append(result, PrintColumn{
					Name:     name,
					JSONPath: jsonPath,
					Priority: priority,
				})
			}
		}
		return result
	}
	return nil
}

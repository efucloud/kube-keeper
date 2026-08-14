package tools

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/k8scluster"
	"github.com/efucloud/kube-keeper/pkg/k8scluster/database"
	dtos2 "github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/efucloud/kube-keeper/pkg/structs"
	"gopkg.in/yaml.v3"
	"os"
	"strings"

	"github.com/efucloud/common"
	"github.com/mark3labs/mcp-go/mcp"
	"helm.sh/helm/v3/pkg/chart/loader"
	"helm.sh/helm/v3/pkg/cli"
	"helm.sh/helm/v3/pkg/downloader"
	"helm.sh/helm/v3/pkg/getter"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

// GetHelmChartValues 获取 Helm Chart 的 values.yaml 内容（支持 OCI 和 HTTP/HTTPS）
func GetHelmChartValues() (mcp.Tool, func(context.Context, mcp.CallToolRequest) (*mcp.CallToolResult, error)) {
	tool := mcp.NewTool("helm_oci_values",
		mcp.WithTitleAnnotation("Helm包values获取"),
		mcp.WithDescription("获取 Helm Chart 的默认 values.yaml 内容。支持 OCI（oci://...）和 HTTP/HTTPS（https://.../chart.tgz）。OCI 模式会自动使用 namespace 中的镜像仓库凭证。"),
		mcp.WithString("namespace", mcp.Required(), mcp.Description("Kubernetes 命名空间，用于查找 imagePullSecrets")),
		mcp.WithString("chart", mcp.Required(), mcp.Description("Helm Chart 引用，如 'oci://ghcr.io/org/chart' 或 'https://example.com/chart-1.0.0.tgz'")),
		mcp.WithString("version", mcp.Description("Chart 版本（仅对 OCI 或 repo 类型有效；tarball URL 忽略）")),
		mcp.WithString("reason", mcp.Description("调用原因（可选）")),
		mcp.WithDestructiveHintAnnotation(false),
		mcp.WithReadOnlyHintAnnotation(true),
	)

	handler := func(ctx context.Context, request mcp.CallToolRequest) (*mcp.CallToolResult, error) {
		namespace := strings.TrimSpace(request.GetString("namespace", ""))
		chartRef := strings.TrimSpace(request.GetString("chart", ""))
		version := strings.TrimSpace(request.GetString("version", ""))

		if namespace == "" || chartRef == "" {
			return mcp.NewToolResultError("namespace and chart are required"), nil
		}

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

		settings := cli.New()
		var getterOpts []getter.Option

		// 🟢 处理 OCI 认证
		if strings.HasPrefix(chartRef, "oci://") {
			registryHost := extractRegistryFromOCICHart(chartRef)
			if registryHost != "" {
				authConfig, err := getDockerAuthFromNamespaceInfo(ctx, requestInfo, registryHost)
				if err != nil {
					config2.Logger.Warn("Failed to get auth for OCI registry", "registry", registryHost, "error", err)
				} else if authConfig.Username != "" && authConfig.Password != "" {
					getterOpts = append(getterOpts, getter.WithBasicAuth(authConfig.Username, authConfig.Password))
				}
			}
		}

		// 创建临时目录用于解压 chart
		tempDir, err := os.MkdirTemp("", "helm-values-*")
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("failed to create temp dir: %v", err)), nil
		}
		defer os.RemoveAll(tempDir)

		// 构造 downloader
		downloader := &downloader.ChartDownloader{
			Out:     nil, // silent
			Verify:  downloader.VerifyNever,
			Keyring: "",
			Getters: getter.All(settings), // 包含 http/https/oci 等默认 getter
			Options: getterOpts,           // 注入认证选项（仅对匹配的 getter 生效）
		}

		// 注意：对于 tarball URL，version 会被忽略；对于 OCI，version 有效
		chartPath, _, err := downloader.DownloadTo(chartRef, version, tempDir)
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("failed to download chart: %v", err)), nil
		}

		ch, err := loader.Load(chartPath)
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("failed to load chart: %v", err)), nil
		}

		valuesYAML, err := yaml.Marshal(ch.Values)

		return &mcp.CallToolResult{
			Content: []mcp.Content{
				mcp.TextContent{Type: "text", Text: string(valuesYAML)},
			},
			StructuredContent: ch.Values,
		}, nil
	}

	return tool, handler
}

// --- 以下函数保持不变 ---

func extractRegistryFromOCICHart(chartRef string) string {
	if !strings.HasPrefix(chartRef, "oci://") {
		return ""
	}
	s := strings.TrimPrefix(chartRef, "oci://")
	if i := strings.Index(s, "/"); i != -1 {
		return s[:i]
	}
	return s
}

func getDockerAuthFromNamespaceInfo(ctx context.Context, requestInfo structs.RequestInfo, registryHost string) (auth struct{ Username, Password string }, err error) {
	clusterSvc := database.ClusterService{}
	var cluster dtos2.ClusterDetail
	var errorData common.ErrorData

	if len(requestInfo.ClusterCode) > 0 {
		cluster, errorData = clusterSvc.GetClusterByCode(ctx, requestInfo.ClusterCode)
	} else {
		cluster, errorData = clusterSvc.GetClusterByID(ctx, requestInfo.ClusterId)
	}
	if errorData.IsNotNil() {
		return auth, errorData.Err
	}

	clientSet, errorData := k8scluster.NewAdminClientSetForConfigByCluster(cluster)
	if errorData.IsNotNil() {
		return auth, errorData.Err
	}

	listSecrets, err := clientSet.K8sClientSet.CoreV1().Secrets(requestInfo.Namespace).List(ctx, metav1.ListOptions{
		FieldSelector: "type=kubernetes.io/dockerconfigjson",
	})
	if err != nil {
		return auth, err
	}

	for _, secret := range listSecrets.Items {
		if data, ok := secret.Data[".dockerconfigjson"]; ok {
			var imageAuth dtos2.ImageRegistryAuth
			if er := json.Unmarshal(data, &imageAuth); er == nil {
				for registry, value := range imageAuth.Auths {
					if registry == registryHost {
						username, password := value.Username, value.Password
						if username == "" || password == "" {
							if a, err := base64.StdEncoding.DecodeString(value.Auth); err == nil {
								if parts := strings.SplitN(string(a), ":", 2); len(parts) == 2 {
									username, password = parts[0], parts[1]
								}
							}
						}
						return struct{ Username, Password string }{username, password}, nil
					}
				}
			}
		}
	}
	return auth, nil
}

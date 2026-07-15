package tools

import (
	"context"
	"encoding/json"
	"fmt"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/k8scluster/database"
	"github.com/mark3labs/mcp-go/mcp"
	"github.com/prometheus/client_golang/api"
	v1 "github.com/prometheus/client_golang/api/prometheus/v1"
	"github.com/prometheus/common/model"
	"strconv"
	"strings"
	"time"
)

// PrometheusQueryRange 执行 Prometheus 范围查询（Range Query）
func PrometheusQueryRange() (mcp.Tool, func(context.Context, mcp.CallToolRequest) (*mcp.CallToolResult, error)) {
	tool := mcp.NewTool("prometheus_query_range",
		mcp.WithTitleAnnotation("Prometheus指标使用Query Range查询"),
		mcp.WithDescription(`获取 Kubernetes 集群中Prometheus监控指标，如CPU、内存、网络、磁盘等资源的历史使用趋势。`),
		mcp.WithString("query",
			mcp.Required(),
			mcp.Description("PromQL表达式，例如：`rate(container_cpu_usage_seconds_total{namespace='default'}[5m])` 或 `container_memory_usage_bytes{pod='my-pod'}`")),
		mcp.WithString("start",
			mcp.Required(),
			mcp.Description("查询开始时间，支持 RFC3339 格式（如 '2026-01-22T10:00:00Z'）或 Unix 时间戳（秒）")),
		mcp.WithString("end",
			mcp.Required(),
			mcp.Description("查询结束时间，格式同 start")),
		mcp.WithString("step",
			mcp.Required(),
			mcp.Description("采样步长，如 '30s'、'1m'、'5m'。建议 ≥15s 以避免数据量过大")),
		mcp.WithString("reason",
			mcp.Required(), // ← 改为 Required！强制模型说明原因
			mcp.Description("请简要说明为什么需要查询这些指标（例如：'分析 default 命名空间下 Pod 的内存泄漏问题'）")),

		mcp.WithDestructiveHintAnnotation(false),
		mcp.WithReadOnlyHintAnnotation(true),
	)

	handler := func(ctx context.Context, request mcp.CallToolRequest) (*mcp.CallToolResult, error) {
		query, err := request.RequireString("query")
		if err != nil || strings.TrimSpace(query) == "" {
			return mcp.NewToolResultError("query is required and cannot be empty"), nil
		}
		query = strings.TrimSpace(query)
		reason, _ := request.RequireString("reason")
		startStr := strings.TrimSpace(request.GetString("start", ""))
		endStr := strings.TrimSpace(request.GetString("end", ""))
		stepStr := strings.TrimSpace(request.GetString("step", ""))

		if startStr == "" || endStr == "" || stepStr == "" {
			return mcp.NewToolResultError("start, end, and step are required"), nil
		}

		// 解析时间
		parseTime := func(s string) (time.Time, error) {
			if ts, err := strconv.ParseInt(s, 10, 64); err == nil {
				if ts > 1e10 {
					return time.Unix(0, ts*int64(time.Millisecond)), nil
				}
				return time.Unix(ts, 0), nil
			}
			if t, err := time.Parse(time.RFC3339, s); err == nil {
				return t, nil
			}
			return time.Time{}, fmt.Errorf("invalid time format: %s", s)
		}

		start, err := parseTime(startStr)
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("invalid start time: %v", err)), nil
		}
		end, err := parseTime(endStr)
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("invalid end time: %v", err)), nil
		}
		if start.After(end) {
			return mcp.NewToolResultError("start time must be before end time"), nil
		}
		config2.Logger.Debugf("%s tool prometheus_query_range called, start %s end: %s step: %s promql: %s", reason, start, end, stepStr, query)

		// 解析 step
		step, err := model.ParseDuration(stepStr)
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("invalid step duration: %v", err)), nil
		}

		clusterCode, ok := ctx.Value(config2.RequestClusterCode).(string)
		if !ok {
			config2.Logger.Error("missing cluster code in context")
			return mcp.NewToolResultError("missing cluster code in context"), nil
		}
		clusterSvc := database.ClusterService{}
		cluster, _ := clusterSvc.GetClusterByCode(ctx, clusterCode)
		// 构造 client
		clientConfig := api.Config{Address: cluster.ExtendConfig.MonitorPrometheusConfig.Address}
		if clientConfig.Address == "" {
			return mcp.NewToolResultError("Prometheus address not found in context"), nil
		}
		client, err := api.NewClient(clientConfig)
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("failed to create Prometheus client: %v", err)), nil
		}

		v1api := v1.NewAPI(client)

		r := v1.Range{
			Start: start,
			End:   end,
			Step:  time.Duration(step),
		}

		result, _, err := v1api.QueryRange(ctx, query, r)
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("Prometheus range query failed: %v", err)), nil
		}
		jsonBytes, _ := json.Marshal(result)
		text := string(jsonBytes)
		config2.Logger.Debug("tool prometheus_query_range called success")

		return &mcp.CallToolResult{
			Content: []mcp.Content{
				mcp.TextContent{Type: "text", Text: text},
			},
			StructuredContent: json.RawMessage(jsonBytes),
		}, nil
	}

	return tool, handler
}

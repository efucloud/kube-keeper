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
	"strconv"
	"strings"
	"time"
)

// PrometheusQuery 执行 Prometheus 即时查询（Instant Query）
func PrometheusQuery() (mcp.Tool, func(context.Context, mcp.CallToolRequest) (*mcp.CallToolResult, error)) {
	tool := mcp.NewTool("prometheus_query",
		mcp.WithTitleAnnotation("Prometheus指标使用Query查询"),
		mcp.WithDescription(`获取 Kubernetes 集群Prometheus中某个时间点的监控指标`),
		mcp.WithString("query",
			mcp.Required(),
			mcp.Description("PromQL 表达式，例如：\n"+
				"- `up{job=\"kubernetes-pods\", pod=\"my-app-123\"}` → 检查 Pod 是否在线\n")),
		mcp.WithString("time",
			mcp.Description("可选。指定查询的时间点（RFC3339 格式如 '2026-01-22T12:00:00Z'，或 Unix 时间戳）。默认为当前服务器时间。")),
		mcp.WithString("reason",
			mcp.Required(), // ← 强烈建议设为 Required，提升模型思考质量
			mcp.Description("请说明查询目的，例如：'检查 default 命名空间下 web-0 Pod 的当前内存使用情况'")),

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

		// 解析 time 参数
		var queryTime time.Time
		timeStr := strings.TrimSpace(request.GetString("time", ""))
		if timeStr != "" {
			// 尝试解析为 Unix timestamp（秒或毫秒）
			if ts, err := strconv.ParseInt(timeStr, 10, 64); err == nil {
				if ts > 1e10 { // 毫秒级时间戳
					queryTime = time.Unix(0, ts*int64(time.Millisecond))
				} else { // 秒级
					queryTime = time.Unix(ts, 0)
				}
			} else if t, err := time.Parse(time.RFC3339, timeStr); err == nil {
				queryTime = t
			} else {
				return mcp.NewToolResultError("invalid time format. Use RFC3339 or Unix timestamp"), nil
			}
		} else {
			queryTime = time.Now()
		}
		config2.Logger.Debugf("%s tool prometheus_query called,queryTime: %s promql: %s", reason, queryTime.Format(time.DateTime), query)

		// 执行查询
		result, _, err := v1api.Query(ctx, query, queryTime)
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("Prometheus query failed: %v", err)), nil
		}

		// 序列化结果
		jsonBytes, _ := json.Marshal(result)
		text := string(jsonBytes)
		config2.Logger.Debug("tool prometheus_query called success")
		return &mcp.CallToolResult{
			Content: []mcp.Content{
				mcp.TextContent{Type: "text", Text: text},
			},
			StructuredContent: json.RawMessage(jsonBytes),
		}, nil
	}

	return tool, handler
}

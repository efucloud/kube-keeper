package server

import (
	tools2 "github.com/efucloud/kube-keeper/pkg/mcp/server/tools"
	"github.com/mark3labs/mcp-go/server"
)

var McpServer *server.MCPServer

func init() {
	McpServer = server.NewMCPServer("builtin", "1.0.0")
	// 注册工具
	McpServer.AddTool(tools2.PrometheusQuery())
	McpServer.AddTool(tools2.PrometheusQueryRange())
	McpServer.AddTool(tools2.GetClusterResource())
	McpServer.AddTool(tools2.ListClusterResources())
	McpServer.AddTool(tools2.GetClusterResourcesOverview())
	McpServer.AddTool(tools2.CreateClusterResource())
	McpServer.AddTool(tools2.UpdateClusterResource())
	McpServer.AddTool(tools2.GetClusterResourcesNumber())
	McpServer.AddTool(tools2.PatchClusterResource())
	McpServer.AddTool(tools2.DeleteClusterResource())
	McpServer.AddTool(tools2.GetPodLogs())
	McpServer.AddTool(tools2.ExecInPod())
	McpServer.AddTool(tools2.ListPodFiles())
	McpServer.AddTool(tools2.ReadPodFile())
	McpServer.AddTool(tools2.AddTaintToNode())
	McpServer.AddTool(tools2.DrainNode())
	McpServer.AddTool(tools2.CordonNode())
	McpServer.AddTool(tools2.UncordonNode())
	McpServer.AddTool(tools2.RemoveTaintFromNode())
	McpServer.AddTool(tools2.GetImageConfig())
	McpServer.AddTool(tools2.GetPodEvents())
	McpServer.AddTool(tools2.ListImageTags())
	McpServer.AddTool(tools2.ListNamespaces())
	McpServer.AddTool(tools2.HelmUninstall())
	McpServer.AddTool(tools2.HelmUpgrade())
	McpServer.AddTool(tools2.HelmInstall())
	McpServer.AddTool(tools2.GetHelmChartValues())
}

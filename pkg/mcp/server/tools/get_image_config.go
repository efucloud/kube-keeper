package tools

import (
	"context"
	"encoding/json"
	"fmt"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	"github.com/google/go-containerregistry/pkg/authn"
	"github.com/google/go-containerregistry/pkg/name"
	"github.com/google/go-containerregistry/pkg/v1/remote"
	"github.com/mark3labs/mcp-go/mcp"
	"strings"
)

// GetImageConfig 获取指定镜像的 OCI 配置文件（如 Entrypoint、Env、Layers 等）
func GetImageConfig() (mcp.Tool, func(context.Context, mcp.CallToolRequest) (*mcp.CallToolResult, error)) {
	tool := mcp.NewTool("get_image_config",
		mcp.WithTitleAnnotation("获取容器镜像的配置信息"),
		mcp.WithDescription("获取容器镜像的配置信息（ConfigFile），包括环境变量、启动命令、工作目录等。自动使用 namespace 中配置的镜像仓库凭证。"),
		mcp.WithString("image", mcp.Required(), mcp.Description("完整的镜像引用，如 'nginx:1.25' 或 'myreg:5000/app:v1'")),
		mcp.WithString("reason", mcp.Description("需要使用该工具的原因")),

		mcp.WithDestructiveHintAnnotation(false),
		mcp.WithReadOnlyHintAnnotation(true),
	)

	handler := func(ctx context.Context, request mcp.CallToolRequest) (*mcp.CallToolResult, error) {
		imageRefStr := strings.TrimSpace(request.GetString("image", ""))
		if imageRefStr == "" {
			return mcp.NewToolResultError("missing required field: image"), nil
		}

		// 从 context 获取租户信息

		clusterCode, ok := ctx.Value(config2.RequestClusterCode).(string)
		if !ok {
			config2.Logger.Error("missing cluster code in context")
			return mcp.NewToolResultError("missing cluster code in context"), nil
		}
		// Step 1: 解析镜像引用
		ref, err := name.ParseReference(imageRefStr)
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("invalid image reference: %v", err)), nil
		}
		registryHost := ref.Context().RegistryStr()
		auth, err := getDockerAuthFromNamespace(ctx, clusterCode, registryHost)
		if err != nil {
			config2.Logger.Warn("Failed to get docker auth, falling back to anonymous", "error", err)
			auth = authn.Anonymous
		}
		// 拉取镜像 ConfigFile
		img, err := remote.Image(ref, remote.WithAuth(auth), remote.WithContext(ctx))
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("failed to fetch image config: %v", err)), nil
		}

		configFile, err := img.ConfigFile()
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("failed to get config file: %v", err)), nil
		}

		data, _ := json.Marshal(configFile)
		return &mcp.CallToolResult{
			Content: []mcp.Content{
				mcp.TextContent{Type: "text", Text: string(data)},
			},
			StructuredContent: json.RawMessage(data),
		}, nil
	}

	return tool, handler
}

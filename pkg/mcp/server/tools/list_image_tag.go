package tools

import (
	"context"
	"encoding/json"
	"fmt"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	"strings"

	"github.com/efucloud/kube-keeper/pkg/utils"
	"github.com/google/go-containerregistry/pkg/authn"
	"github.com/google/go-containerregistry/pkg/name"
	"github.com/google/go-containerregistry/pkg/v1/remote"
	"github.com/mark3labs/mcp-go/mcp"
)

// ListImageTags 列出指定镜像仓库中的所有可用 tags
func ListImageTags() (mcp.Tool, func(context.Context, mcp.CallToolRequest) (*mcp.CallToolResult, error)) {
	tool := mcp.NewTool("list_image_tags",
		mcp.WithTitleAnnotation("镜像Tag列表获取，也可获取单个镜像的最新版本"),
		mcp.WithString("image", mcp.Required(), mcp.Description("镜像名称（可含或不含 tag），如 'nginx' 或 'myreg:5000/myapp'")),
		mcp.WithString("reason", mcp.Description("需要使用该工具的原因")),
		mcp.WithDestructiveHintAnnotation(false),
		mcp.WithReadOnlyHintAnnotation(true),
	)
	handler := func(ctx context.Context, request mcp.CallToolRequest) (*mcp.CallToolResult, error) {

		imageInput := strings.TrimSpace(request.GetString("image", ""))
		if imageInput == "" {
			return mcp.NewToolResultError("missing required field: image"), nil
		}

		// 标准化为 repo（不含 tag）
		fullRepo, err := utils.NormalizeImageToRepo(imageInput)
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("invalid image format: %v", err)), nil
		}

		repoRef, err := name.NewRepository(fullRepo)
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("failed to parse repository: %v", err)), nil
		}
		registryHost := repoRef.RegistryStr()

		// 获取上下文

		clusterCode, ok := ctx.Value(config2.RequestClusterCode).(string)
		if !ok {
			config2.Logger.Error("missing cluster code in context")
			return mcp.NewToolResultError("missing cluster code in context"), nil
		}
		// 👇 复用统一认证函数
		auth, err := getDockerAuthFromNamespace(ctx, clusterCode, registryHost)
		if err != nil {
			config2.Logger.Warn("Failed to get docker auth, falling back to anonymous", "error", err)
			auth = authn.Anonymous
		}

		// 调用 remote.List
		tags, err := remote.List(repoRef, remote.WithAuth(auth))
		if err != nil {
			config2.Logger.Errorf("Failed to list image: %s tags , err: %v", imageInput, err)
			return mcp.NewToolResultError(fmt.Sprintf("failed to list tags (check permissions or image existence): %v", err)), nil
		}

		// 去重 + 过滤无效 tag（倒序即最新在前）
		tagSet := make(map[string]bool)
		var validTags []string
		for i := len(tags) - 1; i >= 0; i-- {
			tag := strings.TrimSpace(tags[i])
			if tag == "" || strings.HasPrefix(tag, "sha256:") || tagSet[tag] {
				continue
			}
			tagSet[tag] = true
			validTags = append(validTags, tag)
		}

		result := map[string]interface{}{
			"repository": fullRepo,
			"tags":       validTags,
			"total":      len(validTags),
		}

		data, _ := json.Marshal(result)
		return &mcp.CallToolResult{
			Content: []mcp.Content{
				mcp.TextContent{Type: "text", Text: string(data)},
			},
			StructuredContent: json.RawMessage(data),
		}, nil
	}

	return tool, handler
}

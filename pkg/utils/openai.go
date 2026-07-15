package utils

import (
	"encoding/json"
	"github.com/mark3labs/mcp-go/mcp"
	openai "github.com/sashabaranov/go-openai"
)

func ConvertMCPToOpenAITools(mcpTools []mcp.Tool) []openai.Tool {
	var tools []openai.Tool
	for _, t := range mcpTools {
		// 假设 inputSchema 是 JSON Schema
		schemaBytes, _ := json.Marshal(t.InputSchema)
		var parameters map[string]any
		if json.Unmarshal(schemaBytes, &parameters) == nil {
			tools = append(tools, openai.Tool{
				Type: "function",
				Function: &openai.FunctionDefinition{
					Name:        t.Name,
					Description: t.Description,
					Parameters:  parameters,
				},
			})
		}

	}
	return tools
}

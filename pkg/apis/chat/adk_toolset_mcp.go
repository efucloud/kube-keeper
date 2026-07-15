package chat

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/embeds"
	client2 "github.com/efucloud/kube-keeper/pkg/mcp/client"
	gojsonschema "github.com/google/jsonschema-go/jsonschema"
	"github.com/mark3labs/mcp-go/mcp"
	"google.golang.org/adk/agent"
	adktool "google.golang.org/adk/tool"
	"google.golang.org/adk/tool/functiontool"
)

type mcpADKToolset struct {
	req       ChatRequest
	tools     []mcp.Tool
	skill     *embeds.DynamicSkill
	mcpClient *client2.MCPClient
}

func newMCPADKToolset(req ChatRequest, tools []mcp.Tool, skill *embeds.DynamicSkill) adktool.Toolset {
	return &mcpADKToolset{
		req:       req,
		tools:     tools,
		skill:     skill,
		mcpClient: buildMCPClient(req),
	}
}

func (t *mcpADKToolset) Name() string {
	return "cluster-mcp-toolset"
}

func (t *mcpADKToolset) Tools(ctx agent.ReadonlyContext) ([]adktool.Tool, error) {
	if len(t.tools) == 0 {
		return nil, nil
	}

	results := make([]adktool.Tool, 0, len(t.tools))
	for _, item := range t.tools {
		toolItem, err := t.convertTool(item)
		if err != nil {
			return nil, err
		}
		results = append(results, toolItem)
	}
	return results, nil
}

func (t *mcpADKToolset) convertTool(item mcp.Tool) (adktool.Tool, error) {
	_, inputSchema, err := buildADKInputSchema(item)
	if err != nil {
		return nil, fmt.Errorf("build input schema for tool %s: %w", item.Name, err)
	}

	description := strings.TrimSpace(item.Description)

	return functiontool.New[map[string]any, map[string]any](functiontool.Config{
		Name:                item.Name,
		Description:         description,
		InputSchema:         inputSchema,
		RequireConfirmation: false,
	}, func(toolCtx adktool.Context, args map[string]any) (map[string]any, error) {
		body, err := json.Marshal(args)
		if err != nil {
			return nil, fmt.Errorf("marshal args for tool %s: %w", item.Name, err)
		}
		config.Logger.Debugf("adk mcp tool call start, requestId: %s, sessionId: %s, skillId: %s, tool: %s, args: %s",
			strings.TrimSpace(t.req.RequestId),
			strings.TrimSpace(t.req.SessionId),
			skillID(t.skill),
			item.Name,
			string(body),
		)
		result, err := callMCPToolStructured(toolCtx, t.req, t.mcpClient, item.Name, json.RawMessage(body))
		if err != nil {
			config.Logger.Errorf("adk mcp tool call failed, requestId: %s, sessionId: %s, skillId: %s, tool: %s, error: %v",
				strings.TrimSpace(t.req.RequestId),
				strings.TrimSpace(t.req.SessionId),
				skillID(t.skill),
				item.Name,
				err,
			)
			return nil, err
		}
		resultBody, marshalErr := json.Marshal(result)
		if marshalErr != nil {
			config.Logger.Debugf("adk mcp tool call success, requestId: %s, sessionId: %s, skillId: %s, tool: %s, result_marshal_error: %v",
				strings.TrimSpace(t.req.RequestId),
				strings.TrimSpace(t.req.SessionId),
				skillID(t.skill),
				item.Name,
				marshalErr,
			)
		} else {
			config.Logger.Debugf("adk mcp tool call success, requestId: %s, sessionId: %s, skillId: %s, tool: %s, result: %s",
				strings.TrimSpace(t.req.RequestId),
				strings.TrimSpace(t.req.SessionId),
				skillID(t.skill),
				item.Name,
				string(resultBody),
			)
		}
		return result, nil
	})
}

func buildADKInputSchema(item mcp.Tool) (json.RawMessage, *gojsonschema.Schema, error) {
	rawSchema, err := marshalMCPInputSchema(item)
	if err != nil {
		return nil, nil, err
	}
	if len(rawSchema) == 0 {
		rawSchema = json.RawMessage(`{"type":"object"}`)
	}

	var schema gojsonschema.Schema
	if err := json.Unmarshal(rawSchema, &schema); err != nil {
		return nil, nil, err
	}
	return rawSchema, &schema, nil
}

func marshalMCPInputSchema(item mcp.Tool) (json.RawMessage, error) {
	if len(item.RawInputSchema) > 0 {
		return item.RawInputSchema, nil
	}

	rawSchema, err := json.Marshal(item.InputSchema)
	if err != nil {
		return nil, err
	}
	return rawSchema, nil
}

func callMCPToolStructured(ctx context.Context, req ChatRequest, mcpClient *client2.MCPClient, toolName string, args json.RawMessage) (map[string]any, error) {
	if mcpClient == nil {
		return nil, fmt.Errorf("mcp client is nil")
	}
	ctxWithCluster := context.WithValue(ctx, config.RequestClusterCode, req.Context.Cluster)
	result, err := mcpClient.CallTool(ctxWithCluster, toolName, args)
	if err != nil {
		return nil, err
	}
	return normalizeMCPResult(result), nil
}

func normalizeMCPResult(result *mcp.CallToolResult) map[string]any {
	payload := map[string]any{
		"status": "success",
	}
	if result == nil {
		payload["output"] = ""
		return payload
	}
	payload["isError"] = result.IsError
	if result.StructuredContent != nil {
		if structured := sanitizeToolPayloadValue(result.StructuredContent); structured != nil {
			payload["structuredContent"] = structured
		}
	}
	if len(result.Content) > 0 {
		texts := make([]string, 0, len(result.Content))
		for _, content := range result.Content {
			if textContent, ok := mcp.AsTextContent(content); ok {
				if text := sanitizeToolJSONText(textContent.Text); strings.TrimSpace(text) != "" {
					texts = append(texts, text)
				}
			}
		}
		payload["output"] = strings.Join(texts, "\n")
	}
	if result.IsError {
		payload["status"] = "error"
	}
	return payload
}

func safeString(v interface{}) string {
	if v == nil {
		return ""
	}
	if s, ok := v.(string); ok {
		return strings.TrimSpace(s)
	}
	return ""
}

func reqResourceKind(req ChatRequest) string {
	if req.Resource == nil {
		return ""
	}
	return req.Resource.Kind
}

func reqResourceName(req ChatRequest) string {
	if req.Resource == nil {
		return ""
	}
	return req.Resource.Name
}

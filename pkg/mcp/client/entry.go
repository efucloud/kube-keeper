package client

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"github.com/efucloud/kube-keeper/pkg/config"
	"net/http"

	"github.com/mark3labs/mcp-go/mcp"
)

type MCPClient struct {
	BaseURL string
	Token   string
	Client  *http.Client
}

func (c *MCPClient) ListTools(ctx context.Context) ([]mcp.Tool, error) {
	reqBody := map[string]any{
		"jsonrpc": "2.0",
		"id":      1,
		"method":  "tools/list",
	}
	body, _ := json.Marshal(reqBody)

	req, _ := http.NewRequestWithContext(ctx, "POST", c.BaseURL, bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")
	if c.Token != "" {
		req.Header.Set("Authorization", "Bearer "+c.Token)
	}

	resp, err := c.Client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var rpcResp struct {
		Result struct {
			Tools []mcp.Tool `json:"tools"`
		} `json:"result"`
		Error *struct {
			Code    int    `json:"code"`
			Message string `json:"message"`
		} `json:"error"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&rpcResp); err != nil {
		return nil, err
	}
	if rpcResp.Error != nil {
		return nil, fmt.Errorf("MCP error %d: %s", rpcResp.Error.Code, rpcResp.Error.Message)
	}
	return rpcResp.Result.Tools, nil
}

func (c *MCPClient) CallTool(ctx context.Context, name string, args json.RawMessage) (*mcp.CallToolResult, error) {
	// 1. 从 Context 中提取集群编码
	clusterCode := ""
	if val := ctx.Value(config.RequestClusterCode); val != nil {
		if code, ok := val.(string); ok {
			clusterCode = code
		}
	}

	params := map[string]any{
		"name":      name,
		"arguments": args,
	}
	reqBody := map[string]any{
		"jsonrpc": "2.0",
		"id":      2,
		"method":  "tools/call",
		"params":  params,
	}
	body, _ := json.Marshal(reqBody)

	req, _ := http.NewRequestWithContext(ctx, "POST", c.BaseURL, bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")
	if c.Token != "" {
		req.Header.Set("Authorization", "Bearer "+c.Token)
	}
	if clusterCode != "" {
		req.Header.Set(config.RequestClusterCode, clusterCode)
	}
	resp, err := c.Client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var rpcResp struct {
		Result *mcp.CallToolResult `json:"result"`
		Error  *struct {
			Code    int    `json:"code"`
			Message string `json:"message"`
		} `json:"error"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&rpcResp); err != nil {
		return nil, err
	}
	if rpcResp.Error != nil {
		return nil, fmt.Errorf("MCP call error %d: %s", rpcResp.Error.Code, rpcResp.Error.Message)
	}
	return rpcResp.Result, nil
}

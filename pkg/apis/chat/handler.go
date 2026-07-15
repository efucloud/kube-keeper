package chat

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/efucloud/common"
	filters2 "github.com/efucloud/kube-keeper/pkg/apis/filters"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/embeds"
	mcpprompt "github.com/efucloud/kube-keeper/pkg/mcp"
	client2 "github.com/efucloud/kube-keeper/pkg/mcp/client"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	restfulspec "github.com/emicklei/go-restful-openapi/v2"
	"github.com/emicklei/go-restful/v3"
	"github.com/mark3labs/mcp-go/mcp"
)

type AiChatResource struct {
	Router *Router
}

func (cp *AiChatResource) AddWebService(ws *restful.WebService) {
	apiInfo := common.ApiInfo{
		Tag:         "ai-chat",
		Description: "AI助手",
	}
	common.RegisterApiInfo(apiInfo)
	ws.Route(ws.POST(config2.ClusterStreamAPIPrefix).
		Consumes(restful.MIME_JSON).
		Produces("application/x-ndjson").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求token")).
		Param(ws.HeaderParameter(config2.ClusterAuthHeader, "集群token")).
		Param(ws.PathParameter("cluster", "集群编码").Required(true)).
		To(cp.aiChat).
		Reads(dtos.ChatRequest{}).
		Doc("AI助手").
		Filter(filters2.ClientInfo).
		Filter(filters2.Log).
		Filter(filters2.I18n).
		Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()))
	ws.Route(ws.POST(config2.ClusterStreamAPIPrefix+"/namespace/{namespace}").
		Consumes(restful.MIME_JSON).
		Produces("application/x-ndjson").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求token")).
		Param(ws.HeaderParameter(config2.ClusterAuthHeader, "集群token")).
		Param(ws.PathParameter("cluster", "集群编码").Required(true)).
		To(cp.aiChat).
		Doc("AI助手").
		Filter(filters2.ClientInfo).
		Filter(filters2.Log).
		Filter(filters2.I18n).
		Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()))
}

func (cp *AiChatResource) aiChat(req *restful.Request, resp *restful.Response) {
	ctx := req.Request.Context()
	lang := common.GetLanguageFromReq(req, config2.RequestLanguage)
	ctx = context.WithValue(ctx, config2.RequestLanguage, lang)

	payload, err := parsePayload(req)
	if err != nil {
		http.Error(resp.ResponseWriter, err.Error(), http.StatusBadRequest)
		return
	}
	domainReq := buildDomainRequest(req, payload)
	domainReq.Context.Language = normalizeChatLanguage(lang)
	if domainReq.SkillId != "" {
		domainReq.MatchedSkill = findSkillByID(domainReq.SkillId)
	}
	if config2.ApplicationConfig.ChatConfig.UseTool {
		domainReq.AvailableTools = loadBuiltinMCPTools(ctx, domainReq)
	}

	stream := cp.Router.Route(ctx, domainReq)

	resp.AddHeader("Content-Type", "application/x-ndjson")
	resp.WriteHeader(http.StatusOK)

	flusher, ok := resp.ResponseWriter.(http.Flusher)
	if !ok {
		http.Error(resp.ResponseWriter, "Streaming unsupported", http.StatusInternalServerError)
		return
	}

	encoder := json.NewEncoder(resp.ResponseWriter)

	for event := range stream {

		encoder.Encode(event)

		flusher.Flush()
	}
}

func isEnglishChatLanguage(language string) bool {
	normalized := strings.ToLower(strings.TrimSpace(language))
	return normalized == "english" ||
		normalized == "en" ||
		strings.HasPrefix(normalized, "en-") ||
		strings.HasPrefix(normalized, "en_")
}

func normalizeChatLanguage(language string) string {
	if isEnglishChatLanguage(language) {
		return "English"
	}
	return "中文"
}

func parsePayload(req *restful.Request) (*dtos.ChatHTTPPayload, error) {

	var payload dtos.ChatHTTPPayload

	if err := req.ReadEntity(&payload); err != nil {
		return nil, fmt.Errorf("invalid json")
	}
	if strings.TrimSpace(payload.Message) == "" && payload.A2UI == nil {
		return nil, fmt.Errorf("message is required")
	}

	return &payload, nil
}

func buildDomainRequest(req *restful.Request, payload *dtos.ChatHTTPPayload) ChatRequest {
	cncfInfo := strings.TrimSpace(payload.CNCF)
	if cncfInfo != "" {
		if detail := mcpprompt.GetCncfInformation(cncfInfo); detail != "" {
			cncfInfo = detail
		}
	}

	ctxInfo := ChatContext{
		Cluster:   req.PathParameter("cluster"),
		Namespace: req.PathParameter("namespace"),
		ApiServer: buildApiServer(req),
	}

	var resource *ResourceContext

	if payload.Kind != "" {
		resource = &ResourceContext{
			Kind:       payload.Kind,
			Name:       payload.Name,
			ApiVersion: payload.ApiVersion,
		}
	}

	return ChatRequest{
		Mode:      ParseMode(payload.Mode),
		Question:  payload.Message,
		SessionId: payload.SessionId,
		RequestId: payload.RequestId,
		SkillId:   payload.SkillId,
		AuthToken: filters2.GetRequestToken(config2.AuthHeader, req),
		Context:   ctxInfo,
		Resource:  resource,
		CNCFInfo:  cncfInfo,
		A2UI:      payload.A2UI,
	}
}

func buildApiServer(req *restful.Request) string {

	scheme := "https"

	if forwardedProto := strings.TrimSpace(req.Request.Header.Get("X-Forwarded-Proto")); forwardedProto != "" {
		if strings.EqualFold(forwardedProto, "http") {
			scheme = "http"
		}
	} else if req.Request.TLS == nil {
		scheme = "http"
	}

	host := req.Request.Host
	cluster := req.PathParameter("cluster")

	return fmt.Sprintf("%s://%s/api/v1/proxy/%s", scheme, host, cluster)
}

func loadBuiltinMCPTools(ctx context.Context, req ChatRequest) []mcp.Tool {
	if strings.TrimSpace(req.Context.Cluster) == "" {
		return nil
	}

	mcpClient := &client2.MCPClient{
		BaseURL: fmt.Sprintf("http://localhost:%d/api/stream1/cluster/%s/%s/check",
			config2.ServerPort, req.Context.Cluster, config2.ChatBuiltin),
		Token:  req.AuthToken,
		Client: &http.Client{Timeout: 120 * time.Second},
	}

	mcpTools, err := mcpClient.ListTools(ctx)
	if err != nil {
		config2.Logger.Warnf("Failed to list MCP tools: %v", err)
		return nil
	}
	return mcpTools
	// if req.MatchedSkill == nil || len(req.MatchedSkill.Tools) == 0 {
	// 	return mcpTools
	// }

	// allowSet := make(map[string]struct{}, len(req.MatchedSkill.Tools))
	// for _, name := range req.MatchedSkill.Tools {
	// 	allowSet[name] = struct{}{}
	// }

	// filterTools := make([]mcp.Tool, 0, len(mcpTools))
	// for _, tool := range mcpTools {
	// 	if _, ok := allowSet[tool.Name]; ok {
	// 		filterTools = append(filterTools, tool)
	// 	}
	// }
	// return filterTools
}

func findSkillByID(skillID string) *embeds.DynamicSkill {
	skillID = strings.TrimSpace(skillID)
	if skillID == "" {
		return nil
	}

	for _, skill := range embeds.DynamicSkills {
		if skill.ID == skillID {
			copied := skill
			return &copied
		}
	}
	return nil
}

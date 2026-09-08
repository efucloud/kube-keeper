package chat

import (
	"context"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/efucloud/common"
	filters2 "github.com/efucloud/kube-keeper/pkg/apis/filters"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	mcpprompt "github.com/efucloud/kube-keeper/pkg/mcp"
	client2 "github.com/efucloud/kube-keeper/pkg/mcp/client"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	restfulspec "github.com/emicklei/go-restful-openapi/v2"
	"github.com/emicklei/go-restful/v3"
	"github.com/gorilla/websocket"
	"github.com/mark3labs/mcp-go/mcp"
)

const (
	chatWebSocketReadLimit  = 1 << 20
	chatWebSocketReadWait   = 10 * time.Second
	chatWebSocketWriteWait  = 10 * time.Second
	chatWebSocketPingPeriod = 30 * time.Second
)

var chatWebSocketUpgrader = websocket.Upgrader{
	CheckOrigin: func(_ *http.Request) bool { return true },
}

type AiChatResource struct {
	Router *Router
}

func (cp *AiChatResource) AddWebService(ws *restful.WebService) {
	apiInfo := common.ApiInfo{
		Tag:         "ai-chat",
		Description: "AI助手",
	}
	common.RegisterApiInfo(apiInfo)
	ws.Route(ws.GET(config2.ClusterWebsocketAPIPrefix+"/chat").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求token")).
		Param(ws.QueryParameter("access_token", "浏览器 WebSocket 请求Token")).
		Param(ws.QueryParameter("lang", "回答语言")).
		Param(ws.HeaderParameter(config2.ClusterAuthHeader, "集群token")).
		Param(ws.PathParameter("cluster", "集群编码").Required(true)).
		To(cp.aiChatWebSocket).
		Returns(http.StatusSwitchingProtocols, "WebSocket 连接成功", dtos.StreamEvent{}).
		Doc("AI助手 WebSocket").
		Filter(filters2.ClientInfo).
		Filter(filters2.Log).
		Filter(filters2.I18n).
		Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()))
	ws.Route(ws.GET(config2.ClusterNamespaceWebsocketAPIPrefix+"/chat").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求token")).
		Param(ws.QueryParameter("access_token", "浏览器 WebSocket 请求Token")).
		Param(ws.QueryParameter("lang", "回答语言")).
		Param(ws.HeaderParameter(config2.ClusterAuthHeader, "集群token")).
		Param(ws.PathParameter("cluster", "集群编码").Required(true)).
		Param(ws.PathParameter("namespace", "Namespace").Required(true)).
		To(cp.aiChatWebSocket).
		Returns(http.StatusSwitchingProtocols, "WebSocket 连接成功", dtos.StreamEvent{}).
		Doc("AI助手 WebSocket").
		Filter(filters2.ClientInfo).
		Filter(filters2.Log).
		Filter(filters2.I18n).
		Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()))
}

func (cp *AiChatResource) aiChatWebSocket(req *restful.Request, resp *restful.Response) {
	conn, err := chatWebSocketUpgrader.Upgrade(resp.ResponseWriter, req.Request, nil)
	if err != nil {
		config2.Logger.Errorf("upgrade AI chat WebSocket failed: %v", err)
		return
	}
	defer conn.Close()

	conn.SetReadLimit(chatWebSocketReadLimit)
	if err := conn.SetReadDeadline(time.Now().Add(chatWebSocketReadWait)); err != nil {
		writeChatWebSocketClose(conn, websocket.CloseInternalServerErr, "failed to initialize connection")
		return
	}
	var payload dtos.ChatHTTPPayload
	if err := conn.ReadJSON(&payload); err != nil {
		writeChatWebSocketClose(conn, websocket.CloseInvalidFramePayloadData, "invalid chat request")
		return
	}
	if err := conn.SetReadDeadline(time.Time{}); err != nil {
		writeChatWebSocketClose(conn, websocket.CloseInternalServerErr, "failed to initialize connection")
		return
	}
	if strings.TrimSpace(payload.Message) == "" {
		writeChatWebSocketClose(conn, websocket.ClosePolicyViolation, "message is required")
		return
	}

	ctx, cancel := context.WithCancel(req.Request.Context())
	defer cancel()
	go watchChatWebSocketClose(cancel, conn)

	lang := common.GetLanguageFromReq(req, config2.RequestLanguage)
	ctx = context.WithValue(ctx, config2.RequestLanguage, lang)
	domainReq := buildDomainRequest(req, &payload)
	domainReq.Context.Language = normalizeChatLanguage(lang)
	if config2.ApplicationConfig.ChatConfig.UseTool {
		domainReq.AvailableTools = loadBuiltinMCPTools(ctx, domainReq)
	}

	stream := cp.Router.Route(ctx, domainReq)
	pingTicker := time.NewTicker(chatWebSocketPingPeriod)
	defer pingTicker.Stop()
	for {
		select {
		case <-ctx.Done():
			return
		case event, ok := <-stream:
			if !ok {
				writeChatWebSocketClose(conn, websocket.CloseNormalClosure, "chat complete")
				return
			}
			if err := writeChatWebSocketJSON(conn, event); err != nil {
				cancel()
				return
			}
		case <-pingTicker.C:
			if err := conn.WriteControl(websocket.PingMessage, nil, time.Now().Add(chatWebSocketWriteWait)); err != nil {
				cancel()
				return
			}
		}
	}
}

func watchChatWebSocketClose(cancel context.CancelFunc, conn *websocket.Conn) {
	for {
		if _, _, err := conn.ReadMessage(); err != nil {
			cancel()
			return
		}
	}
}

func writeChatWebSocketJSON(conn *websocket.Conn, value any) error {
	if err := conn.SetWriteDeadline(time.Now().Add(chatWebSocketWriteWait)); err != nil {
		return err
	}
	return conn.WriteJSON(value)
}

func writeChatWebSocketClose(conn *websocket.Conn, code int, reason string) {
	_ = conn.WriteControl(
		websocket.CloseMessage,
		websocket.FormatCloseMessage(code, reason),
		time.Now().Add(chatWebSocketWriteWait),
	)
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

	authToken := filters2.GetRequestToken(config2.AuthHeader, req)
	if authToken == "" {
		authToken = req.QueryParameter("access_token")
	}

	return ChatRequest{
		Mode:      ParseMode(payload.Mode),
		SkillId:   payload.SkillId,
		Question:  payload.Message,
		SessionId: payload.SessionId,
		RequestId: payload.RequestId,
		AuthToken: authToken,
		Context:   ctxInfo,
		Resource:  resource,
		CNCFInfo:  cncfInfo,
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
		BaseURL: fmt.Sprintf("http://localhost:%d/api/stream/cluster/%s/mcp",
			config2.ServerPort, req.Context.Cluster),
		Token:  req.AuthToken,
		Client: &http.Client{Timeout: 120 * time.Second},
	}

	mcpTools, err := mcpClient.ListTools(ctx)
	if err != nil {
		config2.Logger.Warnf("Failed to list MCP tools: %v", err)
		return nil
	}
	return mcpTools
}

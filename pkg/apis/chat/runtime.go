package chat

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"sync"
	"time"

	"github.com/efucloud/kube-keeper/pkg/config"
	mcpprompt "github.com/efucloud/kube-keeper/pkg/mcp"
	client2 "github.com/efucloud/kube-keeper/pkg/mcp/client"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/efucloud/kube-keeper/pkg/utils"
	"github.com/mark3labs/mcp-go/mcp"
	openai "github.com/sashabaranov/go-openai"
)

type ChatContext = dtos.ChatContext

type ResourceContext = dtos.ResourceContext

type StreamEvent = dtos.StreamEvent

// ChatRequest 内部统一请求模型
type ChatRequest struct {
	Mode           Mode
	Question       string
	SessionId      string
	RequestId      string
	AuthToken      string
	Context        ChatContext
	Resource       *ResourceContext
	CNCFInfo       string
	AvailableTools []mcp.Tool
}

const (
	defaultSessionTTL = 30 * time.Minute
	toolPreviewLimit  = 1200
)

func ensureAssistantMessageID(req ChatRequest) string {
	return newEventID("msg")
}

type visibleMessage struct {
	Role    string
	Content string
}

type visibleSession struct {
	Messages []visibleMessage
	Expires  time.Time
}

type chatPromptData struct {
	Lang            string
	NowRFC3339      string
	NowWithTimezone string
	Cluster         string
	Namespace       string
	Kind            string
	Name            string
	ApiVersion      string
	CNCF            string
	DuckDuckGo      bool
}

var sessionStore = struct {
	mu   sync.RWMutex
	data map[string]visibleSession
}{
	data: make(map[string]visibleSession),
}

func buildFallbackSystemPrompt(req ChatRequest) string {
	var builder strings.Builder
	if isEnglishChatLanguage(req.Context.Language) {
		builder.WriteString("You are a Kubernetes expert. Give accurate, evidence-based, safe, and actionable answers.")
	} else {
		builder.WriteString("你是一名 Kubernetes 专家。请给出准确、基于证据、安全且可执行的回答。")
	}
	if isEnglishChatLanguage(req.Context.Language) {
		builder.WriteString("\n\n### Current Context")
	} else {
		builder.WriteString("\n\n### 当前上下文")
	}
	if req.Context.Cluster != "" {
		if isEnglishChatLanguage(req.Context.Language) {
			builder.WriteString("\n- Cluster: " + req.Context.Cluster)
		} else {
			builder.WriteString("\n- 集群: " + req.Context.Cluster)
		}
	}
	if isEnglishChatLanguage(req.Context.Language) {
		builder.WriteString("\n- Current Time: " + currentPromptTimeWithTimezone())
	} else {
		builder.WriteString("\n- 当前时间（含时区）: " + currentPromptTimeWithTimezone())
	}
	if req.Context.Namespace != "" {
		if isEnglishChatLanguage(req.Context.Language) {
			builder.WriteString("\n- Namespace: " + req.Context.Namespace)
		} else {
			builder.WriteString("\n- 命名空间: " + req.Context.Namespace)
		}
	}
	if req.Resource != nil {
		if isEnglishChatLanguage(req.Context.Language) {
			builder.WriteString("\n- Resource Kind: " + req.Resource.Kind)
		} else {
			builder.WriteString("\n- 资源类型: " + req.Resource.Kind)
		}
		if req.Resource.Name != "" {
			if isEnglishChatLanguage(req.Context.Language) {
				builder.WriteString("\n- Resource Name: " + req.Resource.Name)
			} else {
				builder.WriteString("\n- 资源名称: " + req.Resource.Name)
			}
		}
		if req.Resource.ApiVersion != "" {
			if isEnglishChatLanguage(req.Context.Language) {
				builder.WriteString("\n- API Version: " + req.Resource.ApiVersion)
			} else {
				builder.WriteString("\n- 资源版本: " + req.Resource.ApiVersion)
			}
		}
	}
	if req.CNCFInfo != "" {
		if isEnglishChatLanguage(req.Context.Language) {
			builder.WriteString("\n- CNCF Context: " + req.CNCFInfo)
		} else {
			builder.WriteString("\n- CNCF 项目信息: " + req.CNCFInfo)
		}
	}
	return builder.String()
}

func buildAgentSystemPrompt(req ChatRequest) string {
	systemData := chatPromptData{
		Lang:            req.Context.Language,
		NowRFC3339:      time.Now().UTC().Format(time.RFC3339),
		NowWithTimezone: currentPromptTimeWithTimezone(),
		Cluster:         req.Context.Cluster,
		Namespace:       req.Context.Namespace,
		CNCF:            req.CNCFInfo,
	}
	if req.Resource != nil {
		systemData.Kind = req.Resource.Kind
		systemData.Name = req.Resource.Name
		systemData.ApiVersion = req.Resource.ApiVersion
	}

	renderedSystemPrompt, errorData := utils.TemplateRender("kubernetes-expert-system", mcpprompt.KubernetesExpertSystemPrompt, systemData)
	if errorData.IsNil() && strings.TrimSpace(renderedSystemPrompt) != "" {
		return renderedSystemPrompt
	}

	return buildFallbackSystemPrompt(req)
}

func currentPromptTimeWithTimezone() string {
	now := time.Now()
	locationName := strings.TrimSpace(now.Location().String())
	if locationName == "" {
		locationName = "Local"
	}
	return fmt.Sprintf(
		"%s (%s, UTC%s)",
		now.Format("2006-01-02T15:04:05Z07:00"),
		locationName,
		now.Format("-07:00"),
	)
}

func ensureSession(req ChatRequest) (ChatRequest, []visibleMessage, bool) {
	startVisibleSessionJanitor()
	now := time.Now()

	if strings.TrimSpace(req.SessionId) == "" {
		req.SessionId = utils.GenerateDatabaseId()
		return req, nil, true
	}

	sessionStore.mu.RLock()
	sess, ok := sessionStore.data[req.SessionId]
	sessionStore.mu.RUnlock()
	if !ok {
		return req, nil, true
	}
	if now.After(sess.Expires) {
		sessionStore.mu.Lock()
		delete(sessionStore.data, req.SessionId)
		sessionStore.mu.Unlock()
		return req, nil, true
	}

	history := make([]visibleMessage, len(sess.Messages))
	copy(history, sess.Messages)
	return req, history, false
}

func appendSessionHistory(sessionID string, history []visibleMessage, userInput, assistantOutput string) {
	if strings.TrimSpace(sessionID) == "" {
		return
	}

	newHistory := make([]visibleMessage, 0, len(history)+2)
	newHistory = append(newHistory, history...)
	newHistory = append(newHistory, visibleMessage{
		Role:    openai.ChatMessageRoleUser,
		Content: userInput,
	})
	newHistory = append(newHistory, visibleMessage{
		Role:    openai.ChatMessageRoleAssistant,
		Content: assistantOutput,
	})

	sessionStore.mu.Lock()
	sessionStore.data[sessionID] = visibleSession{
		Messages: newHistory,
		Expires:  time.Now().Add(defaultSessionTTL),
	}
	sessionStore.mu.Unlock()
}

func toOpenAIMessages(history []visibleMessage) []openai.ChatCompletionMessage {
	if len(history) == 0 {
		return nil
	}
	result := make([]openai.ChatCompletionMessage, 0, len(history))
	for _, message := range history {
		role := strings.TrimSpace(message.Role)
		if role == "" {
			continue
		}
		result = append(result, openai.ChatCompletionMessage{
			Role:    role,
			Content: message.Content,
		})
	}
	return result
}

func buildMCPClient(req ChatRequest) *client2.MCPClient {
	cluster := strings.TrimSpace(req.Context.Cluster)
	if cluster == "" {
		return nil
	}

	return &client2.MCPClient{
		BaseURL: fmt.Sprintf("http://localhost:%d/api/stream/cluster/%s/%s/mcp",
			config.ServerPort, cluster),
		Token:  req.AuthToken,
		Client: &http.Client{Timeout: 120 * time.Second},
	}
}

func emitEvent(ctx context.Context, ch chan<- StreamEvent, event StreamEvent) bool {
	select {
	case <-ctx.Done():
		return false
	case ch <- event:
		return true
	}
}

func withRequestMeta(req ChatRequest, event StreamEvent) StreamEvent {
	if event.RequestId == "" {
		event.RequestId = req.RequestId
	}
	if event.SessionId == "" {
		event.SessionId = req.SessionId
	}
	return event
}

func encodePlan(plan interface{}) string {
	body, err := json.Marshal(plan)
	if err != nil {
		return fmt.Sprintf("%v", plan)
	}
	return string(body)
}

func truncateForEvent(content string, maxLen int) string {
	if maxLen <= 0 || len(content) <= maxLen {
		return content
	}
	return content[:maxLen] + "..."
}

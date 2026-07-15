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
	"github.com/efucloud/kube-keeper/pkg/embeds"
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
	SkillId        string
	AuthToken      string
	Context        ChatContext
	Resource       *ResourceContext
	CNCFInfo       string
	MatchedSkill   *embeds.DynamicSkill
	AvailableTools []mcp.Tool
	A2UI           *dtos.A2UIInteractionInput
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
	CurrentSkillName  string
	SkillInstructions string
	A2UISchemaSummary string
	Lang              string
	NowRFC3339        string
	NowWithTimezone   string
	Cluster           string
	Namespace         string
	Kind              string
	Name              string
	ApiVersion        string
	CNCF              string
	DuckDuckGo        bool
}

var sessionStore = struct {
	mu   sync.RWMutex
	data map[string]visibleSession
}{
	data: make(map[string]visibleSession),
}

func buildFallbackSystemPrompt(req ChatRequest) string {
	base := mcpprompt.DefaultZhSystemPrompt
	if isEnglishChatLanguage(req.Context.Language) {
		base = mcpprompt.DefaultEnSystemPrompt
	}

	var builder strings.Builder
	builder.WriteString(base)
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
	if isEnglishChatLanguage(req.Context.Language) {
		builder.WriteString("\n- Current mode: agent")
	} else {
		builder.WriteString("\n- 当前模式: agent")
	}

	return appendLanguageHardRequirement(builder.String(), req.Context.Language)
}

func buildAgentSystemPrompt(req ChatRequest, skill *embeds.DynamicSkill) string {
	skillName := "通用 Kubernetes 助手"
	if isEnglishChatLanguage(req.Context.Language) {
		skillName = "Generic Kubernetes Assistant"
	}
	if skill != nil {
		if resolvedName := renderSkillNameByLanguage(skill, req.Context.Language); resolvedName != "" {
			skillName = resolvedName
		} else if strings.TrimSpace(skill.ID) != "" {
			skillName = skill.ID
		}
	}

	skillInstruction := "优先基于上下文和用户问题进行分析，缺少必要参数时先向用户确认，不要猜测。"
	if isEnglishChatLanguage(req.Context.Language) {
		skillInstruction = "Prioritize analysis from context and user question. Ask for missing required parameters first and do not guess."
	}
	selectedInstruction := renderSkillInstructionByLanguage(skill, req.Context.Language)
	if skill != nil && strings.TrimSpace(selectedInstruction) != "" {
		promptData := chatPromptData{
			CurrentSkillName: skillName,
			Lang:             req.Context.Language,
			NowRFC3339:       time.Now().UTC().Format(time.RFC3339),
			NowWithTimezone:  currentPromptTimeWithTimezone(),
			Cluster:          req.Context.Cluster,
			Namespace:        req.Context.Namespace,
			CNCF:             req.CNCFInfo,
		}
		if req.Resource != nil {
			promptData.Kind = req.Resource.Kind
			promptData.Name = req.Resource.Name
			promptData.ApiVersion = req.Resource.ApiVersion
		}
		renderedSkillInstruction, errorData := utils.TemplateRender("skill-"+skill.ID, selectedInstruction, promptData)
		if errorData.IsNil() && strings.TrimSpace(renderedSkillInstruction) != "" {
			skillInstruction = renderedSkillInstruction
		}
	}

	systemData := chatPromptData{
		CurrentSkillName:  skillName,
		SkillInstructions: skillInstruction,
		A2UISchemaSummary: embeds.GetA2UISchemaSummary(req.Context.Language),
		Lang:              req.Context.Language,
		NowRFC3339:        time.Now().UTC().Format(time.RFC3339),
		NowWithTimezone:   currentPromptTimeWithTimezone(),
		Cluster:           req.Context.Cluster,
		Namespace:         req.Context.Namespace,
		CNCF:              req.CNCFInfo,
	}
	if req.Resource != nil {
		systemData.Kind = req.Resource.Kind
		systemData.Name = req.Resource.Name
		systemData.ApiVersion = req.Resource.ApiVersion
	}

	skillAwarePromptTemplate := embeds.GetSystemPromptByLanguage(req.Context.Language)
	if strings.TrimSpace(skillAwarePromptTemplate) == "" {
		skillAwarePromptTemplate = mcpprompt.SkillAwareSystemPrompt
	}
	renderedSystemPrompt, errorData := utils.TemplateRender("skill-aware-system", skillAwarePromptTemplate, systemData)
	if errorData.IsNil() && strings.TrimSpace(renderedSystemPrompt) != "" {
		return appendLanguageHardRequirement(renderedSystemPrompt, req.Context.Language)
	}

	return buildFallbackSystemPrompt(req)
}

func appendLanguageHardRequirement(prompt string, language string) string {
	base := strings.TrimSpace(prompt)
	if base == "" {
		return languageHardRequirement(language)
	}
	return base + "\n\n" + languageHardRequirement(language)
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

func languageHardRequirement(language string) string {
	if isEnglishChatLanguage(language) {
		return strings.Join([]string{
			"## Output Language Hard Requirement (Highest Priority)",
			"- You MUST respond in English only.",
			"- Apply English to all natural-language fields, including plan `goal/title/reason`, tool args text fields such as `reason`, and final conclusions.",
			"- If user input or skill instruction is in Chinese, treat them as constraints only and still output in English.",
			"- Do not output Chinese except exact technical identifiers (resource names, API fields, labels, metric names, and error codes).",
		}, "\n")
	}
	return strings.Join([]string{
		"## 输出语言硬约束（最高优先级）",
		"- 你必须使用中文回答。",
		"- 所有自然语言字段必须使用中文（步骤 title/reason、工具参数 reason、结论建议等）。",
		"- 英文仅可用于技术标识符（资源名、字段名、标签、指标名、错误码等）。",
	}, "\n")
}

func renderSkillInstructionByLanguage(skill *embeds.DynamicSkill, language string) string {
	if skill == nil {
		return ""
	}
	if isEnglishChatLanguage(language) {
		if strings.TrimSpace(skill.InstructionEn) != "" {
			return strings.TrimSpace(skill.InstructionEn)
		}
	}
	return strings.TrimSpace(skill.Instruction)
}

func renderSkillPlanInstructionByLanguage(skill *embeds.DynamicSkill, language string) string {
	if skill == nil {
		return ""
	}
	if isEnglishChatLanguage(language) {
		if strings.TrimSpace(skill.PlanInstructionEn) != "" {
			return strings.TrimSpace(skill.PlanInstructionEn)
		}
	}
	if strings.TrimSpace(skill.PlanInstruction) != "" {
		return strings.TrimSpace(skill.PlanInstruction)
	}
	return ""
}

func renderSkillPlanResultInstructionByLanguage(skill *embeds.DynamicSkill, language string) string {
	if skill == nil {
		return ""
	}
	if isEnglishChatLanguage(language) {
		if strings.TrimSpace(skill.PlanResultInstructionEn) != "" {
			return strings.TrimSpace(skill.PlanResultInstructionEn)
		}
	}
	if strings.TrimSpace(skill.PlanResultInstruction) != "" {
		return strings.TrimSpace(skill.PlanResultInstruction)
	}
	return ""
}

func renderSkillNameByLanguage(skill *embeds.DynamicSkill, language string) string {
	if skill == nil {
		return ""
	}
	if isEnglishChatLanguage(language) {
		if strings.TrimSpace(skill.NameEn) != "" {
			return strings.TrimSpace(skill.NameEn)
		}
		if strings.TrimSpace(skill.ID) != "" {
			return strings.TrimSpace(skill.ID)
		}
	}
	return strings.TrimSpace(skill.Name)
}

func renderSkillDescriptionByLanguage(skill *embeds.DynamicSkill, language string) string {
	if skill == nil {
		return ""
	}
	if isEnglishChatLanguage(language) {
		if strings.TrimSpace(skill.DescriptionEn) != "" {
			return strings.TrimSpace(skill.DescriptionEn)
		}
		return ""
	}
	return strings.TrimSpace(skill.Description)
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

func resolveSkill(req ChatRequest) *embeds.DynamicSkill {
	if req.MatchedSkill != nil {
		return req.MatchedSkill
	}

	if skill := findSkillByID(req.SkillId); skill != nil {
		return skill
	}

	if skill := findDefaultSkill(); skill != nil {
		return skill
	}

	// 兼容历史默认 ID，未配置 default: true 时仍可回落。
	if skill := findSkillByID("k8s-default"); skill != nil {
		return skill
	}

	if len(embeds.DynamicSkills) > 0 {
		copied := embeds.DynamicSkills[0]
		return &copied
	}
	return nil
}

func findDefaultSkill() *embeds.DynamicSkill {
	for _, skill := range embeds.DynamicSkills {
		if !skill.Default {
			continue
		}
		copied := skill
		return &copied
	}
	return nil
}

func filterToolsBySkill(tools []mcp.Tool, skill *embeds.DynamicSkill) []mcp.Tool {
	if !config.ApplicationConfig.ChatConfig.UseSkillToolFilter {
		return tools
	}
	if len(tools) == 0 || skill == nil || len(skill.Tools) == 0 {
		return tools
	}

	allow := make(map[string]struct{}, len(skill.Tools))
	for _, toolName := range skill.Tools {
		allow[toolName] = struct{}{}
	}

	filtered := make([]mcp.Tool, 0, len(tools))
	for _, tool := range tools {
		if _, ok := allow[tool.Name]; ok {
			filtered = append(filtered, tool)
		}
	}
	if len(filtered) == 0 {
		return tools
	}
	return filtered
}

func buildMCPClient(req ChatRequest) *client2.MCPClient {
	cluster := strings.TrimSpace(req.Context.Cluster)
	if cluster == "" {
		return nil
	}

	return &client2.MCPClient{
		BaseURL: fmt.Sprintf("http://localhost:%d/api/stream1/cluster/%s/%s/check",
			config.ServerPort, cluster, config.ChatBuiltin),
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

func skillID(skill *embeds.DynamicSkill) string {
	if skill == nil {
		return ""
	}
	return skill.ID
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

package chat

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/embeds"
	"google.golang.org/adk/agent"
	"google.golang.org/adk/agent/llmagent"
	"google.golang.org/adk/runner"
	"google.golang.org/adk/session"
	adktool "google.golang.org/adk/tool"
	"google.golang.org/genai"
)

const adkAppName = "kube_keeper_chat"

var sharedADKSessionService = newReclaimableSessionService(session.InMemoryService(), adkAppName, adkSessionTTL, adkSessionPruneInterval)

type ADKAgentEngine struct{}

func NewADKAgentEngine() *ADKAgentEngine {
	return &ADKAgentEngine{}
}

func (e *ADKAgentEngine) Run(ctx context.Context, req ChatRequest) <-chan StreamEvent {
	ch := make(chan StreamEvent)
	go func() {
		defer close(ch)
		e.run(ctx, req, ch)
	}()
	return ch
}

func (e *ADKAgentEngine) run(ctx context.Context, req ChatRequest, ch chan<- StreamEvent) {
	runID := newEventID("run")

	if strings.TrimSpace(req.Question) == "" && req.A2UI == nil {
		emitRunError(ctx, ch, req, runID, "message is required", nil)
		return
	}

	req, _, isNew := ensureSession(req)
	emitSessionMeta(ctx, ch, req, isNew)
	emitTaskStarted(ctx, ch, req, runID, map[string]any{
		"engine": "adk",
		"mode":   "agent",
	})

	provider, err := buildProviderRuntime()
	if err != nil {
		emitRunError(ctx, ch, req, runID, err.Error(), map[string]any{
			"engine": "adk",
		})
		return
	}

	skill := resolveSkill(req)
	req.MatchedSkill = skill

	tools := req.AvailableTools
	if len(tools) == 0 {
		tools = loadBuiltinMCPTools(ctx, req)
	}
	tools = filterToolsBySkill(tools, skill)
	req.AvailableTools = tools

	systemPrompt := buildAgentSystemPrompt(req, skill)
	modelImpl := newOpenAIADKModel(provider, req.SessionId, skillID(skill))

	rootAgent, err := llmagent.New(llmagent.Config{
		Name:        "cluster_chat_agent",
		Description: "Kubernetes cluster chat agent powered by ADK",
		Model:       modelImpl,
		Instruction: systemPrompt,
		Toolsets: []adktool.Toolset{
			newMCPADKToolset(req, tools, skill),
		},
	})
	if err != nil {
		emitRunError(ctx, ch, req, runID, err.Error(), map[string]any{
			"engine":  "adk",
			"skillId": skillID(skill),
		})
		return
	}

	messageID := ensureAssistantMessageID(req)

	emitTaskStatus(ctx, ch, req, runID, "ready", map[string]any{
		"provider":  provider.Name,
		"model":     provider.Model,
		"toolCount": len(tools),
		"engine":    "adk",
		"skillId":   skillID(skill),
	})
	emitMessageStart(ctx, ch, req, messageID, "assistant")

	adkRunner, err := runner.New(runner.Config{
		AppName:           adkAppName,
		Agent:             rootAgent,
		SessionService:    sharedADKSessionService,
		AutoCreateSession: true,
	})
	if err != nil {
		emitRunError(ctx, ch, req, runID, err.Error(), map[string]any{
			"engine": "adk",
		})
		return
	}

	userContent := buildADKUserContent(req)
	tracker := newADKEventTracker(req, runID, messageID, skill, ch)

	userID := strings.TrimSpace(req.Context.Cluster)
	if userID == "" {
		userID = "default-cluster"
	}
	for event, runErr := range adkRunner.Run(ctx, userID, req.SessionId, userContent, agent.RunConfig{
		StreamingMode: agent.StreamingModeSSE,
	}) {
		if runErr != nil {
			tracker.fail(ctx, runErr)
			return
		}
		tracker.consume(ctx, event)
	}

	tracker.finish(ctx)
}

func buildADKUserContent(req ChatRequest) *genai.Content {
	if req.A2UI != nil && req.A2UI.ClientAction != nil {
		payload, _ := json.Marshal(req.A2UI.ClientAction)
		return genai.NewContentFromText("A2UI action:\n"+string(payload), genai.RoleUser)
	}

	if req.A2UI != nil {
		payload, _ := json.Marshal(req.A2UI)
		text := strings.TrimSpace(req.Question)
		if text == "" {
			text = string(payload)
		} else {
			text = text + "\n\nA2UI:\n" + string(payload)
		}
		return genai.NewContentFromText(text, genai.RoleUser)
	}

	return genai.NewContentFromText(req.Question, genai.RoleUser)
}

type adkEventTracker struct {
	req             ChatRequest
	runID           string
	messageID       string
	ch              chan<- StreamEvent
	buffer          strings.Builder
	stepMap         map[string]string
	toolCallToStep  map[string]string
	currentToolName map[string]string
	toolCallEventID map[string]string
	stepTitle       map[string]string
	stepReason      map[string]string
	textChunkCount  int
	done            bool
}

func newADKEventTracker(req ChatRequest, runID, messageID string, skill *embeds.DynamicSkill, ch chan<- StreamEvent) *adkEventTracker {
	return &adkEventTracker{
		req:             req,
		runID:           runID,
		messageID:       messageID,
		ch:              ch,
		stepMap:         make(map[string]string),
		toolCallToStep:  make(map[string]string),
		currentToolName: make(map[string]string),
		toolCallEventID: make(map[string]string),
		stepTitle:       make(map[string]string),
		stepReason:      make(map[string]string),
	}
}

func (t *adkEventTracker) consume(ctx context.Context, event *session.Event) {
	if event == nil || event.Content == nil {
		return
	}

	var textBuilder strings.Builder
	for _, part := range event.Content.Parts {
		if part == nil {
			continue
		}
		if part.Text != "" {
			textBuilder.WriteString(part.Text)
		}
	}
	if textBuilder.Len() > 0 {
		t.consumeTextPart(ctx, textBuilder.String(), event.Partial)
	}

	for _, part := range event.Content.Parts {
		if part == nil {
			continue
		}
		switch {
		case part.FunctionCall != nil:
			t.handleFunctionCall(ctx, part.FunctionCall)
		case part.FunctionResponse != nil:
			t.handleFunctionResponse(ctx, event, part.FunctionResponse)
		}
	}
}

func (t *adkEventTracker) consumeTextPart(ctx context.Context, text string, partial bool) {
	nextText := text
	if nextText == "" {
		return
	}

	if partial {
		t.appendTextDelta(ctx, nextText)
		return
	}

	current := t.buffer.String()
	switch {
	case current == "":
		t.appendTextDelta(ctx, nextText)
	case nextText == current:
		config.Logger.Debugf(
			"adk model final text duplicate skipped, requestId: %s, sessionId: %s, skillId: %s, messageId: %s",
			strings.TrimSpace(t.req.RequestId),
			strings.TrimSpace(t.req.SessionId),
			skillID(t.req.MatchedSkill),
			t.messageID,
		)
	case strings.HasPrefix(nextText, current):
		suffix := strings.TrimPrefix(nextText, current)
		if suffix != "" {
			t.appendTextDelta(ctx, suffix)
		}
	default:
		config.Logger.Warnf(
			"adk model final text mismatched streamed buffer, requestId: %s, sessionId: %s, skillId: %s, messageId: %s, streamedLen: %d, finalLen: %d",
			strings.TrimSpace(t.req.RequestId),
			strings.TrimSpace(t.req.SessionId),
			skillID(t.req.MatchedSkill),
			t.messageID,
			len(current),
			len(nextText),
		)
		t.buffer.Reset()
		t.buffer.WriteString(nextText)
	}
}

func (t *adkEventTracker) appendTextDelta(ctx context.Context, text string) {
	if text == "" {
		return
	}
	t.textChunkCount++
	config.Logger.Debugf(
		"adk model text delta, requestId: %s, sessionId: %s, skillId: %s, messageId: %s, chunkIndex: %d, chunk: %q",
		strings.TrimSpace(t.req.RequestId),
		strings.TrimSpace(t.req.SessionId),
		skillID(t.req.MatchedSkill),
		t.messageID,
		t.textChunkCount,
		text,
	)
	t.buffer.WriteString(text)
	emitMessageDelta(ctx, t.ch, t.req, t.messageID, text)
}

func (t *adkEventTracker) handleFunctionCall(ctx context.Context, call *genai.FunctionCall) {
	if call == nil {
		return
	}

	stepID := t.stepMap[call.ID]
	reason := ""
	if len(call.Args) > 0 {
		if body, err := json.Marshal(call.Args); err == nil {
			reason = strings.TrimSpace(extractToolCallReason(string(body)))
		}
	}
	if reason == "" {
		if isEnglishChatLanguage(t.req.Context.Language) {
			reason = "Collect current Kubernetes evidence for the request."
		} else {
			reason = "围绕当前请求收集 Kubernetes 现场信息。"
		}
	}
	if stepID == "" {
		stepID = newEventID("step")
		t.stepMap[call.ID] = stepID
		title := buildAgentStepTitleReason(reason)
		t.stepTitle[stepID] = title
		t.stepReason[stepID] = reason
		emitStepStart(ctx, t.ch, t.req, stepID, title, "running", map[string]any{
			"runId":     t.runID,
			"messageId": t.messageID,
			"reason":    reason,
		})
	} else if t.stepTitle[stepID] == "" {
		t.stepTitle[stepID] = buildAgentStepTitleReason(reason)
	}

	argsText := "{}"
	if len(call.Args) > 0 {
		if body, err := json.Marshal(call.Args); err == nil {
			argsText = string(body)
		}
	}
	t.stepReason[stepID] = reason
	emitStepUpdate(ctx, t.ch, t.req, stepID, t.stepTitle[stepID], "running", map[string]any{
		"runId":     t.runID,
		"messageId": t.messageID,
		"arguments": call.Args,
		"reason":    reason,
	})
	callEventID := newEventID("tool")
	t.toolCallEventID[call.ID] = callEventID
	emitToolCall(ctx, t.ch, t.req, stepID, call.Name, argsText, map[string]any{
		"callId":    call.ID,
		"eventId":   callEventID,
		"runId":     t.runID,
		"messageId": t.messageID,
		"arguments": call.Args,
		"reason":    reason,
	})
	t.toolCallToStep[call.ID] = stepID
	t.currentToolName[call.ID] = call.Name
}

func (t *adkEventTracker) handleFunctionResponse(ctx context.Context, event *session.Event, resp *genai.FunctionResponse) {
	if resp == nil {
		return
	}

	stepID := t.toolCallToStep[resp.ID]
	if stepID == "" {
		stepID = newEventID("step")
	}
	status := toolResponseStatus(resp.Response)
	resultText := marshalAnyCompact(resp.Response)
	reason := firstNonEmpty(t.stepReason[stepID], strings.TrimSpace(extractToolCallReason(resultText)))
	summary := summarizeToolResult(t.req, resp.Response)
	emitToolResult(ctx, t.ch, t.req, stepID, resp.Name, status, resultText, "", map[string]any{
		"callId":    resp.ID,
		"eventId":   firstNonEmpty(t.toolCallEventID[resp.ID], newEventID("tool")),
		"runId":     t.runID,
		"messageId": t.messageID,
		"result":    sanitizeToolPayloadValue(resp.Response),
		"reason":    reason,
	})
	emitStepUpdate(ctx, t.ch, t.req, stepID, firstNonEmpty(t.stepTitle[stepID], resp.Name, "tool execution"), status, map[string]any{
		"runId":     t.runID,
		"messageId": t.messageID,
		"result":    sanitizeToolPayloadValue(resp.Response),
		"reason":    reason,
		"summary":   summary,
	})
	if status == "success" {
		emitStepEnd(ctx, t.ch, t.req, stepID, firstNonEmpty(t.stepTitle[stepID], resp.Name, "tool execution"), "success", map[string]any{
			"runId":   t.runID,
			"reason":  reason,
			"summary": summary,
		})
		if t.req.A2UI != nil {
			emitTaskStatus(ctx, t.ch, t.req, t.runID, "running", map[string]any{
				"agentId": t.req.A2UI.AgentId,
				"taskId":  t.req.A2UI.TaskId,
				"summary": summary,
				"reason":  reason,
			})
		}
	}
}

func toolResponseStatus(value interface{}) string {
	payload, ok := sanitizeToolPayloadValue(value).(map[string]any)
	if !ok {
		return "success"
	}
	if isErr, ok := payload["isError"].(bool); ok && isErr {
		return "error"
	}
	status := strings.ToLower(strings.TrimSpace(safeString(payload["status"])))
	switch status {
	case "error", "failed", "failure":
		return "error"
	case "success":
		return "success"
	default:
		return "success"
	}
}

func (t *adkEventTracker) finish(ctx context.Context) {
	if t.done {
		return
	}
	t.done = true
	content := t.buffer.String()
	config.Logger.Infof(
		"adk model text complete, requestId: %s, sessionId: %s, skillId: %s, messageId: %s, chunks: %d, content: %q",
		strings.TrimSpace(t.req.RequestId),
		strings.TrimSpace(t.req.SessionId),
		skillID(t.req.MatchedSkill),
		t.messageID,
		t.textChunkCount,
		content,
	)
	emitMessageEnd(ctx, t.ch, t.req, t.messageID, content)
	if t.req.A2UI != nil {
		emitTaskStatus(ctx, t.ch, t.req, t.runID, "done", map[string]any{
			"agentId": t.req.A2UI.AgentId,
			"taskId":  t.req.A2UI.TaskId,
			"result": map[string]any{
				"text": content,
			},
		})
	}
	emitRunComplete(ctx, t.ch, t.req, t.runID, "completed", "stop", map[string]any{
		"engine":    "adk",
		"skillId":   skillID(t.req.MatchedSkill),
		"messageId": t.messageID,
		"content":   content,
	})
}

func (t *adkEventTracker) fail(ctx context.Context, err error) {
	if t.done {
		return
	}
	t.done = true
	if t.req.A2UI != nil {
		emitTaskStatus(ctx, t.ch, t.req, t.runID, "error", map[string]any{
			"agentId": t.req.A2UI.AgentId,
			"taskId":  t.req.A2UI.TaskId,
			"error":   err.Error(),
		})
	}
	emitRunError(ctx, t.ch, t.req, t.runID, err.Error(), map[string]any{
		"engine":  "adk",
		"skillId": skillID(t.req.MatchedSkill),
	})
}

func summarizeToolResult(req ChatRequest, value interface{}) string {
	if payload, ok := sanitizeToolPayloadValue(value).(map[string]any); ok {
		status := strings.ToLower(strings.TrimSpace(safeString(payload["status"])))
		if status == "error" || toolResultHasError(payload) {
			if isEnglishChatLanguage(req.Context.Language) {
				return "The tool returned an error. Expand the result to inspect details."
			}
			return "工具返回了错误，可展开结果查看详情。"
		}
		if output := strings.TrimSpace(safeString(payload["output"])); output != "" {
			if isLikelyStructuredText(output) {
				if isEnglishChatLanguage(req.Context.Language) {
					return "The tool returned a result. Expand it to verify whether it matches the goal."
				}
				return "工具已返回结果，可展开查看是否符合预期。"
			}
			return truncateForEvent(output, 160)
		}
		if payload["structuredContent"] != nil {
			if isEnglishChatLanguage(req.Context.Language) {
				return "The tool returned structured data. Expand it to verify whether it matches the goal."
			}
			return "工具已返回结构化结果，可展开查看是否符合预期。"
		}
	}
	if text := strings.TrimSpace(marshalAnyCompact(value)); text != "" && !isLikelyStructuredText(text) {
		return truncateForEvent(text, 160)
	}
	if isEnglishChatLanguage(req.Context.Language) {
		return "The tool finished. Expand the result to inspect details."
	}
	return "工具执行完成，可展开结果查看详情。"
}

func toolResultHasError(payload map[string]any) bool {
	flag, ok := payload["isError"].(bool)
	return ok && flag
}

func isLikelyStructuredText(text string) bool {
	trimmed := strings.TrimSpace(text)
	return strings.HasPrefix(trimmed, "{") || strings.HasPrefix(trimmed, "[")
}

func marshalAnyCompact(value interface{}) string {
	if value == nil {
		return ""
	}
	sanitized := sanitizeToolPayloadValue(value)
	body, err := json.Marshal(sanitized)
	if err != nil {
		return fmt.Sprintf("%v", sanitized)
	}
	return string(body)
}

func reqPreferredAgent(req ChatRequest) string {
	return ""
}

func hintTextOrDefault(value interface{}, language string) string {
	hint := strings.TrimSpace(safeString(value))
	if hint != "" {
		return hint
	}
	if isEnglishChatLanguage(language) {
		return "Pending approval"
	}
	return "待确认变更"
}

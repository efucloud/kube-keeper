package chat

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"iter"
	"sort"
	"strings"
	"sync"
	"time"

	"github.com/efucloud/kube-keeper/pkg/config"
	openai "github.com/sashabaranov/go-openai"
	"google.golang.org/adk/model"
	"google.golang.org/genai"
)

type openAIADKModel struct {
	name      string
	model     string
	client    *openai.Client
	sessionID string
	skillID   string
}

const (
	maxToolResponseBytesForModel           = 16 * 1024
	maxToolResponseStringLen               = 4096
	maxToolResponseArrayItems              = 12
	maxPrometheusToolResponseBytesForModel = 192 * 1024
	maxPrometheusToolResponseStringLen     = 128 * 1024
	maxPrometheusToolResponseArrayItems    = 2048
	defaultContextBudgetChars              = 180 * 1024
	rollingSummaryMaxChars                 = 24 * 1024
	contextCompressionLogPreview           = 256
	rollingSummaryTTL                      = 6 * time.Hour
	rollingSummaryPruneInterval            = 10 * time.Minute
	summaryInstructionZh                   = "以下是同一会话较早历史的滚动摘要。它代表已完成的上下文压缩结果，不要逐字复述；仅在解决当前问题确有必要时引用其中的事实、决策、约束、已确认变更、未完成事项和用户偏好。"
	summaryInstructionEn                   = "The following is a rolling summary of earlier conversation history from the same session. It is the result of context compression. Do not repeat it verbatim; only use the facts, decisions, constraints, confirmed changes, pending work, and user preferences when they are relevant to the current task."
	recentUserTurnsProtectedDefault        = 10
)

type contextCompressionPolicy struct {
	ProtectedUserTurns int
	ProtectAllRecent   bool
}

type compressedSessionMemory struct {
	Summary         string
	LastUpdated     time.Time
	SummarizedCount int
}

var compressedContextStore = struct {
	mu        sync.RWMutex
	data      map[string]compressedSessionMemory
	lastPrune time.Time
	started   bool
}{
	data: make(map[string]compressedSessionMemory),
}

type toolResponseCompactionOptions struct {
	maxBytes            int
	maxStringLen        int
	maxArrayItems       int
	preferStructuredRaw bool
	preserveValuesArray bool
}

func newOpenAIADKModel(runtime *providerRuntime, sessionID string, skillID string) model.LLM {
	startRollingSummaryJanitor()
	return &openAIADKModel{
		name:      runtime.Name,
		model:     runtime.Model,
		client:    runtime.Client,
		sessionID: strings.TrimSpace(sessionID),
		skillID:   strings.TrimSpace(skillID),
	}
}

func (m *openAIADKModel) Name() string {
	return firstNonEmpty(strings.TrimSpace(m.model), strings.TrimSpace(m.name))
}

func (m *openAIADKModel) GenerateContent(ctx context.Context, req *model.LLMRequest, stream bool) iter.Seq2[*model.LLMResponse, error] {
	return func(yield func(*model.LLMResponse, error) bool) {
		if req == nil {
			yield(nil, fmt.Errorf("llm request is nil"))
			return
		}

		openAIReq, err := m.buildChatCompletionRequest(req, stream)
		if err != nil {
			yield(nil, err)
			return
		}

		if stream {
			m.streamCompletion(ctx, openAIReq, yield)
			return
		}

		resp, err := m.client.CreateChatCompletion(ctx, openAIReq)
		if err != nil {
			yield(nil, err)
			return
		}
		if len(resp.Choices) == 0 {
			yield(&model.LLMResponse{
				Content:      genai.NewContentFromText("", genai.RoleModel),
				FinishReason: genai.FinishReasonStop,
			}, nil)
			return
		}

		llmResp, err := chatCompletionMessageToLLMResponse(resp.Choices[0].Message, string(resp.Choices[0].FinishReason), usageToGenAI(resp.Usage))
		if err != nil {
			yield(nil, err)
			return
		}
		yield(llmResp, nil)
	}
}

func (m *openAIADKModel) buildChatCompletionRequest(req *model.LLMRequest, stream bool) (openai.ChatCompletionRequest, error) {
	messages := make([]openai.ChatCompletionMessage, 0, len(req.Contents))
	systemInstruction := ""
	if req.Config != nil && req.Config.SystemInstruction != nil {
		systemInstruction = contentToPlainText(req.Config.SystemInstruction)
	}
	if strings.TrimSpace(systemInstruction) != "" {
		messages = append(messages, openai.ChatCompletionMessage{
			Role:    openai.ChatMessageRoleSystem,
			Content: systemInstruction,
		})
	}

	for _, content := range req.Contents {
		msgs, err := genaiContentToOpenAIMessages(content)
		if err != nil {
			return openai.ChatCompletionRequest{}, err
		}
		messages = append(messages, msgs...)
	}
	messages = compressMessagesForContext(req, messages, m.sessionID, m.skillID, firstNonEmpty(strings.TrimSpace(req.Model), strings.TrimSpace(m.model)))

	tools, err := buildOpenAIToolsFromRequest(req)
	if err != nil {
		return openai.ChatCompletionRequest{}, err
	}

	openAIReq := openai.ChatCompletionRequest{
		Model:       firstNonEmpty(strings.TrimSpace(req.Model), strings.TrimSpace(m.model)),
		Messages:    messages,
		Tools:       tools,
		ToolChoice:  toolChoiceFromConfig(req.Config, len(tools) > 0),
		Temperature: temperatureFromConfig(req.Config),
		Stream:      stream,
	}
	if stream {
		openAIReq.ParallelToolCalls = false
	}
	if stream {
		openAIReq.StreamOptions = &openai.StreamOptions{IncludeUsage: true}
	}
	return openAIReq, nil
}

func (m *openAIADKModel) streamCompletion(ctx context.Context, req openai.ChatCompletionRequest, yield func(*model.LLMResponse, error) bool) {
	parts := make([]*genai.Part, 0, 8)
	toolCalls := make(map[int]*openai.ToolCall)
	var finishReason string
	var usage *genai.GenerateContentResponseUsageMetadata

	stream, err := m.client.CreateChatCompletionStream(ctx, req)
	if err != nil {
		yield(nil, err)
		return
	}
	defer stream.Close()

	for {
		resp, recvErr := stream.Recv()
		if errors.Is(recvErr, openai.ErrChatCompletionStreamNotSupported) {
			yield(nil, recvErr)
			return
		}
		if recvErr != nil {
			if errors.Is(recvErr, context.Canceled) {
				yield(nil, recvErr)
				return
			}
			if strings.Contains(recvErr.Error(), "EOF") {
				break
			}
			yield(nil, recvErr)
			return
		}

		if resp.Usage != nil {
			usage = usageToGenAI(*resp.Usage)
		}
		if len(resp.Choices) == 0 {
			continue
		}

		choice := resp.Choices[0]
		if choice.FinishReason != "" {
			finishReason = string(choice.FinishReason)
		}
		delta := choice.Delta
		if delta.Content != "" {
			part := genai.NewPartFromText(delta.Content)
			parts = append(parts, part)
			if !yield(&model.LLMResponse{
				Content: &genai.Content{
					Role:  string(genai.RoleModel),
					Parts: []*genai.Part{part},
				},
				Partial: true,
			}, nil) {
				return
			}
		}

		for _, toolDelta := range delta.ToolCalls {
			index := 0
			if toolDelta.Index != nil {
				index = *toolDelta.Index
			}
			toolCall := toolCalls[index]
			if toolCall == nil {
				toolCall = &openai.ToolCall{Type: openai.ToolTypeFunction}
				toolCalls[index] = toolCall
			}
			if toolDelta.ID != "" {
				toolCall.ID = toolDelta.ID
			}
			if toolDelta.Function.Name != "" {
				toolCall.Function.Name = toolDelta.Function.Name
			}
			if toolDelta.Function.Arguments != "" {
				toolCall.Function.Arguments += toolDelta.Function.Arguments
			}
		}
	}

	for index := 0; index < len(toolCalls); index++ {
		toolCall := toolCalls[index]
		if toolCall == nil {
			continue
		}
		args := map[string]any{}
		if strings.TrimSpace(toolCall.Function.Arguments) != "" {
			if err := json.Unmarshal([]byte(toolCall.Function.Arguments), &args); err != nil {
				yield(nil, fmt.Errorf("decode streamed tool arguments for %s: %w", toolCall.Function.Name, err))
				return
			}
		}
		part := genai.NewPartFromFunctionCall(toolCall.Function.Name, args)
		part.FunctionCall.ID = toolCall.ID
		parts = append(parts, part)
	}

	if len(parts) == 0 {
		parts = append(parts, genai.NewPartFromText(""))
	}

	yield(&model.LLMResponse{
		Content: &genai.Content{
			Role:  string(genai.RoleModel),
			Parts: parts,
		},
		UsageMetadata: usage,
		FinishReason:  finishReasonToGenAI(finishReason),
		TurnComplete:  true,
	}, nil)
}

func genaiContentToOpenAIMessages(content *genai.Content) ([]openai.ChatCompletionMessage, error) {
	if content == nil {
		return nil, nil
	}

	role := openai.ChatMessageRoleUser
	if strings.EqualFold(content.Role, string(genai.RoleModel)) {
		role = openai.ChatMessageRoleAssistant
	}

	messages := make([]openai.ChatCompletionMessage, 0, 1)
	var textBuilder strings.Builder
	var toolCalls []openai.ToolCall
	for _, part := range content.Parts {
		if part == nil {
			continue
		}
		switch {
		case part.Text != "":
			textBuilder.WriteString(part.Text)
		case part.FunctionCall != nil:
			args, err := json.Marshal(part.FunctionCall.Args)
			if err != nil {
				return nil, fmt.Errorf("marshal function call args for %s: %w", part.FunctionCall.Name, err)
			}
			toolCalls = append(toolCalls, openai.ToolCall{
				ID:   part.FunctionCall.ID,
				Type: openai.ToolTypeFunction,
				Function: openai.FunctionCall{
					Name:      part.FunctionCall.Name,
					Arguments: string(args),
				},
			})
		case part.FunctionResponse != nil:
			compacted := compactToolResponseForModel(part.FunctionResponse.Name, part.FunctionResponse.Response)
			response, err := json.Marshal(compacted)
			if err != nil {
				return nil, fmt.Errorf("marshal function response for %s: %w", part.FunctionResponse.Name, err)
			}
			messages = append(messages, openai.ChatCompletionMessage{
				Role:       openai.ChatMessageRoleTool,
				Content:    string(response),
				Name:       part.FunctionResponse.Name,
				ToolCallID: part.FunctionResponse.ID,
			})
		}
	}

	if textBuilder.Len() > 0 || len(toolCalls) > 0 {
		messages = append([]openai.ChatCompletionMessage{{
			Role:      role,
			Content:   textBuilder.String(),
			ToolCalls: toolCalls,
		}}, messages...)
	}
	return messages, nil
}

func compactToolResponseForModel(toolName string, value interface{}) interface{} {
	options := toolResponseCompactionOptions{
		maxBytes:      maxToolResponseBytesForModel,
		maxStringLen:  maxToolResponseStringLen,
		maxArrayItems: maxToolResponseArrayItems,
	}
	if isPrometheusToolName(toolName) {
		options.maxBytes = maxPrometheusToolResponseBytesForModel
		options.maxStringLen = maxPrometheusToolResponseStringLen
		options.maxArrayItems = maxPrometheusToolResponseArrayItems
		options.preferStructuredRaw = true
		options.preserveValuesArray = true
	}

	compacted := compactToolResponseValue(value, options, nil)
	body, err := json.Marshal(compacted)
	if err != nil || len(body) <= options.maxBytes {
		return compacted
	}
	return map[string]any{
		"status":  compactToolResponseStatus(value),
		"summary": summarizeLargeToolPayload(compacted),
		"notice":  "tool result was compacted for model context due to size",
	}
}

func compactToolResponseValue(value interface{}, options toolResponseCompactionOptions, path []string) interface{} {
	switch typed := value.(type) {
	case nil:
		return nil
	case json.RawMessage:
		return compactToolResponseString(string(typed), options, path)
	case []byte:
		return compactToolResponseString(string(typed), options, path)
	case string:
		return compactToolResponseString(typed, options, path)
	case map[string]any:
		filtered := typed
		if options.preferStructuredRaw {
			filtered = dropDuplicateToolOutput(typed)
		}
		result := make(map[string]any, len(filtered))
		keys := make([]string, 0, len(filtered))
		for key := range filtered {
			keys = append(keys, key)
		}
		sort.Strings(keys)
		for _, key := range keys {
			limit := options.maxStringLen
			if key == "output" || key == "structuredContent" {
				limit = minInt(options.maxStringLen, 2048)
				if options.preferStructuredRaw {
					limit = options.maxStringLen
				}
			}
			childOptions := options
			childOptions.maxStringLen = limit
			result[key] = compactToolResponseValue(filtered[key], childOptions, appendPath(path, key))
		}
		return result
	case []any:
		return compactToolResponseArray(typed, options, path)
	default:
		return value
	}
}

func compactToolResponseString(value string, options toolResponseCompactionOptions, path []string) interface{} {
	trimmed := strings.TrimSpace(value)
	if trimmed == "" {
		return ""
	}
	if (strings.HasPrefix(trimmed, "{") || strings.HasPrefix(trimmed, "[")) && (len(trimmed) > options.maxStringLen || shouldDecodeStructuredToolString(path, options)) {
		var decoded interface{}
		if err := json.Unmarshal([]byte(trimmed), &decoded); err == nil {
			return compactToolResponseValue(decoded, options, path)
		}
	}
	if len(trimmed) <= options.maxStringLen {
		return trimmed
	}
	return trimmed[:options.maxStringLen] + "...(truncated)"
}

func compactToolResponseArray(items []any, options toolResponseCompactionOptions, path []string) interface{} {
	limit := options.maxArrayItems
	if options.preserveValuesArray && isPrometheusValuesPath(path) {
		limit = options.maxArrayItems
	}
	if len(items) <= limit {
		result := make([]any, 0, len(items))
		for _, item := range items {
			result = append(result, compactToolResponseValue(item, options, path))
		}
		return result
	}

	headCount := limit / 2
	tailCount := limit - headCount
	result := make([]any, 0, limit+1)
	for _, item := range items[:headCount] {
		result = append(result, compactToolResponseValue(item, options, path))
	}
	result = append(result, map[string]any{
		"truncated":    true,
		"omittedItems": len(items) - limit,
	})
	for _, item := range items[len(items)-tailCount:] {
		result = append(result, compactToolResponseValue(item, options, path))
	}
	return result
}

func appendPath(path []string, key string) []string {
	next := make([]string, 0, len(path)+1)
	next = append(next, path...)
	next = append(next, key)
	return next
}

func shouldDecodeStructuredToolString(path []string, options toolResponseCompactionOptions) bool {
	if !options.preferStructuredRaw || len(path) == 0 {
		return false
	}
	last := path[len(path)-1]
	return last == "structuredContent" || last == "output"
}

func isPrometheusValuesPath(path []string) bool {
	if len(path) == 0 {
		return false
	}
	return path[len(path)-1] == "values"
}

func isPrometheusToolName(toolName string) bool {
	name := strings.TrimSpace(toolName)
	return name == "prometheus_query" || name == "prometheus_query_range"
}

func dropDuplicateToolOutput(payload map[string]any) map[string]any {
	if payload == nil {
		return nil
	}
	output := strings.TrimSpace(safeString(payload["output"]))
	structured := strings.TrimSpace(safeString(payload["structuredContent"]))
	if output == "" || structured == "" || output != structured {
		return payload
	}

	cloned := make(map[string]any, len(payload)-1)
	for key, value := range payload {
		if key == "output" {
			continue
		}
		cloned[key] = value
	}
	return cloned
}

func compactToolResponseStatus(value interface{}) string {
	payload, ok := value.(map[string]any)
	if !ok {
		return "success"
	}
	status := strings.TrimSpace(safeString(payload["status"]))
	if status == "" {
		return "success"
	}
	return status
}

func summarizeLargeToolPayload(value interface{}) string {
	payload, ok := value.(map[string]any)
	if !ok {
		return "large structured tool result"
	}
	parts := make([]string, 0, 4)
	if status := strings.TrimSpace(safeString(payload["status"])); status != "" {
		parts = append(parts, "status="+status)
	}
	if output := strings.TrimSpace(safeString(payload["output"])); output != "" {
		parts = append(parts, "output available")
	}
	if structured := payload["structuredContent"]; structured != nil {
		parts = append(parts, "structured content available")
	}
	if isError, ok := payload["isError"].(bool); ok && isError {
		parts = append(parts, "tool marked as error")
	}
	if len(parts) == 0 {
		return "large structured tool result"
	}
	return strings.Join(parts, ", ")
}

func minInt(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func buildOpenAIToolsFromRequest(req *model.LLMRequest) ([]openai.Tool, error) {
	if req == nil || req.Config == nil || len(req.Config.Tools) == 0 {
		return nil, nil
	}
	tools := make([]openai.Tool, 0, len(req.Config.Tools))
	for _, item := range req.Config.Tools {
		if item == nil || len(item.FunctionDeclarations) == 0 {
			continue
		}
		for _, decl := range item.FunctionDeclarations {
			if decl == nil {
				continue
			}
			tools = append(tools, openai.Tool{
				Type: openai.ToolTypeFunction,
				Function: &openai.FunctionDefinition{
					Name:        decl.Name,
					Description: decl.Description,
					Parameters:  decl.ParametersJsonSchema,
					Strict:      false,
				},
			})
		}
	}
	return tools, nil
}

func chatCompletionMessageToLLMResponse(message openai.ChatCompletionMessage, finishReason string, usage *genai.GenerateContentResponseUsageMetadata) (*model.LLMResponse, error) {
	parts := make([]*genai.Part, 0, 1+len(message.ToolCalls))
	if message.Content != "" {
		parts = append(parts, genai.NewPartFromText(message.Content))
	}
	for _, toolCall := range message.ToolCalls {
		args := map[string]any{}
		if strings.TrimSpace(toolCall.Function.Arguments) != "" {
			if err := json.Unmarshal([]byte(toolCall.Function.Arguments), &args); err != nil {
				return nil, fmt.Errorf("decode tool arguments for %s: %w", toolCall.Function.Name, err)
			}
		}
		part := genai.NewPartFromFunctionCall(toolCall.Function.Name, args)
		part.FunctionCall.ID = toolCall.ID
		parts = append(parts, part)
	}
	if len(parts) == 0 {
		parts = append(parts, genai.NewPartFromText(""))
	}
	return &model.LLMResponse{
		Content: &genai.Content{
			Role:  string(genai.RoleModel),
			Parts: parts,
		},
		UsageMetadata: usage,
		FinishReason:  finishReasonToGenAI(finishReason),
		TurnComplete:  true,
	}, nil
}

func usageToGenAI(usage openai.Usage) *genai.GenerateContentResponseUsageMetadata {
	return &genai.GenerateContentResponseUsageMetadata{
		PromptTokenCount:     int32(usage.PromptTokens),
		CandidatesTokenCount: int32(usage.CompletionTokens),
		TotalTokenCount:      int32(usage.TotalTokens),
	}
}

func finishReasonToGenAI(reason string) genai.FinishReason {
	switch strings.ToLower(strings.TrimSpace(reason)) {
	case "length":
		return genai.FinishReasonMaxTokens
	case "tool_calls", "function_call":
		return genai.FinishReasonStop
	case "content_filter":
		return genai.FinishReasonSafety
	case "", "stop":
		return genai.FinishReasonStop
	default:
		return genai.FinishReasonStop
	}
}

func toolChoiceFromConfig(cfg *genai.GenerateContentConfig, hasTools bool) any {
	if !hasTools || cfg == nil || cfg.ToolConfig == nil || cfg.ToolConfig.FunctionCallingConfig == nil {
		return nil
	}
	switch cfg.ToolConfig.FunctionCallingConfig.Mode {
	case genai.FunctionCallingConfigModeNone:
		return "none"
	case genai.FunctionCallingConfigModeAny, genai.FunctionCallingConfigModeValidated:
		return "required"
	default:
		return nil
	}
}

func temperatureFromConfig(cfg *genai.GenerateContentConfig) float32 {
	if cfg == nil || cfg.Temperature == nil {
		return 0
	}
	return float32(*cfg.Temperature)
}

func contentToPlainText(content *genai.Content) string {
	if content == nil {
		return ""
	}
	var builder strings.Builder
	for _, part := range content.Parts {
		if part == nil {
			continue
		}
		if part.Text != "" {
			builder.WriteString(part.Text)
		}
	}
	return builder.String()
}

func compressMessagesForContext(req *model.LLMRequest, messages []openai.ChatCompletionMessage, sessionID string, skillID string, modelName string) []openai.ChatCompletionMessage {
	if len(messages) == 0 {
		return messages
	}

	sessionID = firstNonEmpty(strings.TrimSpace(sessionID), extractSessionIDForCompression(req))
	if sessionID == "" {
		return messages
	}
	pruneExpiredRollingSummaries(time.Now())

	budget := contextBudgetChars(modelName)
	if estimateMessagesChars(messages) <= budget {
		return withRollingSummaryIfPresent(req, sessionID, messages)
	}

	systemMessages, conversationMessages := splitSystemMessages(messages)
	policy := compressionPolicyForSkill(skillID)
	protectedStart := protectedTurnStartIndex(conversationMessages, policy.ProtectedUserTurns)
	if protectedStart <= 0 {
		return withRollingSummaryIfPresent(req, sessionID, messages)
	}

	protectedStart = protectActiveExecutionChainStart(conversationMessages, protectedStart)
	compressibleMessages := append([]openai.ChatCompletionMessage{}, conversationMessages[:protectedStart]...)
	protectedMessages := append([]openai.ChatCompletionMessage{}, conversationMessages[protectedStart:]...)
	if len(compressibleMessages) == 0 {
		return withRollingSummaryIfPresent(req, sessionID, messages)
	}

	protectedMessages = compactProtectedToolMessages(protectedMessages, policy)
	rollingSummary := mergeRollingSummary(sessionID, summarizeMessagesForRollingMemory(req, compressibleMessages), len(compressibleMessages))
	if strings.TrimSpace(rollingSummary) == "" {
		return messages
	}

	summaryMessage := openai.ChatCompletionMessage{
		Role:    openai.ChatMessageRoleSystem,
		Content: buildRollingSummaryInstruction(req, rollingSummary),
	}

	compressed := make([]openai.ChatCompletionMessage, 0, len(systemMessages)+1+len(protectedMessages))
	compressed = append(compressed, systemMessages...)
	compressed = append(compressed, summaryMessage)
	compressed = append(compressed, protectedMessages...)

	logContextCompression(sessionID, len(messages), len(compressed), estimateMessagesChars(messages), estimateMessagesChars(compressed))
	return compressed
}

func contextBudgetChars(modelName string) int {
	normalized := strings.ToLower(strings.TrimSpace(modelName))
	switch {
	case strings.Contains(normalized, "gpt-5"), strings.Contains(normalized, "gpt-4.1"), strings.Contains(normalized, "claude-4"), strings.Contains(normalized, "claude-sonnet-4"):
		return 512 * 1024
	case strings.Contains(normalized, "gemini-2.5"), strings.Contains(normalized, "qwen3-coder-480b"), strings.Contains(normalized, "qwen3"), strings.Contains(normalized, "deepseek"), strings.Contains(normalized, "kimi"):
		return 320 * 1024
	case strings.Contains(normalized, "gpt-4o"), strings.Contains(normalized, "claude-3"), strings.Contains(normalized, "qwen2.5"), strings.Contains(normalized, "llama-3"):
		return 240 * 1024
	default:
		return defaultContextBudgetChars
	}
}

func extractSessionIDForCompression(req *model.LLMRequest) string {
	if req == nil || req.Tools == nil {
		return ""
	}
	return strings.TrimSpace(safeString(req.Tools["session_id"]))
}

func splitSystemMessages(messages []openai.ChatCompletionMessage) ([]openai.ChatCompletionMessage, []openai.ChatCompletionMessage) {
	systemMessages := make([]openai.ChatCompletionMessage, 0, 2)
	conversationMessages := make([]openai.ChatCompletionMessage, 0, len(messages))
	for _, message := range messages {
		if message.Role == openai.ChatMessageRoleSystem {
			systemMessages = append(systemMessages, message)
			continue
		}
		conversationMessages = append(conversationMessages, message)
	}
	return systemMessages, conversationMessages
}

func protectedTurnStartIndex(messages []openai.ChatCompletionMessage, protectedTurns int) int {
	if protectedTurns <= 0 {
		return len(messages)
	}

	userTurnCount := 0
	for i := len(messages) - 1; i >= 0; i-- {
		if messages[i].Role != openai.ChatMessageRoleUser {
			continue
		}
		userTurnCount++
		if userTurnCount == protectedTurns {
			return i
		}
	}
	return -1
}

func compressionPolicyForSkill(skillID string) contextCompressionPolicy {
	switch strings.TrimSpace(skillID) {
	case "k8s-troubleshoot":
		return contextCompressionPolicy{
			ProtectedUserTurns: recentUserTurnsProtectedDefault,
			ProtectAllRecent:   true,
		}
	case "k8s-cluster-inspect", "k8s-namespace-inspect":
		return contextCompressionPolicy{
			ProtectedUserTurns: recentUserTurnsProtectedDefault,
			ProtectAllRecent:   false,
		}
	default:
		return contextCompressionPolicy{
			ProtectedUserTurns: recentUserTurnsProtectedDefault,
			ProtectAllRecent:   false,
		}
	}
}

func protectActiveExecutionChainStart(messages []openai.ChatCompletionMessage, fallbackStart int) int {
	start := fallbackStart
	for i := len(messages) - 1; i >= 0; i-- {
		message := messages[i]
		if message.Role == openai.ChatMessageRoleTool {
			start = minInt(start, maxInt(0, i-1))
			continue
		}
		if message.Role == openai.ChatMessageRoleAssistant && len(message.ToolCalls) > 0 {
			start = minInt(start, i)
			for j := i - 1; j >= 0; j-- {
				if messages[j].Role == openai.ChatMessageRoleUser {
					start = minInt(start, j)
					break
				}
			}
			continue
		}
	}
	return start
}

func compactProtectedToolMessages(messages []openai.ChatCompletionMessage, policy contextCompressionPolicy) []openai.ChatCompletionMessage {
	if policy.ProtectAllRecent {
		return messages
	}

	result := make([]openai.ChatCompletionMessage, 0, len(messages))
	for _, message := range messages {
		if message.Role != openai.ChatMessageRoleTool || strings.TrimSpace(message.Content) == "" {
			result = append(result, message)
			continue
		}

		if isPrometheusToolName(message.Name) {
			result = append(result, message)
			continue
		}

		result = append(result, openai.ChatCompletionMessage{
			Role:       message.Role,
			Name:       message.Name,
			ToolCallID: message.ToolCallID,
			Content:    clipString(message.Content, maxPrometheusToolResponseStringLen),
		})
	}
	return result
}

func estimateMessagesChars(messages []openai.ChatCompletionMessage) int {
	total := 0
	for _, message := range messages {
		total += len(message.Role) + len(message.Content) + len(message.Name) + len(message.ToolCallID) + 24
		for _, toolCall := range message.ToolCalls {
			total += len(toolCall.ID) + len(toolCall.Function.Name) + len(toolCall.Function.Arguments) + 32
		}
	}
	return total
}

func summarizeMessagesForRollingMemory(req *model.LLMRequest, messages []openai.ChatCompletionMessage) string {
	if len(messages) == 0 {
		return ""
	}

	var builder strings.Builder
	if isEnglishCompressionLanguage(req) {
		builder.WriteString("Earlier conversation memory:\n")
	} else {
		builder.WriteString("更早会话记忆：\n")
	}

	for _, message := range messages {
		line := summarizeMessageForMemory(message)
		if line == "" {
			continue
		}
		if builder.Len()+len(line)+1 > rollingSummaryMaxChars {
			break
		}
		builder.WriteString(line)
		builder.WriteString("\n")
	}

	return strings.TrimSpace(builder.String())
}

func summarizeMessageForMemory(message openai.ChatCompletionMessage) string {
	content := strings.TrimSpace(message.Content)
	switch message.Role {
	case openai.ChatMessageRoleUser:
		if content == "" {
			return ""
		}
		return "- user: " + clipString(content, 1200)
	case openai.ChatMessageRoleAssistant:
		if len(message.ToolCalls) > 0 {
			parts := make([]string, 0, len(message.ToolCalls))
			for _, toolCall := range message.ToolCalls {
				if toolCall.Function.Name == "" {
					continue
				}
				item := toolCall.Function.Name
				if args := strings.TrimSpace(toolCall.Function.Arguments); args != "" {
					item += " args=" + clipString(args, 400)
				}
				parts = append(parts, item)
			}
			if len(parts) > 0 {
				return "- assistant tool plan: " + strings.Join(parts, "; ")
			}
		}
		if content == "" {
			return ""
		}
		return "- assistant: " + clipString(content, 1200)
	case openai.ChatMessageRoleTool:
		name := strings.TrimSpace(message.Name)
		if name == "" {
			name = "tool"
		}
		return "- tool result [" + name + "]: " + clipString(content, 1200)
	default:
		if content == "" {
			return ""
		}
		return "- " + message.Role + ": " + clipString(content, 1200)
	}
}

func mergeRollingSummary(sessionID, addition string, summarizedCount int) string {
	addition = strings.TrimSpace(addition)

	compressedContextStore.mu.RLock()
	existingState, ok := compressedContextStore.data[sessionID]
	compressedContextStore.mu.RUnlock()

	if ok && summarizedCount < existingState.SummarizedCount {
		deleteRollingSummary(sessionID)
		ok = false
		existingState = compressedSessionMemory{}
	}

	if ok && summarizedCount <= existingState.SummarizedCount {
		return strings.TrimSpace(existingState.Summary)
	}

	if addition == "" {
		if ok {
			return strings.TrimSpace(existingState.Summary)
		}
		return ""
	}

	merged := addition
	if ok && strings.TrimSpace(existingState.Summary) != "" {
		merged = strings.TrimSpace(existingState.Summary) + "\n" + addition
	}
	if len(merged) > rollingSummaryMaxChars {
		merged = merged[len(merged)-rollingSummaryMaxChars:]
	}
	merged = strings.TrimSpace(merged)

	compressedContextStore.mu.Lock()
	compressedContextStore.data[sessionID] = compressedSessionMemory{
		Summary:         merged,
		LastUpdated:     time.Now(),
		SummarizedCount: summarizedCount,
	}
	compressedContextStore.mu.Unlock()
	return merged
}

func getRollingSummary(sessionID string) string {
	compressedContextStore.mu.RLock()
	item, ok := compressedContextStore.data[sessionID]
	compressedContextStore.mu.RUnlock()
	if !ok {
		return ""
	}
	if time.Since(item.LastUpdated) > rollingSummaryTTL {
		compressedContextStore.mu.Lock()
		delete(compressedContextStore.data, sessionID)
		compressedContextStore.mu.Unlock()
		return ""
	}
	return strings.TrimSpace(item.Summary)
}

func deleteRollingSummary(sessionID string) {
	if strings.TrimSpace(sessionID) == "" {
		return
	}
	compressedContextStore.mu.Lock()
	delete(compressedContextStore.data, sessionID)
	compressedContextStore.mu.Unlock()
}

func withRollingSummaryIfPresent(req *model.LLMRequest, sessionID string, messages []openai.ChatCompletionMessage) []openai.ChatCompletionMessage {
	summary := getRollingSummary(sessionID)
	if summary == "" {
		return messages
	}

	systemMessages, conversationMessages := splitSystemMessages(messages)
	for _, message := range systemMessages {
		if strings.Contains(message.Content, summaryInstructionZh) || strings.Contains(message.Content, summaryInstructionEn) {
			return messages
		}
	}

	result := make([]openai.ChatCompletionMessage, 0, len(messages)+1)
	result = append(result, systemMessages...)
	result = append(result, openai.ChatCompletionMessage{
		Role:    openai.ChatMessageRoleSystem,
		Content: buildRollingSummaryInstruction(req, summary),
	})
	result = append(result, conversationMessages...)
	return result
}

func buildRollingSummaryInstruction(req *model.LLMRequest, summary string) string {
	if isEnglishCompressionLanguage(req) {
		return summaryInstructionEn + "\n\n" + summary
	}
	return summaryInstructionZh + "\n\n" + summary
}

func isEnglishCompressionLanguage(req *model.LLMRequest) bool {
	if req == nil || req.Config == nil || req.Config.SystemInstruction == nil {
		return false
	}
	plain := strings.ToLower(contentToPlainText(req.Config.SystemInstruction))
	return strings.Contains(plain, "you must respond in english only") || strings.Contains(plain, "respond in english")
}

func clipString(value string, limit int) string {
	trimmed := strings.TrimSpace(value)
	if len(trimmed) <= limit {
		return trimmed
	}
	return trimmed[:limit] + "...(truncated)"
}

func logContextCompression(sessionID string, originalCount, compressedCount, originalChars, compressedChars int) {
	if sessionID == "" || config.Logger == nil {
		return
	}
	config.Logger.Infof("chat context compressed, sessionId: %s, messages: %d -> %d, chars: %d -> %d, summaryPreview: %s",
		sessionID,
		originalCount,
		compressedCount,
		originalChars,
		compressedChars,
		clipString(getRollingSummary(sessionID), contextCompressionLogPreview),
	)
}

func maxInt(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func pruneExpiredRollingSummaries(now time.Time) {
	compressedContextStore.mu.Lock()
	defer compressedContextStore.mu.Unlock()

	if !compressedContextStore.lastPrune.IsZero() && now.Sub(compressedContextStore.lastPrune) < rollingSummaryPruneInterval {
		return
	}

	for sessionID, item := range compressedContextStore.data {
		if now.Sub(item.LastUpdated) > rollingSummaryTTL {
			delete(compressedContextStore.data, sessionID)
		}
	}
	compressedContextStore.lastPrune = now
}

func startRollingSummaryJanitor() {
	compressedContextStore.mu.Lock()
	if compressedContextStore.started {
		compressedContextStore.mu.Unlock()
		return
	}
	compressedContextStore.started = true
	compressedContextStore.mu.Unlock()

	go func() {
		ticker := time.NewTicker(rollingSummaryPruneInterval)
		defer ticker.Stop()
		for now := range ticker.C {
			pruneExpiredRollingSummaries(now)
		}
	}()
}

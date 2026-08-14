package chat

import (
	"context"
	"strings"
	"time"

	"github.com/efucloud/kube-keeper/pkg/utils"
)

const (
	streamProtocolVersion = "v2"

	EnvelopeTypeSessionMeta  = "session_meta"
	EnvelopeTypeEventMsg     = "event_msg"
	EnvelopeTypeResponseItem = "response_item"
	EnvelopeTypeRunComplete  = "run_complete"
)

func newEventID(prefix string) string {
	base := strings.TrimSpace(prefix)
	if base == "" {
		base = "evt"
	}
	return base + "_" + utils.GenerateDatabaseId()
}

func newStreamEnvelope(req ChatRequest, envelopeType string, payload any) StreamEvent {
	return withRequestMeta(req, StreamEvent{
		Type:      envelopeType,
		Payload:   payload,
		Version:   streamProtocolVersion,
		Timestamp: time.Now().Format(time.RFC3339Nano),
	})
}

func emitSessionMeta(ctx context.Context, ch chan<- StreamEvent, req ChatRequest, isNew bool) bool {
	payload := map[string]any{
		"id":              req.SessionId,
		"sessionId":       req.SessionId,
		"protocolVersion": streamProtocolVersion,
		"context": map[string]any{
			"cluster":   req.Context.Cluster,
			"namespace": req.Context.Namespace,
			"language":  req.Context.Language,
		},
		"isNewSession": isNew,
	}
	return emitEvent(ctx, ch, newStreamEnvelope(req, EnvelopeTypeSessionMeta, payload))
}

func emitTaskStarted(ctx context.Context, ch chan<- StreamEvent, req ChatRequest, runID string, data map[string]any) bool {
	payload := map[string]any{
		"type":      "task_started",
		"runId":     runID,
		"sessionId": req.SessionId,
		"status":    "running",
	}
	for key, value := range sanitizeEventDataMap(data) {
		payload[key] = value
	}
	return emitEvent(ctx, ch, newStreamEnvelope(req, EnvelopeTypeEventMsg, payload))
}

func emitTaskStatus(ctx context.Context, ch chan<- StreamEvent, req ChatRequest, runID, status string, data map[string]any) bool {
	payload := map[string]any{
		"type":      "task_status",
		"runId":     runID,
		"sessionId": req.SessionId,
		"status":    firstNonEmpty(strings.TrimSpace(status), "running"),
		"data":      sanitizeEventDataMap(data),
	}
	return emitEvent(ctx, ch, newStreamEnvelope(req, EnvelopeTypeEventMsg, payload))
}

func emitAgentMessage(ctx context.Context, ch chan<- StreamEvent, req ChatRequest, runID, phase, message string, data map[string]any) bool {
	payload := map[string]any{
		"type":      "agent_message",
		"runId":     runID,
		"sessionId": req.SessionId,
		"phase":     firstNonEmpty(strings.TrimSpace(phase), "commentary"),
		"message":   strings.TrimSpace(message),
	}
	if len(data) > 0 {
		payload["data"] = sanitizeEventDataMap(data)
	}
	return emitEvent(ctx, ch, newStreamEnvelope(req, EnvelopeTypeEventMsg, payload))
}

func emitRunComplete(ctx context.Context, ch chan<- StreamEvent, req ChatRequest, runID, status, finishReason string, data map[string]any) bool {
	payload := map[string]any{
		"runId":        runID,
		"sessionId":    req.SessionId,
		"status":       firstNonEmpty(strings.TrimSpace(status), "completed"),
		"finishReason": firstNonEmpty(strings.TrimSpace(finishReason), "stop"),
	}
	if len(data) > 0 {
		payload["data"] = sanitizeEventDataMap(data)
	}
	return emitEvent(ctx, ch, newStreamEnvelope(req, EnvelopeTypeRunComplete, payload))
}

func emitErrorItem(ctx context.Context, ch chan<- StreamEvent, req ChatRequest, runID, title, message string, data map[string]any) bool {
	payload := map[string]any{
		"type":   "error",
		"id":     newEventID("error"),
		"runId":  runID,
		"title":  firstNonEmpty(strings.TrimSpace(title), "Execution failed"),
		"status": "error",
		"data": map[string]any{
			"message": strings.TrimSpace(message),
		},
	}
	if len(data) > 0 {
		errorData := payload["data"].(map[string]any)
		for key, value := range sanitizeEventDataMap(data) {
			errorData[key] = value
		}
	}
	return emitEvent(ctx, ch, newStreamEnvelope(req, EnvelopeTypeResponseItem, payload))
}

func emitRunError(ctx context.Context, ch chan<- StreamEvent, req ChatRequest, runID, message string, data map[string]any) bool {
	if !emitErrorItem(ctx, ch, req, runID, "Execution failed", message, data) {
		return false
	}
	return emitRunComplete(ctx, ch, req, runID, "error", "error", map[string]any{
		"error": strings.TrimSpace(message),
	})
}

func emitResponseItem(ctx context.Context, ch chan<- StreamEvent, req ChatRequest, payload map[string]any) bool {
	return emitEvent(ctx, ch, newStreamEnvelope(req, EnvelopeTypeResponseItem, sanitizeEventDataMap(payload)))
}

func messageTextPartID(messageID string) string {
	return "part_" + strings.TrimSpace(messageID) + "_output"
}

func emitMessageStart(ctx context.Context, ch chan<- StreamEvent, req ChatRequest, messageID string, role string) bool {
	return emitResponseItem(ctx, ch, req, map[string]any{
		"type":   "message",
		"id":     messageID,
		"role":   firstNonEmpty(strings.TrimSpace(role), "assistant"),
		"status": "streaming",
		"meta": map[string]any{
			"operation": "create",
		},
		"content": []map[string]any{
			{
				"type":   "output_text",
				"id":     messageTextPartID(messageID),
				"format": "markdown",
				"text":   "",
				"status": "streaming",
			},
		},
	})
}

func emitMessageDelta(ctx context.Context, ch chan<- StreamEvent, req ChatRequest, messageID string, content string) bool {
	if content == "" {
		return true
	}
	return emitResponseItem(ctx, ch, req, map[string]any{
		"type":   "message",
		"id":     messageID,
		"role":   "assistant",
		"status": "streaming",
		"meta": map[string]any{
			"operation": "append",
		},
		"content": []map[string]any{
			{
				"type":   "output_text",
				"id":     messageTextPartID(messageID),
				"format": "markdown",
				"text":   content,
				"status": "streaming",
			},
		},
	})
}

func emitMessageEnd(ctx context.Context, ch chan<- StreamEvent, req ChatRequest, messageID string, content string) bool {
	return emitResponseItem(ctx, ch, req, map[string]any{
		"type":   "message",
		"id":     messageID,
		"role":   "assistant",
		"status": "done",
		"meta": map[string]any{
			"operation": "replace",
		},
		"content": []map[string]any{
			{
				"type":   "output_text",
				"id":     messageTextPartID(messageID),
				"format": "markdown",
				"text":   content,
				"status": "done",
			},
		},
	})
}

func emitStepUpdate(ctx context.Context, ch chan<- StreamEvent, req ChatRequest, stepID, title, status string, data map[string]any) bool {
	return emitResponseItem(ctx, ch, req, map[string]any{
		"type":   "step",
		"id":     stepID,
		"title":  title,
		"status": firstNonEmpty(strings.TrimSpace(status), "running"),
		"meta": map[string]any{
			"operation": "update",
		},
		"data": sanitizeEventDataMap(data),
	})
}

func emitStepStart(ctx context.Context, ch chan<- StreamEvent, req ChatRequest, stepID, title, status string, data map[string]any) bool {
	return emitResponseItem(ctx, ch, req, map[string]any{
		"type":   "step",
		"id":     stepID,
		"title":  title,
		"status": firstNonEmpty(strings.TrimSpace(status), "running"),
		"meta": map[string]any{
			"operation": "create",
		},
		"data": sanitizeEventDataMap(data),
	})
}

func emitStepEnd(ctx context.Context, ch chan<- StreamEvent, req ChatRequest, stepID, title, status string, data map[string]any) bool {
	return emitResponseItem(ctx, ch, req, map[string]any{
		"type":   "step",
		"id":     stepID,
		"title":  title,
		"status": firstNonEmpty(strings.TrimSpace(status), "success"),
		"meta": map[string]any{
			"operation": "complete",
		},
		"data": sanitizeEventDataMap(data),
	})
}

func emitToolCall(ctx context.Context, ch chan<- StreamEvent, req ChatRequest, stepID, toolName, argsText string, extra map[string]any) bool {
	data := map[string]any{
		"stepId":    stepID,
		"toolName":  toolName,
		"arguments": argsText,
	}
	for k, v := range extra {
		data[k] = v
	}
	title := "execution detail"
	if isEnglishChatLanguage(req.Context.Language) {
		title = "execution detail"
	} else {
		title = "执行细节"
	}
	if reason, ok := data["reason"].(string); ok && strings.TrimSpace(reason) != "" {
		title = strings.TrimSpace(reason)
	}
	return emitResponseItem(ctx, ch, req, map[string]any{
		"type":   "tool_call",
		"id":     firstNonEmpty(safeString(data["eventId"]), newEventID("tool")),
		"title":  title,
		"status": "running",
		"data":   sanitizeEventDataMap(data),
	})
}

func emitToolResult(ctx context.Context, ch chan<- StreamEvent, req ChatRequest, stepID, toolName, status, resultText, errText string, extra map[string]any) bool {
	data := map[string]any{
		"stepId":   stepID,
		"toolName": toolName,
		"status":   status,
		"result":   sanitizeToolJSONText(resultText),
		"error":    errText,
	}
	for k, v := range extra {
		data[k] = v
	}
	title := "execution detail"
	if isEnglishChatLanguage(req.Context.Language) {
		title = "execution detail"
	} else {
		title = "执行细节"
	}
	if reason, ok := data["reason"].(string); ok && strings.TrimSpace(reason) != "" {
		title = strings.TrimSpace(reason)
	}
	payload := map[string]any{
		"type":   "tool_result",
		"id":     firstNonEmpty(safeString(data["eventId"]), newEventID("tool_result")),
		"title":  title,
		"status": firstNonEmpty(strings.TrimSpace(status), "success"),
		"data":   sanitizeEventDataMap(data),
	}
	description := buildToolResultPreview(req, status, errText)
	if description != "" {
		payload["summary"] = description
	}
	return emitResponseItem(ctx, ch, req, payload)
}

func buildToolResultPreview(req ChatRequest, status, errText string) string {
	if strings.TrimSpace(errText) != "" {
		if isEnglishChatLanguage(req.Context.Language) {
			return "This step failed. Expand the result to inspect the error details."
		}
		return "该步骤执行失败，可展开结果查看错误详情。"
	}
	if isEnglishChatLanguage(req.Context.Language) {
		return "This step completed. Expand the result to inspect whether it matches the intended goal."
	}
	return "该步骤已完成，可展开结果查看是否符合预期目标。"
}

func emitStatus(ctx context.Context, ch chan<- StreamEvent, req ChatRequest, kind string, data map[string]any) bool {
	runID := ""
	if data != nil {
		runID = safeString(data["runId"])
	}
	status := strings.TrimSpace(kind)
	if strings.HasPrefix(status, "run.") {
		status = strings.TrimPrefix(status, "run.")
	}
	return emitTaskStatus(ctx, ch, req, runID, status, map[string]any{
		"kind": kind,
		"data": data,
	})
}

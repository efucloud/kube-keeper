package chat

import (
	"encoding/json"
	"fmt"
	"strings"
)

func firstNonEmpty(values ...string) string {
	for _, value := range values {
		if strings.TrimSpace(value) != "" {
			return value
		}
	}
	return ""
}

func extractToolCallReason(argsText string) string {
	trimmed := strings.TrimSpace(argsText)
	if trimmed == "" {
		return ""
	}

	var payload map[string]interface{}
	if err := json.Unmarshal([]byte(trimmed), &payload); err != nil {
		return ""
	}

	reason, ok := payload["reason"]
	if !ok {
		return ""
	}
	return strings.TrimSpace(fmt.Sprintf("%v", reason))
}

func buildAgentStepTitleReason(reason string) string {
	cleaned := strings.Join(strings.Fields(strings.TrimSpace(reason)), " ")
	if cleaned == "" {
		return "Execute diagnostic step"
	}

	runes := []rune(cleaned)
	if len(runes) > 48 {
		return string(runes[:48]) + "..."
	}
	return cleaned
}

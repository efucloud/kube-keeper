package chat

import (
	"encoding/json"
	"fmt"
	"strings"
)

func sanitizeToolPayloadValue(value interface{}) interface{} {
	switch typed := value.(type) {
	case nil:
		return nil
	case json.RawMessage:
		return sanitizeToolJSONText(string(typed))
	case []byte:
		return sanitizeToolJSONText(string(typed))
	case map[string]interface{}:
		return sanitizeToolPayloadMap(typed)
	case []interface{}:
		items := make([]interface{}, 0, len(typed))
		for _, item := range typed {
			sanitized := sanitizeToolPayloadValue(item)
			if sanitized == nil {
				continue
			}
			items = append(items, sanitized)
		}
		return items
	case string:
		if sanitized, ok := sanitizeToolJSONTextWithState(typed); ok {
			return sanitized
		}
		return typed
	default:
		return value
	}
}

func sanitizeToolPayloadMap(input map[string]interface{}) interface{} {
	if len(input) == 0 {
		return map[string]interface{}{}
	}

	output := make(map[string]interface{}, len(input))
	for key, raw := range input {
		if strings.EqualFold(strings.TrimSpace(key), "schema") {
			continue
		}
		sanitized := sanitizeToolPayloadValue(raw)
		if sanitized == nil {
			continue
		}
		output[key] = sanitized
	}
	if len(output) == 0 {
		return nil
	}
	return output
}

func sanitizeToolJSONText(text string) string {
	sanitized, ok := sanitizeToolJSONTextWithState(text)
	if !ok {
		return strings.TrimSpace(text)
	}
	return sanitized
}

func sanitizeToolJSONTextWithState(text string) (string, bool) {
	trimmed := strings.TrimSpace(text)
	if trimmed == "" {
		return "", true
	}
	if !strings.HasPrefix(trimmed, "{") && !strings.HasPrefix(trimmed, "[") {
		return "", false
	}

	var payload interface{}
	if err := json.Unmarshal([]byte(trimmed), &payload); err != nil {
		return "", false
	}
	sanitized := sanitizeToolPayloadValue(payload)
	if sanitized == nil {
		return "", true
	}

	body, err := json.Marshal(sanitized)
	if err != nil {
		return fmt.Sprintf("%v", sanitized), true
	}
	return string(body), true
}

func sanitizeEventDataMap(data map[string]interface{}) map[string]interface{} {
	if len(data) == 0 {
		return nil
	}

	output := make(map[string]interface{}, len(data))
	for key, value := range data {
		sanitized := sanitizeToolPayloadValue(value)
		if sanitized == nil {
			continue
		}
		output[key] = sanitized
	}
	if len(output) == 0 {
		return nil
	}
	return output
}

package embeds

import (
	"embed"
	"strings"
)

//go:embed locales
var I18nFiles embed.FS

//go:embed web
var WebFiles embed.FS

//go:embed system-prompt.md
var systemPrompt embed.FS

func GetSystemPrompt() string {
	data, _ := systemPrompt.ReadFile("system-prompt.md")
	return strings.TrimSpace(string(data))
}

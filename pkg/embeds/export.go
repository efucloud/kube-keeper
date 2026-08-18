package embeds

import (
	"embed"
	"strings"
)

//go:embed locales
var I18nFiles embed.FS

//go:embed system-prompt.md
var systemPrompt embed.FS

//go:embed token/private_key.pem token/public_key.pem
var tokenFiles embed.FS

func GetSystemPrompt() string {
	data, _ := systemPrompt.ReadFile("system-prompt.md")
	return strings.TrimSpace(string(data))
}

func GetSystemTokenPrivateKeyPEM() []byte {
	data, _ := tokenFiles.ReadFile("token/private_key.pem")
	return data
}

func GetSystemTokenPublicKeyPEM() []byte {
	data, _ := tokenFiles.ReadFile("token/public_key.pem")
	return data
}

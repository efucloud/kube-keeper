package chat

import (
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/efucloud/kube-keeper/pkg/config"
	openai "github.com/sashabaranov/go-openai"
)

const (
	defaultProviderName = "openai-compatible"

	defaultHTTPClientTimeout = 180 * time.Second
)

type providerRuntime struct {
	// Name 固定为部署期配置的 provider，不支持会话中动态切换。
	Name   string
	Model  string
	Client *openai.Client
}

type staticHeaderRoundTripper struct {
	base    http.RoundTripper
	headers map[string]string
}

func (rt *staticHeaderRoundTripper) RoundTrip(req *http.Request) (*http.Response, error) {
	if req == nil {
		return nil, fmt.Errorf("request is nil")
	}

	next := req.Clone(req.Context())
	for key, value := range rt.headers {
		if key == "" || strings.TrimSpace(value) == "" {
			continue
		}
		if next.Header.Get(key) != "" {
			continue
		}
		next.Header.Set(key, value)
	}

	return rt.base.RoundTrip(next)
}

func buildProviderRuntime() (*providerRuntime, error) {
	chatCfg := config.ApplicationConfig.ChatConfig

	// 部署时只允许一个 provider；若配置其他值，启动运行时直接报错。
	providerName := normalizeProviderName(chatCfg.Provider)
	if providerName != defaultProviderName {
		return nil, fmt.Errorf("chatConfig.provider=%q is not supported, only %q is allowed", chatCfg.Provider, defaultProviderName)
	}

	model := strings.TrimSpace(chatCfg.Model)
	if model == "" {
		return nil, fmt.Errorf("chatConfig.model is required")
	}
	if strings.TrimSpace(chatCfg.ApiKey) == "" {
		return nil, fmt.Errorf("chatConfig.apiKey is required")
	}

	openAIConfig := openai.DefaultConfig(chatCfg.ApiKey)
	if strings.TrimSpace(chatCfg.Address) != "" {
		openAIConfig.BaseURL = normalizeOpenAIBaseURL(chatCfg.Address)
	}

	baseTransport := http.DefaultTransport
	if baseTransport == nil {
		baseTransport = http.DefaultTransport
	}
	headerMap := parseStaticHeaders(chatCfg.Header)
	openAIConfig.HTTPClient = &http.Client{
		Timeout: defaultHTTPClientTimeout,
		Transport: &staticHeaderRoundTripper{
			base:    baseTransport,
			headers: headerMap,
		},
	}

	return &providerRuntime{
		Name:   providerName,
		Model:  model,
		Client: openai.NewClientWithConfig(openAIConfig),
	}, nil
}

func normalizeProviderName(value string) string {
	normalized := strings.ToLower(strings.TrimSpace(value))
	switch normalized {
	case "", "openai", "openai-compatible", "compatible":
		return defaultProviderName
	default:
		return normalized
	}
}

func parseStaticHeaders(value string) map[string]string {
	result := make(map[string]string)
	trimmed := strings.TrimSpace(value)
	if trimmed == "" {
		return result
	}

	lines := strings.Split(trimmed, "\n")
	for _, rawLine := range lines {
		line := strings.TrimSpace(rawLine)
		if line == "" {
			continue
		}
		parts := strings.SplitN(line, ":", 2)
		if len(parts) != 2 {
			continue
		}
		key := strings.TrimSpace(parts[0])
		val := strings.TrimSpace(parts[1])
		if key == "" || val == "" {
			continue
		}
		result[key] = val
	}
	return result
}

func normalizeOpenAIBaseURL(raw string) string {
	baseURL := strings.TrimSpace(raw)
	baseURL = strings.TrimRight(baseURL, "/")
	for _, suffix := range []string{
		"/chat/completions",
		"/completions",
		"/responses",
	} {
		if strings.HasSuffix(strings.ToLower(baseURL), suffix) {
			baseURL = baseURL[:len(baseURL)-len(suffix)]
			baseURL = strings.TrimRight(baseURL, "/")
			break
		}
	}
	return baseURL
}

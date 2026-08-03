package chat

import (
	"strings"
	"testing"
)

func TestBuildAgentSystemPromptRendersKubernetesExpertContext(t *testing.T) {
	prompt := buildAgentSystemPrompt(ChatRequest{
		Context: ChatContext{
			Cluster:   "production",
			Namespace: "payments",
			Language:  "中文",
		},
		Resource: &ResourceContext{
			Kind:       "Pod",
			ApiVersion: "v1",
			Name:       "api-0",
		},
	})

	for _, expected := range []string{
		"# Kubernetes 专家",
		"集群：**production**",
		"命名空间：**payments**",
		"资源类型：**Pod**",
		"apiVersion：**v1**",
		"资源名称：**api-0**",
	} {
		if !strings.Contains(prompt, expected) {
			t.Fatalf("prompt does not contain %q", expected)
		}
	}
	if strings.Contains(prompt, "_{{_") {
		t.Fatal("prompt contains unresolved template syntax")
	}
}

func TestBuildAgentSystemPromptContainsUnifiedCapabilities(t *testing.T) {
	prompt := buildAgentSystemPrompt(ChatRequest{
		Context: ChatContext{Language: "中文"},
	})

	for _, expected := range []string{
		"## 资源解释与日常查询",
		"## 故障定位",
		"## 日志诊断",
		"## 命名空间巡检",
		"## 集群巡检",
		"## 变更与安全边界",
		"## vis-chart 可视化",
		"vis line",
		"vis area",
		"vis pie",
		"vis column",
		"vis bar",
		"vis liquid",
		"vis histogram",
		"vis table",
	} {
		if !strings.Contains(prompt, expected) {
			t.Fatalf("prompt does not contain unified capability %q", expected)
		}
	}

	for _, forbidden := range []string{
		"A2UI",
		"A2UISchemaSummary",
		"CurrentSkill",
		"多租户",
		"当前组织",
	} {
		if strings.Contains(prompt, forbidden) {
			t.Fatalf("prompt contains removed capability %q", forbidden)
		}
	}
}

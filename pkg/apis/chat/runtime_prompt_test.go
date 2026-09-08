package chat

import (
	"strings"
	"testing"
)

func TestBuildAgentSystemPromptUsesExplicitSkillID(t *testing.T) {
	prompt := buildAgentSystemPrompt(ChatRequest{
		SkillId:  "k8s-cluster-inspect",
		Question: "这段用户输入必须原样传递",
		Context: ChatContext{
			Language: "中文",
			Cluster:  "cluster-a",
		},
	})

	for _, expected := range []string{
		"当前场景参数 `skillId`：**k8s-cluster-inspect**",
		"`k8s-cluster-inspect`：严格执行“集群巡检”要求",
		"原生结构化 function calling / tool calls",
		"禁止在用户可见正文中输出、模拟或转录任何工具协议标记",
	} {
		if !strings.Contains(prompt, expected) {
			t.Fatalf("prompt does not contain %q", expected)
		}
	}
}

func TestBuildAgentSystemPromptKeepsQuestionOutOfTemplate(t *testing.T) {
	question := "user-question-sentinel-7f3c"
	prompt := buildAgentSystemPrompt(ChatRequest{
		SkillId:  "k8s-default",
		Question: question,
		Context: ChatContext{
			Language: "中文",
		},
	})

	if !strings.Contains(prompt, "当前场景参数 `skillId`：**k8s-default**") {
		t.Fatal("explicit default skill was not used")
	}
	if strings.Contains(prompt, question) {
		t.Fatal("user question was injected into the system prompt")
	}
}

func TestBuildADKUserContentPreservesQuestion(t *testing.T) {
	question := "集群巡检 <function=must-remain-unchanged>"
	content := buildADKUserContent(ChatRequest{Question: question})
	if len(content.Parts) != 1 || content.Parts[0].Text != question {
		t.Fatalf("question was changed: %#v", content.Parts)
	}
}

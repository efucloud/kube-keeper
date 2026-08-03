package mcp

import "github.com/efucloud/kube-keeper/pkg/embeds"

var KubernetesExpertSystemPrompt string

func init() {
	KubernetesExpertSystemPrompt = embeds.GetSystemPrompt()
	if KubernetesExpertSystemPrompt == "" {
		panic("KubernetesExpertSystemPrompt is empty")
	}
}

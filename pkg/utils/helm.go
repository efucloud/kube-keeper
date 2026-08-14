package utils

import (
	"fmt"
	"github.com/efucloud/kube-keeper/pkg/config"
	"helm.sh/helm/v3/pkg/action"
	"k8s.io/cli-runtime/pkg/genericclioptions"
	restclient "k8s.io/client-go/rest"
)

// HelmActionConfigFromRestConfig 创建 Helm action.Configuration 从 *rest.Config
func HelmActionConfigFromRestConfig(cfg *restclient.Config, namespace string) (*action.Configuration, error) {
	// 创建 ConfigFlags（禁用 kubeconfig 文件加载）
	configFlags := genericclioptions.NewConfigFlags(false)

	// 关键：通过 WithWrapConfigFn 注入你的 *rest.Config
	configFlags.WrapConfigFn = func(*restclient.Config) *restclient.Config {
		return cfg // 直接返回你已有的 config
	}

	// 可选：显式设置 namespace（Helm 会用它作为默认 ns）
	configFlags.Namespace = &namespace

	actionConfig := new(action.Configuration)
	if err := actionConfig.Init(
		configFlags, // ← 这才是正确的 RESTClientGetter
		namespace,
		"secret", // 存储驱动（通常为 "secret"）
		func(format string, v ...interface{}) {
			// 日志回调
			config.Logger.Debug(fmt.Sprintf(format, v...))
		},
	); err != nil {
		return nil, err
	}

	return actionConfig, nil
}

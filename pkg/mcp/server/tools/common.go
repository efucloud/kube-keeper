package tools

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"github.com/efucloud/common"
	"github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/k8scluster"
	"github.com/efucloud/kube-keeper/pkg/k8scluster/database"
	dtos2 "github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/google/go-containerregistry/pkg/authn"
	corev1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"strings"
)

func getDockerAuthFromNamespace(ctx context.Context, clusterCode, registryHost string) (authn.Authenticator, error) {
	// 获取集群信息
	clusterSvc := database.ClusterService{}
	var cluster dtos2.ClusterDetail
	var errorData common.ErrorData

	if len(clusterCode) > 0 {
		cluster, errorData = clusterSvc.GetClusterByCode(ctx, clusterCode)
	} else {
		// 如果未来支持 ClusterID，可扩展
		return authn.Anonymous, fmt.Errorf("clusterCode is required")
	}
	if errorData.IsNotNil() {
		return authn.Anonymous, errorData.Err
	}

	clientSet, errorData := k8scluster.NewAdminClientSetForConfigByCluster(cluster)
	if errorData.IsNotNil() {
		return authn.Anonymous, errorData.Err
	}

	// 列出所有 dockerconfigjson 类型的 secret
	listSecrets, err := clientSet.K8sClientSet.CoreV1().Secrets(corev1.NamespaceAll).List(ctx, metav1.ListOptions{
		FieldSelector: "type=kubernetes.io/dockerconfigjson",
	})
	if err != nil {
		return authn.Anonymous, err
	}

	for _, secret := range listSecrets.Items {
		if data, ok := secret.Data[".dockerconfigjson"]; ok {
			var imageAuth dtos2.ImageRegistryAuth
			if er := json.Unmarshal(data, &imageAuth); er == nil {

				for registry, value := range imageAuth.Auths {
					if registry == registryHost {
						username, password := value.Username, value.Password
						if username == "" || password == "" {
							if a, err := base64.StdEncoding.DecodeString(value.Auth); err == nil && strings.Contains(string(a), ":") {
								parts := strings.SplitN(string(a), ":", 2)
								if len(parts) == 2 {
									username, password = parts[0], parts[1]
								}
							}
						}
						if username != "" && password != "" {
							config.Logger.Infof("registry: %s use auth: %s", registryHost, username)
							return &authn.Basic{Username: username, Password: password}, nil
						}
					}
				}
			}
		}
	}
	config.Logger.Infof("registry: %s use Anonymous auth", registryHost)

	// 未找到匹配凭证 → 匿名访问
	return authn.Anonymous, nil
}

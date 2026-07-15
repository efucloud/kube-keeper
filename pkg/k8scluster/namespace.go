package k8scluster

import (
	"context"
	"crypto/tls"
	"crypto/x509"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"github.com/efucloud/common"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	database2 "github.com/efucloud/kube-keeper/pkg/k8scluster/database"
	dtos2 "github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/efucloud/kube-keeper/pkg/structs"
	"github.com/efucloud/kube-keeper/pkg/utils"
	"github.com/emicklei/go-restful/v3"
	"github.com/google/go-containerregistry/pkg/authn"
	"github.com/google/go-containerregistry/pkg/name"
	"github.com/google/go-containerregistry/pkg/v1/remote"
	"github.com/google/go-containerregistry/pkg/v1/tarball"
	corev1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"net/http"
	"strconv"
	"strings"
)

type NamespaceService struct {
}

type registryAuthEntry struct {
	Registry string
	Username string
	Password string
}

type registryAccessProfile struct {
	Registry  string
	Username  string
	Password  string
	Auth      authn.Authenticator
	Transport http.RoundTripper
}

func (svc *NamespaceService) namespaceClusterClientSet(ctx context.Context, requestInfo structs.RequestInfo) (*ClusterClientSet, error) {
	var (
		cluster   dtos2.ClusterDetail
		errorData common.ErrorData
	)
	clusterSvc := database2.ClusterService{}
	if len(requestInfo.ClusterCode) > 0 {
		cluster, errorData = clusterSvc.GetClusterByCode(ctx, requestInfo.ClusterCode)
	} else {
		cluster, errorData = clusterSvc.GetClusterByID(ctx, requestInfo.ClusterId)
	}
	if errorData.IsNotNil() {
		return nil, errorData.Err
	}

	clientSet, errorData := NewAdminClientSetForConfigByCluster(cluster)
	if errorData.IsNotNil() {
		return nil, errorData.Err
	}
	return clientSet, nil
}

func (svc *NamespaceService) loadNamespaceRegistryProfiles(ctx context.Context, requestInfo structs.RequestInfo) ([]registryAccessProfile, error) {
	clientSet, err := svc.namespaceClusterClientSet(ctx, requestInfo)
	if err != nil {
		return nil, err
	}

	secrets, err := clientSet.K8sClientSet.CoreV1().Secrets(requestInfo.Namespace).List(ctx, metav1.ListOptions{})
	if err != nil {
		return nil, err
	}

	var profiles []registryAccessProfile
	for i := range secrets.Items {
		secret := secrets.Items[i]
		transport := buildRegistryTransportFromSecret(secret)

		var entries []registryAuthEntry
		if data, ok := secret.Data[corev1.DockerConfigJsonKey]; ok && len(data) > 0 {
			entries = append(entries, parseDockerConfigJSONAuthEntries(data)...)
		}
		if data, ok := secret.Data[corev1.DockerConfigKey]; ok && len(data) > 0 {
			entries = append(entries, parseDockerCfgAuthEntries(data)...)
		}

		for _, entry := range entries {
			if entry.Registry == "" {
				continue
			}
			auth := authn.Anonymous
			if entry.Username != "" || entry.Password != "" {
				auth = &authn.Basic{
					Username: entry.Username,
					Password: entry.Password,
				}
			}
			profiles = append(profiles, registryAccessProfile{
				Registry:  entry.Registry,
				Username:  entry.Username,
				Password:  entry.Password,
				Auth:      auth,
				Transport: transport,
			})
		}
	}
	return uniqueRegistryProfiles(profiles), nil
}

func parseDockerConfigJSONAuthEntries(raw []byte) []registryAuthEntry {
	type authItem struct {
		Username string `json:"username"`
		Password string `json:"password"`
		Auth     string `json:"auth"`
	}
	type cfg struct {
		Auths map[string]authItem `json:"auths"`
	}

	if len(raw) == 0 {
		return nil
	}
	var parsed cfg
	if err := json.Unmarshal(raw, &parsed); err != nil {
		return nil
	}

	var result []registryAuthEntry
	for registry, item := range parsed.Auths {
		username, password := resolveRegistryUserPass(item.Username, item.Password, item.Auth)
		result = append(result, registryAuthEntry{
			Registry: normalizeRegistryHost(registry),
			Username: username,
			Password: password,
		})
	}
	return result
}

func parseDockerCfgAuthEntries(raw []byte) []registryAuthEntry {
	type authItem struct {
		Username string `json:"username"`
		Password string `json:"password"`
		Auth     string `json:"auth"`
	}

	if len(raw) == 0 {
		return nil
	}
	var parsed map[string]authItem
	if err := json.Unmarshal(raw, &parsed); err != nil {
		return nil
	}

	var result []registryAuthEntry
	for registry, item := range parsed {
		username, password := resolveRegistryUserPass(item.Username, item.Password, item.Auth)
		result = append(result, registryAuthEntry{
			Registry: normalizeRegistryHost(registry),
			Username: username,
			Password: password,
		})
	}
	return result
}

func resolveRegistryUserPass(username, password, auth string) (string, string) {
	if username != "" || password != "" {
		return username, password
	}

	decoded, err := base64.StdEncoding.DecodeString(strings.TrimSpace(auth))
	if err != nil {
		return "", ""
	}
	parts := strings.SplitN(string(decoded), ":", 2)
	if len(parts) != 2 {
		return "", ""
	}
	return parts[0], parts[1]
}

func uniqueRegistryProfiles(in []registryAccessProfile) []registryAccessProfile {
	seen := make(map[string]struct{}, len(in))
	out := make([]registryAccessProfile, 0, len(in))
	for _, profile := range in {
		key := strings.Join([]string{
			profile.Registry,
			profile.Username,
			profile.Password,
			strconv.FormatBool(profile.Transport != nil),
		}, "|")
		if _, ok := seen[key]; ok {
			continue
		}
		seen[key] = struct{}{}
		out = append(out, profile)
	}
	return out
}

func orderRegistryProfiles(registryHost string, in []registryAccessProfile) []registryAccessProfile {
	registryHost = normalizeRegistryHost(registryHost)
	if len(in) == 0 {
		return []registryAccessProfile{{Registry: registryHost, Auth: authn.Anonymous}}
	}

	var exact []registryAccessProfile
	var others []registryAccessProfile
	for _, profile := range in {
		if registryHostMatch(profile.Registry, registryHost) {
			exact = append(exact, profile)
		} else {
			others = append(others, profile)
		}
	}

	ordered := append(exact, others...)
	ordered = append(ordered, registryAccessProfile{Registry: registryHost, Auth: authn.Anonymous})
	return ordered
}

func registryHostMatch(a, b string) bool {
	a = normalizeRegistryHost(a)
	b = normalizeRegistryHost(b)
	if a == b {
		return true
	}
	return isDockerHubHost(a) && isDockerHubHost(b)
}

func normalizeRegistryHost(registry string) string {
	registry = strings.TrimSpace(registry)
	registry = strings.TrimPrefix(registry, "https://")
	registry = strings.TrimPrefix(registry, "http://")
	registry = strings.TrimSuffix(registry, "/")
	registry = strings.TrimSuffix(registry, "/v1")
	registry = strings.TrimSuffix(registry, "/v1/")
	registry = strings.TrimSuffix(registry, "/v2")
	registry = strings.TrimSuffix(registry, "/v2/")
	if strings.Contains(registry, "/") {
		registry = strings.Split(registry, "/")[0]
	}
	if registry == "" {
		return "docker.io"
	}
	return strings.ToLower(registry)
}

func isDockerHubHost(registry string) bool {
	switch normalizeRegistryHost(registry) {
	case "docker.io", "registry-1.docker.io", "index.docker.io":
		return true
	default:
		return false
	}
}

func buildRegistryTransportFromSecret(secret corev1.Secret) http.RoundTripper {
	ca := firstSecretData(secret.Data, "ca.crt", "tls-ca.crt", "registry-ca.crt")
	clientCert := firstSecretData(secret.Data, "tls.crt", "client.crt")
	clientKey := firstSecretData(secret.Data, "tls.key", "client.key")

	insecure := secretDataBool(secret.Data, "insecure-skip-tls-verify", "insecureSkipTLSVerify", "insecure")
	for _, key := range []string{
		"registry.efucloud.io/insecure-skip-tls-verify",
		"efucloud.io/insecure-skip-tls-verify",
		"insecure-skip-tls-verify",
	} {
		if parseBoolString(secret.Annotations[key]) {
			insecure = true
			break
		}
	}

	if len(ca) == 0 && len(clientCert) == 0 && len(clientKey) == 0 && !insecure {
		return nil
	}

	tlsConfig := &tls.Config{
		MinVersion: tls.VersionTLS12,
	}

	if insecure {
		tlsConfig.InsecureSkipVerify = true
	}
	if len(ca) > 0 {
		pool := x509.NewCertPool()
		if pool.AppendCertsFromPEM(ca) {
			tlsConfig.RootCAs = pool
		}
	}
	if len(clientCert) > 0 && len(clientKey) > 0 {
		cert, err := tls.X509KeyPair(clientCert, clientKey)
		if err == nil {
			tlsConfig.Certificates = []tls.Certificate{cert}
		}
	}

	transport, ok := http.DefaultTransport.(*http.Transport)
	if !ok {
		return nil
	}
	cloned := transport.Clone()
	cloned.TLSClientConfig = tlsConfig
	return cloned
}

func firstSecretData(data map[string][]byte, keys ...string) []byte {
	for _, key := range keys {
		if v, ok := data[key]; ok && len(v) > 0 {
			return v
		}
	}
	return nil
}

func secretDataBool(data map[string][]byte, keys ...string) bool {
	for _, key := range keys {
		if v, ok := data[key]; ok && parseBoolString(string(v)) {
			return true
		}
	}
	return false
}

func parseBoolString(v string) bool {
	v = strings.TrimSpace(strings.ToLower(v))
	if v == "" {
		return false
	}
	b, err := strconv.ParseBool(v)
	return err == nil && b
}

// StreamImageAsTar 将镜像以 OCI tar 格式流式写入 w（如 http.ResponseWriter）
func (svc *NamespaceService) StreamImageAsTar(ctx context.Context, requestInfo structs.RequestInfo, imageWithTag string, req *restful.Request, resp *restful.Response) {
	var errorData common.ErrorData
	ref, err := name.ParseReference(imageWithTag)
	if err != nil {
		errorData.Err = err
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}

	registryHost := ref.Context().RegistryStr()

	var auth authn.Authenticator = authn.Anonymous // 默认匿名
	// Step 3: 查询该命名空间下是否配置了此 registry 的认证
	var (
		cluster     dtos2.ClusterDetail
		clientSet   *ClusterClientSet
		listSecrets *corev1.SecretList
	)
	clusterSvc := database2.ClusterService{}
	if len(requestInfo.ClusterCode) > 0 {
		cluster, errorData = clusterSvc.GetClusterByCode(ctx, requestInfo.ClusterCode)
	} else {
		cluster, errorData = clusterSvc.GetClusterByID(ctx, requestInfo.ClusterId)
	}
	if errorData.IsNotNil() {
		config2.Logger.Error(errorData.Err)
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	clientSet, errorData = NewAdminClientSetForConfigByCluster(cluster)
	if errorData.IsNotNil() {
		config2.Logger.Error(errorData.Err)
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	listSecrets, errorData.Err = clientSet.K8sClientSet.CoreV1().Secrets(requestInfo.Namespace).List(ctx, metav1.ListOptions{
		FieldSelector: "type=kubernetes.io/dockerconfigjson",
	})
	if len(listSecrets.Items) > 0 {
		for _, secret := range listSecrets.Items {
			if data, ok := secret.Data[".dockerconfigjson"]; ok {
				var imageAuth dtos2.ImageRegistryAuth
				if er := json.Unmarshal(data, &imageAuth); er == nil {
					for registry, value := range imageAuth.Auths {
						if registry == registryHost {
							if len(value.Username) == 0 || len(value.Password) == 0 {
								a, _ := base64.StdEncoding.DecodeString(value.Auth)
								if len(a) > 0 && strings.Contains(string(a), ":") {
									if p := strings.Split(string(a), ":"); len(p) == 2 {
										value.Username = p[0]
										value.Password = p[1]
									}
								}
							}
							auth = &authn.Basic{
								Username: value.Username,
								Password: value.Password,
							}
							break
						}

					}
				} else {
					config2.Logger.Error(er)
				}
			}
		}
	}
	// 拉取镜像
	img, err := remote.Image(ref, remote.WithAuth(auth), remote.WithContext(ctx))
	if err != nil {
		config2.Logger.Error("Failed to pull image for streaming", "image", imageWithTag, "error", err)
		errorData.Err = err
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	safeName := utils.SanitizeImageNameForFilename(imageWithTag)
	filename := safeName + ".tar"
	resp.Header().Add("Content-Type", "application/octet-stream")
	resp.Header().Add("Content-Disposition", `attachment; filename="`+filename+`"`)
	resp.Header().Add("Cache-Control", "no-cache")
	resp.Header().Add("X-Content-Type-Options", "nosniff")
	// 直接写入 io.Writer（不经过文件）
	if err := tarball.Write(ref, img, resp); err != nil {
		config2.Logger.Error("Failed to stream image as tar", "image", imageWithTag, "error", err)
		errorData.Err = err
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}

}
func (svc *NamespaceService) NamespaceImageConfigFile(ctx context.Context, requestInfo structs.RequestInfo, imageWithTag string) (string, error) {
	ref, err := name.ParseReference(imageWithTag)
	if err != nil {
		return "", err
	}

	profiles, err := svc.loadNamespaceRegistryProfiles(ctx, requestInfo)
	if err != nil {
		config2.Logger.Error(err)
		return "", err
	}
	ordered := orderRegistryProfiles(ref.Context().RegistryStr(), profiles)

	var lastErr error
	for _, profile := range ordered {
		opts := []remote.Option{remote.WithContext(ctx), remote.WithAuth(profile.Auth)}
		if profile.Transport != nil {
			opts = append(opts, remote.WithTransport(profile.Transport))
		}

		img, err := remote.Image(ref, opts...)
		if err != nil {
			lastErr = err
			continue
		}

		configFile, err := img.ConfigFile()
		if err != nil {
			lastErr = err
			continue
		}
		data, _ := json.Marshal(configFile)
		return string(data), nil
	}

	if lastErr != nil {
		config2.Logger.Error("Failed to fetch image config file", "image", imageWithTag, "error", lastErr)
		return "", lastErr
	}
	return "", fmt.Errorf("failed to fetch image config file")
}

// NamespaceImageSearch 返回指定镜像仓库的所有 tags
func (svc *NamespaceService) NamespaceImageSearch(ctx context.Context, requestInfo structs.RequestInfo, imageWithTag string) []string {
	// Step 1: 标准化镜像为完整仓库路径（不含 tag）
	fullRepo, err := utils.NormalizeImageToRepo(imageWithTag)
	if err != nil {
		return nil
	}
	// Step 2: 提取 registry 主机（用于匹配凭证）
	repoRef, err := name.NewRepository(fullRepo)
	if err != nil {
		return nil
	}
	registryHost := repoRef.RegistryStr()
	profiles, err := svc.loadNamespaceRegistryProfiles(ctx, requestInfo)
	if err != nil {
		config2.Logger.Error(err)
		return nil
	}
	ordered := orderRegistryProfiles(registryHost, profiles)

	var tags []string
	var lastErr error
	for _, profile := range ordered {
		opts := []remote.Option{remote.WithContext(ctx), remote.WithAuth(profile.Auth)}
		if profile.Transport != nil {
			opts = append(opts, remote.WithTransport(profile.Transport))
		}
		tags, err = remote.List(repoRef, opts...)
		if err != nil {
			lastErr = err
			continue
		}
		break
	}
	if err != nil {
		config2.Logger.Error(lastErr)
		return nil
	}

	var fullImageRefs []string
	for i := len(tags) - 1; i >= 0; i-- {
		tag := tags[i]
		// 可选：跳过明显无效的 tag（如只含空白、或以 sha256: 开头——虽然 List 通常不返回 digest）
		tag = strings.TrimSpace(tag)
		if tag == "" || strings.HasPrefix(tag, "sha256:") || strings.HasPrefix(tag, "sha256-") {
			continue
		}
		// 可选：校验 tag 是否符合 Docker 标签规范（RFC）
		// 简单规则：非空、不含 /、长度 <= 128、只含 [a-zA-Z0-9._-]
		//if !isValidTag(tag) {
		//	config.Logger.Debug("Skipping invalid tag", "tag", tag, "repo", fullRepo)
		//	continue
		//}
		if !common.StringInArray(tag, fullImageRefs) {
			fullImageRefs = append(fullImageRefs, tag)
		}
	}

	return fullImageRefs
}
func (svc *NamespaceService) NamespaceDelete(ctx context.Context, requestInfo structs.RequestInfo, namespace string) (errorData common.ErrorData) {
	//判断用户是否为集群管理员
	clAccRoleSvc := database2.ClusterAccountRoleService{}
	acc, _ := clAccRoleSvc.GetClusterAccountRoleByAccountIdAndRoleName(ctx, requestInfo, requestInfo.AccountId, config2.ClusterAdmin)
	if len(acc.ID) == 0 {
		errorData.MsgCode = config2.MsgCodeCurrentActionIsForbidden
		errorData.Err = fmt.Errorf("current user hasn`t cluster admin permission")
		return
	}
	var clientSet *ClusterClientSet
	_, clientSet, errorData = GetClusterAndUserClientSet(ctx, requestInfo)
	if errorData.IsNotNil() {
		config2.Logger.Error(errorData.Err)
		return
	}
	//删除命名空间授权记录
	relateSvc := database2.ClusterNamespaceAccountRoleService{}
	errorData = relateSvc.DeleteClusterNamespaceAccountRoleByNamespace(ctx, requestInfo, namespace)
	if errorData.IsNotNil() {
		config2.Logger.Error(errorData.Err)
		return
	}
	//修改数据库中的命名空间
	nsSvc := database2.ClusterNamespaceService{}
	errorData = nsSvc.DeleteClusterNamespace(ctx, requestInfo.ClusterId, namespace)
	if errorData.IsNotNil() {
		config2.Logger.Error(errorData.Err)
		return
	}
	//删除集群的命名空间
	errorData.Err = clientSet.K8sClientSet.CoreV1().Namespaces().Delete(ctx, namespace, metav1.DeleteOptions{})
	if errorData.IsNotNil() {
		config2.Logger.Error(errorData.Err)
	}
	return
}

func (svc *NamespaceService) ImagePullSecrets(ctx context.Context, requestInfo structs.RequestInfo) (secrets []string) {
	var (
		cluster   dtos2.ClusterDetail
		clientSet *ClusterClientSet
		errorData common.ErrorData
	)
	clusterSvc := database2.ClusterService{}
	cluster, errorData = clusterSvc.GetClusterByCode(ctx, requestInfo.ClusterCode)
	if errorData.IsNotNil() {
		config2.Logger.Error(errorData.Err)
		return
	}
	clientSet, errorData = NewAdminClientSetForConfigByCluster(cluster)
	if errorData.IsNotNil() {
		config2.Logger.Error(errorData.Err)
		return
	}
	option := metav1.ListOptions{
		Limit:         int64(100),
		FieldSelector: fmt.Sprintf("type=%s", "kubernetes.io/dockerconfigjson"),
	}
	secret, _ := clientSet.K8sClientSet.CoreV1().Secrets(requestInfo.Namespace).List(ctx, option)
	for _, item := range secret.Items {
		secrets = append(secrets, item.Name)
	}
	return
}
func (svc *NamespaceService) Dashboard(ctx context.Context, requestInfo structs.RequestInfo) (dashboard dtos2.NamespaceDashboard, errorData common.ErrorData) {
	var (
		cluster   dtos2.ClusterDetail
		clientSet *ClusterClientSet
	)
	clusterSvc := database2.ClusterService{}
	cluster, errorData = clusterSvc.GetClusterByCode(ctx, requestInfo.ClusterCode)
	if errorData.IsNotNil() {
		config2.Logger.Error(errorData.Err)
		return
	}
	clientSet, errorData = NewAdminClientSetForConfigByCluster(cluster)
	if errorData.IsNotNil() {
		config2.Logger.Error(errorData.Err)
		return
	}
	option := metav1.ListOptions{
		Limit: int64(1),
	}
	var m int64
	pod, _ := clientSet.K8sClientSet.CoreV1().Pods(requestInfo.Namespace).List(ctx, option)
	dashboard.Pods = int64(len(pod.Items))
	if pod.ListMeta.RemainingItemCount != nil {
		m = *pod.ListMeta.RemainingItemCount
		dashboard.Pods += m
	}
	deploy, _ := clientSet.K8sClientSet.AppsV1().Deployments(requestInfo.Namespace).List(ctx, option)
	dashboard.Deployments = int64(len(deploy.Items))
	if deploy.ListMeta.RemainingItemCount != nil {
		m = *deploy.ListMeta.RemainingItemCount
		dashboard.Deployments += m
	}
	st, _ := clientSet.K8sClientSet.AppsV1().StatefulSets(requestInfo.Namespace).List(ctx, option)
	dashboard.StatefulSets = int64(len(st.Items))
	if st.ListMeta.RemainingItemCount != nil {
		m = *st.ListMeta.RemainingItemCount
		dashboard.StatefulSets += m
	}
	ds, _ := clientSet.K8sClientSet.AppsV1().DaemonSets(requestInfo.Namespace).List(ctx, option)
	dashboard.DaemonSets = int64(len(ds.Items))
	if ds.ListMeta.RemainingItemCount != nil {
		m = *ds.ListMeta.RemainingItemCount
		dashboard.DaemonSets += m
	}
	job, _ := clientSet.K8sClientSet.BatchV1().Jobs(requestInfo.Namespace).List(ctx, option)
	dashboard.Job = int64(len(job.Items))
	if job.ListMeta.RemainingItemCount != nil {
		m = *job.ListMeta.RemainingItemCount
		dashboard.Job += m
	}
	cronjob, _ := clientSet.K8sClientSet.BatchV1().CronJobs(requestInfo.Namespace).List(ctx, option)
	dashboard.CronJob = int64(len(cronjob.Items))
	if cronjob.ListMeta.RemainingItemCount != nil {
		m = *cronjob.ListMeta.RemainingItemCount
		dashboard.CronJob += m
	}
	configmap, _ := clientSet.K8sClientSet.CoreV1().ConfigMaps(requestInfo.Namespace).List(ctx, option)
	dashboard.ConfigMap = int64(len(configmap.Items))
	if configmap.ListMeta.RemainingItemCount != nil {
		m = *configmap.ListMeta.RemainingItemCount
		dashboard.ConfigMap += m
	}
	secret, _ := clientSet.K8sClientSet.CoreV1().Secrets(requestInfo.Namespace).List(ctx, option)
	dashboard.Secret = int64(len(secret.Items))
	if secret.ListMeta.RemainingItemCount != nil {
		m = *secret.ListMeta.RemainingItemCount
		dashboard.Secret += m
	}
	service, _ := clientSet.K8sClientSet.CoreV1().Services(requestInfo.Namespace).List(ctx, option)
	dashboard.Service = int64(len(service.Items))
	if service.ListMeta.RemainingItemCount != nil {
		m = *service.ListMeta.RemainingItemCount
		dashboard.Service += m
	}
	ingress, _ := clientSet.K8sClientSet.NetworkingV1().Ingresses(requestInfo.Namespace).List(ctx, option)
	dashboard.Ingress = int64(len(ingress.Items))
	if ingress.ListMeta.RemainingItemCount != nil {
		m = *ingress.ListMeta.RemainingItemCount
		dashboard.Ingress += m
	}
	option.FieldSelector = "type=helm.sh/release.v1"
	helm, _ := clientSet.K8sClientSet.CoreV1().Secrets(requestInfo.Namespace).List(ctx, option)
	dashboard.HelmInstance = int64(len(helm.Items))
	if helm.ListMeta.RemainingItemCount != nil {
		m = *helm.ListMeta.RemainingItemCount
		dashboard.HelmInstance += m
	}
	option.FieldSelector = ""
	pvc, _ := clientSet.K8sClientSet.CoreV1().PersistentVolumeClaims(requestInfo.Namespace).List(ctx, option)
	dashboard.PVC = int64(len(pvc.Items))
	if pvc.ListMeta.RemainingItemCount != nil {
		m = *pvc.ListMeta.RemainingItemCount
		dashboard.PVC += m
	}
	return
}

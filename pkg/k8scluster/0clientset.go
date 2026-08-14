package k8scluster

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"github.com/efucloud/common"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/inital"
	database2 "github.com/efucloud/kube-keeper/pkg/k8scluster/database"
	dtos2 "github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/efucloud/kube-keeper/pkg/models/trans"
	"github.com/efucloud/kube-keeper/pkg/openshift"
	"github.com/efucloud/kube-keeper/pkg/structs"
	"github.com/efucloud/kube-keeper/pkg/utils"
	"github.com/ghodss/yaml"
	authv1 "k8s.io/api/authorization/v1"
	v1 "k8s.io/api/core/v1"
	"k8s.io/apiextensions-apiserver/pkg/client/clientset/clientset"
	"k8s.io/apimachinery/pkg/api/meta"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime/schema"
	"k8s.io/apimachinery/pkg/types"
	"k8s.io/client-go/discovery"
	"k8s.io/client-go/dynamic"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
	"k8s.io/client-go/restmapper"
	"k8s.io/client-go/tools/clientcmd"
	clientSetMetrics "k8s.io/metrics/pkg/client/clientset/versioned"
	"strings"
)

const (
	defaultQPS   = 1e6
	defaultBurst = 1e6
)

type ClusterClientSet struct {
	K8sClientSet     *kubernetes.Clientset
	K8sExClient      *clientset.Clientset
	OcpClientSet     *openshift.Clientset
	DynamicClient    dynamic.Interface
	ClientSetMetrics *clientSetMetrics.Clientset
	Config           *rest.Config
	DiscoveryClient  *discovery.DiscoveryClient
}

// CanIUseByGVK checks if the current user can perform 'verb' on a resource identified by apiVersion and kind in the given namespace.
func (client *ClusterClientSet) CanIUseByGVK(ctx context.Context, apiVersion, kind, namespace, verb string) bool {
	// Parse group and version from apiVersion
	var group, version string
	if strings.Contains(apiVersion, "/") {
		parts := strings.SplitN(apiVersion, "/", 2)
		group, version = parts[0], parts[1]
	} else {
		// e.g., "v1" => core group (empty string), version = "v1"
		group, version = "", apiVersion
	}
	// Use discovery client to find the resource name for the given kind
	discoveryClient := client.K8sClientSet.Discovery()
	apiResourceList, err := discoveryClient.ServerResourcesForGroupVersion(apiVersion)
	if err != nil {
		// Could not discover resources (e.g., invalid API version or no access)
		return false
	}
	var resource string
	for _, r := range apiResourceList.APIResources {
		if r.Kind == kind {
			resource = r.Name
			break
		}
	}
	if resource == "" {
		// Kind not found in that API version
		return false
	}
	// Now perform SelfSubjectAccessReview using group, version, resource
	accessReviews := client.K8sClientSet.AuthorizationV1().SelfSubjectAccessReviews()
	response, err := accessReviews.Create(ctx, &authv1.SelfSubjectAccessReview{
		Spec: authv1.SelfSubjectAccessReviewSpec{
			ResourceAttributes: &authv1.ResourceAttributes{
				Namespace: namespace,
				Verb:      verb,
				Group:     group,
				Version:   version,
				Resource:  resource,
			},
		},
	}, metav1.CreateOptions{})
	if err != nil {
		return false
	}
	return response.Status.Allowed
}
func (client *ClusterClientSet) CanIUse(ctx context.Context, gvr *schema.GroupVersionResource, namespace, verb string) bool {
	accessReviews := client.K8sClientSet.AuthorizationV1().SelfSubjectAccessReviews()
	response, err := accessReviews.Create(ctx, &authv1.SelfSubjectAccessReview{
		Spec: authv1.SelfSubjectAccessReviewSpec{ResourceAttributes: &authv1.ResourceAttributes{
			Namespace: namespace,
			Verb:      verb,
			Group:     gvr.Group,
			Version:   gvr.Version,
			Resource:  gvr.Resource,
		}},
	}, metav1.CreateOptions{})
	if err != nil {
		// TODO: maybe return the error too
		return false
	}
	return response.Status.Allowed
}

// GetResourceMapping 使用 RESTMapper 将 GVK 转为 GVR
func (client *ClusterClientSet) GetResourceMapping(apiVersion, kind string) (*meta.RESTMapping, error) {
	gv, err := schema.ParseGroupVersion(apiVersion)
	if err != nil {
		return nil, fmt.Errorf("invalid apiVersion %q: %w", apiVersion, err)
	}
	groupResources, err := restmapper.GetAPIGroupResources(client.DiscoveryClient)
	if err != nil {
		return nil, err
	}
	mapper := restmapper.NewDiscoveryRESTMapper(groupResources)
	gvk := gv.WithKind(kind)
	mapping, err := mapper.RESTMapping(gvk.GroupKind(), gv.Version)
	if err != nil {
		// 尝试不指定版本（让 mapper 自动选择 preferred version）
		if meta.IsNoMatchError(err) {
			mapping, err = mapper.RESTMapping(gvk.GroupKind())
		}
		if err != nil {
			return nil, fmt.Errorf("unable to find REST mapping for %s: %w", gvk.String(), err)
		}
	}
	return mapping, nil
}
func (client *ClusterClientSet) GroupVersionResourcePermission(ctx context.Context, gvr *schema.GroupVersionResource, namespace, verb string) bool {

	accessReviews := client.K8sClientSet.AuthorizationV1().SelfSubjectAccessReviews()
	response, err := accessReviews.Create(ctx, &authv1.SelfSubjectAccessReview{
		Spec: authv1.SelfSubjectAccessReviewSpec{ResourceAttributes: &authv1.ResourceAttributes{
			Namespace: namespace,
			Verb:      verb,
			Group:     gvr.Group,
			Version:   gvr.Version,
			Resource:  gvr.Resource,
		}},
	}, metav1.CreateOptions{})
	if err != nil {
		// TODO: maybe return the error too
		return false
	}
	return response.Status.Allowed
}

// NewForConfig creates a new ClusterClientSet for the given config.
func NewForConfig(c *rest.Config, clusterType string, impersonate string) (*ClusterClientSet, error) {
	clientSet := ClusterClientSet{}
	clientSet.Config = c
	if cs, err := kubernetes.NewForConfig(c); err == nil {
		clientSet.K8sClientSet = cs
	} else {
		return nil, err
	}
	if len(impersonate) > 0 {
		clientSet.Config.Impersonate = rest.ImpersonationConfig{
			UserName: impersonate,
		}
	}
	if ex, err := clientset.NewForConfig(c); err == nil {
		clientSet.K8sExClient = ex
	}

	if cli, err := clientSetMetrics.NewForConfig(c); err == nil {
		clientSet.ClientSetMetrics = cli
	}

	clientSet.DynamicClient, _ = dynamic.NewForConfig(c)
	if clusterType == config2.ClusterOpenshift {
		if cs, err := openshift.NewForConfig(c); err == nil {
			clientSet.OcpClientSet = cs
		} else {
			return nil, err
		}
	}
	clientSet.DiscoveryClient, _ = discovery.NewDiscoveryClientForConfig(c)
	return &clientSet, nil
}

// NewForConfigOrDie creates a new ClusterClientSet for the given config and
// panics if there is an error in the config.
func NewForConfigOrDie(c *rest.Config, clusterType string) *ClusterClientSet {
	cs := ClusterClientSet{}
	cs.Config = c
	cs.K8sClientSet = kubernetes.NewForConfigOrDie(c)
	cs.K8sExClient = clientset.NewForConfigOrDie(c)
	if clusterType == config2.ClusterOpenshift {
		cs.OcpClientSet = openshift.NewForConfigOrDie(c)
	}
	cs.ClientSetMetrics = clientSetMetrics.NewForConfigOrDie(c)
	cs.DynamicClient = dynamic.NewForConfigOrDie(c)
	cs.DiscoveryClient = discovery.NewDiscoveryClientForConfigOrDie(c)
	return &cs
}

// NewAdminClientSetForConfigByCluster creates a new ClusterClientSet for the given config.
func NewAdminClientSetForConfigByCluster(cluster dtos2.ClusterDetail) (clientSet *ClusterClientSet, errorData common.ErrorData) {
	var (
		rc *rest.Config
	)
	cluster.Default(context.Background())
	kc, err := BuildKubeConfigFromCluster(cluster, "kubekeeper-kubernetes-admin")
	if err != nil {
		errorData.Err = err
		config2.Logger.Error(err)
		return nil, errorData
	}
	clientConfig, err := clientcmd.NewClientConfigFromBytes(kc)
	if err == nil {
		rc, err = clientConfig.ClientConfig()
		rc.QPS = defaultQPS
		rc.Burst = defaultBurst
	} else {
		config2.Logger.Errorf("can't create client for cluster: %s(%s), err: %s",
			cluster.Name, cluster.Code, err.Error())
		errorData.Err = err
		config2.Logger.Error(err)
		return nil, errorData
	}
	clientSet, errorData.Err = NewForConfig(rc, cluster.Category, "")
	return
}

// newUserClientSetForConfigByCluster creates a new ClusterClientSet for the given config.
func newUserClientSetForConfigByCluster(cluster dtos2.ClusterDetail, csr dtos2.ClusterAccountDetail, user, namespace string) (*ClusterClientSet, error) {
	var (
		rc *rest.Config
	)
	kc, err := buildKubeConfigFromAccountCsr(cluster, csr, user, namespace)
	if err != nil {
		config2.Logger.Error(err)
		return nil, err
	}
	clientConfig, err := clientcmd.NewClientConfigFromBytes(kc)
	if err == nil {
		rc, err = clientConfig.ClientConfig()
	}
	return NewForConfig(rc, cluster.Category, "")
}

func BuildKubeConfigFromCluster(cluster dtos2.ClusterDetail, user string) ([]byte, error) {
	var caBase64, clientKeyBase64, clientCertBase64 string
	if len(cluster.CertificateAuthority) > 0 {
		caBase64 = base64.StdEncoding.EncodeToString([]byte(cluster.CertificateAuthority))
	}
	if len(cluster.ClientKey) > 0 {
		clientKeyBase64 = base64.StdEncoding.EncodeToString([]byte(cluster.ClientKey))
	}
	if len(cluster.ClientCertificate) > 0 {
		clientCertBase64 = base64.StdEncoding.EncodeToString([]byte(cluster.ClientCertificate))
	}
	cluster.Default(context.Background())
	kc := &KubeConfig{
		APIVersion: "v1",
		Clusters: Clusters{
			0: {
				Cluster{
					CertificateAuthorityData: caBase64,
					Server:                   cluster.ApiServer,
					InsecureSkipTlsVerify:    cluster.CertificateAuthority == "",
				},
				cluster.Code,
			},
		},
		Contexts: Contexts{
			0: {
				Context{
					Cluster: cluster.Code,
					User:    user,
				},
				cluster.Code,
			},
		},
		CurrentContext: cluster.Code,
		Kind:           "Config",
		Users: Users{
			0: {
				User{
					ClientCertificateData: clientCertBase64,
					ClientKeyData:         clientKeyBase64,
				},
				user,
			},
		},
	}

	return yaml.Marshal(kc)
}

func buildKubeConfigFromAccountCsr(cluster dtos2.ClusterDetail, csr dtos2.ClusterAccountDetail, user, namespace string) ([]byte, error) {

	kc := &KubeConfig{
		APIVersion: "v1",
		Clusters: Clusters{
			0: {
				Cluster{
					CertificateAuthorityData: base64.StdEncoding.EncodeToString([]byte(cluster.CertificateAuthority)),
					Server:                   cluster.ApiServer,
					InsecureSkipTlsVerify:    cluster.CertificateAuthority == "",
				},
				cluster.Code,
			},
		},
		Contexts: Contexts{
			0: {
				Context{
					Cluster:   cluster.Code,
					User:      user,
					Namespace: namespace,
				},
				cluster.Code,
			},
		},
		CurrentContext: cluster.Code,
		Kind:           "Config",
		Users: Users{
			0: {
				User{
					ClientCertificateData: base64.StdEncoding.EncodeToString([]byte(csr.ClientCertificate)),
					ClientKeyData:         base64.StdEncoding.EncodeToString([]byte(csr.ClientKey)),
				},
				user,
			},
		},
	}

	return yaml.Marshal(kc)
}

// Cluster holds the cluster data
type Cluster struct {
	CertificateAuthorityData string `json:"certificate-authority-data,omitempty" yaml:"certificate-authority-data,omitempty"`
	Server                   string `json:"server,omitempty" yaml:"server,omitempty"`
	InsecureSkipTlsVerify    bool   `json:"insecure-skip-tls-verify,omitempty" yaml:"insecure-skip-tls-verify,omitempty"` //
}

// Clusters hold an array of the clusters that would exist in the config file
type Clusters []struct {
	Cluster Cluster `json:"cluster,omitempty" yaml:"cluster,omitempty"`
	Name    string  `json:"name,omitempty" yaml:"name,omitempty"`
}

// Context holds the cluster context
type Context struct {
	Cluster   string `json:"cluster,omitempty" yaml:"cluster,omitempty"`
	User      string `json:"user,omitempty" yaml:"user,omitempty"`
	Namespace string `json:"namespace,omitempty" yaml:"namespace,omitempty"`
}

// Contexts holds an array of the contexts
type Contexts []struct {
	Context Context `json:"context,omitempty" yaml:"context,omitempty"`
	Name    string  `json:"name,omitempty" yaml:"name,omitempty"`
}

// Users holds an array of the users that would exist in the config file
type Users []struct {
	User User   `json:"user,omitempty" yaml:"user,omitempty"`
	Name string `json:"name,omitempty" yaml:"name,omitempty"`
}

// User holds the user authentication data
type User struct {
	ClientCertificateData string `json:"client-certificate-data,omitempty" json:"client-certificate-data,omitempty"`
	ClientKeyData         string `json:"client-key-data,omitempty" json:"client-key-data,omitempty"`
	Token                 string `json:"token,omitempty" yaml:"token,omitempty""`
}

// KubeConfig holds the necessary data for creating a new KubeConfig file
type KubeConfig struct {
	APIVersion     string   `gorm:"type:varchar(255);column:api_version;default:v4" json:"apiVersion,omitempty" yaml:"apiVersion,omitempty"`
	Clusters       Clusters `json:"clusters,omitempty" yaml:"clusters,omitempty"`
	Contexts       Contexts `json:"contexts,omitempty" yaml:"contexts,omitempty"`
	CurrentContext string   `json:"current-context,omitempty" json:"current-context,omitempty"`
	Kind           string   `json:"kind,omitempty" yaml:"kind,omitempty"`
	Preferences    struct{} `json:"preferences,omitempty" yaml:"preferences,omitempty"`
	Users          Users    `json:"users,omitempty" yaml:"users,omitempty"`
}

// GetClusterAndUserClientSet 使用系统中的用户信息创建clientset，存在两种情况
// 若集群跟系统本身使用同一套认证则使用用户的token创建，否则使用为用户在集群侧创建的csr创建
func GetClusterAndUserClientSet(ctx context.Context, requestInfo structs.RequestInfo) (cluster dtos2.ClusterDetail, clientSet *ClusterClientSet, errorData common.ErrorData) {
	clusterSvc := database2.ClusterService{}
	if len(requestInfo.ClusterCode) > 0 {
		cluster, errorData = clusterSvc.GetClusterByCode(ctx, requestInfo.ClusterCode)
	} else {
		cluster, errorData = clusterSvc.GetClusterByID(ctx, requestInfo.ClusterId)
	}
	if len(cluster.ID) > 0 {
		requestInfo.ClusterId = cluster.ID
	}
	if errorData.IsNotNil() || len(cluster.ID) == 0 {
		errorData.MsgCode = config2.MsgCodeGetClusterFailed
		errorData.Params = map[string]interface{}{"ClusterId": requestInfo.ClusterId}
		return
	}
	cluster.Default(ctx)
	errorData.MsgCode = config2.MsgCodeCreateClusterClientSetFailed
	csrSvc := database2.ClusterAccountService{}
	var csr dtos2.ClusterAccountDetail
	csr, errorData = csrSvc.GetClusterAccountInfoByAccountID(ctx, requestInfo.ClusterId, requestInfo.AccountId)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("%s create cluster clientset failed, err: %s", requestInfo.String(), errorData.Err.Error())
		return
	}
	if len(csr.ID) == 0 {
		errorData.Err = fmt.Errorf("%s can't get user csr", requestInfo.String())
		config2.Logger.Error(errorData.Err.Error())
		return
	}
	csr.Default(ctx)
	if csr.State != "Approved" {
		errorData.Err = fmt.Errorf("%s create cluster clientset failed, err: csr state: %s in not Approved ", requestInfo.String(), csr.State)
		config2.Logger.Error(errorData.Err.Error())
		return
	}
	namespace := requestInfo.Namespace
	if len(namespace) == 0 {
		namespace = "default"
	}
	clientSet, errorData.Err = newUserClientSetForConfigByCluster(cluster, csr, requestInfo.Email, namespace)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("%s create cluster clientset failed, err: create clientset failed: %s ", requestInfo.String(), errorData.Err.Error())
		return
	}
	return
}

// GetClusterAndAdminClientSet 使用系统中的集群配置信息创建clientset
func GetClusterAndAdminClientSet(ctx context.Context, requestInfo structs.RequestInfo) (cluster dtos2.ClusterDetail, clientSet *ClusterClientSet, errorData common.ErrorData) {
	clusterSvc := database2.ClusterService{}
	if len(requestInfo.ClusterCode) > 0 {
		cluster, errorData = clusterSvc.GetClusterByCode(ctx, requestInfo.ClusterCode)
	} else {
		cluster, errorData = clusterSvc.GetClusterByID(ctx, requestInfo.ClusterId)
	}
	if len(cluster.ID) > 0 {
		requestInfo.ClusterId = cluster.ID
	}
	if len(cluster.ID) > 0 {
		requestInfo.ClusterId = cluster.ID
	}
	if errorData.IsNotNil() || len(cluster.ID) == 0 {
		errorData.Params = map[string]interface{}{"ClusterId": requestInfo.ClusterId}
		errorData.MsgCode = config2.MsgCodeClusterIsNotFoundOrDisable
		return
	}
	cluster.Default(ctx)
	clientSet, errorData = NewAdminClientSetForConfigByCluster(cluster)
	if errorData.IsNotNil() {
		errorData.MsgCode = config2.MsgCodeCreateClusterClientSetFailed
		return
	}
	return
}
func GetClusterAndAdminClientSetByCode(ctx context.Context, clusterCode string) (cluster dtos2.ClusterDetail, clientSet *ClusterClientSet, errorData common.ErrorData) {
	clusterSvc := database2.ClusterService{}
	cluster, errorData = clusterSvc.GetClusterByCode(ctx, clusterCode)
	if errorData.IsNotNil() || len(cluster.ID) == 0 {
		errorData.Params = map[string]interface{}{"Cluster Code": clusterCode}
		errorData.MsgCode = config2.MsgCodeClusterIsNotFoundOrDisable
		return
	}
	cluster.Default(ctx)
	clientSet, errorData = NewAdminClientSetForConfigByCluster(cluster)
	if errorData.IsNotNil() {
		errorData.MsgCode = config2.MsgCodeCreateClusterClientSetFailed
		return
	}
	return
}
func SyncClusterNamespace(ctx context.Context, requestInfo structs.RequestInfo) (errorData common.ErrorData) {
	var (
		cluster      dtos2.ClusterDetail
		clientSet    *ClusterClientSet
		listOptions  metav1.ListOptions
		namespaces   []v1.Namespace
		dbNamespaces dtos2.ClusterNamespaceDetailList
	)
	ctx = context.WithValue(ctx, config2.RequestUserId, "system-cron-job")
	clusterSvc := database2.ClusterService{}
	if len(requestInfo.ClusterCode) > 0 {
		cluster, errorData = clusterSvc.GetClusterByCode(ctx, requestInfo.ClusterCode)
	} else {
		cluster, errorData = clusterSvc.GetClusterByID(ctx, requestInfo.ClusterId)
	}
	if errorData.IsNotNil() {
		config2.Logger.Error(errorData.Err)
		return
	}
	clientSet, errorData = NewAdminClientSetForConfigByCluster(cluster)
	if errorData.IsNotNil() {
		config2.Logger.Error(errorData.Err)
		return
	}
	for {
		var list *v1.NamespaceList
		list, errorData.Err = clientSet.K8sClientSet.CoreV1().Namespaces().List(ctx, listOptions)
		if errorData.IsNotNil() || len(list.Items) == 0 {
			break
		}
		namespaces = append(namespaces, list.Items...)
		listOptions.Continue = list.ListMeta.Continue
		if len(listOptions.Continue) == 0 {
			break
		}
	}
	if len(namespaces) == 0 {
		errorData.Err = nil
		return
	}
	nsSvc := database2.ClusterNamespaceService{}
	dbNamespaces, errorData = nsSvc.GetAllClusterNamespace(ctx, cluster.ID)
	if errorData.IsNotNil() {
		config2.Logger.Error(errorData.Err)
		return
	}
	dbNsMap := make(map[string]dtos2.ClusterNamespaceDetail)
	for _, ns := range dbNamespaces.Data {
		dbNsMap[ns.Namespace] = *ns
	}
	if len(dbNsMap) == 0 {
		config2.Logger.Infof("db namespaces len: %d", len(dbNsMap))
	}
	clusterNsMap := make(map[string]v1.Namespace)
	for _, ns := range namespaces {
		if ns.Status.Phase != "Active" {
			continue
		}
		clusterNsMap[ns.Name] = ns
		if item, ok := dbNsMap[ns.Name]; !ok {
			var create dtos2.ClusterNamespaceCreate
			if ws, hasWs := ns.Labels[config2.NamespaceBelongsWorkspace]; hasWs {
				create.WorkspaceCode = ws
			}
			create.Namespace = ns.Name
			create.ClusterCreateTime = ns.CreationTimestamp.Time
			create.ClusterId = cluster.ID
			create.Status = string(ns.Status.Phase)
			if v, _ := ns.Annotations[inital.LabelDescription]; v != item.Description {
				create.Description = v
			}
			nsSvc.AddClusterNamespace(ctx, create)
		} else {
			need := false
			update := trans.ClusterNamespaceDetailToClusterNamespaceUpdate(item)
			if v, _ := ns.Annotations[inital.LabelDescription]; v != item.Description {
				ns.Annotations[inital.LabelDescription] = v
				if len(item.Description) == 0 {
					need = true
					update.Description = &v
				} else {
					var patch dtos2.PatchSubsetValue
					patch.Path = "/metadata/annotations"
					patch.Op = "replace"
					patch.Value = ns.Annotations
					data, _ := json.Marshal([]dtos2.PatchSubsetValue{patch})
					_, _ = clientSet.K8sClientSet.CoreV1().Namespaces().Patch(ctx, ns.Name, types.JSONPatchType, data, metav1.PatchOptions{})
				}
			}
			if item.Status != string(ns.Status.Phase) {
				need = true
				update.Status = utils.ToPtr(string(ns.Status.Phase))
			}
			if need {
				_, _ = nsSvc.UpdateClusterNamespace(ctx, update)
			}
		}
	}
	for _, ns := range dbNamespaces.Data {
		if _, ok := clusterNsMap[ns.Namespace]; !ok {
			_ = nsSvc.DeleteClusterNamespace(ctx, requestInfo.ClusterId, ns.Namespace)
		}
	}
	return
}

package k8scluster

import (
	"context"
	"encoding/json"
	"github.com/efucloud/common"
	"github.com/efucloud/common/datatypes"
	"github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/integrations"
	database2 "github.com/efucloud/kube-keeper/pkg/k8scluster/database"
	"github.com/efucloud/kube-keeper/pkg/metrics"
	dtos2 "github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/efucloud/kube-keeper/pkg/structs"
	"github.com/efucloud/kube-keeper/pkg/utils"
	"github.com/prometheus/common/model"
	authv1 "k8s.io/api/authorization/v1"
	corev1 "k8s.io/api/core/v1"
	networkingv1 "k8s.io/api/networking/v1"
	storagev1 "k8s.io/api/storage/v1"
	"k8s.io/apimachinery/pkg/api/meta"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	"k8s.io/apimachinery/pkg/runtime/schema"
	"k8s.io/apimachinery/pkg/version"
	"k8s.io/client-go/restmapper"
	"time"
)

type ClusterService struct {
}

func (svc *ClusterService) GetClusterGatewayClasses(ctx context.Context, requestInfo structs.RequestInfo) (results []string) {
	var (
		cluster   dtos2.ClusterDetail
		clientSet *ClusterClientSet
		errorData common.ErrorData
		gwcList   *unstructured.UnstructuredList
	)
	clusterSvc := database2.ClusterService{}
	if len(requestInfo.ClusterCode) > 0 {
		cluster, errorData = clusterSvc.GetClusterByCode(ctx, requestInfo.ClusterCode)
	} else {
		cluster, errorData = clusterSvc.GetClusterByID(ctx, requestInfo.ClusterId)
	}
	if errorData.IsNotNil() {
		config.Logger.Error(errorData.Err)
		return
	}
	clientSet, errorData = NewAdminClientSetForConfigByCluster(cluster)
	if errorData.IsNotNil() {
		config.Logger.Error(errorData.Err)
		return
	}
	gatewayClassGVR := schema.GroupVersionResource{
		Group:    "gateway.networking.k8s.io",
		Version:  "v1",
		Resource: "gatewayclasses",
	}
	gwcList, errorData.Err = clientSet.DynamicClient.Resource(gatewayClassGVR).List(context.TODO(), metav1.ListOptions{})
	for _, gwc := range gwcList.Items {
		if ctlName, ok := utils.SafeNestedString(gwc.Object, "spec", "controllerName"); ok {
			status, _ := utils.SafeNestedString(gwc.Object, "status", "conditions", "0", "status")
			if status == "True" {
				results = append(results, ctlName)
			}
		}
	}
	return
}
func (svc *ClusterService) GetClusterStorageClasses(ctx context.Context, requestInfo structs.RequestInfo) (results []string) {
	var (
		cluster      dtos2.ClusterDetail
		clientSet    *ClusterClientSet
		errorData    common.ErrorData
		storageClass *storagev1.StorageClassList
	)
	clusterSvc := database2.ClusterService{}
	if len(requestInfo.ClusterCode) > 0 {
		cluster, errorData = clusterSvc.GetClusterByCode(ctx, requestInfo.ClusterCode)
	} else {
		cluster, errorData = clusterSvc.GetClusterByID(ctx, requestInfo.ClusterId)
	}
	if errorData.IsNotNil() {
		config.Logger.Error(errorData.Err)
		return
	}
	clientSet, errorData = NewAdminClientSetForConfigByCluster(cluster)
	if errorData.IsNotNil() {
		config.Logger.Error(errorData.Err)
		return
	}
	storageClass, errorData.Err = clientSet.K8sClientSet.StorageV1().StorageClasses().List(ctx, metav1.ListOptions{})
	if storageClass != nil {
		for _, item := range storageClass.Items {
			results = append(results, item.Name)
		}
	}
	return
}
func (svc *ClusterService) GetClusterIngressClasses(ctx context.Context, requestInfo structs.RequestInfo) (results []string) {
	var (
		cluster      dtos2.ClusterDetail
		clientSet    *ClusterClientSet
		errorData    common.ErrorData
		ingressClass *networkingv1.IngressClassList
	)
	clusterSvc := database2.ClusterService{}
	if len(requestInfo.ClusterCode) > 0 {
		cluster, errorData = clusterSvc.GetClusterByCode(ctx, requestInfo.ClusterCode)
	} else {
		cluster, errorData = clusterSvc.GetClusterByID(ctx, requestInfo.ClusterId)
	}
	if errorData.IsNotNil() {
		config.Logger.Error(errorData.Err)
		return
	}
	clientSet, errorData = NewAdminClientSetForConfigByCluster(cluster)
	if errorData.IsNotNil() {
		config.Logger.Error(errorData.Err)
		return
	}
	ingressClass, errorData.Err = clientSet.K8sClientSet.NetworkingV1().IngressClasses().List(ctx, metav1.ListOptions{})
	if ingressClass != nil {
		for _, item := range ingressClass.Items {
			results = append(results, item.Name)
		}
	}
	return
}
func (svc *ClusterService) ClusterConnectCheck(ctx context.Context, requestInfo structs.RequestInfo) (k8sVersion dtos2.KubernetesVersion) {
	var (
		cluster   dtos2.ClusterDetail
		clientSet *ClusterClientSet
		errorData common.ErrorData
		err       error
		ver       *version.Info
	)
	clusterSvc := database2.ClusterService{}
	if len(requestInfo.ClusterCode) > 0 {
		cluster, errorData = clusterSvc.GetClusterByCode(ctx, requestInfo.ClusterCode)
	} else {
		cluster, errorData = clusterSvc.GetClusterByID(ctx, requestInfo.ClusterId)
	}
	if errorData.IsNotNil() {
		config.Logger.Error(errorData.Err)
		return
	}
	clientSet, errorData = NewAdminClientSetForConfigByCluster(cluster)
	if errorData.IsNotNil() {
		config.Logger.Error(errorData.Err)
		return
	}
	ver, err = clientSet.K8sClientSet.ServerVersion()
	if err != nil {
		config.Logger.Error(err)
		return
	}
	return dtos2.KubernetesVersion{
		ConnectAble:  true,
		Major:        ver.Major,
		Minor:        ver.Minor,
		GitVersion:   ver.GitVersion,
		GitCommit:    ver.GitCommit,
		GitTreeState: ver.GitTreeState,
		BuildDate:    ver.BuildDate,
		GoVersion:    ver.GoVersion,
		Compiler:     ver.Compiler,
		Platform:     ver.Platform,
	}
}
func (svc *ClusterService) ServerPreferredNamespacedResources(ctx context.Context, requestInfo structs.RequestInfo) (results []*metav1.APIResourceList, errorData common.ErrorData) {
	var (
		cluster   dtos2.ClusterDetail
		clientSet *ClusterClientSet
	)
	clusterSvc := database2.ClusterService{}
	if len(requestInfo.ClusterCode) > 0 {
		cluster, errorData = clusterSvc.GetClusterByCode(ctx, requestInfo.ClusterCode)
	} else {
		cluster, errorData = clusterSvc.GetClusterByID(ctx, requestInfo.ClusterId)
	}
	if errorData.IsNotNil() {
		config.Logger.Error(errorData.Err)
		return
	}
	clientSet, errorData = NewAdminClientSetForConfigByCluster(cluster)
	if errorData.IsNotNil() {
		config.Logger.Error(errorData.Err)
		return
	}
	results, errorData.Err = clientSet.DiscoveryClient.ServerPreferredNamespacedResources()
	return
}

func (svc *ClusterService) ServerGroupsAndResources(ctx context.Context, requestInfo structs.RequestInfo) (groups []*metav1.APIGroup, results []*metav1.APIResourceList, errorData common.ErrorData) {
	var (
		cluster     dtos2.ClusterDetail
		clientSet   *ClusterClientSet
		dbgroups    []*metav1.APIGroup
		dbresources []*metav1.APIResourceList
	)
	clusterSvc := database2.ClusterService{}
	groupSvc := database2.ClusterApiGroupService{}
	resourceSvc := database2.ClusterApiResourceService{}
	if len(requestInfo.ClusterCode) > 0 {
		cluster, errorData = clusterSvc.GetClusterByCode(ctx, requestInfo.ClusterCode)
	} else {
		cluster, errorData = clusterSvc.GetClusterByID(ctx, requestInfo.ClusterId)
	}

	clientSet, errorData = NewAdminClientSetForConfigByCluster(cluster)
	if errorData.IsNotNil() {
		config.Logger.Error(errorData.Err)

	}
	if errorData.IsNil() {
		groups, results, errorData.Err = clientSet.DiscoveryClient.ServerGroupsAndResources()
		if errorData.IsNil() {
			groupDatas, _ := json.Marshal(groups)
			g, _ := groupSvc.GetClusterApiGroupByClusterId(ctx, cluster.ID)
			if len(g.ID) > 0 {
				go groupSvc.UpdateClusterApiGroup(ctx, dtos2.ClusterApiGroupUpdate{
					ID:        g.ID,
					ClusterId: g.ClusterId,
					Content:   datatypes.LongText(groupDatas),
				})
			} else {
				go groupSvc.AddClusterApiGroup(ctx, dtos2.ClusterApiGroupCreate{
					ClusterId: cluster.ID,
					Content:   datatypes.LongText(groupDatas),
				})
			}
			resourceDatas, _ := json.Marshal(results)
			r, _ := resourceSvc.GetClusterApiResourceByClusterId(ctx, cluster.ID)
			if len(r.ID) > 0 {
				go resourceSvc.UpdateClusterApiResource(ctx, dtos2.ClusterApiResourceUpdate{
					ID:        g.ID,
					ClusterId: g.ClusterId,
					Content:   datatypes.LongText(resourceDatas),
				})
			} else {
				go resourceSvc.AddClusterApiResource(ctx, dtos2.ClusterApiResourceCreate{
					ClusterId: cluster.ID,
					Content:   datatypes.LongText(resourceDatas),
				})
			}
			return
		}
	}
	if errorData.IsNotNil() {
		config.Logger.Error(errorData.Err)
		gr, _ := groupSvc.GetClusterApiGroupByClusterId(ctx, requestInfo.ClusterId)
		if len(gr.ID) > 0 {
			_ = json.Unmarshal([]byte(gr.Content), &dbgroups)
		}
		res, _ := resourceSvc.GetClusterApiResourceByClusterId(ctx, requestInfo.ClusterId)
		if len(res.ID) > 0 {
			_ = json.Unmarshal([]byte(res.Content), &dbresources)
		}
		if len(dbgroups) > 0 && len(dbresources) > 0 {
			errorData.Err = nil
			return dbgroups, dbresources, errorData
		}
		return
	}
	return
}
func (svc *ClusterService) Dashboard(ctx context.Context, requestInfo structs.RequestInfo) (dashboard dtos2.ClusterDashboard, errorData common.ErrorData) {
	var (
		cluster   dtos2.ClusterDetail
		clientSet *ClusterClientSet
	)
	clusterSvc := database2.ClusterService{}
	if len(requestInfo.ClusterCode) > 0 {
		cluster, errorData = clusterSvc.GetClusterByCode(ctx, requestInfo.ClusterCode)
	} else {
		cluster, errorData = clusterSvc.GetClusterByID(ctx, requestInfo.ClusterId)
	}
	if errorData.IsNotNil() {
		config.Logger.Error(errorData.Err)
		return
	}
	clientSet, errorData = NewAdminClientSetForConfigByCluster(cluster)
	if errorData.IsNotNil() {
		config.Logger.Error(errorData.Err)
		return
	}
	option := metav1.ListOptions{
		Limit: int64(1),
	}
	var m int64
	node, err := clientSet.K8sClientSet.CoreV1().Nodes().List(ctx, option)
	if err != nil {
		config.Logger.Error(err)
	}
	dashboard.Nodes = int64(len(node.Items))
	if node.ListMeta.RemainingItemCount != nil {
		m = *node.ListMeta.RemainingItemCount
		dashboard.Nodes += m
	}
	ns, err := clientSet.K8sClientSet.CoreV1().Namespaces().List(ctx, option)
	if err != nil {
		config.Logger.Error(err)
	}
	dashboard.Namespaces = int64(len(ns.Items))
	if ns.ListMeta.RemainingItemCount != nil {
		m = *ns.ListMeta.RemainingItemCount
		dashboard.Namespaces += m
	}
	pod, err := clientSet.K8sClientSet.CoreV1().Pods(corev1.NamespaceAll).List(ctx, option)
	if err != nil {
		config.Logger.Error(err)
	}
	dashboard.Pods = int64(len(pod.Items))
	if pod.ListMeta.RemainingItemCount != nil {
		m = *pod.ListMeta.RemainingItemCount
		dashboard.Pods += m
	}
	deploy, err := clientSet.K8sClientSet.AppsV1().Deployments(corev1.NamespaceAll).List(ctx, option)
	if err != nil {
		config.Logger.Error(err)
	}
	dashboard.Deployments = int64(len(deploy.Items))
	if deploy.ListMeta.RemainingItemCount != nil {
		m = *deploy.ListMeta.RemainingItemCount
		dashboard.Deployments += m
	}
	st, err := clientSet.K8sClientSet.AppsV1().StatefulSets(corev1.NamespaceAll).List(ctx, option)
	if err != nil {
		config.Logger.Error(err)
	}
	dashboard.StatefulSets = int64(len(st.Items))
	if st.ListMeta.RemainingItemCount != nil {
		m = *st.ListMeta.RemainingItemCount
		dashboard.StatefulSets += m
	}
	ds, err := clientSet.K8sClientSet.AppsV1().DaemonSets(corev1.NamespaceAll).List(ctx, option)
	if err != nil {
		config.Logger.Error(err)
	}
	dashboard.DaemonSets = int64(len(ds.Items))
	if ds.ListMeta.RemainingItemCount != nil {
		m = *ds.ListMeta.RemainingItemCount
		dashboard.DaemonSets += m
	}
	job, err := clientSet.K8sClientSet.BatchV1().Jobs(corev1.NamespaceAll).List(ctx, option)
	if err != nil {
		config.Logger.Error(err)
	}
	dashboard.Job = int64(len(job.Items))
	if job.ListMeta.RemainingItemCount != nil {
		m = *job.ListMeta.RemainingItemCount
		dashboard.Job += m
	}
	cronjob, err := clientSet.K8sClientSet.BatchV1().CronJobs(corev1.NamespaceAll).List(ctx, option)
	if err != nil {
		config.Logger.Error(err)
	}
	dashboard.CronJob = int64(len(cronjob.Items))
	if cronjob.ListMeta.RemainingItemCount != nil {
		m = *cronjob.ListMeta.RemainingItemCount
		dashboard.CronJob += m
	}
	configmap, err := clientSet.K8sClientSet.CoreV1().ConfigMaps(corev1.NamespaceAll).List(ctx, option)
	if err != nil {
		config.Logger.Error(err)
	}
	dashboard.ConfigMap = int64(len(configmap.Items))
	if configmap.ListMeta.RemainingItemCount != nil {
		m = *configmap.ListMeta.RemainingItemCount
		dashboard.ConfigMap += m
	}
	secret, err := clientSet.K8sClientSet.CoreV1().Secrets(corev1.NamespaceAll).List(ctx, option)
	if err != nil {
		config.Logger.Error(err)
	}
	dashboard.Secret = int64(len(secret.Items))
	if secret.ListMeta.RemainingItemCount != nil {
		m = *secret.ListMeta.RemainingItemCount
		dashboard.Secret += m
	}
	service, err := clientSet.K8sClientSet.CoreV1().Services(corev1.NamespaceAll).List(ctx, option)
	if err != nil {
		config.Logger.Error(err)
	}
	dashboard.Service = int64(len(service.Items))
	if service.ListMeta.RemainingItemCount != nil {
		m = *service.ListMeta.RemainingItemCount
		dashboard.Service += m
	}
	ingress, err := clientSet.K8sClientSet.NetworkingV1().Ingresses(corev1.NamespaceAll).List(ctx, option)
	if err != nil {
		config.Logger.Error(err)
	}
	dashboard.Ingress = int64(len(ingress.Items))
	if ingress.ListMeta.RemainingItemCount != nil {
		m = *ingress.ListMeta.RemainingItemCount
		dashboard.Ingress += m
	}
	option.FieldSelector = "type=helm.sh/release.v1"
	helm, err := clientSet.K8sClientSet.CoreV1().Secrets(corev1.NamespaceAll).List(ctx, option)
	if err != nil {
		config.Logger.Error(err)
	}
	dashboard.HelmInstance = int64(len(helm.Items))
	if helm.ListMeta.RemainingItemCount != nil {
		m = *helm.ListMeta.RemainingItemCount
		dashboard.HelmInstance += m
	}
	option.FieldSelector = ""
	pvc, err := clientSet.K8sClientSet.CoreV1().PersistentVolumeClaims(corev1.NamespaceAll).List(ctx, option)
	if err != nil {
		config.Logger.Error(err)
	}
	dashboard.PVC = int64(len(pvc.Items))
	if pvc.ListMeta.RemainingItemCount != nil {
		m = *pvc.ListMeta.RemainingItemCount
		dashboard.PVC += m
	}
	pv, err := clientSet.K8sClientSet.CoreV1().PersistentVolumes().List(ctx, option)
	if err != nil {
		config.Logger.Error(err)
	}
	dashboard.PV = int64(len(pv.Items))
	if pv.ListMeta.RemainingItemCount != nil {
		m = *pv.ListMeta.RemainingItemCount
		dashboard.PV += m
	}
	storage, err := clientSet.K8sClientSet.StorageV1().StorageClasses().List(ctx, option)
	if err != nil {
		config.Logger.Error(err)
	}
	dashboard.StorageClass = int64(len(storage.Items))
	if storage.ListMeta.RemainingItemCount != nil {
		m = *storage.ListMeta.RemainingItemCount
		dashboard.StorageClass += m
	}
	crd, err := clientSet.K8sExClient.ApiextensionsV1().CustomResourceDefinitions().List(ctx, option)
	if err != nil {
		config.Logger.Error(err)
	}
	dashboard.StorageClass = int64(len(crd.Items))
	if crd.ListMeta.RemainingItemCount != nil {
		m = *crd.ListMeta.RemainingItemCount
		dashboard.Crd += m
	}
	return
}
func (svc *ClusterService) ClusterInfo(ctx context.Context, requestInfo structs.RequestInfo) (cluster dtos2.ClusterDetail, errorData common.ErrorData) {
	var (
		ver       *version.Info
		clientSet *ClusterClientSet
	)
	clusterSvc := database2.ClusterService{}
	if len(requestInfo.ClusterCode) > 0 {
		cluster, errorData = clusterSvc.GetClusterByCode(ctx, requestInfo.ClusterCode)
	} else {
		cluster, errorData = clusterSvc.GetClusterByID(ctx, requestInfo.ClusterId)
	}
	if errorData.IsNotNil() {
		config.Logger.Error(errorData.Err)
		return
	}
	clientSet, errorData = NewAdminClientSetForConfigByCluster(cluster)
	if errorData.IsNotNil() {
		config.Logger.Error(errorData.Err)
		return
	}
	if time.Now().Minute()/10 == 1 {
		var err error
		ver, err = clientSet.K8sClientSet.DiscoveryClient.ServerVersion()
		if err != nil {
			config.Logger.Errorf("get cluster info failed, err: %s", err.Error())
		} else {
			cluster.Version = dtos2.KubernetesVersion{
				ConnectAble:  true,
				Major:        ver.Major,
				Minor:        ver.Minor,
				GitVersion:   ver.GitVersion,
				GitCommit:    ver.GitCommit,
				GitTreeState: ver.GitTreeState,
				BuildDate:    ver.BuildDate,
				GoVersion:    ver.GoVersion,
				Compiler:     ver.Compiler,
				Platform:     ver.Platform,
			}
			clusterSvc.UpdateClusterVersion(ctx, requestInfo.ClusterCode, cluster.Version)
		}

	}

	return
}
func (svc *ClusterService) GetAPIGroupResourcesAndRestMapper(ctx context.Context, requestInfo structs.RequestInfo) (grs []*restmapper.APIGroupResources, restMapper meta.RESTMapper, errorData common.ErrorData) {
	var (
		cluster   dtos2.ClusterDetail
		clientSet *ClusterClientSet
	)
	clusterSvc := database2.ClusterService{}
	cluster, errorData = clusterSvc.GetClusterByID(ctx, requestInfo.ClusterId)
	clientSet, errorData = NewAdminClientSetForConfigByCluster(cluster)
	if errorData.IsNotNil() {
		config.Logger.Error(errorData.Err)
		return
	}
	grs, errorData.Err = restmapper.GetAPIGroupResources(clientSet.K8sExClient.DiscoveryClient)
	if errorData.IsNotNil() {
		config.Logger.Errorf("get cluster: %s APIGroupResources failed, err: %s", requestInfo.ClusterId, errorData.Err.Error())

	} else {
		restMapper = restmapper.NewDiscoveryRESTMapper(grs)
	}
	return
}

func (svc *ClusterService) SubjectAccessReviews(ctx context.Context, requestInfo structs.RequestInfo, model authv1.SubjectAccessReview) (result *authv1.SubjectAccessReview, errorData common.ErrorData) {
	var (
		cluster   dtos2.ClusterDetail
		clientSet *ClusterClientSet
	)
	clusterSvc := database2.ClusterService{}
	cluster, errorData = clusterSvc.GetClusterByID(ctx, requestInfo.ClusterId)
	clientSet, errorData = NewAdminClientSetForConfigByCluster(cluster)
	if errorData.IsNotNil() {
		config.Logger.Error(errorData.Err)
		return &model, errorData
	}
	result, errorData.Err = clientSet.K8sClientSet.AuthorizationV1().SubjectAccessReviews().Create(ctx, &model, metav1.CreateOptions{})

	return
}
func (svc *ClusterService) SelfSubjectAccessReview(ctx context.Context, requestInfo structs.RequestInfo, resAttribute authv1.ResourceAttributes) (result authv1.SubjectAccessReviewStatus, errorData common.ErrorData) {
	defer func() {
		if err := recover(); err != nil {
			config.Logger.Error(err)
		}
	}()
	var (
		clientSet *ClusterClientSet
		ssar      *authv1.SelfSubjectAccessReview
	)
	sar := &authv1.SelfSubjectAccessReview{
		Spec: authv1.SelfSubjectAccessReviewSpec{
			ResourceAttributes: &resAttribute,
		},
	}
	_, clientSet, errorData = GetClusterAndUserClientSet(ctx, requestInfo)
	if errorData.IsNotNil() {
		config.Logger.Error(errorData.Err)
		result.Allowed = false
		return
	}
	ssar, errorData.Err = clientSet.K8sClientSet.AuthorizationV1().SelfSubjectAccessReviews().Create(ctx, sar, metav1.CreateOptions{})
	return ssar.Status, errorData
}
func (svc *ClusterService) PrometheusQuery(ctx context.Context, requestInfo structs.RequestInfo, queryParams dtos2.QueryParam) (result model.Vector, errorData common.ErrorData) {
	var (
		cluster dtos2.ClusterDetail
		query   dtos2.PrometheusQuery
		client  *integrations.Prometheus
	)
	clusterSvc := database2.ClusterService{}
	cluster, errorData = clusterSvc.GetClusterByID(ctx, requestInfo.ClusterId)
	if errorData.IsNotNil() {
		config.Logger.Error(errorData.Err)
		return
	}
	if cluster.ExtendConfig == nil {
		return
	}
	prometheusInfo := cluster.ExtendConfig.MonitorPrometheusConfig
	if len(prometheusInfo.Address) == 0 {
		return
	}
	queryParams.Cluster = prometheusInfo.Cluster
	query, errorData = metrics.GetPrometheusQuery(queryParams.View, queryParams.Code)
	if errorData.IsNotNil() {
		config.Logger.Error(errorData.Err)
		return
	}
	client, errorData = integrations.NewPrometheusClient(ctx, *prometheusInfo)
	if errorData.IsNotNil() {
		config.Logger.Error(errorData.Err)
		return
	}
	return client.Query(ctx, query, queryParams)

}

func (svc *ClusterService) PrometheusQueryRange(ctx context.Context, requestInfo structs.RequestInfo, queryParams dtos2.QueryParam) (result model.Matrix, errorData common.ErrorData) {
	var (
		cluster dtos2.ClusterDetail
		query   dtos2.PrometheusQuery
		client  *integrations.Prometheus
	)
	clusterSvc := database2.ClusterService{}
	cluster, errorData = clusterSvc.GetClusterByID(ctx, requestInfo.ClusterId)
	if errorData.IsNotNil() {
		config.Logger.Error(errorData.Err)
		return
	}
	if cluster.ExtendConfig == nil {
		return
	}
	prometheusInfo := cluster.ExtendConfig.MonitorPrometheusConfig
	if len(prometheusInfo.Address) == 0 {
		return
	}
	queryParams.Cluster = prometheusInfo.Cluster
	query, errorData = metrics.GetPrometheusQuery(queryParams.View, queryParams.Code)
	if errorData.IsNotNil() {
		config.Logger.Error(errorData.Err)
		return
	}

	client, errorData = integrations.NewPrometheusClient(ctx, *prometheusInfo)
	if errorData.IsNotNil() {
		config.Logger.Error(errorData.Err)
		return
	}
	return client.QueryRange(ctx, query, queryParams)

}

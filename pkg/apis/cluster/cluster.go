package cluster

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/efucloud/common"
	filters2 "github.com/efucloud/kube-keeper/pkg/apis/filters"
	"github.com/efucloud/kube-keeper/pkg/config"
	k8scluster2 "github.com/efucloud/kube-keeper/pkg/k8scluster"
	dtos2 "github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/efucloud/kube-keeper/pkg/services"
	"github.com/efucloud/kube-keeper/pkg/structs"
	restfulspec "github.com/emicklei/go-restful-openapi/v2"
	"github.com/emicklei/go-restful/v3"
	promodel "github.com/prometheus/common/model"
	authv1 "k8s.io/api/authorization/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/restmapper"
	"net/http"
	"strings"
)

func GetClusterFromRequest(req *restful.Request) (clusterId string) {
	clusterCode := req.PathParameter("cluster")
	svc := services.ClusterService{}
	cluster, _ := svc.GetClusterByCode(context.TODO(), clusterCode)
	return cluster.ID
}

type ClusterResource struct {
	Svc k8scluster2.ClusterService
}

func (r ClusterResource) AddWebService(ws *restful.WebService) {
	apiInfo := common.ApiInfo{}
	apiInfo.Tag = "cluster"
	apiInfo.Description = "集群管理扩展功能"
	common.RegisterApiInfo(apiInfo)
	apiExtend := ""
	ws.Route(ws.GET(config.ClusterAPIPrefix+apiExtend+"/info").
		Doc("获取集群信息").
		Notes("获取集群信息").
		Param(ws.HeaderParameter(config.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		To(r.info).
		Returns(http.StatusOK, "成功", dtos2.ClusterDetail{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.AuthRedirectInfo{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config.FrontApiTag, "getClusterInfo"))
	ws.Route(ws.POST(config.ClusterAPIPrefix+apiExtend+"/self-subject-access-reviews").
		Doc("判断用户是否具有某个资源的权限").
		Notes("判断用户是否具有某个资源的权限，使用用户自己的信息请求集群,使用场景示例：获取namespace列表之前请求判断用户是否有list ns的权限，判断用户是否有ns创建的权限").
		Param(ws.HeaderParameter(config.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		To(r.selfSubjectAccessReviews).
		Reads(authv1.ResourceAttributes{}).
		Returns(http.StatusOK, "成功", authv1.SubjectAccessReviewStatus{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config.FrontApiTag, "clusterSelfSubjectAccessReviews"))
	ws.Route(ws.GET(config.ClusterAPIPrefix+apiExtend+"/api-group-resources").
		Doc("获取集群APIGroupResources信息").
		Notes("获取集群APIGroupResources信息").
		Param(ws.HeaderParameter(config.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		To(r.apiGroupResources).
		Returns(http.StatusOK, "成功", []*restmapper.APIGroupResources{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.AuthRedirectInfo{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config.FrontApiTag, "clusterApiGroupResources"))
	ws.Route(ws.GET(config.ClusterAPIPrefix+apiExtend+"/role/rbac").
		Doc("获取用户在集群中的权限信息").
		Notes("获取用户在集群中的权限信息").
		Param(ws.HeaderParameter(config.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		Param(ws.QueryParameter("name", "用户名或Group名或ServiceAccount")).
		Param(ws.QueryParameter("namespace", "Namespace，在name为ServiceAccount时有效")).
		Param(ws.QueryParameter("kind", "角色类型").
			AllowableValues(map[string]string{
				"User":           "用户",
				"Group":          "群组",
				"ServiceAccount": "账户"})).
		To(r.roleRbac).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.AuthRedirectInfo{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config.FrontApiTag, "getClusterRoleRbac"))
	ws.Route(ws.GET(config.ClusterAPIPrefix+apiExtend+"/resource/dashboard").
		Doc("集群资源总览").
		Notes("集群资源总览").
		Param(ws.HeaderParameter(config.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		To(r.resourceDashboard).
		Returns(http.StatusOK, "", dtos2.ClusterDashboard{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.AuthRedirectInfo{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config.FrontApiTag, "getClusterResourceDashboard"))
	ws.Route(ws.GET(config.ClusterAPIPrefix+apiExtend+"/serverPreferredNamespacedResources").
		Doc("serverPreferredNamespacedResources").
		Notes("serverPreferredNamespacedResources").
		Param(ws.HeaderParameter(config.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		To(r.serverPreferredNamespacedResources).
		Returns(http.StatusOK, "", []metav1.APIResourceList{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.AuthRedirectInfo{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config.FrontApiTag, "serverPreferredNamespacedResources"))
	ws.Route(ws.GET(config.ClusterAPIPrefix+apiExtend+"/serverResources").
		Doc("serverResources").
		Notes("serverResources").
		Param(ws.HeaderParameter(config.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		To(r.serverResources).
		Returns(http.StatusOK, "", []metav1.APIResourceList{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.AuthRedirectInfo{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config.FrontApiTag, "serverResources"))
	ws.Route(ws.GET(config.ClusterAPIPrefix+apiExtend+"/serverGroups").
		Doc("serverGroups").
		Notes("serverGroups").
		Param(ws.HeaderParameter(config.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		To(r.serverGroups).
		Returns(http.StatusOK, "", []metav1.APIResourceList{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.AuthRedirectInfo{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config.FrontApiTag, "serverGroups"))
	ws.Route(ws.GET(config.ClusterAPIPrefix+apiExtend+"/csg").
		Doc("csg").
		Notes("csg").
		Param(ws.HeaderParameter(config.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		To(r.csg).
		Returns(http.StatusOK, "", []dtos2.ClusterServerGroup{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.AuthRedirectInfo{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config.FrontApiTag, "clusterServerGroups"))
	ws.Route(ws.POST(config.ClusterAPIPrefix+apiExtend+"/csgCheck").
		Doc("检查资源类型在集群是否存在").
		Notes("检查资源类型在集群是否存在").
		Param(ws.HeaderParameter(config.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		To(r.csgCheck).
		Reads(dtos2.ClusterServerGroupChecks{}).
		Returns(http.StatusOK, "", dtos2.ClusterServerGroupChecks{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.AuthRedirectInfo{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config.FrontApiTag, "clusterServerGroupsCheck"))
	ws.Route(ws.GET(config.ClusterAPIPrefix+apiExtend+"/apiResources").
		Doc("apiResources").
		Notes("apiResources").
		Param(ws.HeaderParameter(config.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		Param(ws.PathParameter("category", "角色类型").AllowableValues(map[string]string{"Role": "集群", "ClusterRole": "命名空间"})).
		To(r.apiResources).
		Returns(http.StatusOK, "", map[string][]metav1.APIResource{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.AuthRedirectInfo{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config.FrontApiTag, "clusterApiResources"))
	ws.Route(ws.POST(config.ClusterAPIPrefix+apiExtend+"/monitor/query").
		Doc("集群Prometheus指标获取").
		Notes("集群Prometheus指标获取").
		Param(ws.HeaderParameter(config.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		To(r.clusterMetricsQuery).
		Reads(dtos2.QueryParam{}).
		Returns(http.StatusOK, "", []promodel.Vector{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.AuthRedirectInfo{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config.FrontApiTag, "clusterMetricsQuery"))
	ws.Route(ws.POST(config.ClusterAPIPrefix+apiExtend+"/monitor/query-range").
		Doc("集群Prometheus指标获取").
		Notes("集群Prometheus指标获取").
		Param(ws.HeaderParameter(config.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		To(r.clusterMetricsQueryRange).
		Reads(dtos2.QueryParam{}).
		Returns(http.StatusOK, "", []promodel.Matrix{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.AuthRedirectInfo{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config.FrontApiTag, "clusterMetricsQueryRange"))
	ws.Route(ws.GET(config.ClusterAPIPrefix+apiExtend+"/connect/check").
		Doc("集群连接测试").
		Notes("集群连接测试").
		Param(ws.HeaderParameter(config.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		To(r.clusterConnectCheck).
		Returns(http.StatusOK, "", dtos2.KubernetesVersion{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.AuthRedirectInfo{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config.FrontApiTag, "clusterConnectCheck"))

	ws.Route(ws.GET(config.APIPrefix+apiExtend+"/storage-class/{cluster}").
		Doc("获取集群的存储类").
		Notes("获取集群的存储类").
		To(r.getClusterStorageClass).
		Returns(http.StatusOK, "", dtos2.ArrayString{}).
		Param(ws.HeaderParameter(config.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码").Required(true)).
		Returns(http.StatusOK, "成功", "").
		Returns(http.StatusUnauthorized, "用户需要先登录", common.ResponseError{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config.FrontApiTag, "getClusterStorageClass"))
	ws.Route(ws.GET(config.APIPrefix+apiExtend+"/ingress-class/{cluster}").
		Doc("获取集群的入站规则类").
		Notes("获取集群的入站规则类").
		To(r.getClusterStorageClass).
		Returns(http.StatusOK, "", dtos2.ArrayString{}).
		Param(ws.HeaderParameter(config.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码").Required(true)).
		Returns(http.StatusOK, "成功", "").
		Returns(http.StatusUnauthorized, "用户需要先登录", common.ResponseError{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config.FrontApiTag, "getClusterIngressClass"))
	ws.Route(ws.GET(config.APIPrefix+apiExtend+"/gateway-class/{cluster}").
		Doc("获取集群的GatewayClass").
		Notes("获取集群的GatewayClass").
		To(r.getClusterGatewayClass).
		Returns(http.StatusOK, "", dtos2.ArrayString{}).
		Param(ws.HeaderParameter(config.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码").Required(true)).
		Returns(http.StatusOK, "成功", "").
		Returns(http.StatusUnauthorized, "用户需要先登录", common.ResponseError{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config.FrontApiTag, "getClusterGatewayClass"))

}
func (r ClusterResource) getClusterGatewayClass(req *restful.Request, resp *restful.Response) {
	var (
		requestInfo structs.RequestInfo
	)
	lang := common.GetLanguageFromReq(req, config.RequestLanguage)
	ctx := context.WithValue(context.Background(), config.RequestLanguage, lang)
	if reqCtx := req.Attribute(config.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	requestInfo = k8scluster2.GetRequestInfo(req)
	common.ResponseSuccess(resp, r.Svc.GetClusterGatewayClasses(ctx, requestInfo))
}
func (r ClusterResource) getClusterIngressClass(req *restful.Request, resp *restful.Response) {
	var (
		requestInfo structs.RequestInfo
	)
	lang := common.GetLanguageFromReq(req, config.RequestLanguage)
	ctx := context.WithValue(context.Background(), config.RequestLanguage, lang)
	if reqCtx := req.Attribute(config.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	requestInfo = k8scluster2.GetRequestInfo(req)
	common.ResponseSuccess(resp, r.Svc.GetClusterIngressClasses(ctx, requestInfo))
}
func (r ClusterResource) getClusterStorageClass(req *restful.Request, resp *restful.Response) {
	var (
		requestInfo structs.RequestInfo
	)
	lang := common.GetLanguageFromReq(req, config.RequestLanguage)
	ctx := context.WithValue(context.Background(), config.RequestLanguage, lang)
	if reqCtx := req.Attribute(config.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	requestInfo = k8scluster2.GetRequestInfo(req)
	common.ResponseSuccess(resp, r.Svc.GetClusterStorageClasses(ctx, requestInfo))
}
func (r ClusterResource) clusterConnectCheck(req *restful.Request, resp *restful.Response) {
	var (
		requestInfo structs.RequestInfo
		result      dtos2.KubernetesVersion
	)
	lang := common.GetLanguageFromReq(req, config.RequestLanguage)
	ctx := context.WithValue(context.Background(), config.RequestLanguage, lang)
	if reqCtx := req.Attribute(config.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	requestInfo = k8scluster2.GetRequestInfo(req)
	result = r.Svc.ClusterConnectCheck(ctx, requestInfo)
	common.ResponseSuccess(resp, result)
}
func (r ClusterResource) clusterMetricsQueryRange(req *restful.Request, resp *restful.Response) {
	var (
		errorData   common.ErrorData
		requestInfo structs.RequestInfo
		model       dtos2.QueryParam
		result      promodel.Matrix
	)
	lang := common.GetLanguageFromReq(req, config.RequestLanguage)
	ctx := context.WithValue(context.Background(), config.RequestLanguage, lang)
	if reqCtx := req.Attribute(config.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	requestInfo = k8scluster2.GetRequestInfo(req)
	errorData.Err = req.ReadEntity(&model)
	if errorData.IsNotNil() {
		config.Logger.Error(errorData.String())
		common.ResponseSuccess(resp, result)
		return
	}
	result, errorData = r.Svc.PrometheusQueryRange(ctx, requestInfo, model)
	if errorData.IsNotNil() {
		config.Logger.Error(errorData.String())
		common.ResponseSuccess(resp, result)
		return
	}
	common.ResponseSuccess(resp, result)
}
func (r ClusterResource) clusterMetricsQuery(req *restful.Request, resp *restful.Response) {
	var (
		errorData   common.ErrorData
		requestInfo structs.RequestInfo
		model       dtos2.QueryParam
		result      promodel.Vector
	)
	lang := common.GetLanguageFromReq(req, config.RequestLanguage)
	ctx := context.WithValue(context.Background(), config.RequestLanguage, lang)
	if reqCtx := req.Attribute(config.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	requestInfo = k8scluster2.GetRequestInfo(req)
	errorData.Err = req.ReadEntity(&model)
	if errorData.IsNotNil() {
		config.Logger.Error(errorData.String())
		common.ResponseSuccess(resp, result)
		return
	}
	result, errorData = r.Svc.PrometheusQuery(ctx, requestInfo, model)
	if errorData.IsNotNil() {
		config.Logger.Error(errorData.String())
		common.ResponseSuccess(resp, result)
		return
	}
	common.ResponseSuccess(resp, result)
}
func (r ClusterResource) serverResources(req *restful.Request, resp *restful.Response) {
	var (
		errorData   common.ErrorData
		requestInfo structs.RequestInfo
		results     []*metav1.APIResourceList
	)
	lang := common.GetLanguageFromReq(req, config.RequestLanguage)
	ctx := context.WithValue(context.Background(), config.RequestLanguage, lang)
	if reqCtx := req.Attribute(config.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	requestInfo = k8scluster2.GetRequestInfo(req)
	_, results, errorData = r.Svc.ServerGroupsAndResources(ctx, requestInfo)
	if errorData.IsNotNil() {
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config.Bundle, errorData)
		return
	}
	common.ResponseSuccess(resp, results)
}
func (r ClusterResource) apiResources(req *restful.Request, resp *restful.Response) {
	var (
		errorData   common.ErrorData
		requestInfo structs.RequestInfo
		groups      []*metav1.APIGroup
		resources   []*metav1.APIResourceList
		results     map[string][]metav1.APIResource
	)
	results = make(map[string][]metav1.APIResource)
	preferredVersions := make(map[string]string)
	lang := common.GetLanguageFromReq(req, config.RequestLanguage)
	ctx := context.WithValue(context.Background(), config.RequestLanguage, lang)
	if reqCtx := req.Attribute(config.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	requestInfo = k8scluster2.GetRequestInfo(req)
	groups, resources, errorData = r.Svc.ServerGroupsAndResources(ctx, requestInfo)
	if errorData.IsNotNil() {
		config.Logger.Error(errorData.String())
		common.ResponseSuccess(resp, results)
		return
	}
	category := req.QueryParameter("category")
	for _, group := range groups {
		preferredVersions[group.PreferredVersion.GroupVersion] = group.PreferredVersion.GroupVersion
	}
	for _, resource := range resources {
		var filterData []metav1.APIResource
		for _, item := range resource.APIResources {
			if category == "Role" {
				if item.Namespaced {
					filterData = append(filterData, item)

				}
			} else {
				filterData = append(filterData, item)
			}
			resource.APIResources = filterData
		}
		if groupVersion, ok := preferredVersions[resource.GroupVersion]; ok {
			add := false
			for _, re := range resource.APIResources {
				if len(re.Verbs) > 0 {
					add = true
					break
				}
			}
			if add {
				results[groupVersion] = resource.APIResources
			}
		}
	}
	common.ResponseSuccess(resp, results)
}

func (r ClusterResource) csgCheck(req *restful.Request, resp *restful.Response) {
	var (
		errorData   common.ErrorData
		requestInfo structs.RequestInfo
		resources   []*metav1.APIResourceList
		results     []dtos2.ClusterServerGroupCheck
	)
	lang := common.GetLanguageFromReq(req, config.RequestLanguage)
	ctx := context.WithValue(context.Background(), config.RequestLanguage, lang)
	if reqCtx := req.Attribute(config.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	errorData.Err = json.NewDecoder(req.Request.Body).Decode(&results)
	if errorData.IsNotNil() {
		config.Logger.Errorf("decode json format data failed, err: %s", errorData.Err.Error())
		common.ResponseSuccess(resp, results)
		return
	}

	requestInfo = k8scluster2.GetRequestInfo(req)
	_, resources, errorData = r.Svc.ServerGroupsAndResources(ctx, requestInfo)
	if errorData.IsNotNil() {
		config.Logger.Error(errorData.String())
		common.ResponseSuccess(resp, results)
		return
	}
	reMap := make(map[string]metav1.APIResource)
	for _, resource := range resources {
		for _, item := range resource.APIResources {
			if !strings.Contains(item.Name, "/") {
				key := fmt.Sprintf("%s|%s", resource.GroupVersion, item.Kind)
				reMap[key] = item
			}
		}
	}
	for i, _ := range results {
		sp := strings.Split(strings.TrimSpace(results[i].ApiVersion), "/")
		if len(sp) == 2 {
			results[i].Group, results[i].Version = sp[0], sp[1]
		} else if len(sp) == 1 {
			results[i].Version = sp[0]
		}
		if re, ok := reMap[fmt.Sprintf("%s|%s", results[i].ApiVersion, results[i].Kind)]; ok {
			results[i].Exist = true
			results[i].Plural = re.Name
			if re.Namespaced {
				results[i].Scope = "Namespaced"
			} else {
				results[i].Scope = "Cluster"
			}
		}
	}
	common.ResponseSuccess(resp, results)
}
func (r ClusterResource) csg(req *restful.Request, resp *restful.Response) {
	var (
		errorData   common.ErrorData
		requestInfo structs.RequestInfo
		groups      []*metav1.APIGroup
		resources   []*metav1.APIResourceList
		results     []dtos2.ClusterServerGroup
	)
	preferredVersions := make(map[string]string)
	lang := common.GetLanguageFromReq(req, config.RequestLanguage)
	ctx := context.WithValue(context.Background(), config.RequestLanguage, lang)
	if reqCtx := req.Attribute(config.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	requestInfo = k8scluster2.GetRequestInfo(req)
	groups, resources, errorData = r.Svc.ServerGroupsAndResources(ctx, requestInfo)
	if errorData.IsNotNil() {
		config.Logger.Error(errorData.String())
		common.ResponseSuccess(resp, results)
		return
	}
	for _, group := range groups {
		preferredVersions[group.PreferredVersion.GroupVersion] = group.PreferredVersion.GroupVersion
	}
	for _, resource := range resources {
		if groupVersion, ok := preferredVersions[resource.GroupVersion]; ok {
			for _, item := range resource.APIResources {
				group := item.Group
				version := item.Version
				if len(item.Group) == 0 || len(item.Version) == 0 {
					sp := strings.Split(groupVersion, "/")
					if len(sp) == 2 {
						group = sp[0]
						version = sp[1]
					} else if len(sp) == 1 {
						version = sp[0]
					}
				}
				if len(group) == 0 || strings.HasPrefix(groupVersion, "/status") {
					continue
				}
				scope := "cluster"
				if item.Namespaced {
					scope = "namespace"
				}
				results = append(results, dtos2.ClusterServerGroup{
					GroupVersion: groupVersion,
					Group:        group,
					Version:      version,
					Kind:         item.Kind,
					Scope:        scope,
					Name:         item.Name,
				})
			}
		}
	}
	data, _ := json.Marshal(results)
	const secretKey = "asdfS2324A><:.."
	common.ResponseSuccess(resp, config.AesSimpleEncrypt(string(data), secretKey))
}
func (r ClusterResource) serverGroups(req *restful.Request, resp *restful.Response) {
	var (
		errorData   common.ErrorData
		requestInfo structs.RequestInfo
		results     []*metav1.APIGroup
	)
	lang := common.GetLanguageFromReq(req, config.RequestLanguage)
	ctx := context.WithValue(context.Background(), config.RequestLanguage, lang)
	if reqCtx := req.Attribute(config.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	requestInfo = k8scluster2.GetRequestInfo(req)
	results, _, errorData = r.Svc.ServerGroupsAndResources(ctx, requestInfo)
	if errorData.IsNotNil() {
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config.Bundle, errorData)
		return
	}
	common.ResponseSuccess(resp, results)
}
func (r ClusterResource) serverPreferredNamespacedResources(req *restful.Request, resp *restful.Response) {
	var (
		errorData   common.ErrorData
		requestInfo structs.RequestInfo
		results     []*metav1.APIResourceList
	)
	lang := common.GetLanguageFromReq(req, config.RequestLanguage)
	ctx := context.WithValue(context.Background(), config.RequestLanguage, lang)
	if reqCtx := req.Attribute(config.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	requestInfo = k8scluster2.GetRequestInfo(req)
	results, errorData = r.Svc.ServerPreferredNamespacedResources(ctx, requestInfo)
	if errorData.IsNotNil() {
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config.Bundle, errorData)
		return
	}
	common.ResponseSuccess(resp, results)
}

func (r ClusterResource) resourceDashboard(req *restful.Request, resp *restful.Response) {
	var (
		errorData   common.ErrorData
		requestInfo structs.RequestInfo
		dashboard   dtos2.ClusterDashboard
	)
	lang := common.GetLanguageFromReq(req, config.RequestLanguage)
	ctx := context.WithValue(context.Background(), config.RequestLanguage, lang)
	if reqCtx := req.Attribute(config.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	requestInfo = k8scluster2.GetRequestInfo(req)
	dashboard, errorData = r.Svc.Dashboard(ctx, requestInfo)
	if errorData.IsNotNil() {
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config.Bundle, errorData)
		return
	}
	common.ResponseSuccess(resp, dashboard)
}
func (r ClusterResource) selfSubjectAccessReviews(req *restful.Request, resp *restful.Response) {
	var (
		errorData   common.ErrorData
		requestInfo structs.RequestInfo
		model       authv1.ResourceAttributes
		result      authv1.SubjectAccessReviewStatus
	)
	lang := common.GetLanguageFromReq(req, config.RequestLanguage)
	ctx := context.WithValue(context.Background(), config.RequestLanguage, lang)
	if reqCtx := req.Attribute(config.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	requestInfo = k8scluster2.GetRequestInfo(req)
	errorData.Err = req.ReadEntity(&model)
	if errorData.IsNotNil() {
		common.ResponseSuccess(resp, result)
		return
	}
	result, _ = r.Svc.SelfSubjectAccessReview(ctx, requestInfo, model)
	common.ResponseSuccess(resp, result)
}
func (r ClusterResource) roleRbac(req *restful.Request, resp *restful.Response) {
}
func (r ClusterResource) info(req *restful.Request, resp *restful.Response) {
	var (
		errorData   common.ErrorData
		requestInfo structs.RequestInfo
		cluster     dtos2.ClusterDetail
	)
	lang := common.GetLanguageFromReq(req, config.RequestLanguage)
	ctx := context.WithValue(context.Background(), config.RequestLanguage, lang)
	if reqCtx := req.Attribute(config.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}

	requestInfo = k8scluster2.GetRequestInfo(req)
	cluster, errorData = r.Svc.ClusterInfo(ctx, requestInfo)
	if errorData.IsNotNil() {
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config.Bundle, errorData)
		return
	}
	common.ResponseSuccess(resp, cluster)
}

func (r ClusterResource) apiGroupResources(req *restful.Request, resp *restful.Response) {
	var (
		errorData   common.ErrorData
		requestInfo structs.RequestInfo
		grs         []*restmapper.APIGroupResources
	)
	lang := common.GetLanguageFromReq(req, config.RequestLanguage)
	ctx := context.WithValue(context.Background(), config.RequestLanguage, lang)
	if reqCtx := req.Attribute(config.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	requestInfo = k8scluster2.GetRequestInfo(req)
	grs, _, errorData = r.Svc.GetAPIGroupResourcesAndRestMapper(ctx, requestInfo)
	if errorData.IsNotNil() {
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config.Bundle, errorData)
		return
	}
	common.ResponseSuccess(resp, grs)
}

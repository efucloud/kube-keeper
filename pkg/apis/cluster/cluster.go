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
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
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
	ws.Route(ws.GET(config.APIPrefix+apiExtend+"/ingress-class/{cluster}").
		Doc("获取集群的入站规则类").
		Notes("获取集群的入站规则类").
		To(r.getClusterIngressClass).
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
	clearClusterCredentials(&cluster)
	common.ResponseSuccess(resp, cluster)
}

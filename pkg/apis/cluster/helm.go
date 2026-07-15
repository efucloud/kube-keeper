package cluster

import (
	"context"
	"github.com/efucloud/common"
	filters2 "github.com/efucloud/kube-keeper/pkg/apis/filters"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	k8scluster2 "github.com/efucloud/kube-keeper/pkg/k8scluster"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/efucloud/kube-keeper/pkg/structs"
	restfulspec "github.com/emicklei/go-restful-openapi/v2"
	"github.com/emicklei/go-restful/v3"
	rspb "helm.sh/helm/v3/pkg/release"
	"net/http"
)

type HelmResource struct {
	Svc k8scluster2.HelmService
}

func (r HelmResource) AddWebService(ws *restful.WebService) {
	apiInfo := common.ApiInfo{}
	apiInfo.Tag = "cluster-helm"
	apiInfo.Description = "helm"
	common.RegisterApiInfo(apiInfo)
	apiExtend := "/helm"
	ws.Route(ws.POST(config2.APIPrefix+apiExtend+"/values.yaml").
		Doc("获取values.yaml.yaml").
		Notes("卸载helm部署的应用").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求Token")).
		To(r.getValues).
		Reads(dtos.HelmValues{}).
		Returns(http.StatusOK, "成功", dtos.HelmValues{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.AuthRedirectInfo{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "getHelmValues"))
	ws.Route(ws.DELETE(config2.ClusterNamespaceAPIPrefix+apiExtend+"{namespace}/release/{release}").
		Doc("卸载helm部署的应用").
		Notes("卸载helm部署的应用").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		Param(ws.PathParameter("namespace", "Namespace")).
		Param(ws.PathParameter("release", "需要卸载的Release")).
		To(r.helmUninstall).
		Returns(http.StatusOK, "成功", []string{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.AuthRedirectInfo{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "helmUninstallRelease"))
	ws.Route(ws.GET(config2.ClusterNamespaceAPIPrefix+apiExtend+"{namespace}/release").
		Doc("获取Namespace中helm部署的应用").
		Notes("获取Namespace中helm部署的应用，根据secret来获取，会对同一个应用不同历史去重,返回release信息").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		Param(ws.PathParameter("namespace", "Namespace")).
		To(r.helmRelease).
		Returns(http.StatusOK, "成功", []string{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.AuthRedirectInfo{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "helmRelease"))
	ws.Route(ws.GET(config2.ClusterNamespaceAPIPrefix+apiExtend+"{namespace}/release/history/{release}").
		Doc("获取Namespace中helm部署的应用部署历史").
		Notes("获取Namespace中helm部署的应用部署历史").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		Param(ws.PathParameter("namespace", "Namespace")).
		Param(ws.PathParameter("release", "Release名称")).
		To(r.installHistory).
		Returns(http.StatusOK, "成功", []string{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.AuthRedirectInfo{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "helmInstallHistory"))
}

func (r HelmResource) getValues(req *restful.Request, resp *restful.Response) {
	var (
		errorData common.ErrorData
		model     dtos.HelmValues
	)
	lang := common.GetLanguageFromReq(req, config2.RequestLanguage)
	ctx := context.WithValue(context.Background(), config2.RequestLanguage, lang)
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	errorData.Err = req.ReadEntity(&model)
	r.Svc.GetHelmValues(ctx, model)
	common.ResponseSuccess(resp, model)
}
func (r HelmResource) helmUninstall(req *restful.Request, resp *restful.Response) {
	var (
		errorData   common.ErrorData
		requestInfo structs.RequestInfo
	)
	helmSvc := k8scluster2.HelmService{}
	lang := common.GetLanguageFromReq(req, config2.RequestLanguage)
	ctx := context.WithValue(context.Background(), config2.RequestLanguage, lang)
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	requestInfo = k8scluster2.GetRequestInfo(req)
	errorData = helmSvc.Uninstall(ctx, requestInfo, req.PathParameter("release"))
	if errorData.IsNotNil() {
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	common.ResponseSuccess(resp, "success")
}
func (r HelmResource) installHistory(req *restful.Request, resp *restful.Response) {
	var (
		errorData   common.ErrorData
		requestInfo structs.RequestInfo
		results     []*rspb.Release
	)
	lang := common.GetLanguageFromReq(req, config2.RequestLanguage)
	ctx := context.WithValue(context.Background(), config2.RequestLanguage, lang)
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	requestInfo = k8scluster2.GetRequestInfo(req)
	results, errorData = r.Svc.ListNamespaceHelmReleaseHistory(ctx, requestInfo, req.PathParameter("release"))
	if errorData.IsNotNil() {
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	common.ResponseSuccess(resp, results)
}
func (r HelmResource) helmRelease(req *restful.Request, resp *restful.Response) {
	var (
		errorData common.ErrorData
		model     structs.RequestInfo
	)
	lang := common.GetLanguageFromReq(req, config2.RequestLanguage)
	ctx := context.WithValue(context.Background(), config2.RequestLanguage, lang)
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	model.ClusterId = GetClusterFromRequest(req)
	model.Namespace = req.PathParameter("namespace")
	errorData = r.Svc.ListNamespaceHelmRelease(ctx, model)
	if errorData.IsNotNil() {
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
}

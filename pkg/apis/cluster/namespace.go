package cluster

import (
	"context"
	"encoding/json"
	"github.com/efucloud/common"
	filters2 "github.com/efucloud/kube-keeper/pkg/apis/filters"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	k8scluster2 "github.com/efucloud/kube-keeper/pkg/k8scluster"
	dtos2 "github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/efucloud/kube-keeper/pkg/structs"
	restfulspec "github.com/emicklei/go-restful-openapi/v2"
	"github.com/emicklei/go-restful/v3"
	"net/http"
)

type ClusterNamespaceResource struct {
	Svc k8scluster2.NamespaceService
}

func (r ClusterNamespaceResource) AddWebService(ws *restful.WebService) {
	apiInfo := common.ApiInfo{}
	apiInfo.Tag = "namespace"
	apiInfo.Description = "集群Namespace管理扩展功能"
	common.RegisterApiInfo(apiInfo)
	apiExtend := "/namespace"
	ws.Route(ws.GET(config2.ClusterAPIPrefix+apiExtend+"/{namespace}/dashboard").
		Doc("命名空间资源总览").
		Notes("命名空间资源总览").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		Param(ws.PathParameter("namespace", "命名空间")).
		To(r.dashboard).
		Returns(http.StatusOK, "", dtos2.NamespaceDashboard{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.AuthRedirectInfo{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "getClusterNamespaceDashboard"))
	ws.Route(ws.DELETE(config2.ClusterAPIPrefix+apiExtend+"/{namespace}").
		Doc("命名空间删除").
		Notes("命名空间删除，前端在调用集群删除命名空间接口后调用，用于清理系统中集群命名空间列表和命名空间与工作空间的绑定管理").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		Param(ws.PathParameter("namespace", "Namespace")).
		To(r.namespaceDelete).
		Returns(http.StatusOK, "成功", "").
		Returns(http.StatusUnauthorized, "用户需要先登录", common.AuthRedirectInfo{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "namespaceDelete"))
	ws.Route(ws.GET(config2.ClusterAPIPrefix+apiExtend+"/{namespace}/image/pull/secrets").
		Doc("获取命名空间拉取镜像的密钥").
		Notes("获取命名空间拉取镜像的密钥").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		Param(ws.PathParameter("namespace", "Namespace")).
		To(r.listNamespaceImagePullSecret).
		Returns(http.StatusOK, "成功", []string{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.AuthRedirectInfo{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "listNamespaceImagePullSecret"))
	ws.Route(ws.GET(config2.ClusterAPIPrefix+apiExtend+"/{namespace}/image/registries").
		Doc("获取命名空间可以拉取的镜像仓库信息").
		Notes("获取命名空间可以拉取的镜像仓库信息").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		Param(ws.PathParameter("namespace", "Namespace")).
		To(r.listNamespaceImageRegistries).
		Returns(http.StatusOK, "成功", []string{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.AuthRedirectInfo{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "listNamespaceImageRegistries"))

	ws.Route(ws.GET(config2.ClusterAPIPrefix+apiExtend+"/{namespace}/image/search").
		Doc("命名空间可以使用的镜像版本信息").
		Notes("命名空间可以使用的镜像版本信息").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		Param(ws.PathParameter("namespace", "Namespace")).
		Param(ws.QueryParameter("image", "参考镜像")).
		To(r.namespaceImageSearch).
		Returns(http.StatusOK, "成功", []string{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.AuthRedirectInfo{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "namespaceImageSearch"))
	ws.Route(ws.GET(config2.ClusterAPIPrefix+apiExtend+"/{namespace}/image/config-file").
		Doc("命名空间可以使用的镜像版本信息").
		Notes("命名空间可以使用的镜像版本信息").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		Param(ws.PathParameter("namespace", "Namespace")).
		Param(ws.QueryParameter("image", "参考镜像")).
		To(r.namespaceImageConfigFile).
		Returns(http.StatusOK, "成功", []string{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.AuthRedirectInfo{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "namespaceImageConfigFile"))
	ws.Route(ws.GET(config2.ClusterAPIPrefix+apiExtend+"/{namespace}/image/download").
		Doc("镜像tar包下载").
		Notes("镜像tar包下载").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		Param(ws.PathParameter("namespace", "Namespace")).
		Param(ws.QueryParameter("image", "参考镜像")).
		To(r.namespaceImageDownload).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.AuthRedirectInfo{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "namespaceImageDownload"))

}

func (r ClusterNamespaceResource) namespaceImageDownload(req *restful.Request, resp *restful.Response) {
	var (
		requestInfo structs.RequestInfo
	)
	lang := common.GetLanguageFromReq(req, config2.RequestLanguage)
	ctx := context.WithValue(context.Background(), config2.RequestLanguage, lang)
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	requestInfo = k8scluster2.GetRequestInfo(req)
	r.Svc.StreamImageAsTar(ctx, requestInfo, req.QueryParameter("image"), req, resp)
}
func (r ClusterNamespaceResource) namespaceImageConfigFile(req *restful.Request, resp *restful.Response) {
	var (
		requestInfo structs.RequestInfo
	)
	lang := common.GetLanguageFromReq(req, config2.RequestLanguage)
	ctx := context.WithValue(context.Background(), config2.RequestLanguage, lang)
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	requestInfo = k8scluster2.GetRequestInfo(req)
	configFile, err := r.Svc.NamespaceImageConfigFile(ctx, requestInfo, req.QueryParameter("image"))
	if err != nil {
		data, _ := json.Marshal(map[string]interface{}{"failed": err.Error(), "image": req.QueryParameter("image")})
		configFile = string(data)
	}
	common.ResponseSuccess(resp, configFile)
}
func (r ClusterNamespaceResource) namespaceImageSearch(req *restful.Request, resp *restful.Response) {
	var (
		requestInfo structs.RequestInfo
		//errorData  common.ErrorData
	)
	lang := common.GetLanguageFromReq(req, config2.RequestLanguage)
	ctx := context.WithValue(context.Background(), config2.RequestLanguage, lang)
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	requestInfo = k8scluster2.GetRequestInfo(req)
	common.ResponseSuccess(resp, r.Svc.NamespaceImageSearch(ctx, requestInfo, req.QueryParameter("image")))
}
func (r ClusterNamespaceResource) namespaceDelete(req *restful.Request, resp *restful.Response) {
	var (
		requestInfo structs.RequestInfo
		errorData   common.ErrorData
	)
	lang := common.GetLanguageFromReq(req, config2.RequestLanguage)
	ctx := context.WithValue(context.Background(), config2.RequestLanguage, lang)
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	requestInfo = k8scluster2.GetRequestInfo(req)
	errorData = r.Svc.NamespaceDelete(ctx, requestInfo, req.PathParameter("namespace"))
	if errorData.IsNotNil() {
		config2.Logger.Errorf("delete system namespace's relation failed, err: %s", errorData.Err.Error())
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	common.ResponseSuccess(resp, "success")
}
func (r ClusterNamespaceResource) listNamespaceImageRegistries(req *restful.Request, resp *restful.Response) {
}
func (r ClusterNamespaceResource) listNamespaceImagePullSecret(req *restful.Request, resp *restful.Response) {
	var (
		requestInfo structs.RequestInfo
		secrets     []string
	)
	lang := common.GetLanguageFromReq(req, config2.RequestLanguage)
	ctx := context.WithValue(context.Background(), config2.RequestLanguage, lang)
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	requestInfo = k8scluster2.GetRequestInfo(req)
	secrets = r.Svc.ImagePullSecrets(ctx, requestInfo)
	common.ResponseSuccess(resp, secrets)
}

func (r ClusterNamespaceResource) dashboard(req *restful.Request, resp *restful.Response) {
	var (
		errorData   common.ErrorData
		requestInfo structs.RequestInfo
		dashboard   dtos2.NamespaceDashboard
	)
	lang := common.GetLanguageFromReq(req, config2.RequestLanguage)
	ctx := context.WithValue(context.Background(), config2.RequestLanguage, lang)
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	requestInfo = k8scluster2.GetRequestInfo(req)
	dashboard, errorData = r.Svc.Dashboard(ctx, requestInfo)
	if errorData.IsNotNil() {
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	common.ResponseSuccess(resp, dashboard)
}

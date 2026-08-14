package biz

import (
	"context"
	"github.com/efucloud/common"
	filters2 "github.com/efucloud/kube-keeper/pkg/apis/filters"
	"github.com/efucloud/kube-keeper/pkg/config"
	k8scluster2 "github.com/efucloud/kube-keeper/pkg/k8scluster"
	dtos2 "github.com/efucloud/kube-keeper/pkg/models/dtos"
	services2 "github.com/efucloud/kube-keeper/pkg/services"
	restfulspec "github.com/emicklei/go-restful-openapi/v2"
	restful "github.com/emicklei/go-restful/v3"
	"net/http"
)

type PersonalResource struct {
	Svc services2.PersonalService
}

func (r PersonalResource) AddWebService(ws *restful.WebService) {
	apiInfo := common.ApiInfo{}
	apiInfo.Tag = "personal"
	apiInfo.Description = "组织个人相关接口"
	common.RegisterApiInfo(apiInfo)
	apiExtend := "/personal"
	ws.Route(ws.GET(config.APIPrefix+apiExtend+"/cluster/list").
		Doc("获取用户可以访问的集群").
		Notes("获取用户可以访问的集群").
		Param(ws.HeaderParameter(config.AuthHeader, "系统用户Token")).
		Param(ws.QueryParameter("current", "页码").DataType("number")).
		Param(ws.QueryParameter("pageSize", "每页大小").DataType("number")).
		Param(ws.QueryParameter("order", "排序")).
		Param(ws.QueryParameter("search", "集群名称或者编码")).
		To(r.canAccessClusters).
		Returns(http.StatusOK, "成功", dtos2.UserAccessClusterList{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", dtos2.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", dtos2.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", dtos2.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.Log).Filter(filters2.Auth).Filter(filters2.I18n).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config.FrontApiTag, "canAccessClusters"))

	ws.Route(ws.GET(config.ClusterAPIPrefix+apiExtend+"/namespace/list").
		Doc("获取用户可以访问集群的命名空间列表").
		Notes("获取用户可以访问集群的命名空间列表").
		Param(ws.HeaderParameter(config.AuthHeader, "系统用户Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		Param(ws.QueryParameter("current", "页码").DataType("number")).
		Param(ws.QueryParameter("pageSize", "每页大小").DataType("number")).
		Param(ws.QueryParameter("order", "排序")).
		Param(ws.QueryParameter("search", "命名空间")).
		To(r.canAccessClusterNamespaces).
		Returns(http.StatusOK, "成功", dtos2.ClusterNamespaceDetailList{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", dtos2.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", dtos2.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", dtos2.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.Log).Filter(filters2.Auth).Filter(filters2.I18n).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config.FrontApiTag, "canAccessClusterNamespaces"))
	ws.Route(ws.GET(config.APIPrefix+apiExtend+"/workspace/{workspace}/namespace/list").
		Doc("获取工作空间下的命名空间").
		Notes("获取工作空间下的命名空间").
		Param(ws.HeaderParameter(config.AuthHeader, "系统用户Token")).
		Param(ws.PathParameter("workspace", "工作空间编码")).
		Param(ws.QueryParameter("current", "页码").DataType("number")).
		Param(ws.QueryParameter("pageSize", "每页大小").DataType("number")).
		Param(ws.QueryParameter("order", "排序")).
		Param(ws.QueryParameter("namespace", "命名空间")).
		To(r.workspaceNamespaces).
		Returns(http.StatusOK, "成功", dtos2.ClusterNamespaceDetailList{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", dtos2.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", dtos2.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", dtos2.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.Log).Filter(filters2.Auth).Filter(filters2.I18n).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config.FrontApiTag, "getWorkspaceNamespaces"))

}
func (r PersonalResource) workspaceNamespaces(req *restful.Request, resp *restful.Response) {
	var (
		results dtos2.ClusterNamespaceDetailList
	)
	lang := common.GetLanguageFromReq(req, config.RequestLanguage)
	ctx := context.WithValue(context.Background(), config.RequestLanguage, lang)
	if reqCtx := req.Attribute(config.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	current, pageSize, order := common.GetRequestPaginationInformation(req)
	queryParam := &common.QueryParam{}
	common.QueryEqual("workspace_code", req.PathParameter("workspace"), queryParam)
	common.RequestQuery("namespace", common.ParamTypeString, common.QueryTypeLike, req, queryParam)
	nsSvc := services2.ClusterNamespaceService{}
	results, _ = nsSvc.ListClusterNamespace(ctx, current, pageSize, order, queryParam.WhereQuery, queryParam.WhereArgs)
	common.ResponseSuccess(resp, results)

}

func (r PersonalResource) canAccessClusterNamespaces(req *restful.Request, resp *restful.Response) {
	lang := common.GetLanguageFromReq(req, config.RequestLanguage)
	var (
		errorData common.ErrorData
		result    dtos2.ClusterNamespaceDetailList
	)
	errorData.Lang = lang
	errorData.Lang = lang
	ctx := context.Background()
	if reqCtx := req.Attribute(config.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}

	perSvc := k8scluster2.PermissionService{}
	current, pageSize, order := common.GetRequestPaginationInformation(req)
	requestInfo := k8scluster2.GetRequestInfo(req)
	result = perSvc.GetUserClusterNamespaces(ctx, requestInfo.ClusterId,
		req.Attribute(config.RequestUserId).(string), req.QueryParameter("search"), current, pageSize, order)
	ctx = context.WithValue(ctx, config.RequestLanguage, lang)
	common.ResponseSuccess(resp, result)
}

func (r PersonalResource) canAccessClusters(req *restful.Request, resp *restful.Response) {
	lang := common.GetLanguageFromReq(req, config.RequestLanguage)
	var (
		errorData common.ErrorData
		result    dtos2.UserAccessClusterList
	)
	errorData.Lang = lang
	errorData.Lang = lang
	ctx := context.Background()
	if reqCtx := req.Attribute(config.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}

	perSvc := k8scluster2.PermissionService{}
	current, pageSize, order := common.GetRequestPaginationInformation(req)
	queryParam := &common.QueryParam{}

	common.QueryEqual("account_id", req.Attribute(config.RequestUserId).(string), queryParam)
	result = perSvc.GetUserClusters(ctx, req.Attribute(config.RequestUserId).(string), req.QueryParameter("search"), current, pageSize, order, queryParam.WhereQuery, queryParam.WhereArgs)
	ctx = context.WithValue(ctx, config.RequestLanguage, lang)
	common.ResponseSuccess(resp, result)
}

package cluster

import (
	"context"
	"github.com/efucloud/common"
	filters2 "github.com/efucloud/kube-keeper/pkg/apis/filters"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	k8scluster2 "github.com/efucloud/kube-keeper/pkg/k8scluster"
	dtos2 "github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/efucloud/kube-keeper/pkg/services"
	"github.com/efucloud/kube-keeper/pkg/structs"
	restfulspec "github.com/emicklei/go-restful-openapi/v2"
	"github.com/emicklei/go-restful/v3"
	"net/http"
)

type ClusterAccountRoleResource struct {
	Svc services.ClusterAccountRoleService
}

func (r ClusterAccountRoleResource) AddWebService(ws *restful.WebService) {
	apiInfo := common.ApiInfo{}
	apiInfo.Tag = "cluster-account-role"
	apiInfo.Description = "集群用户角色"
	common.RegisterApiInfo(apiInfo)
	apiExtend := "/cluster-account-role"
	ws.Route(ws.POST(config2.ClusterAPIPrefix+apiExtend).
		Doc("创建集群用户角色").
		Notes("创建集群用户角色").
		To(r.create).
		Param(ws.HeaderParameter(config2.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		Reads(dtos2.ClusterAccountRoleCreate{}).
		Returns(http.StatusOK, "成功", dtos2.ClusterAccountRoleDetail{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.ResponseError{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).Filter(filters2.Permission([]string{config2.SystemRoleAdmin})).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "createClusterAccountRole"))
	ws.Route(ws.GET(config2.ClusterAPIPrefix+apiExtend).
		Doc("获取集群用户角色列表").
		Notes("获取集群用户角色信息").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		Param(ws.QueryParameter("page", "页码").DataType("integer")).
		Param(ws.QueryParameter("size", "每页大小").DataType("integer")).
		Param(ws.QueryParameter("order", "排序")).
		Param(ws.QueryParameter("accountId", "用户Id").DataType("string")).
		Param(ws.QueryParameter("roleName", "角色名称").DataType("string")).
		Param(ws.QueryParameter("bindingName", "绑定角色").DataType("string")).
		Param(ws.QueryParameter("isTemp", "是否临时").DataType("boolean")).
		To(r.list).
		Returns(http.StatusOK, "成功", dtos2.ClusterAccountRoleDetailList{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.ResponseError{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).Filter(filters2.Permission([]string{config2.SystemRoleAdmin})).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "listClusterAccountRole"))
	ws.Route(ws.GET(config2.ClusterAPIPrefix+apiExtend+"/{id}").
		Doc("获取集群用户角色详情").
		Notes("获取集群用户角色信息详情").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		Param(ws.PathParameter("id", "ID")).
		To(r.get).
		Returns(http.StatusOK, "成功", dtos2.ClusterAccountRoleDetail{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.ResponseError{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).Filter(filters2.Permission([]string{config2.SystemRoleAdmin})).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "getClusterAccountRole"))
	ws.Route(ws.DELETE(config2.ClusterAPIPrefix+apiExtend).
		Doc("删除集群用户角色").
		Notes("删除集群用户角色信息详情").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		To(r.delete).
		Reads(dtos2.BatchOperationIds{}).
		Returns(http.StatusOK, "成功", "成功").
		Returns(http.StatusUnauthorized, "用户需要先登录", common.ResponseError{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).Filter(filters2.Permission([]string{config2.SystemRoleAdmin})).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "deleteClusterAccountRole"))
}

func (r ClusterAccountRoleResource) create(req *restful.Request, resp *restful.Response) {
	var (
		model       dtos2.ClusterAccountRoleCreate
		errorData   common.ErrorData
		requestInfo structs.RequestInfo
		result      dtos2.ClusterAccountRoleDetail
	)
	lang := common.GetLanguageFromReq(req, config2.RequestLanguage)
	ctx := context.WithValue(context.Background(), config2.RequestLanguage, lang)
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	requestInfo = k8scluster2.GetRequestInfo(req)
	errorData.Err = req.ReadEntity(&model)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("decode json format data failed, err: %s", errorData.Err.Error())
		errorData.MsgCode = config2.MsgCodeJsonDecodeFailed
		errorData.ResponseCode = http.StatusBadRequest
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	result, errorData = r.Svc.AddClusterAccountRole(ctx, requestInfo, model)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("add cluster members failed, err: %s", errorData.Err.Error())
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	common.ResponseSuccess(resp, result)
}
func (r ClusterAccountRoleResource) get(req *restful.Request, resp *restful.Response) {
	var (
		errorData   common.ErrorData
		result      dtos2.ClusterAccountRoleDetail
		requestInfo structs.RequestInfo
	)
	lang := common.GetLanguageFromReq(req, config2.RequestLanguage)
	ctx := context.WithValue(context.Background(), config2.RequestLanguage, lang)
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	requestInfo = k8scluster2.GetRequestInfo(req)

	id := req.PathParameter("id")
	result, errorData = r.Svc.GetClusterAccountRoleById(ctx, requestInfo, id)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("getByCode cluster failed, err: %s", errorData.Err.Error())
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	if len(result.ID) == 0 {
		errorData.MsgCode = config2.MsgCodeRecordNotExist
		errorData.ResponseCode = http.StatusNotFound
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	common.ResponseSuccess(resp, result)
}
func (r ClusterAccountRoleResource) delete(req *restful.Request, resp *restful.Response) {
	var (
		errorData   common.ErrorData
		model       dtos2.BatchOperationIds
		requestInfo structs.RequestInfo
	)
	lang := common.GetLanguageFromReq(req, config2.RequestLanguage)
	errorData.Lang = lang
	ctx := context.WithValue(context.Background(), config2.RequestLanguage, lang)
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	requestInfo = k8scluster2.GetRequestInfo(req)
	errorData.Err = req.ReadEntity(&model)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("decode json format data failed, err: %s", errorData.Err.Error())
		errorData.MsgCode = config2.MsgCodeJsonDecodeFailed
		errorData.ResponseCode = http.StatusBadRequest
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}

	svc := k8scluster2.ClusterRoleService{}
	svc.DeleteClusterAccountRoleBinding(ctx, requestInfo, model.Ids)
	common.ResponseSuccess(resp, "删除成功")
}
func (r ClusterAccountRoleResource) list(req *restful.Request, resp *restful.Response) {
	var (
		errorData common.ErrorData
		results   dtos2.ClusterAccountRoleDetailList

		requestInfo structs.RequestInfo
	)
	lang := common.GetLanguageFromReq(req, config2.RequestLanguage)
	ctx := context.WithValue(context.Background(), config2.RequestLanguage, lang)
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	requestInfo = k8scluster2.GetRequestInfo(req)

	page, size, order := common.GetRequestPaginationInformation(req)
	queryParam := &common.QueryParam{}
	common.QueryEqual("cluster_id", requestInfo.ClusterId, queryParam)
	common.RequestQuery("accountId", common.ParamTypeString, common.QueryTypeEqual, req, queryParam)
	common.RequestQuery("roleName", common.ParamTypeString, common.QueryTypeLike, req, queryParam)
	common.RequestQuery("bindingName", common.ParamTypeString, common.QueryTypeLike, req, queryParam)
	common.RequestQuery("isTemp", common.ParamTypeBool, common.QueryTypeEqual, req, queryParam)
	results, errorData = r.Svc.ListClusterAccountRole(ctx, requestInfo, page, size, order, queryParam.WhereQuery, queryParam.WhereArgs)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("list cluster failed, err: %s", errorData.Err.Error())
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	common.ResponseSuccess(resp, results)
}

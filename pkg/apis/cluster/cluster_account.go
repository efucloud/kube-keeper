package cluster

import (
	"context"
	"fmt"
	"github.com/efucloud/common"
	filters2 "github.com/efucloud/kube-keeper/pkg/apis/filters"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	k8scluster2 "github.com/efucloud/kube-keeper/pkg/k8scluster"
	dtos2 "github.com/efucloud/kube-keeper/pkg/models/dtos"
	services2 "github.com/efucloud/kube-keeper/pkg/services"
	"github.com/efucloud/kube-keeper/pkg/structs"
	restfulspec "github.com/emicklei/go-restful-openapi/v2"
	"github.com/emicklei/go-restful/v3"
	"net/http"
)

type ClusterAccountResource struct {
	Svc services2.ClusterAccountService
}
type CsrRequest struct {
}

func (r ClusterAccountResource) AddWebService(ws *restful.WebService) {
	apiInfo := common.ApiInfo{}
	apiInfo.Tag = "cluster-account"
	apiInfo.Description = "集群用户"
	common.RegisterApiInfo(apiInfo)
	apiExtend := "/cluster-account"
	ws.Route(ws.GET(config2.ClusterAPIPrefix+apiExtend).
		Doc("获取集群用户列表").
		Notes("获取集群用户信息").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		Param(ws.QueryParameter("page", "页码").DataType("integer")).
		Param(ws.QueryParameter("size", "每页大小").DataType("integer")).
		Param(ws.QueryParameter("order", "排序")).
		Param(ws.QueryParameter("name", "用户名").DataType("string")).
		Param(ws.QueryParameter("isSupper", "超级管理员")).
		Param(ws.QueryParameter("accountId", "组织用户ID")).
		To(r.list).
		Returns(http.StatusOK, "成功", dtos2.ClusterAccountDetailList{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.ResponseError{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).Filter(filters2.Permission([]string{config2.SystemRoleAdmin})).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "listClusterAccount"))
	ws.Route(ws.GET(config2.ClusterAPIPrefix+apiExtend+"/{id}").
		Doc("获取集群用户详情").
		Notes("获取集群用户信息详情").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		Param(ws.PathParameter("id", "ID")).
		To(r.get).
		Returns(http.StatusOK, "成功", dtos2.ClusterAccountDetail{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.ResponseError{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).Filter(filters2.Permission([]string{config2.SystemRoleAdmin})).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "getClusterAccount"))
	ws.Route(ws.DELETE(config2.ClusterAPIPrefix+apiExtend).
		Doc("删除集群用户").
		Notes("删除集群用户信息详情").
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
		Metadata(config2.FrontApiTag, "deleteClusterAccount"))
	ws.Route(ws.POST(config2.ClusterAPIPrefix+apiExtend+"/authorizeNamespaceByTemplate").
		Doc("命名空间授权").
		Notes("命名空间授权，支持选择多个用户和多个角色模版").
		To(r.authorizeNamespaceByTemplate).
		Param(ws.HeaderParameter(config2.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		Reads(dtos2.NamespaceAuthorizeByTemplate{}).
		Returns(http.StatusOK, "成功", dtos2.ClusterNamespaceAccountRoleDetailList{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.ResponseError{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).Filter(filters2.Permission([]string{config2.SystemRoleAdmin})).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "clusterAccountAuthorizeNamespaceByTemplate"))
	ws.Route(ws.POST(config2.ClusterAPIPrefix+apiExtend+"/authorizeClusterByTemplate").
		Doc("集群授权").
		Notes("集群授权，支持选择多个用户和多个角色模版").
		To(r.authorizeClusterByTemplate).
		Param(ws.HeaderParameter(config2.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		Reads(dtos2.ClusterAuthorizeByTemplate{}).
		Returns(http.StatusOK, "成功", dtos2.ClusterAccountRoleDetailList{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.ResponseError{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).Filter(filters2.Permission([]string{config2.SystemRoleAdmin})).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "clusterAccountAuthorizeClusterByTemplate"))
	ws.Route(ws.POST(config2.ClusterAPIPrefix+apiExtend+"/authorizeNamespaceByAccount").
		Doc("用户命名空间授权").
		Notes("用户命名空间授权，支持选择多个角色模版").
		To(r.authorizeNamespaceByAccount).
		Param(ws.HeaderParameter(config2.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		Reads(dtos2.AuthorizeByAccount{}).
		Returns(http.StatusOK, "成功", dtos2.ClusterNamespaceAccountRoleDetailList{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.ResponseError{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).Filter(filters2.Permission([]string{config2.SystemRoleAdmin})).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "clusterAccountAuthorizeNamespaceByAccount"))
	ws.Route(ws.POST(config2.ClusterAPIPrefix+apiExtend+"/authorizeClusterByAccount").
		Doc("用户集群授权").
		Notes("用户集群授权，支持选择多个角色模版和多个命名空间").
		To(r.authorizeClusterByAccount).
		Param(ws.HeaderParameter(config2.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		Reads(dtos2.AuthorizeByAccount{}).
		Returns(http.StatusOK, "成功", dtos2.ClusterAccountRoleDetailList{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.ResponseError{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).Filter(filters2.Permission([]string{config2.SystemRoleAdmin})).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "clusterAccountAuthorizeClusterByAccount"))

}
func (r ClusterAccountResource) authorizeClusterByAccount(req *restful.Request, resp *restful.Response) {
}
func (r ClusterAccountResource) authorizeNamespaceByAccount(req *restful.Request, resp *restful.Response) {
}
func (r ClusterAccountResource) authorizeClusterByTemplate(req *restful.Request, resp *restful.Response) {
	var (
		model       dtos2.ClusterAuthorizeByTemplate
		errorData   common.ErrorData
		requestInfo structs.RequestInfo
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
	svc := k8scluster2.PermissionService{}
	errorData = svc.AddAuthorizeClusterByTemplate(ctx, req.Attribute(config2.RequestUserId).(string), requestInfo, model)
	if errorData.IsNotNil() {
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	common.ResponseSuccess(resp, "success")
}
func (r ClusterAccountResource) authorizeNamespaceByTemplate(req *restful.Request, resp *restful.Response) {
	var (
		model       dtos2.NamespaceAuthorizeByTemplate
		errorData   common.ErrorData
		requestInfo structs.RequestInfo
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
	svc := k8scluster2.PermissionService{}
	errorData = svc.AddAuthorizeClusterNamespaceByTemplate(ctx, req.Attribute(config2.RequestUserId).(string), requestInfo, model)
	if errorData.IsNotNil() {
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	common.ResponseSuccess(resp, "success")
}
func (r ClusterAccountResource) get(req *restful.Request, resp *restful.Response) {
	var (
		errorData common.ErrorData
		result    dtos2.ClusterAccountDetail
	)
	lang := common.GetLanguageFromReq(req, config2.RequestLanguage)
	ctx := context.WithValue(context.Background(), config2.RequestLanguage, lang)
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}

	id := req.PathParameter("id")
	result, errorData = r.Svc.GetClusterAccountByID(ctx, id)
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
func (r ClusterAccountResource) delete(req *restful.Request, resp *restful.Response) {
	var (
		errorData   common.ErrorData
		model       dtos2.BatchOperationIds
		requestInfo structs.RequestInfo
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

	svc := k8scluster2.PermissionService{}
	errorData = svc.DeleteClusterAccountByIds(ctx, requestInfo, model.Ids)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("delete cluster failed, err: %s", errorData.Err.Error())
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	} else {

	}
	common.ResponseSuccess(resp, "删除成功")
}
func (r ClusterAccountResource) list(req *restful.Request, resp *restful.Response) {
	var (
		errorData   common.ErrorData
		results     dtos2.ClusterAccountDetailList
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
	name := req.QueryParameter("name")
	var accountIds []string
	if name != "" {
		searchName := fmt.Sprintf("%%%s%%", name)
		accSvc := services2.AccountService{}
		accounts, _ := accSvc.ListAccount(ctx, 1, 1000, "",
			"( username LIKE ? OR email LIKE ? OR phone LIKE ? )", []interface{}{searchName, searchName, searchName})
		for _, account := range accounts.Data {
			accountIds = append(accountIds, account.ID)
		}
		if len(queryParam.WhereQuery) > 0 {
			queryParam.WhereQuery = queryParam.WhereQuery + " AND account_id IN (?) "
			queryParam.WhereArgs = append(queryParam.WhereArgs, accountIds)
		}
	}
	if req.QueryParameter("isSupper") != "" {
		common.QueryEqual("is_supper", true, queryParam)
	}
	results, errorData = r.Svc.ListClusterAccount(ctx, page, size, order, queryParam.WhereQuery, queryParam.WhereArgs)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("list cluster failed, err: %s", errorData.Err.Error())
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	common.ResponseSuccess(resp, results)
}

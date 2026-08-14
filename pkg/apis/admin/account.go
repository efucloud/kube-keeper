package admin

import (
	"context"
	filters2 "github.com/efucloud/kube-keeper/pkg/apis/filters"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	dtos2 "github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/efucloud/kube-keeper/pkg/services"
	"net/http"
	"strings"

	"github.com/efucloud/common"
	restfulspec "github.com/emicklei/go-restful-openapi/v2"
	restful "github.com/emicklei/go-restful/v3"
)

type AccountResource struct {
	Svc services.AccountService
}

func (r AccountResource) AddWebService(ws *restful.WebService) {
	apiInfo := common.ApiInfo{}
	apiInfo.Tag = "account"
	apiInfo.Description = "账户"
	common.RegisterApiInfo(apiInfo)
	apiExtend := "/account"
	ws.Route(ws.POST(config2.APIPrefix+apiExtend).
		Doc("创建用户").
		Notes("创建用户信息").
		Param(ws.HeaderParameter(config2.AuthHeader, "系统用户Token")).
		To(r.create).
		Reads(dtos2.AccountCreate{}).
		Returns(http.StatusOK, "成功", dtos2.AccountDetail{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", dtos2.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", dtos2.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", dtos2.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).Filter(filters2.Permission([]string{config2.SystemRoleAdmin})).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "createAccount"))
	ws.Route(ws.GET(config2.APIPrefix+apiExtend).
		Doc("获取用户列表").
		Notes("获取用户列表").
		Param(ws.HeaderParameter(config2.AuthHeader, "系统用户Token")).
		Param(ws.QueryParameter("current", "页码").DataType("number")).
		Param(ws.QueryParameter("pageSize", "每页大小").DataType("number")).
		Param(ws.QueryParameter("order", "排序")).
		Param(ws.QueryParameter("role", "系统角色")).
		Param(ws.QueryParameter("username", "账户名英文").DataType("string")).
		Param(ws.QueryParameter("nickname", "昵称").DataType("string")).
		Param(ws.QueryParameter("phone", "电话号码").DataType("string")).
		Param(ws.QueryParameter("email", "邮箱").DataType("string")).
		Param(ws.QueryParameter("jobNumber", "工号").DataType("string")).
		Param(ws.QueryParameter("search", "搜索").DataType("string")).
		Param(ws.QueryParameter("ids", "数据库记录ID数组,逗号分隔").DataType("string")).
		To(r.list).
		Returns(http.StatusOK, "成功", dtos2.AccountDetailList{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", dtos2.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", dtos2.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", dtos2.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).Filter(filters2.Permission([]string{config2.SystemRoleAdmin})).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "listAccount"))
	ws.Route(ws.GET(config2.APIPrefix+apiExtend+"/{id}").
		Doc("获取用户详情").
		Notes("获取用户信息详情").
		Param(ws.HeaderParameter(config2.AuthHeader, "系统用户Token")).
		To(r.get).
		Param(ws.PathParameter("id", "记录ID").DataType("string")).
		Returns(http.StatusOK, "成功", dtos2.AccountDetail{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", dtos2.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", dtos2.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", dtos2.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "getAccount"))
	ws.Route(ws.PUT(config2.APIPrefix+apiExtend).
		Doc("更新用户信息").
		Notes("更新用户信息").
		Param(ws.HeaderParameter(config2.AuthHeader, "系统用户Token")).
		To(r.update).
		Reads(dtos2.AccountUpdate{}).
		Returns(http.StatusOK, "成功", dtos2.AccountDetail{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", dtos2.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", dtos2.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", dtos2.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).Filter(filters2.Permission([]string{config2.SystemRoleAdmin})).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "updateAccount"))
	ws.Route(ws.DELETE(config2.APIPrefix+apiExtend).
		Doc("删除用户").
		Notes("删除用户信息详情").
		Param(ws.HeaderParameter(config2.AuthHeader, "系统用户Token")).
		To(r.delete).
		Reads(dtos2.BatchOperationIds{}).
		Returns(http.StatusOK, "成功", "成功").
		Returns(http.StatusBadRequest, "请求数据无法处理", dtos2.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", dtos2.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", dtos2.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).Filter(filters2.Permission([]string{config2.SystemRoleAdmin})).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "deleteAccount"))
	ws.Route(ws.POST(config2.APIPrefix+apiExtend+"/status").
		Doc("启用禁用").
		Notes("启用禁用,修改账户状态").
		Param(ws.HeaderParameter(config2.AuthHeader, "系统用户Token")).
		To(r.status).
		Reads(dtos2.AccountStatus{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", dtos2.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", dtos2.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", dtos2.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).Filter(filters2.Permission([]string{config2.SystemRoleAdmin})).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "changeAccountStatus"))
	ws.Route(ws.POST(config2.APIPrefix+apiExtend+"/role").
		Doc("系统角色设置").
		Notes("系统角色设置,admin: 管理员，view: 查看者， edit: 编辑者， none: 无权限，仅为系统成员").
		Param(ws.HeaderParameter(config2.AuthHeader, "系统用户Token")).
		To(r.systemRole).
		Reads(dtos2.AccountRole{}).
		Returns(http.StatusOK, "成功", dtos2.AccountDetail{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", dtos2.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", dtos2.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", dtos2.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).Filter(filters2.Permission([]string{config2.SystemRoleAdmin})).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "setAccountRole"))
}

func (r AccountResource) status(req *restful.Request, resp *restful.Response) {
	var (
		errorData common.ErrorData
		model     dtos2.AccountStatus
	)
	lang := common.GetLanguageFromReq(req, config2.RequestLanguage)
	errorData.Lang = lang
	ctx := context.WithValue(context.Background(), config2.RequestLanguage, lang)
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	ctx = context.WithValue(ctx, config2.RequestLanguage, lang)

	errorData.Err = req.ReadEntity(&model)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("decode json format data failed, err: %s", errorData.Err.Error())
		errorData.MsgCode = config2.MsgCodeJsonDecodeFailed
		errorData.ResponseCode = http.StatusBadRequest
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}

	errorData = r.Svc.ChangeStatusAccount(ctx, model)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("enable account failed, err: %s", errorData.Err.Error())
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}

	common.ResponseSuccess(resp, "success")
}

func (r AccountResource) systemRole(req *restful.Request, resp *restful.Response) {
	var (
		errorData common.ErrorData
		model     dtos2.AccountRole
	)
	lang := common.GetLanguageFromReq(req, config2.RequestLanguage)
	errorData.Lang = lang
	ctx := context.WithValue(context.Background(), config2.RequestLanguage, lang)
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	ctx = context.WithValue(ctx, config2.RequestLanguage, lang)

	errorData.Err = req.ReadEntity(&model)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("decode json format data failed, err: %s", errorData.Err.Error())
		errorData.MsgCode = config2.MsgCodeJsonDecodeFailed
		errorData.ResponseCode = http.StatusBadRequest
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}

	errorData = r.Svc.SetRole(ctx, model)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("enable account failed, err: %s", errorData.Err.Error())
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}

	common.ResponseSuccess(resp, "success")
}
func (r AccountResource) get(req *restful.Request, resp *restful.Response) {
	lang := common.GetLanguageFromReq(req, config2.RequestLanguage)
	var (
		errorData common.ErrorData
		result    dtos2.AccountDetail
	)
	errorData.Lang = lang

	ctx := context.Background()
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	ctx = context.WithValue(ctx, config2.RequestLanguage, lang)

	id := req.PathParameter("id")

	result, errorData = r.Svc.GetAccountByID(ctx, id)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("get account failed, err: %s", errorData.Err.Error())
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}

	common.ResponseSuccess(resp, result)
}
func (r AccountResource) delete(req *restful.Request, resp *restful.Response) {
	var (
		errorData common.ErrorData
		model     dtos2.BatchOperationIds
	)
	lang := common.GetLanguageFromReq(req, config2.RequestLanguage)
	errorData.Lang = lang
	ctx := context.WithValue(context.Background(), config2.RequestLanguage, lang)
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	ctx = context.WithValue(ctx, config2.RequestLanguage, lang)

	errorData.Err = req.ReadEntity(&model)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("decode json format data failed, err: %s", errorData.Err.Error())
		errorData.MsgCode = config2.MsgCodeJsonDecodeFailed
		errorData.ResponseCode = http.StatusBadRequest
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}

	errorData = r.Svc.DeleteAccount(ctx, model.Ids)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("delete account failed, err: %s", errorData.Err.Error())
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	common.ResponseSuccess(resp, "删除成功")
}
func (r AccountResource) create(req *restful.Request, resp *restful.Response) {
	var (
		errorData common.ErrorData
		result    dtos2.AccountDetail
		model     dtos2.AccountCreate
	)
	lang := common.GetLanguageFromReq(req, config2.RequestLanguage)
	errorData.Lang = lang
	ctx := context.WithValue(context.Background(), config2.RequestLanguage, lang)
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	ctx = context.WithValue(ctx, config2.RequestLanguage, lang)

	errorData.Err = req.ReadEntity(&model)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("decode json format data failed, err: %s", errorData.Err.Error())
		errorData.MsgCode = config2.MsgCodeJsonDecodeFailed
		errorData.ResponseCode = http.StatusBadRequest
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}

	//判断组织是否允许创建用户

	result, errorData = r.Svc.AddAccount(ctx, model)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("add account failed, err: %s", errorData.Err.Error())
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}

	common.ResponseSuccess(resp, result)
}

func (r AccountResource) update(req *restful.Request, resp *restful.Response) {
	var (
		errorData common.ErrorData
		model     dtos2.AccountUpdate
		result    dtos2.AccountDetail
	)
	lang := common.GetLanguageFromReq(req, config2.RequestLanguage)
	errorData.Lang = lang
	ctx := context.WithValue(context.Background(), config2.RequestLanguage, lang)
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	ctx = context.WithValue(ctx, config2.RequestLanguage, lang)

	errorData.Err = req.ReadEntity(&model)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("decode json format data failed, err: %s", errorData.Err.Error())
		errorData.MsgCode = config2.MsgCodeJsonDecodeFailed
		errorData.ResponseCode = http.StatusBadRequest
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}

	result, errorData = r.Svc.UpdateAccount(ctx, model)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("update account failed, err: %s", errorData.Err.Error())
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	common.ResponseSuccess(resp, result)
}

func (r AccountResource) list(req *restful.Request, resp *restful.Response) {
	var (
		errorData common.ErrorData
		result    dtos2.AccountDetailList
	)
	lang := common.GetLanguageFromReq(req, config2.RequestLanguage)
	errorData.Lang = lang
	ctx := context.WithValue(context.Background(), config2.RequestLanguage, lang)
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	ctx = context.WithValue(ctx, config2.RequestLanguage, lang)

	current, pageSize, order := common.GetRequestPaginationInformation(req)
	queryParam := &common.QueryParam{}

	common.RequestQuery("search:username;nickname;phone;email;jobNumber", common.ParamTypeString, common.QueryTypeLike, req, queryParam)
	common.RequestQuery("username", common.ParamTypeString, common.QueryTypeLike, req, queryParam)
	common.RequestQuery("role", common.ParamTypeString, common.QueryTypeEqual, req, queryParam)
	common.RequestQuery("phone", common.ParamTypeString, common.QueryTypeLike, req, queryParam)
	common.RequestQuery("email", common.ParamTypeString, common.QueryTypeLike, req, queryParam)
	common.RequestQuery("nickname", common.ParamTypeString, common.QueryTypeLike, req, queryParam)
	if ids := strings.Split(req.QueryParameter("ids"), ","); len(ids) > 0 {
		if ids = common.FilterEmptyStrings(ids); len(ids) > 0 {
			common.QueryIn("id", ids, queryParam)
		}
	}
	result, errorData = r.Svc.ListAccount(ctx, current, pageSize, order, queryParam.WhereQuery, queryParam.WhereArgs)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("list account failed, err: %s", errorData.Err)
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	common.ResponseSuccess(resp, result)
}

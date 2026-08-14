package v1

import (
	"context"
	"encoding/json"
	filters2 "github.com/efucloud/kube-keeper/pkg/apis/filters"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/efucloud/kube-keeper/pkg/services"
	"github.com/emicklei/go-restful/v3"
	"io"
	"net/http"

	"github.com/efucloud/common"
	restfulspec "github.com/emicklei/go-restful-openapi/v2"
)

type BuiltinShellCommandResource struct {
	Svc services.BuiltinShellCommandService
}

func (r BuiltinShellCommandResource) AddWebService(ws *restful.WebService) {
	apiInfo := common.ApiInfo{}
	apiInfo.Tag = "builtin-shell-command"
	apiInfo.Description = "内置Shell命令"
	common.RegisterApiInfo(apiInfo)
	apiExtend := "/builtin-shell-command"
	ws.Route(ws.POST(config2.APIPrefix+apiExtend).
		Doc("创建内置Shell命令").
		Notes("创建内置Shell命令信息").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求Token")).
		To(r.create).
		Reads(dtos.BuiltinShellCommandCreate{}).
		Returns(http.StatusOK, "成功", dtos.BuiltinShellCommandDetail{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.AuthRedirectInfo{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "createBuiltinShellCommand"))
	ws.Route(ws.GET(config2.APIPrefix+apiExtend).
		Doc("获取内置Shell命令列表").
		Notes("获取内置Shell命令信息").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求Token")).
		Param(ws.QueryParameter("page", "页码").DataType("integer")).
		Param(ws.QueryParameter("size", "每页大小").DataType("integer")).
		Param(ws.QueryParameter("order", "排序")).
		Param(ws.QueryParameter("name", "内置Shell命令名").DataType("string")).
		Param(ws.QueryParameter("description", "命名描述").DataType("string")).
		To(r.list).
		Returns(http.StatusOK, "成功", dtos.BuiltinShellCommandDetailList{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.AuthRedirectInfo{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "listBuiltinShellCommand"))
	ws.Route(ws.GET(config2.APIPrefix+apiExtend+"/{id}").
		Doc("获取内置Shell命令详情").
		Notes("获取内置Shell命令详情").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求Token")).
		Param(ws.PathParameter("id", "记录ID").DataType("string")).
		To(r.get).
		Returns(http.StatusOK, "成功", dtos.BuiltinShellCommandDetail{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.AuthRedirectInfo{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "getBuiltinShellCommand"))
	ws.Route(ws.PUT(config2.APIPrefix+apiExtend).
		Doc("更新内置Shell命令信息").
		Notes("更新内置Shell命令信息").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求Token")).
		To(r.update).
		Reads(dtos.BuiltinShellCommandUpdate{}).
		Returns(http.StatusOK, "成功", dtos.BuiltinShellCommandDetail{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.AuthRedirectInfo{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "updateBuiltinShellCommand"))
	ws.Route(ws.DELETE(config2.APIPrefix+apiExtend+"/{id}").
		Doc("删除内置Shell命令").
		Notes("删除内置Shell命令信息详情").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求Token")).
		To(r.delete).
		Param(ws.PathParameter("id", "记录ID").DataType("string")).
		Returns(http.StatusOK, "成功", "成功").
		Returns(http.StatusUnauthorized, "用户需要先登录", common.AuthRedirectInfo{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "deleteBuiltinShellCommand"))

}

func (r BuiltinShellCommandResource) get(req *restful.Request, resp *restful.Response) {
	var (
		errorData common.ErrorData
		result    dtos.BuiltinShellCommandDetail
	)
	lang := common.GetLanguageFromReq(req, config2.RequestLanguage)
	errorData.Lang = lang
	ctx := context.WithValue(context.Background(), config2.RequestLanguage, lang)
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}

	id := req.PathParameter("id")
	result, errorData = r.Svc.GetBuiltinShellCommandByID(ctx, id)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("get builtin command by id failed, err: %s", errorData.Err.Error())
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
func (r BuiltinShellCommandResource) delete(req *restful.Request, resp *restful.Response) {
	var (
		errorData common.ErrorData
	)
	lang := common.GetLanguageFromReq(req, config2.RequestLanguage)
	errorData.Lang = lang
	ctx := context.WithValue(context.Background(), config2.RequestLanguage, lang)
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}

	id := req.PathParameter("id")
	errorData = r.Svc.DeleteBuiltinShellCommand(ctx, id)
	if errorData.IsNotNil() {
		config2.Logger.Error(errorData.Err)
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	common.ResponseSuccess(resp, "删除成功")
}
func (r BuiltinShellCommandResource) create(req *restful.Request, resp *restful.Response) {
	var (
		model     dtos.BuiltinShellCommandCreate
		result    dtos.BuiltinShellCommandDetail
		errorData common.ErrorData
	)
	lang := common.GetLanguageFromReq(req, config2.RequestLanguage)
	errorData.Lang = lang
	ctx := context.WithValue(context.Background(), config2.RequestLanguage, lang)
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}

	errorData.Err = req.ReadEntity(&model)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("decode json format data failed, err: %s", errorData.Err.Error())
		errorData.MsgCode = config2.MsgCodeJsonDecodeFailed
		errorData.ResponseCode = http.StatusBadRequest
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	result, errorData = r.Svc.AddBuiltinShellCommand(ctx, model)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("add group failed, err: %s", errorData.Err.Error())
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

func (r BuiltinShellCommandResource) update(req *restful.Request, resp *restful.Response) {
	var (
		errorData common.ErrorData
		model     dtos.BuiltinShellCommandUpdate
		result    dtos.BuiltinShellCommandDetail
	)
	lang := common.GetLanguageFromReq(req, config2.RequestLanguage)
	errorData.Lang = lang
	ctx := context.WithValue(context.Background(), config2.RequestLanguage, lang)
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}

	data, _ := io.ReadAll(req.Request.Body)
	errorData.Err = json.Unmarshal(data, &model)
	//errorData.Err = req.ReadEntity(&model)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("decode json format data failed, err: %s", errorData.Err.Error())
		errorData.MsgCode = config2.MsgCodeJsonDecodeFailed
		errorData.ResponseCode = http.StatusBadRequest
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	result, errorData = r.Svc.UpdateBuiltinShellCommand(ctx, model)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("update builtin command failed, err: %s", errorData.Err.Error())
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

func (r BuiltinShellCommandResource) list(req *restful.Request, resp *restful.Response) {
	var (
		errorData common.ErrorData
		results   dtos.BuiltinShellCommandDetailList
	)
	lang := common.GetLanguageFromReq(req, config2.RequestLanguage)
	errorData.Lang = lang
	ctx := context.WithValue(context.Background(), config2.RequestLanguage, lang)
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}

	page, size, order := common.GetRequestPaginationInformation(req)
	queryParam := &common.QueryParam{}
	common.RequestQuery("name", common.ParamTypeString, common.QueryTypeLike, req, queryParam)
	common.RequestQuery("description", common.ParamTypeString, common.QueryTypeLike, req, queryParam)
	results, errorData = r.Svc.ListBuiltinShellCommand(ctx, page, size, order, queryParam.WhereQuery, queryParam.WhereArgs)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("list builtin command failed, err: %s", errorData.Err.Error())
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	common.ResponseSuccess(resp, results)
}

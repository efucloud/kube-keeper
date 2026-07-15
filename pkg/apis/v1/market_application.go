package v1

import (
	"context"
	"encoding/json"
	"github.com/efucloud/common"
	filters2 "github.com/efucloud/kube-keeper/pkg/apis/filters"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/efucloud/kube-keeper/pkg/services"
	restfulspec "github.com/emicklei/go-restful-openapi/v2"
	"github.com/emicklei/go-restful/v3"
	"gopkg.in/yaml.v3"
	"io"
	"net/http"
)

type MarketApplicationResource struct {
	Svc services.MarketApplicationService
}

func (r MarketApplicationResource) AddWebService(ws *restful.WebService) {
	apiInfo := common.ApiInfo{}
	apiInfo.Tag = "market-application"
	apiInfo.Description = "应用商店应用"
	common.RegisterApiInfo(apiInfo)
	apiExtend := "/market-application"
	ws.Route(ws.POST(config2.APIPrefix+apiExtend).
		Doc("创建应用商店应用").
		Notes("创建应用商店应用信息").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求Token")).
		To(r.create).
		Reads(dtos.MarketApplicationCreate{}).
		Returns(http.StatusOK, "成功", dtos.MarketApplicationDetail{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.AuthRedirectInfo{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "createMarketApplication"))
	ws.Route(ws.GET(config2.APIPrefix+apiExtend).
		Doc("获取应用商店应用列表").
		Notes("获取应用商店应用列表").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求Token")).
		Param(ws.QueryParameter("page", "页码").DataType("integer")).
		Param(ws.QueryParameter("size", "每页大小").DataType("integer")).
		Param(ws.QueryParameter("order", "排序")).
		Param(ws.QueryParameter("name", "名称").DataType("string")).
		Param(ws.QueryParameter("search", "搜索").DataType("string")).
		Param(ws.QueryParameter("category", "分类").DataType("string")).
		Param(ws.QueryParameter("state", "状态").DataType("integer")).
		To(r.list).
		Returns(http.StatusOK, "成功", dtos.MarketApplicationDetailList{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.AuthRedirectInfo{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "listMarketApplication"))
	ws.Route(ws.GET(config2.APIPrefix+apiExtend+"/{id}").
		Doc("获取应用商店应用详情").
		Notes("获取应用商店应用详情").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求Token")).
		Param(ws.PathParameter("id", "记录ID").DataType("string")).
		To(r.get).
		Returns(http.StatusOK, "成功", dtos.MarketApplicationDetail{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.AuthRedirectInfo{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "getMarketApplication"))
	ws.Route(ws.PUT(config2.APIPrefix+apiExtend).
		Doc("更新应用商店应用").
		Notes("更新应用商店应用信息").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求Token")).
		To(r.update).
		Reads(dtos.MarketApplicationUpdate{}).
		Returns(http.StatusOK, "成功", dtos.MarketApplicationDetail{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.AuthRedirectInfo{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "updateMarketApplication"))
	ws.Route(ws.PUT(config2.APIPrefix+apiExtend+"/state").
		Doc("更新应用商店应用状态").
		Notes("更新应用商店应用状态").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求Token")).
		To(r.updateState).
		Reads(dtos.ApplicationState{}).
		Returns(http.StatusOK, "成功", dtos.MarketApplicationDetail{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.AuthRedirectInfo{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "updateMarketApplicationState"))

	ws.Route(ws.DELETE(config2.APIPrefix+apiExtend).
		Doc("删除应用商店应用").
		Notes("批量删除应用商店应用").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求Token")).
		To(r.delete).
		Reads(dtos.BatchOperationIds{}).
		Returns(http.StatusOK, "成功", "成功").
		Returns(http.StatusUnauthorized, "用户需要先登录", common.AuthRedirectInfo{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "deleteMarketApplication"))

	ws.Route(ws.POST(config2.APIPrefix+apiExtend+"/import").
		Doc("导入应用定义").
		Notes("从 YAML 导入应用及版本").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求Token")).
		To(r.importMarketApplication).
		Reads(dtos.MarketApplicationExportImport{}).
		Returns(http.StatusOK, "成功", dtos.MarketApplicationDetail{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.AuthRedirectInfo{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "importMarketApplication"))
}

func (r MarketApplicationResource) create(req *restful.Request, resp *restful.Response) {
	var (
		model     dtos.MarketApplicationCreate
		result    dtos.MarketApplicationDetail
		errorData common.ErrorData
	)
	ctx, lang := marketAppCtx(req)
	errorData.Lang = lang
	errorData.Err = req.ReadEntity(&model)
	if errorData.IsNotNil() {
		errorData.MsgCode = config2.MsgCodeJsonDecodeFailed
		errorData.ResponseCode = http.StatusBadRequest
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	result, errorData = r.Svc.AddMarketApplication(ctx, model)
	if errorData.IsNotNil() {
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	common.ResponseSuccess(resp, result)
}

func (r MarketApplicationResource) list(req *restful.Request, resp *restful.Response) {
	var (
		results   dtos.MarketApplicationDetailList
		errorData common.ErrorData
	)
	ctx, lang := marketAppCtx(req)
	errorData.Lang = lang
	page, size, order := common.GetRequestPaginationInformation(req)
	queryParam := &common.QueryParam{}
	common.RequestQuery("name", common.ParamTypeString, common.QueryTypeLike, req, queryParam)
	common.RequestQuery("search", common.ParamTypeString, common.QueryTypeLike, req, queryParam)
	common.RequestQuery("category", common.ParamTypeString, common.QueryTypeEqual, req, queryParam)
	common.RequestQuery("state", common.ParamTypeString, common.QueryTypeEqual, req, queryParam)
	results, errorData = r.Svc.ListMarketApplication(ctx, page, size, order, queryParam.WhereQuery, queryParam.WhereArgs)
	if errorData.IsNotNil() {
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	common.ResponseSuccess(resp, results)
}

func (r MarketApplicationResource) get(req *restful.Request, resp *restful.Response) {
	var (
		result    dtos.MarketApplicationDetail
		errorData common.ErrorData
	)
	ctx, lang := marketAppCtx(req)
	errorData.Lang = lang
	result, errorData = r.Svc.GetMarketApplicationById(ctx, req.PathParameter("id"))
	if errorData.IsNotNil() {
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	common.ResponseSuccess(resp, result)
}

func (r MarketApplicationResource) update(req *restful.Request, resp *restful.Response) {
	var (
		model     dtos.MarketApplicationUpdate
		result    dtos.MarketApplicationDetail
		errorData common.ErrorData
	)
	ctx, lang := marketAppCtx(req)
	errorData.Lang = lang
	errorData.Err = req.ReadEntity(&model)
	if errorData.IsNotNil() {
		errorData.MsgCode = config2.MsgCodeJsonDecodeFailed
		errorData.ResponseCode = http.StatusBadRequest
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	result, errorData = r.Svc.UpdateMarketApplication(ctx, model)
	if errorData.IsNotNil() {
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	common.ResponseSuccess(resp, result)
}

func (r MarketApplicationResource) updateState(req *restful.Request, resp *restful.Response) {
	var (
		model     dtos.ApplicationState
		errorData common.ErrorData
	)
	ctx, lang := marketAppCtx(req)
	errorData.Lang = lang
	errorData.Err = req.ReadEntity(&model)
	if errorData.IsNotNil() {
		errorData.MsgCode = config2.MsgCodeJsonDecodeFailed
		errorData.ResponseCode = http.StatusBadRequest
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	errorData = r.Svc.UpdateMarketApplicationState(ctx, model)
	if errorData.IsNotNil() {
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	common.ResponseSuccess(resp, "success")
}

func (r MarketApplicationResource) delete(req *restful.Request, resp *restful.Response) {
	var (
		model     dtos.BatchOperationIds
		errorData common.ErrorData
	)
	ctx, lang := marketAppCtx(req)
	errorData.Lang = lang
	errorData.Err = req.ReadEntity(&model)
	if errorData.IsNotNil() {
		errorData.MsgCode = config2.MsgCodeJsonDecodeFailed
		errorData.ResponseCode = http.StatusBadRequest
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	errorData = r.Svc.DeleteMarketApplication(ctx, model.Ids)
	if errorData.IsNotNil() {
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	common.ResponseSuccess(resp, "success")
}

func (r MarketApplicationResource) importMarketApplication(req *restful.Request, resp *restful.Response) {
	var (
		model     dtos.MarketApplicationExportImport
		result    dtos.MarketApplicationDetail
		errorData common.ErrorData
	)
	ctx, lang := marketAppCtx(req)
	errorData.Lang = lang
	body, readErr := io.ReadAll(req.Request.Body)
	if readErr != nil {
		errorData.Err = readErr
		errorData.MsgCode = config2.MsgCodeJsonDecodeFailed
		errorData.ResponseCode = http.StatusBadRequest
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	if err := json.Unmarshal(body, &model); err != nil {
		if yamlErr := yaml.Unmarshal(body, &model); yamlErr != nil {
			errorData.Err = yamlErr
			errorData.MsgCode = config2.MsgCodeJsonDecodeFailed
			errorData.ResponseCode = http.StatusBadRequest
			common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
			return
		}
	}
	result, errorData = r.Svc.ImportMarketApplication(ctx, model)
	if errorData.IsNotNil() {
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	common.ResponseSuccess(resp, result)
}

func marketAppCtx(req *restful.Request) (context.Context, string) {
	lang := common.GetLanguageFromReq(req, config2.RequestLanguage)
	ctx := context.WithValue(context.Background(), config2.RequestLanguage, lang)
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	return ctx, lang
}

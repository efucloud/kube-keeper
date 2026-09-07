package v1

import (
	"context"
	"net/http"

	"github.com/efucloud/common"
	"github.com/efucloud/kube-keeper/pkg/apis/filters"
	"github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/efucloud/kube-keeper/pkg/services"
	restfulspec "github.com/emicklei/go-restful-openapi/v2"
	restful "github.com/emicklei/go-restful/v3"
)

type DataDictionaryResource struct {
	Svc services.DataDictionaryService
}

func (r DataDictionaryResource) AddWebService(ws *restful.WebService) {
	info := common.ApiInfo{Tag: "data-dictionary", Description: "数据字典"}
	common.RegisterApiInfo(info)
	path := config.APIPrefix + "/data-dictionary"
	userFilters := []restful.FilterFunction{filters.ClientInfo, filters.I18n, filters.Log, filters.Auth}
	adminFilters := append(append([]restful.FilterFunction{}, userFilters...), filters.Permission([]string{config.SystemRoleAdmin}))
	addFilters := func(route *restful.RouteBuilder, list []restful.FilterFunction) *restful.RouteBuilder {
		for _, filter := range list {
			route.Filter(filter)
		}
		return route.Metadata(restfulspec.KeyOpenAPITags, info.Tags())
	}

	ws.Route(addFilters(ws.GET(path).Doc("获取数据字典列表").To(r.list).
		Returns(http.StatusOK, "成功", dtos.DataDictionaryDetailList{}), userFilters).
		Metadata(config.FrontApiTag, "listDataDictionary"))
	ws.Route(addFilters(ws.GET(path+"/{code}").Doc("按编码获取数据字典").
		Param(ws.PathParameter("code", "字典编码")).To(r.get).
		Returns(http.StatusOK, "成功", dtos.DataDictionaryDetail{}), userFilters).
		Metadata(config.FrontApiTag, "getDataDictionary"))
	ws.Route(addFilters(ws.PUT(path+"/{code}").Doc("更新数据字典").
		Param(ws.PathParameter("code", "不可修改的字典编码")).Reads(dtos.DataDictionaryUpdate{}).To(r.update).
		Returns(http.StatusOK, "成功", dtos.DataDictionaryDetail{}), adminFilters).
		Metadata(config.FrontApiTag, "updateDataDictionary"))
}

func dictionaryContext(req *restful.Request) (context.Context, string) {
	lang := common.GetLanguageFromReq(req, config.RequestLanguage)
	ctx := context.WithValue(context.Background(), config.RequestLanguage, lang)
	if value := req.Attribute(config.RequestContext); value != nil {
		ctx = value.(context.Context)
	}
	return ctx, lang
}

func respondDictionaryError(ctx context.Context, lang string, req *restful.Request, resp *restful.Response, errorData common.ErrorData) bool {
	if errorData.IsNil() {
		return false
	}
	errorData.Lang = lang
	if errorData.ResponseCode == 0 {
		errorData.ResponseCode = http.StatusBadRequest
	}
	common.ResponseErrorMessage(ctx, req, resp, config.Bundle, errorData)
	return true
}

func (r DataDictionaryResource) list(req *restful.Request, resp *restful.Response) {
	ctx, lang := dictionaryContext(req)
	result, errorData := r.Svc.List(ctx)
	if respondDictionaryError(ctx, lang, req, resp, errorData) {
		return
	}
	common.ResponseSuccess(resp, result)
}

func (r DataDictionaryResource) get(req *restful.Request, resp *restful.Response) {
	ctx, lang := dictionaryContext(req)
	result, errorData := r.Svc.Get(ctx, req.PathParameter("code"))
	if respondDictionaryError(ctx, lang, req, resp, errorData) {
		return
	}
	common.ResponseSuccess(resp, result)
}

func (r DataDictionaryResource) update(req *restful.Request, resp *restful.Response) {
	ctx, lang := dictionaryContext(req)
	var model dtos.DataDictionaryUpdate
	var errorData common.ErrorData
	if errorData.Err = req.ReadEntity(&model); respondDictionaryError(ctx, lang, req, resp, errorData) {
		return
	}
	result, errorData := r.Svc.Update(ctx, req.PathParameter("code"), model)
	if respondDictionaryError(ctx, lang, req, resp, errorData) {
		return
	}
	common.ResponseSuccess(resp, result)
}

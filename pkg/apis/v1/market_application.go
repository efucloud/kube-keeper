package v1

import (
	"context"
	"encoding/json"
	"io"
	"net/http"

	"github.com/efucloud/common"
	filters "github.com/efucloud/kube-keeper/pkg/apis/filters"
	"github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/k8scluster"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/efucloud/kube-keeper/pkg/services"
	restfulspec "github.com/emicklei/go-restful-openapi/v2"
	restful "github.com/emicklei/go-restful/v3"
	"gopkg.in/yaml.v3"
)

type MarketApplicationResource struct {
	Svc services.MarketApplicationService
}

func (r MarketApplicationResource) AddWebService(ws *restful.WebService) {
	info := common.ApiInfo{Tag: "market-application", Description: "应用市场"}
	common.RegisterApiInfo(info)
	path := config.APIPrefix + "/market-application"
	userFilters := []restful.FilterFunction{filters.ClientInfo, filters.I18n, filters.Log, filters.Auth}
	adminFilters := append(append([]restful.FilterFunction{}, userFilters...), filters.Permission([]string{config.SystemRoleAdmin}))
	addFilters := func(route *restful.RouteBuilder, list []restful.FilterFunction) *restful.RouteBuilder {
		for _, filter := range list {
			route.Filter(filter)
		}
		return route.Metadata(restfulspec.KeyOpenAPITags, info.Tags())
	}

	ws.Route(addFilters(ws.GET(path).
		Doc("获取应用市场列表").
		Param(ws.QueryParameter("current", "页码").DataType("number")).
		Param(ws.QueryParameter("pageSize", "每页大小").DataType("number")).
		Param(ws.QueryParameter("order", "排序")).
		Param(ws.QueryParameter("search", "名称或描述")).
		Param(ws.QueryParameter("category", "分类")).
		Param(ws.QueryParameter("state", "状态").DataType("number")).
		To(r.list).Returns(http.StatusOK, "成功", dtos.MarketApplicationDetailList{}), userFilters).
		Metadata(config.FrontApiTag, "listMarketApplication"))
	ws.Route(addFilters(ws.GET(path+"/{id}").Doc("获取应用市场详情").
		Param(ws.PathParameter("id", "应用ID")).To(r.get).
		Returns(http.StatusOK, "成功", dtos.MarketApplicationDetail{}), userFilters).
		Metadata(config.FrontApiTag, "getMarketApplication"))
	ws.Route(addFilters(ws.POST(path).Doc("创建应用").Reads(dtos.MarketApplicationCreate{}).
		To(r.create).Returns(http.StatusOK, "成功", dtos.MarketApplicationDetail{}), adminFilters).
		Metadata(config.FrontApiTag, "createMarketApplication"))
	ws.Route(addFilters(ws.PUT(path).Doc("更新应用").Reads(dtos.MarketApplicationUpdate{}).
		To(r.update).Returns(http.StatusOK, "成功", dtos.MarketApplicationDetail{}), adminFilters).
		Metadata(config.FrontApiTag, "updateMarketApplication"))
	ws.Route(addFilters(ws.PUT(path+"/state").Doc("发布或下架应用").Reads(dtos.MarketApplicationState{}).
		To(r.updateState).Returns(http.StatusOK, "成功", "success"), adminFilters).
		Metadata(config.FrontApiTag, "updateMarketApplicationState"))
	ws.Route(addFilters(ws.DELETE(path).Doc("删除应用").Reads(dtos.BatchOperationIds{}).
		To(r.delete).Returns(http.StatusOK, "成功", "success"), adminFilters).
		Metadata(config.FrontApiTag, "deleteMarketApplication"))
	ws.Route(addFilters(ws.POST(path+"/import").Doc("从 YAML 或 JSON 导入应用").
		To(r.importApplication).Returns(http.StatusOK, "成功", dtos.MarketApplicationDetail{}), adminFilters).
		Metadata(config.FrontApiTag, "importMarketApplication"))
	ws.Route(addFilters(ws.GET(path+"/{id}/export").Doc("导出应用").
		Param(ws.PathParameter("id", "应用ID")).To(r.exportApplication).
		Returns(http.StatusOK, "成功", dtos.MarketApplicationExportImport{}), userFilters).
		Metadata(config.FrontApiTag, "exportMarketApplication"))

	deployPath := config.ClusterNamespaceAPIPrefix + "/market-application/{id}"
	ws.Route(addFilters(ws.POST(deployPath+"/render").Doc("渲染应用资源").
		Reads(dtos.ApplicationDeployRequest{}).To(r.render).
		Returns(http.StatusOK, "成功", dtos.ApplicationRenderResult{}), userFilters).
		Metadata(config.FrontApiTag, "renderMarketApplication"))
	ws.Route(addFilters(ws.POST(deployPath+"/validate").Doc("试部署校验应用资源").
		Reads(dtos.ApplicationDeployRequest{}).To(r.validateDeploy).
		Returns(http.StatusOK, "成功", dtos.ApplicationRenderResult{}), userFilters).
		Metadata(config.FrontApiTag, "validateMarketApplication"))
	ws.Route(addFilters(ws.POST(deployPath+"/deploy").Doc("部署应用").
		Reads(dtos.ApplicationDeployRequest{}).To(r.deploy).
		Returns(http.StatusOK, "成功", dtos.ApplicationDetail{}), userFilters).
		Metadata(config.FrontApiTag, "deployMarketApplication"))
}

func marketContext(req *restful.Request) (context.Context, string) {
	lang := common.GetLanguageFromReq(req, config.RequestLanguage)
	ctx := context.WithValue(context.Background(), config.RequestLanguage, lang)
	if value := req.Attribute(config.RequestContext); value != nil {
		ctx = value.(context.Context)
	}
	return ctx, lang
}

func respondMarketError(ctx context.Context, lang string, req *restful.Request, resp *restful.Response, errorData common.ErrorData) bool {
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

func marketRequestIsAdmin(ctx context.Context, req *restful.Request) bool {
	value := req.Attribute(config.RequestUserId)
	if value == nil {
		return false
	}
	account, errorData := (&services.AccountService{}).GetAccountByID(ctx, value.(string))
	return errorData.IsNil() && account.Role == config.SystemRoleAdmin
}

func (r MarketApplicationResource) list(req *restful.Request, resp *restful.Response) {
	ctx, lang := marketContext(req)
	current, pageSize, order := common.GetRequestPaginationInformation(req)
	query := &common.QueryParam{}
	common.RequestQuery("search:name;description", common.ParamTypeString, common.QueryTypeLike, req, query)
	common.RequestQuery("category", common.ParamTypeString, common.QueryTypeEqual, req, query)
	common.RequestQuery("state", common.ParamTypeString, common.QueryTypeEqual, req, query)
	if !marketRequestIsAdmin(ctx, req) {
		common.QueryEqual("state", 1, query)
	}
	result, errorData := r.Svc.List(ctx, current, pageSize, order, query.WhereQuery, query.WhereArgs)
	if respondMarketError(ctx, lang, req, resp, errorData) {
		return
	}
	common.ResponseSuccess(resp, result)
}

func (r MarketApplicationResource) get(req *restful.Request, resp *restful.Response) {
	ctx, lang := marketContext(req)
	result, errorData := r.Svc.Get(ctx, req.PathParameter("id"))
	if errorData.IsNil() && result.State != 1 && !marketRequestIsAdmin(ctx, req) {
		errorData.Err = http.ErrMissingFile
		errorData.ResponseCode = http.StatusNotFound
	}
	if respondMarketError(ctx, lang, req, resp, errorData) {
		return
	}
	common.ResponseSuccess(resp, result)
}

func (r MarketApplicationResource) create(req *restful.Request, resp *restful.Response) {
	ctx, lang := marketContext(req)
	var model dtos.MarketApplicationCreate
	var errorData common.ErrorData
	if errorData.Err = req.ReadEntity(&model); respondMarketError(ctx, lang, req, resp, errorData) {
		return
	}
	result, errorData := r.Svc.Add(ctx, model)
	if respondMarketError(ctx, lang, req, resp, errorData) {
		return
	}
	common.ResponseSuccess(resp, result)
}

func (r MarketApplicationResource) update(req *restful.Request, resp *restful.Response) {
	ctx, lang := marketContext(req)
	var model dtos.MarketApplicationUpdate
	var errorData common.ErrorData
	if errorData.Err = req.ReadEntity(&model); respondMarketError(ctx, lang, req, resp, errorData) {
		return
	}
	result, errorData := r.Svc.Update(ctx, model)
	if respondMarketError(ctx, lang, req, resp, errorData) {
		return
	}
	common.ResponseSuccess(resp, result)
}

func (r MarketApplicationResource) updateState(req *restful.Request, resp *restful.Response) {
	ctx, lang := marketContext(req)
	var model dtos.MarketApplicationState
	var errorData common.ErrorData
	if errorData.Err = req.ReadEntity(&model); respondMarketError(ctx, lang, req, resp, errorData) {
		return
	}
	errorData = r.Svc.UpdateState(ctx, model)
	if respondMarketError(ctx, lang, req, resp, errorData) {
		return
	}
	common.ResponseSuccess(resp, "success")
}

func (r MarketApplicationResource) delete(req *restful.Request, resp *restful.Response) {
	ctx, lang := marketContext(req)
	var model dtos.BatchOperationIds
	var errorData common.ErrorData
	if errorData.Err = req.ReadEntity(&model); respondMarketError(ctx, lang, req, resp, errorData) {
		return
	}
	errorData = r.Svc.Delete(ctx, model.Ids)
	if respondMarketError(ctx, lang, req, resp, errorData) {
		return
	}
	common.ResponseSuccess(resp, "success")
}

func (r MarketApplicationResource) importApplication(req *restful.Request, resp *restful.Response) {
	ctx, lang := marketContext(req)
	var model dtos.MarketApplicationExportImport
	var errorData common.ErrorData
	body, err := io.ReadAll(req.Request.Body)
	if err == nil {
		err = json.Unmarshal(body, &model)
	}
	if err != nil {
		err = yaml.Unmarshal(body, &model)
	}
	errorData.Err = err
	if respondMarketError(ctx, lang, req, resp, errorData) {
		return
	}
	result, errorData := r.Svc.Import(ctx, model)
	if respondMarketError(ctx, lang, req, resp, errorData) {
		return
	}
	common.ResponseSuccess(resp, result)
}

func (r MarketApplicationResource) exportApplication(req *restful.Request, resp *restful.Response) {
	ctx, lang := marketContext(req)
	result, errorData := r.Svc.Export(ctx, req.PathParameter("id"))
	if errorData.IsNil() && result.State != 1 && !marketRequestIsAdmin(ctx, req) {
		errorData.Err = http.ErrMissingFile
		errorData.ResponseCode = http.StatusNotFound
	}
	if respondMarketError(ctx, lang, req, resp, errorData) {
		return
	}
	common.ResponseSuccess(resp, result)
}

func (r MarketApplicationResource) render(req *restful.Request, resp *restful.Response) {
	ctx, lang := marketContext(req)
	var model dtos.ApplicationDeployRequest
	var errorData common.ErrorData
	if errorData.Err = req.ReadEntity(&model); respondMarketError(ctx, lang, req, resp, errorData) {
		return
	}
	runtime := k8scluster.MarketApplicationRuntimeService{}
	result, errorData := runtime.Render(ctx, k8scluster.GetRequestInfo(req), req.PathParameter("id"), model)
	if respondMarketError(ctx, lang, req, resp, errorData) {
		return
	}
	common.ResponseSuccess(resp, result)
}

func (r MarketApplicationResource) deploy(req *restful.Request, resp *restful.Response) {
	ctx, lang := marketContext(req)
	var model dtos.ApplicationDeployRequest
	var errorData common.ErrorData
	if errorData.Err = req.ReadEntity(&model); respondMarketError(ctx, lang, req, resp, errorData) {
		return
	}
	runtime := k8scluster.MarketApplicationRuntimeService{}
	result, errorData := runtime.Deploy(ctx, k8scluster.GetRequestInfo(req), req.PathParameter("id"), model)
	if respondMarketError(ctx, lang, req, resp, errorData) {
		return
	}
	common.ResponseSuccess(resp, result)
}

func (r MarketApplicationResource) validateDeploy(req *restful.Request, resp *restful.Response) {
	ctx, lang := marketContext(req)
	var model dtos.ApplicationDeployRequest
	var errorData common.ErrorData
	if errorData.Err = req.ReadEntity(&model); respondMarketError(ctx, lang, req, resp, errorData) {
		return
	}
	runtime := k8scluster.MarketApplicationRuntimeService{}
	result, errorData := runtime.Validate(ctx, k8scluster.GetRequestInfo(req), req.PathParameter("id"), model)
	if respondMarketError(ctx, lang, req, resp, errorData) {
		return
	}
	common.ResponseSuccess(resp, result)
}

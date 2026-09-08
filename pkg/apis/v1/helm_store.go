package v1

import (
	"net/http"
	"strconv"

	"github.com/efucloud/common"
	filters "github.com/efucloud/kube-keeper/pkg/apis/filters"
	"github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/helmstore"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/efucloud/kube-keeper/pkg/services"
	restfulspec "github.com/emicklei/go-restful-openapi/v2"
	restful "github.com/emicklei/go-restful/v3"
)

type HelmStoreResource struct {
	RepositoryService services.HelmRepositoryService
}

func (resource HelmStoreResource) AddWebService(ws *restful.WebService) {
	info := common.ApiInfo{Tag: "helm-store", Description: "Helm商店"}
	common.RegisterApiInfo(info)
	storePath := config.APIPrefix + "/helm-store"
	repositoryPath := config.APIPrefix + "/helm-repository"
	userFilters := []restful.FilterFunction{filters.ClientInfo, filters.I18n, filters.Log, filters.Auth}
	adminFilters := append(append([]restful.FilterFunction{}, userFilters...), filters.Permission([]string{config.SystemRoleAdmin}))
	addFilters := func(route *restful.RouteBuilder, routeFilters []restful.FilterFunction) *restful.RouteBuilder {
		for _, filter := range routeFilters {
			route.Filter(filter)
		}
		return route.Metadata(restfulspec.KeyOpenAPITags, info.Tags())
	}

	ws.Route(addFilters(ws.GET(storePath+"/repositories").Doc("获取可用Helm仓库").To(resource.listStoreRepositories).
		Returns(http.StatusOK, "成功", []helmstore.Repository{}), userFilters).Metadata(config.FrontApiTag, "listHelmStoreRepositories"))
	ws.Route(addFilters(ws.GET(storePath+"/charts").Doc("获取Helm Chart列表").
		Param(ws.QueryParameter("repository", "仓库ID")).Param(ws.QueryParameter("search", "Chart名称、描述或关键字")).
		Param(ws.QueryParameter("current", "页码").DataType("number")).Param(ws.QueryParameter("pageSize", "每页大小").DataType("number")).
		To(resource.listCharts).Returns(http.StatusOK, "成功", helmstore.ChartList{}), userFilters).Metadata(config.FrontApiTag, "listHelmStoreCharts"))
	ws.Route(addFilters(ws.GET(storePath+"/charts/{repository}/{chart}").Doc("获取Helm Chart详情").
		Param(ws.PathParameter("repository", "仓库ID")).Param(ws.PathParameter("chart", "Chart名称")).
		To(resource.getChart).Returns(http.StatusOK, "成功", helmstore.ChartDetail{}), userFilters).Metadata(config.FrontApiTag, "getHelmStoreChart"))

	ws.Route(addFilters(ws.GET(repositoryPath).Doc("获取Helm仓库管理列表").
		Param(ws.QueryParameter("current", "页码").DataType("number")).Param(ws.QueryParameter("pageSize", "每页大小").DataType("number")).
		To(resource.listRepositories).Returns(http.StatusOK, "成功", dtos.HelmRepositoryDetailList{}), adminFilters).Metadata(config.FrontApiTag, "listHelmRepository"))
	ws.Route(addFilters(ws.POST(repositoryPath).Doc("新增Helm仓库").Reads(dtos.HelmRepositoryCreate{}).To(resource.createRepository).
		Returns(http.StatusOK, "成功", dtos.HelmRepositoryDetail{}), adminFilters).Metadata(config.FrontApiTag, "createHelmRepository"))
	ws.Route(addFilters(ws.PUT(repositoryPath).Doc("更新Helm仓库").Reads(dtos.HelmRepositoryUpdate{}).To(resource.updateRepository).
		Returns(http.StatusOK, "成功", dtos.HelmRepositoryDetail{}), adminFilters).Metadata(config.FrontApiTag, "updateHelmRepository"))
	ws.Route(addFilters(ws.DELETE(repositoryPath).Doc("删除Helm仓库").Reads(dtos.BatchOperationIds{}).To(resource.deleteRepository).
		Returns(http.StatusOK, "成功", "success"), adminFilters).Metadata(config.FrontApiTag, "deleteHelmRepository"))
	ws.Route(addFilters(ws.POST(repositoryPath+"/{id}/sync").Doc("立即同步Helm仓库").Param(ws.PathParameter("id", "仓库ID")).To(resource.syncRepository).
		Returns(http.StatusOK, "成功", dtos.HelmRepositoryDetail{}), adminFilters).Metadata(config.FrontApiTag, "syncHelmRepository"))
}

func (resource HelmStoreResource) listStoreRepositories(request *restful.Request, response *restful.Response) {
	ctx, lang := marketContext(request)
	result, err := helmstore.Default().Repositories(ctx)
	if err != nil {
		respondMarketError(ctx, lang, request, response, common.ErrorData{Err: err, MsgCode: config.MsgCodeGetRecordFailed})
		return
	}
	common.ResponseSuccess(response, result)
}

func (resource HelmStoreResource) listCharts(request *restful.Request, response *restful.Response) {
	ctx, lang := marketContext(request)
	current, _ := strconv.Atoi(request.QueryParameter("current"))
	pageSize, _ := strconv.Atoi(request.QueryParameter("pageSize"))
	result, err := helmstore.Default().ListCharts(ctx, request.QueryParameter("repository"), request.QueryParameter("search"), current, pageSize)
	if err != nil {
		respondMarketError(ctx, lang, request, response, common.ErrorData{Err: err, MsgCode: config.MsgCodeGetRecordFailed})
		return
	}
	common.ResponseSuccess(response, result)
}

func (resource HelmStoreResource) getChart(request *restful.Request, response *restful.Response) {
	ctx, lang := marketContext(request)
	result, err := helmstore.Default().GetChart(ctx, request.PathParameter("repository"), request.PathParameter("chart"))
	if err != nil {
		respondMarketError(ctx, lang, request, response, common.ErrorData{Err: err, ResponseCode: http.StatusNotFound, MsgCode: config.MsgCodeRecordNotExist})
		return
	}
	common.ResponseSuccess(response, result)
}

func (resource HelmStoreResource) listRepositories(request *restful.Request, response *restful.Response) {
	ctx, lang := marketContext(request)
	current, pageSize, _ := common.GetRequestPaginationInformation(request)
	result, errorData := resource.RepositoryService.List(ctx, current, pageSize)
	if respondMarketError(ctx, lang, request, response, errorData) {
		return
	}
	common.ResponseSuccess(response, result)
}

func (resource HelmStoreResource) createRepository(request *restful.Request, response *restful.Response) {
	ctx, lang := marketContext(request)
	var model dtos.HelmRepositoryCreate
	errorData := common.ErrorData{Err: request.ReadEntity(&model)}
	if respondMarketError(ctx, lang, request, response, errorData) {
		return
	}
	result, errorData := resource.RepositoryService.Add(ctx, model)
	if respondMarketError(ctx, lang, request, response, errorData) {
		return
	}
	common.ResponseSuccess(response, result)
}

func (resource HelmStoreResource) updateRepository(request *restful.Request, response *restful.Response) {
	ctx, lang := marketContext(request)
	var model dtos.HelmRepositoryUpdate
	errorData := common.ErrorData{Err: request.ReadEntity(&model)}
	if respondMarketError(ctx, lang, request, response, errorData) {
		return
	}
	result, errorData := resource.RepositoryService.Update(ctx, model)
	if respondMarketError(ctx, lang, request, response, errorData) {
		return
	}
	common.ResponseSuccess(response, result)
}

func (resource HelmStoreResource) deleteRepository(request *restful.Request, response *restful.Response) {
	ctx, lang := marketContext(request)
	var model dtos.BatchOperationIds
	errorData := common.ErrorData{Err: request.ReadEntity(&model)}
	if respondMarketError(ctx, lang, request, response, errorData) {
		return
	}
	errorData = resource.RepositoryService.Delete(ctx, model.Ids)
	if respondMarketError(ctx, lang, request, response, errorData) {
		return
	}
	common.ResponseSuccess(response, "success")
}

func (resource HelmStoreResource) syncRepository(request *restful.Request, response *restful.Response) {
	ctx, lang := marketContext(request)
	result, errorData := resource.RepositoryService.Sync(ctx, request.PathParameter("id"))
	if respondMarketError(ctx, lang, request, response, errorData) {
		return
	}
	common.ResponseSuccess(response, result)
}

package v1

import (
	"context"
	"net/http"

	"github.com/efucloud/common"
	filters "github.com/efucloud/kube-keeper/pkg/apis/filters"
	"github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/k8scluster"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/efucloud/kube-keeper/pkg/services"
	restfulspec "github.com/emicklei/go-restful-openapi/v2"
	restful "github.com/emicklei/go-restful/v3"
)

type ApplicationResource struct{ Svc services.ApplicationService }

func (r ApplicationResource) AddWebService(ws *restful.WebService) {
	info := common.ApiInfo{Tag: "application", Description: "应用部署"}
	common.RegisterApiInfo(info)
	path := config.ClusterNamespaceAPIPrefix + "/application"
	base := func(route *restful.RouteBuilder) *restful.RouteBuilder {
		return route.Filter(filters.ClientInfo).Filter(filters.I18n).Filter(filters.Log).Filter(filters.Auth).
			Metadata(restfulspec.KeyOpenAPITags, info.Tags())
	}
	ws.Route(base(ws.GET(path).Doc("获取应用部署列表").
		Param(ws.QueryParameter("current", "页码").DataType("number")).
		Param(ws.QueryParameter("pageSize", "每页大小").DataType("number")).
		Param(ws.QueryParameter("order", "排序")).
		Param(ws.QueryParameter("search", "名称")).
		Param(ws.QueryParameter("status", "状态")).To(r.list).
		Returns(http.StatusOK, "成功", dtos.ApplicationDetailList{})).
		Metadata(config.FrontApiTag, "listApplication"))
	ws.Route(base(ws.GET(path+"/{id}").Doc("获取应用部署详情").
		Param(ws.PathParameter("id", "部署ID")).To(r.get).
		Returns(http.StatusOK, "成功", dtos.ApplicationDetail{})).
		Metadata(config.FrontApiTag, "getApplication"))
	ws.Route(base(ws.DELETE(path+"/{id}").Doc("删除应用部署及 Kubernetes 资源").
		Param(ws.PathParameter("id", "部署ID")).To(r.delete).
		Returns(http.StatusOK, "成功", dtos.ApplicationDetail{})).
		Metadata(config.FrontApiTag, "deleteApplication"))
}

func (r ApplicationResource) list(req *restful.Request, resp *restful.Response) {
	ctx, lang := marketContext(req)
	current, pageSize, order := common.GetRequestPaginationInformation(req)
	query := &common.QueryParam{}
	common.QueryEqual("cluster_code", req.PathParameter("cluster"), query)
	common.QueryEqual("namespace", req.PathParameter("namespace"), query)
	if !marketRequestIsAdmin(ctx, req) {
		common.QueryEqual("creator_id", req.Attribute(config.RequestUserId).(string), query)
	}
	common.RequestQuery("search:releaseName;applicationName", common.ParamTypeString, common.QueryTypeLike, req, query)
	common.RequestQuery("status", common.ParamTypeString, common.QueryTypeEqual, req, query)
	result, errorData := r.Svc.List(ctx, current, pageSize, order, query.WhereQuery, query.WhereArgs)
	if respondMarketError(ctx, lang, req, resp, errorData) {
		return
	}
	common.ResponseSuccess(resp, result)
}

func (r ApplicationResource) get(req *restful.Request, resp *restful.Response) {
	ctx, lang := marketContext(req)
	result, errorData := r.Svc.Get(ctx, req.PathParameter("id"))
	if errorData.IsNil() && !applicationRecordAccessible(ctx, req, result) {
		errorData.Err = http.ErrMissingFile
		errorData.ResponseCode = http.StatusNotFound
	}
	if respondMarketError(ctx, lang, req, resp, errorData) {
		return
	}
	common.ResponseSuccess(resp, result)
}

func (r ApplicationResource) delete(req *restful.Request, resp *restful.Response) {
	ctx, lang := marketContext(req)
	existing, errorData := r.Svc.Get(ctx, req.PathParameter("id"))
	if errorData.IsNil() && !applicationRecordAccessible(ctx, req, existing) {
		errorData.Err = http.ErrMissingFile
		errorData.ResponseCode = http.StatusNotFound
	}
	if respondMarketError(ctx, lang, req, resp, errorData) {
		return
	}
	runtime := k8scluster.MarketApplicationRuntimeService{}
	result, errorData := runtime.Delete(ctx, k8scluster.GetRequestInfo(req), req.PathParameter("id"))
	if respondMarketError(ctx, lang, req, resp, errorData) {
		return
	}
	common.ResponseSuccess(resp, result)
}

func applicationRecordAccessible(ctx context.Context, req *restful.Request, record dtos.ApplicationDetail) bool {
	if record.ClusterCode != req.PathParameter("cluster") || record.Namespace != req.PathParameter("namespace") {
		return false
	}
	if marketRequestIsAdmin(ctx, req) {
		return true
	}
	accountID, ok := req.Attribute(config.RequestUserId).(string)
	return ok && accountID != "" && record.CreatorId == accountID
}

package cluster

import (
	"context"
	"github.com/efucloud/common"
	filters2 "github.com/efucloud/kube-keeper/pkg/apis/filters"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/efucloud/kube-keeper/pkg/services"
	restfulspec "github.com/emicklei/go-restful-openapi/v2"
	"github.com/emicklei/go-restful/v3"
	"net/http"
)

type TerminalAuditLogResource struct {
	Svc services.TerminalAuditLogService
}

func (r TerminalAuditLogResource) AddWebService(ws *restful.WebService) {
	apiInfo := common.ApiInfo{}
	apiInfo.Tag = "terminal-audit-log"
	apiInfo.Description = "集群Pod终端审计日志"
	common.RegisterApiInfo(apiInfo)
	apiExtend := "/terminal-audit-log"
	ws.Route(ws.GET(config2.ClusterProxyAPIPrefix+apiExtend).
		Doc("获取集群Pod终端审计日志列表").
		Notes("获取集群Pod终端审计日志信息").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		Param(ws.QueryParameter("page", "页码").DataType("integer")).
		Param(ws.QueryParameter("size", "每页大小").DataType("integer")).
		Param(ws.QueryParameter("order", "排序")).
		Param(ws.QueryParameter("accountId", "用户id").DataType("integer")).
		Param(ws.QueryParameter("namespace", "集群命名空间").DataType("string")).
		Param(ws.QueryParameter("pod", "集群Pod").DataType("string")).
		Param(ws.QueryParameter("container", "容器").DataType("string")).
		To(r.list).
		Returns(http.StatusOK, "成功", dtos.TerminalAuditLogDetailList{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.AuthRedirectInfo{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "listTerminalAuditLog"))

}
func (r TerminalAuditLogResource) list(req *restful.Request, resp *restful.Response) {
	var (
		errorData common.ErrorData
		results   dtos.TerminalAuditLogDetailList
	)
	lang := common.GetLanguageFromReq(req, config2.RequestLanguage)
	errorData.Lang = lang
	ctx := context.WithValue(context.Background(), config2.RequestLanguage, lang)
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	page, size, order := common.GetRequestPaginationInformation(req)
	queryParam := &common.QueryParam{}
	common.RequestQuery("accountId", common.ParamTypeNumber, common.QueryTypeEqual, req, queryParam)
	common.RequestQuery("namespace", common.ParamTypeString, common.QueryTypeEqual, req, queryParam)
	common.RequestQuery("pod", common.ParamTypeString, common.QueryTypeLike, req, queryParam)
	common.RequestQuery("container", common.ParamTypeString, common.QueryTypeEqual, req, queryParam)
	results, errorData = r.Svc.ListTerminalAuditLog(ctx, page, size, order, queryParam.WhereQuery, queryParam.WhereArgs)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("list pod terminal failed, err: %s", errorData.Err.Error())
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	common.ResponseSuccess(resp, results)
}

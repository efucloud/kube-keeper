package cluster

import (
	"context"
	"fmt"
	"github.com/efucloud/common"
	filters2 "github.com/efucloud/kube-keeper/pkg/apis/filters"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/mcp/server"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	restfulspec "github.com/emicklei/go-restful-openapi/v2"
	restful "github.com/emicklei/go-restful/v3"
	"io"
	"net/http"
)

type ServerResource struct {
}

func (r ServerResource) AddWebService(ws *restful.WebService) {
	apiInfo := common.ApiInfo{}
	apiInfo.Tag = "mcp-server"
	apiInfo.Description = "MCP Server"
	common.RegisterApiInfo(apiInfo)
	apiExtend := fmt.Sprintf("/%s/check", config2.ChatBuiltin)
	ws.Route(ws.POST(config2.ClusterAgentAPIPrefix+apiExtend).
		Param(ws.HeaderParameter(config2.AuthHeader, "系统用户Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		To(r.handleRequest).
		Returns(http.StatusBadRequest, "请求数据无法处理", dtos.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", dtos.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", dtos.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()))

}
func (r ServerResource) handleRequest(req *restful.Request, resp *restful.Response) {
	lang := common.GetLanguageFromReq(req, config2.RequestLanguage)
	ctx := context.WithValue(context.Background(), config2.RequestLanguage, lang)
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	ctx = context.WithValue(ctx, config2.RequestClusterCode, req.PathParameter("cluster"))
	body, _ := io.ReadAll(req.Request.Body)
	response := server.McpServer.HandleMessage(ctx, body)
	if response == nil {
		resp.WriteHeader(http.StatusNoContent)
		return
	}
	resp.Header().Set("Content-Type", "application/json")
	_ = resp.WriteEntity(response)
}

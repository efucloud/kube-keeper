package cluster

import (
	"github.com/efucloud/common"
	filters2 "github.com/efucloud/kube-keeper/pkg/apis/filters"
	"github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/inital"
	dtos2 "github.com/efucloud/kube-keeper/pkg/models/dtos"
	restfulspec "github.com/emicklei/go-restful-openapi/v2"
	restful "github.com/emicklei/go-restful/v3"
	"net/http"
)

type ClusterRoleTemplateResource struct {
}

func (r ClusterRoleTemplateResource) AddWebService(ws *restful.WebService) {
	apiInfo := common.ApiInfo{}
	apiInfo.Tag = "cluster-role-template"
	apiInfo.Description = "cluster role template"
	common.RegisterApiInfo(apiInfo)
	apiExtend := "/cluster-role-template"
	ws.Route(ws.GET(config.ClusterAPIPrefix+apiExtend).
		Param(ws.HeaderParameter(config.AuthHeader, "系统用户Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		Param(ws.QueryParameter("category", "角色类型")).
		To(r.get).
		Returns(http.StatusOK, "OK", dtos2.ClusterRoleTemplateList{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", dtos2.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", dtos2.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", dtos2.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).
		Metadata(config.FrontApiTag, "listClusterRoleTemplate").
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()))

}
func (r ClusterRoleTemplateResource) get(req *restful.Request, resp *restful.Response) {
	var results []dtos2.ClusterRoleTemplate
	if (req.PathParameter("category")) != "" {
		for _, item := range inital.ClusterRoleTemplates {
			if item.Category == req.QueryParameter("category") {
				results = append(results, item)
			}
		}
	} else {
		results = inital.ClusterRoleTemplates
	}
	common.ResponseSuccess(resp, dtos2.ClusterRoleTemplateList{
		Data:  results,
		Total: int64(len(results)),
	})
}

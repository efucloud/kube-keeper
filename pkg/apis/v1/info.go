package v1

import (
	"github.com/efucloud/common"
	filters2 "github.com/efucloud/kube-keeper/pkg/apis/filters"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	dtos2 "github.com/efucloud/kube-keeper/pkg/models/dtos"
	restfulspec "github.com/emicklei/go-restful-openapi/v2"
	"github.com/emicklei/go-restful/v3"
	"net/http"
)

type InfoResource struct {
}

func (r InfoResource) AddWebService(ws *restful.WebService) {
	apiInfo := common.ApiInfo{}
	apiInfo.Tag = "system-info"
	apiInfo.Description = "应用信息"
	common.RegisterApiInfo(apiInfo)
	ws.Route(ws.GET(config2.APIPrefix+"/health").
		Doc("健康检查").
		Notes("健康检查").
		To(r.health).
		Returns(http.StatusOK, "成功", "ok").
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "health"))
	ws.Route(ws.GET(config2.APIPrefix+"/info").
		Doc("查看应用信息").
		Notes("查看应用的编译信息").
		To(r.info).
		Returns(http.StatusOK, "成功", dtos2.ApplicationInfo{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "info"))

}
func (r InfoResource) info(req *restful.Request, resp *restful.Response) {
	var app dtos2.ApplicationInfo
	app.Application = config2.ApplicationName
	app.BuildDate = config2.BuildDate
	app.GoVersion = config2.GoVersion
	app.Commit = config2.Commit
	common.ResponseSuccess(resp, app)
}

func (r InfoResource) health(req *restful.Request, resp *restful.Response) {
	common.ResponseSuccess(resp, "ok")
}

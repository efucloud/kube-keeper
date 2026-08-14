package cluster

import (
	"github.com/efucloud/common"
	filters2 "github.com/efucloud/kube-keeper/pkg/apis/filters"
	"github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/k8scluster"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	restfulspec "github.com/emicklei/go-restful-openapi/v2"
	"github.com/emicklei/go-restful/v3"
	"net/http"
)

type TerminalResource struct {
	Svc k8scluster.PodService
}

func (cp TerminalResource) AddWebService(ws *restful.WebService) {
	apiInfo := common.ApiInfo{}
	apiInfo.Tag = "cluster-terminal"
	apiInfo.Description = "集群终端"
	common.RegisterApiInfo(apiInfo)
	ws.Route(ws.GET(config.ClusterAPIPrefix+"/terminal").
		Consumes(restful.MIME_JSON).
		Param(ws.HeaderParameter(config.AuthHeader, "请求token")).
		Param(ws.HeaderParameter(config.ClusterAuthHeader, "集群的token,若该参数存在，则忽略kube-keeper的token")).
		Param(ws.PathParameter("cluster", "集群编码").Required(true)).
		To(cp.createTerminalPod).
		Returns(http.StatusOK, "success", dtos.ClusterTerminalPodInfo{}).
		Doc("为用户创建可以使用kubectl等工具的pod").
		Notes("为用户创建可以使用kubectl等工具的pod，能够自动配置用户的kubeconfig信息").
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config.FrontApiTag, "createTerminalPod"))

}
func (cp TerminalResource) createTerminalPod(req *restful.Request, resp *restful.Response) {
	cp.Svc.CreateClusterTerminalPod(req, resp)
}

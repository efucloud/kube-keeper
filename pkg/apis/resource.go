package apis

import (
	"fmt"
	"github.com/efucloud/common"
	"github.com/efucloud/kube-keeper/pkg/apis/admin"
	"github.com/efucloud/kube-keeper/pkg/apis/biz"
	chat2 "github.com/efucloud/kube-keeper/pkg/apis/chat"
	"github.com/efucloud/kube-keeper/pkg/apis/cluster"
	v2 "github.com/efucloud/kube-keeper/pkg/apis/v1"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	k8scluster2 "github.com/efucloud/kube-keeper/pkg/k8scluster"
	services2 "github.com/efucloud/kube-keeper/pkg/services"
	"github.com/emicklei/go-restful/v3"
	"net/http"
)

func GetWebServices(container *restful.Container) *restful.WebService {
	ws := new(restful.WebService)
	container.RecoverHandler(func(i interface{}, writer http.ResponseWriter) {
		writer.WriteHeader(http.StatusInternalServerError)
		var body common.ResponseError
		body.Detail = fmt.Sprintf("%v", i)
		body.Alert, _ = common.GetLocaleMessage(config2.Bundle, nil, "zh", config2.MsgCodeApplicationUnExceptPanicError)
	})
	ws.Consumes(restful.MIME_JSON).Produces(restful.MIME_JSON)
	StaticResource{}.AddWebService(ws)
	cluster.ClusterAccountResource{Svc: services2.ClusterAccountService{}}.AddWebService(ws)
	v2.BuiltinShellCommandResource{Svc: services2.BuiltinShellCommandService{}}.AddWebService(ws)
	v2.InfoResource{}.AddWebService(ws)
	v2.MarketApplicationResource{Svc: services2.MarketApplicationService{}}.AddWebService(ws)
	v2.OAuthResource{}.AddWebService(ws)
	admin.AccountResource{Svc: services2.AccountService{}}.AddWebService(ws)
	admin.ClusterResource{Svc: services2.ClusterService{}}.AddWebService(ws)
	biz.PersonalResource{Svc: services2.PersonalService{}}.AddWebService(ws)
	cluster.ClusterResource{Svc: k8scluster2.ClusterService{}}.AddWebService(ws)
	cluster.ClusterAccountResource{Svc: services2.ClusterAccountService{}}.AddWebService(ws)
	cluster.ClusterAccountRoleResource{Svc: services2.ClusterAccountRoleService{}}.AddWebService(ws)
	cluster.ClusterNamespaceAccountRoleResource{Svc: services2.ClusterNamespaceAccountRoleService{}}.AddWebService(ws)
	cluster.ClusterRoleTemplateResource{}.AddWebService(ws)
	cluster.HelmResource{Svc: k8scluster2.HelmService{}}.AddWebService(ws)
	cluster.ServerResource{}.AddWebService(ws)
	cluster.ProxyResource{}.AddWebService(ws)
	cluster.StreamResource{}.AddWebService(ws)
	cluster.ClusterNamespaceResource{Svc: k8scluster2.NamespaceService{}}.AddWebService(ws)
	cluster.PodResource{Svc: k8scluster2.PodService{}}.AddWebService(ws)
	cluster.TerminalResource{Svc: k8scluster2.PodService{}}.AddWebService(ws)
	cluster.TerminalAuditLogResource{Svc: services2.TerminalAuditLogService{}}.AddWebService(ws)
	resource := chat2.AiChatResource{Router: chat2.NewRouter()}
	resource.AddWebService(ws)
	return ws
}
func AddResources() {
	restful.DefaultRequestContentType(restful.MIME_JSON)
	restful.DefaultResponseContentType(restful.MIME_JSON)
	container := restful.DefaultContainer

	container.Router(restful.CurlyRouter{})
	container.Filter(container.OPTIONSFilter)
	cors := restful.CrossOriginResourceSharing{
		AllowedHeaders: []string{"Content-Type", "Accept", "*"},
		AllowedMethods: []string{"GET", "POST", "DELETE", "PUT", "PATCH", "*"},
		CookiesAllowed: true,
		Container:      container,
	}
	container.Filter(cors.Filter)
	ws := GetWebServices(container)
	container.Add(ws)

}

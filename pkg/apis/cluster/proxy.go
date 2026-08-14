package cluster

import (
	"context"
	"fmt"
	"github.com/efucloud/common"
	filters2 "github.com/efucloud/kube-keeper/pkg/apis/filters"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	k8scluster2 "github.com/efucloud/kube-keeper/pkg/k8scluster"
	dtos2 "github.com/efucloud/kube-keeper/pkg/models/dtos"
	services2 "github.com/efucloud/kube-keeper/pkg/services"
	"github.com/efucloud/kube-keeper/pkg/structs"
	"github.com/efucloud/kube-keeper/pkg/utils"
	restfulspec "github.com/emicklei/go-restful-openapi/v2"
	"github.com/emicklei/go-restful/v3"
	"k8s.io/apimachinery/pkg/types"
	"net/http"
	"net/http/httputil"
	"net/url"
	"strings"
)

type ProxyResource struct {
}

const DiscoveryHead = "application/json;g=apidiscovery.k8s.io;v=v2;as=APIGroupDiscoveryList,application/json;g=apidiscovery.k8s.io;v=v2beta1;as=APIGroupDiscoveryList,application/json"

func (cp ProxyResource) AddWebService(ws *restful.WebService) {
	ws.Consumes(restful.MIME_JSON).
		Produces(restful.MIME_JSON)
	apiInfo := common.ApiInfo{}
	apiInfo.Tag = "cluster-proxy"
	apiInfo.Description = "集群访问代理"
	common.RegisterApiInfo(apiInfo)
	ws.Route(ws.GET(config2.ClusterProxyAPIPrefix+"/{address:*}").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求token，")).
		Param(ws.HeaderParameter(config2.ClusterAuthHeader, "集群的token,若该参数存在，则忽略kube-keeper的token")).
		Param(ws.PathParameter("cluster", "集群编码").Required(true)).
		Param(ws.PathParameter("address", "集群地址,https://192.168.64.15:8443/{address:*}").Required(true)).
		To(cp.proxy).
		Doc("集群GET请求代理").
		Notes("集群GET请求代理，本应用做认证后获取用户信息，并根据用户信息使用对应的kubeconfig连接集群").
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).Filter(filters2.WebOnly).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "clusterGetProxy"))
	ws.Route(ws.PUT(config2.ClusterProxyAPIPrefix+"/{address:*}").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求token")).
		Param(ws.HeaderParameter(config2.ClusterAuthHeader, "集群的token,若该参数存在，则忽略kube-keeper的token")).
		Param(ws.PathParameter("cluster", "集群编码").Required(true)).
		Param(ws.PathParameter("address", "集群地址,https://192.168.64.15:8443/{address:*}").Required(true)).
		To(cp.proxy).
		Reads(dtos2.KubernetesResource{}).
		Doc("集群PUT请求代理，建议使用PATCH进行数据更新").
		Notes("集群PUT请求代理，本应用做认证后获取用户信息，并根据用户信息使用对应的kubeconfig连接集群").
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).Filter(filters2.WebOnly).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "clusterPutProxy"))
	ws.Route(ws.POST(config2.ClusterProxyAPIPrefix+"/{address:*}").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求token")).
		Param(ws.HeaderParameter(config2.ClusterAuthHeader, "集群的token,若该参数存在，则忽略kube-keeper的token")).
		Param(ws.PathParameter("cluster", "集群编码").Required(true)).
		Param(ws.PathParameter("address", "集群地址,https://192.168.64.15:8443/{address:*}").Required(true)).
		To(cp.proxy).
		Consumes(restful.MIME_JSON).
		Produces(restful.MIME_JSON, "text/event-stream").
		Reads(dtos2.KubernetesResource{}).
		Doc("集群POST请求代理").
		Notes("集群POST请求代理，本应用做认证后获取用户信息，并根据用户信息使用对应的kubeconfig连接集群").
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).Filter(filters2.WebOnly).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "clusterPostProxy"))
	ws.Route(ws.DELETE(config2.ClusterProxyAPIPrefix+"/{address:*}").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求token，")).
		Param(ws.HeaderParameter(config2.ClusterAuthHeader, "集群的token,若该参数存在，则忽略kube-keeper的token")).
		Param(ws.PathParameter("cluster", "集群编码").Required(true)).
		Param(ws.PathParameter("address", "集群地址,https://192.168.64.15:8443/{address:*}").Required(true)).
		To(cp.proxy).
		Doc("集群DELETE请求代理").
		Notes("集群DELETE请求代理，本应用做认证后获取用户信息，并根据用户信息使用对应的kubeconfig连接集群").
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).Filter(filters2.WebOnly).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "clusterDeleteProxy"))
	ws.Route(ws.PATCH(config2.ClusterProxyAPIPrefix+"/{address:*}").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求token，")).
		Param(ws.HeaderParameter(config2.ClusterAuthHeader, "集群的token,若该参数存在，则忽略kube-keeper的token")).
		Param(ws.PathParameter("cluster", "集群编码").Required(true)).
		Param(ws.PathParameter("address", "集群地址,https://192.168.64.15:8443/{address:*}").Required(true)).
		To(cp.proxy).
		Reads([]dtos2.PatchSubsetValue{}).
		Consumes(string(types.JSONPatchType)).
		Doc("集群PATCH请求代理，需要注意请求头的改变目前只支持：application/json-patch+json").
		Notes("集群PATCH请求代理，本应用做认证后获取用户信息，并根据用户信息使用对应的kubeconfig连接集群,"+
			"例如增加namespace的label").
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).Filter(filters2.WebOnly).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "clusterPatchProxy"))
}
func (cp ProxyResource) proxy(req *restful.Request, resp *restful.Response) {
	lang := common.GetLanguageFromReq(req, config2.RequestLanguage)
	ctx := context.WithValue(context.Background(), config2.RequestLanguage, req.Attribute(config2.RequestLanguage))
	address := req.PathParameter("address")
	if !strings.HasPrefix(address, "/") {
		address = "/" + address
	}

	var (
		cluster        dtos2.ClusterDetail
		errorData      common.ErrorData
		u              *url.URL
		requestInfo    structs.RequestInfo
		clusterAccount dtos2.ClusterAccountDetail
		discovery      bool
	)
	requestInfo = k8scluster2.GetRequestInfo(req)
	clusterSvc := services2.ClusterService{}
	cluster, errorData = clusterSvc.GetClusterByCode(ctx, requestInfo.ClusterCode)
	if errorData.IsNotNil() {
		config2.Logger.Error(errorData.Err)
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	if len(cluster.ID) == 0 {
		errorData.MsgCode = config2.MsgCodeClusterIsNotFoundOrDisable
		errorData.ResponseCode = http.StatusNotFound
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	cluster.Default(ctx)
	apiServer := cluster.ApiServer
	u, errorData.Err = url.Parse(apiServer)
	if errorData.IsNotNil() {
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	requestInfo = k8scluster2.GetRequestInfo(req)
	// 判断当前用户是否在系统中配置作为集群用户
	clusterAccSvc := services2.ClusterAccountService{}
	clusterAccount, errorData = clusterAccSvc.GetClusterAccountInfoByAccountID(ctx, requestInfo, req.Attribute(config2.RequestUserId).(string))
	if errorData.IsNotNil() {
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	if len(clusterAccount.ID) == 0 {
		errorData.Err = fmt.Errorf("current account in not config permission to access cluster: %s", requestInfo.ClusterCode)
		errorData.ResponseCode = http.StatusForbidden
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	clusterAccount.Default(ctx)
	var transport http.RoundTripper
	request := req.Request.Clone(context.TODO())
	tlsConfig, err := utils.BuildTLSConfig(cluster.CertificateAuthority, clusterAccount.ClientKey, clusterAccount.ClientCertificate)
	if err != nil {
		errorData.Err = err
		config2.Logger.Error(err)
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	transport = &http.Transport{
		TLSClientConfig: tlsConfig,
	}
	queries := url.Values{}
	for k, v := range req.Request.Form {

		if k == "pageSize" {
			queries["limit"] = v
		} else {
			queries[k] = v
		}
	}
	request.URL, _ = url.Parse(address)
	request.RequestURI = address
	request.Host = u.Host
	if queries != nil {
		request.URL.RawQuery = queries.Encode()
	}

	request.Header.Set("X-Real-Ip", req.Request.RemoteAddr)
	if req.Request.Method == http.MethodPatch {
		request.Header.Set("Content-Type", "application/json-patch+json")
	}
	if discovery && req.Request.Method == http.MethodGet {
		request.Header.Set("Accept", DiscoveryHead)
	}
	proxy := httputil.NewSingleHostReverseProxy(u)
	proxy.Transport = transport
	proxy.ServeHTTP(resp.ResponseWriter, request)
}

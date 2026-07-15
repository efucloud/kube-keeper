package filters

import (
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	"github.com/emicklei/go-restful/v3"
)

func Log(req *restful.Request, resp *restful.Response, chain *restful.FilterChain) {
	chain.ProcessFilter(req, resp)
	operator := req.Attribute(config2.RequestUserId)
	if operator == nil {
		operator = "unknown"
	}
	config2.Logger.Debugf("operator: %s method: %s request uri: %s response code: %d", operator, req.Request.Method, req.Request.URL.Path, resp.StatusCode())
}

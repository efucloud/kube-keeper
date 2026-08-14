package filters

import (
	"github.com/efucloud/kube-keeper/pkg/config"
	"net/http/httputil"

	"github.com/emicklei/go-restful/v3"
)

func Debug(req *restful.Request, resp *restful.Response, chain *restful.FilterChain) {
	reqDump, err := httputil.DumpRequest(req.Request, true)
	if err == nil {
		config.Logger.Debugf("request uri: %s, alert data: %s", req.Request.RequestURI, reqDump)
	}
	chain.ProcessFilter(req, resp)

}

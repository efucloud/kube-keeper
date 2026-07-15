package filters

import (
	"context"
	"fmt"
	"github.com/efucloud/common"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/emicklei/go-restful/v3"
	"net"
	"net/http"
	"time"
)

func WebOnly(req *restful.Request, resp *restful.Response, chain *restful.FilterChain) {
	web := req.HeaderParameter(config2.RequestWebOnly)
	data := fmt.Sprintf("%s:%s:%s", time.Now().Format("2006-01"), req.Request.URL.Path, req.HeaderParameter(config2.AuthHeader))
	if web != common.MD5V(data) {
		var errorData common.ErrorData
		lang := common.GetLanguageFromReq(req, config2.RequestLanguage)
		errorData.Lang = lang
		ctx := context.Background()
		errorData.Err = fmt.Errorf("request is not allowed")
		errorData.ResponseCode = http.StatusInternalServerError
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	chain.ProcessFilter(req, resp)
}
func ClientInfo(req *restful.Request, resp *restful.Response, chain *restful.FilterChain) {
	ctx := context.Background()
	remoteAddr, _, _ := net.SplitHostPort(req.Request.RemoteAddr)
	if remoteAddr == "::1" {
		remoteAddr = "127.0.0.1"
	}
	req.SetAttribute(config2.RequestRemote, remoteAddr)
	ctx = context.WithValue(ctx, config2.RequestRemote, remoteAddr)
	if data := req.Request.Header.Get(config2.RequestUserAgentHeader); len(data) > 0 {
		if userAgent, err := dtos.DecryptClientInformation(data); err == nil {
			userAgent.Remote = remoteAddr
			ctx = context.WithValue(ctx, config2.RequestAgent, userAgent)
			req.SetAttribute(config2.RequestAgent, userAgent)
		} else {
			config2.Logger.Error(err)
		}
	} else {
		var userAgent dtos.UserAgentInformation
		userAgent.UserAgent = req.Request.UserAgent()
		userAgent.Remote = remoteAddr
		ctx = context.WithValue(ctx, config2.RequestAgent, userAgent)
	}
	req.SetAttribute(config2.RequestContext, ctx)
	chain.ProcessFilter(req, resp)
}

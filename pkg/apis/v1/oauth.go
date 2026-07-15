package v1

import (
	"context"
	"encoding/json"
	filters2 "github.com/efucloud/kube-keeper/pkg/apis/filters"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/efucloud/kube-keeper/pkg/services"
	"net/http"

	"github.com/efucloud/common"
	"github.com/efucloud/kube-keeper/pkg/utils"
	restfulspec "github.com/emicklei/go-restful-openapi/v2"
	restful "github.com/emicklei/go-restful/v3"
)

type OAuthResource struct {
	Svc services.OAuthService
}

func (r OAuthResource) AddWebService(ws *restful.WebService) {
	apiInfo := common.ApiInfo{}
	apiInfo.Tag = "oauth"
	apiInfo.Description = "OAuth"
	apiExtend := ""
	common.RegisterApiInfo(apiInfo)
	ws.Route(ws.GET(config2.APIPrefix+apiExtend+"/userinfo").
		Doc("获取用户信息").
		Notes("获取用户信息").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求Token").Required(true)).
		To(r.userinfo).
		Returns(http.StatusOK, "请求成功", dtos.AuthedUserInfo{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", dtos.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", dtos.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "getUserinfo"))
	ws.Route(ws.GET(config2.APIPrefix+apiExtend+"/oauth-info").
		Doc("获取认证地址").
		Notes("获取认证地址").
		To(r.oauthInfo).
		Returns(http.StatusOK, "请求成功", dtos.OidcConfig{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", dtos.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", dtos.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "getAuthorizeInfo"))
	ws.Route(ws.POST(config2.APIPrefix+apiExtend+"/oauth/oidc").
		Doc("OIDC方式登录").
		Notes("OIDC回调后前端给到后端的Code接口，用于换取第三方的token并获取用户信息，若用户在系统不存在，"+
			"则根据组织是否允许自动注册来决定是否自动创建用户信息，若第一次是通过第三方登录，需要先设置密码，"+
			"若组织设置了MFA则需要再次输入验证码，若用户没有绑定过验证器，则返回验证器的二维码和密钥").
		To(r.loginByOIDC).
		Reads(dtos.LoginByOIDC{}).
		Returns(http.StatusOK, "成功", dtos.AccessTokenResponse{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", dtos.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", dtos.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "loginByOidc"))
}

func (r OAuthResource) loginByOIDC(req *restful.Request, resp *restful.Response) {
	lang := common.GetLanguageFromReq(req, config2.RequestLanguage)
	var (
		errorData  common.ErrorData
		result     dtos.AccessTokenResponse
		loginParam dtos.LoginByOIDC
	)
	ctx := context.Background()
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	ctx = context.WithValue(ctx, config2.RequestLanguage, lang)
	errorData.Err = json.NewDecoder(req.Request.Body).Decode(&loginParam)
	if errorData.IsNotNil() {
		config2.Logger.Error(errorData.Err)
		errorData.MsgCode = config2.MsgCodeJsonDecodeFailed
		errorData.ResponseCode = http.StatusBadRequest
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	result, errorData = r.Svc.LoginByOIDC(ctx, loginParam)
	if errorData.IsNotNil() {
		config2.Logger.Error(errorData.Err)
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	common.ResponseSuccess(resp, result)
}
func (r OAuthResource) oauthInfo(req *restful.Request, resp *restful.Response) {
	common.ResponseSuccess(resp, dtos.OidcConfig{
		Issuer:   config2.ApplicationConfig.OidcConfig.Issuer,
		ClientId: config2.ApplicationConfig.OidcConfig.ClientId,
	})
}

func (r OAuthResource) userinfo(req *restful.Request, resp *restful.Response) {
	lang := common.GetLanguageFromReq(req, config2.RequestLanguage)
	var (
		errorData common.ErrorData
		userinfo  dtos.AuthedUserInfo
	)
	ctx := context.Background()
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	ctx = context.WithValue(ctx, config2.RequestLanguage, lang)
	userId := req.Attribute(config2.RequestUserId)
	if userId == nil {
		errorData.MsgCode = config2.MsgCodeUserInfoIsEmpty
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	userinfo, errorData = r.Svc.Userinfo(ctx, userId.(string))
	if errorData.IsNotNil() {
		config2.Logger.Error(errorData.Err)
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	userinfo.RemoteAddress = utils.GetRemoteAddress(req.Request.RemoteAddr)
	common.ResponseSuccess(resp, userinfo)
}

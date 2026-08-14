package filters

import (
	"context"
	"fmt"
	"github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/services"
	"net/http"
	"strings"

	"github.com/efucloud/common"
	restful "github.com/emicklei/go-restful/v3"
)

const bearer = "bearer "

func GetRequestToken(key string, req *restful.Request) (token string) {
	authHeader := req.HeaderParameter(key)
	if len(authHeader) > 0 {
		if len(bearer) > len(authHeader) {
			return
		}
		token = authHeader[len(bearer):]
		tokenPrefix := authHeader[:len(bearer)]
		if strings.ToLower(tokenPrefix) != bearer {
			return
		}
	}
	return token
}

func GetAccountIdFromToken(req *restful.Request) (accountId string) {
	var (
		errorData common.ErrorData
	)
	ctx := context.Background()
	if req.Attribute(config.RequestContext) != nil {
		ctx = req.Attribute(config.RequestContext).(context.Context)
	}
	token := GetRequestToken(config.AuthHeader, req)
	if len(token) == 0 {
		token = req.QueryParameter("access_token")
	}
	if len(token) > 0 {
		tokenSvc := services.SystemTokenService{}
		claims, err := tokenSvc.ParseAccessToken(ctx, token)
		if err != nil {
			errorData.Err = err
		}
		if errorData.IsNotNil() {
			return
		}
		accountId = claims.ID
		if accountId == "" {
			accountId = claims.Subject
		}
		req.SetAttribute(config.RequestUserId, accountId)
	}

	return
}
func Auth(req *restful.Request, resp *restful.Response, chain *restful.FilterChain) {
	var (
		errorData common.ErrorData
	)
	lang := common.GetLanguageFromReq(req, config.RequestLanguage)
	ctx := context.Background()
	if req.Attribute(config.RequestContext) != nil {
		ctx = req.Attribute(config.RequestContext).(context.Context)
	}
	accountId := GetAccountIdFromToken(req)
	if len(accountId) == 0 {
		errorData.Lang = lang
		errorData.Err = fmt.Errorf("未登录或者认证信息无效")
		errorData.ResponseCode = http.StatusUnauthorized
		common.ResponseErrorMessage(ctx, req, resp, config.Bundle, errorData)
		return
	}
	userSvc := services.AccountService{}
	user, errorData := userSvc.GetAccountByID(ctx, accountId)
	if errorData.IsNotNil() || user.ID == "" || !user.Enable {
		errorData.Lang = lang
		if errorData.Err == nil {
			errorData.Err = fmt.Errorf("用户不存在或已禁用")
		}
		errorData.ResponseCode = http.StatusUnauthorized
		common.ResponseErrorMessage(ctx, req, resp, config.Bundle, errorData)
		return
	}
	req.SetAttribute(config.RequestContext, context.WithValue(ctx, config.RequestUserId, user.ID))
	req.SetAttribute(config.RequestUserId, user.ID)
	chain.ProcessFilter(req, resp)
}

func Permission(roles []string) func(req *restful.Request, resp *restful.Response, chain *restful.FilterChain) {
	return func(req *restful.Request, resp *restful.Response, chain *restful.FilterChain) {
		lang := common.GetLanguageFromReq(req, config.RequestLanguage)
		ctx := context.Background()
		var errorData common.ErrorData

		userId := req.Attribute(config.RequestUserId)
		if userId == nil {
			errorData.Lang = lang
			errorData.ResponseCode = http.StatusForbidden
			errorData.MsgCode = config.MsgCodeCurrentActionIsForbidden
			common.ResponseErrorMessage(ctx, req, resp, config.Bundle, errorData)
			return
		}
		userSvc := services.AccountService{}
		user, _ := userSvc.GetAccountByID(ctx, userId.(string))
		if !common.StringKeyInArray(user.Role, roles) {
			errorData.Lang = lang
			errorData.ResponseCode = http.StatusForbidden
			errorData.MsgCode = config.MsgCodeCurrentActionIsForbidden
			common.ResponseErrorMessage(ctx, req, resp, config.Bundle, errorData)
			return
		}
		chain.ProcessFilter(req, resp)
	}
}

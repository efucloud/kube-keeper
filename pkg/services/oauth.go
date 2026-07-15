package services

import (
	"context"
	"encoding/json"
	"github.com/coreos/go-oidc/v3/oidc"
	"github.com/efucloud/common"
	"github.com/efucloud/kube-keeper/pkg/config"
	dtos2 "github.com/efucloud/kube-keeper/pkg/models/dtos"
	"golang.org/x/oauth2"
)

type OAuthService struct {
}

func (svc *OAuthService) Userinfo(ctx context.Context, userId string) (userinfo dtos2.AuthedUserInfo, errorData common.ErrorData) {
	accSvc := AccountService{}
	var acc dtos2.AccountDetail
	acc, errorData = accSvc.GetAccountByID(ctx, userId)
	data, _ := json.Marshal(acc)
	_ = json.Unmarshal(data, &userinfo)
	return
}

func (svc *OAuthService) LoginByOIDC(ctx context.Context, loginParam dtos2.LoginByOIDC) (response dtos2.AccessTokenResponse, errorData common.ErrorData) {
	var (
		token      *oauth2.Token
		userInfo   *oidc.UserInfo
		systemUser dtos2.AuthedUserInfo
	)
	oauthCfg := &oauth2.Config{
		ClientID:     config.ApplicationConfig.OidcConfig.ClientId,
		ClientSecret: config.ApplicationConfig.OidcConfig.ClientSecret,
		Endpoint:     config.AuthProvider.Endpoint(),
		RedirectURL:  loginParam.RedirectUri,
	}
	token, errorData.Err = oauthCfg.Exchange(ctx, loginParam.Code)
	if errorData.IsNotNil() {
		config.Logger.Error(errorData.Err)
		return
	} else {
		userInfo, errorData.Err = config.AuthProvider.UserInfo(ctx, oauth2.StaticTokenSource(&oauth2.Token{
			AccessToken: token.AccessToken,
			TokenType:   "Bearer", // The UserInfo endpoint requires a bearer token as per RFC6750
		}))
		var (
			create dtos2.AccountCreate
		)
		accSvc := AccountService{}
		_ = userInfo.Claims(&create)
		create.Role = "none"
		if common.StringInArray(create.Email, config.ApplicationConfig.AdminEmails) {
			create.Role = "admin"
		}
		accSvc.CreateOrUpdateAccount(ctx, create)
		if errorData.IsNotNil() {
			config.Logger.Error(errorData.Err)
			return
		}
		errorData.Err = userInfo.Claims(&systemUser)
		if errorData.IsNotNil() {
			config.Logger.Error(errorData.Err)
			return
		}
	}

	response.AccessToken = token.AccessToken
	response.RefreshToken = token.RefreshToken
	response.ExpiresIn = token.Expiry.Unix()
	return
}

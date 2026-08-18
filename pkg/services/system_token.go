package services

import (
	"context"
	"fmt"
	"time"

	"github.com/efucloud/common"
	"github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/golang-jwt/jwt/v5"
)

type SystemTokenService struct {
}

func (svc *SystemTokenService) IssueAccessToken(ctx context.Context, account dtos.AccountDetail) (response dtos.AccessTokenResponse, errorData common.ErrorData) {
	_ = ctx
	now := time.Now()
	expiresAt := now.Add(time.Duration(config.ApplicationConfig.TokenConfig.ExpireSeconds) * time.Second)
	claims := dtos.UserClaims{
		ID:       account.ID,
		Username: account.Username,
		Nickname: account.Nickname,
		Role:     account.Role,
		Email:    account.Email,
		Phone:    account.Phone,
		RegisteredClaims: jwt.RegisteredClaims{
			Subject:   account.ID,
			Issuer:    config.ApplicationConfig.TokenConfig.Issuer,
			IssuedAt:  jwt.NewNumericDate(now),
			NotBefore: jwt.NewNumericDate(now),
			ExpiresAt: jwt.NewNumericDate(expiresAt),
		},
	}
	if config.SystemRSAPrivateKey == nil {
		errorData.Err = fmt.Errorf("system token private key is not loaded")
		return
	}
	signedToken, err := jwt.NewWithClaims(jwt.SigningMethodRS256, claims).SignedString(config.SystemRSAPrivateKey)
	if err != nil {
		errorData.Err = err
		return
	}
	response.AccessToken = signedToken
	response.RefreshToken = signedToken
	response.IDToken = signedToken
	response.TokenType = "Bearer"
	response.ExpiresIn = expiresAt.Unix()
	response.Timestamp = expiresAt.Unix()
	return
}

func (svc *SystemTokenService) ParseAccessToken(ctx context.Context, token string) (claims dtos.UserClaims, err error) {
	_ = ctx
	if token == "" {
		return claims, fmt.Errorf("token is empty")
	}
	if config.SystemRSAPublicKey == nil {
		return claims, fmt.Errorf("system token public key is not loaded")
	}
	parsedToken, err := jwt.ParseWithClaims(token, &claims, func(parsedToken *jwt.Token) (interface{}, error) {
		if parsedToken.Method == nil || parsedToken.Method.Alg() != jwt.SigningMethodRS256.Alg() {
			return nil, fmt.Errorf("unexpected signing method: %v", parsedToken.Header["alg"])
		}
		return config.SystemRSAPublicKey, nil
	}, jwt.WithIssuer(config.ApplicationConfig.TokenConfig.Issuer))
	if err != nil {
		return claims, err
	}
	if !parsedToken.Valid {
		return claims, fmt.Errorf("token is invalid")
	}
	if claims.ID == "" && claims.Subject == "" {
		return claims, fmt.Errorf("token subject is empty")
	}
	return claims, nil
}

package services

import (
	"context"
	"testing"
	"time"

	"github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
)

func TestSystemTokenServiceIssueAndParseAccessToken(t *testing.T) {
	config.ApplicationConfig = &config.Config{
		TokenConfig: config.TokenConfig{
			Secret:        "unit-test-secret",
			Issuer:        "unit-test-issuer",
			ExpireSeconds: 3600,
		},
	}

	svc := SystemTokenService{}
	response, errorData := svc.IssueAccessToken(context.Background(), dtos.AccountDetail{
		ID:       "user-1",
		Username: "alice",
		Nickname: "Alice",
		Role:     "admin",
		Email:    "alice@example.com",
		Phone:    "13800000000",
	})
	if errorData.IsNotNil() {
		t.Fatalf("issue access token: %v", errorData.Err)
	}
	if response.AccessToken == "" {
		t.Fatal("expected access token to be generated")
	}
	if response.TokenType != "Bearer" {
		t.Fatalf("expected bearer token type, got %q", response.TokenType)
	}
	if response.ExpiresIn <= time.Now().Unix() {
		t.Fatalf("expected future expiry, got %d", response.ExpiresIn)
	}

	claims, err := svc.ParseAccessToken(context.Background(), response.AccessToken)
	if err != nil {
		t.Fatalf("parse access token: %v", err)
	}
	if claims.ID != "user-1" {
		t.Fatalf("expected id user-1, got %q", claims.ID)
	}
	if claims.Username != "alice" {
		t.Fatalf("expected username alice, got %q", claims.Username)
	}
	if claims.Role != "admin" {
		t.Fatalf("expected role admin, got %q", claims.Role)
	}
}

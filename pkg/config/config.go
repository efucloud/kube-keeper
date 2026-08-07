/*
Copyright 2022 The itcloudy.com Authors.

Licensed under the Apache LicenseCode, Version 2.0 (the "LicenseCode");
you may not use this file except in compliance with the LicenseCode.
You may obtain a copy of the LicenseCode at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the LicenseCode is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the LicenseCode for the specific language governing permissions and
limitations under the LicenseCode.
*/

package config

import (
	"github.com/coreos/go-oidc/v3/oidc"
	"github.com/nicksnyder/go-i18n/v2/i18n"
	redis "github.com/redis/go-redis/v9"
	"go.uber.org/zap"
	"gorm.io/gorm"
	"sync"
)

var (
	GoVersion string
	Commit    string
	BuildDate string
)
var (
	ApplicationConfig *Config
	configOnce        sync.Once
	DBConnect         *gorm.DB
	AuthProvider      *oidc.Provider
	SystemVerifier    *oidc.IDTokenVerifier
	Bundle            *i18n.Bundle
	TenantAuth        *tenantAuth
	Logger            *zap.SugaredLogger
	RedisClient       redis.UniversalClient
	ContextDBTx       ContextDatabaseTx
)

type ContextDatabaseTx string

func init() {

	if ApplicationConfig == nil {
		configOnce.Do(func() {
			ApplicationConfig = new(Config)
			TenantAuth = new(tenantAuth)
			TenantAuth.provider = make(map[string]*oidc.Provider)
			TenantAuth.verifier = make(map[string]*oidc.IDTokenVerifier)
		})
	}

}

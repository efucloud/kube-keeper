package database

import (
	"context"
	"github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/efucloud/kube-keeper/pkg/models/trans"
	"github.com/efucloud/kube-keeper/pkg/repositories"
	"strings"

	"github.com/efucloud/common"
	"gorm.io/gorm"
)

type AccountService struct {
	repo repositories.AccountRepository
}

func (svc *AccountService) cacheKeyByID(id string) string {
	return config.CacheKey("cache", "k8s_db_account", "id", id)
}

func (svc *AccountService) cacheKeyByUsername(username string) string {
	return config.CacheKey("cache", "k8s_db_account", "username", strings.ToLower(username))
}

func (svc *AccountService) writeAccountCache(ctx context.Context, model dtos.AccountDetail) {
	if model.ID == "" {
		return
	}
	setJSONCache(ctx, svc.cacheKeyByID(model.ID), model)
	if model.Username != "" {
		setJSONCache(ctx, svc.cacheKeyByUsername(model.Username), model)
	}
}

func (svc *AccountService) init(ctx context.Context) {
	db, ok := ctx.Value(config.ContextDBTx).(*gorm.DB)
	if ok {
		svc.repo = repositories.AccountRepository{DB: db}
	} else {
		svc.repo = repositories.AccountRepository{DB: config.DBConnect}
	}
}

func (svc *AccountService) GetAccountByUsername(ctx context.Context, name string) (result dtos.AccountDetail, errorData common.ErrorData) {
	svc.init(ctx)
	if getJSONCache(ctx, svc.cacheKeyByUsername(name), &result) {
		config.Logger.Debugf("k8s db account cache hit by username, username=%s, id=%s", name, result.ID)
		return result, errorData
	}
	result, errorData = svc.repo.GetAccountByUsername(ctx, name)
	if errorData.IsNotNil() {
		config.Logger.Errorf("get account by username: %s failed, err: %s", name, errorData.Err.Error())
		return
	}
	svc.writeAccountCache(ctx, result)
	return result, errorData
}

func (svc *AccountService) GetSimpleAccountByID(ctx context.Context, id string) (result dtos.SimpleAccountDetail, errorData common.ErrorData) {
	svc.init(ctx)
	var account dtos.AccountDetail
	account, errorData = svc.repo.GetAccountByID(ctx, id)
	if errorData.IsNotNil() {
		config.Logger.Errorf("get Account by id : %s failed, err: %s", id, errorData.Err.Error())
		return
	}
	return trans.AccountDetailToSimpleAccount(account), errorData
}
func (svc *AccountService) GetAccountByID(ctx context.Context, id string) (result dtos.AccountDetail, errorData common.ErrorData) {
	svc.init(ctx)
	if getJSONCache(ctx, svc.cacheKeyByID(id), &result) {
		config.Logger.Debugf("k8s db account cache hit by id, id=%s, username=%s", id, result.Username)
		return result, errorData
	}
	result, errorData = svc.repo.GetAccountByID(ctx, id)
	if errorData.IsNotNil() {
		config.Logger.Errorf("get Account by id : %s failed, err: %s", id, errorData.Err.Error())
		return
	}
	svc.writeAccountCache(ctx, result)
	return result, errorData
}

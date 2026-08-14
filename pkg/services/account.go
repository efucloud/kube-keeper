package services

import (
	"context"
	"encoding/json"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
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
	return config2.CacheKey("cache", "account", "id", id)
}

func (svc *AccountService) cacheKeyByUsername(username string) string {
	return config2.CacheKey("cache", "account", "username", strings.ToLower(username))
}

func (svc *AccountService) writeAccountCache(ctx context.Context, model dtos.AccountDetail) {
	if model.ID == "" {
		return
	}
	setJSONCache(ctx, svc.cacheKeyByID(model.ID), model, config2.DefaultCacheTTL())
	if model.Username != "" {
		setJSONCache(ctx, svc.cacheKeyByUsername(model.Username), model, config2.DefaultCacheTTL())
	}
}

func (svc *AccountService) invalidateAccountCache(ctx context.Context, id, username string) {
	keys := make([]string, 0, 2)
	if id != "" {
		keys = append(keys, svc.cacheKeyByID(id))
	}
	if username != "" {
		keys = append(keys, svc.cacheKeyByUsername(username))
	}
	deleteCacheKeys(ctx, keys...)
}

func (svc *AccountService) getAccountForInvalidate(ctx context.Context, id string) (detail dtos.AccountDetail) {
	_ = getJSONCache(ctx, svc.cacheKeyByID(id), &detail)
	if detail.ID != "" {
		return detail
	}
	detail, _ = svc.repo.GetAccountByID(ctx, id)
	return detail
}

func (svc *AccountService) init(ctx context.Context) {
	db, ok := ctx.Value(config2.ContextDBTx).(*gorm.DB)
	if ok {
		svc.repo = repositories.AccountRepository{DB: db}
	} else {
		svc.repo = repositories.AccountRepository{DB: config2.DBConnect}
	}
}
func (svc *AccountService) GetAccountNumber(ctx context.Context) (number int64) {
	svc.init(ctx)
	return svc.repo.GetAccountNumber(ctx)
}

func (svc *AccountService) GetAccountByUsername(ctx context.Context, name string) (result dtos.AccountDetail, errorData common.ErrorData) {
	svc.init(ctx)
	if getJSONCache(ctx, svc.cacheKeyByUsername(name), &result) {
		config2.Logger.Debugf("account cache hit by username, username=%s, id=%s", name, result.ID)
		return result, errorData
	}
	result, errorData = svc.repo.GetAccountByUsername(ctx, name)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("get account by username: %s failed, err: %s", name, errorData.Err.Error())
		return
	}
	svc.writeAccountCache(ctx, result)
	return result, errorData
}

func (svc *AccountService) ListAccountIds(ctx context.Context, accountIds []string) (results dtos.AccountDetailList, errorData common.ErrorData) {
	svc.init(ctx)
	results, errorData = svc.repo.ListAccountIds(ctx, accountIds)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("operator: %s list Account  failed, err: %s", config2.GetOperatorFromCtx(ctx), errorData.Err.Error())
		return
	}
	return results, errorData
}
func (svc *AccountService) ListAccount(ctx context.Context, current, pageSize int, order, query string, queryArgs []interface{}) (results dtos.AccountDetailList, errorData common.ErrorData) {
	svc.init(ctx)
	results, errorData = svc.repo.ListAccount(ctx, current, pageSize, order, query, queryArgs)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("operator: %s list Account  query: [%s] queryArgs: [%+v] failed, err: %s", config2.GetOperatorFromCtx(ctx), query, queryArgs, errorData.Err.Error())
		return
	}
	return results, errorData
}
func (svc *AccountService) UpdateAccount(ctx context.Context, model dtos.AccountUpdate) (result dtos.AccountDetail, errorData common.ErrorData) {
	svc.init(ctx)
	old := svc.getAccountForInvalidate(ctx, model.ID)
	model.Default(ctx)
	errorData.Err = model.Validate(ctx)
	if errorData.IsNotNil() {
		errorData.MsgCode = config2.MsgCodeRequestDataInvalid
		config2.Logger.Errorf("operator: %s update Account: %s failed, err: %s", config2.GetOperatorFromCtx(ctx), model.Username, errorData.Err.Error())
		return
	}
	result, errorData = svc.repo.UpdateAccount(ctx, model)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("operator: %s update Account: %s failed, err: %s", config2.GetOperatorFromCtx(ctx), model.Username, errorData.Err.Error())
		return
	}
	svc.invalidateAccountCache(ctx, model.ID, old.Username)
	svc.writeAccountCache(ctx, result)
	return
}
func (svc *AccountService) CreateOrUpdateAccount(ctx context.Context, model dtos.AccountCreate) (result dtos.AccountDetail, errorData common.ErrorData) {
	svc.init(ctx)
	result, _ = svc.GetAccountByID(ctx, model.ID)
	if len(result.ID) == 0 {
		model.Default(ctx)
		errorData.Err = model.Validate(ctx)
		if errorData.IsNotNil() {
			errorData.MsgCode = config2.MsgCodeRequestDataInvalid
			config2.Logger.Errorf("operator: %s create Account: %s failed, err: %s", config2.GetOperatorFromCtx(ctx), model.Username, errorData.Err.Error())
			return
		}
		result, errorData = svc.repo.AddAccount(ctx, model)
		if errorData.IsNotNil() {
			config2.Logger.Errorf("operator: %s create Account: %s failed, err: %s", config2.GetOperatorFromCtx(ctx), model.Username, errorData.Err.Error())
			return
		}
		svc.writeAccountCache(ctx, result)
	} else {
		var update dtos.AccountUpdate
		data, _ := json.Marshal(model)
		_ = json.Unmarshal(data, &update)
		update.Email = result.Email
		result, _ = svc.UpdateAccount(ctx, update)
		svc.SetRole(ctx, dtos.AccountRole{Role: model.Role, Ids: []string{result.ID}})
	}
	return
}
func (svc *AccountService) AddAccount(ctx context.Context, model dtos.AccountCreate) (result dtos.AccountDetail, errorData common.ErrorData) {
	svc.init(ctx)
	model.Default(ctx)
	errorData.Err = model.Validate(ctx)
	if errorData.IsNotNil() {
		errorData.MsgCode = config2.MsgCodeRequestDataInvalid
		config2.Logger.Errorf("operator: %s create Account: %s failed, err: %s", config2.GetOperatorFromCtx(ctx), model.Username, errorData.Err.Error())
		return
	}
	result, errorData = svc.repo.AddAccount(ctx, model)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("operator: %s create Account: %s failed, err: %s", config2.GetOperatorFromCtx(ctx), model.Username, errorData.Err.Error())
		return
	}
	svc.writeAccountCache(ctx, result)
	return
}
func (svc *AccountService) DeleteAccount(ctx context.Context, ids []string) (errorData common.ErrorData) {
	svc.init(ctx)
	idAccountMap := make(map[string]dtos.AccountDetail, len(ids))
	for _, id := range ids {
		idAccountMap[id] = svc.getAccountForInvalidate(ctx, id)
	}
	errorData = svc.repo.DeleteAccount(ctx, ids)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("operator: %s delete Account by ids: %v failed, err: %s", config2.GetOperatorFromCtx(ctx), ids, errorData.Err.Error())
		return
	}
	for _, id := range ids {
		old := idAccountMap[id]
		svc.invalidateAccountCache(ctx, id, old.Username)
	}
	return
}
func (svc *AccountService) SetRole(ctx context.Context, model dtos.AccountRole) (errorData common.ErrorData) {
	svc.init(ctx)
	model.Default(ctx)
	errorData = svc.repo.SetRole(ctx, model)
	if errorData.IsNil() {
		for _, id := range model.Ids {
			old := svc.getAccountForInvalidate(ctx, id)
			svc.invalidateAccountCache(ctx, id, old.Username)
		}
	}
	return
}

func (svc *AccountService) ChangeStatusAccount(ctx context.Context, model dtos.AccountStatus) (errorData common.ErrorData) {
	svc.init(ctx)
	model.Default(ctx)
	errorData = svc.repo.ChangeStatusAccount(ctx, model)
	if errorData.IsNil() {
		for _, id := range model.Ids {
			old := svc.getAccountForInvalidate(ctx, id)
			svc.invalidateAccountCache(ctx, id, old.Username)
		}
	}
	return
}
func (svc *AccountService) GetSimpleAccountByID(ctx context.Context, id string) (result dtos.SimpleAccountDetail, errorData common.ErrorData) {
	svc.init(ctx)
	var account dtos.AccountDetail
	account, errorData = svc.repo.GetAccountByID(ctx, id)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("operator: %s get Account by id : %s failed, err: %s", config2.GetOperatorFromCtx(ctx), id, errorData.Err.Error())
		return
	}
	return trans.AccountDetailToSimpleAccount(account), errorData
}
func (svc *AccountService) GetAccountByID(ctx context.Context, id string) (result dtos.AccountDetail, errorData common.ErrorData) {
	svc.init(ctx)
	if getJSONCache(ctx, svc.cacheKeyByID(id), &result) {
		config2.Logger.Debugf("account cache hit by id, id=%s, username=%s", id, result.Username)
		return result, errorData
	}
	result, errorData = svc.repo.GetAccountByID(ctx, id)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("operator: %s get Account by id : %s failed, err: %s", config2.GetOperatorFromCtx(ctx), id, errorData.Err.Error())
		return
	}
	svc.writeAccountCache(ctx, result)
	return result, errorData
}
func (svc *AccountService) UpdateAccountAvatar(ctx context.Context, userId string, avatarAddress string) (errorData common.ErrorData) {
	svc.init(ctx)
	errorData = svc.repo.UpdateAccountAvatar(ctx, userId, avatarAddress)
	if errorData.IsNil() {
		old := svc.getAccountForInvalidate(ctx, userId)
		svc.invalidateAccountCache(ctx, userId, old.Username)
	}
	return errorData
}

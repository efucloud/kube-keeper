package services

import (
	"context"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/efucloud/kube-keeper/pkg/repositories"
	"strings"

	"github.com/efucloud/common"
	"gorm.io/gorm"
)

type ConfigService struct {
	repo repositories.ConfigRepository
}

func (svc *ConfigService) cacheKeyByCode(code string) string {
	return config2.CacheKey("cache", "config", "code", strings.ToLower(code))
}

func (svc *ConfigService) writeConfigCache(ctx context.Context, model dtos.ConfigDetail) {
	if len(model.Code) == 0 {
		return
	}
	setJSONCache(ctx, svc.cacheKeyByCode(model.Code), model, config2.DefaultCacheTTL())
}

func (svc *ConfigService) invalidateConfigCache(ctx context.Context, code string) {
	if code == "" {
		return
	}
	deleteCacheKeys(ctx, svc.cacheKeyByCode(code))
}

func (svc *ConfigService) init(ctx context.Context) {
	db, ok := ctx.Value(config2.ContextDBTx).(*gorm.DB)
	if ok {
		svc.repo = repositories.ConfigRepository{DB: db}
	} else {
		svc.repo = repositories.ConfigRepository{DB: config2.DBConnect}
	}
}

func (svc *ConfigService) GetConfigByCode(ctx context.Context, code string) (result dtos.ConfigDetail, errorData common.ErrorData) {
	svc.init(ctx)
	if getJSONCache(ctx, svc.cacheKeyByCode(code), &result) {
		config2.Logger.Debugf("config cache hit by code, code=%s", code)
		return result, errorData
	}
	config2.Logger.Infof("operator: %s GetConfigByCode code: %s", config2.GetOperatorFromCtx(ctx), code)
	result, errorData = svc.repo.GetConfigByCode(ctx, code)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("operator: %s get Config by code: %s failed, err: %s", config2.GetOperatorFromCtx(ctx), code, errorData.Err.Error())
		return result, errorData
	}
	svc.writeConfigCache(ctx, result)
	return result, errorData
}
func (svc *ConfigService) UpdateConfig(ctx context.Context, model dtos.ConfigUpdate) (result dtos.ConfigDetail, errorData common.ErrorData) {
	svc.init(ctx)
	model.Default(ctx)
	config2.Logger.Infof("operator: %s UpdateConfig code: %s", config2.GetOperatorFromCtx(ctx), model.Code)
	errorData.Err = model.Validate(ctx)
	if errorData.IsNotNil() {
		errorData.MsgCode = config2.MsgCodeRequestDataInvalid
		config2.Logger.Errorf("operator: %s update Config failed, err: %s", config2.GetOperatorFromCtx(ctx), errorData.Err.Error())
		return
	}
	old, _ := svc.repo.GetConfigByCode(ctx, model.Code)
	if len(old.ID) > 0 {
		result, errorData = svc.repo.UpdateConfig(ctx, model)
	} else {
		result, errorData = svc.AddConfig(ctx, dtos.ConfigCreate{Code: model.Code, Data: model.Data})
	}
	if errorData.IsNotNil() {
		config2.Logger.Errorf("operator: %s update Config: %s failed, err: %s", config2.GetOperatorFromCtx(ctx), model.Code, errorData.Err.Error())
		return
	}
	svc.invalidateConfigCache(ctx, old.Code)
	svc.invalidateConfigCache(ctx, model.Code)
	svc.writeConfigCache(ctx, result)
	return
}

func (svc *ConfigService) AddConfig(ctx context.Context, model dtos.ConfigCreate) (result dtos.ConfigDetail, errorData common.ErrorData) {
	svc.init(ctx)
	model.Default(ctx)
	config2.Logger.Infof("operator: %s AddConfig code: %s", config2.GetOperatorFromCtx(ctx), model.Code)
	errorData.Err = model.Validate(ctx)
	if errorData.IsNotNil() {
		errorData.MsgCode = config2.MsgCodeRequestDataInvalid
		config2.Logger.Errorf("operator: %s add Config failed, err: %s", config2.GetOperatorFromCtx(ctx), errorData.Err.Error())
		return
	}

	result, errorData = svc.repo.AddConfig(ctx, model)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("operator: %s add Config: %s failed, err: %s", config2.GetOperatorFromCtx(ctx), model.Code, errorData.Err.Error())
		return
	}
	svc.invalidateConfigCache(ctx, model.Code)
	svc.writeConfigCache(ctx, result)
	return
}

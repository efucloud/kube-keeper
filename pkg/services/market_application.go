package services

import (
	"context"
	"encoding/json"

	"github.com/efucloud/common"
	"github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/efucloud/kube-keeper/pkg/repositories"
	"gorm.io/gorm"
)

type MarketApplicationService struct {
	repo repositories.MarketApplicationRepository
}

func (svc *MarketApplicationService) init(ctx context.Context) {
	db, ok := ctx.Value(config.ContextDBTx).(*gorm.DB)
	if ok {
		svc.repo = repositories.MarketApplicationRepository{DB: db}
	} else {
		svc.repo = repositories.MarketApplicationRepository{DB: config.DBConnect}
	}
}

func (svc *MarketApplicationService) ImportMarketApplication(ctx context.Context, model dtos.MarketApplicationExportImport) (result dtos.MarketApplicationDetail, errorData common.ErrorData) {
	svc.init(ctx)

	return
}
func (svc *MarketApplicationService) GetMarketApplicationByVersion(ctx context.Context, applicationId, version string) (result dtos.MarketApplicationDetail, errorData common.ErrorData) {
	svc.init(ctx)
	result, errorData = svc.repo.GetMarketApplicationByVersion(ctx, applicationId, version)
	return
}

func (svc *MarketApplicationService) GetMarketApplicationById(ctx context.Context, id string) (result dtos.MarketApplicationDetail, errorData common.ErrorData) {
	svc.init(ctx)
	result, errorData = svc.repo.GetMarketApplicationById(ctx, id)
	return
}

func (svc *MarketApplicationService) ListMarketApplication(ctx context.Context, current, pageSize int, order, query string, queryArgs []interface{}) (results dtos.MarketApplicationDetailList, errorData common.ErrorData) {
	svc.init(ctx)
	results, errorData = svc.repo.ListMarketApplication(ctx, current, pageSize, order, query, queryArgs)
	return
}

func (svc *MarketApplicationService) ListMarketApplicationExportByIds(ctx context.Context, applicationId string, ids []string) (results []*dtos.MarketApplicationExportImport, errorData common.ErrorData) {
	svc.init(ctx)
	results, errorData = svc.repo.ListMarketApplicationExportByIds(ctx, applicationId, ids)
	return
}

func (svc *MarketApplicationService) AddMarketApplication(ctx context.Context, model dtos.MarketApplicationCreate) (result dtos.MarketApplicationDetail, errorData common.ErrorData) {
	svc.init(ctx)
	model.Default(ctx)
	errorData.Err = model.Validate(ctx)
	if errorData.IsNotNil() {
		errorData.MsgCode = config.MsgCodeRequestDataInvalid
		return
	}
	result, errorData = svc.repo.AddMarketApplication(ctx, model)
	return
}

func (svc *MarketApplicationService) CopyMarketApplication(ctx context.Context, model dtos.MarketApplicationCopy) (result dtos.MarketApplicationDetail, errorData common.ErrorData) {
	svc.init(ctx)
	var old dtos.MarketApplicationDetail
	old, errorData = svc.GetMarketApplicationById(ctx, model.SourceId)
	if errorData.IsNotNil() {
		return
	}
	var create dtos.MarketApplicationCreate
	data, _ := json.Marshal(old)
	_ = json.Unmarshal(data, &create)
	create.Version = model.Version
	create.State = 0
	result, errorData = svc.AddMarketApplication(ctx, create)
	return
}

func (svc *MarketApplicationService) UpdateMarketApplicationState(ctx context.Context, model dtos.ApplicationState) (errorData common.ErrorData) {
	svc.init(ctx)
	errorData = svc.repo.UpdateMarketApplicationState(ctx, model)
	return
}

func (svc *MarketApplicationService) UpdateMarketApplication(ctx context.Context, model dtos.MarketApplicationUpdate) (result dtos.MarketApplicationDetail, errorData common.ErrorData) {
	svc.init(ctx)
	old, oldErr := svc.GetMarketApplicationById(ctx, model.ID)
	if oldErr.IsNil() && len(model.Type) == 0 {
		model.Type = old.Type
	}
	model.Default(ctx)
	errorData.Err = model.Validate(ctx)
	if errorData.IsNotNil() {
		errorData.MsgCode = config.MsgCodeRequestDataInvalid
		return
	}
	result, errorData = svc.repo.UpdateMarketApplication(ctx, model)
	return
}

func (svc *MarketApplicationService) DeleteMarketApplication(ctx context.Context, ids []string) (errorData common.ErrorData) {
	svc.init(ctx)
	errorData = svc.repo.DeleteMarketApplication(ctx, ids)
	return
}

func (svc *MarketApplicationService) DeleteMarketApplicationByApplicationId(ctx context.Context, applicationId string) (errorData common.ErrorData) {
	svc.init(ctx)
	errorData = svc.repo.DeleteMarketApplicationByApplicationId(ctx, applicationId)
	return
}

package services

import (
	"context"

	"github.com/efucloud/common"
	"github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/efucloud/kube-keeper/pkg/repositories"
	"gorm.io/gorm"
)

type DataDictionaryService struct {
	repo repositories.DataDictionaryRepository
}

func (svc *DataDictionaryService) init(ctx context.Context) {
	db, ok := ctx.Value(config.ContextDBTx).(*gorm.DB)
	if !ok {
		db = config.DBConnect
	}
	svc.repo = repositories.DataDictionaryRepository{DB: db}
}

func (svc *DataDictionaryService) Get(ctx context.Context, code string) (dtos.DataDictionaryDetail, common.ErrorData) {
	svc.init(ctx)
	return svc.repo.Get(ctx, code)
}

func (svc *DataDictionaryService) List(ctx context.Context) (dtos.DataDictionaryDetailList, common.ErrorData) {
	svc.init(ctx)
	return svc.repo.List(ctx)
}

func (svc *DataDictionaryService) Update(ctx context.Context, code string, model dtos.DataDictionaryUpdate) (result dtos.DataDictionaryDetail, errorData common.ErrorData) {
	svc.init(ctx)
	if errorData.Err = model.Normalize(); errorData.IsNotNil() {
		errorData.MsgCode = config.MsgCodeRequestDataInvalid
		return
	}
	return svc.repo.Update(ctx, code, config.GetOperatorFromCtx(ctx), model)
}

package services

import (
	"context"
	"net/http"

	"github.com/efucloud/common"
	"github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/helmstore"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/efucloud/kube-keeper/pkg/repositories"
)

type HelmRepositoryService struct{}

func (HelmRepositoryService) repository() repositories.HelmRepositoryRepository {
	return repositories.HelmRepositoryRepository{DB: config.DBConnect}
}

func (service HelmRepositoryService) List(ctx context.Context, current, pageSize int) (result dtos.HelmRepositoryDetailList, errorData common.ErrorData) {
	result, errorData = service.repository().List(ctx, current, pageSize)
	for index := range result.Data {
		result.Data[index].Cached = helmstore.Default().HasCache(result.Data[index].ID)
	}
	return
}

func (service HelmRepositoryService) Add(ctx context.Context, model dtos.HelmRepositoryCreate) (result dtos.HelmRepositoryDetail, errorData common.ErrorData) {
	model.Default(ctx)
	if errorData.Err = model.Validate(); errorData.IsNotNil() {
		errorData.MsgCode = config.MsgCodeRequestDataInvalid
		return
	}
	return service.repository().Add(ctx, model)
}

func (service HelmRepositoryService) Update(ctx context.Context, model dtos.HelmRepositoryUpdate) (result dtos.HelmRepositoryDetail, errorData common.ErrorData) {
	model.Default(ctx)
	if errorData.Err = model.Validate(); errorData.IsNotNil() {
		errorData.MsgCode = config.MsgCodeRequestDataInvalid
		return
	}
	return service.repository().Update(ctx, model)
}

func (service HelmRepositoryService) Delete(ctx context.Context, ids []string) common.ErrorData {
	return service.repository().Delete(ctx, ids)
}

func (service HelmRepositoryService) Sync(ctx context.Context, id string) (result dtos.HelmRepositoryDetail, errorData common.ErrorData) {
	if errorData.Err = helmstore.Default().Sync(ctx, id); errorData.IsNotNil() {
		errorData.MsgCode = config.MsgCodeUpdateRecordFailed
		errorData.ResponseCode = http.StatusBadGateway
		return
	}
	result, errorData = service.repository().Get(ctx, id)
	result.Cached = errorData.IsNil()
	return
}

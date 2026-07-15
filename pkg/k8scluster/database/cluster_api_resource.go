package database

import (
	"context"
	"github.com/efucloud/common"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/efucloud/kube-keeper/pkg/repositories"
	"gorm.io/gorm"
)

type ClusterApiResourceService struct {
	repo repositories.ClusterApiResourceRepository
}

func (svc *ClusterApiResourceService) init(ctx context.Context) {
	db, ok := ctx.Value(config2.ContextDBTx).(*gorm.DB)
	if ok {
		svc.repo = repositories.ClusterApiResourceRepository{DB: db}
	} else {
		svc.repo = repositories.ClusterApiResourceRepository{DB: config2.DBConnect}
	}
}

func (svc *ClusterApiResourceService) GetClusterApiResourceByClusterId(ctx context.Context, clusterId string) (result dtos.ClusterApiResourceDetail, errorData common.ErrorData) {
	svc.init(ctx)
	config2.Logger.Infof("operator: %s GetClusterApiResourceById cluster id: %s", config2.GetOperatorFromCtx(ctx), clusterId)
	result, errorData = svc.repo.GetClusterApiResourceByClusterId(ctx, clusterId)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("operator: %s get ClusterApiResourceRepository cluster id: %s failed, err: %s ", config2.GetOperatorFromCtx(ctx), clusterId, errorData.Err.Error())
		return
	}
	return result, errorData
}
func (svc *ClusterApiResourceService) UpdateClusterApiResource(ctx context.Context, model dtos.ClusterApiResourceUpdate) (result dtos.ClusterApiResourceDetail, errorData common.ErrorData) {
	svc.init(ctx)
	config2.Logger.Infof("operator: %s UpdateClusterApiResource id: %s", config2.GetOperatorFromCtx(ctx), model.ID)
	model.Default(ctx)
	errorData.Err = model.Validate(ctx)
	if errorData.IsNotNil() {
		errorData.MsgCode = config2.MsgCodeRequestDataInvalid
		config2.Logger.Errorf("operator: %s  update ClusterApiResourceRepository: %s failed, err: %s", config2.GetOperatorFromCtx(ctx), model.ClusterId, errorData.Err.Error())
		return
	}
	result, errorData = svc.repo.UpdateClusterApiResource(ctx, model)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("operator: %s update ClusterApiResourceRepository: %s failed, err: %s", config2.GetOperatorFromCtx(ctx), model.ClusterId, errorData.Err.Error())
		return
	}
	return
}
func (svc *ClusterApiResourceService) AddClusterApiResource(ctx context.Context, model dtos.ClusterApiResourceCreate) (result dtos.ClusterApiResourceDetail, errorData common.ErrorData) {
	svc.init(ctx)
	config2.Logger.Infof("operator: %s AddClusterApiResource cluster: %s", config2.GetOperatorFromCtx(ctx), model.ClusterId)
	model.Default(ctx)
	errorData.Err = model.Validate(ctx)
	if errorData.IsNotNil() {
		errorData.MsgCode = config2.MsgCodeRequestDataInvalid
		config2.Logger.Errorf("operator: %s create ClusterApiResourceRepository: %s failed, err: %s", config2.GetOperatorFromCtx(ctx), model.ClusterId, errorData.Err.Error())
		return
	}
	result, errorData = svc.repo.AddClusterApiResource(ctx, model)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("operator: %s create ClusterApiResourceRepository: %s failed, err: %s", config2.GetOperatorFromCtx(ctx), model.ClusterId, errorData.Err.Error())
		return
	}
	return
}

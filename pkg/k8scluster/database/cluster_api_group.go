package database

import (
	"context"
	"github.com/efucloud/common"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/efucloud/kube-keeper/pkg/repositories"
	"gorm.io/gorm"
)

type ClusterApiGroupService struct {
	repo repositories.ClusterApiGroupRepository
}

func (svc *ClusterApiGroupService) init(ctx context.Context) {
	db, ok := ctx.Value(config2.ContextDBTx).(*gorm.DB)
	if ok {
		svc.repo = repositories.ClusterApiGroupRepository{DB: db}
	} else {
		svc.repo = repositories.ClusterApiGroupRepository{DB: config2.DBConnect}
	}
}

func (svc *ClusterApiGroupService) GetClusterApiGroupByClusterId(ctx context.Context, clusterId string) (result dtos.ClusterApiGroupDetail, errorData common.ErrorData) {
	svc.init(ctx)
	config2.Logger.Infof("operator: %s GetClusterApiGroupById cluster id: %s", config2.GetOperatorFromCtx(ctx), clusterId)
	result, errorData = svc.repo.GetClusterApiGroupByClusterId(ctx, clusterId)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("operator: %s get ClusterApiGroupRepository cluster id: %s failed, err: %s ", config2.GetOperatorFromCtx(ctx), clusterId, errorData.Err.Error())
		return
	}
	return result, errorData
}
func (svc *ClusterApiGroupService) UpdateClusterApiGroup(ctx context.Context, model dtos.ClusterApiGroupUpdate) (result dtos.ClusterApiGroupDetail, errorData common.ErrorData) {
	svc.init(ctx)
	config2.Logger.Infof("operator: %s UpdateClusterApiGroup id: %s", config2.GetOperatorFromCtx(ctx), model.ID)
	model.Default(ctx)
	errorData.Err = model.Validate(ctx)
	if errorData.IsNotNil() {
		errorData.MsgCode = config2.MsgCodeRequestDataInvalid
		config2.Logger.Errorf("operator: %s  update ClusterApiGroupRepository: %s failed, err: %s", config2.GetOperatorFromCtx(ctx), model.ClusterId, errorData.Err.Error())
		return
	}
	result, errorData = svc.repo.UpdateClusterApiGroup(ctx, model)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("operator: %s update ClusterApiGroupRepository: %s failed, err: %s", config2.GetOperatorFromCtx(ctx), model.ClusterId, errorData.Err.Error())
		return
	}
	return
}
func (svc *ClusterApiGroupService) AddClusterApiGroup(ctx context.Context, model dtos.ClusterApiGroupCreate) (result dtos.ClusterApiGroupDetail, errorData common.ErrorData) {
	svc.init(ctx)
	config2.Logger.Infof("operator: %s AddClusterApiGroup cluster: %s", config2.GetOperatorFromCtx(ctx), model.ClusterId)
	model.Default(ctx)
	errorData.Err = model.Validate(ctx)
	if errorData.IsNotNil() {
		errorData.MsgCode = config2.MsgCodeRequestDataInvalid
		config2.Logger.Errorf("operator: %s create ClusterApiGroupRepository: %s failed, err: %s", config2.GetOperatorFromCtx(ctx), model.ClusterId, errorData.Err.Error())
		return
	}
	result, errorData = svc.repo.AddClusterApiGroup(ctx, model)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("operator: %s create ClusterApiGroupRepository: %s failed, err: %s", config2.GetOperatorFromCtx(ctx), model.ClusterId, errorData.Err.Error())
		return
	}
	return
}

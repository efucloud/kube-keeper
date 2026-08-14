package database

import (
	"context"
	"github.com/efucloud/common"
	"github.com/efucloud/kube-keeper/pkg/config"
	dtos2 "github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/efucloud/kube-keeper/pkg/repositories"
	"gorm.io/gorm"
)

type ClusterService struct {
	repo repositories.ClusterRepository
}

func (svc *ClusterService) init(ctx context.Context) {
	db, ok := ctx.Value(config.ContextDBTx).(*gorm.DB)
	if ok {
		svc.repo = repositories.ClusterRepository{DB: db}
	} else {
		svc.repo = repositories.ClusterRepository{DB: config.DBConnect}
	}
}

func (svc *ClusterService) ListClusterByCodes(ctx context.Context, clusterCodes []string) (results dtos2.ClusterDetailList, errorData common.ErrorData) {
	svc.init(ctx)
	return svc.repo.ListClusterByCodes(ctx, clusterCodes)
}
func (svc *ClusterService) ListCluster(ctx context.Context, page, size int, order, query string, queryArgs []interface{}) (results dtos2.ClusterDetailList, errorData common.ErrorData) {
	svc.init(ctx)
	return svc.repo.ListCluster(ctx, page, size, order, query, queryArgs)
}
func (svc *ClusterService) GetClusterByID(ctx context.Context, id string) (result dtos2.ClusterDetail, errorData common.ErrorData) {
	svc.init(ctx)
	result, errorData = svc.repo.GetClusterByID(ctx, id)
	if errorData.IsNotNil() {
		config.Logger.Errorf("get ClusterId by id: %s failed, err: %s", id, errorData.Err.Error())
	}
	return result, errorData
}

func (svc *ClusterService) UpdateClusterVersion(ctx context.Context, cluster string, version dtos2.KubernetesVersion) (errorData common.ErrorData) {
	svc.init(ctx)
	errorData = svc.repo.UpdateClusterVersion(ctx, cluster, version)
	if errorData.IsNotNil() {
		config.Logger.Errorf("update cluter version failed, err: %s", errorData.Err.Error())
	}
	return errorData
}
func (svc *ClusterService) GetClusterByCode(ctx context.Context, cluster string) (result dtos2.ClusterDetail, errorData common.ErrorData) {
	svc.init(ctx)
	result, errorData = svc.repo.GetClusterByCode(ctx, cluster)
	if errorData.IsNotNil() {
		config.Logger.Errorf("get Clusters failed, err: %s", errorData.Err.Error())
	}
	return result, errorData
}

func (svc *ClusterService) ChangeStatusCluster(ctx context.Context, model dtos2.ClusterStatus) (errorData common.ErrorData) {
	svc.init(ctx)
	model.Default(ctx)
	errorData = svc.repo.ChangeStatusCluster(ctx, model)
	return
}

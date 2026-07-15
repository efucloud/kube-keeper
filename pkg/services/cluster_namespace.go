package services

import (
	"context"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/efucloud/kube-keeper/pkg/repositories"

	"github.com/efucloud/common"
	"gorm.io/gorm"
)

type ClusterNamespaceService struct {
	repo repositories.ClusterNamespaceRepository
}

func (svc *ClusterNamespaceService) init(ctx context.Context) {
	db, ok := ctx.Value(config2.ContextDBTx).(*gorm.DB)
	if ok {
		svc.repo = repositories.ClusterNamespaceRepository{DB: db}
	} else {
		svc.repo = repositories.ClusterNamespaceRepository{DB: config2.DBConnect}
	}
}

func (svc *ClusterNamespaceService) GetClusterNamespaceByID(ctx context.Context, id string) (result dtos.ClusterNamespaceDetail, errorData common.ErrorData) {
	svc.init(ctx)
	config2.Logger.Infof("operator: %s GetClusterNamespaceByID id: %s", config2.GetOperatorFromCtx(ctx), id)
	result, errorData = svc.repo.GetClusterNamespaceByID(ctx, id)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("operator: %s get ClusterNamespace by id: %s failed, err: %s", config2.GetOperatorFromCtx(ctx), id, errorData.Err.Error())
	}
	return result, errorData
}
func (svc *ClusterNamespaceService) GetClusterNamespaceInfoByNamespace(ctx context.Context, cluster, namespace string) (result dtos.ClusterNamespaceDetail, errorData common.ErrorData) {
	svc.init(ctx)
	config2.Logger.Infof("operator: %s GetClusterNamespaceInfoByNamespace cluster: %s namespace: %s", config2.GetOperatorFromCtx(ctx), cluster, namespace)
	result, errorData = svc.repo.GetClusterNamespaceInfoByNamespace(ctx, cluster, namespace)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("operator: %s cluster: %s get GetClusterNamespaceInfoByNamespace by namespace: %s failed, err: %s", config2.GetOperatorFromCtx(ctx), cluster, namespace, errorData.Err.Error())
	}
	return result, errorData
}
func (svc *ClusterNamespaceService) GetAllClusterNamespace(ctx context.Context, clusterId string) (results dtos.ClusterNamespaceDetailList, errorData common.ErrorData) {
	svc.init(ctx)
	config2.Logger.Infof("operator: %s GetAllClusterNamespace cluster: %s", config2.GetOperatorFromCtx(ctx), clusterId)
	//获取所有的
	page := 1
	size := 1000
	order := "id desc"
	query := " cluster_id = ? "
	var queryArgs []interface{}
	queryArgs = append(queryArgs, clusterId)
	var records []*dtos.ClusterNamespaceDetail
	for {
		r, e := svc.repo.ListClusterNamespace(ctx, page, size, order, query, queryArgs)
		if e.IsNotNil() || len(r.Data) == 0 {
			break
		}
		if len(r.Data) > 0 {
			records = append(records, r.Data...)
		}
		if int64(len(records)) == r.Total {
			break
		}
		page += 1
	}
	results.Data = records
	results.Total = int64(len(records))
	return results, errorData
}
func (svc *ClusterNamespaceService) ListClusterNamespace(ctx context.Context, page, size int, order, query string, queryArgs []interface{}) (results dtos.ClusterNamespaceDetailList, errorData common.ErrorData) {
	svc.init(ctx)
	config2.Logger.Infof("operator: %s ListClusterNamespace query: [%s] queryArgs: [%+v] ", config2.GetOperatorFromCtx(ctx), query, queryArgs)
	results, errorData = svc.repo.ListClusterNamespace(ctx, page, size, order, query, queryArgs)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("operator: %s list ClusterNamespace  query: [%s] queryArgs: [%+v] failed, err: %s", config2.GetOperatorFromCtx(ctx), query, queryArgs, errorData.Err.Error())
	}
	return results, errorData
}
func (svc *ClusterNamespaceService) UpdateClusterNamespace(ctx context.Context, model dtos.ClusterNamespaceUpdate) (result dtos.ClusterNamespaceDetail, errorData common.ErrorData) {
	svc.init(ctx)
	config2.Logger.Infof("operator: %s UpdateClusterNamespace id: %s", config2.GetOperatorFromCtx(ctx), model.ID)
	errorData.Err = model.Validate(ctx)
	if errorData.IsNotNil() {
		errorData.MsgCode = config2.MsgCodeRequestDataInvalid
		config2.Logger.Errorf("operator: %s update ClusterNamespace failed, err: %s", config2.GetOperatorFromCtx(ctx), errorData.Err.Error())
		return
	}

	result, errorData = svc.repo.UpdateClusterNamespace(ctx, model)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("operator: %s update ClusterNamespace: %s failed, err: %s", config2.GetOperatorFromCtx(ctx), model.ID, errorData.Err.Error())
	}
	return
}

func (svc *ClusterNamespaceService) DeleteClusterNamespace(ctx context.Context, clusterId, id string) (errorData common.ErrorData) {
	svc.init(ctx)
	config2.Logger.Infof("operator: %s DeleteClusterNamespace id: %s", config2.GetOperatorFromCtx(ctx), id)
	errorData = svc.repo.DeleteClusterNamespace(ctx, clusterId, id)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("operator: %s delete ClusterNamespace by id: %s failed, err: %s", config2.GetOperatorFromCtx(ctx), id, errorData.Err.Error())
	}
	return
}

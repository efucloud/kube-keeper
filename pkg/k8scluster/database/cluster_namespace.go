package database

import (
	"context"
	"github.com/efucloud/common"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/efucloud/kube-keeper/pkg/repositories"
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
func (svc *ClusterNamespaceService) GetClusterNamespaceByName(ctx context.Context, cluster, namespace string) (results dtos.ClusterNamespaceDetail, errorData common.ErrorData) {
	svc.init(ctx)
	results, errorData = svc.repo.GetClusterNamespaceByName(ctx, cluster, namespace)
	if errorData.IsNotNil() {
		config2.Logger.Errorf(" cluster: %s GetClusterNamespaceByName: %s failed, err: %s", cluster, namespace, errorData.Err.Error())
	}
	return results, errorData
}
func (svc *ClusterNamespaceService) ListClusterNamespace(ctx context.Context, page, size int, order, query string, queryArgs []interface{}) (results dtos.ClusterNamespaceDetailList, errorData common.ErrorData) {
	svc.init(ctx)
	results, errorData = svc.repo.ListClusterNamespace(ctx, page, size, order, query, queryArgs)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("list ClusterNamespace  query: [%s] queryArgs: [%+v] failed, err: %s", query, queryArgs, errorData.Err.Error())
	}
	return results, errorData
}
func (svc *ClusterNamespaceService) GetAllClusterNamespace(ctx context.Context, clusterId string) (results dtos.ClusterNamespaceDetailList, errorData common.ErrorData) {
	svc.init(ctx)
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
		if int64(len(records)) >= r.Total {
			break
		}
		page += 1
	}
	results.Data = records
	results.Total = int64(len(records))
	return results, errorData
}

func (svc *ClusterNamespaceService) UpdateClusterNamespace(ctx context.Context, model dtos.ClusterNamespaceUpdate) (result dtos.ClusterNamespaceDetail, errorData common.ErrorData) {
	svc.init(ctx)

	model.Default(ctx)
	errorData.Err = model.Validate(ctx)
	if errorData.IsNotNil() {
		errorData.MsgCode = config2.MsgCodeRequestDataInvalid
		config2.Logger.Errorf("update ClusterNamespace failed, err: %s", errorData.Err.Error())
		return
	}
	result, errorData = svc.repo.UpdateClusterNamespace(ctx, model)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("update ClusterNamespace: %s failed, err: %s", model.ID, errorData.Err.Error())
	}
	return
}
func (svc *ClusterNamespaceService) AddClusterNamespace(ctx context.Context, model dtos.ClusterNamespaceCreate) (result dtos.ClusterNamespaceDetail, errorData common.ErrorData) {
	svc.init(ctx)

	model.Default(ctx)
	errorData.Err = model.Validate(ctx)
	if errorData.IsNotNil() {
		errorData.MsgCode = config2.MsgCodeRequestDataInvalid
		config2.Logger.Errorf("create ClusterNamespace: %s failed, err: %s", model.Namespace, errorData.Err.Error())
		return
	}
	result, errorData = svc.repo.AddClusterNamespace(ctx, model)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("create ClusterNamespace: %s failed, err: %s", model.Namespace, errorData.Err.Error())
	}
	return
}

func (svc *ClusterNamespaceService) DeleteClusterNamespace(ctx context.Context, clusterId, namespace string) (errorData common.ErrorData) {
	svc.init(ctx)
	errorData = svc.repo.DeleteClusterNamespace(ctx, clusterId, namespace)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("delete ClusterNamespace by namespace: %s failed, err: %s", namespace, errorData.Err.Error())
	}
	return
}

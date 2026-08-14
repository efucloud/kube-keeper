package services

import (
	"context"
	"github.com/efucloud/common"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	dtos2 "github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/efucloud/kube-keeper/pkg/repositories"
	"github.com/efucloud/kube-keeper/pkg/structs"
	"gorm.io/gorm"
	"strings"
)

type ClusterNamespaceAccountRoleService struct {
	repo repositories.ClusterNamespaceAccountRoleRepository
}

func (svc *ClusterNamespaceAccountRoleService) cacheKeyByID(id string) string {
	return config2.CacheKey("cache", "cluster_namespace_account_role", "id", id)
}

func (svc *ClusterNamespaceAccountRoleService) writeClusterNamespaceAccountRoleCache(ctx context.Context, model dtos2.ClusterNamespaceAccountRoleDetail) {
	if model.ID == "" {
		return
	}
	setJSONCache(ctx, svc.cacheKeyByID(model.ID), model, config2.DefaultCacheTTL())
}

func (svc *ClusterNamespaceAccountRoleService) invalidateClusterNamespaceAccountRoleCache(ctx context.Context, ids ...string) {
	keys := make([]string, 0, len(ids))
	for _, id := range ids {
		if id != "" {
			keys = append(keys, svc.cacheKeyByID(id))
		}
	}
	deleteCacheKeys(ctx, keys...)
}

func (svc *ClusterNamespaceAccountRoleService) init(ctx context.Context) {
	db, ok := ctx.Value(config2.ContextDBTx).(*gorm.DB)
	if ok {
		svc.repo = repositories.ClusterNamespaceAccountRoleRepository{DB: db}
	} else {
		svc.repo = repositories.ClusterNamespaceAccountRoleRepository{DB: config2.DBConnect}
	}
}

func (svc *ClusterNamespaceAccountRoleService) GetClusterNamespaceAccountRoleById(ctx context.Context, requestInfo structs.RequestInfo, id string) (result dtos2.ClusterNamespaceAccountRoleDetail, errorData common.ErrorData) {
	svc.init(ctx)
	if getJSONCache(ctx, svc.cacheKeyByID(id), &result) {
		config2.Logger.Debugf("clusterNamespaceAccountRole cache hit by id, id=%s", id)
		return result, errorData
	}
	config2.Logger.Infof("operator: %s GetClusterNamespaceAccountRoleById id: %s", config2.GetOperatorFromCtx(ctx), id)
	result, errorData = svc.repo.GetClusterNamespaceAccountRoleById(ctx, id)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("get ClusterNamespaceAccountRole by id: %s failed, err: %s", id, errorData.Err.Error())
		return
	}
	svc.writeClusterNamespaceAccountRoleCache(ctx, result)
	return result, errorData
}

func (svc *ClusterNamespaceAccountRoleService) ListClusterNamespaceAccountRole(ctx context.Context, requestInfo structs.RequestInfo, current, pageSize int, order, query string, queryArgs []interface{}) (results dtos2.ClusterNamespaceAccountRoleDetailList, errorData common.ErrorData) {
	svc.init(ctx)
	config2.Logger.Infof("operator: %s ListClusterNamespaceAccountRole query: [%s] queryArgs: [%+v] ", config2.GetOperatorFromCtx(ctx), query, queryArgs)
	results, errorData = svc.repo.ListClusterNamespaceAccountRole(ctx, current, pageSize, order, query, queryArgs)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("list ClusterNamespaceAccountRole  query: [%s] queryArgs: [%+v] failed, err: %s", query, queryArgs, errorData.Err.Error())
		return
	}

	return results, errorData
}
func (svc *ClusterNamespaceAccountRoleService) AddClusterNamespaceAccountRole(ctx context.Context, requestInfo structs.RequestInfo, model dtos2.ClusterNamespaceAccountRoleCreate) (result dtos2.ClusterNamespaceAccountRoleDetail, errorData common.ErrorData) {
	svc.init(ctx)
	config2.Logger.Infof("operator: %s AddClusterNamespaceAccountRole clusterId: %s accountId: %s", config2.GetOperatorFromCtx(ctx), model.ClusterId, model.AccountId)
	model.Default(ctx)
	errorData.Err = model.Validate(ctx)
	if errorData.IsNotNil() {
		errorData.MsgCode = config2.MsgCodeRequestDataInvalid
		config2.Logger.Errorf("create ClusterNamespaceAccountRole for account: %s failed, err: %s", model.AccountId, errorData.Err.Error())
		return
	}

	result, errorData = svc.repo.AddClusterNamespaceAccountRole(ctx, model)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("create ClusterNamespaceAccountRole for account: %s failed, err: %s", model.AccountId, errorData.Err.Error())
		return
	}
	svc.writeClusterNamespaceAccountRoleCache(ctx, result)
	return
}

func (svc *ClusterNamespaceAccountRoleService) DeleteClusterNamespaceAccountRole(ctx context.Context, requestInfo structs.RequestInfo, ids []string) (errorData common.ErrorData) {
	svc.init(ctx)
	config2.Logger.Infof("operator: %s DeleteClusterNamespaceAccountRole ids: [%s]", config2.GetOperatorFromCtx(ctx), strings.Join(ids, ","))
	errorData = svc.repo.DeleteClusterNamespaceAccountRole(ctx, requestInfo.ClusterId, requestInfo.Namespace, ids)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("delete ClusterNamespaceAccountRole by ids: %v failed, err: %s", ids, errorData.Err.Error())
		return
	}
	svc.invalidateClusterNamespaceAccountRoleCache(ctx, ids...)
	return
}

func (svc *ClusterNamespaceAccountRoleService) ChangeStatus(ctx context.Context, requestInfo structs.RequestInfo, model dtos2.Status) (errorData common.ErrorData) {
	svc.init(ctx)
	config2.Logger.Infof("operator: %s ChangeStatus ids: [%s]", config2.GetOperatorFromCtx(ctx), strings.Join(model.Ids, ","))
	model.Default(ctx)
	errorData = svc.repo.ChangeStatus(ctx, model)
	if errorData.IsNil() {
		svc.invalidateClusterNamespaceAccountRoleCache(ctx, model.Ids...)
	}
	return
}

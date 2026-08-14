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

type ClusterAccountRoleService struct {
	repo repositories.ClusterAccountRoleRepository
}

func (svc *ClusterAccountRoleService) cacheKeyByID(id string) string {
	return config2.CacheKey("cache", "cluster_account_role", "id", id)
}

func (svc *ClusterAccountRoleService) writeClusterAccountRoleCache(ctx context.Context, model dtos2.ClusterAccountRoleDetail) {
	if model.ID == "" {
		return
	}
	setJSONCache(ctx, svc.cacheKeyByID(model.ID), model, config2.DefaultCacheTTL())
}

func (svc *ClusterAccountRoleService) invalidateClusterAccountRoleCache(ctx context.Context, ids ...string) {
	keys := make([]string, 0, len(ids))
	for _, id := range ids {
		if id != "" {
			keys = append(keys, svc.cacheKeyByID(id))
		}
	}
	deleteCacheKeys(ctx, keys...)
}

func (svc *ClusterAccountRoleService) init(ctx context.Context) {
	db, ok := ctx.Value(config2.ContextDBTx).(*gorm.DB)
	if ok {
		svc.repo = repositories.ClusterAccountRoleRepository{DB: db}
	} else {
		svc.repo = repositories.ClusterAccountRoleRepository{DB: config2.DBConnect}
	}
}

func (svc *ClusterAccountRoleService) GetClusterAccountRoleById(ctx context.Context, requestInfo structs.RequestInfo, id string) (result dtos2.ClusterAccountRoleDetail, errorData common.ErrorData) {
	svc.init(ctx)
	if getJSONCache(ctx, svc.cacheKeyByID(id), &result) {
		config2.Logger.Debugf("clusterAccountRole cache hit by id, id=%s", id)
		return result, errorData
	}
	config2.Logger.Infof("operator: %s GetClusterAccountRoleById id: %s", config2.GetOperatorFromCtx(ctx), id)
	result, errorData = svc.repo.GetClusterAccountRoleById(ctx, id)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("get ClusterAccountRole by id: %s failed, err: %s", id, errorData.Err.Error())
		return
	}
	svc.writeClusterAccountRoleCache(ctx, result)
	return result, errorData
}

func (svc *ClusterAccountRoleService) ListClusterAccountRole(ctx context.Context, requestInfo structs.RequestInfo, current, pageSize int, order, query string, queryArgs []interface{}) (results dtos2.ClusterAccountRoleDetailList, errorData common.ErrorData) {
	svc.init(ctx)
	config2.Logger.Infof("operator: %s ListClusterAccountRole query: [%s] queryArgs: [%+v] ", config2.GetOperatorFromCtx(ctx), query, queryArgs)
	results, errorData = svc.repo.ListClusterAccountRole(ctx, current, pageSize, order, query, queryArgs)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("list ClusterAccountRole  query: [%s] queryArgs: [%+v] failed, err: %s", query, queryArgs, errorData.Err.Error())
		return
	}

	return results, errorData
}
func (svc *ClusterAccountRoleService) AddClusterAccountRole(ctx context.Context, requestInfo structs.RequestInfo, model dtos2.ClusterAccountRoleCreate) (result dtos2.ClusterAccountRoleDetail, errorData common.ErrorData) {
	svc.init(ctx)
	config2.Logger.Infof("operator: %s AddClusterAccountRole clusterId: %s accountId: %s", config2.GetOperatorFromCtx(ctx), model.ClusterId, model.AccountId)
	model.Default(ctx)
	errorData.Err = model.Validate(ctx)
	if errorData.IsNotNil() {
		errorData.MsgCode = config2.MsgCodeRequestDataInvalid
		config2.Logger.Errorf("create ClusterAccountRole for account: %s failed, err: %s", model.AccountId, errorData.Err.Error())
		return
	}

	result, errorData = svc.repo.AddClusterAccountRole(ctx, model)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("create ClusterAccountRole for account: %s failed, err: %s", model.AccountId, errorData.Err.Error())
		return
	}
	svc.writeClusterAccountRoleCache(ctx, result)
	return
}

func (svc *ClusterAccountRoleService) DeleteClusterAccountRole(ctx context.Context, requestInfo structs.RequestInfo, ids []string) (errorData common.ErrorData) {
	svc.init(ctx)
	config2.Logger.Infof("operator: %s DeleteClusterAccountRole ids: [%s]", config2.GetOperatorFromCtx(ctx), strings.Join(ids, ","))
	errorData = svc.repo.DeleteClusterAccountRole(ctx, ids)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("delete ClusterAccountRole by ids: %v failed, err: %s", ids, errorData.Err.Error())
		return
	}
	svc.invalidateClusterAccountRoleCache(ctx, ids...)
	return
}

func (svc *ClusterAccountRoleService) ChangeStatus(ctx context.Context, requestInfo structs.RequestInfo, model dtos2.Status) (errorData common.ErrorData) {
	svc.init(ctx)
	config2.Logger.Infof("operator: %s ChangeStatus ids: [%s]", config2.GetOperatorFromCtx(ctx), strings.Join(model.Ids, ","))
	model.Default(ctx)
	errorData = svc.repo.ChangeStatus(ctx, model)
	if errorData.IsNil() {
		svc.invalidateClusterAccountRoleCache(ctx, model.Ids...)
	}
	return
}

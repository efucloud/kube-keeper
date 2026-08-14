package database

import (
	"context"

	"github.com/efucloud/common"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	dtos2 "github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/efucloud/kube-keeper/pkg/repositories"
	"github.com/efucloud/kube-keeper/pkg/structs"
	"gorm.io/gorm"
)

type ClusterAccountRoleService struct {
	repo repositories.ClusterAccountRoleRepository
}

func (svc *ClusterAccountRoleService) cacheKeyByID(id string) string {
	return config2.CacheKey("cache", "k8s_db_cluster_account_role", "id", id)
}

func (svc *ClusterAccountRoleService) cacheKeyByAccountRole(clusterId, accountId, roleName string) string {
	return config2.CacheKey("cache", "k8s_db_cluster_account_role", "cluster_account_role", clusterId, accountId, roleName)
}

func (svc *ClusterAccountRoleService) writeClusterAccountRoleCache(ctx context.Context, model dtos2.ClusterAccountRoleDetail) {
	if model.ID == "" {
		return
	}
	setJSONCache(ctx, svc.cacheKeyByID(model.ID), model)
	if model.ClusterId != "" && model.AccountId != "" && model.RoleName != "" {
		setJSONCache(ctx, svc.cacheKeyByAccountRole(model.ClusterId, model.AccountId, model.RoleName), model)
	}
}

func (svc *ClusterAccountRoleService) invalidateClusterAccountRoleCache(ctx context.Context, id, clusterId, accountId, roleName string) {
	keys := make([]string, 0, 2)
	if id != "" {
		keys = append(keys, svc.cacheKeyByID(id))
	}
	if clusterId != "" && accountId != "" && roleName != "" {
		keys = append(keys, svc.cacheKeyByAccountRole(clusterId, accountId, roleName))
	}
	deleteCacheKeys(ctx, keys...)
}

func (svc *ClusterAccountRoleService) getRoleForInvalidate(ctx context.Context, id string) (detail dtos2.ClusterAccountRoleDetail) {
	_ = getJSONCache(ctx, svc.cacheKeyByID(id), &detail)
	if detail.ID != "" {
		return detail
	}
	detail, _ = svc.repo.GetClusterAccountRoleById(ctx, id)
	return detail
}

func (svc *ClusterAccountRoleService) init(ctx context.Context) {
	db, ok := ctx.Value(config2.ContextDBTx).(*gorm.DB)
	if ok {
		svc.repo = repositories.ClusterAccountRoleRepository{DB: db}
	} else {
		svc.repo = repositories.ClusterAccountRoleRepository{DB: config2.DBConnect}
	}
}

func (svc *ClusterAccountRoleService) GetClusterAccountRoleByAccountIdAndRoleName(ctx context.Context, requestInfo structs.RequestInfo, accountId, roleName string) (result dtos2.ClusterAccountRoleDetail, errorData common.ErrorData) {
	svc.init(ctx)
	if getJSONCache(ctx, svc.cacheKeyByAccountRole(requestInfo.ClusterId, accountId, roleName), &result) {
		config2.Logger.Debugf("k8s db clusterAccountRole cache hit by account+role, clusterId=%s, accountId=%s, role=%s, id=%s", requestInfo.ClusterId, accountId, roleName, result.ID)
		return result, errorData
	}
	result, errorData = svc.repo.GetClusterAccountRoleByAccountIdAndRoleName(ctx, requestInfo.ClusterId, accountId, roleName)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("not found cluster account role by account id: %s and role name: %s failed, err: %s", accountId, roleName, errorData.Err.Error())
		return
	}
	svc.writeClusterAccountRoleCache(ctx, result)
	return result, errorData
}

func (svc *ClusterAccountRoleService) GetClusterAccountRoleById(ctx context.Context, id string) (result dtos2.ClusterAccountRoleDetail, errorData common.ErrorData) {
	svc.init(ctx)
	if getJSONCache(ctx, svc.cacheKeyByID(id), &result) {
		config2.Logger.Debugf("k8s db clusterAccountRole cache hit by id, id=%s", id)
		return result, errorData
	}
	result, errorData = svc.repo.GetClusterAccountRoleById(ctx, id)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("get ClusterAccountRole by id: %s failed, err: %s", id, errorData.Err.Error())
		return
	}
	svc.writeClusterAccountRoleCache(ctx, result)
	return result, errorData
}

func (svc *ClusterAccountRoleService) DeleteClusterAccountRoleByAccountId(ctx context.Context, requestInfo structs.RequestInfo, accountId string) (errorData common.ErrorData) {
	svc.init(ctx)
	oldList := svc.repo.ListClusterAccountRoleByAccountId(ctx, accountId)
	errorData = svc.repo.DeleteClusterAccountRoleByAccountId(ctx, requestInfo.ClusterId, accountId)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("cluster: %s delete ClusterAccountRole by account id: %s failed, err: %s", requestInfo.ClusterId, accountId, errorData.Err.Error())
		return
	}
	for _, old := range oldList.Data {
		svc.invalidateClusterAccountRoleCache(ctx, old.ID, old.ClusterId, old.AccountId, old.RoleName)
	}
	return
}

func (svc *ClusterAccountRoleService) ListClusterAccountRoleByAccountId(ctx context.Context, accountId string) (results dtos2.ClusterAccountRoleDetailList) {
	svc.init(ctx)
	return svc.repo.ListClusterAccountRoleByAccountId(ctx, accountId)
}

func (svc *ClusterAccountRoleService) ListClusterAccountRole(ctx context.Context, current, pageSize int, order, query string, queryArgs []interface{}) (results dtos2.ClusterAccountRoleDetailList, errorData common.ErrorData) {
	svc.init(ctx)
	results, errorData = svc.repo.ListClusterAccountRole(ctx, current, pageSize, order, query, queryArgs)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("list ClusterAccountRole  query: [%s] queryArgs: [%+v] failed, err: %s", query, queryArgs, errorData.Err.Error())
		return
	}

	return results, errorData
}

func (svc *ClusterAccountRoleService) AddClusterAccountRole(ctx context.Context, model dtos2.ClusterAccountRoleCreate) (result dtos2.ClusterAccountRoleDetail, errorData common.ErrorData) {
	svc.init(ctx)
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

func (svc *ClusterAccountRoleService) DeleteClusterAccountRole(ctx context.Context, ids []string) (errorData common.ErrorData) {
	svc.init(ctx)
	oldMap := make(map[string]dtos2.ClusterAccountRoleDetail, len(ids))
	for _, id := range ids {
		oldMap[id] = svc.getRoleForInvalidate(ctx, id)
	}
	errorData = svc.repo.DeleteClusterAccountRole(ctx, ids)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("delete ClusterAccountRole by ids: %v failed, err: %s", ids, errorData.Err.Error())
		return
	}
	for _, id := range ids {
		old := oldMap[id]
		svc.invalidateClusterAccountRoleCache(ctx, id, old.ClusterId, old.AccountId, old.RoleName)
	}
	return
}

func (svc *ClusterAccountRoleService) ChangeStatus(ctx context.Context, model dtos2.Status) (errorData common.ErrorData) {
	svc.init(ctx)
	model.Default(ctx)
	oldMap := make(map[string]dtos2.ClusterAccountRoleDetail, len(model.Ids))
	for _, id := range model.Ids {
		oldMap[id] = svc.getRoleForInvalidate(ctx, id)
	}
	errorData = svc.repo.ChangeStatus(ctx, model)
	if errorData.IsNil() {
		for _, id := range model.Ids {
			old := oldMap[id]
			svc.invalidateClusterAccountRoleCache(ctx, id, old.ClusterId, old.AccountId, old.RoleName)
		}
	}
	return
}

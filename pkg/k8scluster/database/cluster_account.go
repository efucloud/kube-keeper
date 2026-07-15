package database

import (
	"context"
	"strings"

	"github.com/efucloud/common"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	dtos2 "github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/efucloud/kube-keeper/pkg/repositories"
	"github.com/efucloud/kube-keeper/pkg/structs"
	"gorm.io/gorm"
)

type ClusterAccountService struct {
	repo repositories.ClusterAccountRepository
}

func (svc *ClusterAccountService) cacheKeyByID(id string) string {
	return config2.CacheKey("cache", "k8s_db_cluster_account", "id", id)
}

func (svc *ClusterAccountService) cacheKeyByClusterAccount(clusterId, accountId string) string {
	return config2.CacheKey("cache", "k8s_db_cluster_account", "cluster_account", clusterId, accountId)
}

func (svc *ClusterAccountService) writeClusterAccountCache(ctx context.Context, model dtos2.ClusterAccountDetail) {
	if model.ID == "" {
		return
	}
	setJSONCache(ctx, svc.cacheKeyByID(model.ID), model)
	if model.ClusterId != "" && model.AccountId != "" {
		setJSONCache(ctx, svc.cacheKeyByClusterAccount(model.ClusterId, model.AccountId), model)
	}
}

func (svc *ClusterAccountService) invalidateClusterAccountCache(ctx context.Context, id, clusterId, accountId string) {
	keys := make([]string, 0, 2)
	if id != "" {
		keys = append(keys, svc.cacheKeyByID(id))
	}
	if clusterId != "" && accountId != "" {
		keys = append(keys, svc.cacheKeyByClusterAccount(clusterId, accountId))
	}
	deleteCacheKeys(ctx, keys...)
}

func (svc *ClusterAccountService) getClusterAccountForInvalidate(ctx context.Context, id string) (detail dtos2.ClusterAccountDetail) {
	_ = getJSONCache(ctx, svc.cacheKeyByID(id), &detail)
	if detail.ID != "" {
		return detail
	}
	detail, _ = svc.repo.GetClusterAccountByID(ctx, id)
	return detail
}

func (svc *ClusterAccountService) init(ctx context.Context) {
	db, ok := ctx.Value(config2.ContextDBTx).(*gorm.DB)
	if ok {
		svc.repo = repositories.ClusterAccountRepository{DB: db}
	} else {
		svc.repo = repositories.ClusterAccountRepository{DB: config2.DBConnect}
	}
}

func (svc *ClusterAccountService) GetClusterAccountByID(ctx context.Context, id string) (result dtos2.ClusterAccountDetail, errorData common.ErrorData) {
	svc.init(ctx)
	if getJSONCache(ctx, svc.cacheKeyByID(id), &result) {
		config2.Logger.Debugf("k8s db clusterAccount cache hit by id, id=%s, clusterId=%s, accountId=%s", id, result.ClusterId, result.AccountId)
		return result, errorData
	}
	result, errorData = svc.repo.GetClusterAccountByID(ctx, id)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("get ClusterAccount by id: %s failed, err: %s", id, errorData.Err.Error())
		return result, errorData
	}
	svc.writeClusterAccountCache(ctx, result)
	return result, errorData
}

func (svc *ClusterAccountService) ListUserCanAccessClusters(ctx context.Context, accountId string, page, size int, order, query string, queryArgs []interface{}) (clusterList dtos2.UserAccessClusterList, errorData common.ErrorData) {
	svc.init(ctx)
	var results dtos2.ClusterAccountDetailList
	results, errorData = svc.repo.ListClusterAccount(ctx, page, size, order, query, queryArgs)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("list ClusterAccount  query: [%s] queryArgs: [%+v] failed, err: %s", query, queryArgs, errorData.Err.Error())
	}
	clusterSvc := ClusterService{}
	clusterRoleSvc := ClusterAccountRoleService{}
	nsRoleSvc := ClusterNamespaceAccountRoleService{}
	clusterRoles := clusterRoleSvc.ListClusterAccountRoleByAccountId(ctx, accountId)
	clusterRoleMap := make(map[string]string)
	for _, k := range clusterRoles.Data {
		if k.Enable {
			clusterRoleMap[k.ClusterId] = k.RoleName
		}
	}
	for _, item := range results.Data {
		if cluster, _ := clusterSvc.GetClusterByID(ctx, item.ClusterId); cluster.Enable && len(cluster.ID) > 0 {
			nsRoles := nsRoleSvc.ListClusterNamespaceAccountRoleRoleByAccountId(ctx, cluster.ID, accountId)
			var nsList []string
			for _, nsRole := range nsRoles.Data {
				if nsRole.Enable && len(nsRole.Namespace) > 0 {
					nsList = append(nsList, nsRole.Namespace)
				}
			}
			clusterRole, _ := clusterRoleMap[cluster.ID]
			clusterList.Data = append(clusterList.Data, dtos2.UserAccessCluster{
				ID:                    cluster.ID,
				Code:                  cluster.Code,
				Name:                  cluster.Name,
				Version:               cluster.Version,
				Category:              cluster.Category,
				CommonCanCreateNs:     false,
				BuiltinMaxClusterRole: clusterRole,
				Namespaces:            nsList,
			})
		}
	}
	clusterList.Total = int64(len(clusterList.Data))
	return clusterList, errorData
}

func (svc *ClusterAccountService) GetClusterAccountInfoByAccountID(ctx context.Context, clusterId, accountId string) (results dtos2.ClusterAccountDetail, errorData common.ErrorData) {
	svc.init(ctx)
	if getJSONCache(ctx, svc.cacheKeyByClusterAccount(clusterId, accountId), &results) {
		config2.Logger.Debugf("k8s db clusterAccount cache hit by cluster+account, clusterId=%s, accountId=%s, id=%s", clusterId, accountId, results.ID)
		return results, errorData
	}
	results, errorData = svc.repo.GetClusterAccountInfoByAccountID(ctx, clusterId, accountId)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("cluster: %s  get ClusterAccount by id: %s failed, err: %s", clusterId, accountId, errorData.Err.Error())
		return results, errorData
	}
	svc.writeClusterAccountCache(ctx, results)
	return results, errorData
}

func (svc *ClusterAccountService) CreateClusterAccount(ctx context.Context, model dtos2.ClusterAccountCreate) (result dtos2.ClusterAccountDetail, errorData common.ErrorData) {
	svc.init(ctx)

	model.Default(ctx)
	errorData.Err = model.Validate(ctx)
	if errorData.IsNotNil() {
		errorData.MsgCode = config2.MsgCodeRequestDataInvalid
		config2.Logger.Errorf("create ClusterAccount: %s failed, err: %s", model.CsrName, errorData.Err.Error())
		return
	}
	result, errorData = svc.repo.AddClusterAccount(ctx, model)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("create ClusterAccount: %s failed, err: %s", model.CsrName, errorData.Err.Error())
		return
	}
	svc.writeClusterAccountCache(ctx, result)
	return
}

func (svc *ClusterAccountService) UpdateClusterAccount(ctx context.Context, model dtos2.ClusterAccountUpdate) (result dtos2.ClusterAccountDetail, errorData common.ErrorData) {
	svc.init(ctx)

	model.Default(ctx)
	errorData.Err = model.Validate(ctx)
	if errorData.IsNotNil() {
		errorData.MsgCode = config2.MsgCodeRequestDataInvalid
		config2.Logger.Errorf("update ClusterAccount: %s failed, err: %s", model.CsrName, errorData.Err.Error())
		return
	}
	old := svc.getClusterAccountForInvalidate(ctx, model.ID)
	result, errorData = svc.repo.UpdateClusterAccount(ctx, model)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("update ClusterAccount: %s failed, err: %s", model.CsrName, errorData.Err.Error())
		return
	}
	svc.invalidateClusterAccountCache(ctx, model.ID, old.ClusterId, old.AccountId)
	svc.writeClusterAccountCache(ctx, result)
	return
}

func (svc *ClusterAccountService) SetClusterAccountSupper(ctx context.Context, clusterId, accountId, updaterId string) (errorData common.ErrorData) {
	svc.init(ctx)
	errorData = svc.repo.SetClusterAccountSupper(ctx, clusterId, accountId, updaterId)
	if errorData.IsNil() {
		detail, _ := svc.GetClusterAccountInfoByAccountID(ctx, clusterId, accountId)
		svc.invalidateClusterAccountCache(ctx, detail.ID, clusterId, accountId)
	}
	return errorData
}

func (svc *ClusterAccountService) DeleteSupperClusterAccount(ctx context.Context, requestInfo structs.RequestInfo, ids []string) (errorData common.ErrorData) {
	svc.init(ctx)
	idClusterAccountMap := make(map[string]dtos2.ClusterAccountDetail, len(ids))
	for _, id := range ids {
		idClusterAccountMap[id] = svc.getClusterAccountForInvalidate(ctx, id)
	}
	errorData = svc.repo.DeleteSupperClusterAccount(ctx, requestInfo.ClusterId, ids)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("cluster: %s delete ClusterAccount by ids: %s failed, err: %s", requestInfo.ClusterId, strings.Join(ids, ","), errorData.Err.Error())
		return
	}
	for _, id := range ids {
		old := idClusterAccountMap[id]
		svc.invalidateClusterAccountCache(ctx, id, old.ClusterId, old.AccountId)
	}
	return
}

func (svc *ClusterAccountService) DeleteClusterAccountByAccountId(ctx context.Context, requestInfo structs.RequestInfo, accountIds []string) (errorData common.ErrorData) {
	svc.init(ctx)
	accountMap := make(map[string]dtos2.ClusterAccountDetail, len(accountIds))
	for _, accountId := range accountIds {
		detail, _ := svc.GetClusterAccountInfoByAccountID(ctx, requestInfo.ClusterId, accountId)
		accountMap[accountId] = detail
	}
	errorData = svc.repo.DeleteClusterAccountByAccountId(ctx, requestInfo.ClusterId, accountIds)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("cluster: %s delete ClusterAccount by account Ids: %s failed, err: %s", requestInfo.ClusterId, strings.Join(accountIds, ","), errorData.Err.Error())
		return
	}
	for _, accountId := range accountIds {
		old := accountMap[accountId]
		svc.invalidateClusterAccountCache(ctx, old.ID, requestInfo.ClusterId, accountId)
	}
	return
}

func (svc *ClusterAccountService) DeleteClusterAccount(ctx context.Context, requestInfo structs.RequestInfo, ids []string) (errorData common.ErrorData) {
	svc.init(ctx)
	idClusterAccountMap := make(map[string]dtos2.ClusterAccountDetail, len(ids))
	for _, id := range ids {
		idClusterAccountMap[id] = svc.getClusterAccountForInvalidate(ctx, id)
	}
	errorData = svc.repo.DeleteClusterAccount(ctx, requestInfo.ClusterId, ids)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("cluster: %s delete ClusterAccount by ids: %s failed, err: %s", requestInfo.ClusterId, strings.Join(ids, ","), errorData.Err.Error())
		return
	}
	for _, id := range ids {
		old := idClusterAccountMap[id]
		svc.invalidateClusterAccountCache(ctx, id, old.ClusterId, old.AccountId)
	}
	return
}

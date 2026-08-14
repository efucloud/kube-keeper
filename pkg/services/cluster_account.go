package services

import (
	"context"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/efucloud/kube-keeper/pkg/repositories"
	"github.com/efucloud/kube-keeper/pkg/structs"
	"strings"

	"github.com/efucloud/common"
	"gorm.io/gorm"
)

type ClusterAccountService struct {
	repo repositories.ClusterAccountRepository
}

func (svc *ClusterAccountService) cacheKeyByID(id string) string {
	return config2.CacheKey("cache", "cluster_account", "id", id)
}

func (svc *ClusterAccountService) cacheKeyByClusterAccount(clusterId, accountId string) string {
	return config2.CacheKey("cache", "cluster_account", "cluster_account", clusterId, accountId)
}

func (svc *ClusterAccountService) writeClusterAccountCache(ctx context.Context, model dtos.ClusterAccountDetail) {
	if model.ID == "" {
		return
	}
	setJSONCache(ctx, svc.cacheKeyByID(model.ID), model, config2.DefaultCacheTTL())
	if model.ClusterId != "" && model.AccountId != "" {
		setJSONCache(ctx, svc.cacheKeyByClusterAccount(model.ClusterId, model.AccountId), model, config2.DefaultCacheTTL())
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

func (svc *ClusterAccountService) getClusterAccountForInvalidate(ctx context.Context, id string) (detail dtos.ClusterAccountDetail) {
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

func (svc *ClusterAccountService) GetClusterAccountByID(ctx context.Context, id string) (result dtos.ClusterAccountDetail, errorData common.ErrorData) {
	svc.init(ctx)
	if getJSONCache(ctx, svc.cacheKeyByID(id), &result) {
		config2.Logger.Debugf("clusterAccount cache hit by id, id=%s, clusterId=%s, accountId=%s", id, result.ClusterId, result.AccountId)
		return result, errorData
	}
	config2.Logger.Infof("operator: %s GetClusterAccountByID id: %s", config2.GetOperatorFromCtx(ctx), id)
	result, errorData = svc.repo.GetClusterAccountByID(ctx, id)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("operator: %s get ClusterAccount by id: %s failed, err: %s", config2.GetOperatorFromCtx(ctx), id, errorData.Err.Error())
		return result, errorData
	}
	svc.writeClusterAccountCache(ctx, result)
	return result, errorData
}

func (svc *ClusterAccountService) GetClusterAccountInfoByAccountID(ctx context.Context, requestInfo structs.RequestInfo, accountId string) (result dtos.ClusterAccountDetail, errorData common.ErrorData) {
	svc.init(ctx)
	if getJSONCache(ctx, svc.cacheKeyByClusterAccount(requestInfo.ClusterId, accountId), &result) {
		config2.Logger.Debugf("clusterAccount cache hit by cluster+account, clusterId=%s, accountId=%s, id=%s", requestInfo.ClusterId, accountId, result.ID)
		return result, errorData
	}
	config2.Logger.Infof("operator: %s GetClusterAccountInfoByAccountID accountId: %s", config2.GetOperatorFromCtx(ctx), accountId)
	result, errorData = svc.repo.GetClusterAccountInfoByAccountID(ctx, requestInfo.ClusterId, accountId)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("operator: %s get ClusterAccount by id: %s failed, err: %s", config2.GetOperatorFromCtx(ctx), accountId, errorData.Err.Error())
		return result, errorData
	}
	svc.writeClusterAccountCache(ctx, result)
	return result, errorData
}

func (svc *ClusterAccountService) ListClusterAccount(ctx context.Context, page, size int, order, query string, queryArgs []interface{}) (results dtos.ClusterAccountDetailList, errorData common.ErrorData) {
	svc.init(ctx)
	config2.Logger.Infof("operator: %s ListClusterAccount query: [%s] queryArgs: [%+v] ", config2.GetOperatorFromCtx(ctx), query, queryArgs)
	results, errorData = svc.repo.ListClusterAccount(ctx, page, size, order, query, queryArgs)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("operator: %s list ClusterAccount  query: [%s] queryArgs: [%+v] failed, err: %s", config2.GetOperatorFromCtx(ctx), query, queryArgs, errorData.Err.Error())
	}

	return results, errorData
}

func (svc *ClusterAccountService) CreateClusterAccount(ctx context.Context, model dtos.ClusterAccountCreate) (result dtos.ClusterAccountDetail, errorData common.ErrorData) {
	svc.init(ctx)
	model.Default(ctx)
	config2.Logger.Infof("operator: %s CreateClusterAccount accountId: %s", config2.GetOperatorFromCtx(ctx), model.AccountId)
	errorData.Err = model.Validate(ctx)
	if errorData.IsNotNil() {
		errorData.MsgCode = config2.MsgCodeRequestDataInvalid
		config2.Logger.Errorf("operator: %s create ClusterAccount: %s failed, err: %s", config2.GetOperatorFromCtx(ctx), model.CsrName, errorData.Err.Error())
		return
	}
	result, errorData = svc.repo.AddClusterAccount(ctx, model)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("operator: %s create ClusterAccount: %s failed, err: %s", config2.GetOperatorFromCtx(ctx), model.CsrName, errorData.Err.Error())
		return
	}
	svc.writeClusterAccountCache(ctx, result)
	return
}

func (svc *ClusterAccountService) UpdateClusterAccount(ctx context.Context, requestInfo structs.RequestInfo, model dtos.ClusterAccountUpdate) (result dtos.ClusterAccountDetail, errorData common.ErrorData) {
	svc.init(ctx)
	model.Default(ctx)
	config2.Logger.Infof("operator: %s UpdateClusterAccount id: %s", config2.GetOperatorFromCtx(ctx), model.ID)
	errorData.Err = model.Validate(ctx)
	if errorData.IsNotNil() {
		errorData.MsgCode = config2.MsgCodeRequestDataInvalid
		config2.Logger.Errorf("operator: %s update ClusterAccount: %s failed, err: %s", config2.GetOperatorFromCtx(ctx), model.CsrName, errorData.Err.Error())
		return
	}
	old := svc.getClusterAccountForInvalidate(ctx, model.ID)
	result, errorData = svc.repo.UpdateClusterAccount(ctx, model)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("operator: %s update ClusterAccount: %s failed, err: %s", config2.GetOperatorFromCtx(ctx), model.CsrName, errorData.Err.Error())
		return
	}
	svc.invalidateClusterAccountCache(ctx, model.ID, old.ClusterId, old.AccountId)
	svc.writeClusterAccountCache(ctx, result)
	return
}

func (svc *ClusterAccountService) AddClusterAccount(ctx context.Context, requestInfo structs.RequestInfo, model dtos.ClusterAccountCreate) (result dtos.ClusterAccountDetail, errorData common.ErrorData) {
	svc.init(ctx)
	config2.Logger.Infof("operator: %s AddClusterAccount accountId: %s", config2.GetOperatorFromCtx(ctx), model.AccountId)
	model.Default(ctx)
	errorData.Err = model.Validate(ctx)
	if errorData.IsNotNil() {
		errorData.MsgCode = config2.MsgCodeRequestDataInvalid
		config2.Logger.Errorf("operator: %s create ClusterAccount: %s failed, err: %s", config2.GetOperatorFromCtx(ctx), model.AccountId, errorData.Err.Error())
		return
	}

	clusterSvc := ClusterService{}
	cluster, _ := clusterSvc.GetClusterByID(ctx, model.ClusterId)
	if len(cluster.ID) == 0 {
		errorData.MsgCode = config2.MsgCodeClusterIsNotFoundOrDisable
		errorData.Params = map[string]interface{}{"ClusterId": model.ClusterId}
		config2.Logger.Errorf("operator: %s is not match from token", config2.GetOperatorFromCtx(ctx))
		return
	}
	result, errorData = svc.repo.AddClusterAccount(ctx, model)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("operator: %s create ClusterAccount: %s failed, err: %s", config2.GetOperatorFromCtx(ctx), model.AccountId, errorData.Err.Error())
		return
	}
	svc.writeClusterAccountCache(ctx, result)
	return
}

func (svc *ClusterAccountService) DeleteClusterAccount(ctx context.Context, requestInfo structs.RequestInfo, ids []string) (errorData common.ErrorData) {
	svc.init(ctx)
	config2.Logger.Infof("operator: %s DeleteClusterAccount ids: [%+v]", config2.GetOperatorFromCtx(ctx), ids)
	idClusterAccountMap := make(map[string]dtos.ClusterAccountDetail, len(ids))
	for _, id := range ids {
		idClusterAccountMap[id] = svc.getClusterAccountForInvalidate(ctx, id)
	}
	errorData = svc.repo.DeleteClusterAccount(ctx, requestInfo.ClusterId, ids)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("operator: %s cluster: %s delete ClusterAccount by ids: %s failed, err: %s", config2.GetOperatorFromCtx(ctx), requestInfo.ClusterId, strings.Join(ids, ","), errorData.Err.Error())
		return
	}
	for _, id := range ids {
		old := idClusterAccountMap[id]
		svc.invalidateClusterAccountCache(ctx, id, old.ClusterId, old.AccountId)
	}
	return
}

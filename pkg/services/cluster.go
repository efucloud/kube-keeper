package services

import (
	"context"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/k8scluster"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/efucloud/kube-keeper/pkg/repositories"
	"net/http"
	"strings"

	"github.com/efucloud/common"
	"gorm.io/gorm"
)

type ClusterService struct {
	repo repositories.ClusterRepository
}

func (svc *ClusterService) cacheKeyByID(id string) string {
	return config2.CacheKey("cache", "cluster", "id", id)
}

func (svc *ClusterService) cacheKeyByCode(code string) string {
	return config2.CacheKey("cache", "cluster", "code", strings.ToLower(code))
}

func (svc *ClusterService) writeClusterCache(ctx context.Context, model dtos.ClusterDetail) {
	if len(model.ID) == 0 || len(model.Code) == 0 {
		return
	}
	ttl := config2.DefaultCacheTTL()
	setJSONCache(ctx, svc.cacheKeyByID(model.ID), model, ttl)
	setJSONCache(ctx, svc.cacheKeyByCode(model.Code), model, ttl)
}

func (svc *ClusterService) invalidateClusterCache(ctx context.Context, id, code string) {
	keys := make([]string, 0, 2)
	if id != "" {
		keys = append(keys, svc.cacheKeyByID(id))
	}
	if code != "" {
		keys = append(keys, svc.cacheKeyByCode(code))
	}
	deleteCacheKeys(ctx, keys...)
}

func (svc *ClusterService) getClusterCodeForInvalidate(ctx context.Context, id string) string {
	var cached dtos.ClusterDetail
	if getJSONCache(ctx, svc.cacheKeyByID(id), &cached) && cached.Code != "" {
		return cached.Code
	}
	result, errorData := svc.repo.GetClusterByID(ctx, id)
	if errorData.IsNotNil() {
		return ""
	}
	return result.Code
}

func (svc *ClusterService) init(ctx context.Context) {
	db, ok := ctx.Value(config2.ContextDBTx).(*gorm.DB)
	if ok {
		svc.repo = repositories.ClusterRepository{DB: db}
	} else {
		svc.repo = repositories.ClusterRepository{DB: config2.DBConnect}
	}
}

func (svc *ClusterService) GetClusterByID(ctx context.Context, id string) (result dtos.ClusterDetail, errorData common.ErrorData) {
	svc.init(ctx)
	if getJSONCache(ctx, svc.cacheKeyByID(id), &result) {
		config2.Logger.Debugf("cluster cache hit by id, id=%s, code=%s", id, result.Code)
		return result, errorData
	}
	result, errorData = svc.repo.GetClusterByID(ctx, id)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("operator: %s get Account by id: %s failed, err: %s", config2.GetOperatorFromCtx(ctx), id, errorData.Err.Error())
		return result, errorData
	}
	svc.writeClusterCache(ctx, result)
	return result, errorData
}
func (svc *ClusterService) GetClusterNumber(ctx context.Context) (number int64) {
	svc.init(ctx)
	return svc.repo.GetClusterNumber(ctx)
}
func (svc *ClusterService) GetAllClusters(ctx context.Context) (results dtos.ClusterDetailList, errorData common.ErrorData) {
	svc.init(ctx)
	page := 1
	size := 1000
	order := "id desc"
	query := ""
	var queryArgs []interface{}
	var records []*dtos.ClusterDetail

	for {
		r, e := svc.repo.ListCluster(ctx, page, size, order, query, queryArgs)
		if e.IsNotNil() {
			config2.Logger.Errorf("operator: %s list all clusters failed on page %d, err: %s", config2.GetOperatorFromCtx(ctx), page, e.Err.Error())
			errorData = e
			break
		}
		if len(r.Data) == 0 {
			// No more data, exit loop
			break
		}
		records = append(records, r.Data...)
		// Safety check: avoid infinite loop if Total is inaccurate
		if int64(len(records)) >= r.Total || len(r.Data) < size {
			break
		}
		page++
	}

	results.Data = records
	results.Total = int64(len(records))
	return results, errorData
}

func (svc *ClusterService) GetClusterByCode(ctx context.Context, cluster string) (result dtos.ClusterDetail, errorData common.ErrorData) {
	svc.init(ctx)
	if getJSONCache(ctx, svc.cacheKeyByCode(cluster), &result) {
		config2.Logger.Debugf("cluster cache hit by code, code=%s, id=%s", cluster, result.ID)
		return result, errorData
	}
	result, errorData = svc.repo.GetClusterByCode(ctx, cluster)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("operator: %s get Clusters by code: %s failed, err: %s", config2.GetOperatorFromCtx(ctx), cluster, errorData.Err.Error())
		return result, errorData
	}
	if len(result.ID) == 0 {
		errorData.ResponseCode = http.StatusNotFound
		errorData.MsgCode = config2.MsgCodeClusterIsNotFoundOrDisable
		errorData.Params = map[string]interface{}{"Cluster": cluster}
		config2.Logger.Warnf("operator: %s cluster not found or disabled, code: %s", config2.GetOperatorFromCtx(ctx), cluster)
		return
	}
	svc.writeClusterCache(ctx, result)
	return result, errorData
}

func (svc *ClusterService) GetAllSupportWebIdeClusters(ctx context.Context) (results []dtos.ClusterDetail) {
	svc.init(ctx)
	page := 1
	size := 1000
	for {
		res, err := svc.repo.GetAllSupportWebIdeClusters(ctx, page, size)
		if err.IsNotNil() {
			config2.Logger.Errorf("operator: %s fetch WebIDE clusters failed on page %d, err: %s", config2.GetOperatorFromCtx(ctx), page, err.Err.Error())
			break
		}
		if len(res.Data) == 0 {
			break
		}
		for _, c := range res.Data {
			results = append(results, *c)
		}
		if len(res.Data) < size {
			break // last page
		}
		page++
	}
	return results
}

func (svc *ClusterService) ListClusterByCodes(ctx context.Context, clusterCodes []string) (results dtos.ClusterDetailList, errorData common.ErrorData) {
	svc.init(ctx)
	results, errorData = svc.repo.ListClusterByCodes(ctx, clusterCodes)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("operator: %s list Cluster by codes: %+v failed, err: %s", config2.GetOperatorFromCtx(ctx), clusterCodes, errorData.Err.Error())
	}
	return results, errorData
}

func (svc *ClusterService) ListCluster(ctx context.Context, page, size int, order, query string, queryArgs []interface{}) (results dtos.ClusterDetailList, errorData common.ErrorData) {
	svc.init(ctx)
	results, errorData = svc.repo.ListCluster(ctx, page, size, order, query, queryArgs)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("operator: %s list ClusterId with query: [%s] queryArgs: [%+v] failed, err: %s", config2.GetOperatorFromCtx(ctx), query, queryArgs, errorData.Err.Error())
	}
	return results, errorData
}

func (svc *ClusterService) UpdateCluster(ctx context.Context, model dtos.ClusterUpdate) (result dtos.ClusterDetail, errorData common.ErrorData) {
	svc.init(ctx)

	model.Default(ctx)
	errorData.Err = model.Validate(ctx)
	if errorData.IsNotNil() {
		errorData.MsgCode = config2.MsgCodeRequestDataInvalid
		config2.Logger.Errorf("operator: %s update ClusterId: %s validation failed, err: %s", config2.GetOperatorFromCtx(ctx), model.Code, errorData.Err.Error())
		return
	}
	old, _ := svc.repo.GetClusterByID(ctx, model.ID)
	if len(model.Version.Platform) == 0 {
		model.Version = old.Version
	}
	if !model.UpdateConnect {
		model.ClientCertificate = old.ClientCertificate
		model.ClientKey = old.ClientKey
		model.CertificateAuthority = old.CertificateAuthority
	}

	result, errorData = svc.repo.UpdateCluster(ctx, model)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("operator: %s update ClusterId: %s failed, err: %s", config2.GetOperatorFromCtx(ctx), model.Code, errorData.Err.Error())
	} else {
		svc.invalidateClusterCache(ctx, old.ID, old.Code)
		svc.writeClusterCache(ctx, result)
		config2.Logger.Infof("operator: %s cluster updated successfully, id: %s", config2.GetOperatorFromCtx(ctx), result.ID)
		go k8scluster.InitClusterData(ctx, result)
	}
	return
}

func (svc *ClusterService) AddCluster(ctx context.Context, model dtos.ClusterCreate) (result dtos.ClusterDetail, errorData common.ErrorData) {
	svc.init(ctx)
	model.Default(ctx)
	errorData.Err = model.Validate(ctx)
	if errorData.IsNotNil() {
		errorData.MsgCode = config2.MsgCodeRequestDataInvalid
		config2.Logger.Errorf("operator: %s create ClusterId: %s validation failed, err: %s", config2.GetOperatorFromCtx(ctx), model.Code, errorData.Err.Error())
		return
	}
	result, errorData = svc.repo.AddCluster(ctx, model)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("operator: %s create ClusterId: %s failed, err: %s", config2.GetOperatorFromCtx(ctx), model.Code, errorData.Err.Error())
	} else {
		svc.writeClusterCache(ctx, result)
		config2.Logger.Infof("operator: %s cluster created successfully, id: %s", config2.GetOperatorFromCtx(ctx), result.ID)
		// todo 创建或更新内建权限
		go k8scluster.InitClusterData(ctx, result)
	}
	return
}

func (svc *ClusterService) ChangeStatusCluster(ctx context.Context, model dtos.ClusterStatus) (errorData common.ErrorData) {
	svc.init(ctx)

	model.Default(ctx)
	idCodeMap := make(map[string]string, len(model.Ids))
	for _, id := range model.Ids {
		idCodeMap[id] = svc.getClusterCodeForInvalidate(ctx, id)
	}
	errorData = svc.repo.ChangeStatusCluster(ctx, model)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("operator: %s change cluster status failed, err: %s", config2.GetOperatorFromCtx(ctx), errorData.Err.Error())
		return
	}
	for _, id := range model.Ids {
		svc.invalidateClusterCache(ctx, id, idCodeMap[id])
	}
	return
}

func (svc *ClusterService) DeleteCluster(ctx context.Context, ids []string) (errorData common.ErrorData) {
	svc.init(ctx)
	idCodeMap := make(map[string]string, len(ids))
	for _, id := range ids {
		idCodeMap[id] = svc.getClusterCodeForInvalidate(ctx, id)
	}
	errorData = svc.repo.DeleteCluster(ctx, ids)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("operator: %s delete ClusterId by id: %v failed, err: %s", config2.GetOperatorFromCtx(ctx), ids, errorData.Err.Error())
	} else {
		for _, id := range ids {
			svc.invalidateClusterCache(ctx, id, idCodeMap[id])
		}
		config2.Logger.Infof("operator: %s clusters deleted successfully, ids: %v", config2.GetOperatorFromCtx(ctx), ids)
	}
	return
}

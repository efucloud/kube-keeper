package repositories

import (
	"context"
	"github.com/efucloud/common"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/models"
	"github.com/efucloud/kube-keeper/pkg/models/daos"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/efucloud/kube-keeper/pkg/utils"
	"gorm.io/gorm"
	"net/http"
)

type ClusterNamespaceRepository struct {
	DB *gorm.DB
}

func (repo *ClusterNamespaceRepository) GetClusterNamespaceInfoByNamespace(ctx context.Context, cluster, namespace string) (result dtos.ClusterNamespaceDetail, errorData common.ErrorData) {
	errorData.Err = repo.DB.WithContext(ctx).Table(models.ClusterNamespaceTableName).Where("cluster_id = ? AND namespace = ?", cluster, namespace).Preload("Cluster").Find(&result).Error
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config2.MsgCodeGetRecordFailed
	}
	return
}

func (repo *ClusterNamespaceRepository) GetClusterNamespaceByID(ctx context.Context, id string) (result dtos.ClusterNamespaceDetail, errorData common.ErrorData) {
	errorData.Err = repo.DB.WithContext(ctx).Table(models.ClusterNamespaceTableName).Where("id = ? ", id).Preload("Cluster").Find(&result).Error
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config2.MsgCodeGetRecordFailed
	}
	return
}
func (repo *ClusterNamespaceRepository) GetClusterNamespaceByName(ctx context.Context, cluster, namespace string) (result dtos.ClusterNamespaceDetail, errorData common.ErrorData) {
	errorData.Err = repo.DB.WithContext(ctx).Table(models.ClusterNamespaceTableName).Where("cluster_id = ? AND namespace = ?", cluster, namespace).Find(&result).Error
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config2.MsgCodeGetRecordFailed
	}
	return
}
func (repo *ClusterNamespaceRepository) ListClusterNamespace(ctx context.Context, page, size int, order, query string, queryArgs []interface{}) (results dtos.ClusterNamespaceDetailList, errorData common.ErrorData) {
	db := repo.DB.WithContext(ctx).Table(models.ClusterNamespaceTableName)

	db = db.Where(query, queryArgs...)
	errorData.Err = db.Where("deleted_at is Null").Count(&results.Total).Error
	if errorData.IsNil() {
		if len(order) > 0 {
			db = db.Order(order)
		}
		errorData.Err = db.Offset((page - 1) * size).Limit(size).Preload("Cluster").Find(&results.Data).Error
	}
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config2.MsgCodeGetRecordFailed
	}
	return
}
func (repo *ClusterNamespaceRepository) AddClusterNamespace(ctx context.Context, model dtos.ClusterNamespaceCreate) (result dtos.ClusterNamespaceDetail, errorData common.ErrorData) {

	errorData.Err = repo.DB.WithContext(ctx).Table(models.ClusterNamespaceTableName).Create(&model).Scan(&result).Error
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config2.MsgCodeCreateRecordFailed
	}
	return result, errorData
}
func (repo *ClusterNamespaceRepository) DeleteClusterNamespace(ctx context.Context, clusterId, namespace string) (errorData common.ErrorData) {
	deleterId := config2.GetOperatorFromCtx(ctx)
	delFlag := utils.GenerateDatabaseId()
	_ = repo.DB.WithContext(ctx).Table(models.ClusterNamespaceTableName).Where("cluster_id = ?  AND namespace = ? AND del_flag = ?", clusterId, namespace, "active").UpdateColumns(map[string]interface{}{"deleter_id": deleterId, "del_flag": delFlag})
	errorData.Err = repo.DB.WithContext(ctx).Where("cluster_id = ?  AND namespace = ? AND  del_flag = ? ", clusterId, namespace, delFlag).Delete(&daos.ClusterNamespace{}).Error
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config2.MsgCodeDeleteRecordFailed
	}
	return
}
func (repo *ClusterNamespaceRepository) UpdateClusterNamespace(ctx context.Context, model dtos.ClusterNamespaceUpdate) (result dtos.ClusterNamespaceDetail, errorData common.ErrorData) {
	errorData.Err = repo.DB.WithContext(ctx).Table(models.ClusterNamespaceTableName).Where("id = ? ", model.ID).
		Updates(&model).Find(&result).Error
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config2.MsgCodeUpdateRecordFailed
	}
	return result, errorData
}

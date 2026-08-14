package repositories

import (
	"context"
	"fmt"
	"github.com/efucloud/common"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/models"
	daos2 "github.com/efucloud/kube-keeper/pkg/models/daos"
	dtos2 "github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/efucloud/kube-keeper/pkg/utils"
	"gorm.io/gorm"
	"net/http"
)

type ClusterRepository struct {
	DB *gorm.DB
}

func (repo *ClusterRepository) GetClusterByID(ctx context.Context, id string) (result dtos2.ClusterDetail, errorData common.ErrorData) {
	errorData.Err = repo.DB.WithContext(ctx).Table(models.ClusterTableName).Where(" id = ?", id).Find(&result).Error
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config2.MsgCodeGetRecordFailed
	} else if len(result.ID) == 0 {
		errorData.ResponseCode = http.StatusNotFound
		errorData.MsgCode = config2.MsgCodeClusterNotFound
	}
	return

}
func (repo *ClusterRepository) UpdateClusterVersion(ctx context.Context, cluster string, version dtos2.KubernetesVersion) (errorData common.ErrorData) {
	errorData.Err = repo.DB.WithContext(ctx).Table(models.ClusterTableName).Where("code = ?", cluster).Update("version", version).Error
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config2.MsgCodeGetRecordFailed
	}
	return
}
func (repo *ClusterRepository) GetClusterByCode(ctx context.Context, code string) (result dtos2.ClusterDetail, errorData common.ErrorData) {

	errorData.Err = repo.DB.WithContext(ctx).Table(models.ClusterTableName).Where("code = ?", code).Find(&result).Error
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config2.MsgCodeGetRecordFailed
	} else if len(result.ID) == 0 {
		errorData.ResponseCode = http.StatusNotFound
		errorData.MsgCode = config2.MsgCodeClusterNotFound
		errorData.Err = fmt.Errorf("not found cluster by code : %s", code)
	}
	return

}

func (repo *ClusterRepository) GetAllSupportWebIdeClusters(ctx context.Context, page, size int) (results dtos2.ClusterDetailList, errorData common.ErrorData) {
	errorData.Err = repo.DB.WithContext(ctx).Table(models.ClusterTableName).Where("web_ide = ?", common.Enable).Offset((page - 1) * size).Limit(size).Find(&results.Data).Error
	return

}

func (repo *ClusterRepository) GetClusterNumber(ctx context.Context) (number int64) {
	db := repo.DB.WithContext(ctx).Table(models.ClusterTableName)
	db.Where("deleted_at is Null").Count(&number)
	return number
}
func (repo *ClusterRepository) ListCluster(ctx context.Context, page, size int, order, query string, queryArgs []interface{}) (results dtos2.ClusterDetailList, errorData common.ErrorData) {
	db := repo.DB.WithContext(ctx).Table(models.ClusterTableName)

	db = db.Where(query, queryArgs...)
	errorData.Err = db.Where("deleted_at is Null").Count(&results.Total).Error
	if errorData.IsNil() {
		if len(order) > 0 {
			db = db.Order(order)
		}
		errorData.Err = db.Offset((page - 1) * size).Limit(size).Find(&results.Data).Error
	}
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config2.MsgCodeGetRecordFailed
	}
	return
}

func (repo *ClusterRepository) ListClusterByCodes(ctx context.Context, codes []string) (results dtos2.ClusterDetailList, errorData common.ErrorData) {
	db := repo.DB.WithContext(ctx).Table(models.ClusterTableName)

	errorData.Err = db.Where("code IN (?)", codes).Find(&results.Data).Error

	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config2.MsgCodeGetRecordFailed
	}
	return
}
func (repo *ClusterRepository) AddCluster(ctx context.Context, model dtos2.ClusterCreate) (result dtos2.ClusterDetail, errorData common.ErrorData) {
	errorData.Err = repo.DB.WithContext(ctx).Table(models.ClusterTableName).Create(&model).Scan(&result).Error
	if errorData.IsNotNil() {

		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config2.MsgCodeCreateRecordFailed
	}

	return result, errorData
}
func (repo *ClusterRepository) DeleteCluster(ctx context.Context, ids []string) (errorData common.ErrorData) {
	deleterId := config2.GetOperatorFromCtx(ctx)
	delFlag := utils.GenerateDatabaseId()
	_ = repo.DB.WithContext(ctx).Table(models.ClusterTableName).Where(" id IN (?) AND del_flag = ?", ids, "active").UpdateColumns(map[string]interface{}{"deleter_id": deleterId, "del_flag": delFlag})
	errorData.Err = repo.DB.WithContext(ctx).Where(" id IN (?) AND del_flag = ?", ids, delFlag).Delete(&daos2.Cluster{}).Error
	if errorData.IsNotNil() {
		errorData = daos2.ParserDatabaseError(ctx, errorData)
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config2.MsgCodeDeleteRecordFailed
	}
	return errorData
}

func (repo *ClusterRepository) ChangeStatusCluster(ctx context.Context, model dtos2.ClusterStatus) (errorData common.ErrorData) {
	columns := make(map[string]interface{})
	columns["enable"] = model.Enable
	columns["updated_at"] = model.UpdatedAt
	columns["updater_id"] = config2.GetOperatorFromCtx(ctx)
	errorData.Err = repo.DB.WithContext(ctx).Table(models.ClusterTableName).Where("id IN (?)", model.Ids).
		UpdateColumns(columns).Error
	if errorData.IsNotNil() {

		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config2.MsgCodeUpdateRecordFailed
	} else {
		//todo 多条更新
	}
	return
}

func (repo *ClusterRepository) UpdateCluster(ctx context.Context, model dtos2.ClusterUpdate) (result dtos2.ClusterDetail, errorData common.ErrorData) {
	errorData.Err = repo.DB.WithContext(ctx).Table(models.ClusterTableName).Where("id = ? ", model.ID).
		Updates(&model).Find(&result).Error
	if errorData.IsNotNil() {

		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config2.MsgCodeUpdateRecordFailed
	}
	return result, errorData
}

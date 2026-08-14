package repositories

import (
	"context"
	"github.com/efucloud/common"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/models"
	daos2 "github.com/efucloud/kube-keeper/pkg/models/daos"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/efucloud/kube-keeper/pkg/utils"
	"gorm.io/gorm"
	"net/http"
	"time"
)

type ClusterAccountRepository struct {
	DB *gorm.DB
}

func (repo *ClusterAccountRepository) GetClusterAccountInfoByAccountID(ctx context.Context, clusterId, accountId string) (result dtos.ClusterAccountDetail, errorData common.ErrorData) {
	errorData.Err = repo.DB.WithContext(ctx).Table(models.ClusterAccountTableName).Where("cluster_id = ? AND account_id = ? ", clusterId, accountId).Preload("Account").Find(&result).Error
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config2.MsgCodeGetRecordFailed
	}
	return
}

func (repo *ClusterAccountRepository) GetClusterAccountByID(ctx context.Context, id string) (result dtos.ClusterAccountDetail, errorData common.ErrorData) {
	errorData.Err = repo.DB.WithContext(ctx).Table(models.ClusterAccountTableName).Where("id = ? ", id).Preload("Account").Find(&result).Error
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config2.MsgCodeGetRecordFailed
	}
	return
}

func (repo *ClusterAccountRepository) ListClusterAccount(ctx context.Context, page, size int, order, query string, queryArgs []interface{}) (results dtos.ClusterAccountDetailList, errorData common.ErrorData) {
	db := repo.DB.WithContext(ctx).Table(models.ClusterAccountTableName)

	db = db.Where(query, queryArgs...)
	errorData.Err = db.Where("deleted_at is Null").Count(&results.Total).Error
	if errorData.IsNil() {
		if len(order) > 0 {
			db = db.Order(order)
		}
		errorData.Err = db.Offset((page - 1) * size).Limit(size).Preload("Account").Find(&results.Data).Error
	}
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config2.MsgCodeGetRecordFailed
	}
	results.Total = int64(len(results.Data))
	return
}
func (repo *ClusterAccountRepository) AddClusterAccount(ctx context.Context, model dtos.ClusterAccountCreate) (result dtos.ClusterAccountDetail, errorData common.ErrorData) {

	errorData.Err = repo.DB.WithContext(ctx).Table(models.ClusterAccountTableName).Create(&model).Preload("Account").Scan(&result).Error
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config2.MsgCodeCreateRecordFailed
	}
	return result, errorData
}

func (repo *ClusterAccountRepository) DeleteSupperClusterAccount(ctx context.Context, clusterId string, ids []string) (errorData common.ErrorData) {
	deleterId := config2.GetOperatorFromCtx(ctx)
	delFlag := utils.GenerateDatabaseId()
	_ = repo.DB.WithContext(ctx).Table(models.ClusterAccountTableName).Where("cluster_id = ? AND id IN (?) AND is_supper = ? AND del_flag = ?", clusterId, ids, true, "active").UpdateColumns(map[string]interface{}{"deleter_id": deleterId, "del_flag": delFlag})
	errorData.Err = repo.DB.WithContext(ctx).Where("cluster_id = ? AND  id IN (?)  AND is_supper = ? AND del_flag = ?", clusterId, ids, true, delFlag).Delete(&daos2.ClusterAccount{}).Error
	if errorData.IsNotNil() {
		errorData = daos2.ParserDatabaseError(ctx, errorData)
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config2.MsgCodeDeleteRecordFailed
	}
	return errorData

}
func (repo *ClusterAccountRepository) DeleteClusterAccountByAccountId(ctx context.Context, clusterId string, accountIds []string) (errorData common.ErrorData) {
	deleterId := config2.GetOperatorFromCtx(ctx)
	delFlag := utils.GenerateDatabaseId()
	_ = repo.DB.WithContext(ctx).Table(models.ClusterAccountTableName).Where("cluster_id = ?  AND account_id IN (?) AND is_supper = ? AND del_flag = ?", clusterId, accountIds, false, "active").UpdateColumns(map[string]interface{}{"deleter_id": deleterId, "del_flag": delFlag})
	errorData.Err = repo.DB.WithContext(ctx).Where("cluster_id = ? AND  account_id IN (?)  AND is_supper = ? AND del_flag = ?", clusterId, accountIds, false, delFlag).Delete(&daos2.ClusterAccount{}).Error
	if errorData.IsNotNil() {
		errorData = daos2.ParserDatabaseError(ctx, errorData)
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config2.MsgCodeDeleteRecordFailed
	}
	return errorData
}
func (repo *ClusterAccountRepository) DeleteClusterAccount(ctx context.Context, clusterId string, ids []string) (errorData common.ErrorData) {
	deleterId := config2.GetOperatorFromCtx(ctx)
	delFlag := utils.GenerateDatabaseId()
	_ = repo.DB.WithContext(ctx).Table(models.ClusterAccountTableName).Where("cluster_id = ? AND id IN (?) AND is_supper = ? AND del_flag = ?", clusterId, ids, false, "active").UpdateColumns(map[string]interface{}{"deleter_id": deleterId, "del_flag": delFlag})
	errorData.Err = repo.DB.WithContext(ctx).Where("cluster_id = ? AND id IN (?) AND is_supper = ? AND del_flag = ?", clusterId, ids, false, delFlag).Delete(&daos2.ClusterAccount{}).Error
	if errorData.IsNotNil() {
		errorData = daos2.ParserDatabaseError(ctx, errorData)
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config2.MsgCodeDeleteRecordFailed
	}
	return errorData
}
func (repo *ClusterAccountRepository) UpdateClusterAccount(ctx context.Context, model dtos.ClusterAccountUpdate) (result dtos.ClusterAccountDetail, errorData common.ErrorData) {
	errorData.Err = repo.DB.WithContext(ctx).Table(models.ClusterAccountTableName).Where("id = ? ", model.ID).Preload("Account").
		Updates(&model).Find(&result).Error
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config2.MsgCodeUpdateRecordFailed
	}
	return result, errorData
}

func (repo *ClusterAccountRepository) SetClusterAccountSupper(ctx context.Context, clusterId, accountId, updaterId string) (errorData common.ErrorData) {
	model := make(map[string]interface{})
	model["updater_id"] = updaterId
	model["updated_at"] = time.Now()
	model["is_supper"] = true
	errorData.Err = repo.DB.WithContext(ctx).Table(models.ClusterAccountTableName).Where("cluster_id = ? AND account_id = ? ", clusterId, accountId).
		Updates(&model).Error
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config2.MsgCodeUpdateRecordFailed
	}
	return errorData
}

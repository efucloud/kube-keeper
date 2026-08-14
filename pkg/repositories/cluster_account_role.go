package repositories

import (
	"context"
	"fmt"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/models"
	daos2 "github.com/efucloud/kube-keeper/pkg/models/daos"
	dtos2 "github.com/efucloud/kube-keeper/pkg/models/dtos"
	"net/http"

	"github.com/efucloud/common"
	"github.com/efucloud/kube-keeper/pkg/utils"
	"gorm.io/gorm"
)

type ClusterAccountRoleRepository struct {
	DB *gorm.DB
}

func (repo *ClusterAccountRoleRepository) GetClusterAccountRoleByAccountIdAndRoleName(ctx context.Context, clusterId, accountId, roleName string) (result dtos2.ClusterAccountRoleDetail, errorData common.ErrorData) {
	errorData.Err = repo.DB.WithContext(ctx).Table(models.ClusterAccountRoleTableName).Where("cluster_id = ?  AND account_id = ? AND role_name = ?", clusterId, accountId, roleName).Find(&result).Error
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config2.MsgCodeGetRecordFailed
	} else if len(result.ID) == 0 {
		errorData.MsgCode = config2.MsgCodeGetRecordFailed
		errorData.ResponseCode = http.StatusNotFound
		errorData.Err = fmt.Errorf("not found cluster account role by account id: %s and role name: %s", accountId, roleName)
	}
	return
}
func (repo *ClusterAccountRoleRepository) GetClusterAccountRoleById(ctx context.Context, id string) (result dtos2.ClusterAccountRoleDetail, errorData common.ErrorData) {
	errorData.Err = repo.DB.WithContext(ctx).Table(models.ClusterAccountRoleTableName).Preload("Account").Preload("Creator").Where("organization_id = ?  AND id = ?", id).Find(&result).Error
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config2.MsgCodeGetRecordFailed
	} else if len(result.ID) == 0 {
		errorData.MsgCode = config2.MsgCodeGetRecordFailed
		errorData.ResponseCode = http.StatusNotFound
		errorData.Err = fmt.Errorf("not found cluster account role by id: %s", id)

	}
	return
}

func (repo *ClusterAccountRoleRepository) DeleteClusterAccountRoleByAccountId(ctx context.Context, clusterId, accountId string) (errorData common.ErrorData) {
	deleterId := config2.GetOperatorFromCtx(ctx)
	delFlag := utils.GenerateDatabaseId()
	_ = repo.DB.WithContext(ctx).Table(models.ClusterAccountRoleTableName).Where("cluster_id = ? AND account_id = ? AND del_flag = ? ", clusterId, accountId, "active").UpdateColumns(map[string]interface{}{"deleter_id": deleterId, "del_flag": delFlag})
	errorData.Err = repo.DB.WithContext(ctx).Where("cluster_id = ? AND account_id = ? AND del_flag = ? ", clusterId, accountId, delFlag).Delete(&daos2.ClusterAccountRole{}).Error
	if errorData.IsNotNil() {
		errorData = daos2.ParserDatabaseError(ctx, errorData)

		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config2.MsgCodeDeleteRecordFailed
	}
	return errorData
}
func (repo *ClusterAccountRoleRepository) ListClusterAccountRoleByAccountId(ctx context.Context, accountId string) (results dtos2.ClusterAccountRoleDetailList) {
	db := repo.DB.WithContext(ctx).Table(models.ClusterAccountRoleTableName)
	db.Where("account_id = ? AND deleted_at is Null", accountId).Find(&results.Data)
	return
}
func (repo *ClusterAccountRoleRepository) ListClusterAccountRole(ctx context.Context, current, pageSize int, order, query string, queryArgs []interface{}) (results dtos2.ClusterAccountRoleDetailList, errorData common.ErrorData) {
	db := repo.DB.WithContext(ctx).Table(models.ClusterAccountRoleTableName)
	if len(query) > 0 {
		db = db.Where(query, queryArgs...)
	}
	errorData.Err = db.Where("deleted_at is Null").Count(&results.Total).Error
	if errorData.IsNil() {
		if len(order) > 0 {
			db = db.Order(order)
		}
		var data []*dtos2.ClusterAccountRoleDetail
		errorData.Err = db.Offset((current - 1) * pageSize).Limit(pageSize).Preload("Account").Find(&data).Error
		if errorData.IsNil() {
			results.Data = data
		}
	} else {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config2.MsgCodeGetRecordFailed
	}
	return
}

func (repo *ClusterAccountRoleRepository) AddClusterAccountRole(ctx context.Context, model dtos2.ClusterAccountRoleCreate) (result dtos2.ClusterAccountRoleDetail, errorData common.ErrorData) {

	repo.DeleteClusterAccountRoleByHash(ctx, model.Hash)
	errorData.Err = repo.DB.WithContext(ctx).Table(models.ClusterAccountRoleTableName).Save(&model).Scan(&result).Error
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config2.MsgCodeCreateRecordFailed
	}
	return result, errorData
}

func (repo *ClusterAccountRoleRepository) DeleteClusterAccountRoleByHash(ctx context.Context, hash string) (errorData common.ErrorData) {
	deleterId := config2.GetOperatorFromCtx(ctx)
	delFlag := utils.GenerateDatabaseId()
	_ = repo.DB.WithContext(ctx).Table(models.ClusterAccountRoleTableName).Where("hash = ? AND del_flag = ?", hash, "active").UpdateColumns(map[string]interface{}{"deleter_id": deleterId, "del_flag": delFlag})
	errorData.Err = repo.DB.WithContext(ctx).Where("hash = ? AND del_flag = ?", hash, delFlag).Delete(&daos2.ClusterAccountRole{}).Error
	if errorData.IsNotNil() {
		errorData = daos2.ParserDatabaseError(ctx, errorData)
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config2.MsgCodeDeleteRecordFailed
	}
	return errorData
}
func (repo *ClusterAccountRoleRepository) DeleteClusterAccountRole(ctx context.Context, ids []string) (errorData common.ErrorData) {
	deleterId := config2.GetOperatorFromCtx(ctx)
	delFlag := utils.GenerateDatabaseId()
	_ = repo.DB.WithContext(ctx).Table(models.ClusterAccountRoleTableName).Where("id IN (?)  AND del_flag = ?", ids, "active").UpdateColumns(map[string]interface{}{"deleter_id": deleterId, "del_flag": delFlag})
	errorData.Err = repo.DB.WithContext(ctx).Where(" id IN (?)  AND del_flag = ?", ids, delFlag).Delete(&daos2.ClusterAccountRole{}).Error
	if errorData.IsNotNil() {
		errorData = daos2.ParserDatabaseError(ctx, errorData)

		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config2.MsgCodeDeleteRecordFailed
	}
	return errorData
}
func (repo *ClusterAccountRoleRepository) ChangeStatus(ctx context.Context, model dtos2.Status) (errorData common.ErrorData) {
	columns := make(map[string]interface{})
	columns["enable"] = model.Enable
	columns["updated_at"] = model.UpdatedAt
	columns["updater_id"] = config2.GetOperatorFromCtx(ctx)
	errorData.Err = repo.DB.WithContext(ctx).Table(models.ClusterAccountRoleTableName).Where("id IN (?)", model.Ids).
		UpdateColumns(columns).Error
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config2.MsgCodeUpdateRecordFailed
	}
	return
}

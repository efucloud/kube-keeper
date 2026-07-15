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

type ClusterNamespaceAccountRoleRepository struct {
	DB *gorm.DB
}

func (repo *ClusterNamespaceAccountRoleRepository) GetClusterNamespaceAccountRoleById(ctx context.Context, id string) (result dtos2.ClusterNamespaceAccountRoleDetail, errorData common.ErrorData) {
	errorData.Err = repo.DB.WithContext(ctx).Table(models.ClusterNamespaceAccountRoleTableName).Where("organization_id = ?  AND id = ?", id).Find(&result).Error
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config2.MsgCodeGetRecordFailed
	} else if len(result.ID) == 0 {
		errorData.MsgCode = config2.MsgCodeGetRecordFailed
		errorData.ResponseCode = http.StatusNotFound
		errorData.Err = fmt.Errorf("not found workspace by id: %s", id)

	}
	return
}

func (repo *ClusterNamespaceAccountRoleRepository) ListClusterNamespaceAccountRole(ctx context.Context, current, pageSize int, order, query string, queryArgs []interface{}) (results dtos2.ClusterNamespaceAccountRoleDetailList, errorData common.ErrorData) {
	db := repo.DB.WithContext(ctx).Table(models.ClusterNamespaceAccountRoleTableName)

	if len(query) > 0 {
		db = db.Where(query, queryArgs...)
	}
	errorData.Err = db.Where("deleted_at is Null").Count(&results.Total).Error
	if errorData.IsNil() {
		if len(order) > 0 {
			db = db.Order(order)
		}
		errorData.Err = db.Offset((current - 1) * pageSize).Limit(pageSize).Preload("Account").Find(&results.Data).Error
	} else {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config2.MsgCodeGetRecordFailed
	}
	return
}

func (repo *ClusterNamespaceAccountRoleRepository) ListClusterNamespaceAccountRoleRoleByAccountId(ctx context.Context, clusterId, accountId string) (results dtos2.ClusterNamespaceAccountRoleDetailList) {
	db := repo.DB.WithContext(ctx).Table(models.ClusterAccountRoleTableName)
	db.Where("cluster_id = ? AND account_id = ? AND deleted_at is Null", clusterId, accountId).Find(&results.Data)
	return
}
func (repo *ClusterNamespaceAccountRoleRepository) AddClusterNamespaceAccountRole(ctx context.Context, model dtos2.ClusterNamespaceAccountRoleCreate) (result dtos2.ClusterNamespaceAccountRoleDetail, errorData common.ErrorData) {

	repo.DeleteClusterNamespaceAccountRoleByHash(ctx, model.Hash)
	errorData.Err = repo.DB.WithContext(ctx).Table(models.ClusterNamespaceAccountRoleTableName).Save(&model).Scan(&result).Error
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config2.MsgCodeCreateRecordFailed
	}
	return result, errorData
}
func (repo *ClusterNamespaceAccountRoleRepository) DeleteClusterNamespaceAccountRoleByHash(ctx context.Context, hash string) (errorData common.ErrorData) {
	deleterId := config2.GetOperatorFromCtx(ctx)
	delFlag := utils.GenerateDatabaseId()
	_ = repo.DB.WithContext(ctx).Table(models.ClusterNamespaceAccountRoleTableName).Where("hash = ? AND del_flag = ? ",
		hash, "active").UpdateColumns(map[string]interface{}{"deleter_id": deleterId, "del_flag": delFlag})
	errorData.Err = repo.DB.WithContext(ctx).Where("hash = ?AND del_flag = ? ",
		hash, delFlag).Delete(&daos2.ClusterNamespaceAccountRole{}).Error
	if errorData.IsNotNil() {
		errorData = daos2.ParserDatabaseError(ctx, errorData)
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config2.MsgCodeDeleteRecordFailed
	}
	return errorData
}
func (repo *ClusterNamespaceAccountRoleRepository) DeleteClusterNamespaceAccountRoleByAccountId(ctx context.Context, clusterId, namespace, accountId string) (errorData common.ErrorData) {
	deleterId := config2.GetOperatorFromCtx(ctx)
	delFlag := utils.GenerateDatabaseId()
	_ = repo.DB.WithContext(ctx).Table(models.ClusterNamespaceAccountRoleTableName).Where("cluster_id = ? AND namespace = ? AND account_id = ? AND del_flag = ?",
		clusterId, namespace, accountId, "active").UpdateColumns(map[string]interface{}{"deleter_id": deleterId, "del_flag": delFlag})
	errorData.Err = repo.DB.WithContext(ctx).Where("cluster_id = ? AND namespace = ?  AND account_id = ? AND del_flag = ?",
		clusterId, namespace, accountId, delFlag).Delete(&daos2.ClusterNamespaceAccountRole{}).Error
	if errorData.IsNotNil() {
		errorData = daos2.ParserDatabaseError(ctx, errorData)
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config2.MsgCodeDeleteRecordFailed
	}
	return errorData
}
func (repo *ClusterNamespaceAccountRoleRepository) DeleteClusterNamespaceAccountRole(ctx context.Context, clusterId, namespace string, ids []string) (errorData common.ErrorData) {
	deleterId := config2.GetOperatorFromCtx(ctx)
	delFlag := utils.GenerateDatabaseId()
	_ = repo.DB.WithContext(ctx).Table(models.ClusterNamespaceAccountRoleTableName).Where("cluster_id = ? AND namespace = ? AND id IN (?) AND del_flag = ?",
		clusterId, namespace, ids, "active").UpdateColumns(map[string]interface{}{"deleter_id": deleterId, "del_flag": delFlag})
	errorData.Err = repo.DB.WithContext(ctx).Where("cluster_id = ? AND namespace = ? AND id IN (?) AND del_flag = ?",
		clusterId, namespace, ids, delFlag).Delete(&daos2.ClusterNamespaceAccountRole{}).Error
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config2.MsgCodeDeleteRecordFailed
	}
	return
}
func (repo *ClusterNamespaceAccountRoleRepository) DeleteClusterNamespaceAccountRoleByNamespace(ctx context.Context, clusterId, namespace string) (errorData common.ErrorData) {
	deleterId := config2.GetOperatorFromCtx(ctx)
	delFlag := utils.GenerateDatabaseId()
	_ = repo.DB.WithContext(ctx).Table(models.ClusterNamespaceAccountRoleTableName).Where("cluster_id = ? AND namespace = ? AND del_flag = ? ",
		clusterId, namespace, "active").UpdateColumns(map[string]interface{}{"deleter_id": deleterId, "del_flag": delFlag})
	errorData.Err = repo.DB.WithContext(ctx).Where("cluster_id = ? AND namespace = ? AND del_flag = ?",
		clusterId, namespace, delFlag).Delete(&daos2.ClusterNamespaceAccountRole{}).Error
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config2.MsgCodeDeleteRecordFailed
	}
	return
}

func (repo *ClusterNamespaceAccountRoleRepository) ChangeStatus(ctx context.Context, model dtos2.Status) (errorData common.ErrorData) {
	columns := make(map[string]interface{})
	columns["enable"] = model.Enable
	columns["updated_at"] = model.UpdatedAt
	columns["updater_id"] = config2.GetOperatorFromCtx(ctx)
	errorData.Err = repo.DB.WithContext(ctx).Table(models.ClusterNamespaceAccountRoleTableName).Where("id IN (?)", model.Ids).
		UpdateColumns(columns).Error
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config2.MsgCodeUpdateRecordFailed
	}
	return
}

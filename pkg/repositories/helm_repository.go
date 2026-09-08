package repositories

import (
	"context"
	"net/http"

	"github.com/efucloud/common"
	"github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/models"
	"github.com/efucloud/kube-keeper/pkg/models/daos"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	"gorm.io/gorm"
)

type HelmRepositoryRepository struct{ DB *gorm.DB }

func (repo HelmRepositoryRepository) List(ctx context.Context, current, pageSize int) (result dtos.HelmRepositoryDetailList, errorData common.ErrorData) {
	query := repo.DB.WithContext(ctx).Table(models.HelmRepositoryTableName).Where("deleted_at IS NULL")
	if current < 1 {
		current = 1
	}
	if pageSize < 1 {
		pageSize = 20
	}
	if pageSize > 200 {
		pageSize = 200
	}
	if errorData.Err = query.Count(&result.Total).Error; errorData.IsNil() {
		errorData.Err = query.Order("name ASC").Offset((current - 1) * pageSize).Limit(pageSize).Find(&result.Data).Error
	}
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config.MsgCodeGetRecordFailed
	}
	return
}

func (repo HelmRepositoryRepository) Get(ctx context.Context, id string) (result dtos.HelmRepositoryDetail, errorData common.ErrorData) {
	errorData.Err = repo.DB.WithContext(ctx).Table(models.HelmRepositoryTableName).Where("id = ? AND deleted_at IS NULL", id).Take(&result).Error
	if errorData.Err == gorm.ErrRecordNotFound {
		errorData.ResponseCode = http.StatusNotFound
		errorData.MsgCode = config.MsgCodeRecordNotExist
	}
	return
}

func (repo HelmRepositoryRepository) Add(ctx context.Context, model dtos.HelmRepositoryCreate) (dtos.HelmRepositoryDetail, common.ErrorData) {
	errorData := common.ErrorData{Err: repo.DB.WithContext(ctx).Table(models.HelmRepositoryTableName).Create(&model).Error}
	if errorData.IsNotNil() {
		errorData = daos.ParserDatabaseError(ctx, errorData)
		errorData.MsgCode = config.MsgCodeCreateRecordFailed
		return dtos.HelmRepositoryDetail{}, errorData
	}
	return repo.Get(ctx, model.ID)
}

func (repo HelmRepositoryRepository) Update(ctx context.Context, model dtos.HelmRepositoryUpdate) (dtos.HelmRepositoryDetail, common.ErrorData) {
	updates := map[string]interface{}{"updated_at": model.UpdatedAt, "updater_id": model.UpdaterID, "name": model.Name, "url": model.URL, "username": model.Username, "insecure_skip_tls_verify": model.InsecureSkipTLSVerify, "enabled": model.Enabled}
	if model.Password != "" {
		updates["password"] = model.Password
	}
	tx := repo.DB.WithContext(ctx).Table(models.HelmRepositoryTableName).Where("id = ? AND deleted_at IS NULL", model.ID).Updates(updates)
	errorData := common.ErrorData{Err: tx.Error}
	if errorData.IsNil() && tx.RowsAffected == 0 {
		errorData.Err = gorm.ErrRecordNotFound
		errorData.ResponseCode = http.StatusNotFound
		errorData.MsgCode = config.MsgCodeRecordNotExist
		return dtos.HelmRepositoryDetail{}, errorData
	}
	if errorData.IsNotNil() {
		errorData.MsgCode = config.MsgCodeUpdateRecordFailed
		return dtos.HelmRepositoryDetail{}, errorData
	}
	return repo.Get(ctx, model.ID)
}

func (repo HelmRepositoryRepository) Delete(ctx context.Context, ids []string) (errorData common.ErrorData) {
	if len(ids) == 0 {
		return
	}
	errorData.Err = repo.DB.WithContext(ctx).Unscoped().Where("id IN ?", ids).Delete(&daos.HelmRepository{}).Error
	if errorData.IsNotNil() {
		errorData.MsgCode = config.MsgCodeDeleteRecordFailed
	}
	return
}

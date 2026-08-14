package repositories

import (
	"context"
	"fmt"
	"net/http"

	"github.com/efucloud/common"
	"github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/models"
	"github.com/efucloud/kube-keeper/pkg/models/daos"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/efucloud/kube-keeper/pkg/utils"
	"gorm.io/gorm"
)

type MarketApplicationRepository struct {
	DB *gorm.DB
}

func (repo *MarketApplicationRepository) GetMarketApplicationByVersion(ctx context.Context, applicationId, version string) (result dtos.MarketApplicationDetail, errorData common.ErrorData) {
	errorData.Err = repo.DB.WithContext(ctx).Table(models.MarketApplicationTableName).
		Where("application_id = ? AND version = ?", applicationId, version).Find(&result).Error
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config.MsgCodeGetRecordFailed
	} else if len(result.ID) == 0 {
		errorData.MsgCode = config.MsgCodeRecordNotExist
		errorData.ResponseCode = http.StatusNotFound
		errorData.Err = fmt.Errorf("not found market application version by application: %s version: %s", applicationId, version)
	}
	return
}

func (repo *MarketApplicationRepository) GetMarketApplicationById(ctx context.Context, id string) (result dtos.MarketApplicationDetail, errorData common.ErrorData) {
	errorData.Err = repo.DB.WithContext(ctx).Table(models.MarketApplicationTableName).Where("id = ?", id).Find(&result).Error
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config.MsgCodeGetRecordFailed
	} else if len(result.ID) == 0 {
		errorData.MsgCode = config.MsgCodeRecordNotExist
		errorData.ResponseCode = http.StatusNotFound
		errorData.Err = fmt.Errorf("not found market application version by id: %s", id)
	}
	return
}

func (repo *MarketApplicationRepository) ListMarketApplication(ctx context.Context, current, pageSize int, order, query string, queryArgs []interface{}) (results dtos.MarketApplicationDetailList, errorData common.ErrorData) {
	db := repo.DB.WithContext(ctx).Table(models.MarketApplicationTableName)
	if len(query) > 0 {
		db = db.Where(query, queryArgs...)
	}
	errorData.Err = db.Where("deleted_at is Null").Count(&results.Total).Error
	if errorData.IsNil() {
		if len(order) > 0 {
			db = db.Order(order)
		}
		errorData.Err = db.Offset((current - 1) * pageSize).Limit(pageSize).Find(&results.Data).Error
	}
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config.MsgCodeGetRecordFailed
	}
	return
}

func (repo *MarketApplicationRepository) ListMarketApplicationExportByIds(ctx context.Context, applicationId string, ids []string) (results []*dtos.MarketApplicationExportImport, errorData common.ErrorData) {
	errorData.Err = repo.DB.WithContext(ctx).Table(models.MarketApplicationTableName).
		Where("application_id = ? AND id IN (?)", applicationId, ids).Find(&results).Error
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config.MsgCodeGetRecordFailed
	}
	return
}

func (repo *MarketApplicationRepository) AddMarketApplication(ctx context.Context, model dtos.MarketApplicationCreate) (result dtos.MarketApplicationDetail, errorData common.ErrorData) {
	errorData.Err = repo.DB.WithContext(ctx).Table(models.MarketApplicationTableName).Create(&model).Scan(&result).Error
	if errorData.IsNotNil() {
		errorData = daos.ParserDatabaseError(ctx, errorData)
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config.MsgCodeCreateRecordFailed
	}
	return
}

func (repo *MarketApplicationRepository) UpdateMarketApplicationState(ctx context.Context, model dtos.ApplicationState) (errorData common.ErrorData) {
	errorData.Err = repo.DB.WithContext(ctx).Table(models.MarketApplicationTableName).
		Where("application_id = ? AND id = ?", model.ApplicationId, model.VersionId).
		Update("state", model.State).Error
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config.MsgCodeUpdateRecordFailed
	}
	return
}

func (repo *MarketApplicationRepository) UpdateMarketApplication(ctx context.Context, model dtos.MarketApplicationUpdate) (result dtos.MarketApplicationDetail, errorData common.ErrorData) {
	errorData.Err = repo.DB.WithContext(ctx).Table(models.MarketApplicationTableName).
		Where("id = ?", model.ID).Model(&model).Updates(&model).Error
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config.MsgCodeUpdateRecordFailed
		return
	}
	_ = repo.DB.WithContext(ctx).Table(models.MarketApplicationTableName).Where("id = ?", model.ID).Find(&result).Error
	return
}

func (repo *MarketApplicationRepository) DeleteMarketApplication(ctx context.Context, ids []string) (errorData common.ErrorData) {
	deleterId := config.GetOperatorFromCtx(ctx)
	delFlag := utils.GenerateDatabaseId()
	_ = repo.DB.WithContext(ctx).Table(models.MarketApplicationTableName).
		Where("id IN (?) AND del_flag = ?", ids, "active").
		UpdateColumns(map[string]interface{}{"deleter_id": deleterId, "del_flag": delFlag})
	errorData.Err = repo.DB.WithContext(ctx).
		Where("id IN (?) AND del_flag = ?", ids, delFlag).
		Delete(&daos.MarketApplication{}).Error
	if errorData.IsNotNil() {
		errorData = daos.ParserDatabaseError(ctx, errorData)
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config.MsgCodeDeleteRecordFailed
	}
	return
}

func (repo *MarketApplicationRepository) DeleteMarketApplicationByApplicationId(ctx context.Context, applicationId string) (errorData common.ErrorData) {
	deleterId := config.GetOperatorFromCtx(ctx)
	delFlag := utils.GenerateDatabaseId()
	_ = repo.DB.WithContext(ctx).Table(models.MarketApplicationTableName).
		Where("application_id = ? AND del_flag = ?", applicationId, "active").
		UpdateColumns(map[string]interface{}{"deleter_id": deleterId, "del_flag": delFlag})
	errorData.Err = repo.DB.WithContext(ctx).
		Where("application_id = ? AND del_flag = ?", applicationId, delFlag).
		Delete(&daos.MarketApplication{}).Error
	if errorData.IsNotNil() {
		errorData = daos.ParserDatabaseError(ctx, errorData)
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config.MsgCodeDeleteRecordFailed
	}
	return
}

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

type MarketApplicationRepository struct{ DB *gorm.DB }

func (repo *MarketApplicationRepository) Get(ctx context.Context, id string) (result dtos.MarketApplicationDetail, errorData common.ErrorData) {
	errorData.Err = repo.DB.WithContext(ctx).Table(models.MarketApplicationTableName).
		Where("id = ? AND deleted_at IS NULL", id).Take(&result).Error
	if errorData.Err == gorm.ErrRecordNotFound {
		errorData.ResponseCode = http.StatusNotFound
		errorData.MsgCode = config.MsgCodeRecordNotExist
		errorData.Err = fmt.Errorf("market application %s does not exist", id)
	} else if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config.MsgCodeGetRecordFailed
	}
	return
}

func (repo *MarketApplicationRepository) List(ctx context.Context, current, pageSize int, order, query string, args []interface{}) (result dtos.MarketApplicationDetailList, errorData common.ErrorData) {
	db := repo.DB.WithContext(ctx).Table(models.MarketApplicationTableName).Where("deleted_at IS NULL")
	if query != "" {
		db = db.Where(query, args...)
	}
	if current < 1 {
		current = 1
	}
	if pageSize < 1 {
		pageSize = 20
	}
	if pageSize > 200 {
		pageSize = 200
	}
	if order == "" {
		order = "updated_at DESC"
	}
	if errorData.Err = db.Count(&result.Total).Error; errorData.IsNil() {
		errorData.Err = db.Order(order).Offset((current - 1) * pageSize).Limit(pageSize).Find(&result.Data).Error
	}
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config.MsgCodeGetRecordFailed
	}
	return
}

func (repo *MarketApplicationRepository) Add(ctx context.Context, model dtos.MarketApplicationCreate) (result dtos.MarketApplicationDetail, errorData common.ErrorData) {
	errorData.Err = repo.DB.WithContext(ctx).Table(models.MarketApplicationTableName).Create(&model).Error
	if errorData.IsNotNil() {
		errorData = daos.ParserDatabaseError(ctx, errorData)
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config.MsgCodeCreateRecordFailed
		return
	}
	return repo.Get(ctx, model.ID)
}

func (repo *MarketApplicationRepository) Update(ctx context.Context, model dtos.MarketApplicationUpdate) (result dtos.MarketApplicationDetail, errorData common.ErrorData) {
	tx := repo.DB.WithContext(ctx).Table(models.MarketApplicationTableName).
		Where("id = ? AND deleted_at IS NULL", model.ID).
		Select("updated_at", "updater_id", "state", "name", "description", "logo", "home", "category", "tags", "templates", "resource_index", "has_crd", "parameters").
		Updates(&model)
	errorData.Err = tx.Error
	if errorData.IsNil() && tx.RowsAffected == 0 {
		errorData.Err = gorm.ErrRecordNotFound
		errorData.ResponseCode = http.StatusNotFound
		errorData.MsgCode = config.MsgCodeRecordNotExist
		return
	}
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config.MsgCodeUpdateRecordFailed
		return
	}
	return repo.Get(ctx, model.ID)
}

func (repo *MarketApplicationRepository) UpdateState(ctx context.Context, model dtos.MarketApplicationState) (errorData common.ErrorData) {
	tx := repo.DB.WithContext(ctx).Table(models.MarketApplicationTableName).
		Where("id = ? AND deleted_at IS NULL", model.ID).Update("state", model.State)
	errorData.Err = tx.Error
	if errorData.IsNil() && tx.RowsAffected == 0 {
		errorData.Err = gorm.ErrRecordNotFound
	}
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config.MsgCodeUpdateRecordFailed
	}
	return
}

func (repo *MarketApplicationRepository) Delete(ctx context.Context, ids []string) (errorData common.ErrorData) {
	if len(ids) == 0 {
		return
	}
	delFlag := utils.GenerateDatabaseId()
	tx := repo.DB.WithContext(ctx).Model(&daos.MarketApplication{}).
		Where("id IN ? AND deleted_at IS NULL", ids).
		Updates(map[string]interface{}{"deleter_id": config.GetOperatorFromCtx(ctx), "del_flag": delFlag})
	if tx.Error == nil {
		tx = repo.DB.WithContext(ctx).Where("id IN ? AND del_flag = ?", ids, delFlag).Delete(&daos.MarketApplication{})
	}
	errorData.Err = tx.Error
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config.MsgCodeDeleteRecordFailed
	}
	return
}

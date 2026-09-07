package repositories

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/efucloud/common"
	"github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/models"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	"gorm.io/gorm"
)

type DataDictionaryRepository struct{ DB *gorm.DB }

func (repo *DataDictionaryRepository) Get(ctx context.Context, code string) (result dtos.DataDictionaryDetail, errorData common.ErrorData) {
	errorData.Err = repo.DB.WithContext(ctx).Table(models.DataDictionaryTableName).Where("code = ?", code).Take(&result).Error
	if errorData.Err == gorm.ErrRecordNotFound {
		errorData.ResponseCode = http.StatusNotFound
		errorData.MsgCode = config.MsgCodeRecordNotExist
		errorData.Err = fmt.Errorf("data dictionary %s does not exist", code)
	} else if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config.MsgCodeGetRecordFailed
	}
	return
}

func (repo *DataDictionaryRepository) List(ctx context.Context) (result dtos.DataDictionaryDetailList, errorData common.ErrorData) {
	db := repo.DB.WithContext(ctx).Table(models.DataDictionaryTableName)
	if errorData.Err = db.Count(&result.Total).Error; errorData.IsNil() {
		errorData.Err = db.Order("code ASC").Find(&result.Data).Error
	}
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config.MsgCodeGetRecordFailed
	}
	return
}

func (repo *DataDictionaryRepository) Update(ctx context.Context, code, updaterID string, model dtos.DataDictionaryUpdate) (result dtos.DataDictionaryDetail, errorData common.ErrorData) {
	tx := repo.DB.WithContext(ctx).Table(models.DataDictionaryTableName).Where("code = ?", code).Updates(map[string]interface{}{
		"name": model.Name, "description": model.Description, "lines": model.Lines, "updater_id": updaterID, "updated_at": time.Now(),
	})
	if tx.Error != nil {
		errorData.Err = tx.Error
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config.MsgCodeUpdateRecordFailed
		return
	}
	if tx.RowsAffected == 0 {
		errorData.Err = gorm.ErrRecordNotFound
		errorData.ResponseCode = http.StatusNotFound
		errorData.MsgCode = config.MsgCodeRecordNotExist
		return
	}
	return repo.Get(ctx, code)
}

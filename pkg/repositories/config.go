package repositories

import (
	"context"
	"github.com/efucloud/common"
	"github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/models"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	"gorm.io/gorm"
	"net/http"
)

type ConfigRepository struct {
	DB *gorm.DB
}

func (repo *ConfigRepository) GetConfigByCode(ctx context.Context, code string) (result dtos.ConfigDetail, errorData common.ErrorData) {
	errorData.Err = repo.DB.WithContext(ctx).Table(models.ConfigTableName).Where("code = ?", code).Find(&result).Error
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config.MsgCodeGetRecordFailed
	}
	return
}

func (repo *ConfigRepository) AddConfig(ctx context.Context, model dtos.ConfigCreate) (result dtos.ConfigDetail, errorData common.ErrorData) {

	errorData.Err = repo.DB.WithContext(ctx).Table(models.ConfigTableName).Create(&model).Scan(&result).Error
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config.MsgCodeCreateRecordFailed
	}
	return result, errorData
}
func (repo *ConfigRepository) UpdateConfig(ctx context.Context, model dtos.ConfigUpdate) (result dtos.ConfigDetail, errorData common.ErrorData) {
	errorData.Err = repo.DB.WithContext(ctx).Table(models.ConfigTableName).Where("code = ? ", model.Code).
		Updates(&model).Find(&result).Error
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config.MsgCodeUpdateRecordFailed
	}
	return result, errorData
}

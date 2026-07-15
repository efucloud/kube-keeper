package repositories

import (
	"context"
	"fmt"
	"github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/models"
	"github.com/efucloud/kube-keeper/pkg/models/daos"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	"net/http"

	"github.com/efucloud/common"
	"gorm.io/gorm"
)

type BuiltinShellCommandRepository struct {
	DB *gorm.DB
}

func (repo *BuiltinShellCommandRepository) GetBuiltinShellCommandByID(ctx context.Context, id string) (result dtos.BuiltinShellCommandDetail, errorData common.ErrorData) {
	errorData.Err = repo.DB.WithContext(ctx).Table(models.BuiltinShellCommandTableName).Where(" id = ?", id).Find(&result).Error
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config.MsgCodeGetRecordFailed
	} else if len(result.ID) == 0 {
		errorData.ResponseCode = http.StatusNotFound
		errorData.MsgCode = config.MsgCodeRecordNotExist
		errorData.Err = fmt.Errorf(" not found instance by id : %s", id)
	}
	return

}
func (repo *BuiltinShellCommandRepository) ListBuiltinShellCommand(ctx context.Context, page, size int, order, query string, queryArgs []interface{}) (results dtos.BuiltinShellCommandDetailList, errorData common.ErrorData) {
	db := repo.DB.WithContext(ctx).Table(models.BuiltinShellCommandTableName)
	if len(query) > 0 {
		query = " " + query
		var newArgs []interface{}
		newArgs = append(newArgs, queryArgs...)
		queryArgs = newArgs
	}
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
		errorData.MsgCode = config.MsgCodeGetRecordFailed
	}
	return
}
func (repo *BuiltinShellCommandRepository) AddBuiltinShellCommand(ctx context.Context, model dtos.BuiltinShellCommandCreate) (result dtos.BuiltinShellCommandDetail, errorData common.ErrorData) {
	errorData.Err = repo.DB.WithContext(ctx).Table(models.BuiltinShellCommandTableName).Create(&model).Scan(&result).Error
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config.MsgCodeCreateRecordFailed
	}

	return result, errorData
}
func (repo *BuiltinShellCommandRepository) DeleteBuiltinShellCommand(ctx context.Context, id string) (errorData common.ErrorData) {
	errorData.Err = repo.DB.WithContext(ctx).Where(" id = ? ", id).Delete(&daos.BuiltinShellCommand{}).Error
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config.MsgCodeDeleteRecordFailed
	}
	return
}
func (repo *BuiltinShellCommandRepository) UpdateBuiltinShellCommand(ctx context.Context, model dtos.BuiltinShellCommandUpdate) (result dtos.BuiltinShellCommandDetail, errorData common.ErrorData) {
	errorData.Err = repo.DB.WithContext(ctx).Table(models.BuiltinShellCommandTableName).Model(&model).Where(" id = ? ", model.ID).
		Updates(&model).Find(&result).Error
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config.MsgCodeUpdateRecordFailed
	}
	return result, errorData
}

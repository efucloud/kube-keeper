package repositories

import (
	"context"
	"github.com/efucloud/common"
	"github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/models"
	"github.com/efucloud/kube-keeper/pkg/models/daos"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	"net/http"

	"gorm.io/gorm"
)

type TerminalAuditLogRepository struct {
	DB *gorm.DB
}

func (repo *TerminalAuditLogRepository) ListTerminalAuditLog(ctx context.Context, page, size int, order, query string, queryArgs []interface{}) (results dtos.TerminalAuditLogDetailList, errorData common.ErrorData) {
	db := repo.DB.WithContext(ctx).Table(models.TerminalAuditLogTableName)

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
		errorData.MsgCode = config.MsgCodeGetRecordFailed
	}
	return
}
func (repo *TerminalAuditLogRepository) AddTerminalAuditLog(ctx context.Context, model dtos.TerminalAuditLogCreate) (result dtos.TerminalAuditLogDetail, errorData common.ErrorData) {
	errorData.Err = repo.DB.WithContext(ctx).Table(models.TerminalAuditLogTableName).Create(&model).Scan(&result).Error
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config.MsgCodeCreateRecordFailed
	}

	return result, errorData
}
func (repo *TerminalAuditLogRepository) DeleteTerminalAuditLogByIds(ctx context.Context, ids []string) (errorData common.ErrorData) {
	errorData.Err = repo.DB.WithContext(ctx).Where(" id IN (?) ", ids).Delete(&daos.TerminalAuditLog{}).Error
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config.MsgCodeDeleteRecordFailed
	}
	return
}

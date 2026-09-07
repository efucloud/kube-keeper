package repositories

import (
	"context"
	"fmt"
	"net/http"

	"github.com/efucloud/common"
	"github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/models"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	"gorm.io/gorm"
)

type ApplicationRepository struct{ DB *gorm.DB }

func (repo *ApplicationRepository) Get(ctx context.Context, id string) (result dtos.ApplicationDetail, errorData common.ErrorData) {
	errorData.Err = repo.DB.WithContext(ctx).Table(models.ApplicationTableName).Where("id = ?", id).Take(&result).Error
	if errorData.Err == gorm.ErrRecordNotFound {
		errorData.ResponseCode = http.StatusNotFound
		errorData.MsgCode = config.MsgCodeRecordNotExist
		errorData.Err = fmt.Errorf("application deployment %s does not exist", id)
	} else if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config.MsgCodeGetRecordFailed
	}
	return
}

func (repo *ApplicationRepository) List(ctx context.Context, current, pageSize int, order, query string, args []interface{}) (result dtos.ApplicationDetailList, errorData common.ErrorData) {
	db := repo.DB.WithContext(ctx).Table(models.ApplicationTableName)
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
		order = "created_at DESC"
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

func (repo *ApplicationRepository) Add(ctx context.Context, model dtos.ApplicationCreate) (result dtos.ApplicationDetail, errorData common.ErrorData) {
	errorData.Err = repo.DB.WithContext(ctx).Table(models.ApplicationTableName).Create(&model).Error
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config.MsgCodeCreateRecordFailed
		return
	}
	return repo.Get(ctx, model.ID)
}

func (repo *ApplicationRepository) UpdateState(ctx context.Context, id, status string, resources dtos.ApplicationKubernetesResources) (result dtos.ApplicationDetail, errorData common.ErrorData) {
	updates := map[string]interface{}{"status": status, "resources": resources, "updater_id": config.GetOperatorFromCtx(ctx)}
	if status == "Deleted" {
		updates["del_flag"] = fmt.Sprintf("deleted-%s", id)
	}
	errorData.Err = repo.DB.WithContext(ctx).Table(models.ApplicationTableName).Where("id = ?", id).
		Updates(updates).Error
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config.MsgCodeUpdateRecordFailed
		return
	}
	return repo.Get(ctx, id)
}

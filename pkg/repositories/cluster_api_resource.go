package repositories

import (
	"context"
	"fmt"
	"github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/models"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	"net/http"

	"github.com/efucloud/common"
	"gorm.io/gorm"
)

type ClusterApiResourceRepository struct {
	DB *gorm.DB
}

func (repo *ClusterApiResourceRepository) GetClusterApiResourceByClusterId(ctx context.Context, clusterId string) (result dtos.ClusterApiResourceDetail, errorData common.ErrorData) {
	errorData.Err = repo.DB.WithContext(ctx).Table(models.ClusterApiResourceTableName).Where(" cluster_id = ?",
		clusterId).Find(&result).Error
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config.MsgCodeGetRecordFailed
	} else if len(result.ID) == 0 {
		errorData.MsgCode = config.MsgCodeGetRecordFailed
		errorData.ResponseCode = http.StatusNotFound
		errorData.Err = fmt.Errorf("not found ClusterApiResourceRepository by cluster id: %s",
			clusterId)

	}
	return
}

func (repo *ClusterApiResourceRepository) AddClusterApiResource(ctx context.Context, model dtos.ClusterApiResourceCreate) (result dtos.ClusterApiResourceDetail, errorData common.ErrorData) {
	errorData.Err = repo.DB.WithContext(ctx).Table(models.ClusterApiResourceTableName).Save(&model).Scan(&result).Error
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config.MsgCodeCreateRecordFailed
	}
	return result, errorData
}

func (repo *ClusterApiResourceRepository) UpdateClusterApiResource(ctx context.Context, model dtos.ClusterApiResourceUpdate) (result dtos.ClusterApiResourceDetail, errorData common.ErrorData) {
	errorData.Err = repo.DB.WithContext(ctx).Table(models.ClusterApiResourceTableName).Where(" cluster_id = ?", model.ClusterId).Save(&model).Find(&result).Error
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config.MsgCodeUpdateRecordFailed
	}
	return result, errorData
}

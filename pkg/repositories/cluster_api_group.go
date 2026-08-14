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

type ClusterApiGroupRepository struct {
	DB *gorm.DB
}

func (repo *ClusterApiGroupRepository) GetClusterApiGroupByClusterId(ctx context.Context, clusterId string) (result dtos.ClusterApiGroupDetail, errorData common.ErrorData) {
	errorData.Err = repo.DB.WithContext(ctx).Table(models.ClusterApiGroupTableName).Where(" cluster_id = ?",
		clusterId).Find(&result).Error
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config.MsgCodeGetRecordFailed
	} else if len(result.ID) == 0 {
		errorData.MsgCode = config.MsgCodeGetRecordFailed
		errorData.ResponseCode = http.StatusNotFound
		errorData.Err = fmt.Errorf("not found ClusterApiGroupRepository by cluster id: %s",
			clusterId)

	}
	return
}

func (repo *ClusterApiGroupRepository) AddClusterApiGroup(ctx context.Context, model dtos.ClusterApiGroupCreate) (result dtos.ClusterApiGroupDetail, errorData common.ErrorData) {
	errorData.Err = repo.DB.WithContext(ctx).Table(models.ClusterApiGroupTableName).Save(&model).Scan(&result).Error
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config.MsgCodeCreateRecordFailed
	}
	return result, errorData
}

func (repo *ClusterApiGroupRepository) UpdateClusterApiGroup(ctx context.Context, model dtos.ClusterApiGroupUpdate) (result dtos.ClusterApiGroupDetail, errorData common.ErrorData) {
	errorData.Err = repo.DB.WithContext(ctx).Table(models.ClusterApiGroupTableName).Where(" cluster_id = ?", model.ClusterId).Save(&model).Find(&result).Error
	if errorData.IsNotNil() {
		errorData.ResponseCode = http.StatusInternalServerError
		errorData.MsgCode = config.MsgCodeUpdateRecordFailed
	}
	return result, errorData
}

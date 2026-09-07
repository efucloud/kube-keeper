package dtos

import (
	"context"
	"fmt"
	"time"

	"github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/models"
	"github.com/efucloud/kube-keeper/pkg/utils"
	"k8s.io/apimachinery/pkg/util/validation"
)

type ApplicationDetailList struct {
	Data  []*ApplicationDetail `json:"data"`
	Total int64                `json:"total"`
}

type ApplicationDetail struct {
	ID                  string                         `gorm:"column:id" json:"id"`
	CreatedAt           time.Time                      `gorm:"column:created_at" json:"createdAt"`
	UpdatedAt           time.Time                      `gorm:"column:updated_at" json:"updatedAt,omitempty"`
	CreatorId           string                         `gorm:"column:creator_id" json:"creatorId"`
	UpdaterId           string                         `gorm:"column:updater_id" json:"updaterId"`
	MarketApplicationId string                         `gorm:"column:market_application_id" json:"marketApplicationId"`
	ApplicationName     string                         `gorm:"column:application_name" json:"applicationName"`
	ClusterId           string                         `gorm:"column:cluster_id" json:"clusterId"`
	ClusterCode         string                         `gorm:"column:cluster_code" json:"clusterCode"`
	Namespace           string                         `gorm:"column:namespace" json:"namespace"`
	ReleaseName         string                         `gorm:"column:release_name" json:"releaseName"`
	Description         string                         `gorm:"column:deploy_description" json:"description"`
	Params              ApplicationRenderParams        `gorm:"column:params" json:"params"`
	Resources           ApplicationKubernetesResources `gorm:"column:resources" json:"resources"`
	Result              string                         `gorm:"column:result" json:"result"`
	Status              string                         `gorm:"column:status" json:"status"`
}

func (ApplicationDetail) TableName() string { return models.ApplicationTableName }

type ApplicationCreate struct {
	ID                  string                         `gorm:"column:id"`
	CreatedAt           time.Time                      `gorm:"column:created_at"`
	CreatorId           string                         `gorm:"column:creator_id"`
	MarketApplicationId string                         `gorm:"column:market_application_id"`
	ApplicationName     string                         `gorm:"column:application_name"`
	ClusterId           string                         `gorm:"column:cluster_id"`
	ClusterCode         string                         `gorm:"column:cluster_code"`
	Namespace           string                         `gorm:"column:namespace"`
	ReleaseName         string                         `gorm:"column:release_name"`
	DelFlag             string                         `gorm:"column:del_flag"`
	Description         string                         `gorm:"column:deploy_description"`
	Params              ApplicationRenderParams        `gorm:"column:params"`
	Resources           ApplicationKubernetesResources `gorm:"column:resources"`
	Result              string                         `gorm:"column:result"`
	Status              string                         `gorm:"column:status"`
}

func (md *ApplicationCreate) Default(ctx context.Context) {
	if md.ID == "" {
		md.ID = utils.GenerateDatabaseId()
	}
	md.CreatorId = config.GetOperatorFromCtx(ctx)
	md.CreatedAt = time.Now()
	md.DelFlag = "active"
}

type ApplicationDeployRequest struct {
	ReleaseName string                  `json:"releaseName"`
	Description string                  `json:"description"`
	Params      ApplicationRenderParams `json:"params"`
}

func (md *ApplicationDeployRequest) Validate() error {
	if md.ReleaseName == "" {
		return fmt.Errorf("releaseName is required")
	}
	if problems := validation.IsDNS1123Label(md.ReleaseName); len(problems) > 0 {
		return fmt.Errorf("releaseName is invalid: %s", problems[0])
	}
	if md.Params == nil {
		md.Params = make(ApplicationRenderParams)
	}
	return nil
}

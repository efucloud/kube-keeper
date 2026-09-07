package daos

import (
	"time"

	"github.com/efucloud/kube-keeper/pkg/models"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
)

// Application is one deployment of a market application. Rendered resources
// are snapshotted here so deployments stay inspectable after a market edit.
type Application struct {
	ID                  string                              `gorm:"type:varchar(50);primarykey;column:id" json:"-"`
	CreatedAt           time.Time                           `gorm:"autoCreateTime;column:created_at;<-:create" json:"-"`
	UpdatedAt           time.Time                           `gorm:"autoUpdateTime;column:updated_at;<-:update" json:"updatedAt,omitempty"`
	CreatorId           string                              `gorm:"type:varchar(50);column:creator_id;<-:create" json:"creatorId" validate:"required"`
	UpdaterId           string                              `gorm:"type:varchar(50);column:updater_id;<-:update" json:"updaterId"`
	MarketApplicationId string                              `gorm:"type:varchar(50);column:market_application_id;<-:create" json:"marketApplicationId" validate:"required"`
	ApplicationName     string                              `gorm:"type:varchar(255);column:application_name;<-:create" json:"applicationName"`
	ClusterId           string                              `gorm:"type:varchar(50);column:cluster_id;<-:create" json:"clusterId" validate:"required"`
	ClusterCode         string                              `gorm:"type:varchar(50);column:cluster_code;<-:create" json:"clusterCode" validate:"required"`
	Namespace           string                              `gorm:"type:varchar(255);column:namespace;<-:create" json:"namespace" validate:"required"`
	ReleaseName         string                              `gorm:"type:varchar(255);column:release_name;<-:create" json:"releaseName" validate:"required"`
	DelFlag             string                              `gorm:"type:varchar(50);column:del_flag;default:active" json:"-"`
	Description         string                              `gorm:"type:varchar(500);column:deploy_description" json:"description"`
	Params              dtos.ApplicationRenderParams        `gorm:"column:params;<-:create" json:"params"`
	Resources           dtos.ApplicationKubernetesResources `gorm:"column:resources" json:"resources"`
	Result              string                              `gorm:"type:varchar(30);column:result" json:"result"`
	Status              string                              `gorm:"type:varchar(30);column:status" json:"status"`
}

func (t *Application) Indexes() map[string][]string {
	return map[string][]string{
		"idx_application_target": {"cluster_code", "namespace"},
		"idx_application_market": {"market_application_id"},
		"idx_application_status": {"status"},
	}
}

func (t *Application) UniqueIndexes() map[string][]string {
	return map[string][]string{"uniq_application_release": {"cluster_code", "namespace", "release_name", "del_flag"}}
}

func (t *Application) TableName() string { return models.ApplicationTableName }

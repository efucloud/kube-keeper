package daos

import (
	"time"

	"github.com/efucloud/kube-keeper/pkg/models"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	"gorm.io/gorm"
)

// MarketApplication is a self-contained Base application definition. There is
// intentionally no separate application-version table in the community edition.
type MarketApplication struct {
	ID            string                    `gorm:"type:varchar(50);primarykey;column:id" json:"-"`
	CreatedAt     time.Time                 `gorm:"autoCreateTime;column:created_at;<-:create" json:"-"`
	UpdatedAt     time.Time                 `gorm:"autoUpdateTime;column:updated_at;<-:update" json:"updatedAt,omitempty"`
	DeletedAt     gorm.DeletedAt            `gorm:"column:deleted_at" json:"deletedAt,omitempty"`
	DelFlag       string                    `gorm:"type:varchar(50);column:del_flag;default:active" json:"-"`
	CreatorId     string                    `gorm:"type:varchar(50);column:creator_id;<-:create" json:"creatorId" validate:"required"`
	UpdaterId     string                    `gorm:"type:varchar(50);column:updater_id;<-:update" json:"updaterId"`
	DeleterId     string                    `gorm:"type:varchar(50);column:deleter_id" json:"-"`
	State         uint                      `gorm:"column:state;default:0" json:"state" validate:"oneof=0 1"`
	Name          string                    `gorm:"type:varchar(255);column:name" json:"name" validate:"required"`
	Description   string                    `gorm:"type:text;column:description" json:"description"`
	Logo          string                    `gorm:"type:text;column:logo" json:"logo"`
	Home          string                    `gorm:"type:text;column:home" json:"home"`
	Category      string                    `gorm:"type:varchar(100);column:category;default:application" json:"category" validate:"required"`
	Tags          dtos.ArrayString          `gorm:"column:tags" json:"tags"`
	Templates     dtos.ArrayString          `gorm:"column:templates" json:"templates" validate:"required,min=1"`
	ResourceIndex dtos.ResourceIndex        `gorm:"column:resource_index" json:"resourceIndex"`
	HasCRD        bool                      `gorm:"column:has_crd" json:"hasCrd"`
	Parameters    dtos.ParameterDefinitions `gorm:"column:parameters" json:"parameters"`
}

func (t *MarketApplication) Indexes() map[string][]string {
	return map[string][]string{
		"idx_market_application_state":    {"state"},
		"idx_market_application_category": {"category"},
	}
}

func (t *MarketApplication) UniqueIndexes() map[string][]string {
	return map[string][]string{"uniq_market_application_name": {"name", "del_flag"}}
}

func (t *MarketApplication) TableName() string { return models.MarketApplicationTableName }

package daos

import (
	"time"

	"github.com/efucloud/kube-keeper/pkg/models"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	"gorm.io/gorm"
)

// MarketApplication 应用商店应用版本
type MarketApplication struct {
	ID            string                    `gorm:"type:varchar(50);primarykey;column:id" json:"-"`
	CreatedAt     time.Time                 `gorm:"autoCreateTime;column:created_at;<-:create" json:"-"`
	UpdatedAt     time.Time                 `gorm:"autoUpdateTime;column:updated_at;<-:update" json:"updatedAt,omitempty"`
	DeletedAt     gorm.DeletedAt            `gorm:"column:deleted_at" json:"deletedAt,omitempty"`
	DelFlag       string                    `gorm:"type:varchar(50);column:del_flag;default:active" json:"-"`
	CreatorId     string                    `gorm:"type:varchar(50);column:creator_id;<-:create" json:"creatorId" validate:"required"`
	UpdaterId     string                    `gorm:"type:varchar(50);column:updater_id;<-:update" json:"updaterId" validate:"required"`
	DeleterId     string                    `gorm:"type:varchar(50);column:deleter_id" json:"-"`
	State         uint                      `gorm:"column:state;default:0" json:"state" validate:"oneof=0 1 2 3 4 5 6" enum:"0|1|2|3|4|5|6"`
	ApplicationId string                    `gorm:"type:varchar(50);column:application_id" json:"applicationId" validate:"required"`
	Description   string                    `gorm:"type:text;column:description" json:"description" validate:"required"`
	Templates     dtos.ArrayString          `gorm:"column:templates" json:"templates" yaml:"templates"`
	ResourceIndex dtos.ResourceIndex        `gorm:"type:varchar(255);column:resource_index" json:"resourceIndex"`
	HasCRD        bool                      `gorm:"column:has_crd" json:"hasCrd" yaml:"hasCrd"`
	Parameters    dtos.ParameterDefinitions `gorm:"type:json;column:parameters" json:"parameters" yaml:"parameters"`
	Mappings      dtos.ParametersMappings   `gorm:"type:json;column:mappings" json:"mappings" yaml:"mappings"`
	Version       string                    `gorm:"type:varchar(50);column:version" json:"version" yaml:"version"`
	Type          string                    `gorm:"type:varchar(50);column:type;default:base" json:"type" validate:"oneof=base" enum:"base"`
	Nodes         dtos.ApplicationNodes     `gorm:"type:json;column:nodes" json:"nodes" yaml:"nodes"`
	Edges         dtos.ApplicationEdges     `gorm:"type:json;column:edges" json:"edges" yaml:"edges"`
	Hash          string                    `gorm:"type:varchar(255);column:hash" json:"hash"`
	HandleProps   dtos.ArrayString          `gorm:"column:handle_props" json:"handleProps" yaml:"handleProps"`
}

func (t *MarketApplication) Indexes() (results map[string][]string) {
	results = make(map[string][]string)
	results["idx_type"] = []string{"type"}
	results["idx_application_id"] = []string{"application_id"}
	results["idx_state"] = []string{"state"}
	return
}

func (t *MarketApplication) UniqueIndexes() (results map[string][]string) {
	results = make(map[string][]string)
	results["uniq_idx_version"] = []string{"application_id", "version", "del_flag"}
	return
}

func (t *MarketApplication) TableName() string {
	return models.MarketApplicationTableName
}

package daos

import (
	"github.com/efucloud/kube-keeper/pkg/models"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	"time"
)

// Application 应用
type Application struct {
	//主键
	ID string `gorm:"type:varchar(50);primarykey;column:id" json:"-" description:"记录ID"`
	//创建时间
	CreatedAt time.Time `gorm:"autoCreateTime;column:created_at;<-:create" json:"-" description:"创建时间"`
	//创建者
	CreatorId string `gorm:"type:varchar(50);column:creator_id;<-:create" validate:"required" json:"creatorId" description:"创建者"`
	//修改时间
	UpdatedAt time.Time `gorm:"autoUpdateTime;column:updated_at;<-:update" json:"updatedAt,omitempty" description:"更新时间"`
	//更新者
	UpdaterId string `gorm:"type:varchar(50);column:updater_id;<-:update" json:"updaterId" validate:"required" description:"更新者"`
	//状态 0:Draft 1::Released 2:Archived
	State uint `gorm:"column:state;default:0" json:"state" yaml:"state" validate:"oneof=0 1 2 " enum:"0|1|2" description:"状态"`
	//显示名称
	Name string `gorm:"type:varchar(255);column:name" json:"name"  description:"显示名称"`
	//版本描述
	Description string `gorm:"type:text;column:description" json:"description" validate:"required" yaml:"description" description:"版本描述"`
	//模版内容,yaml格式，支持多个，若为helm部署，则为values.yaml内容
	Templates dtos.ArrayString `gorm:"column:templates" json:"templates" yaml:"templates" validate:"required_if=Type base" description:"模版内容"`
	//模版资源索引
	ResourceIndex dtos.ResourceIndex `gorm:"type:varchar(255);column:resource_index" json:"resourceIndex" validate:"required_if=DeployMethod yaml" description:"模版资源索引"`
	//有CRD资源
	HasCRD bool `gorm:"column:has_crd" json:"hasCrd" yaml:"hasCrd" description:"有CRD资源"`
	// 应用参数
	Parameters dtos.ParameterDefinitions `gorm:"type:json;column:parameters" json:"parameters"  yaml:"parameters" description:"模版参数"`
	//版本
	Version string `gorm:"type:varchar(50);column:version" json:"version" yaml:"version" validate:"-" description:"版本"`
}

func (t *Application) Indexes() (results map[string][]string) {
	results = make(map[string][]string)
	return
}
func (t *Application) UniqueIndexes() (results map[string][]string) {
	results = make(map[string][]string)
	results["uniq_idx_name"] = []string{"name", "version"}
	return
}
func (t *Application) TableName() string {
	return models.ApplicationTableName

}

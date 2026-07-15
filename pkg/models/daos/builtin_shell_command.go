package daos

import (
	"github.com/efucloud/kube-keeper/pkg/models"
	"time"

	"gorm.io/gorm"
)

// BuiltinShellCommand 内置的shell命令
// 用户可以选择内置的命令快速实现对容器的运维，同时减少手动输入错误的可能性
type BuiltinShellCommand struct {
	//主键
	ID string `gorm:"primarykey;column:id;type:varchar(50)" json:"-" description:"记录ID"`
	//创建时间
	CreatedAt time.Time `gorm:"autoCreateTime;column:created_at;<-:create" json:"-" description:"创建时间"`
	//修改时间
	UpdatedAt time.Time `gorm:"autoUpdateTime;column:updated_at;<-:update" json:"updatedAt,omitempty" description:"更新时间"`
	//软删除
	DeletedAt gorm.DeletedAt `gorm:"column:deleted_at" json:"deletedAt,omitempty"`
	//删除状态
	DelFlag string `gorm:"type:varchar(50);column:del_flag;default:active" json:"-" description:"删除状态"`
	//创建者
	CreatorId string `gorm:"type:varchar(50);column:creator_id;<-:create" validate:"required" json:"creatorId" description:"创建者"`
	//更新者
	UpdaterId string `gorm:"type:varchar(50);column:updater_id;<-:update" json:"updaterId" validate:"required" description:"更新者"`
	//删除者
	DeleterId string `gorm:"type:varchar(50);column:deleter_id" json:"-" description:"删除者"`
	//命令名称
	Name string `gorm:"type:varchar(50);column:name" json:"name" validate:"required,max=50" yaml:"name" description:"命令名称"`
	//命令说明
	Description string `gorm:"type:varchar(255);column:description" json:"description" description:"命令说明"`
	//命令内容:支持模板化参数
	Command string `gorm:"type:text;column:command" json:"command" validate:"required"  yaml:"command" description:"命令内容"`
}

func (md *BuiltinShellCommand) TableName() string {
	return models.BuiltinShellCommandTableName
}
func (md *BuiltinShellCommand) Indexes() (results map[string][]string) {
	results = make(map[string][]string)
	results["idx_name"] = []string{"name"}
	return
}
func (md *BuiltinShellCommand) UniqueIndexes() (results map[string][]string) {
	results = make(map[string][]string)
	results["uniq_idx_name"] = []string{"name", "del_flag"}

	return
}

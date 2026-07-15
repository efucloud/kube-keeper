package daos

import (
	"github.com/efucloud/kube-keeper/pkg/models"
	"time"
)

// Config 配置
type Config struct {
	//主键
	ID string `gorm:"primarykey;column:id;type:varchar(50)" json:"-" description:"记录ID"`
	//创建时间
	CreatedAt time.Time `gorm:"autoCreateTime;column:created_at;<-:create" json:"-" description:"创建时间"`
	//修改时间
	UpdatedAt time.Time `gorm:"autoUpdateTime;column:updated_at;<-:update" json:"updatedAt,omitempty" description:"更新时间"`
	//创建者
	CreatorId string `gorm:"type:varchar(50);column:creator_id;<-:create" validate:"required" json:"creatorId" description:"创建者"`
	//更新者
	UpdaterId string `gorm:"type:varchar(50);column:updater_id;<-:update" json:"updaterId" validate:"required" description:"更新者"`
	//编码
	Code string `gorm:"type:varchar(255);column:code" json:"code" validate:"required" description:"编码"`
	//内容
	Data string `gorm:"type:longtext;column:data" json:"data" description:"内容"`
}

func (md *Config) TableName() string {
	return models.ConfigTableName
}
func (md *Config) Indexes() (results map[string][]string) {
	results = make(map[string][]string)
	return
}
func (md *Config) UniqueIndexes() (results map[string][]string) {
	results = make(map[string][]string)
	results["uniq_idx_code"] = []string{"code"}
	return
}

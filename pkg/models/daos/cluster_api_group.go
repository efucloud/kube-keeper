package daos

import (
	"github.com/efucloud/common/datatypes"
	"github.com/efucloud/kube-keeper/pkg/models"

	"time"
)

type ClusterApiGroup struct {
	//主键
	ID string `gorm:"primarykey;column:id;type:varchar(50)" json:"-" description:"记录ID"`
	//创建时间
	CreatedAt time.Time `gorm:"autoCreateTime;column:created_at;<-:create" json:"-" description:"创建时间"`
	//修改时间
	UpdatedAt time.Time `gorm:"autoUpdateTime;column:updated_at;<-:update" json:"updatedAt,omitempty" description:"更新时间"`

	//集群ID
	ClusterId string `gorm:"type:varchar(50);column:cluster_id;<-:create" json:"clusterId" validate:"required" description:"集群ID"`
	//内容
	Content datatypes.LongText `gorm:"column:content" json:"content" validate:"required" description:"api group内容"`
	//内容hash
	Hash string `gorm:"type:varchar(255);column:hash" json:"-" description:"内容hash"`
}

func (md *ClusterApiGroup) TableName() string {
	return models.ClusterApiGroupTableName
}
func (md *ClusterApiGroup) Indexes() (results map[string][]string) {
	results = make(map[string][]string)
	return
}
func (md *ClusterApiGroup) UniqueIndexes() (results map[string][]string) {
	results = make(map[string][]string)
	results["uniq_idx_role"] = []string{"cluster_id"}
	return
}

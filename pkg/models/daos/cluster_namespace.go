package daos

import (
	"github.com/efucloud/kube-keeper/pkg/models"
	"time"

	"gorm.io/gorm"
)

// ClusterNamespace 集群命名空间
type ClusterNamespace struct {
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

	//集群ID
	ClusterId string `gorm:"type:varchar(50);column:cluster_id;<-:create" json:"clusterId" validate:"required" description:"集群ID"`
	//集群命名空间名称
	Namespace string `gorm:"type:varchar(255);column:namespace;<-:create" json:"namespace" validate:"required" description:"集群命名空间名称"`
	//所属工作空间编码
	WorkspaceCode string `gorm:"type:varchar(50);column:workspace_code" json:"workspaceCode" description:"所属工作空间编码"`
	//描述
	Description string `gorm:"type:varchar(50);column:description" json:"description" description:"描述"`
	//命名空间状态
	Status string `gorm:"column:status" json:"status" description:"命名空间状态"`
	//Hash解决多字段约束过长的问题
	Hash string `gorm:"type:varchar(255);column:hash" json:"-" description:"Hash"`
	//集群上创建时间
	ClusterCreateTime time.Time `gorm:"column:cluster_create_time" json:"clusterCreateTime" validate:"required" description:"集群上创建时间"`
	//命名空间类型public:工作空间中所有成员均可加入,private:工作空间成员私有命名空间,命名空间管理员可以邀请工作空间用户加入
	IsPublic bool `gorm:"column:is_public;default:true" json:"isPublic" description:"命名空间类型"`
}

func (md *ClusterNamespace) TableName() string {
	return models.ClusterNamespaceTableName
}
func (md *ClusterNamespace) Indexes() (results map[string][]string) {
	results = make(map[string][]string)
	return
}
func (md *ClusterNamespace) UniqueIndexes() (results map[string][]string) {
	results = make(map[string][]string)
	results["uniq_idx_code"] = []string{"hash", "del_flag"}
	return
}

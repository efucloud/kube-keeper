package daos

import (
	"github.com/efucloud/kube-keeper/pkg/models"
	"time"

	"gorm.io/gorm"
)

// ClusterAccountPermission 用户在集群的权限信息，该权限通过计算获取，用户可以在页面刷新触发计算，也可以在登录的时候自动触发计算
type ClusterAccountPermission struct {
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
	//所属用户: 关联ID
	AccountId string `gorm:"type:varchar(50);column:account_id;<-:create" json:"accountId" validate:"required" description:"所属用户ID"`
}

func (md *ClusterAccountPermission) TableName() string {
	return models.ClusterAccountPermissionTableName
}
func (md *ClusterAccountPermission) Indexes() (results map[string][]string) {
	results = make(map[string][]string)
	return
}
func (md *ClusterAccountPermission) UniqueIndexes() (results map[string][]string) {
	results = make(map[string][]string)
	results["uniq_idx_account"] = []string{"cluster_id", "account_id", "del_flag"}
	return
}

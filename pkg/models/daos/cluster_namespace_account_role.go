package daos

import (
	"github.com/efucloud/kube-keeper/pkg/models"
	"time"

	"gorm.io/gorm"
)

// ClusterNamespaceAccountRole 用户在集群命名空间的角色
type ClusterNamespaceAccountRole struct {
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
	//集群命名空间
	Namespace string `gorm:"type:varchar(255);column:namespace;<-:create" json:"namespace" description:"集群命名空间"`
	//角色名称
	RoleName string `gorm:"type:varchar(50)" json:"roleName" description:"角色名称"`
	//角色绑定名称
	BindingName string `gorm:"type:varchar(50)" json:"bindingName" description:"角色绑定名称"`
	//临时权限
	IsTemp bool `gorm:"column:is_temp" json:"isTemp" description:"临时权限"`
	//开始时间
	StartTime time.Time `gorm:"column:start_time" json:"startTime" validate:"required_if=IsTemp true" description:"开始时间"`
	//结束时间
	EndTime time.Time `gorm:"column:end_time" json:"endTime"  validate:"required_if=IsTemp true"  description:"结束时间"`
	//是否有效
	Enable bool `gorm:"column:enable;default:false" json:"enable" description:"是否有效"`
	//角色信息Hash
	Hash string `gorm:"type:varchar(255);column:hash" json:"-" description:"角色信息Hash"`
}

func (md *ClusterNamespaceAccountRole) TableName() string {
	return models.ClusterNamespaceAccountRoleTableName
}
func (md *ClusterNamespaceAccountRole) Indexes() (results map[string][]string) {
	results = make(map[string][]string)
	results["idx_cluster_id"] = []string{"cluster_id"}
	results["idx_account_id"] = []string{"account_id"}
	results["idx_namespace"] = []string{"namespace"}

	return
}
func (md *ClusterNamespaceAccountRole) UniqueIndexes() (results map[string][]string) {
	results = make(map[string][]string)
	results["uniq_idx_role"] = []string{"hash", "del_flag"}
	return
}

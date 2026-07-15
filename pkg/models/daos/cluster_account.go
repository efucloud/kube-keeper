package daos

import (
	"github.com/efucloud/kube-keeper/pkg/models"
	"time"

	"gorm.io/gorm"
)

// ClusterAccount 集群的用户，针对没有对接eauth的集群
type ClusterAccount struct {
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

	//用户ID
	AccountId string `gorm:"type:varchar(50);column:account_id" json:"accountId" validate:"required" description:"所属用户ID"`
	//邮箱:csr中指定的邮箱
	Email string `gorm:"type:varchar(50);column:email" json:"email" yaml:"email" validate:"email" description:"CSR中指定的邮箱"`
	//CSR有效期:单位(s)
	ExpirationSeconds int32 `gorm:"column:expiration_seconds"  json:"expirationSeconds" description:"CSR有效期:单位(s)"`
	//集群ID
	ClusterId string `gorm:"type:varchar(50);column:cluster_id;<-:create" json:"clusterId" validate:"required" description:"集群ID"`
	//客户端证书
	ClientCertificate string `gorm:"type:text;column:c" json:"-" description:"客户端证书"`
	//客户端Key
	ClientKey string `gorm:"type:text;column:c2" json:"-" description:"客户端Key"`
	//CSR名称:用户在集群中CSR名称
	CsrName string `gorm:"type:varchar(200);column:n" json:"csrName" description:"CSR名称"`
	//集群核准状态
	State string `gorm:"type:varchar(50);column:state" json:"state" description:"集群核准状态"`
	//原因:失败时的原因
	Reason string `gorm:"type:text;column:reason" json:"reason" description:"失败原因"`
	//授权说明或原因
	Description string `gorm:"type:varchar(255);column:description" json:"description" description:"授权说明或原因"`
	//超级管理员
	IsSupper bool `gorm:"column:is_supper" json:"isSupper" description:"超级管理员"`
	//是否有效
	Enable bool `gorm:"column:enable;default:true" json:"enable" description:"是否有效"`
	//用户ID信息Hash
	Hash string `gorm:"type:varchar(255);column:hash" json:"-" description:"用户IDHash"`
	//用户邮箱信息Hash
	Hash2 string `gorm:"type:varchar(255);column:hash2" json:"-" description:"邮箱Hash"`
}

func (md *ClusterAccount) TableName() string {
	return models.ClusterAccountTableName
}
func (md *ClusterAccount) Indexes() (results map[string][]string) {
	results = make(map[string][]string)
	results["idx_deleted"] = []string{"deleted_at"}
	return
}
func (md *ClusterAccount) UniqueIndexes() (results map[string][]string) {
	results = make(map[string][]string)
	results["uniq_idx_account"] = []string{"hash", "del_flag"}
	results["uniq_idx_email"] = []string{"hash2", "del_flag"}
	return
}

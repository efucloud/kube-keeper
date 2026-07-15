package daos

import (
	"github.com/efucloud/kube-keeper/pkg/models"
	dtos2 "github.com/efucloud/kube-keeper/pkg/models/dtos"
	"time"

	"gorm.io/gorm"
)

// Cluster 集群
type Cluster struct {
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
	//集群编码
	Code string `gorm:"type:varchar(50);column:code;<-:create" json:"code" validate:"required,max=50" description:"集群编码"`
	//集群名称
	Name string `gorm:"type:varchar(50);column:name" json:"name" validate:"required,max=50" description:"集群名称"`
	//是否有效
	Enable bool `gorm:"column:enable;default:true" json:"enable" description:"是否有效"`
	//集群类型
	Category string `gorm:"type:varchar(50);column:category" validate:"required" json:"category" description:"集群类型"`
	//集群版本
	Version dtos2.KubernetesVersion `gorm:"column:version" json:"version" description:"集群版本"`
	//描述
	Description string `gorm:"type:varchar(255);column:description" json:"description" description:"描述"`
	//apiserver地址
	ApiServer string `gorm:"type:varchar(255);column:api_server"  json:"apiServer" validate:"required" description:"集群API Server地址"`
	//集群CA证书:Base64编码，若为编码，则自动编码为base64
	CertificateAuthority string `gorm:"type:text;column:certificate_authority" json:"certificateAuthority" description:"集群CA证书"`
	//CA过期时间
	ExpireTime time.Time `gorm:"column:expire_time" json:"expireTime" validate:"required" description:"CA过期时间"`
	//集群管理员用户客户端证书，Base64编码，若为编码，则自动编码为base64"
	ClientCertificate string `gorm:"type:text;column:client_certificate" validate:"required" json:"clientCertificate" description:"客户端证书"`
	//集群管理员用户客户端Key，Base64编码，若为编码，则自动编码为base64
	ClientKey string `gorm:"type:text;column:client_key" validate:"required" json:"clientKey" description:"客户端Key"`
	//域名列表:用于模版部署时提示使用
	DomainList dtos2.ArrayString `gorm:"type:json;column:domain_list" json:"domainList" description:"域名列表"`
	//扩展配置信息
	ExtendConfig *dtos2.ClusterExtendConfig `gorm:"type:json;column:extend_config" json:"extendConfig" description:"扩展配置信息"`
}

func (md *Cluster) TableName() string {
	return models.ClusterTableName
}
func (md *Cluster) Indexes() (results map[string][]string) {
	results = make(map[string][]string)
	return
}
func (md *Cluster) UniqueIndexes() (results map[string][]string) {
	results = make(map[string][]string)
	results["uniq_idx_code"] = []string{"code", "del_flag"}
	results["uniq_idx_name"] = []string{"name", "del_flag"}
	results["uniq_idx_api_server"] = []string{"api_server", "del_flag"}
	return
}

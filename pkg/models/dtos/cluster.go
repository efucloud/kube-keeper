package dtos

import (
	"context"
	"crypto/x509"
	"encoding/base64"
	"encoding/pem"
	"errors"
	config "github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/models"
	"strings"
	"time"

	"github.com/efucloud/common"
	"github.com/efucloud/kube-keeper/pkg/utils"
	"github.com/go-playground/validator/v10"
	"gorm.io/gorm"
)

// ClusterDetailList 集群列表响应
type ClusterDetailList struct {
	//当前页数据
	Data []*ClusterDetail `json:"data"`
	//数据库满足条件的数据总数
	Total int64 `json:"total"`
}

// ShortClusterDetail 集群
type ShortClusterDetail struct {
	//主键
	ID string `gorm:"primarykey;column:id;type:varchar(50)" json:"id" description:"记录ID"`
	//集群编码
	Code string `gorm:"type:varchar(50);column:code;<-:create" json:"code" validate:"required,max=50" description:"集群编码"`
	//集群名称
	Name string `gorm:"type:varchar(50);column:name" json:"name" validate:"required,max=50" description:"集群名称"`
	//是否有效
	Enable bool `gorm:"column:enable;default:true" json:"enable" description:"是否有效"`
	//集群类型
	Category string `gorm:"type:varchar(50);column:category" validate:"required" json:"category" description:"集群类型"`
	//集群版本
	Version KubernetesVersion `gorm:"column:version" json:"version" description:"集群版本"`
	//描述
	Description string `gorm:"type:varchar(255);column:description" json:"description" description:"描述"`
}

func (md *ShortClusterDetail) TableName() string {
	return models.ClusterTableName
}

// ClusterDetail 集群
type ClusterDetail struct {
	//主键
	ID string `gorm:"primarykey;column:id;type:varchar(50)" json:"id" description:"记录ID"`
	//创建时间
	CreatedAt time.Time `gorm:"autoCreateTime;column:created_at;<-:create" json:"createdAt" description:"创建时间"`
	//修改时间
	UpdatedAt time.Time `gorm:"column:updated_at" json:"updatedAt,omitempty" description:"更新时间"`
	//创建者
	CreatorId string `gorm:"type:varchar(50);column:creator_id;<-:create" validate:"required" json:"creatorId" description:"创建者"`
	//更新者
	UpdaterId string `gorm:"type:varchar(50);column:updater_id;<-:update" json:"updaterId" validate:"required" description:"更新者"`
	//软删除
	DeletedAt gorm.DeletedAt `gorm:"column:deleted_at" json:"deletedAt,omitempty"`
	//删除状态
	DelFlag string `gorm:"type:varchar(50);column:del_flag;default:active" json:"-" description:"删除状态"`
	//集群编码
	Code string `gorm:"type:varchar(50);column:code;<-:create" json:"code" validate:"required,max=50" description:"集群编码"`
	//集群名称
	Name string `gorm:"type:varchar(50);column:name" json:"name" validate:"required,max=50" description:"集群名称"`
	//是否有效
	Enable bool `gorm:"column:enable;default:true" json:"enable" description:"是否有效"`
	//集群类型
	Category string `gorm:"type:varchar(50);column:category" validate:"required" json:"category" description:"集群类型"`
	//集群版本
	Version KubernetesVersion `gorm:"column:version" json:"version" description:"集群版本"`
	//描述
	Description string `gorm:"type:varchar(255);column:description" json:"description" description:"描述"`
	//apiserver地址
	ApiServer string `gorm:"type:varchar(255);column:api_server"  json:"apiServer" validate:"required" description:"集群API Server地址"`
	//集群CA证书:Base64编码，若为编码，则自动编码为base64
	CertificateAuthority string `gorm:"type:text;column:certificate_authority" json:"-" description:"集群CA证书"`
	//CA过期时间
	ExpireTime time.Time `gorm:"column:expire_time" json:"expireTime" validate:"required" description:"CA过期时间"`
	//集群管理员用户客户端证书，Base64编码，若为编码，则自动编码为base64"
	ClientCertificate string `gorm:"type:text;column:client_certificate" validate:"required" json:"-" description:"客户端证书"`
	//集群管理员用户客户端Key，Base64编码，若为编码，则自动编码为base64
	ClientKey string `gorm:"type:text;column:client_key" validate:"required" json:"-" description:"客户端Key"`
	//域名列表:用于模版部署时提示使用
	DomainList ArrayString `gorm:"type:json;column:domain_list" json:"domainList" description:"域名列表"`
	//扩展配置信息
	ExtendConfig *ClusterExtendConfig `gorm:"type:json;column:extend_config" json:"extendConfig" description:"扩展配置信息"`
}

func (md *ClusterDetail) Default(ctx context.Context) {

	if len(md.CertificateAuthority) > 0 {
		md.CertificateAuthority, _ = config.ClusterCertDataDecrypt(md.CertificateAuthority)
	}
	if len(md.ClientKey) > 0 {
		md.ClientKey, _ = config.ClusterCertDataDecrypt(md.ClientKey)
	}
	if len(md.ClientCertificate) > 0 {
		md.ClientCertificate, _ = config.ClusterCertDataDecrypt(md.ClientCertificate)
	}
}

type ClusterRegistry struct {
	//集群编码
	Code string `gorm:"type:varchar(50);column:code;<-:create" json:"code" validate:"required,max=50" description:"集群编码"`
	//集群名称
	Name string `gorm:"type:varchar(50);column:name" json:"name" validate:"required,max=50" description:"集群名称"`
	//集群类型
	Category string `gorm:"type:varchar(50);column:category" validate:"required" json:"category" description:"集群类型"`
	//apiserver地址
	ApiServer string `gorm:"type:varchar(255);column:api_server"  json:"apiServer" validate:"required" description:"集群API Server地址"`
	//集群CA证书:Base64编码，若为编码，则自动编码为base64
	CertificateAuthority string `gorm:"type:text;column:certificate_authority" json:"certificateAuthority" description:"集群CA证书"`
	//客户端证书
	ClientCertificate string `gorm:"type:text;column:client_certificate" validate:"required" json:"clientCertificate" description:"客户端证书"`
	//集群管理员用户客户端Key，Base64编码，若为编码，则自动编码为base64
	ClientKey string `gorm:"type:text;column:client_key" validate:"required" json:"clientKey" description:"客户端Key"`
	//域名列表:用于模版部署时提示使用
	DomainList ArrayString `gorm:"type:json;column:domain_list" json:"domainList" description:"域名列表"`
}

// ClusterCreate 集群创建
type ClusterCreate struct {
	//主键
	ID string `gorm:"primarykey;column:id;type:varchar(50)" json:"-" description:"记录ID"`
	//创建时间
	CreatedAt time.Time `gorm:"autoCreateTime;column:created_at;<-:create" json:"-" description:"创建时间"`
	//创建者
	CreatorId string `gorm:"type:varchar(50);column:creator_id;<-:create" validate:"required" json:"-" description:"创建者"`
	//集群编码
	Code string `gorm:"type:varchar(50);column:code;<-:create" json:"code" validate:"required,max=50" description:"集群编码"`
	//集群名称
	Name string `gorm:"type:varchar(50);column:name" json:"name" validate:"required,max=50" description:"集群名称"`
	//是否有效
	Enable bool `gorm:"column:enable;default:true" json:"enable" description:"是否有效"`
	//集群类型
	Category string `gorm:"type:varchar(50);column:category" validate:"required" json:"category" description:"集群类型"`
	//集群版本
	Version KubernetesVersion `gorm:"column:version" json:"-" description:"集群版本"`
	//描述
	Description string `gorm:"type:varchar(255);column:description" json:"description" description:"描述"`
	//apiserver地址
	ApiServer string `gorm:"type:varchar(255);column:api_server"  json:"apiServer" validate:"required" description:"集群API Server地址"`
	//集群CA证书:Base64编码，若为编码，则自动编码为base64
	CertificateAuthority string `gorm:"type:text;column:certificate_authority" json:"certificateAuthority" description:"集群CA证书"`
	//CA过期时间
	ExpireTime time.Time `gorm:"column:expire_time" json:"expireTime" validate:"required_with=CertificateAuthority" description:"CA过期时间"`
	//集群管理员用户客户端证书，Base64编码，若为编码，则自动编码为base64"
	ClientCertificate string `gorm:"type:text;column:client_certificate" validate:"required" json:"clientCertificate" description:"客户端证书"`
	//集群管理员用户客户端Key，Base64编码，若为编码，则自动编码为base64
	ClientKey string `gorm:"type:text;column:client_key" validate:"required" json:"clientKey" description:"客户端Key"`
	//域名列表:用于模版部署时提示使用
	DomainList ArrayString `gorm:"type:json;column:domain_list" json:"domainList" description:"域名列表"`
	//扩展配置信息
	ExtendConfig *ClusterExtendConfig `gorm:"type:json;column:extend_config" json:"extendConfig" description:"扩展配置信息"`
}

func (md *ClusterCreate) Default(ctx context.Context) {
	md.Category = "kubernetes"
	md.CreatorId = config.GetOperatorFromCtx(ctx)
	md.ClientKey = strings.TrimSpace(md.ClientKey)
	md.ClientCertificate = strings.TrimSpace(md.ClientCertificate)
	md.CertificateAuthority = strings.TrimSpace(md.CertificateAuthority)
	if strings.HasPrefix(md.ClientKey, "--") {
		md.ClientKey = base64.StdEncoding.EncodeToString([]byte(md.ClientKey))
	}
	if strings.HasPrefix(md.CertificateAuthority, "--") {
		md.CertificateAuthority = base64.StdEncoding.EncodeToString([]byte(md.CertificateAuthority))
	}
	if strings.HasPrefix(md.ClientCertificate, "--") {
		md.ClientCertificate = base64.StdEncoding.EncodeToString([]byte(md.ClientCertificate))
	}
	if md.ClientKey != "" && md.CertificateAuthority != "" {
		if version, err := GetClusterVersion(md.ApiServer, md.ClientKey, md.ClientCertificate, md.CertificateAuthority); err == nil {
			md.Version = version
		}
	}
	md.ID = utils.GenerateDatabaseId()

	if len(md.CertificateAuthority) > 0 {
		if strings.HasPrefix(md.CertificateAuthority, "LS0t") {
			bt, _ := base64.StdEncoding.DecodeString(md.CertificateAuthority)
			md.CertificateAuthority = string(bt)

		}
		block, _ := pem.Decode([]byte(md.CertificateAuthority))
		if block == nil {
			config.Logger.Error("failed to decode PEM block containing the certificate")
			return
		}
		// 解析CA证书
		cert, err := x509.ParseCertificate(block.Bytes)
		if err != nil {
			config.Logger.Error(err)
			return
		}
		md.ExpireTime = cert.NotAfter
		md.CertificateAuthority, _ = config.ClusterCertDataEncrypt(md.CertificateAuthority)
	}
	if len(md.ClientKey) > 0 {
		md.ClientKey, _ = config.ClusterCertDataEncrypt(md.ClientKey)
	}
	if len(md.ClientCertificate) > 0 {
		md.ClientCertificate, _ = config.ClusterCertDataEncrypt(md.ClientCertificate)
	}
	md.CreatedAt = time.Now()
}
func (md *ClusterCreate) Validate(ctx context.Context) (err error) {
	validate := validator.New()
	lang := common.GetLangFromCtx(ctx, "")
	validate.RegisterTagNameFunc(common.TagNameI18N(lang))
	trans := common.LoadValidateTranslator(lang, validate)
	err = validate.Struct(md)
	if err != nil {
		var lines []string
		var errs validator.ValidationErrors
		errors.As(err, &errs)
		for _, v := range errs.Translate(trans) {
			lines = append(lines, v)
		}
		if len(lines) > 0 {
			err = errors.New(strings.Join(lines, "\n"))
		}
	}
	return
}

// ClusterUpdate 集群修改
type ClusterUpdate struct {
	//主键
	ID string `gorm:"type:varchar(50);column:id" json:"id" validate:"required" description:"记录ID"`
	//修改时间
	UpdatedAt time.Time `gorm:"autoUpdateTime;column:updated_at;<-:update" json:"-" description:"更新时间"`
	//更新者
	UpdaterId string `gorm:"type:varchar(50);column:updater_id;<-:update" json:"-" validate:"required" description:"更新者"`
	//集群编码
	Code string `gorm:"type:varchar(50);column:code;<-:create" json:"code" validate:"required,max=50" description:"集群编码"`
	//集群名称
	Name string `gorm:"type:varchar(50);column:name" json:"name" validate:"required,max=50" description:"集群名称"`
	//是否有效
	Enable bool `gorm:"column:enable;default:true" json:"enable" description:"是否有效"`
	//集群类型
	Category string `gorm:"type:varchar(50);column:category" validate:"required" json:"category" description:"集群类型"`
	//集群版本
	Version KubernetesVersion `gorm:"column:version" json:"-" description:"集群版本"`
	//描述
	Description string `gorm:"type:varchar(255);column:description" json:"description" description:"描述"`
	//apiserver地址
	ApiServer string `gorm:"type:varchar(255);column:api_server"  json:"apiServer" validate:"required" description:"集群API Server地址"`
	//集群CA证书:Base64编码，若为编码，则自动编码为base64
	CertificateAuthority string `gorm:"type:text;column:certificate_authority" json:"certificateAuthority" description:"集群CA证书"`
	//CA过期时间
	ExpireTime time.Time `gorm:"column:expire_time" json:"expireTime" validate:"required_with=CertificateAuthority" description:"CA过期时间"`
	//集群管理员用户客户端证书，Base64编码，若为编码，则自动编码为base64"
	ClientCertificate string `gorm:"type:text;column:client_certificate"  json:"clientCertificate" description:"客户端证书"`
	//集群管理员用户客户端Key，Base64编码，若为编码，则自动编码为base64
	ClientKey string `gorm:"type:text;column:client_key" json:"clientKey" description:"客户端Key"`
	//域名列表:用于模版部署时提示使用
	DomainList ArrayString `gorm:"type:json;column:domain_list" json:"domainList" description:"域名列表"`
	//扩展配置信息
	ExtendConfig *ClusterExtendConfig `gorm:"type:json;column:extend_config" json:"extendConfig" description:"扩展配置信息"`
	//更新链接信息
	UpdateConnect bool `gorm:"-" json:"updateConnect" description:"更新链接信息"`
}

func (md *ClusterUpdate) Default(ctx context.Context) {
	md.Category = "kubernetes"
	md.UpdaterId = config.GetOperatorFromCtx(ctx)
	md.UpdatedAt = time.Now()
	md.ClientKey = strings.TrimSpace(md.ClientKey)
	md.ClientCertificate = strings.TrimSpace(md.ClientCertificate)
	md.CertificateAuthority = strings.TrimSpace(md.CertificateAuthority)
	if strings.HasPrefix(md.ClientKey, "--") {
		md.ClientKey = base64.StdEncoding.EncodeToString([]byte(md.ClientKey))
	}
	if strings.HasPrefix(md.CertificateAuthority, "--") {
		md.CertificateAuthority = base64.StdEncoding.EncodeToString([]byte(md.CertificateAuthority))
	}
	if strings.HasPrefix(md.ClientCertificate, "--") {
		md.ClientCertificate = base64.StdEncoding.EncodeToString([]byte(md.ClientCertificate))
	}
	if md.ClientKey != "" && md.CertificateAuthority != "" {
		if version, err := GetClusterVersion(md.ApiServer, md.ClientKey, md.ClientCertificate, md.CertificateAuthority); err == nil {
			md.Version = version
		}
	}

	if len(md.CertificateAuthority) > 0 {
		if strings.HasPrefix(md.CertificateAuthority, "LS0t") {
			bt, _ := base64.StdEncoding.DecodeString(md.CertificateAuthority)
			md.CertificateAuthority = string(bt)
		}
		block, _ := pem.Decode([]byte(md.CertificateAuthority))
		if block == nil {
			config.Logger.Error("failed to decode PEM block containing the certificate")
			return
		}
		// 解析CA证书
		cert, err := x509.ParseCertificate(block.Bytes)
		if err != nil {
			config.Logger.Error(err)
			return
		}
		md.ExpireTime = cert.NotAfter
		md.CertificateAuthority, _ = config.ClusterCertDataEncrypt(md.CertificateAuthority)
	}
	if len(md.ClientKey) > 0 {
		md.ClientKey, _ = config.ClusterCertDataEncrypt(md.ClientKey)
	}
	if len(md.ClientCertificate) > 0 {
		md.ClientCertificate, _ = config.ClusterCertDataEncrypt(md.ClientCertificate)
	}
	md.UpdatedAt = time.Now()

}
func (md *ClusterUpdate) Validate(ctx context.Context) (err error) {
	validate := validator.New()
	lang := common.GetLangFromCtx(ctx, "")
	validate.RegisterTagNameFunc(common.TagNameI18N(lang))
	trans := common.LoadValidateTranslator(lang, validate)
	err = validate.Struct(md)
	if err != nil {
		var lines []string
		var errs validator.ValidationErrors
		errors.As(err, &errs)
		for _, v := range errs.Translate(trans) {
			lines = append(lines, v)
		}
		if len(lines) > 0 {
			err = errors.New(strings.Join(lines, "\n"))
		}
	}
	return
}

// ClusterStatus  集群启用禁用
type ClusterStatus struct {
	//主键
	Ids []string `json:"ids" validate:"required" description:"主键"`
	//更新时间
	UpdatedAt time.Time `gorm:"autoUpdateTime;column:updated_at;<-:update" json:"-" description:"更新时间"`
	//更新者
	UpdaterId string `gorm:"type:varchar(50);column:updater_id;<-:update" json:"-" validate:"required" description:"更新者"`
	//是否有效
	Enable bool `gorm:"column:enable;default:true" json:"enable" description:"是否有效"`
}

func (md *ClusterStatus) Default(ctx context.Context) {
	md.UpdaterId = config.GetOperatorFromCtx(ctx)
	md.UpdatedAt = time.Now()
}

// ClusterUpdateFeatures 集群特性修改
type ClusterUpdateFeatures struct {
	//主键
	ID string `gorm:"type:varchar(50);column:id" json:"id" validate:"required" description:"记录ID"`
	//修改时间
	UpdatedAt time.Time `gorm:"autoUpdateTime;column:updated_at;<-:update" json:"-" description:"更新时间"`
	//更新者
	UpdaterId string `gorm:"type:varchar(50);column:updater_id;<-:update" json:"-" validate:"required" description:"更新者"`
}

func (md *ClusterUpdateFeatures) Default(ctx context.Context) {
	md.UpdaterId = config.GetOperatorFromCtx(ctx)
	md.UpdatedAt = time.Now()
}

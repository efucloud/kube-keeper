package dtos

import (
	"context"
	"errors"
	"fmt"
	"github.com/efucloud/kube-keeper/pkg/config"
	"strings"
	"time"

	"github.com/efucloud/common"
	"github.com/efucloud/kube-keeper/pkg/utils"
	"github.com/go-playground/validator/v10"
	"gorm.io/gorm"
)

// ClusterAccountDetailList 集群列用户表响应
type ClusterAccountDetailList struct {
	//当前页数据
	Data []*ClusterAccountDetail `json:"data"`
	//数据库满足条件的数据总数
	Total int64 `json:"total"`
}

// ClusterAccountDetail 集群的用户信息
type ClusterAccountDetail struct {
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
	//集群ID
	ClusterId string `gorm:"type:varchar(50);column:cluster_id;<-:create" json:"clusterId" validate:"required" description:"集群ID"`
	//用户ID
	AccountId string `gorm:"type:varchar(50);column:account_id" json:"accountId" validate:"required" description:"所属用户ID"`
	//集群用户
	Account AccountDetail `gorm:"foreignKey:ID;references:AccountId" json:"account" description:"所属用户"`
	//邮箱:csr中指定的邮箱
	Email string `gorm:"type:varchar(50);column:email"  yaml:"email" json:"email" validate:"required" description:"CSR中指定的邮箱"`
	//CSR有效期:单位(s)
	ExpirationSeconds int32 `gorm:"column:expiration_seconds"  json:"expirationSeconds" validate:"required" description:"CSR有效期:单位(s)"`
	//客户端证书
	ClientCertificate string `gorm:"type:text;column:c" json:"-" description:"客户端证书"`
	//客户端Key
	ClientKey string `gorm:"type:text;column:c2" json:"-" description:"客户端Key"`
	//CSR名称:用户在集群中CSR名称
	CsrName string `gorm:"type:varchar(200);column:n" json:"csrName" validate:"required" description:"CSR名称"`
	//集群核准状态
	State string `gorm:"type:varchar(50);column:state" json:"state" validate:"required" description:"集群核准状态"`
	//原因:失败时的原因
	Reason string `gorm:"type:text;column:reason" json:"reason" description:"失败原因"`
	//授权说明或原因
	Description string `gorm:"type:varchar(255);column:description" json:"description" description:"授权说明或原因"`
	//超级管理员
	IsSupper bool `gorm:"column:is_supper" json:"isSupper" description:"超级管理员"`
	//是否有效
	Enable bool `gorm:"column:enable;default:true" json:"enable" description:"是否有效"`
}

func (md *ClusterAccountDetail) Default(ctx context.Context) {
	if len(md.ClientKey) > 0 {
		md.ClientKey, _ = config.ClusterCertDataDecrypt(md.ClientKey)
	}
	if len(md.ClientCertificate) > 0 {
		md.ClientCertificate, _ = config.ClusterCertDataDecrypt(md.ClientCertificate)
	}
}

// ClusterAccountCreate 用户在集群的csr
// 创建用户在集群的csr，针对没有对接eauth的集群
type ClusterAccountCreate struct {
	//主键
	ID string `gorm:"primarykey;column:id;type:varchar(50)" json:"-" description:"记录ID"`
	//创建时间
	CreatedAt time.Time `gorm:"autoCreateTime;column:created_at;<-:create" json:"-" description:"创建时间"`
	//创建者
	CreatorId string `gorm:"type:varchar(50);column:creator_id;<-:create" validate:"required" json:"-" description:"创建者"`
	//用户ID
	AccountId string `gorm:"type:varchar(50);column:account_id" json:"accountId" validate:"required" description:"所属用户ID"`
	//集群ID
	ClusterId string `gorm:"type:varchar(50);column:cluster_id;<-:create" json:"clusterId" validate:"required" description:"集群ID"`
	//邮箱:csr中指定的邮箱
	Email string `gorm:"type:varchar(50);column:email"  yaml:"email" json:"email" validate:"required" description:"CSR中指定的邮箱"`
	//CSR有效期:单位(s)
	ExpirationSeconds int32 `gorm:"column:expiration_seconds"  json:"expirationSeconds" validate:"required" description:"CSR有效期:单位(s)"`
	//客户端证书
	ClientCertificate string `gorm:"type:text;column:c" json:"clientCertificate" description:"客户端证书"`
	//客户端Key
	ClientKey string `gorm:"type:text;column:c2" json:"clientKey" description:"客户端Key"`
	//CSR名称:用户在集群中CSR名称
	CsrName string `gorm:"type:varchar(200);column:n" json:"csrName" validate:"required" description:"CSR名称"`
	//集群核准状态
	State string `gorm:"type:varchar(50);column:state" json:"state" validate:"required" description:"集群核准状态"`
	//原因:失败时的原因
	Reason string `gorm:"type:text;column:reason" json:"reason" description:"失败原因"`
	//授权说明或原因
	Description string `gorm:"type:varchar(255);column:description" json:"description" description:"授权说明或原因"`
	//超级管理员
	IsSupper bool `gorm:"column:is_supper" json:"isSupper" description:"超级管理员"`
	//用户ID信息Hash
	Hash string `gorm:"type:varchar(255);column:hash" json:"-" description:"用户IDHash"`
	//用户邮箱信息Hash
	Hash2 string `gorm:"type:varchar(255);column:hash2" json:"-" description:"邮箱Hash"`
}

func (md *ClusterAccountCreate) Default(ctx context.Context) {
	md.CreatorId = config.GetOperatorFromCtx(ctx)
	md.ID = utils.GenerateDatabaseId()
	md.CreatedAt = time.Now()
	if md.ExpirationSeconds < 600 {
		md.ExpirationSeconds = 10 * 365 * 24 * 60
	}
	if len(md.State) == 0 {
		md.State = "Wait"
	}
	if len(md.CsrName) == 0 {
		md.CsrName = fmt.Sprintf("efucloud-account--%s", md.AccountId)
	}
	if len(md.ClientKey) > 0 {
		md.ClientKey, _ = config.ClusterCertDataEncrypt(md.ClientKey)
	}
	if len(md.ClientCertificate) > 0 {
		md.ClientCertificate, _ = config.ClusterCertDataEncrypt(md.ClientCertificate)
	}
	md.Hash = common.MD5V(fmt.Sprintf("%s-%s", md.ClusterId, md.AccountId))
	md.Hash2 = common.MD5V(fmt.Sprintf("%s-%s", md.ClusterId, md.Email))
}
func (md *ClusterAccountCreate) Validate(ctx context.Context) (err error) {
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

// ClusterAccountUpdate 用户在集群的csr
// 创建用户在集群的csr，针对没有对接eauth的集群
type ClusterAccountUpdate struct {
	//主键
	ID string `gorm:"type:varchar(50);column:id" json:"id" validate:"required" description:"记录ID"`
	//修改时间
	UpdatedAt time.Time `gorm:"autoUpdateTime;column:updated_at;<-:update" json:"-" description:"更新时间"`
	//更新者
	UpdaterId string `gorm:"type:varchar(50);column:updater_id;<-:update" json:"-" validate:"required" description:"更新者"`
	//CSR有效期:单位(s)
	ExpirationSeconds int32 `gorm:"column:expiration_seconds"  json:"expirationSeconds" validate:"required" description:"CSR有效期:单位(s)"`
	//客户端证书
	ClientCertificate string `gorm:"type:text;column:c" json:"clientCertificate" description:"客户端证书"`
	//客户端Key
	ClientKey string `gorm:"type:text;column:c2" json:"clientKey" description:"客户端Key"`
	//CSR名称:用户在集群中CSR名称
	CsrName string `gorm:"type:varchar(200);column:n" json:"csrName" description:"CSR名称"`
	//集群核准状态
	State string `gorm:"type:varchar(50);column:state" json:"state" description:"集群核准状态"`
	//原因:失败时的原因
	Reason string `gorm:"type:text;column:reason" json:"reason" description:"失败原因"`
}

func (md *ClusterAccountUpdate) Default(ctx context.Context) {
	md.UpdaterId = config.GetOperatorFromCtx(ctx)
	md.UpdatedAt = time.Now()
	if len(md.State) == 0 {
		md.State = "Wait"
	}
	if len(md.ClientKey) > 0 {
		md.ClientKey, _ = config.ClusterCertDataEncrypt(md.ClientKey)
	}
	if len(md.ClientCertificate) > 0 {
		md.ClientCertificate, _ = config.ClusterCertDataEncrypt(md.ClientCertificate)
	}
}
func (md *ClusterAccountUpdate) Validate(ctx context.Context) (err error) {
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

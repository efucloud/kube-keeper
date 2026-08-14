package dtos

import (
	"context"
	"errors"
	"github.com/efucloud/kube-keeper/pkg/config"
	"strings"
	"time"

	"github.com/efucloud/common"
	"github.com/efucloud/kube-keeper/pkg/utils"
	"github.com/go-playground/validator/v10"
	"gorm.io/gorm"
)

// ClusterExtendDetailList  集群扩展信息列表响应
type ClusterExtendDetailList struct {
	//当前页数据
	Data []*ClusterExtendDetail `json:"data"`
	//数据库满足条件的数据总数
	Total int64 `json:"total"`
}

// ClusterExtendDetail 集群扩展信息
// 包括集群审计日志信息，集群备份信息等，未来可继续扩展
type ClusterExtendDetail struct {
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
	//集群备份S3配置
	VeleroStorageConfig *S3StorageConfig `gorm:"type:json;column:velero_storage_config" json:"veleroStorageConfig"`
	//pod文件上传地址
	FileStorageConfig *S3StorageConfig `gorm:"type:json;column:file_storage_config" json:"fileStorageConfig"`
	//集群审计日志配置
	AuditLogConfig *AuditLogConfig `gorm:"type:json;column:audit_log_config" json:"auditLogConfig"`
}

// ClusterExtendCreate 集群扩展信息创建
// 包括集群审计日志信息，集群备份信息等，未来可继续扩展
type ClusterExtendCreate struct {

	//主键
	ID string `gorm:"primarykey;column:id;type:varchar(50)" json:"-" description:"记录ID"`
	//创建时间
	CreatedAt time.Time `gorm:"autoCreateTime;column:created_at;<-:create" json:"-" description:"创建时间"`
	//创建者
	CreatorId string `gorm:"type:varchar(50);column:creator_id;<-:create" validate:"required" json:"-" description:"创建者"`

	//集群ID
	ClusterId string `gorm:"type:varchar(50);column:cluster_id;<-:create" json:"clusterId" validate:"required" description:"集群ID"`
	//集群备份S3配置
	VeleroStorageConfig *S3StorageConfig `gorm:"type:json;column:velero_storage_config" json:"veleroStorageConfig"`
	//pod文件上传地址
	FileStorageConfig *S3StorageConfig `gorm:"type:json;column:file_storage_config" json:"fileStorageConfig"`
	//集群审计日志配置
	AuditLogConfig *AuditLogConfig `gorm:"type:json;column:audit_log_config" json:"auditLogConfig"`
}

func (md *ClusterExtendCreate) Default(ctx context.Context) {
	md.CreatorId = config.GetOperatorFromCtx(ctx)
	md.ID = utils.GenerateDatabaseId()
	md.CreatedAt = time.Now()
}
func (md *ClusterExtendCreate) Validate(ctx context.Context) (err error) {
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

// ClusterExtendUpdate 集群扩展信息修改
// 包括集群审计日志信息，集群备份信息等，未来可继续扩展
type ClusterExtendUpdate struct {
	//主键
	ID string `gorm:"type:varchar(50);column:id" json:"id" validate:"required" description:"记录ID"`
	//修改时间
	UpdatedAt time.Time `gorm:"autoUpdateTime;column:updated_at;<-:update" json:"-" description:"更新时间"`
	//更新者
	UpdaterId string `gorm:"type:varchar(50);column:updater_id;<-:update" json:"-" validate:"required" description:"更新者"`

	//集群ID
	ClusterId string `gorm:"type:varchar(50);column:cluster_id;<-:create" json:"clusterId" validate:"required" description:"集群ID"`
	//集群备份S3配置
	VeleroStorageConfig *S3StorageConfig `gorm:"type:json;column:velero_storage_config" json:"veleroStorageConfig"`
	//pod文件上传地址
	FileStorageConfig *S3StorageConfig `gorm:"type:json;column:file_storage_config" json:"fileStorageConfig"`
	//集群审计日志配置
	AuditLogConfig *AuditLogConfig `gorm:"type:json;column:audit_log_config" json:"auditLogConfig"`
}

func (md *ClusterExtendUpdate) Default(ctx context.Context) {
	md.UpdaterId = config.GetOperatorFromCtx(ctx)
	md.UpdatedAt = time.Now()
}
func (md *ClusterExtendUpdate) Validate(ctx context.Context) (err error) {
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

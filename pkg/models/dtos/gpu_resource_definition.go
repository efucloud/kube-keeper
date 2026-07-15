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

// GpuResourceDefinitionDetailList  GPU资源定义列表响应
type GpuResourceDefinitionDetailList struct {
	//当前页数据
	Data []*GpuResourceDefinitionDetail `json:"data"`
	//数据库满足条件的数据总数
	Total int64 `json:"total,omitempty" validate:"required"`
}

// GpuResourceDefinitionDetail GPU资源定义详情
type GpuResourceDefinitionDetail struct {
	//主键
	ID string `gorm:"primarykey;column:id;type:varchar(50)" json:"id" description:"记录ID"`
	//创建时间
	CreatedAt time.Time `gorm:"autoCreateTime;column:created_at;<-:create" json:"createdAt" description:"创建时间"`
	//更新时间
	UpdatedAt time.Time `gorm:"column:updated_at" json:"updatedAt" description:"更新时间"`
	//创建者
	CreatorId string `gorm:"type:varchar(50);column:creator_id;<-:create" validate:"required" json:"creatorId" description:"创建者"`
	//更新者
	UpdaterId string `gorm:"type:varchar(50);column:updater_id;<-:update" json:"updaterId" validate:"required" description:"更新者"`
	//软删除
	DeletedAt gorm.DeletedAt `gorm:"column:deleted_at" json:"deletedAt,omitempty"`
	//删除状态
	DelFlag string `gorm:"type:varchar(50);column:del_flag;default:active" json:"-" description:"删除状态"`
	//编码
	Code string `gorm:"type:varchar(50);column:code;<-:create" json:"code" validate:"required" description:"编码"`
	//名称
	Name string `gorm:"type:varchar(50)" json:"name"  validate:"required" description:"名称"`
	//参数
	Parameters GpuResourceParamDefinitions `gorm:"column:parameters" json:"parameters" validate:"required" description:"参数"`
}

// GpuResourceDefinitionCreate GPU资源定义创建
type GpuResourceDefinitionCreate struct {
	//主键
	ID string `gorm:"primarykey;column:id;type:varchar(50)" json:"-" description:"记录ID"`
	//创建时间
	CreatedAt time.Time `gorm:"autoCreateTime;column:created_at;<-:create" json:"-" description:"创建时间"`
	//创建者
	CreatorId string `gorm:"type:varchar(50);column:creator_id;<-:create" validate:"required" json:"-" description:"创建者"`
	//编码
	Code string `gorm:"type:varchar(50);column:code;<-:create" json:"code" validate:"required" description:"编码"`
	//名称
	Name string `gorm:"type:varchar(50)" json:"name"  validate:"required" description:"名称"`
	//参数
	Parameters GpuResourceParamDefinitions `gorm:"column:parameters" json:"parameters" validate:"required" description:"参数"`
}

func (md *GpuResourceDefinitionCreate) Default(ctx context.Context) {
	md.CreatorId = config.GetOperatorFromCtx(ctx)
	md.ID = utils.GenerateDatabaseId()
	md.CreatedAt = time.Now()
}
func (md *GpuResourceDefinitionCreate) Validate(ctx context.Context) (err error) {
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

// GpuResourceDefinitionUpdate GPU资源定义更新
type GpuResourceDefinitionUpdate struct {
	//主键
	ID string `gorm:"type:varchar(50);column:id" json:"id" validate:"required" description:"记录ID"`
	//更新时间
	UpdatedAt time.Time `gorm:"autoUpdateTime;column:updated_at;<-:update" json:"-" description:"更新时间"`
	//更新者
	UpdaterId string `gorm:"type:varchar(50);column:updater_id;<-:update" json:"-" validate:"required" description:"更新者"`
	//名称
	Name string `gorm:"type:varchar(50)" json:"name"  validate:"required" description:"名称"`
	//参数
	Parameters GpuResourceParamDefinitions `gorm:"column:parameters" json:"parameters" validate:"required" description:"参数"`
}

func (md *GpuResourceDefinitionUpdate) Default(ctx context.Context) {
	md.UpdaterId = config.GetOperatorFromCtx(ctx)
	md.UpdatedAt = time.Now()
}
func (md *GpuResourceDefinitionUpdate) Validate(ctx context.Context) (err error) {
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

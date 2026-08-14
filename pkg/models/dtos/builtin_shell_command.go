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

// BuiltinShellCommandDetailList 内建shell命令列表响应
type BuiltinShellCommandDetailList struct {
	//当前页数据
	Data []*BuiltinShellCommandDetail `json:"data"`
	//数据库满足条件的数据总数
	Total int64 `json:"total"`
}

// BuiltinShellCommandDetail 内置的shell命令详情
// 用户可以选择内置的命令快速实现对容器的运维，同时减少手动输入错误的可能性
type BuiltinShellCommandDetail struct {
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
	//命令名称
	Name string `gorm:"type:varchar(50);column:name" json:"name" validate:"required,max=50" yaml:"name" description:"命令名称"`
	//命令说明
	Description string `gorm:"type:varchar(255);column:description" json:"description" description:"命令说明"`
	//命令内容:支持模板化参数
	Command string `gorm:"type:text;column:command" json:"command" validate:"required"  yaml:"command" description:"命令内容"`
}

// BuiltinShellCommandCreate 内置命名创建
// 管理员可以根据需要创建任何shell命令
type BuiltinShellCommandCreate struct {
	//主键
	ID string `gorm:"primarykey;column:id;type:varchar(50)" json:"-" description:"记录ID"`
	//创建时间
	CreatedAt time.Time `gorm:"autoCreateTime;column:created_at;<-:create" json:"-" description:"创建时间"`
	//创建者
	CreatorId string `gorm:"type:varchar(50);column:creator_id;<-:create" validate:"required" json:"-" description:"创建者"`
	//命令名称
	Name string `gorm:"type:varchar(50);column:name" json:"name" validate:"required,max=50" yaml:"name" description:"命令名称"`
	//命令说明
	Description string `gorm:"type:varchar(255);column:description" json:"description" description:"命令说明"`
	//命令内容:支持模板化参数
	Command string `gorm:"type:text;column:command" json:"command" validate:"required"  yaml:"command" description:"命令内容"`
}

func (md *BuiltinShellCommandCreate) Default(ctx context.Context) {
	md.ID = utils.GenerateDatabaseId()
	md.CreatedAt = time.Now()
	md.CreatorId = config.GetOperatorFromCtx(ctx)
}
func (md *BuiltinShellCommandCreate) Validate(ctx context.Context) (err error) {
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

type BuiltinShellCommandUpdate struct {
	//主键
	ID string `gorm:"type:varchar(50);column:id" json:"id" validate:"required" description:"记录ID"`
	//修改时间
	UpdatedAt time.Time `gorm:"autoUpdateTime;column:updated_at;<-:update" json:"-" description:"更新时间"`
	//更新者
	UpdaterId string `gorm:"type:varchar(50);column:updater_id;<-:update" json:"-" validate:"required" description:"更新者"`
	//命令名称
	Name string `gorm:"type:varchar(50);column:name" json:"name" validate:"required,max=50" yaml:"name" description:"命令名称"`
	//命令说明
	Description string `gorm:"type:varchar(255);column:description" json:"description" description:"命令说明"`
	//命令内容:支持模板化参数
	Command string `gorm:"type:text;column:command" json:"command" validate:"required"  yaml:"command" description:"命令内容"`
}

func (md *BuiltinShellCommandUpdate) Default(ctx context.Context) {
	md.UpdatedAt = time.Now()
	md.UpdaterId = config.GetOperatorFromCtx(ctx)
}
func (md *BuiltinShellCommandUpdate) Validate(ctx context.Context) (err error) {
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

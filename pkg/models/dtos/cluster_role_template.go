package dtos

import (
	"context"
	"errors"
	"github.com/efucloud/common"
	"github.com/go-playground/validator/v10"
	"strings"
	"time"
)

// ClusterRoleTemplateList 集群角色模版
type ClusterRoleTemplateList struct {
	//当前页数据
	Data []ClusterRoleTemplate `json:"data"`
	//数据库满足条件的数据总数
	Total int64 `json:"total"`
}

type ClusterRoleTemplate struct {
	//角色类型
	Category string `gorm:"type:varchar(255);column:category" json:"category" validate:"oneof=Role ClusterRole" enum:"Role|ClusterRole"`
	//角色名称,从模板中获取
	Name string `gorm:"type:varchar(50);column:name" json:"name" validate:"required" description:"角色名称"`
	//角色规则
	Rule TemplateClusterRoleRule `gorm:"column:rule" json:"rule" validate:"required" description:"角色规则"`
	//角色描述
	Description string `gorm:"type:varchar(255);column:description" json:"description" validate:"required" description:"角色描述"`
}

// NamespaceAuthorizeByTemplate 模版授权
type NamespaceAuthorizeByTemplate struct {
	//模版ID
	TemplateId string `json:"templateId" validate:"required" description:"模版ID"`
	//命名空间列表 ,类型为Role时有效
	Namespaces []string `json:"namespaces" validate:"required"  description:"命名空间列表"`
	//用户ID列表
	AccountIds []string `json:"accountIds" validate:"required" description:"用户ID列表"`
}

func (md *NamespaceAuthorizeByTemplate) Default(ctx context.Context) {
}
func (md *NamespaceAuthorizeByTemplate) Validate(ctx context.Context) (err error) {
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

// AuthorizeByAccount 用户授权
type AuthorizeByAccount struct {
	//类型
	Category string `json:"category" validate:"required" description:"类型"`
	//模版名称
	Templates []string `json:"templates" validate:"required" description:"模版ID列表"`
	//命名空间列表 ,类型为Role时有效
	Namespaces []string `json:"namespaces" validate:"required_if=ClusterRole Role" description:"命名空间列表"`
	//用户ID
	AccountId string `json:"accountId" validate:"required" description:"用户ID"`
	//临时权限
	IsTemp bool `gorm:"column:is_temp" json:"isTemp" description:"临时权限"`
	//开始时间
	StartTime time.Time `gorm:"column:start_time" json:"startTime" validate:"required_if=IsTemp true" description:"开始时间"`
	//结束时间
	EndTime time.Time `gorm:"column:end_time" json:"endTime"  validate:"required_if=IsTemp true"  description:"结束时间"`
}

func (md *AuthorizeByAccount) Default(ctx context.Context) {
}
func (md *AuthorizeByAccount) Validate(ctx context.Context) (err error) {
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

// ClusterAuthorizeByTemplate 模版授权
type ClusterAuthorizeByTemplate struct {
	//角色
	TemplateId string `json:"templateId" description:"角色模版ID"`
	//用户ID列表
	AccountIds []string `json:"accountIds" validate:"required" description:"用户ID列表"`
}

func (md *ClusterAuthorizeByTemplate) Default(ctx context.Context) {

}
func (md *ClusterAuthorizeByTemplate) Validate(ctx context.Context) (err error) {
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

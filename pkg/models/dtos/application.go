package dtos

import (
	"context"
	"errors"
	"fmt"
	"github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/models"
	"github.com/efucloud/kube-keeper/pkg/utils"
	"strings"
	"time"

	"github.com/efucloud/common"
	"github.com/go-playground/validator/v10"
)

type ApplicationDetailList struct {
	//当前页数据
	Data []*ApplicationDetail `json:"data"`
	//数据库满足条件的数据总数
	Total int64 `json:"total"`
}

// ApplicationDetail 模版应用
type ApplicationDetail struct {
	//主键
	ID string `gorm:"type:varchar(50);primarykey;column:id" json:"id" description:"记录ID"`
	//创建时间
	CreatedAt time.Time `gorm:"autoCreateTime;column:created_at;<-:create" json:"-" description:"创建时间"`
	//创建者
	CreatorId string `gorm:"type:varchar(50);column:creator_id;<-:create" validate:"required" json:"creatorId" description:"创建者"`
	//状态 0:Draft 1::Released 2:Archived
	State uint `gorm:"column:state;default:0" json:"state" yaml:"state" validate:"oneof=0 1 2" enum:"0|1|2" description:"状态"`
	//显示名称
	Name string `gorm:"type:varchar(255);column:name" json:"name"  description:"显示名称"`
	//版本描述
	Description string `gorm:"type:text;column:description" json:"description" validate:"required" yaml:"description" description:"版本描述"`
	//模版内容,yaml格式，支持多个，若为helm部署，则为values.yaml内容
	Templates ArrayString `gorm:"column:templates" json:"templates" yaml:"templates" validate:"required_if=Type base" description:"模版内容"`
	//模版资源索引
	ResourceIndex ResourceIndex `gorm:"type:varchar(255);column:resource_index" json:"resourceIndex" validate:"required_if=DeployMethod yaml" description:"模版资源索引"`
	//有CRD资源
	HasCRD bool `gorm:"column:has_crd" json:"hasCrd" yaml:"hasCrd" description:"有CRD资源"`
	// 应用参数
	Parameters ParameterDefinitions `gorm:"type:json;column:parameters" json:"parameters"  yaml:"parameters" description:"模版参数"`
	//版本
	Version string `gorm:"type:varchar(50);column:version" json:"version" yaml:"version" validate:"-" description:"版本"`
}

func (t *ApplicationDetail) TableName() string {
	return models.ApplicationTableName
}

// ApplicationCreate 应用部署模版创建
type ApplicationCreate struct {
	//主键
	ID string `gorm:"type:varchar(50);primarykey;column:id" json:"-" description:"记录ID"`
	//创建时间
	CreatedAt time.Time `gorm:"autoCreateTime;column:created_at;<-:create" json:"-" description:"创建时间"`
	//创建者
	CreatorId string `gorm:"type:varchar(50);column:creator_id;<-:create" validate:"required" json:"creatorId" description:"创建者"`
	//状态 0:Draft 1::Released 2:Archived
	State uint `gorm:"column:state;default:0" json:"state" yaml:"state" validate:"oneof=0 1 2" enum:"0|1|2" description:"状态"`
	//显示名称
	Name string `gorm:"type:varchar(255);column:name" json:"name"  description:"显示名称"`
	//版本描述
	Description string `gorm:"type:text;column:description" json:"description" validate:"required" yaml:"description" description:"版本描述"`
	//模版内容,yaml格式，支持多个，若为helm部署，则为values.yaml内容
	Templates ArrayString `gorm:"column:templates" json:"templates" yaml:"templates" validate:"required_if=Type base" description:"模版内容"`
	//模版资源索引
	ResourceIndex ResourceIndex `gorm:"type:varchar(255);column:resource_index" json:"resourceIndex" validate:"required_if=DeployMethod yaml" description:"模版资源索引"`
	//有CRD资源
	HasCRD bool `gorm:"column:has_crd" json:"hasCrd" yaml:"hasCrd" description:"有CRD资源"`
	// 应用参数
	Parameters ParameterDefinitions `gorm:"type:json;column:parameters" json:"parameters"  yaml:"parameters" description:"模版参数"`
	//版本
	Version string `gorm:"type:varchar(50);column:version" json:"version" yaml:"version" validate:"-" description:"版本"`
}

func (md *ApplicationCreate) Default(ctx context.Context) {
	md.CreatorId = config.GetOperatorFromCtx(ctx)
	if len(md.ID) == 0 {
		md.ID = utils.GenerateDatabaseId()
	}
	md.CreatedAt = time.Now()
	md.State = 0
	md.ResourceIndex, md.HasCRD = getTemplateIndex(md.Templates)

}
func (md *ApplicationCreate) Validate(ctx context.Context) (err error) {
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

// ApplicationUpdate 应用部署模版更新
type ApplicationUpdate struct {
	//主键
	ID string `gorm:"type:varchar(50);primarykey;column:id" json:"id" description:"记录ID"`
	//修改时间
	UpdatedAt time.Time `gorm:"autoUpdateTime;column:updated_at;<-:update" json:"updatedAt,omitempty" description:"更新时间"`
	//更新者
	UpdaterId string `gorm:"type:varchar(50);column:updater_id;<-:update" json:"updaterId" validate:"required" description:"更新者"`
	//状态 0:Draft 1::Released 2:Archived
	State uint `gorm:"column:state;default:0" json:"state" yaml:"state" validate:"oneof=0 1 2" enum:"0|1|2" description:"状态"`
	//显示名称
	Name string `gorm:"type:varchar(255);column:name" json:"name"  description:"显示名称"`
	//版本描述
	Description string `gorm:"type:text;column:description" json:"description" validate:"required" yaml:"description" description:"版本描述"`
	//模版内容,yaml格式，支持多个，若为helm部署，则为values.yaml内容
	Templates ArrayString `gorm:"column:templates" json:"templates" yaml:"templates" validate:"required_if=Type base" description:"模版内容"`
	//模版资源索引
	ResourceIndex ResourceIndex `gorm:"type:varchar(255);column:resource_index" json:"resourceIndex" validate:"required_if=DeployMethod yaml" description:"模版资源索引"`
	//有CRD资源
	HasCRD bool `gorm:"column:has_crd" json:"hasCrd" yaml:"hasCrd" description:"有CRD资源"`
	// 应用参数
	Parameters ParameterDefinitions `gorm:"type:json;column:parameters" json:"parameters"  yaml:"parameters" description:"模版参数"`
	//版本
	Version string `gorm:"type:varchar(50);column:version" json:"version" yaml:"version" validate:"-" description:"版本"`
}

func (md *ApplicationUpdate) Default(ctx context.Context) {
	md.UpdaterId = config.GetOperatorFromCtx(ctx)
	md.UpdatedAt = time.Now()
	md.ResourceIndex, md.HasCRD = getTemplateIndex(md.Templates)

}
func (md *ApplicationUpdate) Validate(ctx context.Context) (err error) {
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

func getTemplateIndex(templates []string) (indies ResourceIndex, hasCrd bool) {
	indies = make(ResourceIndex)
	for i := 0; i < len(templates); i++ {
		template := templates[i]
		var (
			kind       string
			apiVersion string
			name       string
		)
		lines := strings.Split(template, "\n")
		for _, line := range lines {
			if strings.HasPrefix(line, "kind: ") {
				kind = strings.TrimSpace(strings.TrimPrefix(line, "kind: "))
				if kind == "CustomResourceDefinition" {
					hasCrd = true
				}
			} else if strings.HasPrefix(line, "apiVersion: ") {
				apiVersion = strings.TrimSpace(strings.TrimPrefix(line, "apiVersion: "))
			} else if strings.HasPrefix(line, "  name: ") {
				name = strings.TrimSpace(strings.TrimPrefix(line, "  name: "))
			}
			if len(kind) > 0 && len(apiVersion) > 0 && len(name) > 0 {
				indies[fmt.Sprintf("%s|%s|%s", kind, apiVersion, name)] = i
			}
		}
	}
	return indies, hasCrd
}

// ApplicationExportImport 应用版本导入导出
type ApplicationExportImport struct {
	//显示名称
	Name string `gorm:"type:varchar(255);column:name" json:"name"  description:"显示名称"`
	//版本描述
	Description string `gorm:"type:text;column:description" json:"description" validate:"required" yaml:"description" description:"版本描述"`
	//模版内容,yaml格式，支持多个，若为helm部署，则为values.yaml内容
	Templates ArrayString `gorm:"column:templates" json:"templates" yaml:"templates" validate:"required_if=Type base" description:"模版内容"`
	//模版资源索引
	ResourceIndex ResourceIndex `gorm:"type:varchar(255);column:resource_index" json:"resourceIndex" validate:"required_if=DeployMethod yaml" description:"模版资源索引"`
	//有CRD资源
	HasCRD bool `gorm:"column:has_crd" json:"hasCrd" yaml:"hasCrd" description:"有CRD资源"`
	// 应用参数
	Parameters ParameterDefinitions `gorm:"type:json;column:parameters" json:"parameters"  yaml:"parameters" description:"模版参数"`
	//版本
	Version string `gorm:"type:varchar(50);column:version" json:"version" yaml:"version" validate:"-" description:"版本"`
}

func (t *ApplicationExportImport) TableName() string {
	return models.ApplicationTableName

}

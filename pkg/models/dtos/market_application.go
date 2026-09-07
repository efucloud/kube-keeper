package dtos

import (
	"context"
	"errors"
	"fmt"
	"reflect"
	"regexp"
	"strings"
	"time"

	"github.com/efucloud/common"
	"github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/models"
	"github.com/efucloud/kube-keeper/pkg/utils"
	"github.com/go-playground/validator/v10"
	"gorm.io/gorm"
)

type MarketApplicationDetailList struct {
	Data  []*MarketApplicationDetail `json:"data"`
	Total int64                      `json:"total"`
}

type MarketApplicationDetail struct {
	ID            string               `gorm:"column:id" json:"id" yaml:"id"`
	CreatedAt     time.Time            `gorm:"column:created_at" json:"createdAt" yaml:"-"`
	UpdatedAt     time.Time            `gorm:"column:updated_at" json:"updatedAt,omitempty" yaml:"-"`
	DeletedAt     gorm.DeletedAt       `gorm:"column:deleted_at" json:"-" yaml:"-"`
	DelFlag       string               `gorm:"column:del_flag" json:"-" yaml:"-"`
	CreatorId     string               `gorm:"column:creator_id" json:"creatorId" yaml:"-"`
	UpdaterId     string               `gorm:"column:updater_id" json:"updaterId" yaml:"-"`
	State         uint                 `gorm:"column:state" json:"state" yaml:"state"`
	Name          string               `gorm:"column:name" json:"name" yaml:"name"`
	Description   string               `gorm:"column:description" json:"description" yaml:"description"`
	Logo          string               `gorm:"column:logo" json:"logo" yaml:"logo"`
	Home          string               `gorm:"column:home" json:"home" yaml:"home"`
	Category      string               `gorm:"column:category" json:"category" yaml:"category"`
	Tags          ArrayString          `gorm:"column:tags" json:"tags" yaml:"tags"`
	Templates     ArrayString          `gorm:"column:templates" json:"templates" yaml:"templates"`
	ResourceIndex ResourceIndex        `gorm:"column:resource_index" json:"resourceIndex" yaml:"resourceIndex"`
	HasCRD        bool                 `gorm:"column:has_crd" json:"hasCrd" yaml:"hasCrd"`
	Parameters    ParameterDefinitions `gorm:"column:parameters" json:"parameters" yaml:"parameters"`
}

func (MarketApplicationDetail) TableName() string { return models.MarketApplicationTableName }

type MarketApplicationCreate struct {
	ID            string               `gorm:"column:id" json:"id,omitempty" yaml:"id,omitempty"`
	CreatedAt     time.Time            `gorm:"column:created_at" json:"-" yaml:"-"`
	CreatorId     string               `gorm:"column:creator_id" json:"-" yaml:"-"`
	DelFlag       string               `gorm:"column:del_flag" json:"-" yaml:"-"`
	State         uint                 `gorm:"column:state" json:"state" yaml:"state" validate:"oneof=0 1"`
	Name          string               `gorm:"column:name" json:"name" yaml:"name" validate:"required,max=255"`
	Description   string               `gorm:"column:description" json:"description" yaml:"description"`
	Logo          string               `gorm:"column:logo" json:"logo" yaml:"logo"`
	Home          string               `gorm:"column:home" json:"home" yaml:"home"`
	Category      string               `gorm:"column:category" json:"category" yaml:"category" validate:"required,max=100"`
	Tags          ArrayString          `gorm:"column:tags" json:"tags" yaml:"tags" validate:"max=4"`
	Templates     ArrayString          `gorm:"column:templates" json:"templates" yaml:"templates" validate:"required,min=1"`
	ResourceIndex ResourceIndex        `gorm:"column:resource_index" json:"-" yaml:"-"`
	HasCRD        bool                 `gorm:"column:has_crd" json:"-" yaml:"-"`
	Parameters    ParameterDefinitions `gorm:"column:parameters" json:"parameters" yaml:"parameters"`
}

func (md *MarketApplicationCreate) Default(ctx context.Context) {
	if md.ID == "" {
		md.ID = utils.GenerateDatabaseId()
	}
	if md.Category == "" {
		md.Category = "application"
	}
	md.CreatorId = config.GetOperatorFromCtx(ctx)
	md.CreatedAt = time.Now()
	md.DelFlag = "active"
	md.ResourceIndex, md.HasCRD = getTemplateIndex(md.Templates)
}

func (md *MarketApplicationCreate) Validate(ctx context.Context) error {
	return validateApplicationModel(ctx, md)
}

type MarketApplicationUpdate struct {
	ID            string               `gorm:"column:id" json:"id" validate:"required"`
	UpdatedAt     time.Time            `gorm:"column:updated_at" json:"-"`
	UpdaterId     string               `gorm:"column:updater_id" json:"-"`
	State         uint                 `gorm:"column:state" json:"state" validate:"oneof=0 1"`
	Name          string               `gorm:"column:name" json:"name" validate:"required,max=255"`
	Description   string               `gorm:"column:description" json:"description"`
	Logo          string               `gorm:"column:logo" json:"logo"`
	Home          string               `gorm:"column:home" json:"home"`
	Category      string               `gorm:"column:category" json:"category" validate:"required,max=100"`
	Tags          ArrayString          `gorm:"column:tags" json:"tags" validate:"max=4"`
	Templates     ArrayString          `gorm:"column:templates" json:"templates" validate:"required,min=1"`
	ResourceIndex ResourceIndex        `gorm:"column:resource_index" json:"-"`
	HasCRD        bool                 `gorm:"column:has_crd" json:"-"`
	Parameters    ParameterDefinitions `gorm:"column:parameters" json:"parameters"`
}

func (md *MarketApplicationUpdate) Default(ctx context.Context) {
	md.UpdaterId = config.GetOperatorFromCtx(ctx)
	md.UpdatedAt = time.Now()
	if md.Category == "" {
		md.Category = "application"
	}
	md.ResourceIndex, md.HasCRD = getTemplateIndex(md.Templates)
}

func (md *MarketApplicationUpdate) Validate(ctx context.Context) error {
	return validateApplicationModel(ctx, md)
}

type MarketApplicationState struct {
	ID    string `json:"id" validate:"required"`
	State uint   `json:"state" validate:"oneof=0 1"`
}

type MarketApplicationExportImport struct {
	ID          string               `json:"id,omitempty" yaml:"id,omitempty"`
	State       uint                 `json:"state" yaml:"state"`
	Name        string               `json:"name" yaml:"name" validate:"required"`
	Description string               `json:"description" yaml:"description"`
	Logo        string               `json:"logo" yaml:"logo"`
	Home        string               `json:"home" yaml:"home"`
	Category    string               `json:"category" yaml:"category"`
	Tags        ArrayString          `json:"tags" yaml:"tags"`
	Templates   ArrayString          `json:"templates" yaml:"templates" validate:"required,min=1"`
	Parameters  ParameterDefinitions `json:"parameters" yaml:"parameters"`
}

func validateApplicationModel(ctx context.Context, model any) error {
	validate := validator.New()
	lang := common.GetLangFromCtx(ctx, "")
	validate.RegisterTagNameFunc(common.TagNameI18N(lang))
	trans := common.LoadValidateTranslator(lang, validate)
	if err := validate.Struct(model); err != nil {
		var validationErrors validator.ValidationErrors
		if errors.As(err, &validationErrors) {
			lines := make([]string, 0, len(validationErrors))
			for _, line := range validationErrors.Translate(trans) {
				lines = append(lines, line)
			}
			return errors.New(strings.Join(lines, "\n"))
		}
		return err
	}
	var parameters ParameterDefinitions
	switch value := model.(type) {
	case *MarketApplicationCreate:
		parameters = value.Parameters
	case *MarketApplicationUpdate:
		parameters = value.Parameters
	}
	if err := validateParameterDefinitions(validate, parameters); err != nil {
		return err
	}
	return nil
}

var applicationParameterNamePattern = regexp.MustCompile(`^[A-Za-z_][A-Za-z0-9_.-]*$`)

func validateParameterDefinitions(validate *validator.Validate, parameters ParameterDefinitions) error {
	names := make(map[string]struct{}, len(parameters))
	for index, parameter := range parameters {
		if err := validate.Struct(parameter); err != nil {
			return fmt.Errorf("parameter %d is invalid: %w", index+1, err)
		}
		if !applicationParameterNamePattern.MatchString(parameter.Name) {
			return fmt.Errorf("parameter %d name %q is invalid", index+1, parameter.Name)
		}
		if _, exists := names[parameter.Name]; exists {
			return fmt.Errorf("parameter name %q is duplicated", parameter.Name)
		}
		names[parameter.Name] = struct{}{}
		if parameter.AllowableValues == nil {
			continue
		}
		kind := reflect.TypeOf(parameter.AllowableValues).Kind()
		if kind != reflect.Array && kind != reflect.Slice {
			return fmt.Errorf("parameter %q allowableValues must be an array", parameter.Name)
		}
	}
	return nil
}

func getTemplateIndex(templates []string) (ResourceIndex, bool) {
	index := make(ResourceIndex)
	hasCRD := false
	for i, content := range templates {
		for _, resource := range utils.SplitKubernetesResources(content) {
			meta := utils.GetResourceGroupVersion(resource)
			obj, err := utils.YamlToUnstructured(resource)
			if err != nil {
				continue
			}
			if meta.Kind == "CustomResourceDefinition" {
				hasCRD = true
			}
			if meta.Kind != "" && meta.APIVersion != "" && obj.GetName() != "" {
				index[fmt.Sprintf("%s|%s|%s", meta.Kind, meta.APIVersion, obj.GetName())] = i
			}
		}
	}
	return index, hasCRD
}

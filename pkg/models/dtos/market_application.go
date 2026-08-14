package dtos

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
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
	ID            string                       `gorm:"type:varchar(50);primarykey;column:id" json:"id"`
	CreatedAt     time.Time                    `gorm:"autoCreateTime;column:created_at;<-:create" json:"createdAt"`
	UpdatedAt     time.Time                    `gorm:"column:updated_at" json:"updatedAt,omitempty"`
	CreatorId     string                       `gorm:"type:varchar(50);column:creator_id;<-:create" validate:"required" json:"creatorId"`
	UpdaterId     string                       `gorm:"type:varchar(50);column:updater_id;<-:update" json:"updaterId" validate:"required"`
	DeletedAt     gorm.DeletedAt               `gorm:"column:deleted_at" json:"deletedAt,omitempty"`
	DelFlag       string                       `gorm:"type:varchar(50);column:del_flag;default:active" json:"-"`
	State         uint                         `gorm:"column:state;default:0" json:"state" yaml:"state" validate:"oneof=0 1 2 3 4 5 6" enum:"0|1|2|3|4|5|6"`
	ApplicationId string                       `gorm:"type:varchar(50);column:application_id" json:"applicationId" validate:"required"`
	Description   string                       `gorm:"type:text;column:description" json:"description" validate:"required" yaml:"description"`
	Templates     ArrayString                  `gorm:"column:templates" json:"templates,omitempty" yaml:"templates"`
	ResourceIndex ResourceIndex                `gorm:"type:varchar(255);column:resource_index" json:"resourceIndex"`
	HasCRD        bool                         `gorm:"column:has_crd" json:"hasCrd" yaml:"hasCrd"`
	Parameters    ParameterDefinitions         `gorm:"type:json;column:parameters" json:"parameters,omitempty" yaml:"parameters"`
	Outputs       ApplicationOutputDefinitions `gorm:"type:json;column:outputs" json:"outputs,omitempty" yaml:"outputs"`
	Mappings      ParametersMappings           `gorm:"type:json;column:mappings" json:"mappings,omitempty" yaml:"mappings"`
	Version       string                       `gorm:"type:varchar(50);column:version" json:"version" yaml:"version"`
	Type          string                       `gorm:"type:varchar(50);column:type;default:base" json:"type" validate:"oneof=base" enum:"base"`
	Nodes         ApplicationNodes             `gorm:"type:json;column:nodes" json:"nodes,omitempty" yaml:"nodes"`
	Edges         ApplicationEdges             `gorm:"type:json;column:edges" json:"edges,omitempty" yaml:"edges"`
	Hash          string                       `gorm:"type:varchar(255);column:hash" json:"hash"`
	HandleProps   ArrayString                  `gorm:"column:handle_props" json:"handleProps" yaml:"handleProps"`
}

func (t *MarketApplicationDetail) TableName() string {
	return models.MarketApplicationTableName
}

type MarketApplicationCreate struct {
	ID            string                       `gorm:"primarykey;column:id;type:varchar(50)" json:"-"`
	CreatedAt     time.Time                    `gorm:"autoCreateTime;column:created_at;<-:create" json:"-"`
	CreatorId     string                       `gorm:"type:varchar(50);column:creator_id;<-:create" validate:"required" json:"-"`
	State         uint                         `gorm:"column:state;default:0" json:"state" yaml:"state" validate:"oneof=0 1 2 3 4 5 6"`
	ApplicationId string                       `gorm:"type:varchar(50);column:application_id" json:"applicationId" validate:"required"`
	Description   string                       `gorm:"type:text;column:description" json:"description" validate:"required" yaml:"description"`
	Templates     ArrayString                  `gorm:"column:templates" json:"templates" yaml:"templates"`
	ResourceIndex ResourceIndex                `gorm:"type:varchar(255);column:resource_index" json:"-"`
	HasCRD        bool                         `gorm:"column:has_crd" json:"hasCrd" yaml:"hasCrd"`
	Parameters    ParameterDefinitions         `gorm:"type:json;column:parameters" json:"parameters" yaml:"parameters"`
	Outputs       ApplicationOutputDefinitions `gorm:"type:json;column:outputs" json:"outputs" yaml:"outputs"`
	Mappings      ParametersMappings           `gorm:"type:json;column:mappings" json:"mappings" yaml:"mappings"`
	Version       string                       `gorm:"type:varchar(50);column:version" json:"version" yaml:"version" validate:"required"`
	Type          string                       `gorm:"type:varchar(50);column:type;default:base" json:"type" validate:"oneof=base"`
	Nodes         ApplicationNodes             `gorm:"type:json;column:nodes" json:"nodes" yaml:"nodes"`
	Edges         ApplicationEdges             `gorm:"type:json;column:edges" json:"edges" yaml:"edges"`
	Hash          string                       `gorm:"type:varchar(255);column:hash" json:"hash"`
	HandleProps   ArrayString                  `gorm:"column:handle_props" json:"handleProps" yaml:"handleProps"`
}

func (md *MarketApplicationCreate) Default(ctx context.Context) {
	md.CreatorId = config.GetOperatorFromCtx(ctx)
	if len(md.ID) == 0 {
		md.ID = utils.GenerateDatabaseId()
	}
	if len(md.Type) == 0 {
		md.Type = "base"
	}
	md.CreatedAt = time.Now()
	md.Hash = buildMarketApplicationHash(md.Type, md.Templates, md.Parameters, md.Outputs, md.Mappings, md.Nodes, md.Edges, md.HandleProps)
	if md.Type == "base" {
		md.ResourceIndex, md.HasCRD = getTemplateIndex(md.Templates)
	}
}

func (md *MarketApplicationCreate) Validate(ctx context.Context) (err error) {
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
	if err == nil {
		err = validateMarketApplicationContent(md.Type, md.Templates, md.Outputs, md.Mappings, md.Nodes, md.Edges)
	}
	return
}

type MarketApplicationUpdate struct {
	ID            string                       `gorm:"type:varchar(50);primarykey;column:id" json:"id"`
	UpdatedAt     time.Time                    `gorm:"autoUpdateTime;column:updated_at;<-:update" json:"-"`
	UpdaterId     string                       `gorm:"type:varchar(50);column:updater_id;<-:update" validate:"required" json:"-"`
	ApplicationId string                       `gorm:"type:varchar(50);column:application_id" json:"applicationId" validate:"required"`
	Description   string                       `gorm:"type:text;column:description" json:"description" validate:"required" yaml:"description"`
	Templates     ArrayString                  `gorm:"column:templates" json:"templates" yaml:"templates"`
	ResourceIndex ResourceIndex                `gorm:"type:varchar(255);column:resource_index" json:"resourceIndex"`
	HasCRD        bool                         `gorm:"column:has_crd" json:"hasCrd" yaml:"hasCrd"`
	Parameters    ParameterDefinitions         `gorm:"type:json;column:parameters" json:"parameters" yaml:"parameters"`
	Outputs       ApplicationOutputDefinitions `gorm:"type:json;column:outputs" json:"outputs" yaml:"outputs"`
	Mappings      ParametersMappings           `gorm:"type:json;column:mappings" json:"mappings" yaml:"mappings"`
	Version       string                       `gorm:"type:varchar(50);column:version" json:"version" yaml:"version" validate:"required"`
	Type          string                       `gorm:"type:varchar(50);column:type;default:base" json:"type" validate:"oneof=base"`
	Nodes         ApplicationNodes             `gorm:"type:json;column:nodes" json:"nodes" yaml:"nodes"`
	Edges         ApplicationEdges             `gorm:"type:json;column:edges" json:"edges" yaml:"edges"`
	Hash          string                       `gorm:"type:varchar(255);column:hash" json:"hash"`
	HandleProps   ArrayString                  `gorm:"column:handle_props" json:"handleProps" yaml:"handleProps"`
}

func (md *MarketApplicationUpdate) Default(ctx context.Context) {
	md.UpdaterId = config.GetOperatorFromCtx(ctx)
	if len(md.Type) == 0 {
		md.Type = "base"
	}
	md.UpdatedAt = time.Now()
	md.Hash = buildMarketApplicationHash(md.Type, md.Templates, md.Parameters, md.Outputs, md.Mappings, md.Nodes, md.Edges, md.HandleProps)
	if md.Type == "base" {
		md.ResourceIndex, md.HasCRD = getTemplateIndex(md.Templates)
	}
}

func (md *MarketApplicationUpdate) Validate(ctx context.Context) (err error) {
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
	if err == nil {
		err = validateMarketApplicationContent(md.Type, md.Templates, md.Outputs, md.Mappings, md.Nodes, md.Edges)
	}
	return
}

type MarketApplicationCopy struct {
	SourceId string `json:"sourceId" validate:"required"`
	Version  string `json:"version" yaml:"version" validate:"required"`
}

func (md *MarketApplicationCopy) Validate(ctx context.Context) (err error) {
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

func buildMarketApplicationHash(appType string, templates ArrayString, parameters ParameterDefinitions, outputs ApplicationOutputDefinitions, mappings ParametersMappings, nodes ApplicationNodes, edges ApplicationEdges, handleProps ArrayString) string {
	payload := struct {
		Type       string                       `json:"type"`
		Templates  ArrayString                  `json:"templates"`
		Parameters ParameterDefinitions         `json:"parameters"`
		Outputs    ApplicationOutputDefinitions `json:"outputs"`
		Mappings   ParametersMappings           `json:"mappings"`
		Nodes      ApplicationNodes             `json:"nodes"`
		Edges      ApplicationEdges             `json:"edges"`
		Handle     ArrayString                  `json:"handleProps"`
	}{
		Type:       appType,
		Templates:  templates,
		Parameters: parameters,
		Outputs:    outputs,
		Mappings:   mappings,
		Nodes:      nodes,
		Edges:      edges,
		Handle:     handleProps,
	}
	data, _ := json.Marshal(payload)
	return common.MD5VByte(data)
}

func validateMarketApplicationContent(appType string, templates ArrayString, outputs ApplicationOutputDefinitions, mappings ParametersMappings, nodes ApplicationNodes, edges ApplicationEdges) error {
	if err := validateApplicationOutputs(templates, outputs); err != nil {
		return err
	}
	return validateApplicationMappings(nil, mappings)
}

func validateApplicationOutputs(templates ArrayString, outputs ApplicationOutputDefinitions) error {
	outputNames := make(map[string]struct{}, len(outputs))
	resourceIndex, _ := getTemplateIndex(templates)
	for i, output := range outputs {
		outputName := strings.TrimSpace(output.Name)
		if outputName == "" {
			return fmt.Errorf("outputs[%d].name is required", i)
		}
		if _, exist := outputNames[outputName]; exist {
			return fmt.Errorf("outputs[%d].name duplicated: %s", i, output.Name)
		}
		outputNames[outputName] = struct{}{}
		if strings.TrimSpace(output.Type) == "" {
			return fmt.Errorf("outputs[%d].type is required", i)
		}
		switch output.ValueFrom.Type {
		case "parameter":
			if strings.TrimSpace(output.ValueFrom.Parameter) == "" {
				return fmt.Errorf("outputs[%d].valueFrom.parameter is required when valueFrom.type=parameter", i)
			}
		case "template":
			if strings.TrimSpace(output.ValueFrom.Template) == "" {
				return fmt.Errorf("outputs[%d].valueFrom.template is required when valueFrom.type=template", i)
			}
			if strings.TrimSpace(output.ValueFrom.Path) == "" {
				return fmt.Errorf("outputs[%d].valueFrom.path is required when valueFrom.type=template", i)
			}
			if len(resourceIndex) == 0 {
				return fmt.Errorf("outputs[%d].valueFrom.template requires templates to be defined", i)
			}
			if _, exist := resourceIndex[strings.TrimSpace(output.ValueFrom.Template)]; !exist {
				return fmt.Errorf("outputs[%d].valueFrom.template not found in resourceIndex: %s", i, output.ValueFrom.Template)
			}
		default:
			return fmt.Errorf("outputs[%d].valueFrom.type is invalid", i)
		}
	}
	return nil
}

func validateApplicationMappings(nodes ApplicationNodes, mappings ParametersMappings) error {
	for i, mapping := range mappings {
		if len(mapping.Variables) == 0 {
			return fmt.Errorf("mappings[%d].variables is required", i)
		}
		for j, variable := range mapping.Variables {
			if strings.TrimSpace(variable.Name) == "" {
				return fmt.Errorf("mappings[%d].variables[%d].name is required", i, j)
			}
		}
	}
	return nil
}

type MarketApplicationExportImport struct {
	Description string                       `gorm:"type:text;column:description" json:"description" validate:"required" yaml:"description,omitempty"`
	Templates   ArrayString                  `gorm:"column:templates" json:"templates,omitempty" yaml:"templates,omitempty"`
	HasCRD      bool                         `gorm:"column:has_crd" json:"hasCrd" yaml:"hasCrd,omitempty"`
	Parameters  ParameterDefinitions         `gorm:"type:json;column:parameters" json:"parameters,omitempty" yaml:"parameters,omitempty"`
	Outputs     ApplicationOutputDefinitions `gorm:"type:json;column:outputs" json:"outputs,omitempty" yaml:"outputs,omitempty"`
	Mappings    ParametersMappings           `gorm:"type:json;column:mappings" json:"mappings,omitempty" yaml:"mappings,omitempty"`
	Version     string                       `gorm:"type:varchar(50);column:version" json:"version" yaml:"version"`
	Type        string                       `gorm:"type:varchar(50);column:type;default:base" json:"type" validate:"oneof=base" enum:"base"`
	Nodes       ApplicationNodes             `gorm:"type:json;column:nodes" json:"nodes,omitempty" yaml:"nodes,omitempty"`
	Edges       ApplicationEdges             `gorm:"type:json;column:edges" json:"edges,omitempty" yaml:"edges,omitempty"`
	HandleProps ArrayString                  `gorm:"column:handle_props" json:"handleProps" yaml:"handleProps,omitempty"`
}

func (t *MarketApplicationExportImport) TableName() string {
	return models.MarketApplicationTableName
}

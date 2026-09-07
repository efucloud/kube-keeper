package dtos

import (
	"database/sql/driver"
	"encoding/json"
	"errors"
	"fmt"

	"gorm.io/gorm"
	"gorm.io/gorm/schema"
)

// ParameterDefinition describes one user-facing input of a Base application.
type ParameterDefinition struct {
	Name            string      `json:"name" yaml:"name" validate:"required" description:"名称(英文)"`
	DisplayName     string      `json:"displayName,omitempty" yaml:"displayName" description:"显示名称"`
	Required        bool        `json:"required" yaml:"required" description:"是否必须"`
	Type            string      `json:"type" yaml:"type" validate:"oneof=string inputString text url password inputSecret image number inputNumber bool stringArray numberArray object float base64Encode gitRepo" description:"类型"`
	Description     string      `json:"description,omitempty" yaml:"description,omitempty" description:"描述"`
	DefaultValue    interface{} `json:"defaultValue" yaml:"defaultValue" description:"默认值"`
	AllowableValues interface{} `json:"allowableValues" yaml:"allowableValues" description:"可选值"`
}

type ParameterDefinitions []ParameterDefinition

func (ParameterDefinitions) GormDataType() string { return "jsonmap" }

func (ParameterDefinitions) GormDBDataType(db *gorm.DB, _ *schema.Field) string {
	switch db.Dialector.Name() {
	case "sqlite":
		return "JSON"
	case "mysql":
		return "json"
	case "postgres":
		return "JSONB"
	case "sqlserver":
		return "NVARCHAR(MAX)"
	default:
		return ""
	}
}

func (m *ParameterDefinitions) Scan(value interface{}) error {
	if value == nil {
		*m = ParameterDefinitions{}
		return nil
	}
	bytes, ok := value.([]byte)
	if !ok {
		return errors.New(fmt.Sprint("failed to unmarshal ParameterDefinitions value: ", value))
	}
	return json.Unmarshal(bytes, m)
}

func (m ParameterDefinitions) Value() (driver.Value, error) { return json.Marshal(m) }

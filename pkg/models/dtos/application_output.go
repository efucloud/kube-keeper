package dtos

import (
	"database/sql/driver"
	"encoding/json"
	"errors"
	"fmt"

	"gorm.io/gorm"
	"gorm.io/gorm/schema"
)

// ApplicationOutputValueSource 应用输出取值来源
type ApplicationOutputValueSource struct {
	//取值类型：parameter-来自输入参数，template-模板渲染结果
	Type string `json:"type" yaml:"type" validate:"required,oneof=parameter template" description:"取值类型"`
	//输入参数名，Type=parameter 时使用
	Parameter string `json:"parameter,omitempty" yaml:"parameter,omitempty" description:"输入参数名"`
	//模板资源索引键，Type=template 时使用，对应 ResourceIndex 中的 kind|apiVersion|name
	Template string `json:"template,omitempty" yaml:"template,omitempty" description:"模板资源索引键"`
	//模板渲染后取值路径，Type=template 时使用
	Path string `json:"path,omitempty" yaml:"path,omitempty" description:"模板渲染后取值路径"`
	//保留给后续扩展的二次计算脚本
	Javascript string `json:"javascript,omitempty" yaml:"javascript,omitempty" description:"JavaScript 计算脚本"`
}

// ApplicationOutputDefinition 应用输出定义
type ApplicationOutputDefinition struct {
	//输出名称，例如 database.host
	Name string `json:"name" yaml:"name" validate:"required" description:"输出名称"`
	//显示名称
	DisplayName string `json:"displayName,omitempty" yaml:"displayName,omitempty" description:"显示名称"`
	//输出类型
	Type string `json:"type" yaml:"type" validate:"required,oneof=string password image number bool stringArray numberArray object float inputSecret" description:"输出类型"`
	//描述
	Description string `json:"description,omitempty" yaml:"description,omitempty" description:"描述"`
	//取值来源
	ValueFrom ApplicationOutputValueSource `json:"valueFrom" yaml:"valueFrom" description:"取值来源"`
}

// ApplicationOutputDefinitions 数组
type ApplicationOutputDefinitions []ApplicationOutputDefinition

func (m ApplicationOutputDefinitions) GormDataType() string {
	return "jsonmap"
}

func (ApplicationOutputDefinitions) GormDBDataType(db *gorm.DB, field *schema.Field) string {
	switch db.Dialector.Name() {
	case "sqlite":
		return "JSON"
	case "mysql":
		return "json"
	case "postgres":
		return "JSONB"
	case "sqlserver":
		return "NVARCHAR(MAX)"
	}
	return ""
}

func (m *ApplicationOutputDefinitions) Scan(value interface{}) error {
	byteValue, ok := value.([]byte)
	if !ok {
		return errors.New(fmt.Sprint("Failed to unmarshal ApplicationOutputDefinitions value: ", value))
	}
	return json.Unmarshal(byteValue, m)
}

func (m ApplicationOutputDefinitions) Value() (driver.Value, error) {
	return json.Marshal(m)
}

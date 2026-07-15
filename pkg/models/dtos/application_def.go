package dtos

import (
	"database/sql/driver"
	"encoding/json"
	"errors"
	"fmt"

	"gorm.io/gorm"
	"gorm.io/gorm/schema"
)

type ApplicationState struct {
	//组织ID
	OrganizationId string `json:"-" description:"组织ID"`
	//工作空间ID
	WorkspaceId string `json:"workspaceId" description:"工作空间ID"`
	//版本ID
	VersionId string `json:"versionId" yaml:"versionId" description:"版本ID"`
	//应用ID，操作版本时使用
	ApplicationId string `json:"applicationId" yaml:"applicationId" description:"应用ID"`
	//状态
	State uint `json:"state" validate:"required" description:"状态"`
	//当前版本设置为默认版本
	SetDefaultVersion bool `json:"setDefaultVersion" description:"当前版本设置为默认版本"`
	//设置某个版本为默认版本
	DefaultVersion string `json:"defaultVersion" description:"设置某个版本为默认版本"`
}
type IdeTemplateState struct {
	//组织ID
	OrganizationId string `json:"-" description:"组织ID"`
	//工作空间ID
	WorkspaceId string `json:"workspaceId" description:"工作空间ID"`
	//版本ID
	VersionId string `json:"versionId" yaml:"versionId" description:"版本ID"`
	//模版ID，操作版本时使用
	TemplateId string `json:"templateId" yaml:"templateId" description:"模版ID"`
	//状态
	State uint `json:"state" validate:"required" description:"状态"`
	//当前版本设置为默认版本
	SetDefaultVersion bool `json:"setDefaultVersion" description:"当前版本设置为默认版本"`
	//设置某个版本为默认版本
	DefaultVersion string `json:"defaultVersion" description:"设置某个版本为默认版本"`
}

// ParameterDefinition 参数定义
// 用于应用模版，ide模版中对参数的定义，借鉴了openshift的template概念
type ParameterDefinition struct {
	//名称(英文)
	Name string `json:"name" yaml:"name" validate:"required" description:"名称(英文)"`
	//显示名称
	DisplayName string `json:"displayName,omitempty" yaml:"displayName" description:"显示名称"`
	//是否必须
	Required bool `json:"required" yaml:"required" description:"是否必须"`
	//类型
	Type string `json:"type" validate:"oneof=string inputString text url password image number inputNumber bool stringArray numberArray object float base64Encode gitRepo" yaml:"type" description:"类型"`
	//描述
	Description string `json:"description,omitempty" yaml:"description,omitempty" description:"描述"`
	//默认值
	DefaultValue interface{} `json:"defaultValue" yaml:"defaultValue" description:"默认值"`
	//可选值，只针对Type为string类型
	AllowableValues interface{} `json:"allowableValues" yaml:"allowableValues" description:"可选值，只针对Type为string类型"`
}

// ParameterDefinitions 数组
type ParameterDefinitions []ParameterDefinition

// GormDataType gorm common data type
func (m ParameterDefinitions) GormDataType() string {
	return "jsonmap"
}

// GormDBDataType gorm db data type
func (ParameterDefinitions) GormDBDataType(db *gorm.DB, field *schema.Field) string {
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

// Scan 实现 sql.Scanner 接口，Scan 将 value 扫描至 Jsonb
func (m *ParameterDefinitions) Scan(value interface{}) error {
	byteValue, ok := value.([]byte)
	if !ok {
		return errors.New(fmt.Sprint("Failed to unmarshal ArrayString value: ", value))
	}
	err := json.Unmarshal(byteValue, m)
	return err
}

// Value 实现 driver.Valuer 接口，Value 返回 json value
func (m ParameterDefinitions) Value() (driver.Value, error) {
	re, err := json.Marshal(m)
	return re, err
}

// ParametersMapping 参数映射
type ParametersMapping struct {
	//名称(英文)
	Name string `json:"name" yaml:"name" description:"名称(英文)"`
	//显示名称
	DisplayName string `json:"displayName,omitempty" yaml:"displayName" description:"显示名称"`
	//是否必须
	Required bool `json:"required,omitempty" yaml:"required,omitempty" description:"是否必须"`
	//类型
	Type string `json:"type" validate:"oneof=string image number bool stringArray numberArray object float" yaml:"type" description:"类型"`
	//描述
	Description string `json:"description,omitempty" yaml:"description,omitempty" description:"描述"`
	//参数值
	DefaultValue interface{} `json:"defaultValue,omitempty" yaml:"defaultValue,omitempty" description:"默认值"`
	//输入值
	InputValue interface{} `json:"inputValue,omitempty" yaml:"inputValue,omitempty" description:"输入值"`
	// 映射的应用参数
	Variables []ApplicationVariable `json:"variables,omitempty" yaml:"variables,omitempty" description:"映射的应用参数"`
}
type ApplicationVariable struct {
	//Canvas上应用ID,若ID为空表示基础应用的参数映射
	Id   string `json:"id" yaml:"id" description:"Canvas上应用ID"`
	Name string `json:"name" yaml:"name" description:"参数名"`
}

// ParametersMappings 数组
type ParametersMappings []ParametersMapping

// GormDataType gorm common data type
func (m ParametersMappings) GormDataType() string {
	return "jsonmap"
}

// GormDBDataType gorm db data type
func (ParametersMappings) GormDBDataType(db *gorm.DB, field *schema.Field) string {
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

// Scan 实现 sql.Scanner 接口，Scan 将 value 扫描至 Jsonb
func (m *ParametersMappings) Scan(value interface{}) error {
	byteValue, ok := value.([]byte)
	if !ok {
		return errors.New(fmt.Sprint("Failed to unmarshal ArrayString value: ", value))
	}
	err := json.Unmarshal(byteValue, m)
	return err
}

// Value 实现 driver.Valuer 接口，Value 返回 json value
func (m ParametersMappings) Value() (driver.Value, error) {
	re, err := json.Marshal(m)
	return re, err
}

// ApplicationNode 应用节点
type ApplicationNode struct {
	//组件名称 作为画布节点的ID，同时作为集群资源名称的一部分
	ID       string              `json:"id" yaml:"id" validate:"required" description:"组件名称"`
	Data     ApplicationNodeInfo `json:"data" yaml:"data" description:""`
	Type     string              `json:"type" yaml:"type" description:"节点类型"`
	Position Position            `json:"position" yaml:"position" description:"节点位置"`
}

// NodeMeasured 节点尺寸
type NodeMeasured struct {
	Width  int `json:"width" yaml:"width" description:"节点宽"`
	Height int `json:"height" yaml:"height" description:"节点高"`
}

// ApplicationNodeInfo 节点中应用信息
type ApplicationNodeInfo struct {
	Source string `json:"source" yaml:"source" description:"应用来源"`
	//应用ID
	ApplicationId string `json:"applicationId" yaml:"applicationId" validate:"required" description:"应用ID"`
	//组件logo
	Logo string `json:"logo" yaml:"logo" description:"组件logo"`
	//版本号
	SelectedVersion string `json:"selectedVersion"  yaml:"selectedVersion" validate:"required" description:"选择的版本号"`
	//组织ID
	OrganizationId string `yaml:"organizationId" json:"organizationId" validate:"required" description:"组织ID"`
	//工作空间ID
	WorkspaceId string `json:"workspaceId" yaml:"workspaceId" validate:"required" description:"工作空间ID"`
	//组件名称
	Name string `json:"name" yaml:"name" validate:"required" description:"组件名称"`
	//组件显示名称
	DisplayName string `json:"displayName" yaml:"displayName" validate:"required" description:"组件显示名称"`
	//组件作用
	Function string `json:"function" yaml:"function" description:"组件作用"`
	//画布连接属性
	HandleProps ArrayString `json:"handleProps" yaml:"handleProps"  description:"画布连接属性"`
	//节点类型
	NodeType string `json:"nodeType" yaml:"nodeType" validate:"oneof=base lego" description:"节点类型"`
	//版本信息
	Version EmbedMarketApplication `json:"version" yaml:"version" description:"版本信息"`
}

// ApplicationNodes 应用节点
type ApplicationNodes []ApplicationNode

// GormDataType gorm common data type
func (m ApplicationNodes) GormDataType() string {
	return "jsonmap"
}

// GormDBDataType gorm db data type
func (ApplicationNodes) GormDBDataType(db *gorm.DB, field *schema.Field) string {
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

// Scan 实现 sql.Scanner 接口，Scan 将 value 扫描至 Jsonb
func (m *ApplicationNodes) Scan(value interface{}) error {
	byteValue, ok := value.([]byte)
	if !ok {
		return errors.New(fmt.Sprint("Failed to unmarshal ArrayString value: ", value))
	}
	err := json.Unmarshal(byteValue, m)
	return err
}

// Value 实现 driver.Valuer 接口，Value 返回 json value
func (m ApplicationNodes) Value() (driver.Value, error) {
	re, err := json.Marshal(m)
	return re, err
}

type Position struct {
	X float64 `json:"x" yaml:"x" description:""`
	Y float64 `json:"y" yaml:"y" description:""`
}
type ApplicationEdgeStyle struct {
	Height int `json:"height" yaml:"height" description:"高"`
	Weight int `json:"weight" yaml:"weight" description:"宽"`
}

// ApplicationEdge 应用边
type ApplicationEdge struct {
	Id     string `gorm:"column:id" json:"id" description:"ID"`
	Source string `json:"source" yaml:"source" description:"源节点"`
	Target string `json:"target" yaml:"target" description:"目标节点"`
}

// ApplicationEdges 应用边
type ApplicationEdges []ApplicationEdge

// GormDataType gorm common data type
func (m ApplicationEdges) GormDataType() string {
	return "jsonmap"
}

// GormDBDataType gorm db data type
func (ApplicationEdges) GormDBDataType(db *gorm.DB, field *schema.Field) string {
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

// Scan 实现 sql.Scanner 接口，Scan 将 value 扫描至 Jsonb
func (m *ApplicationEdges) Scan(value interface{}) error {
	byteValue, ok := value.([]byte)
	if !ok {
		return errors.New(fmt.Sprint("Failed to unmarshal ArrayString value: ", value))
	}
	err := json.Unmarshal(byteValue, m)
	return err
}

// Value 实现 driver.Valuer 接口，Value 返回 json value
func (m ApplicationEdges) Value() (driver.Value, error) {
	re, err := json.Marshal(m)
	return re, err
}

// ApplicationMetrics 应用指标
type ApplicationMetrics struct {
	Promql string `json:"promql" yaml:"promql" description:"指标语句"`
	Name   string `json:"name" yaml:"name" description:"指标名称"`
}

// EmbedMarketApplication 模版应用
type EmbedMarketApplication struct {
	//主键
	ID string `gorm:"type:varchar(50);primarykey;column:id" json:"id" description:"记录ID"`
	//组织ID
	OrganizationId string `gorm:"type:varchar(50);column:organization_id;<-:create" json:"-" validate:"required" description:"组织ID"`
	//工作空间ID
	WorkspaceId string `gorm:"column:workspace_id;type:varchar(50);<-:create" validate:"required" json:"workspaceId" description:"工作空间ID"`
	//状态 0:Draft 1:Development 2:Testing 3:ReleasedCandidate 4:Released 5:Deprecated 6:Archived
	State uint `gorm:"column:state;default:0" json:"state" yaml:"state" validate:"oneof=0 1 2 3 4 5 6" enum:"0|1|2|3|4|5|6" description:"状态"`
	//包含的子应用
	Includes ArrayString `gorm:"column:includes" json:"includes" yaml:"includes" description:"包含的子应用"`
	//应用ID
	ApplicationId string `gorm:"type:varchar(50);column:application_id" json:"applicationId" validate:"required" description:"应用ID"`
	//模版内容,yaml格式，支持多个，若为helm部署，则为values.yaml内容
	Templates ArrayString `gorm:"column:templates" json:"templates,omitempty" yaml:"templates" validate:"required_if=Type base" description:"模版内容"`
	// 应用参数
	Parameters ParameterDefinitions `gorm:"type:json;column:parameters" json:"parameters,omitempty" yaml:"parameters" description:"模版参数"`
	//参数映射
	Mappings ParametersMappings `gorm:"type:json;column:mappings" json:"mappings,omitempty" yaml:"mappings" description:"参数映射"`
	//Helm仓库地址
	HelmRepo string `gorm:"type:varchar(255);column:helm_repo" json:"helmRepo,omitempty" yaml:"helmRepo" validate:"required_if=DeployMethod helm" description:"Helm仓库地址"`
	//Helm部署的values.yaml
	Values string `gorm:"type:text;column:values" json:"values" yaml:"values,omitempty" description:"Helm部署的values.yaml"`
	//版本
	Version string `gorm:"type:varchar(50);column:version" json:"version" yaml:"version" validate:"-" description:"版本"`
	//应用类别
	Type string `gorm:"type:varchar(50);column:type;default:base" json:"type" validate:"oneof=base lego" enum:"base|lego" description:"应用类别"`
	//应用部署方式
	DeployMethod string `gorm:"type:varchar(255);column:deploy_method" json:"deployMethod" yaml:"deployMethod" validate:"required_if=Type base,oneof=lego yaml helm" enum:"lego|yaml|helm"  description:"应用部署方式"`
	//节点
	Nodes ApplicationNodes `gorm:"type:json;column:nodes" json:"nodes,omitempty" yaml:"nodes" validate:"required_if=Type lego" description:"节点"`
	//边缘
	Edges ApplicationEdges `gorm:"type:json;column:edges" json:"edges,omitempty" yaml:"edges" description:"边缘"`
	//画布连接属性
	HandleProps ArrayString `gorm:"column:handle_props" json:"handleProps" yaml:"handleProps"  description:"画布连接属性"`
}

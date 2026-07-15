package dtos

import (
	"database/sql/driver"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/efucloud/common"
	"github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/utils"
	"gorm.io/gorm"
	"gorm.io/gorm/schema"
	v1 "k8s.io/api/rbac/v1"
	"net/http"
	"strings"
	"time"
)

type ClusterTerminalPodInfo struct {
	Cluster       string `json:"cluster"`
	TargetCluster string `json:"targetCluster"`
	Namespace     string `json:"namespace"`
	Pod           string `json:"pod"`
	Container     string `json:"container"`
	Phase         string `json:"phase"`
	ExpireAt      int64  `json:"expireAt"`
	Message       string `json:"message"`
}

// ClusterServerGroup 集群资源接口
type ClusterServerGroup struct {
	GroupVersion string `json:"groupVersion" validate:"required" description:""`
	Group        string `json:"group" description:"组"`
	Version      string `json:"version" validate:"required" description:"版本"`
	Kind         string `json:"kind" description:"资源类型"`
	Scope        string `json:"scope" description:"作用域"`
	Name         string `json:"name" description:"名称"`
}
type ClusterServerGroupChecks []ClusterServerGroupCheck

// ClusterServerGroupCheck 集群资源接口检测
type ClusterServerGroupCheck struct {
	ApiVersion string `json:"apiVersion" description:""`
	Group      string `json:"group" description:"组"`
	Version    string `json:"version" description:"版本"`
	Kind       string `json:"kind" description:"资源类型"`
	Scope      string `json:"scope" enum:"Cluster|Namespaced" description:"作用域"`
	Exist      bool   `json:"exist" description:"是否存在"`
	Plural     string `json:"plural" description:""`
}

// UserAccessClusterNamespaceList  用户可以访问集群的命名空间列表
type UserAccessClusterNamespaceList struct {
	//当前页数据
	Data []UserAccessClusterNamespace `json:"data"`
	//数据库满足条件的数据总数
	Total int64 `json:"total,omitempty" validate:"required"`
}

// UserAccessClusterNamespace 用户可以访问集群命名空间
type UserAccessClusterNamespace struct {
	Name string `json:"name" description:""`
}

// UserAccessClusterList  用户可以访问的集群列表
type UserAccessClusterList struct {
	//当前页数据
	Data []UserAccessCluster `json:"data"`
	//数据库满足条件的数据总数
	Total int64 `json:"total,omitempty" validate:"required"`
}

// UserAccessCluster 用户可以访问的集群
type UserAccessCluster struct {
	//主键
	ID string `json:"id" description:"记录ID"`
	//集群编码
	Code string `json:"code" validate:"required" description:"集群编码"`
	//集群名称
	Name string `json:"name" validate:"required" description:"集群名称"`
	//集群版本
	Version KubernetesVersion `json:"version" description:"集群版本"`
	//集群类型
	Category string `json:"category" validate:"required" description:"集群类型"`
	//可访问命名空间列表
	Namespaces ArrayString `json:"namespaces" description:"可访问命名空间列表"`
	//用户在集群内置最大角色
	BuiltinMaxClusterRole string `json:"builtinMaxClusterRole" description:"用户在集群内置最大角色"`
	//普通用户能创建NS
	CommonCanCreateNs bool `json:"commonCanCreateNs" description:"普通用户能创建NS"`
}
type KubernetesVersion struct {
	ConnectAble  bool   `json:"connectAble"`
	Major        string `json:"major"`
	Minor        string `json:"minor"`
	GitVersion   string `json:"gitVersion"`
	GitCommit    string `json:"gitCommit"`
	GitTreeState string `json:"gitTreeState"`
	BuildDate    string `json:"buildDate"`
	GoVersion    string `json:"goVersion"`
	Compiler     string `json:"compiler"`
	Platform     string `json:"platform"`
}

// GormDataType gorm common data type
func (m KubernetesVersion) GormDataType() string {
	return "jsonmap"
}

// GormDBDataType gorm db data type
func (KubernetesVersion) GormDBDataType(db *gorm.DB, field *schema.Field) string {
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
func (m *KubernetesVersion) Scan(value interface{}) error {
	byteValue, ok := value.([]byte)
	if !ok {
		return errors.New(fmt.Sprint("Failed to unmarshal KubernetesVersion value: ", value))
	}
	err := json.Unmarshal(byteValue, m)
	return err
}

// Value 实现 driver.Valuer 接口，Value 返回 json value
func (m KubernetesVersion) Value() (driver.Value, error) {
	re, err := json.Marshal(m)
	return re, err
}

func GetClusterVersion(apiserver string, clientKey, clientSecret, ca string) (version KubernetesVersion, err error) {
	apiserver = fmt.Sprintf("%s/version", strings.TrimSuffix(strings.TrimSpace(apiserver), "/"))
	tlsConfig, err := utils.BuildTLSConfig(ca, clientKey, clientSecret)
	if err != nil {
		config.Logger.Errorf("get cluster version failed, err: %s", err.Error())
		return version, err
	}
	tlsConfig.InsecureSkipVerify = true
	client := &http.Client{
		Transport: &http.Transport{
			TLSClientConfig: tlsConfig,
		},
		Timeout: 10 * time.Second,
	}
	req, err := http.NewRequest(http.MethodGet, apiserver, nil)
	if err != nil {
		config.Logger.Errorf("create request failed, err: %s", err.Error())
		return KubernetesVersion{}, err
	}
	response, err := client.Do(req)
	if err != nil {
		config.Logger.Errorf("create request failed, err: %s", err.Error())
		return KubernetesVersion{}, err

	}
	defer response.Body.Close()
	err = json.NewDecoder(response.Body).Decode(&version)

	return
}

// TemplateClusterRoleRule 集群角色模版，用于快速创建集群角色
type TemplateClusterRoleRule struct {
	//标签
	Labels map[string]string `json:"labels" description:"标签"`
	//规则
	Rules []v1.PolicyRule `json:"rules" description:"规则"`
	//聚合规则
	AggregationRule *v1.AggregationRule `json:"aggregationRule,omitempty" description:"聚合规则"`
}

func (m TemplateClusterRoleRule) Hash() string {
	data, _ := json.Marshal(m)
	return common.MD5VByte(data)
}

// GormDataType gorm common data type
func (m TemplateClusterRoleRule) GormDataType() string {
	return "jsonmap"
}

// GormDBDataType gorm db data type
func (TemplateClusterRoleRule) GormDBDataType(db *gorm.DB, field *schema.Field) string {
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
func (m *TemplateClusterRoleRule) Scan(value interface{}) error {
	byteValue, ok := value.([]byte)
	if !ok {
		return errors.New(fmt.Sprint("Failed to unmarshal TemplateClusterRoleRule value: ", value))
	}
	err := json.Unmarshal(byteValue, m)
	return err
}

// Value 实现 driver.Valuer 接口，Value 返回 json value
func (m TemplateClusterRoleRule) Value() (driver.Value, error) {
	re, err := json.Marshal(m)
	return re, err
}

type GpuResourceParamDefinition struct {
	Name      string `json:"name" validate:"required"`
	InjectKey string `json:"injectKey" validate:"required"`
	ValueType string `json:"valueType" validate:"required"`
}
type GpuResourceParamDefinitions []GpuResourceParamDefinition

func (m GpuResourceParamDefinitions) Hash() string {
	data, _ := json.Marshal(m)
	return common.MD5VByte(data)
}

// GormDataType gorm common data type
func (m GpuResourceParamDefinitions) GormDataType() string {
	return "jsonmap"
}

// GormDBDataType gorm db data type
func (GpuResourceParamDefinitions) GormDBDataType(db *gorm.DB, field *schema.Field) string {
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
func (m *GpuResourceParamDefinitions) Scan(value interface{}) error {
	byteValue, ok := value.([]byte)
	if !ok {
		return errors.New(fmt.Sprint("Failed to unmarshal TemplateClusterRoleRule value: ", value))
	}
	err := json.Unmarshal(byteValue, m)
	return err
}

// Value 实现 driver.Valuer 接口，Value 返回 json value
func (m GpuResourceParamDefinitions) Value() (driver.Value, error) {
	re, err := json.Marshal(m)
	return re, err
}

type GroupVersionResources []GroupVersionResource
type GroupVersionResource struct {
	Group    string `json:"group" validate:"required" description:"组"`
	Version  string `json:"version" validate:"required" description:"版本"`
	Resource string `json:"resource" validate:"required" description:"资源"`
}

func (m GroupVersionResources) Hash() string {
	data, _ := json.Marshal(m)
	return common.MD5VByte(data)
}

// GormDataType gorm common data type
func (m GroupVersionResources) GormDataType() string {
	return "jsonmap"
}

// GormDBDataType gorm db data type
func (GroupVersionResources) GormDBDataType(db *gorm.DB, field *schema.Field) string {
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
func (m *GroupVersionResources) Scan(value interface{}) error {
	byteValue, ok := value.([]byte)
	if !ok {
		return errors.New(fmt.Sprint("Failed to unmarshal TemplateClusterRoleRule value: ", value))
	}
	err := json.Unmarshal(byteValue, m)
	return err
}

// Value 实现 driver.Valuer 接口，Value 返回 json value
func (m GroupVersionResources) Value() (driver.Value, error) {
	re, err := json.Marshal(m)
	return re, err
}

// ApplicationRenderResult 应用模版资源渲染结果
type ApplicationRenderResult struct {
	Successes []ApplicationKubernetesResource `json:"successes" description:"渲染成功的资源"`
	Failures  []ApplicationKubernetesResource `json:"failures" description:"渲染失败的模版"`
}
type ApplicationKubernetesResource struct {
	Namespace    string      `json:"namespace" description:"部署的命名空间"`
	ResourceName string      `json:"resourceName" description:"资源名称"`
	Content      string      `json:"content" description:"模版内容"`
	Message      string      `json:"message" description:"错误提示"`
	APIResource  APIResource `json:"apiResource" description:"资源版本"`
	Key          string      `json:"key" description:"Key"`
	RenderStatus string      `json:"renderStatus" description:"渲染结果"`
	TryStatus    string      `json:"tryStatus" description:"校验结果"`
	DeployStatus string      `json:"deployStatus" description:"部署结果"`
}
type ApplicationKubernetesResources []ApplicationKubernetesResource

// GormDataType gorm common data type
func (m ApplicationKubernetesResources) GormDataType() string {
	return "jsonmap"
}

// GormDBDataType gorm db data type
func (ApplicationKubernetesResources) GormDBDataType(db *gorm.DB, field *schema.Field) string {
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
func (m *ApplicationKubernetesResources) Scan(value interface{}) error {
	byteValue, ok := value.([]byte)
	if !ok {
		return errors.New(fmt.Sprint("Failed to unmarshal ArrayString value: ", value))
	}
	err := json.Unmarshal(byteValue, m)
	return err
}

// Value 实现 driver.Valuer 接口，Value 返回 json value
func (m ApplicationKubernetesResources) Value() (driver.Value, error) {
	re, err := json.Marshal(m)
	return re, err
}

type ApplicationRenderParams map[string]any

// GormDataType gorm common data type
func (m ApplicationRenderParams) GormDataType() string {
	return "jsonmap"
}

// GormDBDataType gorm db data type
func (ApplicationRenderParams) GormDBDataType(db *gorm.DB, field *schema.Field) string {
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
func (m *ApplicationRenderParams) Scan(value interface{}) error {
	byteValue, ok := value.([]byte)
	if !ok {
		return errors.New(fmt.Sprint("Failed to unmarshal ArrayString value: ", value))
	}
	err := json.Unmarshal(byteValue, m)
	return err
}

// Value 实现 driver.Valuer 接口，Value 返回 json value
func (m ApplicationRenderParams) Value() (driver.Value, error) {
	re, err := json.Marshal(m)
	return re, err
}

type APIResource struct {
	Name         string `json:"name" description:"Name"`
	Namespaced   bool   `json:"namespaced" description:"Namespaced"`
	GroupVersion string `json:"groupVersion" description:"GroupVersion"`
	Kind         string `json:"kind" description:"Kind"`
	Group        string `json:"group" description:"Group"`
	Version      string `json:"version" description:"Version"`
}

// ResourceIndex 应用版本模版中的资源索引
type ResourceIndex map[string]int

// GormDataType gorm common data type
func (m ResourceIndex) GormDataType() string {
	return "jsonmap"
}

// GormDBDataType gorm db data type
func (ResourceIndex) GormDBDataType(db *gorm.DB, field *schema.Field) string {
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
func (m *ResourceIndex) Scan(value interface{}) error {
	byteValue, ok := value.([]byte)
	if !ok {
		return errors.New(fmt.Sprint("Failed to unmarshal ArrayString value: ", value))
	}
	err := json.Unmarshal(byteValue, m)
	return err
}

// Value 实现 driver.Valuer 接口，Value 返回 json value
func (m ResourceIndex) Value() (driver.Value, error) {
	re, err := json.Marshal(m)
	return re, err
}

type HelmValues struct {
	Content string `json:"content" description:"Values内容"`
	Url     string `json:"url" description:"url地址"`
}

// PodResourceResize pod资源调整
type PodResourceResize struct {
}
type ImageRegistryAuth struct {
	Auths map[string]ImageRegistryAuthLine `json:"auths" yaml:"auths" description:"认证信息"`
}
type ImageRegistryAuthLine struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Auth     string `json:"auth"`
}

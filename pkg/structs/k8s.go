package structs

import (
	"context"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	v1 "k8s.io/api/core/v1"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	"k8s.io/apimachinery/pkg/runtime/schema"
	"strings"
)

type PodFileUploadInfo struct {
	Doc      string `json:"-" description:"容器文件上传信息:建议上传到/tmp目录，其他目录可能因为权限导致上传失败"`
	File     string `json:"file" description:"文件内容,非字符串"`
	FileName string `json:"fileName" description:"上传后的文件名"`
	Dir      string `json:"dir" description:"上传后保存目录，必须为绝对路径，为空的话默认为/tmp"`
}
type PodFilePath struct {
	Doc       string `json:"-" description:"容器文件路径信息"`
	Pod       string `json:"pod" description:"pod名称,path参数"`
	Container string `json:"container" description:"容器名称，path参数"`
	Dir       string `json:"dir" description:"容器里面文件绝对路径"`
	FileName  string `json:"fileName" description:"文件名称,下载时不需要填，会自动从dir中提取"`
}

func (p *PodFilePath) Default(ctx context.Context) {
	if !strings.HasPrefix(p.Dir, "/") {
		p.Dir = "/" + p.Dir
	}
}

type MergeLabels struct {
	Metadata struct {
		Labels map[string]string `json:"labels"` //
	} `json:"metadata"` //
}
type WorkspaceReport struct {
	Namespaces    []string `json:"namespaces" yaml:"namespaces"`
	WorkspaceName string   `json:"workspaceName" yaml:"workspaceName"` //若为空则表示Namespace不属于任何workspace
}
type NamespaceReport struct {
	Namespace    string `json:"namespace" yaml:"namespace"`
	Workspace    string `json:"workspace" yaml:"workspace"`
	OldWorkspace string `json:"oldWorkspace" yaml:"oldWorkspace"`
	Action       string `json:"action" yaml:"action"` //update, create,delete
}
type Harbor struct {
	Address      string           `json:"address" yaml:"address" protobuf:"bytes,1,opt,name=address"`
	Username     string           `json:"username" yaml:"username" protobuf:"bytes,2,opt,name=username"`
	Password     string           `json:"password" yaml:"password" protobuf:"bytes,3,opt,name=password"`
	ConnectProbe *v1.ProbeHandler `json:"connectProbe" yaml:"connectProbe" protobuf:"bytes,4,opt,name=connectProbe"`
}
type Prometheus struct {
	Address      string           `json:"address" yaml:"address" protobuf:"bytes,1,opt,name=address"`
	Token        string           `json:"token" yaml:"token" protobuf:"bytes,2,opt,name=token"`
	Username     string           `json:"username" yaml:"username" protobuf:"bytes,3,opt,name=username"`
	Password     string           `json:"password" yaml:"password" protobuf:"bytes,4,opt,name=password"`
	ConnectProbe *v1.ProbeHandler `json:"connectProbe" yaml:"connectProbe" protobuf:"bytes,5,opt,name=connectProbe"`
}
type Grafana struct {
	Address      string           `json:"address" yaml:"address" protobuf:"bytes,1,opt,name=address"`
	Token        string           `json:"token" yaml:"token" protobuf:"bytes,2,opt,name=token"`
	Username     string           `json:"username" yaml:"username" protobuf:"bytes,3,opt,name=username"`
	Password     string           `json:"password" yaml:"password" protobuf:"bytes,4,opt,name=password"`
	ConnectProbe *v1.ProbeHandler `json:"connectProbe" yaml:"connectProbe" protobuf:"bytes,5,opt,name=connectProbe"`
}
type HelmRequest struct {
	Name      string                 `json:"name" yaml:"name"`
	Namespace string                 `json:"namespace" yaml:"namespace"`
	ChartUrl  string                 `json:"chartUrl" yaml:"chartUrl"`
	Values    map[string]interface{} `json:"values" yaml:"values"`
	Version   int                    `json:"version" yaml:"version"`
}

type CsrRequest struct {
	requestInfo           RequestInfo               `json:"requestInfo" description:"租户信息"`
	UseAdminClusterClient bool                      `json:"useAdminClusterClient" description:"使用集群配置信息创建clientset"`
	CsrInfo               dtos.ClusterAccountDetail `json:"csrInfo" description:"数据库csr信息"`
	Retry                 uint                      `json:"retry" description:"失败重试次数"`
}
type DynamicData struct {
	Namespace    string                      `json:"namespace" description:""`
	Kind         string                      `json:"kind" description:""`
	Name         string                      `json:"name" description:""`
	Unstructured unstructured.Unstructured   `json:"-" description:""`
	Resource     schema.GroupVersionResource `json:"-" description:""`
	ApiVersion   string                      `gorm:"type:varchar(255);column:api_version;default:v4" json:"apiVersion" description:""`
	Status       string                      `json:"status" description:"状态"`
	Success      bool                        `json:"success" description:"成功"`
	Reason       string                      `json:"reason" description:"失败原因"`
}

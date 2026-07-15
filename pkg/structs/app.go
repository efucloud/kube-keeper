package structs

import "fmt"

type AppInfo struct {
	Doc       string `json:"-" description:"应用版本信息"`
	GoVersion string
	Commit    string
	BuildDate string
}
type RequestInfo struct {
	Doc          string `json:"-" description:"多租户用户信息"`
	ClusterId    string `json:"clusterId" description:"集群ID"`
	Workspace    string `json:"workspace" description:"工作空间编码"`
	ClusterCode  string `json:"clusterCode" description:"集群编码"`
	Namespace    string `json:"namespace" description:"Namespace"`
	ResourceKind string `json:"resourceKind" description:"资源类型"`
	ResourceName string `json:"resourceName" description:"资源名称"`
	AccountId    string `json:"accountId" description:"用户在系统中的ID"`
	Username     string `json:"username" description:"请求Token中用户名"`
	Email        string `json:"email" description:"请求Token中邮箱"`
	Token        string `json:"token" description:"请求Token"`
}

func (tenant RequestInfo) String() string {
	result := fmt.Sprintf("cluster: %s ", tenant.ClusterCode)
	if len(tenant.Workspace) > 0 {
		result += fmt.Sprintf("workspace: %s ", tenant.Workspace)
	}
	if len(tenant.Namespace) > 0 {
		result += fmt.Sprintf("namespace: %s ", tenant.Namespace)
	}
	if len(tenant.AccountId) > 0 {
		result += fmt.Sprintf("account id: %s ", tenant.AccountId)
	}
	if len(tenant.Username) > 0 || len(tenant.Email) > 0 {
		result += fmt.Sprintf("username: %s(%s) ", tenant.Username, tenant.Email)
	}
	return result
}

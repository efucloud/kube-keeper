package structs

import rbacv1 "k8s.io/api/rbac/v1"

type ClusterRbacView struct {
	Name           string `json:"name" description:"名称"`
	Kind           string `json:"kind" description:"Name类型"`
	ClusterRoles   map[string]rbacv1.ClusterRole
	NamespaceRoles []NamespaceRole `json:"namespaceRoles" description:"Namespace中的权限信息"`
}
type NamespaceRole struct {
	Namespace       string             `json:"namespace" description:"Namespace"`
	RoleBindingName string             `json:"roleBindingName" description:"RoleBinding名称"`
	Role            rbacv1.Role        `json:"role" description:"Namespace的Role信息"`
	ClusterRole     rbacv1.ClusterRole `json:"clusterRole" description:"集群的ClusterRole信息"`
}

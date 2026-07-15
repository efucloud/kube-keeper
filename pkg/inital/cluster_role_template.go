package inital

import (
	"github.com/efucloud/kube-keeper/pkg/config"
	dtos2 "github.com/efucloud/kube-keeper/pkg/models/dtos"
	rbacv1 "k8s.io/api/rbac/v1"
)

func GetRoleTemplate(name, category string) (result dtos2.ClusterRoleTemplate) {
	for _, item := range ClusterRoleTemplates {
		if item.Name == name && item.Category == category {
			return item
		}
	}
	return result
}

var ClusterRoleTemplates = []dtos2.ClusterRoleTemplate{
	{
		Category: "ClusterRole",
		Name:     "efu-cluster-admin",
		Rule: dtos2.TemplateClusterRoleRule{
			Labels: map[string]string{
				config.K8sClusterResourceCreateSourceKey: config.K8sClusterResourceCreateSourceValue,
				LabelProviderKey:                         LabelProviderValue,
				LabelResourceCategoryKey:                 LabelResourceCategoryValue,
				LabelResourceAutoKey:                     LabelResourceAutoValue,
			},
			Rules: []rbacv1.PolicyRule{
				{
					APIGroups: []string{"*"},
					Resources: []string{"*"},
					Verbs:     []string{"*"},
				},
			},
			AggregationRule: nil,
		},
		Description: "集群管理员角色，能够操作集群中所有资源对象",
	},
	{

		Category: "ClusterRole",
		Name:     "efu-cluster-edit",

		Rule: dtos2.TemplateClusterRoleRule{
			Labels: map[string]string{
				config.K8sClusterResourceCreateSourceKey: config.K8sClusterResourceCreateSourceValue,
				LabelProviderKey:                         LabelProviderValue,
				LabelResourceCategoryKey:                 LabelResourceCategoryValue,
				LabelResourceAutoKey:                     LabelResourceAutoValue,
			},
			Rules: []rbacv1.PolicyRule{
				{
					APIGroups: []string{"*"},
					Resources: []string{"*"},
					Verbs:     []string{"list", "get", "watch", "update", "patch"},
				},
			},
			AggregationRule: nil,
		},
		Description: "集群编辑者角色，能够查看和更新集群中所有资源对象，但是不能创建和删除资源对象",
	},
	{

		Category: "ClusterRole",
		Name:     "efu-cluster-view",

		Rule: dtos2.TemplateClusterRoleRule{
			Labels: map[string]string{
				config.K8sClusterResourceCreateSourceKey: config.K8sClusterResourceCreateSourceValue,
				LabelProviderKey:                         LabelProviderValue,
				LabelResourceCategoryKey:                 LabelResourceCategoryValue,
				LabelResourceAutoKey:                     LabelResourceAutoValue,
			},
			Rules: []rbacv1.PolicyRule{
				{
					APIGroups: []string{"*"},
					Resources: []string{"*"},
					Verbs:     []string{"list", "get", "watch"},
				},
			},
			AggregationRule: nil,
		},
		Description: "集群查看者角色，能够查看集群中所有资源对象，但是不能创建、更新和删除资源对象",
	},
	//-------
	{

		Category: "Role",
		Name:     "efu-namespace-admin",

		Rule: dtos2.TemplateClusterRoleRule{
			Labels: map[string]string{
				config.K8sClusterResourceCreateSourceKey: config.K8sClusterResourceCreateSourceValue,
				LabelProviderKey:                         LabelProviderValue,
				LabelResourceCategoryKey:                 LabelResourceCategoryValue,
				LabelResourceAutoKey:                     LabelResourceAutoValue,
			},
			Rules: []rbacv1.PolicyRule{
				{
					APIGroups: []string{"*"},
					Resources: []string{"*"},
					Verbs:     []string{"*"},
				},
			},
			AggregationRule: nil,
		},
		Description: "命名空间管理员角色，能够操作命名空间中所有资源对象",
	},
	{

		Category: "Role",
		Name:     "efu-namespace-edit",

		Rule: dtos2.TemplateClusterRoleRule{
			Labels: map[string]string{
				config.K8sClusterResourceCreateSourceKey: config.K8sClusterResourceCreateSourceValue,
				LabelProviderKey:                         LabelProviderValue,
				LabelResourceCategoryKey:                 LabelResourceCategoryValue,
				LabelResourceAutoKey:                     LabelResourceAutoValue,
			},
			Rules: []rbacv1.PolicyRule{
				{
					APIGroups: []string{"*"},
					Resources: []string{"*"},
					Verbs:     []string{"list", "get", "watch", "update", "patch"},
				},
			},
			AggregationRule: nil,
		},
		Description: "命名空间编辑者角色，能够查看和更新命名空间中所有资源对象，但是不能创建和删除资源对象",
	},
	{

		Category: "Role",
		Name:     "efu-namespace-view",

		Rule: dtos2.TemplateClusterRoleRule{
			Labels: map[string]string{
				config.K8sClusterResourceCreateSourceKey: config.K8sClusterResourceCreateSourceValue,
				LabelProviderKey:                         LabelProviderValue,
				LabelResourceCategoryKey:                 LabelResourceCategoryValue,
				LabelResourceAutoKey:                     LabelResourceAutoValue,
			},
			Rules: []rbacv1.PolicyRule{
				{
					APIGroups: []string{"*"},
					Resources: []string{"*"},
					Verbs:     []string{"list", "get", "watch"},
				},
			},
			AggregationRule: nil,
		},
		Description: "命名空间查看者角色，能够查看命名空间中所有资源对象，但是不能创建、更新和删除资源对象",
	},
	{

		Category: "Role",
		Name:     "efu-namespace-develop",

		Rule: dtos2.TemplateClusterRoleRule{
			Labels: map[string]string{
				config.K8sClusterResourceCreateSourceKey: config.K8sClusterResourceCreateSourceValue,
				LabelProviderKey:                         LabelProviderValue,
				LabelResourceCategoryKey:                 LabelResourceCategoryValue,
				LabelResourceAutoKey:                     LabelResourceAutoValue,
			},
			Rules: []rbacv1.PolicyRule{
				{
					APIGroups: []string{""},
					Resources: []string{"configmaps"},
					Verbs:     []string{"get", "list", "watch", "create", "update", "patch", "delete"},
				},
				{
					APIGroups: []string{"apps"},
					Resources: []string{"deployments", "statefulsets", "daemonsets", "replicasets"},
					Verbs:     []string{"get", "list", "watch", "create", "update", "patch", "delete"},
				},
				{
					APIGroups: []string{"batch"},
					Resources: []string{"jobs", "cronjobs"},
					Verbs:     []string{"get", "list", "watch", "create", "update", "patch", "delete"},
				},
				{
					APIGroups: []string{""},
					Resources: []string{"pods"},
					Verbs:     []string{"get", "list", "watch", "create", "update", "patch", "delete"},
				},
			},

			AggregationRule: nil,
		},
		Description: "开发人员权限：只工作负载和ConfigMap的权限",
	},
}

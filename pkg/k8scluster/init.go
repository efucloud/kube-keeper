package k8scluster

import (
	"context"
	"github.com/efucloud/kube-keeper/pkg/config"
	inital2 "github.com/efucloud/kube-keeper/pkg/inital"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	rbacv1 "k8s.io/api/rbac/v1"
	apierrors "k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

func InitClusterData(ctx context.Context, cluster dtos.ClusterDetail) {
	client, errorData := NewAdminClientSetForConfigByCluster(cluster)
	if errorData.IsNotNil() {
		config.Logger.Error("InitClusterData: ", errorData.Err.Error())
		return
	}
	for _, item := range inital2.ClusterRoleTemplates {
		if item.Category == "Role" {
			continue
		}
		labels := item.Rule.Labels
		role, err := client.K8sClientSet.RbacV1().ClusterRoles().Get(ctx, item.Name, metav1.GetOptions{})
		if apierrors.IsNotFound(err) {
			createRole := rbacv1.ClusterRole{
				ObjectMeta: metav1.ObjectMeta{
					Name:   item.Name,
					Labels: labels,
					Annotations: map[string]string{
						inital2.LabelDescription: item.Description,
					},
				},
				Rules:           item.Rule.Rules,
				AggregationRule: item.Rule.AggregationRule,
			}
			_, err = client.K8sClientSet.RbacV1().ClusterRoles().Create(ctx, &createRole, metav1.CreateOptions{})
		} else {
			role.Labels = labels
			if role.Annotations == nil {
				role.Annotations = make(map[string]string)
			}
			role.Annotations[inital2.LabelDescription] = item.Description
			role.Rules = item.Rule.Rules
			role.AggregationRule = item.Rule.AggregationRule
			_, err = client.K8sClientSet.RbacV1().ClusterRoles().Update(ctx, role, metav1.UpdateOptions{})
		}
	}
}

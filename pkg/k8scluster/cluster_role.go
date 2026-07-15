package k8scluster

import (
	"context"
	"github.com/efucloud/common"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	database2 "github.com/efucloud/kube-keeper/pkg/k8scluster/database"
	"github.com/efucloud/kube-keeper/pkg/structs"
	apierrors "k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

type ClusterRoleService struct {
}

func (svc *ClusterRoleService) DeleteClusterAccountRoleBinding(ctx context.Context, requestInfo structs.RequestInfo, ids []string) {
	var (
		errorData     common.ErrorData
		userClientSet *ClusterClientSet
	)
	_, userClientSet, errorData = GetClusterAndUserClientSet(ctx, requestInfo)
	if errorData.IsNotNil() {
		errorData.MsgCode = config2.MsgCodeRecordNotExist
		config2.Logger.Errorf("create Authorize failed, err: %s", errorData.Err.Error())
		return
	}
	clusterRoleSvc := database2.ClusterAccountRoleService{}
	for _, id := range ids {
		role, _ := clusterRoleSvc.GetClusterAccountRoleById(ctx, id)
		if len(role.BindingName) > 0 {
			err := userClientSet.K8sClientSet.RbacV1().ClusterRoleBindings().Delete(ctx, role.BindingName, metav1.DeleteOptions{})
			if err == nil || apierrors.IsNotFound(err) {
				clusterRoleSvc.DeleteClusterAccountRole(ctx, []string{id})
			}
		}
	}
}

func (svc *ClusterRoleService) DeleteClusterNamespaceAccountRoleBinding(ctx context.Context, requestInfo structs.RequestInfo, ids []string) {
	var (
		errorData     common.ErrorData
		userClientSet *ClusterClientSet
	)
	_, userClientSet, errorData = GetClusterAndUserClientSet(ctx, requestInfo)
	if errorData.IsNotNil() {
		errorData.MsgCode = config2.MsgCodeRecordNotExist
		config2.Logger.Errorf("create Authorize failed, err: %s", errorData.Err.Error())
		return
	}
	clusterRoleSvc := database2.ClusterNamespaceAccountRoleService{}
	for _, id := range ids {
		role, _ := clusterRoleSvc.GetClusterNamespaceAccountRoleById(ctx, requestInfo, id)
		if len(role.BindingName) > 0 {
			err := userClientSet.K8sClientSet.RbacV1().RoleBindings(requestInfo.Namespace).Delete(ctx, role.BindingName, metav1.DeleteOptions{})
			if err == nil || apierrors.IsNotFound(err) {
				clusterRoleSvc.DeleteClusterNamespaceAccountRole(ctx, requestInfo, []string{id})
			}
		}
	}
}

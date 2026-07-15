package k8scluster

import (
	"context"
	"crypto/rand"
	"crypto/rsa"
	"crypto/x509"
	"crypto/x509/pkix"
	"encoding/base64"
	"encoding/pem"
	"errors"
	"fmt"
	"github.com/efucloud/common"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/inital"
	database2 "github.com/efucloud/kube-keeper/pkg/k8scluster/database"
	dtos2 "github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/efucloud/kube-keeper/pkg/structs"
	certv1 "k8s.io/api/certificates/v1"
	corev1 "k8s.io/api/core/v1"
	rbacv1 "k8s.io/api/rbac/v1"
	apierrors "k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	labelutil "k8s.io/apimachinery/pkg/labels"
	"k8s.io/client-go/kubernetes"
	"net/http"
	"strings"
	"time"
)

const (
	rsaKeySize = 2048
	signerName = "kubernetes.io/kube-apiserver-client"
)

type PermissionService struct {
}

func (svc *PermissionService) DeleteClusterAccount(ctx context.Context, clusterCode, id string, isSupper bool) (errorData common.ErrorData) {
	var (
		clientSet      *ClusterClientSet
		requestInfo    structs.RequestInfo
		certRequest    *certv1.CertificateSigningRequest
		clusterAccount dtos2.ClusterAccountDetail
	)
	clusterAccSvc := database2.ClusterAccountService{}
	clusterAccount, errorData = clusterAccSvc.GetClusterAccountByID(ctx, id)
	if errorData.IsNotNil() {
		return
	}
	requestInfo.ClusterCode = clusterCode
	//下面的逻辑不能放入service中，否则会形成循环依赖
	clusterSvc := database2.ClusterService{}
	cluster, _ := clusterSvc.GetClusterByCode(ctx, clusterCode)
	if len(cluster.ID) == 0 {
		errorData.MsgCode = config2.MsgCodeClusterIsNotFoundOrDisable
		config2.Logger.Errorf("can't getByCode cluster by code: %s", clusterCode)
		return
	}
	if isSupper {
		_, clientSet, errorData = GetClusterAndAdminClientSet(ctx, requestInfo)
		if errorData.IsNotNil() {
			config2.Logger.Errorf("cluster: %s getByCode cluster admin client set failed, err: %s", clusterCode, errorData.Err.Error())
			return
		}
	} else {
		_, clientSet, errorData = GetClusterAndUserClientSet(ctx, requestInfo)
		if errorData.IsNotNil() {
			config2.Logger.Errorf("cluster: %s getByCode cluster admin client set failed, err: %s", clusterCode, errorData.Err.Error())
			return
		}
	}
	csrName := fmt.Sprintf("efucloud-csr-%s", clusterAccount.AccountId)
	certRequest, errorData.Err = clientSet.K8sClientSet.CertificatesV1().CertificateSigningRequests().Get(ctx, csrName, metav1.GetOptions{})
	if len(certRequest.Name) > 0 {
		config2.Logger.Infof("ready to delete csr: %s from cluster: %s", csrName, cluster.Code)
		errorData.Err = clientSet.K8sClientSet.CertificatesV1().CertificateSigningRequests().Delete(ctx, csrName, metav1.DeleteOptions{})
	}
	if errorData.IsNotNil() && !apierrors.IsNotFound(errorData.Err) {
		config2.Logger.Errorf("cluster: %s delete CertificateSigningRequests: %s  failed, err: %s", clusterCode, csrName, errorData.Err.Error())
		return
	} else {
		errorData.Err = nil
	}
	// 删除clusterrolebinding
	_ = clientSet.K8sClientSet.RbacV1().ClusterRoleBindings().DeleteCollection(ctx, metav1.DeleteOptions{}, metav1.ListOptions{
		LabelSelector: fmt.Sprintf("%s=%s", config2.K8sResourceOwner, clusterAccount.AccountId),
	})
	//删除role binding
	var roleList *rbacv1.RoleBindingList
	roleList, errorData.Err = clientSet.K8sClientSet.RbacV1().RoleBindings(corev1.NamespaceAll).List(ctx, metav1.ListOptions{LabelSelector: fmt.Sprintf("%s=%s", config2.K8sResourceOwner, clusterAccount.AccountId)})
	if errorData.IsNotNil() {
		config2.Logger.Errorf("cluster: %s list all namespaces rolebinding for account id: %s  failed, err: %s", requestInfo.ClusterCode, clusterAccount.AccountId, errorData.Err.Error())
	}
	for _, role := range roleList.Items {
		errorData.Err = clientSet.K8sClientSet.RbacV1().RoleBindings(role.Namespace).Delete(ctx, role.Name, metav1.DeleteOptions{})
		if errorData.IsNotNil() && !apierrors.IsNotFound(errorData.Err) {
			continue
		}
	}
	clusterAccSvc = database2.ClusterAccountService{}
	if isSupper {
		errorData = clusterAccSvc.DeleteSupperClusterAccount(ctx, structs.RequestInfo{ClusterId: cluster.ID}, []string{id})
	} else {
		errorData = clusterAccSvc.DeleteClusterAccount(ctx, structs.RequestInfo{ClusterId: cluster.ID}, []string{id})
	}
	return
}
func (svc *PermissionService) GetUserClusters(ctx context.Context, accountId string, search string, page, size int, order, query string, queryArgs []interface{}) (result dtos2.UserAccessClusterList) {
	if len(search) > 0 {
		clusterSvc := database2.ClusterService{}
		clusters, _ := clusterSvc.ListCluster(ctx, 1, 2000, "", "name LIKE ? OR code LIKE ?", []interface{}{fmt.Sprintf("%%%s%%", search), fmt.Sprintf("%%%s%%", search)})
		if len(clusters.Data) > 0 {
			var clusterIds []string
			for _, cluster := range clusters.Data {
				clusterIds = append(clusterIds, cluster.ID)
			}
			if len(query) == 0 {
				query = "cluster_id IN (?) "
			} else {
				query += " AND cluster_id IN (?) "
			}
			queryArgs = append(queryArgs, clusterIds)
		}
	}
	clusterAccSvc := database2.ClusterAccountService{}
	result, _ = clusterAccSvc.ListUserCanAccessClusters(ctx, accountId, page, size, order, query, queryArgs)
	return
}

func (svc *PermissionService) GetUserClusterNamespaces(ctx context.Context, clusterId, accountId, search string, page, size int, order string) (results dtos2.ClusterNamespaceDetailList) {
	clusterAccSvc := database2.ClusterAccountService{}
	clusterAccount, _ := clusterAccSvc.GetClusterAccountInfoByAccountID(ctx, clusterId, accountId)
	if len(clusterAccount.ID) == 0 {
		return
	}
	// 超级管理员直接获取所有命名空间
	if clusterAccount.IsSupper {
		clusterNaSvc := database2.ClusterNamespaceService{}
		if len(search) > 0 {
			results, _ = clusterNaSvc.ListClusterNamespace(ctx, page, size, order, "cluster_id = ? AND namespace LIKE ? ",
				[]interface{}{clusterId, fmt.Sprintf("%%%s%%", search)})
		} else {
			results, _ = clusterNaSvc.ListClusterNamespace(ctx, page, size, order, "cluster_id = ? ",
				[]interface{}{clusterId})
		}

	} else {

	}
	return
}
func (svc *PermissionService) DeleteClusterAccountByIds(ctx context.Context, requestInfo structs.RequestInfo, ids []string) (errorData common.ErrorData) {
	var (
		clientSet      *ClusterClientSet
		certRequest    *certv1.CertificateSigningRequest
		clusterAccount dtos2.ClusterAccountDetail
		cluster        dtos2.ClusterDetail
	)
	clusterAccSvc := database2.ClusterAccountService{}
	//先判断登录用户是不是集群超级管理员
	requestAccount, _ := clusterAccSvc.GetClusterAccountInfoByAccountID(ctx, requestInfo.ClusterId, requestInfo.AccountId)
	if !requestAccount.IsSupper {
		errorData.MsgCode = config2.MsgCodeCurrentActionIsForbidden
		errorData.Err = fmt.Errorf("current user isn't supper admin, current action is forbidden")
		return
	}
	cluster, clientSet, errorData = GetClusterAndUserClientSet(ctx, requestInfo)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("cluster: %s getByCode cluster admin client set failed, err: %s", requestInfo.ClusterCode, errorData.Err.Error())
		return
	}
	for _, id := range ids {
		clusterAccount, errorData = clusterAccSvc.GetClusterAccountByID(ctx, id)
		if errorData.IsNotNil() || clusterAccount.IsSupper {
			continue
		}
		//todo 集群管理员不能删除集群管理员
		if clusterAccount.IsSupper {
			continue
		}
		csrName := fmt.Sprintf("efucloud-csr-%s", clusterAccount.AccountId)
		certRequest, errorData.Err = clientSet.K8sClientSet.CertificatesV1().CertificateSigningRequests().Get(ctx, csrName, metav1.GetOptions{})
		if len(certRequest.Name) > 0 {
			config2.Logger.Infof("ready to delete csr: %s from cluster: %s", csrName, cluster.Code)
			errorData.Err = clientSet.K8sClientSet.CertificatesV1().CertificateSigningRequests().Delete(ctx, csrName, metav1.DeleteOptions{})
		}
		if errorData.IsNotNil() && !apierrors.IsNotFound(errorData.Err) {
			config2.Logger.Errorf("cluster: %s delete CertificateSigningRequests: %s  failed, err: %s", requestInfo.ClusterCode, csrName, errorData.Err.Error())
			continue
		}
		// 删除cluster role binding
		errorData.Err = clientSet.K8sClientSet.RbacV1().ClusterRoleBindings().DeleteCollection(ctx, metav1.DeleteOptions{}, metav1.ListOptions{
			LabelSelector: fmt.Sprintf("%s=%s", config2.K8sResourceOwner, clusterAccount.AccountId),
		})
		if errorData.IsNotNil() {
			config2.Logger.Errorf("cluster: %s delete clusterrolebinding for account id: %s   failed, err: %s", requestInfo.ClusterCode, clusterAccount.AccountId, errorData.Err.Error())
			continue
		}
		//删除role binding
		var roleList *rbacv1.RoleBindingList
		roleList, errorData.Err = clientSet.K8sClientSet.RbacV1().RoleBindings(corev1.NamespaceAll).List(ctx, metav1.ListOptions{LabelSelector: fmt.Sprintf("%s=%s", config2.K8sResourceOwner, clusterAccount.AccountId)})
		if errorData.IsNotNil() {
			config2.Logger.Errorf("cluster: %s list all namespaces rolebinding for account id: %s  failed, err: %s", requestInfo.ClusterCode, clusterAccount.AccountId, errorData.Err.Error())
			continue
		}
		for _, role := range roleList.Items {
			errorData.Err = clientSet.K8sClientSet.RbacV1().RoleBindings(role.Namespace).Delete(ctx, role.Name, metav1.DeleteOptions{})
			if errorData.IsNotNil() && !apierrors.IsNotFound(errorData.Err) {
				continue
			}
		}
		//删除
		if errorData.IsNotNil() {
			config2.Logger.Errorf("cluster: %s delete all namespaces rolebinding for account id: %s  failed, err: %s", requestInfo.ClusterCode, clusterAccount.AccountId, errorData.Err.Error())
			continue
		}
		//删除数据库中该用户在集群中的所有角色
		roleSvc := database2.ClusterAccountRoleService{}
		roleSvc.DeleteClusterAccountRoleByAccountId(ctx, requestInfo, clusterAccount.AccountId)
		//删除用户
		errorData = clusterAccSvc.DeleteClusterAccountByAccountId(ctx, structs.RequestInfo{ClusterId: cluster.ID}, []string{clusterAccount.AccountId})
		if errorData.IsNotNil() {
			config2.Logger.Errorf("cluster: %s delete cluster account for account id: %s  failed, err: %s", requestInfo.ClusterCode, clusterAccount.AccountId, errorData.Err.Error())
			continue
		}
	}

	return
}
func (svc *PermissionService) CreateManagerClusterCertificateSigningRequests(ctx context.Context,
	clientSet *kubernetes.Clientset, email, csrName string) (certificate string, private []byte, errorData common.ErrorData) {
	var (
		certRequest *certv1.CertificateSigningRequest
	)
	errorData.Err = clientSet.CertificatesV1().CertificateSigningRequests().Delete(ctx, csrName, metav1.DeleteOptions{})
	if errorData.IsNil() {
		time.Sleep(2 * time.Second)
	}
	certRequest, errorData.Err = clientSet.CertificatesV1().CertificateSigningRequests().Get(ctx, csrName, metav1.GetOptions{})
	if len(certRequest.Name) == 0 {
		certRequest, private, errorData.Err = BuildCertificateSigningRequest(ctx, email, csrName, email, []string{}, config2.CSRExpireSecond)
		if errorData.IsNotNil() {
			config2.Logger.Errorf("cluster: %s buildCertificateSigningRequest failed, err: %s", "manager", errorData.Err.Error())
			return
		}

		certRequest, errorData.Err = clientSet.CertificatesV1().CertificateSigningRequests().Create(ctx, certRequest, metav1.CreateOptions{})
		if errorData.IsNotNil() {
			config2.Logger.Errorf("cluster: %s create CertificateSigningRequest failed, err: %s", "manager", errorData.Err.Error())
			return
		}
		if certRequest != nil {
			for i := 0; i < 10; i++ {
				certRequest, _ = clientSet.CertificatesV1().CertificateSigningRequests().Get(ctx, csrName, metav1.GetOptions{})
				approved := false
				for _, con := range certRequest.Status.Conditions {
					if con.Type == certv1.CertificateApproved {
						approved = true
					}
				}
				if len(certRequest.Status.Certificate) > 0 {
					certificate = base64.StdEncoding.EncodeToString(certRequest.Status.Certificate)
					approved = true
					break
				} else if !approved {
					certRequest.Status.Conditions = append(certRequest.Status.Conditions, certv1.CertificateSigningRequestCondition{
						Type:           certv1.CertificateApproved,
						Reason:         fmt.Sprintf("User activation, application: %s created", config2.ApplicationName),
						Status:         corev1.ConditionTrue,
						Message:        "This CSR was approved",
						LastUpdateTime: metav1.Now(),
					})
					certRequest, errorData.Err = clientSet.CertificatesV1().CertificateSigningRequests().UpdateApproval(ctx, certRequest.Name, certRequest, metav1.UpdateOptions{})
				}
				time.Sleep(2 * time.Second)

			}
		}

	}
	return
}
func (svc *PermissionService) CreateUserClusterCertificateSigningRequests(ctx context.Context,
	clientSet *ClusterClientSet, account dtos2.AccountDetail,
	csrName, creatorId, clusterCode string) (certificate string, private []byte, errorData common.ErrorData) {
	var (
		certRequest *certv1.CertificateSigningRequest
	)
	errorData.Err = clientSet.K8sClientSet.CertificatesV1().CertificateSigningRequests().Delete(ctx, csrName, metav1.DeleteOptions{})
	if errorData.IsNil() {
		time.Sleep(2 * time.Second)
	}
	certRequest, errorData.Err = clientSet.K8sClientSet.CertificatesV1().CertificateSigningRequests().Get(ctx, csrName, metav1.GetOptions{})
	if len(certRequest.Name) == 0 {
		certRequest, private, errorData.Err = BuildCertificateSigningRequest(ctx, creatorId, csrName, account.Email, []string{}, config2.CSRExpireSecond)
		if errorData.IsNotNil() {
			config2.Logger.Errorf("cluster: %s buildCertificateSigningRequest failed, err: %s", clusterCode, errorData.Err.Error())
			return
		}
		certRequest, errorData.Err = clientSet.K8sClientSet.CertificatesV1().CertificateSigningRequests().Create(ctx, certRequest, metav1.CreateOptions{})
		if errorData.IsNotNil() {
			config2.Logger.Errorf("cluster: %s create CertificateSigningRequest failed, err: %s", clusterCode, errorData.Err.Error())
			return
		}
		if certRequest != nil {
			for i := 0; i < 10; i++ {
				certRequest, _ = clientSet.K8sClientSet.CertificatesV1().CertificateSigningRequests().Get(ctx, csrName, metav1.GetOptions{})
				approved := false
				for _, con := range certRequest.Status.Conditions {
					if con.Type == certv1.CertificateApproved {
						approved = true
					}
				}
				if len(certRequest.Status.Certificate) > 0 {
					certificate = base64.StdEncoding.EncodeToString(certRequest.Status.Certificate)
					approved = true
					break
				} else if !approved {
					certRequest.Status.Conditions = append(certRequest.Status.Conditions, certv1.CertificateSigningRequestCondition{
						Type:           certv1.CertificateApproved,
						Reason:         fmt.Sprintf("User activation, application: %s created, created by: %s ", config2.ApplicationName, creatorId),
						Status:         corev1.ConditionTrue,
						Message:        "This CSR was approved",
						LastUpdateTime: metav1.Now(),
					})
					certRequest, errorData.Err = clientSet.K8sClientSet.CertificatesV1().CertificateSigningRequests().UpdateApproval(ctx, certRequest.Name, certRequest, metav1.UpdateOptions{})
				}
				time.Sleep(2 * time.Second)

			}
		}

	}
	return
}

// AddClusterRoleBinding 创建集群角色绑定，若存在则会先删除
func (svc *PermissionService) AddClusterRoleBinding(ctx context.Context, clientSet *ClusterClientSet, account dtos2.AccountDetail, creatorId, clusterCode, clusterRole string) (errorData common.ErrorData) {
	var (
		binding rbacv1.ClusterRoleBinding
	)
	bindingName := fmt.Sprintf("%s--%s", clusterRole, account.ID)
	binding.Name = bindingName
	binding.Labels = labelutil.Set{}
	binding.Labels[config2.K8sClusterResourceCreateSourceKey] = config2.K8sClusterResourceCreateSourceValue
	binding.Labels[config2.K8sClusterRoleBindingRef] = clusterRole
	binding.Labels[config2.K8sResourceCreatorLabel] = creatorId
	binding.Labels[config2.K8sResourceOwner] = account.ID
	binding.Annotations = make(map[string]string)
	binding.Annotations[config2.CSRUserNameAnnotation] = account.Username
	binding.Annotations[config2.CSRUserEmailAnnotation] = account.Email
	binding.RoleRef = rbacv1.RoleRef{
		APIGroup: "rbac.authorization.k8s.io",
		Kind:     "ClusterRole",
		Name:     clusterRole,
	}
	binding.Subjects = append(binding.Subjects, rbacv1.Subject{
		Kind:     "User",
		APIGroup: "rbac.authorization.k8s.io",
		Name:     account.Email,
	})
	_ = clientSet.K8sClientSet.RbacV1().ClusterRoleBindings().Delete(ctx, binding.Name, metav1.DeleteOptions{})
	_, errorData.Err = clientSet.K8sClientSet.RbacV1().ClusterRoleBindings().Create(ctx, &binding, metav1.CreateOptions{})
	if errorData.IsNotNil() {
		config2.Logger.Errorf("cluster: %s create binding cluster role: %s failed, err: %s", clusterCode, binding.Name, errorData.Err.Error())
		return
	}
	return
}

// AddClusterNamespaceRoleBinding 创建命名空间角色绑定，若存在则会先删除
func (svc *PermissionService) AddClusterNamespaceRoleBinding(ctx context.Context, namespace string, clientSet *ClusterClientSet, account dtos2.AccountDetail, creatorId, clusterCode, role string) (errorData common.ErrorData) {
	var (
		binding rbacv1.RoleBinding
	)
	bindingName := fmt.Sprintf("%s--%s", role, account.ID)
	binding.Name = bindingName
	binding.Labels = labelutil.Set{}
	binding.Labels[config2.K8sClusterResourceCreateSourceKey] = config2.K8sClusterResourceCreateSourceValue
	binding.Labels[config2.K8sClusterRoleBindingRef] = role
	binding.Labels[config2.K8sResourceCreatorLabel] = creatorId
	binding.Labels[config2.K8sResourceOwner] = account.ID
	binding.Annotations = make(map[string]string)
	binding.Annotations[config2.CSRUserNameAnnotation] = account.Username
	binding.Annotations[config2.CSRUserEmailAnnotation] = account.Email
	binding.RoleRef = rbacv1.RoleRef{
		APIGroup: "rbac.authorization.k8s.io",
		Kind:     "Role",
		Name:     role,
	}
	binding.Subjects = append(binding.Subjects, rbacv1.Subject{
		Kind:     "User",
		APIGroup: "rbac.authorization.k8s.io",
		Name:     account.Email,
	})
	_ = clientSet.K8sClientSet.RbacV1().RoleBindings(namespace).Delete(ctx, binding.Name, metav1.DeleteOptions{})
	_, errorData.Err = clientSet.K8sClientSet.RbacV1().RoleBindings(namespace).Create(ctx, &binding, metav1.CreateOptions{})
	if errorData.IsNotNil() {
		config2.Logger.Errorf("cluster: %s create binding namespace role: %s failed, err: %s", clusterCode, binding.Name, errorData.Err.Error())
		return
	}
	return
}

func (svc *PermissionService) AddAuthorizeClusterNamespaceByTemplate(ctx context.Context, creatorId string, requestInfo structs.RequestInfo, model dtos2.NamespaceAuthorizeByTemplate) (errorData common.ErrorData) {

	config2.Logger.Infof("cluster: %s operator: %s AddAuthorizeClusterNamespaceByTemplate ids: [%s] template: %s ", requestInfo.ClusterId, creatorId, strings.Join(model.AccountIds, ","), model.TemplateId)
	errorData.Err = model.Validate(ctx)
	if errorData.IsNotNil() {
		errorData.MsgCode = config2.MsgCodeRequestDataInvalid
		config2.Logger.Errorf("operator: %s AddAuthorizeClusterNamespaceByTemplate data validate failed, err: %s", creatorId, errorData.Err.Error())
		return
	}
	var (
		clientSet *ClusterClientSet
		template  dtos2.ClusterRoleTemplate
		cluster   dtos2.ClusterDetail
	)
	if len(model.TemplateId) > 0 {
		template = inital.GetRoleTemplate(model.TemplateId, "Role")
		if len(template.Name) == 0 {
			config2.Logger.Errorf("cluster: %s  operator: %s GetClusterRoleTemplateByName: %s failed, err: %s", requestInfo.ClusterId, creatorId, model.TemplateId, errorData.Err.Error())
			errorData.MsgCode = config2.MsgCodeRequestDataInvalid
			return
		}
		cluster, clientSet, errorData = GetClusterAndUserClientSet(ctx, requestInfo)
		if errorData.IsNotNil() {
			errorData.MsgCode = config2.MsgCodeRecordNotExist
			config2.Logger.Errorf("cluster: %s operator: %s create cluster ClientSet failed, err: %s", requestInfo.ClusterId, creatorId, errorData.Err.Error())
			return
		}
	}
	//判断用户在集群用户表中是否存在
	clusterAccSvc := database2.ClusterAccountService{}
	for _, accountId := range model.AccountIds {
		clusterAcc, _ := clusterAccSvc.GetClusterAccountInfoByAccountID(ctx, requestInfo.ClusterId, accountId)
		if len(clusterAcc.ID) == 0 {
			continue
		}
		for _, ns := range model.Namespaces {
			svc.addClusterNamespaceAccount(ctx, creatorId, accountId, ns, requestInfo, clientSet, cluster, template, model)
		}
	}
	return
}

func (svc *PermissionService) AddAuthorizeClusterByTemplate(ctx context.Context, creatorId string, requestInfo structs.RequestInfo, model dtos2.ClusterAuthorizeByTemplate) (errorData common.ErrorData) {

	config2.Logger.Infof("cluster: %s operator: %s AddAuthorizeClusterByTemplate ids: [%s] template: %s ", requestInfo.ClusterId, creatorId, strings.Join(model.AccountIds, ","), model.TemplateId)
	errorData.Err = model.Validate(ctx)
	if errorData.IsNotNil() {
		errorData.MsgCode = config2.MsgCodeRequestDataInvalid
		config2.Logger.Errorf("operator: %s AddAuthorizeClusterByTemplate data validate failed, err: %s", creatorId, errorData.Err.Error())
		return
	}
	var (
		clientSet *ClusterClientSet
		template  dtos2.ClusterRoleTemplate
		cluster   dtos2.ClusterDetail
	)
	if len(model.TemplateId) > 0 {
		template = inital.GetRoleTemplate(model.TemplateId, "ClusterRole")
		if len(template.Name) == 0 {
			config2.Logger.Errorf("cluster: %s  operator: %s GetClusterRoleTemplateByName: %s failed, err: %s", requestInfo.ClusterId, creatorId, model.TemplateId, errorData.Err.Error())
			errorData.MsgCode = config2.MsgCodeRequestDataInvalid
			return
		}
		cluster, clientSet, errorData = GetClusterAndUserClientSet(ctx, requestInfo)
		if errorData.IsNotNil() {
			errorData.MsgCode = config2.MsgCodeRecordNotExist
			config2.Logger.Errorf("cluster: %s operator: %s create cluster ClientSet failed, err: %s", requestInfo.ClusterId, creatorId, errorData.Err.Error())
			return
		}
	}
	//判断用户在集群用户表中是否存在
	clusterAccSvc := database2.ClusterAccountService{}
	for _, accountId := range model.AccountIds {
		clusterAcc, _ := clusterAccSvc.GetClusterAccountInfoByAccountID(ctx, requestInfo.ClusterId, accountId)
		if clusterAcc.IsSupper {
			continue
		}
		svc.addClusterAccount(ctx, creatorId, accountId, requestInfo, clientSet, cluster, template, model)
	}
	return
}

func (svc *PermissionService) addClusterNamespaceAccount(ctx context.Context, creatorId, accountId, namespace string, requestInfo structs.RequestInfo, clientSet *ClusterClientSet, cluster dtos2.ClusterDetail, template dtos2.ClusterRoleTemplate, model dtos2.NamespaceAuthorizeByTemplate) (clusterAcc dtos2.ClusterAccountDetail, errorData common.ErrorData) {
	var (
		account     dtos2.AccountDetail
		csrExist    bool
		bindingName string
		private     []byte
		certificate string
	)
	accSvc := database2.AccountService{}
	account, errorData = accSvc.GetAccountByID(ctx, accountId)
	if len(account.ID) == 0 || !account.Enable {
		errorData.Err = fmt.Errorf("account is not found or enable is false")
		errorData.MsgCode = config2.MsgCodeRequestDataInvalid
		errorData.ResponseCode = http.StatusBadRequest
		return
	}
	requestInfo.ClusterId = cluster.ID
	//判断用户在集群用户表中是否存在
	clusterAccSvc := database2.ClusterAccountService{}
	clusterAcc, _ = clusterAccSvc.GetClusterAccountInfoByAccountID(ctx, cluster.ID, accountId)
	// 如果邮箱变化则重新创建
	if len(clusterAcc.ID) > 0 && account.Email != clusterAcc.Email {
		clusterAccSvc.DeleteSupperClusterAccount(ctx, requestInfo, []string{clusterAcc.ID})
		clusterAcc.ID = ""
	} else if len(clusterAcc.ID) > 0 {

		//已经创建csr则不需要再次创建
		if len(clusterAcc.CsrName) > 0 && len(clusterAcc.ClientCertificate) > 0 && len(clusterAcc.ClientKey) > 0 {
			csrExist = true
		}
	}
	// 判断csr在数据库是否存在,使用token或者impersonation不需要在集群中创建csr
	//若集群中该用户的csr存在则跳过
	if !csrExist {
		var adminClientSet *ClusterClientSet
		_, adminClientSet, errorData = GetClusterAndUserClientSet(ctx, requestInfo)
		if errorData.IsNotNil() {
			config2.Logger.Error(errorData.Err.Error())
			return
		}
		private, certificate, errorData = svc.createClusterCSR(ctx, creatorId, cluster.Code, adminClientSet, account)
		if errorData.IsNotNil() {
			config2.Logger.Errorf("cluster: %s operator: %s create csr failed, err: %s", cluster.ID, creatorId, errorData.Err.Error())
			return
		}
	}
	if len(template.Name) > 0 {
		bindingName = fmt.Sprintf("%s--%s", template.Name, account.ID)
		//判断角色在集群中是否存在，不存在使用集群信息创建client创建
		errorData = svc.checkNamespaceRoleExistWithClient(ctx, namespace, clientSet, template)
		if errorData.IsNotNil() {
			config2.Logger.Errorf("cluster: %s namespace role: %s is not exit and auto create failed, err: %s", requestInfo.ClusterId, template.Name, errorData.Err.Error())
			return
		}
		//创建命名空间角色绑定
		errorData = svc.AddClusterNamespaceRoleBinding(ctx, namespace, clientSet, account, creatorId, requestInfo.ClusterId, template.Name)
		if errorData.IsNotNil() {
			config2.Logger.Errorf("cluster: %s use namespace role: %s create namespace role binding failed, err: %s", requestInfo.ClusterCode, template.Name, errorData.Err.Error())
			return
		}
	}
	//创建用户
	if len(clusterAcc.ID) == 0 {
		//创建用户
		var create dtos2.ClusterAccountCreate
		create.ClientCertificate = certificate
		create.ClientKey = string(private)
		create.ExpirationSeconds = config2.CSRExpireSecond
		create.ClusterId = cluster.ID
		create.Email = account.Email
		create.AccountId = account.ID
		if len(create.ClientCertificate) > 0 {
			create.State = "Approved"
			create.Reason = "OK"
		}
		clusterAcc, errorData = clusterAccSvc.CreateClusterAccount(ctx, create)
	}
	// 集群角色绑定写入数据库
	if len(template.Name) > 0 && len(bindingName) > 0 {
		var nsRole dtos2.ClusterNamespaceAccountRoleCreate
		nsRole.ClusterId = cluster.ID
		nsRole.AccountId = accountId
		nsRole.RoleName = template.Name
		nsRole.BindingName = bindingName
		nsRole.Namespace = namespace
		nsRole.Enable = true
		clusterAccRoleSvc := database2.ClusterNamespaceAccountRoleService{}
		_, errorData = clusterAccRoleSvc.AddClusterNamespaceAccountRole(ctx, nsRole)
	}
	return
}
func (svc *PermissionService) addClusterAccount(ctx context.Context, creatorId, accountId string, requestInfo structs.RequestInfo, clientSet *ClusterClientSet, cluster dtos2.ClusterDetail, template dtos2.ClusterRoleTemplate, model dtos2.ClusterAuthorizeByTemplate) (clusterAcc dtos2.ClusterAccountDetail, errorData common.ErrorData) {
	var (
		account     dtos2.AccountDetail
		csrExist    bool
		bindingName string
		private     []byte
		certificate string
	)
	accSvc := database2.AccountService{}
	account, errorData = accSvc.GetAccountByID(ctx, accountId)
	if len(account.ID) == 0 || !account.Enable {
		errorData.Err = fmt.Errorf("account is not found or enable is false")
		errorData.MsgCode = config2.MsgCodeRequestDataInvalid
		errorData.ResponseCode = http.StatusBadRequest
		return
	}
	//判断是否要创建csr
	cluster, clientSet, errorData = GetClusterAndAdminClientSet(ctx, requestInfo)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("cluster: %s create cluster admin client set failed, err: %s", requestInfo.ClusterId, errorData.Err.Error())
		return
	}
	requestInfo.ClusterId = cluster.ID
	//判断用户在集群用户表中是否存在
	clusterAccSvc := database2.ClusterAccountService{}
	clusterAcc, _ = clusterAccSvc.GetClusterAccountInfoByAccountID(ctx, cluster.ID, accountId)
	// 如果邮箱变化则重新创建
	if len(clusterAcc.ID) > 0 && account.Email != clusterAcc.Email {
		clusterAccSvc.DeleteSupperClusterAccount(ctx, requestInfo, []string{clusterAcc.ID})
		clusterAcc.ID = ""
	} else if len(clusterAcc.ID) > 0 {
		if clusterAcc.IsSupper {
			return
		}
		//已经创建csr则不需要再次创建
		if len(clusterAcc.CsrName) > 0 && len(clusterAcc.ClientCertificate) > 0 && len(clusterAcc.ClientKey) > 0 {
			csrExist = true
		}
	}
	//若集群中该用户的csr存在则跳过
	if !csrExist {
		private, certificate, errorData = svc.createClusterCSR(ctx, creatorId, cluster.Code, clientSet, account)
		if errorData.IsNotNil() {
			config2.Logger.Errorf("cluster: %s operator: %s create csr failed, err: %s", cluster.ID, creatorId, errorData.Err.Error())
			return
		}
	}
	if len(template.Name) > 0 {
		bindingName = fmt.Sprintf("%s--%s", template.Name, account.ID)
		//判断角色在集群中是否存在，不存在使用集群信息创建client创建
		errorData = svc.checkClusterRoleExistWithClient(ctx, clientSet, template)
		if errorData.IsNotNil() {
			config2.Logger.Errorf("cluster: %s cluster role: %s is not exit and auto create failed, err: %s", requestInfo.ClusterId, template.Name, errorData.Err.Error())
			return
		}
		//创建集群角色绑定
		errorData = svc.AddClusterRoleBinding(ctx, clientSet, account, creatorId, requestInfo.ClusterId, template.Name)
		if errorData.IsNotNil() {
			config2.Logger.Errorf("cluster: %s use cluster role: %s create cluster role binding failed, err: %s", requestInfo.ClusterCode, template.Name, errorData.Err.Error())
			return
		}
	}
	//创建用户
	if len(clusterAcc.ID) == 0 {
		//创建用户
		var create dtos2.ClusterAccountCreate
		create.ClientCertificate = certificate
		create.ClientKey = string(private)
		create.ExpirationSeconds = config2.CSRExpireSecond
		create.ClusterId = cluster.ID
		create.Email = account.Email
		create.AccountId = account.ID
		if len(create.ClientCertificate) > 0 {
			create.State = "Approved"
			create.Reason = "OK"
		}
		clusterAcc, errorData = clusterAccSvc.CreateClusterAccount(ctx, create)
	}
	// 集群角色绑定写入数据库
	if len(template.Name) > 0 && len(bindingName) > 0 {
		var clusterAccountRole dtos2.ClusterAccountRoleCreate

		clusterAccountRole.ClusterId = cluster.ID
		clusterAccountRole.AccountId = accountId
		clusterAccountRole.RoleName = template.Name
		clusterAccountRole.BindingName = bindingName

		clusterAccountRole.Enable = true

		clusterAccRoleSvc := database2.ClusterAccountRoleService{}
		_, errorData = clusterAccRoleSvc.AddClusterAccountRole(ctx, clusterAccountRole)
	}
	return
}
func (svc *PermissionService) AddClusterSupperAccount(ctx context.Context, creatorId, clusterCode string, model dtos2.ClusterAdmin) (clusterAcc dtos2.ClusterAccountDetail, errorData common.ErrorData) {
	var (
		account     dtos2.AccountDetail
		requestInfo structs.RequestInfo
		clientSet   *ClusterClientSet
		cluster     dtos2.ClusterDetail
		template    dtos2.ClusterRoleTemplate
		csrExist    bool
		bindingName string
		private     []byte
		certificate string
	)
	requestInfo.ClusterCode = clusterCode
	errorData.Err = model.Validate(ctx)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("validate data failed, err: %s", errorData.Err.Error())
		errorData.MsgCode = config2.MsgCodeRequestDataInvalid
		errorData.ResponseCode = http.StatusBadRequest
		return
	}
	accSvc := database2.AccountService{}
	account, errorData = accSvc.GetAccountByID(ctx, model.AccountId)
	if len(account.ID) == 0 || !account.Enable {
		errorData.Err = fmt.Errorf("account is not found or enable is false")
		errorData.MsgCode = config2.MsgCodeRequestDataInvalid
		errorData.ResponseCode = http.StatusBadRequest
		return
	}

	//判断是否要创建csr
	cluster, clientSet, errorData = GetClusterAndAdminClientSet(ctx, requestInfo)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("cluster: %s create cluster admin client set failed, err: %s", clusterCode, errorData.Err.Error())
		return
	}
	requestInfo.ClusterId = cluster.ID
	//判断用户在集群用户表中是否存在
	clusterAccSvc := database2.ClusterAccountService{}
	clusterAcc, _ = clusterAccSvc.GetClusterAccountInfoByAccountID(ctx, cluster.ID, model.AccountId)
	// 如果邮箱变化则重新创建
	if len(clusterAcc.ID) > 0 && account.Email != clusterAcc.Email {
		clusterAccSvc.DeleteSupperClusterAccount(ctx, requestInfo, []string{clusterAcc.ID})
		clusterAcc.ID = ""
	} else if len(clusterAcc.ID) > 0 {
		if clusterAcc.IsSupper {
			return
		}
		//已经创建csr则不需要再次创建
		if len(clusterAcc.CsrName) > 0 && len(clusterAcc.ClientCertificate) > 0 && len(clusterAcc.ClientKey) > 0 {
			csrExist = true
		}
	}
	// 判断csr在数据库是否存在,使用token或者impersonation不需要在集群中创建csr
	//若集群中该用户的csr存在则跳过
	if !csrExist {
		private, certificate, errorData = svc.createClusterCSR(ctx, creatorId, clusterCode, clientSet, account)
		if errorData.IsNotNil() {
			config2.Logger.Errorf("cluster: %s operator: %s create csr failed, err: %s", clusterCode, creatorId, errorData.Err.Error())
			return
		}
	}
	//判断角色在集群中是否存在，不存在使用集群信息创建client创建
	templateName := "efu-cluster-admin"
	bindingName = fmt.Sprintf("%s--%s", templateName, account.ID)
	template = inital.GetRoleTemplate(templateName, "ClusterRole")
	if len(template.Name) == 0 {
		config2.Logger.Errorf("get cluster role template: %s failed, err: %s", templateName, errorData.Err.Error())
		return
	}
	errorData = svc.checkClusterRoleExistWithClient(ctx, clientSet, template)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("cluster: %s cluster role: %s is not exit and auto create failed, err: %s", clusterCode, templateName, errorData.Err.Error())
		return
	}
	//创建集群角色绑定
	errorData = svc.AddClusterRoleBinding(ctx, clientSet, account, creatorId, clusterCode, templateName)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("cluster: %s use cluster role: %s create cluster role binding failed, err: %s", clusterCode, templateName, errorData.Err.Error())
		return
	}
	//创建用户
	if len(clusterAcc.ID) > 0 && !clusterAcc.IsSupper {
		//更新为超级管理员
		errorData = clusterAccSvc.SetClusterAccountSupper(ctx, cluster.ID, model.AccountId, creatorId)
		if errorData.IsNotNil() {
			config2.Logger.Errorf("cluster: %s account: %s set as supper admin failed, err: %s", clusterCode, model.AccountId, errorData.Err.Error())
			return
		}
	} else if len(clusterAcc.ID) == 0 {
		//创建用户
		var create dtos2.ClusterAccountCreate
		create.ClientCertificate = certificate
		create.ClientKey = string(private)
		create.ExpirationSeconds = config2.CSRExpireSecond
		create.ClusterId = cluster.ID
		create.Email = account.Email
		create.AccountId = account.ID
		if len(create.ClientCertificate) > 0 {
			create.State = "Approved"
			create.Reason = "OK"
		}
		create.IsSupper = true
		clusterAcc, errorData = clusterAccSvc.CreateClusterAccount(ctx, create)
	}
	// 集群角色绑定写入数据库
	if len(clusterAcc.ID) > 0 {
		var clusterAccountRole dtos2.ClusterAccountRoleCreate
		clusterAccountRole.ClusterId = cluster.ID
		clusterAccountRole.AccountId = account.ID
		clusterAccountRole.RoleName = templateName
		clusterAccountRole.BindingName = bindingName
		clusterAccountRole.Enable = true
		clusterAccRoleSvc := database2.ClusterAccountRoleService{}
		_, errorData = clusterAccRoleSvc.AddClusterAccountRole(ctx, clusterAccountRole)
	}
	return
}
func (svc *PermissionService) checkNamespaceRoleExistWithClient(ctx context.Context, namespace string, clientSet *ClusterClientSet, template dtos2.ClusterRoleTemplate) (errorData common.ErrorData) {
	_, errorData.Err = clientSet.K8sClientSet.RbacV1().Roles(namespace).Get(ctx, template.Name, metav1.GetOptions{})
	if apierrors.IsNotFound(errorData.Err) {
		_, errorData.Err = clientSet.K8sClientSet.RbacV1().Roles(namespace).Create(ctx, &rbacv1.Role{
			ObjectMeta: metav1.ObjectMeta{
				Name:   template.Name,
				Labels: template.Rule.Labels,
			},
			Rules: template.Rule.Rules,
		}, metav1.CreateOptions{})
	}
	return
}
func (svc *PermissionService) checkClusterRoleExistWithClient(ctx context.Context, clientSet *ClusterClientSet, template dtos2.ClusterRoleTemplate) (errorData common.ErrorData) {
	_, errorData.Err = clientSet.K8sClientSet.RbacV1().ClusterRoles().Get(ctx, template.Name, metav1.GetOptions{})
	if apierrors.IsNotFound(errorData.Err) {
		_, errorData.Err = clientSet.K8sClientSet.RbacV1().ClusterRoles().Create(ctx, &rbacv1.ClusterRole{
			ObjectMeta: metav1.ObjectMeta{
				Name:   template.Name,
				Labels: template.Rule.Labels,
			},
			Rules:           template.Rule.Rules,
			AggregationRule: template.Rule.AggregationRule,
		}, metav1.CreateOptions{})
	}
	return
}
func (svc *PermissionService) createClusterCSR(ctx context.Context, creatorId, clusterCode string, clientSet *ClusterClientSet, account dtos2.AccountDetail) (private []byte, certificate string, errorData common.ErrorData) {
	csrName := fmt.Sprintf("efucloud-csr-%s", account.ID)
	certificate, private, errorData = svc.CreateUserClusterCertificateSigningRequests(ctx, clientSet, account, csrName, creatorId, clusterCode)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("cluster: %s create CertificateSigningRequests for account: %s failed, err: %s", clusterCode, account.Username, errorData.Err.Error())
		return
	}
	if certificate == "" && len(private) == 0 {
		errorData.Err = fmt.Errorf("certificate or private is empty")
		config2.Logger.Errorf("cluster: %s create CertificateSigningRequests for account: %s failed, err: %s", clusterCode, account.Username, errorData.Err.Error())
		return
	}
	if len(certificate) > 0 && len(private) > 0 {
		//删除集群中的csr
		err := clientSet.K8sClientSet.CertificatesV1().CertificateSigningRequests().Delete(ctx, csrName, metav1.DeleteOptions{})
		if err != nil {
			config2.Logger.Errorf("delete csr: %s failed, err: %s", csrName, err)
		}
	}
	return
}
func (svc *PermissionService) CreateManagerCSR(ctx context.Context, clientSet *kubernetes.Clientset) (private []byte, certificate string, errorData common.ErrorData) {
	csrName := fmt.Sprintf("efucloud-csr-%s", "efucloud-manager")
	certificate, private, errorData = svc.CreateManagerClusterCertificateSigningRequests(ctx, clientSet, "cluster-manager@efucloud.cn", csrName)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("cluster: manager create CertificateSigningRequests failed, err: %s", errorData.Err.Error())
		return
	}
	if certificate == "" && len(private) == 0 {
		errorData.Err = fmt.Errorf("certificate or private is empty")
		config2.Logger.Errorf("cluster: manager create CertificateSigningRequests failed, err: %s", errorData.Err.Error())
		return
	}
	if len(certificate) > 0 && len(private) > 0 {
		//删除集群中的csr
		err := clientSet.CertificatesV1().CertificateSigningRequests().Delete(ctx, csrName, metav1.DeleteOptions{})
		if err != nil {
			config2.Logger.Errorf("delete csr: %s failed, err: %s", csrName, err)
		}
	}
	return
}

func BuildCertificateSigningRequest(ctx context.Context, creator, csrName, email string, groups []string, expirationSeconds int32) (*certv1.CertificateSigningRequest, []byte, error) {
	commonName := strings.TrimSpace(email)
	subject := pkix.Name{
		CommonName:   commonName,
		Country:      []string{"China"},
		Locality:     []string{"Shenzhen"},
		Organization: []string{"efucloud"},
		Province:     []string{"Shenzhen"},
	}
	privateKey, err := rsa.GenerateKey(rand.Reader, rsaKeySize)
	if err != nil {
		config2.Logger.Errorf("Failed to generate rsa key, err: %s", err.Error())
		return nil, nil, err
	}
	template := &x509.CertificateRequest{
		Subject: subject,
	}
	csrDER, err := x509.CreateCertificateRequest(rand.Reader, template, privateKey)
	if err != nil {
		config2.Logger.Errorf("Failed to Create CertificateRequest, err: %s", err.Error())
		return nil, nil, err
	}
	csrPemBlock := &pem.Block{
		Type:  "CERTIFICATE REQUEST",
		Bytes: csrDER,
	}
	req := pem.EncodeToMemory(csrPemBlock)

	labels := make(map[string]string)
	labels[config2.K8sResourceAutoCreate] = "true"
	annotations := make(map[string]string)
	annotations[config2.CSRUserEmailAnnotation] = email
	annotations[config2.CsrAnnotationExpirationSeconds] = fmt.Sprintf("%d", expirationSeconds)
	annotations[config2.CsrAnnotationExpirationTime] = time.Now().Add(time.Second * time.Duration(expirationSeconds)).Format(time.RFC3339)
	annotations[config2.K8sResourceCreatorLabel] = creator

	csr := &certv1.CertificateSigningRequest{
		ObjectMeta: metav1.ObjectMeta{
			Name:        csrName,
			Labels:      labels,
			Annotations: annotations,
		},
		Spec: certv1.CertificateSigningRequestSpec{
			Usages:     []certv1.KeyUsage{certv1.UsageClientAuth},
			SignerName: signerName,
			Request:    req,
			Groups:     groups,
		},
	}
	if expirationSeconds > 0 {
		if expirationSeconds < 600 {
			err = errors.New("expirationSeconds must greater than 600")
			return nil, nil, err
		}
		csr.Spec.ExpirationSeconds = &expirationSeconds
	}
	private := base64.StdEncoding.EncodeToString(pem.EncodeToMemory(&pem.Block{Type: "RSA PRIVATE KEY", Bytes: x509.MarshalPKCS1PrivateKey(privateKey)}))
	return csr, []byte(private), err
}

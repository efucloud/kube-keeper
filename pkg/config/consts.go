/*
Copyright 2022 The itcloudy.com Authors.

Licensed under the Apache LicenseCode, Version 2.0 (the "LicenseCode");
you may not use this file except in compliance with the LicenseCode.
You may obtain a copy of the LicenseCode at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the LicenseCode is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the LicenseCode for the specific language governing permissions and
limitations under the LicenseCode.
*/

package config

const (
	APIPrefix                          = "/api/v1"
	ClusterAPIPrefix                   = "/api/v1/cluster/{cluster}"
	ClusterNamespaceAPIPrefix          = "/api/v1/cluster/{cluster}/namespace/{namespace}"
	ClusterNamespaceWebsocketAPIPrefix = "/api/ws/cluster/{cluster}/namespace/{namespace}"
	ClusterProxyAPIPrefix              = "/api/v1/proxy/{cluster}"
	ClusterStreamAPIPrefix             = "/api/stream/cluster/{cluster}"
	ClusterAgentAPIPrefix              = "/api/stream1/cluster/{cluster}"
	ApplicationName                    = "kube-keeper"
	ServerPort                         = 9002
	RequestForm                        = "application/x-www-form-urlencoded"
	FrontApiTag                        = "FrontApiTag"
	SerialNumber                       = "SerialNumber"
)

const (
	RequestClusterCode     = "RequestClusterCode"
	RequestAccount         = "RequestAccount"
	RequestLanguage        = "RequestLanguage"
	AuthHeader             = "Authorization"
	ClusterAuthHeader      = "ClusterId-Authorization"
	RequestContext         = "RequestContext"
	RequestUserId          = "RequestUserId"
	RequestAgent           = "RequestAgent"
	RequestRemote          = "RequestRemote"
	RequestWebOnly         = "X-EfuCloud-Web"
	RequestUserAgentHeader = "X-Agent"
)
const (
	ClusterOpenshift = "Openshift"
	ScopeCluster     = "cluster"
	ClusterListLimit = 500
)

const (
	K8sClusterResourceCreateSourceKey   = "efucloud.com/source"
	K8sClusterResourceCreateSourceValue = "efucloud"
	K8sClusterShareDataOwner            = "efucloud.com/share.data.owner"
	K8sClusterShareDataPublic           = "efucloud.com/share.data.public"
	K8sClusterRoleBindingRef            = "efucloud.com/cluster.role.ref"
	K8sResourceCreatorLabel             = "efucloud.com/creator.user"
	K8sResourceOwner                    = "efucloud.com/owner"
	CSRUserEmailAnnotation              = "efucloud.com/account.email"
	CSRUserNameAnnotation               = "efucloud.com/account.username"
	CsrAnnotationExpirationSeconds      = "efucloud.com/csr.expirationSeconds"
	CsrAnnotationExpirationTime         = "efucloud.com/csr.expirationTime"
	CSRExpireSecond                     = 50 * 365 * 24 * 3600
	K8sResourceAutoCreate               = "efucloud.com/auto.create"
	NamespaceBelongsWorkspace           = "efucloud.com/workspace"
	ClusterAdmin                        = "efu-cluster-admin"
	ClusterNamespaceAdmin               = "efu-namespace-admin"
	SystemRoleAdmin                     = "admin"
)

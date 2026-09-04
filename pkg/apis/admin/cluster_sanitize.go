package admin

import dtos2 "github.com/efucloud/kube-keeper/pkg/models/dtos"

func clearClusterCredentials(cluster *dtos2.ClusterDetail) {
	if cluster == nil {
		return
	}
	cluster.CertificateAuthority = ""
	cluster.ClientCertificate = ""
	cluster.ClientKey = ""
}

func clearClusterListCredentials(clusters *dtos2.ClusterDetailList) {
	if clusters == nil {
		return
	}
	for _, cluster := range clusters.Data {
		clearClusterCredentials(cluster)
	}
}

func clearClusterAccountCredentials(account *dtos2.ClusterAccountDetail) {
	if account == nil {
		return
	}
	account.ClientCertificate = ""
	account.ClientKey = ""
}

func clearClusterAccountListCredentials(accounts *dtos2.ClusterAccountDetailList) {
	if accounts == nil {
		return
	}
	for _, account := range accounts.Data {
		clearClusterAccountCredentials(account)
	}
}

package admin

import (
	"testing"

	"github.com/efucloud/kube-keeper/pkg/models/dtos"
)

func TestClearClusterCredentials(t *testing.T) {
	cluster := dtos.ClusterDetail{
		CertificateAuthority: "ca",
		ClientCertificate:    "certificate",
		ClientKey:            "key",
	}
	clearClusterCredentials(&cluster)
	if cluster.CertificateAuthority != "" || cluster.ClientCertificate != "" || cluster.ClientKey != "" {
		t.Fatalf("cluster credentials were not cleared: %#v", cluster)
	}
}

func TestClearClusterAccountListCredentials(t *testing.T) {
	accounts := dtos.ClusterAccountDetailList{Data: []*dtos.ClusterAccountDetail{
		{ClientCertificate: "certificate", ClientKey: "key"},
		nil,
	}}
	clearClusterAccountListCredentials(&accounts)
	if accounts.Data[0].ClientCertificate != "" || accounts.Data[0].ClientKey != "" {
		t.Fatalf("cluster account credentials were not cleared: %#v", accounts.Data[0])
	}
}

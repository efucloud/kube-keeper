package services

import (
	"encoding/json"
	"strings"
	"testing"

	"github.com/efucloud/kube-keeper/pkg/models/dtos"
)

func TestClusterCacheEntryPreservesCredentials(t *testing.T) {
	original := dtos.ClusterDetail{
		ID:                   "cluster-id",
		Code:                 "test",
		CertificateAuthority: "raw-ca-pem",
		ClientCertificate:    "raw-client-cert-pem",
		ClientKey:            "raw-client-key-pem",
	}

	data, err := json.Marshal(newClusterCacheEntry(original))
	if err != nil {
		t.Fatalf("marshal cache entry: %v", err)
	}
	var entry clusterCacheEntry
	if err = json.Unmarshal(data, &entry); err != nil {
		t.Fatalf("unmarshal cache entry: %v", err)
	}

	got := entry.clusterDetail()
	if got.CertificateAuthority != original.CertificateAuthority ||
		got.ClientCertificate != original.ClientCertificate ||
		got.ClientKey != original.ClientKey {
		t.Fatalf("credentials changed after cache round trip: %#v", got)
	}
}

func TestClusterAccountCacheEntryPreservesCredentials(t *testing.T) {
	original := dtos.ClusterAccountDetail{
		ID:                "cluster-account-id",
		ClusterId:         "cluster-id",
		AccountId:         "account-id",
		ClientCertificate: "generated-client-cert",
		ClientKey:         "generated-client-key",
	}

	data, err := json.Marshal(newClusterAccountCacheEntry(original))
	if err != nil {
		t.Fatalf("marshal cache entry: %v", err)
	}
	var entry clusterAccountCacheEntry
	if err = json.Unmarshal(data, &entry); err != nil {
		t.Fatalf("unmarshal cache entry: %v", err)
	}

	got := entry.clusterAccountDetail()
	if got.ClientCertificate != original.ClientCertificate || got.ClientKey != original.ClientKey {
		t.Fatalf("credentials changed after cache round trip: %#v", got)
	}
}

func TestCredentialFieldsRemainHiddenFromPublicJSON(t *testing.T) {
	clusterJSON, err := json.Marshal(dtos.ClusterDetail{
		CertificateAuthority: "ca-secret",
		ClientCertificate:    "cert-secret",
		ClientKey:            "key-secret",
	})
	if err != nil {
		t.Fatal(err)
	}
	accountJSON, err := json.Marshal(dtos.ClusterAccountDetail{
		ClientCertificate: "account-cert-secret",
		ClientKey:         "account-key-secret",
	})
	if err != nil {
		t.Fatal(err)
	}

	publicJSON := string(clusterJSON) + string(accountJSON)
	for _, secret := range []string{"ca-secret", "cert-secret", "key-secret", "account-cert-secret", "account-key-secret"} {
		if strings.Contains(publicJSON, secret) {
			t.Fatalf("public JSON exposed credential %q", secret)
		}
	}
}

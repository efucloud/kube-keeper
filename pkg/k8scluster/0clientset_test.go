package k8scluster

import (
	"encoding/base64"
	"encoding/pem"
	"strings"
	"testing"

	dtos2 "github.com/efucloud/kube-keeper/pkg/models/dtos"
	"k8s.io/client-go/tools/clientcmd"
)

func TestEncodeKubeConfigPEMAcceptsRawAndBase64PEM(t *testing.T) {
	pemData := pem.EncodeToMemory(&pem.Block{Type: "CERTIFICATE", Bytes: []byte("test certificate")})
	encodedPEM := base64.StdEncoding.EncodeToString(pemData)
	want := base64.StdEncoding.EncodeToString([]byte(strings.TrimSpace(string(pemData))))

	for _, test := range []struct {
		name  string
		value string
	}{
		{name: "raw PEM", value: string(pemData)},
		{name: "base64 PEM", value: encodedPEM},
	} {
		t.Run(test.name, func(t *testing.T) {
			got, err := encodeKubeConfigPEM(test.value, "certificate")
			if err != nil {
				t.Fatalf("encodeKubeConfigPEM() error = %v", err)
			}
			if got != want {
				t.Fatalf("encodeKubeConfigPEM() = %q, want %q", got, want)
			}
		})
	}
}

func TestBuildKubeConfigFromAccountCsrDoesNotDoubleEncodeCredentials(t *testing.T) {
	caPEM := pem.EncodeToMemory(&pem.Block{Type: "CERTIFICATE", Bytes: []byte("test CA")})
	certPEM := pem.EncodeToMemory(&pem.Block{Type: "CERTIFICATE", Bytes: []byte("test client certificate")})
	keyPEM := pem.EncodeToMemory(&pem.Block{Type: "PRIVATE KEY", Bytes: []byte("test private key")})

	configData, err := buildKubeConfigFromAccountCsr(
		dtos2.ClusterDetail{
			Code:                 "local",
			ApiServer:            "https://kubernetes.example.test",
			CertificateAuthority: base64.StdEncoding.EncodeToString(caPEM),
		},
		dtos2.ClusterAccountDetail{
			ClientCertificate: base64.StdEncoding.EncodeToString(certPEM),
			ClientKey:         base64.StdEncoding.EncodeToString(keyPEM),
		},
		"user@example.test",
		"default",
	)
	if err != nil {
		t.Fatalf("buildKubeConfigFromAccountCsr() error = %v", err)
	}

	config, err := clientcmd.Load(configData)
	if err != nil {
		t.Fatalf("clientcmd.Load() error = %v", err)
	}
	if got := string(config.Clusters["local"].CertificateAuthorityData); got != strings.TrimSpace(string(caPEM)) {
		t.Fatalf("certificate authority = %q, want raw PEM", got)
	}
	authInfo := config.AuthInfos["user@example.test"]
	if got := string(authInfo.ClientCertificateData); got != strings.TrimSpace(string(certPEM)) {
		t.Fatalf("client certificate = %q, want raw PEM", got)
	}
	if got := string(authInfo.ClientKeyData); got != strings.TrimSpace(string(keyPEM)) {
		t.Fatalf("client key = %q, want raw PEM", got)
	}
}

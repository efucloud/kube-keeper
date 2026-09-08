package k8scluster

import (
	"errors"
	"strings"
	"testing"

	"k8s.io/apimachinery/pkg/api/meta"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime/schema"
	"k8s.io/client-go/discovery"
)

type targetedDiscovery struct {
	discovery.DiscoveryInterface
	resources *metav1.APIResourceList
	err       error
}

func (d targetedDiscovery) ServerResourcesForGroupVersion(string) (*metav1.APIResourceList, error) {
	return d.resources, d.err
}

func TestGetResourceMappingUsesTargetedDiscovery(t *testing.T) {
	discoveryClient := targetedDiscovery{
		resources: &metav1.APIResourceList{
			GroupVersion: "v1",
			APIResources: []metav1.APIResource{{
				Name: "configmaps", Kind: "ConfigMap", Namespaced: true,
			}},
		},
	}

	client := &ClusterClientSet{DiscoveryClient: discoveryClient}
	mapping, err := client.GetResourceMapping("v1", "ConfigMap")
	if err != nil {
		t.Fatalf("GetResourceMapping() error = %v", err)
	}
	if mapping.Resource != (schema.GroupVersionResource{Version: "v1", Resource: "configmaps"}) {
		t.Fatalf("unexpected resource mapping: %#v", mapping.Resource)
	}
	if mapping.Scope.Name() != meta.RESTScopeNameNamespace {
		t.Fatalf("unexpected resource scope: %s", mapping.Scope.Name())
	}
}

func TestGetResourceMappingReturnsContextualDiscoveryError(t *testing.T) {
	discoveryClient := targetedDiscovery{err: errors.New("unknown")}
	client := &ClusterClientSet{DiscoveryClient: discoveryClient}
	_, err := client.GetResourceMapping("apps/v1", "Deployment")
	if err == nil || !strings.Contains(err.Error(), `unable to discover apiVersion "apps/v1": unknown`) {
		t.Fatalf("unexpected error: %v", err)
	}
}

var _ discovery.DiscoveryInterface = targetedDiscovery{}

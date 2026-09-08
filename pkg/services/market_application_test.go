package services

import (
	"reflect"
	"strings"
	"testing"

	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	"gopkg.in/yaml.v3"
)

func TestMarketApplicationExportImportIsPortable(t *testing.T) {
	detail := dtos.MarketApplicationDetail{
		ID:          "database-id",
		State:       1,
		Name:        "demo",
		Description: "demo application",
		Logo:        "https://example.test/logo.svg",
		Home:        "https://example.test",
		Category:    "application",
		Tags:        dtos.ArrayString{"devops"},
		Templates:   dtos.ArrayString{"apiVersion: v1\nkind: ConfigMap\n"},
		Parameters:  dtos.ParameterDefinitions{{Name: "image", DisplayName: "Image"}},
	}

	exported := marketApplicationExportFromDetail(detail)
	if exported.ID != "" {
		t.Fatalf("exported ID = %q, want an empty portable ID", exported.ID)
	}
	imported := marketApplicationCreateFromImport(exported)
	if imported.ID != "" {
		t.Fatalf("imported ID = %q, want a new generated ID", imported.ID)
	}
	if imported.Name != detail.Name || imported.State != detail.State || !reflect.DeepEqual(imported.Templates, detail.Templates) || !reflect.DeepEqual(imported.Parameters, detail.Parameters) {
		t.Fatalf("imported definition does not preserve exported fields: %#v", imported)
	}
}

func TestMarketApplicationExportImportYAMLRoundTrip(t *testing.T) {
	defaultImage := "nginx:latest"
	detail := dtos.MarketApplicationDetail{
		ID:          "database-id",
		State:       1,
		Name:        "yaml-demo",
		Description: "YAML round trip",
		Category:    "application",
		Tags:        dtos.ArrayString{"devops"},
		Templates: dtos.ArrayString{
			"apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: {{ .image }}\n",
		},
		Parameters: dtos.ParameterDefinitions{
			{Name: "image", DisplayName: "Image", Description: "Container image", DefaultValue: &defaultImage},
		},
	}

	exported := marketApplicationExportFromDetail(detail)
	content, err := yaml.Marshal(exported)
	if err != nil {
		t.Fatalf("marshal exported application as YAML: %v", err)
	}
	if strings.Contains(string(content), "id:") {
		t.Fatalf("portable YAML contains a database ID:\n%s", content)
	}

	var decoded dtos.MarketApplicationExportImport
	if err = yaml.Unmarshal(content, &decoded); err != nil {
		t.Fatalf("unmarshal exported application YAML: %v", err)
	}
	if !reflect.DeepEqual(decoded, exported) {
		t.Fatalf("YAML round trip changed application definition:\ngot:  %#v\nwant: %#v", decoded, exported)
	}

	imported := marketApplicationCreateFromImport(decoded)
	if imported.ID != "" || !reflect.DeepEqual(imported.Templates, detail.Templates) || !reflect.DeepEqual(imported.Parameters, detail.Parameters) {
		t.Fatalf("YAML import is not portable: %#v", imported)
	}
}

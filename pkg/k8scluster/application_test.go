package k8scluster

import (
	"reflect"
	"strings"
	"testing"

	"github.com/efucloud/kube-keeper/pkg/models/dtos"
)

func TestRenderApplicationTemplate(t *testing.T) {
	content := "metadata:\n  name: app-_{{_ .name _}}_\n  namespace: _{{_ .namespace _}}_"
	result, err := renderApplicationTemplate(content, dtos.ApplicationRenderParams{"name": "demo", "namespace": "default"})
	if err != nil {
		t.Fatalf("renderApplicationTemplate() error = %v", err)
	}
	if !strings.Contains(result, "name: app-demo") || !strings.Contains(result, "namespace: default") {
		t.Fatalf("unexpected rendered template:\n%s", result)
	}
}

func TestRenderApplicationTemplateFunctions(t *testing.T) {
	content := "items:\n_{{_ toYaml .items | indent 2 _}}_"
	result, err := renderApplicationTemplate(content, dtos.ApplicationRenderParams{"items": []string{"one", "two"}})
	if err != nil {
		t.Fatalf("renderApplicationTemplate() error = %v", err)
	}
	if !strings.Contains(result, "  - one") || !strings.Contains(result, "  - two") {
		t.Fatalf("unexpected rendered template:\n%s", result)
	}
}

func TestPrepareApplicationParams(t *testing.T) {
	definitions := dtos.ParameterDefinitions{
		{Name: "images", Type: "stringArray", Required: true},
		{Name: "ports", Type: "numberArray", AllowableValues: []interface{}{80, map[string]interface{}{"name": "HTTPS", "value": 443}}},
		{Name: "config", Type: "object"},
	}
	params, err := prepareApplicationParams(definitions, dtos.ApplicationRenderParams{
		"images": "nginx:latest",
		"ports":  []interface{}{80.0, 443.0},
		"config": `{"enabled":true}`,
		"name":   "must-not-win",
	}, "demo", "default")
	if err != nil {
		t.Fatalf("prepareApplicationParams() error = %v", err)
	}
	if !reflect.DeepEqual(params["images"], []string{"nginx:latest"}) {
		t.Fatalf("unexpected images: %#v", params["images"])
	}
	if !reflect.DeepEqual(params["ports"], []float64{80, 443}) {
		t.Fatalf("unexpected ports: %#v", params["ports"])
	}
	if params["name"] != "demo" || params["namespace"] != "default" {
		t.Fatalf("reserved parameters were not injected: %#v", params)
	}
}

func TestPrepareApplicationParamsRejectsInvalidValues(t *testing.T) {
	definitions := dtos.ParameterDefinitions{{Name: "tier", Type: "string", Required: true, AllowableValues: []string{"web", "worker"}}}
	if _, err := prepareApplicationParams(definitions, dtos.ApplicationRenderParams{"tier": "database"}, "demo", "default"); err == nil {
		t.Fatal("prepareApplicationParams() expected an allowable-value error")
	}
	if _, err := prepareApplicationParams(definitions, nil, "demo", "default"); err == nil {
		t.Fatal("prepareApplicationParams() expected a required-value error")
	}
}

func TestRenderApplicationTemplateRejectsMissingParameter(t *testing.T) {
	_, err := renderApplicationTemplate("value: _{{_ .missing _}}_", dtos.ApplicationRenderParams{})
	if err == nil {
		t.Fatal("renderApplicationTemplate() expected a missing-key error")
	}
}

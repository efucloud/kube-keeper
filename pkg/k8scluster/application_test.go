package k8scluster

import (
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
	content := "value: |-\n_{{_ indent 2 .value _}}_"
	result, err := renderApplicationTemplate(content, dtos.ApplicationRenderParams{"value": "one\ntwo"})
	if err != nil {
		t.Fatalf("renderApplicationTemplate() error = %v", err)
	}
	if !strings.Contains(result, "  one\n  two") {
		t.Fatalf("unexpected rendered template:\n%s", result)
	}
}

func TestPrepareApplicationParams(t *testing.T) {
	definitions := dtos.ParameterDefinitions{
		{Name: "image", Required: true},
		{Name: "tier", AllowableValues: []interface{}{"web", map[string]interface{}{"name": "Worker", "value": "worker"}}},
	}
	params, err := prepareApplicationParams(definitions, dtos.ApplicationRenderParams{
		"image": "nginx:latest",
		"tier":  "worker",
		"name":  "must-not-win",
	}, "demo", "default")
	if err != nil {
		t.Fatalf("prepareApplicationParams() error = %v", err)
	}
	if params["image"] != "nginx:latest" || params["tier"] != "worker" {
		t.Fatalf("unexpected parameters: %#v", params)
	}
	if params["name"] != "demo" || params["namespace"] != "default" {
		t.Fatalf("reserved parameters were not injected: %#v", params)
	}
}

func TestPrepareApplicationParamsRejectsInvalidValues(t *testing.T) {
	definitions := dtos.ParameterDefinitions{{Name: "tier", Required: true, AllowableValues: []string{"web", "worker"}}}
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

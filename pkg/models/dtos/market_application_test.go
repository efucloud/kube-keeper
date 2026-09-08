package dtos

import (
	"context"
	"encoding/json"
	"strings"
	"testing"
)

func TestApplicationRenderParamsRejectsNonStringValue(t *testing.T) {
	var params ApplicationRenderParams
	if err := json.Unmarshal([]byte(`{"replicas":3}`), &params); err == nil {
		t.Fatal("ApplicationRenderParams expected a non-string value error")
	}
}

func TestParameterDefinitionJSONDoesNotContainRemovedFields(t *testing.T) {
	content, err := json.Marshal(ParameterDefinition{Name: "image"})
	if err != nil {
		t.Fatalf("json.Marshal() error = %v", err)
	}
	for _, field := range []string{`"type":`, `"required":`, `"allowableValues":`} {
		if strings.Contains(string(content), field) {
			t.Fatalf("unexpected parameter field %s: %s", field, content)
		}
	}
}

func validMarketApplicationCreate() MarketApplicationCreate {
	return MarketApplicationCreate{
		Name:      "demo",
		Category:  "application",
		Templates: ArrayString{"apiVersion: v1\nkind: ConfigMap\nmetadata:\n  name: demo"},
	}
}

func TestMarketApplicationValidateRejectsInvalidParameterDefinition(t *testing.T) {
	tests := []struct {
		name        string
		parameter   ParameterDefinition
		wantErrPart string
	}{
		{
			name:        "invalid name",
			parameter:   ParameterDefinition{Name: "bad name"},
			wantErrPart: "name",
		},
	}
	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			model := validMarketApplicationCreate()
			model.Parameters = ParameterDefinitions{test.parameter}
			err := model.Validate(context.Background())
			if err == nil || !strings.Contains(err.Error(), test.wantErrPart) {
				t.Fatalf("expected error containing %q, got %v", test.wantErrPart, err)
			}
		})
	}
}

func TestMarketApplicationValidateRejectsDuplicateParameterNames(t *testing.T) {
	model := validMarketApplicationCreate()
	model.Parameters = ParameterDefinitions{
		{Name: "image"},
		{Name: "image"},
	}
	if err := model.Validate(context.Background()); err == nil || !strings.Contains(err.Error(), "duplicated") {
		t.Fatalf("expected duplicate-name error, got %v", err)
	}
}

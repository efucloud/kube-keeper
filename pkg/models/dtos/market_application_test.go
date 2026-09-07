package dtos

import (
	"context"
	"strings"
	"testing"
)

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
			parameter:   ParameterDefinition{Name: "bad name", Type: "string"},
			wantErrPart: "name",
		},
		{
			name:        "invalid type",
			parameter:   ParameterDefinition{Name: "value", Type: "unsupported"},
			wantErrPart: "oneof",
		},
		{
			name:        "invalid allowable values",
			parameter:   ParameterDefinition{Name: "value", Type: "string", AllowableValues: "one"},
			wantErrPart: "allowableValues",
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
		{Name: "image", Type: "string"},
		{Name: "image", Type: "string"},
	}
	if err := model.Validate(context.Background()); err == nil || !strings.Contains(err.Error(), "duplicated") {
		t.Fatalf("expected duplicate-name error, got %v", err)
	}
}

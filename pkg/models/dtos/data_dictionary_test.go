package dtos

import "testing"

func TestDataDictionaryUpdateNormalize(t *testing.T) {
	model := DataDictionaryUpdate{
		Name: " Application category ",
		Lines: DictionaryLines{
			{Label: " Application ", Value: " application ", Index: 20},
			{Label: "Database", Value: "database"},
		},
	}
	if err := model.Normalize(); err != nil {
		t.Fatalf("Normalize() error = %v", err)
	}
	if model.Name != "Application category" || model.Lines[0].Index != 1 || model.Lines[1].Index != 2 {
		t.Fatalf("Normalize() did not normalize model: %#v", model)
	}
	if model.Lines[0].Label != "Application" || model.Lines[0].Value != "application" {
		t.Fatalf("Normalize() did not trim line: %#v", model.Lines[0])
	}
}

func TestDataDictionaryUpdateNormalizeRejectsDuplicateValues(t *testing.T) {
	model := DataDictionaryUpdate{
		Name: "Tags",
		Lines: DictionaryLines{
			{Label: "Official", Value: "official"},
			{Label: "Official duplicate", Value: "official"},
		},
	}
	if err := model.Normalize(); err == nil {
		t.Fatal("Normalize() expected duplicate value error")
	}
}

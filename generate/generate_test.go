package main

import (
	"encoding/json"
	"os"
	"path"
	"path/filepath"
	"strings"
	"testing"
)

func TestGeneratedServicesDir(t *testing.T) {
	repoRoot := filepath.Join("tmp", "kube-keeper")
	want := filepath.Join(repoRoot, "generates")
	if got := generatedServicesDir(repoRoot); got != want {
		t.Fatalf("generatedServicesDir() = %q, want %q", got, want)
	}
}

func TestCollectDTOFilesSorted(t *testing.T) {
	dtoDir := t.TempDir()
	for _, name := range []string{"b.go", "a.go", "ignore.txt"} {
		if err := os.WriteFile(path.Join(dtoDir, name), []byte("package dtos\n"), 0o644); err != nil {
			t.Fatalf("write %s: %v", name, err)
		}
	}

	files, err := collectDTOFiles(dtoDir)
	if err != nil {
		t.Fatalf("collectDTOFiles() error = %v", err)
	}
	if len(files) != 2 {
		t.Fatalf("collectDTOFiles() len = %d, want 2", len(files))
	}
	if path.Base(files[0]) != "a.go" || path.Base(files[1]) != "b.go" {
		t.Fatalf("collectDTOFiles() = %v, want sorted go files", files)
	}
}

func TestGenerateToDirSortsImportsFromFallbackEntries(t *testing.T) {
	root := t.TempDir()
	oldWD, err := os.Getwd()
	if err != nil {
		t.Fatalf("Getwd() error = %v", err)
	}
	if err = os.Chdir(root); err != nil {
		t.Fatalf("Chdir(%s) error = %v", root, err)
	}
	defer func() {
		_ = os.Chdir(oldWD)
	}()

	entriesDir := path.Join(root, "generates")
	if err = os.MkdirAll(entriesDir, os.ModePerm); err != nil {
		t.Fatalf("MkdirAll(%s) error = %v", entriesDir, err)
	}

	entrySource := map[string]string{
		"Zeta":  "./z.d",
		"Alpha": "./a.d",
		"Beta":  "./a.d",
	}
	data, err := json.Marshal(entrySource)
	if err != nil {
		t.Fatalf("Marshal() error = %v", err)
	}
	if err = os.WriteFile(path.Join(entriesDir, "entries.json"), data, 0o644); err != nil {
		t.Fatalf("WriteFile(entries.json) error = %v", err)
	}

	rest := NewRestAPI("SystemApiName")
	rest.files["sample"] = "export async function demo(options?: { [key: string]: any }) {\n  return request(`/demo`, {\n    method: 'GET',\n    headers: {\n      'Content-Type': 'application/json',\n    },\n    ...(options || {}),\n  });\n}\n"
	rest.entryArray["sample"] = []string{"Zeta", "Alpha", "Beta"}

	targetDir := path.Join(root, "out")
	rest.GenerateToDir(targetDir)

	content, err := os.ReadFile(path.Join(targetDir, "sample.api.ts"))
	if err != nil {
		t.Fatalf("ReadFile(sample.api.ts) error = %v", err)
	}

	text := string(content)
	firstImport := "import { Alpha, Beta } from './a.d';"
	secondImport := "import { Zeta } from './z.d';"
	if !strings.Contains(text, firstImport) || !strings.Contains(text, secondImport) {
		t.Fatalf("generated imports missing:\n%s", text)
	}
	if strings.Index(text, firstImport) > strings.Index(text, secondImport) {
		t.Fatalf("generated imports are not sorted:\n%s", text)
	}
}

func TestGenerateAPIOrdersParametersDeterministically(t *testing.T) {
	api := ApiData{
		Name:        "demo",
		Doc:         "doc",
		Notes:       "notes",
		Path:        "/api/v1/demo/{id}/{cluster}",
		Method:      "POST",
		ContentType: []string{"application/json"},
		Parameters: map[string]Parameters{
			"page": {
				Name:        "page",
				DataType:    "integer",
				Position:    "query",
				Description: "page",
			},
			"name": {
				Name:        "name",
				DataType:    "string",
				Position:    "query",
				Description: "name",
			},
			"file": {
				Name:        "file",
				DataType:    "string",
				Position:    "form",
				Description: "file",
			},
			"id": {
				Name:        "id",
				DataType:    "string",
				Position:    "path",
				Required:    true,
				Description: "id",
			},
			"cluster": {
				Name:        "cluster",
				DataType:    "string",
				Position:    "path",
				Required:    true,
				Description: "cluster",
			},
		},
	}

	content, _, _ := api.GenerateAPI()

	expectedOrder := []string{
		"    cluster: string;// cluster",
		"    id: string;// id",
		"    file: string;// file",
		"    name?: string;// name",
		"    page?: number;// page",
	}

	lastIndex := -1
	for _, item := range expectedOrder {
		index := strings.Index(content, item)
		if index == -1 {
			t.Fatalf("missing parameter line %q in generated content:\n%s", item, content)
		}
		if index < lastIndex {
			t.Fatalf("parameter order is not deterministic for %q:\n%s", item, content)
		}
		lastIndex = index
	}
}

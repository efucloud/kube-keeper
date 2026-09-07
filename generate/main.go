package main

import (
	"fmt"
	"github.com/efucloud/kube-keeper/pkg/apis"
	"github.com/efucloud/kube-keeper/pkg/config"
	"github.com/emicklei/go-restful/v3"
	"os"
	"path/filepath"
	"runtime"
)

func main() {
	repoRoot, err := resolveProjectRoot()
	if err != nil {
		fmt.Fprintf(os.Stderr, "resolve project root failed: %v\n", err)
		os.Exit(1)
	}

	targetPath := generatedServicesDir(repoRoot)
	if err = clearDir(targetPath); err != nil {
		fmt.Fprintf(os.Stderr, "clear services dir failed: %v\n", err)
		os.Exit(1)
	}

	if err = generateTypescriptDefine(repoRoot, targetPath); err != nil {
		fmt.Fprintf(os.Stderr, "generate typescript definitions failed: %v\n", err)
		os.Exit(1)
	}

	gen := NewRestAPI(config.FrontApiTag)
	ws := apis.GetWebServices(restful.DefaultContainer)
	for _, route := range ws.Routes() {
		gen.AddRoute(route)
	}
	gen.GenerateToDir(targetPath)
	_ = os.Remove(filepath.Join(targetPath, "entries.json"))
}

func generatedServicesDir(repoRoot string) string {
	return filepath.Join(repoRoot, "generates")
}

func resolveProjectRoot() (string, error) {
	_, currentFile, _, ok := runtime.Caller(0)
	if !ok {
		return "", fmt.Errorf("runtime.Caller failed")
	}
	return filepath.Clean(filepath.Join(filepath.Dir(currentFile), "..")), nil
}

func clearDir(dir string) error {
	if err := os.MkdirAll(dir, os.ModePerm); err != nil {
		return err
	}

	entries, err := os.ReadDir(dir)
	if err != nil {
		return err
	}

	for _, entry := range entries {
		if err = os.RemoveAll(filepath.Join(dir, entry.Name())); err != nil {
			return err
		}
	}
	return nil
}

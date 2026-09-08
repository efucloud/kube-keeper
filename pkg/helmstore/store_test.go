package helmstore

import (
	"archive/tar"
	"bytes"
	"compress/gzip"
	"context"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/efucloud/kube-keeper/pkg/config"
)

const validIndex = `apiVersion: v1
entries:
  demo:
    - apiVersion: v2
      name: demo
      version: 1.2.3
      appVersion: "2.0"
      description: Demo chart
      keywords:
        - observability
        - monitoring
      urls:
        - demo-1.2.3.tgz
generated: "2026-09-08T00:00:00Z"
`

func TestSyncRetainsExistingIndexWhenNewIndexIsInvalid(t *testing.T) {
	content := validIndex
	server := httptest.NewServer(http.HandlerFunc(func(response http.ResponseWriter, _ *http.Request) {
		_, _ = response.Write([]byte(content))
	}))
	defer server.Close()
	repositories := []RepositoryConfig{{ID: "repo-1", Name: "demo", URL: server.URL, Enabled: true}}
	store := New(&config.HelmStoreConfig{CacheDir: t.TempDir(), SyncTimeout: 5}, StaticSource(repositories))
	if err := store.Sync(context.Background(), "repo-1"); err != nil {
		t.Fatalf("first Sync() error = %v", err)
	}
	path := store.indexPath(repositories[0])
	before, err := os.ReadFile(path)
	if err != nil {
		t.Fatalf("ReadFile() error = %v", err)
	}
	content = "not: [valid"
	if err = store.Sync(context.Background(), "repo-1"); err == nil {
		t.Fatal("second Sync() expected parse error")
	}
	after, err := os.ReadFile(path)
	if err != nil {
		t.Fatalf("ReadFile() after failed sync error = %v", err)
	}
	if string(after) != string(before) {
		t.Fatal("cached index changed after failed sync")
	}
}

func TestListAndGetChartsFromCache(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(response http.ResponseWriter, _ *http.Request) {
		_, _ = response.Write([]byte(validIndex))
	}))
	defer server.Close()
	repositories := []RepositoryConfig{{ID: "repo-1", Name: "demo", URL: server.URL, Enabled: true}}
	store := New(&config.HelmStoreConfig{CacheDir: t.TempDir(), SyncTimeout: 5}, StaticSource(repositories))
	if err := store.Sync(context.Background(), "repo-1"); err != nil {
		t.Fatalf("Sync() error = %v", err)
	}
	list, err := store.ListCharts(context.Background(), "repo-1", "demo", 1, 10)
	if err != nil || list.Total != 1 || len(list.Data) != 1 || list.Data[0].Version != "1.2.3" {
		t.Fatalf("ListCharts() = %#v, %v", list, err)
	}
	keywordList, err := store.ListCharts(context.Background(), "repo-1", "observability", 1, 10)
	if err != nil || keywordList.Total != 1 {
		t.Fatalf("ListCharts() keyword filter = %#v, %v", keywordList, err)
	}
	if got := list.Data[0].URLs[0]; got != server.URL+"/demo-1.2.3.tgz" {
		t.Fatalf("ListCharts() resolved URL = %q", got)
	}
	detail, err := store.GetChart(context.Background(), "repo-1", "demo")
	if err != nil || len(detail.Versions) != 1 {
		t.Fatalf("GetChart() = %#v, %v", detail, err)
	}
}

func TestLoadChartFromCachedRepositoryIndex(t *testing.T) {
	archive := chartArchive(t)
	server := httptest.NewServer(http.HandlerFunc(func(response http.ResponseWriter, request *http.Request) {
		switch request.URL.Path {
		case "/index.yaml":
			_, _ = response.Write([]byte(validIndex))
		case "/demo-1.2.3.tgz":
			_, _ = response.Write(archive)
		default:
			http.NotFound(response, request)
		}
	}))
	defer server.Close()
	repositories := []RepositoryConfig{{ID: "repo-1", Name: "demo", URL: server.URL, Enabled: true}}
	store := New(&config.HelmStoreConfig{CacheDir: t.TempDir(), SyncTimeout: 5}, StaticSource(repositories))
	if err := store.Sync(context.Background(), "repo-1"); err != nil {
		t.Fatalf("Sync() error = %v", err)
	}
	chart, err := store.LoadChart(context.Background(), "repo-1", "demo", "1.2.3")
	if err != nil {
		t.Fatalf("LoadChart() error = %v", err)
	}
	if chart.Metadata.Name != "demo" || chart.Metadata.Version != "1.2.3" {
		t.Fatalf("LoadChart() metadata = %#v", chart.Metadata)
	}
	values, err := store.GetChartValues(context.Background(), "repo-1", "demo", "1.2.3")
	if err != nil {
		t.Fatalf("GetChartValues() error = %v", err)
	}
	if values != testChartValues {
		t.Fatalf("GetChartValues() = %q, want %q", values, testChartValues)
	}
}

const testChartValues = `# Keep this comment for users.
replicaCount: 1
image:
  repository: example/demo
  tag: latest
`

func chartArchive(t *testing.T) []byte {
	t.Helper()
	var result bytes.Buffer
	gzipWriter := gzip.NewWriter(&result)
	tarWriter := tar.NewWriter(gzipWriter)
	files := map[string]string{
		"demo/Chart.yaml":                    "apiVersion: v2\nname: demo\nversion: 1.2.3\nappVersion: \"2.0\"\n",
		"demo/values.yaml":                   testChartValues,
		"demo/charts/dependency/Chart.yaml":  "apiVersion: v2\nname: dependency\nversion: 1.0.0\n",
		"demo/charts/dependency/values.yaml": "nestedValue: must-not-be-returned\n",
	}
	for name, content := range files {
		if err := tarWriter.WriteHeader(&tar.Header{Name: name, Mode: 0o600, Size: int64(len(content))}); err != nil {
			t.Fatalf("WriteHeader() error = %v", err)
		}
		if _, err := tarWriter.Write([]byte(content)); err != nil {
			t.Fatalf("Write() error = %v", err)
		}
	}
	if err := tarWriter.Close(); err != nil {
		t.Fatalf("tar Close() error = %v", err)
	}
	if err := gzipWriter.Close(); err != nil {
		t.Fatalf("gzip Close() error = %v", err)
	}
	return result.Bytes()
}

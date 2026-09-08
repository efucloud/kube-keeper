package helmstore

import (
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

package helmstore

import (
	"bytes"
	"context"
	"crypto/sha256"
	"crypto/tls"
	"encoding/hex"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"os"
	"path/filepath"
	"sort"
	"strings"
	"sync"
	"time"

	"github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/models"
	"github.com/efucloud/kube-keeper/pkg/models/daos"
	helmchart "helm.sh/helm/v3/pkg/chart"
	"helm.sh/helm/v3/pkg/chart/loader"
	helmrepo "helm.sh/helm/v3/pkg/repo"
)

const (
	maxIndexSize = 64 << 20
	maxChartSize = 128 << 20
)

type RepositoryConfig struct {
	ID                    string
	Name                  string
	URL                   string
	Username              string
	Password              string
	InsecureSkipTLSVerify bool
	Enabled               bool
}

type Repository struct {
	ID        string     `json:"id"`
	Name      string     `json:"name"`
	URL       string     `json:"url"`
	Available bool       `json:"available"`
	CachedAt  *time.Time `json:"cachedAt,omitempty"`
}

type ChartVersion struct {
	RepositoryID string    `json:"repositoryId"`
	Repository   string    `json:"repository"`
	Name         string    `json:"name"`
	Version      string    `json:"version"`
	AppVersion   string    `json:"appVersion,omitempty"`
	Description  string    `json:"description,omitempty"`
	Home         string    `json:"home,omitempty"`
	Icon         string    `json:"icon,omitempty"`
	Deprecated   bool      `json:"deprecated,omitempty"`
	Created      time.Time `json:"created,omitempty"`
	Digest       string    `json:"digest,omitempty"`
	URLs         []string  `json:"urls,omitempty"`
	Keywords     []string  `json:"keywords,omitempty"`
	Sources      []string  `json:"sources,omitempty"`
}

type ChartList struct {
	Data  []ChartVersion `json:"data"`
	Total int            `json:"total"`
}

type ChartDetail struct {
	RepositoryID string         `json:"repositoryId"`
	Repository   string         `json:"repository"`
	Name         string         `json:"name"`
	Versions     []ChartVersion `json:"versions"`
}

type RepositorySource func(context.Context, bool) ([]RepositoryConfig, error)

type Store struct {
	config *config.HelmStoreConfig
	source RepositorySource
	mu     sync.Mutex
}

var (
	defaultOnce  sync.Once
	defaultStore *Store
)

func Default() *Store {
	defaultOnce.Do(func() { defaultStore = New(&config.ApplicationConfig.HelmStore, databaseRepositorySource) })
	return defaultStore
}

func New(cfg *config.HelmStoreConfig, source RepositorySource) *Store {
	if cfg == nil {
		cfg = &config.HelmStoreConfig{}
	}
	if cfg.CacheDir == "" {
		cfg.CacheDir = "./data/helm"
	}
	if cfg.SyncTimeout <= 0 {
		cfg.SyncTimeout = 60
	}
	return &Store{config: cfg, source: source}
}

func StaticSource(repositories []RepositoryConfig) RepositorySource {
	return func(_ context.Context, enabledOnly bool) ([]RepositoryConfig, error) {
		result := make([]RepositoryConfig, 0, len(repositories))
		for _, repository := range repositories {
			if !enabledOnly || repository.Enabled {
				result = append(result, repository)
			}
		}
		return result, nil
	}
}

func databaseRepositorySource(ctx context.Context, enabledOnly bool) ([]RepositoryConfig, error) {
	query := config.DBConnect.WithContext(ctx).Table(models.HelmRepositoryTableName).Where("deleted_at IS NULL")
	if enabledOnly {
		query = query.Where("enabled = ?", true)
	}
	var records []daos.HelmRepository
	if err := query.Order("name ASC").Find(&records).Error; err != nil {
		return nil, err
	}
	result := make([]RepositoryConfig, 0, len(records))
	for _, record := range records {
		result = append(result, RepositoryConfig{ID: record.ID, Name: record.Name, URL: record.URL, Username: record.Username, Password: record.Password, InsecureSkipTLSVerify: record.InsecureSkipTLSVerify, Enabled: record.Enabled})
	}
	return result, nil
}

func (s *Store) Repositories(ctx context.Context) ([]Repository, error) {
	repositories, err := s.source(ctx, true)
	if err != nil {
		return nil, err
	}
	result := make([]Repository, 0, len(repositories))
	for _, item := range repositories {
		repository := Repository{ID: item.ID, Name: item.Name, URL: item.URL}
		if info, statErr := os.Stat(s.indexPath(item)); statErr == nil && !info.IsDir() {
			cachedAt := info.ModTime()
			repository.Available = true
			repository.CachedAt = &cachedAt
		}
		result = append(result, repository)
	}
	return result, nil
}

func (s *Store) HasCache(repositoryID string) bool {
	_, err := os.Stat(filepath.Join(s.config.CacheDir, repositoryID, "index.yaml"))
	return err == nil
}

func (s *Store) SyncAll(ctx context.Context) []error {
	repositories, err := s.source(ctx, true)
	if err != nil {
		return []error{err}
	}
	errors := make([]error, 0)
	for _, repository := range repositories {
		if syncErr := s.sync(ctx, repository); syncErr != nil {
			errors = append(errors, syncErr)
		}
	}
	return errors
}

func (s *Store) Sync(ctx context.Context, id string) error {
	repository, err := s.repository(ctx, id, false)
	if err != nil {
		return err
	}
	return s.sync(ctx, repository)
}

func (s *Store) sync(ctx context.Context, repository RepositoryConfig) (resultErr error) {
	s.mu.Lock()
	defer s.mu.Unlock()
	defer func() { s.recordSyncResult(ctx, repository.ID, resultErr) }()

	indexURL, err := repositoryIndexURL(repository.URL)
	if err != nil {
		return fmt.Errorf("helm repository %q: %w", repository.Name, err)
	}
	syncCtx, cancel := context.WithTimeout(ctx, time.Duration(s.config.SyncTimeout)*time.Second)
	defer cancel()
	request, err := http.NewRequestWithContext(syncCtx, http.MethodGet, indexURL, nil)
	if err != nil {
		return fmt.Errorf("helm repository %q: %w", repository.Name, err)
	}
	if repository.Username != "" || repository.Password != "" {
		request.SetBasicAuth(repository.Username, repository.Password)
	}
	response, err := repositoryHTTPClient(repository).Do(request)
	if err != nil {
		return fmt.Errorf("sync helm repository %q: %w", repository.Name, err)
	}
	defer response.Body.Close()
	if response.StatusCode < 200 || response.StatusCode >= 300 {
		return fmt.Errorf("sync helm repository %q: unexpected HTTP status %s", repository.Name, response.Status)
	}

	destination := s.indexPath(repository)
	directory := filepath.Dir(destination)
	if err = os.MkdirAll(directory, 0o750); err != nil {
		return fmt.Errorf("create helm repository cache %q: %w", repository.Name, err)
	}
	temporary, err := os.CreateTemp(directory, "index-*.yaml")
	if err != nil {
		return fmt.Errorf("create helm repository temporary index %q: %w", repository.Name, err)
	}
	temporaryPath := temporary.Name()
	defer os.Remove(temporaryPath)
	written, copyErr := io.Copy(temporary, io.LimitReader(response.Body, maxIndexSize+1))
	closeErr := temporary.Close()
	if copyErr != nil {
		return fmt.Errorf("download helm repository %q: %w", repository.Name, copyErr)
	}
	if closeErr != nil {
		return fmt.Errorf("close helm repository index %q: %w", repository.Name, closeErr)
	}
	if written > maxIndexSize {
		return fmt.Errorf("helm repository %q index exceeds %d bytes", repository.Name, maxIndexSize)
	}
	if _, err = helmrepo.LoadIndexFile(temporaryPath); err != nil {
		return fmt.Errorf("parse helm repository %q index: %w", repository.Name, err)
	}
	if err = os.Chmod(temporaryPath, 0o640); err != nil {
		return fmt.Errorf("set helm repository index permissions %q: %w", repository.Name, err)
	}
	if err = os.Rename(temporaryPath, destination); err != nil {
		return fmt.Errorf("replace helm repository %q index: %w", repository.Name, err)
	}
	return nil
}

func (s *Store) ListCharts(ctx context.Context, repositoryID, search string, current, pageSize int) (ChartList, error) {
	if current < 1 {
		current = 1
	}
	if pageSize < 1 {
		pageSize = 20
	}
	if pageSize > 200 {
		pageSize = 200
	}
	repositories, err := s.source(ctx, true)
	if err != nil {
		return ChartList{}, err
	}
	search = strings.ToLower(strings.TrimSpace(search))
	charts := make([]ChartVersion, 0)
	for _, repository := range repositories {
		if repositoryID != "" && repository.ID != repositoryID {
			continue
		}
		index, loadErr := helmrepo.LoadIndexFile(s.indexPath(repository))
		if loadErr != nil {
			if os.IsNotExist(loadErr) {
				continue
			}
			return ChartList{}, fmt.Errorf("load helm repository %q cache: %w", repository.Name, loadErr)
		}
		index.SortEntries()
		for name, versions := range index.Entries {
			if len(versions) == 0 {
				continue
			}
			latest := toChartVersion(repository, name, versions[0])
			if search != "" && !strings.Contains(strings.ToLower(latest.Name+" "+latest.Description+" "+strings.Join(latest.Keywords, " ")), search) {
				continue
			}
			charts = append(charts, latest)
		}
	}
	sort.Slice(charts, func(i, j int) bool {
		if charts[i].Name == charts[j].Name {
			return charts[i].Repository < charts[j].Repository
		}
		return charts[i].Name < charts[j].Name
	})
	result := ChartList{Total: len(charts), Data: []ChartVersion{}}
	start := (current - 1) * pageSize
	if start >= len(charts) {
		return result, nil
	}
	end := start + pageSize
	if end > len(charts) {
		end = len(charts)
	}
	result.Data = charts[start:end]
	return result, nil
}

func (s *Store) GetChart(ctx context.Context, repositoryID, chartName string) (ChartDetail, error) {
	repository, err := s.repository(ctx, repositoryID, true)
	if err != nil {
		return ChartDetail{}, err
	}
	index, err := helmrepo.LoadIndexFile(s.indexPath(repository))
	if err != nil {
		return ChartDetail{}, fmt.Errorf("load helm repository %q cache: %w", repository.Name, err)
	}
	index.SortEntries()
	versions, ok := index.Entries[chartName]
	if !ok || len(versions) == 0 {
		return ChartDetail{}, fmt.Errorf("helm chart %q does not exist in repository %q", chartName, repository.Name)
	}
	detail := ChartDetail{RepositoryID: repository.ID, Repository: repository.Name, Name: chartName, Versions: make([]ChartVersion, 0, len(versions))}
	for _, version := range versions {
		detail.Versions = append(detail.Versions, toChartVersion(repository, chartName, version))
	}
	return detail, nil
}

func (s *Store) LoadChart(ctx context.Context, repositoryID, chartName, chartVersion string) (*helmchart.Chart, error) {
	repository, err := s.repository(ctx, repositoryID, true)
	if err != nil {
		return nil, err
	}
	index, err := helmrepo.LoadIndexFile(s.indexPath(repository))
	if err != nil {
		return nil, fmt.Errorf("load helm repository %q cache: %w", repository.Name, err)
	}
	versions, exists := index.Entries[chartName]
	if !exists {
		return nil, fmt.Errorf("helm chart %q does not exist in repository %q", chartName, repository.Name)
	}
	var selected *helmrepo.ChartVersion
	for _, candidate := range versions {
		if candidate.Version == chartVersion {
			selected = candidate
			break
		}
	}
	if selected == nil || len(selected.URLs) == 0 {
		return nil, fmt.Errorf("helm chart %q version %q does not exist in repository %q", chartName, chartVersion, repository.Name)
	}
	chartURL, err := helmrepo.ResolveReferenceURL(repository.URL, selected.URLs[0])
	if err != nil {
		return nil, fmt.Errorf("resolve helm chart package URL: %w", err)
	}
	downloadCtx, cancel := context.WithTimeout(ctx, time.Duration(s.config.SyncTimeout)*time.Second)
	defer cancel()
	request, err := http.NewRequestWithContext(downloadCtx, http.MethodGet, chartURL, nil)
	if err != nil {
		return nil, fmt.Errorf("create helm chart package request: %w", err)
	}
	if repository.Username != "" || repository.Password != "" {
		request.SetBasicAuth(repository.Username, repository.Password)
	}
	response, err := repositoryHTTPClient(repository).Do(request)
	if err != nil {
		return nil, fmt.Errorf("download helm chart %q version %q: %w", chartName, chartVersion, err)
	}
	defer response.Body.Close()
	if response.StatusCode < http.StatusOK || response.StatusCode >= http.StatusMultipleChoices {
		return nil, fmt.Errorf("download helm chart %q version %q: unexpected HTTP status %s", chartName, chartVersion, response.Status)
	}
	archive, err := io.ReadAll(io.LimitReader(response.Body, maxChartSize+1))
	if err != nil {
		return nil, fmt.Errorf("read helm chart %q version %q: %w", chartName, chartVersion, err)
	}
	if len(archive) > maxChartSize {
		return nil, fmt.Errorf("helm chart %q version %q exceeds %d bytes", chartName, chartVersion, maxChartSize)
	}
	if selected.Digest != "" {
		digest := sha256.Sum256(archive)
		actual := hex.EncodeToString(digest[:])
		expected := strings.TrimPrefix(strings.ToLower(selected.Digest), "sha256:")
		if actual != expected {
			return nil, fmt.Errorf("helm chart %q version %q digest mismatch", chartName, chartVersion)
		}
	}
	loaded, err := loader.LoadArchive(bytes.NewReader(archive))
	if err != nil {
		return nil, fmt.Errorf("load helm chart %q version %q: %w", chartName, chartVersion, err)
	}
	if loaded.Metadata == nil || loaded.Metadata.Name != chartName || loaded.Metadata.Version != chartVersion {
		return nil, fmt.Errorf("helm chart package metadata does not match %q version %q", chartName, chartVersion)
	}
	return loaded, nil
}

// GetChartValues returns the root chart's original values.yaml. Reading the
// raw file preserves comments, ordering and formatting for the editor.
func (s *Store) GetChartValues(ctx context.Context, repositoryID, chartName, chartVersion string) (string, error) {
	loaded, err := s.LoadChart(ctx, repositoryID, chartName, chartVersion)
	if err != nil {
		return "", err
	}
	for _, file := range loaded.Raw {
		if file.Name == "values.yaml" {
			return string(file.Data), nil
		}
	}
	return "", fmt.Errorf("helm chart %q version %q does not contain values.yaml", chartName, chartVersion)
}

func (s *Store) repository(ctx context.Context, id string, enabledOnly bool) (RepositoryConfig, error) {
	repositories, err := s.source(ctx, enabledOnly)
	if err != nil {
		return RepositoryConfig{}, err
	}
	for _, repository := range repositories {
		if repository.ID == id {
			return repository, nil
		}
	}
	return RepositoryConfig{}, fmt.Errorf("helm repository %q does not exist", id)
}

func (s *Store) indexPath(repository RepositoryConfig) string {
	return filepath.Join(s.config.CacheDir, repository.ID, "index.yaml")
}

func (s *Store) recordSyncResult(ctx context.Context, id string, syncErr error) {
	if config.DBConnect == nil {
		return
	}
	ctx = context.WithoutCancel(ctx)
	updates := map[string]interface{}{"last_sync_error": ""}
	if syncErr == nil {
		updates["last_synced_at"] = time.Now()
	} else {
		updates["last_sync_error"] = syncErr.Error()
	}
	_ = config.DBConnect.WithContext(ctx).Table(models.HelmRepositoryTableName).Where("id = ? AND deleted_at IS NULL", id).Updates(updates).Error
}

func repositoryIndexURL(repositoryURL string) (string, error) {
	parsed, err := url.Parse(strings.TrimSpace(repositoryURL))
	if err != nil || parsed.Host == "" || (parsed.Scheme != "http" && parsed.Scheme != "https") {
		return "", fmt.Errorf("invalid HTTP(S) repository URL")
	}
	parsed.Path = strings.TrimRight(parsed.Path, "/") + "/index.yaml"
	parsed.RawQuery = ""
	parsed.Fragment = ""
	return parsed.String(), nil
}

func repositoryHTTPClient(repository RepositoryConfig) *http.Client {
	transport := http.DefaultTransport.(*http.Transport).Clone()
	if repository.InsecureSkipTLSVerify {
		transport.TLSClientConfig = &tls.Config{InsecureSkipVerify: true} //nolint:gosec
	}
	return &http.Client{Transport: transport}
}

func toChartVersion(repository RepositoryConfig, chartName string, version *helmrepo.ChartVersion) ChartVersion {
	urls := make([]string, 0, len(version.URLs))
	for _, reference := range version.URLs {
		resolved, err := helmrepo.ResolveReferenceURL(repository.URL, reference)
		if err == nil {
			urls = append(urls, resolved)
		} else {
			urls = append(urls, reference)
		}
	}
	result := ChartVersion{RepositoryID: repository.ID, Repository: repository.Name, Name: chartName, Version: version.Version, URLs: urls, Digest: version.Digest, Created: version.Created}
	if version.Metadata != nil {
		result.AppVersion = version.Metadata.AppVersion
		result.Description = version.Metadata.Description
		result.Home = version.Metadata.Home
		result.Icon = version.Metadata.Icon
		result.Deprecated = version.Metadata.Deprecated
		result.Keywords = version.Metadata.Keywords
		result.Sources = version.Metadata.Sources
	}
	return result
}

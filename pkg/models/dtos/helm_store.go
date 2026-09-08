package dtos

import (
	"fmt"
	"strings"

	"k8s.io/apimachinery/pkg/util/validation"
)

type HelmStoreInstallRequest struct {
	RepositoryID string `json:"repositoryId" description:"Helm仓库ID"`
	Chart        string `json:"chart" description:"Chart名称"`
	Version      string `json:"version" description:"Chart版本"`
	ReleaseName  string `json:"releaseName" description:"Release名称"`
	Values       string `json:"values" description:"覆盖values.yaml的YAML内容"`
}

type HelmStoreValues struct {
	Content string `json:"content"`
}

func (request *HelmStoreInstallRequest) Validate() error {
	request.RepositoryID = strings.TrimSpace(request.RepositoryID)
	request.Chart = strings.TrimSpace(request.Chart)
	request.Version = strings.TrimSpace(request.Version)
	request.ReleaseName = strings.TrimSpace(request.ReleaseName)
	if request.RepositoryID == "" || request.Chart == "" || request.Version == "" {
		return fmt.Errorf("repositoryId, chart and version are required")
	}
	if problems := validation.IsDNS1123Label(request.ReleaseName); len(problems) > 0 {
		return fmt.Errorf("releaseName is invalid: %s", problems[0])
	}
	return nil
}

type HelmStoreInstallResult struct {
	Name         string `json:"name"`
	Namespace    string `json:"namespace"`
	Revision     int    `json:"revision"`
	Status       string `json:"status"`
	Chart        string `json:"chart"`
	ChartVersion string `json:"chartVersion"`
	AppVersion   string `json:"appVersion,omitempty"`
}

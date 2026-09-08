package dtos

import (
	"context"
	"fmt"
	"net/url"
	"strings"
	"time"

	"github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/utils"
)

type HelmRepositoryDetail struct {
	ID                    string     `json:"id"`
	CreatedAt             time.Time  `json:"createdAt"`
	UpdatedAt             time.Time  `json:"updatedAt"`
	Name                  string     `json:"name"`
	URL                   string     `json:"url"`
	Username              string     `json:"username,omitempty"`
	InsecureSkipTLSVerify bool       `json:"insecureSkipTLSVerify"`
	Enabled               bool       `json:"enabled"`
	LastSyncedAt          *time.Time `json:"lastSyncedAt,omitempty"`
	LastSyncError         string     `json:"lastSyncError,omitempty"`
	Cached                bool       `gorm:"-" json:"cached"`
}

type HelmRepositoryDetailList struct {
	Data  []HelmRepositoryDetail `json:"data"`
	Total int64                  `json:"total"`
}

type HelmRepositoryCreate struct {
	ID                    string    `gorm:"column:id" json:"-"`
	CreatedAt             time.Time `gorm:"column:created_at" json:"-"`
	CreatorID             string    `gorm:"column:creator_id" json:"-"`
	Name                  string    `gorm:"column:name" json:"name"`
	URL                   string    `gorm:"column:url" json:"url"`
	Username              string    `gorm:"column:username" json:"username"`
	Password              string    `gorm:"column:password" json:"password"`
	InsecureSkipTLSVerify bool      `gorm:"column:insecure_skip_tls_verify" json:"insecureSkipTLSVerify"`
	Enabled               bool      `gorm:"column:enabled" json:"enabled"`
}

func (model *HelmRepositoryCreate) Default(ctx context.Context) {
	model.ID = utils.GenerateDatabaseId()
	model.CreatedAt = time.Now()
	model.CreatorID = config.GetOperatorFromCtx(ctx)
}
func (model HelmRepositoryCreate) Validate() error {
	return validateHelmRepository(model.Name, model.URL)
}

type HelmRepositoryUpdate struct {
	ID                    string    `gorm:"column:id" json:"id"`
	UpdatedAt             time.Time `gorm:"column:updated_at" json:"-"`
	UpdaterID             string    `gorm:"column:updater_id" json:"-"`
	Name                  string    `gorm:"column:name" json:"name"`
	URL                   string    `gorm:"column:url" json:"url"`
	Username              string    `gorm:"column:username" json:"username"`
	Password              string    `gorm:"column:password" json:"password,omitempty"`
	InsecureSkipTLSVerify bool      `gorm:"column:insecure_skip_tls_verify" json:"insecureSkipTLSVerify"`
	Enabled               bool      `gorm:"column:enabled" json:"enabled"`
}

func (model *HelmRepositoryUpdate) Default(ctx context.Context) {
	model.UpdatedAt = time.Now()
	model.UpdaterID = config.GetOperatorFromCtx(ctx)
}
func (model HelmRepositoryUpdate) Validate() error {
	if model.ID == "" {
		return fmt.Errorf("helm repository id is required")
	}
	return validateHelmRepository(model.Name, model.URL)
}

func validateHelmRepository(name, address string) error {
	if strings.TrimSpace(name) == "" {
		return fmt.Errorf("helm repository name is required")
	}
	parsed, err := url.Parse(strings.TrimSpace(address))
	if err != nil || parsed.Host == "" || (parsed.Scheme != "http" && parsed.Scheme != "https") {
		return fmt.Errorf("helm repository URL must be HTTP or HTTPS")
	}
	return nil
}

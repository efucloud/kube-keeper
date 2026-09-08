package daos

import (
	"time"

	"github.com/efucloud/kube-keeper/pkg/models"
	"gorm.io/gorm"
)

type HelmRepository struct {
	ID                    string         `gorm:"type:varchar(50);primarykey;column:id"`
	CreatedAt             time.Time      `gorm:"autoCreateTime;column:created_at;<-:create"`
	UpdatedAt             time.Time      `gorm:"autoUpdateTime;column:updated_at;<-:update"`
	DeletedAt             gorm.DeletedAt `gorm:"column:deleted_at"`
	CreatorID             string         `gorm:"type:varchar(50);column:creator_id;<-:create"`
	UpdaterID             string         `gorm:"type:varchar(50);column:updater_id;<-:update"`
	Name                  string         `gorm:"type:varchar(100);column:name"`
	URL                   string         `gorm:"type:varchar(1000);column:url"`
	Username              string         `gorm:"type:varchar(255);column:username"`
	Password              string         `gorm:"type:varchar(1000);column:password"`
	InsecureSkipTLSVerify bool           `gorm:"column:insecure_skip_tls_verify;default:false"`
	Enabled               bool           `gorm:"column:enabled;default:true"`
	LastSyncedAt          *time.Time     `gorm:"column:last_synced_at"`
	LastSyncError         string         `gorm:"type:text;column:last_sync_error"`
}

func (HelmRepository) TableName() string { return models.HelmRepositoryTableName }
func (HelmRepository) Indexes() map[string][]string {
	return map[string][]string{"idx_helm_repository_enabled": {"enabled"}}
}
func (HelmRepository) UniqueIndexes() map[string][]string {
	return map[string][]string{"uniq_helm_repository_name": {"name"}}
}

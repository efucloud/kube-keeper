package daos

import (
	"time"

	"github.com/efucloud/kube-keeper/pkg/models"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
)

// DataDictionary stores a backend-initialized dictionary. Its code is stable;
// administrators manage the display information and lines through the API.
type DataDictionary struct {
	ID          string               `gorm:"type:varchar(50);primarykey;column:id" json:"-"`
	CreatedAt   time.Time            `gorm:"autoCreateTime;column:created_at;<-:create" json:"-"`
	UpdatedAt   time.Time            `gorm:"autoUpdateTime;column:updated_at;<-:update" json:"updatedAt,omitempty"`
	CreatorId   string               `gorm:"type:varchar(50);column:creator_id;<-:create" json:"creatorId"`
	UpdaterId   string               `gorm:"type:varchar(50);column:updater_id;<-:update" json:"updaterId"`
	Code        string               `gorm:"type:varchar(100);column:code" json:"code"`
	Name        string               `gorm:"type:varchar(255);column:name" json:"name"`
	Description string               `gorm:"type:text;column:description" json:"description"`
	Lines       dtos.DictionaryLines `gorm:"column:lines" json:"lines"`
}

func (t *DataDictionary) Indexes() map[string][]string { return map[string][]string{} }

func (t *DataDictionary) UniqueIndexes() map[string][]string {
	return map[string][]string{"uniq_data_dictionary_code": {"code"}}
}

func (t *DataDictionary) TableName() string { return models.DataDictionaryTableName }

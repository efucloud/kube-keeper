package dtos

import (
	"database/sql/driver"
	"encoding/json"
	"errors"
	"fmt"
	"strings"
	"time"

	"gorm.io/gorm"
	"gorm.io/gorm/schema"
)

const (
	ApplicationCategoryDictionaryCode = "market_application_category"
	ApplicationTagDictionaryCode      = "market_application_tag"
)

type DictionaryLine struct {
	Label string `json:"label" validate:"required,max=100"`
	Value string `json:"value" validate:"required,max=100"`
	Index int    `json:"index"`
}

type DictionaryLines []DictionaryLine

func (DictionaryLines) GormDataType() string { return "jsonmap" }

func (DictionaryLines) GormDBDataType(db *gorm.DB, _ *schema.Field) string {
	switch db.Dialector.Name() {
	case "sqlite":
		return "JSON"
	case "mysql":
		return "json"
	case "postgres":
		return "JSONB"
	case "sqlserver":
		return "NVARCHAR(MAX)"
	default:
		return ""
	}
}

func (lines *DictionaryLines) Scan(value interface{}) error {
	if value == nil {
		*lines = DictionaryLines{}
		return nil
	}
	var data []byte
	switch typed := value.(type) {
	case []byte:
		data = typed
	case string:
		data = []byte(typed)
	default:
		return fmt.Errorf("failed to scan DictionaryLines value of type %T", value)
	}
	return json.Unmarshal(data, lines)
}

func (lines DictionaryLines) Value() (driver.Value, error) { return json.Marshal(lines) }

type DataDictionaryDetail struct {
	ID          string          `gorm:"column:id" json:"id"`
	CreatedAt   time.Time       `gorm:"column:created_at" json:"createdAt"`
	UpdatedAt   time.Time       `gorm:"column:updated_at" json:"updatedAt,omitempty"`
	CreatorId   string          `gorm:"column:creator_id" json:"creatorId,omitempty"`
	UpdaterId   string          `gorm:"column:updater_id" json:"updaterId,omitempty"`
	Code        string          `gorm:"column:code" json:"code"`
	Name        string          `gorm:"column:name" json:"name"`
	Description string          `gorm:"column:description" json:"description"`
	Lines       DictionaryLines `gorm:"column:lines" json:"lines"`
}

type DataDictionaryDetailList struct {
	Data  []*DataDictionaryDetail `json:"data"`
	Total int64                   `json:"total"`
}

type DataDictionaryUpdate struct {
	Name        string          `json:"name" validate:"required,max=255"`
	Description string          `json:"description"`
	Lines       DictionaryLines `json:"lines" validate:"dive"`
}

func (model *DataDictionaryUpdate) Normalize() error {
	model.Name = strings.TrimSpace(model.Name)
	if model.Name == "" {
		return errors.New("dictionary name is required")
	}
	values := make(map[string]struct{}, len(model.Lines))
	for index := range model.Lines {
		line := &model.Lines[index]
		line.Label = strings.TrimSpace(line.Label)
		line.Value = strings.TrimSpace(line.Value)
		line.Index = index + 1
		if line.Label == "" || line.Value == "" {
			return fmt.Errorf("dictionary line %d label and value are required", index+1)
		}
		if len(line.Label) > 100 || len(line.Value) > 100 {
			return fmt.Errorf("dictionary line %d label or value is too long", index+1)
		}
		if _, exists := values[line.Value]; exists {
			return fmt.Errorf("dictionary value %q is duplicated", line.Value)
		}
		values[line.Value] = struct{}{}
	}
	return nil
}

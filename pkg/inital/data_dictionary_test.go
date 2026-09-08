package inital

import (
	"testing"

	"github.com/efucloud/kube-keeper/pkg/models/daos"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/glebarez/sqlite"
	"gorm.io/gorm"
)

func TestInitializeDataDictionariesIsIdempotent(t *testing.T) {
	db, err := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	if err != nil {
		t.Fatalf("open database: %v", err)
	}
	if err = db.AutoMigrate(&daos.DataDictionary{}); err != nil {
		t.Fatalf("migrate database: %v", err)
	}

	custom := daos.DataDictionary{
		ID:          "existing-id",
		Code:        dtos.ApplicationCategoryDictionaryCode,
		Name:        "自定义分类名称",
		Description: "管理员修改后的内容",
		Lines: dtos.DictionaryLines{
			{Label: "自定义", Value: "custom", Index: 1},
		},
	}
	if err = db.Create(&custom).Error; err != nil {
		t.Fatalf("create existing dictionary: %v", err)
	}

	if err = initializeDataDictionaries(db); err != nil {
		t.Fatalf("first initialization: %v", err)
	}
	if err = initializeDataDictionaries(db); err != nil {
		t.Fatalf("second initialization: %v", err)
	}

	var count int64
	if err = db.Model(&daos.DataDictionary{}).Count(&count).Error; err != nil {
		t.Fatalf("count dictionaries: %v", err)
	}
	if count != int64(len(defaultDataDictionaries)) {
		t.Fatalf("dictionary count = %d, want %d", count, len(defaultDataDictionaries))
	}

	var category daos.DataDictionary
	if err = db.Where("code = ?", dtos.ApplicationCategoryDictionaryCode).Take(&category).Error; err != nil {
		t.Fatalf("get existing dictionary: %v", err)
	}
	if category.ID != custom.ID || category.Name != custom.Name || category.Description != custom.Description {
		t.Fatalf("existing dictionary was overwritten: %#v", category)
	}
	if len(category.Lines) != 1 || category.Lines[0].Value != "custom" {
		t.Fatalf("existing dictionary lines were overwritten: %#v", category.Lines)
	}
}

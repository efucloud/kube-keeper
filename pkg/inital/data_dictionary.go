package inital

import (
	"fmt"

	"github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/models/daos"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/efucloud/kube-keeper/pkg/utils"
	"gorm.io/gorm"
)

var defaultDataDictionaries = []daos.DataDictionary{
	{
		Code:        dtos.ApplicationCategoryDictionaryCode,
		Name:        "应用分类",
		Description: "应用市场中用于归类应用的分类仓库",
		Lines: dtos.DictionaryLines{
			{Label: "应用", Value: "application", Index: 1},
			{Label: "数据库", Value: "database", Index: 2},
			{Label: "中间件", Value: "middleware", Index: 3},
			{Label: "可观测性", Value: "observability", Index: 4},
			{Label: "DevOps", Value: "devops", Index: 5},
		},
	},
	{
		Code:        dtos.ApplicationTagDictionaryCode,
		Name:        "应用标签",
		Description: "应用市场中可供应用选择的标签仓库",
		Lines: dtos.DictionaryLines{
			{Label: "官方", Value: "official", Index: 1},
			{Label: "推荐", Value: "recommended", Index: 2},
			{Label: "热门", Value: "popular", Index: 3},
			{Label: "云原生", Value: "cloud-native", Index: 4},
		},
	},
}

// InitializeDataDictionaries creates SaaS-owned dictionaries once. FirstOrCreate
// deliberately leaves later administrator changes untouched.
func InitializeDataDictionaries() {
	if err := initializeDataDictionaries(config.DBConnect); err != nil {
		config.Logger.Fatalf("initialize data dictionaries failed: %s", err.Error())
	}
}

func initializeDataDictionaries(db *gorm.DB) error {
	for _, dictionary := range defaultDataDictionaries {
		dictionary.ID = utils.GenerateDatabaseId()
		var existing daos.DataDictionary
		if err := db.Where("code = ?", dictionary.Code).Attrs(dictionary).FirstOrCreate(&existing).Error; err != nil {
			return fmt.Errorf("initialize data dictionary %s: %w", dictionary.Code, err)
		}
	}
	return nil
}

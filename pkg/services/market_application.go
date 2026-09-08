package services

import (
	"context"
	"fmt"

	"github.com/efucloud/common"
	"github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/efucloud/kube-keeper/pkg/repositories"
	"gorm.io/gorm"
)

type MarketApplicationService struct {
	repo repositories.MarketApplicationRepository
}

func (svc *MarketApplicationService) init(ctx context.Context) {
	db, ok := ctx.Value(config.ContextDBTx).(*gorm.DB)
	if !ok {
		db = config.DBConnect
	}
	svc.repo = repositories.MarketApplicationRepository{DB: db}
}

func (svc *MarketApplicationService) Get(ctx context.Context, id string) (dtos.MarketApplicationDetail, common.ErrorData) {
	svc.init(ctx)
	return svc.repo.Get(ctx, id)
}
func (svc *MarketApplicationService) List(ctx context.Context, current, pageSize int, order, query string, args []interface{}) (dtos.MarketApplicationDetailList, common.ErrorData) {
	svc.init(ctx)
	return svc.repo.List(ctx, current, pageSize, order, query, args)
}

func (svc *MarketApplicationService) Add(ctx context.Context, model dtos.MarketApplicationCreate) (result dtos.MarketApplicationDetail, errorData common.ErrorData) {
	svc.init(ctx)
	model.Default(ctx)
	if errorData.Err = model.Validate(ctx); errorData.IsNotNil() {
		errorData.MsgCode = config.MsgCodeRequestDataInvalid
		return
	}
	if errorData.Err = validateMarketApplicationDictionaryValues(ctx, model.Category, model.Tags); errorData.IsNotNil() {
		errorData.MsgCode = config.MsgCodeRequestDataInvalid
		return
	}
	return svc.repo.Add(ctx, model)
}

func (svc *MarketApplicationService) Update(ctx context.Context, model dtos.MarketApplicationUpdate) (result dtos.MarketApplicationDetail, errorData common.ErrorData) {
	svc.init(ctx)
	model.Default(ctx)
	if errorData.Err = model.Validate(ctx); errorData.IsNotNil() {
		errorData.MsgCode = config.MsgCodeRequestDataInvalid
		return
	}
	if errorData.Err = validateMarketApplicationDictionaryValues(ctx, model.Category, model.Tags); errorData.IsNotNil() {
		errorData.MsgCode = config.MsgCodeRequestDataInvalid
		return
	}
	return svc.repo.Update(ctx, model)
}

func validateMarketApplicationDictionaryValues(ctx context.Context, category string, tags []string) error {
	dictionaryService := DataDictionaryService{}
	categoryDictionary, categoryError := dictionaryService.Get(ctx, dtos.ApplicationCategoryDictionaryCode)
	if categoryError.IsNotNil() {
		return fmt.Errorf("get application category dictionary: %w", categoryError.Err)
	}
	tagDictionary, tagError := dictionaryService.Get(ctx, dtos.ApplicationTagDictionaryCode)
	if tagError.IsNotNil() {
		return fmt.Errorf("get application tag dictionary: %w", tagError.Err)
	}

	allowedCategories := make(map[string]struct{}, len(categoryDictionary.Lines))
	for _, line := range categoryDictionary.Lines {
		allowedCategories[line.Value] = struct{}{}
	}
	if _, exists := allowedCategories[category]; !exists {
		return fmt.Errorf("application category %q is not in data dictionary", category)
	}

	allowedTags := make(map[string]struct{}, len(tagDictionary.Lines))
	for _, line := range tagDictionary.Lines {
		allowedTags[line.Value] = struct{}{}
	}
	selectedTags := make(map[string]struct{}, len(tags))
	for _, tag := range tags {
		if _, exists := allowedTags[tag]; !exists {
			return fmt.Errorf("application tag %q is not in data dictionary", tag)
		}
		if _, exists := selectedTags[tag]; exists {
			return fmt.Errorf("application tag %q is duplicated", tag)
		}
		selectedTags[tag] = struct{}{}
	}
	return nil
}

func (svc *MarketApplicationService) UpdateState(ctx context.Context, model dtos.MarketApplicationState) common.ErrorData {
	svc.init(ctx)
	if model.ID == "" || model.State > 1 {
		return common.ErrorData{Err: fmt.Errorf("invalid market application state"), MsgCode: config.MsgCodeRequestDataInvalid}
	}
	return svc.repo.UpdateState(ctx, model)
}
func (svc *MarketApplicationService) Delete(ctx context.Context, ids []string) common.ErrorData {
	svc.init(ctx)
	return svc.repo.Delete(ctx, ids)
}

func (svc *MarketApplicationService) Import(ctx context.Context, model dtos.MarketApplicationExportImport) (result dtos.MarketApplicationDetail, errorData common.ErrorData) {
	return svc.Add(ctx, marketApplicationCreateFromImport(model))
}

func (svc *MarketApplicationService) Export(ctx context.Context, id string) (result dtos.MarketApplicationExportImport, errorData common.ErrorData) {
	detail, errorData := svc.Get(ctx, id)
	if errorData.IsNotNil() {
		return result, errorData
	}
	return marketApplicationExportFromDetail(detail), errorData
}

func marketApplicationCreateFromImport(model dtos.MarketApplicationExportImport) dtos.MarketApplicationCreate {
	// An imported definition always receives a new database ID so an exported
	// file can be moved between installations or imported after deletion.
	return dtos.MarketApplicationCreate{
		State:       model.State,
		Name:        model.Name,
		Description: model.Description,
		Logo:        model.Logo,
		Home:        model.Home,
		Category:    model.Category,
		Tags:        model.Tags,
		Templates:   model.Templates,
		Parameters:  model.Parameters,
	}
}

func marketApplicationExportFromDetail(detail dtos.MarketApplicationDetail) dtos.MarketApplicationExportImport {
	// Database and audit fields are intentionally excluded from the portable
	// application definition.
	return dtos.MarketApplicationExportImport{
		State:       detail.State,
		Name:        detail.Name,
		Description: detail.Description,
		Logo:        detail.Logo,
		Home:        detail.Home,
		Category:    detail.Category,
		Tags:        detail.Tags,
		Templates:   detail.Templates,
		Parameters:  detail.Parameters,
	}
}

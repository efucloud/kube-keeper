package services

import (
	"context"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/efucloud/kube-keeper/pkg/repositories"

	"github.com/efucloud/common"
	"gorm.io/gorm"
)

type BuiltinShellCommandService struct {
	repo repositories.BuiltinShellCommandRepository
}

func (svc *BuiltinShellCommandService) init(ctx context.Context) {
	db, ok := ctx.Value(config2.ContextDBTx).(*gorm.DB)
	if ok {
		svc.repo = repositories.BuiltinShellCommandRepository{DB: db}
	} else {
		svc.repo = repositories.BuiltinShellCommandRepository{DB: config2.DBConnect}
	}
}

func (svc *BuiltinShellCommandService) GetBuiltinShellCommandByID(ctx context.Context, id string) (result dtos.BuiltinShellCommandDetail, errorData common.ErrorData) {
	svc.init(ctx)
	config2.Logger.Infof("operator: %s GetBuiltinShellCommandByID: %s", config2.GetOperatorFromCtx(ctx), id)
	result, errorData = svc.repo.GetBuiltinShellCommandByID(ctx, id)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("operator: %s get BuiltinShellCommand by id: %s failed, err: %s", config2.GetOperatorFromCtx(ctx), id, errorData.Err.Error())
	}
	return result, errorData
}

func (svc *BuiltinShellCommandService) ListBuiltinShellCommand(ctx context.Context, page, size int, order, query string, queryArgs []interface{}) (results dtos.BuiltinShellCommandDetailList, errorData common.ErrorData) {
	svc.init(ctx)
	config2.Logger.Infof("operator: %s ListBuiltinShellCommand query: [%s] queryArgs: [%+v] ", config2.GetOperatorFromCtx(ctx), query, queryArgs)
	results, errorData = svc.repo.ListBuiltinShellCommand(ctx, page, size, order, query, queryArgs)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("operator: %s ListBuiltinShellCommand  query: [%s] queryArgs: [%+v] failed, err: %s", config2.GetOperatorFromCtx(ctx), query, queryArgs, errorData.Err.Error())
	}
	return results, errorData
}
func (svc *BuiltinShellCommandService) UpdateBuiltinShellCommand(ctx context.Context, model dtos.BuiltinShellCommandUpdate) (result dtos.BuiltinShellCommandDetail, errorData common.ErrorData) {
	svc.init(ctx)
	model.Default(ctx)
	config2.Logger.Infof("operator: %s UpdateBuiltinShellCommand id: %s", config2.GetOperatorFromCtx(ctx), model.ID)
	errorData.Err = model.Validate(ctx)
	if errorData.IsNotNil() {
		errorData.MsgCode = config2.MsgCodeRequestDataInvalid
		config2.Logger.Errorf("operator: %s update BuiltinShellCommand: %s failed, err: %s", config2.GetOperatorFromCtx(ctx), model.Name, errorData.Err.Error())
		return
	}
	result, errorData = svc.repo.UpdateBuiltinShellCommand(ctx, model)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("operator: %s update BuiltinShellCommand: %s failed, err: %s", config2.GetOperatorFromCtx(ctx), model.Name, errorData.Err.Error())
	}
	return
}
func (svc *BuiltinShellCommandService) AddBuiltinShellCommand(ctx context.Context, model dtos.BuiltinShellCommandCreate) (result dtos.BuiltinShellCommandDetail, errorData common.ErrorData) {
	svc.init(ctx)
	model.Default(ctx)
	config2.Logger.Infof("operator: %s AddBuiltinShellCommand name: %s", config2.GetOperatorFromCtx(ctx), model.Name)
	errorData.Err = model.Validate(ctx)
	if errorData.IsNotNil() {
		errorData.MsgCode = config2.MsgCodeRequestDataInvalid
		config2.Logger.Errorf("operator: %s create BuiltinShellCommand: %s failed, err: %s", config2.GetOperatorFromCtx(ctx), model.Name, errorData.Err.Error())
		return
	}

	result, errorData = svc.repo.AddBuiltinShellCommand(ctx, model)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("operator: %s create BuiltinShellCommand: %s failed, err: %s", config2.GetOperatorFromCtx(ctx), model.Name, errorData.Err.Error())
	}
	return
}

func (svc *BuiltinShellCommandService) DeleteBuiltinShellCommand(ctx context.Context, id string) (errorData common.ErrorData) {
	svc.init(ctx)

	config2.Logger.Infof("operator: %s DeleteBuiltinShellCommand id: %s", config2.GetOperatorFromCtx(ctx), id)
	errorData = svc.repo.DeleteBuiltinShellCommand(ctx, id)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("operator: %s delete BuiltinShellCommand by id: %s failed, err: %s", config2.GetOperatorFromCtx(ctx), id, errorData.Err.Error())
	}
	return
}

package services

import (
	"context"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/efucloud/kube-keeper/pkg/repositories"

	"github.com/efucloud/common"
	"gorm.io/gorm"
)

type TerminalAuditLogService struct {
	repo repositories.TerminalAuditLogRepository
}

func (svc *TerminalAuditLogService) init(ctx context.Context) {
	db, ok := ctx.Value(config2.ContextDBTx).(*gorm.DB)
	if ok {
		svc.repo = repositories.TerminalAuditLogRepository{DB: db}
	} else {
		svc.repo = repositories.TerminalAuditLogRepository{DB: config2.DBConnect}
	}
}

func (svc *TerminalAuditLogService) ListTerminalAuditLog(ctx context.Context, page, size int, order, query string, queryArgs []interface{}) (results dtos.TerminalAuditLogDetailList, errorData common.ErrorData) {
	svc.init(ctx)
	results, errorData = svc.repo.ListTerminalAuditLog(ctx, page, size, order, query, queryArgs)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("operator: %s list TerminalAuditLog  query: [%s] queryArgs: [%+v] failed, err: %s", config2.GetOperatorFromCtx(ctx), query, queryArgs, errorData.Err.Error())
	}
	return results, errorData
}
func (svc *TerminalAuditLogService) AddTerminalAuditLog(ctx context.Context, model dtos.TerminalAuditLogCreate) (result dtos.TerminalAuditLogDetail, errorData common.ErrorData) {
	svc.init(ctx)
	model.Default(ctx)
	errorData.Err = model.Validate(ctx)
	if errorData.IsNotNil() {
		errorData.MsgCode = config2.MsgCodeRequestDataInvalid
		config2.Logger.Errorf("operator: %s create TerminalAuditLog for cluster: %s failed, err: %s", config2.GetOperatorFromCtx(ctx), model.ClusterId, errorData.Err.Error())

		return
	}

	result, errorData = svc.repo.AddTerminalAuditLog(ctx, model)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("operator: %s create TerminalAuditLog for cluster: %s failed, err: %s", config2.GetOperatorFromCtx(ctx), model.ClusterId, errorData.Err.Error())
	}
	return
}

func (svc *TerminalAuditLogService) DeleteTerminalAuditLog(ctx context.Context, ids []string) (errorData common.ErrorData) {
	svc.init(ctx)
	errorData = svc.repo.DeleteTerminalAuditLogByIds(ctx, ids)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("operator: %s delete TerminalAuditLog by ids failed, err: %s", config2.GetOperatorFromCtx(ctx), errorData.Err.Error())
	}
	return
}

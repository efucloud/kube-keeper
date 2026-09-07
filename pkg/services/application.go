package services

import (
	"context"

	"github.com/efucloud/common"
	"github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/efucloud/kube-keeper/pkg/repositories"
	"gorm.io/gorm"
)

type ApplicationService struct {
	repo repositories.ApplicationRepository
}

func (svc *ApplicationService) init(ctx context.Context) {
	db, ok := ctx.Value(config.ContextDBTx).(*gorm.DB)
	if !ok {
		db = config.DBConnect
	}
	svc.repo = repositories.ApplicationRepository{DB: db}
}

func (svc *ApplicationService) Get(ctx context.Context, id string) (dtos.ApplicationDetail, common.ErrorData) {
	svc.init(ctx)
	return svc.repo.Get(ctx, id)
}
func (svc *ApplicationService) List(ctx context.Context, current, pageSize int, order, query string, args []interface{}) (dtos.ApplicationDetailList, common.ErrorData) {
	svc.init(ctx)
	return svc.repo.List(ctx, current, pageSize, order, query, args)
}

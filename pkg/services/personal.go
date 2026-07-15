package services

import (
	"context"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"

	"github.com/efucloud/common"
)

type PersonalService struct {
}

func (svc *PersonalService) ListUserClusterNamespace(ctx context.Context, page, size int, order, query string, queryArgs []interface{}) (results dtos.ClusterNamespaceDetailList, errorData common.ErrorData) {
	//判断用户在集群中的权限
	clusterNsSvc := ClusterNamespaceService{}
	results, errorData = clusterNsSvc.ListClusterNamespace(ctx, page, size, order, query, queryArgs)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("operator: %s list ClusterNamespace  query: [%s] queryArgs: [%+v] failed, err: %s", config2.GetOperatorFromCtx(ctx), query, queryArgs, errorData.Err.Error())
	}
	return results, errorData
}

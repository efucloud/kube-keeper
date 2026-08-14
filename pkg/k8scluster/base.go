package k8scluster

import (
	"context"
	"github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/k8scluster/database"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/efucloud/kube-keeper/pkg/structs"
	"github.com/emicklei/go-restful/v3"
	"strings"
)

func GetAccountTokenFromRequest(req *restful.Request) (token string) {
	token = req.HeaderParameter(config.AuthHeader)
	if strings.HasPrefix(token, "Bearer ") || strings.HasPrefix(token, "bearer ") {
		token = token[:7]
	}
	return
}

func GetRequestInfo(req *restful.Request) (requestInfo structs.RequestInfo) {
	requestInfo.Token = GetAccountTokenFromRequest(req)
	requestInfo.ClusterCode = req.PathParameter("cluster")
	requestInfo.Namespace = req.PathParameter("namespace")
	requestInfo.Workspace = req.PathParameter("workspace")
	requestInfo.ResourceName = req.PathParameter("resourceName")
	requestInfo.ResourceKind = req.PathParameter("resourceKind")
	if acc := req.Attribute(config.RequestAccount); acc != nil {
		account := acc.(dtos.AccountDetail)
		requestInfo.Username = account.Username
		requestInfo.Email = account.Email
		requestInfo.AccountId = account.ID
	} else {
		accId := req.Attribute(config.RequestUserId)
		if accId != nil {
			requestInfo.AccountId = accId.(string)
		}
	}
	orgClusterSvc := database.ClusterService{}
	cluster, _ := orgClusterSvc.GetClusterByCode(context.Background(), requestInfo.ClusterCode)
	requestInfo.ClusterId = cluster.ID
	return
}

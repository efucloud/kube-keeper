package crons

import (
	"context"
	"github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/k8scluster"
	"github.com/efucloud/kube-keeper/pkg/services"
	"github.com/efucloud/kube-keeper/pkg/structs"
)

func syncNs() {
	config.Logger.Info("start sync cluster namespaces")
	ctx := context.Background()
	clusterSvc := services.ClusterService{}
	clusterList, _ := clusterSvc.ListCluster(ctx, 1, 10000, "", "", nil)
	if len(clusterList.Data) > 0 {
		for _, cluster := range clusterList.Data {
			var tenantInfo structs.RequestInfo
			tenantInfo.ClusterCode = cluster.Code
			tenantInfo.ClusterId = cluster.ID
			config.Logger.Infof("start sync cluster: %s(%s) namespaces", cluster.Name, cluster.Code)
			k8scluster.SyncClusterNamespace(ctx, tenantInfo)
			config.Logger.Infof("end sync cluster: %s(%s) namespaces", cluster.Name, cluster.Code)
		}
	}
	config.Logger.Info("end sync cluster namespaces")
}

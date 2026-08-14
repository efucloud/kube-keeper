package trans

import (
	"github.com/efucloud/kube-keeper/pkg/models/daos"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
)

func ClusterNamespaceToClusterNamespaceDetailDTO(ins daos.ClusterNamespace) dtos.ClusterNamespaceDetail {
	return dtos.ClusterNamespaceDetail{
		ID:            ins.ID,
		CreatedAt:     ins.CreatedAt,
		UpdatedAt:     ins.UpdatedAt,
		ClusterId:     ins.ClusterId,
		Namespace:     ins.Namespace,
		WorkspaceCode: ins.WorkspaceCode,
		Description:   ins.Description,
	}
}
func ClusterNamespaceDetailToClusterNamespaceDAO(ins dtos.ClusterNamespaceDetail) daos.ClusterNamespace {
	return daos.ClusterNamespace{
		ID:            ins.ID,
		CreatedAt:     ins.CreatedAt,
		UpdatedAt:     ins.UpdatedAt,
		ClusterId:     ins.ClusterId,
		Namespace:     ins.Namespace,
		WorkspaceCode: ins.WorkspaceCode,
		Description:   ins.Description,
	}
}

func ClusterNamespaceDetailToClusterNamespaceCreate(ins dtos.ClusterNamespaceDetail) dtos.ClusterNamespaceCreate {
	return dtos.ClusterNamespaceCreate{
		ClusterId:   ins.ClusterId,
		Namespace:   ins.Namespace,
		Description: ins.Description,
	}
}

func ClusterNamespaceDetailToClusterNamespaceUpdate(ins dtos.ClusterNamespaceDetail) dtos.ClusterNamespaceUpdate {
	return dtos.ClusterNamespaceUpdate{
		ID:            ins.ID,
		WorkspaceCode: &ins.WorkspaceCode,
		Description:   &ins.Description,
	}
}

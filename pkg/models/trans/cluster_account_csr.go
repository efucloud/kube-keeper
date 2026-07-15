package trans

import (
	"encoding/json"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
)

func ClusterAccountDetailToClusterAccountCreate(ins dtos.ClusterAccountDetail) (result dtos.ClusterAccountCreate) {
	data, _ := json.Marshal(ins)
	_ = json.Unmarshal(data, &result)
	return
}
func ClusterAccountDetailToClusterAccountUpdate(ins dtos.ClusterAccountDetail) (result dtos.ClusterAccountUpdate) {
	data, _ := json.Marshal(ins)
	_ = json.Unmarshal(data, &result)
	return
}

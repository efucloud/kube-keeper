package trans

import (
	"encoding/json"
	"github.com/efucloud/kube-keeper/pkg/models/daos"
	dtos2 "github.com/efucloud/kube-keeper/pkg/models/dtos"
)

func AccountDetailToSimpleAccount(ins dtos2.AccountDetail) (result dtos2.SimpleAccountDetail) {
	data, _ := json.Marshal(ins)
	_ = json.Unmarshal(data, &result)
	return result
}
func AccountToAccountDetailDTO(ins daos.Account) (result dtos2.AccountDetail) {
	data, _ := json.Marshal(ins)
	_ = json.Unmarshal(data, &result)
	return result
}
func AccountDetailToAccountDAO(ins dtos2.AccountDetail) (result daos.Account) {
	data, _ := json.Marshal(ins)
	_ = json.Unmarshal(data, &result)
	return result
}

func AccountDetailToSystemUserInfo(ins dtos2.AccountDetail) (result dtos2.AuthedUserInfo) {
	data, _ := json.Marshal(ins)
	_ = json.Unmarshal(data, &result)
	return result
}

func AccountDetailToAccountCreate(ins dtos2.AccountDetail) (result dtos2.AccountCreate) {
	data, _ := json.Marshal(ins)
	_ = json.Unmarshal(data, &result)
	return result
}

func AccountDetailToAccountUpdate(ins dtos2.AccountDetail) (result dtos2.AccountUpdate) {
	data, _ := json.Marshal(ins)
	_ = json.Unmarshal(data, &result)
	return result
}

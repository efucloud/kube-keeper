package dtos

import (
	"context"
	"errors"
	"fmt"
	"github.com/efucloud/kube-keeper/pkg/config"
	"strings"
	"time"

	"github.com/efucloud/common"
	"github.com/efucloud/kube-keeper/pkg/utils"
	"github.com/go-playground/validator/v10"
	"gorm.io/gorm"
)

// ClusterAccountRoleDetailList 集群用户角色列表响应
type ClusterAccountRoleDetailList struct {
	//当前页数据
	Data []*ClusterAccountRoleDetail `json:"data"`
	//数据库满足条件的数据总数
	Total int64 `json:"total"`
}

// ClusterAccountRoleDetail 集群用户角色
type ClusterAccountRoleDetail struct {
	//主键
	ID string `gorm:"primarykey;column:id;type:varchar(50)" json:"id" description:"记录ID"`
	//创建时间
	CreatedAt time.Time `gorm:"autoCreateTime;column:created_at;<-:create" json:"createdAt" description:"创建时间"`
	//修改时间
	UpdatedAt time.Time `gorm:"autoUpdateTime;column:updated_at;<-:update" json:"updatedAt,omitempty" description:"更新时间"`
	//软删除
	DeletedAt gorm.DeletedAt `gorm:"column:deleted_at" json:"deletedAt,omitempty"`
	//删除状态
	DelFlag string `gorm:"type:varchar(50);column:del_flag;default:active" json:"-" description:"删除状态"`
	//创建者
	CreatorId string `gorm:"type:varchar(50);column:creator_id;<-:create" validate:"required" json:"creatorId" description:"创建者"`
	//创建者
	Creator AccountDetail `gorm:"foreignKey:ID;references:CreatorId" json:"creator" description:"创建者"`
	//更新者
	UpdaterId string `gorm:"type:varchar(50);column:updater_id;<-:update" json:"updaterId" validate:"required" description:"更新者"`
	//删除者
	DeleterId string `gorm:"type:varchar(50);column:deleter_id" json:"-" description:"删除者"`

	//集群ID
	ClusterId string `gorm:"type:varchar(50);column:cluster_id;<-:create" json:"clusterId" validate:"required" description:"集群ID"`
	//所属用户: 关联ID
	AccountId string `gorm:"type:varchar(50);column:account_id;<-:create" json:"accountId" validate:"required" description:"所属用户ID"`
	//集群用户
	Account AccountDetail `gorm:"foreignKey:ID;references:AccountId" json:"account" description:"所属用户"`
	//角色名称
	RoleName string `gorm:"type:varchar(50)" json:"roleName" description:"角色名称"`
	//角色绑定名称
	BindingName string `gorm:"type:varchar(50)" json:"bindingName" description:"角色绑定名称"`
	//临时权限
	IsTemp bool `gorm:"column:is_temp" json:"isTemp" description:"临时权限"`
	//开始时间
	StartTime time.Time `gorm:"column:start_time" json:"startTime" validate:"required_if=IsTemp true" description:"开始时间"`
	//结束时间
	EndTime time.Time `gorm:"column:end_time" json:"endTime"  validate:"required_if=IsTemp true"  description:"结束时间"`
	//是否有效
	Enable bool `gorm:"column:enable;default:false" json:"enable" description:"是否有效"`
}

// ClusterAccountRoleCreate 集群用户角色
type ClusterAccountRoleCreate struct {
	//主键
	ID string `gorm:"primarykey;column:id;type:varchar(50)" json:"-" description:"记录ID"`
	//创建时间
	CreatedAt time.Time `gorm:"autoCreateTime;column:created_at;<-:create" json:"-" description:"创建时间"`
	//创建者
	CreatorId string `gorm:"type:varchar(50);column:creator_id;<-:create" validate:"required" json:"-" description:"创建者"`

	//集群ID
	ClusterId string `gorm:"type:varchar(50);column:cluster_id;<-:create" json:"-" validate:"required" description:"集群ID"`
	//所属用户: 关联ID
	AccountId string `gorm:"type:varchar(50);column:account_id;<-:create" json:"accountId" validate:"required" description:"所属用户ID"`
	//角色名称
	RoleName string `gorm:"type:varchar(50)" json:"roleName" description:"角色名称"`
	//角色绑定名称
	BindingName string `gorm:"type:varchar(50)" json:"-" description:"角色绑定名称"`
	//临时权限
	IsTemp bool `gorm:"column:is_temp" json:"isTemp" description:"临时权限"`
	//开始时间
	StartTime time.Time `gorm:"column:start_time" json:"startTime" validate:"required_if=IsTemp true" description:"开始时间"`
	//结束时间
	EndTime time.Time `gorm:"column:end_time" json:"endTime"  validate:"required_if=IsTemp true"  description:"结束时间"`
	//是否有效
	Enable bool `gorm:"column:enable;default:false" json:"enable" description:"是否有效"`
	//角色信息Hash
	Hash string `gorm:"type:varchar(255);column:hash" json:"-" description:"角色信息Hash"`
}

func (md *ClusterAccountRoleCreate) Default(ctx context.Context) {
	md.CreatorId = config.GetOperatorFromCtx(ctx)
	md.ID = utils.GenerateDatabaseId()
	md.CreatedAt = time.Now()
	if !md.IsTemp {
		md.Enable = true
		md.StartTime = time.Now()
		md.EndTime = time.Now().AddDate(50, 0, 0)
	} else {
		if time.Now().After(md.EndTime) && time.Now().Before(md.StartTime) {
			md.Enable = true
		}
	}
	md.Hash = common.MD5V(fmt.Sprintf("%s-%s-%s", md.ClusterId, md.AccountId, md.RoleName))
}
func (md *ClusterAccountRoleCreate) Validate(ctx context.Context) (err error) {
	validate := validator.New()
	lang := common.GetLangFromCtx(ctx, "")
	validate.RegisterTagNameFunc(common.TagNameI18N(lang))
	trans := common.LoadValidateTranslator(lang, validate)
	err = validate.Struct(md)
	if err != nil {
		var lines []string
		var errs validator.ValidationErrors
		errors.As(err, &errs)
		for _, v := range errs.Translate(trans) {
			lines = append(lines, v)
		}
		if len(lines) > 0 {
			err = errors.New(strings.Join(lines, "\n"))
		}
	}
	return
}

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

// ClusterNamespaceDetailList 集群Namespace列表响应
type ClusterNamespaceDetailList struct {
	//当前页数据
	Data []*ClusterNamespaceDetail `json:"data"`
	//数据库满足条件的数据总数
	Total int64 `json:"total"`
}

// ClusterNamespaceDetail 集群命名空间信息
// 记录了集群里面的命名空间，以及命名空间所属的工作空间，以及是不是webide部署的namespace，若为webide部署，则需标识该namespace的管理员，即开发者，支持多个管理员
type ClusterNamespaceDetail struct {
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
	//更新者
	UpdaterId string `gorm:"type:varchar(50);column:updater_id;<-:update" json:"updaterId" validate:"required" description:"更新者"`
	//删除者
	DeleterId string `gorm:"type:varchar(50);column:deleter_id" json:"-" description:"删除者"`

	//集群ID
	ClusterId string `gorm:"type:varchar(50);column:cluster_id;<-:create" json:"clusterId" validate:"required" description:"集群ID"`
	//集群信息
	Cluster ShortClusterDetail `gorm:"foreignKey:ID;references:ClusterId" json:"cluster" description:"集群信息"`
	//集群命名空间名称
	Namespace string `gorm:"type:varchar(255);column:namespace;<-:create" json:"namespace" validate:"required" description:"集群命名空间名称"`
	//所属工作空间编码
	WorkspaceCode string `gorm:"type:varchar(50);column:workspace_code" json:"workspaceCode" description:"所属工作空间编码"`
	//描述
	Description string `gorm:"type:varchar(50);column:description" json:"description" description:"描述"`
	//命名空间状态
	Status string `gorm:"column:status" json:"status" description:"命名空间状态"`
	//Hash解决多字段约束过长的问题
	Hash string `gorm:"type:varchar(255);column:hash" json:"-" description:"组织、集群、命名空间唯一"`
	//集群上创建时间
	ClusterCreateTime time.Time `gorm:"column:cluster_create_time" json:"clusterCreateTime" validate:"required" description:"集群上创建时间"`
	//命名空间类型public:工作空间中所有成员均可加入,private:工作空间成员私有命名空间,命名空间管理员可以邀请工作空间用户加入
	IsPublic bool `gorm:"column:is_public;default:true" json:"isPublic" description:"命名空间类型"`
}

// ClusterNamespaceCreate 集群命名空间信息创建
// 记录了集群里面的命名空间，以及命名空间所属的工作空间，以及是不是webide部署的namespace，若为webide部署，则需标识该namespace的管理员，即开发者，支持多个管理员
type ClusterNamespaceCreate struct {
	//主键
	ID string `gorm:"primarykey;column:id;type:varchar(50)" json:"-" description:"记录ID"`
	//创建时间
	CreatedAt time.Time `gorm:"autoCreateTime;column:created_at;<-:create" json:"-" description:"创建时间"`
	//创建者
	CreatorId string `gorm:"type:varchar(50);column:creator_id;<-:create" validate:"required" json:"-" description:"创建者"`

	//集群ID
	ClusterId string `gorm:"type:varchar(50);column:cluster_id;<-:create" json:"clusterId" validate:"required" description:"集群ID"`
	//集群命名空间名称
	Namespace string `gorm:"type:varchar(255);column:namespace;<-:create" json:"namespace" validate:"required" description:"集群命名空间名称"`
	//所属工作空间编码
	WorkspaceCode string `gorm:"type:varchar(50);column:workspace_code" json:"workspaceCode" description:"所属工作空间编码"`
	//描述
	Description string `gorm:"type:varchar(50);column:description" json:"description" description:"描述"`
	//命名空间状态
	Status string `gorm:"column:status" json:"status" description:"命名空间状态"`
	//Hash解决多字段约束过长的问题
	Hash string `gorm:"type:varchar(255);column:hash" json:"-" description:"组织、集群、命名空间唯一"`
	//集群上创建时间
	ClusterCreateTime time.Time `gorm:"column:cluster_create_time" json:"clusterCreateTime" validate:"required" description:"集群上创建时间"`
	//命名空间类型public:工作空间中所有成员均可加入,private:工作空间成员私有命名空间,命名空间管理员可以邀请工作空间用户加入
	IsPublic bool `gorm:"column:is_public;default:true" json:"isPublic" description:"命名空间类型"`
}

func (md *ClusterNamespaceCreate) Default(ctx context.Context) {
	md.CreatorId = config.GetOperatorFromCtx(ctx)
	md.ID = utils.GenerateDatabaseId()
	md.CreatedAt = time.Now()
	md.Hash = common.MD5V(fmt.Sprintf("%s-%s", md.ClusterId, md.Namespace))

}
func (md *ClusterNamespaceCreate) Validate(ctx context.Context) (err error) {
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

// ClusterNamespaceUpdate 集群命名空间信息修改
// 记录了集群里面的命名空间，以及命名空间所属的工作空间，以及是不是webide部署的namespace，若为webide部署，则需标识该namespace的管理员，即开发者，支持多个管理员
type ClusterNamespaceUpdate struct {
	//主键
	ID string `gorm:"type:varchar(50);column:id" json:"id" validate:"required" description:"记录ID"`
	//修改时间
	UpdatedAt time.Time `gorm:"autoUpdateTime;column:updated_at;<-:update" json:"-" description:"更新时间"`
	//更新者
	UpdaterId string `gorm:"type:varchar(50);column:updater_id;<-:update" json:"-" validate:"required" description:"更新者"`

	//所属工作空间编码
	WorkspaceCode *string `gorm:"type:varchar(50);column:workspace_code" json:"workspaceCode" description:"所属工作空间编码"`
	//描述
	Description *string `gorm:"type:varchar(50);column:description" json:"description" description:"描述"`
	//命名空间状态
	Status *string `gorm:"column:status" json:"status" description:"命名空间状态"`
}

func (md *ClusterNamespaceUpdate) Default(ctx context.Context) {
	md.UpdaterId = config.GetOperatorFromCtx(ctx)
	md.UpdatedAt = time.Now()
}

func (md *ClusterNamespaceUpdate) Validate(ctx context.Context) (err error) {
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

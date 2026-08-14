package dtos

import (
	"context"
	"errors"
	"github.com/efucloud/common/datatypes"
	"strings"
	"time"

	"github.com/efucloud/common"
	"github.com/efucloud/kube-keeper/pkg/utils"
	"github.com/go-playground/validator/v10"
)

// ClusterApiResourceDetailList  集群ApiResource列表响应
type ClusterApiResourceDetailList struct {
	//当前页数据
	Data []*ClusterApiResourceDetail `json:"data"`
	//数据库满足条件的数据总数
	Total int64 `json:"total,omitempty" validate:"required"`
}

// ClusterApiResourceDetail 集群ApiResource详情
type ClusterApiResourceDetail struct {
	//主键
	ID string `gorm:"primarykey;column:id;type:varchar(50)" json:"id" description:"记录ID"`
	//创建时间
	CreatedAt time.Time `gorm:"autoCreateTime;column:created_at;<-:create" json:"createdAt" description:"创建时间"`
	//修改时间
	UpdatedAt time.Time `gorm:"autoUpdateTime;column:updated_at;<-:update" json:"updatedAt,omitempty" description:"更新时间"`

	//集群ID
	ClusterId string `gorm:"type:varchar(50);column:cluster_id;<-:create" json:"clusterId" validate:"required" description:"集群ID"`
	//内容
	Content datatypes.LongText `gorm:"column:content" json:"content" validate:"required" description:"api group内容"`
	//内容hash
	Hash string `gorm:"type:varchar(255);column:hash" json:"-" description:"内容hash"`
}

// ClusterApiResourceCreate 集群ApiResource创建
type ClusterApiResourceCreate struct {
	//主键
	ID string `gorm:"primarykey;column:id;type:varchar(50)" json:"-" description:"记录ID"`
	//创建时间
	CreatedAt time.Time `gorm:"autoCreateTime;column:created_at;<-:create" json:"-" description:"创建时间"`

	//集群ID
	ClusterId string `gorm:"type:varchar(50);column:cluster_id;<-:create" json:"clusterId" validate:"required" description:"集群ID"`
	//内容
	Content datatypes.LongText `gorm:"column:content" json:"content" validate:"required" description:"api group内容"`
	//内容hash
	Hash string `gorm:"type:varchar(255);column:hash" json:"-" description:"内容hash"`
}

func (md *ClusterApiResourceCreate) Default(ctx context.Context) {
	md.ID = utils.GenerateDatabaseId()
	md.CreatedAt = time.Now()
	md.Hash = common.MD5V(string(md.Content))
}
func (md *ClusterApiResourceCreate) Validate(ctx context.Context) (err error) {
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

// ClusterApiResourceUpdate 集群ApiResource更新
type ClusterApiResourceUpdate struct {
	//主键
	ID string `gorm:"primarykey;column:id;type:varchar(50)" json:"-" description:"记录ID"`
	//修改时间
	UpdatedAt time.Time `gorm:"autoUpdateTime;column:updated_at;<-:update" json:"updatedAt,omitempty" description:"更新时间"`

	//集群ID
	ClusterId string `gorm:"type:varchar(50);column:cluster_id;<-:create" json:"clusterId" validate:"required" description:"集群ID"`
	//内容
	Content datatypes.LongText `gorm:"column:content" json:"content" validate:"required" description:"api group内容"`
	//内容hash
	Hash string `gorm:"type:varchar(255);column:hash" json:"-" description:"内容hash"`
}

func (md *ClusterApiResourceUpdate) Default(ctx context.Context) {
	md.UpdatedAt = time.Now()
	md.Hash = common.MD5V(string(md.Content))
}
func (md *ClusterApiResourceUpdate) Validate(ctx context.Context) (err error) {
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

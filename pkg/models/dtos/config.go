package dtos

import (
	"context"
	"errors"
	"github.com/efucloud/kube-keeper/pkg/config"
	"strings"
	"time"

	"github.com/efucloud/common"
	"github.com/efucloud/kube-keeper/pkg/utils"
	"github.com/go-playground/validator/v10"
)

// ConfigDetailList 系统配置信息
type ConfigDetailList struct {
	//当前页数据
	Data []*ConfigDetail `json:"data"`
	//数据库满足条件的数据总数
	Total int64 `json:"total"`
}

// ConfigDetail 系统配置信息
type ConfigDetail struct {
	//主键
	ID string `gorm:"primarykey;column:id;type:varchar(50)" json:"-" description:"记录ID"`
	//创建时间
	CreatedAt time.Time `gorm:"autoCreateTime;column:created_at;<-:create" json:"-" description:"创建时间"`
	//修改时间
	UpdatedAt time.Time `gorm:"autoUpdateTime;column:updated_at;<-:update" json:"updatedAt,omitempty" description:"更新时间"`
	//创建者
	CreatorId string `gorm:"type:varchar(50);column:creator_id;<-:create" validate:"required" json:"creatorId" description:"创建者"`
	//更新者
	UpdaterId string `gorm:"type:varchar(50);column:updater_id;<-:update" json:"updaterId" validate:"required" description:"更新者"`
	//编码
	Code string `gorm:"type:varchar(255);column:code" json:"code" validate:"required" description:"编码"`
	//内容
	Data string `gorm:"type:longtext;column:data" json:"data" description:"内容"`
}

// ConfigCreate 集群命名空间信息创建
// 记录了集群里面的命名空间，以及命名空间所属的工作空间，以及是不是webide部署的namespace，若为webide部署，则需标识该namespace的管理员，即开发者，支持多个管理员
type ConfigCreate struct {
	//主键
	ID string `gorm:"primarykey;column:id;type:varchar(50)" json:"-" description:"记录ID"`
	//创建时间
	CreatedAt time.Time `gorm:"autoCreateTime;column:created_at;<-:create" json:"-" description:"创建时间"`
	//创建者
	CreatorId string `gorm:"type:varchar(50);column:creator_id;<-:create" validate:"required" json:"-" description:"创建者"`
	//编码
	Code string `gorm:"type:varchar(255);column:code" json:"code" validate:"required" description:"编码"`
	//内容
	Data string `gorm:"type:longtext;column:data" json:"data" description:"内容"`
}

func (md *ConfigCreate) Default(ctx context.Context) {
	md.CreatorId = config.GetOperatorFromCtx(ctx)
	md.ID = utils.GenerateDatabaseId()
	md.CreatedAt = time.Now()

}
func (md *ConfigCreate) Validate(ctx context.Context) (err error) {
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

// ConfigUpdate 集群命名空间信息修改
// 记录了集群里面的命名空间，以及命名空间所属的工作空间，以及是不是webide部署的namespace，若为webide部署，则需标识该namespace的管理员，即开发者，支持多个管理员
type ConfigUpdate struct {
	//主键
	ID string `gorm:"type:varchar(50);column:id" json:"id" validate:"required" description:"记录ID"`
	//修改时间
	UpdatedAt time.Time `gorm:"autoUpdateTime;column:updated_at;<-:update" json:"-" description:"更新时间"`
	//更新者
	UpdaterId string `gorm:"type:varchar(50);column:updater_id;<-:update" json:"-" validate:"required" description:"更新者"`
	//编码
	Code string `gorm:"type:varchar(255);column:code" json:"code" validate:"required" description:"编码"`
	//内容
	Data string `gorm:"type:longtext;column:data" json:"data" description:"内容"`
}

func (md *ConfigUpdate) Default(ctx context.Context) {
	md.UpdaterId = config.GetOperatorFromCtx(ctx)
	md.UpdatedAt = time.Now()
}

func (md *ConfigUpdate) Validate(ctx context.Context) (err error) {
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

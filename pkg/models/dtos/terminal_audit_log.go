package dtos

import (
	"context"
	"errors"
	"github.com/efucloud/common"
	"github.com/efucloud/common/datatypes"
	"github.com/efucloud/kube-keeper/pkg/utils"
	"github.com/go-playground/validator/v10"
	datatypes2 "gorm.io/datatypes"
	"strings"
	"time"
)

// TerminalAuditLogDetailList 审计日志列表响应
type TerminalAuditLogDetailList struct {
	//当前页数据
	Data []*TerminalAuditLogDetail `json:"data"`
	//数据库满足条件的数据总数
	Total int64 `json:"total"`
}

// TerminalAuditLogDetail 集群终端审计日志
// 通过web terminal操作日志记录
type TerminalAuditLogDetail struct {
	//主键
	ID string `gorm:"primarykey;column:id;type:varchar(50)" json:"id" description:"记录ID"`
	//创建时间
	CreatedAt time.Time `gorm:"autoCreateTime;column:created_at;<-:create" json:"createdAt" description:"创建时间"`
	//修改时间
	UpdatedAt time.Time `gorm:"column:updated_at" json:"updatedAt,omitempty" description:"更新时间"`

	//终端连接开始时间
	StartTime time.Time `gorm:"column:start_time" json:"startTime,omitempty" description:"终端连接开始时间"`
	//终端连接结束时间
	EndTime time.Time `gorm:"column:end_time" json:"endTime" description:"终端连接结束时间"`
	//集群ID
	ClusterId string `gorm:"type:varchar(50);column:cluster_id;<-:create" json:"clusterId" validate:"required" description:"集群ID"`
	//用户ID
	AccountId string `gorm:"type:varchar(50);column:account_id;<-:create" json:"accountId" validate:"required" description:"所属用户ID"`
	//集群用户
	Account AccountDetail `gorm:"foreignKey:ID;references:AccountId" json:"account" description:"所属用户"`
	//用户名
	AccountName string `gorm:"type:varchar(50);column:account_name" json:"accountName"`
	//命名空间
	Namespace string `gorm:"type:varchar(255);column:namespace;<-:create" json:"namespace" description:"命名空间"`
	//Pod name
	PodName string `gorm:"type:varchar(255);column:pod_name" json:"podName" description:"集群Pod名称"`
	//容器
	Container string `gorm:"type:varchar(255);column:container" json:"container" description:"容器名称"`
	//终端命令和输出记录
	Content datatypes.LongText `gorm:"column:content" json:"content" description:"终端命令和输出记录"`
	//输入命令记录
	Commands datatypes2.JSONMap `gorm:"column:commands" json:"commands" description:"输入命令记录"`
}

// TerminalAuditLogCreate 集群终端审计日志
// 通过web terminal操作日志记录
type TerminalAuditLogCreate struct {
	ID string `gorm:"primarykey;column:id;type:varchar(50)" json:"-" description:"记录ID"`
	//创建时间
	CreatedAt time.Time `gorm:"autoCreateTime;column:created_at;<-:create" json:"-" description:"创建时间"`

	//终端连接开始时间
	StartTime time.Time `gorm:"column:start_time" json:"startTime,omitempty" description:"终端连接开始时间"`
	//终端连接结束时间
	EndTime time.Time `gorm:"column:end_time" json:"endTime" description:"终端连接结束时间"`
	//集群ID
	ClusterId string `gorm:"type:varchar(50);column:cluster_id;<-:create" json:"clusterId" validate:"required" description:"集群ID"`
	//用户ID
	AccountId string `gorm:"type:varchar(50);column:account_id;<-:create" json:"accountId" validate:"required" description:"所属用户ID"`
	//用户名
	AccountName string `gorm:"type:varchar(50);column:account_name" json:"accountName"`
	//命名空间
	Namespace string `gorm:"type:varchar(255);column:namespace;<-:create" json:"namespace" description:"命名空间"`
	//Pod name
	PodName string `gorm:"type:varchar(255);column:pod_name" json:"pod_name" description:"集群Pod名称"`
	//容器
	Container string `gorm:"type:varchar(255);column:container" json:"container" description:"容器名称"`
	//终端命令和输出记录
	Content datatypes.LongText `gorm:"column:content" json:"content" description:"终端命令和输出记录"`
	//输入命令记录
	Commands datatypes2.JSONMap `gorm:"column:commands" json:"commands" description:"输入命令记录"`
}

func (md *TerminalAuditLogCreate) Default(ctx context.Context) {
	md.ID = utils.GenerateDatabaseId()
	md.CreatedAt = time.Now()
}
func (md *TerminalAuditLogCreate) Validate(ctx context.Context) (err error) {
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

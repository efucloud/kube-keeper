package daos

import (
	"github.com/efucloud/common/datatypes"
	"github.com/efucloud/kube-keeper/pkg/models"
	datatypes2 "gorm.io/datatypes"
	"time"

	"gorm.io/gorm"
)

// TerminalAuditLog 集群终端审计日志
// 通过web terminal操作日志记录
type TerminalAuditLog struct {
	//主键
	ID string `gorm:"primarykey;column:id;type:varchar(50)" json:"-" description:"记录ID"`
	//创建时间
	CreatedAt time.Time `gorm:"autoCreateTime;column:created_at;<-:create" json:"-" description:"创建时间"`
	//软删除
	DeletedAt gorm.DeletedAt `gorm:"column:deleted_at" json:"deletedAt,omitempty"`
	//删除状态
	DelFlag string `gorm:"type:varchar(50);column:del_flag;default:active" json:"-" description:"删除状态"`
	//删除者
	DeleterId string `gorm:"type:varchar(50);column:deleter_id" json:"-" description:"删除者"`

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

func (md *TerminalAuditLog) TableName() string {
	return models.TerminalAuditLogTableName
}
func (md *TerminalAuditLog) Indexes() (results map[string][]string) {
	results = make(map[string][]string)
	results["idx_account_id"] = []string{"account_id"}
	results["idx_cluster"] = []string{"cluster_id"}
	results["idx_namespace"] = []string{"namespace"}
	results["idx_pod"] = []string{"pod_name"}
	results["idx_container"] = []string{"container"}
	return
}
func (md *TerminalAuditLog) UniqueIndexes() (results map[string][]string) {
	results = make(map[string][]string)
	return
}

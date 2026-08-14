package daos

import (
	"github.com/efucloud/kube-keeper/pkg/models"
	"gorm.io/gorm"
	"time"
)

// Account 组织中的用户
type Account struct {
	//主键
	ID string `gorm:"primarykey;column:id;type:varchar(50)" json:"-" description:"记录ID"`
	//创建时间
	CreatedAt time.Time `gorm:"autoCreateTime;column:created_at;<-:create" json:"-" description:"创建时间"`
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
	//用户名
	Username string `gorm:"type:varchar(255);column:username" json:"username" validate:"alphanum" description:"用户名"`
	//昵称，如中文名
	Nickname string `gorm:"type:varchar(255);column:nickname" json:"nickname" validate:"max=255" description:"昵称"`
	//工号
	JobNumber string `gorm:"type:varchar(255);column:job_number" json:"jobNumber" description:"工号"`
	//系统角色
	Role string `gorm:"type:varchar(255);column:role;default:none" json:"role" validate:"oneof=admin view edit none" enum:"admin|view|edit|none" description:"系统角色"`
	//是否有效
	Enable bool `gorm:"column:enable;default:true" json:"enable" description:"是否有效"`
	//邮箱
	Email string `gorm:"type:varchar(255);column:email" json:"email" validate:"email" description:"邮箱"`
	//手机号码
	Phone string `gorm:"type:varchar(255);column:phone" json:"phone" validate:"required" description:"电话"`
	//默认语言
	Language string `gorm:"type:varchar(255);column:language" json:"language" validate:"oneof=zh en" enum:"zh|en" description:"默认语言"`
	//头像
	Avatar string `gorm:"type:varchar(1000);column:avatar" json:"avatar" description:"头像"`
}

func (t *Account) Indexes() (results map[string][]string) {
	results = make(map[string][]string)

	return
}
func (t *Account) UniqueIndexes() (results map[string][]string) {
	results = make(map[string][]string)
	results["uniq_idx_username"] = []string{"username", "del_flag"}
	results["uniq_idx_phone"] = []string{"phone", "del_flag"}
	results["uniq_idx_email"] = []string{"email", "del_flag"}
	return
}

func (t *Account) TableName() string {
	return models.AccountTableName
}

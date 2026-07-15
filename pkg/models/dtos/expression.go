package dtos

import (
	"database/sql/driver"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/efucloud/kube-keeper/pkg/utils"
	"gorm.io/gorm"
	"gorm.io/gorm/schema"
)

type Expression struct {
	Mode        string       `json:"mode" enum:"simple|javascript|cel" validate:"oneof=simple javascript cel" yaml:"mode" description:"模式"`
	SimpleItems []SimpleItem `json:"simpleItems,omitempty" validate:"-" yaml:"simpleItems,omitempty" description:"简单匹配表达式"`
	Javascript  *string      `json:"javascript,omitempty" validate:"-" yaml:"javascript,omitempty" description:"脚本匹配表达式，Simple优先，格式: (function(){/*code,返回false|0|f为false，其他为true */  return true|false|0|f})()"`
	Cel         *string      `json:"cel,omitempty" yaml:"cel,omitempty" description:"cel表达式"`
}

func (exp *Expression) Errorf(format string, args ...interface{}) {
}

type SimpleItem struct {
	Name     string      `json:"name" yaml:"name" description:"变量名称"`
	Value    interface{} `json:"value" yaml:"value" validate:"required" description:"待比较的值"`
	Operator string      `json:"operator" yaml:"operator" validate:"assert" description:"比较操作符，提供了接口/api/v1/event/ops获取支持哪些"`
}

func (exp *Expression) Validator() (err error) {
	if len(exp.SimpleItems) == 0 && exp.Javascript == nil && exp.Cel == nil {
		return errors.New("filed simple and javascript is empty, you must set one")
	}
	if exp.SimpleItems != nil {
		for _, item := range exp.SimpleItems {
			if _, exist := utils.AssertFunctions[item.Operator]; !exist {
				return fmt.Errorf("filed operator value: %s is not valid", item.Operator)
			}
			if item.Value == nil {
				return errors.New("filed value is nil")
			}
			if len(item.Name) == 0 {
				return errors.New("filed name is empty")
			}
		}
	}
	return
}

// GormDataType gorm common data type
func (exp Expression) GormDataType() string {
	return "jsonmap"
}

// GormDBDataType gorm db data type
func (Expression) GormDBDataType(db *gorm.DB, field *schema.Field) string {
	switch db.Dialector.Name() {
	case "sqlite":
		return "JSON"
	case "mysql":
		return "json"
	case "postgres":
		return "JSONB"
	case "sqlserver":
		return "NVARCHAR(MAX)"
	}
	return ""
}

// Scan 实现 sql.Scanner 接口，Scan 将 value 扫描至 Jsonb
func (exp *Expression) Scan(value interface{}) error {
	byteValue, ok := value.([]byte)
	if !ok {
		return errors.New(fmt.Sprint("Failed to unmarshal SourceExpression value: ", value))
	}
	err := json.Unmarshal(byteValue, exp)
	return err
}

// Value 实现 driver.Valuer 接口，Value 返回 json value
func (exp Expression) Value() (driver.Value, error) {
	re, err := json.Marshal(exp)
	return re, err
}

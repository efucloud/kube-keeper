package config

import (
	"context"
)

type Config struct {
	Mysql             *MysqlConfig `json:"mysql" yaml:"mysql"`
	Redis             *RedisConfig `json:"redis" yaml:"redis"`
	LogConfig         *LogConfig   `json:"logConfig" yaml:"logConfig"`
	OidcConfig        OidcConfig   `json:"oidcConfig" yaml:"oidcConfig" description:"认证配置"`
	TokenConfig       TokenConfig  `json:"tokenConfig" yaml:"tokenConfig" description:"系统Token配置"`
	ChatConfig        ChatConfig   `json:"chatConfig" yaml:"chatConfig" description:"大模型配置"`
	AdminEmails       []string     `json:"adminEmails" yaml:"adminEmails" description:"管理员邮箱列表"`
	TerminalContainer string       `json:"terminalContainer" yaml:"terminalContainer" description:"终端容器"`
}

type RedisConfig struct {
	// 模式: standalone / sentinel / cluster
	Mode string `json:"mode" yaml:"mode" description:"redis模式: standalone/sentinel/cluster"`
	// 地址列表: standalone 使用第一个，sentinel/cluster 使用全部
	Addresses []string `json:"addresses" yaml:"addresses" description:"地址列表"`
	Username  string   `json:"username" yaml:"username" description:"用户名"`
	Password  string   `json:"password" yaml:"password" description:"密码"`
	// sentinel 主节点名称
	MasterName string `json:"masterName" yaml:"masterName" description:"sentinel主节点名称"`
}
type ChatConfig struct {
	UseTool  bool   `json:"useTool" yaml:"useTool" description:"使用工具"`
	Provider string `json:"provider" yaml:"provider" description:"模型提供商（部署时固定）"`
	Address  string `json:"address" yaml:"address" description:"大模型地址"`
	ApiKey   string `json:"apiKey" yaml:"apiKey" description:"api key"`
	Model    string `json:"model" yaml:"model" description:"模型"`
	Header   string `json:"header" yaml:"header" description:"请求头"`
}

type OidcConfig struct {
	ClientId     string `json:"clientId" yaml:"clientId" description:"客户端ID"`
	ClientSecret string `json:"clientSecret" yaml:"clientSecret" description:"客户端密钥"`
	Issuer       string `json:"issuer" yaml:"issuer" description:"发行者"`
}

type TokenConfig struct {
	Issuer        string `json:"issuer" yaml:"issuer" description:"系统Token签发者"`
	ExpireSeconds int64  `json:"expireSeconds" yaml:"expireSeconds" description:"系统Token有效期（秒）"`
}
type LogConfig struct {
	Level string `json:"level" yaml:"level" description:"日志级别"`
	//Filename is the file to write logs to.  Backup log files will be retained
	//in the same directory.  It uses <processname>-lumberjack.log in
	//os.TempDir() if empty.
	Filename string `json:"filename" yaml:"filename"`

	//MaxSize is the maximum size in megabytes of the log file before it gets
	//rotated. It defaults to 100 megabytes.
	MaxSize int `json:"maxsize" yaml:"maxsize"`

	//MaxAge is the maximum number of days to retain old log files based on the
	//timestamp encoded in their filename.  Note that a day is defined as 24
	//hours and may not exactly correspond to calendar days due to daylight
	//savings, leap seconds, etc. The default is not to remove old log files
	//based on age.
	MaxAge int `json:"maxage" yaml:"maxage"`

	//MaxBackups is the maximum number of old log files to retain.  The default
	//is to retain all old log files (though MaxAge may still cause them to get
	//deleted.)
	MaxBackups int `json:"maxbackups" yaml:"maxbackups"`

	//LocalTime determines if the time used for formatting the timestamps in
	//backup files is the computer's local time.  The default is to use UTC
	//time.
	LocalTime bool `json:"localtime" yaml:"localtime"`

	//Compress determines if the rotated log files should be compressed
	//using gzip. The default is not to perform compression.
	Compress   bool `json:"compress" yaml:"compress"`
	Production bool `json:"production" yaml:"production"`
}

type RabbitMQConfig struct {
	Address string `json:"address" yaml:"address" description:"地址"`
}
type RocketMQConfig struct {
	Address []string `json:"address" yaml:"address" description:"地址"`
}
type KafkaConfig struct {
	Address []string `json:"address" yaml:"address" description:"地址"`
}
type PulsarConfig struct {
	Address []string `json:"address" yaml:"address" description:"地址"`
}

type MysqlConfig struct {
	Host     string `json:"host" yaml:"host"`
	User     string `json:"user" yaml:"user"`
	Password string `json:"password" yaml:"password"`
	Dbname   string `json:"dbname" yaml:"dbname"`
	//utf8
	Charset string `json:"charset" yaml:"charset"`
}

func (m *MysqlConfig) Default(ctx context.Context) {
	if len(m.Charset) == 0 {
		m.Charset = "utf8mb4"
	}
}

func (r *RedisConfig) Default(ctx context.Context) {
	if len(r.Mode) == 0 {
		r.Mode = "standalone"
	}
}

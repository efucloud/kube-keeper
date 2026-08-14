package config

import (
	"context"
	"github.com/glebarez/sqlite"
	mysqldriver "github.com/go-sql-driver/mysql"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
	"gopkg.in/natefinch/lumberjack.v2"
	gormmysql "gorm.io/driver/mysql"
	"gorm.io/gorm"
	"os"
	"strings"
	"time"
)

// createDBConnection  create database connection
func createDBConnection() (err error) {
	ctx := context.Background()
	if ApplicationConfig.Mysql != nil {
		Logger.Info("database is Mysql")
		ApplicationConfig.Mysql.Default(ctx)
		c := ApplicationConfig.Mysql
		loc, locErr := time.LoadLocation(c.Loc)
		if locErr != nil {
			Logger.Warnf("invalid mysql location %q, fallback to Local: %v", c.Loc, locErr)
			loc = time.Local
		}
		dsnConfig := mysqldriver.Config{
			User:      c.User,
			Passwd:    c.Password,
			Net:       "tcp",
			Addr:      c.Host,
			DBName:    c.Dbname,
			ParseTime: true,
			Loc:       loc,
			Params: map[string]string{
				"charset": c.Charset,
			},
			AllowNativePasswords: true,
		}
		dsn := dsnConfig.FormatDSN()
		Logger.Infof("database connection: %s", maskMySQLDSN(dsn))
		DBConnect, err = gorm.Open(gormmysql.New(gormmysql.Config{
			DSN:                       dsn,
			DefaultStringSize:         c.DefaultStringSize,
			DisableDatetimePrecision:  c.DisableDatetimePrecision,
			DontSupportRenameIndex:    c.DontSupportRenameIndex,
			DontSupportRenameColumn:   c.DontSupportRenameColumn,
			SkipInitializeWithVersion: c.SkipInitializeWithVersion,
		}), &gorm.Config{
			NowFunc: func() time.Time {
				return time.Now().Local()
			},
		})
		if err == nil {
			sqlDB, _ := DBConnect.DB()
			//SetMaxIdleConns 设置空闲连接池中连接的最大数量
			sqlDB.SetMaxIdleConns(1)
			//SetMaxOpenConns 设置打开数据库连接的最大数量。
			sqlDB.SetMaxOpenConns(100)
			//SetConnMaxLifetime 设置了连接可复用的最大时间。
			sqlDB.SetConnMaxLifetime(5 * time.Minute)
		} else {
			Logger.Errorf("database connect failed, err: %s", err.Error())
		}
	} else {
		Logger.Info("database is sqlite")
		DBConnect, err = gorm.Open(sqlite.Open("eauth.db"), &gorm.Config{
			NowFunc: func() time.Time {
				return time.Now().Local()
			},
		})
	}
	if err != nil {
		Logger.Errorf("create database connect failed, err: %s", err.Error())
	}
	return err
}
func logConfig(conf *LogConfig) {
	writeSyncer := zapcore.AddSync(&lumberjack.Logger{
		Filename:   conf.Filename,
		MaxSize:    conf.MaxSize,
		MaxBackups: conf.MaxBackups,
		MaxAge:     conf.MaxAge,
		Compress:   conf.Compress,
	})
	var encoderConfig zapcore.EncoderConfig
	if conf.Production {
		encoderConfig = zap.NewProductionEncoderConfig()
	} else {
		encoderConfig = zap.NewDevelopmentEncoderConfig()
	}
	encoderConfig.EncodeTime = zapcore.ISO8601TimeEncoder
	encoderConfig.EncodeLevel = zapcore.CapitalLevelEncoder
	encoder := zapcore.NewConsoleEncoder(encoderConfig)
	var level zapcore.Level
	switch conf.Level {
	case "info":
		level = zapcore.InfoLevel
	case "debug":
		level = zapcore.DebugLevel
	default:
		level = zapcore.InfoLevel
	}
	core := zapcore.NewCore(encoder, zapcore.NewMultiWriteSyncer(writeSyncer, zapcore.AddSync(os.Stdout)), level)
	logger := zap.New(core, zap.AddCaller())
	Logger = logger.Sugar()

}

func (c *Config) Init() {
	if c.LogConfig == nil {
		c.LogConfig = new(LogConfig)
		c.LogConfig.Filename = "./log/kube-keeper.log"
		c.LogConfig.MaxAge = 30
		c.LogConfig.MaxSize = 1
		c.LogConfig.MaxBackups = 10
		c.LogConfig.Compress = false
	}
	logConfig(c.LogConfig)
	c.OidcConfig.Issuer = strings.TrimSuffix(c.OidcConfig.Issuer, "/")
	if err := createDBConnection(); err != nil {
		Logger.Fatalf("create database connect failed, err: %s", err.Error())
	}
	if err := createRedisConnection(); err != nil {
		Logger.Warnf("create redis connect failed, cache disabled, err: %s", err.Error())
	}

}
func GetLangFromCtx(ctx context.Context) (lang string) {
	lang = "zh"
	lan := ctx.Value(RequestLanguage)
	if lan != nil {
		lang = lan.(string)
	}
	return lang
}
func GetOperatorFromCtx(ctx context.Context) (operator string) {
	operator = "unknown"
	requesterId := ctx.Value(RequestUserId)
	if requesterId != nil {
		operator = requesterId.(string)
	}
	return operator
}

func maskMySQLDSN(dsn string) string {
	if dsn == "" {
		return ""
	}
	atIdx := strings.Index(dsn, "@")
	if atIdx <= 0 {
		return dsn
	}
	cred := dsn[:atIdx]
	colonIdx := strings.Index(cred, ":")
	if colonIdx < 0 {
		return dsn
	}
	maskedCred := cred[:colonIdx+1] + "******"
	return maskedCred + dsn[atIdx:]
}

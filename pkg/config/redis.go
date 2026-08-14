package config

import (
	"context"
	"fmt"
	"strings"
	"time"

	redis "github.com/redis/go-redis/v9"
)

const (
	redisDefaultDB           = 0
	redisDefaultDialTimeout  = 3 * time.Second
	redisDefaultReadTimeout  = 3 * time.Second
	redisDefaultWriteTimeout = 3 * time.Second
	redisDefaultPoolSize     = 20
	redisDefaultMinIdleConns = 0
	redisDefaultKeyPrefix    = "kube-keeper"
	redisDefaultTTL          = 5 * time.Minute
)

func createRedisConnection() (err error) {
	if ApplicationConfig == nil || ApplicationConfig.Redis == nil {
		Logger.Info("redis not configured, cache disabled")
		return nil
	}

	ctx := context.Background()
	c := ApplicationConfig.Redis
	c.Default(ctx)

	mode := strings.ToLower(strings.TrimSpace(c.Mode))
	switch mode {
	case "standalone", "single":
		if len(c.Addresses) == 0 {
			return fmt.Errorf("redis standalone mode requires addresses with one endpoint")
		}
		address := strings.TrimSpace(c.Addresses[0])
		if address == "" {
			return fmt.Errorf("redis standalone mode requires non-empty addresses[0]")
		}
		RedisClient = redis.NewClient(&redis.Options{
			Addr:         address,
			Username:     c.Username,
			Password:     c.Password,
			DB:           redisDefaultDB,
			DialTimeout:  redisDefaultDialTimeout,
			ReadTimeout:  redisDefaultReadTimeout,
			WriteTimeout: redisDefaultWriteTimeout,
			PoolSize:     redisDefaultPoolSize,
			MinIdleConns: redisDefaultMinIdleConns,
		})
	case "sentinel":
		if len(c.Addresses) == 0 {
			return fmt.Errorf("redis sentinel mode requires addresses")
		}
		if strings.TrimSpace(c.MasterName) == "" {
			return fmt.Errorf("redis sentinel mode requires masterName")
		}
		RedisClient = redis.NewFailoverClient(&redis.FailoverOptions{
			MasterName:       c.MasterName,
			SentinelAddrs:    c.Addresses,
			SentinelUsername: c.Username,
			SentinelPassword: c.Password,
			Username:         c.Username,
			Password:         c.Password,
			DB:               redisDefaultDB,
			DialTimeout:      redisDefaultDialTimeout,
			ReadTimeout:      redisDefaultReadTimeout,
			WriteTimeout:     redisDefaultWriteTimeout,
			PoolSize:         redisDefaultPoolSize,
			MinIdleConns:     redisDefaultMinIdleConns,
		})
	case "cluster":
		if len(c.Addresses) == 0 {
			return fmt.Errorf("redis cluster mode requires addresses")
		}
		RedisClient = redis.NewClusterClient(&redis.ClusterOptions{
			Addrs:        c.Addresses,
			Username:     c.Username,
			Password:     c.Password,
			DialTimeout:  redisDefaultDialTimeout,
			ReadTimeout:  redisDefaultReadTimeout,
			WriteTimeout: redisDefaultWriteTimeout,
			PoolSize:     redisDefaultPoolSize,
			MinIdleConns: redisDefaultMinIdleConns,
		})
	default:
		return fmt.Errorf("unsupported redis mode: %s", c.Mode)
	}

	if RedisClient == nil {
		return fmt.Errorf("redis client init failed")
	}
	if pingErr := RedisClient.Ping(ctx).Err(); pingErr != nil {
		RedisClient = nil
		return pingErr
	}
	Logger.Infof("redis connected, mode: %s", mode)
	return nil
}

func CacheKey(parts ...string) string {
	prefix := redisDefaultKeyPrefix
	items := make([]string, 0, len(parts)+1)
	items = append(items, prefix)
	for _, part := range parts {
		trimmed := strings.TrimSpace(part)
		if trimmed != "" {
			items = append(items, trimmed)
		}
	}
	return strings.Join(items, ":")
}

func DefaultCacheTTL() time.Duration {
	return redisDefaultTTL
}

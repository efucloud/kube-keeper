package services

import (
	"context"
	"encoding/json"
	"errors"
	"time"

	config2 "github.com/efucloud/kube-keeper/pkg/config"
	redis "github.com/redis/go-redis/v9"
)

func getJSONCache(ctx context.Context, key string, out interface{}) (hit bool) {
	if config2.RedisClient == nil {
		config2.Logger.Debugf("cache skip(redis disabled), key=%s", key)
		return false
	}
	raw, err := config2.RedisClient.Get(ctx, key).Result()
	if err != nil {
		if !errors.Is(err, redis.Nil) {
			config2.Logger.Warnf("redis get key %s failed: %v", key, err)
		} else {
			config2.Logger.Debugf("cache miss, key=%s", key)
		}
		return false
	}
	if unmarshalErr := json.Unmarshal([]byte(raw), out); unmarshalErr != nil {
		config2.Logger.Warnf("redis unmarshal key %s failed: %v", key, unmarshalErr)
		return false
	}
	config2.Logger.Debugf("cache hit, key=%s", key)
	return true
}

func setJSONCache(ctx context.Context, key string, value interface{}, ttl time.Duration) {
	if config2.RedisClient == nil {
		return
	}
	data, err := json.Marshal(value)
	if err != nil {
		config2.Logger.Warnf("redis marshal key %s failed: %v", key, err)
		return
	}
	if err = config2.RedisClient.Set(ctx, key, data, ttl).Err(); err != nil {
		config2.Logger.Warnf("redis set key %s failed: %v", key, err)
		return
	}
	config2.Logger.Debugf("cache set, key=%s, ttl=%s", key, ttl.String())
}

func deleteCacheKeys(ctx context.Context, keys ...string) {
	if config2.RedisClient == nil || len(keys) == 0 {
		return
	}
	if err := config2.RedisClient.Del(ctx, keys...).Err(); err != nil {
		config2.Logger.Warnf("redis del keys %v failed: %v", keys, err)
		return
	}
	config2.Logger.Debugf("cache del, keys=%v", keys)
}

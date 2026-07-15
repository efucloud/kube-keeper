package mcp

import (
	"github.com/sashabaranov/go-openai"
	"sync"
	"time"
)

type Session struct {
	Messages []openai.ChatCompletionMessage
	Expires  time.Time
}

var (
	sessionStore = make(map[string]*Session)
	storeMutex   = sync.RWMutex{}
)

func SetSession(sessionId string, messages []openai.ChatCompletionMessage, ttl time.Duration) {
	storeMutex.Lock()
	defer storeMutex.Unlock()
	sessionStore[sessionId] = &Session{
		Messages: messages,
		Expires:  time.Now().Add(ttl),
	}
}

// GetOrCreateSession 获取会话；若不存在或已过期，则用 systemPrompt 创建新会话。
// 返回: 消息列表, 是否为新会话
func GetOrCreateSession(sessionId string, systemPrompt string) ([]openai.ChatCompletionMessage, bool) {
	storeMutex.RLock()
	sess, exists := sessionStore[sessionId]
	if exists && time.Now().Before(sess.Expires) {
		messages := make([]openai.ChatCompletionMessage, len(sess.Messages))
		copy(messages, sess.Messages)
		storeMutex.RUnlock()
		return messages, false
	}
	storeMutex.RUnlock()

	// 不存在或已过期：创建新会话
	storeMutex.Lock()
	defer storeMutex.Unlock()

	// 双重检查（防止并发重复创建）
	if sess, ok := sessionStore[sessionId]; ok && time.Now().Before(sess.Expires) {
		messages := make([]openai.ChatCompletionMessage, len(sess.Messages))
		copy(messages, sess.Messages)
		return messages, false
	}

	// 真正创建
	newMessages := []openai.ChatCompletionMessage{
		{Role: "system", Content: systemPrompt},
	}
	sessionStore[sessionId] = &Session{
		Messages: newMessages,
		Expires:  time.Now().Add(30 * time.Minute), // 默认 TTL，可配置
	}
	return newMessages, true
}
func GetSession(sessionId string) ([]openai.ChatCompletionMessage, bool) {
	storeMutex.RLock()
	defer storeMutex.RUnlock()

	sess, ok := sessionStore[sessionId]
	if !ok || time.Now().After(sess.Expires) {
		return nil, false
	}
	return sess.Messages, true
}

func CleanupExpiredSessions() {
	ticker := time.NewTicker(5 * time.Minute)
	go func() {
		for range ticker.C {
			storeMutex.Lock()
			for id, sess := range sessionStore {
				if time.Now().After(sess.Expires) {
					delete(sessionStore, id)
				}
			}
			storeMutex.Unlock()
		}
	}()
}

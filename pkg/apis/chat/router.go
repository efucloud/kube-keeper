package chat

import (
	"context"
)

type Router struct {
	// AgentEngine 是唯一执行引擎；路由层只保留一次分发职责。
	AgentEngine Engine
}

func NewRouter() *Router {
	return &Router{
		AgentEngine: NewADKAgentEngine(),
	}
}

func (r *Router) Route(ctx context.Context, req ChatRequest) <-chan StreamEvent {
	return r.AgentEngine.Run(ctx, req)
}

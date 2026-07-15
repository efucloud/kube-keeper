package chat

import "context"

type Engine interface {
	Run(ctx context.Context, req ChatRequest) <-chan StreamEvent
}

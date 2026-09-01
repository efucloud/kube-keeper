package chat

import (
	"context"
	"net/http/httptest"
	"strings"
	"testing"
	"time"

	config2 "github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/emicklei/go-restful/v3"
	"github.com/gorilla/websocket"
)

type recordingChatEngine struct {
	requests chan ChatRequest
	events   []StreamEvent
}

type cancelAwareChatEngine struct {
	started  chan struct{}
	canceled chan struct{}
}

func (e *cancelAwareChatEngine) Run(ctx context.Context, _ ChatRequest) <-chan StreamEvent {
	stream := make(chan StreamEvent)
	close(e.started)
	go func() {
		<-ctx.Done()
		close(e.canceled)
		close(stream)
	}()
	return stream
}

func (e *recordingChatEngine) Run(_ context.Context, req ChatRequest) <-chan StreamEvent {
	e.requests <- req
	stream := make(chan StreamEvent, len(e.events))
	for _, event := range e.events {
		stream <- event
	}
	close(stream)
	return stream
}

func TestAIChatWebSocketStreamsEvents(t *testing.T) {
	previousConfig := config2.ApplicationConfig
	config2.ApplicationConfig = &config2.Config{}
	t.Cleanup(func() { config2.ApplicationConfig = previousConfig })

	engine := &recordingChatEngine{
		requests: make(chan ChatRequest, 1),
		events: []StreamEvent{{
			RequestId: "request-1",
			Type:      "run_complete",
			Payload:   map[string]any{"status": "success"},
		}},
	}
	resource := &AiChatResource{Router: &Router{AgentEngine: engine}}
	container := restful.NewContainer()
	service := new(restful.WebService)
	service.Route(service.GET(config2.ClusterNamespaceWebsocketAPIPrefix + "/chat").To(resource.aiChatWebSocket))
	container.Add(service)
	server := httptest.NewServer(container)
	t.Cleanup(server.Close)

	webSocketURL := "ws" + strings.TrimPrefix(server.URL, "http") +
		"/api/ws/cluster/cluster-a/namespace/default/chat?access_token=token-a"
	conn, _, err := websocket.DefaultDialer.Dial(webSocketURL, nil)
	if err != nil {
		t.Fatalf("dial WebSocket: %v", err)
	}
	defer conn.Close()

	if err := conn.WriteJSON(dtos.ChatHTTPPayload{
		Message:   "list pods",
		RequestId: "request-1",
	}); err != nil {
		t.Fatalf("write request: %v", err)
	}

	var event StreamEvent
	if err := conn.ReadJSON(&event); err != nil {
		t.Fatalf("read event: %v", err)
	}
	if event.Type != "run_complete" || event.RequestId != "request-1" {
		t.Fatalf("unexpected event: %#v", event)
	}

	select {
	case request := <-engine.requests:
		if request.Question != "list pods" {
			t.Fatalf("unexpected question: %q", request.Question)
		}
		if request.Context.Cluster != "cluster-a" || request.Context.Namespace != "default" {
			t.Fatalf("unexpected context: %#v", request.Context)
		}
		if request.AuthToken != "token-a" {
			t.Fatalf("unexpected auth token: %q", request.AuthToken)
		}
	case <-time.After(time.Second):
		t.Fatal("engine did not receive request")
	}
}

func TestAIChatWebSocketCancelStopsEngine(t *testing.T) {
	previousConfig := config2.ApplicationConfig
	config2.ApplicationConfig = &config2.Config{}
	t.Cleanup(func() { config2.ApplicationConfig = previousConfig })

	engine := &cancelAwareChatEngine{
		started:  make(chan struct{}),
		canceled: make(chan struct{}),
	}
	resource := &AiChatResource{Router: &Router{AgentEngine: engine}}
	container := restful.NewContainer()
	service := new(restful.WebService)
	service.Route(service.GET(config2.ClusterWebsocketAPIPrefix + "/chat").To(resource.aiChatWebSocket))
	container.Add(service)
	server := httptest.NewServer(container)
	t.Cleanup(server.Close)

	webSocketURL := "ws" + strings.TrimPrefix(server.URL, "http") +
		"/api/ws/cluster/cluster-a/chat?access_token=token-a"
	conn, _, err := websocket.DefaultDialer.Dial(webSocketURL, nil)
	if err != nil {
		t.Fatalf("dial WebSocket: %v", err)
	}
	if err := conn.WriteJSON(dtos.ChatHTTPPayload{Message: "list pods"}); err != nil {
		t.Fatalf("write request: %v", err)
	}

	select {
	case <-engine.started:
	case <-time.After(time.Second):
		t.Fatal("engine did not start")
	}
	if err := conn.WriteControl(
		websocket.CloseMessage,
		websocket.FormatCloseMessage(websocket.CloseNormalClosure, "cancel"),
		time.Now().Add(time.Second),
	); err != nil {
		t.Fatalf("close WebSocket: %v", err)
	}
	_ = conn.Close()

	select {
	case <-engine.canceled:
	case <-time.After(time.Second):
		t.Fatal("engine context was not canceled")
	}
}

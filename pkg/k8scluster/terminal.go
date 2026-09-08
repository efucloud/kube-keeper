package k8scluster

import (
	"encoding/json"
	"fmt"
	"github.com/efucloud/kube-keeper/pkg/config"
	"github.com/gorilla/websocket"
	"k8s.io/client-go/tools/remotecommand"
	"net/http"
	"sync"
	"time"
)

const (
	writeWait         = 10 * time.Second
	maxMessageSize    = 8192
	pongWait          = 60 * time.Second
	pingPeriod        = (pongWait * 9) / 10
	closeGracePeriod  = 10 * time.Second
	EndOfTransmission = "\u0004"
)

// TerminalMessage is the messaging protocol between ShellController and TerminalSession.
type TerminalMessage struct {
	Operation string `json:"operation"`
	Data      string `json:"data"`
	Rows      uint16 `json:"rows"`
	Cols      uint16 `json:"cols"`
}

var terminalUpgrader = websocket.Upgrader{
	HandshakeTimeout: time.Second * 2,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

// TerminalSession implements PtyHandler
type TerminalSession struct {
	wsConn   *websocket.Conn
	sizeChan chan remotecommand.TerminalSize
	doneChan chan struct{}
	mu       sync.Mutex // protect write operations
}

// NewTerminalSessionWs create TerminalSession
func NewTerminalSessionWs(conn *websocket.Conn) *TerminalSession {
	return &TerminalSession{
		wsConn:   conn,
		sizeChan: make(chan remotecommand.TerminalSize),
		doneChan: make(chan struct{}),
	}
}

// NewTerminalSession create TerminalSession
func NewTerminalSession(w http.ResponseWriter, r *http.Request, responseHeader http.Header) (*TerminalSession, error) {
	conn, err := terminalUpgrader.Upgrade(w, r, responseHeader)
	if err != nil {
		return nil, err
	}
	session := &TerminalSession{
		wsConn:   conn,
		sizeChan: make(chan remotecommand.TerminalSize),
		doneChan: make(chan struct{}),
	}
	return session, nil
}

// startPinger sends ping messages periodically
func (t *TerminalSession) startPinger() {
	ticker := time.NewTicker(pingPeriod)
	defer ticker.Stop()

	for {
		select {
		case <-ticker.C:
			t.mu.Lock()
			err := t.wsConn.WriteControl(websocket.PingMessage, []byte{}, time.Now().Add(writeWait))
			t.mu.Unlock()
			if err != nil {
				config.Logger.Errorf("send ping failed: %v", err)
				return
			}
		case <-t.doneChan:
			return
		}
	}
}

// pongHandler resets read deadline on pong
func (t *TerminalSession) pongHandler(appData string) error {
	_ = t.wsConn.SetReadDeadline(time.Now().Add(pongWait))
	return nil
}

// setupWebsocketHandlers sets up ping/pong and read limit
func (t *TerminalSession) setupWebsocketHandlers() {
	t.wsConn.SetReadLimit(maxMessageSize)
	t.wsConn.SetReadDeadline(time.Now().Add(pongWait))
	t.wsConn.SetPongHandler(t.pongHandler)
}

// Done must call Done() before connection close
func (t *TerminalSession) Done() {
	close(t.doneChan)
}

func (t *TerminalSession) Next() *remotecommand.TerminalSize {
	select {
	case size := <-t.sizeChan:
		return &size
	case <-t.doneChan:
		return nil
	}
}
func (t *TerminalSession) Read(p []byte) (int, error) {
	once := sync.Once{}
	once.Do(func() {
		t.setupWebsocketHandlers()
		go t.startPinger()
	})

	_, message, err := t.wsConn.ReadMessage()
	if err != nil {
		if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
			config.Logger.Errorf("read message err: %v", err)
		}
		return copy(p, EndOfTransmission), err
	}

	var msg TerminalMessage
	if err := json.Unmarshal(message, &msg); err != nil {
		config.Logger.Errorf("read parse message err: %v", err)
		return copy(p, EndOfTransmission), err
	}

	switch msg.Operation {
	case "stdin":
		return copy(p, msg.Data), nil
	case "resize":
		t.sizeChan <- remotecommand.TerminalSize{Width: msg.Cols, Height: msg.Rows}
		return 0, nil

	case "ping":
		return 0, nil

	default:
		config.Logger.Errorf("unknown message type '%s'", msg.Operation)
		return copy(p, EndOfTransmission), fmt.Errorf("unknown message type '%s'", msg.Operation)
	}
}
func (t *TerminalSession) Write(p []byte) (int, error) {
	t.mu.Lock()
	defer t.mu.Unlock()

	msg, err := json.Marshal(TerminalMessage{
		Operation: "stdout",
		Data:      string(p),
	})
	if err != nil {
		config.Logger.Error("write parse message err: %v", err)
		return 0, err
	}
	if err = t.wsConn.WriteMessage(websocket.TextMessage, msg); err != nil {
		config.Logger.Errorf("write message err: %v", err)
		return 0, err
	}
	return len(p), nil
}

func (t *TerminalSession) WriteString(s string) (int, error) {
	t.mu.Lock()
	defer t.mu.Unlock()

	msg, err := json.Marshal(TerminalMessage{
		Operation: "stdout",
		Data:      s,
	})
	if err != nil {
		config.Logger.Error("write parse message err: %v", err)
		return 0, err
	}

	if err = t.wsConn.WriteMessage(websocket.TextMessage, msg); err != nil {
		config.Logger.Error("write message err: %v", err)
		return 0, err
	}
	return len(s), nil
}

func (t *TerminalSession) Close() error {
	return t.wsConn.Close()
}

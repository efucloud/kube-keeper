package k8scluster

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"github.com/efucloud/common/datatypes"
	"github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/efucloud/kube-keeper/pkg/repositories"
	"github.com/gorilla/websocket"
	"k8s.io/client-go/tools/remotecommand"
	"net/http"
	"regexp"
	"strings"
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

	accountId   string
	accountName string
	clusterId   string
	namespace   string
	pod         string
	container   string
	startTime   time.Time
	output      string
	commands    map[string]interface{}
	cmdBuffer   bytes.Buffer
	writeDb     bool
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
func NewTerminalSession(w http.ResponseWriter, r *http.Request, responseHeader http.Header, auditInfo dtos.TerminalAuditLogDetail) (*TerminalSession, error) {
	conn, err := terminalUpgrader.Upgrade(w, r, responseHeader)
	if err != nil {
		return nil, err
	}
	session := &TerminalSession{
		wsConn:      conn,
		sizeChan:    make(chan remotecommand.TerminalSize),
		doneChan:    make(chan struct{}),
		startTime:   time.Now(),
		clusterId:   auditInfo.ClusterId,
		namespace:   auditInfo.Namespace,
		accountId:   auditInfo.AccountId,
		accountName: auditInfo.AccountName,
		pod:         auditInfo.PodName,
		container:   auditInfo.Container,
		commands:    make(map[string]interface{}),
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

func (t *TerminalSession) UpdateContainer(container string) {
	t.container = container
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
		if len(t.output) > 0 && !t.writeDb {
			t.saveAuditLog()
		}
		t.writeDb = true
		return copy(p, EndOfTransmission), err
	}

	var msg TerminalMessage
	if err := json.Unmarshal(message, &msg); err != nil {
		config.Logger.Errorf("read parse message err: %v", err)
		return copy(p, EndOfTransmission), err
	}

	switch msg.Operation {
	case "stdin":
		n := copy(p, msg.Data)
		t.cmdBuffer.Write([]byte(msg.Data))

		// Only consider command complete if message ends with \n or \r
		if strings.HasSuffix(msg.Data, "\n") || strings.HasSuffix(msg.Data, "\r") {
			rawStr := t.cmdBuffer.String()
			cleaned := cleanInput(rawStr)

			// Check if the cleaned input logically ends a command
			// i.e., does NOT end with an odd number of backslashes
			if !endsWithOddBackslashes(cleaned) {
				// Command is complete
				processed := mergeContinuationLines(cleaned)
				lines := strings.Split(processed, "\n")
				for _, line := range lines {
					line = strings.TrimSpace(line)
					if line != "" {
						t.commands[time.Now().Format(time.DateTime)] = line
					}
				}
				t.cmdBuffer.Reset()
			}
			// else: it's a continuation line, keep buffer for next input
		}
		return n, nil
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
	t.output += string(p)

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
	t.output += s
	return len(s), nil
}

func (t *TerminalSession) saveAuditLog() {
	repo := repositories.TerminalAuditLogRepository{DB: config.DBConnect}
	var audit dtos.TerminalAuditLogCreate
	audit.StartTime = t.startTime
	audit.EndTime = time.Now()
	audit.AccountName = t.accountName
	audit.AccountId = t.accountId
	audit.ClusterId = t.clusterId
	audit.Namespace = t.namespace
	audit.PodName = t.pod
	audit.Container = t.container
	audit.Content = datatypes.LongText(t.output)
	audit.Commands = t.commands
	audit.Default(context.Background())
	_, _ = repo.AddTerminalAuditLog(context.Background(), audit)
}

func (t *TerminalSession) Close() error {
	if len(t.output) > 0 && !t.writeDb {
		t.saveAuditLog()
		t.writeDb = true
	}
	return t.wsConn.Close()
}

// cleanInput removes ANSI escape codes, backspaces, and other non-printable control characters
// but preserves newlines and printable ASCII + UTF-8
func cleanInput(input string) string {
	// Remove ANSI escape sequences
	ansi := regexp.MustCompile(`\x1b\[[0-9;]*[a-zA-Z]`)
	input = ansi.ReplaceAllString(input, "")

	var result []rune
	for _, r := range input {
		switch r {
		case '\b', '\x7f': // ← 同时处理 Backspace (\x08) 和 DEL (\x7f)
			if len(result) > 0 {
				result = result[:len(result)-1]
			}
		case '\n', '\r', '\t':
			result = append(result, r)
		default:
			if r >= 32 { // printable characters
				result = append(result, r)
			}
			// else: drop other control chars (e.g., Ctrl+C \x03, etc.)
		}
	}
	return string(result)
}

func mergeContinuationLines(s string) string {
	// Normalize line endings to \n
	s = strings.ReplaceAll(s, "\r\n", "\n")
	s = strings.ReplaceAll(s, "\r", "\n")

	lines := strings.Split(s, "\n")
	if len(lines) == 0 {
		return ""
	}

	var merged []string
	i := 0
	for i < len(lines) {
		line := lines[i]
		// Remove trailing \r (just in case)
		line = strings.TrimRight(line, "\r")

		// Skip empty lines at the end
		if line == "" && i == len(lines)-1 {
			i++
			continue
		}

		// Check for line continuation: ends with odd number of \
		if len(line) > 0 && line[len(line)-1] == '\\' {
			// Count trailing backslashes
			count := 0
			for j := len(line) - 1; j >= 0 && line[j] == '\\'; j-- {
				count++
			}
			if count%2 == 1 {
				// This line continues
				current := strings.TrimSuffix(line, "\\")
				i++
				for i < len(lines) {
					next := strings.TrimRight(lines[i], "\r")
					if next == "" {
						i++
						continue // skip blank lines in between
					}
					current += " " + next
					// Check if next also continues
					if len(next) > 0 && next[len(next)-1] == '\\' {
						count = 0
						for j := len(next) - 1; j >= 0 && next[j] == '\\'; j-- {
							count++
						}
						if count%2 == 1 {
							current = strings.TrimSuffix(current, "\\")
							i++
							continue
						}
					}
					break
				}
				merged = append(merged, current)
			} else {
				merged = append(merged, line)
			}
		} else {
			if line != "" || len(merged) > 0 {
				merged = append(merged, line)
			}
		}
		i++
	}

	return strings.Join(merged, "\n")
}
func endsWithOddBackslashes(s string) bool {
	s = strings.TrimRight(s, "\r\n")
	if len(s) == 0 {
		return false
	}
	count := 0
	for i := len(s) - 1; i >= 0 && s[i] == '\\'; i-- {
		count++
	}
	return count%2 == 1
}

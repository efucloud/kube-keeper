package chat

import (
	"context"
	"sync"
	"time"

	"github.com/efucloud/kube-keeper/pkg/config"
	"google.golang.org/adk/session"
)

const (
	adkSessionTTL           = 2 * time.Hour
	adkSessionPruneInterval = 10 * time.Minute

	visibleSessionPruneInterval = 10 * time.Minute
)

type reclaimableSessionService struct {
	base          session.Service
	appName       string
	ttl           time.Duration
	pruneInterval time.Duration
	startOnce     sync.Once
}

var visibleSessionJanitorOnce sync.Once

func newReclaimableSessionService(base session.Service, appName string, ttl, pruneInterval time.Duration) session.Service {
	svc := &reclaimableSessionService{
		base:          base,
		appName:       appName,
		ttl:           ttl,
		pruneInterval: pruneInterval,
	}
	svc.startJanitor()
	return svc
}

func (s *reclaimableSessionService) Create(ctx context.Context, req *session.CreateRequest) (*session.CreateResponse, error) {
	return s.base.Create(ctx, req)
}

func (s *reclaimableSessionService) Get(ctx context.Context, req *session.GetRequest) (*session.GetResponse, error) {
	return s.base.Get(ctx, req)
}

func (s *reclaimableSessionService) List(ctx context.Context, req *session.ListRequest) (*session.ListResponse, error) {
	return s.base.List(ctx, req)
}

func (s *reclaimableSessionService) Delete(ctx context.Context, req *session.DeleteRequest) error {
	if req != nil {
		deleteRollingSummary(req.SessionID)
	}
	return s.base.Delete(ctx, req)
}

func (s *reclaimableSessionService) AppendEvent(ctx context.Context, curSession session.Session, event *session.Event) error {
	return s.base.AppendEvent(ctx, curSession, event)
}

func (s *reclaimableSessionService) startJanitor() {
	s.startOnce.Do(func() {
		go func() {
			ticker := time.NewTicker(s.pruneInterval)
			defer ticker.Stop()
			for now := range ticker.C {
				s.pruneExpiredSessions(context.Background(), now)
			}
		}()
	})
}

func (s *reclaimableSessionService) pruneExpiredSessions(ctx context.Context, now time.Time) {
	resp, err := s.base.List(ctx, &session.ListRequest{
		AppName: s.appName,
	})
	if err != nil {
		if config.Logger != nil {
			config.Logger.Warnf("failed to list chat sessions for cleanup, appName: %s, error: %v", s.appName, err)
		}
		return
	}

	for _, item := range resp.Sessions {
		if item == nil {
			continue
		}
		if now.Sub(item.LastUpdateTime()) <= s.ttl {
			continue
		}
		if err := s.Delete(ctx, &session.DeleteRequest{
			AppName:   item.AppName(),
			UserID:    item.UserID(),
			SessionID: item.ID(),
		}); err != nil && config.Logger != nil {
			config.Logger.Warnf("failed to delete expired chat session, sessionId: %s, error: %v", item.ID(), err)
		}
	}
}

func startVisibleSessionJanitor() {
	visibleSessionJanitorOnce.Do(func() {
		go func() {
			ticker := time.NewTicker(visibleSessionPruneInterval)
			defer ticker.Stop()
			for now := range ticker.C {
				pruneVisibleSessions(now)
			}
		}()
	})
}

func pruneVisibleSessions(now time.Time) {
	sessionStore.mu.Lock()
	defer sessionStore.mu.Unlock()

	for sessionID, item := range sessionStore.data {
		if now.After(item.Expires) {
			delete(sessionStore.data, sessionID)
		}
	}
}


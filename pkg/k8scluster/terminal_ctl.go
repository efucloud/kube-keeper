package k8scluster

import (
	"context"
	"errors"
	"fmt"
	"github.com/efucloud/kube-keeper/pkg/config"
	"strconv"
	"strings"
	"time"

	apierrors "k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
)

const (
	defaultTerminalCheckInterval = 30 * time.Second
	terminalLabelSelector        = "efucloud.com/terminal=efucloud"
	terminalExpireAnnotation     = "efucloud.com/terminal.expire"
)

type TerminalControllerOptions struct {
	CheckInterval time.Duration
	LabelSelector string
	ExpireKey     string
}

func RunTerminalController(
	ctx context.Context,
	client kubernetes.Interface,
	namespace string,
	options ...TerminalControllerOptions,
) error {
	if client == nil {
		return errors.New("kubernetes client is required")
	}
	namespace = strings.TrimSpace(namespace)
	if namespace == "" {
		return errors.New("namespace is required")
	}

	opts := TerminalControllerOptions{}
	if len(options) > 0 {
		opts = options[0]
	}

	if opts.CheckInterval <= 0 {
		opts.CheckInterval = defaultTerminalCheckInterval
	}
	if strings.TrimSpace(opts.LabelSelector) == "" {
		opts.LabelSelector = terminalLabelSelector
	}
	if strings.TrimSpace(opts.ExpireKey) == "" {
		opts.ExpireKey = terminalExpireAnnotation
	}

	config.Logger.Infof(
		"terminal controller started: namespace=%s interval=%s selector=%s expireKey=%s",
		namespace, opts.CheckInterval, opts.LabelSelector, opts.ExpireKey,
	)
	defer config.Logger.Infof("terminal controller stopped: namespace=%s", namespace)

	if err := reconcileTerminalPodsOnce(ctx, client, namespace, opts.LabelSelector, opts.ExpireKey); err != nil && !errors.Is(err, context.Canceled) {
		config.Logger.Errorf("terminal controller first reconcile failed: %v", err)
	}

	ticker := time.NewTicker(opts.CheckInterval)
	defer ticker.Stop()

	for {
		select {
		case <-ctx.Done():
			return nil
		case <-ticker.C:
			if err := reconcileTerminalPodsOnce(ctx, client, namespace, opts.LabelSelector, opts.ExpireKey); err != nil && !errors.Is(err, context.Canceled) {
				config.Logger.Errorf("terminal controller reconcile failed: %v", err)
			}
		}
	}
}

func reconcileTerminalPodsOnce(
	ctx context.Context,
	client kubernetes.Interface,
	namespace, labelSelector, expireKey string,
) error {
	podList, err := client.CoreV1().Pods(namespace).List(ctx, metav1.ListOptions{
		LabelSelector: labelSelector,
	})
	if err != nil {
		return err
	}

	nowUnix := time.Now().Unix()
	for i := range podList.Items {
		pod := &podList.Items[i]
		expireRaw, ok := pod.Annotations[expireKey]
		if !ok || strings.TrimSpace(expireRaw) == "" {
			continue
		}

		expireUnix, err := parseTerminalExpireUnix(expireRaw)
		if err != nil {
			config.Logger.Warnf(
				"skip terminal pod %s/%s: invalid expire annotation %q: %v",
				pod.Namespace, pod.Name, expireRaw, err,
			)
			continue
		}
		if nowUnix < expireUnix {
			continue
		}

		err = client.CoreV1().Pods(namespace).Delete(ctx, pod.Name, metav1.DeleteOptions{})
		if err != nil && !apierrors.IsNotFound(err) {
			config.Logger.Errorf("delete expired terminal pod failed: %s/%s: %v", pod.Namespace, pod.Name, err)
			continue
		}

		secretErr := client.CoreV1().Secrets(namespace).Delete(ctx, pod.Name, metav1.DeleteOptions{})
		if secretErr != nil && !apierrors.IsNotFound(secretErr) {
			config.Logger.Warnf("delete terminal kubeconfig secret failed: %s/%s: %v", pod.Namespace, pod.Name, secretErr)
		}

		config.Logger.Infof(
			"deleted expired terminal resources: %s/%s (secret=%s, expire=%d)",
			pod.Namespace, pod.Name, secretDeleteStatus(secretErr), expireUnix,
		)
	}
	return nil
}

func secretDeleteStatus(err error) string {
	if err == nil {
		return "deleted"
	}
	if apierrors.IsNotFound(err) {
		return "not-found"
	}
	return "failed"
}

func parseTerminalExpireUnix(raw string) (int64, error) {
	value := strings.TrimSpace(raw)
	if value == "" {
		return 0, errors.New("empty value")
	}

	ts, err := strconv.ParseInt(value, 10, 64)
	if err != nil {
		return 0, fmt.Errorf("invalid timestamp: %s", raw)
	}
	if ts <= 0 {
		return 0, fmt.Errorf("invalid timestamp: %s", raw)
	}

	switch len(value) {
	case 10:
		return ts, nil
	case 13:
		return ts / 1000, nil
	case 19:
		return ts / int64(time.Second), nil
	}

	// Fallback by magnitude for non-standard lengths.
	if ts > 1e18 {
		return ts / int64(time.Second), nil
	}
	if ts > 1e12 {
		return ts / 1000, nil
	}
	return ts, nil
}

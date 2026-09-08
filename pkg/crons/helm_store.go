package crons

import (
	"context"

	"github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/helmstore"
)

func syncHelmRepositories() {
	config.Logger.Info("start sync helm repositories")
	errors := helmstore.Default().SyncAll(context.Background())
	for _, err := range errors {
		config.Logger.Errorf("sync helm repository failed, keeping cached index: %s", err.Error())
	}
	config.Logger.Infof("end sync helm repositories, failures: %d", len(errors))
}

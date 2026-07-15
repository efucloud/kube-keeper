package crons

import (
	"github.com/efucloud/kube-keeper/pkg/config"
	"github.com/robfig/cron/v3"
)

func StartCronJob() {
	config.Logger.Info("start cron job")
	c := cron.New()
	go syncNs()
	_, _ = c.AddFunc("@hourly", syncNs)
	c.Start()

}

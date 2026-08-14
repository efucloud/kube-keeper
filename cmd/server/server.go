package server

import (
	"context"
	"fmt"
	"net/http"

	"github.com/coreos/go-oidc/v3/oidc"
	"github.com/efucloud/common"
	"github.com/efucloud/common/signals"
	"github.com/efucloud/kube-keeper/cmd/server/options"
	"github.com/efucloud/kube-keeper/pkg/apis"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/crons"
	"github.com/efucloud/kube-keeper/pkg/embeds"
	"github.com/efucloud/kube-keeper/pkg/mcp"
	"github.com/efucloud/kube-keeper/pkg/migrations"
	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	"github.com/spf13/cobra"
)

func NewRunnerServerCommand() *cobra.Command {
	s := options.NewServerRunOptions()
	cmd := &cobra.Command{
		Use:          "server",
		Long:         `kube-keeper server`,
		Short:        "kube-keeper server",
		Example:      `kube-keeper server`,
		SilenceUsage: true,
		RunE: func(cmd *cobra.Command, args []string) error {
			cmd.SilenceUsage = true
			cmd.SilenceErrors = true
			return run(s, signals.SetupSignalHandler())
		},
	}
	flags := cmd.Flags()
	flags.StringVarP(&s.Config, "config", "c", "./config/config.yaml", "config file path")
	return cmd
}

func run(o *options.ServerRunOptions, stopCh <-chan struct{}) (err error) {
	common.LoadConfig(o.Config, config2.ApplicationConfig)
	config2.ApplicationConfig.Init()
	config2.Logger.Infof("build info GoVersion %s", config2.GoVersion)
	config2.Logger.Infof("build info Commit %s", config2.Commit)
	config2.Logger.Infof("build info BuildDate %s", config2.BuildDate)

	config2.Bundle, _ = common.I18nInit(embeds.I18nFiles, config2.Logger)

	ctx := context.TODO()

	migrations.DatabaseMigrate()
	apis.AddResources()

	config2.AuthProvider, err = oidc.NewProvider(ctx, config2.ApplicationConfig.OidcConfig.Issuer)
	if err != nil {
		config2.Logger.Fatalf("get oidc config from: %s failed, err: %s", config2.ApplicationConfig.OidcConfig.Issuer, err)
	}
	if config2.AuthProvider != nil {
		oidcCfg := oidc.Config{ClientID: config2.ApplicationConfig.OidcConfig.ClientId}
		config2.SystemVerifier = config2.AuthProvider.Verifier(&oidcCfg)
	}

	go mcp.CleanupExpiredSessions()

	go func() {
		pro := prometheus.NewRegistry()
		http.Handle("/metrics", promhttp.HandlerFor(pro, promhttp.HandlerOpts{}))
		config2.Logger.Infof("ready to start http server on port: %d", config2.ServerPort)

		if err := http.ListenAndServe(fmt.Sprintf(":%d", config2.ServerPort), nil); err != nil {
			config2.Logger.Fatal("http server failed: " + err.Error())
		}
	}()

	config2.Logger.Info("starting scheduled tasks")
	crons.StartCronJob()

	<-stopCh
	config2.Logger.Info("received shutdown signal, exiting")

	return nil
}

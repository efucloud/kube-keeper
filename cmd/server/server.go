package server

import (
	"context"
	"fmt"
	"github.com/coreos/go-oidc/v3/oidc"
	"github.com/efucloud/common"
	"github.com/efucloud/common/signals"
	"github.com/efucloud/kube-keeper/cmd/server/options"
	"github.com/efucloud/kube-keeper/pkg/apis"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/crons"
	"github.com/efucloud/kube-keeper/pkg/embeds"
	k8scluster2 "github.com/efucloud/kube-keeper/pkg/k8scluster"
	"github.com/efucloud/kube-keeper/pkg/mcp"
	"github.com/efucloud/kube-keeper/pkg/migrations"
	dtos2 "github.com/efucloud/kube-keeper/pkg/models/dtos"
	services2 "github.com/efucloud/kube-keeper/pkg/services"
	"github.com/pkg/errors"
	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	"github.com/spf13/cobra"
	rbacv1 "k8s.io/api/rbac/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
	"k8s.io/client-go/tools/leaderelection"
	"k8s.io/client-go/tools/leaderelection/resourcelock"
	"net/http"
	"os"
	"strings"
	"time"
)

// 选举配置常量
const (
	LeaderLockName = "kube-keeper-leader"
	LeaseDuration  = 15 * time.Second
	RenewDeadline  = 10 * time.Second
	RetryPeriod    = 2 * time.Second
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

func removeLastTwoSegments(s string) string {
	lastIdx := strings.LastIndex(s, "-")
	if lastIdx == -1 {
		return s
	}
	temp := s[:lastIdx]
	secondLastIdx := strings.LastIndex(temp, "-")
	if secondLastIdx == -1 {
		return temp
	}
	return temp[:secondLastIdx]
}

func run(o *options.ServerRunOptions, stopCh <-chan struct{}) (err error) {
	// === 1. 基础初始化 (所有环境都执行) ===
	common.LoadConfig(o.Config, config2.ApplicationConfig)
	config2.ApplicationConfig.Init()
	config2.Logger.Infof("build info GoVersion %s", config2.GoVersion)
	config2.Logger.Infof("build info Commit %s", config2.Commit)
	config2.Logger.Infof("build info BuildDate %s", config2.BuildDate)

	config2.Bundle, _ = common.I18nInit(embeds.I18nFiles, config2.Logger)

	ctx := context.TODO()
	var clusterCrt []byte

	// === 2. 环境模式判断 ===
	efuCloudMode := os.Getenv("EfuCloudMode")
	isEfuCloudMode := efuCloudMode != ""

	if isEfuCloudMode {
		config2.RunNamespace = "efucloud"
		config2.Logger.Info("running in Standalone logic applied (no election).")
	} else {
		// 非 EfuCloudMode: 强制要求运行在 K8s 集群内
		data, er := os.ReadFile("/var/run/secrets/kubernetes.io/serviceaccount/namespace")
		if er != nil {
			config2.Logger.Fatalf("FATAL: EfuCloudMode is not set. Must run inside Kubernetes cluster. Failed to detect service account: %v", er)
		}
		config2.RunNamespace = strings.TrimSpace(strings.Trim(string(data), "\n"))
		config2.Logger.Infof("running in Standard K8s Mode. Namespace: %s. Leader Election ENABLED.", config2.RunNamespace)

		hostname := os.Getenv("HOSTNAME")
		if hostname != "" {
			config2.ServerName = removeLastTwoSegments(hostname)
			config2.Logger.Infof("application name : %s", config2.ServerName)
		}
		clusterCrt, er = os.ReadFile("/var/run/secrets/kubernetes.io/serviceaccount/ca.crt")
	}

	// === 3. 全局服务初始化 (所有环境都执行) ===
	// 数据库迁移
	migrations.DatabaseMigrate()
	// 注册 API
	apis.AddResources()

	// OIDC 初始化
	config2.AuthProvider, err = oidc.NewProvider(ctx, config2.ApplicationConfig.OidcConfig.Issuer)
	if err != nil {
		config2.Logger.Fatalf("get oidc config from: %s failed, err: %s", config2.ApplicationConfig.OidcConfig.Issuer, err)
	}
	if config2.AuthProvider != nil {
		oidcCfg := oidc.Config{ClientID: config2.ApplicationConfig.OidcConfig.ClientId}
		config2.SystemVerifier = config2.AuthProvider.Verifier(&oidcCfg)
	}

	// === 4. 启动全局后台任务 (所有副本/所有模式都运行) ===
	go mcp.CleanupExpiredSessions()

	// === 5. 启动 HTTP 服务器 (✅ 关键修复：放入 Goroutine，避免阻塞后续选举逻辑) ===
	go func() {
		pro := prometheus.NewRegistry()
		http.Handle("/metrics", promhttp.HandlerFor(pro, promhttp.HandlerOpts{}))
		config2.Logger.Infof("ready to start http server on port: %d", config2.ServerPort)

		if err := http.ListenAndServe(fmt.Sprintf(":%d", config2.ServerPort), nil); err != nil {
			config2.Logger.Fatal("http server failed: " + err.Error())
		}
	}()

	// === 6. 处理定时任务 (CronJob) - 核心逻辑分支 ===

	if isEfuCloudMode {
		// --- [场景 A: EfuCloudMode] ---
		// 无论是否在集群内，都不选举，直接运行
		config2.Logger.Info("EfuCloudMode detected: starting CronJob directly (no election).")
		crons.StartCronJob()

		// ✅ 关键修复：EfuCloud 模式下没有选举阻塞主线程，需要手动等待停止信号
		<-stopCh
		config2.Logger.Info("received shutdown signal, exiting EfuCloudMode")

	} else {
		// --- [场景 B: 标准 K8s 模式] ---
		// 必须在集群内，且必须启动选举
		config2.Logger.Info("initializing leader election for scheduled tasks...")
		// 6.1 构建 K8s 客户端 (仅 InCluster)
		k8sCfg, cfgErr := rest.InClusterConfig()
		if cfgErr != nil {
			config2.Logger.Fatalf("failed to get in-cluster config: %v", cfgErr)
		}
		clientset, cfgErr := kubernetes.NewForConfig(k8sCfg)
		if cfgErr != nil {
			config2.Logger.Fatalf("failed to create kubernetes clientset: %v", cfgErr)
		}
		svc := services2.ClusterService{}
		if manager, _ := svc.GetClusterByCode(ctx, "manager"); len(manager.ID) == 0 {
			kubeSystem, _ := clientset.CoreV1().Namespaces().Get(ctx, "kube-system", metav1.GetOptions{})
			config2.KubeSystemCreateTime = kubeSystem.CreationTimestamp.String()
			config2.KubeSystemUID = string(kubeSystem.UID)
			// 自动注册 Manager 集群逻辑
			perSvc := k8scluster2.PermissionService{}
			private, cert, errdata := perSvc.CreateManagerCSR(ctx, clientset)
			if errdata.IsNil() && len(clusterCrt) > 0 && len(private) > 0 && len(cert) > 0 {
				var clusterCreate dtos2.ClusterCreate
				clusterCreate.Name = "manager"
				clusterCreate.Code = "manager"
				clusterCreate.CertificateAuthority = string(clusterCrt)
				clusterCreate.ClientCertificate = cert
				clusterCreate.ClientKey = string(private)
				clusterCreate.Category = "kubernetes"
				clusterCreate.Description = "kube keeper running in this cluster"
				clusterCreate.ApiServer = "https://kubernetes.default.svc:443"
				_, errdata = svc.AddCluster(ctx, clusterCreate)
				if errdata.IsNil() {
					config2.Logger.Info("add manager cluster success")
					//创建clusterrolebinding cluster-manager@efucloud.cn
					_, err = clientset.RbacV1().ClusterRoleBindings().Create(ctx, &rbacv1.ClusterRoleBinding{
						ObjectMeta: metav1.ObjectMeta{
							Name: "efucloud-manager",
						},
						RoleRef: rbacv1.RoleRef{
							APIGroup: "rbac.authorization.k8s.io",
							Kind:     "ClusterRole",
							Name:     "cluster-admin",
						},
						Subjects: []rbacv1.Subject{
							{
								Kind:     "User",
								APIGroup: "rbac.authorization.k8s.io",
								Name:     "cluster-manager@efucloud.cn",
							},
						},
					}, metav1.CreateOptions{})
					if err != nil {
						config2.Logger.Errorf("failed to create cluster role binding efucloud-manager failed, err: %v", err)
					}
				}
			}
		}
		// 6.2 确定 Identity
		podName := os.Getenv("HOSTNAME")
		if podName != "" {
			config2.ServerName = removeLastTwoSegments(podName)
			config2.Logger.Infof("application name : %s", config2.ServerName)
		} else {
			config2.Logger.Warnf("HOSTNAME env not found, using generated identity: %s", podName)
			podName = fmt.Sprintf("host-%d", time.Now().UnixNano())
		}
		cfgSvc := services2.ConfigService{}
		var cfgCreate dtos2.ConfigCreate
		cfgCreate.Code = config2.SerialNumber
		if e, _ := cfgSvc.GetConfigByCode(ctx, cfgCreate.Code); len(e.Code) == 0 {
			cfgCreate.Data = strings.ToUpper(common.MD5V(fmt.Sprintf("%s-%s-%s-%s", config2.KubeSystemUID, config2.KubeSystemCreateTime, config2.RunNamespace, config2.ServerName)))
			cfgSvc.AddConfig(ctx, cfgCreate)
		}

		// 6.3 创建分布式锁
		lock := &resourcelock.LeaseLock{
			LeaseMeta: metav1.ObjectMeta{
				Name:      LeaderLockName,
				Namespace: config2.RunNamespace,
			},
			Client: clientset.CoordinationV1(),
			LockConfig: resourcelock.ResourceLockConfig{
				Identity: podName,
			},
		}

		// 6.4 定义选举回调
		leaderCallbacks := leaderelection.LeaderCallbacks{
			OnStartedLeading: func(ctx context.Context) {
				config2.Logger.Infof("🎉 I am the LEADER (%s). Starting crons.StartCronJob()...", podName)
				crons.StartCronJob()
				go func() {
					if err := k8scluster2.RunTerminalController(ctx, clientset, config2.RunNamespace); err != nil && !errors.Is(err, context.Canceled) {
						config2.Logger.Errorf("terminal controller exited with error: %v", err)
					}
				}()
			},
			OnStoppedLeading: func() {
				config2.Logger.Warnf("⚠️ I am no longer the LEADER (%s). Cron tasks stopped.", podName)
			},
			OnNewLeader: func(identity string) {
				if identity == podName {
					config2.Logger.Infof("I am still the leader")
				} else {
					config2.Logger.Infof("👀 New leader elected: %s", identity)
				}
			},
		}

		// 6.5 创建并运行选举器
		le, cfgErr := leaderelection.NewLeaderElector(leaderelection.LeaderElectionConfig{
			Lock:            lock,
			LeaseDuration:   LeaseDuration,
			RenewDeadline:   RenewDeadline,
			RetryPeriod:     RetryPeriod,
			Callbacks:       leaderCallbacks,
			Name:            LeaderLockName,
			ReleaseOnCancel: true,
		})
		if cfgErr != nil {
			config2.Logger.Fatalf("failed to create leader elector: %v", cfgErr)
		}

		electorCtx, cancel := context.WithCancel(context.Background())
		defer cancel()

		go func() {
			<-stopCh
			config2.Logger.Info("received shutdown signal, stopping leader election")
			cancel()
		}()

		// ✅ 关键修复：现在这行代码能正常执行了，因为 HTTP 已经在另一个 goroutine 中运行
		// 这将阻塞当前 goroutine 直到选举停止
		le.Run(electorCtx)
	}

	return nil
}

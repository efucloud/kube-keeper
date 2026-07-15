package integrations

import (
	"context"
	"fmt"
	"github.com/efucloud/common"
	"github.com/efucloud/kube-keeper/pkg/config"
	"helm.sh/helm/v3/pkg/action"
	"helm.sh/helm/v3/pkg/chart/loader"
	"helm.sh/helm/v3/pkg/chartutil"
	"helm.sh/helm/v3/pkg/cli"
	"helm.sh/helm/v3/pkg/downloader"
	"helm.sh/helm/v3/pkg/engine"
	"helm.sh/helm/v3/pkg/getter"
	"k8s.io/cli-runtime/pkg/genericclioptions"
	"k8s.io/client-go/kubernetes"
	restclient "k8s.io/client-go/rest"
	"os"
	"path/filepath"
)

type Helm struct {
	URL         string
	ctx         context.Context
	restConfig  *restclient.Config
	configFlags *genericclioptions.ConfigFlags
	APIServer   *string
	CertFile    *string
	KeyFile     *string
	CAFile      *string
	BearerToken *string
}

func NewHelmClient(ctx context.Context, url string) (client *Helm, errorData common.ErrorData) {
	client = &Helm{
		URL: url,
		ctx: ctx,
	}
	return client, errorData
}
func NewHelmClusterClient(ctx context.Context, url string) (client *Helm, errorData common.ErrorData) {
	client = &Helm{
		URL:         url,
		ctx:         ctx,
		configFlags: genericclioptions.NewConfigFlags(false),
	}
	return client, errorData
}
func (client *Helm) DownloadPackage(chartRepoURL, chartName, chartVersion, targetDir string) (targetPath string, errorData common.ErrorData) {
	chartURL := fmt.Sprintf("%s/%s-%s.tgz", chartRepoURL, chartName, chartVersion)

	// 初始化 Downloader
	chartDownloader := downloader.ChartDownloader{
		Out:     os.Stdout,
		Getters: getter.All(&cli.EnvSettings{}),
	}

	// 下载 Chart 的 .tar 包
	config.Logger.Infof("Downloading chart from %s...\n", chartURL)
	filename, _, err := chartDownloader.DownloadTo(chartURL, chartVersion, targetDir)
	if err != nil {
		fmt.Println("Failed to download chart:", err)
		return
	}

	// 输出下载结果
	config.Logger.Infof("Chart downloaded successfully: %s\n", filename)

	// 如果需要将文件移动到目标路径
	targetPath = filepath.Join(".", fmt.Sprintf("%s-%s.tgz", chartName, chartVersion))
	err = os.Rename(filename, targetPath)
	if err != nil {
		config.Logger.Errorf("Failed to move file: %v", err)
		return
	}
	config.Logger.Infof("Chart saved to: %s\n", targetPath)
	return
}

func (client *Helm) ParseTemplates(chartRepoURL, chartName, chartVersion, namespace, releaseName string, values map[string]interface{}) (content string, errorData common.ErrorData) {
	// 加载 Chart
	var targetPath string
	targetPath, errorData = client.DownloadPackage(chartRepoURL, chartName, chartVersion, "")
	if errorData.IsNil() {
		return
	}
	chart, err := loader.Load(targetPath)
	if err != nil {
		fmt.Printf("Failed to load chart: %v\n", err)
		return
	}
	finalValues, err := chartutil.CoalesceValues(chart, values)
	if err != nil {
		fmt.Printf("Failed to coalesce values: %v\n", err)
		return
	}

	// 构造渲染上下文
	renderOpts := chartutil.ReleaseOptions{
		Name:      releaseName,
		Namespace: namespace,
	}
	valuesToRender, err := chartutil.ToRenderValues(chart, finalValues.AsMap(), renderOpts, nil)
	if err != nil {
		fmt.Printf("Failed to prepare render values: %v\n", err)
		return
	}

	// 使用 Helm 的模板引擎渲染模板
	renderer := engine.New(nil)
	renderedTemplates, err := renderer.Render(chart, valuesToRender)
	if err != nil {
		fmt.Printf("Failed to render templates: %v\n", err)
		return
	}

	// 输出渲染后的资源清单
	for fileName, content := range renderedTemplates {
		outputPath := filepath.Join(".", fileName)
		err := os.WriteFile(outputPath, []byte(content), 0644)
		if err != nil {
			fmt.Printf("Failed to write file %s: %v\n", outputPath, err)
			continue
		}
		fmt.Printf("Rendered resource saved to: %s\n", outputPath)
	}
	return
}
func (client *Helm) Install(clientSet *kubernetes.Clientset, chartRepoURL, chartName, chartVersion, namespace, releaseName string, values map[string]interface{}, restCfg *restclient.Config) (content string, errorData common.ErrorData) {
	var targetPath string
	targetPath, errorData = client.DownloadPackage(chartRepoURL, chartName, chartVersion, "")
	if errorData.IsNil() {
		return
	}
	chart, err := loader.Load(targetPath)
	if err != nil {
		fmt.Printf("Failed to load chart: %v\n", err)
		return
	}
	// 初始化 Helm 配置
	settings := cli.New()
	settings.SetNamespace(namespace)

	// 创建 Helm 客户端配置
	actionConfig := new(action.Configuration)
	if err := actionConfig.Init(client.configFlags, settings.Namespace(), "secret", config.Logger.Infof); err != nil {
		config.Logger.Errorf("Failed to initialize Helm client: %v", err)
		return
	}
	//actionConfig.RESTClientGetter
	actionConfig.Log = config.Logger.Infof
	// 创建 Install 动作
	helmClient := action.NewInstall(actionConfig)
	helmClient.ReleaseName = releaseName // 设置 Release 名称
	helmClient.Namespace = namespace     // 设置命名空间
	helmClient.CreateNamespace = false

	// 加载 Chart
	release, err := helmClient.Run(chart, values)
	if err != nil {
		config.Logger.Errorf("Failed to install chart: %v", err)
		return
	}
	config.Logger.Info(release)
	return
}

func (client *Helm) Upgrade(chartRepoURL, chartName, chartVersion, namespace, releaseName string, values map[string]interface{}) (content string, errorData common.ErrorData) {
	var targetPath string
	targetPath, errorData = client.DownloadPackage(chartRepoURL, chartName, chartVersion, "")
	if errorData.IsNil() {
		return
	}
	chart, err := loader.Load(targetPath)
	if err != nil {
		fmt.Printf("Failed to load chart: %v\n", err)
		return
	}
	// 初始化 Helm 配置
	// 创建 Helm 客户端配置
	actionConfig := new(action.Configuration)
	if err := actionConfig.Init(client.configFlags, namespace, "secret", config.Logger.Infof); err != nil {
		config.Logger.Errorf("Failed to initialize Helm client: %v", err)
	}
	actionConfig.Log = config.Logger.Infof
	// 创建 Install 动作
	helmClient := action.NewUpgrade(actionConfig)
	helmClient.Namespace = namespace // 设置命名空间

	// 加载 Chart
	release, err := helmClient.Run(releaseName, chart, values)
	if err != nil {
		config.Logger.Errorf("Failed to install chart: %v", err)
	}
	config.Logger.Info(release)
	return
}

func (client *Helm) Uninstall(namespace, releaseName string) (content string, errorData common.ErrorData) {

	// 创建 Helm 客户端配置
	actionConfig := new(action.Configuration)
	if err := actionConfig.Init(client.configFlags, namespace, "secret", config.Logger.Infof); err != nil {
		config.Logger.Errorf("Failed to initialize Helm client: %v", err)
		return
	}
	actionConfig.Log = config.Logger.Infof

	// 创建 Install 动作
	helmClient := action.NewUninstall(actionConfig)
	// 加载 Chart
	release, err := helmClient.Run(releaseName)
	if err != nil {
		config.Logger.Errorf("Failed to install chart: %v", err)
	}
	config.Logger.Info(release)
	return
}

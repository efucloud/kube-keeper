package k8scluster

import (
	"archive/tar"
	"bytes"
	"compress/gzip"
	"context"
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/efucloud/common"
	"github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/k8scluster/database"
	dtos2 "github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/efucloud/kube-keeper/pkg/structs"
	"helm.sh/helm/v3/pkg/action"
	rspb "helm.sh/helm/v3/pkg/release"
	"io"
	corev1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/cli-runtime/pkg/genericclioptions"
	"k8s.io/client-go/rest"
	"net/http"
	"strings"
	"time"
)

var b64 = base64.StdEncoding

var magicGzip = []byte{0x1f, 0x8b, 0x08}

const (
	MaxFileSize    = 50 << 20 // 50 MB
	RequestTimeout = 30 * time.Second
	MaxRedirects   = 3
)

type HelmService struct {
}

func (svc *HelmService) GetHelmValues(ctx context.Context, model dtos2.HelmValues) (result dtos2.HelmValues, errorData common.ErrorData) {
	result.Url = model.Url
	client := &http.Client{
		Timeout: RequestTimeout,
		CheckRedirect: func(req *http.Request, via []*http.Request) error {
			if len(via) >= MaxRedirects {
				return http.ErrUseLastResponse
			}
			return nil
		},
	}
	var resp *http.Response
	resp, errorData.Err = client.Head(model.Url) // 先用 HEAD 检查是否存在
	if errorData.IsNotNil() {
		config.Logger.Error(errorData.Err.Error())
		return
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		errorData.Err = errors.New("response status code is not 200")
		return
	}
	// 确认存在后，发起 GET 下载
	resp, errorData.Err = client.Get(model.Url)
	if errorData.IsNotNil() {
		config.Logger.Error(errorData.Err.Error())
		return
	}
	gzr, err := gzip.NewReader(io.LimitReader(resp.Body, MaxFileSize))
	if err != nil {
		errorData.Err = err
		return
	}
	defer gzr.Close()

	tr := tar.NewReader(gzr)
	for {
		hdr, err := tr.Next()
		if err == io.EOF {
			break
		}
		if err != nil {
			errorData.Err = err
			return
		}
		config.Logger.Info(hdr.Name)
		if hdr.Typeflag == tar.TypeReg && strings.HasSuffix(hdr.Name, "values.yaml") {
			content, err := io.ReadAll(tr)
			if err != nil {
				errorData.Err = err
				config.Logger.Error(err)
				return
			}
			result.Content = string(content)
			return
		}
	}
	errorData.Err = fmt.Errorf("values.yaml not found")
	return
}
func (svc *HelmService) Uninstall(ctx context.Context, requestInfo structs.RequestInfo, release string) (errorData common.ErrorData) {
	var (
		cluster   dtos2.ClusterDetail
		clientSet *ClusterClientSet
	)
	cf := genericclioptions.NewConfigFlags(false)
	clusterSvc := database.ClusterService{}
	cluster, errorData = clusterSvc.GetClusterByCode(ctx, requestInfo.ClusterCode)
	if errorData.IsNotNil() {
		config.Logger.Errorf("%s get cluster failed, err: %s", requestInfo.String(), errorData.Err.Error())
		return
	}
	cf.APIServer = &cluster.ApiServer
	_, clientSet, errorData = GetClusterAndUserClientSet(ctx, requestInfo)
	if errorData.IsNotNil() {
		config.Logger.Errorf("%s get user cluster clientSet failed, err: %s", requestInfo.String(), errorData.Err.Error())
		return
	}
	cf.WrapConfigFn = func(config *rest.Config) *rest.Config {
		return clientSet.Config
	}
	cf.CacheDir = nil
	cf.Namespace = &requestInfo.Namespace
	actionConfig := new(action.Configuration)
	errorData.Err = actionConfig.Init(cf, requestInfo.Namespace, "secrets", config.Logger.Infof)
	if errorData.IsNotNil() {
		config.Logger.Errorf("%s build helm actionConfig failed, err: %s", requestInfo.String(), errorData.Err.Error())
		return
	}
	client := action.NewUninstall(actionConfig)
	_, _ = client.Run(release)
	return
}
func (svc *HelmService) ListNamespaceHelmRelease(ctx context.Context, requestInfo structs.RequestInfo) (errorData common.ErrorData) {
	var (
		clientSet  *ClusterClientSet
		secretList *corev1.SecretList
	)
	_, clientSet, errorData = GetClusterAndUserClientSet(ctx, requestInfo)
	if errorData.IsNotNil() {
		config.Logger.Error(errorData.Err)
		return
	}
	secretList, errorData.Err = clientSet.K8sClientSet.CoreV1().Secrets(requestInfo.Namespace).List(ctx, metav1.ListOptions{FieldSelector: "type=helm.sh/release.v1"})
	if errorData.IsNotNil() {
		config.Logger.Error(errorData.Err)
		return
	}
	for _, item := range secretList.Items {
		if releaseData, ok := item.Data["release"]; ok {
			releaseData, _ = b64.DecodeString(string(releaseData))
			if release, err := decodeRelease(string(releaseData)); err == nil {
				config.Logger.Infof("%+v\n", release)

			}
		}
	}
	return
}

func (svc *HelmService) ListNamespaceHelmReleaseHistory(ctx context.Context, requestInfo structs.RequestInfo, releaseName string) (results []*rspb.Release, errorData common.ErrorData) {
	var (
		clientSet  *ClusterClientSet
		secretList *corev1.SecretList
	)
	_, clientSet, errorData = GetClusterAndUserClientSet(ctx, requestInfo)
	if errorData.IsNotNil() {
		config.Logger.Error(errorData.Err)
		return
	}
	if errorData.IsNotNil() {
		config.Logger.Error(errorData.Err)
		return
	}
	secretList, errorData.Err = clientSet.K8sClientSet.CoreV1().Secrets(requestInfo.Namespace).List(ctx, metav1.ListOptions{FieldSelector: "type=helm.sh/release.v1"})
	if errorData.IsNotNil() {
		config.Logger.Error(errorData.Err)
		return
	}
	for _, item := range secretList.Items {
		if releaseData, ok := item.Data["release"]; ok {
			releaseData, _ = b64.DecodeString(string(releaseData))
			if release, err := decodeRelease(string(releaseData)); err == nil {
				if release.Name == releaseName {
					results = append(results, release)
				}
			}
		}
	}
	return
}
func decodeRelease(data string) (*rspb.Release, error) {
	//base64 decode string
	b, err := b64.DecodeString(data)
	if err != nil {
		return nil, err
	}

	//For backwards compatibility with releases that were stored before
	//compression was introduced we skip decompression if the
	//gzip magic header is not found
	if bytes.Equal(b[0:3], magicGzip) {
		r, err := gzip.NewReader(bytes.NewReader(b))
		if err != nil {
			return nil, err
		}
		defer r.Close()
		b2, err := io.ReadAll(r)
		if err != nil {
			return nil, err
		}
		b = b2
	}

	var rls rspb.Release
	//unmarshal release object bytes
	if err := json.Unmarshal(b, &rls); err != nil {
		return nil, err
	}
	return &rls, nil
}

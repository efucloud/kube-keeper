package integrations

import (
	"context"
	"github.com/efucloud/common"
	"github.com/efucloud/kube-keeper/pkg/config"
	dtos2 "github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/efucloud/kube-keeper/pkg/utils"
	"github.com/prometheus/client_golang/api"
	v1 "github.com/prometheus/client_golang/api/prometheus/v1"
	"github.com/prometheus/common/model"
	"net/http"
	"strings"
	"time"
)

type Prometheus struct {
	URL      string
	Username string
	Password string
	Token    string
	Client   api.Client
}

func NewPrometheusClient(ctx context.Context, config dtos2.MonitorPrometheusConfig) (client *Prometheus, errorData common.ErrorData) {
	client = &Prometheus{
		URL: strings.TrimSuffix(config.Address, "/"),
	}
	transport := http.DefaultTransport.(*http.Transport).Clone() // 克隆默认的Transport以便修改它而不会影响全局设置
	httpClient := &http.Client{
		Transport: transport,
	}
	client.Client, errorData.Err = api.NewClient(api.Config{
		Address: client.URL,
		Client:  httpClient,
	})
	return
}

func (svc *Prometheus) Query(ctx context.Context, queryParam dtos2.PrometheusQuery, queryParams dtos2.QueryParam) (result model.Vector, errorData common.ErrorData) {
	ctx, cancel := context.WithTimeout(ctx, 20*time.Second)
	defer cancel()
	promql := ""
	var data model.Value
	promql, errorData = utils.TemplateRender("prometheus-query", queryParam.Query, queryParams)
	if errorData.IsNotNil() {
		config.Logger.Error(errorData.Err)
		return
	}
	if queryParams.Time == 0 {
		queryParams.Time = time.Now().Unix()
	}
	config.Logger.Debugf("%s", promql)

	data, _, errorData.Err = v1.NewAPI(svc.Client).Query(ctx, promql, time.Unix(queryParams.Time, 0), v1.WithTimeout(20*time.Second))
	if errorData.IsNil() {
		result = data.(model.Vector)
	}
	return

}

func (svc *Prometheus) QueryRange(ctx context.Context, queryParam dtos2.PrometheusQuery, queryParams dtos2.QueryParam) (result model.Matrix, errorData common.ErrorData) {
	ctx, cancel := context.WithTimeout(ctx, 20*time.Second)
	defer cancel()
	promql := ""
	var data model.Value
	promql, errorData = utils.TemplateRender("prometheus-query-range", queryParam.Query, queryParams)
	if errorData.IsNotNil() {
		config.Logger.Error(errorData.Err)
		return
	}
	if queryParams.Start == 0 {
		queryParams.Start = time.Now().Add(-2 * time.Hour).Unix()
	}
	if queryParams.End == 0 {
		queryParams.End = time.Now().Unix()
	}
	ra := v1.Range{
		Start: time.Unix(queryParams.Start, 0),
		End:   time.Unix(queryParams.End, 0),
	}
	ra.Step = 60 * time.Second
	data, _, errorData.Err = v1.NewAPI(svc.Client).QueryRange(ctx, promql, ra, v1.WithTimeout(20*time.Second))
	if errorData.IsNil() {
		result = data.(model.Matrix)
	}
	return

}

package cluster

import (
	"bufio"
	"context"
	"encoding/json"
	"fmt"
	"github.com/efucloud/common"
	filters2 "github.com/efucloud/kube-keeper/pkg/apis/filters"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	k8scluster2 "github.com/efucloud/kube-keeper/pkg/k8scluster"
	"github.com/efucloud/kube-keeper/pkg/services"
	restfulspec "github.com/emicklei/go-restful-openapi/v2"
	"github.com/emicklei/go-restful/v3"
	"io"
	corev1 "k8s.io/api/core/v1"
	"net/http"
	"strconv"
	"strings"
)

type StreamResource struct {
}

func (cp StreamResource) AddWebService(ws *restful.WebService) {
	apiInfo := common.ApiInfo{}
	apiInfo.Tag = "cluster-watch"
	apiInfo.Description = "集群watch代理"
	common.RegisterApiInfo(apiInfo)
	ws.Route(ws.GET(config2.ClusterStreamAPIPrefix+"/namespaces/{namespace}/pods/{pod}/logs").
		Consumes(restful.MIME_JSON).
		Produces("application/x-ndjson").
		To(cp.streamPodContainerLogs).
		Doc("流式获取日志").
		Notes("流式获取日志").
		Param(ws.PathParameter("cluster", "集群编码").Required(true)).
		Param(ws.PathParameter("namespace", "Pod namespace").DataType("string")).
		Param(ws.PathParameter("pod", "Pod name").DataType("string")).
		Param(ws.QueryParameter("container", "Container name (required)").DataType("string")).
		Param(ws.QueryParameter("tailLines", "Number of recent lines to fetch").DataType("integer")).
		Param(ws.QueryParameter("previous", "奔溃前的日志").DataType("boolean")).
		Param(ws.QueryParameter("sinceSeconds", "Only return logs newer than this duration").DataType("integer")).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "streamPodContainerLogs"))

}

func (cp StreamResource) streamPodContainerLogs(req *restful.Request, resp *restful.Response) {
	ctx := req.Request.Context()
	lang := common.GetLanguageFromReq(req, config2.RequestLanguage)
	ctx = context.WithValue(ctx, config2.RequestLanguage, lang)

	// === 1. 获取租户和集群信息 ===
	requestInfo := k8scluster2.GetRequestInfo(req)
	clusterSvc := services.ClusterService{}
	cluster, errorData := clusterSvc.GetClusterByCode(ctx, requestInfo.ClusterCode)
	if errorData.IsNotNil() {
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	if len(cluster.ID) == 0 {
		errorData.MsgCode = config2.MsgCodeClusterIsNotFoundOrDisable
		errorData.ResponseCode = http.StatusNotFound
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	cluster.Default(ctx)
	_, clientSet, errorData := k8scluster2.GetClusterAndUserClientSet(ctx, requestInfo)
	if errorData.IsNotNil() || clientSet == nil {
		errorData.Lang = lang
		errorData.MsgCode = config2.MsgCodeClusterSetBuildFailed
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}

	// === 2. 解析路径和查询参数 ===
	namespace := req.PathParameter("namespace")
	podName := req.PathParameter("pod")
	container := req.QueryParameter("container")
	previous := req.QueryParameter("previous")
	if container == "" {
		errorData = common.ErrorData{
			MsgCode:      config2.MsgCodeRequestDataInvalid,
			Lang:         lang,
			ResponseCode: http.StatusBadRequest,
			Err:          fmt.Errorf("missing 'container' query parameter"),
		}
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}

	// 可选参数
	var tailLines *int64
	if tlStr := req.QueryParameter("tailLines"); tlStr != "" {
		if tl, err := strconv.ParseInt(tlStr, 10, 64); err == nil && tl > 0 {
			tailLines = &tl
		}
	}

	var sinceSeconds *int64
	if ssStr := req.QueryParameter("sinceSeconds"); ssStr != "" {
		if ss, err := strconv.ParseInt(ssStr, 10, 64); err == nil && ss > 0 {
			sinceSeconds = &ss
		}
	}

	// === 3. 设置响应头（NDJSON 流）===
	resp.AddHeader("Content-Type", "application/x-ndjson; charset=utf-8")
	resp.AddHeader("Cache-Control", "no-cache")
	resp.AddHeader("Connection", "keep-alive")
	//resp.AddHeader("Access-Control-Allow-Origin", config.ApplicationConfig.SseOrigin)
	resp.AddHeader("Access-Control-Allow-Credentials", "true")
	resp.AddHeader("Access-Control-Allow-Headers", "Authorization, Content-Type")

	// === 4. 构造 PodLogOptions ===
	logOpts := &corev1.PodLogOptions{
		Container:    container,
		Follow:       true,
		Timestamps:   true,
		TailLines:    tailLines,
		SinceSeconds: sinceSeconds,
		Previous:     len(previous) > 0 && previous != "false",
	}

	// === 5. 获取日志流 ===
	podLogs := clientSet.K8sClientSet.CoreV1().Pods(namespace).GetLogs(podName, logOpts)
	stream, err := podLogs.Stream(ctx)
	if err != nil {
		config2.Logger.Errorf("Failed to open pod log stream: %v", err)
		errorData = common.ErrorData{
			Err:          err,
			MsgCode:      config2.MsgCodeK8sPodLogStreamFailed,
			Lang:         lang,
			ResponseCode: http.StatusInternalServerError,
		}
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	defer func() {
		_ = stream.Close()
	}()

	config2.Logger.Infof("Started streaming logs for pod %s/%s container %s", namespace, podName, container)

	// === 6. 使用 bufio.Scanner 按完整行读取并发送 ===
	scanner := bufio.NewScanner(stream)
	for scanner.Scan() {
		select {
		case <-ctx.Done():
			config2.Logger.Infof("Client disconnected from log stream for %s/%s", namespace, podName)
			return
		default:
		}

		line := scanner.Text()
		if strings.TrimSpace(line) == "" {
			continue
		}

		// 构造 NDJSON 行: {"line": "完整日志行\n"}
		payload := map[string]string{"line": line + "\n"}
		jsonLine, err := json.Marshal(payload)
		if err != nil {
			config2.Logger.Errorf("Failed to marshal log line: %v", err)
			continue
		}

		// 写入响应
		if _, writeErr := resp.Write(append(jsonLine, '\n')); writeErr != nil {
			config2.Logger.Warnf("Failed to write log line to client: %v", writeErr)
			return
		}

		// 立即刷新
		if flusher, ok := resp.ResponseWriter.(http.Flusher); ok {
			flusher.Flush()
		}
	}

	// 检查 scanner 是否因错误终止
	if err := scanner.Err(); err != nil && err != io.EOF {
		config2.Logger.Errorf("Error during log scanning: %v", err)
		// 不返回错误给客户端（流已结束），仅记录
	}

	config2.Logger.Infof("Log stream completed for %s/%s", namespace, podName)
}

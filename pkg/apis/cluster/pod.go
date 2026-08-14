package cluster

import (
	"bytes"
	"context"
	"fmt"
	"github.com/efucloud/common"
	filters2 "github.com/efucloud/kube-keeper/pkg/apis/filters"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	k8scluster2 "github.com/efucloud/kube-keeper/pkg/k8scluster"
	dtos2 "github.com/efucloud/kube-keeper/pkg/models/dtos"
	structs2 "github.com/efucloud/kube-keeper/pkg/structs"
	restfulspec "github.com/emicklei/go-restful-openapi/v2"
	"github.com/emicklei/go-restful/v3"
	"mime/multipart"
	"net/http"
	"strings"
	"time"
)

type PodResource struct {
	Svc k8scluster2.PodService
}

func (r PodResource) AddWebService(ws *restful.WebService) {
	apiInfo := common.ApiInfo{}
	apiInfo.Tag = "pod"
	apiInfo.Description = "pod扩展功能"
	common.RegisterApiInfo(apiInfo)
	apiExtend := "/pod/{pod}"
	ws.Route(ws.GET(config2.ClusterNamespaceAPIPrefix+apiExtend+"/{container}/list-files").
		Doc("获取pod目录下的文件和文件夹列表").
		Notes("通过 query 参数 path 获取 pod 当前目录的直接条目，未传时默认为根目录 /。返回值同时包含文件和文件夹，并标识文本/二进制与是否可编辑").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		Param(ws.PathParameter("namespace", "Namespace")).
		Param(ws.PathParameter("pod", "Pod")).
		Param(ws.PathParameter("container", "Container")).
		Param(ws.QueryParameter("path", "路径，默认为/")).
		To(r.listPodFiles).
		Returns(http.StatusOK, "成功", dtos2.PodFileList{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.AuthRedirectInfo{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "listClusterPodFiles"))
	ws.Route(ws.GET(config2.ClusterNamespaceWebsocketAPIPrefix+apiExtend+"/{container}/terminal").
		Doc("Pod容器终端").
		Notes("Pod容器终端").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		Param(ws.PathParameter("namespace", "Namespace")).
		Param(ws.PathParameter("pod", "Pod")).
		Param(ws.PathParameter("container", "Container")).
		Param(ws.QueryParameter("command", "终端命令")).
		To(r.terminal).
		Returns(http.StatusOK, "成功", []string{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.AuthRedirectInfo{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "clusterPodContainerTerminal"))
	ws.Route(ws.GET(config2.ClusterNamespaceAPIPrefix+apiExtend+"/{container}/log").
		Doc("Pod容器日志").
		Notes("Pod容器日志").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		Param(ws.PathParameter("namespace", "Namespace")).
		Param(ws.PathParameter("pod", "Pod")).
		Param(ws.PathParameter("container", "Container")).
		Param(ws.QueryParameter("previous", "Previous").DataType("boolean")).
		Param(ws.QueryParameter("sinceSeconds", "当前时间往前多少秒").DataType("number")).
		Param(ws.QueryParameter("sinceTime", "从什么时候开始的日志").DataType("string").DataFormat(time.RFC3339)).
		Param(ws.QueryParameter("timestamps", "显示时间戳").DataType("boolean")).
		Param(ws.QueryParameter("tailLines", "最后多少行").DataType("number")).
		To(r.log).
		Returns(http.StatusOK, "成功", []string{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.AuthRedirectInfo{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "clusterPodContainerLog"))
	ws.Route(ws.POST(config2.ClusterNamespaceAPIPrefix+apiExtend+"/{container}/download-file").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		Param(ws.PathParameter("namespace", "Namespace")).
		Param(ws.PathParameter("pod", "Pod")).
		Param(ws.PathParameter("container", "Container")).
		Doc("下载容器文件").
		Notes("下载容器文件").
		To(r.downloadFileFromContainer).
		Reads(dtos2.PodFilePath{}, "").
		Returns(http.StatusUnauthorized, "用户需要先登录", common.AuthRedirectInfo{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "downloadFileFromContainer"))
	ws.Route(ws.POST(config2.ClusterNamespaceAPIPrefix+apiExtend+"/{container}/read-file").
		Doc("读取容器文件内容").
		Notes("读取容器文件内容，适用于文本文件在线预览和编辑").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		Param(ws.PathParameter("namespace", "Namespace")).
		Param(ws.PathParameter("pod", "Pod")).
		Param(ws.PathParameter("container", "Container")).
		To(r.readFileFromContainer).
		Reads(dtos2.PodFilePath{}, "").
		Returns(http.StatusOK, "成功", dtos2.PodFileContent{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.AuthRedirectInfo{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "readFileContentFromContainer"))
	ws.Route(ws.POST(config2.ClusterNamespaceAPIPrefix+apiExtend+"/{container}/save-file").
		Doc("保存容器文本文件").
		Notes("保存容器文本文件内容").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		Param(ws.PathParameter("namespace", "Namespace")).
		Param(ws.PathParameter("pod", "Pod")).
		Param(ws.PathParameter("container", "Container")).
		To(r.saveFileToContainer).
		Reads(dtos2.PodFileContent{}, "").
		Returns(http.StatusOK, "成功", dtos2.PodFileContent{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.AuthRedirectInfo{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "saveFileContentToContainer"))
	ws.Route(ws.POST(config2.ClusterNamespaceAPIPrefix+apiExtend+"/{container}/create-file").
		Doc("新建容器文件或目录").
		Notes("在容器中创建文件或目录").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		Param(ws.PathParameter("namespace", "Namespace")).
		Param(ws.PathParameter("pod", "Pod")).
		Param(ws.PathParameter("container", "Container")).
		To(r.createFileToContainer).
		Reads(dtos2.PodFileCreate{}, "").
		Returns(http.StatusOK, "成功", dtos2.PodFilePath{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.AuthRedirectInfo{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "createFileToContainer"))
	ws.Route(ws.POST(config2.ClusterNamespaceAPIPrefix+apiExtend+"/{container}/rename-file").
		Doc("重命名容器文件或目录").
		Notes("重命名容器中的文件或目录").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		Param(ws.PathParameter("namespace", "Namespace")).
		Param(ws.PathParameter("pod", "Pod")).
		Param(ws.PathParameter("container", "Container")).
		To(r.renameFileInContainer).
		Reads(dtos2.PodFileRename{}, "").
		Returns(http.StatusOK, "成功", dtos2.PodFilePath{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.AuthRedirectInfo{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "renameFileInContainer"))
	ws.Route(ws.POST(config2.ClusterNamespaceAPIPrefix+apiExtend+"/{container}/delete-file").
		Doc("删除容器文件或目录").
		Notes("删除容器中的文件或目录").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		Param(ws.PathParameter("namespace", "Namespace")).
		Param(ws.PathParameter("pod", "Pod")).
		Param(ws.PathParameter("container", "Container")).
		To(r.deleteFileFromContainer).
		Reads(dtos2.PodFilePath{}, "").
		Returns(http.StatusOK, "成功", dtos2.PodFilePath{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.AuthRedirectInfo{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "deleteFileFromContainer"))
	ws.Route(ws.POST(config2.ClusterNamespaceAPIPrefix+apiExtend+"/{container}/upload-file").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		Param(ws.PathParameter("namespace", "Namespace")).
		Param(ws.PathParameter("pod", "Pod")).
		Param(ws.PathParameter("container", "Container")).
		Doc("文件上传").
		Notes("文件上传").
		To(r.uploadFileToContainer).
		Reads(dtos2.PodFileUploadInfo{}, "表单数据内容").
		Consumes("multipart/form-data").
		Returns(http.StatusUnauthorized, "用户需要先登录", common.AuthRedirectInfo{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "uploadFileToContainer"))
	ws.Route(ws.POST(config2.ClusterNamespaceAPIPrefix+apiExtend+"/{container}/upload-big-file").
		Param(ws.HeaderParameter(config2.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		Param(ws.PathParameter("namespace", "Namespace")).
		Param(ws.PathParameter("pod", "Pod")).
		Param(ws.PathParameter("container", "Container")).
		Doc("大文件上传").
		Notes("大文件上传，对文件进行分割上传，最后在容器组装").
		To(r.uploadBigFileToContainer).
		Reads(dtos2.PodFileUploadInfo{}, "表单数据内容").
		Consumes("multipart/form-data").
		Returns(http.StatusUnauthorized, "用户需要先登录", common.AuthRedirectInfo{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config2.FrontApiTag, "uploadBigFileToContainer"))
}

func (r PodResource) terminal(req *restful.Request, resp *restful.Response) {
	r.Svc.PodTerminal(req, resp)
}

func (r PodResource) log(req *restful.Request, resp *restful.Response) {
	r.Svc.PodContainerLog(req, resp)
}

func (r PodResource) listPodFiles(req *restful.Request, resp *restful.Response) {
	var (
		errorData   common.ErrorData
		result      dtos2.PodFileList
		reqInfo     dtos2.PodFilePath
		requestInfo structs2.RequestInfo
	)
	lang := common.GetLanguageFromReq(req, config2.RequestLanguage)
	ctx := context.WithValue(context.Background(), config2.RequestLanguage, lang)
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	reqInfo.Pod = req.PathParameter("pod")
	reqInfo.Container = req.PathParameter("container")
	reqInfo.Dir = req.QueryParameter("path")
	requestInfo = k8scluster2.GetRequestInfo(req)
	result, errorData = r.Svc.ListPodFiles(ctx, requestInfo, reqInfo)
	if errorData.IsNotNil() {
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	common.ResponseSuccess(resp, result)
}

func (r PodResource) downloadFileFromContainer(req *restful.Request, resp *restful.Response) {
	var (
		errorData   common.ErrorData
		result      *bytes.Buffer
		reqInfo     dtos2.PodFilePath
		requestInfo structs2.RequestInfo
	)
	lang := common.GetLanguageFromReq(req, config2.RequestLanguage)
	ctx := context.WithValue(context.Background(), config2.RequestLanguage, lang)
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	errorData.Err = req.ReadEntity(&reqInfo)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("decode json format data failed, err: %s", errorData.Err.Error())
		errorData.MsgCode = config2.MsgCodeJsonDecodeFailed
		errorData.ResponseCode = http.StatusBadRequest
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	reqInfo.Pod = req.PathParameter("pod")
	reqInfo.Container = req.PathParameter("container")
	requestInfo = k8scluster2.GetRequestInfo(req)
	result, errorData = r.Svc.DownloadFileFromContainer(ctx, requestInfo, reqInfo)
	if errorData.IsNotNil() {
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	ps := strings.Split(reqInfo.Dir, "/")
	filename := ps[len(ps)-1]
	resp.Header().Add("Content-Type", "application/octet-stream")
	resp.Header().Add("Content-Disposition", fmt.Sprintf(`attachment; filename="%s"`, filename))
	_, _ = result.WriteTo(resp.ResponseWriter)
}

func (r PodResource) readFileFromContainer(req *restful.Request, resp *restful.Response) {
	var (
		errorData   common.ErrorData
		result      dtos2.PodFileContent
		reqInfo     dtos2.PodFilePath
		requestInfo structs2.RequestInfo
	)
	lang := common.GetLanguageFromReq(req, config2.RequestLanguage)
	ctx := context.WithValue(context.Background(), config2.RequestLanguage, lang)
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	errorData.Err = req.ReadEntity(&reqInfo)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("decode json format data failed, err: %s", errorData.Err.Error())
		errorData.MsgCode = config2.MsgCodeJsonDecodeFailed
		errorData.ResponseCode = http.StatusBadRequest
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	reqInfo.Pod = req.PathParameter("pod")
	reqInfo.Container = req.PathParameter("container")
	requestInfo = k8scluster2.GetRequestInfo(req)
	result, errorData = r.Svc.ReadFileContentFromContainer(ctx, requestInfo, reqInfo)
	if errorData.IsNotNil() {
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	common.ResponseSuccess(resp, result)
}

func (r PodResource) createFileToContainer(req *restful.Request, resp *restful.Response) {
	var (
		errorData   common.ErrorData
		result      dtos2.PodFilePath
		reqInfo     dtos2.PodFileCreate
		requestInfo structs2.RequestInfo
	)
	lang := common.GetLanguageFromReq(req, config2.RequestLanguage)
	ctx := context.WithValue(context.Background(), config2.RequestLanguage, lang)
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	errorData.Err = req.ReadEntity(&reqInfo)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("decode json format data failed, err: %s", errorData.Err.Error())
		errorData.MsgCode = config2.MsgCodeJsonDecodeFailed
		errorData.ResponseCode = http.StatusBadRequest
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	requestInfo = k8scluster2.GetRequestInfo(req)
	result, errorData = r.Svc.CreateFileToContainer(ctx, requestInfo, dtos2.PodFilePath{
		Pod:       req.PathParameter("pod"),
		Container: req.PathParameter("container"),
		Dir:       reqInfo.ParentDir,
		FileName:  reqInfo.Name,
	}, reqInfo.Directory)
	if errorData.IsNotNil() {
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	common.ResponseSuccess(resp, result)
}

func (r PodResource) renameFileInContainer(req *restful.Request, resp *restful.Response) {
	var (
		errorData   common.ErrorData
		result      dtos2.PodFilePath
		reqInfo     dtos2.PodFileRename
		requestInfo structs2.RequestInfo
	)
	lang := common.GetLanguageFromReq(req, config2.RequestLanguage)
	ctx := context.WithValue(context.Background(), config2.RequestLanguage, lang)
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	errorData.Err = req.ReadEntity(&reqInfo)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("decode json format data failed, err: %s", errorData.Err.Error())
		errorData.MsgCode = config2.MsgCodeJsonDecodeFailed
		errorData.ResponseCode = http.StatusBadRequest
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	requestInfo = k8scluster2.GetRequestInfo(req)
	result, errorData = r.Svc.RenameFileInContainer(ctx, requestInfo, dtos2.PodFilePath{
		Pod:       req.PathParameter("pod"),
		Container: req.PathParameter("container"),
		Dir:       reqInfo.Dir,
	}, reqInfo.NewName)
	if errorData.IsNotNil() {
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	common.ResponseSuccess(resp, result)
}

func (r PodResource) deleteFileFromContainer(req *restful.Request, resp *restful.Response) {
	var (
		errorData   common.ErrorData
		result      dtos2.PodFilePath
		reqInfo     dtos2.PodFilePath
		requestInfo structs2.RequestInfo
	)
	lang := common.GetLanguageFromReq(req, config2.RequestLanguage)
	ctx := context.WithValue(context.Background(), config2.RequestLanguage, lang)
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	errorData.Err = req.ReadEntity(&reqInfo)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("decode json format data failed, err: %s", errorData.Err.Error())
		errorData.MsgCode = config2.MsgCodeJsonDecodeFailed
		errorData.ResponseCode = http.StatusBadRequest
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	reqInfo.Pod = req.PathParameter("pod")
	reqInfo.Container = req.PathParameter("container")
	requestInfo = k8scluster2.GetRequestInfo(req)
	result, errorData = r.Svc.DeleteFileFromContainer(ctx, requestInfo, reqInfo)
	if errorData.IsNotNil() {
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	common.ResponseSuccess(resp, result)
}

func (r PodResource) saveFileToContainer(req *restful.Request, resp *restful.Response) {
	var (
		errorData   common.ErrorData
		result      dtos2.PodFileContent
		reqInfo     dtos2.PodFileContent
		requestInfo structs2.RequestInfo
	)
	lang := common.GetLanguageFromReq(req, config2.RequestLanguage)
	ctx := context.WithValue(context.Background(), config2.RequestLanguage, lang)
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	errorData.Err = req.ReadEntity(&reqInfo)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("decode json format data failed, err: %s", errorData.Err.Error())
		errorData.MsgCode = config2.MsgCodeJsonDecodeFailed
		errorData.ResponseCode = http.StatusBadRequest
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	reqInfo.Pod = req.PathParameter("pod")
	reqInfo.Container = req.PathParameter("container")
	requestInfo = k8scluster2.GetRequestInfo(req)
	result, errorData = r.Svc.SaveFileContentToContainer(ctx, requestInfo, reqInfo)
	if errorData.IsNotNil() {
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	common.ResponseSuccess(resp, result)
}

func (r PodResource) uploadFileToContainer(req *restful.Request, resp *restful.Response) {
	var (
		errorData   common.ErrorData
		reqInfo     dtos2.PodFilePath
		requestInfo structs2.RequestInfo
		f           multipart.File
	)
	lang := common.GetLanguageFromReq(req, config2.RequestLanguage)
	ctx := context.WithValue(context.Background(), config2.RequestLanguage, lang)
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}

	reqInfo.Pod = req.PathParameter("pod")
	reqInfo.Container = req.PathParameter("container")
	reqInfo.Dir = req.Request.FormValue("path")
	reqInfo.FileName = req.Request.FormValue("fileName")
	f, _, errorData.Err = req.Request.FormFile("file")
	if errorData.IsNotNil() {
		config2.Logger.Error(errorData.Err)
		errorData.MsgCode = config2.MsgCodeJsonDecodeFailed
		errorData.ResponseCode = http.StatusBadRequest
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	requestInfo = k8scluster2.GetRequestInfo(req)
	errorData = r.Svc.UploadFileFromContainer(ctx, requestInfo, reqInfo, f)
	if errorData.IsNotNil() {
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	common.ResponseSuccess(resp, "upload success")
}

func (r PodResource) uploadBigFileToContainer(req *restful.Request, resp *restful.Response) {
	var (
		errorData   common.ErrorData
		reqInfo     dtos2.PodFilePath
		requestInfo structs2.RequestInfo
		f           multipart.File
	)
	lang := common.GetLanguageFromReq(req, config2.RequestLanguage)
	ctx := context.WithValue(context.Background(), config2.RequestLanguage, lang)
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}

	reqInfo.Pod = req.PathParameter("pod")
	reqInfo.Container = req.PathParameter("container")
	reqInfo.Dir = req.Request.FormValue("path")
	reqInfo.FileName = req.Request.FormValue("fileName")
	f, _, errorData.Err = req.Request.FormFile("file")
	if errorData.IsNotNil() {
		config2.Logger.Error(errorData.Err)
		errorData.MsgCode = config2.MsgCodeJsonDecodeFailed
		errorData.ResponseCode = http.StatusBadRequest
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	requestInfo = k8scluster2.GetRequestInfo(req)
	errorData = r.Svc.UploadBigFileFromContainer(ctx, requestInfo, reqInfo, f)
	if errorData.IsNotNil() {
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	common.ResponseSuccess(resp, "upload success")
}

package admin

import (
	"context"
	"github.com/efucloud/common"
	filters2 "github.com/efucloud/kube-keeper/pkg/apis/filters"
	"github.com/efucloud/kube-keeper/pkg/config"
	k8scluster2 "github.com/efucloud/kube-keeper/pkg/k8scluster"
	"github.com/efucloud/kube-keeper/pkg/k8scluster/database"
	dtos2 "github.com/efucloud/kube-keeper/pkg/models/dtos"
	services2 "github.com/efucloud/kube-keeper/pkg/services"
	"github.com/efucloud/kube-keeper/pkg/structs"
	restfulspec "github.com/emicklei/go-restful-openapi/v2"
	"github.com/emicklei/go-restful/v3"
	"net/http"
)

type ClusterResource struct {
	Svc services2.ClusterService
}

func (r ClusterResource) AddWebService(ws *restful.WebService) {
	apiInfo := common.ApiInfo{}
	apiInfo.Tag = "cluster"
	apiInfo.Description = "集群"
	common.RegisterApiInfo(apiInfo)
	apiExtend := "/cluster"
	ws.Route(ws.POST(config.APIPrefix+apiExtend).
		Doc("创建集群").
		Notes("创建集群，若集群没有跟应用一致的认证，需要为组织拥有者创建csr").
		To(r.create).
		Param(ws.HeaderParameter(config.AuthHeader, "请求Token")).
		Reads(dtos2.ClusterCreate{}).
		Returns(http.StatusOK, "成功", dtos2.ClusterDetail{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.ResponseError{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).Filter(filters2.Permission([]string{config.SystemRoleAdmin})).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config.FrontApiTag, "createCluster"))
	ws.Route(ws.POST(config.APIPrefix+apiExtend+"/auto-registry").
		Doc("集群自动注册").
		Notes("集群自动注册").
		To(r.autoRegistry).
		Param(ws.HeaderParameter(config.AuthHeader, "请求Token")).
		Reads(dtos2.ClusterRegistry{}).
		Returns(http.StatusOK, "成功", dtos2.ClusterDetail{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.ResponseError{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.I18n).Filter(filters2.Log).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config.FrontApiTag, "autoRegistry"))
	ws.Route(ws.GET(config.APIPrefix+apiExtend).
		Doc("获取集群列表").
		Notes("获取集群信息").
		Param(ws.HeaderParameter(config.AuthHeader, "请求Token")).
		Param(ws.QueryParameter("page", "页码").DataType("integer")).
		Param(ws.QueryParameter("size", "每页大小").DataType("integer")).
		Param(ws.QueryParameter("order", "排序")).
		Param(ws.QueryParameter("name", "用户名").DataType("string")).
		Param(ws.QueryParameter("code", "编码").DataType("string")).
		Param(ws.QueryParameter("search", "搜索").DataType("string")).
		Param(ws.QueryParameter("category", "集群类型").DataType("string")).
		To(r.list).
		Returns(http.StatusOK, "成功", dtos2.ClusterDetailList{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.ResponseError{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).Filter(filters2.Permission([]string{config.SystemRoleAdmin})).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config.FrontApiTag, "listCluster"))
	ws.Route(ws.GET(config.APIPrefix+apiExtend+"/{id}").
		Doc("获取用户详情").
		Notes("获取用户信息详情").
		Param(ws.HeaderParameter(config.AuthHeader, "系统用户Token")).
		To(r.getById).
		Param(ws.PathParameter("id", "记录ID").DataType("string")).
		Returns(http.StatusOK, "成功", dtos2.ClusterDetail{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", dtos2.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", dtos2.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", dtos2.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config.FrontApiTag, "getClusterById"))
	ws.Route(ws.GET(config.APIPrefix+apiExtend+"/code/{code}").
		Doc("获取集群详情").
		Notes("获取集群信息详情").
		Param(ws.HeaderParameter(config.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		To(r.getByCode).
		Returns(http.StatusOK, "成功", dtos2.ClusterDetail{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.ResponseError{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config.FrontApiTag, "getClusterByCode"))
	ws.Route(ws.GET(config.APIPrefix+apiExtend+"/sync-namespace/{cluster}").
		Doc("同步Namespace信息到集群").
		Notes("同步Namespace信息到集群").
		Param(ws.HeaderParameter(config.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码")).
		To(r.syncNamespace).
		Returns(http.StatusOK, "成功", nil).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.ResponseError{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config.FrontApiTag, "syncClusterNamespace"))
	ws.Route(ws.PUT(config.APIPrefix+apiExtend).
		Doc("更新集群信息").
		Notes("更新集群信息，更新集群信息不会自动创建集群侧任何资源对象，若集群本身为重建，请先删除集群").
		Param(ws.HeaderParameter(config.AuthHeader, "请求Token")).
		To(r.update).
		Reads(dtos2.ClusterUpdate{}).
		Returns(http.StatusOK, "成功", dtos2.ClusterDetail{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.ResponseError{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).Filter(filters2.Permission([]string{config.SystemRoleAdmin})).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config.FrontApiTag, "updateCluster"))
	ws.Route(ws.DELETE(config.APIPrefix+apiExtend).
		Doc("删除集群").
		Notes("删除集群信息，删除集群将会删除系统中跟集群关联的所有信息，但不会删除集群的任何信息，包括自动创建的csr以及相关资源的labels和annotations").
		Param(ws.HeaderParameter(config.AuthHeader, "请求Token")).
		To(r.delete).
		Reads(dtos2.BatchOperationIds{}).
		Returns(http.StatusOK, "成功", "成功").
		Returns(http.StatusUnauthorized, "用户需要先登录", common.ResponseError{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).Filter(filters2.Permission([]string{config.SystemRoleAdmin})).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config.FrontApiTag, "deleteCluster"))
	ws.Route(ws.POST(config.APIPrefix+apiExtend+"/supper/user/{cluster}").
		Doc("为集群创建管理员").
		Notes("为集群创建管理员,此处会提权使用集群配置信息来创建clientset").
		To(r.createClusterSupperUser).
		Param(ws.HeaderParameter(config.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码").Required(true)).
		Reads(dtos2.ClusterAdmin{}).
		Returns(http.StatusOK, "成功", "success").
		Returns(http.StatusUnauthorized, "用户需要先登录", common.ResponseError{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).Filter(filters2.Permission([]string{config.SystemRoleAdmin})).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config.FrontApiTag, "createClusterSupperUser"))
	ws.Route(ws.GET(config.APIPrefix+apiExtend+"/user/{cluster}").
		Doc("获取集群创建管理员").
		Notes("获取集群创建管理员,此处会提权使用集群配置信息来创建clientset").
		To(r.listClusterUser).
		Param(ws.HeaderParameter(config.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码").Required(true)).
		Param(ws.QueryParameter("page", "页码").DataType("integer")).
		Param(ws.QueryParameter("size", "每页大小").DataType("integer")).
		Returns(http.StatusOK, "成功", dtos2.ClusterAccountDetailList{}).
		Returns(http.StatusUnauthorized, "用户需要先登录", common.ResponseError{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).Filter(filters2.Permission([]string{config.SystemRoleAdmin})).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config.FrontApiTag, "listClusterUser"))
	ws.Route(ws.DELETE(config.APIPrefix+apiExtend+"/supper/user/{cluster}/{id}").
		Doc("删除集群创建管理员").
		Notes("删除集群建管理员,此处会提权使用集群配置信息来创建clientset").
		To(r.deleteClusterSupperUser).
		Param(ws.HeaderParameter(config.AuthHeader, "请求Token")).
		Param(ws.PathParameter("cluster", "集群编码").Required(true)).
		Param(ws.PathParameter("id", "数据库ID").Required(true)).
		Returns(http.StatusOK, "成功", "success").
		Returns(http.StatusUnauthorized, "用户需要先登录", common.ResponseError{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", common.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", common.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", common.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).Filter(filters2.Permission([]string{config.SystemRoleAdmin})).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config.FrontApiTag, "deleteClusterUser"))
	ws.Route(ws.POST(config.APIPrefix+apiExtend+"/status").
		Doc("启用禁用").
		Notes("启用禁用,修改账户状态").
		Param(ws.HeaderParameter(config.AuthHeader, "系统用户Token")).
		To(r.status).
		Reads(dtos2.ClusterStatus{}).
		Returns(http.StatusBadRequest, "请求数据无法处理", dtos2.ResponseError{}).
		Returns(http.StatusForbidden, "用户没有权限", dtos2.ResponseError{}).
		Returns(http.StatusInternalServerError, "内部处理逻辑错误", dtos2.ResponseError{}).
		Filter(filters2.ClientInfo).Filter(filters2.I18n).Filter(filters2.Log).Filter(filters2.Auth).Filter(filters2.Permission([]string{config.SystemRoleAdmin})).
		Metadata(restfulspec.KeyOpenAPITags, apiInfo.Tags()).
		Metadata(config.FrontApiTag, "changeClusterStatus"))

}

func (r ClusterResource) status(req *restful.Request, resp *restful.Response) {
	var (
		errorData common.ErrorData
		model     dtos2.ClusterStatus
	)
	lang := common.GetLanguageFromReq(req, config.RequestLanguage)
	errorData.Lang = lang
	ctx := context.WithValue(context.Background(), config.RequestLanguage, lang)
	if reqCtx := req.Attribute(config.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	if reqCtx := req.Attribute(config.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	ctx = context.WithValue(ctx, config.RequestLanguage, lang)
	errorData.Err = req.ReadEntity(&model)
	if errorData.IsNotNil() {
		config.Logger.Errorf("decode json format data failed, err: %s", errorData.Err.Error())
		errorData.MsgCode = config.MsgCodeJsonDecodeFailed
		errorData.ResponseCode = http.StatusBadRequest
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config.Bundle, errorData)
		return
	}
	errorData = r.Svc.ChangeStatusCluster(ctx, model)
	if errorData.IsNotNil() {
		config.Logger.Errorf("enable account failed, err: %s", errorData.Err.Error())
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config.Bundle, errorData)
		return
	}

	common.ResponseSuccess(resp, "success")
}
func (r ClusterResource) syncNamespace(req *restful.Request, resp *restful.Response) {
	var (
		requestInfo structs.RequestInfo
	)
	lang := common.GetLanguageFromReq(req, config.RequestLanguage)
	ctx := context.WithValue(context.Background(), config.RequestLanguage, lang)
	if reqCtx := req.Attribute(config.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	requestInfo = k8scluster2.GetRequestInfo(req)
	go k8scluster2.SyncClusterNamespace(ctx, requestInfo)
	common.ResponseSuccess(resp, "success")
}

func (r ClusterResource) deleteClusterSupperUser(req *restful.Request, resp *restful.Response) {
	var (
		errorData common.ErrorData
	)
	lang := common.GetLanguageFromReq(req, config.RequestLanguage)
	errorData.Lang = lang
	ctx := context.WithValue(context.Background(), config.RequestLanguage, lang)
	if reqCtx := req.Attribute(config.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}

	perSvc := k8scluster2.PermissionService{}
	errorData = perSvc.DeleteClusterAccount(ctx, req.PathParameter("cluster"), req.PathParameter("id"), true)
	if errorData.IsNotNil() {
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config.Bundle, errorData)
		return
	}

	common.ResponseSuccess(resp, "success")
}
func (r ClusterResource) listClusterUser(req *restful.Request, resp *restful.Response) {
	var (
		errorData common.ErrorData
		result    dtos2.ClusterAccountDetailList
	)
	lang := common.GetLanguageFromReq(req, config.RequestLanguage)
	errorData.Lang = lang
	ctx := context.WithValue(context.Background(), config.RequestLanguage, lang)
	if reqCtx := req.Attribute(config.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}

	clusterAccSvc := services2.ClusterAccountService{}
	page, size, order := common.GetRequestPaginationInformation(req)
	queryParam := &common.QueryParam{}
	clusterSvc := database.ClusterService{}
	cluster, _ := clusterSvc.GetClusterByCode(ctx, req.PathParameter("cluster"))
	common.QueryEqual("cluster_id", cluster.ID, queryParam)
	result, _ = clusterAccSvc.ListClusterAccount(ctx, page, size, order, queryParam.WhereQuery, queryParam.WhereArgs)
	common.ResponseSuccess(resp, result)
}
func (r ClusterResource) createClusterSupperUser(req *restful.Request, resp *restful.Response) {
	var (
		model     dtos2.ClusterAdmin
		errorData common.ErrorData
		result    dtos2.ClusterAccountDetail
	)
	lang := common.GetLanguageFromReq(req, config.RequestLanguage)
	errorData.Lang = lang
	ctx := context.WithValue(context.Background(), config.RequestLanguage, lang)
	if reqCtx := req.Attribute(config.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}

	errorData.Err = req.ReadEntity(&model)
	if errorData.IsNotNil() {
		config.Logger.Errorf("decode json format data failed, err: %s", errorData.Err.Error())
		errorData.MsgCode = config.MsgCodeJsonDecodeFailed
		errorData.ResponseCode = http.StatusBadRequest
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config.Bundle, errorData)
		return
	}

	perSvc := k8scluster2.PermissionService{}
	result, errorData = perSvc.AddClusterSupperAccount(ctx, req.Attribute(config.RequestUserId).(string),
		req.PathParameter("cluster"), model)
	if errorData.IsNotNil() {
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config.Bundle, errorData)
		return
	}
	common.ResponseSuccess(resp, result)
}

func (r ClusterResource) getById(req *restful.Request, resp *restful.Response) {
	lang := common.GetLanguageFromReq(req, config.RequestLanguage)
	var (
		errorData common.ErrorData
		result    dtos2.ClusterDetail
	)
	errorData.Lang = lang
	errorData.Lang = lang
	ctx := context.Background()
	if reqCtx := req.Attribute(config.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	ctx = context.WithValue(ctx, config.RequestLanguage, lang)

	id := req.PathParameter("id")

	result, errorData = r.Svc.GetClusterByID(ctx, id)
	if errorData.IsNotNil() {
		config.Logger.Errorf("get account failed, err: %s", errorData.Err.Error())
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config.Bundle, errorData)
		return
	}
	result.CertificateAuthority = ""
	result.ClientKey = ""
	result.ClientCertificate = ""
	common.ResponseSuccess(resp, result)
}
func (r ClusterResource) getByCode(req *restful.Request, resp *restful.Response) {
	var (
		errorData common.ErrorData
		result    dtos2.ClusterDetail
	)
	lang := common.GetLanguageFromReq(req, config.RequestLanguage)
	ctx := context.WithValue(context.Background(), config.RequestLanguage, lang)
	if reqCtx := req.Attribute(config.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}

	result, errorData = r.Svc.GetClusterByCode(ctx, req.PathParameter("code"))
	if errorData.IsNotNil() {
		config.Logger.Errorf("getByCode cluster failed, err: %s", errorData.Err.Error())
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config.Bundle, errorData)
		return
	}
	if len(result.ID) == 0 {
		errorData.MsgCode = config.MsgCodeRecordNotExist
		errorData.ResponseCode = http.StatusNotFound
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config.Bundle, errorData)
		return
	}
	result.CertificateAuthority = ""
	result.ClientKey = ""
	result.ClientCertificate = ""
	common.ResponseSuccess(resp, result)
}
func (r ClusterResource) delete(req *restful.Request, resp *restful.Response) {
	var (
		errorData common.ErrorData
		model     dtos2.BatchOperationIds
	)
	lang := common.GetLanguageFromReq(req, config.RequestLanguage)
	errorData.Lang = lang
	ctx := context.WithValue(context.Background(), config.RequestLanguage, lang)
	if reqCtx := req.Attribute(config.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	if reqCtx := req.Attribute(config.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	ctx = context.WithValue(ctx, config.RequestLanguage, lang)

	errorData.Err = req.ReadEntity(&model)
	if errorData.IsNotNil() {
		config.Logger.Errorf("decode json format data failed, err: %s", errorData.Err.Error())
		errorData.MsgCode = config.MsgCodeJsonDecodeFailed
		errorData.ResponseCode = http.StatusBadRequest
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config.Bundle, errorData)
		return
	}
	errorData = r.Svc.DeleteCluster(ctx, model.Ids)
	if errorData.IsNotNil() {
		config.Logger.Errorf("delete account failed, err: %s", errorData.Err.Error())
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config.Bundle, errorData)
		return
	}
	common.ResponseSuccess(resp, "删除成功")
}

func (r ClusterResource) autoRegistry(req *restful.Request, resp *restful.Response) {
	var (
		errorData common.ErrorData
		result    dtos2.ClusterDetail
		model     dtos2.ClusterRegistry
	)
	lang := common.GetLanguageFromReq(req, config.RequestLanguage)
	ctx := context.WithValue(context.Background(), config.RequestLanguage, lang)
	if reqCtx := req.Attribute(config.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	errorData.Err = req.ReadEntity(&model)
	if errorData.IsNotNil() {
		config.Logger.Errorf("decode json format data failed, err: %s", errorData.Err.Error())
		errorData.MsgCode = config.MsgCodeJsonDecodeFailed
		errorData.ResponseCode = http.StatusBadRequest
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config.Bundle, errorData)
		return
	}
	model.CertificateAuthority, errorData.Err = config.AutoRegistryDecryptField(model.CertificateAuthority)
	if errorData.IsNotNil() {
		config.Logger.Errorf("decrypt cluster certificateAuthority failed, err: %s", errorData.Err.Error())
		errorData.MsgCode = config.MsgCodeRequestDataInvalid
		errorData.ResponseCode = http.StatusBadRequest
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config.Bundle, errorData)
		return
	}
	model.ClientCertificate, errorData.Err = config.AutoRegistryDecryptField(model.ClientCertificate)
	if errorData.IsNotNil() {
		config.Logger.Errorf("decrypt cluster clientCertificate failed, err: %s", errorData.Err.Error())
		errorData.MsgCode = config.MsgCodeRequestDataInvalid
		errorData.ResponseCode = http.StatusBadRequest
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config.Bundle, errorData)
		return
	}
	model.ClientKey, errorData.Err = config.AutoRegistryDecryptField(model.ClientKey)
	if errorData.IsNotNil() {
		config.Logger.Errorf("decrypt cluster clientKey failed, err: %s", errorData.Err.Error())
		errorData.MsgCode = config.MsgCodeRequestDataInvalid
		errorData.ResponseCode = http.StatusBadRequest
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config.Bundle, errorData)
		return
	}

	result, errorData = r.Svc.AddCluster(ctx, dtos2.ClusterCreate{
		Code:                 model.Code,
		Name:                 model.Name,
		Enable:               true,
		Category:             model.Category,
		ApiServer:            model.ApiServer,
		CertificateAuthority: model.CertificateAuthority,
		ClientCertificate:    model.ClientCertificate,
		ClientKey:            model.ClientKey,
		DomainList:           model.DomainList,
	})
	if errorData.IsNotNil() {
		config.Logger.Errorf("add cluster failed, err: %s", errorData.Err.Error())
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config.Bundle, errorData)
		return
	}
	if len(result.ID) == 0 {
		errorData.MsgCode = config.MsgCodeRecordNotExist
		errorData.ResponseCode = http.StatusNotFound
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config.Bundle, errorData)
		return
	}
	common.ResponseSuccess(resp, result)
}
func (r ClusterResource) create(req *restful.Request, resp *restful.Response) {
	var (
		errorData common.ErrorData
		result    dtos2.ClusterDetail
		model     dtos2.ClusterCreate
	)
	lang := common.GetLanguageFromReq(req, config.RequestLanguage)
	ctx := context.WithValue(context.Background(), config.RequestLanguage, lang)
	if reqCtx := req.Attribute(config.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	errorData.Err = req.ReadEntity(&model)
	if errorData.IsNotNil() {
		config.Logger.Errorf("decode json format data failed, err: %s", errorData.Err.Error())
		errorData.MsgCode = config.MsgCodeJsonDecodeFailed
		errorData.ResponseCode = http.StatusBadRequest
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config.Bundle, errorData)
		return
	}

	result, errorData = r.Svc.AddCluster(ctx, model)
	if errorData.IsNotNil() {
		config.Logger.Errorf("add cluster failed, err: %s", errorData.Err.Error())
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config.Bundle, errorData)
		return
	}
	if len(result.ID) == 0 {
		errorData.MsgCode = config.MsgCodeRecordNotExist
		errorData.ResponseCode = http.StatusNotFound
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config.Bundle, errorData)
		return
	}
	common.ResponseSuccess(resp, result)
}

func (r ClusterResource) update(req *restful.Request, resp *restful.Response) {
	var (
		model     dtos2.ClusterUpdate
		result    dtos2.ClusterDetail
		errorData common.ErrorData
	)
	lang := common.GetLanguageFromReq(req, config.RequestLanguage)
	errorData.Lang = lang
	ctx := context.WithValue(context.Background(), config.RequestLanguage, lang)
	if reqCtx := req.Attribute(config.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	errorData.Err = req.ReadEntity(&model)
	if errorData.IsNotNil() {
		config.Logger.Errorf("decode json format data failed, err: %s", errorData.Err.Error())
		errorData.MsgCode = config.MsgCodeJsonDecodeFailed
		errorData.ResponseCode = http.StatusBadRequest
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config.Bundle, errorData)
		return
	}

	result, errorData = r.Svc.UpdateCluster(ctx, model)
	if errorData.IsNotNil() {
		config.Logger.Errorf("update cluster failed, err: %s", errorData.Err.Error())
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config.Bundle, errorData)
		return
	}
	if len(result.ID) == 0 {
		errorData.MsgCode = config.MsgCodeRecordNotExist
		errorData.ResponseCode = http.StatusNotFound
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config.Bundle, errorData)
		return
	}
	result.CertificateAuthority = ""
	result.ClientKey = ""
	result.ClientCertificate = ""
	common.ResponseSuccess(resp, result)
}

func (r ClusterResource) list(req *restful.Request, resp *restful.Response) {
	var (
		errorData common.ErrorData
		results   dtos2.ClusterDetailList
	)
	lang := common.GetLanguageFromReq(req, config.RequestLanguage)
	ctx := context.WithValue(context.Background(), config.RequestLanguage, lang)
	if reqCtx := req.Attribute(config.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}

	page, size, order := common.GetRequestPaginationInformation(req)
	queryParam := &common.QueryParam{}
	common.RequestQuery("category", common.ParamTypeString, common.QueryTypeEqual, req, queryParam)
	common.RequestQuery("name", common.ParamTypeString, common.QueryTypeLike, req, queryParam)
	common.RequestQuery("code", common.ParamTypeString, common.QueryTypeLike, req, queryParam)
	common.RequestQuery("search:name;code", common.ParamTypeString, common.QueryTypeLike, req, queryParam)
	results, errorData = r.Svc.ListCluster(ctx, page, size, order, queryParam.WhereQuery, queryParam.WhereArgs)
	if errorData.IsNotNil() {
		config.Logger.Errorf("list cluster failed, err: %s", errorData.Err.Error())
		errorData.Lang = lang
		common.ResponseErrorMessage(ctx, req, resp, config.Bundle, errorData)
		return
	}
	for i := range results.Data {
		results.Data[i].CertificateAuthority = ""
		results.Data[i].ClientKey = ""
		results.Data[i].ClientCertificate = ""
	}
	common.ResponseSuccess(resp, results)
}

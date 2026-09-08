package k8scluster

import (
	"bytes"
	"context"
	"fmt"
	"strings"
	"text/template"

	"github.com/efucloud/common"
	"github.com/efucloud/kube-keeper/pkg/config"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/efucloud/kube-keeper/pkg/repositories"
	"github.com/efucloud/kube-keeper/pkg/structs"
	"github.com/efucloud/kube-keeper/pkg/utils"
	"github.com/ghodss/yaml"
	apierrors "k8s.io/apimachinery/pkg/api/errors"
	"k8s.io/apimachinery/pkg/api/meta"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

type MarketApplicationRuntimeService struct{}

func (svc *MarketApplicationRuntimeService) Render(ctx context.Context, requestInfo structs.RequestInfo, applicationID string, request dtos.ApplicationDeployRequest) (result dtos.ApplicationRenderResult, errorData common.ErrorData) {
	if errorData.Err = request.Validate(); errorData.IsNotNil() {
		errorData.MsgCode = config.MsgCodeRequestDataInvalid
		return
	}
	_, client, errorData := GetClusterAndUserClientSet(ctx, requestInfo)
	if errorData.IsNotNil() {
		return result, errorData
	}
	resources, errorData := svc.render(ctx, client, applicationID, requestInfo.Namespace, request.ReleaseName, request.Params, "")
	if errorData.IsNotNil() {
		return result, errorData
	}
	for _, resource := range resources {
		if resource.RenderStatus == "success" {
			result.Successes = append(result.Successes, resource)
		} else {
			result.Failures = append(result.Failures, resource)
		}
	}
	return
}

func (svc *MarketApplicationRuntimeService) Validate(ctx context.Context, requestInfo structs.RequestInfo, applicationID string, request dtos.ApplicationDeployRequest) (result dtos.ApplicationRenderResult, errorData common.ErrorData) {
	if errorData.Err = request.Validate(); errorData.IsNotNil() {
		errorData.MsgCode = config.MsgCodeRequestDataInvalid
		return
	}
	_, client, errorData := GetClusterAndUserClientSet(ctx, requestInfo)
	if errorData.IsNotNil() {
		return result, errorData
	}
	resources, errorData := svc.render(ctx, client, applicationID, requestInfo.Namespace, request.ReleaseName, request.Params, "")
	if errorData.IsNotNil() {
		return result, errorData
	}
	for i := range resources {
		resource := &resources[i]
		if resource.RenderStatus != "success" {
			resource.TryStatus = "failed"
			result.Failures = append(result.Failures, *resource)
			continue
		}
		applyApplicationResource(ctx, client, requestInfo.Namespace, resource, true)
		if resource.TryStatus == "success" {
			result.Successes = append(result.Successes, *resource)
		} else {
			result.Failures = append(result.Failures, *resource)
		}
	}
	return
}

func (svc *MarketApplicationRuntimeService) Deploy(ctx context.Context, requestInfo structs.RequestInfo, applicationID string, request dtos.ApplicationDeployRequest) (result dtos.ApplicationDetail, errorData common.ErrorData) {
	if errorData.Err = request.Validate(); errorData.IsNotNil() {
		errorData.MsgCode = config.MsgCodeRequestDataInvalid
		return
	}
	marketRepo := repositories.MarketApplicationRepository{DB: config.DBConnect}
	market, errorData := marketRepo.Get(ctx, applicationID)
	if errorData.IsNotNil() {
		return result, errorData
	}
	if market.State != 1 {
		errorData.Err = fmt.Errorf("market application %s is not published", applicationID)
		errorData.MsgCode = config.MsgCodeRequestDataInvalid
		return result, errorData
	}
	cluster, client, errorData := GetClusterAndUserClientSet(ctx, requestInfo)
	if errorData.IsNotNil() {
		return result, errorData
	}

	create := dtos.ApplicationCreate{
		MarketApplicationId: applicationID, ApplicationName: market.Name,
		ClusterId: cluster.ID, ClusterCode: cluster.Code, Namespace: requestInfo.Namespace,
		ReleaseName: request.ReleaseName, Description: request.Description,
		Params: cloneRenderParams(request.Params), Result: "pending", Status: "Deploying",
	}
	create.Default(ctx)
	applicationRepo := repositories.ApplicationRepository{DB: config.DBConnect}
	result, errorData = applicationRepo.Add(ctx, create)
	if errorData.IsNotNil() {
		return
	}

	resources, renderError := svc.render(ctx, client, applicationID, requestInfo.Namespace, request.ReleaseName, request.Params, create.ID)
	if renderError.IsNotNil() {
		config.DBConnect.WithContext(ctx).Table("application").Where("id = ?", create.ID).Update("result", "failed")
		_, _ = applicationRepo.UpdateState(ctx, create.ID, "Failed", resources)
		return result, renderError
	}
	successCount := 0
	for i := range resources {
		resource := &resources[i]
		if resource.RenderStatus != "success" {
			continue
		}
		applyApplicationResource(ctx, client, requestInfo.Namespace, resource, false)
		if resource.DeployStatus == "success" {
			successCount++
		}
	}
	resultValue, status := "failed", "Failed"
	if successCount == len(resources) && successCount > 0 {
		resultValue, status = "success", "Running"
	} else if successCount > 0 {
		resultValue = "partial"
	}
	config.DBConnect.WithContext(ctx).Table("application").Where("id = ?", create.ID).Update("result", resultValue)
	return applicationRepo.UpdateState(ctx, create.ID, status, resources)
}

func (svc *MarketApplicationRuntimeService) Delete(ctx context.Context, requestInfo structs.RequestInfo, id string) (result dtos.ApplicationDetail, errorData common.ErrorData) {
	repo := repositories.ApplicationRepository{DB: config.DBConnect}
	result, errorData = repo.Get(ctx, id)
	if errorData.IsNotNil() {
		return
	}
	if result.ClusterCode != requestInfo.ClusterCode || result.Namespace != requestInfo.Namespace {
		errorData.Err = fmt.Errorf("deployment %s is not in cluster %s namespace %s", id, requestInfo.ClusterCode, requestInfo.Namespace)
		errorData.MsgCode = config.MsgCodeRequestDataInvalid
		return
	}
	_, client, errorData := GetClusterAndUserClientSet(ctx, requestInfo)
	if errorData.IsNotNil() {
		return result, errorData
	}
	resources := result.Resources
	deleteFailed := false
	for i := len(resources) - 1; i >= 0; i-- {
		resource := &resources[i]
		if resource.DeployStatus != "success" {
			continue
		}
		mapping, err := client.GetResourceMapping(resource.APIResource.GroupVersion, resource.APIResource.Kind)
		if err != nil {
			resource.Message = err.Error()
			deleteFailed = true
			continue
		}
		if mapping.Scope.Name() == meta.RESTScopeNameNamespace {
			err = client.DynamicClient.Resource(mapping.Resource).Namespace(result.Namespace).Delete(ctx, resource.ResourceName, metav1.DeleteOptions{})
		} else {
			err = client.DynamicClient.Resource(mapping.Resource).Delete(ctx, resource.ResourceName, metav1.DeleteOptions{})
		}
		if err != nil && !apierrors.IsNotFound(err) {
			resource.Message = err.Error()
			deleteFailed = true
			continue
		}
		resource.DeployStatus = "deleted"
	}
	if deleteFailed {
		result, _ = repo.UpdateState(ctx, id, "Failed", resources)
		errorData.Err = fmt.Errorf("one or more Kubernetes resources could not be deleted")
		errorData.MsgCode = config.MsgCodeDeleteRecordFailed
		errorData.ResponseCode = 500
		return
	}
	return repo.UpdateState(ctx, id, "Deleted", resources)
}

func (svc *MarketApplicationRuntimeService) render(ctx context.Context, client *ClusterClientSet, applicationID, namespace, releaseName string, supplied dtos.ApplicationRenderParams, deploymentID string) (resources dtos.ApplicationKubernetesResources, errorData common.ErrorData) {
	marketRepo := repositories.MarketApplicationRepository{DB: config.DBConnect}
	market, errorData := marketRepo.Get(ctx, applicationID)
	if errorData.IsNotNil() {
		return resources, errorData
	}
	if market.State != 1 {
		errorData.Err = fmt.Errorf("market application %s is not published", applicationID)
		errorData.MsgCode = config.MsgCodeRequestDataInvalid
		return resources, errorData
	}
	params, err := prepareApplicationParams(market.Parameters, supplied, releaseName, namespace)
	if err != nil {
		errorData.Err = err
		errorData.MsgCode = config.MsgCodeRequestDataInvalid
		return resources, errorData
	}
	for templateIndex, source := range market.Templates {
		for resourceIndex, sourceResource := range utils.SplitKubernetesResources(source) {
			resource := dtos.ApplicationKubernetesResource{Key: fmt.Sprintf("%d-%d", templateIndex, resourceIndex), Namespace: namespace}
			rendered, err := renderApplicationTemplate(sourceResource, params)
			if err != nil {
				resource.Content = sourceResource
				resource.RenderStatus = "failed"
				resource.Message = err.Error()
				resources = append(resources, resource)
				continue
			}
			obj, err := utils.YamlToUnstructured(rendered)
			if err != nil {
				resource.Content = rendered
				resource.RenderStatus = "failed"
				resource.Message = err.Error()
				resources = append(resources, resource)
				continue
			}
			mapping, err := client.GetResourceMapping(obj.GetAPIVersion(), obj.GetKind())
			if err != nil {
				resource.Content = rendered
				resource.RenderStatus = "failed"
				resource.Message = err.Error()
				resources = append(resources, resource)
				continue
			}
			if mapping.Scope.Name() == meta.RESTScopeNameNamespace {
				obj.SetNamespace(namespace)
			} else {
				obj.SetNamespace("")
			}
			labels := obj.GetLabels()
			if labels == nil {
				labels = map[string]string{}
			}
			labels["app.kubernetes.io/instance"] = releaseName
			labels["app.kubernetes.io/managed-by"] = "kube-keeper"
			labels["efucloud.com/market-application-id"] = applicationID
			if deploymentID != "" {
				labels["efucloud.com/application-id"] = deploymentID
			}
			obj.SetLabels(labels)
			content, err := yaml.Marshal(obj.Object)
			if err != nil {
				resource.Content = rendered
				resource.RenderStatus = "failed"
				resource.Message = err.Error()
				resources = append(resources, resource)
				continue
			}
			resource.Content = string(content)
			resource.ResourceName = obj.GetName()
			resource.RenderStatus = "success"
			resource.APIResource = dtos.APIResource{Name: mapping.Resource.Resource, Namespaced: mapping.Scope.Name() == meta.RESTScopeNameNamespace, GroupVersion: obj.GetAPIVersion(), Kind: obj.GetKind(), Group: mapping.Resource.Group, Version: mapping.Resource.Version}
			resources = append(resources, resource)
		}
	}
	return
}

func renderApplicationTemplate(name string, params dtos.ApplicationRenderParams) (string, error) {
	tmpl, err := template.New("application").Option("missingkey=error").Funcs(template.FuncMap{
		"indent": func(spaces int, value interface{}) string {
			prefix := strings.Repeat(" ", spaces)
			lines := strings.Split(fmt.Sprint(value), "\n")
			for i := range lines {
				lines[i] = prefix + lines[i]
			}
			return strings.Join(lines, "\n")
		},
		"nindent": func(spaces int, value interface{}) string {
			prefix := strings.Repeat(" ", spaces)
			lines := strings.Split(fmt.Sprint(value), "\n")
			for i := range lines {
				lines[i] = prefix + lines[i]
			}
			return "\n" + strings.Join(lines, "\n")
		},
		"toYaml": func(value interface{}) (string, error) {
			content, err := yaml.Marshal(value)
			return strings.TrimSuffix(string(content), "\n"), err
		},
	}).Delims("_{{_", "_}}_").Parse(name)
	if err != nil {
		return "", err
	}
	var output bytes.Buffer
	if err = tmpl.Execute(&output, params); err != nil {
		return "", err
	}
	return strings.TrimSpace(output.String()), nil
}

func prepareApplicationParams(definitions dtos.ParameterDefinitions, supplied dtos.ApplicationRenderParams, releaseName, namespace string) (dtos.ApplicationRenderParams, error) {
	params := make(dtos.ApplicationRenderParams, len(definitions)+len(supplied)+2)
	for _, definition := range definitions {
		if definition.DefaultValue != nil {
			params[definition.Name] = *definition.DefaultValue
		}
	}
	for key, value := range supplied {
		params[key] = value
	}
	params["name"] = releaseName
	params["namespace"] = namespace

	for _, definition := range definitions {
		value, exists := params[definition.Name]
		if !exists || strings.TrimSpace(value) == "" {
			return nil, fmt.Errorf("required application parameter %s is missing", definition.Name)
		}
	}
	return params, nil
}

func applyApplicationResource(ctx context.Context, client *ClusterClientSet, namespace string, resource *dtos.ApplicationKubernetesResource, dryRun bool) {
	obj, err := utils.YamlToUnstructured(resource.Content)
	if err == nil {
		var mapping *meta.RESTMapping
		mapping, err = client.GetResourceMapping(obj.GetAPIVersion(), obj.GetKind())
		if err == nil {
			options := metav1.CreateOptions{}
			if dryRun {
				options.DryRun = []string{metav1.DryRunAll}
			}
			var createdName string
			if mapping.Scope.Name() == meta.RESTScopeNameNamespace {
				created, createErr := client.DynamicClient.Resource(mapping.Resource).Namespace(namespace).Create(ctx, obj, options)
				err = createErr
				if created != nil {
					createdName = created.GetName()
				}
			} else {
				created, createErr := client.DynamicClient.Resource(mapping.Resource).Create(ctx, obj, options)
				err = createErr
				if created != nil {
					createdName = created.GetName()
				}
			}
			if err == nil && createdName != "" {
				resource.ResourceName = createdName
			}
		}
	}
	if err != nil {
		resource.Message = err.Error()
		if dryRun {
			resource.TryStatus = "failed"
		} else {
			resource.DeployStatus = "failed"
		}
		return
	}
	resource.Message = ""
	if dryRun {
		resource.TryStatus = "success"
	} else {
		resource.DeployStatus = "success"
	}
}

func cloneRenderParams(source dtos.ApplicationRenderParams) dtos.ApplicationRenderParams {
	result := make(dtos.ApplicationRenderParams, len(source))
	for key, value := range source {
		result[key] = value
	}
	return result
}

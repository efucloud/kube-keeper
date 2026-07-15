package integrations

import (
	"context"
	"github.com/efucloud/common"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/goharbor/go-client/pkg/harbor"
	"github.com/goharbor/go-client/pkg/sdk/v2.0/client/artifact"
	"github.com/goharbor/go-client/pkg/sdk/v2.0/client/project"
	"github.com/goharbor/go-client/pkg/sdk/v2.0/models"
)

type Harbor struct {
	URL       string
	Insecure  bool
	Username  string
	Password  string
	clientSet *harbor.ClientSet
	ctx       context.Context
}

func NewHarborClient(ctx context.Context, url, username, password string, insecure bool) (client *Harbor, errorData common.ErrorData) {
	client = &Harbor{
		URL:      url,
		Username: username,
		Password: password,
		Insecure: insecure,
		ctx:      ctx,
	}

	client.clientSet, errorData.Err = harbor.NewClientSet(&harbor.ClientSetConfig{
		URL:      client.URL,
		Insecure: client.Insecure,
		Username: client.Username,
		Password: client.Password,
	})
	return client, errorData
}
func (repo *Harbor) ListProjects(params dtos.ListProjectsParams) (proj *project.ListProjectsOK, errorData common.ErrorData) {
	option := project.ListProjectsParams{}
	if len(params.Name) > 0 {
		option.Name = common.Ptr(params.Name)
	}
	if len(params.Owner) > 0 {
		option.Owner = common.Ptr(params.Owner)
	}
	if params.Page > 0 {
		option.Page = common.Ptr(params.Page)
	}
	if params.PageSize > 0 {
		option.PageSize = common.Ptr(params.PageSize)
	}
	if params.Public {
		option.Public = common.Ptr(params.Public)
	}
	if len(params.Q) > 0 {
		option.Q = common.Ptr(params.Q)
	}
	if len(params.Sort) > 0 {
		option.Sort = common.Ptr(params.Sort)
	}
	proj, errorData.Err = repo.clientSet.V2().Project.ListProjects(repo.ctx, &option)
	return
}

func (repo *Harbor) CreateProject(model models.ProjectReq) (proj *project.CreateProjectCreated, errorData common.ErrorData) {
	proj, errorData.Err = repo.clientSet.V2().Project.CreateProject(repo.ctx, &project.CreateProjectParams{Project: &model})
	return
}

func (repo *Harbor) ListArtifacts() (results []*models.Artifact, errorData common.ErrorData) {
	var artifacts *artifact.ListArtifactsOK
	artifacts, errorData.Err = repo.clientSet.V2().Artifact.ListArtifacts(repo.ctx, &artifact.ListArtifactsParams{})
	results = artifacts.Payload
	return
}
func (repo *Harbor) GetArtifact(params dtos.GetArtifactParams) (result *artifact.GetArtifactOK, errorData common.ErrorData) {
	option := artifact.GetArtifactParams{}
	if params.Page > 0 {
		option.Page = common.Ptr(params.Page)
	}
	if params.PageSize > 0 {
		option.PageSize = common.Ptr(params.PageSize)
	}
	if len(params.ProjectName) > 0 {
		option.ProjectName = params.ProjectName
	}
	if len(params.Reference) > 0 {
		option.Reference = params.Reference
	}
	if len(params.RepositoryName) > 0 {
		option.RepositoryName = params.RepositoryName
	}
	if params.WithAccessory {
		option.WithAccessory = common.Ptr(params.WithAccessory)
	}
	if params.WithImmutableStatus {
		option.WithImmutableStatus = common.Ptr(params.WithImmutableStatus)
	}
	if params.WithLabel {
		option.WithLabel = common.Ptr(params.WithLabel)
	}
	if params.WithScanOverview {
		option.WithScanOverview = common.Ptr(params.WithScanOverview)
	}
	if params.WithSignature {
		option.WithSignature = common.Ptr(params.WithSignature)
	}
	if params.WithTag {
		option.WithTag = common.Ptr(params.WithTag)
	}
	result, errorData.Err = repo.clientSet.V2().Artifact.GetArtifact(repo.ctx, &option)
	return
}

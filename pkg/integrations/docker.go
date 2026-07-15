package integrations

import (
	"context"
	"encoding/base64"
	"fmt"
	"github.com/docker/docker/api/types/image"
	"github.com/docker/docker/client"
	"github.com/efucloud/common"
	"github.com/efucloud/kube-keeper/pkg/models/dtos"
	"github.com/emicklei/go-restful/v3"
	"io"
	"strings"
)

type Docker struct {
	URL      string
	Insecure bool
	Username string
	Password string
}

func (repo *Docker) DownloadImage(ctx context.Context, source string, auth dtos.RegistryAuth, resp *restful.Response) {
	var (
		cli *client.Client
		err common.ErrorData
	)

	cli, err.Err = client.NewClientWithOpts(client.WithAPIVersionNegotiation())
	if err.IsNotNil() {
		_, _ = resp.Write([]byte(err.Err.Error()))
		return
	}

	var reader io.ReadCloser
	reader, err.Err = cli.ImagePull(ctx, source, image.PullOptions{
		RegistryAuth: base64.StdEncoding.EncodeToString([]byte(fmt.Sprintf("%s:%s", auth.Username, auth.Password))),
	})

	if err.IsNotNil() {
		_, _ = resp.Write([]byte(err.Err.Error()))
	}
	defer reader.Close()
	fileName := strings.Replace(strings.Replace(source, "/", "_", -1), ":", "-", -1)
	resp.Header().Set("Content-Disposition", fmt.Sprintf(`attachment; filename="%s.tar"`, fileName))
	resp.Header().Set("Content-Type", "application/octet-stream")
	_, _ = io.Copy(resp.ResponseWriter, reader)
	return
}
func (repo *Docker) PushImage(ctx context.Context, imagePath string, auth dtos.RegistryAuth) (err common.ErrorData) {

	return
}
func (repo *Docker) ReTag(ctx context.Context, source, target, platform string, sourceAuth, targetAuth dtos.RegistryAuth) (err common.ErrorData) {
	var cli *client.Client
	cli, err.Err = client.NewClientWithOpts(client.WithAPIVersionNegotiation())
	if err.IsNotNil() {
		return err
	}
	var reader io.ReadCloser
	reader, err.Err = cli.ImagePull(ctx, source, image.PullOptions{
		Platform:     platform,
		RegistryAuth: base64.StdEncoding.EncodeToString([]byte(fmt.Sprintf("%s:%s", sourceAuth.Username, sourceAuth.Password))),
	})
	if err.IsNotNil() {
		return
	}
	defer reader.Close()
	err.Err = cli.ImageTag(ctx, source, target)
	if err.IsNotNil() {
		return
	}
	_, err.Err = cli.ImagePush(ctx, target, image.PushOptions{
		RegistryAuth: base64.StdEncoding.EncodeToString([]byte(fmt.Sprintf("%s:%s", targetAuth.Username, targetAuth.Password))),
	})
	if err.IsNotNil() {
		return
	}
	cli.ImageRemove(ctx, target, image.RemoveOptions{
		Force:         true,
		PruneChildren: true,
	})
	return
}

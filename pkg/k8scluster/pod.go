package k8scluster

import (
	"bytes"
	"context"
	"errors"
	"fmt"
	"github.com/efucloud/common"
	config2 "github.com/efucloud/kube-keeper/pkg/config"
	database2 "github.com/efucloud/kube-keeper/pkg/k8scluster/database"
	dtos2 "github.com/efucloud/kube-keeper/pkg/models/dtos"
	structs2 "github.com/efucloud/kube-keeper/pkg/structs"
	"github.com/emicklei/go-restful/v3"
	"github.com/gorilla/websocket"
	"io"
	corev1 "k8s.io/api/core/v1"
	k8serrors "k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/client-go/kubernetes/scheme"
	"k8s.io/client-go/tools/remotecommand"
	"net"
	"net/http"
	"path"
	"strconv"
	"strings"
	"syscall"
	"time"
	"unicode/utf8"
)

type PodService struct {
}

var upgrader = websocket.Upgrader{
	CheckOrigin:      func(r *http.Request) bool { return true },
	HandshakeTimeout: 5 * time.Second,
}

func (svc *PodService) CreateClusterTerminalPod(req *restful.Request, resp *restful.Response) {
	lang := common.GetLanguageFromReq(req, config2.RequestLanguage)
	ctx := context.WithValue(context.Background(), config2.RequestLanguage, lang)
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	result := dtos2.ClusterTerminalPodInfo{}
	writeResult := func() {
		common.ResponseSuccess(resp, result)
	}
	writeErr := func(msg string, err error) {
		if err != nil {
			result.Message = fmt.Sprintf("%s: %s", msg, err.Error())
		} else {
			result.Message = msg
		}
		writeResult()
	}

	accountValue := req.Attribute(config2.RequestUserId)
	accountId, _ := accountValue.(string)
	accountId = strings.TrimSpace(accountId)
	clusterCode := strings.TrimSpace(req.PathParameter("cluster"))
	result.TargetCluster = clusterCode

	clusterSvc := database2.ClusterService{}
	managerCluster, _ := clusterSvc.GetClusterByCode(ctx, "manager")
	if len(managerCluster.ID) == 0 {
		writeErr("manager cluster is not found", nil)
		return
	}
	managerCluster.Default(ctx)
	result.Cluster = managerCluster.Code

	targetCluster, _ := clusterSvc.GetClusterByCode(ctx, clusterCode)
	if len(targetCluster.ID) == 0 {
		writeErr(fmt.Sprintf("target cluster is not found: %s", clusterCode), nil)
		return
	}
	targetCluster.Default(ctx)
	result.TargetCluster = targetCluster.Code

	var errorData common.ErrorData
	clientSet, errorData := NewAdminClientSetForConfigByCluster(managerCluster)
	if errorData.IsNotNil() {
		writeErr("create manager cluster clientset failed", errorData.Err)
		return
	}

	clusterAccSvc := database2.ClusterAccountService{}
	clusterAccount, _ := clusterAccSvc.GetClusterAccountInfoByAccountID(ctx, targetCluster.ID, accountId)
	if len(clusterAccount.ID) == 0 {
		writeErr(fmt.Sprintf("cluster account is not found for target cluster: %s", targetCluster.Code), nil)
		return
	}
	clusterAccount.Default(ctx)
	if !strings.EqualFold(clusterAccount.State, "Approved") {
		writeErr(fmt.Sprintf("cluster account state is %s, expected Approved", clusterAccount.State), nil)
		return
	}
	if strings.TrimSpace(clusterAccount.ClientCertificate) == "" || strings.TrimSpace(clusterAccount.ClientKey) == "" {
		writeErr("cluster account certificate or key is empty", nil)
		return
	}

	email := strings.TrimSpace(clusterAccount.Email)
	namespace := req.PathParameter("namespace")
	if namespace == "" {
		namespace = "default"
	}
	kubeConfigData, err := buildKubeConfigFromAccountCsr(targetCluster, clusterAccount, email, namespace)
	if err != nil {
		writeErr("build kubeconfig from account csr failed", err)
		return
	}

	runNamespace := strings.TrimSpace(config2.RunNamespace)
	if runNamespace == "" {
		runNamespace = "efucloud"
	}
	result.Namespace = runNamespace
	terminalImage := strings.TrimSpace(config2.ApplicationConfig.TerminalContainer)
	if terminalImage == "" {
		terminalImage = "registry.cn-shenzhen.aliyuncs.com/efucloud-public/k8s-tools:v1.0.0.03132013"
	}

	targetClusterLabelValue := sanitizeLabelValue(targetCluster.Code)
	ownerLabelValue := sanitizeLabelValue(accountId)
	terminalLabels := map[string]string{
		"app":                                  "k8s-tools",
		"efucloud.com/terminal":                "efucloud",
		"efucloud.com/terminal.target.cluster": targetClusterLabelValue,
		"efucloud.com/terminal.owner":          ownerLabelValue,
	}

	terminalContainerName := "k8s-tools"
	expireAtUnix := time.Now().Add(2 * time.Hour).Unix()
	expireAt := fmt.Sprintf("%d", expireAtUnix)
	secretClient := clientSet.K8sClientSet.CoreV1().Secrets(runNamespace)
	deleteSecretIfExists := func(secretName string) {
		deleteErr := secretClient.Delete(ctx, secretName, metav1.DeleteOptions{})
		if deleteErr != nil && !k8serrors.IsNotFound(deleteErr) {
			config2.Logger.Warnf("delete terminal secret %s/%s failed: %v", runNamespace, secretName, deleteErr)
		}
	}
	upsertKubeConfigSecret := func(secretName string) error {
		currentSecret, getErr := secretClient.Get(ctx, secretName, metav1.GetOptions{})
		if getErr != nil {
			if !k8serrors.IsNotFound(getErr) {
				return getErr
			}
			_, getErr = secretClient.Create(ctx, &corev1.Secret{
				ObjectMeta: metav1.ObjectMeta{
					Name:      secretName,
					Namespace: runNamespace,
					Labels:    terminalLabels,
				},
				Type: corev1.SecretTypeOpaque,
				Data: map[string][]byte{
					"config": kubeConfigData,
				},
			}, metav1.CreateOptions{})
			return getErr
		}

		if currentSecret.Labels == nil {
			currentSecret.Labels = map[string]string{}
		}
		for k, v := range terminalLabels {
			currentSecret.Labels[k] = v
		}
		if currentSecret.Data == nil {
			currentSecret.Data = map[string][]byte{}
		}
		currentSecret.Data["config"] = kubeConfigData
		_, getErr = secretClient.Update(ctx, currentSecret, metav1.UpdateOptions{})
		return getErr
	}

	podClient := clientSet.K8sClientSet.CoreV1().Pods(runNamespace)
	labelSelector := fmt.Sprintf(
		"efucloud.com/terminal=efucloud,efucloud.com/terminal.target.cluster=%s,efucloud.com/terminal.owner=%s",
		targetClusterLabelValue, ownerLabelValue,
	)
	existingPods, err := podClient.List(ctx, metav1.ListOptions{LabelSelector: labelSelector})
	if err != nil {
		writeErr("list terminal pods failed", err)
		return
	}

	var reusablePod *corev1.Pod
	for i := range existingPods.Items {
		pod := &existingPods.Items[i]
		if pod.DeletionTimestamp != nil {
			continue
		}
		if pod.Status.Phase == corev1.PodSucceeded || pod.Status.Phase == corev1.PodFailed {
			_ = podClient.Delete(ctx, pod.Name, metav1.DeleteOptions{})
			deleteSecretIfExists(pod.Name)
			continue
		}
		if !hasKubeConfigInjected(pod, pod.Name) {
			_ = podClient.Delete(ctx, pod.Name, metav1.DeleteOptions{})
			deleteSecretIfExists(pod.Name)
			continue
		}
		if reusablePod == nil {
			reusablePod = pod
			continue
		}
		_ = podClient.Delete(ctx, pod.Name, metav1.DeleteOptions{})
		deleteSecretIfExists(pod.Name)
	}

	if reusablePod != nil {
		if err = upsertKubeConfigSecret(reusablePod.Name); err != nil {
			writeErr("update kubeconfig secret failed", err)
			return
		}

		existingExpireAt := ""
		if reusablePod.Annotations != nil {
			existingExpireAt = strings.TrimSpace(reusablePod.Annotations["efucloud.com/terminal.expire"])
		}
		if existingExpireAt != "" {
			existingExpireUnix, parseErr := parseTerminalExpireUnix(existingExpireAt)
			if parseErr != nil {
				config2.Logger.Warnf(
					"delete reusable terminal pod %s/%s due to invalid expire annotation %q: %v",
					reusablePod.Namespace, reusablePod.Name, existingExpireAt, parseErr,
				)
			} else {
				result.Pod = reusablePod.Name
				result.Container = terminalContainerName
				result.Phase = string(reusablePod.Status.Phase)
				result.ExpireAt = existingExpireUnix
				result.Message = ""
				writeResult()
				return
			}
		}

		// Missing expire annotation: delete stale pod and continue as "no reusable pod found".
		deleteErr := podClient.Delete(ctx, reusablePod.Name, metav1.DeleteOptions{})
		if deleteErr != nil && !k8serrors.IsNotFound(deleteErr) {
			writeErr("delete stale reusable terminal pod failed", deleteErr)
			return
		}
		deleteSecretIfExists(reusablePod.Name)
	}

	suffix := common.MD5V(fmt.Sprintf("%d-%s-%s", time.Now().UnixNano(), targetCluster.ID, accountId))
	if len(suffix) > 12 {
		suffix = suffix[:12]
	}
	terminalPodName := "k8s-tools-" + suffix
	kubeConfigSecretName := terminalPodName
	if err = upsertKubeConfigSecret(kubeConfigSecretName); err != nil {
		writeErr("create kubeconfig secret failed", err)
		return
	}

	createPod := &corev1.Pod{
		ObjectMeta: metav1.ObjectMeta{
			Name:      terminalPodName,
			Namespace: runNamespace,
			Labels:    terminalLabels,
			Annotations: map[string]string{
				"efucloud.com/terminal.expire":         expireAt,
				"efucloud.com/terminal.target.cluster": targetCluster.Code,
				"efucloud.com/terminal.owner":          accountId,
			},
		},
		Spec: corev1.PodSpec{
			ServiceAccountName: "default",
			RestartPolicy:      corev1.RestartPolicyAlways,
			Volumes: []corev1.Volume{
				{
					Name: "kubeconfig",
					VolumeSource: corev1.VolumeSource{
						Secret: &corev1.SecretVolumeSource{
							SecretName: kubeConfigSecretName,
						},
					},
				},
			},
			Containers: []corev1.Container{
				{
					Name:            terminalContainerName,
					Image:           terminalImage,
					ImagePullPolicy: corev1.PullIfNotPresent,
					Env: []corev1.EnvVar{
						{Name: "KUBECONFIG", Value: "/root/.kube/config"},
					},
					VolumeMounts: []corev1.VolumeMount{
						{
							Name:      "kubeconfig",
							MountPath: "/root/.kube/config",
							SubPath:   "config",
							ReadOnly:  true,
						},
					},
				},
			},
		},
	}

	createdPod, err := podClient.Create(ctx, createPod, metav1.CreateOptions{})
	if err != nil && k8serrors.IsAlreadyExists(err) {
		createdPod, err = podClient.Get(ctx, terminalPodName, metav1.GetOptions{})
	}
	if err != nil {
		writeErr("create terminal pod failed", err)
		return
	}
	result.Pod = createdPod.Name
	result.Container = terminalContainerName
	result.Phase = string(createdPod.Status.Phase)
	result.ExpireAt = expireAtUnix
	result.Message = ""
	writeResult()

}

func sanitizeLabelValue(v string) string {
	raw := strings.TrimSpace(strings.ToLower(v))
	if raw == "" {
		return "unknown"
	}
	var b strings.Builder
	for _, r := range raw {
		if (r >= 'a' && r <= 'z') || (r >= '0' && r <= '9') || r == '-' || r == '_' || r == '.' {
			b.WriteRune(r)
		} else {
			b.WriteRune('-')
		}
	}
	out := strings.Trim(b.String(), "-_.")
	if out == "" {
		out = "unknown"
	}
	if len(out) > 63 {
		out = strings.Trim(out[:63], "-_.")
	}
	if out == "" {
		out = "unknown"
	}
	return out
}

func hasKubeConfigInjected(pod *corev1.Pod, secretName string) bool {
	hasSecretVolume := false
	for _, volume := range pod.Spec.Volumes {
		if volume.Name == "kubeconfig" && volume.Secret != nil && volume.Secret.SecretName == secretName {
			hasSecretVolume = true
			break
		}
	}
	if !hasSecretVolume || len(pod.Spec.Containers) == 0 {
		return false
	}
	for _, container := range pod.Spec.Containers {
		for _, vm := range container.VolumeMounts {
			if vm.Name == "kubeconfig" && vm.MountPath == "/root/.kube/config" && vm.SubPath == "config" {
				return true
			}
		}
	}
	return false
}

func (svc *PodService) PodContainerLog(req *restful.Request, resp *restful.Response) {
	var (
		errorData   common.ErrorData
		clientSet   *ClusterClientSet
		requestInfo structs2.RequestInfo
		account     dtos2.AccountDetail
	)
	lang := common.GetLanguageFromReq(req, config2.RequestLanguage)
	ctx := context.WithValue(context.Background(), config2.RequestLanguage, lang)
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	requestInfo = GetRequestInfo(req)
	conn, err := upgrader.Upgrade(resp.ResponseWriter, req.Request, nil)
	if err != nil {
		config2.Logger.Errorf("access: %s upgrade failed: %v", requestInfo.String(), err)
		return
	}
	defer conn.Close()

	accSvc := database2.AccountService{}
	account, _ = accSvc.GetAccountByID(ctx, requestInfo.AccountId)
	requestInfo.AccountId = account.ID
	requestInfo.Username = account.Username
	requestInfo.Email = account.Email
	pod := req.PathParameter("pod")
	container := req.PathParameter("container")
	_, clientSet, errorData = GetClusterAndUserClientSet(ctx, requestInfo)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("GetClusterAndUserClientSet failed: %v", errorData.Err.Error())
		_ = conn.WriteMessage(websocket.TextMessage, []byte(errorData.Err.Error()))
		return
	}
	if clientSet == nil {
		_ = conn.WriteMessage(websocket.TextMessage, []byte("can't get user info from request"))
		return
	}
	options := corev1.PodLogOptions{
		Container: container,
		Follow:    true,
	}
	if req.QueryParameter("previous") == "true" {
		options.Previous = true
	}
	if sinceSeconds := common.StringToInt64(req.QueryParameter("sinceSeconds")); sinceSeconds > 0 {
		options.SinceSeconds = &sinceSeconds
	}
	if req.QueryParameter("timestamps") == "true" {
		options.Timestamps = true
	}
	if tailLines := common.StringToInt64(req.QueryParameter("tailLines")); tailLines > 0 {
		options.TailLines = &tailLines
	}
	sinceTime := req.QueryParameter("sinceTime")
	if len(sinceTime) > 0 {
		if t, e := time.Parse(time.RFC3339, sinceTime); e == nil {
			*options.SinceTime = metav1.Time{Time: t}
		}
	}
	stream, err := clientSet.K8sClientSet.CoreV1().Pods(requestInfo.Namespace).GetLogs(pod, &options).Stream(ctx)
	if err != nil {
		config2.Logger.Error("get pod logs failed: %s", err.Error())
		_ = conn.WriteMessage(websocket.TextMessage, []byte(fmt.Sprintf("get pod logs failed: %s", err.Error())))
		return
	}
	defer stream.Close()
	buf := make([]byte, 1024)
	// 在 for 循环中增加 context 检查
	for {
		select {
		case <-ctx.Done():
			config2.Logger.Info("Request context canceled, stopping log stream")
			return
		default:
		}

		n, err := stream.Read(buf)
		if err != nil {
			if err == io.EOF {
				config2.Logger.Info("Log stream ended normally")
			} else {
				config2.Logger.Errorf("Error reading from log stream: %v", err)
			}
			break
		}

		if err := conn.WriteMessage(websocket.TextMessage, buf[:n]); err != nil {
			if err := conn.WriteMessage(websocket.TextMessage, buf[:n]); err != nil {
				// 判断是否为客户端正常/非恶意断开
				if websocket.IsCloseError(err, websocket.CloseNormalClosure, websocket.CloseGoingAway) ||
					strings.Contains(err.Error(), "broken pipe") ||
					strings.Contains(err.Error(), "connection reset") ||
					errors.Is(err, syscall.EPIPE) ||
					errors.Is(err, net.ErrClosed) {
					config2.Logger.Infof("Client disconnected during log streaming: %v", err)
				} else {
					config2.Logger.Errorf("Unexpected error writing to websocket: %v", err)
				}
				break // 退出读写循环
			}
			break
		}
	}
}
func (svc *PodService) PodTerminal(req *restful.Request, resp *restful.Response) {
	var (
		errorData   common.ErrorData
		audit       dtos2.TerminalAuditLogDetail
		pty         *TerminalSession
		clientSet   *ClusterClientSet
		requestInfo structs2.RequestInfo
		account     dtos2.AccountDetail
	)

	lang := common.GetLanguageFromReq(req, config2.RequestLanguage)
	ctx := context.WithValue(context.Background(), config2.RequestLanguage, lang)
	if reqCtx := req.Attribute(config2.RequestContext); reqCtx != nil {
		ctx = reqCtx.(context.Context)
	}
	requestInfo = GetRequestInfo(req)

	audit.Namespace = req.PathParameter("namespace")
	audit.PodName = req.PathParameter("pod")
	audit.Container = req.PathParameter("container")
	audit.AccountId = requestInfo.AccountId
	audit.AccountName = requestInfo.Username
	pty, errorData.Err = NewTerminalSession(resp.ResponseWriter, req.Request, nil, audit)
	if errorData.IsNotNil() {
		config2.Logger.Errorf("get pty failed: %v\n", errorData.Err.Error())
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	defer func() {
		pty.Close()
	}()
	accSvc := database2.AccountService{}
	account, _ = accSvc.GetAccountByID(ctx, requestInfo.AccountId)
	requestInfo.AccountId = account.ID
	requestInfo.Username = account.Username
	requestInfo.Email = account.Email
	if len(requestInfo.AccountId) == 0 {
		errorData.Err = fmt.Errorf("can't get account information from request, request data cluster: %s", requestInfo.ClusterCode)
		pty.Write([]byte(errorData.Err.Error()))
		return
	}
	_, clientSet, errorData = GetClusterAndUserClientSet(ctx, requestInfo)
	if errorData.IsNotNil() {
		config2.Logger.Error(errorData.Err)
		common.ResponseErrorMessage(ctx, req, resp, config2.Bundle, errorData)
		return
	}
	if clientSet == nil {
		pty.WriteString("can't build user cluster client set")
		return
	}
	pod, err := clientSet.K8sClientSet.CoreV1().Pods(requestInfo.Namespace).Get(ctx, audit.PodName, metav1.GetOptions{})
	if err != nil {
		msg := fmt.Sprintf("pod terminal failed, can't get namespace: %s pod: %s, err: %v\n", requestInfo.Namespace, audit.PodName, err)
		pty.Write([]byte(msg))
		return
	}
	if pod.Status.Phase == corev1.PodSucceeded || pod.Status.Phase == corev1.PodFailed {
		msg := fmt.Sprintf("cannot exec into a container in a completed pod; current phase is %s", pod.Status.Phase)
		config2.Logger.Error(msg)
		pty.Write([]byte(msg))
		return
	}
	var podContainer string
	for _, c := range pod.Spec.Containers {
		if audit.Container == c.Name {
			podContainer = audit.Container
		}
	}

	if len(podContainer) == 0 {
		for _, c := range pod.Spec.Containers {
			if strings.HasPrefix(pod.Name, c.Name) {
				podContainer = c.Name
				break
			}
		}
	}
	if len(podContainer) == 0 {
		for _, c := range pod.Spec.Containers {
			if strings.Contains(pod.Name, c.Name) {
				podContainer = c.Name
				break
			}
		}
	}
	if len(podContainer) == 0 {
		podContainer = pod.Spec.Containers[0].Name
	}
	pty.UpdateContainer(podContainer)
	var commands []string
	if len(req.QueryParameter("command")) != 0 {
		commands = append(commands, req.QueryParameter("command"))
	} else {
		commands = append(commands, "sh")
	}
	request := clientSet.K8sClientSet.CoreV1().RESTClient().Post().
		Resource("pods").
		Name(audit.PodName).
		Namespace(audit.Namespace)
	request = request.SubResource("exec")
	request.VersionedParams(&corev1.PodExecOptions{
		Container: podContainer,
		Command:   commands,
		Stdin:     true,
		Stdout:    true,
		Stderr:    true,
		TTY:       true,
	}, scheme.ParameterCodec)
	executor, err := remotecommand.NewSPDYExecutor(clientSet.Config, "POST", request.URL())
	if err != nil {
		config2.Logger.Error(err)
		_, _ = pty.Write([]byte(err.Error()))
		return
	}
	err = executor.StreamWithContext(ctx, remotecommand.StreamOptions{
		Stdin:             pty,
		Stdout:            pty,
		Stderr:            pty,
		TerminalSizeQueue: pty,
		Tty:               true,
	})
	if err != nil {
		config2.Logger.Error(err)
		_, _ = pty.Write([]byte(err.Error()))
	}

}
func (svc *PodService) ContainerExec(ctx context.Context, client *ClusterClientSet, namespace, podName, containerName string, command []string, stdin io.Reader, stdout io.Writer) ([]byte, common.ErrorData) {
	var errorData common.ErrorData

	errorData.MsgCode = config2.MsgCodeClusterContainerExecFailed
	req := client.K8sClientSet.CoreV1().RESTClient().Post().
		Resource("pods").
		Name(podName).
		Namespace(namespace).
		SubResource("exec")
	sch := runtime.NewScheme()
	if err := corev1.AddToScheme(sch); err != nil {
		errorData.Err = err
		errorData.Err = fmt.Errorf("command: %s exec failed \n\n err: %s  ", strings.Join(command, " "), errorData.Err.Error())
		return nil, errorData
	}

	parameterCodec := runtime.NewParameterCodec(sch)
	req.VersionedParams(&corev1.PodExecOptions{
		Command:   command,
		Container: containerName,
		Stdin:     stdin != nil,
		Stdout:    stdout != nil,
		Stderr:    true,
		TTY:       false,
	}, parameterCodec)

	exec, err := remotecommand.NewSPDYExecutor(client.Config, "POST", req.URL())
	if err != nil {
		errorData.Err = err
		return nil, errorData
	}

	var stderr bytes.Buffer
	err = exec.StreamWithContext(ctx, remotecommand.StreamOptions{
		Stdin:  stdin,
		Stdout: stdout,
		Stderr: &stderr,
		Tty:    false,
	})
	if err != nil {
		errorData.Err = err
		return nil, errorData
	}

	return stderr.Bytes(), errorData
}

const maxPodFilePreviewBytes = 256 * 1024

func isBinaryContent(content []byte) bool {
	if len(content) == 0 {
		return false
	}
	if bytes.IndexByte(content, 0) >= 0 {
		return true
	}
	return !utf8.Valid(content)
}

func parsePodFileEntry(line string) (entry dtos2.PodFileEntry, ok bool) {
	parts := strings.SplitN(line, "	", 6)
	if len(parts) != 6 {
		return entry, false
	}
	entry.Path = strings.TrimSpace(parts[1])
	if len(entry.Path) == 0 {
		return entry, false
	}
	entry.Name = path.Base(entry.Path)
	entry.Directory = parts[0] == "dir"
	entry.Binary = parts[3] == "true"
	entry.Text = !entry.Directory && !entry.Binary
	entry.Editable = parts[4] == "true"
	entry.Downloadable = parts[5] == "true"
	if size, err := strconv.ParseInt(strings.TrimSpace(parts[2]), 10, 64); err == nil {
		entry.Size = size
	}
	return entry, true
}

func (svc *PodService) ListPodFiles(ctx context.Context, requestInfo structs2.RequestInfo, model dtos2.PodFilePath) (result dtos2.PodFileList, errorData common.ErrorData) {
	var (
		clientSet *ClusterClientSet
		stderr    []byte
	)
	model.Default(ctx)
	result.Root = model.Dir
	result.Entries = []dtos2.PodFileEntry{}
	_, clientSet, errorData = GetClusterAndUserClientSet(ctx, requestInfo)
	if errorData.IsNotNil() {
		config2.Logger.Error(errorData.Err)
		return
	}
	command := []string{"sh", "-c", `root="$1"
find "$root" -mindepth 1 -maxdepth 1 \( -type d -o -type f \) | while IFS= read -r item; do
  if [ -d "$item" ]; then
    printf 'dir	%s	0	false	false	false
' "$item"
    continue
  fi
  size=$(wc -c < "$item" 2>/dev/null | tr -d '[:space:]')
  if [ ! -s "$item" ] || head -c 1024 "$item" 2>/dev/null | LC_ALL=C grep -Iq .; then
    printf 'file	%s	%s	false	true	true
' "$item" "${size:-0}"
  else
    printf 'file	%s	%s	true	false	true
' "$item" "${size:-0}"
  fi
done`, "sh", model.Dir}
	output := new(bytes.Buffer)
	stderr, errorData = svc.ContainerExec(ctx, clientSet, requestInfo.Namespace, model.Pod, model.Container, command, nil, output)
	if len(stderr) != 0 {
		errorData.Err = errors.New(string(stderr))
		config2.Logger.Errorf("list entries: %s failed, command: %s  err: %s",
			path.Join(requestInfo.Namespace, model.Pod, model.Container, model.Dir),
			strings.Join(command, " "), string(stderr))
	}
	if errorData.IsNotNil() {
		config2.Logger.Errorf("list entries: %s failed, command: %s  err: %s",
			path.Join(requestInfo.Namespace, model.Pod, model.Container, model.Dir),
			strings.Join(command, " "), errorData.Err.Error())
		return
	}
	lines := strings.Split(output.String(), "\n")
	for _, line := range lines {
		line = strings.TrimSpace(line)
		if len(line) == 0 {
			continue
		}
		entry, ok := parsePodFileEntry(line)
		if !ok {
			continue
		}
		result.Entries = append(result.Entries, entry)
	}
	return
}

func normalizePodFileName(name string) (string, error) {
	trimmed := strings.TrimSpace(name)
	if trimmed == "" {
		return "", errors.New("file name is required")
	}
	if trimmed == "." || trimmed == ".." || strings.Contains(trimmed, "/") {
		return "", errors.New("invalid file name")
	}
	return trimmed, nil
}

func (svc *PodService) CreateFileToContainer(ctx context.Context, requestInfo structs2.RequestInfo, model dtos2.PodFilePath, directory bool) (result dtos2.PodFilePath, errorData common.ErrorData) {
	var (
		clientSet *ClusterClientSet
		stderr    []byte
	)
	model.Default(ctx)
	name, err := normalizePodFileName(model.FileName)
	if err != nil {
		errorData.Err = err
		return
	}
	target := path.Join(model.Dir, name)
	_, clientSet, errorData = GetClusterAndUserClientSet(ctx, requestInfo)
	if errorData.IsNotNil() {
		config2.Logger.Error(errorData.Err)
		return
	}
	command := []string{"sh", "-c", `target="$1"
if [ "$2" = "true" ]; then
  mkdir -p "$target"
else
  mkdir -p "$(dirname "$target")"
  touch "$target"
fi`, "sh", target, strconv.FormatBool(directory)}
	stderr, errorData = svc.ContainerExec(ctx, clientSet, requestInfo.Namespace, model.Pod, model.Container, command, nil, nil)
	if len(stderr) != 0 {
		errorData.Err = errors.New(string(stderr))
	}
	if errorData.IsNotNil() {
		config2.Logger.Errorf("create file entry: %s failed, command: %s err: %s",
			path.Join(requestInfo.Namespace, model.Pod, model.Container, target),
			strings.Join(command, " "), errorData.Err.Error())
		return
	}
	result.Pod = model.Pod
	result.Container = model.Container
	result.Dir = target
	result.FileName = name
	return
}

func (svc *PodService) RenameFileInContainer(ctx context.Context, requestInfo structs2.RequestInfo, model dtos2.PodFilePath, newName string) (result dtos2.PodFilePath, errorData common.ErrorData) {
	var (
		clientSet *ClusterClientSet
		stderr    []byte
	)
	model.Default(ctx)
	name, err := normalizePodFileName(newName)
	if err != nil {
		errorData.Err = err
		return
	}
	target := path.Join(path.Dir(model.Dir), name)
	_, clientSet, errorData = GetClusterAndUserClientSet(ctx, requestInfo)
	if errorData.IsNotNil() {
		config2.Logger.Error(errorData.Err)
		return
	}
	command := []string{"mv", model.Dir, target}
	stderr, errorData = svc.ContainerExec(ctx, clientSet, requestInfo.Namespace, model.Pod, model.Container, command, nil, nil)
	if len(stderr) != 0 {
		errorData.Err = errors.New(string(stderr))
	}
	if errorData.IsNotNil() {
		config2.Logger.Errorf("rename file entry: %s failed, command: %s err: %s",
			path.Join(requestInfo.Namespace, model.Pod, model.Container, model.Dir),
			strings.Join(command, " "), errorData.Err.Error())
		return
	}
	result.Pod = model.Pod
	result.Container = model.Container
	result.Dir = target
	result.FileName = name
	return
}

func (svc *PodService) DeleteFileFromContainer(ctx context.Context, requestInfo structs2.RequestInfo, model dtos2.PodFilePath) (result dtos2.PodFilePath, errorData common.ErrorData) {
	var (
		clientSet *ClusterClientSet
		stderr    []byte
	)
	model.Default(ctx)
	_, clientSet, errorData = GetClusterAndUserClientSet(ctx, requestInfo)
	if errorData.IsNotNil() {
		config2.Logger.Error(errorData.Err)
		return
	}
	command := []string{"sh", "-c", `target="$1"
if [ -d "$target" ]; then
  rm -rf "$target"
else
  rm -f "$target"
fi`, "sh", model.Dir}
	stderr, errorData = svc.ContainerExec(ctx, clientSet, requestInfo.Namespace, model.Pod, model.Container, command, nil, nil)
	if len(stderr) != 0 {
		errorData.Err = errors.New(string(stderr))
	}
	if errorData.IsNotNil() {
		config2.Logger.Errorf("delete file entry: %s failed, command: %s err: %s",
			path.Join(requestInfo.Namespace, model.Pod, model.Container, model.Dir),
			strings.Join(command, " "), errorData.Err.Error())
		return
	}
	result = model
	return
}

func (svc *PodService) DownloadFileFromContainer(ctx context.Context, requestInfo structs2.RequestInfo, model dtos2.PodFilePath) (output *bytes.Buffer, errorData common.ErrorData) {
	var (
		clientSet *ClusterClientSet
		stderr    []byte
	)
	model.Default(ctx)
	_, clientSet, errorData = GetClusterAndUserClientSet(ctx, requestInfo)
	if errorData.IsNotNil() {
		config2.Logger.Error(errorData.Err)
		return
	}
	output = new(bytes.Buffer)
	command := []string{"cat", model.Dir}
	stderr, errorData = svc.ContainerExec(ctx, clientSet, requestInfo.Namespace, model.Pod, model.Container, command, nil, output)
	if len(stderr) != 0 {
		errorData.Err = errors.New(string(stderr))
		config2.Logger.Errorf("download file: %s failed, command: %s  err: %s",
			path.Join(requestInfo.Namespace, model.Pod, model.Container, model.Dir),
			strings.Join(command, " "), string(stderr))
	}
	if errorData.IsNotNil() {
		config2.Logger.Errorf("list file: %s failed, command: %s  err: %s",
			path.Join(requestInfo.Namespace, model.Pod, model.Container, model.Dir),
			strings.Join(command, " "), errorData.Err.Error())
	}
	return
}

func (svc *PodService) UploadFileFromContainer(ctx context.Context, requestInfo structs2.RequestInfo, model dtos2.PodFilePath, stdin io.Reader) (errorData common.ErrorData) {
	var (
		clientSet *ClusterClientSet
		stderr    []byte
	)
	model.Default(ctx)
	_, clientSet, errorData = GetClusterAndUserClientSet(ctx, requestInfo)
	if errorData.IsNotNil() {
		config2.Logger.Error(errorData.Err)
		return
	}
	command := []string{"mkdir", "-p", model.Dir}
	stderr, errorData = svc.ContainerExec(ctx, clientSet, requestInfo.Namespace, model.Pod, model.Container, command, nil, nil)
	if len(stderr) != 0 {
		config2.Logger.Errorf("create dir: %s failed, err: %s", model.Dir, stderr)
		return
	}
	if errorData.IsNotNil() {
		config2.Logger.Errorf("create dir: %s failed, err: %s", model.Dir, errorData.Err.Error())
		return
	}
	filePath := path.Join(model.Dir, model.FileName)
	command = []string{"rm", "-f", filePath}
	stderr, errorData = svc.ContainerExec(ctx, clientSet, requestInfo.Namespace, model.Pod, model.Container, command, nil, nil)
	if len(stderr) != 0 {
		config2.Logger.Errorf("create file: %s failed, err: %s", filePath, stderr)
		return
	}
	if errorData.IsNotNil() {
		config2.Logger.Errorf("create file: %s failed, err: %s", filePath, errorData.Err.Error())
		return
	}
	command = []string{"touch", filePath}
	stderr, errorData = svc.ContainerExec(ctx, clientSet, requestInfo.Namespace, model.Pod, model.Container, command, nil, nil)
	if len(stderr) != 0 {
		config2.Logger.Errorf("create file: %s failed, err: %s", filePath, stderr)
		return
	}
	if errorData.IsNotNil() {
		config2.Logger.Errorf("create file: %s failed, err: %s", filePath, errorData.Err.Error())
		return
	}
	command = []string{"cp", "/dev/stdin", filePath}
	stderr, errorData = svc.ContainerExec(ctx, clientSet, requestInfo.Namespace, model.Pod, model.Container, command, stdin, nil)
	if len(stderr) != 0 {
		config2.Logger.Errorf("write content to file: %s failed, err: %s", filePath, stderr)
		return
	}
	if errorData.IsNotNil() {
		config2.Logger.Errorf("write content to file : %s failed, err: %s", filePath, errorData.Err.Error())
		return
	}
	return
}

func (svc *PodService) ReadFileContentFromContainer(ctx context.Context, requestInfo structs2.RequestInfo, model dtos2.PodFilePath) (result dtos2.PodFileContent, errorData common.ErrorData) {
	var (
		clientSet *ClusterClientSet
		stderr    []byte
	)
	model.Default(ctx)
	result.Dir = model.Dir
	result.FileName = model.FileName
	if result.FileName == "" {
		result.FileName = path.Base(model.Dir)
	}
	result.MaxBytes = maxPodFilePreviewBytes
	result.Language = "plaintext"
	result.Writable = true
	_, clientSet, errorData = GetClusterAndUserClientSet(ctx, requestInfo)
	if errorData.IsNotNil() {
		config2.Logger.Error(errorData.Err)
		return
	}
	sizeOutput := new(bytes.Buffer)
	command := []string{"sh", "-c", "wc -c < \"$1\"", "sh", model.Dir}
	stderr, errorData = svc.ContainerExec(ctx, clientSet, requestInfo.Namespace, model.Pod, model.Container, command, nil, sizeOutput)
	if len(stderr) != 0 {
		errorData.Err = errors.New(string(stderr))
		config2.Logger.Errorf("get file size: %s failed, command: %s  err: %s",
			path.Join(requestInfo.Namespace, model.Pod, model.Container, model.Dir),
			strings.Join(command, " "), string(stderr))
		return
	}
	if errorData.IsNotNil() {
		config2.Logger.Errorf("get file size: %s failed, command: %s  err: %s",
			path.Join(requestInfo.Namespace, model.Pod, model.Container, model.Dir),
			strings.Join(command, " "), errorData.Err.Error())
		return
	}
	if sizeStr := strings.TrimSpace(sizeOutput.String()); sizeStr != "" {
		if size, err := strconv.ParseInt(strings.Fields(sizeStr)[0], 10, 64); err == nil {
			result.Size = size
		}
	}
	contentOutput := new(bytes.Buffer)
	command = []string{"sh", "-c", fmt.Sprintf("head -c %d \"$1\"", maxPodFilePreviewBytes), "sh", model.Dir}
	stderr, errorData = svc.ContainerExec(ctx, clientSet, requestInfo.Namespace, model.Pod, model.Container, command, nil, contentOutput)
	if len(stderr) != 0 {
		errorData.Err = errors.New(string(stderr))
		config2.Logger.Errorf("read file: %s failed, command: %s  err: %s",
			path.Join(requestInfo.Namespace, model.Pod, model.Container, model.Dir),
			strings.Join(command, " "), string(stderr))
		return
	}
	if errorData.IsNotNil() {
		config2.Logger.Errorf("read file: %s failed, command: %s  err: %s",
			path.Join(requestInfo.Namespace, model.Pod, model.Container, model.Dir),
			strings.Join(command, " "), errorData.Err.Error())
		return
	}
	content := contentOutput.Bytes()
	if len(content) == 0 {
		result.Encoding = "utf-8"
		result.MimeType = "text/plain; charset=utf-8"
		return
	}
	result.MimeType = http.DetectContentType(content)
	if result.Size > maxPodFilePreviewBytes {
		result.Truncated = true
	}
	if isBinaryContent(content) {
		result.Binary = true
		result.Encoding = "binary"
		return
	}
	result.Content = string(content)
	result.Encoding = "utf-8"
	return
}

func (svc *PodService) SaveFileContentToContainer(ctx context.Context, requestInfo structs2.RequestInfo, model dtos2.PodFileContent) (result dtos2.PodFileContent, errorData common.ErrorData) {
	model.Default(ctx)
	fileName := model.FileName
	if strings.TrimSpace(fileName) == "" {
		fileName = path.Base(model.Dir)
	}
	fileDir := path.Dir(model.Dir)
	if fileDir == "." {
		fileDir = "/"
	}
	errorData = svc.UploadFileFromContainer(ctx, requestInfo, dtos2.PodFilePath{
		Pod:       model.Pod,
		Container: model.Container,
		Dir:       fileDir,
		FileName:  fileName,
	}, bytes.NewBufferString(model.Content))
	if errorData.IsNotNil() {
		return
	}
	result, errorData = svc.ReadFileContentFromContainer(ctx, requestInfo, dtos2.PodFilePath{
		Pod:       model.Pod,
		Container: model.Container,
		Dir:       model.Dir,
		FileName:  fileName,
	})
	if errorData.IsNotNil() {
		return
	}
	result.Content = model.Content
	result.Binary = false
	result.Writable = true
	if result.Language == "" {
		result.Language = model.Language
	}
	return
}

func (svc *PodService) UploadBigFileFromContainer(ctx context.Context, requestInfo structs2.RequestInfo, model dtos2.PodFilePath, stdin io.Reader) (errorData common.ErrorData) {
	return svc.UploadFileFromContainer(ctx, requestInfo, model, stdin)
}

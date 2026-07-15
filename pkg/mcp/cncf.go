package mcp

import "strings"

var CncfProjectDescriptions = map[string]string{
	// --- 原生 Kubernetes ---
	"kubernetes": "Github地址：https://github.com/kubernetes/kubernetes 文档地址：https://kubernetes.io/zh/docs/ ",

	// --- 你已提供的项目（保留）---
	"volcano":       "Github地址：https://github.com/volcano-sh/volcano 文档地址：https://volcano.sh/zh/docs/ ",
	"tekton":        "Github地址：https://github.com/tektoncd/pipeline 文档地址：https://tekton.dev/docs/ ",
	"argocd":        "Github地址：https://github.com/argoproj/argo-cd 文档地址：https://argo-cd.readthedocs.io/en/latest/ ",
	"kubevela":      "Github地址：https://github.com/oam-dev/kubevela 文档地址：https://kubevela.io/zh/ ",
	"openkruise":    "Github地址：https://github.com/openkruise/kruise 文档地址：https://openkruise.io/zh/ ",
	"kubevirt":      "Github地址：https://github.com/kubevirt/kubevirt 文档地址：https://kubevirt.io/ ",
	"harbor":        "Github地址：https://github.com/goharbor/harbor 文档地址：https://goharbor.io/docs/ ",
	"kubeedge":      "Github地址：https://github.com/kubeedge/kubeedge 文档地址：https://kubeedge.io/zh/ ",
	"istio":         "Github地址：https://github.com/istio/istio 文档地址：https://istio.io/latest/zh/docs/ ",
	"prometheus":    "Github地址：https://github.com/prometheus/prometheus 文档地址：https://prometheus.io/docs/introduction/overview/ ",
	"jaeger":        "Github地址：https://github.com/jaegertracing/jaeger 文档地址：https://www.jaegertracing.io/docs/ ",
	"fluentd":       "Github地址：https://github.com/fluent/fluentd 文档地址：https://docs.fluentd.org/ ",
	"envoy":         "Github地址：https://github.com/envoyproxy/envoy 文档地址：https://www.envoyproxy.io/docs/envoy/latest/ ",
	"linkerd":       "Github地址：https://github.com/linkerd/linkerd 文档地址：https://linkerd.io/2/overview/ ",
	"opentelemetry": "Github地址：https://github.com/open-telemetry/opentelemetry-collector 文档地址：https://opentelemetry.io/docs/ ",
	"knative":       "Github地址：https://github.com/knative/serving 文档地址：https://knative.dev/docs/ ",
	"fission":       "Github地址：https://github.com/fission/fission 文档地址：https://fission.io/docs/",
	"openyurt":      "Github地址：https://github.com/openyurtio/openyurt 文档地址：https://openyurt.io/zh/docs/ ",
	"cert-manager":  "Github地址：https://github.com/cert-manager/cert-manager 文档地址：https://cert-manager.io/docs/ ",
	"gateway-api":   "Github地址：https://github.com/kubernetes-sigs/gateway-api 文档地址：https://gateway-api.sigs.k8s.io/ ",

	// --- 新增：常见且与 K8s 深度集成的 CNCF 项目 ---
	"crossplane":     "Github地址：https://github.com/crossplane/crossplane 文档地址：https://docs.crossplane.io/ ",
	"kyverno":        "Github地址：https://github.com/kyverno/kyverno 文档地址：https://kyverno.io/docs/ ",
	"falco":          "Github地址：https://github.com/falcosecurity/falco 文档地址：https://falco.org/docs/ ",
	"helm":           "Github地址：https://github.com/helm/helm 文档地址：https://helm.sh/docs/ ",
	"containerd":     "Github地址：https://github.com/containerd/containerd 文档地址：https://containerd.io/docs/ ",
	"cri-o":          "Github地址：https://github.com/cri-o/cri-o 文档地址：https://cri-o.io/ ",
	"buildpacks":     "Github地址：https://github.com/buildpacks/pack 文档地址：https://buildpacks.io/docs/ ",
	"backstage":      "Github地址：https://github.com/backstage/backstage 文档地址：https://backstage.io/docs/ ",
	"cluster-api":    "Github地址：https://github.com/kubernetes-sigs/cluster-api 文档地址：https://cluster-api.sigs.k8s.io/ ",
	"external-dns":   "Github地址：https://github.com/kubernetes-sigs/external-dns 文档地址：https://github.com/kubernetes-sigs/external-dns#documentation ",
	"metrics-server": "Github地址：https://github.com/kubernetes-sigs/metrics-server 文档地址：https://github.com/kubernetes-sigs/metrics-server#readme ",
	"ingress-nginx":  "Github地址：https://github.com/kubernetes/ingress-nginx 文档地址：https://kubernetes.github.io/ingress-nginx/ ",
	"rook":           "Github地址：https://github.com/rook/rook 文档地址：https://rook.io/docs/rook/latest/ ",
	"longhorn":       "Github地址：https://github.com/longhorn/longhorn 文档地址：https://longhorn.io/docs/ ",
	"nats":           "Github地址：https://github.com/nats-io/nats-server 文档地址：https://docs.nats.io/ ",
	"thanos":         "Github地址：https://github.com/thanos-io/thanos 文档地址：https://thanos.io/ ",
	"cortex":         "Github地址：https://github.com/cortexproject/cortex 文档地址：https://cortexmetrics.io/docs/ ",
	"vitess":         "Github地址：https://github.com/vitessio/vitess 文档地址：https://vitess.io/docs/ ",
	"dragonfly":      "Github地址：https://github.com/dragonflydb/dragonfly 文档地址：https://www.dragonflydb.io/docs ",
	"keda":           "Github地址：https://github.com/kedacore/keda 文档地址：https://keda.sh/docs/ ",
	"dapr":           "Github地址：https://github.com/dapr/dapr 文档地址：https https://docs.dapr.io/ ",
	"flux":           "Github地址：https://github.com/fluxcd/flux2 文档地址：https://fluxcd.io/docs/ ",
	"opa":            "Github地址：https://github.com/open-policy-agent/opa 文档地址：https://www.openpolicyagent.org/docs/ ",
	"gatekeeper":     "Github地址：https://github.com/open-policy-agent/gatekeeper 文档地址：https://open-policy-agent.github.io/gatekeeper/website/docs/ ",
}

func GetCncfInformation(name string) string {
	name = strings.Replace(name, "_", "-", -1)
	name = strings.Replace(name, ".", "-", -1)
	name = strings.TrimSpace(name)
	if val, ok := CncfProjectDescriptions[name]; ok {
		return val
	}
	return ""
}

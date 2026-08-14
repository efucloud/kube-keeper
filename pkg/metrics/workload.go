package metrics

import (
	dtos2 "github.com/efucloud/kube-keeper/pkg/models/dtos"
)

func workloadServer() {
	workloadMetrics = map[string]dtos2.PrometheusQuery{
		"CPU Usage": {
			I18N: dtos2.I18N{ZH: "CPU 使用量", EN: "CPU Usage"},
			Query: `sum(
  node_namespace_pod_container:container_cpu_usage_seconds_total:sum_rate5m{_{{_ if .Cluster _}}_ cluster="_{{_ .Cluster _}}_",_{{_ end _}}_ namespace="_{{_ .Namespace _}}_"}
* on(namespace,pod)
  group_left(workload, workload_type) namespace_workload_pod:kube_pod_owner:relabel{_{{_ if .Cluster _}}_ cluster="_{{_ .Cluster _}}_",_{{_ end _}}_ namespace="_{{_ .Namespace _}}_" , workload="_{{_ .Workload _}}_",  workload_type=~"_{{_ .WorkloadType _}}_"}
) by (workload, workload_type)`,
		},
		"Memory Usage": {
			I18N: dtos2.I18N{ZH: "内存使用量", EN: "Memory Usage"},
			Query: `sum(
    container_memory_working_set_bytes{_{{_ if .Cluster _}}_ cluster="_{{_ .Cluster _}}_",_{{_ end _}}_ namespace="_{{_ .Namespace _}}_", container!="", image!=""}
  * on(namespace,pod)
    group_left(workload, workload_type) namespace_workload_pod:kube_pod_owner:relabel{_{{_ if .Cluster _}}_ cluster="_{{_ .Cluster _}}_",_{{_ end _}}_ namespace="_{{_ .Namespace _}}_" ,  workload="_{{_ .Workload _}}_", workload_type=~"_{{_ .WorkloadType _}}_"}
) by (pod)`,
		},
	}
}

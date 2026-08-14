package dtos

// DashboardData 看板数据
type DashboardData[T any] struct {
	Name     string `gorm:"name" json:"name" validate:"required" description:"名称"`
	IntlName string `json:"intlName" description:"国际化"`
	Value    T      `gorm:"value" json:"value" validate:"required" description:"值"`
}

// ClusterDashboard 集群面板
type ClusterDashboard struct {
	Nodes        int64 `json:"nodes" description:"集群节点数量"`
	Namespaces   int64 `json:"namespaces" description:"集群命名空间数量"`
	Pods         int64 `json:"pods" description:"集群Pod数量"`
	Deployments  int64 `json:"deployments" description:"集群Deployment数量"`
	StatefulSets int64 `json:"statefulSets" description:"集群StatefulSet数量"`
	DaemonSets   int64 `json:"daemonSets" description:"集群DaemonSets数量"`
	Job          int64 `json:"job" description:"集群Job数量"`
	CronJob      int64 `json:"cronJob" description:"集群CronJob数量"`
	ConfigMap    int64 `json:"configMap" description:"集群ConfigMap数量"`
	Secret       int64 `json:"secret" description:"集群Secret数量"`
	HelmInstance int64 `json:"helmInstance" description:"集群Helm部署的应用数量"`
	Service      int64 `json:"service" description:"集群Service数量"`
	Ingress      int64 `json:"ingress" description:"集群Ingress数量"`
	PV           int64 `json:"pv" description:"PV数量"`
	PVC          int64 `json:"pvc" description:"PVC数量"`
	StorageClass int64 `json:"storageClass" description:"存储类"`
	Crd          int64 `json:"crd" description:"自定义资源"`
}

// NamespaceDashboard 命名克难攻坚面板
type NamespaceDashboard struct {
	Pods         int64 `json:"pods" description:"命名空间Pod数量"`
	Deployments  int64 `json:"deployments" description:"命名空间Deployment数量"`
	StatefulSets int64 `json:"statefulSets" description:"命名空间StatefulSet数量"`
	DaemonSets   int64 `json:"daemonSets" description:"命名空间DaemonSets数量"`
	Job          int64 `json:"job" description:"命名空间Job数量"`
	CronJob      int64 `json:"cronJob" description:"命名空间CronJob数量"`
	ConfigMap    int64 `json:"configMap" description:"命名空间ConfigMap数量"`
	Secret       int64 `json:"secret" description:"命名空间Secret数量"`
	HelmInstance int64 `json:"helmInstance" description:"命名空间Helm部署的应用数量"`
	Service      int64 `json:"service" description:"命名空间Service数量"`
	Ingress      int64 `json:"ingress" description:"命名空间Ingress数量"`
	PVC          int64 `json:"pvc" description:"PVC数量"`
}

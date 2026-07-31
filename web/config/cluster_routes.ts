export default [
  {
    icon: "terminal",
    name: "terminal",
    menuRender: false,
    hideInMenu: true,
    path: "/kubernetes/cluster/terminal",
    access: "clusterAccess",
    component: "./kubernetes/cluster/terminal",
  },
  {
    icon: "dashboard",
    name: "dashboard",
    path: "/kubernetes/cluster/dashboard",
    access: "clusterAccess",
    routes: [
      {
        name: "overview",
        path: "/kubernetes/cluster/dashboard/overview",
        component: "./kubernetes/cluster/dashboard",
        access: "clusterAccess",
      },
      {
        name: "ApiServer",
        path: "/kubernetes/cluster/dashboard/api-server",
        component: "./kubernetes/cluster/dashboard/apiserver",
        access: "clusterAccess",
      },
      {
        name: "cluster",
        path: "/kubernetes/cluster/dashboard/cluster",
        component: "./kubernetes/cluster/dashboard/cluster",
        access: "clusterAccess",
      },
    ],
  },

  {
    icon: "RobotOutlined",
    name: "ai",
    path: "/kubernetes/cluster/ai",
    access: "clusterAccess",
    routes: [
      {
        name: "Volcano",
        path: "/kubernetes/cluster/ai/volcano",
        access: "clusterFeaturesVolcanoAccess",
        routes: [
          {
            name: "Job",
            path: "/kubernetes/cluster/ai/volcano/jobs",
            component: "./kubernetes/namespace/ai/volcano/jobs",
          },
          {
            name: "Job",
            hideInMenu: true,
            path: "/kubernetes/cluster/ai/volcano/jobs/create/text",
            component: "./kubernetes/namespace/ai/volcano/jobs/text",
          },
          {
            name: "PodGroup",
            path: "/kubernetes/cluster/ai/volcano/podgroups",
            component: "./kubernetes/namespace/ai/volcano/podgroups",
          },
          {
            name: "PodGroup",
            hideInMenu: true,
            path: "/kubernetes/cluster/ai/volcano/podgroups/create/text",
            component: "./kubernetes/namespace/ai/volcano/podgroups/text",
          },
          {
            name: "Command",
            path: "/kubernetes/cluster/ai/volcano/commands",
            component: "./kubernetes/namespace/ai/volcano/commands",
          },
          {
            name: "Command",
            hideInMenu: true,
            path: "/kubernetes/cluster/ai/volcano/commands/create/text",
            component: "./kubernetes/namespace/ai/volcano/commands/text",
          },
          {
            name: "JobFlow",
            path: "/kubernetes/cluster/ai/volcano/jobflows",
            component: "./kubernetes/namespace/ai/volcano/jobflows",
          },
          {
            name: "JobFlow",
            hideInMenu: true,
            path: "/kubernetes/cluster/ai/volcano/jobflows/create/text",
            component: "./kubernetes/namespace/ai/volcano/jobflows/text",
          },
          {
            name: "JobTemplate",
            path: "/kubernetes/cluster/ai/volcano/jobtemplates",
            component: "./kubernetes/namespace/ai/volcano/jobtemplates",
          },
          {
            name: "JobTemplate",
            hideInMenu: true,
            path: "/kubernetes/cluster/ai/volcano/jobtemplates/create/text",
            component: "./kubernetes/namespace/ai/volcano/jobtemplates/text",
          },
          {
            name: "Queue",
            path: "/kubernetes/cluster/ai/volcano/queue",
            component: "./kubernetes/cluster/ai/volcano/queue",
          },
          {
            name: "Queue",
            hideInMenu: true,
            path: "/kubernetes/cluster/ai/volcano/queue/create/text",
            component: "./kubernetes/cluster/ai/volcano/queue/text",
          },
          {
            name: "Numatopology",
            path: "/kubernetes/cluster/ai/volcano/numatopology",
            component: "./kubernetes/cluster/ai/volcano/numatopology",
          },
          {
            name: "Numatopology",
            hideInMenu: true,
            path: "/kubernetes/cluster/ai/volcano/numatopology/create/text",
            component: "./kubernetes/cluster/ai/volcano/numatopology/text",
          },
          {
            name: "HyperNode",
            path: "/kubernetes/cluster/ai/volcano/hypernode",
            component: "./kubernetes/cluster/ai/volcano/hypernode",
          },
          {
            name: "HyperNode",
            hideInMenu: true,
            path: "/kubernetes/cluster/ai/volcano/hypernode/create/text",
            component: "./kubernetes/cluster/ai/volcano/hypernode/text",
          },
        ],
      },
    ],
  },
  {
    icon: "SafetyCertificateOutlined",
    name: "clusterPermission",
    path: "/kubernetes/cluster/permission",
    access: "clusterAccess",
    routes: [
      {
        name: "clusterAccount",
        path: "/kubernetes/cluster/permission/cluster-account",
        component: "./kubernetes/permission/cluster_account",
        access: "clusterAccess",
      },
      {
        name: "clusterAccount",
        path: "/kubernetes/cluster/permission/cluster-account/rbac-view/:accountId",
        component: "./kubernetes/permission/cluster_account/rbac_view",
        access: "clusterAccess",
        hideInMenu: true,
      },
      {
        name: "clusterAccount",
        path: "/kubernetes/cluster/permission/cluster-account/detail/:id",
        component: "./kubernetes/permission/cluster_account/detail",
        access: "clusterAccess",
        hideInMenu: true,
      },
      {
        name: "accountPermission",
        path: "/kubernetes/cluster/permission/account-permission",
        component: "./kubernetes/permission/permission",
        access: "clusterAccess",
      },
    ],
  },
  {
    icon: "BarsOutlined",
    name: "clusterNode",
    path: "/kubernetes/cluster/node",
    component: "./kubernetes/cluster/node",
    access: "clusterAccess",
  },
  {
    name: "clusterNode",
    hideInMenu: true,
    path: "/kubernetes/cluster/node/:node",
    component: "./kubernetes/cluster/node/detail",
    access: "clusterAccess",
  },
  {
    icon: "BorderOuterOutlined",
    name: "clusterNamespace",
    path: "/kubernetes/cluster/namespace",
    component: "./kubernetes/cluster/namespace",
    access: "clusterAccess",
  },
  {
    path: "/kubernetes/namespace",
    redirect: "/kubernetes/namespace/dashboard/overview",
  },

  {
    name: "DevOps",
    icon: "NodeExpandOutlined",
    path: "/kubernetes/cluster/devops",
    access: "clusterAccess",
    routes: [
      {
        name: "Tekton",
        path: "/kubernetes/cluster/devops/cicd/tekton",
        access: "clusterFeaturesTektonPipelineAccess",
        routes: [
          {
            name: "task",
            path: "/kubernetes/cluster/devops/cicd/tekton/tasks",
            component: "./kubernetes/namespace/devops/cicd/tekton/task",
            access: "clusterFeaturesTektonPipelineAccess",
          },
          {
            name: "task",
            path: "/kubernetes/cluster/devops/cicd/tekton/tasks/create/text",
            component: "./kubernetes/namespace/devops/cicd/tekton/task/text",
            access: "clusterFeaturesTektonPipelineAccess",
            hideInMenu: true,
          },

          {
            name: "pipeline",
            path: "/kubernetes/cluster/devops/cicd/tekton/pipelines",
            component: "./kubernetes/namespace/devops/cicd/tekton/pipeline",
            access: "clusterFeaturesTektonPipelineAccess",
          },
          {
            name: "pipeline",
            path: "/kubernetes/cluster/devops/cicd/tekton/pipelines/create/text",
            component:
              "./kubernetes/namespace/devops/cicd/tekton/pipeline/text",
            access: "clusterFeaturesTektonPipelineAccess",
            hideInMenu: true,
          },
          {
            name: "taskRun",
            path: "/kubernetes/cluster/devops/cicd/tekton/taskruns",
            component: "./kubernetes/namespace/devops/cicd/tekton/task_run",
            access: "clusterFeaturesTektonPipelineAccess",
          },
          {
            name: "taskRun",
            path: "/kubernetes/cluster/devops/cicd/tekton/taskruns/create/text",
            component:
              "./kubernetes/namespace/devops/cicd/tekton/task_run/text",
            access: "clusterFeaturesTektonPipelineAccess",
            hideInMenu: true,
          },
          {
            name: "pipelineRun",
            path: "/kubernetes/cluster/devops/cicd/tekton/pipelineruns",
            component: "./kubernetes/namespace/devops/cicd/tekton/pipeline_run",
            access: "clusterFeaturesTektonPipelineAccess",
          },
          {
            name: "pipelineRun",
            path: "/kubernetes/cluster/devops/cicd/tekton/pipelineruns/create/text",
            component:
              "./kubernetes/namespace/devops/cicd/tekton/pipeline_run/text",
            access: "clusterFeaturesTektonPipelineAccess",
            hideInMenu: true,
          },
          {
            name: "customRun",
            path: "/kubernetes/cluster/devops/cicd/tekton/customruns",
            component: "./kubernetes/namespace/devops/cicd/tekton/custom_run",
            access: "clusterFeaturesTektonPipelineAccess",
          },
          {
            name: "customRun",
            path: "/kubernetes/cluster/devops/cicd/tekton/customruns/create/text",
            component:
              "./kubernetes/namespace/devops/cicd/tekton/custom_run/text",
            access: "clusterFeaturesTektonPipelineAccess",
            hideInMenu: true,
          },
          {
            name: "eventListener",
            path: "/kubernetes/cluster/devops/cicd/tekton/eventlisteners",
            component:
              "./kubernetes/namespace/devops/cicd/tekton/event_listener",
            access: "clusterFeaturesTektonTriggerAccess",
          },
          {
            name: "eventListener",
            path: "/kubernetes/cluster/devops/cicd/tekton/eventlisteners/create/text",
            component:
              "./kubernetes/namespace/devops/cicd/tekton/event_listener/text",
            access: "clusterFeaturesTektonTriggerAccess",
            hideInMenu: true,
          },
          {
            name: "trigger",
            path: "/kubernetes/cluster/devops/cicd/tekton/triggers",
            component: "./kubernetes/namespace/devops/cicd/tekton/trigger",
            access: "clusterFeaturesTektonTriggerAccess",
          },
          {
            name: "trigger",
            path: "/kubernetes/cluster/devops/cicd/tekton/triggers/create/text",
            component: "./kubernetes/namespace/devops/cicd/tekton/trigger/text",
            access: "clusterFeaturesTektonTriggerAccess",
            hideInMenu: true,
          },
          {
            name: "triggerBinding",
            path: "/kubernetes/cluster/devops/cicd/tekton/triggerbindings",
            component:
              "./kubernetes/namespace/devops/cicd/tekton/trigger_binding",
            access: "clusterFeaturesTektonTriggerAccess",
          },
          {
            name: "triggerBinding",
            path: "/kubernetes/cluster/devops/cicd/tekton/triggerbindings/create/text",
            component:
              "./kubernetes/namespace/devops/cicd/tekton/trigger_binding/text",
            access: "clusterFeaturesTektonTriggerAccess",
            hideInMenu: true,
          },
          {
            name: "clusterTriggerBinding",
            path: "/kubernetes/cluster/devops/cicd/tekton/clustertriggerbindings",
            component:
              "./kubernetes/cluster/devops/cicd/tekton/cluster_trigger_binding",
            access: "clusterFeaturesTektonTriggerAccess",
          },
          {
            name: "clusterTriggerBinding",
            path: "/kubernetes/cluster/devops/cicd/tekton/clustertriggerbindings/create/text",
            component:
              "./kubernetes/cluster/devops/cicd/tekton/cluster_trigger_binding/text",
            access: "clusterFeaturesTektonTriggerAccess",
            hideInMenu: true,
          },
          {
            name: "triggerTemplate",
            path: "/kubernetes/cluster/devops/cicd/tekton/triggertemplates",
            component:
              "./kubernetes/namespace/devops/cicd/tekton/trigger_template",
            access: "clusterFeaturesTektonTriggerAccess",
          },
          {
            name: "triggerTemplate",
            path: "/kubernetes/cluster/devops/cicd/tekton/triggertemplates/create/text",
            component:
              "./kubernetes/namespace/devops/cicd/tekton/trigger_template/text",
            access: "clusterFeaturesTektonTriggerAccess",
            hideInMenu: true,
          },
          {
            name: "interceptor",
            path: "/kubernetes/cluster/devops/cicd/tekton/interceptors",
            component: "./kubernetes/namespace/devops/cicd/tekton/interceptor",
            access: "clusterFeaturesTektonTriggerAccess",
          },
          {
            name: "interceptor",
            path: "/kubernetes/cluster/devops/cicd/tekton/interceptors/create/text",
            component:
              "./kubernetes/namespace/devops/cicd/tekton/interceptor/text",
            access: "clusterFeaturesTektonTriggerAccess",
            hideInMenu: true,
          },
          {
            name: "clusterInterceptor",
            path: "/kubernetes/cluster/devops/cicd/tekton/clusterinterceptors",
            component:
              "./kubernetes/cluster/devops/cicd/tekton/cluster_interceptor",
            access: "clusterFeaturesTektonTriggerAccess",
          },
          {
            name: "clusterInterceptor",
            path: "/kubernetes/cluster/devops/cicd/tekton/clusterinterceptors/create/text",
            component:
              "./kubernetes/cluster/devops/cicd/tekton/cluster_interceptor/text",
            access: "clusterFeaturesTektonTriggerAccess",
            hideInMenu: true,
          },
        ],
      },
    ],
  },
  {
    name: "faas",
    icon: "apartment",
    path: "/kubernetes/cluster/faas",
    access: "clusterAccess",
    routes: [
      {
        name: "Fission",
        path: "/kubernetes/cluster/faas/fission",
        access: "clusterFeaturesFissionAccess",
        routes: [
          {
            name: "canaryconfig",
            path: "/kubernetes/cluster/faas/fission/canaryconfig",
            component: "./kubernetes/namespace/faas/fission/canaryconfig",
          },
          {
            name: "canaryconfig",
            hideInMenu: true,
            path: "/kubernetes/cluster/faas/fission/canaryconfig/create/text",
            component: "./kubernetes/namespace/faas/fission/canaryconfig/text",
          },
          {
            name: "environment",
            path: "/kubernetes/cluster/faas/fission/environment",
            component: "./kubernetes/namespace/faas/fission/environment",
          },
          {
            name: "environment",
            hideInMenu: true,
            path: "/kubernetes/cluster/faas/fission/environment/create/text",
            component: "./kubernetes/namespace/faas/fission/environment/text",
          },
          {
            name: "function",
            path: "/kubernetes/cluster/faas/fission/function",
            component: "./kubernetes/namespace/faas/fission/function",
          },
          {
            name: "function",
            hideInMenu: true,
            path: "/kubernetes/cluster/faas/fission/function/create/text",
            component: "./kubernetes/namespace/faas/fission/function/text",
          },
          {
            name: "httptrigger",
            path: "/kubernetes/cluster/faas/fission/httptrigger",
            component: "./kubernetes/namespace/faas/fission/httptrigger",
          },
          {
            name: "httptrigger",
            hideInMenu: true,
            path: "/kubernetes/cluster/faas/fission/httptrigger/create/text",
            component: "./kubernetes/namespace/faas/fission/httptrigger/text",
          },
          {
            name: "kuberneteswatchtrigger",
            path: "/kubernetes/cluster/faas/fission/kuberneteswatchtrigger",
            component:
              "./kubernetes/namespace/faas/fission/kuberneteswatchtrigger",
          },
          {
            name: "kuberneteswatchtrigger",
            hideInMenu: true,
            path: "/kubernetes/cluster/faas/fission/kuberneteswatchtrigger/create/text",
            component:
              "./kubernetes/namespace/faas/fission/kuberneteswatchtrigger/text",
          },
          {
            name: "messagequeuetrigger",
            path: "/kubernetes/cluster/faas/fission/messagequeuetrigger",
            component:
              "./kubernetes/namespace/faas/fission/messagequeuetrigger",
          },
          {
            name: "messagequeuetrigger",
            hideInMenu: true,
            path: "/kubernetes/cluster/faas/fission/messagequeuetrigger/create/text",
            component:
              "./kubernetes/namespace/faas/fission/messagequeuetrigger/text",
          },
          {
            name: "package",
            path: "/kubernetes/cluster/faas/fission/package",
            component: "./kubernetes/namespace/faas/fission/package",
          },
          {
            name: "package",
            hideInMenu: true,
            path: "/kubernetes/cluster/faas/fission/package/create/text",
            component: "./kubernetes/namespace/faas/fission/package/text",
          },
          {
            name: "timetrigger",
            path: "/kubernetes/cluster/faas/fission/timetrigger",
            component: "./kubernetes/namespace/faas/fission/timetrigger",
          },
          {
            name: "timetrigger",
            hideInMenu: true,
            path: "/kubernetes/cluster/faas/fission/timetrigger/create/text",
            component: "./kubernetes/namespace/faas/fission/timetrigger/text",
          },
        ],
      },
      {
        name: "Knative",
        path: "/kubernetes/cluster/faas/knative",
        access: "clusterFeaturesKnativeAccess",
        routes: [
          {
            name: "service",
            path: "/kubernetes/cluster/faas/knative/services",
            component: "./kubernetes/namespace/faas/knative/service",
          },
          {
            name: "service",
            hideInMenu: true,
            path: "/kubernetes/cluster/faas/knative/services/create/text",
            component: "./kubernetes/namespace/faas/knative/service/text",
          },
        ],
      },
    ],
  },
  {
    name: "workload",
    icon: "CloudServerOutlined",
    path: "/kubernetes/cluster/workload",
    access: "clusterAccess",
    routes: [
      {
        name: "pod",
        path: "/kubernetes/cluster/workload/pods",
        component: "./kubernetes/namespace/workload/pod",
        access: "clusterAccess",
      },
      {
        name: "pod",
        hideInMenu: true,
        path: "/kubernetes/cluster/workload/pods/:name/:action",
        component: "./kubernetes/namespace/workload/pod/text",
        access: "clusterAccess",
      },
      {
        name: "deployment",
        path: "/kubernetes/cluster/workload/deployments",
        component: "./kubernetes/namespace/workload/deployment",
        access: "clusterAccess",
      },
      {
        name: "deployment",
        hideInMenu: true,
        path: "/kubernetes/cluster/workload/deployments/:name/:action",
        component: "./kubernetes/namespace/workload/deployment/text",
        access: "clusterAccess",
      },
      {
        name: "deployment",
        hideInMenu: true,
        path: "/kubernetes/cluster/workload/deployments/:name/:action/step",
        component: "./kubernetes/namespace/workload/deployment/step_form",
        access: "clusterAccess",
      },
      {
        name: "deployment",
        hideInMenu: true,
        path: "/kubernetes/cluster/workload/deployments/create/text",
        component: "./kubernetes/namespace/workload/deployment/text",
        access: "clusterAccess",
      },
      {
        name: "deployment",
        hideInMenu: true,
        path: "/kubernetes/cluster/workload/deployments/create/text",
        component: "./kubernetes/namespace/workload/deployment/step_form",
        access: "clusterAccess",
      },
      {
        name: "statefulset",
        path: "/kubernetes/cluster/workload/statefulsets",
        component: "./kubernetes/namespace/workload/statefulset",
        access: "clusterAccess",
      },
      {
        name: "statefulset",
        hideInMenu: true,
        path: "/kubernetes/cluster/workload/statefulsets/:name/:action/step",
        component: "./kubernetes/namespace/workload/statefulset/step_form",
        access: "clusterAccess",
      },
      {
        name: "statefulset",
        hideInMenu: true,
        path: "/kubernetes/cluster/workload/statefulsets/:name/:action",
        component: "./kubernetes/namespace/workload/statefulset/text",
        access: "clusterAccess",
      },
      {
        name: "statefulset",
        hideInMenu: true,
        path: "/kubernetes/cluster/workload/statefulsets/create/text",
        component: "./kubernetes/namespace/workload/statefulset/text",
        access: "clusterAccess",
      },

      {
        name: "daemonset",
        path: "/kubernetes/cluster/workload/daemonsets",
        component: "./kubernetes/namespace/workload/daemonset",
        access: "clusterAccess",
      },
      {
        name: "daemonset",
        hideInMenu: true,
        path: "/kubernetes/cluster/workload/daemonsets/:name/:action",
        component: "./kubernetes/namespace/workload/daemonset/text",
        access: "clusterAccess",
      },

      {
        name: "daemonset",
        hideInMenu: true,
        path: "/kubernetes/cluster/workload/daemonsets/create/text",
        component: "./kubernetes/namespace/workload/daemonset/text",
        access: "clusterAccess",
      },
      {
        name: "daemonset",
        hideInMenu: true,
        path: "/kubernetes/cluster/workload/daemonsets/:name/:action/step",
        component: "./kubernetes/namespace/workload/daemonset/step_form",
        access: "clusterAccess",
      },
      {
        name: "job",
        path: "/kubernetes/cluster/workload/jobs",
        component: "./kubernetes/namespace/workload/job",
        access: "clusterAccess",
      },
      {
        name: "job",
        hideInMenu: true,
        path: "/kubernetes/cluster/workload/jobs/:name/:action",
        component: "./kubernetes/namespace/workload/job/text",
        access: "clusterAccess",
      },
      {
        name: "job",
        hideInMenu: true,
        path: "/kubernetes/cluster/workload/jobs/create/text",
        component: "./kubernetes/namespace/workload/job/text",
        access: "clusterAccess",
      },
      {
        name: "cronjob",
        path: "/kubernetes/cluster/workload/cronjobs",
        component: "./kubernetes/namespace/workload/cronjob",
        access: "clusterAccess",
      },
      {
        name: "cronjob",
        hideInMenu: true,
        path: "/kubernetes/cluster/workload/cronjobs/:name/:action",
        component: "./kubernetes/namespace/workload/cronjob/text",
        access: "clusterAccess",
      },
      {
        name: "cronjob",
        hideInMenu: true,
        path: "/kubernetes/cluster/workload/cronjobs/create/text",
        component: "./kubernetes/namespace/workload/cronjob/text",
        access: "clusterAccess",
      },
      {
        name: "Argo Rollouts",
        path: "/kubernetes/cluster/workload/argo-rollouts",
        component: "./kubernetes/namespace/workload/rollouts",
        access: "clusterFeaturesArgoRolloutsAccess",
      },
      {
        name: "Argo Rollouts",
        hideInMenu: true,
        path: "/kubernetes/cluster/workload/argo-rollouts/:name",
        component: "./kubernetes/namespace/workload/rollouts/detail",
        access: "clusterFeaturesArgoRolloutsAccess",
      },
      {
        name: "Argo Rollouts",
        hideInMenu: true,
        path: "/kubernetes/cluster/workload/argo-rollouts/:name/:action",
        component: "./kubernetes/namespace/workload/rollouts/text",
        access: "clusterFeaturesArgoRolloutsAccess",
      },
      {
        name: "replicaset",
        path: "/kubernetes/cluster/workload/replicasets",
        component: "./kubernetes/namespace/workload/replicaset",
        access: "clusterAccess",
      },
      {
        name: "replicaset",
        hideInMenu: true,
        path: "/kubernetes/cluster/workload/replicasets/:name/:action",
        component: "./kubernetes/namespace/workload/replicaset/text",
        access: "clusterAccess",
      },
      {
        name: "replicaset",
        hideInMenu: true,
        path: "/kubernetes/cluster/workload/replicasets/create/text",
        component: "./kubernetes/namespace/workload/replicaset/text",
        access: "clusterAccess",
      },
      {
        name: "replicaset",
        hideInMenu: true,
        path: "/kubernetes/cluster/workload/replicasets/:name",
        component: "./kubernetes/namespace/workload/replicaset/detail",
        access: "clusterAccess",
      },
    ],
  },
  {
    name: "config",
    icon: "ToolOutlined",
    path: "/kubernetes/cluster/config",
    access: "clusterAccess",
    routes: [
      {
        name: "configmap",
        path: "/kubernetes/cluster/config/configmaps",
        component: "./kubernetes/namespace/config/configmap",
      },
      {
        name: "configmap",
        hideInMenu: true,
        path: "/kubernetes/cluster/config/configmaps/create/text",
        component: "./kubernetes/namespace/config/configmap/text",
      },
      {
        name: "configmap",
        hideInMenu: true,
        path: "/kubernetes/cluster/config/configmaps/:name/:action",
        component: "./kubernetes/namespace/config/configmap/form",
      },
      {
        name: "secret",
        path: "/kubernetes/cluster/config/secrets",
        component: "./kubernetes/namespace/config/secret",
      },
      {
        name: "secret",
        hideInMenu: true,
        path: "/kubernetes/cluster/config/secrets/create/text",
        component: "./kubernetes/namespace/config/secret/text",
      },
      {
        name: "secret",
        hideInMenu: true,
        path: "/kubernetes/cluster/config/secrets/:name/:action",
        component: "./kubernetes/namespace/config/secret/form",
      },
      {
        name: "resourcequota",
        path: "/kubernetes/cluster/config/resourcequotas",
        component: "./kubernetes/namespace/config/resourcequota",
      },
      {
        name: "resourcequota",
        hideInMenu: true,
        path: "/kubernetes/cluster/config/resourcequotas/:name/:action",
        component: "./kubernetes/namespace/config/resourcequota/text",
      },
      {
        name: "limitrange",
        path: "/kubernetes/cluster/config/limitranges",
        component: "./kubernetes/namespace/config/limitrange",
      },
      {
        name: "limitrange",
        hideInMenu: true,
        path: "/kubernetes/cluster/config/limitranges/:name/:action",
        component: "./kubernetes/namespace/config/limitrange/text",
      },
      {
        name: "validatingwebhookconfiguration",
        path: "/kubernetes/cluster/config/validatingwebhookconfigurations",
        component: "./kubernetes/cluster/config/validatingwebhookconfiguration",
      },
      {
        name: "validatingwebhookconfiguration",
        hideInMenu: true,
        path: "/kubernetes/cluster/config/validatingwebhookconfigurations/:name/:action",
        component:
          "./kubernetes/cluster/config/validatingwebhookconfiguration/text",
      },
      {
        name: "mutatingwebhookconfiguration",
        path: "/kubernetes/cluster/config/mutatingwebhookconfigurations",
        component: "./kubernetes/cluster/config/mutatingwebhookconfiguration",
      },
      {
        name: "mutatingwebhookconfiguration",
        hideInMenu: true,
        path: "/kubernetes/cluster/config/mutatingwebhookconfigurations/:name/:action",
        component:
          "./kubernetes/cluster/config/mutatingwebhookconfiguration/text",
      },
    ],
  },

  {
    icon: "GlobalOutlined",
    name: "network",
    path: "/kubernetes/cluster/networks",
    access: "clusterAccess",
    routes: [
      {
        name: "ingressClass",
        path: "/kubernetes/cluster/networks/ingressclasses",
        component: "./kubernetes/cluster/networks/ingress_class",
      },
      {
        name: "ingressClass",
        hideInMenu: true,
        path: "/kubernetes/cluster/networks/ingressclasses/create/text",
        component: "./kubernetes/cluster/networks/ingress_class/text",
      },
      {
        name: "gateway",
        path: "/kubernetes/cluster/networks/gateway",
        access: "tenantClusterFeaturesGatewayAccess",
        routes: [
          {
            name: "GatewayClass",
            path: "/kubernetes/cluster/networks/gateway/gatewayclasses",
            component: "./kubernetes/cluster/networks/gateway/gatewayclasses",
          },
          {
            name: "GatewayClass",
            hideInMenu: true,
            path: "/kubernetes/cluster/networks/gateway/gatewayclasses/create/text",
            component:
              "./kubernetes/cluster/networks/gateway/gatewayclasses/text",
          },
          {
            name: "GatewayClass",
            hideInMenu: true,
            path: "/kubernetes/cluster/networks/gateway/gatewayclasses/:name/:action",
            component:
              "./kubernetes/cluster/networks/gateway/gatewayclasses/text",
          },
          {
            name: "XMesh",
            path: "/kubernetes/cluster/networks/gateway/xmeshes",
            component: "./kubernetes/cluster/networks/gateway/xmeshes",
          },
          {
            name: "XMesh",
            hideInMenu: true,
            path: "/kubernetes/cluster/networks/gateway/xmeshes/create/text",
            component: "./kubernetes/cluster/networks/gateway/xmeshes/text",
          },
          {
            name: "XMesh",
            hideInMenu: true,
            path: "/kubernetes/cluster/networks/gateway/xmeshes/:name/:action",
            component: "./kubernetes/cluster/networks/gateway/xmeshes/text",
          },
          {
            name: "Gateway",
            path: "/kubernetes/cluster/networks/gateway/gateways",
            component: "./kubernetes/namespace/networks/gateway/gateways",
          },
          {
            name: "Gateway",
            hideInMenu: true,
            path: "/kubernetes/cluster/networks/gateway/gateways/create/text",
            component: "./kubernetes/namespace/networks/gateway/gateways/text",
          },
          {
            name: "Gateway",
            hideInMenu: true,
            path: "/kubernetes/cluster/networks/gateway/gateways/:name/:action",
            component: "./kubernetes/namespace/networks/gateway/gateways/text",
          },
          {
            name: "HTTPRoute",
            path: "/kubernetes/cluster/networks/gateway/httproutes",
            component: "./kubernetes/namespace/networks/gateway/httproutes",
          },
          {
            name: "HTTPRoute",
            hideInMenu: true,
            path: "/kubernetes/cluster/networks/gateway/httproutes/create/text",
            component:
              "./kubernetes/namespace/networks/gateway/httproutes/text",
          },
          {
            name: "HTTPRoute",
            hideInMenu: true,
            path: "/kubernetes/cluster/networks/gateway/httproutes/:name/:action",
            component:
              "./kubernetes/namespace/networks/gateway/httproutes/text",
          },
          {
            name: "GRPCRoute",
            path: "/kubernetes/cluster/networks/gateway/grpcroutes",
            component: "./kubernetes/namespace/networks/gateway/grpcroutes",
          },
          {
            name: "GRPCRoute",
            hideInMenu: true,
            path: "/kubernetes/cluster/networks/gateway/grpcroutes/create/text",
            component:
              "./kubernetes/namespace/networks/gateway/grpcroutes/text",
          },
          {
            name: "GRPCRoute",
            hideInMenu: true,
            path: "/kubernetes/cluster/networks/gateway/grpcroutes/:name/:action",
            component:
              "./kubernetes/namespace/networks/gateway/grpcroutes/text",
          },
          {
            name: "TLSRoute",
            path: "/kubernetes/cluster/networks/gateway/tlsroutes",
            component: "./kubernetes/namespace/networks/gateway/tlsroutes",
          },
          {
            name: "TLSRoute",
            hideInMenu: true,
            path: "/kubernetes/cluster/networks/gateway/tlsroutes/create/text",
            component: "./kubernetes/namespace/networks/gateway/tlsroutes/text",
          },
          {
            name: "TLSRoute",
            hideInMenu: true,
            path: "/kubernetes/cluster/networks/gateway/tlsroutes/:name/:action",
            component: "./kubernetes/namespace/networks/gateway/tlsroutes/text",
          },
          {
            name: "TCPRoute",
            path: "/kubernetes/cluster/networks/gateway/tcproutes",
            component: "./kubernetes/namespace/networks/gateway/tcproutes",
          },
          {
            name: "TCPRoute",
            hideInMenu: true,
            path: "/kubernetes/cluster/networks/gateway/tcproutes/create/text",
            component: "./kubernetes/namespace/networks/gateway/tcproutes/text",
          },
          {
            name: "TCPRoute",
            hideInMenu: true,
            path: "/kubernetes/cluster/networks/gateway/tcproutes/:name/:action",
            component: "./kubernetes/namespace/networks/gateway/tcproutes/text",
          },
          {
            name: "UDPRoute",
            path: "/kubernetes/cluster/networks/gateway/udproutes",
            component: "./kubernetes/namespace/networks/gateway/udproutes",
          },
          {
            name: "UDPRoute",
            hideInMenu: true,
            path: "/kubernetes/cluster/networks/gateway/udproutes/create/text",
            component: "./kubernetes/namespace/networks/gateway/udproutes/text",
          },
          {
            name: "UDPRoute",
            hideInMenu: true,
            path: "/kubernetes/cluster/networks/gateway/udproutes/:name/:action",
            component: "./kubernetes/namespace/networks/gateway/udproutes/text",
          },
          {
            name: "ReferenceGrant",
            path: "/kubernetes/cluster/networks/gateway/referencegrants",
            component:
              "./kubernetes/namespace/networks/gateway/referencegrants",
          },
          {
            name: "ReferenceGrant",
            hideInMenu: true,
            path: "/kubernetes/cluster/networks/gateway/referencegrants/create/text",
            component:
              "./kubernetes/namespace/networks/gateway/referencegrants/text",
          },
          {
            name: "ReferenceGrant",
            hideInMenu: true,
            path: "/kubernetes/cluster/networks/gateway/referencegrants/:name/:action",
            component:
              "./kubernetes/namespace/networks/gateway/referencegrants/text",
          },
          {
            name: "BackendTLSPolicy",
            path: "/kubernetes/cluster/networks/gateway/backendtlspolicies",
            component:
              "./kubernetes/namespace/networks/gateway/backendtlspolicies",
          },
          {
            name: "BackendTLSPolicy",
            hideInMenu: true,
            path: "/kubernetes/cluster/networks/gateway/backendtlspolicies/create/text",
            component:
              "./kubernetes/namespace/networks/gateway/backendtlspolicies/text",
          },
          {
            name: "BackendTLSPolicy",
            hideInMenu: true,
            path: "/kubernetes/cluster/networks/gateway/backendtlspolicies/:name/:action",
            component:
              "./kubernetes/namespace/networks/gateway/backendtlspolicies/text",
          },
          {
            name: "ListenerSet",
            path: "/kubernetes/cluster/networks/gateway/listenersets",
            component: "./kubernetes/namespace/networks/gateway/listenersets",
          },
          {
            name: "ListenerSet",
            hideInMenu: true,
            path: "/kubernetes/cluster/networks/gateway/listenersets/create/text",
            component:
              "./kubernetes/namespace/networks/gateway/listenersets/text",
          },
          {
            name: "ListenerSet",
            hideInMenu: true,
            path: "/kubernetes/cluster/networks/gateway/listenersets/:name/:action",
            component:
              "./kubernetes/namespace/networks/gateway/listenersets/text",
          },
          {
            name: "XBackendTrafficPolicy",
            path: "/kubernetes/cluster/networks/gateway/xbackendtrafficpolicies",
            component:
              "./kubernetes/namespace/networks/gateway/xbackendtrafficpolicies",
          },
          {
            name: "XBackendTrafficPolicy",
            hideInMenu: true,
            path: "/kubernetes/cluster/networks/gateway/xbackendtrafficpolicies/create/text",
            component:
              "./kubernetes/namespace/networks/gateway/xbackendtrafficpolicies/text",
          },
          {
            name: "XBackendTrafficPolicy",
            hideInMenu: true,
            path: "/kubernetes/cluster/networks/gateway/xbackendtrafficpolicies/:name/:action",
            component:
              "./kubernetes/namespace/networks/gateway/xbackendtrafficpolicies/text",
          },
        ],
      },
      {
        name: "service",
        path: "/kubernetes/cluster/networks/services",
        component: "./kubernetes/namespace/networks/service",
      },
      {
        name: "service",
        hideInMenu: true,
        path: "/kubernetes/cluster/networks/services/create/text",
        component: "./kubernetes/namespace/networks/service/text",
      },
      {
        name: "service",
        hideInMenu: true,
        path: "/kubernetes/cluster/networks/services/:name/:action",
        component: "./kubernetes/namespace/networks/service/form",
      },

      {
        name: "ingress",
        path: "/kubernetes/cluster/networks/ingresses",
        component: "./kubernetes/namespace/networks/ingress",
      },
      {
        name: "ingress",
        hideInMenu: true,
        path: "/kubernetes/cluster/networks/ingresses/create/text",
        component: "./kubernetes/namespace/networks/ingress/text",
      },
      {
        name: "ingress",
        hideInMenu: true,
        path: "/kubernetes/cluster/networks/ingresses/:name/:action",
        component: "./kubernetes/namespace/networks/ingress/form",
      },
      {
        name: "endpoint",
        path: "/kubernetes/cluster/networks/endpoints",
        component: "./kubernetes/namespace/networks/endpoint",
      },
      {
        name: "endpoint",
        hideInMenu: true,
        path: "/kubernetes/cluster/networks/endpoints/:name/:action",
        component: "./kubernetes/namespace/networks/endpoint/text",
      },
      {
        name: "EndpointSlice",
        path: "/kubernetes/cluster/networks/endpoint_slices",
        component: "./kubernetes/namespace/networks/endpoint_slice",
        access: "clusterResourceEndpointSliceAccess",
      },
      {
        name: "EndpointSlice",
        hideInMenu: true,
        path: "/kubernetes/cluster/networks/endpoint_slices/:name/:action",
        component: "./kubernetes/namespace/networks/endpoint_slice/text",
        access: "clusterResourceEndpointSliceAccess",
      },
      {
        name: "certManager",
        path: "/kubernetes/cluster/networks/certmanager",
        access: "clusterFeaturesCertManagerAccess",
        routes: [
          {
            name: "Certificate",
            path: "/kubernetes/cluster/networks/certmanager/certificates",
            component:
              "./kubernetes/namespace/networks/certmanager/certificate",
          },
          {
            name: "CertificateRequest",
            path: "/kubernetes/cluster/networks/certmanager/certificaterequests",
            component:
              "./kubernetes/namespace/networks/certmanager/certificaterequest",
          },
          {
            name: "ChallengesAcme",
            path: "/kubernetes/cluster/networks/certmanager/challengesacmes",
            component:
              "./kubernetes/namespace/networks/certmanager/challengesacme",
          },
          {
            name: "Issuer",
            path: "/kubernetes/cluster/networks/certmanager/issuers",
            component: "./kubernetes/namespace/networks/certmanager/issuer",
          },
          {
            name: "Order",
            path: "/kubernetes/cluster/networks/certmanager/orders",
            component: "./kubernetes/namespace/networks/certmanager/order",
          },
        ],
      },
    ],
  },
  {
    icon: "RadarChartOutlined",
    name: "ServiceMesh",
    path: "/kubernetes/cluster/servicemesh",
    access: "clusterAccess",
    routes: [
      {
        name: "Istio",
        path: "/kubernetes/cluster/servicemesh/istio",
        access: "clusterFeaturesIstioAccess",
        routes: [],
      },
    ],
  },
  {
    icon: "usergroupAddOutlined",
    name: "access",
    path: "/kubernetes/cluster/access",
    access: "clusterAccess",
    routes: [
      {
        name: "clusterRole",
        path: "/kubernetes/cluster/access/clusterroles",
        component: "./kubernetes/cluster/cluster_role",
        access: "clusterAccess",
      },
      {
        name: "clusterRole",
        hideInMenu: true,
        path: "/kubernetes/cluster/access/clusterroles/:name/:action",
        component: "./kubernetes/cluster/cluster_role/text",
        access: "clusterAccess",
      },
      {
        name: "clusterRoleBinding",
        path: "/kubernetes/cluster/access/clusterrolebindings",
        component: "./kubernetes/cluster/cluster_role_binding",
        access: "clusterAccess",
      },
      {
        name: "clusterRole",
        hideInMenu: true,
        path: "/kubernetes/cluster/access/clusterrolebindings/:name/:action",
        component: "./kubernetes/cluster/cluster_role_binding/text",
        access: "clusterAccess",
      },
      {
        name: "serviceaccount",
        path: "/kubernetes/cluster/access/serviceaccounts",
        component: "./kubernetes/namespace/access/serviceaccount",
        access: "clusterAccess",
      },
      {
        name: "role",
        path: "/kubernetes/cluster/access/role",
        component: "./kubernetes/namespace/access/role",
        access: "clusterAccess",
      },
      {
        name: "rolebinding",
        path: "/kubernetes/cluster/access/rolebinding",
        component: "./kubernetes/namespace/access/rolebinding",
        access: "clusterAccess",
      },
      {
        name: "certificatesigningrequest",
        path: "/kubernetes/cluster/access/certificatesigningrequests",
        component: "./kubernetes/cluster/csr",
        access: "clusterAccess",
      },
      {
        name: "certificatesigningrequest",
        hideInMenu: true,
        path: "/kubernetes/cluster/access/certificatesigningrequests/:name/:action",
        component: "./kubernetes/cluster/csr/text",
        access: "clusterAccess",
      },
    ],
  },
  {
    icon: "DatabaseOutlined",
    name: "storage",
    path: "/kubernetes/cluster/storage",
    access: "clusterAccess",
    routes: [
      {
        name: "storageClass",
        path: "/kubernetes/cluster/storage/storageclass",
        component: "./kubernetes/cluster/storage/storageclass",
        access: "clusterAccess",
      },
      {
        name: "storageClass",
        hideInMenu: true,
        path: "/kubernetes/cluster/storage/storageclass/:name/:action",
        component: "./kubernetes/cluster/storage/storageclass/text",
        access: "clusterAccess",
      },
      {
        name: "persistentVolume",
        path: "/kubernetes/cluster/storage/persistentvolume",
        component: "./kubernetes/cluster/storage/pv",
        access: "clusterAccess",
      },
      {
        name: "persistentVolume",
        hideInMenu: true,
        path: "/kubernetes/cluster/storage/persistentvolume/:name/:action",
        component: "./kubernetes/cluster/storage/pv/text",
        access: "clusterAccess",
      },
      {
        name: "persistentVolumeClaim",
        path: "/kubernetes/cluster/storage/persistentvolumeclaim",
        component: "./kubernetes/namespace/storage/pvc",
        access: "clusterAccess",
      },
      {
        name: "persistentVolumeClaim",
        hideInMenu: true,
        path: "/kubernetes/cluster/storage/persistentvolumeclaim/:name/:action",
        component: "./kubernetes/namespace/storage/pvc/text",
        access: "clusterAccess",
      },
    ],
  },
  {
    icon: "PicRightOutlined",
    name: "policy",
    path: "/kubernetes/cluster/policy",
    access: "clusterAccess",
    routes: [
      {
        name: "networkpolicy",
        path: "/kubernetes/cluster/policy/networkpolicy",
        component: "./kubernetes/namespace/policy/networkpolicy",
      },
      {
        name: "hpa",
        path: "/kubernetes/cluster/policy/hpa",
        component: "./kubernetes/namespace/policy/hpa",
      },
      {
        name: "poddisruptionbudget",
        path: "/kubernetes/cluster/policy/poddisruptionbudgets",
        component: "./kubernetes/namespace/policy/poddisruptionbudget",
      },
    ],
  },

  {
    name: "monitor",
    icon: "EyeOutlined",
    path: "/kubernetes/cluster/monitor",
    access: "clusterAccess",
    routes: [
      {
        name: "event",
        path: "/kubernetes/cluster/monitor/events",
        component: "./kubernetes/namespace/monitor/event",
      },
      {
        name: "auditlog",
        path: "/kubernetes/cluster/monitor/audit",
        component: "./kubernetes/cluster/monitor/audit",
      },
      {
        name: "terminalAuditLog",
        path: "/kubernetes/cluster/monitor/terminal",
        component: "./kubernetes/cluster/monitor/terminal",
      },
      {
        name: "prometheusOperator",
        path: "/kubernetes/cluster/monitor/prometheus-operator",
        access: "clusterFeaturesPrometheusOperatorAccess",
        routes: [
          {
            name: "Alertmanager",
            path: "/kubernetes/cluster/monitor/prometheus-operator/alertmanager",
            component:
              "./kubernetes/namespace/monitor/prometheusoperator/alertmanager",
          },
          {
            name: "Alertmanager",
            hideInMenu: true,
            path: "/kubernetes/cluster/monitor/prometheus-operator/alertmanager/create/text",
            component:
              "./kubernetes/namespace/monitor/prometheusoperator/alertmanager/text",
          },
          {
            name: "Prometheus",
            path: "/kubernetes/cluster/monitor/prometheus-operator/prometheus",
            component:
              "./kubernetes/namespace/monitor/prometheusoperator/prometheus",
          },
          {
            name: "Prometheus",
            hideInMenu: true,
            path: "/kubernetes/cluster/monitor/prometheus-operator/prometheus/create/text",
            component:
              "./kubernetes/namespace/monitor/prometheusoperator/prometheus/text",
          },
          {
            name: "PrometheusRule",
            path: "/kubernetes/cluster/monitor/prometheus-operator/prometheusrule",
            component:
              "./kubernetes/namespace/monitor/prometheusoperator/prometheusrule",
          },
          {
            name: "PrometheusRule",
            hideInMenu: true,
            path: "/kubernetes/cluster/monitor/prometheus-operator/prometheusrule/create/text",
            component:
              "./kubernetes/namespace/monitor/prometheusoperator/prometheusrule/text",
          },
          {
            name: "ServiceMonitor",
            path: "/kubernetes/cluster/monitor/prometheus-operator/servicemonitor",
            component:
              "./kubernetes/namespace/monitor/prometheusoperator/servicemonitor",
          },
          {
            name: "ServiceMonitor",
            hideInMenu: true,
            path: "/kubernetes/cluster/monitor/prometheus-operator/servicemonitor/create/text",
            component:
              "./kubernetes/namespace/monitor/prometheusoperator/servicemonitor/text",
          },
          {
            name: "PodMonitor",
            path: "/kubernetes/cluster/monitor/prometheus-operator/podmonitor",
            component:
              "./kubernetes/namespace/monitor/prometheusoperator/podmonitor",
          },
          {
            name: "PodMonitor",
            hideInMenu: true,
            path: "/kubernetes/cluster/monitor/prometheus-operator/podmonitor/create/text",
            component:
              "./kubernetes/namespace/monitor/prometheusoperator/podmonitor/text",
          },
        ],
      },
      {
        name: "VictoriaMetrics",
        path: "/kubernetes/cluster/monitor/victoria-metrics",
        access: "clusterFeaturesVictoriaMetricsAccess",
        routes: [],
      },
    ],
  },

  {
    name: "KubeVirt",
    icon: "CloudServerOutlined",
    path: "/kubernetes/cluster/kubevirt",
    access: "clusterAccess",
    routes: [
      {
        name: "KubeVirt",
        path: "/kubernetes/cluster/kubevirt/kubevirts",
        component: "./kubernetes/cluster/kubevirt/kubevirts",
        access: "clusterFeaturesKubeVirtAccess",
      },
      {
        name: "KubeVirt",
        hideInMenu: true,
        path: "/kubernetes/cluster/kubevirt/kubevirts/:name",
        component: "./kubernetes/cluster/kubevirt/kubevirts/detail",
        access: "clusterFeaturesKubeVirtAccess",
      },
      {
        name: "KubeVirt",
        hideInMenu: true,
        path: "/kubernetes/cluster/kubevirt/kubevirts/create/text",
        component: "./kubernetes/cluster/kubevirt/kubevirts/text",
        access: "clusterFeaturesKubeVirtAccess",
      },
      {
        name: "KubeVirt",
        hideInMenu: true,
        path: "/kubernetes/cluster/kubevirt/kubevirts/:name/update",
        component: "./kubernetes/cluster/kubevirt/kubevirts/text",
        access: "clusterFeaturesKubeVirtAccess",
      },
      {
        name: "MigrationPolicy",
        path: "/kubernetes/cluster/kubevirt/migrationpolicies",
        component: "./kubernetes/cluster/kubevirt/migrationpolicies",
        access: "clusterFeaturesKubeVirtMigrationPolicyAccess",
      },
      {
        name: "MigrationPolicy",
        hideInMenu: true,
        path: "/kubernetes/cluster/kubevirt/migrationpolicies/:name",
        component: "./kubernetes/cluster/kubevirt/migrationpolicies/detail",
        access: "clusterFeaturesKubeVirtMigrationPolicyAccess",
      },
      {
        name: "MigrationPolicy",
        hideInMenu: true,
        path: "/kubernetes/cluster/kubevirt/migrationpolicies/create/text",
        component: "./kubernetes/cluster/kubevirt/migrationpolicies/text",
        access: "clusterFeaturesKubeVirtMigrationPolicyAccess",
      },
      {
        name: "MigrationPolicy",
        hideInMenu: true,
        path: "/kubernetes/cluster/kubevirt/migrationpolicies/:name/update",
        component: "./kubernetes/cluster/kubevirt/migrationpolicies/text",
        access: "clusterFeaturesKubeVirtMigrationPolicyAccess",
      },
      {
        name: "ClusterInstancetype",
        path: "/kubernetes/cluster/kubevirt/clusterinstancetypes",
        component: "./kubernetes/cluster/kubevirt/clusterinstancetypes",
        access: "clusterFeaturesKubeVirtVirtualMachineClusterPreferenceAccess",
      },
      {
        name: "ClusterInstancetype",
        hideInMenu: true,
        path: "/kubernetes/cluster/kubevirt/clusterinstancetypes/:name",
        component: "./kubernetes/cluster/kubevirt/clusterinstancetypes/detail",
        access: "clusterFeaturesKubeVirtVirtualMachineClusterPreferenceAccess",
      },
      {
        name: "ClusterInstancetype",
        hideInMenu: true,
        path: "/kubernetes/cluster/kubevirt/clusterinstancetypes/create/text",
        component: "./kubernetes/cluster/kubevirt/clusterinstancetypes/text",
        access: "clusterFeaturesKubeVirtVirtualMachineClusterPreferenceAccess",
      },
      {
        name: "ClusterInstancetype",
        hideInMenu: true,
        path: "/kubernetes/cluster/kubevirt/clusterinstancetypes/:name/update",
        component: "./kubernetes/cluster/kubevirt/clusterinstancetypes/text",
        access: "clusterFeaturesKubeVirtVirtualMachineClusterPreferenceAccess",
      },
      {
        name: "ClusterPreference",
        path: "/kubernetes/cluster/kubevirt/clusterpreferences",
        component: "./kubernetes/cluster/kubevirt/clusterpreferences",
        access: "clusterFeaturesKubeVirtVirtualMachineClusterPreferenceAccess",
      },
      {
        name: "ClusterPreference",
        hideInMenu: true,
        path: "/kubernetes/cluster/kubevirt/clusterpreferences/:name",
        component: "./kubernetes/cluster/kubevirt/clusterpreferences/detail",
        access: "clusterFeaturesKubeVirtVirtualMachineClusterPreferenceAccess",
      },
      {
        name: "ClusterPreference",
        hideInMenu: true,
        path: "/kubernetes/cluster/kubevirt/clusterpreferences/create/text",
        component: "./kubernetes/cluster/kubevirt/clusterpreferences/text",
        access: "clusterFeaturesKubeVirtVirtualMachineClusterPreferenceAccess",
      },
      {
        name: "ClusterPreference",
        hideInMenu: true,
        path: "/kubernetes/cluster/kubevirt/clusterpreferences/:name/update",
        component: "./kubernetes/cluster/kubevirt/clusterpreferences/text",
        access: "clusterFeaturesKubeVirtVirtualMachineClusterPreferenceAccess",
      },
      {
        name: "VirtualMachine",
        path: "/kubernetes/cluster/kubevirt/virtualmachines",
        component: "./kubernetes/namespace/kubevirt/virtualmachines",
        access: "clusterFeaturesKubeVirtAccess",
      },
      {
        name: "VirtualMachine",
        hideInMenu: true,
        path: "/kubernetes/cluster/kubevirt/virtualmachines/:name",
        component: "./kubernetes/namespace/kubevirt/virtualmachines/detail",
        access: "clusterFeaturesKubeVirtAccess",
      },
      {
        name: "VirtualMachine",
        hideInMenu: true,
        path: "/kubernetes/cluster/kubevirt/virtualmachines/create/text",
        component: "./kubernetes/namespace/kubevirt/virtualmachines/text",
        access: "clusterFeaturesKubeVirtAccess",
      },
      {
        name: "VirtualMachine",
        hideInMenu: true,
        path: "/kubernetes/cluster/kubevirt/virtualmachines/:name/update",
        component: "./kubernetes/namespace/kubevirt/virtualmachines/text",
        access: "clusterFeaturesKubeVirtAccess",
      },
      {
        name: "VirtualMachineInstance",
        path: "/kubernetes/cluster/kubevirt/virtualmachineinstances",
        component: "./kubernetes/namespace/kubevirt/virtualmachineinstances",
        access: "clusterFeaturesKubeVirtAccess",
      },
      {
        name: "VirtualMachineInstance",
        hideInMenu: true,
        path: "/kubernetes/cluster/kubevirt/virtualmachineinstances/:name",
        component:
          "./kubernetes/namespace/kubevirt/virtualmachineinstances/detail",
        access: "clusterFeaturesKubeVirtAccess",
      },
      {
        name: "VirtualMachineInstance",
        hideInMenu: true,
        path: "/kubernetes/cluster/kubevirt/virtualmachineinstances/create/text",
        component:
          "./kubernetes/namespace/kubevirt/virtualmachineinstances/text",
        access: "clusterFeaturesKubeVirtAccess",
      },
      {
        name: "VirtualMachineInstance",
        hideInMenu: true,
        path: "/kubernetes/cluster/kubevirt/virtualmachineinstances/:name/update",
        component:
          "./kubernetes/namespace/kubevirt/virtualmachineinstances/text",
        access: "clusterFeaturesKubeVirtAccess",
      },
      {
        name: "VirtualMachineInstanceMigration",
        path: "/kubernetes/cluster/kubevirt/virtualmachineinstancemigrations",
        component:
          "./kubernetes/namespace/kubevirt/virtualmachineinstancemigrations",
        access: "clusterFeaturesKubeVirtAccess",
      },
      {
        name: "VirtualMachineInstanceMigration",
        hideInMenu: true,
        path: "/kubernetes/cluster/kubevirt/virtualmachineinstancemigrations/:name",
        component:
          "./kubernetes/namespace/kubevirt/virtualmachineinstancemigrations/detail",
        access: "clusterFeaturesKubeVirtAccess",
      },
      {
        name: "VirtualMachineInstanceMigration",
        hideInMenu: true,
        path: "/kubernetes/cluster/kubevirt/virtualmachineinstancemigrations/create/text",
        component:
          "./kubernetes/namespace/kubevirt/virtualmachineinstancemigrations/text",
        access: "clusterFeaturesKubeVirtAccess",
      },
      {
        name: "VirtualMachineInstanceMigration",
        hideInMenu: true,
        path: "/kubernetes/cluster/kubevirt/virtualmachineinstancemigrations/:name/update",
        component:
          "./kubernetes/namespace/kubevirt/virtualmachineinstancemigrations/text",
        access: "clusterFeaturesKubeVirtAccess",
      },
      {
        name: "VirtualMachinePool",
        path: "/kubernetes/cluster/kubevirt/virtualmachinepools",
        component: "./kubernetes/namespace/kubevirt/virtualmachinepools",
        access: "clusterFeaturesKubeVirtVirtualMachinePoolAccess",
      },
      {
        name: "VirtualMachinePool",
        hideInMenu: true,
        path: "/kubernetes/cluster/kubevirt/virtualmachinepools/:name",
        component: "./kubernetes/namespace/kubevirt/virtualmachinepools/detail",
        access: "clusterFeaturesKubeVirtVirtualMachinePoolAccess",
      },
      {
        name: "VirtualMachinePool",
        hideInMenu: true,
        path: "/kubernetes/cluster/kubevirt/virtualmachinepools/create/text",
        component: "./kubernetes/namespace/kubevirt/virtualmachinepools/text",
        access: "clusterFeaturesKubeVirtVirtualMachinePoolAccess",
      },
      {
        name: "VirtualMachinePool",
        hideInMenu: true,
        path: "/kubernetes/cluster/kubevirt/virtualmachinepools/:name/update",
        component: "./kubernetes/namespace/kubevirt/virtualmachinepools/text",
        access: "clusterFeaturesKubeVirtVirtualMachinePoolAccess",
      },
      {
        name: "Instancetype",
        path: "/kubernetes/cluster/kubevirt/instancetypes",
        component: "./kubernetes/namespace/kubevirt/instancetypes",
        access: "clusterFeaturesKubeVirtVirtualMachineClusterPreferenceAccess",
      },
      {
        name: "Instancetype",
        hideInMenu: true,
        path: "/kubernetes/cluster/kubevirt/instancetypes/:name",
        component: "./kubernetes/namespace/kubevirt/instancetypes/detail",
        access: "clusterFeaturesKubeVirtVirtualMachineClusterPreferenceAccess",
      },
      {
        name: "Instancetype",
        hideInMenu: true,
        path: "/kubernetes/cluster/kubevirt/instancetypes/create/text",
        component: "./kubernetes/namespace/kubevirt/instancetypes/text",
        access: "clusterFeaturesKubeVirtVirtualMachineClusterPreferenceAccess",
      },
      {
        name: "Instancetype",
        hideInMenu: true,
        path: "/kubernetes/cluster/kubevirt/instancetypes/:name/update",
        component: "./kubernetes/namespace/kubevirt/instancetypes/text",
        access: "clusterFeaturesKubeVirtVirtualMachineClusterPreferenceAccess",
      },
      {
        name: "Preference",
        path: "/kubernetes/cluster/kubevirt/preferences",
        component: "./kubernetes/namespace/kubevirt/preferences",
        access: "clusterFeaturesKubeVirtVirtualMachineClusterPreferenceAccess",
      },
      {
        name: "Preference",
        hideInMenu: true,
        path: "/kubernetes/cluster/kubevirt/preferences/:name",
        component: "./kubernetes/namespace/kubevirt/preferences/detail",
        access: "clusterFeaturesKubeVirtVirtualMachineClusterPreferenceAccess",
      },
      {
        name: "Preference",
        hideInMenu: true,
        path: "/kubernetes/cluster/kubevirt/preferences/create/text",
        component: "./kubernetes/namespace/kubevirt/preferences/text",
        access: "clusterFeaturesKubeVirtVirtualMachineClusterPreferenceAccess",
      },
      {
        name: "Preference",
        hideInMenu: true,
        path: "/kubernetes/cluster/kubevirt/preferences/:name/update",
        component: "./kubernetes/namespace/kubevirt/preferences/text",
        access: "clusterFeaturesKubeVirtVirtualMachineClusterPreferenceAccess",
      },
      {
        name: "DataVolume",
        path: "/kubernetes/cluster/kubevirt/datavolumes",
        component: "./kubernetes/namespace/kubevirt/datavolumes",
        access: "clusterFeaturesKubeVirtDataVolumeAccess",
      },
      {
        name: "DataVolume",
        hideInMenu: true,
        path: "/kubernetes/cluster/kubevirt/datavolumes/:name",
        component: "./kubernetes/namespace/kubevirt/datavolumes/detail",
        access: "clusterFeaturesKubeVirtDataVolumeAccess",
      },
      {
        name: "DataVolume",
        hideInMenu: true,
        path: "/kubernetes/cluster/kubevirt/datavolumes/create/text",
        component: "./kubernetes/namespace/kubevirt/datavolumes/text",
        access: "clusterFeaturesKubeVirtDataVolumeAccess",
      },
      {
        name: "DataVolume",
        hideInMenu: true,
        path: "/kubernetes/cluster/kubevirt/datavolumes/:name/update",
        component: "./kubernetes/namespace/kubevirt/datavolumes/text",
        access: "clusterFeaturesKubeVirtDataVolumeAccess",
      },
      {
        name: "VirtualMachineSnapshot",
        path: "/kubernetes/cluster/kubevirt/virtualmachinesnapshots",
        component: "./kubernetes/namespace/kubevirt/virtualmachinesnapshots",
        access: "clusterFeaturesVirtualMachineSnapshotAccess",
      },
      {
        name: "VirtualMachineSnapshot",
        hideInMenu: true,
        path: "/kubernetes/cluster/kubevirt/virtualmachinesnapshots/:name",
        component:
          "./kubernetes/namespace/kubevirt/virtualmachinesnapshots/detail",
        access: "clusterFeaturesVirtualMachineSnapshotAccess",
      },
      {
        name: "VirtualMachineSnapshot",
        hideInMenu: true,
        path: "/kubernetes/cluster/kubevirt/virtualmachinesnapshots/create/text",
        component:
          "./kubernetes/namespace/kubevirt/virtualmachinesnapshots/text",
        access: "clusterFeaturesVirtualMachineSnapshotAccess",
      },
      {
        name: "VirtualMachineSnapshot",
        hideInMenu: true,
        path: "/kubernetes/cluster/kubevirt/virtualmachinesnapshots/:name/update",
        component:
          "./kubernetes/namespace/kubevirt/virtualmachinesnapshots/text",
        access: "clusterFeaturesVirtualMachineSnapshotAccess",
      },
      {
        name: "VirtualMachineRestore",
        path: "/kubernetes/cluster/kubevirt/virtualmachinerestores",
        component: "./kubernetes/namespace/kubevirt/virtualmachinerestores",
        access: "clusterFeaturesVirtualMachineRestoreAccess",
      },
      {
        name: "VirtualMachineRestore",
        hideInMenu: true,
        path: "/kubernetes/cluster/kubevirt/virtualmachinerestores/:name",
        component:
          "./kubernetes/namespace/kubevirt/virtualmachinerestores/detail",
        access: "clusterFeaturesVirtualMachineRestoreAccess",
      },
      {
        name: "VirtualMachineRestore",
        hideInMenu: true,
        path: "/kubernetes/cluster/kubevirt/virtualmachinerestores/create/text",
        component:
          "./kubernetes/namespace/kubevirt/virtualmachinerestores/text",
        access: "clusterFeaturesVirtualMachineRestoreAccess",
      },
      {
        name: "VirtualMachineRestore",
        hideInMenu: true,
        path: "/kubernetes/cluster/kubevirt/virtualmachinerestores/:name/update",
        component:
          "./kubernetes/namespace/kubevirt/virtualmachinerestores/text",
        access: "clusterFeaturesVirtualMachineRestoreAccess",
      },
      {
        name: "VirtualMachineClone",
        path: "/kubernetes/cluster/kubevirt/virtualmachineclones",
        component: "./kubernetes/namespace/kubevirt/virtualmachineclones",
        access: "clusterFeaturesKubeVirtVirtualMachineCloneAccess",
      },
      {
        name: "VirtualMachineClone",
        hideInMenu: true,
        path: "/kubernetes/cluster/kubevirt/virtualmachineclones/:name",
        component:
          "./kubernetes/namespace/kubevirt/virtualmachineclones/detail",
        access: "clusterFeaturesKubeVirtVirtualMachineCloneAccess",
      },
      {
        name: "VirtualMachineClone",
        hideInMenu: true,
        path: "/kubernetes/cluster/kubevirt/virtualmachineclones/create/text",
        component: "./kubernetes/namespace/kubevirt/virtualmachineclones/text",
        access: "clusterFeaturesKubeVirtVirtualMachineCloneAccess",
      },
      {
        name: "VirtualMachineClone",
        hideInMenu: true,
        path: "/kubernetes/cluster/kubevirt/virtualmachineclones/:name/update",
        component: "./kubernetes/namespace/kubevirt/virtualmachineclones/text",
        access: "clusterFeaturesKubeVirtVirtualMachineCloneAccess",
      },
      {
        name: "VirtualMachineExport",
        path: "/kubernetes/cluster/kubevirt/virtualmachineexports",
        component: "./kubernetes/namespace/kubevirt/virtualmachineexports",
        access: "clusterFeaturesKubeVirtVirtualMachineExportAccess",
      },
      {
        name: "VirtualMachineExport",
        hideInMenu: true,
        path: "/kubernetes/cluster/kubevirt/virtualmachineexports/:name",
        component:
          "./kubernetes/namespace/kubevirt/virtualmachineexports/detail",
        access: "clusterFeaturesKubeVirtVirtualMachineExportAccess",
      },
      {
        name: "VirtualMachineExport",
        hideInMenu: true,
        path: "/kubernetes/cluster/kubevirt/virtualmachineexports/create/text",
        component: "./kubernetes/namespace/kubevirt/virtualmachineexports/text",
        access: "clusterFeaturesKubeVirtVirtualMachineExportAccess",
      },
      {
        name: "VirtualMachineExport",
        hideInMenu: true,
        path: "/kubernetes/cluster/kubevirt/virtualmachineexports/:name/update",
        component: "./kubernetes/namespace/kubevirt/virtualmachineexports/text",
        access: "clusterFeaturesKubeVirtVirtualMachineExportAccess",
      },
    ],
  },
  {
    name: "crd",
    icon: "ProductOutlined",
    path: "/kubernetes/cluster/customresourcedefinitions",
    access: "clusterAccess",
    component: "./kubernetes/crd",
  },
  {
    name: "crd",
    icon: "ProductOutlined",
    hideInMenu: true,
    path: "/kubernetes/cluster/customresourcedefinitions/:name",
    access: "clusterAccess",
    component: "./kubernetes/crd/detail",
  },
  {
    name: "crd",
    icon: "ProductOutlined",
    hideInMenu: true,
    path: "/kubernetes/cluster/customresourcedefinitions/:kind/:group/:version/:plural",
    access: "clusterAccess",
    component: "./kubernetes/crd/instances",
  },
  {
    name: "apiservice",
    icon: "ApiOutlined",
    path: "/kubernetes/cluster/apiservices",
    access: "clusterAccess",
    component: "./kubernetes/cluster/apiservice",
  },
  {
    name: "apiservice",
    icon: "ApiOutlined",
    hideInMenu: true,
    path: "/kubernetes/cluster/apiservices/:name",
    access: "clusterAccess",
    component: "./kubernetes/cluster/apiservice/detail",
  },
  {
    name: "apiservice",
    icon: "ApiOutlined",
    hideInMenu: true,
    path: "/kubernetes/cluster/apiservices/:name/:action",
    access: "clusterAccess",
    component: "./kubernetes/cluster/apiservice/text",
  },
];

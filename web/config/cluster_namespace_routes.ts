export default [
  {
    icon: "dashboard",
    name: "dashboard",
    path: "/kubernetes/namespace/dashboard",
    access: "clusterNamespaceAccess",
    routes: [
      {
        name: "overview",
        path: "/kubernetes/namespace/dashboard/overview",
        component: "./kubernetes/namespace/dashboard/overview",
        access: "clusterNamespaceAccess",
      },
      {
        name: "workload",
        path: "/kubernetes/namespace/dashboard/workload",
        component: "./kubernetes/namespace/dashboard/workload",
        access: "clusterNamespaceAccess",
      },
    ],
  },
  {
    name: "workload",
    icon: "CloudServerOutlined",
    path: "/kubernetes/namespace/workload",
    access: "clusterNamespaceAccess",
    routes: [
      {
        name: "pod",
        path: "/kubernetes/namespace/workload/pods",
        component: "./kubernetes/namespace/workload/pod",
        access: "clusterNamespaceAccess",
      },
      {
        name: "pod",
        hideInMenu: true,
        path: "/kubernetes/namespace/workload/pods/:name",
        component: "./kubernetes/namespace/workload/pod/detail",
        access: "clusterNamespaceAccess",
      },
      {
        name: "pod",
        hideInMenu: true,
        path: "/kubernetes/namespace/workload/pods/:name/:action",
        component: "./kubernetes/namespace/workload/pod/text",
        access: "clusterNamespaceAccess",
      },
      {
        name: "deployment",
        path: "/kubernetes/namespace/workload/deployments",
        component: "./kubernetes/namespace/workload/deployment",
        access: "clusterNamespaceAccess",
      },
      {
        name: "deployment",
        hideInMenu: true,
        path: "/kubernetes/namespace/workload/deployments/:name",
        component: "./kubernetes/namespace/workload/deployment/detail",
        access: "clusterNamespaceAccess",
      },
      {
        name: "deployment",
        hideInMenu: true,
        path: "/kubernetes/namespace/workload/deployments/:name/:action",
        component: "./kubernetes/namespace/workload/deployment/text",
        access: "clusterNamespaceAccess",
      },
      {
        name: "deployment",
        hideInMenu: true,
        path: "/kubernetes/namespace/workload/deployments/:name/:action/step",
        component: "./kubernetes/namespace/workload/deployment/step_form",
        access: "clusterNamespaceAccess",
      },
      {
        name: "statefulset",
        path: "/kubernetes/namespace/workload/statefulsets",
        component: "./kubernetes/namespace/workload/statefulset",
        access: "clusterNamespaceAccess",
      },
      {
        name: "statefulset",
        hideInMenu: true,
        path: "/kubernetes/namespace/workload/statefulsets/:name",
        component: "./kubernetes/namespace/workload/statefulset/detail",
        access: "clusterNamespaceAccess",
      },
      {
        name: "statefulset",
        hideInMenu: true,
        path: "/kubernetes/namespace/workload/statefulsets/:name/:action",
        component: "./kubernetes/namespace/workload/statefulset/text",
        access: "clusterNamespaceAccess",
      },
      {
        name: "statefulset",
        hideInMenu: true,
        path: "/kubernetes/namespace/workload/statefulsets/:name/:action/step",
        component: "./kubernetes/namespace/workload/statefulset/step_form",
        access: "clusterNamespaceAccess",
      },
      {
        name: "daemonset",
        path: "/kubernetes/namespace/workload/daemonsets",
        component: "./kubernetes/namespace/workload/daemonset",
        access: "clusterNamespaceAccess",
      },
      {
        name: "daemonset",
        hideInMenu: true,
        path: "/kubernetes/namespace/workload/daemonsets/:name",
        component: "./kubernetes/namespace/workload/daemonset/detail",
        access: "clusterNamespaceAccess",
      },
      {
        name: "daemonset",
        hideInMenu: true,
        path: "/kubernetes/namespace/workload/daemonsets/:name/:action",
        component: "./kubernetes/namespace/workload/daemonset/text",
        access: "clusterNamespaceAccess",
      },
      {
        name: "daemonset",
        hideInMenu: true,
        path: "/kubernetes/namespace/workload/daemonsets/:name/:action/step",
        component: "./kubernetes/namespace/workload/daemonset/step_form",
        access: "clusterNamespaceAccess",
      },
      {
        name: "job",
        path: "/kubernetes/namespace/workload/jobs",
        component: "./kubernetes/namespace/workload/job",
        access: "clusterNamespaceAccess",
      },
      {
        name: "job",
        hideInMenu: true,
        path: "/kubernetes/namespace/workload/jobs/:name",
        component: "./kubernetes/namespace/workload/job/detail",
        access: "clusterNamespaceAccess",
      },
      {
        name: "job",
        hideInMenu: true,
        path: "/kubernetes/namespace/workload/jobs/:name/:action",
        component: "./kubernetes/namespace/workload/job/text",
        access: "clusterNamespaceAccess",
      },
      {
        name: "cronjob",
        path: "/kubernetes/namespace/workload/cronjobs",
        component: "./kubernetes/namespace/workload/cronjob",
        access: "clusterNamespaceAccess",
      },
      {
        name: "cronjob",
        hideInMenu: true,
        path: "/kubernetes/namespace/workload/cronjobs/:name",
        component: "./kubernetes/namespace/workload/cronjob/detail",
        access: "clusterNamespaceAccess",
      },
      {
        name: "cronjob",
        hideInMenu: true,
        path: "/kubernetes/namespace/workload/cronjobs/:name/:action",
        component: "./kubernetes/namespace/workload/cronjob/text",
        access: "clusterNamespaceAccess",
      },
      {
        name: "Argo Rollouts",
        path: "/kubernetes/namespace/workload/argo-rollouts",
        component: "./kubernetes/namespace/workload/rollouts",
        access: "clusterFeaturesArgoRolloutsAccess",
      },
      {
        name: "Argo Rollouts",
        hideInMenu: true,
        path: "/kubernetes/namespace/workload/argo-rollouts/:name",
        component: "./kubernetes/namespace/workload/rollouts/detail",
        access: "clusterFeaturesArgoRolloutsAccess",
      },
      {
        name: "Argo Rollouts",
        hideInMenu: true,
        path: "/kubernetes/namespace/workload/argo-rollouts/:name/:action",
        component: "./kubernetes/namespace/workload/rollouts/text",
        access: "clusterFeaturesArgoRolloutsAccess",
      },
      {
        name: "replicaset",
        path: "/kubernetes/namespace/workload/replicasets",
        component: "./kubernetes/namespace/workload/replicaset",
        access: "clusterNamespaceAccess",
      },
      {
        name: "replicaset",
        hideInMenu: true,
        path: "/kubernetes/namespace/workload/replicasets/:name",
        component: "./kubernetes/namespace/workload/replicaset/detail",
        access: "clusterNamespaceAccess",
      },
      {
        name: "replicaset",
        hideInMenu: true,
        path: "/kubernetes/namespace/workload/replicasets/:name/:action",
        component: "./kubernetes/namespace/workload/replicaset/text",
        access: "clusterNamespaceAccess",
      },
    ],
  },
  {
    icon: "RobotOutlined",
    name: "ai",
    path: "/kubernetes/namespace/ai",
    access: "clusterNamespaceAccess",
    routes: [
      {
        name: "Volcano",
        path: "/kubernetes/namespace/ai/volcano",
        access: "clusterFeaturesVolcanoAccess",
        routes: [
          {
            name: "Job",
            path: "/kubernetes/namespace/ai/volcano/jobs",
            component: "./kubernetes/namespace/ai/volcano/jobs",
          },
          {
            name: "Job",
            hideInMenu: true,
            path: "/kubernetes/namespace/ai/volcano/jobs/create/text",
            component: "./kubernetes/namespace/ai/volcano/jobs/text",
          },
          {
            name: "PodGroup",
            path: "/kubernetes/namespace/ai/volcano/podgroups",
            component: "./kubernetes/namespace/ai/volcano/podgroups",
          },
          {
            name: "PodGroup",
            hideInMenu: true,
            path: "/kubernetes/namespace/ai/volcano/podgroups/create/text",
            component: "./kubernetes/namespace/ai/volcano/podgroups/text",
          },
          {
            name: "Command",
            path: "/kubernetes/namespace/ai/volcano/commands",
            component: "./kubernetes/namespace/ai/volcano/commands",
          },
          {
            name: "Command",
            hideInMenu: true,
            path: "/kubernetes/namespace/ai/volcano/commands/create/text",
            component: "./kubernetes/namespace/ai/volcano/commands/text",
          },
          {
            name: "JobFlow",
            path: "/kubernetes/namespace/ai/volcano/jobflows",
            component: "./kubernetes/namespace/ai/volcano/jobflows",
          },
          {
            name: "JobFlow",
            hideInMenu: true,
            path: "/kubernetes/namespace/ai/volcano/jobflows/create/text",
            component: "./kubernetes/namespace/ai/volcano/jobflows/text",
          },
          {
            name: "JobTemplate",
            path: "/kubernetes/namespace/ai/volcano/jobtemplates",
            component: "./kubernetes/namespace/ai/volcano/jobtemplates",
          },
          {
            name: "JobTemplate",
            hideInMenu: true,
            path: "/kubernetes/namespace/ai/volcano/jobtemplates/create/text",
            component: "./kubernetes/namespace/ai/volcano/jobtemplates/text",
          },
        ],
      },
    ],
  },
  {
    name: "DevOps",
    icon: "NodeExpandOutlined",
    path: "/kubernetes/namespace/devops",
    access: "clusterNamespaceAccess",
    routes: [
      {
        name: "Tekton",
        path: "/kubernetes/namespace/devops/cicd/tekton",
        access: "clusterFeaturesTektonPipelineAccess",
        routes: [
          {
            name: "task",
            path: "/kubernetes/namespace/devops/cicd/tekton/tasks",
            component: "./kubernetes/namespace/devops/cicd/tekton/task",
            access: "clusterFeaturesTektonPipelineAccess",
          },
          {
            name: "task",
            path: "/kubernetes/namespace/devops/cicd/tekton/tasks/create/text",
            component: "./kubernetes/namespace/devops/cicd/tekton/task/text",
            access: "clusterFeaturesTektonPipelineAccess",
            hideInMenu: true,
          },
          {
            name: "pipeline",
            path: "/kubernetes/namespace/devops/cicd/tekton/pipelines/lego/:action",
            component:
              "./kubernetes/namespace/devops/cicd/tekton/pipeline/lego",
            access: "clusterFeaturesTektonPipelineAccess",
            hideInMenu: true,
            menuRender: false,
            hideFooter: true,
            pageContainer: false,
          },
          {
            name: "pipeline",
            path: "/kubernetes/namespace/devops/cicd/tekton/pipelines/lego/:action/:name",
            component:
              "./kubernetes/namespace/devops/cicd/tekton/pipeline/lego",
            access: "clusterFeaturesTektonPipelineAccess",
            hideInMenu: true,
            menuRender: false,
            hideFooter: true,
          },
          {
            name: "pipeline",
            path: "/kubernetes/namespace/devops/cicd/tekton/pipelines",
            component: "./kubernetes/namespace/devops/cicd/tekton/pipeline",
            access: "clusterFeaturesTektonPipelineAccess",
          },
          {
            name: "pipeline",
            path: "/kubernetes/namespace/devops/cicd/tekton/pipelines/create/text",
            component:
              "./kubernetes/namespace/devops/cicd/tekton/pipeline/text",
            access: "clusterFeaturesTektonPipelineAccess",
            hideInMenu: true,
          },

          {
            name: "taskRun",
            path: "/kubernetes/namespace/devops/cicd/tekton/taskruns",
            component: "./kubernetes/namespace/devops/cicd/tekton/task_run",
            access: "clusterFeaturesTektonPipelineAccess",
          },
          {
            name: "taskRun",
            path: "/kubernetes/namespace/devops/cicd/tekton/taskruns/create/text",
            component:
              "./kubernetes/namespace/devops/cicd/tekton/task_run/text",
            access: "clusterFeaturesTektonPipelineAccess",
            hideInMenu: true,
          },
          {
            name: "pipelineRun",
            path: "/kubernetes/namespace/devops/cicd/tekton/pipelineruns",
            component: "./kubernetes/namespace/devops/cicd/tekton/pipeline_run",
            access: "clusterFeaturesTektonPipelineAccess",
          },
          {
            name: "pipelineRun",
            path: "/kubernetes/namespace/devops/cicd/tekton/pipelineruns/create/text",
            component:
              "./kubernetes/namespace/devops/cicd/tekton/pipeline_run/text",
            access: "clusterFeaturesTektonPipelineAccess",
            hideInMenu: true,
          },
          {
            name: "pipelineRun",
            path: "/kubernetes/namespace/devops/cicd/tekton/pipelineruns/detail/:name",
            component:
              "./kubernetes/namespace/devops/cicd/tekton/pipeline_run/detail",
            access: "clusterFeaturesTektonPipelineAccess",
            hideInMenu: true,
          },
          {
            name: "pipelineRun",
            path: "/kubernetes/namespace/devops/cicd/tekton/pipelineruns/flow/:name",
            component:
              "./kubernetes/namespace/devops/cicd/tekton/pipeline_run/flow",
            access: "clusterFeaturesTektonPipelineAccess",
            hideInMenu: true,
            menuRender: false,
            hideFooter: true,
            pageContainer: false,
          },
          {
            name: "customRun",
            path: "/kubernetes/namespace/devops/cicd/tekton/customruns",
            component: "./kubernetes/namespace/devops/cicd/tekton/custom_run",
            access: "clusterFeaturesTektonPipelineAccess",
          },
          {
            name: "customRun",
            path: "/kubernetes/namespace/devops/cicd/tekton/customruns/create/text",
            component:
              "./kubernetes/namespace/devops/cicd/tekton/custom_run/text",
            access: "clusterFeaturesTektonPipelineAccess",
            hideInMenu: true,
          },
          {
            name: "eventListener",
            path: "/kubernetes/namespace/devops/cicd/tekton/eventlisteners",
            component:
              "./kubernetes/namespace/devops/cicd/tekton/event_listener",
            access: "clusterFeaturesTektonTriggerAccess",
          },
          {
            name: "eventListener",
            path: "/kubernetes/namespace/devops/cicd/tekton/eventlisteners/create/text",
            component:
              "./kubernetes/namespace/devops/cicd/tekton/event_listener/text",
            access: "clusterFeaturesTektonTriggerAccess",
            hideInMenu: true,
          },
          {
            name: "trigger",
            path: "/kubernetes/namespace/devops/cicd/tekton/triggers",
            component: "./kubernetes/namespace/devops/cicd/tekton/trigger",
            access: "clusterFeaturesTektonTriggerAccess",
          },
          {
            name: "trigger",
            path: "/kubernetes/namespace/devops/cicd/tekton/triggers/create/text",
            component: "./kubernetes/namespace/devops/cicd/tekton/trigger/text",
            access: "clusterFeaturesTektonTriggerAccess",
            hideInMenu: true,
          },
          {
            name: "triggerBinding",
            path: "/kubernetes/namespace/devops/cicd/tekton/triggerbindings",
            component:
              "./kubernetes/namespace/devops/cicd/tekton/trigger_binding",
            access: "clusterFeaturesTektonTriggerAccess",
          },
          {
            name: "triggerBinding",
            path: "/kubernetes/namespace/devops/cicd/tekton/triggerbindings/create/text",
            component:
              "./kubernetes/namespace/devops/cicd/tekton/trigger_binding/text",
            access: "clusterFeaturesTektonTriggerAccess",
            hideInMenu: true,
          },
          {
            name: "triggerTemplate",
            path: "/kubernetes/namespace/devops/cicd/tekton/triggertemplates",
            component:
              "./kubernetes/namespace/devops/cicd/tekton/trigger_template",
            access: "clusterFeaturesTektonTriggerAccess",
          },
          {
            name: "triggerTemplate",
            path: "/kubernetes/namespace/devops/cicd/tekton/triggertemplates/create/text",
            component:
              "./kubernetes/namespace/devops/cicd/tekton/trigger_template/text",
            access: "clusterFeaturesTektonTriggerAccess",
            hideInMenu: true,
          },
          {
            name: "interceptor",
            path: "/kubernetes/namespace/devops/cicd/tekton/interceptors",
            component: "./kubernetes/namespace/devops/cicd/tekton/interceptor",
            access: "clusterFeaturesTektonTriggerAccess",
          },
          {
            name: "interceptor",
            path: "/kubernetes/namespace/devops/cicd/tekton/interceptors/create/text",
            component:
              "./kubernetes/namespace/devops/cicd/tekton/interceptor/text",
            access: "clusterFeaturesTektonTriggerAccess",
            hideInMenu: true,
          },
        ],
      },
    ],
  },
  {
    name: "KubeVirt",
    icon: "CloudServerOutlined",
    path: "/kubernetes/namespace/kubevirt",
    access: "clusterNamespaceAccess",
    routes: [
      {
        name: "KubeVirt",
        path: "/kubernetes/namespace/kubevirt/kubevirts",
        component: "./kubernetes/namespace/kubevirt/kubevirts",
        access: "clusterFeaturesKubeVirtAccess",
      },
      {
        name: "KubeVirt",
        hideInMenu: true,
        path: "/kubernetes/namespace/kubevirt/kubevirts/:name",
        component: "./kubernetes/namespace/kubevirt/kubevirts/detail",
        access: "clusterFeaturesKubeVirtAccess",
      },
      {
        name: "KubeVirt",
        hideInMenu: true,
        path: "/kubernetes/namespace/kubevirt/kubevirts/create/text",
        component: "./kubernetes/namespace/kubevirt/kubevirts/text",
        access: "clusterFeaturesKubeVirtAccess",
      },
      {
        name: "KubeVirt",
        hideInMenu: true,
        path: "/kubernetes/namespace/kubevirt/kubevirts/:name/update",
        component: "./kubernetes/namespace/kubevirt/kubevirts/text",
        access: "clusterFeaturesKubeVirtAccess",
      },
      {
        name: "VirtualMachine",
        path: "/kubernetes/namespace/kubevirt/virtualmachines",
        component: "./kubernetes/namespace/kubevirt/virtualmachines",
        access: "clusterFeaturesKubeVirtAccess",
      },
      {
        name: "VirtualMachine",
        hideInMenu: true,
        path: "/kubernetes/namespace/kubevirt/virtualmachines/:name",
        component: "./kubernetes/namespace/kubevirt/virtualmachines/detail",
        access: "clusterFeaturesKubeVirtAccess",
      },
      {
        name: "VirtualMachine",
        hideInMenu: true,
        path: "/kubernetes/namespace/kubevirt/virtualmachines/create/text",
        component: "./kubernetes/namespace/kubevirt/virtualmachines/text",
        access: "clusterFeaturesKubeVirtAccess",
      },
      {
        name: "VirtualMachine",
        hideInMenu: true,
        path: "/kubernetes/namespace/kubevirt/virtualmachines/:name/update",
        component: "./kubernetes/namespace/kubevirt/virtualmachines/text",
        access: "clusterFeaturesKubeVirtAccess",
      },
      {
        name: "VirtualMachineInstance",
        path: "/kubernetes/namespace/kubevirt/virtualmachineinstances",
        component: "./kubernetes/namespace/kubevirt/virtualmachineinstances",
        access: "clusterFeaturesKubeVirtAccess",
      },
      {
        name: "VirtualMachineInstance",
        hideInMenu: true,
        path: "/kubernetes/namespace/kubevirt/virtualmachineinstances/:name",
        component:
          "./kubernetes/namespace/kubevirt/virtualmachineinstances/detail",
        access: "clusterFeaturesKubeVirtAccess",
      },
      {
        name: "VirtualMachineInstance",
        hideInMenu: true,
        path: "/kubernetes/namespace/kubevirt/virtualmachineinstances/create/text",
        component:
          "./kubernetes/namespace/kubevirt/virtualmachineinstances/text",
        access: "clusterFeaturesKubeVirtAccess",
      },
      {
        name: "VirtualMachineInstance",
        hideInMenu: true,
        path: "/kubernetes/namespace/kubevirt/virtualmachineinstances/:name/update",
        component:
          "./kubernetes/namespace/kubevirt/virtualmachineinstances/text",
        access: "clusterFeaturesKubeVirtAccess",
      },
      {
        name: "VirtualMachineInstanceMigration",
        path: "/kubernetes/namespace/kubevirt/virtualmachineinstancemigrations",
        component:
          "./kubernetes/namespace/kubevirt/virtualmachineinstancemigrations",
        access: "clusterFeaturesKubeVirtAccess",
      },
      {
        name: "VirtualMachineInstanceMigration",
        hideInMenu: true,
        path: "/kubernetes/namespace/kubevirt/virtualmachineinstancemigrations/:name",
        component:
          "./kubernetes/namespace/kubevirt/virtualmachineinstancemigrations/detail",
        access: "clusterFeaturesKubeVirtAccess",
      },
      {
        name: "VirtualMachineInstanceMigration",
        hideInMenu: true,
        path: "/kubernetes/namespace/kubevirt/virtualmachineinstancemigrations/create/text",
        component:
          "./kubernetes/namespace/kubevirt/virtualmachineinstancemigrations/text",
        access: "clusterFeaturesKubeVirtAccess",
      },
      {
        name: "VirtualMachineInstanceMigration",
        hideInMenu: true,
        path: "/kubernetes/namespace/kubevirt/virtualmachineinstancemigrations/:name/update",
        component:
          "./kubernetes/namespace/kubevirt/virtualmachineinstancemigrations/text",
        access: "clusterFeaturesKubeVirtAccess",
      },
      {
        name: "VirtualMachinePool",
        path: "/kubernetes/namespace/kubevirt/virtualmachinepools",
        component: "./kubernetes/namespace/kubevirt/virtualmachinepools",
        access: "clusterFeaturesKubeVirtVirtualMachinePoolAccess",
      },
      {
        name: "VirtualMachinePool",
        hideInMenu: true,
        path: "/kubernetes/namespace/kubevirt/virtualmachinepools/:name",
        component: "./kubernetes/namespace/kubevirt/virtualmachinepools/detail",
        access: "clusterFeaturesKubeVirtVirtualMachinePoolAccess",
      },
      {
        name: "VirtualMachinePool",
        hideInMenu: true,
        path: "/kubernetes/namespace/kubevirt/virtualmachinepools/create/text",
        component: "./kubernetes/namespace/kubevirt/virtualmachinepools/text",
        access: "clusterFeaturesKubeVirtVirtualMachinePoolAccess",
      },
      {
        name: "VirtualMachinePool",
        hideInMenu: true,
        path: "/kubernetes/namespace/kubevirt/virtualmachinepools/:name/update",
        component: "./kubernetes/namespace/kubevirt/virtualmachinepools/text",
        access: "clusterFeaturesKubeVirtVirtualMachinePoolAccess",
      },
      {
        name: "Instancetype",
        path: "/kubernetes/namespace/kubevirt/instancetypes",
        component: "./kubernetes/namespace/kubevirt/instancetypes",
        access: "clusterFeaturesKubeVirtVirtualMachineClusterPreferenceAccess",
      },
      {
        name: "Instancetype",
        hideInMenu: true,
        path: "/kubernetes/namespace/kubevirt/instancetypes/:name",
        component: "./kubernetes/namespace/kubevirt/instancetypes/detail",
        access: "clusterFeaturesKubeVirtVirtualMachineClusterPreferenceAccess",
      },
      {
        name: "Instancetype",
        hideInMenu: true,
        path: "/kubernetes/namespace/kubevirt/instancetypes/create/text",
        component: "./kubernetes/namespace/kubevirt/instancetypes/text",
        access: "clusterFeaturesKubeVirtVirtualMachineClusterPreferenceAccess",
      },
      {
        name: "Instancetype",
        hideInMenu: true,
        path: "/kubernetes/namespace/kubevirt/instancetypes/:name/update",
        component: "./kubernetes/namespace/kubevirt/instancetypes/text",
        access: "clusterFeaturesKubeVirtVirtualMachineClusterPreferenceAccess",
      },
      {
        name: "Preference",
        path: "/kubernetes/namespace/kubevirt/preferences",
        component: "./kubernetes/namespace/kubevirt/preferences",
        access: "clusterFeaturesKubeVirtVirtualMachineClusterPreferenceAccess",
      },
      {
        name: "Preference",
        hideInMenu: true,
        path: "/kubernetes/namespace/kubevirt/preferences/:name",
        component: "./kubernetes/namespace/kubevirt/preferences/detail",
        access: "clusterFeaturesKubeVirtVirtualMachineClusterPreferenceAccess",
      },
      {
        name: "Preference",
        hideInMenu: true,
        path: "/kubernetes/namespace/kubevirt/preferences/create/text",
        component: "./kubernetes/namespace/kubevirt/preferences/text",
        access: "clusterFeaturesKubeVirtVirtualMachineClusterPreferenceAccess",
      },
      {
        name: "Preference",
        hideInMenu: true,
        path: "/kubernetes/namespace/kubevirt/preferences/:name/update",
        component: "./kubernetes/namespace/kubevirt/preferences/text",
        access: "clusterFeaturesKubeVirtVirtualMachineClusterPreferenceAccess",
      },
      {
        name: "DataVolume",
        path: "/kubernetes/namespace/kubevirt/datavolumes",
        component: "./kubernetes/namespace/kubevirt/datavolumes",
        access: "clusterFeaturesKubeVirtDataVolumeAccess",
      },
      {
        name: "DataVolume",
        hideInMenu: true,
        path: "/kubernetes/namespace/kubevirt/datavolumes/:name",
        component: "./kubernetes/namespace/kubevirt/datavolumes/detail",
        access: "clusterFeaturesKubeVirtDataVolumeAccess",
      },
      {
        name: "DataVolume",
        hideInMenu: true,
        path: "/kubernetes/namespace/kubevirt/datavolumes/create/text",
        component: "./kubernetes/namespace/kubevirt/datavolumes/text",
        access: "clusterFeaturesKubeVirtDataVolumeAccess",
      },
      {
        name: "DataVolume",
        hideInMenu: true,
        path: "/kubernetes/namespace/kubevirt/datavolumes/:name/update",
        component: "./kubernetes/namespace/kubevirt/datavolumes/text",
        access: "clusterFeaturesKubeVirtDataVolumeAccess",
      },
      {
        name: "VirtualMachineSnapshot",
        path: "/kubernetes/namespace/kubevirt/virtualmachinesnapshots",
        component: "./kubernetes/namespace/kubevirt/virtualmachinesnapshots",
        access: "clusterFeaturesVirtualMachineSnapshotAccess",
      },
      {
        name: "VirtualMachineSnapshot",
        hideInMenu: true,
        path: "/kubernetes/namespace/kubevirt/virtualmachinesnapshots/:name",
        component:
          "./kubernetes/namespace/kubevirt/virtualmachinesnapshots/detail",
        access: "clusterFeaturesVirtualMachineSnapshotAccess",
      },
      {
        name: "VirtualMachineSnapshot",
        hideInMenu: true,
        path: "/kubernetes/namespace/kubevirt/virtualmachinesnapshots/create/text",
        component:
          "./kubernetes/namespace/kubevirt/virtualmachinesnapshots/text",
        access: "clusterFeaturesVirtualMachineSnapshotAccess",
      },
      {
        name: "VirtualMachineSnapshot",
        hideInMenu: true,
        path: "/kubernetes/namespace/kubevirt/virtualmachinesnapshots/:name/update",
        component:
          "./kubernetes/namespace/kubevirt/virtualmachinesnapshots/text",
        access: "clusterFeaturesVirtualMachineSnapshotAccess",
      },
      {
        name: "VirtualMachineRestore",
        path: "/kubernetes/namespace/kubevirt/virtualmachinerestores",
        component: "./kubernetes/namespace/kubevirt/virtualmachinerestores",
        access: "clusterFeaturesVirtualMachineRestoreAccess",
      },
      {
        name: "VirtualMachineRestore",
        hideInMenu: true,
        path: "/kubernetes/namespace/kubevirt/virtualmachinerestores/:name",
        component:
          "./kubernetes/namespace/kubevirt/virtualmachinerestores/detail",
        access: "clusterFeaturesVirtualMachineRestoreAccess",
      },
      {
        name: "VirtualMachineRestore",
        hideInMenu: true,
        path: "/kubernetes/namespace/kubevirt/virtualmachinerestores/create/text",
        component:
          "./kubernetes/namespace/kubevirt/virtualmachinerestores/text",
        access: "clusterFeaturesVirtualMachineRestoreAccess",
      },
      {
        name: "VirtualMachineRestore",
        hideInMenu: true,
        path: "/kubernetes/namespace/kubevirt/virtualmachinerestores/:name/update",
        component:
          "./kubernetes/namespace/kubevirt/virtualmachinerestores/text",
        access: "clusterFeaturesVirtualMachineRestoreAccess",
      },
      {
        name: "VirtualMachineClone",
        path: "/kubernetes/namespace/kubevirt/virtualmachineclones",
        component: "./kubernetes/namespace/kubevirt/virtualmachineclones",
        access: "clusterFeaturesKubeVirtVirtualMachineCloneAccess",
      },
      {
        name: "VirtualMachineClone",
        hideInMenu: true,
        path: "/kubernetes/namespace/kubevirt/virtualmachineclones/:name",
        component:
          "./kubernetes/namespace/kubevirt/virtualmachineclones/detail",
        access: "clusterFeaturesKubeVirtVirtualMachineCloneAccess",
      },
      {
        name: "VirtualMachineClone",
        hideInMenu: true,
        path: "/kubernetes/namespace/kubevirt/virtualmachineclones/create/text",
        component: "./kubernetes/namespace/kubevirt/virtualmachineclones/text",
        access: "clusterFeaturesKubeVirtVirtualMachineCloneAccess",
      },
      {
        name: "VirtualMachineClone",
        hideInMenu: true,
        path: "/kubernetes/namespace/kubevirt/virtualmachineclones/:name/update",
        component: "./kubernetes/namespace/kubevirt/virtualmachineclones/text",
        access: "clusterFeaturesKubeVirtVirtualMachineCloneAccess",
      },
      {
        name: "VirtualMachineExport",
        path: "/kubernetes/namespace/kubevirt/virtualmachineexports",
        component: "./kubernetes/namespace/kubevirt/virtualmachineexports",
        access: "clusterFeaturesKubeVirtVirtualMachineExportAccess",
      },
      {
        name: "VirtualMachineExport",
        hideInMenu: true,
        path: "/kubernetes/namespace/kubevirt/virtualmachineexports/:name",
        component:
          "./kubernetes/namespace/kubevirt/virtualmachineexports/detail",
        access: "clusterFeaturesKubeVirtVirtualMachineExportAccess",
      },
      {
        name: "VirtualMachineExport",
        hideInMenu: true,
        path: "/kubernetes/namespace/kubevirt/virtualmachineexports/create/text",
        component: "./kubernetes/namespace/kubevirt/virtualmachineexports/text",
        access: "clusterFeaturesKubeVirtVirtualMachineExportAccess",
      },
      {
        name: "VirtualMachineExport",
        hideInMenu: true,
        path: "/kubernetes/namespace/kubevirt/virtualmachineexports/:name/update",
        component: "./kubernetes/namespace/kubevirt/virtualmachineexports/text",
        access: "clusterFeaturesKubeVirtVirtualMachineExportAccess",
      },
    ],
  },
  {
    icon: "RobotOutlined",
    name: "ai",
    path: "/kubernetes/namespace/ai",
    access: "clusterNamespaceAccess",
    routes: [
      {
        name: "Volcano",
        path: "/kubernetes/namespace/ai/volcano",
        access: "clusterFeaturesVolcanoAccess",
        routes: [
          {
            name: "Job",
            path: "/kubernetes/namespace/ai/volcano/jobs",
            component: "./kubernetes/namespace/ai/volcano/jobs",
          },
          {
            name: "Job",
            hideInMenu: true,
            path: "/kubernetes/namespace/ai/volcano/jobs/create/text",
            component: "./kubernetes/namespace/ai/volcano/jobs/text",
          },
          {
            name: "PodGroup",
            path: "/kubernetes/namespace/ai/volcano/podgroups",
            component: "./kubernetes/namespace/ai/volcano/podgroups",
          },
          {
            name: "PodGroup",
            hideInMenu: true,
            path: "/kubernetes/namespace/ai/volcano/podgroups/create/text",
            component: "./kubernetes/namespace/ai/volcano/podgroups/text",
          },
          {
            name: "Command",
            path: "/kubernetes/namespace/ai/volcano/commands",
            component: "./kubernetes/namespace/ai/volcano/commands",
          },
          {
            name: "Command",
            hideInMenu: true,
            path: "/kubernetes/namespace/ai/volcano/commands/create/text",
            component: "./kubernetes/namespace/ai/volcano/commands/text",
          },
          {
            name: "JobFlow",
            path: "/kubernetes/namespace/ai/volcano/jobflows",
            component: "./kubernetes/namespace/ai/volcano/jobflows",
          },
          {
            name: "JobFlow",
            hideInMenu: true,
            path: "/kubernetes/namespace/ai/volcano/jobflows/create/text",
            component: "./kubernetes/namespace/ai/volcano/jobflows/text",
          },
          {
            name: "JobTemplate",
            path: "/kubernetes/namespace/ai/volcano/jobtemplates",
            component: "./kubernetes/namespace/ai/volcano/jobtemplates",
          },
          {
            name: "JobTemplate",
            hideInMenu: true,
            path: "/kubernetes/namespace/ai/volcano/jobtemplates/create/text",
            component: "./kubernetes/namespace/ai/volcano/jobtemplates/text",
          },
        ],
      },
    ],
  },
  {
    name: "DevOps",
    icon: "NodeExpandOutlined",
    path: "/kubernetes/namespace/devops",
    access: "clusterNamespaceAccess",
    routes: [
      {
        name: "Tekton",
        path: "/kubernetes/namespace/devops/cicd/tekton",
        access: "clusterFeaturesTektonPipelineAccess",
        routes: [
          {
            name: "task",
            path: "/kubernetes/namespace/devops/cicd/tekton/tasks",
            component: "./kubernetes/namespace/devops/cicd/tekton/task",
            access: "clusterFeaturesTektonPipelineAccess",
          },
          {
            name: "task",
            path: "/kubernetes/namespace/devops/cicd/tekton/tasks/create/text",
            component: "./kubernetes/namespace/devops/cicd/tekton/task/text",
            access: "clusterFeaturesTektonPipelineAccess",
            hideInMenu: true,
          },
          {
            name: "pipeline",
            path: "/kubernetes/namespace/devops/cicd/tekton/pipelines/lego/:action",
            component:
              "./kubernetes/namespace/devops/cicd/tekton/pipeline/lego",
            access: "clusterFeaturesTektonPipelineAccess",
            hideInMenu: true,
            menuRender: false,
            hideFooter: true,
            pageContainer: false,
          },
          {
            name: "pipeline",
            path: "/kubernetes/namespace/devops/cicd/tekton/pipelines/lego/:action/:name",
            component:
              "./kubernetes/namespace/devops/cicd/tekton/pipeline/lego",
            access: "clusterFeaturesTektonPipelineAccess",
            hideInMenu: true,
            menuRender: false,
            hideFooter: true,
          },
          {
            name: "pipeline",
            path: "/kubernetes/namespace/devops/cicd/tekton/pipelines",
            component: "./kubernetes/namespace/devops/cicd/tekton/pipeline",
            access: "clusterFeaturesTektonPipelineAccess",
          },
          {
            name: "pipeline",
            path: "/kubernetes/namespace/devops/cicd/tekton/pipelines/create/text",
            component:
              "./kubernetes/namespace/devops/cicd/tekton/pipeline/text",
            access: "clusterFeaturesTektonPipelineAccess",
            hideInMenu: true,
          },

          {
            name: "taskRun",
            path: "/kubernetes/namespace/devops/cicd/tekton/taskruns",
            component: "./kubernetes/namespace/devops/cicd/tekton/task_run",
            access: "clusterFeaturesTektonPipelineAccess",
          },
          {
            name: "taskRun",
            path: "/kubernetes/namespace/devops/cicd/tekton/taskruns/create/text",
            component:
              "./kubernetes/namespace/devops/cicd/tekton/task_run/text",
            access: "clusterFeaturesTektonPipelineAccess",
            hideInMenu: true,
          },
          {
            name: "pipelineRun",
            path: "/kubernetes/namespace/devops/cicd/tekton/pipelineruns",
            component: "./kubernetes/namespace/devops/cicd/tekton/pipeline_run",
            access: "clusterFeaturesTektonPipelineAccess",
          },
          {
            name: "pipelineRun",
            path: "/kubernetes/namespace/devops/cicd/tekton/pipelineruns/create/text",
            component:
              "./kubernetes/namespace/devops/cicd/tekton/pipeline_run/text",
            access: "clusterFeaturesTektonPipelineAccess",
            hideInMenu: true,
          },
          {
            name: "pipelineRun",
            path: "/kubernetes/namespace/devops/cicd/tekton/pipelineruns/detail/:name",
            component:
              "./kubernetes/namespace/devops/cicd/tekton/pipeline_run/detail",
            access: "clusterFeaturesTektonPipelineAccess",
            hideInMenu: true,
          },
          {
            name: "pipelineRun",
            path: "/kubernetes/namespace/devops/cicd/tekton/pipelineruns/flow/:name",
            component:
              "./kubernetes/namespace/devops/cicd/tekton/pipeline_run/flow",
            access: "clusterFeaturesTektonPipelineAccess",
            hideInMenu: true,
            menuRender: false,
            hideFooter: true,
            pageContainer: false,
          },
          {
            name: "customRun",
            path: "/kubernetes/namespace/devops/cicd/tekton/customruns",
            component: "./kubernetes/namespace/devops/cicd/tekton/custom_run",
            access: "clusterFeaturesTektonPipelineAccess",
          },
          {
            name: "customRun",
            path: "/kubernetes/namespace/devops/cicd/tekton/customruns/create/text",
            component:
              "./kubernetes/namespace/devops/cicd/tekton/custom_run/text",
            access: "clusterFeaturesTektonPipelineAccess",
            hideInMenu: true,
          },
          {
            name: "eventListener",
            path: "/kubernetes/namespace/devops/cicd/tekton/eventlisteners",
            component:
              "./kubernetes/namespace/devops/cicd/tekton/event_listener",
            access: "clusterFeaturesTektonTriggerAccess",
          },
          {
            name: "eventListener",
            path: "/kubernetes/namespace/devops/cicd/tekton/eventlisteners/create/text",
            component:
              "./kubernetes/namespace/devops/cicd/tekton/event_listener/text",
            access: "clusterFeaturesTektonTriggerAccess",
            hideInMenu: true,
          },
          {
            name: "trigger",
            path: "/kubernetes/namespace/devops/cicd/tekton/triggers",
            component: "./kubernetes/namespace/devops/cicd/tekton/trigger",
            access: "clusterFeaturesTektonTriggerAccess",
          },
          {
            name: "trigger",
            path: "/kubernetes/namespace/devops/cicd/tekton/triggers/create/text",
            component: "./kubernetes/namespace/devops/cicd/tekton/trigger/text",
            access: "clusterFeaturesTektonTriggerAccess",
            hideInMenu: true,
          },
          {
            name: "triggerBinding",
            path: "/kubernetes/namespace/devops/cicd/tekton/triggerbindings",
            component:
              "./kubernetes/namespace/devops/cicd/tekton/trigger_binding",
            access: "clusterFeaturesTektonTriggerAccess",
          },
          {
            name: "triggerBinding",
            path: "/kubernetes/namespace/devops/cicd/tekton/triggerbindings/create/text",
            component:
              "./kubernetes/namespace/devops/cicd/tekton/trigger_binding/text",
            access: "clusterFeaturesTektonTriggerAccess",
            hideInMenu: true,
          },
          {
            name: "triggerTemplate",
            path: "/kubernetes/namespace/devops/cicd/tekton/triggertemplates",
            component:
              "./kubernetes/namespace/devops/cicd/tekton/trigger_template",
            access: "clusterFeaturesTektonTriggerAccess",
          },
          {
            name: "triggerTemplate",
            path: "/kubernetes/namespace/devops/cicd/tekton/triggertemplates/create/text",
            component:
              "./kubernetes/namespace/devops/cicd/tekton/trigger_template/text",
            access: "clusterFeaturesTektonTriggerAccess",
            hideInMenu: true,
          },
          {
            name: "interceptor",
            path: "/kubernetes/namespace/devops/cicd/tekton/interceptors",
            component: "./kubernetes/namespace/devops/cicd/tekton/interceptor",
            access: "clusterFeaturesTektonTriggerAccess",
          },
          {
            name: "interceptor",
            path: "/kubernetes/namespace/devops/cicd/tekton/interceptors/create/text",
            component:
              "./kubernetes/namespace/devops/cicd/tekton/interceptor/text",
            access: "clusterFeaturesTektonTriggerAccess",
            hideInMenu: true,
          },
        ],
      },
    ],
  },
  {
    name: "config",
    icon: "ToolOutlined",
    path: "/kubernetes/namespace/config",
    access: "clusterNamespaceAccess",
    routes: [
      {
        name: "configmap",
        path: "/kubernetes/namespace/config/configmaps",
        component: "./kubernetes/namespace/config/configmap",
        access: "clusterNamespaceAccess",
      },
      {
        name: "configmap",
        hideInMenu: true,
        path: "/kubernetes/namespace/config/configmaps/:name",
        component: "./kubernetes/namespace/config/configmap/detail",
        access: "clusterNamespaceAccess",
      },
      {
        name: "configmap",
        hideInMenu: true,
        path: "/kubernetes/namespace/config/configmaps/create/text",
        component: "./kubernetes/namespace/config/configmap/text",
        access: "clusterNamespaceAccess",
      },
      {
        name: "configmap",
        hideInMenu: true,
        path: "/kubernetes/namespace/config/configmaps/:name/:action",
        component: "./kubernetes/namespace/config/configmap/form",
        access: "clusterNamespaceAccess",
      },
      {
        name: "secret",
        path: "/kubernetes/namespace/config/secrets",
        component: "./kubernetes/namespace/config/secret",
        access: "clusterNamespaceAccess",
      },
      {
        name: "secret",
        hideInMenu: true,
        path: "/kubernetes/namespace/config/secrets/:name",
        component: "./kubernetes/namespace/config/secret/detail",
        access: "clusterNamespaceAccess",
      },
      {
        name: "secret",
        hideInMenu: true,
        path: "/kubernetes/namespace/config/secrets/create/text",
        component: "./kubernetes/namespace/config/secret/text",
        access: "clusterNamespaceAccess",
      },
      {
        name: "secret",
        hideInMenu: true,
        path: "/kubernetes/namespace/config/secrets/:name/:action",
        component: "./kubernetes/namespace/config/secret/form",
        access: "clusterNamespaceAccess",
      },
      {
        name: "resourcequota",
        path: "/kubernetes/namespace/config/resourcequotas",
        component: "./kubernetes/namespace/config/resourcequota",
        access: "clusterNamespaceAccess",
      },
      {
        name: "resourcequota",
        hideInMenu: true,
        path: "/kubernetes/namespace/config/resourcequotas/:name/:action",
        component: "./kubernetes/namespace/config/resourcequota/text",
        access: "clusterNamespaceAccess",
      },
      {
        name: "limitrange",
        path: "/kubernetes/namespace/config/limitranges",
        component: "./kubernetes/namespace/config/limitrange",
        access: "clusterNamespaceAccess",
      },
      {
        name: "limitrange",
        hideInMenu: true,
        path: "/kubernetes/namespace/config/limitranges/:name/:action",
        component: "./kubernetes/namespace/config/limitrange/text",
        access: "clusterNamespaceAccess",
      },
    ],
  },

  {
    name: "network",
    icon: "GlobalOutlined",
    path: "/kubernetes/namespace/networks",
    access: "clusterNamespaceAccess",
    routes: [
      {
        name: "gateway",
        path: "/kubernetes/namespace/networks/gateway",
        access: "tenantClusterFeaturesGatewayAccess",
        routes: [
          {
            name: "Gateway",
            path: "/kubernetes/namespace/networks/gateway/gateways",
            component: "./kubernetes/namespace/networks/gateway/gateways",
            access: "clusterNamespaceAccess",
          },
          {
            name: "Gateway",
            hideInMenu: true,
            path: "/kubernetes/namespace/networks/gateway/gateways/create/text",
            component: "./kubernetes/namespace/networks/gateway/gateways/text",
            access: "clusterNamespaceAccess",
          },
          {
            name: "Gateway",
            hideInMenu: true,
            path: "/kubernetes/namespace/networks/gateway/gateways/:name/:action",
            component: "./kubernetes/namespace/networks/gateway/gateways/text",
            access: "clusterNamespaceAccess",
          },
          {
            name: "HTTPRoute",
            path: "/kubernetes/namespace/networks/gateway/httproutes",
            component: "./kubernetes/namespace/networks/gateway/httproutes",
            access: "clusterNamespaceAccess",
          },
          {
            name: "HTTPRoute",
            hideInMenu: true,
            path: "/kubernetes/namespace/networks/gateway/httproutes/create/text",
            component:
              "./kubernetes/namespace/networks/gateway/httproutes/text",
            access: "clusterNamespaceAccess",
          },
          {
            name: "HTTPRoute",
            hideInMenu: true,
            path: "/kubernetes/namespace/networks/gateway/httproutes/:name/:action",
            component:
              "./kubernetes/namespace/networks/gateway/httproutes/text",
            access: "clusterNamespaceAccess",
          },
          {
            name: "GRPCRoute",
            path: "/kubernetes/namespace/networks/gateway/grpcroutes",
            component: "./kubernetes/namespace/networks/gateway/grpcroutes",
            access: "clusterNamespaceAccess",
          },
          {
            name: "GRPCRoute",
            hideInMenu: true,
            path: "/kubernetes/namespace/networks/gateway/grpcroutes/create/text",
            component:
              "./kubernetes/namespace/networks/gateway/grpcroutes/text",
            access: "clusterNamespaceAccess",
          },
          {
            name: "GRPCRoute",
            hideInMenu: true,
            path: "/kubernetes/namespace/networks/gateway/grpcroutes/:name/:action",
            component:
              "./kubernetes/namespace/networks/gateway/grpcroutes/text",
            access: "clusterNamespaceAccess",
          },
          {
            name: "TLSRoute",
            path: "/kubernetes/namespace/networks/gateway/tlsroutes",
            component: "./kubernetes/namespace/networks/gateway/tlsroutes",
            access: "clusterNamespaceAccess",
          },
          {
            name: "TLSRoute",
            hideInMenu: true,
            path: "/kubernetes/namespace/networks/gateway/tlsroutes/create/text",
            component: "./kubernetes/namespace/networks/gateway/tlsroutes/text",
            access: "clusterNamespaceAccess",
          },
          {
            name: "TLSRoute",
            hideInMenu: true,
            path: "/kubernetes/namespace/networks/gateway/tlsroutes/:name/:action",
            component: "./kubernetes/namespace/networks/gateway/tlsroutes/text",
            access: "clusterNamespaceAccess",
          },
          {
            name: "TCPRoute",
            path: "/kubernetes/namespace/networks/gateway/tcproutes",
            component: "./kubernetes/namespace/networks/gateway/tcproutes",
            access: "clusterNamespaceAccess",
          },
          {
            name: "TCPRoute",
            hideInMenu: true,
            path: "/kubernetes/namespace/networks/gateway/tcproutes/create/text",
            component: "./kubernetes/namespace/networks/gateway/tcproutes/text",
            access: "clusterNamespaceAccess",
          },
          {
            name: "TCPRoute",
            hideInMenu: true,
            path: "/kubernetes/namespace/networks/gateway/tcproutes/:name/:action",
            component: "./kubernetes/namespace/networks/gateway/tcproutes/text",
            access: "clusterNamespaceAccess",
          },
          {
            name: "UDPRoute",
            path: "/kubernetes/namespace/networks/gateway/udproutes",
            component: "./kubernetes/namespace/networks/gateway/udproutes",
            access: "clusterNamespaceAccess",
          },
          {
            name: "UDPRoute",
            hideInMenu: true,
            path: "/kubernetes/namespace/networks/gateway/udproutes/create/text",
            component: "./kubernetes/namespace/networks/gateway/udproutes/text",
            access: "clusterNamespaceAccess",
          },
          {
            name: "UDPRoute",
            hideInMenu: true,
            path: "/kubernetes/namespace/networks/gateway/udproutes/:name/:action",
            component: "./kubernetes/namespace/networks/gateway/udproutes/text",
            access: "clusterNamespaceAccess",
          },
          {
            name: "ReferenceGrant",
            path: "/kubernetes/namespace/networks/gateway/referencegrants",
            component:
              "./kubernetes/namespace/networks/gateway/referencegrants",
            access: "clusterNamespaceAccess",
          },
          {
            name: "ReferenceGrant",
            hideInMenu: true,
            path: "/kubernetes/namespace/networks/gateway/referencegrants/create/text",
            component:
              "./kubernetes/namespace/networks/gateway/referencegrants/text",
            access: "clusterNamespaceAccess",
          },
          {
            name: "ReferenceGrant",
            hideInMenu: true,
            path: "/kubernetes/namespace/networks/gateway/referencegrants/:name/:action",
            component:
              "./kubernetes/namespace/networks/gateway/referencegrants/text",
            access: "clusterNamespaceAccess",
          },
          {
            name: "BackendTLSPolicy",
            path: "/kubernetes/namespace/networks/gateway/backendtlspolicies",
            component:
              "./kubernetes/namespace/networks/gateway/backendtlspolicies",
            access: "clusterNamespaceAccess",
          },
          {
            name: "BackendTLSPolicy",
            hideInMenu: true,
            path: "/kubernetes/namespace/networks/gateway/backendtlspolicies/create/text",
            component:
              "./kubernetes/namespace/networks/gateway/backendtlspolicies/text",
            access: "clusterNamespaceAccess",
          },
          {
            name: "BackendTLSPolicy",
            hideInMenu: true,
            path: "/kubernetes/namespace/networks/gateway/backendtlspolicies/:name/:action",
            component:
              "./kubernetes/namespace/networks/gateway/backendtlspolicies/text",
            access: "clusterNamespaceAccess",
          },
          {
            name: "ListenerSet",
            path: "/kubernetes/namespace/networks/gateway/listenersets",
            component: "./kubernetes/namespace/networks/gateway/listenersets",
            access: "clusterNamespaceAccess",
          },
          {
            name: "ListenerSet",
            hideInMenu: true,
            path: "/kubernetes/namespace/networks/gateway/listenersets/create/text",
            component:
              "./kubernetes/namespace/networks/gateway/listenersets/text",
            access: "clusterNamespaceAccess",
          },
          {
            name: "ListenerSet",
            hideInMenu: true,
            path: "/kubernetes/namespace/networks/gateway/listenersets/:name/:action",
            component:
              "./kubernetes/namespace/networks/gateway/listenersets/text",
            access: "clusterNamespaceAccess",
          },
          {
            name: "XBackendTrafficPolicy",
            path: "/kubernetes/namespace/networks/gateway/xbackendtrafficpolicies",
            component:
              "./kubernetes/namespace/networks/gateway/xbackendtrafficpolicies",
            access: "clusterNamespaceAccess",
          },
          {
            name: "XBackendTrafficPolicy",
            hideInMenu: true,
            path: "/kubernetes/namespace/networks/gateway/xbackendtrafficpolicies/create/text",
            component:
              "./kubernetes/namespace/networks/gateway/xbackendtrafficpolicies/text",
            access: "clusterNamespaceAccess",
          },
          {
            name: "XBackendTrafficPolicy",
            hideInMenu: true,
            path: "/kubernetes/namespace/networks/gateway/xbackendtrafficpolicies/:name/:action",
            component:
              "./kubernetes/namespace/networks/gateway/xbackendtrafficpolicies/text",
            access: "clusterNamespaceAccess",
          },
        ],
      },
      {
        name: "service",
        path: "/kubernetes/namespace/networks/services",
        component: "./kubernetes/namespace/networks/service",
        access: "clusterNamespaceAccess",
      },
      {
        name: "service",
        hideInMenu: true,
        path: "/kubernetes/namespace/networks/services/create/text",
        component: "./kubernetes/namespace/networks/service/text",
        access: "clusterNamespaceAccess",
      },
      {
        name: "service",
        hideInMenu: true,
        path: "/kubernetes/namespace/networks/services/:name/:action/text",
        component: "./kubernetes/namespace/networks/service/text",
        access: "clusterNamespaceAccess",
      },
      {
        name: "service",
        hideInMenu: true,
        path: "/kubernetes/namespace/networks/services/:name/:action",
        component: "./kubernetes/namespace/networks/service/form",
        access: "clusterNamespaceAccess",
      },
      {
        name: "service",
        hideInMenu: true,
        path: "/kubernetes/namespace/networks/services/:name",
        component: "./kubernetes/namespace/networks/service/detail",
        access: "clusterNamespaceAccess",
      },
      {
        name: "ingress",
        path: "/kubernetes/namespace/networks/ingresses",
        component: "./kubernetes/namespace/networks/ingress",
        access: "clusterNamespaceAccess",
      },
      {
        name: "ingress",
        hideInMenu: true,
        path: "/kubernetes/namespace/networks/ingresses/create/text",
        component: "./kubernetes/namespace/networks/ingress/text",
        access: "clusterNamespaceAccess",
      },
      {
        name: "ingress",
        hideInMenu: true,
        path: "/kubernetes/namespace/networks/ingresses/:name/:action/text",
        component: "./kubernetes/namespace/networks/ingress/text",
        access: "clusterNamespaceAccess",
      },
      {
        name: "ingress",
        hideInMenu: true,
        path: "/kubernetes/namespace/networks/ingresses/:name/:action",
        component: "./kubernetes/namespace/networks/ingress/form",
        access: "clusterNamespaceAccess",
      },
      {
        name: "ingress",
        hideInMenu: true,
        path: "/kubernetes/namespace/networks/ingresses/:name",
        component: "./kubernetes/namespace/networks/ingress/detail",
        access: "clusterNamespaceAccess",
      },
      {
        name: "EndpointSlice",
        path: "/kubernetes/namespace/networks/endpoint_slices",
        component: "./kubernetes/namespace/networks/endpoint_slice",
        access: "clusterResourceEndpointSliceAccess",
      },
      {
        name: "EndpointSlice",
        hideInMenu: true,
        path: "/kubernetes/namespace/networks/endpoint_slices/:name/:action",
        component: "./kubernetes/namespace/networks/endpoint_slice/text",
        access: "clusterResourceEndpointSliceAccess",
      },
      {
        name: "endpoint",
        path: "/kubernetes/namespace/networks/endpoints",
        component: "./kubernetes/namespace/networks/endpoint",
      },
      {
        name: "endpoint",
        hideInMenu: true,
        path: "/kubernetes/namespace/networks/endpoints/:name/:action",
        component: "./kubernetes/namespace/networks/endpoint/text",
        access: "clusterNamespaceAccess",
      },
      {
        name: "certManager",
        path: "/kubernetes/namespace/networks/certmanager",
        access: "clusterFeaturesCertManagerAccess",
        routes: [
          {
            name: "Certificate",
            path: "/kubernetes/namespace/networks/certmanager/certificates",
            component:
              "./kubernetes/namespace/networks/certmanager/certificate",
          },
          {
            name: "CertificateRequest",
            path: "/kubernetes/namespace/networks/certmanager/certificaterequests",
            component:
              "./kubernetes/namespace/networks/certmanager/certificaterequest",
          },
          {
            name: "ChallengesAcme",
            path: "/kubernetes/namespace/networks/certmanager/challengesacmes",
            component:
              "./kubernetes/namespace/networks/certmanager/challengesacme",
          },
          {
            name: "Issuer",
            path: "/kubernetes/namespace/networks/certmanager/issuers",
            component: "./kubernetes/namespace/networks/certmanager/issuer",
          },
          {
            name: "Order",
            path: "/kubernetes/namespace/networks/certmanager/orders",
            component: "./kubernetes/namespace/networks/certmanager/order",
          },
        ],
      },
      {
        name: "gateway",
        path: "/kubernetes/namespace/networks/gateway",
        access: "tenantClusterFeaturesGatewayAccess",
        routes: [
          {
            name: "gateway",
            path: "/kubernetes/namespace/networks/gateway/gateways",
            component: "./kubernetes/namespace/networks/gateway/gateways",
            access: "tenantClusterFeaturesGatewayAccess",
          },
          {
            name: "gateway",
            hideInMenu: true,
            path: "/kubernetes/namespace/networks/gateway/gateways/create/text",
            component: "./kubernetes/namespace/networks/gateway/gateways/text",
            access: "tenantClusterFeaturesGatewayAccess",
          },
          {
            name: "gateway",
            hideInMenu: true,
            path: "/kubernetes/namespace/networks/gateway/gateways/:name/:action",
            component: "./kubernetes/namespace/networks/gateway/gateways/text",
            access: "tenantClusterFeaturesGatewayAccess",
          },
          {
            name: "httproute",
            path: "/kubernetes/namespace/networks/gateway/httproutes",
            component: "./kubernetes/namespace/networks/gateway/httproutes",
            access: "tenantClusterFeaturesGatewayAccess",
          },
          {
            name: "httproute",
            hideInMenu: true,
            path: "/kubernetes/namespace/networks/gateway/httproutes/create/text",
            component:
              "./kubernetes/namespace/networks/gateway/httproutes/text",
            access: "tenantClusterFeaturesGatewayAccess",
          },
          {
            name: "httproute",
            hideInMenu: true,
            path: "/kubernetes/namespace/networks/gateway/httproutes/:name/:action",
            component:
              "./kubernetes/namespace/networks/gateway/httproutes/text",
            access: "tenantClusterFeaturesGatewayAccess",
          },
          {
            name: "grpcroute",
            path: "/kubernetes/namespace/networks/gateway/grpcroutes",
            component: "./kubernetes/namespace/networks/gateway/grpcroutes",
            access: "tenantClusterFeaturesGatewayAccess",
          },
          {
            name: "grpcroute",
            hideInMenu: true,
            path: "/kubernetes/namespace/networks/gateway/grpcroutes/create/text",
            component:
              "./kubernetes/namespace/networks/gateway/grpcroutes/text",
            access: "tenantClusterFeaturesGatewayAccess",
          },
          {
            name: "grpcroute",
            hideInMenu: true,
            path: "/kubernetes/namespace/networks/gateway/grpcroutes/:name/:action",
            component:
              "./kubernetes/namespace/networks/gateway/grpcroutes/text",
            access: "tenantClusterFeaturesGatewayAccess",
          },
          {
            name: "tlsroute",
            path: "/kubernetes/namespace/networks/gateway/tlsroutes",
            component: "./kubernetes/namespace/networks/gateway/tlsroutes",
            access: "tenantClusterFeaturesGatewayAccess",
          },
          {
            name: "tlsroute",
            hideInMenu: true,
            path: "/kubernetes/namespace/networks/gateway/tlsroutes/create/text",
            component: "./kubernetes/namespace/networks/gateway/tlsroutes/text",
            access: "tenantClusterFeaturesGatewayAccess",
          },
          {
            name: "tlsroute",
            hideInMenu: true,
            path: "/kubernetes/namespace/networks/gateway/tlsroutes/:name/:action",
            component: "./kubernetes/namespace/networks/gateway/tlsroutes/text",
            access: "tenantClusterFeaturesGatewayAccess",
          },
          {
            name: "tcproute",
            path: "/kubernetes/namespace/networks/gateway/tcproutes",
            component: "./kubernetes/namespace/networks/gateway/tcproutes",
            access: "tenantClusterFeaturesGatewayAccess",
          },
          {
            name: "tcproute",
            hideInMenu: true,
            path: "/kubernetes/namespace/networks/gateway/tcproutes/create/text",
            component: "./kubernetes/namespace/networks/gateway/tcproutes/text",
            access: "tenantClusterFeaturesGatewayAccess",
          },
          {
            name: "tcproute",
            hideInMenu: true,
            path: "/kubernetes/namespace/networks/gateway/tcproutes/:name/:action",
            component: "./kubernetes/namespace/networks/gateway/tcproutes/text",
            access: "tenantClusterFeaturesGatewayAccess",
          },
          {
            name: "udproute",
            path: "/kubernetes/namespace/networks/gateway/udproutes",
            component: "./kubernetes/namespace/networks/gateway/udproutes",
            access: "tenantClusterFeaturesGatewayAccess",
          },
          {
            name: "udproute",
            hideInMenu: true,
            path: "/kubernetes/namespace/networks/gateway/udproutes/create/text",
            component: "./kubernetes/namespace/networks/gateway/udproutes/text",
            access: "tenantClusterFeaturesGatewayAccess",
          },
          {
            name: "udproute",
            hideInMenu: true,
            path: "/kubernetes/namespace/networks/gateway/udproutes/:name/:action",
            component: "./kubernetes/namespace/networks/gateway/udproutes/text",
            access: "tenantClusterFeaturesGatewayAccess",
          },
          {
            name: "referencegrant",
            path: "/kubernetes/namespace/networks/gateway/referencegrants",
            component:
              "./kubernetes/namespace/networks/gateway/referencegrants",
            access: "tenantClusterFeaturesGatewayAccess",
          },
          {
            name: "referencegrant",
            hideInMenu: true,
            path: "/kubernetes/namespace/networks/gateway/referencegrants/create/text",
            component:
              "./kubernetes/namespace/networks/gateway/referencegrants/text",
            access: "tenantClusterFeaturesGatewayAccess",
          },
          {
            name: "referencegrant",
            hideInMenu: true,
            path: "/kubernetes/namespace/networks/gateway/referencegrants/:name/:action",
            component:
              "./kubernetes/namespace/networks/gateway/referencegrants/text",
            access: "tenantClusterFeaturesGatewayAccess",
          },
          {
            name: "backendtlspolicy",
            path: "/kubernetes/namespace/networks/gateway/backendtlspolicies",
            component:
              "./kubernetes/namespace/networks/gateway/backendtlspolicies",
            access: "tenantClusterFeaturesGatewayAccess",
          },
          {
            name: "backendtlspolicy",
            hideInMenu: true,
            path: "/kubernetes/namespace/networks/gateway/backendtlspolicies/create/text",
            component:
              "./kubernetes/namespace/networks/gateway/backendtlspolicies/text",
            access: "tenantClusterFeaturesGatewayAccess",
          },
          {
            name: "backendtlspolicy",
            hideInMenu: true,
            path: "/kubernetes/namespace/networks/gateway/backendtlspolicies/:name/:action",
            component:
              "./kubernetes/namespace/networks/gateway/backendtlspolicies/text",
            access: "tenantClusterFeaturesGatewayAccess",
          },
          {
            name: "listenerset",
            path: "/kubernetes/namespace/networks/gateway/listenersets",
            component: "./kubernetes/namespace/networks/gateway/listenersets",
            access: "tenantClusterFeaturesGatewayAccess",
          },
          {
            name: "listenerset",
            hideInMenu: true,
            path: "/kubernetes/namespace/networks/gateway/listenersets/create/text",
            component:
              "./kubernetes/namespace/networks/gateway/listenersets/text",
            access: "tenantClusterFeaturesGatewayAccess",
          },
          {
            name: "listenerset",
            hideInMenu: true,
            path: "/kubernetes/namespace/networks/gateway/listenersets/:name/:action",
            component:
              "./kubernetes/namespace/networks/gateway/listenersets/text",
            access: "tenantClusterFeaturesGatewayAccess",
          },
          {
            name: "xbackendtrafficpolicy",
            path: "/kubernetes/namespace/networks/gateway/xbackendtrafficpolicies",
            component:
              "./kubernetes/namespace/networks/gateway/xbackendtrafficpolicies",
            access: "tenantClusterFeaturesGatewayAccess",
          },
          {
            name: "xbackendtrafficpolicy",
            hideInMenu: true,
            path: "/kubernetes/namespace/networks/gateway/xbackendtrafficpolicies/create/text",
            component:
              "./kubernetes/namespace/networks/gateway/xbackendtrafficpolicies/text",
            access: "tenantClusterFeaturesGatewayAccess",
          },
          {
            name: "xbackendtrafficpolicy",
            hideInMenu: true,
            path: "/kubernetes/namespace/networks/gateway/xbackendtrafficpolicies/:name/:action",
            component:
              "./kubernetes/namespace/networks/gateway/xbackendtrafficpolicies/text",
            access: "tenantClusterFeaturesGatewayAccess",
          },
        ],
      },
      //
    ],
  },

  {
    name: "access",
    icon: "usergroupAddOutlined",
    path: "/kubernetes/namespace/access",
    access: "clusterNamespaceAccess",
    routes: [
      {
        name: "accountPermission",
        path: "/kubernetes/namespace/access/account",
        component: "./kubernetes/namespace/access/account",
      },
      {
        name: "serviceaccount",
        path: "/kubernetes/namespace/access/serviceaccounts",
        component: "./kubernetes/namespace/access/serviceaccount",
      },
      {
        name: "serviceaccount",
        hideInMenu: true,
        path: "/kubernetes/namespace/access/serviceaccounts/:name/:action",
        component: "./kubernetes/namespace/access/serviceaccount/text",
        access: "clusterNamespaceAccess",
      },
      {
        name: "role",
        path: "/kubernetes/namespace/access/roles",
        component: "./kubernetes/namespace/access/role",
      },
      {
        name: "role",
        hideInMenu: true,
        path: "/kubernetes/namespace/access/roles/:name/:action",
        component: "./kubernetes/namespace/access/role/text",
        access: "clusterNamespaceAccess",
      },
      {
        name: "rolebinding",
        path: "/kubernetes/namespace/access/rolebindings",
        component: "./kubernetes/namespace/access/rolebinding",
      },
      {
        name: "role",
        hideInMenu: true,
        path: "/kubernetes/namespace/access/rolebindings/:name/:action",
        component: "./kubernetes/namespace/access/rolebinding/text",
        access: "clusterNamespaceAccess",
      },
    ],
  },
  {
    name: "storage",
    icon: "DatabaseOutlined",
    path: "/kubernetes/namespace/storage",
    access: "clusterNamespaceAccess",
    routes: [
      {
        name: "persistentVolumeClaim",
        path: "/kubernetes/namespace/storage/pvc",
        component: "./kubernetes/namespace/storage/pvc",
      },
      {
        name: "persistentVolumeClaim",
        hideInMenu: true,
        path: "/kubernetes/namespace/storage/pvc/:name/:action",
        component: "./kubernetes/namespace/storage/pvc/text",
        access: "clusterNamespaceAccess",
      },
    ],
  },
  {
    name: "policy",
    icon: "PicRightOutlined",
    path: "/kubernetes/namespace/policy",
    access: "clusterNamespaceAccess",
    routes: [
      {
        name: "networkpolicy",
        path: "/kubernetes/namespace/policy/networkpolicy",
        component: "./kubernetes/namespace/policy/networkpolicy",
      },
      {
        name: "networkpolicy",
        hideInMenu: true,
        path: "/kubernetes/namespace/policy/networkpolicy/:name/:action",
        component: "./kubernetes/namespace/policy/networkpolicy/text",
        access: "clusterNamespaceAccess",
      },
      {
        name: "hpa",
        path: "/kubernetes/namespace/policy/hpa",
        component: "./kubernetes/namespace/policy/hpa",
      },
      {
        name: "hpa",
        hideInMenu: true,
        path: "/kubernetes/namespace/policy/hpa/:name/:action",
        component: "./kubernetes/namespace/policy/hpa/text",
        access: "clusterNamespaceAccess",
      },
      {
        name: "poddisruptionbudget",
        path: "/kubernetes/namespace/policy/poddisruptionbudgets",
        component: "./kubernetes/namespace/policy/poddisruptionbudget",
      },
      {
        name: "poddisruptionbudget",
        hideInMenu: true,
        path: "/kubernetes/namespace/policy/poddisruptionbudgets/:name/:action",
        component: "./kubernetes/namespace/policy/poddisruptionbudget/text",
        access: "clusterNamespaceAccess",
      },
    ],
  },
  {
    name: "faas",
    icon: "apartment",
    path: "/kubernetes/namespace/faas",
    access: "clusterNamespaceAccess",
    routes: [
      {
        name: "Fission",
        path: "/kubernetes/namespace/faas/fission",
        routes: [
          {
            name: "canaryconfig",
            path: "/kubernetes/namespace/faas/fission/canaryconfig",
            component: "./kubernetes/namespace/faas/fission/canaryconfig",
            access: "clusterFeaturesFissionAccess",
          },
          {
            name: "canaryconfig",
            hideInMenu: true,
            path: "/kubernetes/namespace/faas/fission/canaryconfig/create/text",
            component: "./kubernetes/namespace/faas/fission/canaryconfig/text",
            access: "clusterFeaturesFissionAccess",
          },
          {
            name: "canaryconfig",
            hideInMenu: true,
            path: "/kubernetes/namespace/faas/fission/canaryconfig/:name/:action",
            component: "./kubernetes/namespace/faas/fission/canaryconfig/text",
            access: "clusterFeaturesFissionAccess",
          },
          {
            name: "environment",
            path: "/kubernetes/namespace/faas/fission/environment",
            component: "./kubernetes/namespace/faas/fission/environment",
            access: "clusterFeaturesFissionAccess",
          },
          {
            name: "environment",
            hideInMenu: true,
            path: "/kubernetes/namespace/faas/fission/environment/create/text",
            component: "./kubernetes/namespace/faas/fission/environment/text",
            access: "clusterFeaturesFissionAccess",
          },
          {
            name: "environment",
            hideInMenu: true,
            path: "/kubernetes/namespace/faas/fission/environment/:name/:action",
            component: "./kubernetes/namespace/faas/fission/environment/text",
            access: "clusterFeaturesFissionAccess",
          },
          {
            name: "function",
            path: "/kubernetes/namespace/faas/fission/function",
            component: "./kubernetes/namespace/faas/fission/function",
            access: "clusterFeaturesFissionAccess",
          },
          {
            name: "function",
            hideInMenu: true,
            path: "/kubernetes/namespace/faas/fission/function/create/text",
            component: "./kubernetes/namespace/faas/fission/function/text",
            access: "clusterFeaturesFissionAccess",
          },
          {
            name: "function",
            hideInMenu: true,
            path: "/kubernetes/namespace/faas/fission/function/:name/:action",
            component: "./kubernetes/namespace/faas/fission/function/text",
            access: "clusterFeaturesFissionAccess",
          },
          {
            name: "httptrigger",
            path: "/kubernetes/namespace/faas/fission/httptrigger",
            component: "./kubernetes/namespace/faas/fission/httptrigger",
            access: "clusterFeaturesFissionAccess",
          },
          {
            name: "httptrigger",
            hideInMenu: true,
            path: "/kubernetes/namespace/faas/fission/httptrigger/create/text",
            component: "./kubernetes/namespace/faas/fission/httptrigger/text",
            access: "clusterFeaturesFissionAccess",
          },
          {
            name: "httptrigger",
            hideInMenu: true,
            path: "/kubernetes/namespace/faas/fission/httptrigger/:name/:action",
            component: "./kubernetes/namespace/faas/fission/httptrigger/text",
            access: "clusterFeaturesFissionAccess",
          },
          {
            name: "kuberneteswatchtrigger",
            path: "/kubernetes/namespace/faas/fission/kuberneteswatchtrigger",
            component:
              "./kubernetes/namespace/faas/fission/kuberneteswatchtrigger",
            access: "clusterFeaturesFissionAccess",
          },
          {
            name: "kuberneteswatchtrigger",
            hideInMenu: true,
            path: "/kubernetes/namespace/faas/fission/kuberneteswatchtrigger/create/text",
            component:
              "./kubernetes/namespace/faas/fission/kuberneteswatchtrigger/text",
            access: "clusterFeaturesFissionAccess",
          },
          {
            name: "kuberneteswatchtrigger",
            hideInMenu: true,
            path: "/kubernetes/namespace/faas/fission/kuberneteswatchtrigger/:name/:action",
            component:
              "./kubernetes/namespace/faas/fission/kuberneteswatchtrigger/text",
            access: "clusterFeaturesFissionAccess",
          },
          {
            name: "messagequeuetrigger",
            path: "/kubernetes/namespace/faas/fission/messagequeuetrigger",
            component:
              "./kubernetes/namespace/faas/fission/messagequeuetrigger",
            access: "clusterFeaturesFissionAccess",
          },
          {
            name: "messagequeuetrigger",
            hideInMenu: true,
            path: "/kubernetes/namespace/faas/fission/messagequeuetrigger/create/text",
            component:
              "./kubernetes/namespace/faas/fission/messagequeuetrigger/text",
            access: "clusterFeaturesFissionAccess",
          },
          {
            name: "messagequeuetrigger",
            hideInMenu: true,
            path: "/kubernetes/namespace/faas/fission/messagequeuetrigger/:name/:action",
            component:
              "./kubernetes/namespace/faas/fission/messagequeuetrigger/text",
            access: "clusterFeaturesFissionAccess",
          },
          {
            name: "package",
            path: "/kubernetes/namespace/faas/fission/package",
            component: "./kubernetes/namespace/faas/fission/package",
            access: "clusterFeaturesFissionAccess",
          },
          {
            name: "package",
            hideInMenu: true,
            path: "/kubernetes/namespace/faas/fission/package/create/text",
            component: "./kubernetes/namespace/faas/fission/package/text",
            access: "clusterFeaturesFissionAccess",
          },
          {
            name: "package",
            hideInMenu: true,
            path: "/kubernetes/namespace/faas/fission/package/:name/:action",
            component: "./kubernetes/namespace/faas/fission/package/text",
            access: "clusterFeaturesFissionAccess",
          },
          {
            name: "timetrigger",
            path: "/kubernetes/namespace/faas/fission/timetrigger",
            component: "./kubernetes/namespace/faas/fission/timetrigger",
            access: "clusterFeaturesFissionAccess",
          },
          {
            name: "timetrigger",
            hideInMenu: true,
            path: "/kubernetes/namespace/faas/fission/timetrigger/create/text",
            component: "./kubernetes/namespace/faas/fission/timetrigger/text",
            access: "clusterFeaturesFissionAccess",
          },
          {
            name: "timetrigger",
            hideInMenu: true,
            path: "/kubernetes/namespace/faas/fission/timetrigger/:name/:action",
            component: "./kubernetes/namespace/faas/fission/timetrigger/text",
            access: "clusterFeaturesFissionAccess",
          },
        ],
      },
      {
        name: "Knative",
        path: "/kubernetes/namespace/faas/knative",
        routes: [
          {
            name: "service",
            path: "/kubernetes/namespace/faas/knative/services",
            component: "./kubernetes/namespace/faas/knative/service",
            access: "clusterFeaturesKnativeAccess",
          },
          {
            name: "service",
            hideInMenu: true,
            path: "/kubernetes/namespace/faas/knative/services/create/text",
            component: "./kubernetes/namespace/faas/knative/service/text",
            access: "clusterFeaturesKnativeAccess",
          },
          {
            name: "service",
            hideInMenu: true,
            path: "/kubernetes/namespace/faas/knative/services/:name/:action",
            component: "./kubernetes/namespace/faas/knative/service/text",
            access: "clusterFeaturesKnativeAccess",
          },
        ],
      },
    ],
  },
  {
    name: "monitor",
    icon: "RadarChartOutlined",
    path: "/kubernetes/namespace/monitor",
    access: "clusterNamespaceAccess",
    routes: [
      {
        name: "event",
        path: "/kubernetes/namespace/monitor/events",
        component: "./kubernetes/namespace/monitor/event",
      },
      {
        name: "prometheusOperator",
        path: "/kubernetes/namespace/monitor/prometheus-operator",
        access: "clusterFeaturesPrometheusOperatorAccess",
        routes: [
          {
            name: "Alertmanager",
            path: "/kubernetes/namespace/monitor/prometheus-operator/alertmanager",
            component:
              "./kubernetes/namespace/monitor/prometheusoperator/alertmanager",
          },
          {
            name: "Alertmanager",
            hideInMenu: true,
            path: "/kubernetes/namespace/monitor/prometheus-operator/alertmanager/create/text",
            component:
              "./kubernetes/namespace/monitor/prometheusoperator/alertmanager/text",
            access: "clusterNamespaceAccess",
          },
          {
            name: "Alertmanager",
            hideInMenu: true,
            path: "/kubernetes/namespace/monitor/prometheus-operator/alertmanager/:name/:action",
            component:
              "./kubernetes/namespace/monitor/prometheusoperator/alertmanager/text",
            access: "clusterNamespaceAccess",
          },
          {
            name: "Prometheus",
            path: "/kubernetes/namespace/monitor/prometheus-operator/prometheus",
            component:
              "./kubernetes/namespace/monitor/prometheusoperator/prometheus",
          },
          {
            name: "Prometheus",
            hideInMenu: true,
            path: "/kubernetes/namespace/monitor/prometheus-operator/prometheus/create/text",
            component:
              "./kubernetes/namespace/monitor/prometheusoperator/prometheus/text",
            access: "clusterNamespaceAccess",
          },
          {
            name: "Prometheus",
            hideInMenu: true,
            path: "/kubernetes/namespace/monitor/prometheus-operator/prometheus/:name/:action",
            component:
              "./kubernetes/namespace/monitor/prometheusoperator/prometheus/text",
            access: "clusterNamespaceAccess",
          },
          {
            name: "PrometheusRule",
            path: "/kubernetes/namespace/monitor/prometheus-operator/prometheusrule",
            component:
              "./kubernetes/namespace/monitor/prometheusoperator/prometheusrule",
          },
          {
            name: "PrometheusRule",
            hideInMenu: true,
            path: "/kubernetes/namespace/monitor/prometheus-operator/prometheusrule/create/text",
            component:
              "./kubernetes/namespace/monitor/prometheusoperator/prometheusrule/text",
            access: "clusterNamespaceAccess",
          },
          {
            name: "PrometheusRule",
            hideInMenu: true,
            path: "/kubernetes/namespace/monitor/prometheus-operator/prometheusrule/:name/:action",
            component:
              "./kubernetes/namespace/monitor/prometheusoperator/prometheusrule/text",
            access: "clusterNamespaceAccess",
          },
          {
            name: "ServiceMonitor",
            path: "/kubernetes/namespace/monitor/prometheus-operator/servicemonitor",
            component:
              "./kubernetes/namespace/monitor/prometheusoperator/servicemonitor",
          },
          {
            name: "ServiceMonitor",
            hideInMenu: true,
            path: "/kubernetes/namespace/monitor/prometheus-operator/servicemonitor/create/text",
            component:
              "./kubernetes/namespace/monitor/prometheusoperator/servicemonitor/text",
            access: "clusterNamespaceAccess",
          },
          {
            name: "ServiceMonitor",
            hideInMenu: true,
            path: "/kubernetes/namespace/monitor/prometheus-operator/servicemonitor/:name/:action",
            component:
              "./kubernetes/namespace/monitor/prometheusoperator/servicemonitor/text",
            access: "clusterNamespaceAccess",
          },
          {
            name: "PodMonitor",
            path: "/kubernetes/namespace/monitor/prometheus-operator/podmonitor",
            component:
              "./kubernetes/namespace/monitor/prometheusoperator/podmonitor",
          },
          {
            name: "PodMonitor",
            hideInMenu: true,
            path: "/kubernetes/namespace/monitor/prometheus-operator/podmonitor/create/text",
            component:
              "./kubernetes/namespace/monitor/prometheusoperator/podmonitor/text",
            access: "clusterNamespaceAccess",
          },
          {
            name: "PodMonitor",
            hideInMenu: true,
            path: "/kubernetes/namespace/monitor/prometheus-operator/podmonitor/:name/:action",
            component:
              "./kubernetes/namespace/monitor/prometheusoperator/podmonitor/text",
            access: "clusterNamespaceAccess",
          },
        ],
      },
      {
        name: "terminalAuditLog",
        path: "/kubernetes/namespace/monitor/terminal",
        component: "./kubernetes/cluster/monitor/terminal",
      },
    ],
  },
  {
    name: "monitor",
    hideInMenu: true,
    menuRender: false,
    path: "/kubernetes/namespace/application-instance/:id",
    access: "clusterNamespaceAccess",
    component: "./kubernetes/namespace/application_instance/detail",
  },

  {
    name: "config",
    icon: "ToolOutlined",
    path: "/kubernetes/namespace/config",
    access: "clusterNamespaceAccess",
    routes: [
      {
        name: "configmap",
        path: "/kubernetes/namespace/config/configmaps",
        component: "./kubernetes/namespace/config/configmap",
      },
      {
        name: "configmap",
        hideInMenu: true,
        path: "/kubernetes/namespace/config/configmaps/:name",
        component: "./kubernetes/namespace/config/configmap/detail",
      },
      {
        name: "configmap",
        hideInMenu: true,
        path: "/kubernetes/namespace/config/configmaps/create/text",
        component: "./kubernetes/namespace/config/configmap/text",
        access: "clusterNamespaceAccess",
      },
      {
        name: "configmap",
        hideInMenu: true,
        path: "/kubernetes/namespace/config/configmaps/:name/:action",
        component: "./kubernetes/namespace/config/configmap/form",
        access: "clusterNamespaceAccess",
      },
      {
        name: "secret",
        path: "/kubernetes/namespace/config/secrets",
        component: "./kubernetes/namespace/config/secret",
      },
      {
        name: "secret",
        hideInMenu: true,
        path: "/kubernetes/namespace/config/secrets/:name",
        component: "./kubernetes/namespace/config/secret/detail",
      },
      {
        name: "secret",
        hideInMenu: true,
        path: "/kubernetes/namespace/config/secrets/create/text",
        component: "./kubernetes/namespace/config/secret/text",
        access: "clusterNamespaceAccess",
      },
      {
        name: "secret",
        hideInMenu: true,
        path: "/kubernetes/namespace/config/secrets/:name/:action",
        component: "./kubernetes/namespace/config/secret/form",
        access: "clusterNamespaceAccess",
      },
      {
        name: "resourcequota",
        path: "/kubernetes/namespace/config/resourcequotas",
        component: "./kubernetes/namespace/config/resourcequota",
      },
      {
        name: "resourcequota",
        hideInMenu: true,
        path: "/kubernetes/namespace/config/resourcequotas/:name/:action",
        component: "./kubernetes/namespace/config/resourcequota/text",
      },
      {
        name: "limitrange",
        path: "/kubernetes/namespace/config/limitranges",
        component: "./kubernetes/namespace/config/limitrange",
      },
      {
        name: "limitrange",
        hideInMenu: true,
        path: "/kubernetes/namespace/config/limitranges/:name/:action",
        component: "./kubernetes/namespace/config/limitrange/text",
      },
    ],
  },

  {
    name: "network",
    icon: "GlobalOutlined",
    path: "/kubernetes/namespace/networks",
    access: "clusterNamespaceAccess",
    routes: [
      {
        name: "service",
        path: "/kubernetes/namespace/networks/services",
        component: "./kubernetes/namespace/networks/service",
      },
      {
        name: "service",
        hideInMenu: true,
        path: "/kubernetes/namespace/networks/services/create/text",
        component: "./kubernetes/namespace/networks/service/text",
        access: "clusterNamespaceAccess",
      },
      {
        name: "service",
        hideInMenu: true,
        path: "/kubernetes/namespace/networks/services/:name/:action",
        component: "./kubernetes/namespace/networks/service/form",
        access: "clusterNamespaceAccess",
      },
      {
        name: "service",
        hideInMenu: true,
        path: "/kubernetes/namespace/networks/services/:name",
        component: "./kubernetes/namespace/networks/service/detail",
        access: "clusterNamespaceAccess",
      },
      {
        name: "ingress",
        path: "/kubernetes/namespace/networks/ingresses",
        component: "./kubernetes/namespace/networks/ingress",
      },
      {
        name: "ingress",
        hideInMenu: true,
        path: "/kubernetes/namespace/networks/ingresses/create/text",
        component: "./kubernetes/namespace/networks/ingress/text",
        access: "clusterNamespaceAccess",
      },
      {
        name: "ingress",
        hideInMenu: true,
        path: "/kubernetes/namespace/networks/ingresses/:name/:action",
        component: "./kubernetes/namespace/networks/ingress/form",
        access: "clusterNamespaceAccess",
      },
      {
        name: "ingress",
        hideInMenu: true,
        path: "/kubernetes/namespace/networks/ingresses/:name",
        component: "./kubernetes/namespace/networks/ingress/detail",
        access: "clusterNamespaceAccess",
      },
      {
        name: "EndpointSlice",
        path: "/kubernetes/namespace/networks/endpoint_slices",
        component: "./kubernetes/namespace/networks/endpoint_slice",
        access: "clusterResourceEndpointSliceAccess",
      },
      {
        name: "EndpointSlice",
        hideInMenu: true,
        path: "/kubernetes/namespace/networks/endpoint_slices/:name/:action",
        component: "./kubernetes/namespace/networks/endpoint_slice/text",
        access: "clusterResourceEndpointSliceAccess",
      },
      {
        name: "endpoint",
        path: "/kubernetes/namespace/networks/endpoints",
        component: "./kubernetes/namespace/networks/endpoint",
      },
      {
        name: "endpoint",
        hideInMenu: true,
        path: "/kubernetes/namespace/networks/endpoints/:name/:action",
        component: "./kubernetes/namespace/networks/endpoint/text",
      },
      {
        name: "certManager",
        path: "/kubernetes/namespace/networks/certmanager",
        access: "clusterFeaturesCertManagerAccess",
        routes: [
          {
            name: "Certificate",
            path: "/kubernetes/namespace/networks/certmanager/certificates",
            component:
              "./kubernetes/namespace/networks/certmanager/certificate",
          },
          {
            name: "CertificateRequest",
            path: "/kubernetes/namespace/networks/certmanager/certificaterequests",
            component:
              "./kubernetes/namespace/networks/certmanager/certificaterequest",
          },
          {
            name: "ChallengesAcme",
            path: "/kubernetes/namespace/networks/certmanager/challengesacmes",
            component:
              "./kubernetes/namespace/networks/certmanager/challengesacme",
          },
          {
            name: "Issuer",
            path: "/kubernetes/namespace/networks/certmanager/issuers",
            component: "./kubernetes/namespace/networks/certmanager/issuer",
          },
          {
            name: "Order",
            path: "/kubernetes/namespace/networks/certmanager/orders",
            component: "./kubernetes/namespace/networks/certmanager/order",
          },
        ],
      },
      //
    ],
  },

  {
    name: "access",
    icon: "usergroupAddOutlined",
    path: "/kubernetes/namespace/access",
    access: "clusterNamespaceAccess",
    routes: [
      {
        name: "accountPermission",
        path: "/kubernetes/namespace/access/account",
        component: "./kubernetes/namespace/access/account",
      },
      {
        name: "serviceaccount",
        path: "/kubernetes/namespace/access/serviceaccounts",
        component: "./kubernetes/namespace/access/serviceaccount",
      },
      {
        name: "serviceaccount",
        hideInMenu: true,
        path: "/kubernetes/namespace/access/serviceaccounts/:name/:action",
        component: "./kubernetes/namespace/access/serviceaccount/text",
        access: "clusterNamespaceAccess",
      },
      {
        name: "role",
        path: "/kubernetes/namespace/access/roles",
        component: "./kubernetes/namespace/access/role",
      },
      {
        name: "role",
        hideInMenu: true,
        path: "/kubernetes/namespace/access/roles/:name/:action",
        component: "./kubernetes/namespace/access/role/text",
        access: "clusterNamespaceAccess",
      },
      {
        name: "rolebinding",
        path: "/kubernetes/namespace/access/rolebindings",
        component: "./kubernetes/namespace/access/rolebinding",
      },
      {
        name: "role",
        hideInMenu: true,
        path: "/kubernetes/namespace/access/rolebindings/:name/:action",
        component: "./kubernetes/namespace/access/rolebinding/text",
        access: "clusterNamespaceAccess",
      },
    ],
  },
  {
    name: "storage",
    icon: "DatabaseOutlined",
    path: "/kubernetes/namespace/storage",
    access: "clusterNamespaceAccess",
    routes: [
      {
        name: "persistentVolumeClaim",
        path: "/kubernetes/namespace/storage/pvc",
        component: "./kubernetes/namespace/storage/pvc",
      },
      {
        name: "persistentVolumeClaim",
        hideInMenu: true,
        path: "/kubernetes/namespace/storage/pvc/:name/:action",
        component: "./kubernetes/namespace/storage/pvc/text",
      },
    ],
  },
  {
    name: "policy",
    icon: "PicRightOutlined",
    path: "/kubernetes/namespace/policy",
    access: "clusterNamespaceAccess",
    routes: [
      {
        name: "networkpolicy",
        path: "/kubernetes/namespace/policy/networkpolicy",
        component: "./kubernetes/namespace/policy/networkpolicy",
      },
      {
        name: "networkpolicy",
        hideInMenu: true,
        path: "/kubernetes/namespace/policy/networkpolicy/:name/:action",
        component: "./kubernetes/namespace/policy/networkpolicy/text",
      },
      {
        name: "hpa",
        path: "/kubernetes/namespace/policy/hpa",
        component: "./kubernetes/namespace/policy/hpa",
      },
      {
        name: "hpa",
        hideInMenu: true,
        path: "/kubernetes/namespace/policy/hpa/:name/:action",
        component: "./kubernetes/namespace/policy/hpa/text",
      },
      {
        name: "poddisruptionbudget",
        path: "/kubernetes/namespace/policy/poddisruptionbudgets",
        component: "./kubernetes/namespace/policy/poddisruptionbudget",
      },
      {
        name: "poddisruptionbudget",
        hideInMenu: true,
        path: "/kubernetes/namespace/policy/poddisruptionbudgets/:name/:action",
        component: "./kubernetes/namespace/policy/poddisruptionbudget/text",
      },
    ],
  },
  {
    name: "faas",
    icon: "apartment",
    path: "/kubernetes/namespace/faas",
    access: "clusterNamespaceAccess",
    routes: [
      {
        name: "Fission",
        path: "/kubernetes/namespace/faas/fission",
        routes: [
          {
            name: "canaryconfig",
            path: "/kubernetes/namespace/faas/fission/canaryconfig",
            component: "./kubernetes/namespace/faas/fission/canaryconfig",
            access: "clusterFeaturesFissionAccess",
          },
          {
            name: "canaryconfig",
            hideInMenu: true,
            path: "/kubernetes/namespace/faas/fission/canaryconfig/create/text",
            component: "./kubernetes/namespace/faas/fission/canaryconfig/text",
            access: "clusterFeaturesFissionAccess",
          },
          {
            name: "canaryconfig",
            hideInMenu: true,
            path: "/kubernetes/namespace/faas/fission/canaryconfig/:name/:action",
            component: "./kubernetes/namespace/faas/fission/canaryconfig/text",
            access: "clusterFeaturesFissionAccess",
          },
          {
            name: "environment",
            path: "/kubernetes/namespace/faas/fission/environment",
            component: "./kubernetes/namespace/faas/fission/environment",
            access: "clusterFeaturesFissionAccess",
          },
          {
            name: "environment",
            hideInMenu: true,
            path: "/kubernetes/namespace/faas/fission/environment/create/text",
            component: "./kubernetes/namespace/faas/fission/environment/text",
            access: "clusterFeaturesFissionAccess",
          },
          {
            name: "environment",
            hideInMenu: true,
            path: "/kubernetes/namespace/faas/fission/environment/:name/:action",
            component: "./kubernetes/namespace/faas/fission/environment/text",
            access: "clusterFeaturesFissionAccess",
          },
          {
            name: "function",
            path: "/kubernetes/namespace/faas/fission/function",
            component: "./kubernetes/namespace/faas/fission/function",
            access: "clusterFeaturesFissionAccess",
          },
          {
            name: "function",
            hideInMenu: true,
            path: "/kubernetes/namespace/faas/fission/function/create/text",
            component: "./kubernetes/namespace/faas/fission/function/text",
            access: "clusterFeaturesFissionAccess",
          },
          {
            name: "function",
            hideInMenu: true,
            path: "/kubernetes/namespace/faas/fission/function/:name/:action",
            component: "./kubernetes/namespace/faas/fission/function/text",
            access: "clusterFeaturesFissionAccess",
          },
          {
            name: "httptrigger",
            path: "/kubernetes/namespace/faas/fission/httptrigger",
            component: "./kubernetes/namespace/faas/fission/httptrigger",
            access: "clusterFeaturesFissionAccess",
          },
          {
            name: "httptrigger",
            hideInMenu: true,
            path: "/kubernetes/namespace/faas/fission/httptrigger/create/text",
            component: "./kubernetes/namespace/faas/fission/httptrigger/text",
            access: "clusterFeaturesFissionAccess",
          },
          {
            name: "httptrigger",
            hideInMenu: true,
            path: "/kubernetes/namespace/faas/fission/httptrigger/:name/:action",
            component: "./kubernetes/namespace/faas/fission/httptrigger/text",
            access: "clusterFeaturesFissionAccess",
          },
          {
            name: "kuberneteswatchtrigger",
            path: "/kubernetes/namespace/faas/fission/kuberneteswatchtrigger",
            component:
              "./kubernetes/namespace/faas/fission/kuberneteswatchtrigger",
            access: "clusterFeaturesFissionAccess",
          },
          {
            name: "kuberneteswatchtrigger",
            hideInMenu: true,
            path: "/kubernetes/namespace/faas/fission/kuberneteswatchtrigger/create/text",
            component:
              "./kubernetes/namespace/faas/fission/kuberneteswatchtrigger/text",
            access: "clusterFeaturesFissionAccess",
          },
          {
            name: "kuberneteswatchtrigger",
            hideInMenu: true,
            path: "/kubernetes/namespace/faas/fission/kuberneteswatchtrigger/:name/:action",
            component:
              "./kubernetes/namespace/faas/fission/kuberneteswatchtrigger/text",
            access: "clusterFeaturesFissionAccess",
          },
          {
            name: "messagequeuetrigger",
            path: "/kubernetes/namespace/faas/fission/messagequeuetrigger",
            component:
              "./kubernetes/namespace/faas/fission/messagequeuetrigger",
            access: "clusterFeaturesFissionAccess",
          },
          {
            name: "messagequeuetrigger",
            hideInMenu: true,
            path: "/kubernetes/namespace/faas/fission/messagequeuetrigger/create/text",
            component:
              "./kubernetes/namespace/faas/fission/messagequeuetrigger/text",
            access: "clusterFeaturesFissionAccess",
          },
          {
            name: "messagequeuetrigger",
            hideInMenu: true,
            path: "/kubernetes/namespace/faas/fission/messagequeuetrigger/:name/:action",
            component:
              "./kubernetes/namespace/faas/fission/messagequeuetrigger/text",
            access: "clusterFeaturesFissionAccess",
          },
          {
            name: "package",
            path: "/kubernetes/namespace/faas/fission/package",
            component: "./kubernetes/namespace/faas/fission/package",
            access: "clusterFeaturesFissionAccess",
          },
          {
            name: "package",
            hideInMenu: true,
            path: "/kubernetes/namespace/faas/fission/package/create/text",
            component: "./kubernetes/namespace/faas/fission/package/text",
            access: "clusterFeaturesFissionAccess",
          },
          {
            name: "package",
            hideInMenu: true,
            path: "/kubernetes/namespace/faas/fission/package/:name/:action",
            component: "./kubernetes/namespace/faas/fission/package/text",
            access: "clusterFeaturesFissionAccess",
          },
          {
            name: "timetrigger",
            path: "/kubernetes/namespace/faas/fission/timetrigger",
            component: "./kubernetes/namespace/faas/fission/timetrigger",
            access: "clusterFeaturesFissionAccess",
          },
          {
            name: "timetrigger",
            hideInMenu: true,
            path: "/kubernetes/namespace/faas/fission/timetrigger/create/text",
            component: "./kubernetes/namespace/faas/fission/timetrigger/text",
            access: "clusterFeaturesFissionAccess",
          },
          {
            name: "timetrigger",
            hideInMenu: true,
            path: "/kubernetes/namespace/faas/fission/timetrigger/:name/:action",
            component: "./kubernetes/namespace/faas/fission/timetrigger/text",
            access: "clusterFeaturesFissionAccess",
          },
        ],
      },
      {
        name: "Knative",
        path: "/kubernetes/namespace/faas/knative",
        access: "clusterFeaturesKnativeAccess",
        routes: [
          {
            name: "service",
            path: "/kubernetes/namespace/faas/knative/services",
            component: "./kubernetes/namespace/faas/knative/service",
            access: "clusterFeaturesKnativeAccess",
          },
          {
            name: "service",
            hideInMenu: true,
            path: "/kubernetes/namespace/faas/knative/services/create/text",
            component: "./kubernetes/namespace/faas/knative/service/text",
            access: "clusterFeaturesKnativeAccess",
          },
          {
            name: "service",
            hideInMenu: true,
            path: "/kubernetes/namespace/faas/knative/services/:name/:action",
            component: "./kubernetes/namespace/faas/knative/service/text",
            access: "clusterFeaturesKnativeAccess",
          },
        ],
      },
    ],
  },
  {
    name: "monitor",
    icon: "RadarChartOutlined",
    path: "/kubernetes/namespace/monitor",
    access: "clusterNamespaceAccess",
    routes: [
      {
        name: "event",
        path: "/kubernetes/namespace/monitor/events",
        component: "./kubernetes/namespace/monitor/event",
      },
      {
        name: "event",
        hideInMenu: true,
        path: "/kubernetes/namespace/monitor/events/:name/:action",
        component: "./kubernetes/namespace/monitor/event/text",
      },
      {
        name: "terminalAuditLog",
        path: "/kubernetes/namespace/monitor/terminal",
        component: "./kubernetes/cluster/monitor/terminal",
      },
      {
        name: "PrometheusOperator",
        path: "/kubernetes/namespace/monitor/prometheus-operator",
        access: "clusterFeaturesPrometheusOperatorAccess",
        routes: [
          {
            name: "Alertmanager",
            path: "/kubernetes/namespace/monitor/prometheus-operator/alertmanager",
            component:
              "./kubernetes/namespace/monitor/prometheusoperator/alertmanager",
            access: "clusterFeaturesPrometheusOperatorAccess",
          },
          {
            name: "Alertmanager",
            hideInMenu: true,
            path: "/kubernetes/namespace/monitor/prometheus-operator/alertmanager/create/text",
            component:
              "./kubernetes/namespace/monitor/prometheusoperator/alertmanager/text",
            access: "clusterFeaturesPrometheusOperatorAccess",
          },
          {
            name: "Alertmanager",
            hideInMenu: true,
            path: "/kubernetes/namespace/monitor/prometheus-operator/alertmanager/:name/:action",
            component:
              "./kubernetes/namespace/monitor/prometheusoperator/alertmanager/text",
            access: "clusterFeaturesPrometheusOperatorAccess",
          },
          {
            name: "Prometheus",
            path: "/kubernetes/namespace/monitor/prometheus-operator/prometheus",
            component:
              "./kubernetes/namespace/monitor/prometheusoperator/prometheus",
            access: "clusterFeaturesPrometheusOperatorAccess",
          },
          {
            name: "Prometheus",
            hideInMenu: true,
            path: "/kubernetes/namespace/monitor/prometheus-operator/prometheus/create/text",
            component:
              "./kubernetes/namespace/monitor/prometheusoperator/prometheus/text",
            access: "clusterFeaturesPrometheusOperatorAccess",
          },
          {
            name: "Prometheus",
            hideInMenu: true,
            path: "/kubernetes/namespace/monitor/prometheus-operator/prometheus/:name/:action",
            component:
              "./kubernetes/namespace/monitor/prometheusoperator/prometheus/text",
            access: "clusterFeaturesPrometheusOperatorAccess",
          },
          {
            name: "PrometheusRule",
            path: "/kubernetes/namespace/monitor/prometheus-operator/prometheusrule",
            component:
              "./kubernetes/namespace/monitor/prometheusoperator/prometheusrule",
            access: "clusterFeaturesPrometheusOperatorAccess",
          },
          {
            name: "PrometheusRule",
            hideInMenu: true,
            path: "/kubernetes/namespace/monitor/prometheus-operator/prometheusrule/create/text",
            component:
              "./kubernetes/namespace/monitor/prometheusoperator/prometheusrule/text",
            access: "clusterFeaturesPrometheusOperatorAccess",
          },
          {
            name: "PrometheusRule",
            hideInMenu: true,
            path: "/kubernetes/namespace/monitor/prometheus-operator/prometheusrule/:name/:action",
            component:
              "./kubernetes/namespace/monitor/prometheusoperator/prometheusrule/text",
            access: "clusterFeaturesPrometheusOperatorAccess",
          },
          {
            name: "ServiceMonitor",
            path: "/kubernetes/namespace/monitor/prometheus-operator/servicemonitor",
            component:
              "./kubernetes/namespace/monitor/prometheusoperator/servicemonitor",
            access: "clusterFeaturesPrometheusOperatorAccess",
          },
          {
            name: "ServiceMonitor",
            hideInMenu: true,
            path: "/kubernetes/namespace/monitor/prometheus-operator/servicemonitor/create/text",
            component:
              "./kubernetes/namespace/monitor/prometheusoperator/servicemonitor/text",
            access: "clusterFeaturesPrometheusOperatorAccess",
          },
          {
            name: "ServiceMonitor",
            hideInMenu: true,
            path: "/kubernetes/namespace/monitor/prometheus-operator/servicemonitor/:name/:action",
            component:
              "./kubernetes/namespace/monitor/prometheusoperator/servicemonitor/text",
            access: "clusterFeaturesPrometheusOperatorAccess",
          },
          {
            name: "PodMonitor",
            path: "/kubernetes/namespace/monitor/prometheus-operator/podmonitor",
            component:
              "./kubernetes/namespace/monitor/prometheusoperator/podmonitor",
            access: "clusterFeaturesPrometheusOperatorAccess",
          },
          {
            name: "PodMonitor",
            hideInMenu: true,
            path: "/kubernetes/namespace/monitor/prometheus-operator/podmonitor/create/text",
            component:
              "./kubernetes/namespace/monitor/prometheusoperator/podmonitor/text",
            access: "clusterFeaturesPrometheusOperatorAccess",
          },
          {
            name: "PodMonitor",
            hideInMenu: true,
            path: "/kubernetes/namespace/monitor/prometheus-operator/podmonitor/:name/:action",
            component:
              "./kubernetes/namespace/monitor/prometheusoperator/podmonitor/text",
            access: "clusterFeaturesPrometheusOperatorAccess",
          },
        ],
      },
    ],
  },
  {
    name: "monitor",
    hideInMenu: true,
    menuRender: false,
    path: "/kubernetes/namespace/application-instance/:id",
    access: "clusterNamespaceAccess",
    component: "./kubernetes/namespace/application_instance/detail",
  },
];

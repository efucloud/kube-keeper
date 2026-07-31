import type { IObjectMeta } from '@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta';
import {
  createTypeMetaGuard,
  Model,
  type ModelData,
  setValidateFunc,
} from '@kubernetes-models/base';
import type { ValidateFunc } from '@kubernetes-models/validate';
import { validate } from '../../_schemas/TektonDevV1beta1TaskRun';

/**
 * TaskRun represents a single execution of a Task. TaskRuns are how the steps
 * specified in a Task are executed; they specify the parameters and resources
 * used to run the steps in a Task.
 *
 * Deprecated: Please use v1.TaskRun instead.
 */
export interface ITaskRun {
  /**
   * APIVersion defines the versioned schema of this representation of an object.
   * Servers should convert recognized schemas to the latest internal value, and
   * may reject unrecognized values.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   */
  apiVersion: 'tekton.dev/v1beta1';
  /**
   * Kind is a string value representing the REST resource this object represents.
   * Servers may infer this from the endpoint the client submits requests to.
   * Cannot be updated.
   * In CamelCase.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   */
  kind: 'TaskRun';
  metadata?: IObjectMeta;
  /**
   * TaskRunSpec defines the desired state of TaskRun
   */
  spec?: {
    /**
     * Compute resources to use for this TaskRun
     */
    computeResources?: {
      /**
       * Claims lists the names of resources, defined in spec.resourceClaims,
       * that are used by this container.
       *
       * This is an alpha field and requires enabling the
       * DynamicResourceAllocation feature gate.
       *
       * This field is immutable. It can only be set for containers.
       */
      claims?: Array<{
        /**
         * Name must match the name of one entry in pod.spec.resourceClaims of
         * the Pod where this field is used. It makes that resource available
         * inside a container.
         */
        name: string;
        /**
         * Request is the name chosen for a request in the referenced claim.
         * If empty, everything from the claim is made available, otherwise
         * only the result of this request.
         */
        request?: string;
      }>;
      /**
       * Limits describes the maximum amount of compute resources allowed.
       * More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
       */
      limits?: {
        [key: string]: number | string;
      };
      /**
       * Requests describes the minimum amount of compute resources required.
       * If Requests is omitted for a container, it defaults to Limits if that is explicitly specified,
       * otherwise to an implementation-defined value. Requests cannot exceed Limits.
       * More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
       */
      requests?: {
        [key: string]: number | string;
      };
    };
    /**
     * TaskRunDebug defines the breakpoint config for a particular TaskRun
     */
    debug?: {
      /**
       * TaskBreakpoints defines the breakpoint config for a particular Task
       */
      breakpoints?: {
        beforeSteps?: Array<string>;
        /**
         * if enabled, pause TaskRun on failure of a step
         * failed step will not exit
         */
        onFailure?: string;
      };
    };
    /**
     * Params is a list of Param
     */
    params?: Array<{
      name: string;
      value: any;
    }>;
    /**
     * PodTemplate holds pod specific configuration
     */
    podTemplate?: {
      /**
       * If specified, the pod's scheduling constraints.
       * See Pod.spec.affinity (API version: v1)
       */
      affinity?: any;
      /**
       * AutomountServiceAccountToken indicates whether pods running as this
       * service account should have an API token automatically mounted.
       */
      automountServiceAccountToken?: boolean;
      /**
       * Specifies the DNS parameters of a pod.
       * Parameters specified here will be merged to the generated DNS
       * configuration based on DNSPolicy.
       */
      dnsConfig?: {
        /**
         * A list of DNS name server IP addresses.
         * This will be appended to the base nameservers generated from DNSPolicy.
         * Duplicated nameservers will be removed.
         */
        nameservers?: Array<string>;
        /**
         * A list of DNS resolver options.
         * This will be merged with the base options generated from DNSPolicy.
         * Duplicated entries will be removed. Resolution options given in Options
         * will override those that appear in the base DNSPolicy.
         */
        options?: Array<{
          /**
           * Name is this DNS resolver option's name.
           * Required.
           */
          name?: string;
          /**
           * Value is this DNS resolver option's value.
           */
          value?: string;
        }>;
        /**
         * A list of DNS search domains for host-name lookup.
         * This will be appended to the base search paths generated from DNSPolicy.
         * Duplicated search paths will be removed.
         */
        searches?: Array<string>;
      };
      /**
       * Set DNS policy for the pod. Defaults to "ClusterFirst". Valid values are
       * 'ClusterFirst', 'Default' or 'None'. DNS parameters given in DNSConfig
       * will be merged with the policy selected with DNSPolicy.
       */
      dnsPolicy?: string;
      /**
       * EnableServiceLinks indicates whether information about services should be injected into pod's
       * environment variables, matching the syntax of Docker links.
       * Optional: Defaults to true.
       */
      enableServiceLinks?: boolean;
      /**
       * List of environment variables that can be provided to the containers belonging to the pod.
       */
      env?: Array<{
        /**
         * Name of the environment variable. Must be a C_IDENTIFIER.
         */
        name: string;
        /**
         * Variable references $(VAR_NAME) are expanded
         * using the previously defined environment variables in the container and
         * any service environment variables. If a variable cannot be resolved,
         * the reference in the input string will be unchanged. Double $$ are reduced
         * to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e.
         * "$$(VAR_NAME)" will produce the string literal "$(VAR_NAME)".
         * Escaped references will never be expanded, regardless of whether the variable
         * exists or not.
         * Defaults to "".
         */
        value?: string;
        /**
         * Source for the environment variable's value. Cannot be used if value is not empty.
         */
        valueFrom?: {
          /**
           * Selects a key of a ConfigMap.
           */
          configMapKeyRef?: {
            /**
             * The key to select.
             */
            key: string;
            /**
             * Name of the referent.
             * This field is effectively required, but due to backwards compatibility is
             * allowed to be empty. Instances of this type with an empty value here are
             * almost certainly wrong.
             * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
             */
            name?: string;
            /**
             * Specify whether the ConfigMap or its key must be defined
             */
            optional?: boolean;
          };
          /**
           * Selects a field of the pod: supports metadata.name, metadata.namespace, `metadata.labels['<KEY>']`, `metadata.annotations['<KEY>']`,
           * spec.nodeName, spec.serviceAccountName, status.hostIP, status.podIP, status.podIPs.
           */
          fieldRef?: {
            /**
             * Version of the schema the FieldPath is written in terms of, defaults to "v1".
             */
            apiVersion?: string;
            /**
             * Path of the field to select in the specified API version.
             */
            fieldPath: string;
          };
          /**
           * Selects a resource of the container: only resources limits and requests
           * (limits.cpu, limits.memory, limits.ephemeral-storage, requests.cpu, requests.memory and requests.ephemeral-storage) are currently supported.
           */
          resourceFieldRef?: {
            /**
             * Container name: required for volumes, optional for env vars
             */
            containerName?: string;
            /**
             * Specifies the output format of the exposed resources, defaults to "1"
             */
            divisor?: number | string;
            /**
             * Required: resource to select
             */
            resource: string;
          };
          /**
           * Selects a key of a secret in the pod's namespace
           */
          secretKeyRef?: {
            /**
             * The key of the secret to select from.  Must be a valid secret key.
             */
            key: string;
            /**
             * Name of the referent.
             * This field is effectively required, but due to backwards compatibility is
             * allowed to be empty. Instances of this type with an empty value here are
             * almost certainly wrong.
             * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
             */
            name?: string;
            /**
             * Specify whether the Secret or its key must be defined
             */
            optional?: boolean;
          };
        };
      }>;
      /**
       * HostAliases is an optional list of hosts and IPs that will be injected into the pod's hosts
       * file if specified. This is only valid for non-hostNetwork pods.
       */
      hostAliases?: Array<{
        /**
         * Hostnames for the above IP address.
         */
        hostnames?: Array<string>;
        /**
         * IP address of the host file entry.
         */
        ip: string;
      }>;
      /**
       * HostNetwork specifies whether the pod may use the node network namespace
       */
      hostNetwork?: boolean;
      /**
       * ImagePullSecrets gives the name of the secret used by the pod to pull the image if specified
       */
      imagePullSecrets?: Array<{
        /**
         * Name of the referent.
         * This field is effectively required, but due to backwards compatibility is
         * allowed to be empty. Instances of this type with an empty value here are
         * almost certainly wrong.
         * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
         */
        name?: string;
      }>;
      /**
       * NodeSelector is a selector which must be true for the pod to fit on a node.
       * Selector which must match a node's labels for the pod to be scheduled on that node.
       * More info: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/
       */
      nodeSelector?: {
        [key: string]: string;
      };
      /**
       * If specified, indicates the pod's priority. "system-node-critical" and
       * "system-cluster-critical" are two special keywords which indicate the
       * highest priorities with the former being the highest priority. Any other
       * name must be defined by creating a PriorityClass object with that name.
       * If not specified, the pod priority will be default or zero if there is no
       * default.
       */
      priorityClassName?: string;
      /**
       * RuntimeClassName refers to a RuntimeClass object in the node.k8s.io
       * group, which should be used to run this pod. If no RuntimeClass resource
       * matches the named class, the pod will not be run. If unset or empty, the
       * "legacy" RuntimeClass will be used, which is an implicit class with an
       * empty definition that uses the default runtime handler.
       * More info: https://git.k8s.io/enhancements/keps/sig-node/runtime-class.md
       * This is a beta feature as of Kubernetes v1.14.
       */
      runtimeClassName?: string;
      /**
       * SchedulerName specifies the scheduler to be used to dispatch the Pod
       */
      schedulerName?: string;
      /**
       * SecurityContext holds pod-level security attributes and common container settings.
       * Optional: Defaults to empty.  See type description for default values of each field.
       * See Pod.spec.securityContext (API version: v1)
       */
      securityContext?: any;
      /**
       * If specified, the pod's tolerations.
       */
      tolerations?: Array<{
        /**
         * Effect indicates the taint effect to match. Empty means match all taint effects.
         * When specified, allowed values are NoSchedule, PreferNoSchedule and NoExecute.
         */
        effect?: string;
        /**
         * Key is the taint key that the toleration applies to. Empty means match all taint keys.
         * If the key is empty, operator must be Exists; this combination means to match all values and all keys.
         */
        key?: string;
        /**
         * Operator represents a key's relationship to the value.
         * Valid operators are Exists and Equal. Defaults to Equal.
         * Exists is equivalent to wildcard for value, so that a pod can
         * tolerate all taints of a particular category.
         */
        operator?: string;
        /**
         * TolerationSeconds represents the period of time the toleration (which must be
         * of effect NoExecute, otherwise this field is ignored) tolerates the taint. By default,
         * it is not set, which means tolerate the taint forever (do not evict). Zero and
         * negative values will be treated as 0 (evict immediately) by the system.
         */
        tolerationSeconds?: number;
        /**
         * Value is the taint value the toleration matches to.
         * If the operator is Exists, the value should be empty, otherwise just a regular string.
         */
        value?: string;
      }>;
      /**
       * TopologySpreadConstraints controls how Pods are spread across your cluster among
       * failure-domains such as regions, zones, nodes, and other user-defined topology domains.
       */
      topologySpreadConstraints?: Array<{
        /**
         * LabelSelector is used to find matching pods.
         * Pods that match this label selector are counted to determine the number of pods
         * in their corresponding topology domain.
         */
        labelSelector?: {
          /**
           * matchExpressions is a list of label selector requirements. The requirements are ANDed.
           */
          matchExpressions?: Array<{
            /**
             * key is the label key that the selector applies to.
             */
            key: string;
            /**
             * operator represents a key's relationship to a set of values.
             * Valid operators are In, NotIn, Exists and DoesNotExist.
             */
            operator: string;
            /**
             * values is an array of string values. If the operator is In or NotIn,
             * the values array must be non-empty. If the operator is Exists or DoesNotExist,
             * the values array must be empty. This array is replaced during a strategic
             * merge patch.
             */
            values?: Array<string>;
          }>;
          /**
           * matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels
           * map is equivalent to an element of matchExpressions, whose key field is "key", the
           * operator is "In", and the values array contains only "value". The requirements are ANDed.
           */
          matchLabels?: {
            [key: string]: string;
          };
        };
        /**
         * MatchLabelKeys is a set of pod label keys to select the pods over which
         * spreading will be calculated. The keys are used to lookup values from the
         * incoming pod labels, those key-value labels are ANDed with labelSelector
         * to select the group of existing pods over which spreading will be calculated
         * for the incoming pod. The same key is forbidden to exist in both MatchLabelKeys and LabelSelector.
         * MatchLabelKeys cannot be set when LabelSelector isn't set.
         * Keys that don't exist in the incoming pod labels will
         * be ignored. A null or empty list means only match against labelSelector.
         *
         * This is a beta field and requires the MatchLabelKeysInPodTopologySpread feature gate to be enabled (enabled by default).
         */
        matchLabelKeys?: Array<string>;
        /**
         * MaxSkew describes the degree to which pods may be unevenly distributed.
         * When `whenUnsatisfiable=DoNotSchedule`, it is the maximum permitted difference
         * between the number of matching pods in the target topology and the global minimum.
         * The global minimum is the minimum number of matching pods in an eligible domain
         * or zero if the number of eligible domains is less than MinDomains.
         * For example, in a 3-zone cluster, MaxSkew is set to 1, and pods with the same
         * labelSelector spread as 2/2/1:
         * In this case, the global minimum is 1.
         * | zone1 | zone2 | zone3 |
         * |  P P  |  P P  |   P   |
         * - if MaxSkew is 1, incoming pod can only be scheduled to zone3 to become 2/2/2;
         * scheduling it onto zone1(zone2) would make the ActualSkew(3-1) on zone1(zone2)
         * violate MaxSkew(1).
         * - if MaxSkew is 2, incoming pod can be scheduled onto any zone.
         * When `whenUnsatisfiable=ScheduleAnyway`, it is used to give higher precedence
         * to topologies that satisfy it.
         * It's a required field. Default value is 1 and 0 is not allowed.
         */
        maxSkew: number;
        /**
         * MinDomains indicates a minimum number of eligible domains.
         * When the number of eligible domains with matching topology keys is less than minDomains,
         * Pod Topology Spread treats "global minimum" as 0, and then the calculation of Skew is performed.
         * And when the number of eligible domains with matching topology keys equals or greater than minDomains,
         * this value has no effect on scheduling.
         * As a result, when the number of eligible domains is less than minDomains,
         * scheduler won't schedule more than maxSkew Pods to those domains.
         * If value is nil, the constraint behaves as if MinDomains is equal to 1.
         * Valid values are integers greater than 0.
         * When value is not nil, WhenUnsatisfiable must be DoNotSchedule.
         *
         * For example, in a 3-zone cluster, MaxSkew is set to 2, MinDomains is set to 5 and pods with the same
         * labelSelector spread as 2/2/2:
         * | zone1 | zone2 | zone3 |
         * |  P P  |  P P  |  P P  |
         * The number of domains is less than 5(MinDomains), so "global minimum" is treated as 0.
         * In this situation, new pod with the same labelSelector cannot be scheduled,
         * because computed skew will be 3(3 - 0) if new Pod is scheduled to any of the three zones,
         * it will violate MaxSkew.
         */
        minDomains?: number;
        /**
         * NodeAffinityPolicy indicates how we will treat Pod's nodeAffinity/nodeSelector
         * when calculating pod topology spread skew. Options are:
         * - Honor: only nodes matching nodeAffinity/nodeSelector are included in the calculations.
         * - Ignore: nodeAffinity/nodeSelector are ignored. All nodes are included in the calculations.
         *
         * If this value is nil, the behavior is equivalent to the Honor policy.
         * This is a beta-level feature default enabled by the NodeInclusionPolicyInPodTopologySpread feature flag.
         */
        nodeAffinityPolicy?: string;
        /**
         * NodeTaintsPolicy indicates how we will treat node taints when calculating
         * pod topology spread skew. Options are:
         * - Honor: nodes without taints, along with tainted nodes for which the incoming pod
         * has a toleration, are included.
         * - Ignore: node taints are ignored. All nodes are included.
         *
         * If this value is nil, the behavior is equivalent to the Ignore policy.
         * This is a beta-level feature default enabled by the NodeInclusionPolicyInPodTopologySpread feature flag.
         */
        nodeTaintsPolicy?: string;
        /**
         * TopologyKey is the key of node labels. Nodes that have a label with this key
         * and identical values are considered to be in the same topology.
         * We consider each <key, value> as a "bucket", and try to put balanced number
         * of pods into each bucket.
         * We define a domain as a particular instance of a topology.
         * Also, we define an eligible domain as a domain whose nodes meet the requirements of
         * nodeAffinityPolicy and nodeTaintsPolicy.
         * e.g. If TopologyKey is "kubernetes.io/hostname", each Node is a domain of that topology.
         * And, if TopologyKey is "topology.kubernetes.io/zone", each zone is a domain of that topology.
         * It's a required field.
         */
        topologyKey: string;
        /**
         * WhenUnsatisfiable indicates how to deal with a pod if it doesn't satisfy
         * the spread constraint.
         * - DoNotSchedule (default) tells the scheduler not to schedule it.
         * - ScheduleAnyway tells the scheduler to schedule the pod in any location,
         *   but giving higher precedence to topologies that would help reduce the
         *   skew.
         * A constraint is considered "Unsatisfiable" for an incoming pod
         * if and only if every possible node assignment for that pod would violate
         * "MaxSkew" on some topology.
         * For example, in a 3-zone cluster, MaxSkew is set to 1, and pods with the same
         * labelSelector spread as 3/1/1:
         * | zone1 | zone2 | zone3 |
         * | P P P |   P   |   P   |
         * If WhenUnsatisfiable is set to DoNotSchedule, incoming pod can only be scheduled
         * to zone2(zone3) to become 3/2/1(3/1/2) as ActualSkew(2-1) on zone2(zone3) satisfies
         * MaxSkew(1). In other words, the cluster can still be imbalanced, but scheduler
         * won't make it \*more\* imbalanced.
         * It's a required field.
         */
        whenUnsatisfiable: string;
      }>;
      /**
       * List of volumes that can be mounted by containers belonging to the pod.
       * More info: https://kubernetes.io/docs/concepts/storage/volumes
       * See Pod.spec.volumes (API version: v1)
       */
      volumes?: any;
    };
    /**
     * Deprecated: Unused, preserved only for backwards compatibility
     */
    resources?: {
      /**
       * Inputs holds the inputs resources this task was invoked with
       */
      inputs?: Array<{
        /**
         * Name is the name of the PipelineResource in the Pipeline's declaration
         */
        name?: string;
        /**
         * Paths will probably be removed in #1284, and then PipelineResourceBinding can be used instead.
         * The optional Path field corresponds to a path on disk at which the Resource can be found
         * (used when providing the resource via mounted volume, overriding the default logic to fetch the Resource).
         */
        paths?: Array<string>;
        /**
         * ResourceRef is a reference to the instance of the actual PipelineResource
         * that should be used
         */
        resourceRef?: {
          /**
           * API version of the referent
           */
          apiVersion?: string;
          /**
           * Name of the referent; More info: http://kubernetes.io/docs/user-guide/identifiers#names
           */
          name?: string;
        };
        /**
         * ResourceSpec is specification of a resource that should be created and
         * consumed by the task
         */
        resourceSpec?: {
          /**
           * Description is a user-facing description of the resource that may be
           * used to populate a UI.
           */
          description?: string;
          params: Array<{
            name: string;
            value: string;
          }>;
          /**
           * Secrets to fetch to populate some of resource fields
           */
          secrets?: Array<{
            fieldName: string;
            secretKey: string;
            secretName: string;
          }>;
          /**
           * PipelineResourceType represents the type of endpoint the pipelineResource is, so that the
           * controller will know this pipelineResource shouldx be fetched and optionally what
           * additional metatdata should be provided for it.
           *
           * Deprecated: Unused, preserved only for backwards compatibility
           */
          type: string;
        };
      }>;
      /**
       * Outputs holds the inputs resources this task was invoked with
       */
      outputs?: Array<{
        /**
         * Name is the name of the PipelineResource in the Pipeline's declaration
         */
        name?: string;
        /**
         * Paths will probably be removed in #1284, and then PipelineResourceBinding can be used instead.
         * The optional Path field corresponds to a path on disk at which the Resource can be found
         * (used when providing the resource via mounted volume, overriding the default logic to fetch the Resource).
         */
        paths?: Array<string>;
        /**
         * ResourceRef is a reference to the instance of the actual PipelineResource
         * that should be used
         */
        resourceRef?: {
          /**
           * API version of the referent
           */
          apiVersion?: string;
          /**
           * Name of the referent; More info: http://kubernetes.io/docs/user-guide/identifiers#names
           */
          name?: string;
        };
        /**
         * ResourceSpec is specification of a resource that should be created and
         * consumed by the task
         */
        resourceSpec?: {
          /**
           * Description is a user-facing description of the resource that may be
           * used to populate a UI.
           */
          description?: string;
          params: Array<{
            name: string;
            value: string;
          }>;
          /**
           * Secrets to fetch to populate some of resource fields
           */
          secrets?: Array<{
            fieldName: string;
            secretKey: string;
            secretName: string;
          }>;
          /**
           * PipelineResourceType represents the type of endpoint the pipelineResource is, so that the
           * controller will know this pipelineResource shouldx be fetched and optionally what
           * additional metatdata should be provided for it.
           *
           * Deprecated: Unused, preserved only for backwards compatibility
           */
          type: string;
        };
      }>;
    };
    /**
     * Retries represents how many times this TaskRun should be retried in the event of Task failure.
     */
    retries?: number;
    serviceAccountName?: string;
    /**
     * Overrides to apply to Sidecars in this TaskRun.
     * If a field is specified in both a Sidecar and a SidecarOverride,
     * the value from the SidecarOverride will be used.
     * This field is only supported when the alpha feature gate is enabled.
     */
    sidecarOverrides?: Array<{
      /**
       * The name of the Sidecar to override.
       */
      name: string;
      /**
       * The resource requirements to apply to the Sidecar.
       */
      resources: {
        /**
         * Claims lists the names of resources, defined in spec.resourceClaims,
         * that are used by this container.
         *
         * This is an alpha field and requires enabling the
         * DynamicResourceAllocation feature gate.
         *
         * This field is immutable. It can only be set for containers.
         */
        claims?: Array<{
          /**
           * Name must match the name of one entry in pod.spec.resourceClaims of
           * the Pod where this field is used. It makes that resource available
           * inside a container.
           */
          name: string;
          /**
           * Request is the name chosen for a request in the referenced claim.
           * If empty, everything from the claim is made available, otherwise
           * only the result of this request.
           */
          request?: string;
        }>;
        /**
         * Limits describes the maximum amount of compute resources allowed.
         * More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
         */
        limits?: {
          [key: string]: number | string;
        };
        /**
         * Requests describes the minimum amount of compute resources required.
         * If Requests is omitted for a container, it defaults to Limits if that is explicitly specified,
         * otherwise to an implementation-defined value. Requests cannot exceed Limits.
         * More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
         */
        requests?: {
          [key: string]: number | string;
        };
      };
    }>;
    /**
     * Used for cancelling a TaskRun (and maybe more later on)
     */
    status?: string;
    /**
     * Status message for cancellation.
     */
    statusMessage?: string;
    /**
     * Overrides to apply to Steps in this TaskRun.
     * If a field is specified in both a Step and a StepOverride,
     * the value from the StepOverride will be used.
     * This field is only supported when the alpha feature gate is enabled.
     */
    stepOverrides?: Array<{
      /**
       * The name of the Step to override.
       */
      name: string;
      /**
       * The resource requirements to apply to the Step.
       */
      resources: {
        /**
         * Claims lists the names of resources, defined in spec.resourceClaims,
         * that are used by this container.
         *
         * This is an alpha field and requires enabling the
         * DynamicResourceAllocation feature gate.
         *
         * This field is immutable. It can only be set for containers.
         */
        claims?: Array<{
          /**
           * Name must match the name of one entry in pod.spec.resourceClaims of
           * the Pod where this field is used. It makes that resource available
           * inside a container.
           */
          name: string;
          /**
           * Request is the name chosen for a request in the referenced claim.
           * If empty, everything from the claim is made available, otherwise
           * only the result of this request.
           */
          request?: string;
        }>;
        /**
         * Limits describes the maximum amount of compute resources allowed.
         * More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
         */
        limits?: {
          [key: string]: number | string;
        };
        /**
         * Requests describes the minimum amount of compute resources required.
         * If Requests is omitted for a container, it defaults to Limits if that is explicitly specified,
         * otherwise to an implementation-defined value. Requests cannot exceed Limits.
         * More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
         */
        requests?: {
          [key: string]: number | string;
        };
      };
    }>;
    /**
     * no more than one of the TaskRef and TaskSpec may be specified.
     */
    taskRef?: {
      /**
       * API version of the referent
       * Note: A Task with non-empty APIVersion and Kind is considered a Custom Task
       */
      apiVersion?: string;
      /**
       * Bundle url reference to a Tekton Bundle.
       *
       * Deprecated: Please use ResolverRef with the bundles resolver instead.
       * The field is staying there for go client backward compatibility, but is not used/allowed anymore.
       */
      bundle?: string;
      /**
       * TaskKind indicates the Kind of the Task:
       * 1. Namespaced Task when Kind is set to "Task". If Kind is "", it defaults to "Task".
       * 2. Custom Task when Kind is non-empty and APIVersion is non-empty
       */
      kind?: string;
      /**
       * Name of the referent; More info: http://kubernetes.io/docs/user-guide/identifiers#names
       */
      name?: string;
      /**
       * Params contains the parameters used to identify the
       * referenced Tekton resource. Example entries might include
       * "repo" or "path" but the set of params ultimately depends on
       * the chosen resolver.
       */
      params?: Array<{
        name: string;
        value: any;
      }>;
      /**
       * Resolver is the name of the resolver that should perform
       * resolution of the referenced Tekton resource, such as "git".
       */
      resolver?: string;
    };
    /**
     * Specifying TaskSpec can be disabled by setting
     * `disable-inline-spec` feature flag.
     * See Task.spec (API version: tekton.dev/v1beta1)
     */
    taskSpec?: any;
    /**
     * Time after which one retry attempt times out. Defaults to 1 hour.
     * Refer Go's ParseDuration documentation for expected format: https://golang.org/pkg/time/#ParseDuration
     */
    timeout?: string;
    /**
     * Workspaces is a list of WorkspaceBindings from volumes to workspaces.
     */
    workspaces?: Array<{
      /**
       * ConfigMap represents a configMap that should populate this workspace.
       */
      configMap?: {
        /**
         * defaultMode is optional: mode bits used to set permissions on created files by default.
         * Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511.
         * YAML accepts both octal and decimal values, JSON requires decimal values for mode bits.
         * Defaults to 0644.
         * Directories within the path are not affected by this setting.
         * This might be in conflict with other options that affect the file
         * mode, like fsGroup, and the result can be other mode bits set.
         */
        defaultMode?: number;
        /**
         * items if unspecified, each key-value pair in the Data field of the referenced
         * ConfigMap will be projected into the volume as a file whose name is the
         * key and content is the value. If specified, the listed keys will be
         * projected into the specified paths, and unlisted keys will not be
         * present. If a key is specified which is not present in the ConfigMap,
         * the volume setup will error unless it is marked optional. Paths must be
         * relative and may not contain the '..' path or start with '..'.
         */
        items?: Array<{
          /**
           * key is the key to project.
           */
          key: string;
          /**
           * mode is Optional: mode bits used to set permissions on this file.
           * Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511.
           * YAML accepts both octal and decimal values, JSON requires decimal values for mode bits.
           * If not specified, the volume defaultMode will be used.
           * This might be in conflict with other options that affect the file
           * mode, like fsGroup, and the result can be other mode bits set.
           */
          mode?: number;
          /**
           * path is the relative path of the file to map the key to.
           * May not be an absolute path.
           * May not contain the path element '..'.
           * May not start with the string '..'.
           */
          path: string;
        }>;
        /**
         * Name of the referent.
         * This field is effectively required, but due to backwards compatibility is
         * allowed to be empty. Instances of this type with an empty value here are
         * almost certainly wrong.
         * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
         */
        name?: string;
        /**
         * optional specify whether the ConfigMap or its keys must be defined
         */
        optional?: boolean;
      };
      /**
       * CSI (Container Storage Interface) represents ephemeral storage that is handled by certain external CSI drivers.
       */
      csi?: {
        /**
         * driver is the name of the CSI driver that handles this volume.
         * Consult with your admin for the correct name as registered in the cluster.
         */
        driver: string;
        /**
         * fsType to mount. Ex. "ext4", "xfs", "ntfs".
         * If not provided, the empty value is passed to the associated CSI driver
         * which will determine the default filesystem to apply.
         */
        fsType?: string;
        /**
         * nodePublishSecretRef is a reference to the secret object containing
         * sensitive information to pass to the CSI driver to complete the CSI
         * NodePublishVolume and NodeUnpublishVolume calls.
         * This field is optional, and  may be empty if no secret is required. If the
         * secret object contains more than one secret, all secret references are passed.
         */
        nodePublishSecretRef?: {
          /**
           * Name of the referent.
           * This field is effectively required, but due to backwards compatibility is
           * allowed to be empty. Instances of this type with an empty value here are
           * almost certainly wrong.
           * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
           */
          name?: string;
        };
        /**
         * readOnly specifies a read-only configuration for the volume.
         * Defaults to false (read/write).
         */
        readOnly?: boolean;
        /**
         * volumeAttributes stores driver-specific properties that are passed to the CSI
         * driver. Consult your driver's documentation for supported values.
         */
        volumeAttributes?: {
          [key: string]: string;
        };
      };
      /**
       * EmptyDir represents a temporary directory that shares a Task's lifetime.
       * More info: https://kubernetes.io/docs/concepts/storage/volumes#emptydir
       * Either this OR PersistentVolumeClaim can be used.
       */
      emptyDir?: {
        /**
         * medium represents what type of storage medium should back this directory.
         * The default is "" which means to use the node's default medium.
         * Must be an empty string (default) or Memory.
         * More info: https://kubernetes.io/docs/concepts/storage/volumes#emptydir
         */
        medium?: string;
        /**
         * sizeLimit is the total amount of local storage required for this EmptyDir volume.
         * The size limit is also applicable for memory medium.
         * The maximum usage on memory medium EmptyDir would be the minimum value between
         * the SizeLimit specified here and the sum of memory limits of all containers in a pod.
         * The default is nil which means that the limit is undefined.
         * More info: https://kubernetes.io/docs/concepts/storage/volumes#emptydir
         */
        sizeLimit?: number | string;
      };
      /**
       * Name is the name of the workspace populated by the volume.
       */
      name: string;
      /**
       * PersistentVolumeClaimVolumeSource represents a reference to a
       * PersistentVolumeClaim in the same namespace. Either this OR EmptyDir can be used.
       */
      persistentVolumeClaim?: {
        /**
         * claimName is the name of a PersistentVolumeClaim in the same namespace as the pod using this volume.
         * More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims
         */
        claimName: string;
        /**
         * readOnly Will force the ReadOnly setting in VolumeMounts.
         * Default false.
         */
        readOnly?: boolean;
      };
      /**
       * Projected represents a projected volume that should populate this workspace.
       */
      projected?: {
        /**
         * defaultMode are the mode bits used to set permissions on created files by default.
         * Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511.
         * YAML accepts both octal and decimal values, JSON requires decimal values for mode bits.
         * Directories within the path are not affected by this setting.
         * This might be in conflict with other options that affect the file
         * mode, like fsGroup, and the result can be other mode bits set.
         */
        defaultMode?: number;
        /**
         * sources is the list of volume projections. Each entry in this list
         * handles one source.
         */
        sources?: Array<{
          /**
           * ClusterTrustBundle allows a pod to access the `.spec.trustBundle` field
           * of ClusterTrustBundle objects in an auto-updating file.
           *
           * Alpha, gated by the ClusterTrustBundleProjection feature gate.
           *
           * ClusterTrustBundle objects can either be selected by name, or by the
           * combination of signer name and a label selector.
           *
           * Kubelet performs aggressive normalization of the PEM contents written
           * into the pod filesystem.  Esoteric PEM features such as inter-block
           * comments and block headers are stripped.  Certificates are deduplicated.
           * The ordering of certificates within the file is arbitrary, and Kubelet
           * may change the order over time.
           */
          clusterTrustBundle?: {
            /**
             * Select all ClusterTrustBundles that match this label selector.  Only has
             * effect if signerName is set.  Mutually-exclusive with name.  If unset,
             * interpreted as "match nothing".  If set but empty, interpreted as "match
             * everything".
             */
            labelSelector?: {
              /**
               * matchExpressions is a list of label selector requirements. The requirements are ANDed.
               */
              matchExpressions?: Array<{
                /**
                 * key is the label key that the selector applies to.
                 */
                key: string;
                /**
                 * operator represents a key's relationship to a set of values.
                 * Valid operators are In, NotIn, Exists and DoesNotExist.
                 */
                operator: string;
                /**
                 * values is an array of string values. If the operator is In or NotIn,
                 * the values array must be non-empty. If the operator is Exists or DoesNotExist,
                 * the values array must be empty. This array is replaced during a strategic
                 * merge patch.
                 */
                values?: Array<string>;
              }>;
              /**
               * matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels
               * map is equivalent to an element of matchExpressions, whose key field is "key", the
               * operator is "In", and the values array contains only "value". The requirements are ANDed.
               */
              matchLabels?: {
                [key: string]: string;
              };
            };
            /**
             * Select a single ClusterTrustBundle by object name.  Mutually-exclusive
             * with signerName and labelSelector.
             */
            name?: string;
            /**
             * If true, don't block pod startup if the referenced ClusterTrustBundle(s)
             * aren't available.  If using name, then the named ClusterTrustBundle is
             * allowed not to exist.  If using signerName, then the combination of
             * signerName and labelSelector is allowed to match zero
             * ClusterTrustBundles.
             */
            optional?: boolean;
            /**
             * Relative path from the volume root to write the bundle.
             */
            path: string;
            /**
             * Select all ClusterTrustBundles that match this signer name.
             * Mutually-exclusive with name.  The contents of all selected
             * ClusterTrustBundles will be unified and deduplicated.
             */
            signerName?: string;
          };
          /**
           * configMap information about the configMap data to project
           */
          configMap?: {
            /**
             * items if unspecified, each key-value pair in the Data field of the referenced
             * ConfigMap will be projected into the volume as a file whose name is the
             * key and content is the value. If specified, the listed keys will be
             * projected into the specified paths, and unlisted keys will not be
             * present. If a key is specified which is not present in the ConfigMap,
             * the volume setup will error unless it is marked optional. Paths must be
             * relative and may not contain the '..' path or start with '..'.
             */
            items?: Array<{
              /**
               * key is the key to project.
               */
              key: string;
              /**
               * mode is Optional: mode bits used to set permissions on this file.
               * Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511.
               * YAML accepts both octal and decimal values, JSON requires decimal values for mode bits.
               * If not specified, the volume defaultMode will be used.
               * This might be in conflict with other options that affect the file
               * mode, like fsGroup, and the result can be other mode bits set.
               */
              mode?: number;
              /**
               * path is the relative path of the file to map the key to.
               * May not be an absolute path.
               * May not contain the path element '..'.
               * May not start with the string '..'.
               */
              path: string;
            }>;
            /**
             * Name of the referent.
             * This field is effectively required, but due to backwards compatibility is
             * allowed to be empty. Instances of this type with an empty value here are
             * almost certainly wrong.
             * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
             */
            name?: string;
            /**
             * optional specify whether the ConfigMap or its keys must be defined
             */
            optional?: boolean;
          };
          /**
           * downwardAPI information about the downwardAPI data to project
           */
          downwardAPI?: {
            /**
             * Items is a list of DownwardAPIVolume file
             */
            items?: Array<{
              /**
               * Required: Selects a field of the pod: only annotations, labels, name, namespace and uid are supported.
               */
              fieldRef?: {
                /**
                 * Version of the schema the FieldPath is written in terms of, defaults to "v1".
                 */
                apiVersion?: string;
                /**
                 * Path of the field to select in the specified API version.
                 */
                fieldPath: string;
              };
              /**
               * Optional: mode bits used to set permissions on this file, must be an octal value
               * between 0000 and 0777 or a decimal value between 0 and 511.
               * YAML accepts both octal and decimal values, JSON requires decimal values for mode bits.
               * If not specified, the volume defaultMode will be used.
               * This might be in conflict with other options that affect the file
               * mode, like fsGroup, and the result can be other mode bits set.
               */
              mode?: number;
              /**
               * Required: Path is  the relative path name of the file to be created. Must not be absolute or contain the '..' path. Must be utf-8 encoded. The first item of the relative path must not start with '..'
               */
              path: string;
              /**
               * Selects a resource of the container: only resources limits and requests
               * (limits.cpu, limits.memory, requests.cpu and requests.memory) are currently supported.
               */
              resourceFieldRef?: {
                /**
                 * Container name: required for volumes, optional for env vars
                 */
                containerName?: string;
                /**
                 * Specifies the output format of the exposed resources, defaults to "1"
                 */
                divisor?: number | string;
                /**
                 * Required: resource to select
                 */
                resource: string;
              };
            }>;
          };
          /**
           * secret information about the secret data to project
           */
          secret?: {
            /**
             * items if unspecified, each key-value pair in the Data field of the referenced
             * Secret will be projected into the volume as a file whose name is the
             * key and content is the value. If specified, the listed keys will be
             * projected into the specified paths, and unlisted keys will not be
             * present. If a key is specified which is not present in the Secret,
             * the volume setup will error unless it is marked optional. Paths must be
             * relative and may not contain the '..' path or start with '..'.
             */
            items?: Array<{
              /**
               * key is the key to project.
               */
              key: string;
              /**
               * mode is Optional: mode bits used to set permissions on this file.
               * Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511.
               * YAML accepts both octal and decimal values, JSON requires decimal values for mode bits.
               * If not specified, the volume defaultMode will be used.
               * This might be in conflict with other options that affect the file
               * mode, like fsGroup, and the result can be other mode bits set.
               */
              mode?: number;
              /**
               * path is the relative path of the file to map the key to.
               * May not be an absolute path.
               * May not contain the path element '..'.
               * May not start with the string '..'.
               */
              path: string;
            }>;
            /**
             * Name of the referent.
             * This field is effectively required, but due to backwards compatibility is
             * allowed to be empty. Instances of this type with an empty value here are
             * almost certainly wrong.
             * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
             */
            name?: string;
            /**
             * optional field specify whether the Secret or its key must be defined
             */
            optional?: boolean;
          };
          /**
           * serviceAccountToken is information about the serviceAccountToken data to project
           */
          serviceAccountToken?: {
            /**
             * audience is the intended audience of the token. A recipient of a token
             * must identify itself with an identifier specified in the audience of the
             * token, and otherwise should reject the token. The audience defaults to the
             * identifier of the apiserver.
             */
            audience?: string;
            /**
             * expirationSeconds is the requested duration of validity of the service
             * account token. As the token approaches expiration, the kubelet volume
             * plugin will proactively rotate the service account token. The kubelet will
             * start trying to rotate the token if the token is older than 80 percent of
             * its time to live or if the token is older than 24 hours.Defaults to 1 hour
             * and must be at least 10 minutes.
             */
            expirationSeconds?: number;
            /**
             * path is the path relative to the mount point of the file to project the
             * token into.
             */
            path: string;
          };
        }>;
      };
      /**
       * Secret represents a secret that should populate this workspace.
       */
      secret?: {
        /**
         * defaultMode is Optional: mode bits used to set permissions on created files by default.
         * Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511.
         * YAML accepts both octal and decimal values, JSON requires decimal values
         * for mode bits. Defaults to 0644.
         * Directories within the path are not affected by this setting.
         * This might be in conflict with other options that affect the file
         * mode, like fsGroup, and the result can be other mode bits set.
         */
        defaultMode?: number;
        /**
         * items If unspecified, each key-value pair in the Data field of the referenced
         * Secret will be projected into the volume as a file whose name is the
         * key and content is the value. If specified, the listed keys will be
         * projected into the specified paths, and unlisted keys will not be
         * present. If a key is specified which is not present in the Secret,
         * the volume setup will error unless it is marked optional. Paths must be
         * relative and may not contain the '..' path or start with '..'.
         */
        items?: Array<{
          /**
           * key is the key to project.
           */
          key: string;
          /**
           * mode is Optional: mode bits used to set permissions on this file.
           * Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511.
           * YAML accepts both octal and decimal values, JSON requires decimal values for mode bits.
           * If not specified, the volume defaultMode will be used.
           * This might be in conflict with other options that affect the file
           * mode, like fsGroup, and the result can be other mode bits set.
           */
          mode?: number;
          /**
           * path is the relative path of the file to map the key to.
           * May not be an absolute path.
           * May not contain the path element '..'.
           * May not start with the string '..'.
           */
          path: string;
        }>;
        /**
         * optional field specify whether the Secret or its keys must be defined
         */
        optional?: boolean;
        /**
         * secretName is the name of the secret in the pod's namespace to use.
         * More info: https://kubernetes.io/docs/concepts/storage/volumes#secret
         */
        secretName?: string;
      };
      /**
       * SubPath is optionally a directory on the volume which should be used
       * for this binding (i.e. the volume will be mounted at this sub directory).
       */
      subPath?: string;
      /**
       * VolumeClaimTemplate is a template for a claim that will be created in the same namespace.
       * The PipelineRun controller is responsible for creating a unique claim for each instance of PipelineRun.
       * See PersistentVolumeClaim (API version: v1)
       */
      volumeClaimTemplate?: any;
    }>;
  };
  /**
   * TaskRunStatus defines the observed state of TaskRun
   */
  status?: {
    /**
     * Annotations is additional Status fields for the Resource to save some
     * additional State as well as convey more information to the user. This is
     * roughly akin to Annotations on any k8s resource, just the reconciler conveying
     * richer information outwards.
     */
    annotations?: {
      [key: string]: string;
    };
    /**
     * CloudEvents describe the state of each cloud event requested via a
     * CloudEventResource.
     *
     * Deprecated: Removed in v0.44.0.
     */
    cloudEvents?: Array<{
      /**
       * CloudEventDeliveryState reports the state of a cloud event to be sent.
       */
      status?: {
        /**
         * Current status
         */
        condition?: string;
        /**
         * Error is the text of error (if any)
         */
        message: string;
        /**
         * RetryCount is the number of attempts of sending the cloud event
         */
        retryCount: number;
        /**
         * SentAt is the time at which the last attempt to send the event was made
         */
        sentAt?: string;
      };
      /**
       * Target points to an addressable
       */
      target?: string;
    }>;
    /**
     * CompletionTime is the time the build completed.
     */
    completionTime?: string;
    /**
     * Conditions the latest available observations of a resource's current state.
     */
    conditions?: Array<{
      /**
       * LastTransitionTime is the last time the condition transitioned from one status to another.
       * We use VolatileTime in place of metav1.Time to exclude this from creating equality.Semantic
       * differences (all other things held constant).
       */
      lastTransitionTime?: string;
      /**
       * A human readable message indicating details about the transition.
       */
      message?: string;
      /**
       * The reason for the condition's last transition.
       */
      reason?: string;
      /**
       * Severity with which to treat failures of this type of condition.
       * When this is not specified, it defaults to Error.
       */
      severity?: string;
      /**
       * Status of the condition, one of True, False, Unknown.
       */
      status: string;
      /**
       * Type of condition.
       */
      type: string;
    }>;
    /**
     * ObservedGeneration is the 'Generation' of the Service that
     * was last processed by the controller.
     */
    observedGeneration?: number;
    /**
     * PodName is the name of the pod responsible for executing this task's steps.
     */
    podName: string;
    /**
     * Provenance contains some key authenticated metadata about how a software artifact was built (what sources, what inputs/outputs, etc.).
     */
    provenance?: {
      /**
       * Deprecated: Use RefSource instead
       */
      configSource?: {
        /**
         * Digest is a collection of cryptographic digests for the contents of the artifact specified by URI.
         * Example: {"sha1": "f99d13e554ffcb696dee719fa85b695cb5b0f428"}
         */
        digest?: {
          [key: string]: string;
        };
        /**
         * EntryPoint identifies the entry point into the build. This is often a path to a
         * build definition file and/or a target label within that file.
         * Example: "task/git-clone/0.8/git-clone.yaml"
         */
        entryPoint?: string;
        /**
         * URI indicates the identity of the source of the build definition.
         * Example: "https://github.com/tektoncd/catalog"
         */
        uri?: string;
      };
      /**
       * FeatureFlags identifies the feature flags that were used during the task/pipeline run
       */
      featureFlags?: {
        awaitSidecarReadiness?: boolean;
        coschedule?: string;
        disableCredsInit?: boolean;
        disableInlineSpec?: string;
        enableAPIFields?: string;
        enableArtifacts?: boolean;
        enableCELInWhenExpression?: boolean;
        enableConciseResolverSyntax?: boolean;
        enableKeepPodOnCancel?: boolean;
        enableKubernetesSidecar?: boolean;
        enableParamEnum?: boolean;
        enableProvenanceInStatus?: boolean;
        /**
         * EnableStepActions is a no-op flag since StepActions are stable
         */
        enableStepActions?: boolean;
        enforceNonfalsifiability?: string;
        maxResultSize?: number;
        requireGitSSHSecretKnownHosts?: boolean;
        resultExtractionMethod?: string;
        runningInEnvWithInjectedSidecars?: boolean;
        sendCloudEventsForRuns?: boolean;
        setSecurityContext?: boolean;
        setSecurityContextReadOnlyRootFilesystem?: boolean;
        /**
         * VerificationNoMatchPolicy is the feature flag for "trusted-resources-verification-no-match-policy"
         * VerificationNoMatchPolicy can be set to "ignore", "warn" and "fail" values.
         * ignore: skip trusted resources verification when no matching verification policies found
         * warn: skip trusted resources verification when no matching verification policies found and log a warning
         * fail: fail the taskrun or pipelines run if no matching verification policies found
         */
        verificationNoMatchPolicy?: string;
      };
      /**
       * RefSource identifies the source where a remote task/pipeline came from.
       */
      refSource?: {
        /**
         * Digest is a collection of cryptographic digests for the contents of the artifact specified by URI.
         * Example: {"sha1": "f99d13e554ffcb696dee719fa85b695cb5b0f428"}
         */
        digest?: {
          [key: string]: string;
        };
        /**
         * EntryPoint identifies the entry point into the build. This is often a path to a
         * build definition file and/or a target label within that file.
         * Example: "task/git-clone/0.8/git-clone.yaml"
         */
        entryPoint?: string;
        /**
         * URI indicates the identity of the source of the build definition.
         * Example: "https://github.com/tektoncd/catalog"
         */
        uri?: string;
      };
    };
    /**
     * Results from Resources built during the TaskRun.
     * This is tomb-stoned along with the removal of pipelineResources
     * Deprecated: this field is not populated and is preserved only for backwards compatibility
     */
    resourcesResult?: Array<{
      key: string;
      /**
       * ResourceName may be used in tests, but it is not populated in termination messages.
       * It is preserved here for backwards compatibility and will not be ported to v1.
       */
      resourceName?: string;
      /**
       * ResultType used to find out whether a RunResult is from a task result or not
       * Note that ResultsType is another type which is used to define the data type
       * (e.g. string, array, etc) we used for Results
       */
      type?: number;
      value: string;
    }>;
    /**
     * RetriesStatus contains the history of TaskRunStatus in case of a retry in order to keep record of failures.
     * All TaskRunStatus stored in RetriesStatus will have no date within the RetriesStatus as is redundant.
     * See TaskRun.status (API version: tekton.dev/v1beta1)
     */
    retriesStatus?: any;
    /**
     * The list has one entry per sidecar in the manifest. Each entry is
     * represents the imageid of the corresponding sidecar.
     */
    sidecars?: Array<{
      container?: string;
      imageID?: string;
      name?: string;
      /**
       * Details about a running container
       */
      running?: {
        /**
         * Time at which the container was last (re-)started
         */
        startedAt?: string;
      };
      /**
       * Details about a terminated container
       */
      terminated?: {
        /**
         * Container's ID in the format '<type>://<container_id>'
         */
        containerID?: string;
        /**
         * Exit status from the last termination of the container
         */
        exitCode: number;
        /**
         * Time at which the container last terminated
         */
        finishedAt?: string;
        /**
         * Message regarding the last termination of the container
         */
        message?: string;
        /**
         * (brief) reason from the last termination of the container
         */
        reason?: string;
        /**
         * Signal from the last termination of the container
         */
        signal?: number;
        /**
         * Time at which previous execution of the container started
         */
        startedAt?: string;
      };
      /**
       * Details about a waiting container
       */
      waiting?: {
        /**
         * Message regarding why the container is not yet running.
         */
        message?: string;
        /**
         * (brief) reason the container is not yet running.
         */
        reason?: string;
      };
    }>;
    /**
     * SpanContext contains tracing span context fields
     */
    spanContext?: {
      [key: string]: string;
    };
    /**
     * StartTime is the time the build is actually started.
     */
    startTime?: string;
    /**
     * Steps describes the state of each build step container.
     */
    steps?: Array<{
      container?: string;
      imageID?: string;
      inputs?: Array<{
        /**
         * Indicate if the artifact is a build output or a by-product
         */
        buildOutput?: boolean;
        /**
         * The artifact's identifying category name
         */
        name?: string;
        /**
         * A collection of values related to the artifact
         */
        values?: Array<{
          digest?: {
            [key: string]: string;
          };
          uri?: string;
        }>;
      }>;
      name?: string;
      outputs?: Array<{
        /**
         * Indicate if the artifact is a build output or a by-product
         */
        buildOutput?: boolean;
        /**
         * The artifact's identifying category name
         */
        name?: string;
        /**
         * A collection of values related to the artifact
         */
        values?: Array<{
          digest?: {
            [key: string]: string;
          };
          uri?: string;
        }>;
      }>;
      /**
       * Provenance contains metadata about resources used in the TaskRun/PipelineRun
       * such as the source from where a remote build definition was fetched.
       * This field aims to carry minimum amoumt of metadata in \*Run status so that
       * Tekton Chains can capture them in the provenance.
       */
      provenance?: {
        /**
         * Deprecated: Use RefSource instead
         */
        configSource?: {
          /**
           * Digest is a collection of cryptographic digests for the contents of the artifact specified by URI.
           * Example: {"sha1": "f99d13e554ffcb696dee719fa85b695cb5b0f428"}
           */
          digest?: {
            [key: string]: string;
          };
          /**
           * EntryPoint identifies the entry point into the build. This is often a path to a
           * build definition file and/or a target label within that file.
           * Example: "task/git-clone/0.8/git-clone.yaml"
           */
          entryPoint?: string;
          /**
           * URI indicates the identity of the source of the build definition.
           * Example: "https://github.com/tektoncd/catalog"
           */
          uri?: string;
        };
        /**
         * FeatureFlags identifies the feature flags that were used during the task/pipeline run
         */
        featureFlags?: {
          awaitSidecarReadiness?: boolean;
          coschedule?: string;
          disableCredsInit?: boolean;
          disableInlineSpec?: string;
          enableAPIFields?: string;
          enableArtifacts?: boolean;
          enableCELInWhenExpression?: boolean;
          enableConciseResolverSyntax?: boolean;
          enableKeepPodOnCancel?: boolean;
          enableKubernetesSidecar?: boolean;
          enableParamEnum?: boolean;
          enableProvenanceInStatus?: boolean;
          /**
           * EnableStepActions is a no-op flag since StepActions are stable
           */
          enableStepActions?: boolean;
          enforceNonfalsifiability?: string;
          maxResultSize?: number;
          requireGitSSHSecretKnownHosts?: boolean;
          resultExtractionMethod?: string;
          runningInEnvWithInjectedSidecars?: boolean;
          sendCloudEventsForRuns?: boolean;
          setSecurityContext?: boolean;
          setSecurityContextReadOnlyRootFilesystem?: boolean;
          /**
           * VerificationNoMatchPolicy is the feature flag for "trusted-resources-verification-no-match-policy"
           * VerificationNoMatchPolicy can be set to "ignore", "warn" and "fail" values.
           * ignore: skip trusted resources verification when no matching verification policies found
           * warn: skip trusted resources verification when no matching verification policies found and log a warning
           * fail: fail the taskrun or pipelines run if no matching verification policies found
           */
          verificationNoMatchPolicy?: string;
        };
        /**
         * RefSource identifies the source where a remote task/pipeline came from.
         */
        refSource?: {
          /**
           * Digest is a collection of cryptographic digests for the contents of the artifact specified by URI.
           * Example: {"sha1": "f99d13e554ffcb696dee719fa85b695cb5b0f428"}
           */
          digest?: {
            [key: string]: string;
          };
          /**
           * EntryPoint identifies the entry point into the build. This is often a path to a
           * build definition file and/or a target label within that file.
           * Example: "task/git-clone/0.8/git-clone.yaml"
           */
          entryPoint?: string;
          /**
           * URI indicates the identity of the source of the build definition.
           * Example: "https://github.com/tektoncd/catalog"
           */
          uri?: string;
        };
      };
      results?: Array<{
        /**
         * Name the given name
         */
        name: string;
        /**
         * Type is the user-specified type of the result. The possible type
         * is currently "string" and will support "array" in following work.
         */
        type?: string;
        /**
         * Value the given value of the result
         */
        value: any;
      }>;
      /**
       * Details about a running container
       */
      running?: {
        /**
         * Time at which the container was last (re-)started
         */
        startedAt?: string;
      };
      /**
       * Details about a terminated container
       */
      terminated?: {
        /**
         * Container's ID in the format '<type>://<container_id>'
         */
        containerID?: string;
        /**
         * Exit status from the last termination of the container
         */
        exitCode: number;
        /**
         * Time at which the container last terminated
         */
        finishedAt?: string;
        /**
         * Message regarding the last termination of the container
         */
        message?: string;
        /**
         * (brief) reason from the last termination of the container
         */
        reason?: string;
        /**
         * Signal from the last termination of the container
         */
        signal?: number;
        /**
         * Time at which previous execution of the container started
         */
        startedAt?: string;
      };
      /**
       * Details about a waiting container
       */
      waiting?: {
        /**
         * Message regarding why the container is not yet running.
         */
        message?: string;
        /**
         * (brief) reason the container is not yet running.
         */
        reason?: string;
      };
    }>;
    /**
     * TaskRunResults are the list of results written out by the task's containers
     */
    taskResults?: Array<{
      /**
       * Name the given name
       */
      name: string;
      /**
       * Type is the user-specified type of the result. The possible type
       * is currently "string" and will support "array" in following work.
       */
      type?: string;
      /**
       * Value the given value of the result
       */
      value: any;
    }>;
    /**
     * TaskSpec contains the Spec from the dereferenced Task definition used to instantiate this TaskRun.
     * See Task.spec (API version tekton.dev/v1beta1)
     */
    taskSpec?: any;
  };
}

/**
 * TaskRun represents a single execution of a Task. TaskRuns are how the steps
 * specified in a Task are executed; they specify the parameters and resources
 * used to run the steps in a Task.
 *
 * Deprecated: Please use v1.TaskRun instead.
 */
export class TaskRun extends Model<ITaskRun> implements ITaskRun {
  apiVersion: ITaskRun['apiVersion'];
  kind: ITaskRun['kind'];
  metadata?: ITaskRun['metadata'];
  spec?: ITaskRun['spec'];
  status?: ITaskRun['status'];

  static apiVersion: ITaskRun['apiVersion'] = 'tekton.dev/v1beta1';
  static kind: ITaskRun['kind'] = 'TaskRun';
  static is = createTypeMetaGuard<ITaskRun>(TaskRun);

  constructor(data?: ModelData<ITaskRun>) {
    super();

    this.setDefinedProps({
      apiVersion: TaskRun.apiVersion,
      kind: TaskRun.kind,
      ...data,
    } as ITaskRun);
  }
}

setValidateFunc(TaskRun, validate as ValidateFunc<ITaskRun>);

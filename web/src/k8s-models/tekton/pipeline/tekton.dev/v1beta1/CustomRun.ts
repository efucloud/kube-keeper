import type { IObjectMeta } from '@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta';
import {
  createTypeMetaGuard,
  Model,
  type ModelData,
  setValidateFunc,
} from '@kubernetes-models/base';
import type { ValidateFunc } from '@kubernetes-models/validate';
import { validate } from '../../_schemas/TektonDevV1beta1CustomRun';

/**
 * CustomRun represents a single execution of a Custom Task.
 */
export interface ICustomRun {
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
  kind: 'CustomRun';
  metadata?: IObjectMeta;
  /**
   * CustomRunSpec defines the desired state of CustomRun
   */
  spec?: {
    /**
     * TaskRef can be used to refer to a specific instance of a task.
     */
    customRef?: {
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
     * Spec is a specification of a custom task
     */
    customSpec?: {
      apiVersion?: string;
      kind?: string;
      /**
       * PipelineTaskMetadata contains the labels or annotations for an EmbeddedTask
       */
      metadata?: {
        annotations?: {
          [key: string]: string;
        };
        labels?: {
          [key: string]: string;
        };
      };
      /**
       * Spec is a specification of a custom task
       */
      spec?: {};
    };
    /**
     * Params is a list of Param
     */
    params?: Array<{
      name: string;
      value: any;
    }>;
    /**
     * Used for propagating retries count to custom tasks
     */
    retries?: number;
    serviceAccountName?: string;
    /**
     * Used for cancelling a customrun (and maybe more later on)
     */
    status?: string;
    /**
     * Status message for cancellation.
     */
    statusMessage?: string;
    /**
     * Time after which the custom-task times out.
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
   * CustomRunStatus defines the observed state of CustomRun
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
     * ExtraFields holds arbitrary fields provided by the custom task
     * controller.
     */
    extraFields?: any;
    /**
     * ObservedGeneration is the 'Generation' of the Service that
     * was last processed by the controller.
     */
    observedGeneration?: number;
    /**
     * Results reports any output result values to be consumed by later
     * tasks in a pipeline.
     */
    results?: Array<{
      /**
       * Name the given name
       */
      name: string;
      /**
       * Value the given value of the result
       */
      value: string;
    }>;
    /**
     * RetriesStatus contains the history of CustomRunStatus, in case of a retry.
     * See CustomRun.status (API version: tekton.dev/v1beta1)
     */
    retriesStatus?: any;
    /**
     * StartTime is the time the build is actually started.
     */
    startTime?: string;
  };
}

/**
 * CustomRun represents a single execution of a Custom Task.
 */
export class CustomRun extends Model<ICustomRun> implements ICustomRun {
  apiVersion: ICustomRun['apiVersion'];
  kind: ICustomRun['kind'];
  metadata?: ICustomRun['metadata'];
  spec?: ICustomRun['spec'];
  status?: ICustomRun['status'];

  static apiVersion: ICustomRun['apiVersion'] = 'tekton.dev/v1beta1';
  static kind: ICustomRun['kind'] = 'CustomRun';
  static is = createTypeMetaGuard<ICustomRun>(CustomRun);

  constructor(data?: ModelData<ICustomRun>) {
    super();

    this.setDefinedProps({
      apiVersion: CustomRun.apiVersion,
      kind: CustomRun.kind,
      ...data,
    } as ICustomRun);
  }
}

setValidateFunc(CustomRun, validate as ValidateFunc<ICustomRun>);

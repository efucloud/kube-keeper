import type { IObjectMeta } from '@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta';
import {
  createTypeMetaGuard,
  Model,
  type ModelData,
  setValidateFunc,
} from '@kubernetes-models/base';
import type { ValidateFunc } from '@kubernetes-models/validate';
import { validate } from '../../_schemas/TrainerKubeflowOrgV1alpha1TrainJob';

/**
 * TrainJob represents configuration of a training job.
 */
export interface ITrainJob {
  /**
   * APIVersion defines the versioned schema of this representation of an object.
   * Servers should convert recognized schemas to the latest internal value, and
   * may reject unrecognized values.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   */
  apiVersion: 'trainer.kubeflow.org/v1alpha1';
  /**
   * Kind is a string value representing the REST resource this object represents.
   * Servers may infer this from the endpoint the client submits requests to.
   * Cannot be updated.
   * In CamelCase.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   */
  kind: 'TrainJob';
  metadata?: IObjectMeta;
  /**
   * Specification of the desired TrainJob.
   */
  spec?: {
    /**
     * Annotations to apply for the derivative JobSet and Jobs.
     * They will be merged with the TrainingRuntime values.
     */
    annotations?: {
      [key: string]: string;
    };
    /**
     * Configuration of the initializer.
     */
    initializer?: {
      /**
       * Configuration of the dataset initialization and pre-processing.
       */
      dataset?: {
        /**
         * List of environment variables to set in the dataset initializer container.
         * These values will be merged with the TrainingRuntime's dataset initializer environments.
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
         * Reference to the secret with credentials to download dataset.
         * Secret must be created in the TrainJob's namespace.
         */
        secretRef?: {
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
         * Storage uri for the dataset provider.
         */
        storageUri?: string;
      };
      /**
       * Configuration of the pre-trained model initialization
       */
      model?: {
        /**
         * List of environment variables to set in the model initializer container.
         * These values will be merged with the TrainingRuntime's model initializer environments.
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
         * Reference to the secret with credentials to download model.
         * Secret must be created in the TrainJob's namespace.
         */
        secretRef?: {
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
         * Storage uri for the model provider.
         */
        storageUri?: string;
      };
    };
    /**
     * Labels to apply for the derivative JobSet and Jobs.
     * They will be merged with the TrainingRuntime values.
     */
    labels?: {
      [key: string]: string;
    };
    /**
     * ManagedBy is used to indicate the controller or entity that manages a TrainJob.
     * The value must be either an empty, `trainer.kubeflow.org/trainjob-controller` or
     * `kueue.x-k8s.io/multikueue`. The built-in TrainJob controller reconciles TrainJob which
     * don't have this field at all or the field value is the reserved string
     * `trainer.kubeflow.org/trainjob-controller`, but delegates reconciling TrainJobs
     * with a 'kueue.x-k8s.io/multikueue' to the Kueue. The field is immutable.
     * Defaults to `trainer.kubeflow.org/trainjob-controller`
     */
    managedBy?: string;
    /**
     * Custom overrides for the training runtime.
     */
    podSpecOverrides?: Array<{
      /**
       * Overrides for the containers in the target job templates.
       */
      containers?: Array<{
        /**
         * List of environment variables to set in the container.
         * These values will be merged with the TrainingRuntime's environments.
         * These values can't be set for container with the name: `node`, `dataset-initializer`, or
         * `model-initializer`. For those containers the envs can only be set via Trainer or Initializer APIs.
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
         * Name for the container. TrainingRuntime must have this container.
         */
        name: string;
        /**
         * Pod volumes to mount into the container's filesystem.
         */
        volumeMounts?: Array<{
          /**
           * Path within the container at which the volume should be mounted.  Must
           * not contain ':'.
           */
          mountPath: string;
          /**
           * mountPropagation determines how mounts are propagated from the host
           * to container and the other way around.
           * When not set, MountPropagationNone is used.
           * This field is beta in 1.10.
           * When RecursiveReadOnly is set to IfPossible or to Enabled, MountPropagation must be None or unspecified
           * (which defaults to None).
           */
          mountPropagation?: string;
          /**
           * This must match the Name of a Volume.
           */
          name: string;
          /**
           * Mounted read-only if true, read-write otherwise (false or unspecified).
           * Defaults to false.
           */
          readOnly?: boolean;
          /**
           * RecursiveReadOnly specifies whether read-only mounts should be handled
           * recursively.
           *
           * If ReadOnly is false, this field has no meaning and must be unspecified.
           *
           * If ReadOnly is true, and this field is set to Disabled, the mount is not made
           * recursively read-only.  If this field is set to IfPossible, the mount is made
           * recursively read-only, if it is supported by the container runtime.  If this
           * field is set to Enabled, the mount is made recursively read-only if it is
           * supported by the container runtime, otherwise the pod will not be started and
           * an error will be generated to indicate the reason.
           *
           * If this field is set to IfPossible or Enabled, MountPropagation must be set to
           * None (or be unspecified, which defaults to None).
           *
           * If this field is not specified, it is treated as an equivalent of Disabled.
           */
          recursiveReadOnly?: string;
          /**
           * Path within the volume from which the container's volume should be mounted.
           * Defaults to "" (volume's root).
           */
          subPath?: string;
          /**
           * Expanded path within the volume from which the container's volume should be mounted.
           * Behaves similarly to SubPath but environment variable references $(VAR_NAME) are expanded using the container's environment.
           * Defaults to "" (volume's root).
           * SubPathExpr and SubPath are mutually exclusive.
           */
          subPathExpr?: string;
        }>;
      }>;
      /**
       * Overrides for the init container in the target job templates.
       */
      initContainers?: Array<{
        /**
         * List of environment variables to set in the container.
         * These values will be merged with the TrainingRuntime's environments.
         * These values can't be set for container with the name: `node`, `dataset-initializer`, or
         * `model-initializer`. For those containers the envs can only be set via Trainer or Initializer APIs.
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
         * Name for the container. TrainingRuntime must have this container.
         */
        name: string;
        /**
         * Pod volumes to mount into the container's filesystem.
         */
        volumeMounts?: Array<{
          /**
           * Path within the container at which the volume should be mounted.  Must
           * not contain ':'.
           */
          mountPath: string;
          /**
           * mountPropagation determines how mounts are propagated from the host
           * to container and the other way around.
           * When not set, MountPropagationNone is used.
           * This field is beta in 1.10.
           * When RecursiveReadOnly is set to IfPossible or to Enabled, MountPropagation must be None or unspecified
           * (which defaults to None).
           */
          mountPropagation?: string;
          /**
           * This must match the Name of a Volume.
           */
          name: string;
          /**
           * Mounted read-only if true, read-write otherwise (false or unspecified).
           * Defaults to false.
           */
          readOnly?: boolean;
          /**
           * RecursiveReadOnly specifies whether read-only mounts should be handled
           * recursively.
           *
           * If ReadOnly is false, this field has no meaning and must be unspecified.
           *
           * If ReadOnly is true, and this field is set to Disabled, the mount is not made
           * recursively read-only.  If this field is set to IfPossible, the mount is made
           * recursively read-only, if it is supported by the container runtime.  If this
           * field is set to Enabled, the mount is made recursively read-only if it is
           * supported by the container runtime, otherwise the pod will not be started and
           * an error will be generated to indicate the reason.
           *
           * If this field is set to IfPossible or Enabled, MountPropagation must be set to
           * None (or be unspecified, which defaults to None).
           *
           * If this field is not specified, it is treated as an equivalent of Disabled.
           */
          recursiveReadOnly?: string;
          /**
           * Path within the volume from which the container's volume should be mounted.
           * Defaults to "" (volume's root).
           */
          subPath?: string;
          /**
           * Expanded path within the volume from which the container's volume should be mounted.
           * Behaves similarly to SubPath but environment variable references $(VAR_NAME) are expanded using the container's environment.
           * Defaults to "" (volume's root).
           * SubPathExpr and SubPath are mutually exclusive.
           */
          subPathExpr?: string;
        }>;
      }>;
      /**
       * Override for the node selector to place Pod on the specific node.
       */
      nodeSelector?: {
        [key: string]: string;
      };
      /**
       * SchedulingGates overrides the scheduling gates of the Pods in the target job templates.
       * More info: https://kubernetes.io/docs/concepts/scheduling-eviction/pod-scheduling-readiness/
       */
      schedulingGates?: Array<{
        /**
         * Name of the scheduling gate.
         * Each scheduling gate must have a unique name field.
         */
        name: string;
      }>;
      /**
       * Override for the service account.
       */
      serviceAccountName?: string;
      /**
       * TrainJobs is the training job replicas in the training runtime template to apply the overrides.
       */
      targetJobs: Array<{
        /**
         * Name is the target training job name for which the PodSpec is overridden.
         */
        name: string;
      }>;
      /**
       * Override for the Pod's tolerations.
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
       * Overrides for the Pod volume configurations.
       */
      volumes?: Array<{
        /**
         * awsElasticBlockStore represents an AWS Disk resource that is attached to a
         * kubelet's host machine and then exposed to the pod.
         * Deprecated: AWSElasticBlockStore is deprecated. All operations for the in-tree
         * awsElasticBlockStore type are redirected to the ebs.csi.aws.com CSI driver.
         * More info: https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore
         */
        awsElasticBlockStore?: {
          /**
           * fsType is the filesystem type of the volume that you want to mount.
           * Tip: Ensure that the filesystem type is supported by the host operating system.
           * Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.
           * More info: https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore
           */
          fsType?: string;
          /**
           * partition is the partition in the volume that you want to mount.
           * If omitted, the default is to mount by volume name.
           * Examples: For volume /dev/sda1, you specify the partition as "1".
           * Similarly, the volume partition for /dev/sda is "0" (or you can leave the property empty).
           */
          partition?: number;
          /**
           * readOnly value true will force the readOnly setting in VolumeMounts.
           * More info: https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore
           */
          readOnly?: boolean;
          /**
           * volumeID is unique ID of the persistent disk resource in AWS (Amazon EBS volume).
           * More info: https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore
           */
          volumeID: string;
        };
        /**
         * azureDisk represents an Azure Data Disk mount on the host and bind mount to the pod.
         * Deprecated: AzureDisk is deprecated. All operations for the in-tree azureDisk type
         * are redirected to the disk.csi.azure.com CSI driver.
         */
        azureDisk?: {
          /**
           * cachingMode is the Host Caching mode: None, Read Only, Read Write.
           */
          cachingMode?: string;
          /**
           * diskName is the Name of the data disk in the blob storage
           */
          diskName: string;
          /**
           * diskURI is the URI of data disk in the blob storage
           */
          diskURI: string;
          /**
           * fsType is Filesystem type to mount.
           * Must be a filesystem type supported by the host operating system.
           * Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.
           */
          fsType?: string;
          /**
           * kind expected values are Shared: multiple blob disks per storage account  Dedicated: single blob disk per storage account  Managed: azure managed data disk (only in managed availability set). defaults to shared
           */
          kind?: string;
          /**
           * readOnly Defaults to false (read/write). ReadOnly here will force
           * the ReadOnly setting in VolumeMounts.
           */
          readOnly?: boolean;
        };
        /**
         * azureFile represents an Azure File Service mount on the host and bind mount to the pod.
         * Deprecated: AzureFile is deprecated. All operations for the in-tree azureFile type
         * are redirected to the file.csi.azure.com CSI driver.
         */
        azureFile?: {
          /**
           * readOnly defaults to false (read/write). ReadOnly here will force
           * the ReadOnly setting in VolumeMounts.
           */
          readOnly?: boolean;
          /**
           * secretName is the  name of secret that contains Azure Storage Account Name and Key
           */
          secretName: string;
          /**
           * shareName is the azure share Name
           */
          shareName: string;
        };
        /**
         * cephFS represents a Ceph FS mount on the host that shares a pod's lifetime.
         * Deprecated: CephFS is deprecated and the in-tree cephfs type is no longer supported.
         */
        cephfs?: {
          /**
           * monitors is Required: Monitors is a collection of Ceph monitors
           * More info: https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it
           */
          monitors: Array<string>;
          /**
           * path is Optional: Used as the mounted root, rather than the full Ceph tree, default is /
           */
          path?: string;
          /**
           * readOnly is Optional: Defaults to false (read/write). ReadOnly here will force
           * the ReadOnly setting in VolumeMounts.
           * More info: https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it
           */
          readOnly?: boolean;
          /**
           * secretFile is Optional: SecretFile is the path to key ring for User, default is /etc/ceph/user.secret
           * More info: https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it
           */
          secretFile?: string;
          /**
           * secretRef is Optional: SecretRef is reference to the authentication secret for User, default is empty.
           * More info: https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it
           */
          secretRef?: {
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
           * user is optional: User is the rados user name, default is admin
           * More info: https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it
           */
          user?: string;
        };
        /**
         * cinder represents a cinder volume attached and mounted on kubelets host machine.
         * Deprecated: Cinder is deprecated. All operations for the in-tree cinder type
         * are redirected to the cinder.csi.openstack.org CSI driver.
         * More info: https://examples.k8s.io/mysql-cinder-pd/README.md
         */
        cinder?: {
          /**
           * fsType is the filesystem type to mount.
           * Must be a filesystem type supported by the host operating system.
           * Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.
           * More info: https://examples.k8s.io/mysql-cinder-pd/README.md
           */
          fsType?: string;
          /**
           * readOnly defaults to false (read/write). ReadOnly here will force
           * the ReadOnly setting in VolumeMounts.
           * More info: https://examples.k8s.io/mysql-cinder-pd/README.md
           */
          readOnly?: boolean;
          /**
           * secretRef is optional: points to a secret object containing parameters used to connect
           * to OpenStack.
           */
          secretRef?: {
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
           * volumeID used to identify the volume in cinder.
           * More info: https://examples.k8s.io/mysql-cinder-pd/README.md
           */
          volumeID: string;
        };
        /**
         * configMap represents a configMap that should populate this volume
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
         * csi (Container Storage Interface) represents ephemeral storage that is handled by certain external CSI drivers.
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
         * downwardAPI represents downward API about the pod that should populate this volume
         */
        downwardAPI?: {
          /**
           * Optional: mode bits to use on created files by default. Must be a
           * Optional: mode bits used to set permissions on created files by default.
           * Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511.
           * YAML accepts both octal and decimal values, JSON requires decimal values for mode bits.
           * Defaults to 0644.
           * Directories within the path are not affected by this setting.
           * This might be in conflict with other options that affect the file
           * mode, like fsGroup, and the result can be other mode bits set.
           */
          defaultMode?: number;
          /**
           * Items is a list of downward API volume file
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
         * emptyDir represents a temporary directory that shares a pod's lifetime.
         * More info: https://kubernetes.io/docs/concepts/storage/volumes#emptydir
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
         * ephemeral represents a volume that is handled by a cluster storage driver.
         * The volume's lifecycle is tied to the pod that defines it - it will be created before the pod starts,
         * and deleted when the pod is removed.
         *
         * Use this if:
         * a) the volume is only needed while the pod runs,
         * b) features of normal volumes like restoring from snapshot or capacity
         *    tracking are needed,
         * c) the storage driver is specified through a storage class, and
         * d) the storage driver supports dynamic volume provisioning through
         *    a PersistentVolumeClaim (see EphemeralVolumeSource for more
         *    information on the connection between this volume type
         *    and PersistentVolumeClaim).
         *
         * Use PersistentVolumeClaim or one of the vendor-specific
         * APIs for volumes that persist for longer than the lifecycle
         * of an individual pod.
         *
         * Use CSI for light-weight local ephemeral volumes if the CSI driver is meant to
         * be used that way - see the documentation of the driver for
         * more information.
         *
         * A pod can use both types of ephemeral volumes and
         * persistent volumes at the same time.
         */
        ephemeral?: {
          /**
           * Will be used to create a stand-alone PVC to provision the volume.
           * The pod in which this EphemeralVolumeSource is embedded will be the
           * owner of the PVC, i.e. the PVC will be deleted together with the
           * pod.  The name of the PVC will be `<pod name>-<volume name>` where
           * `<volume name>` is the name from the `PodSpec.Volumes` array
           * entry. Pod validation will reject the pod if the concatenated name
           * is not valid for a PVC (for example, too long).
           *
           * An existing PVC with that name that is not owned by the pod
           * will \*not\* be used for the pod to avoid using an unrelated
           * volume by mistake. Starting the pod is then blocked until
           * the unrelated PVC is removed. If such a pre-created PVC is
           * meant to be used by the pod, the PVC has to updated with an
           * owner reference to the pod once the pod exists. Normally
           * this should not be necessary, but it may be useful when
           * manually reconstructing a broken cluster.
           *
           * This field is read-only and no changes will be made by Kubernetes
           * to the PVC after it has been created.
           *
           * Required, must not be nil.
           */
          volumeClaimTemplate?: {
            /**
             * May contain labels and annotations that will be copied into the PVC
             * when creating it. No other fields are allowed and will be rejected during
             * validation.
             */
            metadata?: {
              annotations?: {
                [key: string]: string;
              };
              finalizers?: Array<string>;
              labels?: {
                [key: string]: string;
              };
              name?: string;
              namespace?: string;
            };
            /**
             * The specification for the PersistentVolumeClaim. The entire content is
             * copied unchanged into the PVC that gets created from this
             * template. The same fields as in a PersistentVolumeClaim
             * are also valid here.
             */
            spec: {
              /**
               * accessModes contains the desired access modes the volume should have.
               * More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#access-modes-1
               */
              accessModes?: Array<string>;
              /**
               * dataSource field can be used to specify either:
               * \* An existing VolumeSnapshot object (snapshot.storage.k8s.io/VolumeSnapshot)
               * \* An existing PVC (PersistentVolumeClaim)
               * If the provisioner or an external controller can support the specified data source,
               * it will create a new volume based on the contents of the specified data source.
               * When the AnyVolumeDataSource feature gate is enabled, dataSource contents will be copied to dataSourceRef,
               * and dataSourceRef contents will be copied to dataSource when dataSourceRef.namespace is not specified.
               * If the namespace is specified, then dataSourceRef will not be copied to dataSource.
               */
              dataSource?: {
                /**
                 * APIGroup is the group for the resource being referenced.
                 * If APIGroup is not specified, the specified Kind must be in the core API group.
                 * For any other third-party types, APIGroup is required.
                 */
                apiGroup?: string;
                /**
                 * Kind is the type of resource being referenced
                 */
                kind: string;
                /**
                 * Name is the name of resource being referenced
                 */
                name: string;
              };
              /**
               * dataSourceRef specifies the object from which to populate the volume with data, if a non-empty
               * volume is desired. This may be any object from a non-empty API group (non
               * core object) or a PersistentVolumeClaim object.
               * When this field is specified, volume binding will only succeed if the type of
               * the specified object matches some installed volume populator or dynamic
               * provisioner.
               * This field will replace the functionality of the dataSource field and as such
               * if both fields are non-empty, they must have the same value. For backwards
               * compatibility, when namespace isn't specified in dataSourceRef,
               * both fields (dataSource and dataSourceRef) will be set to the same
               * value automatically if one of them is empty and the other is non-empty.
               * When namespace is specified in dataSourceRef,
               * dataSource isn't set to the same value and must be empty.
               * There are three important differences between dataSource and dataSourceRef:
               * \* While dataSource only allows two specific types of objects, dataSourceRef
               *   allows any non-core object, as well as PersistentVolumeClaim objects.
               * \* While dataSource ignores disallowed values (dropping them), dataSourceRef
               *   preserves all values, and generates an error if a disallowed value is
               *   specified.
               * \* While dataSource only allows local objects, dataSourceRef allows objects
               *   in any namespaces.
               * (Beta) Using this field requires the AnyVolumeDataSource feature gate to be enabled.
               * (Alpha) Using the namespace field of dataSourceRef requires the CrossNamespaceVolumeDataSource feature gate to be enabled.
               */
              dataSourceRef?: {
                /**
                 * APIGroup is the group for the resource being referenced.
                 * If APIGroup is not specified, the specified Kind must be in the core API group.
                 * For any other third-party types, APIGroup is required.
                 */
                apiGroup?: string;
                /**
                 * Kind is the type of resource being referenced
                 */
                kind: string;
                /**
                 * Name is the name of resource being referenced
                 */
                name: string;
                /**
                 * Namespace is the namespace of resource being referenced
                 * Note that when a namespace is specified, a gateway.networking.k8s.io/ReferenceGrant object is required in the referent namespace to allow that namespace's owner to accept the reference. See the ReferenceGrant documentation for details.
                 * (Alpha) This field requires the CrossNamespaceVolumeDataSource feature gate to be enabled.
                 */
                namespace?: string;
              };
              /**
               * resources represents the minimum resources the volume should have.
               * If RecoverVolumeExpansionFailure feature is enabled users are allowed to specify resource requirements
               * that are lower than previous value but must still be higher than capacity recorded in the
               * status field of the claim.
               * More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#resources
               */
              resources?: {
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
               * selector is a label query over volumes to consider for binding.
               */
              selector?: {
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
               * storageClassName is the name of the StorageClass required by the claim.
               * More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#class-1
               */
              storageClassName?: string;
              /**
               * volumeAttributesClassName may be used to set the VolumeAttributesClass used by this claim.
               * If specified, the CSI driver will create or update the volume with the attributes defined
               * in the corresponding VolumeAttributesClass. This has a different purpose than storageClassName,
               * it can be changed after the claim is created. An empty string value means that no VolumeAttributesClass
               * will be applied to the claim but it's not allowed to reset this field to empty string once it is set.
               * If unspecified and the PersistentVolumeClaim is unbound, the default VolumeAttributesClass
               * will be set by the persistentvolume controller if it exists.
               * If the resource referred to by volumeAttributesClass does not exist, this PersistentVolumeClaim will be
               * set to a Pending state, as reflected by the modifyVolumeStatus field, until such as a resource
               * exists.
               * More info: https://kubernetes.io/docs/concepts/storage/volume-attributes-classes/
               * (Beta) Using this field requires the VolumeAttributesClass feature gate to be enabled (off by default).
               */
              volumeAttributesClassName?: string;
              /**
               * volumeMode defines what type of volume is required by the claim.
               * Value of Filesystem is implied when not included in claim spec.
               */
              volumeMode?: string;
              /**
               * volumeName is the binding reference to the PersistentVolume backing this claim.
               */
              volumeName?: string;
            };
          };
        };
        /**
         * fc represents a Fibre Channel resource that is attached to a kubelet's host machine and then exposed to the pod.
         */
        fc?: {
          /**
           * fsType is the filesystem type to mount.
           * Must be a filesystem type supported by the host operating system.
           * Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.
           */
          fsType?: string;
          /**
           * lun is Optional: FC target lun number
           */
          lun?: number;
          /**
           * readOnly is Optional: Defaults to false (read/write). ReadOnly here will force
           * the ReadOnly setting in VolumeMounts.
           */
          readOnly?: boolean;
          /**
           * targetWWNs is Optional: FC target worldwide names (WWNs)
           */
          targetWWNs?: Array<string>;
          /**
           * wwids Optional: FC volume world wide identifiers (wwids)
           * Either wwids or combination of targetWWNs and lun must be set, but not both simultaneously.
           */
          wwids?: Array<string>;
        };
        /**
         * flexVolume represents a generic volume resource that is
         * provisioned/attached using an exec based plugin.
         * Deprecated: FlexVolume is deprecated. Consider using a CSIDriver instead.
         */
        flexVolume?: {
          /**
           * driver is the name of the driver to use for this volume.
           */
          driver: string;
          /**
           * fsType is the filesystem type to mount.
           * Must be a filesystem type supported by the host operating system.
           * Ex. "ext4", "xfs", "ntfs". The default filesystem depends on FlexVolume script.
           */
          fsType?: string;
          /**
           * options is Optional: this field holds extra command options if any.
           */
          options?: {
            [key: string]: string;
          };
          /**
           * readOnly is Optional: defaults to false (read/write). ReadOnly here will force
           * the ReadOnly setting in VolumeMounts.
           */
          readOnly?: boolean;
          /**
           * secretRef is Optional: secretRef is reference to the secret object containing
           * sensitive information to pass to the plugin scripts. This may be
           * empty if no secret object is specified. If the secret object
           * contains more than one secret, all secrets are passed to the plugin
           * scripts.
           */
          secretRef?: {
            /**
             * Name of the referent.
             * This field is effectively required, but due to backwards compatibility is
             * allowed to be empty. Instances of this type with an empty value here are
             * almost certainly wrong.
             * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
             */
            name?: string;
          };
        };
        /**
         * flocker represents a Flocker volume attached to a kubelet's host machine. This depends on the Flocker control service being running.
         * Deprecated: Flocker is deprecated and the in-tree flocker type is no longer supported.
         */
        flocker?: {
          /**
           * datasetName is Name of the dataset stored as metadata -> name on the dataset for Flocker
           * should be considered as deprecated
           */
          datasetName?: string;
          /**
           * datasetUUID is the UUID of the dataset. This is unique identifier of a Flocker dataset
           */
          datasetUUID?: string;
        };
        /**
         * gcePersistentDisk represents a GCE Disk resource that is attached to a
         * kubelet's host machine and then exposed to the pod.
         * Deprecated: GCEPersistentDisk is deprecated. All operations for the in-tree
         * gcePersistentDisk type are redirected to the pd.csi.storage.gke.io CSI driver.
         * More info: https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk
         */
        gcePersistentDisk?: {
          /**
           * fsType is filesystem type of the volume that you want to mount.
           * Tip: Ensure that the filesystem type is supported by the host operating system.
           * Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.
           * More info: https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk
           */
          fsType?: string;
          /**
           * partition is the partition in the volume that you want to mount.
           * If omitted, the default is to mount by volume name.
           * Examples: For volume /dev/sda1, you specify the partition as "1".
           * Similarly, the volume partition for /dev/sda is "0" (or you can leave the property empty).
           * More info: https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk
           */
          partition?: number;
          /**
           * pdName is unique name of the PD resource in GCE. Used to identify the disk in GCE.
           * More info: https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk
           */
          pdName: string;
          /**
           * readOnly here will force the ReadOnly setting in VolumeMounts.
           * Defaults to false.
           * More info: https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk
           */
          readOnly?: boolean;
        };
        /**
         * gitRepo represents a git repository at a particular revision.
         * Deprecated: GitRepo is deprecated. To provision a container with a git repo, mount an
         * EmptyDir into an InitContainer that clones the repo using git, then mount the EmptyDir
         * into the Pod's container.
         */
        gitRepo?: {
          /**
           * directory is the target directory name.
           * Must not contain or start with '..'.  If '.' is supplied, the volume directory will be the
           * git repository.  Otherwise, if specified, the volume will contain the git repository in
           * the subdirectory with the given name.
           */
          directory?: string;
          /**
           * repository is the URL
           */
          repository: string;
          /**
           * revision is the commit hash for the specified revision.
           */
          revision?: string;
        };
        /**
         * glusterfs represents a Glusterfs mount on the host that shares a pod's lifetime.
         * Deprecated: Glusterfs is deprecated and the in-tree glusterfs type is no longer supported.
         * More info: https://examples.k8s.io/volumes/glusterfs/README.md
         */
        glusterfs?: {
          /**
           * endpoints is the endpoint name that details Glusterfs topology.
           * More info: https://examples.k8s.io/volumes/glusterfs/README.md#create-a-pod
           */
          endpoints: string;
          /**
           * path is the Glusterfs volume path.
           * More info: https://examples.k8s.io/volumes/glusterfs/README.md#create-a-pod
           */
          path: string;
          /**
           * readOnly here will force the Glusterfs volume to be mounted with read-only permissions.
           * Defaults to false.
           * More info: https://examples.k8s.io/volumes/glusterfs/README.md#create-a-pod
           */
          readOnly?: boolean;
        };
        /**
         * hostPath represents a pre-existing file or directory on the host
         * machine that is directly exposed to the container. This is generally
         * used for system agents or other privileged things that are allowed
         * to see the host machine. Most containers will NOT need this.
         * More info: https://kubernetes.io/docs/concepts/storage/volumes#hostpath
         */
        hostPath?: {
          /**
           * path of the directory on the host.
           * If the path is a symlink, it will follow the link to the real path.
           * More info: https://kubernetes.io/docs/concepts/storage/volumes#hostpath
           */
          path: string;
          /**
           * type for HostPath Volume
           * Defaults to ""
           * More info: https://kubernetes.io/docs/concepts/storage/volumes#hostpath
           */
          type?: string;
        };
        /**
         * image represents an OCI object (a container image or artifact) pulled and mounted on the kubelet's host machine.
         * The volume is resolved at pod startup depending on which PullPolicy value is provided:
         *
         * - Always: the kubelet always attempts to pull the reference. Container creation will fail If the pull fails.
         * - Never: the kubelet never pulls the reference and only uses a local image or artifact. Container creation will fail if the reference isn't present.
         * - IfNotPresent: the kubelet pulls if the reference isn't already present on disk. Container creation will fail if the reference isn't present and the pull fails.
         *
         * The volume gets re-resolved if the pod gets deleted and recreated, which means that new remote content will become available on pod recreation.
         * A failure to resolve or pull the image during pod startup will block containers from starting and may add significant latency. Failures will be retried using normal volume backoff and will be reported on the pod reason and message.
         * The types of objects that may be mounted by this volume are defined by the container runtime implementation on a host machine and at minimum must include all valid types supported by the container image field.
         * The OCI object gets mounted in a single directory (spec.containers[\*].volumeMounts.mountPath) by merging the manifest layers in the same way as for container images.
         * The volume will be mounted read-only (ro) and non-executable files (noexec).
         * Sub path mounts for containers are not supported (spec.containers[\*].volumeMounts.subpath).
         * The field spec.securityContext.fsGroupChangePolicy has no effect on this volume type.
         */
        image?: {
          /**
           * Policy for pulling OCI objects. Possible values are:
           * Always: the kubelet always attempts to pull the reference. Container creation will fail If the pull fails.
           * Never: the kubelet never pulls the reference and only uses a local image or artifact. Container creation will fail if the reference isn't present.
           * IfNotPresent: the kubelet pulls if the reference isn't already present on disk. Container creation will fail if the reference isn't present and the pull fails.
           * Defaults to Always if :latest tag is specified, or IfNotPresent otherwise.
           */
          pullPolicy?: string;
          /**
           * Required: Image or artifact reference to be used.
           * Behaves in the same way as pod.spec.containers[\*].image.
           * Pull secrets will be assembled in the same way as for the container image by looking up node credentials, SA image pull secrets, and pod spec image pull secrets.
           * More info: https://kubernetes.io/docs/concepts/containers/images
           * This field is optional to allow higher level config management to default or override
           * container images in workload controllers like Deployments and StatefulSets.
           */
          reference?: string;
        };
        /**
         * iscsi represents an ISCSI Disk resource that is attached to a
         * kubelet's host machine and then exposed to the pod.
         * More info: https://examples.k8s.io/volumes/iscsi/README.md
         */
        iscsi?: {
          /**
           * chapAuthDiscovery defines whether support iSCSI Discovery CHAP authentication
           */
          chapAuthDiscovery?: boolean;
          /**
           * chapAuthSession defines whether support iSCSI Session CHAP authentication
           */
          chapAuthSession?: boolean;
          /**
           * fsType is the filesystem type of the volume that you want to mount.
           * Tip: Ensure that the filesystem type is supported by the host operating system.
           * Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.
           * More info: https://kubernetes.io/docs/concepts/storage/volumes#iscsi
           */
          fsType?: string;
          /**
           * initiatorName is the custom iSCSI Initiator Name.
           * If initiatorName is specified with iscsiInterface simultaneously, new iSCSI interface
           * <target portal>:<volume name> will be created for the connection.
           */
          initiatorName?: string;
          /**
           * iqn is the target iSCSI Qualified Name.
           */
          iqn: string;
          /**
           * iscsiInterface is the interface Name that uses an iSCSI transport.
           * Defaults to 'default' (tcp).
           */
          iscsiInterface?: string;
          /**
           * lun represents iSCSI Target Lun number.
           */
          lun: number;
          /**
           * portals is the iSCSI Target Portal List. The portal is either an IP or ip_addr:port if the port
           * is other than default (typically TCP ports 860 and 3260).
           */
          portals?: Array<string>;
          /**
           * readOnly here will force the ReadOnly setting in VolumeMounts.
           * Defaults to false.
           */
          readOnly?: boolean;
          /**
           * secretRef is the CHAP Secret for iSCSI target and initiator authentication
           */
          secretRef?: {
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
           * targetPortal is iSCSI Target Portal. The Portal is either an IP or ip_addr:port if the port
           * is other than default (typically TCP ports 860 and 3260).
           */
          targetPortal: string;
        };
        /**
         * name of the volume.
         * Must be a DNS_LABEL and unique within the pod.
         * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
         */
        name: string;
        /**
         * nfs represents an NFS mount on the host that shares a pod's lifetime
         * More info: https://kubernetes.io/docs/concepts/storage/volumes#nfs
         */
        nfs?: {
          /**
           * path that is exported by the NFS server.
           * More info: https://kubernetes.io/docs/concepts/storage/volumes#nfs
           */
          path: string;
          /**
           * readOnly here will force the NFS export to be mounted with read-only permissions.
           * Defaults to false.
           * More info: https://kubernetes.io/docs/concepts/storage/volumes#nfs
           */
          readOnly?: boolean;
          /**
           * server is the hostname or IP address of the NFS server.
           * More info: https://kubernetes.io/docs/concepts/storage/volumes#nfs
           */
          server: string;
        };
        /**
         * persistentVolumeClaimVolumeSource represents a reference to a
         * PersistentVolumeClaim in the same namespace.
         * More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims
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
         * photonPersistentDisk represents a PhotonController persistent disk attached and mounted on kubelets host machine.
         * Deprecated: PhotonPersistentDisk is deprecated and the in-tree photonPersistentDisk type is no longer supported.
         */
        photonPersistentDisk?: {
          /**
           * fsType is the filesystem type to mount.
           * Must be a filesystem type supported by the host operating system.
           * Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.
           */
          fsType?: string;
          /**
           * pdID is the ID that identifies Photon Controller persistent disk
           */
          pdID: string;
        };
        /**
         * portworxVolume represents a portworx volume attached and mounted on kubelets host machine.
         * Deprecated: PortworxVolume is deprecated. All operations for the in-tree portworxVolume type
         * are redirected to the pxd.portworx.com CSI driver when the CSIMigrationPortworx feature-gate
         * is on.
         */
        portworxVolume?: {
          /**
           * fSType represents the filesystem type to mount
           * Must be a filesystem type supported by the host operating system.
           * Ex. "ext4", "xfs". Implicitly inferred to be "ext4" if unspecified.
           */
          fsType?: string;
          /**
           * readOnly defaults to false (read/write). ReadOnly here will force
           * the ReadOnly setting in VolumeMounts.
           */
          readOnly?: boolean;
          /**
           * volumeID uniquely identifies a Portworx volume
           */
          volumeID: string;
        };
        /**
         * projected items for all in one resources secrets, configmaps, and downward API
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
         * quobyte represents a Quobyte mount on the host that shares a pod's lifetime.
         * Deprecated: Quobyte is deprecated and the in-tree quobyte type is no longer supported.
         */
        quobyte?: {
          /**
           * group to map volume access to
           * Default is no group
           */
          group?: string;
          /**
           * readOnly here will force the Quobyte volume to be mounted with read-only permissions.
           * Defaults to false.
           */
          readOnly?: boolean;
          /**
           * registry represents a single or multiple Quobyte Registry services
           * specified as a string as host:port pair (multiple entries are separated with commas)
           * which acts as the central registry for volumes
           */
          registry: string;
          /**
           * tenant owning the given Quobyte volume in the Backend
           * Used with dynamically provisioned Quobyte volumes, value is set by the plugin
           */
          tenant?: string;
          /**
           * user to map volume access to
           * Defaults to serivceaccount user
           */
          user?: string;
          /**
           * volume is a string that references an already created Quobyte volume by name.
           */
          volume: string;
        };
        /**
         * rbd represents a Rados Block Device mount on the host that shares a pod's lifetime.
         * Deprecated: RBD is deprecated and the in-tree rbd type is no longer supported.
         * More info: https://examples.k8s.io/volumes/rbd/README.md
         */
        rbd?: {
          /**
           * fsType is the filesystem type of the volume that you want to mount.
           * Tip: Ensure that the filesystem type is supported by the host operating system.
           * Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.
           * More info: https://kubernetes.io/docs/concepts/storage/volumes#rbd
           */
          fsType?: string;
          /**
           * image is the rados image name.
           * More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it
           */
          image: string;
          /**
           * keyring is the path to key ring for RBDUser.
           * Default is /etc/ceph/keyring.
           * More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it
           */
          keyring?: string;
          /**
           * monitors is a collection of Ceph monitors.
           * More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it
           */
          monitors: Array<string>;
          /**
           * pool is the rados pool name.
           * Default is rbd.
           * More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it
           */
          pool?: string;
          /**
           * readOnly here will force the ReadOnly setting in VolumeMounts.
           * Defaults to false.
           * More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it
           */
          readOnly?: boolean;
          /**
           * secretRef is name of the authentication secret for RBDUser. If provided
           * overrides keyring.
           * Default is nil.
           * More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it
           */
          secretRef?: {
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
           * user is the rados user name.
           * Default is admin.
           * More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it
           */
          user?: string;
        };
        /**
         * scaleIO represents a ScaleIO persistent volume attached and mounted on Kubernetes nodes.
         * Deprecated: ScaleIO is deprecated and the in-tree scaleIO type is no longer supported.
         */
        scaleIO?: {
          /**
           * fsType is the filesystem type to mount.
           * Must be a filesystem type supported by the host operating system.
           * Ex. "ext4", "xfs", "ntfs".
           * Default is "xfs".
           */
          fsType?: string;
          /**
           * gateway is the host address of the ScaleIO API Gateway.
           */
          gateway: string;
          /**
           * protectionDomain is the name of the ScaleIO Protection Domain for the configured storage.
           */
          protectionDomain?: string;
          /**
           * readOnly Defaults to false (read/write). ReadOnly here will force
           * the ReadOnly setting in VolumeMounts.
           */
          readOnly?: boolean;
          /**
           * secretRef references to the secret for ScaleIO user and other
           * sensitive information. If this is not provided, Login operation will fail.
           */
          secretRef: {
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
           * sslEnabled Flag enable/disable SSL communication with Gateway, default false
           */
          sslEnabled?: boolean;
          /**
           * storageMode indicates whether the storage for a volume should be ThickProvisioned or ThinProvisioned.
           * Default is ThinProvisioned.
           */
          storageMode?: string;
          /**
           * storagePool is the ScaleIO Storage Pool associated with the protection domain.
           */
          storagePool?: string;
          /**
           * system is the name of the storage system as configured in ScaleIO.
           */
          system: string;
          /**
           * volumeName is the name of a volume already created in the ScaleIO system
           * that is associated with this volume source.
           */
          volumeName?: string;
        };
        /**
         * secret represents a secret that should populate this volume.
         * More info: https://kubernetes.io/docs/concepts/storage/volumes#secret
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
         * storageOS represents a StorageOS volume attached and mounted on Kubernetes nodes.
         * Deprecated: StorageOS is deprecated and the in-tree storageos type is no longer supported.
         */
        storageos?: {
          /**
           * fsType is the filesystem type to mount.
           * Must be a filesystem type supported by the host operating system.
           * Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.
           */
          fsType?: string;
          /**
           * readOnly defaults to false (read/write). ReadOnly here will force
           * the ReadOnly setting in VolumeMounts.
           */
          readOnly?: boolean;
          /**
           * secretRef specifies the secret to use for obtaining the StorageOS API
           * credentials.  If not specified, default values will be attempted.
           */
          secretRef?: {
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
           * volumeName is the human-readable name of the StorageOS volume.  Volume
           * names are only unique within a namespace.
           */
          volumeName?: string;
          /**
           * volumeNamespace specifies the scope of the volume within StorageOS.  If no
           * namespace is specified then the Pod's namespace will be used.  This allows the
           * Kubernetes name scoping to be mirrored within StorageOS for tighter integration.
           * Set VolumeName to any name to override the default behaviour.
           * Set to "default" if you are not using namespaces within StorageOS.
           * Namespaces that do not pre-exist within StorageOS will be created.
           */
          volumeNamespace?: string;
        };
        /**
         * vsphereVolume represents a vSphere volume attached and mounted on kubelets host machine.
         * Deprecated: VsphereVolume is deprecated. All operations for the in-tree vsphereVolume type
         * are redirected to the csi.vsphere.vmware.com CSI driver.
         */
        vsphereVolume?: {
          /**
           * fsType is filesystem type to mount.
           * Must be a filesystem type supported by the host operating system.
           * Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.
           */
          fsType?: string;
          /**
           * storagePolicyID is the storage Policy Based Management (SPBM) profile ID associated with the StoragePolicyName.
           */
          storagePolicyID?: string;
          /**
           * storagePolicyName is the storage Policy Based Management (SPBM) profile name.
           */
          storagePolicyName?: string;
          /**
           * volumePath is the path that identifies vSphere volume vmdk
           */
          volumePath: string;
        };
      }>;
    }>;
    /**
     * Reference to the training runtime.
     * The field is immutable.
     */
    runtimeRef: {
      /**
       * APIGroup of the runtime being referenced.
       * Defaults to `trainer.kubeflow.org`.
       */
      apiGroup?: string;
      /**
       * Kind of the runtime being referenced.
       * Defaults to ClusterTrainingRuntime.
       */
      kind?: string;
      /**
       * Name of the runtime being referenced.
       * When namespaced-scoped TrainingRuntime is used, the TrainJob must have
       * the same namespace as the deployed runtime.
       */
      name: string;
    };
    /**
     * Whether the controller should suspend the running TrainJob.
     * Defaults to false.
     */
    suspend?: boolean;
    /**
     * Configuration of the trainer.
     */
    trainer?: {
      /**
       * Arguments to the entrypoint for the training container.
       */
      args?: Array<string>;
      /**
       * Entrypoint commands for the training container.
       */
      command?: Array<string>;
      /**
       * List of environment variables to set in the training container.
       * These values will be merged with the TrainingRuntime's trainer environments.
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
       * Docker image for the training container.
       */
      image?: string;
      /**
       * Number of training nodes.
       */
      numNodes?: number;
      /**
       * Number of processes/workers/slots on every training node.
       * For the Torch runtime: `auto`, `cpu`, `gpu`, or int value can be set.
       * For the MPI runtime only int value can be set.
       */
      numProcPerNode?: number | string;
      /**
       * Compute resources for each training node.
       */
      resourcesPerNode?: {
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
    };
  };
  /**
   * Current status of TrainJob.
   */
  status?: {
    /**
     * Conditions for the TrainJob.
     */
    conditions?: Array<{
      /**
       * lastTransitionTime is the last time the condition transitioned from one status to another.
       * This should be when the underlying condition changed.  If that is not known, then using the time when the API field changed is acceptable.
       */
      lastTransitionTime: string;
      /**
       * message is a human readable message indicating details about the transition.
       * This may be an empty string.
       */
      message: string;
      /**
       * observedGeneration represents the .metadata.generation that the condition was set based upon.
       * For instance, if .metadata.generation is currently 12, but the .status.conditions[x].observedGeneration is 9, the condition is out of date
       * with respect to the current state of the instance.
       */
      observedGeneration?: number;
      /**
       * reason contains a programmatic identifier indicating the reason for the condition's last transition.
       * Producers of specific condition types may define expected values and meanings for this field,
       * and whether the values are considered a guaranteed API.
       * The value should be a CamelCase string.
       * This field may not be empty.
       */
      reason: string;
      /**
       * status of the condition, one of True, False, Unknown.
       */
      status: 'True' | 'False' | 'Unknown';
      /**
       * type of condition in CamelCase or in foo.example.com/CamelCase.
       */
      type: string;
    }>;
    /**
     * JobsStatus tracks the child Jobs in TrainJob.
     */
    jobsStatus?: Array<{
      /**
       * Active is the number of child Jobs with at least 1 pod in a running or pending state
       * which are not marked for deletion.
       */
      active: number;
      /**
       * Failed is the number of failed child Jobs.
       */
      failed: number;
      /**
       * Name of the child Job.
       */
      name: string;
      /**
       * Ready is the number of child Jobs where the number of ready pods and completed pods
       * is greater than or equal to the total expected pod count for the child Job.
       */
      ready: number;
      /**
       * Succeeded is the number of successfully completed child Jobs.
       */
      succeeded: number;
      /**
       * Suspended is the number of child Jobs which are in a suspended state.
       */
      suspended: number;
    }>;
  };
}

/**
 * TrainJob represents configuration of a training job.
 */
export class TrainJob extends Model<ITrainJob> implements ITrainJob {
  apiVersion: ITrainJob['apiVersion'];
  kind: ITrainJob['kind'];
  metadata?: ITrainJob['metadata'];
  spec?: ITrainJob['spec'];
  status?: ITrainJob['status'];

  static apiVersion: ITrainJob['apiVersion'] = 'trainer.kubeflow.org/v1alpha1';
  static kind: ITrainJob['kind'] = 'TrainJob';
  static is = createTypeMetaGuard<ITrainJob>(TrainJob);

  constructor(data?: ModelData<ITrainJob>) {
    super();

    this.setDefinedProps({
      apiVersion: TrainJob.apiVersion,
      kind: TrainJob.kind,
      ...data,
    } as ITrainJob);
  }
}

setValidateFunc(TrainJob, validate as ValidateFunc<ITrainJob>);

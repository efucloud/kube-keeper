import type { IObjectMeta } from '@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta';
import {
  createTypeMetaGuard,
  Model,
  type ModelData,
  setValidateFunc,
} from '@kubernetes-models/base';
import type { ValidateFunc } from '@kubernetes-models/validate';
import { validate } from '../../_schemas/TektonDevV1beta1StepAction';

/**
 * StepAction represents the actionable components of Step.
 * The Step can only reference it from the cluster or using remote resolution.
 */
export interface IStepAction {
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
  kind: 'StepAction';
  metadata?: IObjectMeta;
  /**
   * Spec holds the desired state of the Step from the client
   */
  spec?: {
    /**
     * Arguments to the entrypoint.
     * The image's CMD is used if this is not provided.
     * Variable references $(VAR_NAME) are expanded using the container's environment. If a variable
     * cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced
     * to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. "$$(VAR_NAME)" will
     * produce the string literal "$(VAR_NAME)". Escaped references will never be expanded, regardless
     * of whether the variable exists or not. Cannot be updated.
     * More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell
     */
    args?: Array<string>;
    /**
     * Entrypoint array. Not executed within a shell.
     * The image's ENTRYPOINT is used if this is not provided.
     * Variable references $(VAR_NAME) are expanded using the container's environment. If a variable
     * cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced
     * to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. "$$(VAR_NAME)" will
     * produce the string literal "$(VAR_NAME)". Escaped references will never be expanded, regardless
     * of whether the variable exists or not. Cannot be updated.
     * More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell
     */
    command?: Array<string>;
    /**
     * Description is a user-facing description of the stepaction that may be
     * used to populate a UI.
     */
    description?: string;
    /**
     * List of environment variables to set in the container.
     * Cannot be updated.
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
     * Image reference name to run for this StepAction.
     * More info: https://kubernetes.io/docs/concepts/containers/images
     */
    image?: string;
    /**
     * Params is a list of input parameters required to run the stepAction.
     * Params must be supplied as inputs in Steps unless they declare a defaultvalue.
     */
    params?: Array<{
      /**
       * Default is the value a parameter takes if no input value is supplied. If
       * default is set, a Task may be executed without a supplied value for the
       * parameter.
       */
      default?: any;
      /**
       * Description is a user-facing description of the parameter that may be
       * used to populate a UI.
       */
      description?: string;
      /**
       * Enum declares a set of allowed param input values for tasks/pipelines that can be validated.
       * If Enum is not set, no input validation is performed for the param.
       */
      enum?: Array<string>;
      /**
       * Name declares the name by which a parameter is referenced.
       */
      name: string;
      /**
       * Properties is the JSON Schema properties to support key-value pairs parameter.
       */
      properties?: {
        [key: string]: {
          /**
           * ParamType indicates the type of an input parameter;
           * Used to distinguish between a single string and an array of strings.
           */
          type?: string;
        };
      };
      /**
       * Type is the user-specified type of the parameter. The possible types
       * are currently "string", "array" and "object", and "string" is the default.
       */
      type?: string;
    }>;
    /**
     * Results are values that this StepAction can output
     */
    results?: Array<{
      /**
       * Description is a human-readable description of the result
       */
      description?: string;
      /**
       * Name the given name
       */
      name: string;
      /**
       * Properties is the JSON Schema properties to support key-value pairs results.
       */
      properties?: {
        [key: string]: {
          /**
           * ParamType indicates the type of an input parameter;
           * Used to distinguish between a single string and an array of strings.
           */
          type?: string;
        };
      };
      /**
       * The possible types are 'string', 'array', and 'object', with 'string' as the default.
       */
      type?: string;
    }>;
    /**
     * Script is the contents of an executable file to execute.
     *
     * If Script is not empty, the Step cannot have an Command and the Args will be passed to the Script.
     */
    script?: string;
    /**
     * SecurityContext defines the security options the Step should be run with.
     * If set, the fields of SecurityContext override the equivalent fields of PodSecurityContext.
     * More info: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/
     * The value set in StepAction will take precedence over the value from Task.
     */
    securityContext?: {
      /**
       * AllowPrivilegeEscalation controls whether a process can gain more
       * privileges than its parent process. This bool directly controls if
       * the no_new_privs flag will be set on the container process.
       * AllowPrivilegeEscalation is true always when the container is:
       * 1) run as Privileged
       * 2) has CAP_SYS_ADMIN
       * Note that this field cannot be set when spec.os.name is windows.
       */
      allowPrivilegeEscalation?: boolean;
      /**
       * appArmorProfile is the AppArmor options to use by this container. If set, this profile
       * overrides the pod's appArmorProfile.
       * Note that this field cannot be set when spec.os.name is windows.
       */
      appArmorProfile?: {
        /**
         * localhostProfile indicates a profile loaded on the node that should be used.
         * The profile must be preconfigured on the node to work.
         * Must match the loaded name of the profile.
         * Must be set if and only if type is "Localhost".
         */
        localhostProfile?: string;
        /**
         * type indicates which kind of AppArmor profile will be applied.
         * Valid options are:
         *   Localhost - a profile pre-loaded on the node.
         *   RuntimeDefault - the container runtime's default profile.
         *   Unconfined - no AppArmor enforcement.
         */
        type: string;
      };
      /**
       * The capabilities to add/drop when running containers.
       * Defaults to the default set of capabilities granted by the container runtime.
       * Note that this field cannot be set when spec.os.name is windows.
       */
      capabilities?: {
        /**
         * Added capabilities
         */
        add?: Array<string>;
        /**
         * Removed capabilities
         */
        drop?: Array<string>;
      };
      /**
       * Run container in privileged mode.
       * Processes in privileged containers are essentially equivalent to root on the host.
       * Defaults to false.
       * Note that this field cannot be set when spec.os.name is windows.
       */
      privileged?: boolean;
      /**
       * procMount denotes the type of proc mount to use for the containers.
       * The default value is Default which uses the container runtime defaults for
       * readonly paths and masked paths.
       * This requires the ProcMountType feature flag to be enabled.
       * Note that this field cannot be set when spec.os.name is windows.
       */
      procMount?: string;
      /**
       * Whether this container has a read-only root filesystem.
       * Default is false.
       * Note that this field cannot be set when spec.os.name is windows.
       */
      readOnlyRootFilesystem?: boolean;
      /**
       * The GID to run the entrypoint of the container process.
       * Uses runtime default if unset.
       * May also be set in PodSecurityContext.  If set in both SecurityContext and
       * PodSecurityContext, the value specified in SecurityContext takes precedence.
       * Note that this field cannot be set when spec.os.name is windows.
       */
      runAsGroup?: number;
      /**
       * Indicates that the container must run as a non-root user.
       * If true, the Kubelet will validate the image at runtime to ensure that it
       * does not run as UID 0 (root) and fail to start the container if it does.
       * If unset or false, no such validation will be performed.
       * May also be set in PodSecurityContext.  If set in both SecurityContext and
       * PodSecurityContext, the value specified in SecurityContext takes precedence.
       */
      runAsNonRoot?: boolean;
      /**
       * The UID to run the entrypoint of the container process.
       * Defaults to user specified in image metadata if unspecified.
       * May also be set in PodSecurityContext.  If set in both SecurityContext and
       * PodSecurityContext, the value specified in SecurityContext takes precedence.
       * Note that this field cannot be set when spec.os.name is windows.
       */
      runAsUser?: number;
      /**
       * The SELinux context to be applied to the container.
       * If unspecified, the container runtime will allocate a random SELinux context for each
       * container.  May also be set in PodSecurityContext.  If set in both SecurityContext and
       * PodSecurityContext, the value specified in SecurityContext takes precedence.
       * Note that this field cannot be set when spec.os.name is windows.
       */
      seLinuxOptions?: {
        /**
         * Level is SELinux level label that applies to the container.
         */
        level?: string;
        /**
         * Role is a SELinux role label that applies to the container.
         */
        role?: string;
        /**
         * Type is a SELinux type label that applies to the container.
         */
        type?: string;
        /**
         * User is a SELinux user label that applies to the container.
         */
        user?: string;
      };
      /**
       * The seccomp options to use by this container. If seccomp options are
       * provided at both the pod & container level, the container options
       * override the pod options.
       * Note that this field cannot be set when spec.os.name is windows.
       */
      seccompProfile?: {
        /**
         * localhostProfile indicates a profile defined in a file on the node should be used.
         * The profile must be preconfigured on the node to work.
         * Must be a descending path, relative to the kubelet's configured seccomp profile location.
         * Must be set if type is "Localhost". Must NOT be set for any other type.
         */
        localhostProfile?: string;
        /**
         * type indicates which kind of seccomp profile will be applied.
         * Valid options are:
         *
         * Localhost - a profile defined in a file on the node should be used.
         * RuntimeDefault - the container runtime default profile should be used.
         * Unconfined - no profile should be applied.
         */
        type: string;
      };
      /**
       * The Windows specific settings applied to all containers.
       * If unspecified, the options from the PodSecurityContext will be used.
       * If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.
       * Note that this field cannot be set when spec.os.name is linux.
       */
      windowsOptions?: {
        /**
         * GMSACredentialSpec is where the GMSA admission webhook
         * (https://github.com/kubernetes-sigs/windows-gmsa) inlines the contents of the
         * GMSA credential spec named by the GMSACredentialSpecName field.
         */
        gmsaCredentialSpec?: string;
        /**
         * GMSACredentialSpecName is the name of the GMSA credential spec to use.
         */
        gmsaCredentialSpecName?: string;
        /**
         * HostProcess determines if a container should be run as a 'Host Process' container.
         * All of a Pod's containers must have the same effective HostProcess value
         * (it is not allowed to have a mix of HostProcess containers and non-HostProcess containers).
         * In addition, if HostProcess is true then HostNetwork must also be set to true.
         */
        hostProcess?: boolean;
        /**
         * The UserName in Windows to run the entrypoint of the container process.
         * Defaults to the user specified in image metadata if unspecified.
         * May also be set in PodSecurityContext. If set in both SecurityContext and
         * PodSecurityContext, the value specified in SecurityContext takes precedence.
         */
        runAsUserName?: string;
      };
    };
    /**
     * Volumes to mount into the Step's filesystem.
     * Cannot be updated.
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
    /**
     * Step's working directory.
     * If not specified, the container runtime's default will be used, which
     * might be configured in the container image.
     * Cannot be updated.
     */
    workingDir?: string;
  };
}

/**
 * StepAction represents the actionable components of Step.
 * The Step can only reference it from the cluster or using remote resolution.
 */
export class StepAction extends Model<IStepAction> implements IStepAction {
  apiVersion: IStepAction['apiVersion'];
  kind: IStepAction['kind'];
  metadata?: IStepAction['metadata'];
  spec?: IStepAction['spec'];

  static apiVersion: IStepAction['apiVersion'] = 'tekton.dev/v1beta1';
  static kind: IStepAction['kind'] = 'StepAction';
  static is = createTypeMetaGuard<IStepAction>(StepAction);

  constructor(data?: ModelData<IStepAction>) {
    super();

    this.setDefinedProps({
      apiVersion: StepAction.apiVersion,
      kind: StepAction.kind,
      ...data,
    } as IStepAction);
  }
}

setValidateFunc(StepAction, validate as ValidateFunc<IStepAction>);

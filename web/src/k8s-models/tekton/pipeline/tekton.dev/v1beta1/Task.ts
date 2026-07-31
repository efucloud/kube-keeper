import type { IObjectMeta } from '@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta';
import {
  createTypeMetaGuard,
  Model,
  type ModelData,
  setValidateFunc,
} from '@kubernetes-models/base';
import type { ValidateFunc } from '@kubernetes-models/validate';
import { validate } from '../../_schemas/TektonDevV1beta1Task';

/**
 * Task represents a collection of sequential steps that are run as part of a
 * Pipeline using a set of inputs and producing a set of outputs. Tasks execute
 * when TaskRuns are created that provide the input parameters and resources and
 * output resources the Task requires.
 *
 * Deprecated: Please use v1.Task instead.
 */
export interface ITask {
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
  kind: 'Task';
  metadata?: IObjectMeta;
  /**
   * Spec holds the desired state of the Task from the client
   */
  spec?: {
    /**
     * Description is a user-facing description of the task that may be
     * used to populate a UI.
     */
    description?: string;
    /**
     * DisplayName is a user-facing name of the task that may be
     * used to populate a UI.
     */
    displayName?: string;
    /**
     * Params is a list of input parameters required to run the task. Params
     * must be supplied as inputs in TaskRuns unless they declare a default
     * value.
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
     * Resources is a list input and output resource to run the task
     * Resources are represented in TaskRuns as bindings to instances of
     * PipelineResources.
     *
     * Deprecated: Unused, preserved only for backwards compatibility
     */
    resources?: {
      /**
       * Inputs holds the mapping from the PipelineResources declared in
       * DeclaredPipelineResources to the input PipelineResources required by the Task.
       */
      inputs?: Array<{
        /**
         * Description is a user-facing description of the declared resource that may be
         * used to populate a UI.
         */
        description?: string;
        /**
         * Name declares the name by which a resource is referenced in the
         * definition. Resources may be referenced by name in the definition of a
         * Task's steps.
         */
        name: string;
        /**
         * Optional declares the resource as optional.
         * By default optional is set to false which makes a resource required.
         * optional: true - the resource is considered optional
         * optional: false - the resource is considered required (equivalent of not specifying it)
         */
        optional?: boolean;
        /**
         * TargetPath is the path in workspace directory where the resource
         * will be copied.
         */
        targetPath?: string;
        /**
         * Type is the type of this resource;
         */
        type: string;
      }>;
      /**
       * Outputs holds the mapping from the PipelineResources declared in
       * DeclaredPipelineResources to the input PipelineResources required by the Task.
       */
      outputs?: Array<{
        /**
         * Description is a user-facing description of the declared resource that may be
         * used to populate a UI.
         */
        description?: string;
        /**
         * Name declares the name by which a resource is referenced in the
         * definition. Resources may be referenced by name in the definition of a
         * Task's steps.
         */
        name: string;
        /**
         * Optional declares the resource as optional.
         * By default optional is set to false which makes a resource required.
         * optional: true - the resource is considered optional
         * optional: false - the resource is considered required (equivalent of not specifying it)
         */
        optional?: boolean;
        /**
         * TargetPath is the path in workspace directory where the resource
         * will be copied.
         */
        targetPath?: string;
        /**
         * Type is the type of this resource;
         */
        type: string;
      }>;
    };
    /**
     * Results are values that this Task can output
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
       * Type is the user-specified type of the result. The possible type
       * is currently "string" and will support "array" in following work.
       */
      type?: string;
      /**
       * Value the expression used to retrieve the value of the result from an underlying Step.
       */
      value?: any;
    }>;
    /**
     * Sidecars are run alongside the Task's step containers. They begin before
     * the steps start and end after the steps complete.
     */
    sidecars?: Array<{
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
       * Variable references $(VAR_NAME) are expanded using the Sidecar's environment. If a variable
       * cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced
       * to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. "$$(VAR_NAME)" will
       * produce the string literal "$(VAR_NAME)". Escaped references will never be expanded, regardless
       * of whether the variable exists or not. Cannot be updated.
       * More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell
       */
      command?: Array<string>;
      /**
       * List of environment variables to set in the Sidecar.
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
       * List of sources to populate environment variables in the Sidecar.
       * The keys defined within a source must be a C_IDENTIFIER. All invalid keys
       * will be reported as an event when the Sidecar is starting. When a key exists in multiple
       * sources, the value associated with the last source will take precedence.
       * Values defined by an Env with a duplicate key will take precedence.
       * Cannot be updated.
       */
      envFrom?: Array<{
        /**
         * The ConfigMap to select from
         */
        configMapRef?: {
          /**
           * Name of the referent.
           * This field is effectively required, but due to backwards compatibility is
           * allowed to be empty. Instances of this type with an empty value here are
           * almost certainly wrong.
           * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
           */
          name?: string;
          /**
           * Specify whether the ConfigMap must be defined
           */
          optional?: boolean;
        };
        /**
         * An optional identifier to prepend to each key in the ConfigMap. Must be a C_IDENTIFIER.
         */
        prefix?: string;
        /**
         * The Secret to select from
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
          /**
           * Specify whether the Secret must be defined
           */
          optional?: boolean;
        };
      }>;
      /**
       * Image name to be used by the Sidecar.
       * More info: https://kubernetes.io/docs/concepts/containers/images
       */
      image?: string;
      /**
       * Image pull policy.
       * One of Always, Never, IfNotPresent.
       * Defaults to Always if :latest tag is specified, or IfNotPresent otherwise.
       * Cannot be updated.
       * More info: https://kubernetes.io/docs/concepts/containers/images#updating-images
       */
      imagePullPolicy?: string;
      /**
       * Actions that the management system should take in response to Sidecar lifecycle events.
       * Cannot be updated.
       */
      lifecycle?: {
        /**
         * PostStart is called immediately after a container is created. If the handler fails,
         * the container is terminated and restarted according to its restart policy.
         * Other management of the container blocks until the hook completes.
         * More info: https://kubernetes.io/docs/concepts/containers/container-lifecycle-hooks/#container-hooks
         */
        postStart?: {
          /**
           * Exec specifies a command to execute in the container.
           */
          exec?: {
            /**
             * Command is the command line to execute inside the container, the working directory for the
             * command  is root ('/') in the container's filesystem. The command is simply exec'd, it is
             * not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use
             * a shell, you need to explicitly call out to that shell.
             * Exit status of 0 is treated as live/healthy and non-zero is unhealthy.
             */
            command?: Array<string>;
          };
          /**
           * HTTPGet specifies an HTTP GET request to perform.
           */
          httpGet?: {
            /**
             * Host name to connect to, defaults to the pod IP. You probably want to set
             * "Host" in httpHeaders instead.
             */
            host?: string;
            /**
             * Custom headers to set in the request. HTTP allows repeated headers.
             */
            httpHeaders?: Array<{
              /**
               * The header field name.
               * This will be canonicalized upon output, so case-variant names will be understood as the same header.
               */
              name: string;
              /**
               * The header field value
               */
              value: string;
            }>;
            /**
             * Path to access on the HTTP server.
             */
            path?: string;
            /**
             * Name or number of the port to access on the container.
             * Number must be in the range 1 to 65535.
             * Name must be an IANA_SVC_NAME.
             */
            port: number | string;
            /**
             * Scheme to use for connecting to the host.
             * Defaults to HTTP.
             */
            scheme?: string;
          };
          /**
           * Sleep represents a duration that the container should sleep.
           */
          sleep?: {
            /**
             * Seconds is the number of seconds to sleep.
             */
            seconds: number;
          };
          /**
           * Deprecated. TCPSocket is NOT supported as a LifecycleHandler and kept
           * for backward compatibility. There is no validation of this field and
           * lifecycle hooks will fail at runtime when it is specified.
           */
          tcpSocket?: {
            /**
             * Optional: Host name to connect to, defaults to the pod IP.
             */
            host?: string;
            /**
             * Number or name of the port to access on the container.
             * Number must be in the range 1 to 65535.
             * Name must be an IANA_SVC_NAME.
             */
            port: number | string;
          };
        };
        /**
         * PreStop is called immediately before a container is terminated due to an
         * API request or management event such as liveness/startup probe failure,
         * preemption, resource contention, etc. The handler is not called if the
         * container crashes or exits. The Pod's termination grace period countdown begins before the
         * PreStop hook is executed. Regardless of the outcome of the handler, the
         * container will eventually terminate within the Pod's termination grace
         * period (unless delayed by finalizers). Other management of the container blocks until the hook completes
         * or until the termination grace period is reached.
         * More info: https://kubernetes.io/docs/concepts/containers/container-lifecycle-hooks/#container-hooks
         */
        preStop?: {
          /**
           * Exec specifies a command to execute in the container.
           */
          exec?: {
            /**
             * Command is the command line to execute inside the container, the working directory for the
             * command  is root ('/') in the container's filesystem. The command is simply exec'd, it is
             * not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use
             * a shell, you need to explicitly call out to that shell.
             * Exit status of 0 is treated as live/healthy and non-zero is unhealthy.
             */
            command?: Array<string>;
          };
          /**
           * HTTPGet specifies an HTTP GET request to perform.
           */
          httpGet?: {
            /**
             * Host name to connect to, defaults to the pod IP. You probably want to set
             * "Host" in httpHeaders instead.
             */
            host?: string;
            /**
             * Custom headers to set in the request. HTTP allows repeated headers.
             */
            httpHeaders?: Array<{
              /**
               * The header field name.
               * This will be canonicalized upon output, so case-variant names will be understood as the same header.
               */
              name: string;
              /**
               * The header field value
               */
              value: string;
            }>;
            /**
             * Path to access on the HTTP server.
             */
            path?: string;
            /**
             * Name or number of the port to access on the container.
             * Number must be in the range 1 to 65535.
             * Name must be an IANA_SVC_NAME.
             */
            port: number | string;
            /**
             * Scheme to use for connecting to the host.
             * Defaults to HTTP.
             */
            scheme?: string;
          };
          /**
           * Sleep represents a duration that the container should sleep.
           */
          sleep?: {
            /**
             * Seconds is the number of seconds to sleep.
             */
            seconds: number;
          };
          /**
           * Deprecated. TCPSocket is NOT supported as a LifecycleHandler and kept
           * for backward compatibility. There is no validation of this field and
           * lifecycle hooks will fail at runtime when it is specified.
           */
          tcpSocket?: {
            /**
             * Optional: Host name to connect to, defaults to the pod IP.
             */
            host?: string;
            /**
             * Number or name of the port to access on the container.
             * Number must be in the range 1 to 65535.
             * Name must be an IANA_SVC_NAME.
             */
            port: number | string;
          };
        };
      };
      /**
       * Periodic probe of Sidecar liveness.
       * Container will be restarted if the probe fails.
       * Cannot be updated.
       * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
       */
      livenessProbe?: {
        /**
         * Exec specifies a command to execute in the container.
         */
        exec?: {
          /**
           * Command is the command line to execute inside the container, the working directory for the
           * command  is root ('/') in the container's filesystem. The command is simply exec'd, it is
           * not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use
           * a shell, you need to explicitly call out to that shell.
           * Exit status of 0 is treated as live/healthy and non-zero is unhealthy.
           */
          command?: Array<string>;
        };
        /**
         * Minimum consecutive failures for the probe to be considered failed after having succeeded.
         * Defaults to 3. Minimum value is 1.
         */
        failureThreshold?: number;
        /**
         * GRPC specifies a GRPC HealthCheckRequest.
         */
        grpc?: {
          /**
           * Port number of the gRPC service. Number must be in the range 1 to 65535.
           */
          port: number;
          /**
           * Service is the name of the service to place in the gRPC HealthCheckRequest
           * (see https://github.com/grpc/grpc/blob/master/doc/health-checking.md).
           *
           * If this is not specified, the default behavior is defined by gRPC.
           */
          service?: string;
        };
        /**
         * HTTPGet specifies an HTTP GET request to perform.
         */
        httpGet?: {
          /**
           * Host name to connect to, defaults to the pod IP. You probably want to set
           * "Host" in httpHeaders instead.
           */
          host?: string;
          /**
           * Custom headers to set in the request. HTTP allows repeated headers.
           */
          httpHeaders?: Array<{
            /**
             * The header field name.
             * This will be canonicalized upon output, so case-variant names will be understood as the same header.
             */
            name: string;
            /**
             * The header field value
             */
            value: string;
          }>;
          /**
           * Path to access on the HTTP server.
           */
          path?: string;
          /**
           * Name or number of the port to access on the container.
           * Number must be in the range 1 to 65535.
           * Name must be an IANA_SVC_NAME.
           */
          port: number | string;
          /**
           * Scheme to use for connecting to the host.
           * Defaults to HTTP.
           */
          scheme?: string;
        };
        /**
         * Number of seconds after the container has started before liveness probes are initiated.
         * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
         */
        initialDelaySeconds?: number;
        /**
         * How often (in seconds) to perform the probe.
         * Default to 10 seconds. Minimum value is 1.
         */
        periodSeconds?: number;
        /**
         * Minimum consecutive successes for the probe to be considered successful after having failed.
         * Defaults to 1. Must be 1 for liveness and startup. Minimum value is 1.
         */
        successThreshold?: number;
        /**
         * TCPSocket specifies a connection to a TCP port.
         */
        tcpSocket?: {
          /**
           * Optional: Host name to connect to, defaults to the pod IP.
           */
          host?: string;
          /**
           * Number or name of the port to access on the container.
           * Number must be in the range 1 to 65535.
           * Name must be an IANA_SVC_NAME.
           */
          port: number | string;
        };
        /**
         * Optional duration in seconds the pod needs to terminate gracefully upon probe failure.
         * The grace period is the duration in seconds after the processes running in the pod are sent
         * a termination signal and the time when the processes are forcibly halted with a kill signal.
         * Set this value longer than the expected cleanup time for your process.
         * If this value is nil, the pod's terminationGracePeriodSeconds will be used. Otherwise, this
         * value overrides the value provided by the pod spec.
         * Value must be non-negative integer. The value zero indicates stop immediately via
         * the kill signal (no opportunity to shut down).
         * This is a beta field and requires enabling ProbeTerminationGracePeriod feature gate.
         * Minimum value is 1. spec.terminationGracePeriodSeconds is used if unset.
         */
        terminationGracePeriodSeconds?: number;
        /**
         * Number of seconds after which the probe times out.
         * Defaults to 1 second. Minimum value is 1.
         * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
         */
        timeoutSeconds?: number;
      };
      /**
       * Name of the Sidecar specified as a DNS_LABEL.
       * Each Sidecar in a Task must have a unique name (DNS_LABEL).
       * Cannot be updated.
       */
      name: string;
      /**
       * List of ports to expose from the Sidecar. Exposing a port here gives
       * the system additional information about the network connections a
       * container uses, but is primarily informational. Not specifying a port here
       * DOES NOT prevent that port from being exposed. Any port which is
       * listening on the default "0.0.0.0" address inside a container will be
       * accessible from the network.
       * Cannot be updated.
       */
      ports?: Array<{
        /**
         * Number of port to expose on the pod's IP address.
         * This must be a valid port number, 0 < x < 65536.
         */
        containerPort: number;
        /**
         * What host IP to bind the external port to.
         */
        hostIP?: string;
        /**
         * Number of port to expose on the host.
         * If specified, this must be a valid port number, 0 < x < 65536.
         * If HostNetwork is specified, this must match ContainerPort.
         * Most containers do not need this.
         */
        hostPort?: number;
        /**
         * If specified, this must be an IANA_SVC_NAME and unique within the pod. Each
         * named port in a pod must have a unique name. Name for the port that can be
         * referred to by services.
         */
        name?: string;
        /**
         * Protocol for port. Must be UDP, TCP, or SCTP.
         * Defaults to "TCP".
         */
        protocol?: string;
      }>;
      /**
       * Periodic probe of Sidecar service readiness.
       * Container will be removed from service endpoints if the probe fails.
       * Cannot be updated.
       * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
       */
      readinessProbe?: {
        /**
         * Exec specifies a command to execute in the container.
         */
        exec?: {
          /**
           * Command is the command line to execute inside the container, the working directory for the
           * command  is root ('/') in the container's filesystem. The command is simply exec'd, it is
           * not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use
           * a shell, you need to explicitly call out to that shell.
           * Exit status of 0 is treated as live/healthy and non-zero is unhealthy.
           */
          command?: Array<string>;
        };
        /**
         * Minimum consecutive failures for the probe to be considered failed after having succeeded.
         * Defaults to 3. Minimum value is 1.
         */
        failureThreshold?: number;
        /**
         * GRPC specifies a GRPC HealthCheckRequest.
         */
        grpc?: {
          /**
           * Port number of the gRPC service. Number must be in the range 1 to 65535.
           */
          port: number;
          /**
           * Service is the name of the service to place in the gRPC HealthCheckRequest
           * (see https://github.com/grpc/grpc/blob/master/doc/health-checking.md).
           *
           * If this is not specified, the default behavior is defined by gRPC.
           */
          service?: string;
        };
        /**
         * HTTPGet specifies an HTTP GET request to perform.
         */
        httpGet?: {
          /**
           * Host name to connect to, defaults to the pod IP. You probably want to set
           * "Host" in httpHeaders instead.
           */
          host?: string;
          /**
           * Custom headers to set in the request. HTTP allows repeated headers.
           */
          httpHeaders?: Array<{
            /**
             * The header field name.
             * This will be canonicalized upon output, so case-variant names will be understood as the same header.
             */
            name: string;
            /**
             * The header field value
             */
            value: string;
          }>;
          /**
           * Path to access on the HTTP server.
           */
          path?: string;
          /**
           * Name or number of the port to access on the container.
           * Number must be in the range 1 to 65535.
           * Name must be an IANA_SVC_NAME.
           */
          port: number | string;
          /**
           * Scheme to use for connecting to the host.
           * Defaults to HTTP.
           */
          scheme?: string;
        };
        /**
         * Number of seconds after the container has started before liveness probes are initiated.
         * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
         */
        initialDelaySeconds?: number;
        /**
         * How often (in seconds) to perform the probe.
         * Default to 10 seconds. Minimum value is 1.
         */
        periodSeconds?: number;
        /**
         * Minimum consecutive successes for the probe to be considered successful after having failed.
         * Defaults to 1. Must be 1 for liveness and startup. Minimum value is 1.
         */
        successThreshold?: number;
        /**
         * TCPSocket specifies a connection to a TCP port.
         */
        tcpSocket?: {
          /**
           * Optional: Host name to connect to, defaults to the pod IP.
           */
          host?: string;
          /**
           * Number or name of the port to access on the container.
           * Number must be in the range 1 to 65535.
           * Name must be an IANA_SVC_NAME.
           */
          port: number | string;
        };
        /**
         * Optional duration in seconds the pod needs to terminate gracefully upon probe failure.
         * The grace period is the duration in seconds after the processes running in the pod are sent
         * a termination signal and the time when the processes are forcibly halted with a kill signal.
         * Set this value longer than the expected cleanup time for your process.
         * If this value is nil, the pod's terminationGracePeriodSeconds will be used. Otherwise, this
         * value overrides the value provided by the pod spec.
         * Value must be non-negative integer. The value zero indicates stop immediately via
         * the kill signal (no opportunity to shut down).
         * This is a beta field and requires enabling ProbeTerminationGracePeriod feature gate.
         * Minimum value is 1. spec.terminationGracePeriodSeconds is used if unset.
         */
        terminationGracePeriodSeconds?: number;
        /**
         * Number of seconds after which the probe times out.
         * Defaults to 1 second. Minimum value is 1.
         * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
         */
        timeoutSeconds?: number;
      };
      /**
       * Compute Resources required by this Sidecar.
       * Cannot be updated.
       * More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
       */
      resources?: {
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
       * RestartPolicy refers to kubernetes RestartPolicy. It can only be set for an
       * initContainer and must have it's policy set to "Always". It is currently
       * left optional to help support Kubernetes versions prior to 1.29 when this feature
       * was introduced.
       */
      restartPolicy?: string;
      /**
       * Script is the contents of an executable file to execute.
       *
       * If Script is not empty, the Step cannot have an Command or Args.
       */
      script?: string;
      /**
       * SecurityContext defines the security options the Sidecar should be run with.
       * If set, the fields of SecurityContext override the equivalent fields of PodSecurityContext.
       * More info: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/
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
       * StartupProbe indicates that the Pod the Sidecar is running in has successfully initialized.
       * If specified, no other probes are executed until this completes successfully.
       * If this probe fails, the Pod will be restarted, just as if the livenessProbe failed.
       * This can be used to provide different probe parameters at the beginning of a Pod's lifecycle,
       * when it might take a long time to load data or warm a cache, than during steady-state operation.
       * This cannot be updated.
       * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
       */
      startupProbe?: {
        /**
         * Exec specifies a command to execute in the container.
         */
        exec?: {
          /**
           * Command is the command line to execute inside the container, the working directory for the
           * command  is root ('/') in the container's filesystem. The command is simply exec'd, it is
           * not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use
           * a shell, you need to explicitly call out to that shell.
           * Exit status of 0 is treated as live/healthy and non-zero is unhealthy.
           */
          command?: Array<string>;
        };
        /**
         * Minimum consecutive failures for the probe to be considered failed after having succeeded.
         * Defaults to 3. Minimum value is 1.
         */
        failureThreshold?: number;
        /**
         * GRPC specifies a GRPC HealthCheckRequest.
         */
        grpc?: {
          /**
           * Port number of the gRPC service. Number must be in the range 1 to 65535.
           */
          port: number;
          /**
           * Service is the name of the service to place in the gRPC HealthCheckRequest
           * (see https://github.com/grpc/grpc/blob/master/doc/health-checking.md).
           *
           * If this is not specified, the default behavior is defined by gRPC.
           */
          service?: string;
        };
        /**
         * HTTPGet specifies an HTTP GET request to perform.
         */
        httpGet?: {
          /**
           * Host name to connect to, defaults to the pod IP. You probably want to set
           * "Host" in httpHeaders instead.
           */
          host?: string;
          /**
           * Custom headers to set in the request. HTTP allows repeated headers.
           */
          httpHeaders?: Array<{
            /**
             * The header field name.
             * This will be canonicalized upon output, so case-variant names will be understood as the same header.
             */
            name: string;
            /**
             * The header field value
             */
            value: string;
          }>;
          /**
           * Path to access on the HTTP server.
           */
          path?: string;
          /**
           * Name or number of the port to access on the container.
           * Number must be in the range 1 to 65535.
           * Name must be an IANA_SVC_NAME.
           */
          port: number | string;
          /**
           * Scheme to use for connecting to the host.
           * Defaults to HTTP.
           */
          scheme?: string;
        };
        /**
         * Number of seconds after the container has started before liveness probes are initiated.
         * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
         */
        initialDelaySeconds?: number;
        /**
         * How often (in seconds) to perform the probe.
         * Default to 10 seconds. Minimum value is 1.
         */
        periodSeconds?: number;
        /**
         * Minimum consecutive successes for the probe to be considered successful after having failed.
         * Defaults to 1. Must be 1 for liveness and startup. Minimum value is 1.
         */
        successThreshold?: number;
        /**
         * TCPSocket specifies a connection to a TCP port.
         */
        tcpSocket?: {
          /**
           * Optional: Host name to connect to, defaults to the pod IP.
           */
          host?: string;
          /**
           * Number or name of the port to access on the container.
           * Number must be in the range 1 to 65535.
           * Name must be an IANA_SVC_NAME.
           */
          port: number | string;
        };
        /**
         * Optional duration in seconds the pod needs to terminate gracefully upon probe failure.
         * The grace period is the duration in seconds after the processes running in the pod are sent
         * a termination signal and the time when the processes are forcibly halted with a kill signal.
         * Set this value longer than the expected cleanup time for your process.
         * If this value is nil, the pod's terminationGracePeriodSeconds will be used. Otherwise, this
         * value overrides the value provided by the pod spec.
         * Value must be non-negative integer. The value zero indicates stop immediately via
         * the kill signal (no opportunity to shut down).
         * This is a beta field and requires enabling ProbeTerminationGracePeriod feature gate.
         * Minimum value is 1. spec.terminationGracePeriodSeconds is used if unset.
         */
        terminationGracePeriodSeconds?: number;
        /**
         * Number of seconds after which the probe times out.
         * Defaults to 1 second. Minimum value is 1.
         * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
         */
        timeoutSeconds?: number;
      };
      /**
       * Whether this Sidecar should allocate a buffer for stdin in the container runtime. If this
       * is not set, reads from stdin in the Sidecar will always result in EOF.
       * Default is false.
       */
      stdin?: boolean;
      /**
       * Whether the container runtime should close the stdin channel after it has been opened by
       * a single attach. When stdin is true the stdin stream will remain open across multiple attach
       * sessions. If stdinOnce is set to true, stdin is opened on Sidecar start, is empty until the
       * first client attaches to stdin, and then remains open and accepts data until the client disconnects,
       * at which time stdin is closed and remains closed until the Sidecar is restarted. If this
       * flag is false, a container processes that reads from stdin will never receive an EOF.
       * Default is false
       */
      stdinOnce?: boolean;
      /**
       * Optional: Path at which the file to which the Sidecar's termination message
       * will be written is mounted into the Sidecar's filesystem.
       * Message written is intended to be brief final status, such as an assertion failure message.
       * Will be truncated by the node if greater than 4096 bytes. The total message length across
       * all containers will be limited to 12kb.
       * Defaults to /dev/termination-log.
       * Cannot be updated.
       */
      terminationMessagePath?: string;
      /**
       * Indicate how the termination message should be populated. File will use the contents of
       * terminationMessagePath to populate the Sidecar status message on both success and failure.
       * FallbackToLogsOnError will use the last chunk of Sidecar log output if the termination
       * message file is empty and the Sidecar exited with an error.
       * The log output is limited to 2048 bytes or 80 lines, whichever is smaller.
       * Defaults to File.
       * Cannot be updated.
       */
      terminationMessagePolicy?: string;
      /**
       * Whether this Sidecar should allocate a TTY for itself, also requires 'stdin' to be true.
       * Default is false.
       */
      tty?: boolean;
      /**
       * volumeDevices is the list of block devices to be used by the Sidecar.
       */
      volumeDevices?: Array<{
        /**
         * devicePath is the path inside of the container that the device will be mapped to.
         */
        devicePath: string;
        /**
         * name must match the name of a persistentVolumeClaim in the pod
         */
        name: string;
      }>;
      /**
       * Volumes to mount into the Sidecar's filesystem.
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
       * Sidecar's working directory.
       * If not specified, the container runtime's default will be used, which
       * might be configured in the container image.
       * Cannot be updated.
       */
      workingDir?: string;
      /**
       * This is an alpha field. You must set the "enable-api-fields" feature flag to "alpha"
       * for this field to be supported.
       *
       * Workspaces is a list of workspaces from the Task that this Sidecar wants
       * exclusive access to. Adding a workspace to this list means that any
       * other Step or Sidecar that does not also request this Workspace will
       * not have access to it.
       */
      workspaces?: Array<{
        /**
         * MountPath is the path that the workspace should be mounted to inside the Step or Sidecar,
         * overriding any MountPath specified in the Task's WorkspaceDeclaration.
         */
        mountPath: string;
        /**
         * Name is the name of the workspace this Step or Sidecar wants access to.
         */
        name: string;
      }>;
    }>;
    /**
     * StepTemplate can be used as the basis for all step containers within the
     * Task, so that the steps inherit settings on the base container.
     */
    stepTemplate?: {
      /**
       * Arguments to the entrypoint.
       * The image's CMD is used if this is not provided.
       * Variable references $(VAR_NAME) are expanded using the Step's environment. If a variable
       * cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced
       * to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. "$$(VAR_NAME)" will
       * produce the string literal "$(VAR_NAME)". Escaped references will never be expanded, regardless
       * of whether the variable exists or not. Cannot be updated.
       * More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell
       */
      args?: Array<string>;
      /**
       * Entrypoint array. Not executed within a shell.
       * The docker image's ENTRYPOINT is used if this is not provided.
       * Variable references $(VAR_NAME) are expanded using the Step's environment. If a variable
       * cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced
       * to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. "$$(VAR_NAME)" will
       * produce the string literal "$(VAR_NAME)". Escaped references will never be expanded, regardless
       * of whether the variable exists or not. Cannot be updated.
       * More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell
       */
      command?: Array<string>;
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
       * List of sources to populate environment variables in the Step.
       * The keys defined within a source must be a C_IDENTIFIER. All invalid keys
       * will be reported as an event when the container is starting. When a key exists in multiple
       * sources, the value associated with the last source will take precedence.
       * Values defined by an Env with a duplicate key will take precedence.
       * Cannot be updated.
       */
      envFrom?: Array<{
        /**
         * The ConfigMap to select from
         */
        configMapRef?: {
          /**
           * Name of the referent.
           * This field is effectively required, but due to backwards compatibility is
           * allowed to be empty. Instances of this type with an empty value here are
           * almost certainly wrong.
           * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
           */
          name?: string;
          /**
           * Specify whether the ConfigMap must be defined
           */
          optional?: boolean;
        };
        /**
         * An optional identifier to prepend to each key in the ConfigMap. Must be a C_IDENTIFIER.
         */
        prefix?: string;
        /**
         * The Secret to select from
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
          /**
           * Specify whether the Secret must be defined
           */
          optional?: boolean;
        };
      }>;
      /**
       * Default image name to use for each Step.
       * More info: https://kubernetes.io/docs/concepts/containers/images
       * This field is optional to allow higher level config management to default or override
       * container images in workload controllers like Deployments and StatefulSets.
       */
      image?: string;
      /**
       * Image pull policy.
       * One of Always, Never, IfNotPresent.
       * Defaults to Always if :latest tag is specified, or IfNotPresent otherwise.
       * Cannot be updated.
       * More info: https://kubernetes.io/docs/concepts/containers/images#updating-images
       */
      imagePullPolicy?: string;
      /**
       * Actions that the management system should take in response to container lifecycle events.
       * Cannot be updated.
       *
       * Deprecated: This field will be removed in a future release.
       */
      lifecycle?: {
        /**
         * PostStart is called immediately after a container is created. If the handler fails,
         * the container is terminated and restarted according to its restart policy.
         * Other management of the container blocks until the hook completes.
         * More info: https://kubernetes.io/docs/concepts/containers/container-lifecycle-hooks/#container-hooks
         */
        postStart?: {
          /**
           * Exec specifies a command to execute in the container.
           */
          exec?: {
            /**
             * Command is the command line to execute inside the container, the working directory for the
             * command  is root ('/') in the container's filesystem. The command is simply exec'd, it is
             * not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use
             * a shell, you need to explicitly call out to that shell.
             * Exit status of 0 is treated as live/healthy and non-zero is unhealthy.
             */
            command?: Array<string>;
          };
          /**
           * HTTPGet specifies an HTTP GET request to perform.
           */
          httpGet?: {
            /**
             * Host name to connect to, defaults to the pod IP. You probably want to set
             * "Host" in httpHeaders instead.
             */
            host?: string;
            /**
             * Custom headers to set in the request. HTTP allows repeated headers.
             */
            httpHeaders?: Array<{
              /**
               * The header field name.
               * This will be canonicalized upon output, so case-variant names will be understood as the same header.
               */
              name: string;
              /**
               * The header field value
               */
              value: string;
            }>;
            /**
             * Path to access on the HTTP server.
             */
            path?: string;
            /**
             * Name or number of the port to access on the container.
             * Number must be in the range 1 to 65535.
             * Name must be an IANA_SVC_NAME.
             */
            port: number | string;
            /**
             * Scheme to use for connecting to the host.
             * Defaults to HTTP.
             */
            scheme?: string;
          };
          /**
           * Sleep represents a duration that the container should sleep.
           */
          sleep?: {
            /**
             * Seconds is the number of seconds to sleep.
             */
            seconds: number;
          };
          /**
           * Deprecated. TCPSocket is NOT supported as a LifecycleHandler and kept
           * for backward compatibility. There is no validation of this field and
           * lifecycle hooks will fail at runtime when it is specified.
           */
          tcpSocket?: {
            /**
             * Optional: Host name to connect to, defaults to the pod IP.
             */
            host?: string;
            /**
             * Number or name of the port to access on the container.
             * Number must be in the range 1 to 65535.
             * Name must be an IANA_SVC_NAME.
             */
            port: number | string;
          };
        };
        /**
         * PreStop is called immediately before a container is terminated due to an
         * API request or management event such as liveness/startup probe failure,
         * preemption, resource contention, etc. The handler is not called if the
         * container crashes or exits. The Pod's termination grace period countdown begins before the
         * PreStop hook is executed. Regardless of the outcome of the handler, the
         * container will eventually terminate within the Pod's termination grace
         * period (unless delayed by finalizers). Other management of the container blocks until the hook completes
         * or until the termination grace period is reached.
         * More info: https://kubernetes.io/docs/concepts/containers/container-lifecycle-hooks/#container-hooks
         */
        preStop?: {
          /**
           * Exec specifies a command to execute in the container.
           */
          exec?: {
            /**
             * Command is the command line to execute inside the container, the working directory for the
             * command  is root ('/') in the container's filesystem. The command is simply exec'd, it is
             * not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use
             * a shell, you need to explicitly call out to that shell.
             * Exit status of 0 is treated as live/healthy and non-zero is unhealthy.
             */
            command?: Array<string>;
          };
          /**
           * HTTPGet specifies an HTTP GET request to perform.
           */
          httpGet?: {
            /**
             * Host name to connect to, defaults to the pod IP. You probably want to set
             * "Host" in httpHeaders instead.
             */
            host?: string;
            /**
             * Custom headers to set in the request. HTTP allows repeated headers.
             */
            httpHeaders?: Array<{
              /**
               * The header field name.
               * This will be canonicalized upon output, so case-variant names will be understood as the same header.
               */
              name: string;
              /**
               * The header field value
               */
              value: string;
            }>;
            /**
             * Path to access on the HTTP server.
             */
            path?: string;
            /**
             * Name or number of the port to access on the container.
             * Number must be in the range 1 to 65535.
             * Name must be an IANA_SVC_NAME.
             */
            port: number | string;
            /**
             * Scheme to use for connecting to the host.
             * Defaults to HTTP.
             */
            scheme?: string;
          };
          /**
           * Sleep represents a duration that the container should sleep.
           */
          sleep?: {
            /**
             * Seconds is the number of seconds to sleep.
             */
            seconds: number;
          };
          /**
           * Deprecated. TCPSocket is NOT supported as a LifecycleHandler and kept
           * for backward compatibility. There is no validation of this field and
           * lifecycle hooks will fail at runtime when it is specified.
           */
          tcpSocket?: {
            /**
             * Optional: Host name to connect to, defaults to the pod IP.
             */
            host?: string;
            /**
             * Number or name of the port to access on the container.
             * Number must be in the range 1 to 65535.
             * Name must be an IANA_SVC_NAME.
             */
            port: number | string;
          };
        };
      };
      /**
       * Periodic probe of container liveness.
       * Container will be restarted if the probe fails.
       * Cannot be updated.
       * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
       *
       * Deprecated: This field will be removed in a future release.
       */
      livenessProbe?: {
        /**
         * Exec specifies a command to execute in the container.
         */
        exec?: {
          /**
           * Command is the command line to execute inside the container, the working directory for the
           * command  is root ('/') in the container's filesystem. The command is simply exec'd, it is
           * not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use
           * a shell, you need to explicitly call out to that shell.
           * Exit status of 0 is treated as live/healthy and non-zero is unhealthy.
           */
          command?: Array<string>;
        };
        /**
         * Minimum consecutive failures for the probe to be considered failed after having succeeded.
         * Defaults to 3. Minimum value is 1.
         */
        failureThreshold?: number;
        /**
         * GRPC specifies a GRPC HealthCheckRequest.
         */
        grpc?: {
          /**
           * Port number of the gRPC service. Number must be in the range 1 to 65535.
           */
          port: number;
          /**
           * Service is the name of the service to place in the gRPC HealthCheckRequest
           * (see https://github.com/grpc/grpc/blob/master/doc/health-checking.md).
           *
           * If this is not specified, the default behavior is defined by gRPC.
           */
          service?: string;
        };
        /**
         * HTTPGet specifies an HTTP GET request to perform.
         */
        httpGet?: {
          /**
           * Host name to connect to, defaults to the pod IP. You probably want to set
           * "Host" in httpHeaders instead.
           */
          host?: string;
          /**
           * Custom headers to set in the request. HTTP allows repeated headers.
           */
          httpHeaders?: Array<{
            /**
             * The header field name.
             * This will be canonicalized upon output, so case-variant names will be understood as the same header.
             */
            name: string;
            /**
             * The header field value
             */
            value: string;
          }>;
          /**
           * Path to access on the HTTP server.
           */
          path?: string;
          /**
           * Name or number of the port to access on the container.
           * Number must be in the range 1 to 65535.
           * Name must be an IANA_SVC_NAME.
           */
          port: number | string;
          /**
           * Scheme to use for connecting to the host.
           * Defaults to HTTP.
           */
          scheme?: string;
        };
        /**
         * Number of seconds after the container has started before liveness probes are initiated.
         * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
         */
        initialDelaySeconds?: number;
        /**
         * How often (in seconds) to perform the probe.
         * Default to 10 seconds. Minimum value is 1.
         */
        periodSeconds?: number;
        /**
         * Minimum consecutive successes for the probe to be considered successful after having failed.
         * Defaults to 1. Must be 1 for liveness and startup. Minimum value is 1.
         */
        successThreshold?: number;
        /**
         * TCPSocket specifies a connection to a TCP port.
         */
        tcpSocket?: {
          /**
           * Optional: Host name to connect to, defaults to the pod IP.
           */
          host?: string;
          /**
           * Number or name of the port to access on the container.
           * Number must be in the range 1 to 65535.
           * Name must be an IANA_SVC_NAME.
           */
          port: number | string;
        };
        /**
         * Optional duration in seconds the pod needs to terminate gracefully upon probe failure.
         * The grace period is the duration in seconds after the processes running in the pod are sent
         * a termination signal and the time when the processes are forcibly halted with a kill signal.
         * Set this value longer than the expected cleanup time for your process.
         * If this value is nil, the pod's terminationGracePeriodSeconds will be used. Otherwise, this
         * value overrides the value provided by the pod spec.
         * Value must be non-negative integer. The value zero indicates stop immediately via
         * the kill signal (no opportunity to shut down).
         * This is a beta field and requires enabling ProbeTerminationGracePeriod feature gate.
         * Minimum value is 1. spec.terminationGracePeriodSeconds is used if unset.
         */
        terminationGracePeriodSeconds?: number;
        /**
         * Number of seconds after which the probe times out.
         * Defaults to 1 second. Minimum value is 1.
         * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
         */
        timeoutSeconds?: number;
      };
      /**
       * Default name for each Step specified as a DNS_LABEL.
       * Each Step in a Task must have a unique name.
       * Cannot be updated.
       *
       * Deprecated: This field will be removed in a future release.
       */
      name: string;
      /**
       * List of ports to expose from the Step's container. Exposing a port here gives
       * the system additional information about the network connections a
       * container uses, but is primarily informational. Not specifying a port here
       * DOES NOT prevent that port from being exposed. Any port which is
       * listening on the default "0.0.0.0" address inside a container will be
       * accessible from the network.
       * Cannot be updated.
       *
       * Deprecated: This field will be removed in a future release.
       */
      ports?: Array<{
        /**
         * Number of port to expose on the pod's IP address.
         * This must be a valid port number, 0 < x < 65536.
         */
        containerPort: number;
        /**
         * What host IP to bind the external port to.
         */
        hostIP?: string;
        /**
         * Number of port to expose on the host.
         * If specified, this must be a valid port number, 0 < x < 65536.
         * If HostNetwork is specified, this must match ContainerPort.
         * Most containers do not need this.
         */
        hostPort?: number;
        /**
         * If specified, this must be an IANA_SVC_NAME and unique within the pod. Each
         * named port in a pod must have a unique name. Name for the port that can be
         * referred to by services.
         */
        name?: string;
        /**
         * Protocol for port. Must be UDP, TCP, or SCTP.
         * Defaults to "TCP".
         */
        protocol?: string;
      }>;
      /**
       * Periodic probe of container service readiness.
       * Container will be removed from service endpoints if the probe fails.
       * Cannot be updated.
       * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
       *
       * Deprecated: This field will be removed in a future release.
       */
      readinessProbe?: {
        /**
         * Exec specifies a command to execute in the container.
         */
        exec?: {
          /**
           * Command is the command line to execute inside the container, the working directory for the
           * command  is root ('/') in the container's filesystem. The command is simply exec'd, it is
           * not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use
           * a shell, you need to explicitly call out to that shell.
           * Exit status of 0 is treated as live/healthy and non-zero is unhealthy.
           */
          command?: Array<string>;
        };
        /**
         * Minimum consecutive failures for the probe to be considered failed after having succeeded.
         * Defaults to 3. Minimum value is 1.
         */
        failureThreshold?: number;
        /**
         * GRPC specifies a GRPC HealthCheckRequest.
         */
        grpc?: {
          /**
           * Port number of the gRPC service. Number must be in the range 1 to 65535.
           */
          port: number;
          /**
           * Service is the name of the service to place in the gRPC HealthCheckRequest
           * (see https://github.com/grpc/grpc/blob/master/doc/health-checking.md).
           *
           * If this is not specified, the default behavior is defined by gRPC.
           */
          service?: string;
        };
        /**
         * HTTPGet specifies an HTTP GET request to perform.
         */
        httpGet?: {
          /**
           * Host name to connect to, defaults to the pod IP. You probably want to set
           * "Host" in httpHeaders instead.
           */
          host?: string;
          /**
           * Custom headers to set in the request. HTTP allows repeated headers.
           */
          httpHeaders?: Array<{
            /**
             * The header field name.
             * This will be canonicalized upon output, so case-variant names will be understood as the same header.
             */
            name: string;
            /**
             * The header field value
             */
            value: string;
          }>;
          /**
           * Path to access on the HTTP server.
           */
          path?: string;
          /**
           * Name or number of the port to access on the container.
           * Number must be in the range 1 to 65535.
           * Name must be an IANA_SVC_NAME.
           */
          port: number | string;
          /**
           * Scheme to use for connecting to the host.
           * Defaults to HTTP.
           */
          scheme?: string;
        };
        /**
         * Number of seconds after the container has started before liveness probes are initiated.
         * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
         */
        initialDelaySeconds?: number;
        /**
         * How often (in seconds) to perform the probe.
         * Default to 10 seconds. Minimum value is 1.
         */
        periodSeconds?: number;
        /**
         * Minimum consecutive successes for the probe to be considered successful after having failed.
         * Defaults to 1. Must be 1 for liveness and startup. Minimum value is 1.
         */
        successThreshold?: number;
        /**
         * TCPSocket specifies a connection to a TCP port.
         */
        tcpSocket?: {
          /**
           * Optional: Host name to connect to, defaults to the pod IP.
           */
          host?: string;
          /**
           * Number or name of the port to access on the container.
           * Number must be in the range 1 to 65535.
           * Name must be an IANA_SVC_NAME.
           */
          port: number | string;
        };
        /**
         * Optional duration in seconds the pod needs to terminate gracefully upon probe failure.
         * The grace period is the duration in seconds after the processes running in the pod are sent
         * a termination signal and the time when the processes are forcibly halted with a kill signal.
         * Set this value longer than the expected cleanup time for your process.
         * If this value is nil, the pod's terminationGracePeriodSeconds will be used. Otherwise, this
         * value overrides the value provided by the pod spec.
         * Value must be non-negative integer. The value zero indicates stop immediately via
         * the kill signal (no opportunity to shut down).
         * This is a beta field and requires enabling ProbeTerminationGracePeriod feature gate.
         * Minimum value is 1. spec.terminationGracePeriodSeconds is used if unset.
         */
        terminationGracePeriodSeconds?: number;
        /**
         * Number of seconds after which the probe times out.
         * Defaults to 1 second. Minimum value is 1.
         * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
         */
        timeoutSeconds?: number;
      };
      /**
       * Compute Resources required by this Step.
       * Cannot be updated.
       * More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
       */
      resources?: {
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
       * SecurityContext defines the security options the Step should be run with.
       * If set, the fields of SecurityContext override the equivalent fields of PodSecurityContext.
       * More info: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/
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
       * DeprecatedStartupProbe indicates that the Pod has successfully initialized.
       * If specified, no other probes are executed until this completes successfully.
       * If this probe fails, the Pod will be restarted, just as if the livenessProbe failed.
       * This can be used to provide different probe parameters at the beginning of a Pod's lifecycle,
       * when it might take a long time to load data or warm a cache, than during steady-state operation.
       * This cannot be updated.
       * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
       *
       * Deprecated: This field will be removed in a future release.
       */
      startupProbe?: {
        /**
         * Exec specifies a command to execute in the container.
         */
        exec?: {
          /**
           * Command is the command line to execute inside the container, the working directory for the
           * command  is root ('/') in the container's filesystem. The command is simply exec'd, it is
           * not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use
           * a shell, you need to explicitly call out to that shell.
           * Exit status of 0 is treated as live/healthy and non-zero is unhealthy.
           */
          command?: Array<string>;
        };
        /**
         * Minimum consecutive failures for the probe to be considered failed after having succeeded.
         * Defaults to 3. Minimum value is 1.
         */
        failureThreshold?: number;
        /**
         * GRPC specifies a GRPC HealthCheckRequest.
         */
        grpc?: {
          /**
           * Port number of the gRPC service. Number must be in the range 1 to 65535.
           */
          port: number;
          /**
           * Service is the name of the service to place in the gRPC HealthCheckRequest
           * (see https://github.com/grpc/grpc/blob/master/doc/health-checking.md).
           *
           * If this is not specified, the default behavior is defined by gRPC.
           */
          service?: string;
        };
        /**
         * HTTPGet specifies an HTTP GET request to perform.
         */
        httpGet?: {
          /**
           * Host name to connect to, defaults to the pod IP. You probably want to set
           * "Host" in httpHeaders instead.
           */
          host?: string;
          /**
           * Custom headers to set in the request. HTTP allows repeated headers.
           */
          httpHeaders?: Array<{
            /**
             * The header field name.
             * This will be canonicalized upon output, so case-variant names will be understood as the same header.
             */
            name: string;
            /**
             * The header field value
             */
            value: string;
          }>;
          /**
           * Path to access on the HTTP server.
           */
          path?: string;
          /**
           * Name or number of the port to access on the container.
           * Number must be in the range 1 to 65535.
           * Name must be an IANA_SVC_NAME.
           */
          port: number | string;
          /**
           * Scheme to use for connecting to the host.
           * Defaults to HTTP.
           */
          scheme?: string;
        };
        /**
         * Number of seconds after the container has started before liveness probes are initiated.
         * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
         */
        initialDelaySeconds?: number;
        /**
         * How often (in seconds) to perform the probe.
         * Default to 10 seconds. Minimum value is 1.
         */
        periodSeconds?: number;
        /**
         * Minimum consecutive successes for the probe to be considered successful after having failed.
         * Defaults to 1. Must be 1 for liveness and startup. Minimum value is 1.
         */
        successThreshold?: number;
        /**
         * TCPSocket specifies a connection to a TCP port.
         */
        tcpSocket?: {
          /**
           * Optional: Host name to connect to, defaults to the pod IP.
           */
          host?: string;
          /**
           * Number or name of the port to access on the container.
           * Number must be in the range 1 to 65535.
           * Name must be an IANA_SVC_NAME.
           */
          port: number | string;
        };
        /**
         * Optional duration in seconds the pod needs to terminate gracefully upon probe failure.
         * The grace period is the duration in seconds after the processes running in the pod are sent
         * a termination signal and the time when the processes are forcibly halted with a kill signal.
         * Set this value longer than the expected cleanup time for your process.
         * If this value is nil, the pod's terminationGracePeriodSeconds will be used. Otherwise, this
         * value overrides the value provided by the pod spec.
         * Value must be non-negative integer. The value zero indicates stop immediately via
         * the kill signal (no opportunity to shut down).
         * This is a beta field and requires enabling ProbeTerminationGracePeriod feature gate.
         * Minimum value is 1. spec.terminationGracePeriodSeconds is used if unset.
         */
        terminationGracePeriodSeconds?: number;
        /**
         * Number of seconds after which the probe times out.
         * Defaults to 1 second. Minimum value is 1.
         * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
         */
        timeoutSeconds?: number;
      };
      /**
       * Whether this Step should allocate a buffer for stdin in the container runtime. If this
       * is not set, reads from stdin in the Step will always result in EOF.
       * Default is false.
       *
       * Deprecated: This field will be removed in a future release.
       */
      stdin?: boolean;
      /**
       * Whether the container runtime should close the stdin channel after it has been opened by
       * a single attach. When stdin is true the stdin stream will remain open across multiple attach
       * sessions. If stdinOnce is set to true, stdin is opened on container start, is empty until the
       * first client attaches to stdin, and then remains open and accepts data until the client disconnects,
       * at which time stdin is closed and remains closed until the container is restarted. If this
       * flag is false, a container processes that reads from stdin will never receive an EOF.
       * Default is false
       *
       * Deprecated: This field will be removed in a future release.
       */
      stdinOnce?: boolean;
      /**
       * Deprecated: This field will be removed in a future release and cannot be meaningfully used.
       */
      terminationMessagePath?: string;
      /**
       * Deprecated: This field will be removed in a future release and cannot be meaningfully used.
       */
      terminationMessagePolicy?: string;
      /**
       * Whether this Step should allocate a DeprecatedTTY for itself, also requires 'stdin' to be true.
       * Default is false.
       *
       * Deprecated: This field will be removed in a future release.
       */
      tty?: boolean;
      /**
       * volumeDevices is the list of block devices to be used by the Step.
       */
      volumeDevices?: Array<{
        /**
         * devicePath is the path inside of the container that the device will be mapped to.
         */
        devicePath: string;
        /**
         * name must match the name of a persistentVolumeClaim in the pod
         */
        name: string;
      }>;
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
    /**
     * Steps are the steps of the build; each step is run sequentially with the
     * source mounted into /workspace.
     */
    steps?: Array<{
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
       * List of sources to populate environment variables in the container.
       * The keys defined within a source must be a C_IDENTIFIER. All invalid keys
       * will be reported as an event when the container is starting. When a key exists in multiple
       * sources, the value associated with the last source will take precedence.
       * Values defined by an Env with a duplicate key will take precedence.
       * Cannot be updated.
       */
      envFrom?: Array<{
        /**
         * The ConfigMap to select from
         */
        configMapRef?: {
          /**
           * Name of the referent.
           * This field is effectively required, but due to backwards compatibility is
           * allowed to be empty. Instances of this type with an empty value here are
           * almost certainly wrong.
           * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
           */
          name?: string;
          /**
           * Specify whether the ConfigMap must be defined
           */
          optional?: boolean;
        };
        /**
         * An optional identifier to prepend to each key in the ConfigMap. Must be a C_IDENTIFIER.
         */
        prefix?: string;
        /**
         * The Secret to select from
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
          /**
           * Specify whether the Secret must be defined
           */
          optional?: boolean;
        };
      }>;
      /**
       * Image reference name to run for this Step.
       * More info: https://kubernetes.io/docs/concepts/containers/images
       */
      image?: string;
      /**
       * Image pull policy.
       * One of Always, Never, IfNotPresent.
       * Defaults to Always if :latest tag is specified, or IfNotPresent otherwise.
       * Cannot be updated.
       * More info: https://kubernetes.io/docs/concepts/containers/images#updating-images
       */
      imagePullPolicy?: string;
      /**
       * Actions that the management system should take in response to container lifecycle events.
       * Cannot be updated.
       *
       * Deprecated: This field will be removed in a future release.
       */
      lifecycle?: {
        /**
         * PostStart is called immediately after a container is created. If the handler fails,
         * the container is terminated and restarted according to its restart policy.
         * Other management of the container blocks until the hook completes.
         * More info: https://kubernetes.io/docs/concepts/containers/container-lifecycle-hooks/#container-hooks
         */
        postStart?: {
          /**
           * Exec specifies a command to execute in the container.
           */
          exec?: {
            /**
             * Command is the command line to execute inside the container, the working directory for the
             * command  is root ('/') in the container's filesystem. The command is simply exec'd, it is
             * not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use
             * a shell, you need to explicitly call out to that shell.
             * Exit status of 0 is treated as live/healthy and non-zero is unhealthy.
             */
            command?: Array<string>;
          };
          /**
           * HTTPGet specifies an HTTP GET request to perform.
           */
          httpGet?: {
            /**
             * Host name to connect to, defaults to the pod IP. You probably want to set
             * "Host" in httpHeaders instead.
             */
            host?: string;
            /**
             * Custom headers to set in the request. HTTP allows repeated headers.
             */
            httpHeaders?: Array<{
              /**
               * The header field name.
               * This will be canonicalized upon output, so case-variant names will be understood as the same header.
               */
              name: string;
              /**
               * The header field value
               */
              value: string;
            }>;
            /**
             * Path to access on the HTTP server.
             */
            path?: string;
            /**
             * Name or number of the port to access on the container.
             * Number must be in the range 1 to 65535.
             * Name must be an IANA_SVC_NAME.
             */
            port: number | string;
            /**
             * Scheme to use for connecting to the host.
             * Defaults to HTTP.
             */
            scheme?: string;
          };
          /**
           * Sleep represents a duration that the container should sleep.
           */
          sleep?: {
            /**
             * Seconds is the number of seconds to sleep.
             */
            seconds: number;
          };
          /**
           * Deprecated. TCPSocket is NOT supported as a LifecycleHandler and kept
           * for backward compatibility. There is no validation of this field and
           * lifecycle hooks will fail at runtime when it is specified.
           */
          tcpSocket?: {
            /**
             * Optional: Host name to connect to, defaults to the pod IP.
             */
            host?: string;
            /**
             * Number or name of the port to access on the container.
             * Number must be in the range 1 to 65535.
             * Name must be an IANA_SVC_NAME.
             */
            port: number | string;
          };
        };
        /**
         * PreStop is called immediately before a container is terminated due to an
         * API request or management event such as liveness/startup probe failure,
         * preemption, resource contention, etc. The handler is not called if the
         * container crashes or exits. The Pod's termination grace period countdown begins before the
         * PreStop hook is executed. Regardless of the outcome of the handler, the
         * container will eventually terminate within the Pod's termination grace
         * period (unless delayed by finalizers). Other management of the container blocks until the hook completes
         * or until the termination grace period is reached.
         * More info: https://kubernetes.io/docs/concepts/containers/container-lifecycle-hooks/#container-hooks
         */
        preStop?: {
          /**
           * Exec specifies a command to execute in the container.
           */
          exec?: {
            /**
             * Command is the command line to execute inside the container, the working directory for the
             * command  is root ('/') in the container's filesystem. The command is simply exec'd, it is
             * not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use
             * a shell, you need to explicitly call out to that shell.
             * Exit status of 0 is treated as live/healthy and non-zero is unhealthy.
             */
            command?: Array<string>;
          };
          /**
           * HTTPGet specifies an HTTP GET request to perform.
           */
          httpGet?: {
            /**
             * Host name to connect to, defaults to the pod IP. You probably want to set
             * "Host" in httpHeaders instead.
             */
            host?: string;
            /**
             * Custom headers to set in the request. HTTP allows repeated headers.
             */
            httpHeaders?: Array<{
              /**
               * The header field name.
               * This will be canonicalized upon output, so case-variant names will be understood as the same header.
               */
              name: string;
              /**
               * The header field value
               */
              value: string;
            }>;
            /**
             * Path to access on the HTTP server.
             */
            path?: string;
            /**
             * Name or number of the port to access on the container.
             * Number must be in the range 1 to 65535.
             * Name must be an IANA_SVC_NAME.
             */
            port: number | string;
            /**
             * Scheme to use for connecting to the host.
             * Defaults to HTTP.
             */
            scheme?: string;
          };
          /**
           * Sleep represents a duration that the container should sleep.
           */
          sleep?: {
            /**
             * Seconds is the number of seconds to sleep.
             */
            seconds: number;
          };
          /**
           * Deprecated. TCPSocket is NOT supported as a LifecycleHandler and kept
           * for backward compatibility. There is no validation of this field and
           * lifecycle hooks will fail at runtime when it is specified.
           */
          tcpSocket?: {
            /**
             * Optional: Host name to connect to, defaults to the pod IP.
             */
            host?: string;
            /**
             * Number or name of the port to access on the container.
             * Number must be in the range 1 to 65535.
             * Name must be an IANA_SVC_NAME.
             */
            port: number | string;
          };
        };
      };
      /**
       * Periodic probe of container liveness.
       * Step will be restarted if the probe fails.
       * Cannot be updated.
       * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
       *
       * Deprecated: This field will be removed in a future release.
       */
      livenessProbe?: {
        /**
         * Exec specifies a command to execute in the container.
         */
        exec?: {
          /**
           * Command is the command line to execute inside the container, the working directory for the
           * command  is root ('/') in the container's filesystem. The command is simply exec'd, it is
           * not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use
           * a shell, you need to explicitly call out to that shell.
           * Exit status of 0 is treated as live/healthy and non-zero is unhealthy.
           */
          command?: Array<string>;
        };
        /**
         * Minimum consecutive failures for the probe to be considered failed after having succeeded.
         * Defaults to 3. Minimum value is 1.
         */
        failureThreshold?: number;
        /**
         * GRPC specifies a GRPC HealthCheckRequest.
         */
        grpc?: {
          /**
           * Port number of the gRPC service. Number must be in the range 1 to 65535.
           */
          port: number;
          /**
           * Service is the name of the service to place in the gRPC HealthCheckRequest
           * (see https://github.com/grpc/grpc/blob/master/doc/health-checking.md).
           *
           * If this is not specified, the default behavior is defined by gRPC.
           */
          service?: string;
        };
        /**
         * HTTPGet specifies an HTTP GET request to perform.
         */
        httpGet?: {
          /**
           * Host name to connect to, defaults to the pod IP. You probably want to set
           * "Host" in httpHeaders instead.
           */
          host?: string;
          /**
           * Custom headers to set in the request. HTTP allows repeated headers.
           */
          httpHeaders?: Array<{
            /**
             * The header field name.
             * This will be canonicalized upon output, so case-variant names will be understood as the same header.
             */
            name: string;
            /**
             * The header field value
             */
            value: string;
          }>;
          /**
           * Path to access on the HTTP server.
           */
          path?: string;
          /**
           * Name or number of the port to access on the container.
           * Number must be in the range 1 to 65535.
           * Name must be an IANA_SVC_NAME.
           */
          port: number | string;
          /**
           * Scheme to use for connecting to the host.
           * Defaults to HTTP.
           */
          scheme?: string;
        };
        /**
         * Number of seconds after the container has started before liveness probes are initiated.
         * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
         */
        initialDelaySeconds?: number;
        /**
         * How often (in seconds) to perform the probe.
         * Default to 10 seconds. Minimum value is 1.
         */
        periodSeconds?: number;
        /**
         * Minimum consecutive successes for the probe to be considered successful after having failed.
         * Defaults to 1. Must be 1 for liveness and startup. Minimum value is 1.
         */
        successThreshold?: number;
        /**
         * TCPSocket specifies a connection to a TCP port.
         */
        tcpSocket?: {
          /**
           * Optional: Host name to connect to, defaults to the pod IP.
           */
          host?: string;
          /**
           * Number or name of the port to access on the container.
           * Number must be in the range 1 to 65535.
           * Name must be an IANA_SVC_NAME.
           */
          port: number | string;
        };
        /**
         * Optional duration in seconds the pod needs to terminate gracefully upon probe failure.
         * The grace period is the duration in seconds after the processes running in the pod are sent
         * a termination signal and the time when the processes are forcibly halted with a kill signal.
         * Set this value longer than the expected cleanup time for your process.
         * If this value is nil, the pod's terminationGracePeriodSeconds will be used. Otherwise, this
         * value overrides the value provided by the pod spec.
         * Value must be non-negative integer. The value zero indicates stop immediately via
         * the kill signal (no opportunity to shut down).
         * This is a beta field and requires enabling ProbeTerminationGracePeriod feature gate.
         * Minimum value is 1. spec.terminationGracePeriodSeconds is used if unset.
         */
        terminationGracePeriodSeconds?: number;
        /**
         * Number of seconds after which the probe times out.
         * Defaults to 1 second. Minimum value is 1.
         * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
         */
        timeoutSeconds?: number;
      };
      /**
       * Name of the Step specified as a DNS_LABEL.
       * Each Step in a Task must have a unique name.
       */
      name: string;
      /**
       * OnError defines the exiting behavior of a container on error
       * can be set to [ continue | stopAndFail ]
       */
      onError?: string;
      /**
       * Params declares parameters passed to this step action.
       */
      params?: Array<{
        name: string;
        value: any;
      }>;
      /**
       * List of ports to expose from the Step's container. Exposing a port here gives
       * the system additional information about the network connections a
       * container uses, but is primarily informational. Not specifying a port here
       * DOES NOT prevent that port from being exposed. Any port which is
       * listening on the default "0.0.0.0" address inside a container will be
       * accessible from the network.
       * Cannot be updated.
       *
       * Deprecated: This field will be removed in a future release.
       */
      ports?: Array<{
        /**
         * Number of port to expose on the pod's IP address.
         * This must be a valid port number, 0 < x < 65536.
         */
        containerPort: number;
        /**
         * What host IP to bind the external port to.
         */
        hostIP?: string;
        /**
         * Number of port to expose on the host.
         * If specified, this must be a valid port number, 0 < x < 65536.
         * If HostNetwork is specified, this must match ContainerPort.
         * Most containers do not need this.
         */
        hostPort?: number;
        /**
         * If specified, this must be an IANA_SVC_NAME and unique within the pod. Each
         * named port in a pod must have a unique name. Name for the port that can be
         * referred to by services.
         */
        name?: string;
        /**
         * Protocol for port. Must be UDP, TCP, or SCTP.
         * Defaults to "TCP".
         */
        protocol?: string;
      }>;
      /**
       * Periodic probe of container service readiness.
       * Step will be removed from service endpoints if the probe fails.
       * Cannot be updated.
       * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
       *
       * Deprecated: This field will be removed in a future release.
       */
      readinessProbe?: {
        /**
         * Exec specifies a command to execute in the container.
         */
        exec?: {
          /**
           * Command is the command line to execute inside the container, the working directory for the
           * command  is root ('/') in the container's filesystem. The command is simply exec'd, it is
           * not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use
           * a shell, you need to explicitly call out to that shell.
           * Exit status of 0 is treated as live/healthy and non-zero is unhealthy.
           */
          command?: Array<string>;
        };
        /**
         * Minimum consecutive failures for the probe to be considered failed after having succeeded.
         * Defaults to 3. Minimum value is 1.
         */
        failureThreshold?: number;
        /**
         * GRPC specifies a GRPC HealthCheckRequest.
         */
        grpc?: {
          /**
           * Port number of the gRPC service. Number must be in the range 1 to 65535.
           */
          port: number;
          /**
           * Service is the name of the service to place in the gRPC HealthCheckRequest
           * (see https://github.com/grpc/grpc/blob/master/doc/health-checking.md).
           *
           * If this is not specified, the default behavior is defined by gRPC.
           */
          service?: string;
        };
        /**
         * HTTPGet specifies an HTTP GET request to perform.
         */
        httpGet?: {
          /**
           * Host name to connect to, defaults to the pod IP. You probably want to set
           * "Host" in httpHeaders instead.
           */
          host?: string;
          /**
           * Custom headers to set in the request. HTTP allows repeated headers.
           */
          httpHeaders?: Array<{
            /**
             * The header field name.
             * This will be canonicalized upon output, so case-variant names will be understood as the same header.
             */
            name: string;
            /**
             * The header field value
             */
            value: string;
          }>;
          /**
           * Path to access on the HTTP server.
           */
          path?: string;
          /**
           * Name or number of the port to access on the container.
           * Number must be in the range 1 to 65535.
           * Name must be an IANA_SVC_NAME.
           */
          port: number | string;
          /**
           * Scheme to use for connecting to the host.
           * Defaults to HTTP.
           */
          scheme?: string;
        };
        /**
         * Number of seconds after the container has started before liveness probes are initiated.
         * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
         */
        initialDelaySeconds?: number;
        /**
         * How often (in seconds) to perform the probe.
         * Default to 10 seconds. Minimum value is 1.
         */
        periodSeconds?: number;
        /**
         * Minimum consecutive successes for the probe to be considered successful after having failed.
         * Defaults to 1. Must be 1 for liveness and startup. Minimum value is 1.
         */
        successThreshold?: number;
        /**
         * TCPSocket specifies a connection to a TCP port.
         */
        tcpSocket?: {
          /**
           * Optional: Host name to connect to, defaults to the pod IP.
           */
          host?: string;
          /**
           * Number or name of the port to access on the container.
           * Number must be in the range 1 to 65535.
           * Name must be an IANA_SVC_NAME.
           */
          port: number | string;
        };
        /**
         * Optional duration in seconds the pod needs to terminate gracefully upon probe failure.
         * The grace period is the duration in seconds after the processes running in the pod are sent
         * a termination signal and the time when the processes are forcibly halted with a kill signal.
         * Set this value longer than the expected cleanup time for your process.
         * If this value is nil, the pod's terminationGracePeriodSeconds will be used. Otherwise, this
         * value overrides the value provided by the pod spec.
         * Value must be non-negative integer. The value zero indicates stop immediately via
         * the kill signal (no opportunity to shut down).
         * This is a beta field and requires enabling ProbeTerminationGracePeriod feature gate.
         * Minimum value is 1. spec.terminationGracePeriodSeconds is used if unset.
         */
        terminationGracePeriodSeconds?: number;
        /**
         * Number of seconds after which the probe times out.
         * Defaults to 1 second. Minimum value is 1.
         * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
         */
        timeoutSeconds?: number;
      };
      /**
       * Contains the reference to an existing StepAction.
       */
      ref?: {
        /**
         * Name of the referenced step
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
       * Compute Resources required by this Step.
       * Cannot be updated.
       * More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
       */
      resources?: {
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
       * Results declares StepResults produced by the Step.
       *
       * It can be used in an inlined Step when used to store Results to $(step.results.resultName.path).
       * It cannot be used when referencing StepActions using [v1beta1.Step.Ref].
       * The Results declared by the StepActions will be stored here instead.
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
       * DeprecatedStartupProbe indicates that the Pod this Step runs in has successfully initialized.
       * If specified, no other probes are executed until this completes successfully.
       * If this probe fails, the Pod will be restarted, just as if the livenessProbe failed.
       * This can be used to provide different probe parameters at the beginning of a Pod's lifecycle,
       * when it might take a long time to load data or warm a cache, than during steady-state operation.
       * This cannot be updated.
       * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
       *
       * Deprecated: This field will be removed in a future release.
       */
      startupProbe?: {
        /**
         * Exec specifies a command to execute in the container.
         */
        exec?: {
          /**
           * Command is the command line to execute inside the container, the working directory for the
           * command  is root ('/') in the container's filesystem. The command is simply exec'd, it is
           * not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use
           * a shell, you need to explicitly call out to that shell.
           * Exit status of 0 is treated as live/healthy and non-zero is unhealthy.
           */
          command?: Array<string>;
        };
        /**
         * Minimum consecutive failures for the probe to be considered failed after having succeeded.
         * Defaults to 3. Minimum value is 1.
         */
        failureThreshold?: number;
        /**
         * GRPC specifies a GRPC HealthCheckRequest.
         */
        grpc?: {
          /**
           * Port number of the gRPC service. Number must be in the range 1 to 65535.
           */
          port: number;
          /**
           * Service is the name of the service to place in the gRPC HealthCheckRequest
           * (see https://github.com/grpc/grpc/blob/master/doc/health-checking.md).
           *
           * If this is not specified, the default behavior is defined by gRPC.
           */
          service?: string;
        };
        /**
         * HTTPGet specifies an HTTP GET request to perform.
         */
        httpGet?: {
          /**
           * Host name to connect to, defaults to the pod IP. You probably want to set
           * "Host" in httpHeaders instead.
           */
          host?: string;
          /**
           * Custom headers to set in the request. HTTP allows repeated headers.
           */
          httpHeaders?: Array<{
            /**
             * The header field name.
             * This will be canonicalized upon output, so case-variant names will be understood as the same header.
             */
            name: string;
            /**
             * The header field value
             */
            value: string;
          }>;
          /**
           * Path to access on the HTTP server.
           */
          path?: string;
          /**
           * Name or number of the port to access on the container.
           * Number must be in the range 1 to 65535.
           * Name must be an IANA_SVC_NAME.
           */
          port: number | string;
          /**
           * Scheme to use for connecting to the host.
           * Defaults to HTTP.
           */
          scheme?: string;
        };
        /**
         * Number of seconds after the container has started before liveness probes are initiated.
         * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
         */
        initialDelaySeconds?: number;
        /**
         * How often (in seconds) to perform the probe.
         * Default to 10 seconds. Minimum value is 1.
         */
        periodSeconds?: number;
        /**
         * Minimum consecutive successes for the probe to be considered successful after having failed.
         * Defaults to 1. Must be 1 for liveness and startup. Minimum value is 1.
         */
        successThreshold?: number;
        /**
         * TCPSocket specifies a connection to a TCP port.
         */
        tcpSocket?: {
          /**
           * Optional: Host name to connect to, defaults to the pod IP.
           */
          host?: string;
          /**
           * Number or name of the port to access on the container.
           * Number must be in the range 1 to 65535.
           * Name must be an IANA_SVC_NAME.
           */
          port: number | string;
        };
        /**
         * Optional duration in seconds the pod needs to terminate gracefully upon probe failure.
         * The grace period is the duration in seconds after the processes running in the pod are sent
         * a termination signal and the time when the processes are forcibly halted with a kill signal.
         * Set this value longer than the expected cleanup time for your process.
         * If this value is nil, the pod's terminationGracePeriodSeconds will be used. Otherwise, this
         * value overrides the value provided by the pod spec.
         * Value must be non-negative integer. The value zero indicates stop immediately via
         * the kill signal (no opportunity to shut down).
         * This is a beta field and requires enabling ProbeTerminationGracePeriod feature gate.
         * Minimum value is 1. spec.terminationGracePeriodSeconds is used if unset.
         */
        terminationGracePeriodSeconds?: number;
        /**
         * Number of seconds after which the probe times out.
         * Defaults to 1 second. Minimum value is 1.
         * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
         */
        timeoutSeconds?: number;
      };
      /**
       * Stores configuration for the stderr stream of the step.
       */
      stderrConfig?: {
        /**
         * Path to duplicate stdout stream to on container's local filesystem.
         */
        path?: string;
      };
      /**
       * Whether this container should allocate a buffer for stdin in the container runtime. If this
       * is not set, reads from stdin in the container will always result in EOF.
       * Default is false.
       *
       * Deprecated: This field will be removed in a future release.
       */
      stdin?: boolean;
      /**
       * Whether the container runtime should close the stdin channel after it has been opened by
       * a single attach. When stdin is true the stdin stream will remain open across multiple attach
       * sessions. If stdinOnce is set to true, stdin is opened on container start, is empty until the
       * first client attaches to stdin, and then remains open and accepts data until the client disconnects,
       * at which time stdin is closed and remains closed until the container is restarted. If this
       * flag is false, a container processes that reads from stdin will never receive an EOF.
       * Default is false
       *
       * Deprecated: This field will be removed in a future release.
       */
      stdinOnce?: boolean;
      /**
       * Stores configuration for the stdout stream of the step.
       */
      stdoutConfig?: {
        /**
         * Path to duplicate stdout stream to on container's local filesystem.
         */
        path?: string;
      };
      /**
       * Deprecated: This field will be removed in a future release and can't be meaningfully used.
       */
      terminationMessagePath?: string;
      /**
       * Deprecated: This field will be removed in a future release and can't be meaningfully used.
       */
      terminationMessagePolicy?: string;
      /**
       * Timeout is the time after which the step times out. Defaults to never.
       * Refer to Go's ParseDuration documentation for expected format: https://golang.org/pkg/time/#ParseDuration
       */
      timeout?: string;
      /**
       * Whether this container should allocate a DeprecatedTTY for itself, also requires 'stdin' to be true.
       * Default is false.
       *
       * Deprecated: This field will be removed in a future release.
       */
      tty?: boolean;
      /**
       * volumeDevices is the list of block devices to be used by the Step.
       */
      volumeDevices?: Array<{
        /**
         * devicePath is the path inside of the container that the device will be mapped to.
         */
        devicePath: string;
        /**
         * name must match the name of a persistentVolumeClaim in the pod
         */
        name: string;
      }>;
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
       * WhenExpressions are used to specify whether a Task should be executed or skipped
       * All of them need to evaluate to True for a guarded Task to be executed.
       */
      when?: Array<{
        /**
         * CEL is a string of Common Language Expression, which can be used to conditionally execute
         * the task based on the result of the expression evaluation
         * More info about CEL syntax: https://github.com/google/cel-spec/blob/master/doc/langdef.md
         */
        cel?: string;
        /**
         * Input is the string for guard checking which can be a static input or an output from a parent Task
         */
        input?: string;
        /**
         * Operator that represents an Input's relationship to the values
         */
        operator?: string;
        /**
         * Values is an array of strings, which is compared against the input, for guard checking
         * It must be non-empty
         */
        values?: Array<string>;
      }>;
      /**
       * Step's working directory.
       * If not specified, the container runtime's default will be used, which
       * might be configured in the container image.
       * Cannot be updated.
       */
      workingDir?: string;
      /**
       * This is an alpha field. You must set the "enable-api-fields" feature flag to "alpha"
       * for this field to be supported.
       *
       * Workspaces is a list of workspaces from the Task that this Step wants
       * exclusive access to. Adding a workspace to this list means that any
       * other Step or Sidecar that does not also request this Workspace will
       * not have access to it.
       */
      workspaces?: Array<{
        /**
         * MountPath is the path that the workspace should be mounted to inside the Step or Sidecar,
         * overriding any MountPath specified in the Task's WorkspaceDeclaration.
         */
        mountPath: string;
        /**
         * Name is the name of the workspace this Step or Sidecar wants access to.
         */
        name: string;
      }>;
    }>;
    /**
     * Volumes is a collection of volumes that are available to mount into the
     * steps of the build.
     * See Pod.spec.volumes (API version: v1)
     */
    volumes?: any;
    /**
     * Workspaces are the volumes that this Task requires.
     */
    workspaces?: Array<{
      /**
       * Description is an optional human readable description of this volume.
       */
      description?: string;
      /**
       * MountPath overrides the directory that the volume will be made available at.
       */
      mountPath?: string;
      /**
       * Name is the name by which you can bind the volume at runtime.
       */
      name: string;
      /**
       * Optional marks a Workspace as not being required in TaskRuns. By default
       * this field is false and so declared workspaces are required.
       */
      optional?: boolean;
      /**
       * ReadOnly dictates whether a mounted volume is writable. By default this
       * field is false and so mounted volumes are writable.
       */
      readOnly?: boolean;
    }>;
  };
}

/**
 * Task represents a collection of sequential steps that are run as part of a
 * Pipeline using a set of inputs and producing a set of outputs. Tasks execute
 * when TaskRuns are created that provide the input parameters and resources and
 * output resources the Task requires.
 *
 * Deprecated: Please use v1.Task instead.
 */
export class Task extends Model<ITask> implements ITask {
  apiVersion: ITask['apiVersion'];
  kind: ITask['kind'];
  metadata?: ITask['metadata'];
  spec?: ITask['spec'];

  static apiVersion: ITask['apiVersion'] = 'tekton.dev/v1beta1';
  static kind: ITask['kind'] = 'Task';
  static is = createTypeMetaGuard<ITask>(Task);

  constructor(data?: ModelData<ITask>) {
    super();

    this.setDefinedProps({
      apiVersion: Task.apiVersion,
      kind: Task.kind,
      ...data,
    } as ITask);
  }
}

setValidateFunc(Task, validate as ValidateFunc<ITask>);

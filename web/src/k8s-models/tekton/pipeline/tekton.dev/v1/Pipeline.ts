import type { IObjectMeta } from '@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta';
import {
  createTypeMetaGuard,
  Model,
  type ModelData,
  setValidateFunc,
} from '@kubernetes-models/base';
import type { ValidateFunc } from '@kubernetes-models/validate';
import { validate } from '../../_schemas/TektonDevV1Pipeline';

/**
 * Pipeline describes a list of Tasks to execute. It expresses how outputs
 * of tasks feed into inputs of subsequent tasks.
 */
export interface IPipeline {
  /**
   * APIVersion defines the versioned schema of this representation of an object.
   * Servers should convert recognized schemas to the latest internal value, and
   * may reject unrecognized values.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   */
  apiVersion: 'tekton.dev/v1';
  /**
   * Kind is a string value representing the REST resource this object represents.
   * Servers may infer this from the endpoint the client submits requests to.
   * Cannot be updated.
   * In CamelCase.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   */
  kind: 'Pipeline';
  metadata?: IObjectMeta;
  /**
   * Spec holds the desired state of the Pipeline from the client
   */
  spec?: {
    /**
     * Description is a user-facing description of the pipeline that may be
     * used to populate a UI.
     */
    description?: string;
    /**
     * DisplayName is a user-facing name of the pipeline that may be
     * used to populate a UI.
     */
    displayName?: string;
    /**
     * Finally declares the list of Tasks that execute just before leaving the Pipeline
     * i.e. either after all Tasks are finished executing successfully
     * or after a failure which would result in ending the Pipeline
     */
    finally?: Array<{
      /**
       * Description is the description of this task within the context of a Pipeline.
       * This description may be used to populate a UI.
       */
      description?: string;
      /**
       * DisplayName is the display name of this task within the context of a Pipeline.
       * This display name may be used to populate a UI.
       */
      displayName?: string;
      /**
       * Matrix declares parameters used to fan out this task.
       */
      matrix?: {
        /**
         * Include is a list of IncludeParams which allows passing in specific combinations of Parameters into the Matrix.
         */
        include?: Array<{
          /**
           * Name the specified combination
           */
          name?: string;
          /**
           * Params takes only `Parameters` of type `"string"`
           * The names of the `params` must match the names of the `params` in the underlying `Task`
           */
          params?: Array<{
            name: string;
            value: any;
          }>;
        }>;
        /**
         * Params is a list of parameters used to fan out the pipelineTask
         * Params takes only `Parameters` of type `"array"`
         * Each array element is supplied to the `PipelineTask` by substituting `params` of type `"string"` in the underlying `Task`.
         * The names of the `params` in the `Matrix` must match the names of the `params` in the underlying `Task` that they will be substituting.
         */
        params?: Array<{
          name: string;
          value: any;
        }>;
      };
      /**
       * Name is the name of this task within the context of a Pipeline. Name is
       * used as a coordinate with the `from` and `runAfter` fields to establish
       * the execution order of tasks relative to one another.
       */
      name?: string;
      /**
       * OnError defines the exiting behavior of a PipelineRun on error
       * can be set to [ continue | stopAndFail ]
       */
      onError?: string;
      /**
       * Parameters declares parameters passed to this task.
       */
      params?: Array<{
        name: string;
        value: any;
      }>;
      /**
       * PipelineRef is a reference to a pipeline definition
       * Note: PipelineRef is in preview mode and not yet supported
       */
      pipelineRef?: {
        /**
         * API version of the referent
         */
        apiVersion?: string;
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
       * PipelineSpec is a specification of a pipeline
       * Note: PipelineSpec is in preview mode and not yet supported
       * Specifying PipelineSpec can be disabled by setting
       * `disable-inline-spec` feature flag.
       * See Pipeline.spec (API version: tekton.dev/v1)
       */
      pipelineSpec?: any;
      /**
       * Retries represents how many times this task should be retried in case of task failure: ConditionSucceeded set to False
       */
      retries?: number;
      /**
       * RunAfter is the list of PipelineTask names that should be executed before
       * this Task executes. (Used to force a specific ordering in graph execution.)
       */
      runAfter?: Array<string>;
      /**
       * TaskRef is a reference to a task definition.
       */
      taskRef?: {
        /**
         * API version of the referent
         * Note: A Task with non-empty APIVersion and Kind is considered a Custom Task
         */
        apiVersion?: string;
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
       * TaskSpec is a specification of a task
       * Specifying TaskSpec can be disabled by setting
       * `disable-inline-spec` feature flag.
       * See Task.spec (API version: tekton.dev/v1)
       */
      taskSpec?: any;
      /**
       * Time after which the TaskRun times out. Defaults to 1 hour.
       * Refer Go's ParseDuration documentation for expected format: https://golang.org/pkg/time/#ParseDuration
       */
      timeout?: string;
      /**
       * When is a list of when expressions that need to be true for the task to run
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
       * Workspaces maps workspaces from the pipeline spec to the workspaces
       * declared in the Task.
       */
      workspaces?: Array<{
        /**
         * Name is the name of the workspace as declared by the task
         */
        name: string;
        /**
         * SubPath is optionally a directory on the volume which should be used
         * for this binding (i.e. the volume will be mounted at this sub directory).
         */
        subPath?: string;
        /**
         * Workspace is the name of the workspace declared by the pipeline
         */
        workspace?: string;
      }>;
    }>;
    /**
     * Params declares a list of input parameters that must be supplied when
     * this Pipeline is run.
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
     * Results are values that this pipeline can output once run
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
       * Type is the user-specified type of the result.
       * The possible types are 'string', 'array', and 'object', with 'string' as the default.
       * 'array' and 'object' types are alpha features.
       */
      type?: string;
      /**
       * Value the expression used to retrieve the value
       */
      value: any;
    }>;
    /**
     * Tasks declares the graph of Tasks that execute when this Pipeline is run.
     */
    tasks?: Array<{
      /**
       * Description is the description of this task within the context of a Pipeline.
       * This description may be used to populate a UI.
       */
      description?: string;
      /**
       * DisplayName is the display name of this task within the context of a Pipeline.
       * This display name may be used to populate a UI.
       */
      displayName?: string;
      /**
       * Matrix declares parameters used to fan out this task.
       */
      matrix?: {
        /**
         * Include is a list of IncludeParams which allows passing in specific combinations of Parameters into the Matrix.
         */
        include?: Array<{
          /**
           * Name the specified combination
           */
          name?: string;
          /**
           * Params takes only `Parameters` of type `"string"`
           * The names of the `params` must match the names of the `params` in the underlying `Task`
           */
          params?: Array<{
            name: string;
            value: any;
          }>;
        }>;
        /**
         * Params is a list of parameters used to fan out the pipelineTask
         * Params takes only `Parameters` of type `"array"`
         * Each array element is supplied to the `PipelineTask` by substituting `params` of type `"string"` in the underlying `Task`.
         * The names of the `params` in the `Matrix` must match the names of the `params` in the underlying `Task` that they will be substituting.
         */
        params?: Array<{
          name: string;
          value: any;
        }>;
      };
      /**
       * Name is the name of this task within the context of a Pipeline. Name is
       * used as a coordinate with the `from` and `runAfter` fields to establish
       * the execution order of tasks relative to one another.
       */
      name?: string;
      /**
       * OnError defines the exiting behavior of a PipelineRun on error
       * can be set to [ continue | stopAndFail ]
       */
      onError?: string;
      /**
       * Parameters declares parameters passed to this task.
       */
      params?: Array<{
        name: string;
        value: any;
      }>;
      /**
       * PipelineRef is a reference to a pipeline definition
       * Note: PipelineRef is in preview mode and not yet supported
       */
      pipelineRef?: {
        /**
         * API version of the referent
         */
        apiVersion?: string;
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
       * PipelineSpec is a specification of a pipeline
       * Note: PipelineSpec is in preview mode and not yet supported
       * Specifying PipelineSpec can be disabled by setting
       * `disable-inline-spec` feature flag.
       * See Pipeline.spec (API version: tekton.dev/v1)
       */
      pipelineSpec?: any;
      /**
       * Retries represents how many times this task should be retried in case of task failure: ConditionSucceeded set to False
       */
      retries?: number;
      /**
       * RunAfter is the list of PipelineTask names that should be executed before
       * this Task executes. (Used to force a specific ordering in graph execution.)
       */
      runAfter?: Array<string>;
      /**
       * TaskRef is a reference to a task definition.
       */
      taskRef?: {
        /**
         * API version of the referent
         * Note: A Task with non-empty APIVersion and Kind is considered a Custom Task
         */
        apiVersion?: string;
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
       * TaskSpec is a specification of a task
       * Specifying TaskSpec can be disabled by setting
       * `disable-inline-spec` feature flag.
       * See Task.spec (API version: tekton.dev/v1)
       */
      taskSpec?: any;
      /**
       * Time after which the TaskRun times out. Defaults to 1 hour.
       * Refer Go's ParseDuration documentation for expected format: https://golang.org/pkg/time/#ParseDuration
       */
      timeout?: string;
      /**
       * When is a list of when expressions that need to be true for the task to run
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
       * Workspaces maps workspaces from the pipeline spec to the workspaces
       * declared in the Task.
       */
      workspaces?: Array<{
        /**
         * Name is the name of the workspace as declared by the task
         */
        name: string;
        /**
         * SubPath is optionally a directory on the volume which should be used
         * for this binding (i.e. the volume will be mounted at this sub directory).
         */
        subPath?: string;
        /**
         * Workspace is the name of the workspace declared by the pipeline
         */
        workspace?: string;
      }>;
    }>;
    /**
     * Workspaces declares a set of named workspaces that are expected to be
     * provided by a PipelineRun.
     */
    workspaces?: Array<{
      /**
       * Description is a human readable string describing how the workspace will be
       * used in the Pipeline. It can be useful to include a bit of detail about which
       * tasks are intended to have access to the data on the workspace.
       */
      description?: string;
      /**
       * Name is the name of a workspace to be provided by a PipelineRun.
       */
      name: string;
      /**
       * Optional marks a Workspace as not being required in PipelineRuns. By default
       * this field is false and so declared workspaces are required.
       */
      optional?: boolean;
    }>;
  };
}

/**
 * Pipeline describes a list of Tasks to execute. It expresses how outputs
 * of tasks feed into inputs of subsequent tasks.
 */
export class Pipeline extends Model<IPipeline> implements IPipeline {
  apiVersion: IPipeline['apiVersion'];
  kind: IPipeline['kind'];
  metadata?: IPipeline['metadata'];
  spec?: IPipeline['spec'];

  static apiVersion: IPipeline['apiVersion'] = 'tekton.dev/v1';
  static kind: IPipeline['kind'] = 'Pipeline';
  static is = createTypeMetaGuard<IPipeline>(Pipeline);

  constructor(data?: ModelData<IPipeline>) {
    super();

    this.setDefinedProps({
      apiVersion: Pipeline.apiVersion,
      kind: Pipeline.kind,
      ...data,
    } as IPipeline);
  }
}

setValidateFunc(Pipeline, validate as ValidateFunc<IPipeline>);

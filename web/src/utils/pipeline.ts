import { IPipeline, IPipelineRun } from "@/k8s-models/tekton/pipeline/tekton.dev/v1";
export type PipeLineWorkspace = {
  // Name is the name of a workspace to be provided by a PipelineRun.
  name: string;
  // Description is a human readable string describing how the workspace will be
  // used in the IPipeline. It can be useful to include a bit of detail about which
  // tasks are intended to have access to the data on the workspace.
  // +optional
  description?: string;
  // Optional marks a Workspace as not being required in PipelineRuns. By default
  // this field is false and so declared workspaces are required.
  optional?: boolean;
};
export type WorkspaceDeclaration = {
  // Name is the name by which you can bind the volume at runtime.
  name: string;
  // Description is an optional human readable description of this volume.
  // +optional
  description?: string;
  // MountPath overrides the directory that the volume will be made available at.
  // +optional
  mountPath?: string;
  // ReadOnly dictates whether a mounted volume is writable. By default this
  // field is false and so mounted volumes are writable.
  readOnly?: boolean;
  // Optional marks a Workspace as not being required in TaskRuns. By default
  // this field is false and so declared workspaces are required.
  optional?: boolean;
};
export const resetClusterPipeline = (
  org: string,
  cluster: string,
  namespace: string,
  action: string,
  pipeline: IPipeline
) => {
  if (action === "create") {
    sessionStorage.removeItem(`pipeline|${org}|${cluster}|${namespace}`);
  } else if (action === "update") {
    sessionStorage.removeItem(
      `pipeline|${org}|${cluster}|${namespace}|${pipeline.metadata?.name}`
    );
  }
};
export const saveClusterPipeline = (
  org: string,
  cluster: string,
  namespace: string,
  action: string,
  pipeline: IPipeline
) => {
  const pipelineString = JSON.stringify(pipeline);
  if (action === "create") {
    sessionStorage.setItem(
      `pipeline|${org}|${cluster}|${namespace}`,
      pipelineString
    );
  } else if (action === "update") {
    sessionStorage.setItem(
      `pipeline|${org}|${cluster}|${namespace}|${pipeline.metadata?.name}`,
      pipelineString
    );
  }
};
export const getClusterPipeline = (
  org: string,
  cluster: string,
  namespace: string,
  action: string,
  name: string
): IPipeline => {
  if (action === "create") {
    return JSON.parse(
      sessionStorage.getItem(`pipeline|${org}|${cluster}|${namespace}`) || "{}"
    ) as IPipeline;
  } else if (action === "update") {
    return JSON.parse(
      sessionStorage.getItem(
        `pipeline|${org}|${cluster}|${namespace}|${name}`
      ) || "{}"
    ) as IPipeline;
  } else {
    return {} as IPipeline;
  }
};
export const scanPipelineDependencies = (pipeline: IPipeline): IPipeline => {
  if (pipeline?.spec && pipeline.spec?.tasks) {
    //处理隐式依赖，隐式依赖如下
    // name: task-b
    // params:
    //   - name: input
    //     value: $(tasks.task-a.results.my-result)
    for (let i = 0; i < pipeline.spec?.tasks?.length; i++) {
      const task = pipeline.spec.tasks[i];
      if (task.params) {
        for (let j = 0; j < task.params.length; j++) {
          const param = task.params[j];
          if (
            typeof param.value === "string" &&
            param.value.startsWith("$(tasks.")
          ) {
            const sp = param.value.split(".");
            if (sp.length === 4) {
              const runAfterTask = sp[1];
              if (runAfterTask.trim().length > 0) {
                if (!task.runAfter?.includes(runAfterTask)) {
                  task.runAfter?.push(runAfterTask);
                }
              }
            }
          }
        }
        if (task.when && task.when.length > 0) {
          for (let k = 0; k < task.when.length; k++) {
            const expression = task.when[k];
            if (expression?.input?.startsWith("$(tasks.")) {
              const sp = expression.input.split(".");
              if (sp.length === 4) {
                const runAfterTask = sp[1];
                if (runAfterTask.trim().length > 0) {
                  if (!task.runAfter?.includes(runAfterTask)) {
                    task.runAfter?.push(runAfterTask);
                  }
                }
              }
            }
          }
        }
        pipeline.spec.tasks[i] = task;
      }
    }
  }
  return pipeline;
};

export type WhenExpression = {
  input: string;
  operator: "!" | "=" | "==" | "in" | "!=" | "notin" | "exists" | "gt" | "lt";
  values: string[];
  cel?: string;
};

export type PipelineTaskParam = {
  name: string;
  source: "pipelineParam" | "taskResult" | "custom";
  type: "string" | "array" | "object";
  taskName?: string;
  valueKey?: string;
  default: any;
  value: any;
  description: string;
};
function mergeParams(
  A: PipelineTaskParam[],
  B: PipelineTaskParam[]
): PipelineTaskParam[] {
  // 构建 A 中 (name, source) 的唯一键集合，用于快速查找
  const aKeys = new Set(A.map((item) => `${item.name}|${item.source}`));

  // 保留 A 的所有项，加上 B 中不冲突的项
  const merged = [...A];

  for (const item of B) {
    const key = `${item.name}|${item.source}`;
    if (!aKeys.has(key)) {
      merged.push(item);
    }
  }
  return merged;
}
export function getAllUpstreamNodes(
  edges: { source: string; target: string }[],
  targetNodeId: string
): string[] {
  // 构建反向邻接表：target -> [sources]
  const reverseGraph: Record<string, string[]> = {};

  for (const edge of edges) {
    const { source, target } = edge;
    if (!reverseGraph[target]) {
      reverseGraph[target] = [];
    }
    reverseGraph[target].push(source);
  }

  // 使用 DFS 遍历所有上游节点
  const visited = new Set<string>();
  const stack: string[] = [targetNodeId];

  while (stack.length > 0) {
    const current = stack.pop()!;
    if (visited.has(current)) continue;
    visited.add(current);

    const upstreams = reverseGraph[current] || [];
    for (const upstream of upstreams) {
      if (!visited.has(upstream)) {
        stack.push(upstream);
      }
    }
  }

  // 移除目标节点自身（只保留真正的上游）
  visited.delete(targetNodeId);

  return Array.from(visited);
}
// utils/dag.ts

/**
 * 检查有向图是否存在环（DFS + 三色标记法）
 * @param edges 边列表，格式：{ id: string; source: string; target: string }[]
 * @returns boolean 是否有环
 */ export function isCyclic(
  edges: { source: string; target: string }[]
): boolean {
  // 清理无效边
  const validEdges = edges.filter((e) => e.source !== e.target);

  // 构建图
  const graph = new Map<string, string[]>();
  const allNodes = new Set<string>();

  for (const { source, target } of validEdges) {
    if (!graph.has(source)) graph.set(source, []);
    graph.get(source)!.push(target);
    allNodes.add(source);
    allNodes.add(target);
  }

  // 三色法 DFS
  const color = new Map<string, number>();
  for (const node of allNodes) {
    color.set(node, 0);
  }

  function dfs(node: string): boolean {
    color.set(node, 1);
    const neighbors = graph.get(node) || [];
    for (const neighbor of neighbors) {
      if (color.get(neighbor) === 1) return true;
      if (color.get(neighbor) === 0 && dfs(neighbor)) return true;
    }
    color.set(node, 2);
    return false;
  }

  for (const node of allNodes) {
    if (color.get(node) === 0 && dfs(node)) return true;
  }

  return false;
}
export type WorkspacePipelineTaskBinding = {
  // Name is the name of the workspace as declared by the task
  name: string;
  // Workspace is the name of the workspace declared by the pipeline
  // +optional
  workspace?: string;
  // SubPath is optionally a directory on the volume which should be used
  // for this binding (i.e. the volume will be mounted at this sub directory).
  // +optional
  subPath?: string;
};

export type PipelineWorkspaceDeclaration = {
  // Name is the name of a workspace to be provided by a PipelineRun.
  name: string;
  // Description is a human readable string describing how the workspace will be
  // used in the IPipeline. It can be useful to include a bit of detail about which
  // tasks are intended to have access to the data on the workspace.
  // +optional
  description?: string;
  // Optional marks a Workspace as not being required in PipelineRuns. By default
  // this field is false and so declared workspaces are required.
  optional?: boolean;
};
export function mergeByName(primary, secondary) {
  const primaryMap = new Map(primary.map((item) => [item.name, item]));
  const result = [...primary];

  for (const item of secondary) {
    if (!primaryMap.has(item.name)) {
      result.push(item);
    }
  }

  return result;
}
export function getParamInfo(value: string) {
  const match = value.match(/^\$\(params\.([^\)]+)\)$/);
  return match ? match[1] : "";
}
export function getResultInfo(value: string) {
  const match = value.split(".");

  return { task: match[1], param: removeSuffix(match[3], ")") };
}
function removeSuffix(str: string, suffix: string): string {
  if (str.endsWith(suffix)) {
    return str.slice(0, -suffix.length);
  }
  return str;
}
export interface PipelineTaskDef {
  /**
   * Description is the description of this task within the context of a IPipeline.
   * This description may be used to populate a UI.
   */
  description?: string;
  /**
   * DisplayName is the display name of this task within the context of a IPipeline.
   * This display name may be used to populate a UI.
   */
  displayName?: string;

  /**
   * Name is the name of this task within the context of a IPipeline. Name is
   * used as a coordinate with the `from` and `runAfter` fields to establish
   * the execution order of tasks relative to one another.
   */
  name?: string;

  /**
   * Parameters declares parameters passed to this task.
   */
  params?: Array<{
    name: string;
    value: any;
  }>;

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
}
export function isValidTimeout(value: string) {
  // 允许值为字符串或数字（但数字会被转为字符串）
  if (value == null || value === "") return false;

  const str = String(value).trim();

  // 正则：开头是整数（>=0），结尾是 s / m / h（大小写不敏感）
  const timeoutRegex = /^([1-9]\d*|0)([smh])$/i;

  return timeoutRegex.test(str);
}
 
 

export function getPipelineRunStatus(pipelineRun: IPipelineRun): 'success' | 'error' {
  const conditions = pipelineRun.status?.conditions;

  if (!conditions || conditions.length === 0) {
    // 没有状态条件，通常表示尚未开始或资源异常
    return 'error';
  }

  // 找到 type 为 'Succeeded' 的 condition（Tekton 规范中这是主状态）
  const succeededCondition = conditions.find(cond => cond.type === 'Succeeded');

  if (!succeededCondition) {
    return 'error';
  }

  // 只有 status 为 'True' 且 reason 是 Completed 或 Succeeded 时才算成功
  if (
    succeededCondition.status === 'True' &&
    (succeededCondition.reason === 'Completed' || succeededCondition.reason === 'Succeeded')
  ) {
    return 'success';
  }

  // 其他情况：Failed, StoppedRunFinally, Cancelled, Running（status=False/Unknown）等
  return 'error';
}
import { getClusterApiVersions, getCurrentViewInfo } from "@/utils/global";
import { ModalForm, PageContainer, ProColumns, ProDescriptions, ProFormDependency, ProFormSelect, ProFormText, ProFormTextArea, ProTable } from "@ant-design/pro-components"
import { Button, Form, message, Popconfirm, Splitter, Tabs, theme, Tooltip } from "antd";
import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import Sidebar from "@/pages/kubernetes/namespace/devops/cicd/tekton/pipeline/lego/Sidebar";
import '@xyflow/react/dist/style.css';
import dagre from '@dagrejs/dagre';
import { DnDProvider, useDnD } from '@/pages/kubernetes/namespace/devops/cicd/tekton/pipeline/lego/DnDContext';
import TopRightButton from '@/pages/kubernetes/namespace/devops/cicd/tekton/pipeline/lego/biz-actions';
import { ReactFlow, ReactFlowProvider, useNodesState, useEdgesState, Controls, useReactFlow, Background, ConnectionLineType, Connection, applyEdgeChanges, EdgeChange, Edge, Node, applyNodeChanges } from '@xyflow/react';
import { DeleteOutlined, EditOutlined, PartitionOutlined } from "@ant-design/icons";
import StartNode from "@/pages/kubernetes/namespace/devops/cicd/tekton/nodes/start";
import StopNode from "@/pages/kubernetes/namespace/devops/cicd/tekton/nodes/stop";
import FinallyNode from "@/pages/kubernetes/namespace/devops/cicd/tekton/nodes/finally";
import TaskNode, { TaskCanUseParams, TaskProps } from "@/pages/kubernetes/namespace/devops/cicd/tekton/nodes/task";
import { FormattedMessage, useIntl, useModel, useParams } from "@umijs/max";
import { IPipeline, Task } from "@/k8s-models/tekton/pipeline/tekton.dev/v1";
import { clusterGetProxy, clusterPostProxy, clusterPutProxy } from "@/services/cluster_proxy.api";
import { ParamSpec, TaskResult } from "@/services/tekton_pipeline_def";
import { getAllUpstreamNodes, getClusterPipeline, PipelineTaskDef, PipeLineWorkspace, resetClusterPipeline, saveClusterPipeline, scanPipelineDependencies, WhenExpression } from "@/utils/pipeline";
import { Drawer } from "antd/lib";
import { getClusterResource } from "@/utils/cluster";
import ResourceEditor from "@/pages/kubernetes/components/resource_editor";
import { isCyclic } from "@/utils/pipeline";
import FinallySeparator from "@/pages/kubernetes/namespace/devops/cicd/tekton/pipeline/lego/separator";

const nodeTypes = {
  start: StartNode,
  stop: StopNode,
  finally: FinallyNode,
  task: TaskNode,
}
const DnDFlow = () => {
  const { fitView } = useReactFlow(); // 👈 添加这一行
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const { screenToFlowPosition } = useReactFlow();
  const [layout, setLayout] = useState<'horizontal' | 'vertical'>('horizontal');//horizontal ,vertical
  const rotation = layout === 'horizontal' ? 90 : 0;
  const [type] = useDnD();
  const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  const nodeWidth = 200;
  const nodeHeight = 100;
  const { token } = theme.useToken();
  const colorPrimary = token.colorPrimary;
  const [showBaseDrawer, setShowBaseDrawer] = useState<boolean>(false);
  const { cluster, namespace } = getCurrentViewInfo();
  const initialLineType = sessionStorage.getItem('line-type') || ConnectionLineType.Bezier;
  const [lineType, setLineType] = useState(initialLineType);
  const [yamlView, setYamlView] = useState<boolean>(false);
  const [drawerSize, setDrawerSize] = useState<number>(800);
  const intl = useIntl();
  const requestParams = useParams();
  const action = requestParams.action || 'detail';
  const resourceName = requestParams.name;
  const [pipeline, setPipeline] = useState<IPipeline>({} as IPipeline);
  const resourceGroup = getClusterApiVersions(cluster, ['tekton.dev/v1'], 'Task');
  const pipelineResourceGroup = getClusterApiVersions(cluster, ['tekton.dev/v1'], 'Pipeline');
  const taskAddress = `apis/${resourceGroup?.groupVersion}/namespaces/${namespace}/tasks`;
  const pipelineAddress = `apis/${pipelineResourceGroup?.groupVersion}/namespaces/${namespace}/pipelines`;
  const [dropInfo, setDropInfo] = useState<{ position: { x: number; y: number }; taskRef: string } | null>(null);
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
  const [dropForm] = Form.useForm();
  const [paramModalFormVisiable, setParamModalFormVisiable] = useState<boolean>(false);
  const [selectedParam, setSelectParam] = useState<ParamSpec>();
  const [workspaceModalFormVisiable, setWorkspaceModalFormVisiable] = useState<boolean>(false);
  const [selectedWorkspace, setSelectWorkspace] = useState<PipeLineWorkspace>();
  const [existNames, setExistNames] = useState<string[]>([]);
  const [nodeAddInitValues, setNodeAddInitValues] = useState<Record<string, any>>({});
  const taskMap = useMemo<Record<string, Task>>(() => {
    const map: Record<string, Task> = {};
    tasks.forEach(task => {
      const name = task.metadata?.name;
      if (name) {
        map[name] = task;
      }
    });
    return map;
  }, [tasks]);

  const listTasks = async () => {
    const params = { cluster: cluster, address: taskAddress } as Record<string, any>;
    const data = await clusterGetProxy(params);
    for (let i = 0; i < data.items.length; i++) {
      data.items[i].apiVersion = data.apiVersion;
      data.items[i].kind = 'Task';
      if (data.items[i].metadata?.annotations && data.items[i].metadata?.annotations['kubectl.kubernetes.io/last-applied-configuration']) {
        delete data.items[i].metadata.annotations['kubectl.kubernetes.io/last-applied-configuration']
      }
      if (data.items[i].metadata?.managedFields) {
        delete data.items[i].metadata.managedFields
      }

    }
    setTasks(data.items || []);
  };
  const savePipeline = async () => {
    if (action === 'update') {
      const params = { cluster: cluster, address: `${pipelineAddress}/${resourceName}` } as Record<string, any>;
      await clusterPutProxy(params, pipeline);
    } else if (action === 'create') {
      const params = { cluster: cluster, address: `${pipelineAddress}` } as Record<string, any>;
      await clusterPostProxy(params, pipeline);
    }
    message.success(intl.formatMessage({ id: 'cluster.pages.operation.success' }));
    resetClusterPipeline(cluster, namespace, action, pipeline);
    window.location.href = `/kubernetes/cluster/${cluster}/namespace/${namespace}/devops/cicd/tekton/pipelines/lego/detail/${pipeline.metadata?.name}`
  }
  const getPipeline = async () => {
    if (action !== 'detail') {
      const storagePipeline = getClusterPipeline(cluster, namespace, action, requestParams.name || '')
      if (storagePipeline && storagePipeline.metadata && storagePipeline.metadata.name) {
        setPipeline(scanPipelineDependencies(storagePipeline))
        return
      }
    }
    const params = { cluster: cluster, address: `${pipelineAddress}/${resourceName}` } as Record<string, any>;
    const result = await clusterGetProxy(params) as IPipeline;
    setPipeline(scanPipelineDependencies(result))
  }
  useEffect(() => {
    listTasks();
  }, [])

  useEffect(() => {
    if (resourceName !== '' && tasks.length > 0) {
      if (resourceName) {
        getPipeline();
      } else {
        const sessionPipeline = getClusterPipeline(cluster, namespace, 'create', '') as IPipeline;
        if (sessionPipeline.apiVersion) {
          setPipeline(sessionPipeline)
        } else {
          setPipeline({
            apiVersion: pipelineResourceGroup.groupVersion,
            kind: "Pipeline",
            metadata: {
              labels: {
                "efucloud.com/creator.user": currentUser?.id,
              } as Record<string, string>,
              annotations: {} as Record<string, string>,
              name: '',
              namespace: ''
            },
            spec: {
              description: '',
              displayName: '',
              params: [] as Array<ParamSpec>,
              tasks: [],
              workspaces: [],
              results: []
            } as IPipeline['spec']
          } as IPipeline)
        }
      }
    }
  }, [resourceName, tasks])
  const actionCall = (op: string) => {
    if (op === 'base') {
      setShowBaseDrawer(true)
    } else if (op === 'yaml-view') {
      setYamlView(true)
    } else if (op === 'save') {
      savePipeline();
    } else if (op === 'reset') {
      resetClusterPipeline(cluster, namespace, action, pipeline);
      window.location.reload();
    }
  };


  const getPipelineNodesAndEdges = (pipeline: IPipeline): { nodes: []; edges: [] } => {
    let nodes = [
      { id: "_start", type: "start", position: { x: 0, y: 0 } },
      { id: "_finally", type: "finally", position: { x: 4, y: 5 } },
      { id: "_stop", type: "stop", position: { x: 4, y: 5 } },
    ] as any[];
    let edges = [] as any[];
    let taskHasNext = {} as Record<string, boolean>;
    if (pipeline.spec?.tasks && pipeline.spec?.tasks?.length > 0) {
      for (let i = 0; i < pipeline.spec?.tasks?.length; i++) {
        const task = pipeline.spec.tasks[i];
        if (!taskHasNext[task.name!]) {
          taskHasNext[task.name!] = false
        }
        nodes.push({
          id: task.name,
          type: "task",
          data: {
            id: task.name,
            action: action,
            taskRef: task.taskRef?.name!,
            task: taskMap[task.taskRef?.name!] || undefined,
            displayName: task?.displayName || task.name,
            description: task?.description || '',
            timeout: task?.timeout || '',
            retries: task?.retries || 0,
            updateNode: updateNode,
            when: task?.when ? task?.when.length : 0,
            getParams: getTaskCanUseParams,
          } as TaskProps,
          position: { x: 0, y: 0 },
        });
        if (task.runAfter && task.runAfter?.length > 0) {
          for (let k = 0; k < task.runAfter?.length; k++) {
            const runAfter = task.runAfter[k];
            taskHasNext[runAfter] = true
            edges.push({
              id: `${runAfter}|${task.name}`,
              source: runAfter,
              target: task.name,
              type: lineType,
              animated: true,
            })
          }
        } else {
          edges.push({
            id: `_start|${task.name}`,
            source: "_start",
            target: task.name,
            type: lineType,
            animated: true,
          })
        }
      }
    } else {
      edges.push({ id: "_start|_finally", source: "_start", target: "_finally", type: lineType, animated: true })
    }
    if (pipeline.spec?.finally && pipeline.spec.finally.length > 0) {
      for (let j = 0; j < pipeline.spec.finally.length; j++) {
        const task = pipeline.spec.finally[j];
        nodes.push({
          id: task.name,
          type: "task",
          data: {
            id: task.name,
            action: action,
            taskRef: task.taskRef?.name!,
            task: taskMap[task.taskRef?.name!] || undefined,
            displayName: task?.displayName || task.name,
            description: task?.description || '',
            timeout: task?.timeout || '',
            retries: task?.retries || 0,
            updateNode: updateNode,
            when: task?.when ? task?.when.length : 0,
            getParams: getTaskCanUseParams
          } as TaskProps,
          position: { x: 0, y: 0 },
        });
        edges.push({
          id: `${task.name}|_stop`,
          source: task.name,
          target: '_stop',
          type: lineType,
          animated: true,
        })
        edges.push({
          id: `_finally|${task.name}`,
          target: task.name,
          source: '_finally',
          type: lineType,
          animated: true,
        })
      }
    } else {
      edges.push({ id: "_finally|_stop", source: "_finally", target: "_stop", type: lineType, animated: true })
    }
    for (const taskId in taskHasNext) {
      if (taskHasNext.hasOwnProperty(taskId)) {
        const hasNext: boolean = taskHasNext[taskId];
        if (!hasNext) {
          edges.push({
            id: `${taskId}|_finally`,
            source: taskId,
            target: '_finally',
            type: lineType,
            animated: true,
          })
        }
      }
    }
    return { nodes, edges };
  };
  const getLayoutedElements = (nodes, edges, direction = 'vertical') => {
    const isHorizontal = direction === 'horizontal';
    dagreGraph.setGraph({ rankdir: direction === 'horizontal' ? 'LR' : 'TB' });
    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);
    const newNodes = nodes.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      const newNode = {
        ...node,
        data: {
          updateNode: updateNode,
          ...node.data,
          action: action,
          layoutDirection: direction, // 'vertical' or 'horizontal'
        } as TaskProps,
        targetPosition: isHorizontal ? 'left' : 'top',
        sourcePosition: isHorizontal ? 'right' : 'bottom',
        // We are shifting the dagre node position (anchor=center center) to the top left
        // so it matches the React Flow node anchor point (top left).
        position: {
          x: nodeWithPosition.x - nodeWidth / 2,
          y: nodeWithPosition.y - nodeHeight / 2,
        },
      };
      return newNode;
    });

    return { nodes: newNodes, edges };
  };
  const [nodes, setNodes] = useNodesState<Node>([]);
  const [edges, setEdges] = useEdgesState([]);
  const edgesRef = useRef(edges);
  const checkTaskNameExist = (rule: any, value: string, callback: any) => {
    if (existNames.includes(value)) {
      callback(
        intl.formatMessage({ id: 'tekton.pipeline.task.name.exist' }),
      );
    }
    callback();
  };
  const checkPipelineParamsNameExist = (rule: any, value: string, callback: any) => {
    if (!selectedParam) {
      // 安全写法（在正常 Tekton 环境下）
      // 防御性编程（可选）
      const names = (pipeline.spec?.params || [])
        .filter(p => p?.name && typeof p.name === 'string')
        .map(p => p.name);
      if (names.includes(value)) {
        callback(intl.formatMessage({ id: 'tekton.pipeline.param.name.exist' }));
      }

    }
    if (existNames.includes(value)) {
      callback(
        intl.formatMessage({ id: 'tekton.pipeline.task.name.exist' }),
      );
    }
    callback();
  };
  useEffect(() => {
    edgesRef.current = edges; // 每次 edges 更新都同步到 ref
  }, [edges]);
  const pipelineRef = useRef(pipeline);
  useEffect(() => {
    pipelineRef.current = pipeline;
  }, [pipeline]);
  const tasksRef = useRef(tasks);
  useEffect(() => {
    tasksRef.current = tasks;
  }, [tasks]);
  useEffect(() => {
    // 根据nodes和edges生成pipeline
    let names = [] as string[];
    for (let i = 0; i < nodes.length; i++) {
      names.push(nodes[i].id)
    }
    setExistNames(names)
  }, [nodes, pipeline, edges])
  const getTaskCanUseParams = useCallback((nodeId: string): TaskCanUseParams => {
    let result = {
      pipelineParams: [],
      pipelineWorkspaces: [],
      preStepResults: {} as Record<string, TaskResult[]>,
      description: '',
      displayName: '',
      workspaces: [],
      runAfter: [],
    } as TaskCanUseParams
    const currentEdges = JSON.parse(JSON.stringify(edgesRef.current || [])); // ✅ 始终获取最新 edges
    const currentTasks = JSON.parse(JSON.stringify(tasksRef.current || [])); // ✅ 始终获取最新 tasks
    const currentPipeline = JSON.parse(JSON.stringify(pipelineRef.current || {})); // ✅ 始终获取最新 pipeline
    if (currentPipeline === undefined) {
      return result;
    }
    const curTaskMap = {} as Record<string, Task>
    for (let i = 0; i < currentTasks.length; i++) {
      curTaskMap[currentTasks[i].metadata?.name!] = currentTasks[i]
    }
    if (currentPipeline.spec?.params && currentPipeline.spec.params.length > 0) {
      let pp = [] as ParamSpec[];
      for (let i = 0; i < currentPipeline.spec.params.length; i++) {
        const param = currentPipeline.spec.params[i];
        pp.push({
          name: param.name,
          type: param.type,
          default: param.default,
          description: param.description,
          enum: param.enum
        } as ParamSpec)
      }
      result.pipelineParams = pp
    }
    if (currentPipeline.spec?.workspaces && currentPipeline.spec.workspaces.length > 0) {
      const ws = [] as PipeLineWorkspace[]
      for (let i = 0; i < currentPipeline.spec.workspaces.length; i++) {
        const wsIn = currentPipeline.spec.workspaces[i];
        ws.push(wsIn)
      }
      result.pipelineWorkspaces = ws
    }
    const nodeIds = getAllUpstreamNodes(currentEdges, nodeId);
    if (currentPipeline.spec?.tasks && currentPipeline.spec.tasks.length > 0) {
      for (let i = 0; i < currentPipeline.spec.tasks.length; i++) {
        const stepTask = currentPipeline.spec.tasks[i];
        const stepTaskRef = stepTask.taskRef?.name;
        const taskName = stepTask.name;
        if (taskName === nodeId) {
          result.description = stepTask.description || ''
          result.displayName = stepTask.displayName || ''
          if (stepTask?.when) {
            const when = stepTask.when as WhenExpression[];
            for (let j = 0; j < stepTask.when.length; j++) {
              result.when?.push({ id: result.when[i].input, ...result.when[i] })
            }
            result.when = when
          }
          if (stepTask?.params) {
            result.params = stepTask?.params
          }
          if (stepTask?.workspaces) {
            result.workspaces = stepTask.workspaces
          }
          if (stepTask?.runAfter) {
            result.runAfter = stepTask.runAfter
          }
          continue
        }
        if (taskName && stepTaskRef && nodeIds?.includes(taskName)) {
          const t = curTaskMap[stepTaskRef]
          if (t.spec?.results && t.spec.results.length > 0) {
            let preResults = [] as TaskResult[];
            for (let k = 0; k < t.spec.results.length; k++) {
              const p = t.spec.results[k]
              preResults.push({
                name: p.name,
                type: p.type,
                description: p.description,
                value: p.value
              } as TaskResult)
            }
            result.preStepResults[taskName] = preResults
          }
        }
      }
    }

    return result
  }, []); // 
  useEffect(() => {
    const { nodes, edges } = getPipelineNodesAndEdges(scanPipelineDependencies(pipeline));
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges, 'horizontal');
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
    // 👇 在设置完节点后，延迟一点时间或直接调用 fitView
    // 使用 setTimeout 确保 DOM 已更新（可选，但更稳妥）
    setTimeout(() => {
      if (layoutedNodes.length > 0) {
        fitView({ duration: 500 }); // 可加动画
      }
    }, 0);
  }, [pipeline, fitView]); // 注意：fitView 是稳定引用，可以安全加入依赖


  useEffect(() => {
    onLayout(layout);
    // 延迟到下一帧，确保 React Flow 已渲染新节点
    const raf = requestAnimationFrame(() => {
      fitView({ duration: 500, padding: 0.1 });
    });
    return () => cancelAnimationFrame(raf);
  }, [layout, fitView]);

  const handleToggleLayout = () => {
    setLayout(prev => prev === 'horizontal' ? 'vertical' : 'horizontal');
  };
  // ✅ 新增：处理边的变化（如删除）
  const handleEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);
  const handleNodesChange = useCallback((nodeList: Node[]) => {
    setNodes((eds) => applyNodeChanges(nodeList, eds));
  }, []);

  const onEdgesDelete = (deletedEdges: Edge[]) => {
    let tasks = [];
    tasks = pipeline.spec?.tasks || []
    for (let i = 0; i < deletedEdges.length; i++) {
      const edge = deletedEdges[i];
      for (let j = 0; j < tasks.length; j++) {
        const task = tasks[j];
        if (task.name === edge.target) {
          if (task.runAfter) {
            const index = task.runAfter.indexOf(edge.source);
            if (index > -1) {
              task.runAfter.splice(index, 1);
            }
          }
          tasks[j] = task
        }
      }
    }
    tempSaveInfo({
      ...pipeline,
      spec: {
        ...pipeline.spec,
        tasks: tasks,
      },
    })
  };
  const onConnect = useCallback((connection: Connection) => {
    const newEdge = {
      ...connection,
      id: `${connection.source}|${connection.target}`,
      type: lineType,
      animated: true,
    };
    let tempEdges = [...edges, newEdge];
    // 针对finally和stop之前的节点进行判断，
    const p = pipelineRef.current;
    if (p && p.spec?.finally && p.spec.finally.length > 0) {
      let finallyNodeNames = [] as string[];
      for (let i = 0; i < p.spec.finally.length; i++) {
        finallyNodeNames.push(p.spec.finally[i].name!)
      }
      if (finallyNodeNames.includes(newEdge.source) || finallyNodeNames.includes(newEdge.target)) {
        message.error(intl.formatMessage({ id: 'tekton.pipeline.edge.finally.next.nodes.connect.forbidden' }));
        return;
      }

    }
    // 判断source是否有连线
    if (newEdge.source === '_finally') {
      message.error(intl.formatMessage({ id: 'tekton.pipeline.edge.finally.connect.source.invalid' }));
      return;
    } if (newEdge.target === '_stop') {
      message.error(intl.formatMessage({ id: 'tekton.pipeline.edge.stop.connect.invalid' }));
      return;
    }
    if (isCyclic(tempEdges)) {
      message.error(intl.formatMessage({ id: 'tekton.pipeline.cycle.forbidden' }));
      return;
    }
    if (newEdge.source !== '_start' && newEdge.target !== '_finally') {
      const targetNode = nodes.find(node => node.id === newEdge.target);

      if (targetNode && pipeline.spec?.tasks) {
        let newTasks = [];
        for (let i = 0; i < pipeline.spec?.tasks.length; i++) {
          if (pipeline.spec?.tasks[i].name === targetNode.id) {
            let taskF = pipeline.spec?.tasks[i];
            if (!taskF.runAfter) {
              taskF.runAfter = []
            }
            taskF.runAfter.push(newEdge.source)
            newTasks.push(taskF)
          } else {
            newTasks.push(pipeline.spec?.tasks[i])
          }
        }
        tempSaveInfo({
          ...pipeline,
          spec: {
            ...pipeline.spec,
            tasks: newTasks,
          },
        })
      }
    }
    setEdges(tempEdges);
  }, [edges, lineType]);

  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        nodes,
        edges,
        direction,
      );
      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
  // 点击节点

  const onNodesDelete = (deletedNodes: Node[]) => {
    let canDeleteNodes = [] as Node[];
    for (let i = 0; i < deletedNodes.length; i++) {
      const node = deletedNodes[i];
      if (node.id === '_start' || node.id === '_stop' || node.id === '_finally') {
        continue;
      }
      canDeleteNodes.push(node)
    }
    if (canDeleteNodes.length === 0) {
      return;
    }
    let tasks = {} as Record<string, any>;
    let finallyList = {} as Record<string, any>;
    if (pipeline.spec?.tasks) {
      for (let i = 0; i < pipeline.spec?.tasks?.length; i++) {
        let t = pipeline.spec?.tasks[i]
        if (t.runAfter) {
          t.runAfter = t.runAfter.filter((item: string) => !canDeleteNodes.map((node: Node) => node.id).includes(item))
        }
        tasks[pipeline.spec?.tasks[i].name!] = t
      }
    }
    if (pipeline.spec?.finally) {
      for (let i = 0; i < pipeline.spec?.finally?.length; i++) {
        finallyList[pipeline.spec?.finally[i].name!] = pipeline.spec?.finally[i]
      }
    }
    for (let i = 0; i < canDeleteNodes.length; i++) {
      delete tasks[canDeleteNodes[i].id];
      delete finallyList[canDeleteNodes[i].id];
    }
    tempSaveInfo({
      ...pipeline,
      spec: {
        ...pipeline.spec,
        finally: Object.values(finallyList),
        tasks: Object.values(tasks),
      },
    })
    // 可选：同时清理关联的连线（React Flow 默认不会自动删边）
    const nodeIds = new Set(canDeleteNodes.map(n => n.id));
    const remainingEdges = edges.filter(edge =>
      !nodeIds.has(edge.source) && !nodeIds.has(edge.target)
    );
    const remainingNodes = nodes.filter(node => !nodeIds.has(node.id));
    setNodes(remainingNodes);
    setEdges(remainingEdges);
  };
  const onNodeClick = (event, node) => {
    // 如果点击的是同一个节点，就取消高亮
    const newSelectedId = selectedNodeId === node.id ? null : node.id;
    setSelectedNodeId(newSelectedId);
    highlightConnectedEdges(newSelectedId); // 传 null 表示取消高亮
    // 更新节点样式
    setNodes((nds) =>
      nds.map((nd) => {
        if (nd.id === node.id) {
          return {
            ...nd,
            style: {
              ...nd.style,
              border: newSelectedId === node.id ? '2px solid #F57DBD' : 'none', // 根据是否选中设置边框样式
            },
          };
        } else {
          return {
            ...nd,
            style: {
              ...nd.style,
              border: 'none',
            },
          };
        }
      })
    );
  };

  const highlightConnectedEdges = (nodeId: string | null) => {
    // 如果 nodeId 为 null，表示取消高亮
    const newEdges = edges.map(edge => {
      const isConnected = edge.source === nodeId || edge.target === nodeId;
      if (isConnected && nodeId) {
        // 高亮连接边
        return {
          ...edge,
          animated: true,
          style: {
            ...edge.style,
            stroke: '#F57DBD',
            strokeWidth: 1,
          },
        };
      } else {
        // 恢复默认样式：移除 stroke 和 strokeWidth（或设为默认值）
        const { stroke, strokeWidth, ...restStyle } = edge.style || {};
        return {
          ...edge,
          animated: edge.animated, // 保留原有 animated
          style: restStyle, // 移除高亮样式
        };
      }
    });
    setEdges(newEdges);
  };
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      if (!type) return;
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      setNodeAddInitValues({ id: type })
      // 暂存 drop 信息，打开弹窗
      setDropInfo({ position, taskRef: `${type}` });
      setAddModalVisible(true)
      dropForm.resetFields(); // 清空上次输入
    },
    [screenToFlowPosition, type, dropForm],
  );
  const updateNode = (data: PipelineTaskDef) => {
    if (data.retries === 0) {
      delete data.retries;
    }
    if (data.timeout === '') {
      delete data.timeout;
    }
    let newTaskList = [];
    let newFinallyList = [];
    if (pipeline.spec?.tasks) {
      const taskList = pipeline.spec?.tasks || [];
      for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].name === data.name) {
          newTaskList.push(data);
        } else {
          newTaskList.push(taskList[i]);
        }
      }

    }
    if (pipeline.spec?.finally) {
      const finallyList = pipeline.spec?.finally || [];
      for (let i = 0; i < finallyList.length; i++) {
        if (finallyList[i].name === data.name) {
          newFinallyList.push(data);
        } else {
          newFinallyList.push(finallyList[i]);
        }
      }
    }

    tempSaveInfo({
      ...pipeline,
      spec: {
        ...pipeline.spec,
        tasks: newTaskList,
        finally: newFinallyList,
      },
    })
  }

  const handleAddNode = async (values: { id: string, displayName: string, description: string }) => {
    if (!dropInfo) return;
    const { position, taskRef } = dropInfo;
    const newNodeId = values.id.trim();


    // 判断添加的节点的位置
    const finallyNode = nodes.find((node) => node.type === 'finally');
    if (finallyNode) {
      let isFinallyNode = false;
      if (layout === 'horizontal') {
        if (finallyNode.position.x < position.x) {
          isFinallyNode = true
        }
      } else if (layout === 'vertical') {
        if (finallyNode.position.y < position.y) {
          isFinallyNode = true
        }
      }
      if (isFinallyNode) {
        const finallyInfo = pipeline.spec?.finally || [];
        finallyInfo.push({
          name: newNodeId,
          taskRef: {
            name: taskRef,
          }
        })
        tempSaveInfo({
          ...pipeline,
          spec: {
            ...pipeline.spec,
            finally: finallyInfo,
          },
        })
      } else {
        const taskList = pipeline.spec?.tasks || [];
        taskList.push({
          name: newNodeId,
          taskRef: {
            name: taskRef,
          }
        })
        tempSaveInfo({
          ...pipeline,
          spec: {
            ...pipeline.spec,
            tasks: taskList,
          },
        })
      }
    }
    // setNodes((nds) => nds.concat(newNode));
    setDropInfo(null); // 关闭弹窗
    setAddModalVisible(false)
    setNodeAddInitValues({});
    return true; // 关闭 ModalForm
  };
  const tempSaveInfo = (pipeline: IPipeline) => {
    saveClusterPipeline(cluster, namespace, action, pipeline);
    setPipeline(pipeline)
  }
  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.setData('text/plain', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };
  const paramsColumns = (): ProColumns<ParamSpec>[] => {
    let columnsNodes = [] as ProColumns<ParamSpec>[];
    columnsNodes = [
      {
        title: intl.formatMessage({ id: 'tekton.task.params.name' }),
        search: false,
        dataIndex: 'name',
        render: (dom, entity) => {
          return (<Tooltip color={colorPrimary} title={entity.description}><a>{entity.name}</a></Tooltip>)
        },
      },

      {
        title: intl.formatMessage({ id: 'model.detail' }),
        search: false,
        render: (_, record: ParamSpec) => {
          const defaultFunc = (item: ParamSpec) => {
            if (item.type === 'string') {
              return item.default as String;
            } else if (item.default) {
              try {
                const result = JSON.stringify(item.default);
                if (result === '[]' || result === '{}') {
                  return '-';
                }
                return result;
              } catch (error) {
                return '-'
              }
            } else {
              return '-';
            }
          }
          if (record) {
            return <ProDescriptions column={1}>
              <ProDescriptions.Item style={{ padding: 2 }} label={intl.formatMessage({ id: 'tekton.task.params.type' })}
                valueEnum={{
                  'string': {
                    text: intl.formatMessage({ id: 'tekton.task.params.type.string' }),
                  },
                  'array': {
                    text: intl.formatMessage({ id: 'tekton.task.params.type.array' }),
                  },
                  'object': {
                    text: intl.formatMessage({ id: 'tekton.task.params.type.object' }),
                  },
                }}
              >{record.type}</ProDescriptions.Item>
              <ProDescriptions.Item style={{ padding: 2 }} valueType='textarea' label={intl.formatMessage({ id: 'tekton.pipeline.param.description' })}>{record.description}</ProDescriptions.Item>
              <ProDescriptions.Item style={{ padding: 2 }} label={intl.formatMessage({ id: 'tekton.pipeline.param.default' })}>{defaultFunc(record)}</ProDescriptions.Item>
              {record.enum && <ProDescriptions.Item style={{ padding: 2 }} valueType='textarea' label={intl.formatMessage({ id: 'tekton.pipeline.param.enum' })}>{JSON.stringify(record.enum)}</ProDescriptions.Item>}
            </ProDescriptions>
          } else {
            return null
          }
        }
      },
    ];
    if (action !== 'detail') {
      columnsNodes.push({
        title: <FormattedMessage id="pages.operation" />,
        key: 'action',
        valueType: 'option',
        render: (_, record: ParamSpec) => {
          const nodes = [
            <a
              key="edit"
              onClick={() => {
                setSelectParam(record);
                setParamModalFormVisiable(true)
              }}
            >
              <EditOutlined />
            </a>,
            <Popconfirm
              key='delete'
              description={intl.formatMessage({ id: 'tekton.pipeline.variables.delete.description' })}
              title={
                intl.formatMessage({
                  id: 'pages.operation.delete.description',
                }) +
                intl.formatMessage({ id: 'tekton.pipeline.variables' }) +
                '【' +
                record.name +
                '】'
              }
              onConfirm={() => {
                const pipe = { ...pipeline }
                pipe.spec.params = pipe.spec?.params?.filter(item => item.name != record.name)
                tempSaveInfo(pipe)
              }}
              okText={intl.formatMessage({ id: 'pages.operation.confirm' })}
              cancelText={intl.formatMessage({ id: 'pages.operation.cancel' })}
            >
              <a className="danger" key="delete"  > <DeleteOutlined /> </a>
            </Popconfirm>,
          ];
          return nodes;
        },
      })
    }
    return columnsNodes
  }
  const workspaceColumns = (): ProColumns<PipeLineWorkspace>[] => {
    let columnsNodes = [] as ProColumns<PipeLineWorkspace>[];
    columnsNodes = [
      {
        title: intl.formatMessage({ id: 'tekton.pipeline.workspace.name' }),
        search: false,
        dataIndex: 'name',
      },
      {
        title: intl.formatMessage({ id: 'tekton.pipeline.workspace.description' }),
        search: false,
        dataIndex: 'description',
        valueType: 'textarea'
      },
      {
        title: intl.formatMessage({ id: 'tekton.pipeline.workspace.optional' }),
        search: false,
        dataIndex: 'optional',
        render: (_, record: PipeLineWorkspace) => {
          if (record.optional) {
            return <FormattedMessage id='model.false' />
          } else {
            return <FormattedMessage id='model.true' />
          }
        }
      },
    ]
    if (action !== 'detail') {
      columnsNodes.push({
        title: <FormattedMessage id="pages.operation" />,
        key: 'action',
        valueType: 'option',
        render: (_, record: PipeLineWorkspace) => {
          const nodes = [
            <a
              key="edit"
              onClick={() => {
                const ins = { ...record }
                if (!ins.optional) {
                  ins.optional = false
                }
                setSelectWorkspace(ins);
                setWorkspaceModalFormVisiable(true)
              }}
            >
              <EditOutlined />
            </a>,
            <Popconfirm
              key='delete'
              description={intl.formatMessage({ id: 'tekton.pipeline.workspace.delete.description' })}
              title={
                intl.formatMessage({
                  id: 'pages.operation.delete.description',
                }) +
                intl.formatMessage({ id: 'tekton.pipeline.workspace' }) +
                '【' +
                record.name +
                '】'
              }
              onConfirm={() => {
                const pipe = { ...pipeline }
                pipe.spec.workspaces = pipe.spec?.workspaces?.filter(item => item.name != record.name)
                tempSaveInfo(pipe)
              }}
              okText={intl.formatMessage({ id: 'pages.operation.confirm' })}
              cancelText={intl.formatMessage({ id: 'pages.operation.cancel' })}
            >
              <a className="danger" key="delete"  > <DeleteOutlined /> </a>
            </Popconfirm>,
          ];
          return nodes;
        },
      })
    }
    return columnsNodes;
  }
  return (
    <PageContainer
      title={false}
      header={{ breadcrumb: {} }}
      ghost // 减少默认样式
      className="no-padding-page"
    >
      <Splitter style={{ height: 'calc(100vh - 56px)', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        {action !== 'detail' && <Splitter.Panel
          collapsible={{ start: true, end: true, showCollapsibleIcon: true }}
          defaultSize="20%" max="30%" >
          <Sidebar tasks={tasks} />
        </Splitter.Panel>}
        <Splitter.Panel >
          <ReactFlow
            // ✅ 允许双指平移（触控板/触摸屏）
            panOnDrag={true}
            // ✅ 启用双指缩放（触控板原生 pinch 手势）
            zoomOnPinch={true}
            // ✅ 启用滚轮缩放（兼容鼠标 & 触控板模拟滚轮）
            zoomOnScroll={true}
            // 🔥 关键：阻止触控板手势导致页面滚动（尤其在 iframe 或嵌套容器中）
            preventScrolling={true}
            // 可选：平滑缩放范围
            minZoom={0.1}
            maxZoom={4}
            measurenodedimensions='true'
            key={`${layout}-${lineType}`}
            connectionLineType={lineType}
            proOptions={{ hideAttribution: true }} // 
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={handleNodesChange}
            onNodesDelete={onNodesDelete}
            onEdgesChange={handleEdgesChange}
            onEdgesDelete={onEdgesDelete}
            onConnect={onConnect}
            onDragStart={onDragStart}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodesConnectable={action !== 'detail'}
            onNodeClick={onNodeClick}
            fitView
            attributionPosition="top-right"
            style={{ backgroundColor: "#F7F9FB" }}
          >
            {action !== 'detail' && <div
              style={{
                position: 'absolute',
                top: 60,
                right: 12,
                maxWidth: 200,
                zIndex: 10,
                padding: '4px 8px',
                fontSize: 10,
                fontWeight: 500,
                display: 'flex', // 使用 Flex 布局
                justifyContent: 'space-between', // 主轴两端对齐
                alignItems: 'center', // 交叉轴居中
              }}
            >
              <span style={{ color: 'red' }}>
                {intl.formatMessage({ id: 'lego.edit.tooltip' })}
              </span>
            </div>}
            <Controls orientation='horizontal' showFitView={true} showInteractive={action !== 'detail'}  >
              <div key='rotate' className="react-flow-custom-control" onClick={handleToggleLayout} style={{ width: 26, height: 26, transition: 'background-color 0.2s' }}>
                <PartitionOutlined style={{
                  fontSize: 16,
                  transform: `rotate(${rotation}deg)`,
                  transition: 'transform 0.3s ease', // 平滑旋转动画
                }} /></div>
              <div
                key='line'
                className="react-flow-custom-control"
                onClick={() => {
                  setLineType((prevLineType) => {
                    const newLineType =
                      prevLineType === ConnectionLineType.Bezier
                        ? ConnectionLineType.SmoothStep
                        : ConnectionLineType.Bezier;

                    // 同步更新 edges 的 type
                    setEdges((prevEdges) =>
                      prevEdges.map((edge) => ({
                        ...edge,
                        type: newLineType,
                      }))
                    );

                    // 存入 sessionStorage
                    sessionStorage.setItem('line-type', newLineType);

                    return newLineType;
                  });
                }}
                style={{ width: 26, height: 26, transition: 'background-color 0.2s' }}
              >
                {lineType === ConnectionLineType.Bezier && <img src="/line-tree.svg" />}
                {lineType === ConnectionLineType.SmoothStep && <img src="/line-bezier.svg" />}
              </div>
            </Controls >
            <Background />
            <TopRightButton action={action} actionCall={actionCall} name={pipeline?.metadata?.name || ''} tasks={tasks} />
            {action !== 'detail' && <FinallySeparator />}
          </ReactFlow>
        </Splitter.Panel>
      </Splitter>
      <ModalForm
        width="30vw"
        title={intl.formatMessage({ id: 'tekton.pipeline.node.add' })}
        open={addModalVisible}
        onOpenChange={setAddModalVisible}
        key={`${dropInfo?.position.x}-${dropInfo?.position.y}`}
        form={dropForm}
        onFinish={handleAddNode}
        modalProps={{ maskClosable: true, destroyOnHidden: true, forceRender: true, onCancel: () => { setNodeAddInitValues({}) } }}
        initialValues={nodeAddInitValues}
      >
        <ProDescriptions column={1} style={{ marginBottom: 16 }}>
          <ProDescriptions.Item
            label={intl.formatMessage({ id: 'tekton.pipeline.current.add.task' })}>{dropInfo?.taskRef}</ProDescriptions.Item>
        </ProDescriptions>
        <ProFormText
          name="id"
          tooltip={{ color: colorPrimary, title: intl.formatMessage({ id: 'cluster.resource.name.rule' }) }}
          label={intl.formatMessage({ id: 'tekton.pipeline.task.steps.name' })}
          fieldProps={{
            autoFocus: true, // ← 关键：自动聚焦
          }}
          rules={[
            {
              max: 50,
              message: intl.formatMessage({ id: 'pages.input.text.max.length' }, { max: 50 }),
            },
            {
              required: true,
              message:
                intl.formatMessage({ id: 'pages.input.text.tips' }) +
                intl.formatMessage({ id: 'tekton.pipeline.task.steps.name' }),
            },
            {
              message: (
                <FormattedMessage id="cluster.resource.data.format.invalid" />
              ),
              pattern: /^[a-z0-9]([-a-z0-9]*[a-z0-9])?$/,
            },
            { validator: checkTaskNameExist },
          ]}
          placeholder={`${intl.formatMessage({ id: 'pages.input.example' })}: build-task`}
        />
        <ProFormText name="displayName" label={intl.formatMessage({ id: 'tekton.pipeline.task.displayName' })} rules={[{
          max: 255,
          message: intl.formatMessage({ id: 'pages.input.text.max.length' }, { max: 255 }),
        },]} />
        <ProFormTextArea name="description" label={intl.formatMessage({ id: 'tekton.pipeline.task.description' })} rules={[{
          max: 255,
          message: intl.formatMessage({ id: 'pages.input.text.max.length' }, { max: 255 }),
        },]} />
      </ModalForm>
      <Drawer
        destroyOnHidden={true}
        size={drawerSize}
        resizable={{
          onResize: (newSize) => setDrawerSize(newSize),
        }}
        open={yamlView}
        onClose={() => setYamlView(false)}
        closable={true}
        title={
          <>
            {getClusterResource('Pipeline')}:&nbsp;&nbsp;
            {pipeline?.metadata?.name}
          </>
        }
      >
        <ResourceEditor
          key={pipeline?.metadata?.resourceVersion || 'edit'}
          edit={false}
          kind="Pipeline"
          name={pipeline?.metadata?.name || ''}

          cluster={cluster}
          content={pipeline}
        />
      </Drawer>
      <Drawer
        title={intl.formatMessage({ id: 'tekton.pipeline.info' })}
        size={drawerSize}
        resizable={{
          onResize: (newSize) => setDrawerSize(newSize),
        }}
        open={showBaseDrawer}
        onClose={() => setShowBaseDrawer(false)}
        closable={true}
      >
        <Tabs
          items={[
            {
              key: 'base',
              label: intl.formatMessage({ id: 'tekton.pipeline.base' }),
              children: <>
                {action === 'detail' && <ProDescriptions column={1}>
                  <ProDescriptions.Item label={intl.formatMessage({ id: 'cluster.resource.name' })}>{pipeline.metadata?.name}</ProDescriptions.Item>
                  <ProDescriptions.Item label={intl.formatMessage({ id: 'tekton.pipeline.task.number' })}>{pipeline.spec?.tasks?.length || 0}</ProDescriptions.Item>
                  <ProDescriptions.Item label={intl.formatMessage({ id: 'tekton.pipeline.finally.number' })}>{pipeline.spec?.finally?.length || 0}</ProDescriptions.Item>
                  <ProDescriptions.Item valueType='textarea' label={intl.formatMessage({ id: 'tekton.pipeline.displayName' })}>{pipeline.spec?.displayName}</ProDescriptions.Item>
                  <ProDescriptions.Item valueType='textarea' label={intl.formatMessage({ id: 'model.description' })}>{pipeline.spec?.description}</ProDescriptions.Item>
                </ProDescriptions>}
                {action !== 'detail' && <>
                  <ProFormText
                    disabled={action === 'update'}
                    name={['metadata', 'name']}
                    label={intl.formatMessage({ id: 'cluster.resource.name' })}
                    tooltip={{ color: colorPrimary, title: intl.formatMessage({ id: 'cluster.resource.name.rule' }) }}
                    fieldProps={{
                      defaultValue: pipeline.metadata?.name,
                      onChange: (e) => {
                        const value = e.target.value;
                        tempSaveInfo({
                          ...pipeline,
                          metadata: {
                            ...pipeline.metadata,
                            name: value
                          }
                        });
                      }
                    }}
                    rules={[
                      {
                        max: 255,
                        message: intl.formatMessage({ id: 'pages.input.text.max.length' }, { max: 255 }),
                      },
                      {
                        required: true,
                        message: intl.formatMessage({ id: 'pages.input.text.tips' }) + intl.formatMessage({ id: 'cluster.resource.name' }),
                      },
                      {
                        message: <FormattedMessage id='cluster.resource.data.format.invalid' />,
                        pattern: /^[a-z0-9]([-a-z0-9]*[a-z0-9])?$/,
                      },
                    ]}
                    placeholder={`${intl.formatMessage({ id: 'pages.input.example' })}: eucloud-autotest-pipeline`}
                  />
                  <ProFormText
                    name={['spec', 'displayName']}
                    label={intl.formatMessage({ id: 'tekton.pipeline.displayName' })}
                    rules={[
                      {
                        max: 255,
                        message: intl.formatMessage({ id: 'pages.input.text.max.length' }, { max: 255 }),
                      },
                    ]}
                    fieldProps={{
                      defaultValue: pipeline.spec?.displayName,
                      onChange: (e) => {
                        const value = e.target.value;
                        tempSaveInfo({
                          ...pipeline,
                          spec: {
                            ...pipeline.spec,
                            displayName: value
                          }
                        });
                      }
                    }}
                  />
                  <ProFormTextArea
                    name={['spec', 'description']}
                    label={intl.formatMessage({ id: 'model.description' })}
                    rules={[{
                      max: 255,
                      message: intl.formatMessage({ id: 'pages.input.text.max.length' }, { max: 255 }),
                    },]}
                    fieldProps={{
                      defaultValue: pipeline.spec?.description,
                      onChange: (e) => {
                        const value = e.target.value;
                        tempSaveInfo({
                          ...pipeline,
                          spec: {
                            ...pipeline.spec,
                            description: value
                          }
                        });
                      }
                    }}
                  />
                </>}
              </>
            },
            {
              key: 'parameters',
              label: intl.formatMessage({ id: 'tekton.pipeline.variables' }),
              children: <>
                <ProTable<ParamSpec>
                  locale={{
                    emptyText: intl.formatMessage({ id: 'pages.not.found.data' }),
                  }}
                  columns={paramsColumns()}
                  rowKey="name"
                  dataSource={pipeline?.spec?.params || []}
                  search={false}
                  options={false}
                  toolBarRender={() => {
                    if (action === 'detail') { return [] } else {
                      return [
                        <Button
                          type="primary"
                          key="parameter-create"
                          onClick={() => {
                            setSelectParam(undefined)
                            setParamModalFormVisiable(true)
                          }}
                        >
                          <FormattedMessage id="pages.operation.create" />
                        </Button>
                      ]
                    }
                  }}
                />
              </>
            },
            {
              key: 'workspaces',
              label: intl.formatMessage({ id: 'tekton.task.workspaces' }),
              children: <>
                <ProTable<PipeLineWorkspace>
                  locale={{
                    emptyText: intl.formatMessage({ id: 'pages.not.found.data' }),
                  }}
                  columns={workspaceColumns()}
                  rowKey="name"
                  dataSource={pipeline?.spec?.workspaces || []}
                  search={false}
                  options={false}
                  toolBarRender={() => {
                    if (action === 'detail') { return [] } else {
                      return [
                        <Button
                          type="primary"
                          key="workspace-create"
                          onClick={() => {
                            setSelectWorkspace(undefined);
                            setWorkspaceModalFormVisiable(true)
                          }}
                        >
                          <FormattedMessage id="pages.operation.create" />
                        </Button>
                      ]
                    }
                  }}
                />
              </>
            }
          ]}
        />
      </Drawer>
      <ModalForm
        title={selectedParam?.name ? intl.formatMessage({ id: 'tekton.pipeline.variables' }) + intl.formatMessage({ id: 'pages.operation.edit' }) : intl.formatMessage({ id: 'tekton.pipeline.variables' }) + intl.formatMessage({ id: 'pages.operation.create' })}
        width="40vw"
        key={selectedParam?.name || 'param-create'}
        open={paramModalFormVisiable}
        initialValues={selectedParam}
        clearOnDestroy={true}
        onOpenChange={setParamModalFormVisiable}
        onFinish={async (values: Record<string, any>) => {
          if (values['enum']) {
            values['enum'] = values['enum'].split(',')
          }
          if (values['type'] === 'array') {
            try {
              values['default'] = JSON.parse(values['default'])
            } catch (error) {
              console.log('parse array default error:', error);
              values['default'] = []
            }

          } else if (values['type'] === 'object') {
            values['default'] = JSON.parse(values['default'])
          }
          const newParams = pipeline.spec?.params || []
          if (selectedParam?.name) {
            const index = newParams.findIndex((item) => item.name === selectedParam.name)
            newParams[index] = values
          } else {
            newParams.push(values)
          }
          tempSaveInfo({
            ...pipeline,
            spec: {
              ...pipeline.spec,
              params: newParams
            }
          })
          setParamModalFormVisiable(false)
          setSelectParam(undefined)
        }}
        modalProps={{ maskClosable: true, destroyOnHidden: true, forceRender: true }}
      >
        <ProFormText
          name="name"
          label={intl.formatMessage({ id: 'tekton.pipeline.param.name' })}
          rules={[
            {
              max: 255,
              message: intl.formatMessage({ id: 'pages.input.text.max.length' }, { max: 255 }),
            },
            {
              required: true,
              message:
                intl.formatMessage({ id: 'pages.input.text.tips' }) +
                intl.formatMessage({ id: 'tekton.pipeline.param.name' }),
            },
            { validator: checkPipelineParamsNameExist },
          ]}
          placeholder={`${intl.formatMessage({ id: 'pages.input.example' })}: imageTag`}
        />
        <ProFormTextArea
          name="description"
          label={intl.formatMessage({ id: 'tekton.pipeline.param.description' })}
          rules={[
            {
              max: 255,
              message: intl.formatMessage({ id: 'pages.input.text.max.length' }, { max: 255 }),
            },
            {
              required: true,
              message:
                intl.formatMessage({ id: 'pages.input.text.tips' }) +
                intl.formatMessage({ id: 'tekton.pipeline.param.description' }),
            },
          ]}
        />
        <ProFormSelect
          name="type"
          label={intl.formatMessage({ id: 'tekton.pipeline.param.type' })}
          rules={[
            {
              required: true,
              message:
                intl.formatMessage({ id: 'pages.select.text.tips' }) +
                intl.formatMessage({ id: 'tekton.pipeline.param.type' }),
            },
          ]}
          options={[
            {
              label: intl.formatMessage({ id: 'tekton.pipeline.param.type.string' }),
              value: 'string',
            },
            {
              label: intl.formatMessage({ id: 'tekton.pipeline.param.type.array' }),
              value: 'array',
            },
            {
              label: intl.formatMessage({ id: 'tekton.pipeline.param.type.object' }),
              value: 'object',
            },
          ]}
        />
        <ProFormDependency name={['type']}>
          {({ type }) => {
            if (type === 'string') {
              return <ProFormText
                name="default"
                label={intl.formatMessage({ id: 'tekton.pipeline.param.default' })}
              />;
            } else if (type === 'array') {
              return <ProFormTextArea
                name="default"
                label={intl.formatMessage({ id: 'tekton.pipeline.param.default' })}
                placeholder={intl.formatMessage({ id: 'tekton.pipeline.param.type.array.placeholder' })}

              />;
            } else if (type === 'object') {
              return <ProFormTextArea
                name="default"
                label={intl.formatMessage({ id: 'tekton.pipeline.param.default' })}
                placeholder={intl.formatMessage({ id: 'tekton.pipeline.param.type.object.placeholder' })}
              />;
            }
            return null;
          }}
        </ProFormDependency>
        <ProFormTextArea
          tooltip={{ color: colorPrimary, title: intl.formatMessage({ id: 'tekton.pipeline.param.enum.tooltip' }) }}
          name="enum"
          label={intl.formatMessage({ id: 'tekton.pipeline.param.enum' })}
          placeholder={intl.formatMessage({ id: 'tekton.pipeline.param.enum.placeholder' })}
        />
      </ModalForm>
      <ModalForm
        title={selectedWorkspace?.name ? intl.formatMessage({ id: 'tekton.pipeline.workspace' }) + intl.formatMessage({ id: 'pages.operation.edit' }) : intl.formatMessage({ id: 'tekton.pipeline.workspace' }) + intl.formatMessage({ id: 'pages.operation.create' })}
        width="40vw"
        key={selectedWorkspace?.name || 'workspace-create'}
        open={workspaceModalFormVisiable}
        initialValues={selectedWorkspace}
        clearOnDestroy={true}
        onOpenChange={setWorkspaceModalFormVisiable}
        onFinish={async (values: Record<string, any>) => {
          const newWorkspace = pipeline.spec?.workspaces || []
          if (selectedWorkspace?.name) {
            const index = newWorkspace.findIndex((item) => item.name === selectedWorkspace.name)
            newWorkspace[index] = values
          } else {
            newWorkspace.push(values)
          }
          tempSaveInfo({
            ...pipeline,
            spec: {
              ...pipeline.spec,
              workspaces: newWorkspace
            }
          })
          setWorkspaceModalFormVisiable(false)
          setSelectWorkspace(undefined)
        }}
        modalProps={{ maskClosable: true, destroyOnHidden: true, forceRender: true }}
      >
        <ProFormText
          name="name"
          label={intl.formatMessage({ id: 'tekton.pipeline.workspace.name' })}
          rules={[
            {
              max: 255,
              message: intl.formatMessage({ id: 'pages.input.text.max.length' }, { max: 255 }),
            },
            {
              required: true,
              message:
                intl.formatMessage({ id: 'pages.input.text.tips' }) +
                intl.formatMessage({ id: 'tekton.pipeline.workspace.name' }),
            },
            { validator: checkPipelineParamsNameExist },
          ]}
          placeholder={`${intl.formatMessage({ id: 'pages.input.example' })}: imageTag`}
        />
        <ProFormTextArea
          name="description"
          label={intl.formatMessage({ id: 'tekton.pipeline.workspace.description' })}
          rules={[{
            max: 50,
            message: intl.formatMessage({ id: 'pages.input.text.max.length' }, { max: 50 }),
          },]}
        />
        <ProFormSelect
          name="optional"
          label={intl.formatMessage({ id: 'tekton.pipeline.workspace.optional' })}
          options={
            [
              {
                label: intl.formatMessage({ id: 'model.true' }),
                value: false,
              },
              {
                label: intl.formatMessage({ id: 'model.false' }),
                value: true,
              },
            ]
          }
        />
      </ModalForm>
    </PageContainer>
  );
}
const LegoPage: React.FC = () => {
  return (
    <div >
      <ReactFlowProvider
      >
        <DnDProvider>
          <DnDFlow />
        </DnDProvider>
      </ReactFlowProvider>
    </div>
  )
};
export default LegoPage;
import { getClusterApiVersions, getCurrentViewInfo, getCurrentUTCTimeString, getExecutionTimeDetailed } from "@/utils/global";
import { PageContainer, ProDescriptions } from "@ant-design/pro-components";
import { Card, Divider, Drawer, message, Splitter, Tabs } from "antd";
import { useState, useCallback, useEffect, useMemo } from "react";
import '@xyflow/react/dist/style.css';
import dagre from '@dagrejs/dagre';
import { DnDProvider } from '@/pages/kubernetes/namespace/devops/cicd/tekton/pipeline/lego/DnDContext';
import TopRightButton from "@/pages/kubernetes/namespace/devops/cicd/tekton/pipeline_run/biz-actions";
import { ReactFlow, ReactFlowProvider, useNodesState, useEdgesState, Controls, useReactFlow, Background, ConnectionLineType, Node, Edge } from '@xyflow/react';
import { PartitionOutlined } from "@ant-design/icons";
import StartNode from "@/pages/kubernetes/namespace/devops/cicd/tekton/nodes/start";
import StopNode from "@/pages/kubernetes/namespace/devops/cicd/tekton/nodes/stop";
import FinallyNode from "@/pages/kubernetes/namespace/devops/cicd/tekton/nodes/finally";
import TaskRunNode, { TaskRunProps } from "@/pages/kubernetes/namespace/devops/cicd/tekton/nodes/task_run";
import { useIntl, useParams } from "@umijs/max";
import { IPipeline, PipelineRun, Task, TaskRun } from "@/k8s-models/tekton/pipeline/tekton.dev/v1";
import { clusterDeleteProxy, clusterGetProxy, clusterPostProxy } from "@/services/cluster_proxy.api";
import { getPipelineRunStatus, scanPipelineDependencies } from "@/utils/pipeline";
import PodSingle from "@/pages/kubernetes/components/pod_single";
import AICopilot from "@/pages/kubernetes/components/ai";
import *as yaml from 'js-yaml';
import { cleanK8sResourceForAI } from "@/utils/copilot";

const nodeTypes = {
  start: StartNode,
  stop: StopNode,
  finally: FinallyNode,
  task: TaskRunNode,
};

const DnDFlow = () => {
  const { name } = useParams();
  const { fitView } = useReactFlow();
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [layout, setLayout] = useState<'horizontal' | 'vertical'>('horizontal');
  const rotation = layout === 'horizontal' ? 90 : 0;
  const nodeWidth = 200;
  const nodeHeight = 100;
  const { cluster, namespace } = getCurrentViewInfo();
  const initialLineType = sessionStorage.getItem('line-type') || ConnectionLineType.Bezier;
  const [lineType, setLineType] = useState(initialLineType);
  const intl = useIntl();

  // ✅ 新增：用于动态更新当前时间
  const [currentTime, setCurrentTime] = useState<string>(getCurrentUTCTimeString());

  const [pipeline, setPipeline] = useState<IPipeline>({} as IPipeline);
  const [pipelineRun, setPipelineRun] = useState<PipelineRun>({} as PipelineRun);
  const pipelineRunResourceGroup = getClusterApiVersions(cluster, ['tekton.dev/v1'], 'PipelineRun');
  const pipelineRunAddress = `apis/${pipelineRunResourceGroup?.groupVersion}/namespaces/${namespace}/pipelineruns`;
  const taskRunResourceGroup = getClusterApiVersions(cluster, ['tekton.dev/v1'], 'TaskRun');

  const [taskRuns, setTaskRuns] = useState<TaskRun[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskRunNodeSelected, setTaskRunNodeSelected] = useState<string>('');
  const [drawerSize, setDrawerSize] = useState<number>(800);

  const taskRunMap = useMemo<Record<string, TaskRun>>(() => {
    const map: Record<string, TaskRun> = {};
    taskRuns.forEach(taskRun => {
      const name = taskRun.metadata?.name;
      if (name) {
        map[name] = taskRun;
      }
    });
    return map;
  }, [taskRuns]);

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

  // ------------------ API Methods ------------------
  const listTaskRuns = async () => {
    if (!pipelineRun.metadata?.name) return;
    const params = {
      cluster,
      address: `apis/${taskRunResourceGroup?.groupVersion}/namespaces/${namespace}/taskruns`,
      labelSelector: `tekton.dev/pipelineRun=${pipelineRun.metadata.name}`,
    };
    try {
      const data = await clusterGetProxy(params);
      const items = (data.items || []).map((item: any) => ({
        ...item,
        apiVersion: data.apiVersion,
        kind: 'TaskRun',
      }));
      setTaskRuns(items);
    } catch (err) {
      console.error('Failed to list TaskRuns:', err);
    }
  };

  const listTasks = async () => {
    const taskResourceGroup = getClusterApiVersions(cluster, ['tekton.dev/v1'], 'Task');
    const params = {
      cluster,
      address: `apis/${taskResourceGroup?.groupVersion}/namespaces/${namespace}/tasks`,
    };
    try {
      const data = await clusterGetProxy(params);
      const items = (data.items || []).map((item: any) => ({
        ...item,
        apiVersion: data.apiVersion,
        kind: 'Task',
      }));
      setTasks(items);
    } catch (err) {
      console.error('Failed to list Tasks:', err);
    }
  };

  const getPipelineRun = async () => {
    const params = {
      cluster,
      address: `${pipelineRunAddress}/${name}`,
    };
    try {
      const piperun = await clusterGetProxy(params) as PipelineRun;
      setPipelineRun(piperun);
      const pipeline = { spec: { ...piperun.status?.pipelineSpec } } as IPipeline;
      setPipeline(scanPipelineDependencies(pipeline));
    } catch (err) {
      console.error('Failed to get PipelineRun:', err);
    }
  };

  const reDeploy = async (pipelineRun: PipelineRun) => {
    try {
      await clusterDeleteProxy({

        cluster,
        address: `apis/${pipelineRunResourceGroup?.groupVersion}/namespaces/${pipelineRun.metadata?.namespace}/pipelineruns/${pipelineRun.metadata?.name}`,
      });
      const requestData = { ...pipelineRun };
      delete requestData.status;
      delete requestData.metadata?.creationTimestamp;
      delete requestData.metadata?.resourceVersion;
      delete requestData.metadata?.uid;
      await clusterPostProxy(
        {

          cluster,
          address: `apis/${pipelineRunResourceGroup?.groupVersion}/namespaces/${requestData.metadata?.namespace}/pipelineruns`,
        },
        requestData,
      );
      message.success(intl.formatMessage({ id: 'cluster.pages.operation.success' }));
      window.location.reload();
    } catch (err) {
      message.error(intl.formatMessage({ id: 'cluster.operation.failed' }));
    }
  };

  // ------------------ Initial Load ------------------
  useEffect(() => {
    getPipelineRun();
    listTasks();
  }, []);

  useEffect(() => {
    if (pipelineRun.metadata?.name) {
      listTaskRuns();
    }
  }, [pipelineRun.metadata?.name]);

  // ✅ 新增：每秒更新当前时间，用于动态计算运行中任务的耗时
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentUTCTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // ------------------ Actions ------------------
  const actionCall = (op: string) => {
    if (op === 'reRun') {
      reDeploy(pipelineRun);
    }
  };

  const nodeSelected = useCallback((nodeId: string) => {
    setTaskRunNodeSelected(nodeId);
  }, []);

  // ------------------ Graph Construction ------------------
  const getPipelineNodesAndEdges = (pipeline: IPipeline): { nodes: Node[]; edges: Edge[] } => {
    let nodes: Node[] = [
      { id: "_start", type: "start", position: { x: 0, y: 0 }, data: {} },
      { id: "_finally", type: "finally", position: { x: 4, y: 5 }, data: {} },
      { id: "_stop", type: "stop", position: { x: 4, y: 5 }, data: {} },
    ];
    let edges: Edge[] = [];
    const taskHasNext: Record<string, boolean> = {};

    if (pipeline.spec?.tasks?.length) {
      for (const task of pipeline.spec.tasks) {
        if (!task.name) continue;
        taskHasNext[task.name] = false;
        nodes.push({
          id: task.name,
          type: "task",
          data: {
            id: task.name,
            taskRef: task.taskRef?.name!,
            displayName: task.displayName || task.name,
            description: task.description || '',
            stepsNumber: taskMap[task.taskRef?.name!]?.spec?.steps?.length || 0,
            taskRun: taskRunMap[`${pipelineRun.metadata?.name}-${task.name}`],
            nodeSelected,
          } as TaskRunProps,
          position: { x: 0, y: 0 },
        });

        if (task.runAfter?.length) {
          for (const runAfter of task.runAfter) {
            taskHasNext[runAfter] = true;
            edges.push({
              id: `${runAfter}|${task.name}`,
              source: runAfter,
              target: task.name,
              type: lineType,
              animated: true,
            });
          }
        } else {
          edges.push({
            id: `_start|${task.name}`,
            source: "_start",
            target: task.name,
            type: lineType,
            animated: true,
          });
        }
      }
    } else {
      edges.push({ id: "_start|_finally", source: "_start", target: "_finally", type: lineType, animated: true });
    }

    if (pipeline.spec?.finally?.length) {
      for (const task of pipeline.spec.finally) {
        if (!task.name) continue;
        nodes.push({
          id: task.name,
          type: "task",
          data: {
            id: task.name,
            taskRef: task.taskRef?.name!,
            displayName: task.displayName || task.name,
            description: task.description || '',
            stepsNumber: taskMap[task.taskRef?.name!]?.spec?.steps?.length || 0,
            taskRun: taskRunMap[`${pipelineRun.metadata?.name}-${task.name}`],
            nodeSelected,
          } as TaskRunProps,
          position: { x: 0, y: 0 },
        });
        edges.push(
          { id: `${task.name}|_stop`, source: task.name, target: '_stop', type: lineType, animated: true },
          { id: `_finally|${task.name}`, source: '_finally', target: task.name, type: lineType, animated: true }
        );
      }
    } else {
      edges.push({ id: "_finally|_stop", source: "_finally", target: "_stop", type: lineType, animated: true });
    }

    for (const taskId in taskHasNext) {
      if (taskHasNext.hasOwnProperty(taskId) && !taskHasNext[taskId]) {
        edges.push({
          id: `${taskId}|_finally`,
          source: taskId,
          target: '_finally',
          type: lineType,
          animated: true,
        });
      }
    }

    return { nodes, edges };
  };

  const getLayoutedElements = (nodes: Node[], edges: Edge[], direction: 'horizontal' | 'vertical') => {
    const isHorizontal = direction === 'horizontal';
    const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
    dagreGraph.setGraph({ rankdir: isHorizontal ? 'LR' : 'TB' });

    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const layoutedNodes = nodes.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      return {
        ...node,
        data: {
          ...node.data,
          layoutDirection: direction,
        },
        targetPosition: isHorizontal ? 'left' : 'top',
        sourcePosition: isHorizontal ? 'right' : 'bottom',
        position: {
          x: nodeWithPosition.x - nodeWidth / 2,
          y: nodeWithPosition.y - nodeHeight / 2,
        },
      };
    });

    return { nodes: layoutedNodes, edges };
  };

  const [nodes, setNodes] = useNodesState<Node>([]);
  const [edges, setEdges] = useEdgesState<Edge[]>([]);

  // Layout & Render Graph
  useEffect(() => {
    const { nodes: initialNodes, edges: initialEdges } = getPipelineNodesAndEdges(pipeline);
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(initialNodes, initialEdges, layout);
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
    setTimeout(() => fitView({ duration: 500 }), 100);
  }, [pipeline, layout, taskRunMap, lineType, fitView]);

  const handleToggleLayout = () => {
    setLayout((prev) => (prev === 'horizontal' ? 'vertical' : 'horizontal'));
  };

  const onNodeClick = (_event: React.MouseEvent, node: Node) => {
    const newSelectedId = selectedNodeId === node.id ? null : node.id;
    setSelectedNodeId(newSelectedId);
    highlightConnectedEdges(newSelectedId);

    setNodes((nds) =>
      nds.map((nd) => ({
        ...nd,
        style: {
          ...nd.style,
          border: nd.id === newSelectedId ? '2px solid #F57DBD' : 'none',
        },
      }))
    );
  };

  const highlightConnectedEdges = (nodeId: string | null) => {
    setEdges((eds) =>
      eds.map((edge) => {
        const isConnected = edge.source === nodeId || edge.target === nodeId;
        if (isConnected && nodeId) {
          return {
            ...edge,
            animated: true,
            style: { ...edge.style, stroke: '#F57DBD', strokeWidth: 1 },
          };
        } else {
          const { stroke, strokeWidth, ...restStyle } = edge.style || {};
          return { ...edge, style: restStyle };
        }
      })
    );
  };

  const pipelineRunParamsRender = (): { name: string; description: string; type: string; value: string }[] => {
    const paramMap: Record<string, { name: string; description: string; type: string; value: string }> = {};

    if (pipelineRun.status?.pipelineSpec?.params) {
      for (const p of pipelineRun.status.pipelineSpec.params) {
        let value = p.value;
        if (p.type !== 'string') {
          try {
            value = JSON.stringify(p.value);
          } catch { }
        }
        paramMap[p.name] = { name: p.name, type: p.type, description: p.description, value };
      }
    }

    if (pipelineRun.spec?.params) {
      for (const p of pipelineRun.spec.params) {
        if (paramMap[p.name]) {
          let value = p.value;
          if (paramMap[p.name].type !== 'string') {
            try {
              value = JSON.stringify(p.value);
            } catch { }
          }
          paramMap[p.name] = { ...paramMap[p.name], value };
        }
      }
    }

    return Object.values(paramMap);
  };
  const [externalAiMessage, setExternalAiMessage] = useState<{ message: string; questionType: 'log'; }>();
  const handleLogSelect = (logQuestion: string) => {
    setExternalAiMessage({ message: logQuestion, questionType: 'log' });
  };
  return (
    <PageContainer title={false} header={{ breadcrumb: {} }} ghost className="no-padding-page">
      <Splitter style={{ height: 'calc(100vh - 56px)', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <Splitter.Panel>
          <ReactFlow
            key={`${layout}-${lineType}`}
            panOnDrag
            zoomOnPinch
            zoomOnScroll
            preventScrolling
            minZoom={0.1}
            maxZoom={4}
            proOptions={{ hideAttribution: true }}
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            nodesConnectable={false}
            onNodeClick={onNodeClick}
            attributionPosition="top-right"
            style={{ backgroundColor: "#F7F9FB" }}
          >
            <Controls orientation="horizontal" showFitView>
              <div
                key="rotate"
                className="react-flow-custom-control"
                onClick={handleToggleLayout}
                style={{ width: 26, height: 26, transition: 'background-color 0.2s' }}
              >
                <PartitionOutlined
                  style={{
                    fontSize: 16,
                    transform: `rotate(${rotation}deg)`,
                    transition: 'transform 0.3s ease',
                  }}
                />
              </div>
              <div
                key="line"
                className="react-flow-custom-control"
                onClick={() => {
                  const newLineType =
                    lineType === ConnectionLineType.Bezier
                      ? ConnectionLineType.SmoothStep
                      : ConnectionLineType.Bezier;
                  setLineType(newLineType);
                  setEdges((prev) => prev.map((e) => ({ ...e, type: newLineType })));
                  sessionStorage.setItem('line-type', newLineType);
                }}
                style={{ width: 26, height: 26, transition: 'background-color 0.2s' }}
              >
                {lineType === ConnectionLineType.Bezier ? (
                  <img src="/line-tree.svg" alt="tree" />
                ) : (
                  <img src="/line-bezier.svg" alt="bezier" />
                )}
              </div>
            </Controls>
            <Background />
            <TopRightButton action="detail" actionCall={actionCall} name={pipelineRun?.metadata?.name || ''} />
          </ReactFlow>
        </Splitter.Panel>

        <Splitter.Panel
          collapsible={{ start: true, end: true, showCollapsibleIcon: true }}
          defaultSize="20%"
          max="50%"
        >
          <Tabs
            style={{ paddingLeft: 10 }}
            items={[
              {
                key: 'taskruninfo',
                label: intl.formatMessage({ id: 'tekton.pipelinerun.taskrun.info' }),
                children: taskRuns.map((item) => {
                  let duration = '';
                  if (item.metadata?.creationTimestamp) {
                    // ✅ 关键修改：使用 currentTime 动态计算
                    const endTime = item.status?.completionTime || currentTime;
                    duration = getExecutionTimeDetailed(item.metadata.creationTimestamp, endTime);
                  }
                  const status = item.status?.conditions?.find((c) => c.type === 'Succeeded')?.reason || 'Unknown';
                  return (
                    <Card key={item.metadata?.uid} style={{ marginBottom: 10 }} styles={{ body: { padding: 5 } }}>
                      <ProDescriptions column={1}>
                        <ProDescriptions.Item
                          style={{ padding: 2 }}
                          label={intl.formatMessage({ id: 'tekton.pipelinerun.taskrun.name' })}
                        >
                          <a
                            onClick={() => {
                              const pipelineTask = item.metadata?.labels?.['tekton.dev/pipelineTask'];
                              if (pipelineTask) setTaskRunNodeSelected(pipelineTask);
                            }}
                          >
                            {item.metadata?.labels?.['tekton.dev/pipelineTask'] || item.metadata?.name}
                          </a>
                        </ProDescriptions.Item>
                        <ProDescriptions.Item
                          style={{ padding: 2 }}
                          label={intl.formatMessage({ id: 'tekton.pipelinerun.taskrun.duration' })}
                        >
                          {duration}
                        </ProDescriptions.Item>
                        <ProDescriptions.Item
                          style={{ padding: 2 }}
                          label={intl.formatMessage({ id: 'tekton.pipelinerun.taskrun.status' })}
                          valueEnum={{
                            Succeeded: { text: intl.formatMessage({ id: `model.${status}` }), color: 'rgb(51, 204, 0)' },
                            Failed: { text: intl.formatMessage({ id: `model.${status}` }), status: 'Error' },
                            Running: { text: intl.formatMessage({ id: `model.${status}` }), status: 'rgba(4, 81, 36, 1)' },
                            Unknown: { text: intl.formatMessage({ id: `model.${status}` }), status: 'rgba(9, 120, 239, 1)' },
                            Pending: { text: intl.formatMessage({ id: `model.${status}` }), status: 'rgba(242, 231, 11, 1)' },
                          }}
                        >
                          {status}
                        </ProDescriptions.Item>
                      </ProDescriptions>
                    </Card>
                  );
                }),
              },
              {
                key: 'base',
                label: intl.formatMessage({ id: 'tekton.pipeline.info' }),
                children: (
                  <div className="sidebar-scroll-container">
                    <ProDescriptions column={1}>
                      <ProDescriptions.Item label={intl.formatMessage({ id: 'workspace.pipeline' })}>
                        <a
                          onClick={() =>
                            window.open(
                              `/kubernetes/cluster/${cluster}/namespace/${namespace}/devops/cicd/tekton/pipelines/lego/detail/${pipelineRun.spec?.pipelineRef?.name}`,
                              '_blank'
                            )
                          }
                        >
                          {pipelineRun.spec?.pipelineRef?.name}
                        </a>
                      </ProDescriptions.Item>
                      <Divider orientation="horizontal" style={{ margin: 8 }}>
                        {intl.formatMessage({ id: 'tekton.pipeline.variables' })}
                      </Divider>
                    </ProDescriptions>
                    {pipelineRunParamsRender().map((item) => (
                      <Card key={item.name} style={{ marginBottom: 10 }} styles={{ body: { padding: 5 } }}>
                        <ProDescriptions column={1}>
                          <ProDescriptions.Item
                            style={{ padding: 2 }}
                            label={intl.formatMessage({ id: 'tekton.pipeline.param.name' })}
                          >
                            {item.name}
                          </ProDescriptions.Item>
                          <ProDescriptions.Item
                            style={{ padding: 2 }}
                            label={intl.formatMessage({ id: 'tekton.pipeline.param.description' })}
                          >
                            {item.description}
                          </ProDescriptions.Item>
                          <ProDescriptions.Item
                            valueType={item.type === 'string' ? 'text' : 'textarea'}
                            style={{ padding: 2 }}
                            label={intl.formatMessage({ id: 'tekton.pipeline.param.value' })}
                          >
                            {item.value}
                          </ProDescriptions.Item>
                        </ProDescriptions>
                      </Card>
                    ))}
                  </div>
                ),
              },
            ]}
          />
        </Splitter.Panel>
      </Splitter>

      <Drawer
        closable={false}
        placement="left"
        open={!!taskRunNodeSelected}
        size={drawerSize}
        resizable={{
          onResize: (newSize) => setDrawerSize(newSize),
        }}
        onClose={() => setTaskRunNodeSelected('')}
        styles={{ body: { backgroundColor: '#f0f2f5' } }}
      >
        {taskRunNodeSelected && (
          <PodSingle
            key={`${pipelineRun.metadata?.name}-${taskRunNodeSelected}-pod`}
            startTime={pipelineRun.status?.startTime}
            endTime={pipelineRun.status?.completionTime}
            cluster={cluster}
            namespace={namespace}
            name={`${pipelineRun.metadata?.name}-${taskRunNodeSelected}-pod`}
            onSelectLog={handleLogSelect}
          />
        )}
      </Drawer>

      {pipelineRun.apiVersion && <AICopilot
        view='detail'
        cluster={cluster}
        namespace={namespace || ''}
        name={pipelineRun.metadata?.name || ''}
        kind="PipelineRun"
        resourceContent={yaml.dump(cleanK8sResourceForAI(pipelineRun))}
        status={getPipelineRunStatus(pipelineRun)}
        externalMessage={externalAiMessage}
      />}
    </PageContainer>
  );
};

const FlowPage: React.FC = () => {
  return (
    <div>
      <ReactFlowProvider>
        <DnDProvider>
          <DnDFlow />
        </DnDProvider>
      </ReactFlowProvider>
    </div>
  );
};

export default FlowPage;

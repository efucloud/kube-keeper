import { getClusterApiVersions, getColorPrimary, getCurrentViewInfo } from "@/utils/global";
import { PageContainer, ProDescriptions, ProTable } from "@ant-design/pro-components";
import { useParams, useIntl, FormattedMessage } from "@umijs/max";
import React, { useEffect, useState } from "react";
import { Button, Card, Space, Row, Col, Tabs, Spin, Tooltip, List, Alert, message } from "antd";
import { clusterGetProxy } from '@/services/cluster_proxy.api';
import { CheckCircleFilled, CheckCircleOutlined, CloseCircleFilled, ExclamationCircleOutlined, PauseCircleOutlined, QuestionCircleOutlined, RedoOutlined, ReloadOutlined } from "@ant-design/icons";
import * as yaml from 'js-yaml';
import { Pipeline, PipelineRun, Task, TaskRun } from '@/k8s-models/tekton/pipeline/tekton.dev/v1';
import Paragraph from "antd/lib/typography/Paragraph";
import { Editor } from "@monaco-editor/react";
import { Pod } from "kubernetes-models/v1";
import PodContainerLog from "@/pages/kubernetes/components/container_log";
import PodContainerTerminal from "@/pages/kubernetes/components/container_terminal";
import AICopilot from "@/pages/kubernetes/components/ai";
import { cleanK8sResourceForAI } from "@/utils/copilot";
import { getPipelineRunStatus } from "@/utils/pipeline";
interface TaskDef {
  displayName: string
  name: string
  params: any[];
  taskRef: any;
  workspaces: any[];
}
const DetailView: React.FC = () => {
  const colorPrimary = getColorPrimary();
  const { cluster, namespace } = getCurrentViewInfo();
  const { name } = useParams();
  const [info, setInfo] = useState<PipelineRun>();
  const intl = useIntl();
  const [taskRuns, setTaskRuns] = useState<Record<string, TaskRun>>({});
  const [tasks, setTasks] = useState<Record<string, Task>>();
  const [selectedStep, setSelectedStep] = useState<string>('')
  const [pipeline, setPipeline] = useState<Pipeline>()
  const [selectedTask, setSelectedTask] = useState<string>('')
  const [taskRunPod, setTaskRunPod] = useState<Pod | undefined>();
  const [activeKey, setActiveKey] = useState<string>('params');
  const [activeViewKey, setActiveViewKey] = useState<string>('detail');
  const [activePodKey, setActivePodKey] = useState<string>('yaml');
  const [view, setView] = useState<string>('pod')
  const [selectedContainer, setSelectedContainer] = useState<string>()
  const resourceGroup = getClusterApiVersions(cluster, ['tekton.dev/v1'], "PipelineRun");
  const BaseApi = `apis/${resourceGroup?.groupVersion}/namespaces/${namespace}/pipelineruns`;
  let BaseAddress = `/kubernetes/cluster/${cluster}/namespace/${namespace}/devops/cicd/tekton/pipelineruns`
  if (!namespace || namespace === '' || namespace === '-') {
    BaseAddress = `/kubernetes/cluster/${cluster}/devops/cicd/tekton/pipelineruns`
  }
  const taskRunAddress = `apis/${resourceGroup?.groupVersion}/namespaces/${namespace}/taskruns`
  const getInfo = async () => {
    let params = { cluster, address: `${BaseApi}/${name}` } as Record<string, any>;
    const resInfo: PipelineRun = await clusterGetProxy(params);
    setInfo(resInfo)
    if (resInfo.spec?.pipelineRef?.name) {
      const resPipeline: Pipeline = await clusterGetProxy({ cluster, address: `apis/${resourceGroup?.groupVersion}/namespaces/${namespace}/pipelines/${resInfo.spec?.pipelineRef?.name}` });
      setPipeline(resPipeline)
    }


  };
  const listPipelineRunTaskRuns = async () => {
    let params = { cluster, address: taskRunAddress } as Record<string, any>;
    params['labelSelector'] = `tekton.dev/pipelineRun=${info?.metadata?.name}`;
    const runs = await clusterGetProxy(params);
    let m = {} as Record<string, TaskRun>
    if (runs?.items?.length > 0) {
      for (let i = 0; i < runs?.items.length; i++) {
        const item = runs.items[i] as TaskRun
        if (item.metadata?.name) {
          m[item.metadata?.name] = item
        }
      }
    }
    setTaskRuns(m);
  }
  const listTasks = async () => {
    let params = { cluster, address: `apis/${resourceGroup?.groupVersion}/namespaces/${namespace}/tasks` } as Record<string, any>;
    const res = await clusterGetProxy(params);
    if (res?.items?.length > 0) {
      let ts = {} as Record<string, Task>;
      for (let i = 0; i < res.items.length; i++) {
        const item = res.items[i] as Task;
        if (item.metadata?.name) {
          ts[item.metadata?.name] = item;
        }
      }
      setTasks(ts);
    }
  };
  useEffect(() => {
    listTasks();
    getInfo();
  }, [name]);

  useEffect(() => {
    if (info?.metadata?.name !== '') {
      listPipelineRunTaskRuns();
    }
  }, [info?.metadata?.resourceVersion]);
  const getTaskRunPod = async (pod: string) => {
    let params = { cluster, address: `api/v1/namespaces/${namespace}/pods` } as Record<string, any>;
    params['labelSelector'] = `tekton.dev/pipelineRun=${info?.metadata?.name}`;
    const res = await clusterGetProxy(params);
    const pods = res.items.filter(item => item.metadata.name === pod)
    setTaskRunPod(pods ? pods[0] : undefined);
  };
  useEffect(() => {
    if (selectedTask && selectedTask !== '') {
      getTaskRunPod(`${name}-${selectedTask}-pod`)
    }
  }, [selectedTask]);
  const getSubTitle = (info: PipelineRun) => {
    let status = 'Unknown'
    let message = ''
    info?.status?.conditions?.map((item) => {
      if (item.type === 'Succeeded') {
        status = item.reason || 'Unknown'
      }
      message = item.message || '';
    })
    if (status === "Running") {
      return <Space> <Spin indicator={<RedoOutlined style={{ color: '#198038', fontSize: '22px' }} spin />} />&nbsp;&nbsp;<FormattedMessage id={`model.${status}`} />&nbsp;&nbsp;{message}</Space>
    } if (status === 'Succeeded') {
      return <Space ><CheckCircleFilled style={{ color: '#52c41a', fontSize: '22px' }} />&nbsp;&nbsp;<FormattedMessage id={`model.${status}`} />&nbsp;&nbsp;{message}</Space>
    } else if (status === 'Failed') {
      return <Space><CloseCircleFilled style={{ color: '#da1e28', fontSize: '22px' }} />&nbsp;&nbsp;<FormattedMessage id={`model.${status}`} />&nbsp;&nbsp;{message}</Space>
    } else {
      return <Space><ExclamationCircleOutlined style={{ color: '#FA541C', fontSize: '22px' }} />&nbsp;&nbsp;<FormattedMessage id={`model.${status}`} />&nbsp;&nbsp;{message}</Space>
    }
  }

  const items = (): TaskDef[] => {
    const tasks = (info?.status?.pipelineSpec.tasks || []) as any[];
    let nodes = [] as TaskDef[];
    if (tasks[0] && selectedStep === '') {
      setSelectedStep(tasks[0].displayName);
      setSelectedTask(tasks[0].name);
    }
    for (let i = 0; i < tasks.length; i++) {
      nodes.push(tasks[i])
    }

    if (pipeline?.spec?.finally) {
      const l = pipeline?.spec?.finally
      for (let i = 0; i < l.length; i++) {
        nodes.push(l[i])
      }
    }
    return nodes;

  }
  const getStepStatus = (stepName: string): React.ReactNode => {
    const taskRun = taskRuns[`${info?.metadata?.name}-${stepName}`]
    if (taskRun) {
      if (taskRun.status?.conditions) {
        const condition = taskRun.status?.conditions[0];
        if (condition.type === 'Succeeded') {
          if (condition.reason === 'Succeeded') {
            return <CheckCircleFilled style={{ color: '#198038', fontSize: '16px' }} />

          } else if (condition.reason === 'Failed') {
            return <CloseCircleFilled style={{ color: '#da1e28', fontSize: '16px' }} />

          } else if (condition.reason === 'Running') {

            return <Spin indicator={<ReloadOutlined style={{ color: '#198038', fontSize: '16px' }} spin />} />
          } else {
            return <QuestionCircleOutlined style={{ color: colorPrimary, fontSize: '16px' }} />
          }
        } else {
          return <PauseCircleOutlined style={{ fontSize: '16px' }} />
        }
      } else {
        return <PauseCircleOutlined style={{ fontSize: '16px' }} />
      }
    } else {
      return <ExclamationCircleOutlined style={{ fontSize: '16px' }} />
    }

  }
  const displayStep = (taskName: string, stepName: string) => {
    return (
      <div style={{ alignItems: 'center', display: 'flex' }}
        onClick={() => {
          setSelectedStep(stepName);
          setSelectedTask(taskName);
          setView('pod')
          setActiveKey('params')
        }}
      >
        <div style={{ display: 'inline-block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}  >
          {getStepStatus(taskName)}&nbsp; <span style={{ fontSize: '12px' }}>{stepName}</span>
        </div>
      </div>
    )
  };
  const displayTaskStepStatus = (stepName: string, taskRun: TaskRun | undefined) => {
    if (stepName === '' || !taskRun) {
      return null
    }
    const step = taskRun.status?.steps?.filter(item => item.name === stepName)[0];
    const reason = step?.terminated?.reason || ''
    if (reason === "Running") {
      return <Spin indicator={<RedoOutlined style={{ color: '#52c41a', fontSize: '14px' }} spin />} />
    } if (reason === 'Completed') {
      return <CheckCircleOutlined style={{ color: '#52c41a' }} />
    } else if (reason === 'Failed') {
      return <CloseCircleFilled style={{ color: '#da1e28' }} />
    } else if (reason === 'Successed') {
      return <CheckCircleOutlined style={{ color: '#52c41a' }} />
    } else if (step?.running) {
      return <Spin indicator={<RedoOutlined style={{ color: '#52c41a', fontSize: '14px' }} spin />} />
    } else {
      return <ExclamationCircleOutlined style={{ color: '#FA541C' }} />
    }
    return null
  }
  const displayTask = (stepName: string, taskName: string, name: string) => {

    if (tasks && tasks[name] && stepName === selectedStep) {
      const task = tasks[name] as Task;
      return (
        <Paragraph>
          <ul className='no-bullet'>
            {task.spec?.steps?.map((item) => {
              return <li onClick={() => {
                setView('container');
                setSelectedContainer(item.name);
              }}>
                <div>
                  &nbsp;&nbsp;&nbsp;{displayTaskStepStatus(item.name, taskRuns[`${info?.metadata?.name}-${taskName}`])}
                  &nbsp;<Tooltip color={colorPrimary} title={stepName}><span style={{ color: colorPrimary }}>{item.name}</span></Tooltip>
                </div>
              </li>
            })}
          </ul>
        </Paragraph>
      )
    } else {
      return null
    }
  }
  const getTaskRunStatus = (taskRun: TaskRun) => {
    let status = 'Unknown'
    let message = ''
    taskRun?.status?.conditions?.map((item) => {
      if (item.type === 'Succeeded') {
        status = item.reason || 'Unknown'
      }
      message = item.message || '';
    })
    if (status === "Running") {
      return <Space  ><div>
        <RedoOutlined style={{ color: '#198038', fontSize: '18px' }} />&nbsp;{taskRun.metadata?.name}
        <Alert title={message} type="info" style={{ fontSize: '12px' }} />
      </div></Space>
    } if (status === 'Succeeded') {
      return <Space  ><div>
        <CheckCircleFilled style={{ color: '#52c41a', fontSize: '18px' }} />&nbsp;{taskRun.metadata?.name}
        <Alert title={message} type="success" style={{ fontSize: '12px' }} />
      </div></Space>
    } else if (status === 'Failed') {
      return <Space  ><div>
        <CloseCircleFilled style={{ color: '#da1e28', fontSize: '18px' }} />&nbsp;{taskRun.metadata?.name}
        <Alert title={message} type="error" style={{ fontSize: '12px' }} />
      </div></Space>
    } else {
      return <Space  ><div>
        <ExclamationCircleOutlined style={{ color: '#FA541C', fontSize: '18px' }} />&nbsp;{taskRun.metadata?.name}
        <Alert title={message} type="warning" style={{ fontSize: '12px' }} />
      </div></Space>
    }
  }
  const [externalAiMessage, setExternalAiMessage] = useState<{ message: string; questionType: 'log'; }>();
  const handleLogSelect = (logQuestion: string) => {
    setExternalAiMessage({ message: logQuestion, questionType: 'log' });
  }
  const renderPod = (pod: Pod) => {
    const containers = [] as string[];
    for (let i = 0; i < pod?.spec?.containers.length; i++) {
      containers.push(pod?.spec?.containers[i].name);
    }

    const items = [
      {
        label: 'Yaml',
        key: 'yaml',
        children: <Editor
          key='status'
          language='yaml'
          height="60vh"
          theme="vs-dark"
          options={{
            readOnly: true,
            tabSize: 2,
            insertSpaces: true,
          }}
          defaultValue={yaml.dump(pod)}
          onMount={(editor, monaco) => {
            // 拦截键盘输入
            editor.onKeyDown((e) => {
              if (!editor.getOption(monaco.editor.EditorOption.readOnly)) return;
              // 阻止所有可能修改内容的按键（可选）
              if (!e.ctrlKey && !e.metaKey && !e.altKey) {
                e.preventDefault();
                // 可选：显示自定义提示（如 Tooltip、Toast）
                message.warning(intl.formatMessage({ id: 'pages.operation.write.forbbiden' }));
              }
            });
            // 拦截粘贴
            editor.onDidPaste(() => {
              if (editor.getOption(monaco.editor.EditorOption.readOnly)) {
                message.warning(intl.formatMessage({ id: 'pages.operation.paste.forbidden' }));
              }
            });
          }} />

      },
      {
        label: intl.formatMessage({ id: 'cluster.resource.container.log' }),
        key: 'log',
        children: <>
          <PodContainerLog cluster={cluster} namespace={namespace} pod={pod?.metadata?.name || ''}
            running={pod?.status?.phase === 'Running'}
            containers={[
              ...(pod?.spec?.containers?.map(c => c.name) ?? []), ...(pod?.spec?.initContainers?.map(c => c.name) ?? [])
            ]} onSelectLog={handleLogSelect} />
        </>
      }
    ];
    if (pod.status?.phase === "Running") {
      items.push(
        {
          key: 'terminal',
          label: intl.formatMessage({ id: 'cluster.resource.container.terminal' }),
          children: <>
            {info?.metadata?.name &&
              < PodContainerTerminal cluster={cluster} namespace={namespace} pod={pod?.metadata?.name || ''} containers={containers} />
            }
          </>
        }
      )
    }
    return (
      <>
        <Tabs
          activeKey={activePodKey}
          items={items}
          onChange={(key) => { setActivePodKey(key) }}
        />
      </>
    )
  }
  const taskRunItems = (taskRun: TaskRun) => {
    let nodes = [
      {
        key: 'params',
        label: <FormattedMessage id='model.params' />,
        children: <>
          <ProTable<any>
            key='params'
            scroll={{ x: 'max-content' }}
            rowKey="name"
            columns={[
              {
                title: <FormattedMessage id='cluster.resource.name' />,
                dataIndex: 'name',
              },
              {
                title: <FormattedMessage id='cluster.resource.value' />,
                dataIndex: 'value',
                render: (dom, entity) => {
                  if (Array.isArray(entity.value)) {
                    return (
                      <ProDescriptions><ProDescriptions.Item valueType='code'  >{entity?.value.join("\n")}</ProDescriptions.Item></ProDescriptions>
                    );
                  } else {
                    return (
                      <ProDescriptions><ProDescriptions.Item valueType='code'   >{entity?.value || ''}</ProDescriptions.Item></ProDescriptions>
                    );
                  }
                },
              },
            ]}
            dataSource={taskRun.spec?.params || []}
            search={false}
            options={false}
          />
        </>
      },
      {
        key: 'status',
        label: <FormattedMessage id='model.status' />,
        children: <>
          <Editor
            key='status'
            language='yaml'
            height="60vh"
            theme="vs-dark"
            options={{
              readOnly: true,
              tabSize: 2,
              insertSpaces: true,
            }}
            defaultValue={yaml.dump(taskRun.status)}
            onMount={(editor, monaco) => {
              // 拦截键盘输入
              editor.onKeyDown((e) => {
                if (!editor.getOption(monaco.editor.EditorOption.readOnly)) return;
                // 阻止所有可能修改内容的按键（可选）
                if (!e.ctrlKey && !e.metaKey && !e.altKey) {
                  e.preventDefault();
                  // 可选：显示自定义提示（如 Tooltip、Toast）
                  message.warning(intl.formatMessage({ id: 'pages.operation.write.forbbiden' }));
                }
              });
              // 拦截粘贴
              editor.onDidPaste(() => {
                if (editor.getOption(monaco.editor.EditorOption.readOnly)) {
                  message.warning(intl.formatMessage({ id: 'pages.operation.paste.forbidden' }));
                }
              });
            }}
          />
        </>
      },
      {
        key: 'pod',
        label: <FormattedMessage id='cluster.resource.pod' />,
        children: <>
          {taskRunPod && taskRunPod.metadata?.name && taskRunPod.metadata?.name !== '' && <>{renderPod(taskRunPod)}</>}
          {!taskRunPod && <><FormattedMessage id='cluster.DevOps.Tekton.task.Pod.notCreated' /></>}

        </>
      }
    ]
    return nodes;
  }
  const containerItems = (taskRun: TaskRun) => {
    if (!taskRunPod) {
      return []
    }
    const container = taskRunPod.spec?.containers.filter(item => item.name === `step-${selectedContainer}`)[0]
    let nodes = [
      {
        key: 'detail',
        label: <FormattedMessage id='model.detail' />,
        children: <>
          <Editor
            key='container-status'
            language='yaml'
            height="60vh"
            theme="vs-dark"
            options={{
              readOnly: true,
              tabSize: 2,
              insertSpaces: true,
            }}
            defaultValue={yaml.dump(container)}
            onMount={(editor, monaco) => {
              // 拦截键盘输入
              editor.onKeyDown((e) => {
                if (!editor.getOption(monaco.editor.EditorOption.readOnly)) return;
                // 阻止所有可能修改内容的按键（可选）
                if (!e.ctrlKey && !e.metaKey && !e.altKey) {
                  e.preventDefault();
                  // 可选：显示自定义提示（如 Tooltip、Toast）
                  message.warning(intl.formatMessage({ id: 'pages.operation.write.forbbiden' }));
                }
              });
              // 拦截粘贴
              editor.onDidPaste(() => {
                if (editor.getOption(monaco.editor.EditorOption.readOnly)) {
                  message.warning(intl.formatMessage({ id: 'pages.operation.paste.forbidden' }));
                }
              });
            }}
          />
        </>
      },
      {
        key: 'log',
        label: <FormattedMessage id='cluster.resource.container.log' />,
        children: <>
          {container && <PodContainerLog running={taskRunPod?.status?.phase === 'Running'} cluster={cluster} namespace={namespace} pod={taskRunPod?.metadata?.name || ''} containers={[container?.name]} onSelectLog={handleLogSelect} />}
        </>
      }

    ]
    if (taskRunPod.status?.phase === 'Running') {
      nodes.push(
        {
          key: 'terminal',
          label: <FormattedMessage id='cluster.resource.container.terminal' />,
          children: <>
            {container && <PodContainerTerminal cluster={cluster} namespace={namespace} pod={taskRunPod?.metadata?.name || ''} containers={[container?.name]} />}
          </>
        }
      )
    }
    return nodes;
  }
  const displayTaskRun = (taskName: string) => {
    if (taskRuns && taskRuns[taskName]) {
      const taskRun = taskRuns[taskName] as TaskRun;
      return (
        <Card styles={{ body: { padding: '10px', minHeight: '70vh' } }}>
          <Row>
            <Col span={24}> {getTaskRunStatus(taskRun)}</Col>
          </Row>
          {view === 'pod' && <Tabs
            activeKey={activeKey}
            items={taskRunItems(taskRun)}
            onChange={(key) => { setActiveKey(key) }}
          />}
          {view === 'container' && <>
            <Tabs
              key={selectedContainer}
              activeKey={activeViewKey}
              items={containerItems(taskRun)}
              onChange={(key) => { setActiveViewKey(key) }}
            />
          </>}

        </Card>
      )
    }
    return null
  }
  return (<>
    {info && <PageContainer header={{ breadcrumb: {}, onBack: () => window.history.back() }}
      title={info?.metadata?.name}
      key={info.metadata?.resourceVersion}
      subTitle={getSubTitle(info)}
      extra={[
        <Button onClick={() => {
          listTasks();
          getInfo();
          listPipelineRunTaskRuns();
        }}><ReloadOutlined /></Button>,
      ]}
    >
      <Card>
        <Row >
          <Col span={6} >
            <Card styles={{ body: { padding: 0 } }} >
              <List
                locale={{
                  emptyText: intl.formatMessage({ id: 'pages.not.found.data' })
                }}
                size="small"
                bordered
                dataSource={items()}
                renderItem={(item: TaskDef) => <List.Item>
                  <div>
                    <div >{displayStep(item.name, item.displayName)}</div>
                    {displayTask(item.displayName, item.name, item.taskRef.name)}
                  </div>
                </List.Item>}
              />
            </Card>
          </Col>
          <Col key={selectedStep} span={18} style={{ paddingLeft: '10px' }} >
            {displayTaskRun(`${name}-${selectedTask}`)}
          </Col>
        </Row>
      </Card>
      {info.apiVersion && <AICopilot
        view='detail'
        cluster={cluster}
        namespace={namespace || ''}
        name={info.metadata?.name || ''}
        kind="PipelineRun"
        resourceContent={yaml.dump(cleanK8sResourceForAI(info))}
        status={getPipelineRunStatus(info)}
        externalMessage={externalAiMessage}
      />}
    </PageContainer>}

  </>
  )
};
export default DetailView;
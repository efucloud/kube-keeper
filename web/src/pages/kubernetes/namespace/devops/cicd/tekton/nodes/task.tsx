import { Task } from '@/k8s-models/tekton/pipeline/tekton.dev/v1';
import { ParamSpec, PipelineWorkspaceDeclaration, TaskResult } from '@/services/tekton_pipeline_def';
import { getColorPrimary } from '@/utils/global';
import { DeleteOutlined, EditOutlined, QuestionCircleOutlined, ReloadOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { ModalForm, ProColumns, ProDescriptions, ProFormDependency, ProFormDigit, ProFormSelect, ProFormText, ProFormTextArea, ProTable } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Handle, Position } from '@xyflow/react';
import { Col, Descriptions, Divider, Drawer, Row, Space, Tabs, message, Tooltip, Typography, Button, Popconfirm } from 'antd';
import { memo, useEffect, useState } from 'react';
import { ThoughtChain, ThoughtChainProps } from '@ant-design/x';
import { getParamInfo, getResultInfo, PipelineTaskDef, PipelineTaskParam, WhenExpression, WorkspaceDeclaration, WorkspacePipelineTaskBinding } from '@/utils/pipeline';

const { Text } = Typography;

export interface TaskCanUseParams {
  displayName: string;
  description: string;
  pipelineParams: ParamSpec[];
  pipelineWorkspaces: PipelineWorkspaceDeclaration[];
  preStepResults: Record<string, TaskResult[]>;
  when?: WhenExpression[];
  params?: PipelineTaskParam[];
  workspaces: WorkspacePipelineTaskBinding[];
  runAfter?: string[];
}
export interface TaskProps {
  action: string;
  description?: string;
  displayName?: string;
  id: string;
  layoutDirection: 'horizontal' | 'vertical';
  task: Task | undefined;
  taskRef: string;
  when?: number;
  retries?: number;
  timeout?: string;

  updateNode: (nodeData: PipelineTaskDef) => void;
  getParams: (nodeId: string) => TaskCanUseParams;
}
const defaultFunc = (item: PipelineTaskParam, key: string) => {
  if (!item) {
    return null
  }
  if (item.type === 'string') {
    return item[key] as String;
  } else if (item[key]) {
    try {
      const result = JSON.stringify(item[key]);
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
function TaskNode({ data }: { data: TaskProps }) {
  const [viewVisiable, setViewVisiable] = useState<boolean>(false);
  const [drawerSize, setDrawerSize] = useState<number>(500);
  const direction = data?.layoutDirection || 'horizontal';
  const sourcePosition = direction === 'horizontal' ? Position.Right : Position.Bottom;
  const targetPosition = direction === 'horizontal' ? Position.Left : Position.Top;
  const task = data?.task ? data.task as Task : null;
  const [pipelienParamMap, setPipelineParamMap] = useState<Record<string, PipelineTaskParam>>({})
  const [taskParamMap, setTaskParamMap] = useState<Record<string, PipelineTaskParam>>({})
  const taskRef = data?.taskRef;
  const displayName = data?.displayName || taskRef || data?.task?.metadata?.name || '';
  const [taskParams, setTaskParams] = useState<TaskCanUseParams>();
  const colorPrimary = getColorPrimary();
  const [paramVisible, setParamVisible] = useState<boolean>(false);
  const [paramSelected, setParamSelected] = useState<PipelineTaskParam>();
  const [workspaceVisible, setWorkspaceVisible] = useState<boolean>(false);
  const [workspaceSelected, setWorkspaceSelected] = useState<WorkspaceDeclaration>();
  const [whenFormVisiable, setWhenFormVisiable] = useState<boolean>(false);
  const [selectedWhenExpression, setSelectedWhenExpression] = useState<WhenExpression>();
  const [taskDef, setTaskDef] = useState<PipelineTaskDef>()
  useEffect(() => {
    if (taskDef && taskDef.name && data.action !== 'detail' && taskDef.taskRef?.name) {
      // 更新节点数据
      data.updateNode(taskDef)
    }
  }, [taskDef]);
  const intl = useIntl();
  if (task === null || task === undefined) {
    return null;
  }
  const getTaskRawParam = () => {
    let result = {} as Record<string, PipelineTaskParam>
    if (task.spec && task.spec.params) {
      for (let i = 0; i < task.spec?.params.length; i++) {
        const item = task.spec.params[i]
        result[item.name] = {
          name: item.name,
          default: item.default,
          source: 'custom',
          description: item.description,
          type: item.type,
        } as PipelineTaskParam
      }
    }
    setPipelineParamMap(result)
  }
  const paramSelectOptions = (custom: boolean) => {
    let options = [] as Array<{ label: string; value: string }>;
    if (custom) {
      options.push({
        label: intl.formatMessage({ id: 'tekton.pipeline.param.value.source.custom' }),
        value: 'custom'
      });
    }
    if (taskParams?.pipelineParams && Object.keys(taskParams?.pipelineParams).length > 0) {
      options.push({

        label: intl.formatMessage({ id: 'tekton.pipeline.param.value.source.pipelineParam' }),
        value: 'pipelineParam'
      })
    }
    if (taskParams?.preStepResults && Object.keys(taskParams?.preStepResults).length > 0) {
      options.push({
        label: intl.formatMessage({ id: 'tekton.pipeline.param.value.source.taskResult' }),
        value: 'taskResult'
      })
    }
    return options;
  }
  const getCanSelectParams = (valueType: string) => {
    if (valueType === '') {
      return Object.values(taskParams?.pipelineParams || []).map((item: ParamSpec) => {
        return {
          label: item.name,
          value: item.name,
        }
      })
    }
    const canSelects = Object.values(taskParams?.pipelineParams || []).filter((item: ParamSpec) => item.type === valueType);
    return canSelects.map((item: ParamSpec) => {
      return {
        label: item.name,
        value: item.name,
      }
    })
  }
  const getPreTaskResult = () => {
    let nodes = [];
    if (taskParams?.preStepResults) {
      for (const [taskName, results] of Object.entries(taskParams.preStepResults)) {
        for (const [key, item] of Object.entries(results)) {
          nodes.push({
            label: `${intl.formatMessage({ id: 'tekton.task' })}:${taskName} ${intl.formatMessage({ id: 'tekton.pipeline.param.value.source.taskResult.name' })}:${item.name}`,
            value: `${taskName}.results.${item.name}`
          })
        }
      }
    }
    return nodes;
  }
  useEffect(() => {
    getTaskRawParam();
  }, [])
  const resultColumns = (): ProColumns[] => {
    let nodes = [
      {
        title: intl.formatMessage({ id: 'model.name' }),
        search: false,
        dataIndex: 'name',
        editable: false,
      },
      {
        title: intl.formatMessage({ id: 'tekton.task.params.type' }),
        search: false,
        dataIndex: 'type',
        editable: false,
        valueEnum: {
          'string': {
            text: intl.formatMessage({ id: 'tekton.task.params.type.string' }),
          },
          'array': {
            text: intl.formatMessage({ id: 'tekton.task.params.type.array' }),
          },
          'object': {
            text: intl.formatMessage({ id: 'tekton.task.params.type.object' }),
          },
        }
      },
      {
        title: intl.formatMessage({ id: 'model.description' }),
        search: false,
        dataIndex: 'description',
        editable: false,
      },
    ] as ProColumns[];
    return nodes;
  }
  const getCanSelectWorkspaces = () => {
    let nodes = []
    if (taskParams?.pipelineWorkspaces) {
      for (let i = 0; i < taskParams?.pipelineWorkspaces.length; i++) {
        nodes.push({
          label: taskParams.pipelineWorkspaces[i].name,
          value: taskParams.pipelineWorkspaces[i].name
        })
      }
    }
    return nodes;
  }
  const workspaceColumns = (): ProColumns[] => {
    let nodes = [
      {
        title: intl.formatMessage({ id: 'model.detail' }),
        search: false,
        render: (_, record: WorkspaceDeclaration) => {
          if (!record.optional) {
            record.optional = false;
          }
          if (!record.readOnly) {
            record.readOnly = false;
          }
          const ws = (taskDef?.workspaces || []).find(item => item.name === record.name) as WorkspacePipelineTaskBinding;
          return (
            <>
              <ProDescriptions column={1}>
                <ProDescriptions.Item style={{ padding: 2 }} label={intl.formatMessage({ id: 'tekton.task.workspaces.name' })}>{record.name}</ProDescriptions.Item>
                <ProDescriptions.Item style={{ padding: 2 }} label={intl.formatMessage({ id: 'tekton.task.workspaces.description' })}>{record.description}</ProDescriptions.Item>
              </ProDescriptions>
              <ProDescriptions column={2}>
                <ProDescriptions.Item style={{ padding: 2 }} label={intl.formatMessage({ id: 'tekton.task.workspaces.readOnly' })}
                  valueEnum={{
                    false: {
                      text: <FormattedMessage id="model.false" />,
                      status: 'Error',
                    },
                    true: {
                      text: <FormattedMessage id="model.true" />,
                      status: 'Success',
                    },
                  }}>{record.readOnly}</ProDescriptions.Item>
                <ProDescriptions.Item style={{ padding: 2 }} label={intl.formatMessage({ id: 'tekton.task.workspaces.optional' })}
                  valueEnum={{
                    false: {
                      text: <FormattedMessage id="model.false" />,
                      status: 'Error',
                    },
                    true: {
                      text: <FormattedMessage id="model.true" />,
                      status: 'Success',
                    },
                  }}
                >{record.optional}</ProDescriptions.Item>
              </ProDescriptions>
              {ws && <ProDescriptions column={2}>
                <ProDescriptions.Item label={intl.formatMessage({ id: 'tekton.task.workspaces.relation' })}>{ws.workspace}</ProDescriptions.Item>
                <ProDescriptions.Item label={intl.formatMessage({ id: 'tekton.task.workspaces.subPath' })}>{ws.subPath}</ProDescriptions.Item>
              </ProDescriptions>}
            </>
          )
        }
      }
    ] as ProColumns[];
    if (data?.action !== 'detail') {
      nodes.push({
        title: <FormattedMessage id="pages.operation" />,
        key: 'action',
        valueType: 'option',
        render: (_, record: WorkspaceDeclaration) => {
          const nodes = [
            <a
              key="edit"
              onClick={() => {
                setWorkspaceSelected(record)
                setWorkspaceVisible(true);
              }}
            >
              <EditOutlined />
            </a>,
          ];
          return nodes;
        },
      })
    }
    return nodes
  }
  const paramsColumns = (): ProColumns<PipelineTaskParam>[] => {
    let nodes = [] as ProColumns[];
    nodes = [
      {
        title: intl.formatMessage({ id: 'tekton.task.params.name' }),
        search: false,
        dataIndex: 'name',
        editable: false,

      },
      {
        title: intl.formatMessage({ id: 'model.detail' }),
        search: false,
        render: (_, record: PipelineTaskParam) => {
          if (record) {
            return (
              <>
                <ProDescriptions column={2}>
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
                  <ProDescriptions.Item style={{ padding: 2 }} label={intl.formatMessage({ id: 'tekton.pipeline.param.value.source' })}
                    valueEnum={{
                      'pipelineParam': intl.formatMessage({ id: 'tekton.pipeline.param.value.source.pipelineParam' }),
                      'taskResult': intl.formatMessage({ id: 'tekton.pipeline.param.value.source.taskResult' }),
                      'custom': intl.formatMessage({ id: 'tekton.pipeline.param.value.source.custom' }),
                    }}
                  >{record.source}</ProDescriptions.Item>
                </ProDescriptions>
                <ProDescriptions column={1}>
                  <ProDescriptions.Item style={{ padding: 2 }} valueType='textarea' label={intl.formatMessage({ id: 'tekton.pipeline.param.description' })}>{record.description}</ProDescriptions.Item>
                  <ProDescriptions.Item style={{ padding: 2 }} label={intl.formatMessage({ id: 'tekton.pipeline.param.default' })}>{defaultFunc(record, 'default')}</ProDescriptions.Item>
                  <ProDescriptions.Item style={{ padding: 2 }} label={intl.formatMessage({ id: 'tekton.task.params.value' })}>{defaultFunc(record, 'value')}</ProDescriptions.Item>
                </ProDescriptions>
              </>
            )
          } else {
            return null
          }
        }
      },

    ];
    if (data?.action !== 'detail') {
      nodes.push(
        {
          title: <FormattedMessage id="pages.operation" />,
          key: 'action',
          valueType: 'option',
          render: (_, record: PipelineTaskParam) => {
            const nodes = [
              <a
                key="edit"
                onClick={() => {
                  let newRecord = { ...record }
                  if (newRecord.type !== 'string') {
                    if (newRecord.value) {
                      newRecord.value = JSON.stringify(newRecord.value)
                    }
                  }
                  setParamSelected(newRecord);
                  setParamVisible(true)
                }}
              >
                <EditOutlined />
              </a>,
            ];
            return nodes;
          },
        })
    }
    return nodes
  }
  const whenColumns = (): ProColumns<WhenExpression>[] => {
    let nodes = [] as ProColumns[];
    nodes = [
      {
        title: intl.formatMessage({ id: 'tekton.pipeline.task.when.input' }),
        search: false,
        dataIndex: 'input',
      },
      {
        title: intl.formatMessage({ id: 'tekton.pipeline.task.when.operator' }),
        search: false,
        dataIndex: 'operator',
        valueEnum: {
          'in': {
            text: intl.formatMessage({ id: 'tekton.pipeline.task.when.operator.In' })
          },
          'notin': {
            text: intl.formatMessage({ id: 'tekton.pipeline.task.when.operator.NotIn' })
          },
        }
      },
      {
        title: intl.formatMessage({ id: 'tekton.pipeline.task.when.values' }),
        search: false,
        render: (_, record: WhenExpression) => {
          if (record.values && record.values.length > 0) {
            return JSON.stringify(record.values)
          } else {
            return '-'
          }
        },
      },

    ]
    if (data?.action !== 'detail') {
      nodes.push({
        title: <FormattedMessage id="pages.operation" />,
        key: 'action',
        valueType: 'option',
        render: (_, record: WhenExpression) => {
          const nodes = [
            <a
              key="edit"
              onClick={() => {
                const newRecord = { ...record }
                if (newRecord.input.startsWith('$(params.')) {
                  newRecord.source = 'pipelineParam'
                  newRecord.valueKey = getParamInfo(newRecord.input)
                } else if (newRecord.input.startsWith('$(tasks.')) {
                  newRecord.source = 'taskResult'
                  const m = getResultInfo(newRecord.input);
                  newRecord.taskName = m.task
                  newRecord.valueKey = `${intl.formatMessage({ id: 'tekton.task' })}: ${m.task} ${intl.formatMessage({ id: 'tekton.pipeline.param.value.source.taskResult.name' })}: ${m.param}`
                }
                if (newRecord.values && newRecord.values.length > 0) {
                  newRecord.values = JSON.stringify(newRecord.values);
                }
                setSelectedWhenExpression(newRecord)
                setWhenFormVisiable(true)
              }}
            >
              <EditOutlined />
            </a>,
            <Popconfirm
              key='delete'
              description={intl.formatMessage({ id: 'tekton.pipeline.task.when.expression.delete.description' })}
              title={
                intl.formatMessage({
                  id: 'pages.operation.delete.description',
                }) +
                intl.formatMessage({ id: 'tekton.pipeline.task.when.expressions.item' }) +
                '【' +
                record.input +
                '】'
              }
              onConfirm={() => {
                const newExpressions = (taskDef?.when || []).filter(item => item.input !== record.input);
                const newTaskDef = { ...taskDef, when: newExpressions }
                setTaskDef(newTaskDef);
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
    return nodes
  }
  const taskSteps = (): ThoughtChainProps['items'] => {
    let steps = [] as ThoughtChainProps['items'];
    if (steps && task.spec?.steps) {
      for (let i = 0; i < task.spec?.steps?.length; i++) {
        const step = task.spec?.steps[i];
        steps.push({
          key: step.name,
          title: step.name,
          status: 'success',
          description: <><FormattedMessage id='cluster.workload.container.image' />:&nbsp;{step.image}</>,
          content: (<>
            <ProDescriptions column={1}>
              {step.workingDir && <ProDescriptions.Item valueType='text' label={intl.formatMessage({ id: 'tekton.task.steps.workingDir' })}>
                {step.workingDir}
              </ProDescriptions.Item>}
              {step.args && <ProDescriptions.Item valueType='code' label={intl.formatMessage({ id: 'tekton.task.steps.args' })}>
                {step.args.join('\n')}
              </ProDescriptions.Item>}
              {step.script && <ProDescriptions.Item valueType='code' label={intl.formatMessage({ id: 'tekton.task.steps.script' })}>
                {step.script}
              </ProDescriptions.Item>}
            </ProDescriptions>
          </>),
        })
      }
    }

    return steps
  }
  const getTaskDetail = () => {
    setViewVisiable(true);
    let params = data.getParams(data.id);
    let info = {} as PipelineTaskDef
    info.description = data.description || '';
    info.displayName = data.displayName || '';
    info.name = data.id;
    info.runAfter = data.runAfter || [];
    info.taskRef = { name: taskRef }
    info.retries = data.retries || 0;
    info.timeout = data.timeout || '';
    info.params = [] as Array<{ name: string; value: any; }>;
    if (params.params && params.params.length) {
      if (!info.params) {
        info.params = [];
      }
      for (let i = 0; i < params.params.length; i++) {
        const p = params.params[i];
        info.params.push({ name: p.name, value: p.value });
      }
    }
    if (params.when) {
      info.when = params.when;
    }
    if (params.workspaces && params.workspaces.length) {
      info.workspaces = params.workspaces;
    }
    setTaskDef(info);
    setTaskParams(params);
    let paramMap = {} as Record<string, PipelineTaskParam>
    if (params.params && params.params.length) {
      for (let i = 0; i < params.params.length; i++) {
        let item = params.params[i];
        if (pipelienParamMap[item.name]) {
          item.type = pipelienParamMap[item.name].type
          item.description = pipelienParamMap[item.name].description
        }
        if (typeof item.value === 'string') {
          if (item.value.startsWith('$(params.')) {
            item.source = 'pipelineParam'
            item.valueKey = getParamInfo(item.value)
          } else if (item.value.startsWith('$(tasks.')) {
            item.source = 'taskResult'
            const m = getResultInfo(item.value);
            item.taskName = m.task
            item.valueKey = m.param
          } else {
            item.source = 'custom'
          }
        } else {
          item.source = 'custom'
        }
        paramMap[item.name] = item
      }
    }
    let newParamMap = {} as Record<string, PipelineTaskParam>
    for (const [pKey, pValue] of Object.entries(pipelienParamMap)) {
      if (Object.keys(paramMap).includes(pKey)) {
        newParamMap[pKey] = { ...paramMap[pKey], description: pValue.description, type: pValue.type, default: pValue.default }
      } else {
        newParamMap[pKey] = pValue
      }
    }
    setTaskParamMap(newParamMap)
  }
  return (
    <div
      className='task-node'
      style={{ display: 'flex', flexDirection: 'column', height: '60px', width: '160px', padding: '5px' }}
      key={task.metadata?.name}
    >
      <Handle type="source" isConnectable={true} position={sourcePosition} className='react-flow-small-handle' />
      <Handle type="target" isConnectable={true} position={targetPosition} className='react-flow-small-handle' />
      {/* 标题区域 */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
      }}>
        <div>
          <img src='/pipeline/task.svg' alt="logo"
            style={{ width: 20, height: 20, objectFit: 'contain' }}
          />{data?.id || taskRef}
        </div>
        {data.action === 'detail' && <UnorderedListOutlined style={{ color: colorPrimary, fontSize: 12 }} onClick={getTaskDetail} />}
        {data.action !== 'detail' && <EditOutlined style={{ color: colorPrimary, fontSize: 12 }} onClick={getTaskDetail} />}
      </div>

      {/* 描述区域：可点击跳转 */}
      <div style={{ flex: 1 }}>
        <div style={{ flex: 1, cursor: 'pointer', textAlign: 'left' }}  >
          {displayName && <>
            {displayName !== taskRef && <>
              {intl.formatMessage({ id: 'tekton.task' })}:&nbsp;{taskRef}&nbsp;<Tooltip color={colorPrimary} title={displayName}><QuestionCircleOutlined />
              </Tooltip></>}
            {displayName === taskRef && <div >
              {intl.formatMessage({ id: 'tekton.task' })}:&nbsp;{taskRef}
            </div>}
          </>}
        </div>
      </div>
      {/* 底部信息：固定在离底部 10px 处 */}

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
      }}>
        <Space size='small'>
          <div><img width={8} height={8} src='/pipeline/steps.svg' />:&nbsp;{task.spec?.steps?.length || 0} </div>
          {data?.when && data.when > 0 && <span>{`${intl.formatMessage({ id: 'tekton.pipeline.task.when.expressions' })}: ${data.when}`}</span>}
        </Space>
      </div>
      <Drawer
        title={<>{intl.formatMessage({ id: 'tekton.pipeline.task.info' }) + ": " + task.metadata?.name}&nbsp;&nbsp;<ReloadOutlined style={{ color: getColorPrimary() }} onClick={getTaskDetail} /></>}
        size={drawerSize}
        resizable={{
          onResize: (newSize) => setDrawerSize(newSize),
        }}
        destroyOnHidden={true}
        open={viewVisiable}
        onClose={() => setViewVisiable(false)}
        closable={true}
      >
        <Tabs
          items={[
            {
              key: 'baseinfo',
              label: intl.formatMessage({ id: 'tekton.pipeline.base' }),
              children: <>
                {data.action !== 'detail' && <>
                  <ProDescriptions column={2} style={{ marginBottom: 16 }} >
                    <ProDescriptions.Item label={intl.formatMessage({ id: 'tekton.pipeline.task.steps.name' })}> {data.id}</ProDescriptions.Item>
                    <ProDescriptions.Item label={intl.formatMessage({ id: 'tekton.pipeline.task.name' })}> {task.metadata?.name!}</ProDescriptions.Item>
                  </ProDescriptions>
                  <Row gutter={16}>
                    <Col span={24}>
                      <ProFormText
                        name="displayName"
                        label={intl.formatMessage({ id: 'tekton.pipeline.task.displayName' })}
                        fieldProps={{
                          defaultValue: data.displayName,
                          onChange: (e) => {
                            const value = e.target.value;
                          }
                        }}
                        rules={[
                          {
                            max: 255,
                            message: intl.formatMessage({ id: 'pages.input.text.max.length' }, { max: 255 }),
                          },
                          {
                            required: true,
                            message:
                              intl.formatMessage({ id: 'pages.input.text.tips' }) +
                              intl.formatMessage({ id: 'tekton.pipeline.task.displayName' }),
                          },
                        ]}
                      />
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col lg={12} md={12} sm={12}   >
                      <ProFormDigit
                        name="retries"
                        label={intl.formatMessage({ id: 'tekton.pipeline.task.retries' })}
                        fieldProps={{
                          defaultValue: data.retries,
                          onChange: (e) => {
                            setTaskDef({ ...taskDef!, retries: e } as PipelineTaskDef);
                          }
                        }}
                      />

                    </Col>
                    <Col lg={12} md={12} sm={12}  >
                      <ProFormText
                        name="timeout"
                        label={intl.formatMessage({ id: 'tekton.pipelinerun.timeout' })}
                        fieldProps={{
                          defaultValue: data.timeout || '',
                          onChange: (e) => {
                            setTaskDef({ ...taskDef!, timeout: e.target.value } as PipelineTaskDef);
                          }
                        }}
                        rules={[
                          {
                            message: intl.formatMessage({ id: 'tekton.pipeline.timeout.format.invalid' }),
                            pattern: /^(?:[1-9]\d*[smh]?)?$/,
                          },
                        ]}
                        placeholder={intl.formatMessage({ id: 'tekton.pipeline.timeout.format.placeholder' })}
                      />
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={24}>
                      <ProFormTextArea
                        name="description"
                        label={intl.formatMessage({ id: 'tekton.pipeline.task.description' })}
                        fieldProps={{
                          defaultValue: data.description,
                          onChange: (e) => {
                            setTaskDef({ ...taskDef!, description: e.target.value } as PipelineTaskDef);
                          }
                        }}
                        rules={[{
                          max: 255,
                          message: intl.formatMessage({ id: 'pages.input.text.max.length' }, { max: 255 }),
                        },]}
                      />
                    </Col>
                  </Row>
                </>}
                {data.action === 'detail' && <>
                  <ProDescriptions column={2} style={{ marginBottom: 16 }} >
                    <ProDescriptions.Item label={intl.formatMessage({ id: 'tekton.pipeline.task.steps.name' })}> {task.metadata?.name!}</ProDescriptions.Item>
                    <ProDescriptions.Item copyable label={intl.formatMessage({ id: 'tekton.pipeline.task.name' })}> {taskRef}</ProDescriptions.Item>
                    {data.retries && <ProDescriptions.Item label={intl.formatMessage({ id: 'tekton.pipeline.task.retries' })}> {data.retries}</ProDescriptions.Item>}
                    {data.timeout && <ProDescriptions.Item label={intl.formatMessage({ id: 'tekton.pipeline.task.timeout' })}> {data.timeout}</ProDescriptions.Item>}
                  </ProDescriptions>
                  <ProDescriptions column={1} style={{ marginBottom: 16 }}>
                    {task.spec?.displayName && <ProDescriptions.Item valueType='textarea' label={intl.formatMessage({ id: 'tekton.pipeline.task.displayName' })}> {task.spec?.displayName}</ProDescriptions.Item>}
                    {task.spec?.description && <ProDescriptions.Item valueType='textarea' label={intl.formatMessage({ id: 'tekton.pipeline.task.description' })}> {task.spec?.description}</ProDescriptions.Item>}
                  </ProDescriptions>
                  <Divider />
                  <Descriptions title={intl.formatMessage({ id: 'tekton.task.steps' })} />
                  <ThoughtChain items={taskSteps()} />
                </>}
              </>
            },
            {
              key: 'params',
              label: intl.formatMessage({ id: 'tekton.task.params' }),
              children: <>
                <ProTable<PipelineTaskParam>
                  locale={{
                    emptyText: intl.formatMessage({ id: 'pages.not.found.data' }),
                  }}
                  columns={paramsColumns()}
                  rowKey="name"
                  dataSource={Object.values(taskParamMap)}
                  search={false}
                  options={false}
                />
              </>
            },
            {
              key: 'whenExpressions',
              label: intl.formatMessage({ id: 'tekton.pipeline.task.when.expressions' }),
              children: <>
                <ProTable<WhenExpression>
                  locale={{
                    emptyText: intl.formatMessage({ id: 'pages.not.found.data' }),
                  }}
                  columns={whenColumns()}
                  rowKey="input"
                  dataSource={taskParams?.when || []}
                  search={false}
                  options={false}
                  toolBarRender={() => {
                    if (data.action === 'detail') {
                      return null;
                    } else {
                      return [
                        <Button
                          type="primary"
                          key="when-create"
                          onClick={() => {
                            setSelectedWhenExpression(undefined)
                            setWhenFormVisiable(true)
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
                <ProTable<WorkspaceDeclaration>
                  locale={{
                    emptyText: intl.formatMessage({ id: 'pages.not.found.data' }),
                  }}
                  columns={workspaceColumns()}
                  rowKey="name"
                  dataSource={task.spec?.workspaces || []}
                  search={false}
                  options={false}
                />
              </>
            },
            {
              key: 'results',
              label: intl.formatMessage({ id: 'tekton.task.results' }),
              children: <>
                <ProTable<TaskResult>
                  locale={{
                    emptyText: intl.formatMessage({ id: 'pages.not.found.data' }),
                  }}
                  columns={resultColumns()}
                  rowKey="name"
                  dataSource={task.spec?.results || []}
                  search={false}
                  options={false}
                />
              </>
            }
          ]}
        />
      </Drawer>
      <ModalForm
        title={intl.formatMessage({ id: 'tekton.pipeline.task.params.setting' })}
        width="40vw"
        zIndex={1001}
        key={paramSelected?.name}
        open={paramVisible}
        initialValues={paramSelected}
        clearOnDestroy={true}
        onOpenChange={setParamVisible}
        onFinish={async (values: Record<string, any>) => {
          let needUpdate = false;
          let updateValue: any;
          if (paramSelected?.type !== 'string') {
            if (paramSelected?.value !== values['value'] && paramSelected?.default !== values['value']) {
              try {
                updateValue = JSON.parse(values['value'])
                // 值被修改，更新数据
                needUpdate = true;
              } catch (error) {
                message.error(intl.formatMessage({ id: 'tekton.task.params.value.format.invalid' }))
              }
            }
          } else {
            if (values['source'] === 'custom') {
              values['value'] = values['value'].trim();
              if (paramSelected?.value !== values['value'] && paramSelected?.default !== values['value']) {
                // 值被修改，更新数据
                needUpdate = true;
                updateValue = values['value'];
              }
            } else if (values['source'] === 'pipelineParam') {
              updateValue = `$(params.${values['valueKey']})`;
              if (paramSelected?.value !== updateValue) {
                // 值被修改，更新数据
                needUpdate = true;
              }
            } else if (values['source'] === 'taskResult') {
              updateValue = `$(tasks.${paramSelected?.taskName || ''}.results.${values['valueKey']})`;
              if (paramSelected?.value !== updateValue) {
                // 值被修改，更新数据
                needUpdate = true;
              }
            }
          }
          if (needUpdate && taskDef) {
            let newParams = taskDef.params || [];
            let found = false;
            for (let i = 0; i < newParams.length; i++) {
              const p = newParams[i];
              if (p.name === paramSelected?.name) {
                newParams[i] = { ...p, value: updateValue };
                found = true;
                break;
              }
            }
            if (!found) {
              newParams.push({ name: paramSelected!.name, value: updateValue });
            }
            setTaskDef({ ...taskDef, params: newParams } as PipelineTaskDef);
          }
          setParamVisible(false)
          setParamSelected(undefined)
        }}
        modalProps={{ maskClosable: true, destroyOnHidden: true, forceRender: true }}
      >
        <ProDescriptions column={1} style={{ marginBottom: 16 }}>
          <ProDescriptions.Item label={intl.formatMessage({ id: 'tekton.task.params.name' })}>{paramSelected?.name}</ProDescriptions.Item>
          <ProDescriptions.Item label={intl.formatMessage({ id: 'tekton.pipeline.param.type' })}
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
          >{paramSelected?.type}</ProDescriptions.Item>
          <ProDescriptions.Item valueType='textarea' label={intl.formatMessage({ id: 'tekton.task.params.description' })}>{paramSelected?.description}</ProDescriptions.Item>
          <ProDescriptions.Item label={intl.formatMessage({ id: 'tekton.task.params.default' })}>{defaultFunc(paramSelected!, 'default')}</ProDescriptions.Item>
        </ProDescriptions>
        {paramSelected?.type === 'string' && <><ProFormSelect
          name='source'
          label={intl.formatMessage({ id: 'tekton.pipeline.param.value.source' })}
          options={paramSelectOptions(true)}

        />
          <ProFormDependency name={['source']}>
            {({ source }) => {
              if (source === 'custom') {
                return <ProFormText
                  name="value"
                  label={intl.formatMessage({ id: 'tekton.pipeline.param.value' })}

                />;
              } else if (source === 'pipelineParam') {
                return <ProFormSelect
                  key='pipelineParam'
                  name="valueKey"
                  label={intl.formatMessage({ id: 'tekton.pipeline.param.value.source.pipelineParam.name' })}
                  options={getCanSelectParams(paramSelected?.type!)}
                  rules={[
                    {
                      required: true,
                      message:
                        intl.formatMessage({ id: 'pages.select.text.tips' }) +
                        intl.formatMessage({ id: 'tekton.pipeline.param.value.source.pipelineParam.name' }),
                    },
                  ]}
                />;
              } else if (source === 'taskResult') {
                return <ProFormSelect
                  key='taskResult'
                  name="valueKey"
                  label={intl.formatMessage({ id: 'tekton.pipeline.param.value.source.taskResult.name' })}
                  options={getPreTaskResult()}
                  rules={[
                    {
                      required: true,
                      message:
                        intl.formatMessage({ id: 'pages.select.text.tips' }) +
                        intl.formatMessage({ id: 'tekton.pipeline.param.value.source.taskResult.name' }),
                    },
                  ]}
                />;
              }
              return null;
            }}
          </ProFormDependency></>}
        {paramSelected?.type !== 'string' && <>
          <ProFormTextArea
            name="value"
            label={intl.formatMessage({ id: 'tekton.pipeline.param.value' })}
          />
        </>}
      </ModalForm>
      <ModalForm
        title={intl.formatMessage({ id: 'tekton.pipeline.task.workspace.setting' })}
        width="40vw"
        zIndex={1001}
        key={workspaceSelected?.name}
        open={workspaceVisible}
        initialValues={(taskDef?.workspaces || []).find(item => item.name === workspaceSelected?.name) as WorkspacePipelineTaskBinding}
        clearOnDestroy={true}
        onOpenChange={setWorkspaceVisible}
        onFinish={async (values: Record<string, any>) => {
          if (taskDef) {
            let newWorkspaces = taskDef.workspaces || [];
            let found = false;
            for (let i = 0; i < newWorkspaces.length; i++) {
              const ws = newWorkspaces[i];
              if (ws.name === workspaceSelected?.name) {
                newWorkspaces[i] = { ...ws, workspace: values['workspace'] };
                if (values['subPath']) {
                  newWorkspaces[i].subPath = values['subPath'];
                }
                found = true;
                break;
              }
            }
            if (!found) {
              let newWs = { name: workspaceSelected!.name, workspace: values['workspace'] } as WorkspacePipelineTaskBinding;
              if (values['subPath']) {
                newWs.subPath = values['subPath'];
              }
              newWorkspaces.push();
            }
            setTaskDef({ ...taskDef, workspaces: newWorkspaces } as PipelineTaskDef);
          }
          setWorkspaceVisible(false)
          setWorkspaceSelected(undefined)
          return true;
        }}
        modalProps={{ maskClosable: true, destroyOnHidden: true, forceRender: true }}
      >
        {workspaceSelected && <>
          <ProDescriptions column={1}>
            <ProDescriptions.Item style={{ padding: 2 }} label={intl.formatMessage({ id: 'tekton.task.workspaces.name' })}>{workspaceSelected.name}</ProDescriptions.Item>
            <ProDescriptions.Item style={{ padding: 2 }} label={intl.formatMessage({ id: 'tekton.task.workspaces.description' })}>{workspaceSelected.description}</ProDescriptions.Item>
          </ProDescriptions>
          <ProDescriptions column={2}>
            <ProDescriptions.Item style={{ padding: 2 }} label={intl.formatMessage({ id: 'tekton.task.workspaces.readOnly' })}
              valueEnum={{
                false: {
                  text: <FormattedMessage id="model.false" />,
                  status: 'Error',
                },
                true: {
                  text: <FormattedMessage id="model.true" />,
                  status: 'Success',
                },
              }}>{workspaceSelected.readOnly}</ProDescriptions.Item>
            <ProDescriptions.Item style={{ padding: 2 }} label={intl.formatMessage({ id: 'tekton.task.workspaces.optional' })}
              valueEnum={{
                false: {
                  text: <FormattedMessage id="model.false" />,
                  status: 'Error',
                },
                true: {
                  text: <FormattedMessage id="model.true" />,
                  status: 'Success',
                },
              }}
            >{workspaceSelected.optional}</ProDescriptions.Item>
          </ProDescriptions>
          <ProFormSelect
            name='workspace'
            label={intl.formatMessage({ id: 'tekton.task.workspaces.relation' })}
            options={getCanSelectWorkspaces()}
            rules={[{
              required: true,
              message:
                intl.formatMessage({ id: 'pages.select.text.tips' }) +
                intl.formatMessage({ id: 'tekton.task.workspaces.relation' }),
            },]}
          />
          <ProFormText
            name="subPath"
            label={intl.formatMessage({ id: 'tekton.task.workspaces.subPath' })}
          />
        </>}
      </ModalForm>
      <ModalForm
        title={intl.formatMessage({ id: 'tekton.pipeline.task.when.expression.setting' })}
        width="40vw"
        zIndex={1100}
        key={selectedWhenExpression?.input}
        open={whenFormVisiable}
        initialValues={selectedWhenExpression}
        clearOnDestroy={true}
        onOpenChange={setWhenFormVisiable}
        onFinish={async (values: Record<string, any>) => {
          if (values['source'] === 'pipelineParam') {
            values['input'] = `$(params.${values['valueKey']})`;
          } else if (values['source'] === 'taskResult') {
            values['input'] = `$(tasks.${values['valueKey']})`;
          }
          values['values'] = JSON.parse(values['values']);
          if (taskDef) {
            let newWhen = taskDef.when || [];
            let found = false;
            for (let i = 0; i < newWhen.length; i++) {
              const w = newWhen[i];
              if (w.input === selectedWhenExpression?.input) {
                newWhen[i] = { ...w, input: values['input'], operator: values['operator'], values: values['values'] };
                found = true;
                break;
              }
            }
            if (!found) {
              newWhen.push({ input: values['input'], operator: values['operator'], values: values['values'] });
            }
            setTaskDef({ ...taskDef, when: newWhen } as PipelineTaskDef);
          }

          setWhenFormVisiable(false)
          setSelectedWhenExpression(undefined)
          return true;
        }}
        modalProps={{ maskClosable: true, destroyOnHidden: true, forceRender: true }}
      >
        <ProFormSelect
          name='source'
          label={intl.formatMessage({ id: 'tekton.pipeline.param.value.source' })}
          options={paramSelectOptions(false)}
          rules={[
            {
              required: true,
              message:
                intl.formatMessage({ id: 'pages.select.text.tips' }) +
                intl.formatMessage({ id: 'tekton.pipeline.param.value.source' }),
            },
          ]}
        />
        <ProFormDependency name={['source']}>
          {({ source }) => {
            if (source === 'pipelineParam') {
              return <ProFormSelect
                key='pipelineParam'
                name="valueKey"
                label={intl.formatMessage({ id: 'tekton.pipeline.param.value.source.pipelineParam.name' })}
                options={getCanSelectParams('')}
                rules={[
                  {
                    required: true,
                    message:
                      intl.formatMessage({ id: 'pages.select.text.tips' }) +
                      intl.formatMessage({ id: 'tekton.pipeline.param.value.source.pipelineParam.name' }),
                  },
                ]}
              />;
            } else if (source === 'taskResult') {
              return <ProFormSelect
                key='taskResult'
                name="valueKey"
                label={intl.formatMessage({ id: 'tekton.pipeline.param.value.source.taskResult.name' })}
                options={getPreTaskResult()}
                rules={[
                  {
                    required: true,
                    message:
                      intl.formatMessage({ id: 'pages.select.text.tips' }) +
                      intl.formatMessage({ id: 'tekton.pipeline.param.value.source.taskResult.name' }),
                  },
                ]}
              />;
            }
            return null;
          }}
        </ProFormDependency>
        <ProFormSelect
          name='operator'
          label={intl.formatMessage({ id: 'tekton.pipeline.task.when.operator' })}
          options={[
            {
              label: intl.formatMessage({ id: 'tekton.pipeline.task.when.operator.In' }),
              value: 'in',
            },

            {
              label: intl.formatMessage({ id: 'tekton.pipeline.task.when.operator.NotIn' }),
              value: 'notin',
            },
          ]}
          rules={[
            {
              required: true,
              message:
                intl.formatMessage({ id: 'pages.select.text.tips' }) +
                intl.formatMessage({ id: 'tekton.pipeline.task.when.operator' }),
            },
          ]}
        />
        <ProFormTextArea
          name='values'
          label={intl.formatMessage({ id: 'tekton.pipeline.task.when.values' })}
          placeholder={intl.formatMessage({ id: 'tekton.pipeline.param.type.array.placeholder' })}
          rules={[
            {
              required: true,
              message:
                intl.formatMessage({ id: 'pages.input.text.tips' }) +
                intl.formatMessage({ id: 'tekton.pipeline.task.when.values' }),
            },
          ]}
        />
      </ModalForm>
    </div >
  );
}

export default memo(TaskNode);

import { Task } from "@/k8s-models/tekton/pipeline/tekton.dev/v1";
import { getHeight } from "@/utils/global";
import { Editor } from "@monaco-editor/react";
import {
  FormattedMessage,
  useIntl,
} from '@umijs/max';
import { Descriptions, message, Tabs, Typography } from "antd";
import { TabsProps } from "antd/lib";
import { useState } from "react";
import * as yaml from 'js-yaml';
import { ThoughtChain } from "@ant-design/x";
import type { ThoughtChainProps } from '@ant-design/x';
import { ProColumns, ProDescriptions, ProTable } from "@ant-design/pro-components";
const { Paragraph, Text } = Typography;

export type TektonTaskProps = {
  task: Task;
};
export const TektonTaskDetail: React.FC<TektonTaskProps> = (props) => {
  const [activeKey, setActiveKey] = useState<string>('human');
  const intl = useIntl();
  const taskSteps = (): ThoughtChainProps['items'] => {
    let steps = [] as ThoughtChainProps['items'];
    if (steps && props.task.spec?.steps) {
      for (let i = 0; i < props.task.spec?.steps?.length; i++) {
        const step = props.task.spec?.steps[i];
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
  const paramColumns: ProColumns<any>[] = [
    {
      title: <FormattedMessage id="tekton.task.params.name" />,
      dataIndex: 'name',
    },
    {
      title: <FormattedMessage id="tekton.task.params.type" />,
      dataIndex: 'type',
    },
    {
      title: <FormattedMessage id="tekton.task.params.default" />,
      dataIndex: 'default',
      render: (dom, entity) => {
        if (entity?.type === 'string') {
          return entity?.default;
        } else {
          if (entity?.default) {
            try {
              return JSON.stringify(entity?.default || {})
            } catch (error) {
              return '-'
            }
          }
          return '-'
        }
      }
    },

    {
      title: <FormattedMessage id="tekton.task.params.description" />,
      dataIndex: 'description',
    },

  ];
  const resultColumns: ProColumns<any>[] = [
    {
      title: <FormattedMessage id="tekton.task.results.name" />,
      dataIndex: 'name',
    },
    {
      title: <FormattedMessage id="tekton.task.params.type" />,
      dataIndex: 'type',
    },

    {
      title: <FormattedMessage id="tekton.task.params.description" />,
      dataIndex: 'description',
    },
  ];
  const workspaceColumns: ProColumns<any>[] = [
    {
      title: <FormattedMessage id="tekton.task.workspaces.name" />,
      dataIndex: 'name',
    },
    {
      title: <FormattedMessage id="tekton.task.workspaces.name" />,
      dataIndex: 'mountPath',
    },
    {
      title: <FormattedMessage id="tekton.task.workspaces.readOnly" />,
      dataIndex: 'readOnly',
    },
    {
      title: <FormattedMessage id="tekton.task.workspaces.description" />,
      dataIndex: 'description',
    },
  ];
  const items: TabsProps['items'] = [
    {
      label: intl.formatMessage({ id: 'model.detail' }),
      key: 'human',
      children: <div
        style={{ height: '70vh', overflowY: 'auto' }}
      >
        <Typography>
          {props.task.spec?.displayName && <>
            <Descriptions key='params' title={intl.formatMessage({ id: 'tekton.task.displayName' })} />
            <Paragraph>{props.task.spec?.displayName}</Paragraph>
          </>}
          {props.task.spec?.description && <>
            <Descriptions key='params' title={intl.formatMessage({ id: 'tekton.task.description' })} />
            <Paragraph>{props.task.spec?.description}</Paragraph>
          </>}
        </Typography>
        {props.task.spec?.params && <> <Descriptions key='params' title={intl.formatMessage({ id: 'tekton.task.params' })} />
          <ProTable
            size='small'
            key='params'
            rowKey="name"
            dataSource={props.task.spec?.params}
            columns={paramColumns}
            search={false}
            options={false}
            pagination={false}
            style={{ marginBottom: '5px' }}
          />
        </>}
        {props.task.spec?.results && <><Descriptions key='results' title={intl.formatMessage({ id: 'tekton.task.results' })} />
          <ProTable
            key='results'
            rowKey="name"
            dataSource={props.task.spec?.results}
            columns={resultColumns}
            search={false}
            options={false}
            pagination={false}
            style={{ marginBottom: '5px' }}
          /></>}
        {props.task.spec?.workspaces && <> <Descriptions key='workspaces' title={intl.formatMessage({ id: 'tekton.task.workspaces' })} />
          <ProTable
            key='workspaces'
            rowKey="name"
            dataSource={props.task.spec?.workspaces}
            columns={workspaceColumns}
            search={false}
            options={false}
            pagination={false}
            style={{ marginBottom: '5px' }}
          />
        </>}
        <Descriptions title={intl.formatMessage({ id: 'tekton.task.steps' })} />
        <ThoughtChain items={taskSteps()} />

      </div>,
    },
    {
      label: intl.formatMessage({ id: 'cluster.view.yaml' }),
      key: 'yaml',
      children: <><Editor
        key='yaml'
        language='yaml'
        options={{
          readOnly: true,
          tabSize: 2,
          insertSpaces: true,
        }}
        height='70vh'
        theme="vs-dark"
        defaultValue={yaml.dump(props.task)}
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
      /></>,
    },
  ];

  return (<>
    <Tabs
      activeKey={activeKey}
      items={items}
      onChange={(key) => setActiveKey(key)}
    />
  </>)

}
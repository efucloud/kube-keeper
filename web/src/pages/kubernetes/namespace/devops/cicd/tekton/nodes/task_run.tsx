import { TaskRun } from '@/k8s-models/tekton/pipeline/tekton.dev/v1';
import { getColorPrimary, getCurrentUTCTimeString, getExecutionTimeDetailed } from '@/utils/global';
import { ClockCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useIntl } from '@umijs/max';
import { Handle, Position } from '@xyflow/react';
import { Space, Tooltip } from 'antd';
import { memo, useEffect, useState, useRef } from 'react';

export interface TaskRunProps {
  layoutDirection: 'horizontal' | 'vertical';
  description?: string;
  displayName?: string;
  resourceVersion: string;
  id: string;
  taskRef: string;
  taskRun?: TaskRun;
  stepsNumber: number;
  nodeSelected: (nodeId: string) => void;
}

function TaskRunNode({ data }: { data: TaskRunProps }) {
  const colorPrimary = getColorPrimary();
  const direction = data?.layoutDirection || 'horizontal';
  const sourcePosition = direction === 'horizontal' ? Position.Right : Position.Bottom;
  const targetPosition = direction === 'horizontal' ? Position.Left : Position.Top;
  const intl = useIntl();
  const [execDuration, setExecDuration] = useState<string>('');
  const [taskStatus, setTaskStatus] = useState<string>('');

  // 使用 ref 保存最新 taskRun 数据，避免闭包问题
  const taskRunRef = useRef<TaskRun | undefined>(data?.taskRun);
  taskRunRef.current = data?.taskRun;

  useEffect(() => {
    if (!data?.taskRun) return;

    let intervalId: NodeJS.Timeout | null = null;

    const updateDuration = () => {
      const taskRun = taskRunRef.current;
      if (!taskRun?.metadata?.creationTimestamp) {
        setExecDuration('');
        return;
      }

      let endTime: string;
      if (taskRun.status?.completionTime) {
        // 已完成：固定耗时
        endTime = taskRun.status.completionTime;
        if (intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
      } else {
        // 运行中：使用当前时间
        endTime = getCurrentUTCTimeString();
      }

      const duration = getExecutionTimeDetailed(taskRun.metadata.creationTimestamp, endTime);
      setExecDuration(duration);
    };

    // 初始计算
    updateDuration();

    // 如果任务未完成，启动定时器
    if (!data.taskRun.status?.completionTime) {
      intervalId = setInterval(updateDuration, 1000);
    }

    // 清理函数
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [data?.taskRun?.metadata?.creationTimestamp, data?.taskRun?.status?.completionTime]);

  // 单独处理 taskStatus（不需要定时更新）
  useEffect(() => {
    if (data?.taskRun?.status?.conditions) {
      const condition = data.taskRun.status.conditions.find((item) => item.type === 'Succeeded');
      if (condition?.reason === 'Running') {
        setTaskStatus('running');
      } else if (condition?.reason === 'Succeeded') {
        setTaskStatus('success');
      } else if (condition?.reason === 'Failed') {
        setTaskStatus('failed');
      } else if (condition?.reason === 'Pending') {
        setTaskStatus('pending');
      } else {
        setTaskStatus('');
      }
    } else {
      setTaskStatus('');
    }
  }, [data?.taskRun?.status?.conditions]);

  return (
    <div
      className={`task-node ${taskStatus ? `node-run-${taskStatus}` : ''}`}
      style={{ display: 'flex', flexDirection: 'column', height: '60px', width: '160px', padding: '5px' }}
      key={data.id}
    >
      <Handle type="source" isConnectable={true} position={sourcePosition} className='react-flow-small-handle' />
      <Handle type="target" isConnectable={true} position={targetPosition} className='react-flow-small-handle' />

      {/* 标题区域 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <div>
          <img src='/pipeline/task.svg' alt="logo" style={{ width: 20, height: 20, objectFit: 'contain' }} />
          {data?.id || data.taskRef}
        </div>
        {execDuration && (
          <div onClick={() => data.nodeSelected(data.id)}>
            <img width={12} height={12} src='/pod.svg' />
          </div>
        )}
      </div>

      {/* 描述区域 */}
      <div style={{ flex: 1 }}>
        <div style={{ flex: 1, cursor: 'pointer', textAlign: 'left' }}>
          {data.displayName && (
            <>
              {data.displayName !== data.taskRef ? (
                <>
                  {intl.formatMessage({ id: 'tekton.task' })}:&nbsp;{data.taskRef}&nbsp;
                  <Tooltip color={colorPrimary} title={data.displayName}>
                    <QuestionCircleOutlined />
                  </Tooltip>
                </>
              ) : (
                <div>{intl.formatMessage({ id: 'tekton.task' })}:&nbsp;{data.taskRef}</div>
              )}
            </>
          )}
        </div>
      </div>

      {/* 底部信息 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Space size='small'>
          <div>
            <img width={8} height={8} src='/pipeline/steps.svg' />:&nbsp;{data.stepsNumber || 0}
          </div>
        </Space>
        {execDuration && (
          <a style={{ display: 'flex', alignItems: 'center' }}>
            <ClockCircleOutlined style={{ fontSize: '7px' }} />&nbsp;:&nbsp;{execDuration}
          </a>
        )}
      </div>
    </div>
  );
}

export default memo(TaskRunNode);
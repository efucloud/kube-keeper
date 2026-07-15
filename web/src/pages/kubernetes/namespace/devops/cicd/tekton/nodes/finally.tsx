
import { FormattedMessage } from '@umijs/max';
import { Handle, Position } from '@xyflow/react';
import { theme, Tooltip } from 'antd';
import Avatar from 'antd/es/avatar/Avatar';
import { memo } from 'react';

function FinallyNode({ data }) {
  const direction = data?.layoutDirection || 'vertical';
  const sourcePosition = direction === 'horizontal' ? Position.Right : Position.Bottom;
  const targetPosition = direction === 'horizontal' ? Position.Left : Position.Top;
  const { token } = theme.useToken();
  const colorPrimary = token.colorPrimary;
  return (
    <Tooltip
      color={colorPrimary}
      title={<FormattedMessage id="tekton.pipeline.finally.tooltip" />}
    >

      <div className='node-circle task-node'>
        <Avatar size={50} style={{
          padding: 3,
          transform: `rotate(${direction === 'horizontal' ? 90 : 0}deg)`,
          transition: 'transform 0.3s ease',
        }} src='/pipeline/finally.svg' />
        <Handle
          type="source"
          position={sourcePosition}
          className='react-flow-small-handle'
        />
        <Handle
          type="target"
          position={targetPosition}
          className='react-flow-small-handle'
        />
      </div>
    </Tooltip>
  );
}

export default memo(FinallyNode);

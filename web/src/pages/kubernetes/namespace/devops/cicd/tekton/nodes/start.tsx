// StartNode.tsx

import { FormattedMessage } from '@umijs/max';
import { Handle, Position } from '@xyflow/react';
import { theme, Tooltip } from 'antd';
import Avatar from 'antd/es/avatar/Avatar';
import { memo } from 'react';

function StartNode({ data }) {
  // 默认 vertical
  const direction = data?.layoutDirection || 'vertical';
   const { token } = theme.useToken();
  const colorPrimary = token.colorPrimary;
  const sourcePosition =
    direction === 'horizontal' ? Position.Right : Position.Bottom;

  return (
    <Tooltip
      color={colorPrimary}
      title={<FormattedMessage id="tekton.pipeline.start.tooltip" />}
    >

      <div className="node-circle task-node">
        <Avatar size={50} src="/pipeline/start.svg" />
        <Handle type="source" position={sourcePosition} className='react-flow-small-handle' />
      </div>
    </Tooltip>
  );
}

export default memo(StartNode);
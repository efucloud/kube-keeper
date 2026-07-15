// StartNode.tsx

import { FormattedMessage } from '@umijs/max';
import { Handle, Position } from '@xyflow/react';
import { theme, Tooltip } from 'antd';
import Avatar from 'antd/es/avatar/Avatar';
import { memo } from 'react';

function StopNode({ data }) {
  // 默认 vertical
  const direction = data?.layoutDirection || 'vertical';
  const targetPosition = direction === 'horizontal' ? Position.Left : Position.Top;
   const { token } = theme.useToken();
  const colorPrimary = token.colorPrimary;
  return (
    <Tooltip
      color={colorPrimary}
      title={<FormattedMessage id="tekton.pipeline.stop.tooltip" />}
    >
      <div className="node-circle task-node">
        <Avatar size={50} src="/pipeline/stop.svg" />
        <Handle type="target" position={targetPosition} className='react-flow-small-handle' />
      </div>
    </Tooltip>
  );
}

export default memo(StopNode);
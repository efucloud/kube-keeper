// StartNode.tsx
import { getColorPrimary } from '@/utils/global';
import { FormattedMessage } from '@umijs/max';
import { Handle, Position } from '@xyflow/react';
import { Tooltip } from 'antd';
import Avatar from 'antd/es/avatar/Avatar';
import { memo } from 'react';

function StartNode({ data }) {
  // 默认 vertical
  const direction = data?.layoutDirection || 'vertical';
  const colorPrimary = getColorPrimary();
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
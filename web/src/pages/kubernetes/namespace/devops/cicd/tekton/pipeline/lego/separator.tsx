// FinallySeparator.tsx
import { useStore } from '@xyflow/react';
import { memo, useMemo } from 'react';
import { useIntl } from '@umijs/max';

const FinallySeparator = () => {
  const { nodes, transform } = useStore((state) => ({
    nodes: state.nodes,
    transform: state.transform,
  }));
  const intl = useIntl()
  const [tx, ty, tScale] = transform;

  const finallyNode = useMemo(() => {
    return nodes.find((node) => node.type === 'finally');
  }, [nodes]);

  if (!finallyNode) {
    return null;
  }

  const { x, y } = finallyNode.position;
  const size = 30;
  const direction = finallyNode.data?.layoutDirection || 'vertical';

  let lineStyle: React.CSSProperties = {
    position: 'absolute',
    pointerEvents: 'none',
    zIndex: 1000,
    backgroundColor: 'rgba(115, 113, 113, 0.88)',
    opacity: 0.5,
  };

  let tipText = '';
  let textStyle: React.CSSProperties | undefined;

  if (direction === 'vertical') {
    // 水平线（垂直布局）
    const lineY = y + size;
    const actualTop = lineY * tScale + ty;

    lineStyle = {
      ...lineStyle,
      left: 0,
      top: `${actualTop}px`,
      width: '100vw',
      height: '1px',

    };

    tipText = intl.formatMessage({ id: 'tekton.pipeline.lego.vertical.drag.description' });
    textStyle = {
      position: 'absolute',
      left: '20px', // 在线右侧
      top: `${actualTop + 10}px`, // 纵向文字高度约 160px，居中对齐
      zIndex: 1001,
      color: 'rgba(115, 113, 113, 0.88)',
      fontSize: '10px',
      opacity: 0.7,
      pointerEvents: 'none',
      textOrientation: 'mixed',
      whiteSpace: 'nowrap',
      lineHeight: 1.4, // 避免文字太挤
    };
  } else {
    // 垂直线（横向布局）
    const lineX = x + size;
    const actualLeft = lineX * tScale + tx;

    lineStyle = {
      ...lineStyle,
      left: `${actualLeft}px`,
      top: 0,
      width: '1px',
      height: '100vh',
    };

    tipText = intl.formatMessage({ id: 'tekton.pipeline.lego.horizontal.drag.description' });
    textStyle = {
      position: 'absolute',
      left: `${actualLeft + 10}px`, // 线右侧 10px
      top: '60px', // 距离顶部 20px，避免被遮挡
      zIndex: 1001,
      color: 'rgba(115, 113, 113, 0.88)',
      fontSize: '10px',
      opacity: 0.7,
      pointerEvents: 'none',
      whiteSpace: 'nowrap',
      writingMode: 'vertical-rl', // 竖排

      // 不需要 writingMode，保持默认横向
    };
  }

  return (
    <>
      <div style={lineStyle} />
      {textStyle && (
        <div style={textStyle}>{tipText}</div>
      )}
    </>
  );
};

export default memo(FinallySeparator);
import React from 'react';
import { Panel, useReactFlow, getNodesBounds, getViewportForBounds } from '@xyflow/react';
import { FormattedMessage, useIntl, useNavigate } from '@umijs/max';
import { Button, Dropdown, message, Space } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { getColorPrimary } from '@/utils/global';
import { toPng } from 'html-to-image';
import { Task } from '@/k8s-models/tekton/pipeline/tekton.dev/v1';

const targetWidth = 1024 * 4;
const targetHeight = 768 * 4;

export interface DnDFlowProps {
  action: string;
  name: string;
  actionCall: (action: string) => void;
  tasks: Task[];
}
const TopRightButton: React.FC<DnDFlowProps> = (props) => {
  const navigate = useNavigate();
  const intl = useIntl();
  const colorPrimary = getColorPrimary();
  const { getNodes } = useReactFlow();
  function downloadImage(dataUrl: string) {
    const a = document.createElement('a');
    a.setAttribute('download', `${props.name}.png`);
    a.setAttribute('href', dataUrl);
    a.click();
  }
  const saveImage = () => {
    const flowViewport = document.querySelector('.react-flow__viewport');
    if (!flowViewport) {
      message.error(intl.formatMessage({ id: 'pages.operation.delete.failed' }));
      return;
    }

    const nodes = getNodes();
    if (nodes.length === 0) {
      message.warning('No nodes to export.');
      return;
    }

    // 1. 获取所有节点的边界，并加 padding
    const padding = 100;
    const nodesBounds = getNodesBounds(nodes);
    const bounds = {
      x: nodesBounds.x - padding,
      y: nodesBounds.y - padding,
      width: nodesBounds.width + padding * 2,
      height: nodesBounds.height + padding * 2,
    };

    // 2. 计算适配到目标图像尺寸的缩放和偏移
    const viewportTransform = getViewportForBounds(
      bounds,
      targetWidth,
      targetHeight,
      0.1, // 允许缩小
      4,   // 允许放大（但通常不需要）
      0    // 不额外加 padding（因为我们自己加了）
    );

    // 3. 导出图像
    toPng(flowViewport, {
      backgroundColor: '#ffffff',
      width: targetWidth,
      height: targetHeight,
      pixelRatio: 2, // 👈 关键！替代 scale，使用 pixelRatio 提升清晰度（html-to-image 推荐方式）
      style: {
        transform: `translate(${viewportTransform.x}px, ${viewportTransform.y}px) scale(${viewportTransform.zoom})`,
        transformOrigin: 'top left',
        width: `${bounds.width}px`,
        height: `${bounds.height}px`,
      },
    })
      .then((dataUrl) => {
        downloadImage(dataUrl);
      })
      .catch((err) => {
        console.error('Export failed', err);
        message.error(intl.formatMessage({ id: 'pages.operation.saveImage.failed' }) || 'Failed to save image');
      });
  };
  const items = (): [] => {
    let nodes = [];
    nodes.push(
      {
        key: 'yaml-view',
        label: <a onClick={() => {
          props.actionCall("yaml-view")
        }}>{intl.formatMessage({ id: 'tekton.pipeline.yaml.view' })}</a>,
      },
      {
        key: 'save-image',
        label: <a onClick={() => { saveImage() }}>{intl.formatMessage({ id: 'pages.operation.saveImage' })}</a>,
      });
    if (props.action !== 'detail') {
      nodes.push(
        {
          key: 'reset',
          label: <a onClick={() => { props.actionCall("reset") }}>{intl.formatMessage({ id: 'tekton.pipeline.edit.reset' })}</a>,
        });
    }
    return nodes
  }
  return (
    <Panel position="top-right">
      <Space>
        <Button onClick={() => { navigate(-1) }}>
          {intl.formatMessage({ id: 'pages.operation.back' })}
        </Button>
        <Button
          onClick={() => { props.actionCall('base') }}>
          {intl.formatMessage({ id: 'pages.detail.baseinfo' })}
        </Button>

        {props.action !== 'detail' && <Button
          disabled={!props.name || props.tasks.length === 0 || props.name === ''}
          onClick={() => { props.actionCall('save') }}
          type='primary'>
          {intl.formatMessage({ id: 'pages.operation.save' })}
        </Button>}
        <Dropdown
          key="more"
          menu={{ items: items() }}
          trigger={['hover']}
          mouseEnterDelay={0.1}
          mouseLeaveDelay={0.15}
        >
          <span
            style={{
              padding: '4px 11px',
              borderRadius: 6,
              cursor: 'pointer',
              border: '1px solid #d9d9d9',
              backgroundColor: 'transparent',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 14,
              color: 'inherit',
              transition: 'background-color 0.3s, border-color 0.3s',
            }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.backgroundColor = '#f5f5f5'; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.backgroundColor = 'transparent'; }}
          >
            <FormattedMessage id="pages.operation.more" />
            <MoreOutlined style={{ color: colorPrimary }} />
          </span>
        </Dropdown>
      </Space>
    </Panel>
  );
}

export default TopRightButton;

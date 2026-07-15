import React, { useState } from 'react';
import { useDnD } from '@/pages/kubernetes/namespace/devops/cicd/tekton/pipeline/lego/DnDContext';
import { Card, Input, Modal, Space, Tooltip } from 'antd';
import { List, Typography } from 'antd';
import { FormattedMessage, useIntl } from '@umijs/max';
import { getColorPrimary } from '@/utils/global';
import { Task } from '@/k8s-models/tekton/pipeline/tekton.dev/v1';
import { UnorderedListOutlined } from '@ant-design/icons';
import { TektonTaskDetail } from '@/pages/kubernetes/components/tekton_task_detail';
const { Paragraph } = Typography;
type SidebarProps = {
  tasks: Task[]
};
const Sidebar: React.FC<SidebarProps> = (props) => {
  const [_, setType] = useDnD();
  const colorPrimary = getColorPrimary();
  const [selectedTask, setSelectedTask] = useState<Task>();
  const [search, setSearch] = useState('');
  const [taskView, setTaskView] = useState<boolean>(false);
  const intl = useIntl();

  const onDragStart = (event: any, nodeType: string) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', nodeType); // 👈 必须加这一行！
  };


  const scrollbarStyle = `
    .sidebar-scroll-container::-webkit-scrollbar {
      width: 8px;
    }
    .sidebar-scroll-container::-webkit-scrollbar-thumb {
      background-color: ${colorPrimary};
      border-radius: 4px;
    }
    .sidebar-scroll-container::-webkit-scrollbar-track {
      background-color: transparent;
    }
    /* Firefox 支持（可选） */
    .sidebar-scroll-container {
      scrollbar-width: thin;
      scrollbar-color: ${colorPrimary} transparent;
    }
  `;
  return (
    <><style>{scrollbarStyle}</style>
      <div style={{
        borderRadius: '8px',
        padding: '5px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column' // 关键：启用 flex 布局
      }}>
        {/* 固定搜索框 */}
        <div style={{ marginBottom: 8 }}>
          <Input.Search
            allowClear
            onSearch={(search) => setSearch(search)}
            placeholder={intl.formatMessage({ id: 'tekton.please.input.task.name' })}
            enterButton
          />
        </div>

        {/* 可滚动的任务列表区域 */}
        <div className="sidebar-scroll-container" style={{
          flex: 1,
          overflowY: 'auto', // 关键：让列表区域可滚动
          minHeight: 0 // 防止 flex 子项溢出容器
        }}>
          <List<Task>
            locale={{
              emptyText: intl.formatMessage({ id: 'pages.not.found.data' })
            }}
            rowKey={(record: Task) => `${record.metadata?.name!}`}
            split={false}
            dataSource={props.tasks.filter(task =>
              !search || task.metadata?.name?.toLowerCase().includes(search.toLowerCase())
            )}
            renderItem={(item) => {
              return (
                <List.Item key={item.metadata?.name} style={{ padding: 6 }}>
                  <Card
                    hoverable
                    style={{ height: '130px', width: '100%', padding: 2 }}
                    styles={{
                      body: {
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        padding: '8px',
                      }
                    }}
                    key={item.metadata?.name}
                    onDragStart={(event) => {
                      onDragStart(event, item.metadata?.name!)
                    }}
                    draggable
                  >
                    <Card.Meta
                      title={
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr auto',
                          alignItems: 'center',
                          width: '100%',
                        }}>
                          <p style={{ marginBottom: 0 }}>{item.metadata?.name}</p>
                          <a onClick={() => {
                            setSelectedTask(item);
                            setTaskView(true);
                          }}><UnorderedListOutlined /></a>
                        </div>
                      }
                    />
                    <div style={{ flex: 1, marginTop: 16 }}>
                      <Paragraph ellipsis={{ rows: 2 }} style={{ fontSize: 12 }}>{item.spec?.description}</Paragraph>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%'
                    }}>
                      <Space>

                        <Tooltip color={colorPrimary} title={<FormattedMessage id="tekton.pipeline.task.steps.number" />} >
                          <div><img width={16} height={16} src='/pipeline/steps.svg' />:&nbsp;{item.spec?.steps?.length || 0} </div>
                        </Tooltip>
                      </Space>
                    </div>
                  </Card>
                </List.Item>
              )
            }}
          />
        </div>
        {selectedTask && <Modal
          key={selectedTask?.metadata?.name || '' + selectedTask.metadata?.resourceVersion || ''}
          title={<><FormattedMessage id='menu.task' />:&nbsp;&nbsp;{selectedTask.metadata?.name}</>}
          width="70vw"
          open={taskView}
          destroyOnHidden={true}
          onCancel={() => { setTaskView(false); }}
          onOk={() => { setTaskView(false); }}
          footer={false}
        >
          <TektonTaskDetail task={selectedTask} />
        </Modal >}
      </div>
    </>

  );
};

export default Sidebar;
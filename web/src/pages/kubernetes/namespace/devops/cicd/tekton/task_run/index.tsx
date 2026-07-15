import { CheckCircleFilled, ClockCircleOutlined, CloseCircleFilled, CloseCircleOutlined, DeleteOutlined, EditOutlined, ExclamationCircleOutlined, InsertRowBelowOutlined, RedoOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { FooterToolbar, PageContainer, type ProFormInstance, ProTable } from '@ant-design/pro-components';
import { Access, FormattedMessage, useAccess, useIntl } from '@umijs/max';
import { Button, Drawer, Modal, message, Popconfirm, Popover, Space, Spin, Tag, Tooltip, Typography, Select, Empty, Divider } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
const { Text } = Typography;
import dayjs from 'dayjs';
import type { IntlShape } from 'react-intl';
import type { TaskRun } from '@/k8s-models/tekton/pipeline/tekton.dev/v1';
import Continue from '@/pages/kubernetes/components/continue';
import FilterSelector from '@/pages/kubernetes/components/filter_selector';
import ResourceEditor from '@/pages/kubernetes/components/resource_editor';
import { clusterDeleteProxy, clusterGetProxy } from '@/services/cluster_proxy.api';

import { getClusterResource } from '@/utils/cluster';
import { getClusterApiVersions, getColorPrimary, getCurrentViewInfo, getCurrentUTCTimeString, getExecutionTimeDetailed } from '@/utils/global';
import { debounce } from 'lodash';
import { syncClusterNamespace } from '@/services/cluster.api';
import { ClusterNamespaceDetail, ClusterNamespaceDetailList } from '@/services/cluster_namespace';
import { canAccessClusterNamespaces } from '@/services/personal.api';
import OwnerReferencesView from '@/pages/kubernetes/components/owner_references';
import PodSingle from '@/pages/kubernetes/components/pod_single';

import AICopilot from '@/pages/kubernetes/components/ai';
import { CncfTekton } from '@/utils/cncf';

const IndexDashboard: React.FC = () => {
  const colorPrimary = getColorPrimary();
  const actionRef = useRef<ActionType>(null);
  const formRef = useRef<ProFormInstance>(undefined);
  const access = useAccess();
  const { cluster, namespace } = getCurrentViewInfo();
  const [selectedRowsState, setSelectedRows] = useState<TaskRun[]>([]);
  const [expandInfo, setExpandInfo] = useState<boolean>(false);
  const [patchTaskRun, setPatchTaskRun] = useState<TaskRun>();
  const [selectedNamespace, setSelectedNamespace] = useState<string>(namespace);
  const [searchName, setSearchName] = useState<string>('');
  const [searchLabels, setSearchLabels] = useState<{ [key: string]: string }>({});
  const [labelSelectorVisible, setLabelSelectorVisible] = useState<boolean>(false);
  const [fieldSelectorVisible, setFieldSelectorVisible] = useState<boolean>(false);
  const [ownerVisible, setOwnerVisible] = useState<boolean>(false);
  const [searchFields, setSearchFields] = useState<{ [key: string]: string }>({});
  const [dataSource, setDataSource] = useState<TaskRun[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const resourceGroup = getClusterApiVersions(cluster, ['tekton.dev/v1'], 'TaskRun');
  const address = namespace ? `apis/${resourceGroup?.groupVersion}/namespaces/${namespace}/taskruns` : `apis/${resourceGroup?.groupVersion}/taskruns`;
  let BaseAddress = `/kubernetes/cluster/${cluster}/namespace/${namespace}/devops/cicd/tekton/taskruns`;
  if (!namespace || namespace === '' || namespace === '-') {
    BaseAddress = `/kubernetes/cluster/${cluster}/devops/cicd/tekton/taskruns`;
  }
  const intl = useIntl();
  const [currnetNumber, setCurrnetNumber] = useState<number>(0);
  const [remainingItemCount, setRemainingItemCount] = useState<number>(0);
  const [resourceDrawerVisible, setResourceDrawerVisible] = useState<boolean>(false);
  const [drawerSize, setDrawerSize] = useState<number>(800);
  const [editorResource, setEditorResource] = useState<boolean>(false);
  const [podVisible, setPodVisible] = useState<boolean>(false);
  const debouncedNamespaceChange = debounce((value) => { setSearchNamespace(value); }, 1000);
  const [searchNamespace, setSearchNamespace] = useState<string>('');
  const [userNamespaces, setUserNamespaces] = useState<ClusterNamespaceDetail[]>([]);

  const syncNamespace = async () => {
    await syncClusterNamespace({ cluster });
    message.success(intl.formatMessage({ id: 'cluster.namespace.sync.success' }));
  };
  const listNamespaces = async () => {
    const params = { cluster, search: searchNamespace } as Record<string, any>;
    const data = (await canAccessClusterNamespaces(params)) as ClusterNamespaceDetailList;
    setUserNamespaces(data.data || []);
  };
  useEffect(() => {
    if (!namespace || namespace === '' || namespace === '-') {
      listNamespaces();
    }
  }, [searchNamespace]);

  const listTaskRuns = async () => {
    setLoading(true);
    try {
      const params = { cluster, address: address } as Record<string, any>;
      const fieldSelector = {} as Record<string, string>;
      if (namespace && namespace) {
        fieldSelector['metadata.namespace'] = namespace;
      } else if (selectedNamespace && selectedNamespace !== '') {
        fieldSelector['metadata.namespace'] = selectedNamespace;
      }
      if (searchName !== '') {
        fieldSelector['metadata.name'] = searchName;
      }
      if (Object.keys(searchFields).length > 0) {
        for (const key in searchFields) {
          fieldSelector[key] = searchFields[key];
        }
      }
      if (Object.keys(fieldSelector).length > 0) {
        const fieldSelectors = [] as string[];
        for (const key in fieldSelector) {
          fieldSelectors.push(`${key}=${fieldSelector[key]}`);
        }
        params['fieldSelector'] = fieldSelectors.join(',');
      }
      if (Object.keys(searchLabels).length > 0) {
        const labelSelectors = [] as string[];
        for (const key in searchLabels) {
          labelSelectors.push(`${key}=${searchLabels[key]}`);
        }
        params['labelSelector'] = labelSelectors.join(',');
      }
      const data = await clusterGetProxy(params);
      if (data?.metadata?.remainingItemCount) {
        setRemainingItemCount(data.metadata?.remainingItemCount || 0);
      }
      setCurrnetNumber(data?.items?.length || 0);
      for (let i = 0; i < data.items.length; i++) {
        data.items[i].apiVersion = data.apiVersion;
        data.items[i].kind = 'TaskRun';
      }
      setDataSource(data.items || []);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    listTaskRuns();

  }, []);

  const handleRemove = async (intl: IntlShape, selectedRows: TaskRun[]) => {
    if (!selectedRows) return true;
    // 批量删除
    selectedRows.forEach(async (entity: TaskRun) => {
      const params = { cluster, address: `apis/${resourceGroup?.groupVersion}/namespaces/${entity.metadata?.namespace}/taskruns/${entity.metadata?.name}` };
      await clusterDeleteProxy(params);
    });
    message.success(intl.formatMessage({ id: 'cluster.pages.operation.success' }));
    actionRef.current?.reload();
    return true;
  };

  const columns: ProColumns<TaskRun>[] = [
    {
      title: <FormattedMessage id="cluster.namespace" />,
      dataIndex: 'namespace',
      hidden: !!namespace,
      search: !namespace,
      onFilter: true,
      valueType: 'select',
      renderFormItem: (_, { defaultRender }) => {
        return (
          <Select
            allowClear
            showSearch={{
              filterOption: false,
              onSearch(value) {
                debouncedNamespaceChange(value);
              },
            }}
            onChange={(value) => {
              setSelectedNamespace(value);
            }}
            popupRender={(menu) => {
              if (userNamespaces.length == 0) {
                return (
                  <div style={{ padding: 16, textAlign: 'center' }}>
                    <Empty description={intl.formatMessage({ id: 'pages.no.data' })} image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    <Button
                      type="primary"
                      onClick={syncNamespace}
                    >
                      <FormattedMessage id='cluster.namespace.sync' />
                    </Button>
                  </div>
                );
              }
              return menu
            }}
          >
            {userNamespaces?.map((item: ClusterNamespaceDetail) => {
              return (
                <Select.Option key={item.namespace} value={item.namespace}>
                  {item.namespace}
                </Select.Option>
              );
            })}
          </Select>
        );
      },
      render: (dom, entity) => {
        return (
          <>
            <a
              onClick={() => {
                window.open(
                  `/kubernetes/cluster/${cluster}/namespace/${entity?.metadata?.namespace}/devops/cicd/tekton/tasks`,
                );
              }}
            >
              {entity?.metadata?.namespace}
            </a>
          </>
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'cluster.resource.name' }),
      dataIndex: 'name',
      search: { transform: (value: string) => setSearchName(value) },
      render: (dom, entity) => {
        return (
          <>
            <a
              onClick={() => {
                setPatchTaskRun(entity);
                setResourceDrawerVisible(true);
              }}
            >
              {entity?.metadata?.name}
            </a>
          </>
        );
      },
    },

    {
      title: intl.formatMessage({ id: 'menu.DevOps.Tekton.task' }),
      search: false,
      render: (dom, entity: TaskRun) => {
        let duration = ''
        if (entity.metadata?.creationTimestamp && entity.status?.completionTime) {
          duration = getExecutionTimeDetailed(entity.metadata?.creationTimestamp, entity.status?.completionTime)
        } else {
          duration = getExecutionTimeDetailed(entity.metadata?.creationTimestamp, getCurrentUTCTimeString())
        }
        if (entity.status?.taskSpec?.description) {
          return (
            <Tooltip
              color={colorPrimary}
              title={entity.status?.taskSpec?.description}
            >
              <a>{entity.spec?.taskRef?.name} &nbsp;<ClockCircleOutlined />{duration}</a>
            </Tooltip>
          );
        } else {
          return <p>{entity.spec?.taskRef?.name} &nbsp;<ClockCircleOutlined />{duration}</p>;
        }
      },
    },
    {
      title: intl.formatMessage({ id: 'cluster.resource.status' }),
      key: 'status',
      search: false,
      render: (dom, entity: TaskRun) => {
        // "Failed" |  "Running" | "Succeeded"
        let status = 'Unknown';
        entity?.status?.conditions?.map((item) => {
          if (item.type === 'Succeeded') {
            status = item.reason || 'Unknown';
          }
        });
        if (status === 'Running') {
          return (
            <>

              <Spin
                indicator={<RedoOutlined style={{ color: '#198038' }} spin />}
              />
              &nbsp;&nbsp;
              <FormattedMessage id={`model.${status}`} />
            </>
          );
        }
        if (status === 'Succeeded') {
          return (
            <>
              <CheckCircleFilled style={{ color: '#52c41a' }} />
              &nbsp;&nbsp;
              <FormattedMessage id={`model.${status}`} />
            </>
          );
        } else if (status === 'Failed') {
          return (
            <>
              <CloseCircleFilled style={{ color: '#da1e28' }} />
              &nbsp;&nbsp;
              <FormattedMessage id={`model.${status}`} />
            </>
          );
        } else {
          return (
            <>
              <ExclamationCircleOutlined style={{ color: '#FA541C' }} />
              &nbsp;&nbsp;
              <FormattedMessage id={`model.${status}`} />
            </>
          );
        }
      },
    },
    {
      title: intl.formatMessage({ id: 'menu.workload.pod' }),
      search: false,
      hideInTable: !expandInfo,
      render: (dom, entity: TaskRun) => {
        return (
          <a
            onClick={() => { setPatchTaskRun(entity); setPodVisible(true) }}
          >
            {entity.status?.podName}
          </a>
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'model.time' }),
      search: false,
      render: (dom, entity: TaskRun) => {
        if (entity.status?.completionTime) {
          return (
            <span>
              {dayjs(entity.status?.completionTime).format(
                'YYYY-MM-DD HH:mm:ss',
              )}
            </span>
          );
        } else {
          return (
            <span>
              {dayjs(entity.status?.startTime).format('YYYY-MM-DD HH:mm:ss')}
            </span>
          );
        }
      },
    },
    {
      title: intl.formatMessage({ id: 'cluster.fieldSelector' }),
      dataIndex: 'hiddenFieldSelector',
      hideInTable: true, // 在表格中隐藏这个字段
      renderFormItem: (item, { defaultRender }) => {
        const labels = [] as string[];
        const keys = Object.keys(searchFields);
        if (keys.length > 0) {
          for (const key in searchFields) {
            labels.push(`${key}=${searchFields[key]}`);
          }
        }
        return (
          <Space>
            <div
              onClick={() => {
                if (labelSelectorVisible) {
                  setFieldSelectorVisible(false);
                }
                setFieldSelectorVisible(true);
              }}
            >
              <Popover
                placement="top"
                title={
                  <div>
                    <span style={{ color: colorPrimary, fontSize: '10px' }}>

                      <FormattedMessage id="cluster.fieldSelector.click" />
                    </span>
                    <div>
                      {keys?.map((key: string) => (
                        <>
                          <Tag style={{ border: 0 }} key={key}>
                            {key}={searchFields[key]}
                          </Tag>
                          <br />
                        </>
                      ))}
                    </div>
                  </div>
                }
              >
                <InsertRowBelowOutlined style={{ color: colorPrimary }} />
                {labels.length > 0 && (
                  <Text ellipsis>
                    &nbsp;&nbsp;{labels.join(',').substring(0, 10) + '...'}
                  </Text>
                )}
              </Popover>
            </div>
            {keys.length > 0 && (
              <CloseCircleOutlined
                style={{ color: 'red' }}
                onClick={() => setSearchFields({})}
              />
            )}
          </Space>
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.operation' }),
      dataIndex: 'option',
      search: false,
      align: 'center',
      render: (_, record) => {
        let logo = '/pod.svg'

        if (record.status?.conditions) {
          const condition = record.status.conditions.find((item) => item.type === 'Succeeded')
          if (condition?.reason === 'Running') {
            logo = '/pod.svg'
          } else if (condition?.reason === 'Succeeded') {
            logo = '/pod-success.svg'
          } else if (condition?.reason === 'Failed') {
            logo = '/pod-failed.svg'
          }
        }
        const nodes = [
          <a onClick={() => { setPatchTaskRun(record); setPodVisible(true) }}><img width={14} height={14} src={logo} /></a>,
          <Popconfirm
            key={record.metadata?.resourceVersion + '-delete'}
            description={intl.formatMessage({
              id: 'cluster.resource.tekton.TaskRun.delete.description',
            })}
            title={
              intl.formatMessage({ id: 'pages.operation.delete.description' }) +
              getClusterResource('TaskRun') + `【${record.metadata?.name}】`
            }
            onConfirm={() => {
              handleRemove(intl, [record]);
            }}
            okText={intl.formatMessage({ id: 'pages.operation.confirm' })}
            cancelText={intl.formatMessage({ id: 'pages.operation.cancel' })}
          >
            <DeleteOutlined style={{ color: 'red' }} />
          </Popconfirm>,
        ];
        if (!record?.metadata?.ownerReferences) {
          nodes.unshift(
            <a
              key="edit"
              onClick={() => {
                setPatchTaskRun(record);
                setResourceDrawerVisible(true);
                setEditorResource(true);
              }}
            >
              <EditOutlined style={{ color: colorPrimary }} />
            </a>,
          );
        } else {
          nodes.push(
            <a
              onClick={() => {
                setPatchTaskRun(record);
                setOwnerVisible(true)
              }}
              style={{ color: colorPrimary }}
            >
              <FormattedMessage id="cluster.view.ownerReferences" />
            </a>
          )
        }
        return <Space>{nodes}</Space>;
      },
    },
  ];

  return (
    <PageContainer
      header={{ breadcrumb: {} }}
      title={intl.formatMessage({ id: 'menu.DevOps.Tekton.taskRun' })}
      subTitle="TaskRun"
      content={<Continue current={currnetNumber} remainingItemCount={remainingItemCount} />}
    >
      <ProTable<TaskRun>
        key='task-run'
        actionRef={actionRef}
        formRef={formRef}
        scroll={{ x: 'max-content' }}
        rowKey={(record: TaskRun) =>
          `${record?.metadata?.name}-${record.metadata?.resourceVersion}`
        }
        search={{
          showHiddenNum: true,
          optionRender: ({ searchText, resetText }) => {
            return [
              <Button
                key="reset"
                onClick={() => {
                  setSearchLabels({});
                  setSearchFields({});
                  setSearchName('');
                  formRef?.current?.resetFields();

                }}
              >
                {resetText}
              </Button>,
              <Button
                key="search"
                type="primary"
                onClick={() => {

                  listTaskRuns();
                }}
              >

                {searchText}
              </Button>,
            ];
          },
        }}
        options={{
          reload: () => {

            listTaskRuns();
          }
        }}
        pagination={{
          showQuickJumper: true,
          showSizeChanger: true,
          locale: {
            items_per_page: intl.formatMessage({
              id: 'pages.pagination.items_per_page',
            }),
            jump_to: intl.formatMessage({ id: 'pages.pagination.jump_to' }),
            page: intl.formatMessage({ id: 'pages.pagination.page' }),
          },
        }}
        locale={{
          emptyText: intl.formatMessage({ id: 'pages.not.found.data' }),
        }}
        toolBarRender={() => [
          <Space separator={<Divider orientation="vertical" />}>

            <a style={{ color: colorPrimary }} onClick={() => setExpandInfo(!expandInfo)}  >
              {expandInfo ? (<FormattedMessage id="cluster.node.shrink" />) : (<FormattedMessage id="cluster.node.expand" />)}
            </a>
            <Access accessible={true} key={'create'}>
              <Button
                type="primary"
                key="create"
                onClick={() => {
                  window.location.href = `${BaseAddress}/create/text`;
                }}
              >
                <FormattedMessage id="cluster.resource.create.text" />
              </Button>
            </Access>
          </Space>
        ]}
        loading={loading}
        dataSource={dataSource}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.operation.selected" />
              <a style={{ fontWeight: 600 }} >
                {selectedRowsState.length}
              </a>
              <FormattedMessage id="pages.operation.selected.term" defaultMessage="项" />
            </div>
          }
        >
          <Button
            danger
            onClick={() => {
              Modal.confirm({
                title: intl.formatMessage({
                  id: 'pages.operation.delete.confirm.title',
                }),
                content: intl.formatMessage({
                  id: 'cluster.resource.tekton.TaskRun.delete.description',
                }),
                okText: intl.formatMessage({ id: 'pages.operation.confirm' }),
                cancelText: intl.formatMessage({
                  id: 'pages.operation.cancel',
                }),
                onOk: async () => {
                  await handleRemove(intl, selectedRowsState);
                  setSelectedRows([]);
                  actionRef.current?.reloadAndRest?.();
                },
              });
            }}
          >
            <FormattedMessage id="pages.operation.batch.delete" />
          </Button>
        </FooterToolbar>
      )}
      {labelSelectorVisible && (
        <FilterSelector
          title={<FormattedMessage id="cluster.labelSelector" />}
          key={Date.now().toString()}
          visible={labelSelectorVisible}
          labels={searchLabels}
          setVisible={setLabelSelectorVisible}
          updateLabels={setSearchLabels}
        />
      )}
      {fieldSelectorVisible && (
        <FilterSelector
          title={<FormattedMessage id="cluster.fieldSelector" />}
          key={Date.now().toString()}
          visible={fieldSelectorVisible}
          labels={searchFields}
          setVisible={setFieldSelectorVisible}
          updateLabels={setSearchFields}
        />
      )}
      <Drawer
        destroyOnHidden={true}
        size={drawerSize}
        resizable={{
          onResize: (newSize) => setDrawerSize(newSize),
        }}
        open={resourceDrawerVisible}
        onClose={() => setResourceDrawerVisible(false)}
        closable={true}
        title={
          <>
            {getClusterResource('TaskRun')}:&nbsp;&nbsp;
            {patchTaskRun?.metadata?.name}
          </>
        }
      >
        <ResourceEditor
          key={patchTaskRun?.metadata?.resourceVersion || 'edit'}
          edit={editorResource}
          address={`apis/${resourceGroup?.groupVersion}/namespaces/${patchTaskRun?.metadata?.namespace}/taskruns/${patchTaskRun?.metadata?.name}`}
          kind="TaskRun"
          name={patchTaskRun?.metadata?.name || ''}

          cluster={cluster}
          content={patchTaskRun}
        />
      </Drawer>
      {ownerVisible && <OwnerReferencesView

        cluster={cluster}
        namespace={patchTaskRun?.metadata?.namespace || ''}
        visibleView={ownerVisible}
        ownerReferences={patchTaskRun?.metadata?.ownerReferences || []}
        setVisible={setOwnerVisible}
        api='apis'
      />}
      {podVisible && <Drawer
        closable={false}
        open={podVisible}
        size={drawerSize}
        resizable={{
          onResize: (newSize) => setDrawerSize(newSize),
        }}
        onClose={() => setPodVisible(false)}
        destroyOnHidden={true}
        styles={{ body: { backgroundColor: '#f0f2f5' } }}
      >
        {patchTaskRun && <PodSingle
          key={`${patchTaskRun.metadata?.name}-pod`} cluster={cluster} namespace={patchTaskRun.metadata?.namespace || namespace} name={`${patchTaskRun.metadata?.name}-pod`}
          startTime={patchTaskRun.status?.startTime}
          endTime={patchTaskRun.status?.completionTime} />}
      </Drawer>}
      <AICopilot
        view='list'
        cluster={cluster}
        namespace={namespace || ''}
        kind="TaskRun"
        cncf={CncfTekton}
        questions={[{ mode: 'agent', skill: 'k8s-default', question: intl.formatMessage({ id: 'copilot.cluster.resource.describe' }) }]}
        apiVersion={resourceGroup.groupVersion}
      />
    </PageContainer>
  );
};

export default IndexDashboard;

import { PageContainer, ProTable, FooterToolbar, ProFormInstance } from '@ant-design/pro-components';
import { FormattedMessage, useIntl, Access, useAccess } from '@umijs/max';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { UnorderedListOutlined, MoreOutlined, InsertRowBelowOutlined, CloseCircleOutlined, EditOutlined, DeleteOutlined, LineChartOutlined, EyeOutlined, EyeInvisibleOutlined, ReloadOutlined, SaveOutlined } from '@ant-design/icons';
import React, { useState, useRef, useEffect } from 'react';
import { Button, Modal, message, Flex, Tag, Space, Popconfirm, Popover, Divider, Dropdown, Drawer, Select, Empty, Card, theme } from "antd";
import { Typography } from 'antd';
const { Text } = Typography;
import { Rollout } from "@kubernetes-models/argo-rollouts/argoproj.io/v1alpha1/Rollout";
import { IContainer } from 'kubernetes-models/v1';
import { clusterGetProxy, clusterDeleteProxy, clusterPostProxy } from '@/services/cluster_proxy.api';
import { getClusterApiVersions, getCurrentViewInfo } from '@/utils/global';
import { IntlShape } from "react-intl";
import dayjs from 'dayjs';
import PatchLabels from '@/pages/kubernetes/components/patch_labels';
import FilterSelector from '@/pages/kubernetes/components/filter_selector';
import PatchReplicas from '@/pages/kubernetes/components/patch_replicas';
import { getClusterResource } from '@/utils/cluster';
import Continue from '@/pages/kubernetes/components/continue';
import ResourceEditor from '@/pages/kubernetes/components/resource_editor';
import { RenderWorkloadMetrics } from '@/pages/kubernetes/components/workload_metrics';
import debounce from 'lodash/debounce';
import { canAccessClusterNamespaces } from '@/services/personal.api';
import { ClusterNamespaceDetail, ClusterNamespaceDetailList } from '@/services/cluster_namespace';
import { syncClusterNamespace } from '@/services/cluster.api';

const IndexDashboard: React.FC = () => {
  const { token } = theme.useToken();
  const colorPrimary = token.colorPrimary;
  const actionRef = useRef<ActionType>(null);
  const access = useAccess();
  const formRef = useRef<ProFormInstance>(undefined);
  const { cluster, namespace } = getCurrentViewInfo();
  const [selectedRowsState, setSelectedRows] = useState<Rollout[]>([]);
  const [expandInfo, setExpandInfo] = useState<boolean>(false);
  const [patchLabelVisible, setPatchLabelVisible] = useState<boolean>(false);
  const [patchDeployment, setPatchDeployment] = useState<Rollout>();
  const [patchModalKey, setPatchModalKey] = useState<string>('');
  const [patchAnnotationsVisible, setPatchAnnotationsVisible] = useState<boolean>(false);
  const [patchReplicasVisible, setPatchReplicasVisible] = useState<boolean>(false);
  const [monitorDrawerVisible, setMonitorDrawerVisible] = useState<boolean>(false);
  const [drawerSize, setDrawerSize] = useState<number>(800);

  const [dataSource, setDataSource] = useState<Rollout[]>([]);
  const [searchName, setSearchName] = useState<string>('');
  const [searchLabels, setSearchLabels] = useState<{ [key: string]: string; }>({});
  const [labelSelectorVisible, setLabelSelectorVisible] = useState<boolean>(false);
  const [fieldSelectorVisible, setFieldSelectorVisible] = useState<boolean>(false);
  const [searchFields, setSearchFields] = useState<{ [key: string]: string; }>({});
  const resourceGroup = getClusterApiVersions(cluster, ['argoproj.io/v1alpha1'], "Rollout");
  const address = namespace ? `apis/${resourceGroup?.groupVersion}/namespaces/${namespace}/rollouts` : `apis/${resourceGroup?.groupVersion}/rollouts`;
  let BaseAddress = `/kubernetes/cluster/${cluster}/namespace/${namespace}/workload/rollouts`
  if (!namespace || namespace === '' || namespace === '-') {
    BaseAddress = `/kubernetes/cluster/${cluster}/workload/rollouts`
  }

  const intl = useIntl();
  const [currnetNumber, setCurrnetNumber] = useState<number>(0);
  const [remainingItemCount, setRemainingItemCount] = useState<number>(0);
  const [resourceDrawerVisible, setResourceDrawerVisible] = useState<boolean>(false);
  const [editorResource, setEditorResource] = useState<boolean>(false);
  const [selectedNamespace, setSelectedNamespace] = useState<string>(namespace);
  const [userNamespaces, setUserNamespaces] = useState<ClusterNamespaceDetail[]>([]);
  const [searchNamespace, setSearchNamespace] = useState<string>('');
  const debouncedNamespaceChange = debounce((value) => { setSearchNamespace(value); }, 1000);
  const listNamespaces = async () => {
    let params = { cluster, search: searchNamespace } as Record<string, any>;
    const data = await canAccessClusterNamespaces(params) as ClusterNamespaceDetailList;
    setUserNamespaces(data.data || []);
  }
  useEffect(() => {
    if (!namespace || namespace === '' || namespace === '-') {
      listNamespaces();
    }
  }, [searchNamespace])
  const listDeployments = async () => {
    let params = { cluster, address: address } as Record<string, any>;
    let fieldSelector = {} as Record<string, string>;
    if (selectedNamespace && selectedNamespace !== '') {
      fieldSelector['metadata.namespace'] = selectedNamespace
    }
    if (searchName !== '') {
      fieldSelector['metadata.name'] = searchName
    }
    if (Object.keys(searchFields).length > 0) {
      for (let key in searchFields) {
        fieldSelector[key] = searchFields[key];
      }
    }
    if (Object.keys(fieldSelector).length > 0) {
      let fieldSelectors = [] as string[];
      for (let key in fieldSelector) {
        fieldSelectors.push(`${key}=${fieldSelector[key]}`);
      }
      params['fieldSelector'] = fieldSelectors.join(',');
    }
    if (Object.keys(searchLabels).length > 0) {
      let labelSelectors = [] as string[];
      for (let key in searchLabels) {
        labelSelectors.push(`${key}=${searchLabels[key]}`);
      }
      params['labelSelector'] = labelSelectors.join(',');
    }
    const data = await clusterGetProxy(params) as DeploymentList;

    if (data?.metadata?.remainingItemCount) {
      setRemainingItemCount(data.metadata?.remainingItemCount || 0);
    }
    setCurrnetNumber(data?.items?.length || 0);
    for (let i = 0; i < data.items.length; i++) {
      data.items[i].apiVersion = data.apiVersion
      data.items[i].kind = 'Rollout'
    }
    setDataSource(data.items || [])
  };
  useEffect(() => {
    listDeployments();

  }, []);


  const patchVisibleReflash = (visible: boolean) => {
    setPatchAnnotationsVisible(false);
    setPatchReplicasVisible(false);
    setPatchLabelVisible(false);
    setEditorResource(false);
    setResourceDrawerVisible(false);
    setMonitorDrawerVisible(false);
    actionRef.current?.reload();
  };
  const handleRemove = async (intl: IntlShape, selectedRows: Rollout[]) => {
    if (!selectedRows) return true;
    // 批量删除
    selectedRows.forEach(async (entity: Rollout) => {
      const params = { cluster, address: `apis/apps/v1/namespaces/${entity.metadata?.namespace}/rollouts/${entity.metadata?.name}` };
      await clusterDeleteProxy(params);
    });
    message.success(intl.formatMessage({ id: 'cluster.pages.operation.success' }));
    actionRef.current?.reload();
    return true;
  };
  const moreItems = (record: Rollout) => {
    let nodes = [
      {
        key: 'edit-labels',
        label: <a onClick={() => {
          setPatchDeployment(record);
          setPatchModalKey('labels-' + record.metadata?.name);
          setPatchLabelVisible(true);
        }} style={{ color: colorPrimary }}><FormattedMessage id='cluster.patch.labels' /></a>,
      },
      {
        key: 'view-yaml',
        label: <a onClick={() => {
          setPatchDeployment(record);
          setResourceDrawerVisible(true);
        }} style={{ color: colorPrimary }}><FormattedMessage id='cluster.view.yaml' /></a>,
      }, {
        key: 'edit-yaml',
        label: <a onClick={() => {
          setPatchDeployment(record);
          setEditorResource(true);
          setResourceDrawerVisible(true);
        }} style={{ color: colorPrimary }}><FormattedMessage id='cluster.edit.yaml' /></a>,
      },
    ];

    nodes.push({
      key: 'annotation',
      label: <a onClick={() => {
        setPatchDeployment(record);
        setPatchAnnotationsVisible(true);
        setPatchModalKey('annotations-' + record.metadata?.name);
      }} style={{ color: colorPrimary }}><FormattedMessage id='cluster.patch.annotations' /></a>,
    });
    nodes.push({
      key: 'replicas',
      label: <a onClick={() => {
        setPatchDeployment(record);
        setPatchReplicasVisible(true);
        setPatchModalKey('replicas-' + record.metadata?.name);
      }} style={{ color: colorPrimary }}><FormattedMessage id='cluster.patch.replicas' /></a>,
    });
    return nodes;
  }
  const reDeploy = async (bodyData: Rollout) => {
    await clusterDeleteProxy({ cluster, address: `apis/apps/v1/namespaces/${bodyData.metadata?.namespace}/rollouts/${bodyData.metadata?.name}` });
    const requestData = { ...bodyData }
    delete requestData.status;
    delete requestData.metadata?.creationTimestamp;
    delete requestData.metadata?.resourceVersion;
    delete requestData.metadata?.uid;
    await clusterPostProxy({ cluster, address: `apis/apps/v1/namespaces/${requestData.metadata?.namespace}/rollouts` }, requestData);
    message.success(intl.formatMessage({ id: 'cluster.pages.operation.success' }));
    actionRef.current?.reload();
  }
  const columns: ProColumns<Rollout>[] = [
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
                  `/kubernetes/cluster/${cluster}/namespace/${entity?.metadata?.namespace}/workload/rollouts`,
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
        const description = entity?.metadata?.annotations?.['efucloud.com/description'] || '';
        const hasStorage = entity.spec?.template?.spec?.volumes?.filter((item) => item.persistentVolumeClaim).length || 0 ? true : false;
        if (description !== '') {
          return (<>
            {hasStorage && <><SaveOutlined style={{ color: colorPrimary }} />&nbsp;</>}
            <Popover placement='right'
              title={<span style={{ fontSize: '12px' }}>{description}</span>}>
              < a onClick={() => {
                if (namespace) {
                  window.location.pathname = `/kubernetes/cluster/${cluster}/namespace/${entity?.metadata?.namespace}/workload/rollouts/${entity?.metadata?.name}`
                } else {
                  window.open(`/kubernetes/cluster/${cluster}/namespace/${entity?.metadata?.namespace}/workload/rollouts/${entity?.metadata?.name}`, '_blank')
                }
              }}  >
                {entity?.metadata?.name}
              </a>
              {expandInfo && <><br /><span style={{ fontSize: '12px' }}>{description}</span></>}
            </Popover></>);
        } else {
          return (<>
            {hasStorage && <><SaveOutlined style={{ color: colorPrimary }} />&nbsp;</>}
            < a onClick={() => {
              if (namespace) {
                window.location.pathname = `/kubernetes/cluster/${cluster}/namespace/${entity?.metadata?.namespace}/workload/rollouts/${entity?.metadata?.name}`
              } else {
                window.open(`/kubernetes/cluster/${cluster}/namespace/${entity?.metadata?.namespace}/workload/rollouts/${entity?.metadata?.name}`, '_blank', 'noreferrer')
              }
            }}>
              {entity?.metadata?.name}
            </a>
          </>
          );
        }
      },
    },
    {
      title: intl.formatMessage({ id: 'cluster.workload.replicas' }),
      search: false,
      render: (dom, entity: Rollout) => {
        const health = entity?.status?.availableReplicas || (entity?.status?.replicas - entity?.status?.unavailableReplicas) || 0;
        if (health > 0) {
          return (<><a style={{ color: '#52c41a' }}>{health}&nbsp;</a>{'/ ' + entity.spec?.replicas}</>);
        } else {
          return (<><a style={{ color: 'red' }}>0&nbsp;</a>{'/ ' + entity.spec?.replicas}</>);
        }
      },
    },
    {
      title: intl.formatMessage({ id: 'cluster.resource.status' }),
      search: false,
      render: (dom, entity: Rollout) => {
        const conditions = entity?.status?.conditions || [];
        let tags = [] as React.ReactNode[];
        for (const item of conditions) {
          if (item.type === 'Available') {
            if (item.status === 'True' && entity.spec?.replicas || 0 === entity?.status?.readyReplicas) {
              tags.push(<Tag style={{ border: 0 }} key={item.type} color='green'><FormattedMessage id='cluster.resource.Available' /></Tag>);
            } else {
              if (entity?.status?.readyReplicas || 0 > 0) {
                tags.push(<Tag style={{ border: 0 }} key={item.type} color='orange'><FormattedMessage id='cluster.resource.SomeAvailable' /></Tag>);
              } else {
                tags.push(<Tag style={{ border: 0 }} key={item.type} color='red'><FormattedMessage id='cluster.resource.UnAvailable' /></Tag>);
              }
            }
          }
        }
        return (
          <Flex gap="4px 0" wrap>  {tags}  </Flex>
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'cluster.workload.container.number' }),
      search: false,
      render: (dom, entity: Rollout) => {
        const containers = entity.spec?.template?.spec?.containers;
        const initContainers = entity.spec?.template?.spec?.initContainers;
        const containersNumber = entity.spec?.template?.spec?.containers?.length || 0;
        const initContainersNumber = entity.spec?.template?.spec?.initContainers?.length || 0;
        if (expandInfo) {
          return (<div>
            {initContainersNumber > 0 && <>
              <Divider style={{ margin: '0 0', fontSize: '12px' }}> <FormattedMessage id='cluster.workload.initContainers' /></Divider>
              {initContainers?.map((item: IContainer) => <><Tag style={{ border: 0 }} key={item.name}>{item.name}={item.image}</Tag><br /></>)}
            </>}
            {containersNumber > 0 && <>
              <Divider style={{ margin: '0 0', fontSize: '12px' }}><FormattedMessage id='cluster.workload.containers' /></Divider>
              {containers?.map((item: IContainer) => <><Tag style={{ border: 0 }} key={item.name}>{item.name}={item.image}</Tag><br /></>)}

            </>}
          </div>);
        } else {
          let tags = [] as React.ReactNode[];
          if (containersNumber > 0) {
            tags.push(<Tag style={{ border: 0 }} key='containers' ><FormattedMessage id='cluster.workload.containers' />&nbsp;:&nbsp;{containersNumber}</Tag>);

          }
          if (initContainersNumber > 0) {
            tags.push(<Tag style={{ border: 0 }} key='initContainersNumber' ><FormattedMessage id='cluster.workload.initContainers' />&nbsp;:&nbsp;{initContainersNumber}</Tag>);
          }
          return (<Popover placement='right'
            title={<div>
              {initContainersNumber > 0 && <>
                <Divider style={{ margin: '0 0', fontSize: '12px' }}> <FormattedMessage id='cluster.workload.initContainers' /></Divider>
                {initContainers?.map((item: IContainer) => <><Tag style={{ border: 0 }} key={item.name}>{item.name}={item.image}</Tag><br /></>)}
              </>}
              {containersNumber > 0 && <>
                <Divider style={{ margin: '0 0', fontSize: '12px' }}><FormattedMessage id='cluster.workload.containers' /></Divider>
                {containers?.map((item: IContainer) => <><Tag style={{ border: 0 }} key={item.name}>{item.name}={item.image}</Tag><br /></>)}
              </>}
            </div>} >
            <Flex gap="4px 0" wrap>  {tags}  </Flex>
          </Popover>);
        }

      },
    },

    {
      title: intl.formatMessage({ id: 'cluster.resource.labels' }),
      renderFormItem: (item, { defaultRender }) => {
        let labels = [] as string[];
        const keys = Object.keys(searchLabels);
        if (keys.length > 0) {
          for (let key in searchLabels) {
            labels.push(`${key}=${searchLabels[key]}`);
          }
        }
        return <Space><div onClick={() => {
          if (labelSelectorVisible) {
            setLabelSelectorVisible(false);
          }
          setLabelSelectorVisible(true);
        }}><Popover placement='top'
          title={<div><span style={{ color: colorPrimary, fontSize: '10px' }}> <FormattedMessage id="cluster.labelSelector.click" /> </span><div>
            {keys?.map((key: string) => <><Tag style={{ border: 0 }} key={key}>{key}={searchLabels[key]}</Tag><br /></>)}</div></div>} >
            <InsertRowBelowOutlined style={{ color: colorPrimary }} />{labels.length > 0 && <Text ellipsis>&nbsp;&nbsp;{labels.join(',').substring(0, 10) + "..."}</Text>}
          </Popover></div>{keys.length > 0 && <CloseCircleOutlined style={{ color: 'red' }} onClick={() => setSearchLabels({})} />}</Space>
      },
      render: (dom, entity: Rollout) => {
        const keys = Object.keys(entity?.metadata?.labels || {});
        if (keys.length === 0) {
          return (<span>-</span>);
        }
        if (expandInfo) {
          return (
            <div>
              {Object.keys(entity?.metadata?.labels || {})?.map((key: string) => <><Tag style={{ border: 0 }} key={key}>{key}={entity?.metadata?.labels[key]}</Tag><br /></>)}
            </div>
          );
        } else {
          return (
            <Popover placement='right'
              title={<div>
                {keys?.map((key: string) => <><Tag style={{ border: 0 }} key={key}>{key}={entity?.metadata?.labels[key]}</Tag><br /></>)}</div>} >
              <UnorderedListOutlined style={{ color: colorPrimary }} />
            </Popover>
          );
        }
      },
    },
    {
      title: intl.formatMessage({ id: 'cluster.fieldSelector' }),
      dataIndex: 'hiddenFieldSelector',
      hideInTable: true, // 在表格中隐藏这个字段
      renderFormItem: (item, { defaultRender }) => {
        let labels = [] as string[];
        const keys = Object.keys(searchFields);
        if (keys.length > 0) {
          for (let key in searchFields) {
            labels.push(`${key}=${searchFields[key]}`);
          }
        }
        return <Space><div onClick={() => {
          if (labelSelectorVisible) {
            setFieldSelectorVisible(false);
          }
          setFieldSelectorVisible(true);
        }}><Popover placement='top'
          title={<div><span style={{ color: colorPrimary, fontSize: '10px' }}> <FormattedMessage id="cluster.fieldSelector.click" /> </span><div>
            {keys?.map((key: string) => <><Tag style={{ border: 0 }} key={key}>{key}={searchFields[key]}</Tag><br /></>)}</div></div>} >
            <InsertRowBelowOutlined style={{ color: colorPrimary }} />{labels.length > 0 && <Text ellipsis>&nbsp;&nbsp;{labels.join(',').substring(0, 10) + "..."}</Text>}
          </Popover></div>{keys.length > 0 && <CloseCircleOutlined style={{ color: 'red' }} onClick={() => setSearchFields({})} />}</Space>
      },
    },

    {
      title: intl.formatMessage({ id: 'cluster.resource.creationTimestamp' }),
      search: false,
      render: (dom, entity: Rollout) => {
        return (
          <span>{dayjs(entity.metadata?.creationTimestamp).format('YYYY-MM-DD HH:mm:ss')}</span>
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.operation' }),
      dataIndex: 'option',
      search: false,
      align: 'center',
      render: (_, record) => {
        const nodes = [
          <Popconfirm
            okText={<FormattedMessage id='pages.operation.confirm' />}
            cancelText={<FormattedMessage id='pages.operation.cancel' />}
            description={intl.formatMessage({ id: 'cluster.resource.reDeploy.description' })}
            onConfirm={() => {
              reDeploy(record)
            }}
            title={<FormattedMessage id='model.reDeploy' />}>
            <ReloadOutlined style={{ color: colorPrimary }} />
          </Popconfirm>,
          <span onClick={() => {
            setPatchDeployment(record);
            setMonitorDrawerVisible(true);
          }}> <LineChartOutlined style={{ color: colorPrimary }} /></span>,
          <Popconfirm
            key={record.metadata?.resourceVersion + '-delete'}
            description={intl.formatMessage({ id: 'cluster.resource.argoce.Rollout.delete.description' })}
            title={intl.formatMessage({ id: 'pages.operation.delete.description' }) +
              getClusterResource('Rollout') + '【' + record.metadata?.name + '】'}
            onConfirm={() => {
              handleRemove(intl, [record])
            }}
            okText={intl.formatMessage({ id: 'pages.operation.confirm' })}
            cancelText={intl.formatMessage({ id: 'pages.operation.cancel' })}
          >
            <DeleteOutlined style={{ color: 'red' }} />
          </Popconfirm>];
        if (!record?.metadata?.ownerReferences) {
          nodes.unshift(<a key='edit' onClick={() => {
            window.location.href = `/kubernetes/cluster/${cluster}/namespace/${record?.metadata?.namespace}/workload/rollouts/${record?.metadata?.name}/update`
          }
          }><EditOutlined style={{ color: colorPrimary }} /></a>);
        }
        nodes.push(
          <Dropdown menu={{ items: moreItems(record) }} key='more' >
            <a
              style={{ color: colorPrimary }}
              onClick={(e) => {
                e.preventDefault();
              }}>
              <Space>
                <MoreOutlined style={{ color: colorPrimary }} />
              </Space>
            </a>
          </Dropdown>

        );
        return nodes;
      },
    },
  ];
  const syncNamespace = async () => {
    await syncClusterNamespace({ cluster });
    message.success(intl.formatMessage({ id: 'cluster.namespace.sync.success' }));
  };

  return (
    <PageContainer
      header={{ breadcrumb: {}, onBack: () => window.history.back() }}
      title={intl.formatMessage({ id: 'menu.workload.deployment' })}
      subTitle='Rollout'
      content={<Continue current={currnetNumber} remainingItemCount={remainingItemCount} />}
    >
      <ProTable< Rollout >
        key='rollout'
        scroll={{ x: 'max-content' }}
        formRef={formRef}
        actionRef={actionRef}
        options={{
          reload: () => {

            listDeployments();
          }
        }}
        pagination={{
          showQuickJumper: true,
          showSizeChanger: true,
          locale: {
            items_per_page: intl.formatMessage({ id: 'pages.pagination.items_per_page' }),
            jump_to: intl.formatMessage({ id: 'pages.pagination.jump_to' }),
            page: intl.formatMessage({ id: 'pages.pagination.page' }),
          },
        }}
        locale={{
          emptyText: intl.formatMessage({ id: 'pages.not.found.data' })
        }}
        rowKey={(record: Rollout) => `${record?.metadata?.name}-${record.metadata?.resourceVersion}`}
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
                  formRef?.current?.resetFields()
                }}> {resetText} </Button>,
              <Button
                key="search" type="primary" onClick={() => {

                  listDeployments();
                }}> {searchText} </Button>,
            ];
          },
        }}
        toolBarRender={() => [

          <a style={{ color: colorPrimary }} onClick={() => setExpandInfo(!expandInfo)}>{expandInfo ? <FormattedMessage id='cluster.node.shrink' /> : <FormattedMessage id='cluster.node.expand' />}</a>,
          <Access accessible={true} key={'create'}>
            <Button
              type="primary"
              key="create-yaml"
              onClick={() => {
                window.location.href = `${BaseAddress}/create/text`
              }}
            >
              <FormattedMessage id="cluster.resource.create.text" />
            </Button>
            <Button
              type="primary"
              key="create-form"
              onClick={() => {
                window.location.href = `${BaseAddress}/create/form`
              }}
            >
              <FormattedMessage id="cluster.resource.create.form" />
            </Button>
          </Access>,
        ]}
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
              <FormattedMessage id="pages.operation.selected" />{' '}
              <a style={{ fontWeight: 600 }} >
                {selectedRowsState.length}
              </a>{' '}
              <FormattedMessage id="pages.operation.selected.term" defaultMessage="项" /> &nbsp;&nbsp;
            </div>
          }
        >
          <Button
            danger
            onClick={() => {
              Modal.confirm({
                title: intl.formatMessage({ id: 'pages.operation.delete.confirm.title' }),
                content: intl.formatMessage({ id: 'cluster.resource.argoce.Rollout.delete.description' }),
                okText: intl.formatMessage({ id: 'pages.operation.confirm' }),
                cancelText: intl.formatMessage({ id: 'pages.operation.cancel' }),
                onOk: async () => {
                  await handleRemove(intl, selectedRowsState);
                  setSelectedRows([]);
                  actionRef.current?.reloadAndRest?.();
                }
              });
            }}
          >
            <FormattedMessage id="pages.operation.batch.delete" />
          </Button>
        </FooterToolbar>
      )}
      {patchLabelVisible && <PatchLabels setVisible={patchVisibleReflash} patchType='labels' title={<FormattedMessage id='cluster.patch.labels' />} key={patchModalKey} kind="Rollout" address={`apis/apps/v1/namespaces/${patchDeployment?.metadata?.namespace}/rollouts/${patchDeployment?.metadata?.name}`} cluster={cluster} name={patchDeployment?.metadata?.name || ''} visible={patchLabelVisible} labels={patchDeployment?.metadata?.labels || {}} />}
      {patchAnnotationsVisible && <PatchLabels setVisible={patchVisibleReflash} patchType='annotations' title={<FormattedMessage id='cluster.patch.annotations' />} key={'annotations-' + patchModalKey} kind="Rollout" address={`apis/apps/v1/namespaces/${patchDeployment?.metadata?.namespace}/rollouts/${patchDeployment?.metadata?.name}`} cluster={cluster} name={patchDeployment?.metadata?.name || ''} visible={patchAnnotationsVisible} labels={patchDeployment?.metadata?.annotations || {}} />}
      {patchReplicasVisible && <PatchReplicas setVisible={patchVisibleReflash} key={'replicas-' + patchModalKey} kind="Rollout" address={`apis/apps/v1/namespaces/${patchDeployment?.metadata?.namespace}/rollouts/${patchDeployment?.metadata?.name}`} cluster={cluster} name={patchDeployment?.metadata?.name || ''} visible={patchReplicasVisible} replicas={patchDeployment?.spec?.replicas || 0} />}
      {labelSelectorVisible && <FilterSelector title={<FormattedMessage id='cluster.labelSelector' />} key={Date.now().toString()} visible={labelSelectorVisible} labels={searchLabels} setVisible={setLabelSelectorVisible} updateLabels={setSearchLabels} />}
      {fieldSelectorVisible && <FilterSelector title={<FormattedMessage id='cluster.fieldSelector' />} key={Date.now().toString()} visible={fieldSelectorVisible} labels={searchFields} setVisible={setFieldSelectorVisible} updateLabels={setSearchFields} />}
      <Drawer destroyOnHidden={true}
        size={drawerSize}
        resizable={{
          onResize: (newSize) => setDrawerSize(newSize),
        }}
        open={resourceDrawerVisible}
        onClose={() => setResourceDrawerVisible(false)}
        closable={true}
        title={<>{getClusterResource('Rollout')}:&nbsp;&nbsp;{patchDeployment?.metadata?.name}</>}
      >
        <ResourceEditor key={patchDeployment?.metadata?.resourceVersion || 'edit'} edit={editorResource} address={`apis/apps/v1/namespaces/${patchDeployment?.metadata?.namespace}/rollouts/${patchDeployment?.metadata?.name}`} kind='Rollout' name={patchDeployment?.metadata?.name || ''} cluster={cluster} content={patchDeployment} />
      </Drawer>
      <Drawer destroyOnHidden={true}
        size={drawerSize}
        resizable={{
          onResize: (newSize) => setDrawerSize(newSize),
        }}
        open={monitorDrawerVisible}
        onClose={() => setMonitorDrawerVisible(false)}
        closable={true}
        title={<>{getClusterResource('Rollout')}:&nbsp;&nbsp;{patchDeployment?.metadata?.name}&nbsp;<FormattedMessage id='cluster.resource.monitor' /></>}
      >
        {patchDeployment && <Card><RenderWorkloadMetrics cluster={cluster} namespace={patchDeployment.metadata?.namespace || ''} workload={patchDeployment.metadata?.name || ''} workloadType='deployment' /></Card>
        }
      </Drawer>
    </PageContainer>
  );

};

export default IndexDashboard;

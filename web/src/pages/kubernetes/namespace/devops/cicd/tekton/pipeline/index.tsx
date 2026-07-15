import { CloseCircleOutlined, DeleteOutlined, EditOutlined, InboxOutlined, InsertRowBelowOutlined, MoreOutlined, PlayCircleOutlined, UnorderedListOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { FooterToolbar, ModalForm, PageContainer, type ProFormInstance, ProFormSelect, ProFormText, ProFormTextArea, ProTable } from '@ant-design/pro-components';
import { Access, FormattedMessage, useAccess, useIntl } from '@umijs/max';
import { Button, Drawer, Dropdown, Modal, message, Popconfirm, Popover, Space, Tag, Tooltip, Typography, Select, Empty, Divider, Row, Col, Tabs, theme } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
const { Text } = Typography;
import dayjs from 'dayjs';
import type { IntlShape } from 'react-intl';
import type { Pipeline } from '@/k8s-models/tekton/pipeline/tekton.dev/v1beta1';
import Continue from '@/pages/kubernetes/components/continue';
import FilterSelector from '@/pages/kubernetes/components/filter_selector';
import ResourceEditor from '@/pages/kubernetes/components/resource_editor';
import { clusterDeleteProxy, clusterGetProxy, clusterPostProxy } from '@/services/cluster_proxy.api';

import { getClusterResource } from '@/utils/cluster';
import { getClusterApiVersions, getCurrentViewInfo } from '@/utils/global';
import { debounce } from 'lodash';
import { syncClusterNamespace } from '@/services/cluster.api';
import { ClusterNamespaceDetail, ClusterNamespaceDetailList } from '@/services/cluster_namespace';
import { canAccessClusterNamespaces } from '@/services/personal.api';
import { ConfigMapList, PersistentVolumeClaimList, SecretList, ServiceAccountList } from 'kubernetes-models/v1';
import * as yaml from 'js-yaml';
import { saveAs } from 'file-saver';
import { PipelineRun, Task } from '@/k8s-models/tekton/pipeline/tekton.dev/v1';
import { useWatch } from 'antd/es/form/Form';

import AICopilot from '@/pages/kubernetes/components/ai';
import { CncfTekton } from '@/utils/cncf';

const IndexDashboard: React.FC = () => {
  const { token } = theme.useToken();
  const colorPrimary = token.colorPrimary;
  const actionRef = useRef<ActionType>(null);
  const access = useAccess();
  const { cluster, namespace } = getCurrentViewInfo();
  const [selectedRowsState, setSelectedRows] = useState<Pipeline[]>([]);
  const [expandInfo, setExpandInfo] = useState<boolean>(false);
  const [patchPipeline, setPatchPipeline] = useState<Pipeline>();
  const intl = useIntl();
  const [selectedNamespace, setSelectedNamespace] = useState<string>(namespace);
  const [searchName, setSearchName] = useState<string>('');
  const [searchLabels, setSearchLabels] = useState<{ [key: string]: string }>({});
  const [labelSelectorVisible, setLabelSelectorVisible] = useState<boolean>(false);
  const [fieldSelectorVisible, setFieldSelectorVisible] = useState<boolean>(false);
  const [searchFields, setSearchFields] = useState<{ [key: string]: string }>({});
  const [dataSource, setDataSource] = useState<Pipeline[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const formRef = useRef<ProFormInstance>(undefined);
  const resourceGroup = getClusterApiVersions(cluster, ['tekton.dev/v1beta1'], 'Pipeline');
  const address = namespace ? `apis/${resourceGroup?.groupVersion}/namespaces/${namespace}/pipelines` : `apis/${resourceGroup?.groupVersion}/pipelines`;
  let BaseAddress = `/kubernetes/cluster/${cluster}/namespace/${namespace}/devops/cicd/tekton/pipelines`;
  if (!namespace || namespace === '' || namespace === '-') {
    BaseAddress = `/kubernetes/cluster/${cluster}/devops/cicd/tekton/pipelines`;
  }
  const [currnetNumber, setCurrnetNumber] = useState<number>(0);
  const [remainingItemCount, setRemainingItemCount] = useState<number>(0);
  const [resourceDrawerVisible, setResourceDrawerVisible] = useState<boolean>(false);
  const [drawerSize, setDrawerSize] = useState<number>(800);
  const [editorResource, setEditorResource] = useState<boolean>(false);
  const [runModalVisible, setRunModalVisible] = useState<boolean>(false);
  const [serviceAccounts, setServiceAccounts] = useState<string[]>([]);
  const [pvcList, setPvcList] = useState<string[]>([]);
  const [configmapList, setConfigmapList] = useState<string[]>([]);
  const [secretList, setSecretList] = useState<string[]>([]);
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
  const listServiceAccounts = async () => {
    const params = { cluster, address: `api/v1/namespaces/${namespace}/serviceaccounts` } as Record<string, any>;
    const data = (await clusterGetProxy(params)) as ServiceAccountList;
    let names = [] as string[];
    for (let i = 0; i < data.items.length; i++) {
      names.push(data.items[i].metadata?.name!);
    }
    setServiceAccounts(names);
  };
  const listConfigMaps = async () => {
    const params = { cluster, address: `api/v1/namespaces/${namespace}/configmaps` } as Record<string, any>;
    const data = (await clusterGetProxy(params)) as ConfigMapList;
    let names = [] as string[];
    for (let i = 0; i < data.items.length; i++) {
      names.push(data.items[i].metadata?.name!);
    }
    setConfigmapList(names);
  };
  const listSecrets = async () => {
    const params = { cluster, address: `api/v1/namespaces/${namespace}/secrets` } as Record<string, any>;
    const data = (await clusterGetProxy(params)) as SecretList;
    let names = [] as string[];
    for (let i = 0; i < data.items.length; i++) {
      names.push(data.items[i].metadata?.name!);
    }
    setSecretList(names);
  };
  const listPvcs = async () => {
    const params = { cluster, address: `api/v1/namespaces/${namespace}/persistentvolumeclaims` } as Record<string, any>;
    const data = (await clusterGetProxy(params)) as PersistentVolumeClaimList;
    let names = [] as string[];
    for (let i = 0; i < data.items.length; i++) {
      names.push(data.items[i].metadata?.name!);
    }
    setPvcList(names);
  };
  useEffect(() => {
    if (runModalVisible) {
      listServiceAccounts();
      //获取secret，configmap，pvc
      listConfigMaps();
      listSecrets();
      listPvcs();
    }
  }, [runModalVisible]);
  const listPipelines = async () => {
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
        data.items[i].kind = 'Pipeline';
      }
      setDataSource(data.items || []);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    listPipelines();

  }, []);

  const exportResourceAsYaml = async (resource: Pipeline) => {
    if (!resource || !resource.metadata) { return; }
    const taskResourceGroup = getClusterApiVersions(cluster, ['tekton.dev/v1'], 'Task');
    const taskParams = { cluster, address: `apis/${taskResourceGroup?.groupVersion}/namespaces/${resource.metadata?.namespace}/tasks` } as Record<string, any>;
    const data = await clusterGetProxy(taskParams);
    let taskMap = {} as Record<string, string>;
    for (let i = 0; i < data.items.length; i++) {
      data.items[i].apiVersion = data.apiVersion;
      data.items[i].kind = 'Task';
      if (data.items[i].metadata.annotations) {
        delete data.items[i].metadata.annotations['kubectl.kubernetes.io/last-applied-configuration'];
      }
      delete data.items[i].metadata.resourceVersion;
      delete data.items[i].metadata.uid;
      delete data.items[i].metadata.creationTimestamp;
      delete data.items[i].metadata.generation;
      delete data.items[i].metadata.managedFields;
      delete data.items[i].metadata.namespace;
      taskMap[data.items[i].metadata.name] = yaml.dump(data.items[i]);
    }
    let yamlList = [] as string[];
    let taskList = [] as string[];
    for (let i = 0; i < resource.spec!.tasks!.length; i++) {
      if (resource.spec!.tasks![i].taskRef && resource.spec!.tasks![i].taskRef!.name) {
        const taskName = resource.spec!.tasks![i].taskRef!.name;
        if (taskName && !taskList.includes(taskName)) {
          taskList.push(taskName);
        }
      }
    }
    for (let i = 0; i < taskList.length; i++) {
      if (taskMap[taskList[i]]) {
        yamlList.push(taskMap[taskList[i]]);
      }
    }
    if (resource.metadata.annotations) {
      delete resource.metadata.annotations['kubectl.kubernetes.io/last-applied-configuration'];
    }
    delete resource.metadata.resourceVersion;
    delete resource.metadata.uid;
    delete resource.metadata.creationTimestamp;
    delete resource.metadata.generation;
    delete resource.metadata.managedFields;
    delete resource.metadata.namespace;
    yamlList.push(yaml.dump(resource));
    const dataBlob = new Blob([yamlList.join('---\n')], { type: 'application/json' });
    saveAs(dataBlob, `pipeline-${resource.metadata!.name}.yaml`);
  }
  const handleRemove = async (intl: IntlShape, selectedRows: Pipeline[]) => {
    if (!selectedRows) return true;
    // 批量删除
    selectedRows.forEach(async (entity: Pipeline) => {
      const params = {

        cluster,
        address: `apis/${resourceGroup?.groupVersion}/namespaces/${entity.metadata?.namespace}/pipelines/${entity.metadata?.name}`,
      };
      await clusterDeleteProxy(params);
    });
    message.success(intl.formatMessage({ id: 'cluster.pages.operation.success' }));
    actionRef.current?.reload();
    return true;
  };
  const moreItems = (record: Pipeline) => {
    const nodes = [
      {
        key: 'view-yaml',
        label: (
          <a
            onClick={() => {
              setPatchPipeline(record);
              setResourceDrawerVisible(true);
            }}
            style={{ color: colorPrimary }}
          >
            <FormattedMessage id="cluster.view.yaml" />
          </a>
        ),
      },
    ];
    if (!record?.metadata?.ownerReferences) {
      nodes.push({
        key: 'edit-yaml',
        label: (
          <a
            onClick={() => {
              setPatchPipeline(record);
              setEditorResource(true);
              setResourceDrawerVisible(true);
            }}
            style={{ color: colorPrimary }}
          >
            <FormattedMessage id="cluster.edit.yaml" />
          </a>
        ),
      });
    }
    nodes.push({
      key: 'export-yaml',
      label: (
        <a
          onClick={() => {
            setPatchPipeline(record);
            exportResourceAsYaml(record)
          }}
          style={{ color: colorPrimary }}
        >
          <FormattedMessage id="model.export" />
        </a>
      ),
    });
    return nodes;
  };
  const columns: ProColumns<Pipeline>[] = [
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
                  `/kubernetes/cluster/${cluster}/namespace/${entity?.metadata?.namespace}/devops/cicd/tekton/pipelines`,
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
                if (namespace) {
                  window.location.href = `/kubernetes/cluster/${cluster}/namespace/${entity.metadata?.namespace}/devops/cicd/tekton/pipelines/lego/detail/${entity.metadata?.name}`;

                } else {
                  window.open(
                    `/kubernetes/cluster/${cluster}/namespace/${entity.metadata?.namespace}/devops/cicd/tekton/pipelines/lego/detail/${entity.metadata?.name}`,
                    '_blank',
                  );
                }
              }}
            >
              {entity?.metadata?.name}
            </a>
          </>
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'cluster.resource.description' }),
      dataIndex: 'description',
      search: false,
      render: (dom, entity) => {
        if (entity?.spec?.displayName) {
          return (
            <>
              <Tooltip color={colorPrimary} title={entity?.spec?.description}>
                <a>{entity?.spec?.displayName}</a>
              </Tooltip>
            </>
          );
        } else {
          return (
            <>
              <>{entity?.spec?.description}</>
            </>
          );
        }
      },
    },
    {
      title: intl.formatMessage({ id: 'tekton.parameter.number' }),
      dataIndex: 'parameter.number',
      search: false,
      render: (dom, entity) => {
        return (
          <>
            <>{entity?.spec?.params?.length}</>
          </>
        );
      },
    },

    {
      title: intl.formatMessage({ id: 'cluster.resource.labels' }),
      renderFormItem: (item, { defaultRender }) => {
        const labels = [] as string[];
        const keys = Object.keys(searchLabels);
        if (keys.length > 0) {
          for (const key in searchLabels) {
            labels.push(`${key}=${searchLabels[key]}`);
          }
        }
        return (
          <Space>
            <div
              onClick={() => {
                if (labelSelectorVisible) {
                  setLabelSelectorVisible(false);
                }
                setLabelSelectorVisible(true);
              }}
            >
              <Popover
                placement="top"
                title={
                  <div>
                    <span style={{ color: colorPrimary, fontSize: '10px' }}>

                      <FormattedMessage id="cluster.labelSelector.click" />
                    </span>
                    <Space orientation='vertical' size='small'>
                      {keys?.map((key: string) => (
                        <>
                          <Tag style={{ border: 0 }} key={key}>
                            {key}={searchLabels[key]}
                          </Tag>
                        </>
                      ))}
                    </Space>
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
                onClick={() => setSearchLabels({})}
              />
            )}
          </Space>
        );
      },
      render: (dom, entity: Pipeline) => {
        const keys = Object.keys(entity?.metadata?.labels || {});
        if (keys.length === 0) {
          return <span>-</span>;
        }
        if (expandInfo) {
          return (
            <Space orientation='vertical' size='small'>
              {Object.keys(entity?.metadata?.labels || {})?.map(
                (key: string) => (
                  <>
                    <Tag style={{ border: 0 }} key={key}>
                      {key}={entity?.metadata?.labels[key]}
                    </Tag>
                  </>
                ),
              )}
            </Space>
          );
        } else {
          return (
            <Popover
              placement="right"
              title={
                <div>
                  {keys?.map((key: string) => (
                    <>
                      <Tag style={{ border: 0 }} key={key}>
                        {key}={entity?.metadata?.labels[key]}
                      </Tag>
                      <br />
                    </>
                  ))}
                </div>
              }
            >
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
      title: intl.formatMessage({ id: 'cluster.resource.creationTimestamp' }),
      search: false,
      render: (dom, entity: Pipeline) => {
        return (
          <span>
            {dayjs(entity.metadata?.creationTimestamp).format(
              'YYYY-MM-DD HH:mm:ss',
            )}
          </span>
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
            key={record.metadata?.resourceVersion + '-delete'}
            description={intl.formatMessage({
              id: 'tekton.pipeline.delete.description',
            })}
            title={
              intl.formatMessage({ id: 'pages.operation.delete.description' }) +
              getClusterResource('Pipeline') + `【${record.metadata?.name}】`
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
        if (namespace) {
          nodes.push(<a
            onClick={() => {
              setPatchPipeline(record);
              setRunModalVisible(true);
            }}
          ><PlayCircleOutlined style={{ color: colorPrimary }} /></a>)
        }
        if (!record?.metadata?.ownerReferences) {
          nodes.unshift(
            <a
              key="edit"
              onClick={() => {
                if (namespace) {
                  window.location.href = `/kubernetes/cluster/${cluster}/namespace/${record.metadata?.namespace}/devops/cicd/tekton/pipelines/lego/update/${record.metadata?.name}`;

                } else {
                  window.open(
                    `/kubernetes/cluster/${cluster}/namespace/${record.metadata?.namespace}/devops/cicd/tekton/pipelines/lego/update/${record.metadata?.name}`,
                    '_blank',
                  );
                }
              }}
            >
              <EditOutlined style={{ color: colorPrimary }} />
            </a>,
          );
        }
        nodes.push(
          <Dropdown menu={{ items: moreItems(record) }} key="more">
            <a
              style={{ color: colorPrimary }}
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <Space>
                <MoreOutlined style={{ color: colorPrimary }} />
              </Space>
            </a>
          </Dropdown>,
        );
        return <Space>{nodes}</Space>;
      },
    },
  ];
  const generatePipelineRunCreateParamsForm = (pipeline: Pipeline | undefined) => {
    const elements = [] as React.ReactNode[];
    if (!pipeline || !pipeline.spec?.params) { return elements; }
    for (let i = 0; i < pipeline.spec?.params?.length; i++) {
      const param = pipeline.spec?.params[i];
      if (param?.type === 'string') {
        elements.push(<Col lg={12} md={12} sm={24}><ProFormText name={`${param.name}`}
          label={param.description}
        ></ProFormText></Col>)
      } else if (param?.type === 'array') {
        elements.push(<Col lg={12} md={12} sm={24}><ProFormTextArea
          name={`${param.name}`}
          label={param.description}
          placeholder={intl.formatMessage({ id: 'tekton.pipeline.param.type.array.placeholder' })}
        ></ProFormTextArea></Col>)
      } else if (param?.type === 'object') {
        elements.push(<Col lg={12} md={12} sm={24}><ProFormTextArea
          name={`${param.name}`}
          label={param.description}
          placeholder={intl.formatMessage({ id: 'tekton.pipeline.param.type.object.placeholder' })}
        ></ProFormTextArea></Col>)
      }
    }
    return elements;
  }
  const getInitValues = (pipeline: Pipeline | undefined) => {
    const values = {} as any;
    if (!pipeline) { return values; }
    if (patchPipeline?.spec?.params) {
      for (let i = 0; i < patchPipeline.spec?.params?.length; i++) {
        const param = patchPipeline.spec?.params[i];

        if (param.default) {
          if (param.type === 'string') {
            values[`${param.name}`] = param.default;
          } else {
            try {
              values[`${param.name}`] = JSON.stringify(param.default);
            } catch (error) {
              console.log('error', error);
            }
          }
        }
      }
    }
    return values;
  }

  const WorkspaceFormItem = ({ workspace }: { workspace: { name: string } }) => {
    const wsName = String(workspace.name);
    const type = useWatch(['workspaces', wsName, 'type']);
    let labelId = 'tekton.pipelinerun.workspaces.type.configmap'
    if (type === 'configmap') {
      labelId = 'tekton.pipelinerun.workspaces.type.configmap'
    } else if (type === 'secret') {
      labelId = 'tekton.pipelinerun.workspaces.type.secret'
    } else if (type === 'pvc') {
      labelId = 'tekton.pipelinerun.workspaces.type.pvc'
    }
    const message = `${intl.formatMessage({ id: 'pages.select.text.tips' })}${intl.formatMessage({ id: labelId })}`;
    const getOptions = (type: string) => {
      if (type === 'configmap') {
        return configmapList.map((item: string) => ({ label: item, value: item }));
      } else if (type === 'secret') {
        return secretList.map((item: string) => ({ label: item, value: item }));
      } else if (type === 'pvc') {
        return pvcList.map((item: string) => ({ label: item, value: item }));
      }
      return [];
    }
    return (
      <>
        <Divider orientation='horizontal'>{wsName}</Divider>
        <Row gutter={[16, 16]}>
          <Col lg={8} md={8} sm={24}>
            <ProFormSelect
              name={['workspaces', wsName, 'type']}
              label={intl.formatMessage({ id: 'tekton.pipelinerun.workspaces.type' })}
              options={[
                { label: intl.formatMessage({ id: 'tekton.pipelinerun.workspaces.type.configmap' }), value: 'configmap' },
                { label: intl.formatMessage({ id: 'tekton.pipelinerun.workspaces.type.secret' }), value: 'secret' },
                { label: intl.formatMessage({ id: 'tekton.pipelinerun.workspaces.type.pvc' }), value: 'pvc' },
              ]}
            />
          </Col>

          <Col lg={8} md={8} sm={24}>
            {type && (
              <ProFormSelect
                key={type}
                name={['workspaces', wsName, 'selectedName']}
                label={intl.formatMessage({ id: labelId })}
                rules={[{ required: true, message }]}
                // options 根据 type 动态设置
                options={getOptions(type)}
              />
            )}
          </Col>
          <Col lg={8} md={8} sm={24}>
            <ProFormText
              name={['workspaces', wsName, 'subPath']}
              label={intl.formatMessage({ id: 'tekton.task.workspaces.subPath' })}
            />
          </Col>
        </Row>
      </>
    );
  };
  const generatePipelineRunCreateWorkspacesForm = (pipeline: Pipeline | undefined) => {
    if (!pipeline?.spec?.workspaces) return null;
    return pipeline.spec.workspaces.map(ws => (
      <WorkspaceFormItem key={ws.name} workspace={ws} />
    ));
  };

  return (
    <PageContainer
      header={{ breadcrumb: {} }}
      title={intl.formatMessage({ id: 'menu.DevOps.Tekton.pipeline' })}
      subTitle="Pipeline"
      content={<Continue current={currnetNumber} remainingItemCount={remainingItemCount} />}
    >
      <ProTable<Pipeline>
        key='pipeline'
        scroll={{ x: 'max-content' }}
        actionRef={actionRef}
        rowKey={(record: Pipeline) =>
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

                  listPipelines();
                }}
              >
                {searchText}
              </Button>,
            ];
          },
        }}
        options={{
          reload: () => {

            listPipelines();
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
              {expandInfo ? (
                <FormattedMessage id="cluster.node.shrink" />
              ) : (
                <FormattedMessage id="cluster.node.expand" />
              )}
            </a>
            {namespace ? <Access accessible={true} key={'create'}>
              <Button
                type="primary"
                key="lego-create"
                size='small'
                onClick={() => {
                  window.location.href = `${BaseAddress}/lego/create`;
                }}
              >
                <FormattedMessage id="cluster.resource.create.drag" />
              </Button>
            </Access> : null}
            <Access accessible={true} key={'create'}>
              <Button
                type="primary"
                key="yaml-create"
                size='small'
                onClick={() => {
                  window.location.href = `${BaseAddress}/create/text`;
                }}
              >
                <FormattedMessage id="cluster.resource.create.text" />
              </Button>
            </Access>
          </Space>,
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
              <a style={{ fontWeight: 600 }}>
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
                  id: 'tekton.pipeline.delete.description',
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
            {getClusterResource('Pipeline')}:&nbsp;&nbsp;
            {patchPipeline?.metadata?.name}
          </>
        }
      >
        <ResourceEditor
          key={patchPipeline?.metadata?.resourceVersion || 'edit'}
          edit={editorResource}
          address={`apis/${resourceGroup?.groupVersion}/namespaces/${patchPipeline?.metadata?.namespace}/pipelines/${patchPipeline?.metadata?.name}`}
          kind="Pipeline"
          name={patchPipeline?.metadata?.name || ''}

          cluster={cluster}
          content={patchPipeline}
        />
      </Drawer>
      <ModalForm
        width="60vw"
        title={intl.formatMessage({ id: 'tekton.pipelinerun.create' })}
        open={runModalVisible}
        onOpenChange={setRunModalVisible}
        key={`${patchPipeline?.metadata?.resourceVersion}-run-modal`}
        initialValues={getInitValues(patchPipeline)}
        onFinish={async (values: Record<string, any>) => {
          let pipelineRun = { spec: {} } as PipelineRun;
          const timeout = values['timeout'];
          const serviceAccountName = values['serviceAccountName'];
          if (values['timeout']) {
            delete values['timeout'];
          }
          if (values['serviceAccountName']) {
            delete values['serviceAccountName'];
          }
          if (values['workspaces']) {
            const workspaceInfo = values['workspaces'] as Record<string, { selectedName: string, type: string, subPath: string }>;
            delete values['workspaces'];
            const keys = Object.keys(workspaceInfo);
            pipelineRun.spec!.workspaces = []
            for (let i = 0; i < keys.length; i++) {
              const wsItem = workspaceInfo[keys[i]];
              if (wsItem.type === 'configmap') {
                pipelineRun.spec?.workspaces.push({
                  name: keys[i],
                  configMap: {
                    name: wsItem.selectedName,
                  },
                  subPath: wsItem.subPath,
                })
              } else if (wsItem.type === 'secret') {
                pipelineRun.spec?.workspaces.push({
                  name: keys[i],
                  secret: {
                    secretName: wsItem.selectedName,
                  },
                  subPath: wsItem.subPath,
                })
              } else if (wsItem.type === 'pvc') {
                pipelineRun.spec?.workspaces.push({
                  name: keys[i],
                  persistentVolumeClaim: {
                    claimName: wsItem.selectedName,
                  },
                  subPath: wsItem.subPath,
                })
              }
            }
          }
          pipelineRun.metadata = { name: `${patchPipeline?.metadata?.name}-run-${Date.now()}` };
          pipelineRun.spec = {
            pipelineRef: { name: patchPipeline?.metadata?.name },
            params: [],
          }
          if (serviceAccountName) {
            pipelineRun.spec.taskRunTemplate = {}
            pipelineRun.spec.taskRunTemplate.serviceAccountName = serviceAccountName;
          }
          if (timeout) {
            pipelineRun.spec.timeouts = {};
            pipelineRun.spec.timeouts.pipeline = timeout;
          }
          const paramMap = {} as Record<string, string>;
          if (patchPipeline?.spec?.params) {
            for (let i = 0; i < patchPipeline?.spec?.params?.length; i++) {
              if (patchPipeline?.spec?.params[i].name) {
                paramMap[patchPipeline.spec.params[i].name!] = patchPipeline?.spec?.params[i].type;
              }
            }
          }
          for (let [key, value] of Object.entries(values)) {
            if (paramMap[key] !== 'string') {
              try {
                value = JSON.parse(value);
                pipelineRun.spec.params.push({ name: key, value: value })
              } catch (error) {
              }
            } else {
              pipelineRun.spec.params.push({ name: key, value: value })
            }
          }
          const pipelineRunResourceGroup = getClusterApiVersions(cluster, ['tekton.dev/v1'], 'PipelineRun');
          pipelineRun.kind = 'PipelineRun';
          pipelineRun.apiVersion = `${pipelineRunResourceGroup?.groupVersion}`;
          await clusterPostProxy({ cluster, address: `apis/${pipelineRunResourceGroup?.groupVersion}/namespaces/${namespace}/pipelineruns` }, pipelineRun);
          window.location.href = `/kubernetes/cluster/${cluster}/namespace/${namespace}/devops/cicd/tekton/pipelineruns`
        }}
        modalProps={{ maskClosable: true, destroyOnHidden: true, forceRender: true }}
      >
        <Tabs
          items={[
            {
              key: 'params',
              label: intl.formatMessage({ id: 'tekton.pipelinerun.params' }),
              children: <>
                <Row gutter={64}>
                  <Col lg={12} md={12} sm={24}>
                    <ProFormSelect
                      name='serviceAccountName'
                      label={intl.formatMessage({ id: 'tekton.pipelinerun.serviceAccountName' })}
                      options={serviceAccounts.map((sa) => ({ label: sa, value: sa }))}
                    />
                  </Col>
                  <Col lg={12} md={12} sm={24}>
                    <ProFormText
                      name="timeout"
                      label={intl.formatMessage({ id: 'tekton.pipeline.task.timeout' })}

                      rules={[
                        {
                          message: intl.formatMessage({ id: 'tekton.pipeline.timeout.format.invalid' }),
                          pattern: /^(?:[1-9]\d*[smh]?)?$/,
                        },
                      ]}
                      placeholder={intl.formatMessage({ id: 'tekton.pipeline.timeout.format.placeholder' })}
                    />
                  </Col>
                  {generatePipelineRunCreateParamsForm(patchPipeline)}
                </Row>
              </>,
            },
            {
              key: 'workspaces',
              label: intl.formatMessage({ id: 'tekton.pipelinerun.workspaces' }),
              children: <>
                {patchPipeline?.spec?.workspaces && patchPipeline?.spec?.workspaces?.length > 0
                  && generatePipelineRunCreateWorkspacesForm(patchPipeline)}
              </>
            }

          ]}
        />

      </ModalForm>
      <AICopilot
        view='list'
        cluster={cluster}
        namespace={namespace || ''}
        kind="Pipeline"
        cncf={CncfTekton}
        questions={[{ mode: 'agent', skill: 'k8s-default', question: intl.formatMessage({ id: 'copilot.cluster.resource.describe' }) }]}
        apiVersion={resourceGroup.groupVersion}
      />
    </PageContainer>
  );
};

export default IndexDashboard;

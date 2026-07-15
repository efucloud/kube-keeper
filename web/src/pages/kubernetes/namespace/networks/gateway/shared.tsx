import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import { Button, Card, Empty, Popconfirm, Space, Tag, message } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import ResourceJsonOrYamlForm from '@/pages/kubernetes/components/resource_form';
import type { KubernetesResource, KubernetesResourceList } from '@/services/common';
import { clusterDeleteProxy, clusterGetProxy } from '@/services/cluster_proxy.api';
import { getClusterApiVersions, getCurrentViewInfo } from '@/utils/global';
import { formatResourceKind } from '@/pages/kubernetes/utils/resourceKind';
import type { GatewayResourceConfig } from './resources';

const getBaseAddress = (config: GatewayResourceConfig, cluster: string, namespace = '') => {
  if (config.scope === 'cluster') {
    return `/kubernetes/cluster/${cluster}/networks/gateway/${config.routeSegment}`;
  }
  if (namespace && namespace !== '-') {
    return `/kubernetes/cluster/${cluster}/namespace/${namespace}/networks/gateway/${config.routeSegment}`;
  }
  return `/kubernetes/cluster/${cluster}/networks/gateway/${config.routeSegment}`;
};

const getItemBaseAddress = (config: GatewayResourceConfig, cluster: string, namespace = '', itemNamespace = '') => {
  if (config.scope === 'cluster') {
    return getBaseAddress(config, cluster);
  }
  const targetNamespace = namespace && namespace !== '-' ? namespace : itemNamespace;
  if (targetNamespace) {
    return `/kubernetes/cluster/${cluster}/namespace/${targetNamespace}/networks/gateway/${config.routeSegment}`;
  }
  return `/kubernetes/cluster/${cluster}/networks/gateway/${config.routeSegment}`;
};

const getBaseApi = (config: GatewayResourceConfig, groupVersion: string, namespace = '') => {
  if (config.scope === 'cluster') {
    return `apis/${groupVersion}/${config.plural}`;
  }
  if (namespace && namespace !== '-') {
    return `apis/${groupVersion}/namespaces/${namespace}/${config.plural}`;
  }
  return `apis/${groupVersion}/${config.plural}`;
};

const getItemApi = (config: GatewayResourceConfig, groupVersion: string, resource: KubernetesResource) => {
  if (config.scope === 'cluster') {
    return `apis/${groupVersion}/${config.plural}/${resource.metadata?.name || ''}`;
  }
  return `apis/${groupVersion}/namespaces/${resource.metadata?.namespace || ''}/${config.plural}/${resource.metadata?.name || ''}`;
};

const getStatusText = (resource?: KubernetesResource) => {
  const conditions = resource?.status?.conditions;
  if (Array.isArray(conditions) && conditions.length > 0) {
    const current = conditions.find((item: any) => item.status === 'True') || conditions[0];
    if (current?.type && current?.status) {
      return `${current.type}:${current.status}`;
    }
    if (current?.type) return current.type;
  }
  if (resource?.status?.phase) return String(resource.status.phase);
  if (resource?.status?.reason) return String(resource.status.reason);
  return '-';
};

export const GatewayResourceListPage: React.FC<{ config: GatewayResourceConfig }> = ({ config }) => {
  const intl = useIntl();
  const resourceLabel = formatResourceKind(intl, config.kind);
  const actionRef = useRef<ActionType>(null);
  const { cluster, namespace = '' } = getCurrentViewInfo();
  const resourceGroup = useMemo(
    () => getClusterApiVersions(cluster, config.apiVersions, config.kind),
    [cluster, config.apiVersions, config.kind],
  );
  const baseApi = getBaseApi(config, resourceGroup.groupVersion, namespace);
  const baseAddress = getBaseAddress(config, cluster, namespace);
  const [dataSource, setDataSource] = useState<KubernetesResource[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = (await clusterGetProxy({ cluster, address: baseApi })) as KubernetesResourceList & { apiVersion?: string };
      setDataSource((data.items || []).map((item) => ({
        ...item,
        apiVersion: item.apiVersion || resourceGroup.groupVersion,
        kind: item.kind || config.kind,
      })));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [baseApi, cluster, resourceGroup.groupVersion]);

  const columns: ProColumns<KubernetesResource>[] = [
    {
      title: intl.formatMessage({ id: 'cluster.namespace' }),
      hideInTable: config.scope === 'cluster' || !!namespace,
      search: false,
      render: (_, entity) => (
        <a onClick={() => (window.location.href = getItemBaseAddress(config, cluster, namespace, entity.metadata?.namespace || ''))}>
          {entity.metadata?.namespace}
        </a>
      ),
    },
    {
      title: intl.formatMessage({ id: 'cluster.resource.name' }),
      dataIndex: 'name',
      render: (_, entity) => (
        <a onClick={() => (window.location.href = `${getItemBaseAddress(config, cluster, namespace, entity.metadata?.namespace || '')}/${entity.metadata?.name || ''}/update`)}>
          {entity.metadata?.name}
        </a>
      ),
    },
    {
      title: intl.formatMessage({ id: 'cluster.resource.status' }),
      search: false,
      render: (_, entity) => getStatusText(entity),
    },
    {
      title: intl.formatMessage({ id: 'cluster.resource.labels' }),
      search: false,
      render: (_, entity) => (
        <Space wrap>
          {Object.entries(entity.metadata?.labels || {}).map(([key, value]) => (
            <Tag key={key} style={{ border: 0 }}>{key}={String(value)}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: intl.formatMessage({ id: 'cluster.resource.creationTimestamp' }),
      search: false,
      render: (_, entity) => entity.metadata?.creationTimestamp ? dayjs(entity.metadata.creationTimestamp).format('YYYY-MM-DD HH:mm:ss') : '-',
    },
    {
      title: intl.formatMessage({ id: 'pages.operation' }),
      search: false,
      render: (_, record) => (
        <Space>
          <a onClick={() => (window.location.href = `${getItemBaseAddress(config, cluster, namespace, record.metadata?.namespace || '')}/${record.metadata?.name || ''}/update`)}>
            <EditOutlined />
          </a>
          <Popconfirm
            title={`${intl.formatMessage({ id: 'pages.operation.delete.description' })}【${record.metadata?.name || ''}】`}
            onConfirm={async () => {
              await clusterDeleteProxy({ cluster, address: getItemApi(config, resourceGroup.groupVersion, record) });
              message.success(intl.formatMessage({ id: 'cluster.operation.success' }));
              load();
            }}
            okText={intl.formatMessage({ id: 'pages.operation.confirm' })}
            cancelText={intl.formatMessage({ id: 'pages.operation.cancel' })}
          >
            <DeleteOutlined style={{ color: 'red' }} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer
      header={{ breadcrumb: {} }}
      title={intl.formatMessage({ id: 'menu.network.gateway' })}
      subTitle={resourceLabel}
    >
      <ProTable<KubernetesResource>
        actionRef={actionRef}
        rowKey={(record) => `${record.metadata?.namespace || 'cluster'}-${record.metadata?.name || ''}-${record.metadata?.resourceVersion || 'latest'}`}
        loading={loading}
        dataSource={dataSource}
        columns={columns}
        options={{ reload: () => load() }}
        locale={{
          emptyText: <Empty description={intl.formatMessage({ id: 'pages.no.data' })} image={Empty.PRESENTED_IMAGE_SIMPLE} />,
        }}
        toolBarRender={() => [
          <Space key="actions">
            <Button onClick={() => (window.location.href = `${baseAddress}/create/text`)}>
              {intl.formatMessage({ id: 'cluster.resource.create.text' })}
            </Button>
          </Space>,
        ]}
      />
    </PageContainer>
  );
};

export const GatewayResourceTextPage: React.FC<{ config: GatewayResourceConfig }> = ({ config }) => {
  const intl = useIntl();
  const resourceLabel = formatResourceKind(intl, config.kind);
  const params = useParams();
  const create = params.action !== 'update';
  const name = create ? '' : (params.name || '');
  const { cluster, namespace = '' } = getCurrentViewInfo();
  const resourceGroup = useMemo(
    () => getClusterApiVersions(cluster, config.apiVersions, config.kind),
    [cluster, config.apiVersions, config.kind],
  );
  const baseApi = getBaseApi(config, resourceGroup.groupVersion, namespace);
  const baseAddress = getBaseAddress(config, cluster, namespace);
  const [info, setInfo] = useState<KubernetesResource>();

  useEffect(() => {
    const load = async () => {
      if (create || !name) return;
      const res = (await clusterGetProxy({ cluster, address: `${baseApi}/${name}` })) as KubernetesResource;
      setInfo(res);
    };
    load();
  }, [baseApi, cluster, create, name]);

  return (
    <PageContainer
      header={{ breadcrumb: {}, onBack: () => window.history.back() }}
      title={create ? intl.formatMessage({ id: 'tenant.resource.action.createYaml' }) : intl.formatMessage({ id: 'tenant.resource.action.editYaml' })}
      subTitle={resourceLabel}
    >
      <Card>
        {!create && info?.apiVersion ? (
          <ResourceJsonOrYamlForm
            apiVersion={info.apiVersion}
            key={`${config.kind}-update`}
            kind={config.kind}
            scope={config.scope}
            create={false}
            requestAPI={`${baseApi}/${name}`}
            listPage={baseAddress}
            detailPage={baseAddress}
            namespace={config.scope === 'namespace' ? namespace || '' : ''}
            name={info?.metadata?.name || ''}
            
            cluster={cluster}
            content={info || {}}
          />
        ) : null}
        {create ? (
          <ResourceJsonOrYamlForm
            apiVersion={resourceGroup.groupVersion}
            key={`${config.kind}-create`}
            kind={config.kind}
            scope={config.scope}
            create={true}
            requestAPI={baseApi}
            listPage={baseAddress}
            detailPage={baseAddress}
            namespace={config.scope === 'namespace' ? namespace || '' : ''}
            name=""
            
            cluster={cluster}
            content={{}}
          />
        ) : null}
        {!create && !info ? <Empty /> : null}
      </Card>
    </PageContainer>
  );
};

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Button, Empty, Popconfirm, Space, Tag, message } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { IVirtualMachineClone } from '@/k8s-models/kubevirt/clone.kubevirt.io/v1beta1';
import type { IKubeVirtResourceList } from '@/k8s-models/kubevirt';
import { clusterDeleteProxy, clusterGetProxy } from '@/services/cluster_proxy.api';
import { getClusterApiVersions, getCurrentViewInfo } from '@/utils/global';
import { formatResourceKind } from '@/pages/kubernetes/utils/resourceKind';
import { buildKubeVirtBaseAddress, buildKubeVirtCollectionApi } from '@/pages/kubernetes/utils/kubevirtPath';

const IndexPage: React.FC = () => {
  const intl = useIntl();
  const resourceLabel = formatResourceKind(intl, 'VirtualMachineClone');
  const actionRef = useRef<ActionType>(null);
  const { cluster, namespace } = getCurrentViewInfo();
  const resourceGroup = useMemo(
    () => getClusterApiVersions(cluster, ['clone.kubevirt.io/v1beta1', 'clone.kubevirt.io/v1alpha1'], 'VirtualMachineClone'),
    [cluster],
  );
  const baseApi = buildKubeVirtCollectionApi(resourceGroup.groupVersion, 'virtualmachineclones', namespace);
  const baseAddress = buildKubeVirtBaseAddress(cluster, 'virtualmachineclones', namespace);
  const [dataSource, setDataSource] = useState<IVirtualMachineClone[]>([]);
  const [loading, setLoading] = useState(false);

  const getStatusText = (resource?: IVirtualMachineClone) => {
    const conditions = resource?.status?.conditions;
    if (Array.isArray(conditions) && conditions.length > 0) {
      const current = conditions.find((item: any) => item.status === 'True') || conditions[0];
      if (current?.type) return current.type;
    }
    if (resource?.status?.printableStatus) return String(resource.status.printableStatus);
    if (resource?.status?.phase) return String(resource.status.phase);
    return '-';
  };

  const load = async () => {
    setLoading(true);
    try {
      const data = (await clusterGetProxy({ cluster, address: baseApi })) as IKubeVirtResourceList;
      setDataSource(((data.items || []) as IVirtualMachineClone[]).map((item) => ({
        ...item,
        apiVersion: item.apiVersion || resourceGroup.groupVersion,
        kind: item.kind || 'VirtualMachineClone',
      })));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [baseApi]);

  const columns: ProColumns<IVirtualMachineClone>[] = [
    {
      title: intl.formatMessage({ id: 'cluster.resource.name' }),
      dataIndex: 'name',
      render: (_, entity) => (
        <a onClick={() => (window.location.href = baseAddress + '/' + (entity.metadata?.name || ''))}>
          {entity.metadata?.name}
        </a>
      ),
    },
    {
      title: intl.formatMessage({ id: 'cluster.resource.namespace' }),
      search: false,
      render: (_, entity) => entity.metadata?.namespace || '-',
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
          <a onClick={() => (window.location.href = baseAddress + '/' + (record.metadata?.name || '') + '/update')}>
            <EditOutlined />
          </a>
          <Popconfirm
            title={intl.formatMessage({ id: 'pages.operation.delete.description' }) + '【' + (record.metadata?.name || '') + '】'}
            onConfirm={async () => {
              await clusterDeleteProxy({ cluster, address: `${buildKubeVirtCollectionApi(resourceGroup.groupVersion, 'virtualmachineclones', namespace || record.metadata?.namespace || '')}/${record.metadata?.name || ''}` });
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
    <PageContainer header={{ breadcrumb: {} }} title={resourceLabel} subTitle={resourceLabel}>
      <ProTable<IVirtualMachineClone>
        actionRef={actionRef}
        rowKey={(record) => (record.metadata?.namespace || 'cluster') + '-' + (record.metadata?.name || '') + '-' + (record.metadata?.resourceVersion || 'latest')}
        loading={loading}
        dataSource={dataSource}
        columns={columns}
        options={{ reload: () => load() }}
        locale={{
          emptyText: <Empty description={intl.formatMessage({ id: 'pages.no.data' })} image={Empty.PRESENTED_IMAGE_SIMPLE} />,
        }}
        toolBarRender={() => [
          <Space>
            <Button onClick={() => (window.location.href = baseAddress + '/create/text')}>
              {intl.formatMessage({ id: 'cluster.resource.create.text' })}
            </Button>
          </Space>,
        ]}
      />
    </PageContainer>
  );
};

export default IndexPage;

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import { Button, Card, Descriptions, Empty, Popconfirm, Space, Tabs, Tag, message } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useMemo, useState } from 'react';
import * as yaml from 'js-yaml';
import type { IVirtualMachinePool } from '@/k8s-models/kubevirt/pool.kubevirt.io/v1alpha1';
import { clusterDeleteProxy } from '@/services/cluster_proxy.api';
import { getClusterApiVersions, getCurrentViewInfo } from '@/utils/global';
import { formatResourceKind } from '@/pages/kubernetes/utils/resourceKind';
import { buildKubeVirtBaseAddress, buildKubeVirtCollectionApi, resolveKubeVirtResourceByName } from '@/pages/kubernetes/utils/kubevirtPath';
import ReadOnlyYamlEditor from '@/pages/kubernetes/components/read_only_yaml_editor';

const DetailPage: React.FC = () => {
  const intl = useIntl();
  const resourceLabel = formatResourceKind(intl, 'VirtualMachinePool');
  const { name } = useParams();
  const { cluster, namespace } = getCurrentViewInfo();
  const resourceGroup = useMemo(
    () => getClusterApiVersions(cluster, ['pool.kubevirt.io/v1alpha1'], 'VirtualMachinePool'),
    [cluster],
  );
  const baseAddress = buildKubeVirtBaseAddress(cluster, 'virtualmachinepools', namespace);
  const [info, setInfo] = useState<IVirtualMachinePool>();
  const [resolvedNamespace, setResolvedNamespace] = useState(namespace || '');
  const baseApi = buildKubeVirtCollectionApi(resourceGroup.groupVersion, 'virtualmachinepools', resolvedNamespace);

  const getStatusText = (resource?: IVirtualMachinePool) => {
    const conditions = resource?.status?.conditions;
    if (Array.isArray(conditions) && conditions.length > 0) {
      const current = conditions.find((item: any) => item.status === 'True') || conditions[0];
      if (current?.type) return current.type;
    }
    if (resource?.status?.printableStatus) return String(resource.status.printableStatus);
    if (resource?.status?.phase) return String(resource.status.phase);
    return '-';
  };

  useEffect(() => {
    const load = async () => {
      if (!name) return;
      const res = await resolveKubeVirtResourceByName<IVirtualMachinePool>({
        cluster,
        groupVersion: resourceGroup.groupVersion,
        plural: 'virtualmachinepools',
        name,
        namespace,
      });
      setInfo(res.resource);
      setResolvedNamespace(res.namespace);
    };
    load();
  }, [cluster, name, namespace, resourceGroup.groupVersion]);

  if (!name) {
    return <PageContainer header={{ breadcrumb: {}, onBack: () => window.history.back() }}><Empty /></PageContainer>;
  }

  return (
    <PageContainer
      header={{ breadcrumb: {}, onBack: () => window.history.back() }}
      title={info?.metadata?.name || resourceLabel}
      subTitle={resourceLabel}
      extra={[
        <Button key="yaml" icon={<EditOutlined />} onClick={() => (window.location.href = baseAddress + '/' + name + '/update')}>{intl.formatMessage({ id: 'cluster.resource.operation.edit' })}</Button>,
        <Popconfirm
          key="delete"
          title={intl.formatMessage({ id: 'pages.operation.delete.description' }) + '【' + (info?.metadata?.name || name) + '】'}
          onConfirm={async () => {
            await clusterDeleteProxy({ cluster, address: baseApi + '/' + name });
            message.success(intl.formatMessage({ id: 'cluster.operation.success' }));
            window.location.href = baseAddress;
          }}
          okText={intl.formatMessage({ id: 'pages.operation.confirm' })}
          cancelText={intl.formatMessage({ id: 'pages.operation.cancel' })}
        >
          <Button danger icon={<DeleteOutlined />}>{intl.formatMessage({ id: 'pages.operation.delete' })}</Button>
        </Popconfirm>,
      ]}
    >
      <Card>
        <Descriptions column={2}>
          <Descriptions.Item label={intl.formatMessage({ id: 'cluster.resource.name' })}>{info?.metadata?.name || '-'}</Descriptions.Item>
          <Descriptions.Item label={intl.formatMessage({ id: 'cluster.resource.kind' })}>{formatResourceKind(intl, info?.kind || 'VirtualMachinePool')}</Descriptions.Item>
          <Descriptions.Item label={intl.formatMessage({ id: 'cluster.resource.apiVersion' })}>{info?.apiVersion || resourceGroup.groupVersion}</Descriptions.Item>
          <Descriptions.Item label={intl.formatMessage({ id: 'cluster.resource.status' })}><Tag color="processing">{getStatusText(info)}</Tag></Descriptions.Item>
          <Descriptions.Item label={intl.formatMessage({ id: 'cluster.resource.namespace' })}>{info?.metadata?.namespace || resolvedNamespace || namespace}</Descriptions.Item>
          <Descriptions.Item label={intl.formatMessage({ id: 'cluster.resource.creationTimestamp' })}>{info?.metadata?.creationTimestamp ? dayjs(info.metadata.creationTimestamp).format('YYYY-MM-DD HH:mm:ss') : '-'}</Descriptions.Item>
        </Descriptions>
      </Card>
      <Tabs
        items={[
          { key: 'spec', label: 'Spec', children: <Card><ReadOnlyYamlEditor content={yaml.dump(info?.spec || {})} /></Card> },
          { key: 'status', label: intl.formatMessage({ id: 'cluster.resource.status' }), children: <Card><ReadOnlyYamlEditor content={yaml.dump(info?.status || {})} /></Card> },
          { key: 'yaml', label: 'YAML', children: <Card><ReadOnlyYamlEditor content={yaml.dump(info || {})} /></Card> },
        ]}
      />
    </PageContainer>
  );
};

export default DetailPage;

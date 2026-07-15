import { PageContainer } from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import React, { useEffect, useMemo, useState } from 'react';
import { Card, Empty } from 'antd';
import ResourceJsonOrYamlForm from '@/pages/kubernetes/components/resource_form';
import type { IVirtualMachineExport } from '@/k8s-models/kubevirt/export.kubevirt.io/v1beta1';
import { getClusterApiVersions, getCurrentViewInfo } from '@/utils/global';
import { formatResourceKind } from '@/pages/kubernetes/utils/resourceKind';
import { buildKubeVirtBaseAddress, buildKubeVirtCollectionApi, resolveKubeVirtResourceByName } from '@/pages/kubernetes/utils/kubevirtPath';

const TextPage: React.FC = () => {
  const intl = useIntl();
  const resourceLabel = formatResourceKind(intl, 'VirtualMachineExport');
  const { name } = useParams();
  const create = !name;
  const { cluster, namespace } = getCurrentViewInfo();
  const resourceGroup = useMemo(
    () => getClusterApiVersions(cluster, ['export.kubevirt.io/v1beta1', 'export.kubevirt.io/v1alpha1'], 'VirtualMachineExport'),
    [cluster],
  );
  const baseAddress = buildKubeVirtBaseAddress(cluster, 'virtualmachineexports', namespace);
  const [info, setInfo] = useState<IVirtualMachineExport>();
  const [resolvedNamespace, setResolvedNamespace] = useState(namespace || '');
  const updateApi = buildKubeVirtCollectionApi(resourceGroup.groupVersion, 'virtualmachineexports', resolvedNamespace);
  const createApi = buildKubeVirtCollectionApi(resourceGroup.groupVersion, 'virtualmachineexports', namespace || 'default');

  useEffect(() => {
    const load = async () => {
      if (create || !name) return;
      const res = await resolveKubeVirtResourceByName<IVirtualMachineExport>({
        cluster,
        groupVersion: resourceGroup.groupVersion,
        plural: 'virtualmachineexports',
        name,
        namespace,
      });
      setInfo(res.resource);
      setResolvedNamespace(res.namespace);
    };
    load();
  }, [cluster, create, name, namespace, resourceGroup.groupVersion]);

  return (
    <PageContainer header={{ breadcrumb: {}, onBack: () => window.history.back() }} title={create ? intl.formatMessage({ id: 'cluster.resource.operation.create' }) : intl.formatMessage({ id: 'cluster.resource.operation.edit' })} subTitle={resourceLabel}>
      <Card>
        {!create && info?.apiVersion ? (
          <ResourceJsonOrYamlForm
            apiVersion={info.apiVersion}
            key="VirtualMachineExport-update"
            kind="VirtualMachineExport"
            scope="namespace"
            create={false}
            requestAPI={updateApi + '/' + name}
            listPage={baseAddress}
            detailPage={baseAddress}
            namespace={resolvedNamespace || ''}
            name={info?.metadata?.name || ''}
            cluster={cluster}
            content={info || {}}
          />
        ) : null}
        {create ? (
          <ResourceJsonOrYamlForm
            apiVersion={resourceGroup.groupVersion}
            key="VirtualMachineExport-create"
            kind="VirtualMachineExport"
            scope="namespace"
            create={true}
            requestAPI={createApi}
            listPage={baseAddress}
            detailPage={baseAddress}
            namespace={namespace || ''}
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

export default TextPage;

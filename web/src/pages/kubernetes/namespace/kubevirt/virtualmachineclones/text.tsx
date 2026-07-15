import { PageContainer } from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import React, { useEffect, useMemo, useState } from 'react';
import { Card, Empty } from 'antd';
import ResourceJsonOrYamlForm from '@/pages/kubernetes/components/resource_form';
import type { IVirtualMachineClone } from '@/k8s-models/kubevirt/clone.kubevirt.io/v1beta1';
import { getClusterApiVersions, getCurrentViewInfo } from '@/utils/global';
import { formatResourceKind } from '@/pages/kubernetes/utils/resourceKind';
import { buildKubeVirtBaseAddress, buildKubeVirtCollectionApi, resolveKubeVirtResourceByName } from '@/pages/kubernetes/utils/kubevirtPath';

const TextPage: React.FC = () => {
  const intl = useIntl();
  const resourceLabel = formatResourceKind(intl, 'VirtualMachineClone');
  const { name } = useParams();
  const create = !name;
  const { cluster, namespace } = getCurrentViewInfo();
  const resourceGroup = useMemo(
    () => getClusterApiVersions(cluster, ['clone.kubevirt.io/v1beta1', 'clone.kubevirt.io/v1alpha1'], 'VirtualMachineClone'),
    [cluster],
  );
  const baseAddress = buildKubeVirtBaseAddress(cluster, 'virtualmachineclones', namespace);
  const [info, setInfo] = useState<IVirtualMachineClone>();
  const [resolvedNamespace, setResolvedNamespace] = useState(namespace || '');
  const updateApi = buildKubeVirtCollectionApi(resourceGroup.groupVersion, 'virtualmachineclones', resolvedNamespace);
  const createApi = buildKubeVirtCollectionApi(resourceGroup.groupVersion, 'virtualmachineclones', namespace || 'default');

  useEffect(() => {
    const load = async () => {
      if (create || !name) return;
      const res = await resolveKubeVirtResourceByName<IVirtualMachineClone>({
        cluster,
        groupVersion: resourceGroup.groupVersion,
        plural: 'virtualmachineclones',
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
            key="VirtualMachineClone-update"
            kind="VirtualMachineClone"
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
            key="VirtualMachineClone-create"
            kind="VirtualMachineClone"
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

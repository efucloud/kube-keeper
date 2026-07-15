import { PageContainer } from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import React, { useEffect, useMemo, useState } from 'react';
import { Card, Empty } from 'antd';
import ResourceJsonOrYamlForm from '@/pages/kubernetes/components/resource_form';
import type { IDataVolume } from '@/k8s-models/kubevirt/cdi.kubevirt.io/v1beta1';
import { getClusterApiVersions, getCurrentViewInfo } from '@/utils/global';
import { formatResourceKind } from '@/pages/kubernetes/utils/resourceKind';
import { buildKubeVirtBaseAddress, buildKubeVirtCollectionApi, resolveKubeVirtResourceByName } from '@/pages/kubernetes/utils/kubevirtPath';

const TextPage: React.FC = () => {
  const intl = useIntl();
  const resourceLabel = formatResourceKind(intl, 'DataVolume');
  const { name } = useParams();
  const create = !name;
  const { cluster, namespace } = getCurrentViewInfo();
  const resourceGroup = useMemo(
    () => getClusterApiVersions(cluster, ['cdi.kubevirt.io/v1beta1'], 'DataVolume'),
    [cluster],
  );
  const baseAddress = buildKubeVirtBaseAddress(cluster, 'datavolumes', namespace);
  const [info, setInfo] = useState<IDataVolume>();
  const [resolvedNamespace, setResolvedNamespace] = useState(namespace || '');
  const updateApi = buildKubeVirtCollectionApi(resourceGroup.groupVersion, 'datavolumes', resolvedNamespace);
  const createApi = buildKubeVirtCollectionApi(resourceGroup.groupVersion, 'datavolumes', namespace || 'default');

  useEffect(() => {
    const load = async () => {
      if (create || !name) return;
      const res = await resolveKubeVirtResourceByName<IDataVolume>({
        cluster,
        groupVersion: resourceGroup.groupVersion,
        plural: 'datavolumes',
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
            key="DataVolume-update"
            kind="DataVolume"
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
            key="DataVolume-create"
            kind="DataVolume"
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

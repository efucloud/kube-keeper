import { PageContainer } from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import React, { useEffect, useMemo, useState } from 'react';
import { Card, Empty } from 'antd';
import ResourceJsonOrYamlForm from '@/pages/kubernetes/components/resource_form';
import type { IMigrationPolicy } from '@/k8s-models/kubevirt/migrations.kubevirt.io/v1alpha1';
import { clusterGetProxy } from '@/services/cluster_proxy.api';
import { getClusterApiVersions, getCurrentViewInfo } from '@/utils/global';
import { formatResourceKind } from '@/pages/kubernetes/utils/resourceKind';

const TextPage: React.FC = () => {
  const intl = useIntl();
  const resourceLabel = formatResourceKind(intl, 'MigrationPolicy');
  const { name } = useParams();
  const create = !name;
  const { cluster, namespace = '' } = getCurrentViewInfo();
  const resourceGroup = useMemo(
    () => getClusterApiVersions(cluster, ['migrations.kubevirt.io/v1alpha1'], 'MigrationPolicy'),
    [cluster],
  );
  const baseApi = 'apis/' + resourceGroup.groupVersion + '/migrationpolicies';
  const baseAddress = '/kubernetes/cluster/' + cluster + '/kubevirt/migrationpolicies';
  const [info, setInfo] = useState<IMigrationPolicy>();

  useEffect(() => {
    const load = async () => {
      if (create || !name) return;
      const res = (await clusterGetProxy({ cluster, address: baseApi + '/' + name })) as IMigrationPolicy;
      setInfo(res);
    };
    load();
  }, [baseApi, create, name]);

  return (
    <PageContainer header={{ breadcrumb: {}, onBack: () => window.history.back() }} title={create ? intl.formatMessage({ id: 'cluster.resource.operation.create' }) : intl.formatMessage({ id: 'cluster.resource.operation.edit' })} subTitle={resourceLabel}>
      <Card>
        {!create && info?.apiVersion ? (
          <ResourceJsonOrYamlForm
            apiVersion={info.apiVersion}
            key="MigrationPolicy-update"
            kind="MigrationPolicy"
            scope="cluster"
            create={false}
            requestAPI={baseApi + '/' + name}
            listPage={baseAddress}
            detailPage={baseAddress}
            
            name={info?.metadata?.name || ''}
                        cluster={cluster}
            content={info || {}}
          />
        ) : null}
        {create ? (
          <ResourceJsonOrYamlForm
            apiVersion={resourceGroup.groupVersion}
            key="MigrationPolicy-create"
            kind="MigrationPolicy"
            scope="cluster"
            create={true}
            requestAPI={baseApi}
            listPage={baseAddress}
            detailPage={baseAddress}
            
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

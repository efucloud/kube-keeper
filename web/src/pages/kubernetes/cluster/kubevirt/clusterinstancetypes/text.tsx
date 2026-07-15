import { PageContainer } from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import React, { useEffect, useMemo, useState } from 'react';
import { Card, Empty } from 'antd';
import ResourceJsonOrYamlForm from '@/pages/kubernetes/components/resource_form';
import type { IVirtualMachineClusterInstancetype } from '@/k8s-models/kubevirt/instancetype.kubevirt.io/v1beta1';
import { clusterGetProxy } from '@/services/cluster_proxy.api';
import { getClusterApiVersions, getCurrentViewInfo } from '@/utils/global';
import { formatResourceKind } from '@/pages/kubernetes/utils/resourceKind';

const TextPage: React.FC = () => {
  const intl = useIntl();
  const resourceLabel = formatResourceKind(intl, 'VirtualMachineClusterInstancetype');
  const { name } = useParams();
  const create = !name;
  const { cluster, namespace = '' } = getCurrentViewInfo();
  const resourceGroup = useMemo(
    () => getClusterApiVersions(cluster, ['instancetype.kubevirt.io/v1beta1', 'instancetype.kubevirt.io/v1alpha2'], 'VirtualMachineClusterInstancetype'),
    [cluster],
  );
  const baseApi = 'apis/' + resourceGroup.groupVersion + '/virtualmachineclusterinstancetypes';
  const baseAddress = '/kubernetes/cluster/' + cluster + '/kubevirt/clusterinstancetypes';
  const [info, setInfo] = useState<IVirtualMachineClusterInstancetype>();

  useEffect(() => {
    const load = async () => {
      if (create || !name) return;
      const res = (await clusterGetProxy({ cluster, address: baseApi + '/' + name })) as IVirtualMachineClusterInstancetype;
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
            key="VirtualMachineClusterInstancetype-update"
            kind="VirtualMachineClusterInstancetype"
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
            key="VirtualMachineClusterInstancetype-create"
            kind="VirtualMachineClusterInstancetype"
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

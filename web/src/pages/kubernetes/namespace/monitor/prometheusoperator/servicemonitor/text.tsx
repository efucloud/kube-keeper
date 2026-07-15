import { PageContainer } from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import React, { useEffect, useState } from 'react';
import { Card, Empty } from 'antd';
import type { ServiceMonitor } from '@kubernetes-models/prometheus-operator/monitoring.coreos.com/v1';
import ResourceJsonOrYamlForm from '@/pages/kubernetes/components/resource_form';
import { clusterGetProxy } from '@/services/cluster_proxy.api';
import { getClusterApiVersions, getCurrentViewInfo } from '@/utils/global';
import { formatResourceKind } from '@/pages/kubernetes/utils/resourceKind';

const TextPage: React.FC = () => {
  const intl = useIntl();
  const resourceLabel = formatResourceKind(intl, 'ServiceMonitor');
  const params = useParams();
  const create = params.action !== 'update';
  const name = create ? '' : (params.name || '');

  const { cluster, namespace = '' } = getCurrentViewInfo();
  const resourceGroup = getClusterApiVersions(cluster, ['monitoring.coreos.com/v1'], 'ServiceMonitor');
  const baseApi = namespace ? `apis/${resourceGroup.groupVersion}/namespaces/${namespace}/servicemonitors` : `apis/${resourceGroup.groupVersion}/servicemonitors`;
  let baseAddress = `/kubernetes/cluster/${cluster}/namespace/${namespace}/monitor/prometheus-operator/servicemonitor`;
  if (namespace === '' || namespace === '-') {
    baseAddress = `/kubernetes/cluster/${cluster}/monitor/prometheus-operator/servicemonitor`;
  }
  const [info, setInfo] = useState<ServiceMonitor>();

  useEffect(() => {
    const load = async () => {
      if (create || !name) return;
      const res = (await clusterGetProxy({ cluster, address: `${baseApi}/${name}` })) as ServiceMonitor;
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
            key="ServiceMonitor-update"
            kind="ServiceMonitor"
            scope="namespace"
            create={false}
            requestAPI={`${baseApi}/${name}`}
            listPage={baseAddress}
            detailPage={baseAddress}
            namespace={namespace || ''}
            name={info?.metadata?.name || ''}
            
            cluster={cluster}
            content={info || {}}
          />
        ) : null}
        {create ? (
          <ResourceJsonOrYamlForm
            apiVersion={resourceGroup.groupVersion}
            key="ServiceMonitor-create"
            kind="ServiceMonitor"
            scope="namespace"
            create={true}
            requestAPI={baseApi}
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

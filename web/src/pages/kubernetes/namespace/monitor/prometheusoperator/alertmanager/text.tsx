import { PageContainer } from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import React, { useEffect, useState } from 'react';
import { Card, Empty } from 'antd';
import type { Alertmanager } from '@kubernetes-models/prometheus-operator/monitoring.coreos.com/v1';
import ResourceJsonOrYamlForm from '@/pages/kubernetes/components/resource_form';
import { clusterGetProxy } from '@/services/cluster_proxy.api';
import { getClusterApiVersions, getCurrentViewInfo } from '@/utils/global';
import { formatResourceKind } from '@/pages/kubernetes/utils/resourceKind';

const TextPage: React.FC = () => {
  const intl = useIntl();
  const resourceLabel = formatResourceKind(intl, 'Alertmanager');
  const params = useParams();
  const create = params.action !== 'update';
  const name = create ? '' : (params.name || '');

  const { cluster, namespace = '' } = getCurrentViewInfo();
  const resourceGroup = getClusterApiVersions(cluster, ['monitoring.coreos.com/v1'], 'Alertmanager');
  const baseApi = namespace ? `apis/${resourceGroup.groupVersion}/namespaces/${namespace}/alertmanagers` : `apis/${resourceGroup.groupVersion}/alertmanagers`;
  let baseAddress = `/kubernetes/cluster/${cluster}/namespace/${namespace}/monitor/prometheus-operator/alertmanager`;
  if (namespace === '' || namespace === '-') {
    baseAddress = `/kubernetes/cluster/${cluster}/monitor/prometheus-operator/alertmanager`;
  }
  const [info, setInfo] = useState<Alertmanager>();

  useEffect(() => {
    const load = async () => {
      if (create || !name) return;
      const res = (await clusterGetProxy({ cluster, address: `${baseApi}/${name}` })) as Alertmanager;
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
            key="Alertmanager-update"
            kind="Alertmanager"
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
            key="Alertmanager-create"
            kind="Alertmanager"
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

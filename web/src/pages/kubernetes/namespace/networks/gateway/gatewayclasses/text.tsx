import { PageContainer } from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import React, { useEffect, useMemo, useState } from 'react';
import { Card, Empty } from 'antd';
import ResourceJsonOrYamlForm from '@/pages/kubernetes/components/resource_form';
import type { IGatewayClass } from '@/k8s-models/gateway/gateway.networking.k8s.io/v1';
import { clusterGetProxy } from '@/services/cluster_proxy.api';
import { getClusterApiVersions, getCurrentViewInfo } from '@/utils/global';
import { formatResourceKind } from '@/pages/kubernetes/utils/resourceKind';

const TextPage: React.FC = () => {
  const intl = useIntl();
  const resourceLabel = formatResourceKind(intl, 'GatewayClass');
  const params = useParams();
  const create = params.action !== 'update';
  const name = create ? '' : (params.name || '');
  const { cluster, namespace = '' } = getCurrentViewInfo();
  const resourceGroup = useMemo(
    () => getClusterApiVersions(cluster, ['gateway.networking.k8s.io/v1', 'gateway.networking.k8s.io/v1beta1'], 'GatewayClass'),
    [cluster],
  );
  const baseApi = `apis/${resourceGroup.groupVersion}/gatewayclasses`;
  const baseAddress = `/kubernetes/cluster/${cluster}/namespace/${namespace}/networks/gateway/gatewayclasses`;
  const [info, setInfo] = useState<IGatewayClass>();

  useEffect(() => {
    const load = async () => {
      if (create || !name) return;
      const res = (await clusterGetProxy({ cluster, address: `${baseApi}/${name}` })) as IGatewayClass;
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
            key="GatewayClass-update"
            kind="GatewayClass"
            scope="cluster"
            create={false}
            requestAPI={`${baseApi}/${name}`}
            listPage={baseAddress}
            detailPage={baseAddress}
            namespace=""
            name={info?.metadata?.name || ''}
            
            cluster={cluster}
            content={info || {}}
          />
        ) : null}
        {create ? (
          <ResourceJsonOrYamlForm
            apiVersion={resourceGroup.groupVersion}
            key="GatewayClass-create"
            kind="GatewayClass"
            scope="cluster"
            create={true}
            requestAPI={baseApi}
            listPage={baseAddress}
            detailPage={baseAddress}
            namespace=""
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

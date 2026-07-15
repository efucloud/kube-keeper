import { PageContainer } from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import React, { useEffect, useState } from 'react';
import { Card, Empty } from 'antd';
import type { Function } from '@kubernetes-models/fission/fission.io/v1';
import ResourceJsonOrYamlForm from '@/pages/kubernetes/components/resource_form';
import { clusterGetProxy } from '@/services/cluster_proxy.api';
import { getClusterApiVersions, getCurrentViewInfo } from '@/utils/global';

const TextPage: React.FC = () => {
  const intl = useIntl();
  const params = useParams();
  const create = params.action !== 'update';
  const name = create ? '' : (params.name || '');
  const { cluster, namespace = '' } = getCurrentViewInfo();
  const resourceGroup = getClusterApiVersions(cluster, ['fission.io/v1'], 'Function');
  const baseApi = namespace ? `apis/${resourceGroup.groupVersion}/namespaces/${namespace}/functions` : `apis/${resourceGroup.groupVersion}/functions`;
  let baseAddress = `/kubernetes/cluster/${cluster}/namespace/${namespace}/faas/fission/function`;
  if (namespace === '' || namespace === '-') {
    baseAddress = `/kubernetes/cluster/${cluster}/faas/fission/function`;
  }
  const [info, setInfo] = useState<Function>();

  useEffect(() => {
    const load = async () => {
      if (create || !name) return;
      const res = (await clusterGetProxy({ cluster, address: `${baseApi}/${name}` })) as Function;
      setInfo(res);
    };
    load();
  }, [baseApi, cluster, create, name]);

  return (
    <PageContainer header={{ breadcrumb: {}, onBack: () => window.history.back() }} title={create ? intl.formatMessage({ id: 'tenant.resource.action.createYaml' }) : intl.formatMessage({ id: 'tenant.resource.action.editYaml' })} subTitle="Function">
      <Card>
        {!create && info?.apiVersion ? (
          <ResourceJsonOrYamlForm apiVersion={info.apiVersion} key="Function-update" kind="Function" scope="namespace" create={false} requestAPI={`${baseApi}/${name}`} listPage={baseAddress} detailPage={baseAddress} namespace={namespace || ''} name={info?.metadata?.name || ''}  cluster={cluster} content={info || {}} />
        ) : null}
        {create ? (
          <ResourceJsonOrYamlForm apiVersion={resourceGroup.groupVersion} key="Function-create" kind="Function" scope="namespace" create={true} requestAPI={baseApi} listPage={baseAddress} detailPage={baseAddress} namespace={namespace || ''} name=""  cluster={cluster} content={{}} />
        ) : null}
        {!create && !info ? <Empty /> : null}
      </Card>
    </PageContainer>
  );
};

export default TextPage;

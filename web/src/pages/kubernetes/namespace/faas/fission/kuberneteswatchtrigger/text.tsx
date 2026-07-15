import { PageContainer } from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import React, { useEffect, useState } from 'react';
import { Card, Empty } from 'antd';
import type { KubernetesWatchTrigger } from '@kubernetes-models/fission/fission.io/v1';
import ResourceJsonOrYamlForm from '@/pages/kubernetes/components/resource_form';
import { clusterGetProxy } from '@/services/cluster_proxy.api';
import { getClusterApiVersions, getCurrentViewInfo } from '@/utils/global';

const TextPage: React.FC = () => {
  const intl = useIntl();
  const params = useParams();
  const create = params.action !== 'update';
  const name = create ? '' : (params.name || '');
  const { cluster, namespace = '' } = getCurrentViewInfo();
  const resourceGroup = getClusterApiVersions(cluster, ['fission.io/v1'], 'KubernetesWatchTrigger');
  const baseApi = namespace ? `apis/${resourceGroup.groupVersion}/namespaces/${namespace}/kuberneteswatchtriggers` : `apis/${resourceGroup.groupVersion}/kuberneteswatchtriggers`;
  let baseAddress = `/kubernetes/cluster/${cluster}/namespace/${namespace}/faas/fission/kuberneteswatchtrigger`;
  if (namespace === '' || namespace === '-') {
    baseAddress = `/kubernetes/cluster/${cluster}/faas/fission/kuberneteswatchtrigger`;
  }
  const [info, setInfo] = useState<KubernetesWatchTrigger>();

  useEffect(() => {
    const load = async () => {
      if (create || !name) return;
      const res = (await clusterGetProxy({ cluster, address: `${baseApi}/${name}` })) as KubernetesWatchTrigger;
      setInfo(res);
    };
    load();
  }, [baseApi, cluster, create, name]);

  return (
    <PageContainer header={{ breadcrumb: {}, onBack: () => window.history.back() }} title={create ? intl.formatMessage({ id: 'tenant.resource.action.createYaml' }) : intl.formatMessage({ id: 'tenant.resource.action.editYaml' })} subTitle="KubernetesWatchTrigger">
      <Card>
        {!create && info?.apiVersion ? (
          <ResourceJsonOrYamlForm apiVersion={info.apiVersion} key="KubernetesWatchTrigger-update" kind="KubernetesWatchTrigger" scope="namespace" create={false} requestAPI={`${baseApi}/${name}`} listPage={baseAddress} detailPage={baseAddress} namespace={namespace || ''} name={info?.metadata?.name || ''}  cluster={cluster} content={info || {}} />
        ) : null}
        {create ? (
          <ResourceJsonOrYamlForm apiVersion={resourceGroup.groupVersion} key="KubernetesWatchTrigger-create" kind="KubernetesWatchTrigger" scope="namespace" create={true} requestAPI={baseApi} listPage={baseAddress} detailPage={baseAddress} namespace={namespace || ''} name=""  cluster={cluster} content={{}} />
        ) : null}
        {!create && !info ? <Empty /> : null}
      </Card>
    </PageContainer>
  );
};

export default TextPage;

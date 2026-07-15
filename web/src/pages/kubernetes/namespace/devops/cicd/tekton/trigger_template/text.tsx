import { PageContainer } from '@ant-design/pro-components';
import { FormattedMessage, useParams } from '@umijs/max';
import { type FC, useEffect, useState } from 'react';
import ResourceJsonOrYamlForm from '@/pages/kubernetes/components/resource_form';

const Update = 'update';
const Create = 'create';

import type { TriggerTemplate } from '@/k8s-models/tekton/triggers/triggers.tekton.dev/v1beta1';
import { clusterGetProxy } from '@/services/cluster_proxy.api';
import { getClusterResource } from '@/utils/cluster';
import { getClusterApiVersions, getCurrentViewInfo } from '@/utils/global';

const YamOrJsonForm: FC<Record<string, any>> = () => {
  const { cluster, namespace } = getCurrentViewInfo();
  const [info, setInfo] = useState<TriggerTemplate>();
  const resourceGroup = getClusterApiVersions(cluster, ['triggers.tekton.dev/v1beta1'], 'Trigger');
  let BaseAddress = `/kubernetes/cluster/${cluster}/namespace/${namespace}/devops/cicd/tekton/triggertemplates`;
  if (!namespace || namespace === '' || namespace === '-') {
    BaseAddress = `/kubernetes/cluster/${cluster}/devops/cicd/tekton/triggers`;
  }
  const params = useParams();
  const mode = params.action === Update ? Update : Create; // update or create
  const name = mode === Create ? '' : params.name || ''; // resource name
  const BaseApi = `apis/${resourceGroup.groupVersion}/namespaces/${namespace}/triggertemplates`;
  const getInfo = async () => {
    const params = { cluster, address: `${BaseApi}/${name}` } as Record<string, any>;
    const res = (await clusterGetProxy(params)) as TriggerTemplate;
    setInfo(res);
  };
  useEffect(() => {
    if (name && name !== '' && name !== '-') {
      getInfo();
    }
  }, [name]);
  return (
    <PageContainer
      header={{ breadcrumb: {}, onBack: () => window.history.back() }}
      title={
        info?.metadata?.name ? (
          <FormattedMessage id="cluster.resource.operation.edit" />
        ) : (
          <FormattedMessage id="cluster.resource.operation.create" />
        )
      }
      subTitle={
        <>
          {getClusterResource('TriggerTemplate')}
          <></>
          {info?.metadata?.name ? `:${info?.metadata?.name}` : ''}
        </>
      }
    >
      {mode === Update && info?.apiVersion && (
        <ResourceJsonOrYamlForm
          apiVersion={resourceGroup.groupVersion}
          key="TriggerTemplate"
          kind="TriggerTemplate"
          scope="namespace"
          create={false}
          requestAPI={`${BaseApi}/${name}`}
          listPage={BaseAddress}
          detailPage={BaseAddress}
          namespace={namespace || ''}
          name={info?.metadata?.name || ''}

          cluster={cluster}
          content={info || {}}
        />
      )}
      {mode === Create && (
        <ResourceJsonOrYamlForm
          apiVersion={resourceGroup.groupVersion}
          key="TriggerTemplate"
          kind="TriggerTemplate"
          scope="namespace"
          create={true}
          requestAPI={BaseApi}
          listPage={BaseAddress}
          detailPage={BaseAddress}
          namespace={namespace || ''}
          name={''}

          cluster={cluster}
          content={{}}
        />
      )}
    </PageContainer>
  );
};
export default YamOrJsonForm;

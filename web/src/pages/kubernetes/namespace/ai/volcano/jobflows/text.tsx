import { PageContainer } from '@ant-design/pro-components';
import { FormattedMessage, useParams } from '@umijs/max';
import { type FC, useEffect, useState } from 'react';
import ResourceJsonOrYamlForm from '@/pages/kubernetes/components/resource_form';

const Update = 'update';
const Create = 'create';

import type { JobFlow } from '@/k8s-models/volcano/flow.volcano.sh/v1alpha1';

import { clusterGetProxy } from '@/services/cluster_proxy.api';
import { getClusterResource } from '@/utils/cluster';
import { getClusterApiVersions, getCurrentViewInfo } from '@/utils/global';

const YamOrJsonForm: FC<Record<string, any>> = () => {
  const { cluster, namespace } = getCurrentViewInfo();
  const [info, setInfo] = useState<JobFlow>();
  const resourceGroup = getClusterApiVersions(cluster, ['flow.volcano.sh/v1alpha1'], 'JobFlow');
  const BaseApi = namespace ? `apis/${resourceGroup?.groupVersion}/namespaces/${namespace}/jobflows` : `apis/${resourceGroup?.groupVersion}/jobflows`;
  const BaseAddress = `/kubernetes/cluster/${cluster}/ai/volcano/jobflows`;
  const params = useParams();
  const mode = params.action === Update ? Update : Create; // update or create
  const name = mode === Create ? '' : params.name || ''; // resource name
  const getInfo = async () => {
    const params = { cluster, address: `${BaseApi}/${name}` } as Record<string, any>;
    const res = (await clusterGetProxy(params)) as JobFlow;
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
          {getClusterResource('Job')}
          <></>
          {info?.metadata?.name ? `:${info?.metadata?.name}` : ''}
        </>
      }
    >
      {mode === Update && info?.apiVersion && (
        <ResourceJsonOrYamlForm
          apiVersion={resourceGroup.groupVersion}
          key="jobflow"
          kind="JobFlow"
          scope="namespace"
          create={false}
          requestAPI={`${BaseApi}/${name}`}
          listPage={BaseAddress}
          detailPage={BaseAddress}
          name={info?.metadata?.name || ''}

          cluster={cluster}
          content={info || {}}
        />
      )}
      {mode === Create && (
        <ResourceJsonOrYamlForm
          apiVersion={resourceGroup.groupVersion}
          key="jobflow"
          kind="JobFlow"
          scope="namespace"
          create={true}
          requestAPI={BaseApi}
          listPage={BaseAddress}
          detailPage={BaseAddress}
          name={''}

          cluster={cluster}
          content={{}}
        />
      )}
    </PageContainer>
  );
};
export default YamOrJsonForm;

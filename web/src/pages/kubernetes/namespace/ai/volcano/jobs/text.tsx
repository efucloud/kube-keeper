import { PageContainer } from '@ant-design/pro-components';
import { FormattedMessage, useParams } from '@umijs/max';
import { type FC, useEffect, useState } from 'react';
import ResourceJsonOrYamlForm from '@/pages/kubernetes/components/resource_form';

const Update = 'update';
const Create = 'create';

import type { Job } from '@/k8s-models/volcano/batch.volcano.sh/v1alpha1';

import { clusterGetProxy } from '@/services/cluster_proxy.api';
import { getClusterResource } from '@/utils/cluster';
import { getClusterApiVersions, getCurrentViewInfo } from '@/utils/global';

const YamOrJsonForm: FC<Record<string, any>> = () => {
  const { cluster, namespace } = getCurrentViewInfo();
  const [info, setInfo] = useState<Job>();
  const resourceGroup = getClusterApiVersions(cluster, ['batch.volcano.sh/v1alpha1'], 'Job');
  const BaseApi = namespace ? `apis/${resourceGroup?.groupVersion}/namespaces/${namespace}/jobs` : `apis/${resourceGroup?.groupVersion}/jobs`;
  const BaseAddress = `/kubernetes/cluster/${cluster}/ai/volcano/jobs`;
  const params = useParams();
  const mode = params.action === Update ? Update : Create; // update or create
  const name = mode === Create ? '' : params.name || ''; // resource name
  const getInfo = async () => {
    const params = { cluster, address: `${BaseApi}/${name}` } as Record<string, any>;
    const res = (await clusterGetProxy(params)) as Job;
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
          key="job"
          kind="Job"
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
          key="job"
          kind="Job"
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

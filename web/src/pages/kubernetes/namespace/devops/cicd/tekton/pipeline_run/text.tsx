import { PageContainer } from '@ant-design/pro-components';
import { useEffect, useState, type FC } from 'react';
import { useParams, FormattedMessage } from '@umijs/max';
import ResourceJsonOrYamlForm from '@/pages/kubernetes/components/resource_form';

const Update = 'update';
const Create = 'create';
import { clusterGetProxy } from '@/services/cluster_proxy.api';
import { getClusterApiVersions, getCurrentViewInfo } from '@/utils/global';
import { getClusterResource } from '@/utils/cluster';
import { PipelineRun } from '@/k8s-models/tekton/pipeline/tekton.dev/v1';


const YamOrJsonForm: FC<Record<string, any>> = () => {
  const { cluster, namespace } = getCurrentViewInfo();
  const [info, setInfo] = useState<PipelineRun>();
  const resourceGroup = getClusterApiVersions(cluster, ['tekton.dev/v1'], "PipelineRun");
  let BaseAddress = `/kubernetes/cluster/${cluster}/namespace/${namespace}/devops/cicd/tekton/pipelineruns`
  if (!namespace || namespace === '' || namespace === '-') {
    BaseAddress = `/kubernetes/cluster/${cluster}/devops/cicd/tekton/pipelineruns`
  }
  const params = useParams();
  const mode = params.action === Update ? Update : Create; // update or create
  const name = mode === Create ? '' : params.name || '' // resource name
  const BaseApi = `apis/${resourceGroup?.groupVersion}/namespaces/${namespace}/pipelineruns`;
  const getInfo = async () => {
    let params = { cluster, address: `${BaseApi}/${name}` } as Record<string, any>;
    const res = await clusterGetProxy(params) as PipelineRun;
    setInfo(res);
  }
  useEffect(() => {
    if (name && name !== '' && name !== '-') {
      getInfo();
    }
  }, [name]);
  return (<PageContainer
    header={{ breadcrumb: {}, onBack: () => window.history.back() }}
    title={info?.metadata?.name ? <FormattedMessage id='cluster.resource.operation.edit' /> : <FormattedMessage id='cluster.resource.operation.create' />}
    subTitle={<>{getClusterResource('PipelineRun')}<></>{info?.metadata?.name ? `:${info?.metadata?.name}` : ''}</>}
  >
    {mode === Update && info?.apiVersion &&
      <ResourceJsonOrYamlForm apiVersion={resourceGroup.groupVersion} key='PipelineRun' kind='PipelineRun' scope='namespace' create={false} requestAPI={`${BaseApi}/${name}`} listPage={BaseAddress} detailPage={BaseAddress} namespace={namespace || ''} name={info?.metadata?.name || ''} cluster={cluster} content={info || {}} />
    }
    {mode === Create &&
      <ResourceJsonOrYamlForm apiVersion={resourceGroup.groupVersion} key='PipelineRun' kind='PipelineRun' scope='namespace' create={true} requestAPI={BaseApi} listPage={BaseAddress} detailPage={BaseAddress} namespace={namespace || ''} name={''} cluster={cluster} content={{}} />
    }
  </PageContainer>);
}
export default YamOrJsonForm;
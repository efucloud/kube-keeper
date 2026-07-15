import type { IKubeVirtResourceList } from '@/k8s-models/kubevirt';
import { clusterGetProxy } from '@/services/cluster_proxy.api';

type KubeVirtScopedResource = {
  metadata?: {
    namespace?: string;
  };
};

type ResolveKubeVirtResourceParams = {
  cluster: string;
  groupVersion: string;
  plural: string;
  name: string;
  namespace?: string;
};

export const buildKubeVirtCollectionApi = (
  groupVersion: string,
  plural: string,
  namespace = '',
) => `apis/${groupVersion}${namespace ? `/namespaces/${namespace}` : ''}/${plural}`;

export const buildKubeVirtBaseAddress = (
  cluster: string,
  routeSegment: string,
  namespace = '',
) =>
  namespace
    ? `/kubernetes/cluster/${cluster}/namespace/${namespace}/kubevirt/${routeSegment}`
    : `/kubernetes/cluster/${cluster}/kubevirt/${routeSegment}`;

export const resolveKubeVirtResourceByName = async <T extends KubeVirtScopedResource>({
  cluster,
  groupVersion,
  plural,
  name,
  namespace = '',
}: ResolveKubeVirtResourceParams) => {
  if (namespace) {
    const baseApi = buildKubeVirtCollectionApi(groupVersion, plural, namespace);
    const resource = (await clusterGetProxy({
      cluster,
      address: `${baseApi}/${name}`,
    })) as T;
    return {
      resource,
      namespace,
      baseApi,
    };
  }

  const list = (await clusterGetProxy({
    cluster,
    address: buildKubeVirtCollectionApi(groupVersion, plural),
    fieldSelector: `metadata.name=${name}`,
  })) as IKubeVirtResourceList;

  const resource = (list.items?.[0] || undefined) as T | undefined;
  const resolvedNamespace = resource?.metadata?.namespace || '';

  return {
    resource,
    namespace: resolvedNamespace,
    baseApi: buildKubeVirtCollectionApi(groupVersion, plural, resolvedNamespace),
  };
};

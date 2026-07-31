import type { IListMeta } from '@kubernetes-models/apimachinery/apis/meta/v1/ListMeta';
import type { IObjectMeta } from '@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta';
import { createTypeMetaGuard, Model, type ModelData } from '@kubernetes-models/base';

export interface IKubeVirtResource {
  apiVersion: string;
  kind: string;
  metadata?: IObjectMeta;
  spec?: Record<string, any>;
  status?: Record<string, any>;
  [key: string]: any;
}

export interface IKubeVirtResourceList<T extends IKubeVirtResource = IKubeVirtResource> {
  apiVersion?: string;
  kind?: string;
  metadata?: IListMeta;
  items: T[];
}

export class KubeVirtResource<
  T extends IKubeVirtResource = IKubeVirtResource,
> extends Model<T> implements IKubeVirtResource
{
  apiVersion: T['apiVersion'];
  kind: T['kind'];
  metadata?: T['metadata'];
  spec?: T['spec'];
  status?: T['status'];

  constructor(
    apiVersion: T['apiVersion'],
    kind: T['kind'],
    data?: ModelData<T>,
  ) {
    super();
    this.setDefinedProps({
      apiVersion,
      kind,
      ...data,
    } as ModelData<T>);
  }
}

export const createKubeVirtTypeGuard = <T extends IKubeVirtResource>(
  apiVersion: T['apiVersion'],
  kind: T['kind'],
) => createTypeMetaGuard<T>({ apiVersion, kind });

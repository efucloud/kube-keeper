import type { ModelData } from '@kubernetes-models/base';
import { KubeVirtResource, createKubeVirtTypeGuard, type IKubeVirtResource } from '../../base';

export interface IDataVolume extends IKubeVirtResource {
  apiVersion: 'cdi.kubevirt.io/v1beta1';
  kind: 'DataVolume';
}

export class DataVolume extends KubeVirtResource<IDataVolume> implements IDataVolume {
  static apiVersion = 'cdi.kubevirt.io/v1beta1' as const;
  static kind = 'DataVolume' as const;
  static is = createKubeVirtTypeGuard<IDataVolume>(DataVolume.apiVersion, DataVolume.kind);

  constructor(data?: ModelData<IDataVolume>) {
    super(DataVolume.apiVersion, DataVolume.kind, data);
  }
}

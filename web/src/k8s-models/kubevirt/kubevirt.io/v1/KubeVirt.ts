import type { ModelData } from '@kubernetes-models/base';
import { KubeVirtResource, createKubeVirtTypeGuard, type IKubeVirtResource } from '../../base';

export interface IKubeVirt extends IKubeVirtResource {
  apiVersion: 'kubevirt.io/v1';
  kind: 'KubeVirt';
}

export class KubeVirt extends KubeVirtResource<IKubeVirt> implements IKubeVirt {
  static apiVersion = 'kubevirt.io/v1' as const;
  static kind = 'KubeVirt' as const;
  static is = createKubeVirtTypeGuard<IKubeVirt>(KubeVirt.apiVersion, KubeVirt.kind);

  constructor(data?: ModelData<IKubeVirt>) {
    super(KubeVirt.apiVersion, KubeVirt.kind, data);
  }
}

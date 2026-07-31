import type { ModelData } from '@kubernetes-models/base';
import { KubeVirtResource, createKubeVirtTypeGuard, type IKubeVirtResource } from '../../base';

export interface IVirtualMachine extends IKubeVirtResource {
  apiVersion: 'kubevirt.io/v1';
  kind: 'VirtualMachine';
}

export class VirtualMachine extends KubeVirtResource<IVirtualMachine> implements IVirtualMachine {
  static apiVersion = 'kubevirt.io/v1' as const;
  static kind = 'VirtualMachine' as const;
  static is = createKubeVirtTypeGuard<IVirtualMachine>(
    VirtualMachine.apiVersion,
    VirtualMachine.kind,
  );

  constructor(data?: ModelData<IVirtualMachine>) {
    super(VirtualMachine.apiVersion, VirtualMachine.kind, data);
  }
}

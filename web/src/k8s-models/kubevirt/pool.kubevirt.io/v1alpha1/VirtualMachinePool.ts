import type { ModelData } from '@kubernetes-models/base';
import { KubeVirtResource, createKubeVirtTypeGuard, type IKubeVirtResource } from '../../base';

export interface IVirtualMachinePool extends IKubeVirtResource {
  apiVersion: 'pool.kubevirt.io/v1alpha1';
  kind: 'VirtualMachinePool';
}

export class VirtualMachinePool
  extends KubeVirtResource<IVirtualMachinePool>
  implements IVirtualMachinePool
{
  static apiVersion = 'pool.kubevirt.io/v1alpha1' as const;
  static kind = 'VirtualMachinePool' as const;
  static is = createKubeVirtTypeGuard<IVirtualMachinePool>(
    VirtualMachinePool.apiVersion,
    VirtualMachinePool.kind,
  );

  constructor(data?: ModelData<IVirtualMachinePool>) {
    super(VirtualMachinePool.apiVersion, VirtualMachinePool.kind, data);
  }
}

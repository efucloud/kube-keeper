import type { ModelData } from '@kubernetes-models/base';
import { KubeVirtResource, createKubeVirtTypeGuard, type IKubeVirtResource } from '../../base';

export interface IVirtualMachineInstance extends IKubeVirtResource {
  apiVersion: 'kubevirt.io/v1';
  kind: 'VirtualMachineInstance';
}

export class VirtualMachineInstance
  extends KubeVirtResource<IVirtualMachineInstance>
  implements IVirtualMachineInstance
{
  static apiVersion = 'kubevirt.io/v1' as const;
  static kind = 'VirtualMachineInstance' as const;
  static is = createKubeVirtTypeGuard<IVirtualMachineInstance>(
    VirtualMachineInstance.apiVersion,
    VirtualMachineInstance.kind,
  );

  constructor(data?: ModelData<IVirtualMachineInstance>) {
    super(VirtualMachineInstance.apiVersion, VirtualMachineInstance.kind, data);
  }
}

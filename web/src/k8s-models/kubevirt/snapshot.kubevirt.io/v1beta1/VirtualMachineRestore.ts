import type { ModelData } from '@kubernetes-models/base';
import { KubeVirtResource, createKubeVirtTypeGuard, type IKubeVirtResource } from '../../base';

export interface IVirtualMachineRestore extends IKubeVirtResource {
  apiVersion: 'snapshot.kubevirt.io/v1beta1';
  kind: 'VirtualMachineRestore';
}

export class VirtualMachineRestore
  extends KubeVirtResource<IVirtualMachineRestore>
  implements IVirtualMachineRestore
{
  static apiVersion = 'snapshot.kubevirt.io/v1beta1' as const;
  static kind = 'VirtualMachineRestore' as const;
  static is = createKubeVirtTypeGuard<IVirtualMachineRestore>(
    VirtualMachineRestore.apiVersion,
    VirtualMachineRestore.kind,
  );

  constructor(data?: ModelData<IVirtualMachineRestore>) {
    super(VirtualMachineRestore.apiVersion, VirtualMachineRestore.kind, data);
  }
}

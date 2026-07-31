import type { ModelData } from '@kubernetes-models/base';
import { KubeVirtResource, createKubeVirtTypeGuard, type IKubeVirtResource } from '../../base';

export interface IVirtualMachineSnapshot extends IKubeVirtResource {
  apiVersion: 'snapshot.kubevirt.io/v1beta1';
  kind: 'VirtualMachineSnapshot';
}

export class VirtualMachineSnapshot
  extends KubeVirtResource<IVirtualMachineSnapshot>
  implements IVirtualMachineSnapshot
{
  static apiVersion = 'snapshot.kubevirt.io/v1beta1' as const;
  static kind = 'VirtualMachineSnapshot' as const;
  static is = createKubeVirtTypeGuard<IVirtualMachineSnapshot>(
    VirtualMachineSnapshot.apiVersion,
    VirtualMachineSnapshot.kind,
  );

  constructor(data?: ModelData<IVirtualMachineSnapshot>) {
    super(VirtualMachineSnapshot.apiVersion, VirtualMachineSnapshot.kind, data);
  }
}

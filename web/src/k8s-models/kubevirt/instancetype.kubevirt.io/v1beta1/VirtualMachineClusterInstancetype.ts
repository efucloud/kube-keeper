import type { ModelData } from '@kubernetes-models/base';
import { KubeVirtResource, createKubeVirtTypeGuard, type IKubeVirtResource } from '../../base';

export interface IVirtualMachineClusterInstancetype extends IKubeVirtResource {
  apiVersion: 'instancetype.kubevirt.io/v1beta1';
  kind: 'VirtualMachineClusterInstancetype';
}

export class VirtualMachineClusterInstancetype
  extends KubeVirtResource<IVirtualMachineClusterInstancetype>
  implements IVirtualMachineClusterInstancetype
{
  static apiVersion = 'instancetype.kubevirt.io/v1beta1' as const;
  static kind = 'VirtualMachineClusterInstancetype' as const;
  static is = createKubeVirtTypeGuard<IVirtualMachineClusterInstancetype>(
    VirtualMachineClusterInstancetype.apiVersion,
    VirtualMachineClusterInstancetype.kind,
  );

  constructor(data?: ModelData<IVirtualMachineClusterInstancetype>) {
    super(
      VirtualMachineClusterInstancetype.apiVersion,
      VirtualMachineClusterInstancetype.kind,
      data,
    );
  }
}

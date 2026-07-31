import type { ModelData } from '@kubernetes-models/base';
import { KubeVirtResource, createKubeVirtTypeGuard, type IKubeVirtResource } from '../../base';

export interface IVirtualMachineInstancetype extends IKubeVirtResource {
  apiVersion: 'instancetype.kubevirt.io/v1beta1';
  kind: 'VirtualMachineInstancetype';
}

export class VirtualMachineInstancetype
  extends KubeVirtResource<IVirtualMachineInstancetype>
  implements IVirtualMachineInstancetype
{
  static apiVersion = 'instancetype.kubevirt.io/v1beta1' as const;
  static kind = 'VirtualMachineInstancetype' as const;
  static is = createKubeVirtTypeGuard<IVirtualMachineInstancetype>(
    VirtualMachineInstancetype.apiVersion,
    VirtualMachineInstancetype.kind,
  );

  constructor(data?: ModelData<IVirtualMachineInstancetype>) {
    super(VirtualMachineInstancetype.apiVersion, VirtualMachineInstancetype.kind, data);
  }
}

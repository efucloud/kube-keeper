import type { ModelData } from '@kubernetes-models/base';
import { KubeVirtResource, createKubeVirtTypeGuard, type IKubeVirtResource } from '../../base';

export interface IVirtualMachineClone extends IKubeVirtResource {
  apiVersion: 'clone.kubevirt.io/v1beta1';
  kind: 'VirtualMachineClone';
}

export class VirtualMachineClone
  extends KubeVirtResource<IVirtualMachineClone>
  implements IVirtualMachineClone
{
  static apiVersion = 'clone.kubevirt.io/v1beta1' as const;
  static kind = 'VirtualMachineClone' as const;
  static is = createKubeVirtTypeGuard<IVirtualMachineClone>(
    VirtualMachineClone.apiVersion,
    VirtualMachineClone.kind,
  );

  constructor(data?: ModelData<IVirtualMachineClone>) {
    super(VirtualMachineClone.apiVersion, VirtualMachineClone.kind, data);
  }
}

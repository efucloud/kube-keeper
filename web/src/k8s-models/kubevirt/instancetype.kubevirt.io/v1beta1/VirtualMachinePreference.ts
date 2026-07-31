import type { ModelData } from '@kubernetes-models/base';
import { KubeVirtResource, createKubeVirtTypeGuard, type IKubeVirtResource } from '../../base';

export interface IVirtualMachinePreference extends IKubeVirtResource {
  apiVersion: 'instancetype.kubevirt.io/v1beta1';
  kind: 'VirtualMachinePreference';
}

export class VirtualMachinePreference
  extends KubeVirtResource<IVirtualMachinePreference>
  implements IVirtualMachinePreference
{
  static apiVersion = 'instancetype.kubevirt.io/v1beta1' as const;
  static kind = 'VirtualMachinePreference' as const;
  static is = createKubeVirtTypeGuard<IVirtualMachinePreference>(
    VirtualMachinePreference.apiVersion,
    VirtualMachinePreference.kind,
  );

  constructor(data?: ModelData<IVirtualMachinePreference>) {
    super(VirtualMachinePreference.apiVersion, VirtualMachinePreference.kind, data);
  }
}

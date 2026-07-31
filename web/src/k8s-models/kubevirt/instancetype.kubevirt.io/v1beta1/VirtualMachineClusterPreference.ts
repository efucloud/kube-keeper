import type { ModelData } from '@kubernetes-models/base';
import { KubeVirtResource, createKubeVirtTypeGuard, type IKubeVirtResource } from '../../base';

export interface IVirtualMachineClusterPreference extends IKubeVirtResource {
  apiVersion: 'instancetype.kubevirt.io/v1beta1';
  kind: 'VirtualMachineClusterPreference';
}

export class VirtualMachineClusterPreference
  extends KubeVirtResource<IVirtualMachineClusterPreference>
  implements IVirtualMachineClusterPreference
{
  static apiVersion = 'instancetype.kubevirt.io/v1beta1' as const;
  static kind = 'VirtualMachineClusterPreference' as const;
  static is = createKubeVirtTypeGuard<IVirtualMachineClusterPreference>(
    VirtualMachineClusterPreference.apiVersion,
    VirtualMachineClusterPreference.kind,
  );

  constructor(data?: ModelData<IVirtualMachineClusterPreference>) {
    super(
      VirtualMachineClusterPreference.apiVersion,
      VirtualMachineClusterPreference.kind,
      data,
    );
  }
}

import type { ModelData } from '@kubernetes-models/base';
import { KubeVirtResource, createKubeVirtTypeGuard, type IKubeVirtResource } from '../../base';

export interface IVirtualMachineInstanceMigration extends IKubeVirtResource {
  apiVersion: 'kubevirt.io/v1';
  kind: 'VirtualMachineInstanceMigration';
}

export class VirtualMachineInstanceMigration
  extends KubeVirtResource<IVirtualMachineInstanceMigration>
  implements IVirtualMachineInstanceMigration
{
  static apiVersion = 'kubevirt.io/v1' as const;
  static kind = 'VirtualMachineInstanceMigration' as const;
  static is = createKubeVirtTypeGuard<IVirtualMachineInstanceMigration>(
    VirtualMachineInstanceMigration.apiVersion,
    VirtualMachineInstanceMigration.kind,
  );

  constructor(data?: ModelData<IVirtualMachineInstanceMigration>) {
    super(VirtualMachineInstanceMigration.apiVersion, VirtualMachineInstanceMigration.kind, data);
  }
}

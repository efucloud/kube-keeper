import type { ModelData } from '@kubernetes-models/base';
import { KubeVirtResource, createKubeVirtTypeGuard, type IKubeVirtResource } from '../../base';

export interface IVirtualMachineExport extends IKubeVirtResource {
  apiVersion: 'export.kubevirt.io/v1beta1';
  kind: 'VirtualMachineExport';
}

export class VirtualMachineExport
  extends KubeVirtResource<IVirtualMachineExport>
  implements IVirtualMachineExport
{
  static apiVersion = 'export.kubevirt.io/v1beta1' as const;
  static kind = 'VirtualMachineExport' as const;
  static is = createKubeVirtTypeGuard<IVirtualMachineExport>(
    VirtualMachineExport.apiVersion,
    VirtualMachineExport.kind,
  );

  constructor(data?: ModelData<IVirtualMachineExport>) {
    super(VirtualMachineExport.apiVersion, VirtualMachineExport.kind, data);
  }
}

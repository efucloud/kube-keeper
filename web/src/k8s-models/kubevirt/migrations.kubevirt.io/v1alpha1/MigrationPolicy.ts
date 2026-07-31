import type { ModelData } from '@kubernetes-models/base';
import { KubeVirtResource, createKubeVirtTypeGuard, type IKubeVirtResource } from '../../base';

export interface IMigrationPolicy extends IKubeVirtResource {
  apiVersion: 'migrations.kubevirt.io/v1alpha1';
  kind: 'MigrationPolicy';
}

export class MigrationPolicy
  extends KubeVirtResource<IMigrationPolicy>
  implements IMigrationPolicy
{
  static apiVersion = 'migrations.kubevirt.io/v1alpha1' as const;
  static kind = 'MigrationPolicy' as const;
  static is = createKubeVirtTypeGuard<IMigrationPolicy>(
    MigrationPolicy.apiVersion,
    MigrationPolicy.kind,
  );

  constructor(data?: ModelData<IMigrationPolicy>) {
    super(MigrationPolicy.apiVersion, MigrationPolicy.kind, data);
  }
}

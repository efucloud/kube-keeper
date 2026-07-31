import type { IObjectMeta } from '@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta';
import {
  createTypeMetaGuard,
  Model,
  type ModelData,
  setValidateFunc,
} from '@kubernetes-models/base';
import type { ValidateFunc } from '@kubernetes-models/validate';
import { validate } from '../../_schemas/TriggersTektonDevV1beta1ClusterTriggerBinding';

export interface IClusterTriggerBinding {
  apiVersion: 'triggers.tekton.dev/v1beta1';
  kind: 'ClusterTriggerBinding';
  metadata?: IObjectMeta;
}

export class ClusterTriggerBinding
  extends Model<IClusterTriggerBinding>
  implements IClusterTriggerBinding
{
  apiVersion: IClusterTriggerBinding['apiVersion'];
  kind: IClusterTriggerBinding['kind'];
  metadata?: IClusterTriggerBinding['metadata'];

  static apiVersion: IClusterTriggerBinding['apiVersion'] =
    'triggers.tekton.dev/v1beta1';
  static kind: IClusterTriggerBinding['kind'] = 'ClusterTriggerBinding';
  static is = createTypeMetaGuard<IClusterTriggerBinding>(
    ClusterTriggerBinding,
  );

  constructor(data?: ModelData<IClusterTriggerBinding>) {
    super();

    this.setDefinedProps({
      apiVersion: ClusterTriggerBinding.apiVersion,
      kind: ClusterTriggerBinding.kind,
      ...data,
    } as IClusterTriggerBinding);
  }
}

setValidateFunc(
  ClusterTriggerBinding,
  validate as ValidateFunc<IClusterTriggerBinding>,
);

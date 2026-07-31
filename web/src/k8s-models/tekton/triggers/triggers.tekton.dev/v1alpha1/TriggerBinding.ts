import type { IObjectMeta } from '@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta';
import {
  createTypeMetaGuard,
  Model,
  type ModelData,
  setValidateFunc,
} from '@kubernetes-models/base';
import type { ValidateFunc } from '@kubernetes-models/validate';
import { validate } from '../../_schemas/TriggersTektonDevV1alpha1TriggerBinding';

export interface ITriggerBinding {
  apiVersion: 'triggers.tekton.dev/v1alpha1';
  kind: 'TriggerBinding';
  metadata?: IObjectMeta;
}

export class TriggerBinding
  extends Model<ITriggerBinding>
  implements ITriggerBinding
{
  apiVersion: ITriggerBinding['apiVersion'];
  kind: ITriggerBinding['kind'];
  metadata?: ITriggerBinding['metadata'];

  static apiVersion: ITriggerBinding['apiVersion'] =
    'triggers.tekton.dev/v1alpha1';
  static kind: ITriggerBinding['kind'] = 'TriggerBinding';
  static is = createTypeMetaGuard<ITriggerBinding>(TriggerBinding);

  constructor(data?: ModelData<ITriggerBinding>) {
    super();

    this.setDefinedProps({
      apiVersion: TriggerBinding.apiVersion,
      kind: TriggerBinding.kind,
      ...data,
    } as ITriggerBinding);
  }
}

setValidateFunc(TriggerBinding, validate as ValidateFunc<ITriggerBinding>);

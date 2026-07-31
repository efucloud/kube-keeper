import type { IObjectMeta } from '@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta';
import {
  createTypeMetaGuard,
  Model,
  type ModelData,
  setValidateFunc,
} from '@kubernetes-models/base';
import type { ValidateFunc } from '@kubernetes-models/validate';
import { validate } from '../../_schemas/TriggersTektonDevV1alpha1Trigger';

export interface ITrigger {
  apiVersion: 'triggers.tekton.dev/v1alpha1';
  kind: 'Trigger';
  metadata?: IObjectMeta;
}

export class Trigger extends Model<ITrigger> implements ITrigger {
  apiVersion: ITrigger['apiVersion'];
  kind: ITrigger['kind'];
  metadata?: ITrigger['metadata'];

  static apiVersion: ITrigger['apiVersion'] = 'triggers.tekton.dev/v1alpha1';
  static kind: ITrigger['kind'] = 'Trigger';
  static is = createTypeMetaGuard<ITrigger>(Trigger);

  constructor(data?: ModelData<ITrigger>) {
    super();

    this.setDefinedProps({
      apiVersion: Trigger.apiVersion,
      kind: Trigger.kind,
      ...data,
    } as ITrigger);
  }
}

setValidateFunc(Trigger, validate as ValidateFunc<ITrigger>);

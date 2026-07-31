import type { IObjectMeta } from '@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta';
import {
  createTypeMetaGuard,
  Model,
  type ModelData,
  setValidateFunc,
} from '@kubernetes-models/base';
import type { ValidateFunc } from '@kubernetes-models/validate';
import { validate } from '../../_schemas/TriggersTektonDevV1beta1TriggerTemplate';

export interface ITriggerTemplate {
  apiVersion: 'triggers.tekton.dev/v1beta1';
  kind: 'TriggerTemplate';
  metadata?: IObjectMeta;
}

export class TriggerTemplate
  extends Model<ITriggerTemplate>
  implements ITriggerTemplate
{
  apiVersion: ITriggerTemplate['apiVersion'];
  kind: ITriggerTemplate['kind'];
  metadata?: ITriggerTemplate['metadata'];

  static apiVersion: ITriggerTemplate['apiVersion'] =
    'triggers.tekton.dev/v1beta1';
  static kind: ITriggerTemplate['kind'] = 'TriggerTemplate';
  static is = createTypeMetaGuard<ITriggerTemplate>(TriggerTemplate);

  constructor(data?: ModelData<ITriggerTemplate>) {
    super();

    this.setDefinedProps({
      apiVersion: TriggerTemplate.apiVersion,
      kind: TriggerTemplate.kind,
      ...data,
    } as ITriggerTemplate);
  }
}

setValidateFunc(TriggerTemplate, validate as ValidateFunc<ITriggerTemplate>);

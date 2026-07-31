import type { IObjectMeta } from '@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta';
import {
  createTypeMetaGuard,
  Model,
  type ModelData,
  setValidateFunc,
} from '@kubernetes-models/base';
import type { ValidateFunc } from '@kubernetes-models/validate';
import { validate } from '../../_schemas/TriggersTektonDevV1alpha1EventListener';

export interface IEventListener {
  apiVersion: 'triggers.tekton.dev/v1alpha1';
  kind: 'EventListener';
  metadata?: IObjectMeta;
}

export class EventListener
  extends Model<IEventListener>
  implements IEventListener
{
  apiVersion: IEventListener['apiVersion'];
  kind: IEventListener['kind'];
  metadata?: IEventListener['metadata'];

  static apiVersion: IEventListener['apiVersion'] =
    'triggers.tekton.dev/v1alpha1';
  static kind: IEventListener['kind'] = 'EventListener';
  static is = createTypeMetaGuard<IEventListener>(EventListener);

  constructor(data?: ModelData<IEventListener>) {
    super();

    this.setDefinedProps({
      apiVersion: EventListener.apiVersion,
      kind: EventListener.kind,
      ...data,
    } as IEventListener);
  }
}

setValidateFunc(EventListener, validate as ValidateFunc<IEventListener>);

import type { IObjectMeta } from '@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta';
import {
  createTypeMetaGuard,
  Model,
  type ModelData,
  setValidateFunc,
} from '@kubernetes-models/base';
import type { ValidateFunc } from '@kubernetes-models/validate';
import { validate } from '../../_schemas/TriggersTektonDevV1alpha1Interceptor';

export interface IInterceptor {
  apiVersion: 'triggers.tekton.dev/v1alpha1';
  kind: 'Interceptor';
  metadata?: IObjectMeta;
}

export class Interceptor extends Model<IInterceptor> implements IInterceptor {
  apiVersion: IInterceptor['apiVersion'];
  kind: IInterceptor['kind'];
  metadata?: IInterceptor['metadata'];

  static apiVersion: IInterceptor['apiVersion'] =
    'triggers.tekton.dev/v1alpha1';
  static kind: IInterceptor['kind'] = 'Interceptor';
  static is = createTypeMetaGuard<IInterceptor>(Interceptor);

  constructor(data?: ModelData<IInterceptor>) {
    super();

    this.setDefinedProps({
      apiVersion: Interceptor.apiVersion,
      kind: Interceptor.kind,
      ...data,
    } as IInterceptor);
  }
}

setValidateFunc(Interceptor, validate as ValidateFunc<IInterceptor>);

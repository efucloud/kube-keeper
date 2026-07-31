import type { IObjectMeta } from '@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta';
import {
  createTypeMetaGuard,
  Model,
  type ModelData,
  setValidateFunc,
} from '@kubernetes-models/base';
import type { ValidateFunc } from '@kubernetes-models/validate';
import { validate } from '../../_schemas/TriggersTektonDevV1alpha1ClusterInterceptor';

export interface IClusterInterceptor {
  apiVersion: 'triggers.tekton.dev/v1alpha1';
  kind: 'ClusterInterceptor';
  metadata?: IObjectMeta;
}

export class ClusterInterceptor
  extends Model<IClusterInterceptor>
  implements IClusterInterceptor
{
  apiVersion: IClusterInterceptor['apiVersion'];
  kind: IClusterInterceptor['kind'];
  metadata?: IClusterInterceptor['metadata'];

  static apiVersion: IClusterInterceptor['apiVersion'] =
    'triggers.tekton.dev/v1alpha1';
  static kind: IClusterInterceptor['kind'] = 'ClusterInterceptor';
  static is = createTypeMetaGuard<IClusterInterceptor>(ClusterInterceptor);

  constructor(data?: ModelData<IClusterInterceptor>) {
    super();

    this.setDefinedProps({
      apiVersion: ClusterInterceptor.apiVersion,
      kind: ClusterInterceptor.kind,
      ...data,
    } as IClusterInterceptor);
  }
}

setValidateFunc(
  ClusterInterceptor,
  validate as ValidateFunc<IClusterInterceptor>,
);

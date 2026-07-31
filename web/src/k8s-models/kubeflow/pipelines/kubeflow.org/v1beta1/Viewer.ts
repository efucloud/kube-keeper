import type { IObjectMeta } from '@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta';
import {
  createTypeMetaGuard,
  Model,
  type ModelData,
  setValidateFunc,
} from '@kubernetes-models/base';
import type { ValidateFunc } from '@kubernetes-models/validate';
import { validate } from '../../_schemas/KubeflowOrgV1beta1Viewer';

export interface IViewer {
  apiVersion: 'kubeflow.org/v1beta1';
  kind: 'Viewer';
  metadata?: IObjectMeta;
  spec: {};
}

export class Viewer extends Model<IViewer> implements IViewer {
  apiVersion: IViewer['apiVersion'];
  kind: IViewer['kind'];
  metadata?: IViewer['metadata'];
  spec: IViewer['spec'];

  static apiVersion: IViewer['apiVersion'] = 'kubeflow.org/v1beta1';
  static kind: IViewer['kind'] = 'Viewer';
  static is = createTypeMetaGuard<IViewer>(Viewer);

  constructor(data?: ModelData<IViewer>) {
    super();

    this.setDefinedProps({
      apiVersion: Viewer.apiVersion,
      kind: Viewer.kind,
      ...data,
    } as IViewer);
  }
}

setValidateFunc(Viewer, validate as ValidateFunc<IViewer>);

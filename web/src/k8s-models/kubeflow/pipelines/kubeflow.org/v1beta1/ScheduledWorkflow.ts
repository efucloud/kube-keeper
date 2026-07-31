import type { IObjectMeta } from '@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta';
import {
  createTypeMetaGuard,
  Model,
  type ModelData,
  setValidateFunc,
} from '@kubernetes-models/base';
import type { ValidateFunc } from '@kubernetes-models/validate';
import { validate } from '../../_schemas/KubeflowOrgV1beta1ScheduledWorkflow';

export interface IScheduledWorkflow {
  apiVersion: 'kubeflow.org/v1beta1';
  kind: 'ScheduledWorkflow';
  metadata?: IObjectMeta;
  spec: {};
  status: {};
}

export class ScheduledWorkflow
  extends Model<IScheduledWorkflow>
  implements IScheduledWorkflow
{
  apiVersion: IScheduledWorkflow['apiVersion'];
  kind: IScheduledWorkflow['kind'];
  metadata?: IScheduledWorkflow['metadata'];
  spec: IScheduledWorkflow['spec'];
  status: IScheduledWorkflow['status'];

  static apiVersion: IScheduledWorkflow['apiVersion'] = 'kubeflow.org/v1beta1';
  static kind: IScheduledWorkflow['kind'] = 'ScheduledWorkflow';
  static is = createTypeMetaGuard<IScheduledWorkflow>(ScheduledWorkflow);

  constructor(data?: ModelData<IScheduledWorkflow>) {
    super();

    this.setDefinedProps({
      apiVersion: ScheduledWorkflow.apiVersion,
      kind: ScheduledWorkflow.kind,
      ...data,
    } as IScheduledWorkflow);
  }
}

setValidateFunc(
  ScheduledWorkflow,
  validate as ValidateFunc<IScheduledWorkflow>,
);

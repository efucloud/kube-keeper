import type { IObjectMeta } from '@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta';
import {
  createTypeMetaGuard,
  Model,
  type ModelData,
  setValidateFunc,
} from '@kubernetes-models/base';
import type { ValidateFunc } from '@kubernetes-models/validate';
import { validate } from '../../_schemas/FlowVolcanoShV1alpha1JobFlow';

export interface IJobFlow {
  apiVersion: 'flow.volcano.sh/v1alpha1';
  kind: 'JobFlow';
  metadata?: IObjectMeta;
  spec?: {
    flows?: Array<{
      dependsOn?: {
        probe?: {
          httpGetList?: Array<{
            httpHeader?: {
              name: string;
              value: string;
            };
            path?: string;
            port?: number;
            taskName?: string;
          }>;
          taskStatusList?: Array<{
            phase?: string;
            taskName?: string;
          }>;
          tcpSocketList?: Array<{
            port: number;
            taskName?: string;
          }>;
        };
        targets?: Array<string>;
      };
      name: string;
    }>;
    jobRetainPolicy?: 'retain' | 'delete';
  };
  status?: {
    completedJobs?: Array<string>;
    conditions?: {
      [key: string]: {
        createTime?: string;
        phase?: string;
        runningDuration?: string;
        taskStatusCount?: {
          [key: string]: {
            phase?: {
              [key: string]: number;
            };
          };
        };
      };
    };
    failedJobs?: Array<string>;
    jobStatusList?: Array<{
      endTimestamp?: string;
      name?: string;
      restartCount?: number;
      runningHistories?: Array<{
        endTimestamp?: string;
        startTimestamp?: string;
        state?: string;
      }>;
      startTimestamp?: string;
      state?: string;
    }>;
    pendingJobs?: Array<string>;
    runningJobs?: Array<string>;
    state?: {
      phase?: string;
    };
    terminatedJobs?: Array<string>;
    unKnowJobs?: Array<string>;
  };
}

export class JobFlow extends Model<IJobFlow> implements IJobFlow {
  apiVersion: IJobFlow['apiVersion'];
  kind: IJobFlow['kind'];
  metadata?: IJobFlow['metadata'];
  spec?: IJobFlow['spec'];
  status?: IJobFlow['status'];

  static apiVersion: IJobFlow['apiVersion'] = 'flow.volcano.sh/v1alpha1';
  static kind: IJobFlow['kind'] = 'JobFlow';
  static is = createTypeMetaGuard<IJobFlow>(JobFlow);

  constructor(data?: ModelData<IJobFlow>) {
    super();

    this.setDefinedProps({
      apiVersion: JobFlow.apiVersion,
      kind: JobFlow.kind,
      ...data,
    } as IJobFlow);
  }
}

setValidateFunc(JobFlow, validate as ValidateFunc<IJobFlow>);

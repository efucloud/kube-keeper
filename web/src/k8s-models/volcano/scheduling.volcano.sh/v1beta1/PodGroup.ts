import type { IObjectMeta } from '@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta';
import {
  createTypeMetaGuard,
  Model,
  type ModelData,
  setValidateFunc,
} from '@kubernetes-models/base';
import type { ValidateFunc } from '@kubernetes-models/validate';
import { validate } from '../../_schemas/SchedulingVolcanoShV1beta1PodGroup';

/**
 * PodGroup is a collection of Pod; used for batch workload.
 */
export interface IPodGroup {
  /**
   * APIVersion defines the versioned schema of this representation of an object.
   * Servers should convert recognized schemas to the latest internal value, and
   * may reject unrecognized values.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   */
  apiVersion: 'scheduling.volcano.sh/v1beta1';
  /**
   * Kind is a string value representing the REST resource this object represents.
   * Servers may infer this from the endpoint the client submits requests to.
   * Cannot be updated.
   * In CamelCase.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   */
  kind: 'PodGroup';
  metadata?: IObjectMeta;
  /**
   * Specification of the desired behavior of the pod group.
   * More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#spec-and-status
   */
  spec?: {
    /**
     * MinMember defines the minimal number of members/tasks to run the pod group;
     * if there's not enough resources to start all tasks, the scheduler
     * will not start anyone.
     */
    minMember?: number;
    /**
     * MinResources defines the minimal resource of members/tasks to run the pod group;
     * if there's not enough resources to start all tasks, the scheduler
     * will not start anyone.
     */
    minResources?: {
      [key: string]: number | string;
    };
    /**
     * MinTaskMember defines the minimal number of pods to run each task in the pod group;
     * if there's not enough resources to start each task, the scheduler
     * will not start anyone.
     */
    minTaskMember?: {
      [key: string]: number;
    };
    /**
     * NetworkTopology defines the NetworkTopology config, this field works in conjunction with network topology feature and hyperNode CRD.
     */
    networkTopology?: {
      /**
       * HighestTierAllowed specifies the highest tier that a job allowed to cross when scheduling.
       */
      highestTierAllowed?: number;
      /**
       * Mode specifies the mode of the network topology constrain.
       */
      mode?: 'hard' | 'soft';
    };
    /**
     * If specified, indicates the PodGroup's priority. "system-node-critical" and
     * "system-cluster-critical" are two special keywords which indicate the
     * highest priorities with the former being the highest priority. Any other
     * name must be defined by creating a PriorityClass object with that name.
     * If not specified, the PodGroup priority will be default or zero if there is no
     * default.
     */
    priorityClassName?: string;
    /**
     * Queue defines the queue to allocate resource for PodGroup; if queue does not exist,
     * the PodGroup will not be scheduled. Defaults to `default` Queue with the lowest weight.
     */
    queue?: string;
  };
  /**
   * Status represents the current information about a pod group.
   * This data may not be up to date.
   */
  status?: {
    /**
     * The conditions of PodGroup.
     */
    conditions?: Array<{
      /**
       * Last time the phase transitioned from another to current phase.
       */
      lastTransitionTime?: string;
      /**
       * Human-readable message indicating details about last transition.
       */
      message?: string;
      /**
       * Unique, one-word, CamelCase reason for the phase's last transition.
       */
      reason?: string;
      /**
       * Status is the status of the condition.
       */
      status?: string;
      /**
       * The ID of condition transition.
       */
      transitionID?: string;
      /**
       * Type is the type of the condition
       */
      type?: string;
    }>;
    /**
     * The number of pods which reached phase Failed.
     */
    failed?: number;
    /**
     * Current phase of PodGroup.
     */
    phase?: string;
    /**
     * The number of actively running pods.
     */
    running?: number;
    /**
     * The number of pods which reached phase Succeeded.
     */
    succeeded?: number;
  };
}

/**
 * PodGroup is a collection of Pod; used for batch workload.
 */
export class PodGroup extends Model<IPodGroup> implements IPodGroup {
  apiVersion: IPodGroup['apiVersion'];
  kind: IPodGroup['kind'];
  metadata?: IPodGroup['metadata'];
  spec?: IPodGroup['spec'];
  status?: IPodGroup['status'];

  static apiVersion: IPodGroup['apiVersion'] = 'scheduling.volcano.sh/v1beta1';
  static kind: IPodGroup['kind'] = 'PodGroup';
  static is = createTypeMetaGuard<IPodGroup>(PodGroup);

  constructor(data?: ModelData<IPodGroup>) {
    super();

    this.setDefinedProps({
      apiVersion: PodGroup.apiVersion,
      kind: PodGroup.kind,
      ...data,
    } as IPodGroup);
  }
}

setValidateFunc(PodGroup, validate as ValidateFunc<IPodGroup>);

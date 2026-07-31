import type { IObjectMeta } from '@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta';
import {
  createTypeMetaGuard,
  Model,
  type ModelData,
  setValidateFunc,
} from '@kubernetes-models/base';
import type { ValidateFunc } from '@kubernetes-models/validate';
import { validate } from '../../_schemas/SchedulingVolcanoShV1beta1Queue';

/**
 * Queue is a queue of PodGroup.
 */
export interface IQueue {
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
  kind: 'Queue';
  metadata?: IObjectMeta;
  /**
   * Specification of the desired behavior of the queue.
   * More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#spec-and-status
   */
  spec?: {
    /**
     * If specified, the pod owned by the queue will be scheduled with constraint
     */
    affinity?: {
      /**
       * Describes nodegroup affinity scheduling rules for the queue(e.g. putting pods of the queue in the nodes of the nodegroup)
       */
      nodeGroupAffinity?: {
        preferredDuringSchedulingIgnoredDuringExecution?: Array<string>;
        requiredDuringSchedulingIgnoredDuringExecution?: Array<string>;
      };
      /**
       * Describes nodegroup anti-affinity scheduling rules for the queue(e.g. avoid putting pods of the queue in the nodes of the nodegroup).
       */
      nodeGroupAntiAffinity?: {
        preferredDuringSchedulingIgnoredDuringExecution?: Array<string>;
        requiredDuringSchedulingIgnoredDuringExecution?: Array<string>;
      };
    };
    /**
     * ResourceList is a set of (resource name, quantity) pairs.
     */
    capability?: {
      [key: string]: number | string;
    };
    /**
     * The amount of resources configured by the user. This part of resource can be shared with other queues and reclaimed back.
     */
    deserved?: {
      [key: string]: number | string;
    };
    /**
     * extendCluster indicate the jobs in this Queue will be dispatched to these clusters.
     */
    extendClusters?: Array<{
      /**
       * ResourceList is a set of (resource name, quantity) pairs.
       */
      capacity?: {
        [key: string]: number | string;
      };
      name?: string;
      weight?: number;
    }>;
    /**
     * Guarantee indicate configuration about resource reservation
     */
    guarantee?: {
      /**
       * The amount of cluster resource reserved for queue. Just set either `percentage` or `resource`
       */
      resource?: {
        [key: string]: number | string;
      };
    };
    /**
     * Parent define the parent of queue
     */
    parent?: string;
    /**
     * Priority define the priority of queue. Higher values are prioritized for scheduling and considered later during reclamation.
     */
    priority?: number;
    /**
     * Reclaimable indicate whether the queue can be reclaimed by other queue
     */
    reclaimable?: boolean;
    /**
     * Type define the type of queue
     */
    type?: string;
    weight?: number;
  };
  /**
   * The status of queue.
   */
  status?: {
    /**
     * Allocated is allocated resources in queue
     */
    allocated?: {
      [key: string]: number | string;
    };
    /**
     * The number of `Completed` PodGroup in this queue.
     */
    completed?: number;
    /**
     * The number of `Inqueue` PodGroup in this queue.
     */
    inqueue?: number;
    /**
     * The number of 'Pending' PodGroup in this queue.
     */
    pending?: number;
    /**
     * Reservation is the profile of resource reservation for queue
     */
    reservation?: {
      /**
       * Nodes are Locked nodes for queue
       */
      nodes?: Array<string>;
      /**
       * Resource is a list of total idle resource in locked nodes.
       */
      resource?: {
        [key: string]: number | string;
      };
    };
    /**
     * The number of 'Running' PodGroup in this queue.
     */
    running?: number;
    /**
     * State is state of queue
     */
    state?: string;
    /**
     * The number of 'Unknown' PodGroup in this queue.
     */
    unknown?: number;
  };
}

/**
 * Queue is a queue of PodGroup.
 */
export class Queue extends Model<IQueue> implements IQueue {
  apiVersion: IQueue['apiVersion'];
  kind: IQueue['kind'];
  metadata?: IQueue['metadata'];
  spec?: IQueue['spec'];
  status?: IQueue['status'];

  static apiVersion: IQueue['apiVersion'] = 'scheduling.volcano.sh/v1beta1';
  static kind: IQueue['kind'] = 'Queue';
  static is = createTypeMetaGuard<IQueue>(Queue);

  constructor(data?: ModelData<IQueue>) {
    super();

    this.setDefinedProps({
      apiVersion: Queue.apiVersion,
      kind: Queue.kind,
      ...data,
    } as IQueue);
  }
}

setValidateFunc(Queue, validate as ValidateFunc<IQueue>);

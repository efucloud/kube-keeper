import type { IObjectMeta } from '@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta';
import {
  createTypeMetaGuard,
  Model,
  type ModelData,
  setValidateFunc,
} from '@kubernetes-models/base';
import type { ValidateFunc } from '@kubernetes-models/validate';
import { validate } from '../../_schemas/TopologyVolcanoShV1alpha1HyperNode';

/**
 * HyperNode represents a collection of nodes sharing similar network topology or performance characteristics.
 */
export interface IHyperNode {
  /**
   * APIVersion defines the versioned schema of this representation of an object.
   * Servers should convert recognized schemas to the latest internal value, and
   * may reject unrecognized values.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   */
  apiVersion: 'topology.volcano.sh/v1alpha1';
  /**
   * Kind is a string value representing the REST resource this object represents.
   * Servers may infer this from the endpoint the client submits requests to.
   * Cannot be updated.
   * In CamelCase.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   */
  kind: 'HyperNode';
  metadata?: IObjectMeta;
  /**
   * Spec defines the desired configuration of the HyperNode.
   */
  spec?: {
    /**
     * Members defines a list of node groups or individual nodes included in the HyperNode.
     */
    members?: Array<{
      /**
       * Selector defines the selection rules for this member.
       */
      selector?: {
        /**
         * ExactMatch defines the exact match criteria.
         */
        exactMatch?: {
          /**
           * Name specifies the exact name of the node to match.
           */
          name?: string;
        };
        /**
         * LabelMatch defines the labels match criteria (only take effect when Member Type is "Node").
         */
        labelMatch?: {
          /**
           * matchExpressions is a list of label selector requirements. The requirements are ANDed.
           */
          matchExpressions?: Array<{
            /**
             * key is the label key that the selector applies to.
             */
            key: string;
            /**
             * operator represents a key's relationship to a set of values.
             * Valid operators are In, NotIn, Exists and DoesNotExist.
             */
            operator: string;
            /**
             * values is an array of string values. If the operator is In or NotIn,
             * the values array must be non-empty. If the operator is Exists or DoesNotExist,
             * the values array must be empty. This array is replaced during a strategic
             * merge patch.
             */
            values?: Array<string>;
          }>;
          /**
           * matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels
           * map is equivalent to an element of matchExpressions, whose key field is "key", the
           * operator is "In", and the values array contains only "value". The requirements are ANDed.
           */
          matchLabels?: {
            [key: string]: string;
          };
        };
        /**
         * RegexMatch defines the regex match criteria.
         */
        regexMatch?: {
          /**
           * Pattern defines the regex pattern to match node names.
           */
          pattern?: string;
        };
      };
      /**
       * Type specifies the member type.
       */
      type: 'Node' | 'HyperNode';
    }>;
    /**
     * Tier categorizes the performance level of the HyperNode.
     */
    tier: number;
  };
  /**
   * Status provides the current state of the HyperNode.
   */
  status?: {
    /**
     * Conditions provide details about the current state of the HyperNode.
     */
    conditions?: Array<{
      /**
       * lastTransitionTime is the last time the condition transitioned from one status to another.
       * This should be when the underlying condition changed.  If that is not known, then using the time when the API field changed is acceptable.
       */
      lastTransitionTime: string;
      /**
       * message is a human readable message indicating details about the transition.
       * This may be an empty string.
       */
      message: string;
      /**
       * observedGeneration represents the .metadata.generation that the condition was set based upon.
       * For instance, if .metadata.generation is currently 12, but the .status.conditions[x].observedGeneration is 9, the condition is out of date
       * with respect to the current state of the instance.
       */
      observedGeneration?: number;
      /**
       * reason contains a programmatic identifier indicating the reason for the condition's last transition.
       * Producers of specific condition types may define expected values and meanings for this field,
       * and whether the values are considered a guaranteed API.
       * The value should be a CamelCase string.
       * This field may not be empty.
       */
      reason: string;
      /**
       * status of the condition, one of True, False, Unknown.
       */
      status: 'True' | 'False' | 'Unknown';
      /**
       * type of condition in CamelCase or in foo.example.com/CamelCase.
       */
      type: string;
    }>;
    /**
     * NodeCount is the total number of nodes currently in the HyperNode.
     */
    nodeCount?: number;
  };
}

/**
 * HyperNode represents a collection of nodes sharing similar network topology or performance characteristics.
 */
export class HyperNode extends Model<IHyperNode> implements IHyperNode {
  apiVersion: IHyperNode['apiVersion'];
  kind: IHyperNode['kind'];
  metadata?: IHyperNode['metadata'];
  spec?: IHyperNode['spec'];
  status?: IHyperNode['status'];

  static apiVersion: IHyperNode['apiVersion'] = 'topology.volcano.sh/v1alpha1';
  static kind: IHyperNode['kind'] = 'HyperNode';
  static is = createTypeMetaGuard<IHyperNode>(HyperNode);

  constructor(data?: ModelData<IHyperNode>) {
    super();

    this.setDefinedProps({
      apiVersion: HyperNode.apiVersion,
      kind: HyperNode.kind,
      ...data,
    } as IHyperNode);
  }
}

setValidateFunc(HyperNode, validate as ValidateFunc<IHyperNode>);

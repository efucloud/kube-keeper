import type { IObjectMeta } from '@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta';
import {
  createTypeMetaGuard,
  Model,
  type ModelData,
  setValidateFunc,
} from '@kubernetes-models/base';
import type { ValidateFunc } from '@kubernetes-models/validate';
import { validate } from '../../_schemas/NodeinfoVolcanoShV1alpha1Numatopology';

/**
 * Numatopology is the Schema for the Numatopologies API
 */
export interface INumatopology {
  /**
   * APIVersion defines the versioned schema of this representation of an object.
   * Servers should convert recognized schemas to the latest internal value, and
   * may reject unrecognized values.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   */
  apiVersion: 'nodeinfo.volcano.sh/v1alpha1';
  /**
   * Kind is a string value representing the REST resource this object represents.
   * Servers may infer this from the endpoint the client submits requests to.
   * Cannot be updated.
   * In CamelCase.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   */
  kind: 'Numatopology';
  metadata?: IObjectMeta;
  /**
   * Specification of the numa information of the worker node
   */
  spec?: {
    /**
     * Specifies the cpu topology info
     * Key is cpu id
     */
    cpuDetail?: {
      [key: string]: {
        core?: number;
        numa?: number;
        socket?: number;
      };
    };
    /**
     * Specifies the numa info for the resource
     * Key is resource name
     */
    numares?: {
      [key: string]: {
        allocatable?: string;
        capacity?: number;
      };
    };
    /**
     * Specifies the policy of the manager
     */
    policies?: {
      [key: string]: string;
    };
    /**
     * Specifies the reserved resource of the node
     * Key is resource name
     */
    resReserved?: {
      [key: string]: string;
    };
  };
}

/**
 * Numatopology is the Schema for the Numatopologies API
 */
export class Numatopology
  extends Model<INumatopology>
  implements INumatopology
{
  apiVersion: INumatopology['apiVersion'];
  kind: INumatopology['kind'];
  metadata?: INumatopology['metadata'];
  spec?: INumatopology['spec'];

  static apiVersion: INumatopology['apiVersion'] =
    'nodeinfo.volcano.sh/v1alpha1';
  static kind: INumatopology['kind'] = 'Numatopology';
  static is = createTypeMetaGuard<INumatopology>(Numatopology);

  constructor(data?: ModelData<INumatopology>) {
    super();

    this.setDefinedProps({
      apiVersion: Numatopology.apiVersion,
      kind: Numatopology.kind,
      ...data,
    } as INumatopology);
  }
}

setValidateFunc(Numatopology, validate as ValidateFunc<INumatopology>);

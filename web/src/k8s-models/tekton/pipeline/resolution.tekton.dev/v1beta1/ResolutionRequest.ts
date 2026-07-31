import type { IObjectMeta } from '@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta';
import {
  createTypeMetaGuard,
  Model,
  type ModelData,
  setValidateFunc,
} from '@kubernetes-models/base';
import type { ValidateFunc } from '@kubernetes-models/validate';
import { validate } from '../../_schemas/ResolutionTektonDevV1beta1ResolutionRequest';

/**
 * ResolutionRequest is an object for requesting the content of
 * a Tekton resource like a pipeline.yaml.
 */
export interface IResolutionRequest {
  /**
   * APIVersion defines the versioned schema of this representation of an object.
   * Servers should convert recognized schemas to the latest internal value, and
   * may reject unrecognized values.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   */
  apiVersion: 'resolution.tekton.dev/v1beta1';
  /**
   * Kind is a string value representing the REST resource this object represents.
   * Servers may infer this from the endpoint the client submits requests to.
   * Cannot be updated.
   * In CamelCase.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   */
  kind: 'ResolutionRequest';
  metadata?: IObjectMeta;
  /**
   * Spec holds the information for the request part of the resource request.
   */
  spec?: {
    /**
     * Parameters are the runtime attributes passed to
     * the resolver to help it figure out how to resolve the
     * resource being requested. For example: repo URL, commit SHA,
     * path to file, the kind of authentication to leverage, etc.
     */
    params?: Array<{
      name: string;
      value: any;
    }>;
    /**
     * URL is the runtime url passed to the resolver
     * to help it figure out how to resolver the resource being
     * requested.
     * This is currently at an ALPHA stability level and subject to
     * alpha API compatibility policies.
     */
    url?: string;
  };
  /**
   * Status communicates the state of the request and, ultimately,
   * the content of the resolved resource.
   */
  status?: {
    /**
     * Annotations is additional Status fields for the Resource to save some
     * additional State as well as convey more information to the user. This is
     * roughly akin to Annotations on any k8s resource, just the reconciler conveying
     * richer information outwards.
     */
    annotations?: {
      [key: string]: string;
    };
    /**
     * Conditions the latest available observations of a resource's current state.
     */
    conditions?: Array<{
      /**
       * LastTransitionTime is the last time the condition transitioned from one status to another.
       * We use VolatileTime in place of metav1.Time to exclude this from creating equality.Semantic
       * differences (all other things held constant).
       */
      lastTransitionTime?: string;
      /**
       * A human readable message indicating details about the transition.
       */
      message?: string;
      /**
       * The reason for the condition's last transition.
       */
      reason?: string;
      /**
       * Severity with which to treat failures of this type of condition.
       * When this is not specified, it defaults to Error.
       */
      severity?: string;
      /**
       * Status of the condition, one of True, False, Unknown.
       */
      status: string;
      /**
       * Type of condition.
       */
      type: string;
    }>;
    /**
     * Data is a string representation of the resolved content
     * of the requested resource in-lined into the ResolutionRequest
     * object.
     */
    data: string;
    /**
     * ObservedGeneration is the 'Generation' of the Service that
     * was last processed by the controller.
     */
    observedGeneration?: number;
    /**
     * RefSource is the source reference of the remote data that records the url, digest
     * and the entrypoint.
     */
    refSource: any;
    /**
     * Deprecated: Use RefSource instead
     */
    source: any;
  };
}

/**
 * ResolutionRequest is an object for requesting the content of
 * a Tekton resource like a pipeline.yaml.
 */
export class ResolutionRequest
  extends Model<IResolutionRequest>
  implements IResolutionRequest
{
  apiVersion: IResolutionRequest['apiVersion'];
  kind: IResolutionRequest['kind'];
  metadata?: IResolutionRequest['metadata'];
  spec?: IResolutionRequest['spec'];
  status?: IResolutionRequest['status'];

  static apiVersion: IResolutionRequest['apiVersion'] =
    'resolution.tekton.dev/v1beta1';
  static kind: IResolutionRequest['kind'] = 'ResolutionRequest';
  static is = createTypeMetaGuard<IResolutionRequest>(ResolutionRequest);

  constructor(data?: ModelData<IResolutionRequest>) {
    super();

    this.setDefinedProps({
      apiVersion: ResolutionRequest.apiVersion,
      kind: ResolutionRequest.kind,
      ...data,
    } as IResolutionRequest);
  }
}

setValidateFunc(
  ResolutionRequest,
  validate as ValidateFunc<IResolutionRequest>,
);

import { IObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { Model, ModelData, setValidateFunc, createTypeMetaGuard } from "@kubernetes-models/base";
import { ValidateFunc } from "@kubernetes-models/validate";
import { validate } from "../../_schemas/GatewayNetworkingK8sIoV1ReferenceGrant";

/**
 * ReferenceGrant identifies kinds of resources in other namespaces that are
 * trusted to reference the specified kinds of resources in the same namespace
 * as the policy.
 * 
 * Each ReferenceGrant can be used to represent a unique trust relationship.
 * Additional Reference Grants can be used to add to the set of trusted
 * sources of inbound references for the namespace they are defined within.
 * 
 * All cross-namespace references in Gateway API (with the exception of cross-namespace
 * Gateway-route attachment) require a ReferenceGrant.
 * 
 * ReferenceGrant is a form of runtime verification allowing users to assert
 * which cross-namespace object references are permitted. Implementations that
 * support ReferenceGrant MUST NOT permit cross-namespace references which have
 * no grant, and MUST respond to the removal of a grant by revoking the access
 * that the grant allowed.
 */
export interface IReferenceGrant {
  /**
   * APIVersion defines the versioned schema of this representation of an object.
   * Servers should convert recognized schemas to the latest internal value, and
   * may reject unrecognized values.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   */
  "apiVersion": "gateway.networking.k8s.io/v1";
  /**
   * Kind is a string value representing the REST resource this object represents.
   * Servers may infer this from the endpoint the client submits requests to.
   * Cannot be updated.
   * In CamelCase.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   */
  "kind": "ReferenceGrant";
  "metadata"?: IObjectMeta;
  /**
   * Spec defines the desired state of ReferenceGrant.
   */
  "spec"?: {
    /**
     * From describes the trusted namespaces and kinds that can reference the
     * resources described in "To". Each entry in this list MUST be considered
     * to be an additional place that references can be valid from, or to put
     * this another way, entries MUST be combined using OR.
     * 
     * Support: Core
     */
    "from": Array<{
      /**
       * Group is the group of the referent.
       * When empty, the Kubernetes core API group is inferred.
       * 
       * Support: Core
       */
      "group": string;
      /**
       * Kind is the kind of the referent. Although implementations may support
       * additional resources, the following types are part of the "Core"
       * support level for this field.
       * 
       * When used to permit a SecretObjectReference:
       * 
       * \* Gateway
       * 
       * When used to permit a BackendObjectReference:
       * 
       * \* GRPCRoute
       * \* HTTPRoute
       * \* TCPRoute
       * \* TLSRoute
       * \* UDPRoute
       */
      "kind": string;
      /**
       * Namespace is the namespace of the referent.
       * 
       * Support: Core
       */
      "namespace": string;
    }>;
    /**
     * To describes the resources that may be referenced by the resources
     * described in "From". Each entry in this list MUST be considered to be an
     * additional place that references can be valid to, or to put this another
     * way, entries MUST be combined using OR.
     * 
     * Support: Core
     */
    "to": Array<{
      /**
       * Group is the group of the referent.
       * When empty, the Kubernetes core API group is inferred.
       * 
       * Support: Core
       */
      "group": string;
      /**
       * Kind is the kind of the referent. Although implementations may support
       * additional resources, the following types are part of the "Core"
       * support level for this field:
       * 
       * \* Secret when used to permit a SecretObjectReference
       * \* Service when used to permit a BackendObjectReference
       */
      "kind": string;
      /**
       * Name is the name of the referent. When unspecified, this policy
       * refers to all resources of the specified Group and Kind in the local
       * namespace.
       */
      "name"?: string;
    }>;
  };
}

/**
 * ReferenceGrant identifies kinds of resources in other namespaces that are
 * trusted to reference the specified kinds of resources in the same namespace
 * as the policy.
 * 
 * Each ReferenceGrant can be used to represent a unique trust relationship.
 * Additional Reference Grants can be used to add to the set of trusted
 * sources of inbound references for the namespace they are defined within.
 * 
 * All cross-namespace references in Gateway API (with the exception of cross-namespace
 * Gateway-route attachment) require a ReferenceGrant.
 * 
 * ReferenceGrant is a form of runtime verification allowing users to assert
 * which cross-namespace object references are permitted. Implementations that
 * support ReferenceGrant MUST NOT permit cross-namespace references which have
 * no grant, and MUST respond to the removal of a grant by revoking the access
 * that the grant allowed.
 */
export class ReferenceGrant extends Model<IReferenceGrant> implements IReferenceGrant {
  "apiVersion": IReferenceGrant["apiVersion"];
  "kind": IReferenceGrant["kind"];
  "metadata"?: IReferenceGrant["metadata"];
  "spec"?: IReferenceGrant["spec"];

static apiVersion: IReferenceGrant["apiVersion"] = "gateway.networking.k8s.io/v1";
static kind: IReferenceGrant["kind"] = "ReferenceGrant";
static is = createTypeMetaGuard<IReferenceGrant>(ReferenceGrant);

constructor(data?: ModelData<IReferenceGrant>) {
  super();

  this.setDefinedProps({
    apiVersion: ReferenceGrant.apiVersion,
    kind: ReferenceGrant.kind,
    ...data
  } as IReferenceGrant);
}
}


setValidateFunc(ReferenceGrant, validate as ValidateFunc<IReferenceGrant>);

import { IObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { Model, ModelData, setValidateFunc, createTypeMetaGuard } from "@kubernetes-models/base";
import { ValidateFunc } from "@kubernetes-models/validate";
import { validate } from "../../_schemas/GatewayNetworkingXK8sIoV1alpha1XMesh";

/**
 * XMesh defines mesh-wide characteristics of a GAMMA-compliant service mesh.
 */
export interface IXMesh {
  /**
   * APIVersion defines the versioned schema of this representation of an object.
   * Servers should convert recognized schemas to the latest internal value, and
   * may reject unrecognized values.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   */
  "apiVersion": "gateway.networking.x-k8s.io/v1alpha1";
  /**
   * Kind is a string value representing the REST resource this object represents.
   * Servers may infer this from the endpoint the client submits requests to.
   * Cannot be updated.
   * In CamelCase.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   */
  "kind": "XMesh";
  "metadata"?: IObjectMeta;
  /**
   * Spec defines the desired state of XMesh.
   */
  "spec": {
    /**
     * ControllerName is the name of a controller that is managing Gateway API
     * resources for mesh traffic management. The value of this field MUST be a
     * domain prefixed path.
     * 
     * Example: "example.com/awesome-mesh".
     * 
     * This field is not mutable and cannot be empty.
     * 
     * Support: Core
     */
    "controllerName": string;
    /**
     * Description optionally provides a human-readable description of a Mesh.
     */
    "description"?: string;
    /**
     * ParametersRef is an optional reference to a resource that contains
     * implementation-specific configuration for this Mesh. If no
     * implementation-specific parameters are needed, this field MUST be
     * omitted.
     * 
     * ParametersRef can reference a standard Kubernetes resource, i.e.
     * ConfigMap, or an implementation-specific custom resource. The resource
     * can be cluster-scoped or namespace-scoped.
     * 
     * If the referent cannot be found, refers to an unsupported kind, or when
     * the data within that resource is malformed, the Mesh MUST be rejected
     * with the "Accepted" status condition set to "False" and an
     * "InvalidParameters" reason.
     * 
     * Support: Implementation-specific
     */
    "parametersRef"?: {
      /**
       * Group is the group of the referent.
       */
      "group": string;
      /**
       * Kind is kind of the referent.
       */
      "kind": string;
      /**
       * Name is the name of the referent.
       */
      "name": string;
      /**
       * Namespace is the namespace of the referent.
       * This field is required when referring to a Namespace-scoped resource and
       * MUST be unset when referring to a Cluster-scoped resource.
       */
      "namespace"?: string;
    };
  };
  /**
   * Status defines the current state of XMesh.
   */
  "status"?: {
    /**
     * Conditions is the current status from the controller for
     * this Mesh.
     * 
     * Controllers should prefer to publish conditions using values
     * of MeshConditionType for the type of each Condition.
     */
    "conditions"?: Array<{
      /**
       * lastTransitionTime is the last time the condition transitioned from one status to another.
       * This should be when the underlying condition changed.  If that is not known, then using the time when the API field changed is acceptable.
       */
      "lastTransitionTime": string;
      /**
       * message is a human readable message indicating details about the transition.
       * This may be an empty string.
       */
      "message": string;
      /**
       * observedGeneration represents the .metadata.generation that the condition was set based upon.
       * For instance, if .metadata.generation is currently 12, but the .status.conditions[x].observedGeneration is 9, the condition is out of date
       * with respect to the current state of the instance.
       */
      "observedGeneration"?: number;
      /**
       * reason contains a programmatic identifier indicating the reason for the condition's last transition.
       * Producers of specific condition types may define expected values and meanings for this field,
       * and whether the values are considered a guaranteed API.
       * The value should be a CamelCase string.
       * This field may not be empty.
       */
      "reason": string;
      /**
       * status of the condition, one of True, False, Unknown.
       */
      "status": "True" | "False" | "Unknown";
      /**
       * type of condition in CamelCase or in foo.example.com/CamelCase.
       */
      "type": string;
    }>;
    /**
     * SupportedFeatures is the set of features the Mesh support.
     * It MUST be sorted in ascending alphabetical order by the Name key.
     */
    "supportedFeatures"?: Array<{
      /**
       * FeatureName is used to describe distinct features that are covered by
       * conformance tests.
       */
      "name": string;
    }>;
  };
}

/**
 * XMesh defines mesh-wide characteristics of a GAMMA-compliant service mesh.
 */
export class XMesh extends Model<IXMesh> implements IXMesh {
  "apiVersion": IXMesh["apiVersion"];
  "kind": IXMesh["kind"];
  "metadata"?: IXMesh["metadata"];
  "spec": IXMesh["spec"];
  "status"?: IXMesh["status"];

static apiVersion: IXMesh["apiVersion"] = "gateway.networking.x-k8s.io/v1alpha1";
static kind: IXMesh["kind"] = "XMesh";
static is = createTypeMetaGuard<IXMesh>(XMesh);

constructor(data?: ModelData<IXMesh>) {
  super();

  this.setDefinedProps({
    apiVersion: XMesh.apiVersion,
    kind: XMesh.kind,
    ...data
  } as IXMesh);
}
}


setValidateFunc(XMesh, validate as ValidateFunc<IXMesh>);

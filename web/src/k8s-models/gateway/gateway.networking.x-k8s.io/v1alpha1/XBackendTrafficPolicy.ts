import { IObjectMeta } from "@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta";
import { Model, ModelData, setValidateFunc, createTypeMetaGuard } from "@kubernetes-models/base";
import { ValidateFunc } from "@kubernetes-models/validate";
import { validate } from "../../_schemas/GatewayNetworkingXK8sIoV1alpha1XBackendTrafficPolicy";

/**
 * XBackendTrafficPolicy defines the configuration for how traffic to a
 * target backend should be handled.
 */
export interface IXBackendTrafficPolicy {
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
  "kind": "XBackendTrafficPolicy";
  "metadata"?: IObjectMeta;
  /**
   * Spec defines the desired state of BackendTrafficPolicy.
   */
  "spec": {
    /**
     * RetryConstraint defines the configuration for when to allow or prevent
     * further retries to a target backend, by dynamically calculating a 'retry
     * budget'. This budget is calculated based on the percentage of incoming
     * traffic composed of retries over a given time interval. Once the budget
     * is exceeded, additional retries will be rejected.
     * 
     * For example, if the retry budget interval is 10 seconds, there have been
     * 1000 active requests in the past 10 seconds, and the allowed percentage
     * of requests that can be retried is 20% (the default), then 200 of those
     * requests may be composed of retries. Active requests will only be
     * considered for the duration of the interval when calculating the retry
     * budget. Retrying the same original request multiple times within the
     * retry budget interval will lead to each retry being counted towards
     * calculating the budget.
     * 
     * Configuring a RetryConstraint in BackendTrafficPolicy is compatible with
     * HTTPRoute Retry settings for each HTTPRouteRule that targets the same
     * backend. While the HTTPRouteRule Retry stanza can specify whether a
     * request will be retried, and the number of retry attempts each client
     * may perform, RetryConstraint helps prevent cascading failures such as
     * retry storms during periods of consistent failures.
     * 
     * After the retry budget has been exceeded, additional retries to the
     * backend MUST return a 503 response to the client.
     * 
     * Additional configurations for defining a constraint on retries MAY be
     * defined in the future.
     * 
     * Support: Extended
     */
    "retryConstraint"?: {
      /**
       * Budget holds the details of the retry budget configuration.
       */
      "budget"?: {
        /**
         * Interval defines the duration in which requests will be considered
         * for calculating the budget for retries.
         * 
         * Support: Extended
         */
        "interval"?: string;
        /**
         * Percent defines the maximum percentage of active requests that may
         * be made up of retries.
         * 
         * Support: Extended
         */
        "percent"?: number;
      };
      /**
       * MinRetryRate defines the minimum rate of retries that will be allowable
       * over a specified duration of time.
       * 
       * The effective overall minimum rate of retries targeting the backend
       * service may be much higher, as there can be any number of clients which
       * are applying this setting locally.
       * 
       * This ensures that requests can still be retried during periods of low
       * traffic, where the budget for retries may be calculated as a very low
       * value.
       * 
       * Support: Extended
       */
      "minRetryRate"?: {
        /**
         * Count specifies the number of requests per time interval.
         * 
         * Support: Extended
         */
        "count"?: number;
        /**
         * Interval specifies the divisor of the rate of requests, the amount of
         * time during which the given count of requests occur.
         * 
         * Support: Extended
         */
        "interval"?: string;
      };
    };
    /**
     * SessionPersistence defines and configures session persistence
     * for the backend.
     * 
     * Support: Extended
     */
    "sessionPersistence"?: {
      /**
       * AbsoluteTimeout defines the absolute timeout of the persistent
       * session. Once the AbsoluteTimeout duration has elapsed, the
       * session becomes invalid.
       * 
       * Support: Extended
       */
      "absoluteTimeout"?: string;
      /**
       * CookieConfig provides configuration settings that are specific
       * to cookie-based session persistence.
       * 
       * Support: Core
       */
      "cookieConfig"?: {
        /**
         * LifetimeType specifies whether the cookie has a permanent or
         * session-based lifetime. A permanent cookie persists until its
         * specified expiry time, defined by the Expires or Max-Age cookie
         * attributes, while a session cookie is deleted when the current
         * session ends.
         * 
         * When set to "Permanent", AbsoluteTimeout indicates the
         * cookie's lifetime via the Expires or Max-Age cookie attributes
         * and is required.
         * 
         * When set to "Session", AbsoluteTimeout indicates the
         * absolute lifetime of the cookie tracked by the gateway and
         * is optional.
         * 
         * Defaults to "Session".
         * 
         * Support: Core for "Session" type
         * 
         * Support: Extended for "Permanent" type
         */
        "lifetimeType"?: "Permanent" | "Session";
      };
      /**
       * IdleTimeout defines the idle timeout of the persistent session.
       * Once the session has been idle for more than the specified
       * IdleTimeout duration, the session becomes invalid.
       * 
       * Support: Extended
       */
      "idleTimeout"?: string;
      /**
       * SessionName defines the name of the persistent session token
       * which may be reflected in the cookie or the header. Users
       * should avoid reusing session names to prevent unintended
       * consequences, such as rejection or unpredictable behavior.
       * 
       * Support: Implementation-specific
       */
      "sessionName"?: string;
      /**
       * Type defines the type of session persistence such as through
       * the use of a header or cookie. Defaults to cookie based session
       * persistence.
       * 
       * Support: Core for "Cookie" type
       * 
       * Support: Extended for "Header" type
       */
      "type"?: "Cookie" | "Header";
    };
    /**
     * TargetRefs identifies API object(s) to apply this policy to.
     * Currently, Backends (A grouping of like endpoints such as Service,
     * ServiceImport, or any implementation-specific backendRef) are the only
     * valid API target references.
     * 
     * Currently, a TargetRef cannot be scoped to a specific port on a
     * Service.
     */
    "targetRefs": Array<{
      /**
       * Group is the group of the target resource.
       */
      "group": string;
      /**
       * Kind is kind of the target resource.
       */
      "kind": string;
      /**
       * Name is the name of the target resource.
       */
      "name": string;
    }>;
  };
  /**
   * Status defines the current state of BackendTrafficPolicy.
   */
  "status"?: {
    /**
     * Ancestors is a list of ancestor resources (usually Gateways) that are
     * associated with the policy, and the status of the policy with respect to
     * each ancestor. When this policy attaches to a parent, the controller that
     * manages the parent and the ancestors MUST add an entry to this list when
     * the controller first sees the policy and SHOULD update the entry as
     * appropriate when the relevant ancestor is modified.
     * 
     * Note that choosing the relevant ancestor is left to the Policy designers;
     * an important part of Policy design is designing the right object level at
     * which to namespace this status.
     * 
     * Note also that implementations MUST ONLY populate ancestor status for
     * the Ancestor resources they are responsible for. Implementations MUST
     * use the ControllerName field to uniquely identify the entries in this list
     * that they are responsible for.
     * 
     * Note that to achieve this, the list of PolicyAncestorStatus structs
     * MUST be treated as a map with a composite key, made up of the AncestorRef
     * and ControllerName fields combined.
     * 
     * A maximum of 16 ancestors will be represented in this list. An empty list
     * means the Policy is not relevant for any ancestors.
     * 
     * If this slice is full, implementations MUST NOT add further entries.
     * Instead they MUST consider the policy unimplementable and signal that
     * on any related resources such as the ancestor that would be referenced
     * here. For example, if this list was full on BackendTLSPolicy, no
     * additional Gateways would be able to reference the Service targeted by
     * the BackendTLSPolicy.
     */
    "ancestors": Array<{
      /**
       * AncestorRef corresponds with a ParentRef in the spec that this
       * PolicyAncestorStatus struct describes the status of.
       */
      "ancestorRef": {
        /**
         * Group is the group of the referent.
         * When unspecified, "gateway.networking.k8s.io" is inferred.
         * To set the core API group (such as for a "Service" kind referent),
         * Group must be explicitly set to "" (empty string).
         * 
         * Support: Core
         */
        "group"?: string;
        /**
         * Kind is kind of the referent.
         * 
         * There are two kinds of parent resources with "Core" support:
         * 
         * \* Gateway (Gateway conformance profile)
         * \* Service (Mesh conformance profile, ClusterIP Services only)
         * 
         * Support for other resources is Implementation-Specific.
         */
        "kind"?: string;
        /**
         * Name is the name of the referent.
         * 
         * Support: Core
         */
        "name": string;
        /**
         * Namespace is the namespace of the referent. When unspecified, this refers
         * to the local namespace of the Route.
         * 
         * Note that there are specific rules for ParentRefs which cross namespace
         * boundaries. Cross-namespace references are only valid if they are explicitly
         * allowed by something in the namespace they are referring to. For example:
         * Gateway has the AllowedRoutes field, and ReferenceGrant provides a
         * generic way to enable any other kind of cross-namespace reference.
         * 
         * 
         * ParentRefs from a Route to a Service in the same namespace are "producer"
         * routes, which apply default routing rules to inbound connections from
         * any namespace to the Service.
         * 
         * ParentRefs from a Route to a Service in a different namespace are
         * "consumer" routes, and these routing rules are only applied to outbound
         * connections originating from the same namespace as the Route, for which
         * the intended destination of the connections are a Service targeted as a
         * ParentRef of the Route.
         * 
         * 
         * Support: Core
         */
        "namespace"?: string;
        /**
         * Port is the network port this Route targets. It can be interpreted
         * differently based on the type of parent resource.
         * 
         * When the parent resource is a Gateway, this targets all listeners
         * listening on the specified port that also support this kind of Route(and
         * select this Route). It's not recommended to set `Port` unless the
         * networking behaviors specified in a Route must apply to a specific port
         * as opposed to a listener(s) whose port(s) may be changed. When both Port
         * and SectionName are specified, the name and port of the selected listener
         * must match both specified values.
         * 
         * 
         * When the parent resource is a Service, this targets a specific port in the
         * Service spec. When both Port (experimental) and SectionName are specified,
         * the name and port of the selected port must match both specified values.
         * 
         * 
         * Implementations MAY choose to support other parent resources.
         * Implementations supporting other types of parent resources MUST clearly
         * document how/if Port is interpreted.
         * 
         * For the purpose of status, an attachment is considered successful as
         * long as the parent resource accepts it partially. For example, Gateway
         * listeners can restrict which Routes can attach to them by Route kind,
         * namespace, or hostname. If 1 of 2 Gateway listeners accept attachment
         * from the referencing Route, the Route MUST be considered successfully
         * attached. If no Gateway listeners accept attachment from this Route,
         * the Route MUST be considered detached from the Gateway.
         * 
         * Support: Extended
         */
        "port"?: number;
        /**
         * SectionName is the name of a section within the target resource. In the
         * following resources, SectionName is interpreted as the following:
         * 
         * \* Gateway: Listener name. When both Port (experimental) and SectionName
         * are specified, the name and port of the selected listener must match
         * both specified values.
         * \* Service: Port name. When both Port (experimental) and SectionName
         * are specified, the name and port of the selected listener must match
         * both specified values.
         * 
         * Implementations MAY choose to support attaching Routes to other resources.
         * If that is the case, they MUST clearly document how SectionName is
         * interpreted.
         * 
         * When unspecified (empty string), this will reference the entire resource.
         * For the purpose of status, an attachment is considered successful if at
         * least one section in the parent resource accepts it. For example, Gateway
         * listeners can restrict which Routes can attach to them by Route kind,
         * namespace, or hostname. If 1 of 2 Gateway listeners accept attachment from
         * the referencing Route, the Route MUST be considered successfully
         * attached. If no Gateway listeners accept attachment from this Route, the
         * Route MUST be considered detached from the Gateway.
         * 
         * Support: Core
         */
        "sectionName"?: string;
      };
      /**
       * Conditions describes the status of the Policy with respect to the given Ancestor.
       */
      "conditions": Array<{
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
       * ControllerName is a domain/path string that indicates the name of the
       * controller that wrote this status. This corresponds with the
       * controllerName field on GatewayClass.
       * 
       * Example: "example.net/gateway-controller".
       * 
       * The format of this field is DOMAIN "/" PATH, where DOMAIN and PATH are
       * valid Kubernetes names
       * (https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names).
       * 
       * Controllers MUST populate this field when writing status. Controllers should ensure that
       * entries to status populated with their ControllerName are cleaned up when they are no
       * longer necessary.
       */
      "controllerName": string;
    }>;
  };
}

/**
 * XBackendTrafficPolicy defines the configuration for how traffic to a
 * target backend should be handled.
 */
export class XBackendTrafficPolicy extends Model<IXBackendTrafficPolicy> implements IXBackendTrafficPolicy {
  "apiVersion": IXBackendTrafficPolicy["apiVersion"];
  "kind": IXBackendTrafficPolicy["kind"];
  "metadata"?: IXBackendTrafficPolicy["metadata"];
  "spec": IXBackendTrafficPolicy["spec"];
  "status"?: IXBackendTrafficPolicy["status"];

static apiVersion: IXBackendTrafficPolicy["apiVersion"] = "gateway.networking.x-k8s.io/v1alpha1";
static kind: IXBackendTrafficPolicy["kind"] = "XBackendTrafficPolicy";
static is = createTypeMetaGuard<IXBackendTrafficPolicy>(XBackendTrafficPolicy);

constructor(data?: ModelData<IXBackendTrafficPolicy>) {
  super();

  this.setDefinedProps({
    apiVersion: XBackendTrafficPolicy.apiVersion,
    kind: XBackendTrafficPolicy.kind,
    ...data
  } as IXBackendTrafficPolicy);
}
}


setValidateFunc(XBackendTrafficPolicy, validate as ValidateFunc<IXBackendTrafficPolicy>);

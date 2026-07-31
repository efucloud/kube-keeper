export type GatewayResourceConfig = {
  kind: string;
  plural: string;
  routeSegment: string;
  apiVersions: string[];
  scope: 'cluster' | 'namespace';
};

export const backendTlsPoliciesConfig: GatewayResourceConfig = {
  kind: 'BackendTLSPolicy',
  plural: 'backendtlspolicies',
  routeSegment: 'backendtlspolicies',
  apiVersions: ['gateway.networking.k8s.io/v1', 'gateway.networking.k8s.io/v1alpha3'],
  scope: 'namespace',
};

export const gatewayClassesConfig: GatewayResourceConfig = {
  kind: 'GatewayClass',
  plural: 'gatewayclasses',
  routeSegment: 'gatewayclasses',
  apiVersions: ['gateway.networking.k8s.io/v1', 'gateway.networking.k8s.io/v1beta1'],
  scope: 'cluster',
};

export const gatewaysConfig: GatewayResourceConfig = {
  kind: 'Gateway',
  plural: 'gateways',
  routeSegment: 'gateways',
  apiVersions: ['gateway.networking.k8s.io/v1', 'gateway.networking.k8s.io/v1beta1'],
  scope: 'namespace',
};

export const grpcRoutesConfig: GatewayResourceConfig = {
  kind: 'GRPCRoute',
  plural: 'grpcroutes',
  routeSegment: 'grpcroutes',
  apiVersions: ['gateway.networking.k8s.io/v1'],
  scope: 'namespace',
};

export const httpRoutesConfig: GatewayResourceConfig = {
  kind: 'HTTPRoute',
  plural: 'httproutes',
  routeSegment: 'httproutes',
  apiVersions: ['gateway.networking.k8s.io/v1', 'gateway.networking.k8s.io/v1beta1'],
  scope: 'namespace',
};

export const listenerSetsConfig: GatewayResourceConfig = {
  kind: 'ListenerSet',
  plural: 'listenersets',
  routeSegment: 'listenersets',
  apiVersions: ['gateway.networking.k8s.io/v1'],
  scope: 'namespace',
};

export const referenceGrantsConfig: GatewayResourceConfig = {
  kind: 'ReferenceGrant',
  plural: 'referencegrants',
  routeSegment: 'referencegrants',
  apiVersions: ['gateway.networking.k8s.io/v1', 'gateway.networking.k8s.io/v1beta1'],
  scope: 'namespace',
};

export const tcpRoutesConfig: GatewayResourceConfig = {
  kind: 'TCPRoute',
  plural: 'tcproutes',
  routeSegment: 'tcproutes',
  apiVersions: ['gateway.networking.k8s.io/v1alpha2'],
  scope: 'namespace',
};

export const tlsRoutesConfig: GatewayResourceConfig = {
  kind: 'TLSRoute',
  plural: 'tlsroutes',
  routeSegment: 'tlsroutes',
  apiVersions: ['gateway.networking.k8s.io/v1', 'gateway.networking.k8s.io/v1alpha3', 'gateway.networking.k8s.io/v1alpha2'],
  scope: 'namespace',
};

export const udpRoutesConfig: GatewayResourceConfig = {
  kind: 'UDPRoute',
  plural: 'udproutes',
  routeSegment: 'udproutes',
  apiVersions: ['gateway.networking.k8s.io/v1alpha2'],
  scope: 'namespace',
};

export const xBackendTrafficPoliciesConfig: GatewayResourceConfig = {
  kind: 'XBackendTrafficPolicy',
  plural: 'xbackendtrafficpolicies',
  routeSegment: 'xbackendtrafficpolicies',
  apiVersions: ['gateway.networking.x-k8s.io/v1alpha1'],
  scope: 'namespace',
};

export const xMeshesConfig: GatewayResourceConfig = {
  kind: 'XMesh',
  plural: 'xmeshes',
  routeSegment: 'xmeshes',
  apiVersions: ['gateway.networking.x-k8s.io/v1alpha1'],
  scope: 'cluster',
};

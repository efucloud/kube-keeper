import type { IntlShape } from 'react-intl';

const resourceKindMessageIds: Record<string, string> = {
  GatewayClass: 'menu.network.gateway.GatewayClass',
  Gateway: 'menu.network.gateway.Gateway',
  HTTPRoute: 'menu.network.gateway.HTTPRoute',
  GRPCRoute: 'menu.network.gateway.GRPCRoute',
  TLSRoute: 'menu.network.gateway.TLSRoute',
  TCPRoute: 'menu.network.gateway.TCPRoute',
  UDPRoute: 'menu.network.gateway.UDPRoute',
  ReferenceGrant: 'menu.network.gateway.ReferenceGrant',
  BackendTLSPolicy: 'menu.network.gateway.BackendTLSPolicy',
  ListenerSet: 'menu.network.gateway.ListenerSet',
  XBackendTrafficPolicy: 'menu.network.gateway.XBackendTrafficPolicy',
  XMesh: 'menu.network.gateway.XMesh',
  KubeVirt: 'menu.KubeVirt.KubeVirt',
  MigrationPolicy: 'menu.KubeVirt.MigrationPolicy',
  ClusterInstancetype: 'menu.KubeVirt.ClusterInstancetype',
  ClusterPreference: 'menu.KubeVirt.ClusterPreference',
  VirtualMachineClusterInstancetype: 'menu.KubeVirt.ClusterInstancetype',
  VirtualMachineClusterPreference: 'menu.KubeVirt.ClusterPreference',
  VirtualMachine: 'menu.KubeVirt.VirtualMachine',
  VirtualMachineInstance: 'menu.KubeVirt.VirtualMachineInstance',
  VirtualMachineInstanceMigration: 'menu.KubeVirt.VirtualMachineInstanceMigration',
  VirtualMachinePool: 'menu.KubeVirt.VirtualMachinePool',
  Instancetype: 'menu.KubeVirt.Instancetype',
  Preference: 'menu.KubeVirt.Preference',
  VirtualMachineInstancetype: 'menu.KubeVirt.Instancetype',
  VirtualMachinePreference: 'menu.KubeVirt.Preference',
  DataVolume: 'menu.KubeVirt.DataVolume',
  VirtualMachineSnapshot: 'menu.KubeVirt.VirtualMachineSnapshot',
  VirtualMachineRestore: 'menu.KubeVirt.VirtualMachineRestore',
  VirtualMachineClone: 'menu.KubeVirt.VirtualMachineClone',
  VirtualMachineExport: 'menu.KubeVirt.VirtualMachineExport',
  Alertmanager: 'menu.monitor.prometheusOperator.Alertmanager',
  Prometheus: 'menu.monitor.prometheusOperator.Prometheus',
  PrometheusRule: 'menu.monitor.prometheusOperator.PrometheusRule',
  PodMonitor: 'menu.monitor.prometheusOperator.PodMonitor',
  ServiceMonitor: 'menu.monitor.prometheusOperator.ServiceMonitor',
  Certificate: 'menu.network.certManager.Certificate',
  CertificateRequest: 'menu.network.certManager.CertificateRequest',
  Challenge: 'menu.network.certManager.ChallengesAcme',
  Issuer: 'menu.network.certManager.Issuer',
  Order: 'menu.network.certManager.Order',
};

export const formatResourceKind = (intl: IntlShape, kind: string) => {
  const messageId = resourceKindMessageIds[kind];
  if (!messageId) {
    return kind;
  }
  return intl.formatMessage({ id: messageId, defaultMessage: kind });
};

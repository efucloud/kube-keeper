import { dump, loadAll } from 'js-yaml';

const LAST_APPLIED_ANNOTATION =
  'kubectl.kubernetes.io/last-applied-configuration';

const DEFAULT_API_VERSION_BY_KIND: Record<string, string> = {
  ConfigMap: 'v1',
  Endpoints: 'v1',
  Namespace: 'v1',
  Node: 'v1',
  PersistentVolume: 'v1',
  PersistentVolumeClaim: 'v1',
  Pod: 'v1',
  Secret: 'v1',
  Service: 'v1',
  ServiceAccount: 'v1',
  ControllerRevision: 'apps/v1',
  DaemonSet: 'apps/v1',
  Deployment: 'apps/v1',
  ReplicaSet: 'apps/v1',
  StatefulSet: 'apps/v1',
  CronJob: 'batch/v1',
  Job: 'batch/v1',
  Ingress: 'networking.k8s.io/v1',
  IngressClass: 'networking.k8s.io/v1',
  NetworkPolicy: 'networking.k8s.io/v1',
  ClusterRole: 'rbac.authorization.k8s.io/v1',
  ClusterRoleBinding: 'rbac.authorization.k8s.io/v1',
  Role: 'rbac.authorization.k8s.io/v1',
  RoleBinding: 'rbac.authorization.k8s.io/v1',
  HorizontalPodAutoscaler: 'autoscaling/v2',
  PodDisruptionBudget: 'policy/v1',
  StorageClass: 'storage.k8s.io/v1',
};

const cleanMetadata = (metadata: Record<string, any>) => {
  delete metadata.managedFields;
  if (
    metadata.annotations &&
    typeof metadata.annotations === 'object' &&
    !Array.isArray(metadata.annotations)
  ) {
    delete metadata.annotations[LAST_APPLIED_ANNOTATION];
    if (Object.keys(metadata.annotations).length === 0) {
      delete metadata.annotations;
    }
  }
};

const cleanNestedK8sMetadata = (value: any) => {
  if (Array.isArray(value)) {
    value.forEach(cleanNestedK8sMetadata);
    return;
  }
  if (!value || typeof value !== 'object') {
    return;
  }
  if (
    value.metadata &&
    typeof value.metadata === 'object' &&
    !Array.isArray(value.metadata)
  ) {
    cleanMetadata(value.metadata);
  }
  Object.values(value).forEach(cleanNestedK8sMetadata);
};

/**
 * 清理 Kubernetes 资源及其嵌套对象中的服务端管理元数据。
 * - metadata.managedFields
 * - metadata.annotations['kubectl.kubernetes.io/last-applied-configuration']
 *
 * @param resource 原始 Kubernetes 资源对象（如 Pod、Deployment 等）
 * @returns 清理后的深拷贝对象（不修改原对象）
 */
export function cleanK8sResourceForAI(resource: any): any {
  if (resource === undefined || resource === null) {
    return resource;
  }
  const cleaned = JSON.parse(JSON.stringify(resource));
  cleanNestedK8sMetadata(cleaned);
  return cleaned;
}

export function cleanK8sResourceYamlForAI(content?: string): string {
  if (!content?.trim()) {
    return '';
  }

  try {
    const documents: any[] = [];
    loadAll(content, (document: any) => {
      if (document !== undefined && document !== null) {
        documents.push(cleanK8sResourceForAI(document));
      }
    });
    return documents
      .map((document) =>
        dump(document, { lineWidth: -1, noRefs: true, sortKeys: false }).trim(),
      )
      .filter(Boolean)
      .join('\n---\n');
  } catch {
    // Never forward unparsed content because it may still contain managed data.
    return '';
  }
}

export function resolveK8sApiVersion(kind?: string, apiVersion?: string) {
  const explicitVersion = apiVersion?.trim();
  if (explicitVersion) {
    return explicitVersion;
  }
  return kind ? DEFAULT_API_VERSION_BY_KIND[kind.trim()] || '' : '';
}

type ResourceQuestionContext = {
  kind?: string;
  apiVersion?: string;
  name?: string;
  resourceContent?: string;
  english?: boolean;
};

const resourceIdentity = ({
  kind,
  apiVersion,
  name,
}: ResourceQuestionContext) => {
  const fields = [
    kind ? `kind: ${kind}` : '',
    apiVersion ? `apiVersion: ${apiVersion}` : '',
    name ? `name: ${name}` : '',
  ].filter(Boolean);
  return fields.join(', ');
};

export function buildResourceIntroductionQuestion(
  context: ResourceQuestionContext,
) {
  if (context.english) {
    const identity = resourceIdentity(context);
    return `Introduce the Kubernetes resource${identity ? ` (${identity})` : ''}, including its purpose, key fields, common caveats, and a complete YAML example.`;
  }
  const details = [
    context.kind ? `类型为 ${context.kind}` : '',
    context.apiVersion ? `apiVersion 为 ${context.apiVersion}` : '',
    context.name ? `名称为 ${context.name}` : '',
  ].filter(Boolean);
  return `请介绍 Kubernetes 资源${details.length ? `，${details.join('，')}` : ''}，说明它的用途、核心字段、常见注意事项，并给出完整 YAML 示例。`;
}

export function buildResourceTroubleshootingQuestion(
  context: ResourceQuestionContext,
) {
  const identity = resourceIdentity(context);
  const yamlContent = cleanK8sResourceYamlForAI(context.resourceContent);
  if (context.english) {
    const question = `Troubleshoot the Kubernetes resource${identity ? ` (${identity})` : ''}. Identify the most likely root cause from evidence and provide remediation and verification steps.`;
    return yamlContent
      ? `${question}\n\nFull resource YAML:\n\n\`\`\`yaml\n${yamlContent}\n\`\`\``
      : question;
  }
  const question = `请对 Kubernetes 资源${identity ? `（${identity}）` : ''}进行故障定位，基于证据判断最可能的根因，并给出修复和验证步骤。`;
  return yamlContent
    ? `${question}\n\n完整资源 YAML：\n\n\`\`\`yaml\n${yamlContent}\n\`\`\``
    : question;
}
export function nodesEdgesToMermaid(nodes, edges, direction = 'TD') {
  const nodeLines = [];
  const edgeLines = [];

  // 映射节点类型到 Mermaid 形状
  const getShape = (type, label) => {
    if (type === 'input') return `[ ${label}]`; // 矩形（默认）
    if (type === 'output') return `[[ ${label}]]`; // 圆角矩形
    if (type === 'decision') return `{ ${label}}`; // 菱形（判断）
    return `[ ${label}]`; // 默认矩形
  };

  // 生成节点行
  for (const node of nodes) {
    const id = node.id.replace(/[^a-zA-Z0-9_-]/g, '_'); // 清理非法字符
    const label = node.data?.label || node.id;
    const shape = getShape(node.type, label);
    nodeLines.push(`     ${id} ${shape}`);
  }

  // 生成边行
  for (const edge of edges) {
    const source = edge.source.replace(/[^a-zA-Z0-9_-]/g, '_');
    const target = edge.target.replace(/[^a-zA-Z0-9_-]/g, '_');
    const label = edge.label ? `| ${edge.label}|` : '';
    edgeLines.push(`     ${source} --> ${label}  ${target}`);
  }

  return `graph  ${direction}\n ${nodeLines.join('\n')}\n ${edgeLines.join('\n')}`;
}

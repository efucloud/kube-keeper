import { load } from 'js-yaml';
import {
  buildResourceIntroductionQuestion,
  buildResourceTroubleshootingQuestion,
  cleanK8sResourceForAI,
  cleanK8sResourceYamlForAI,
  resolveK8sApiVersion,
} from './copilot';

describe('Kubernetes copilot context', () => {
  it('resolves API versions for core and apps resources', () => {
    expect(resolveK8sApiVersion('Pod')).toBe('v1');
    expect(resolveK8sApiVersion('Deployment')).toBe('apps/v1');
    expect(resolveK8sApiVersion('Deployment', 'apps/v1beta2')).toBe(
      'apps/v1beta2',
    );
  });

  it('adds kind and apiVersion to resource introduction questions', () => {
    const question = buildResourceIntroductionQuestion({
      kind: 'Pod',
      apiVersion: resolveK8sApiVersion('Pod'),
    });

    expect(question).toContain('类型为 Pod');
    expect(question).toContain('apiVersion 为 v1');
  });

  it('removes managed metadata without mutating the source', () => {
    const source = {
      apiVersion: 'apps/v1',
      kind: 'Deployment',
      metadata: {
        name: 'demo',
        managedFields: [{ manager: 'kube-controller-manager' }],
        annotations: {
          'kubectl.kubernetes.io/last-applied-configuration': 'secret-copy',
          'example.com/owner': 'platform',
        },
      },
      spec: {
        template: {
          metadata: {
            managedFields: [{ manager: 'nested' }],
          },
        },
      },
    };

    const cleaned = cleanK8sResourceForAI(source);

    expect(cleaned.metadata.managedFields).toBeUndefined();
    expect(
      cleaned.metadata.annotations[
        'kubectl.kubernetes.io/last-applied-configuration'
      ],
    ).toBeUndefined();
    expect(cleaned.metadata.annotations['example.com/owner']).toBe('platform');
    expect(cleaned.spec.template.metadata.managedFields).toBeUndefined();
    expect(source.metadata.managedFields).toHaveLength(1);
  });

  it('attaches the full cleaned YAML to troubleshooting questions', () => {
    const resourceContent = `
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo
  managedFields:
    - manager: controller
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: hidden
spec:
  replicas: 2
status:
  unavailableReplicas: 1
`;

    const cleanedYaml = cleanK8sResourceYamlForAI(resourceContent);
    const cleaned = load(cleanedYaml) as any;
    const question = buildResourceTroubleshootingQuestion({
      kind: 'Deployment',
      apiVersion: 'apps/v1',
      name: 'demo',
      resourceContent,
    });

    expect(cleaned.metadata.managedFields).toBeUndefined();
    expect(cleaned.metadata.annotations).toBeUndefined();
    expect(cleaned.status.unavailableReplicas).toBe(1);
    expect(question).toContain('完整资源 YAML');
    expect(question).toContain('unavailableReplicas: 1');
    expect(question).not.toContain('managedFields');
    expect(question).not.toContain('last-applied-configuration');
  });
});

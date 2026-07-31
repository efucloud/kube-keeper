import type { IObjectMeta } from '@kubernetes-models/apimachinery/apis/meta/v1/ObjectMeta';
import {
  createTypeMetaGuard,
  Model,
  type ModelData,
  setValidateFunc,
} from '@kubernetes-models/base';
import type { ValidateFunc } from '@kubernetes-models/validate';
import { validate } from '../../_schemas/FlowVolcanoShV1alpha1JobTemplate';

export interface IJobTemplate {
  apiVersion: 'flow.volcano.sh/v1alpha1';
  kind: 'JobTemplate';
  metadata?: IObjectMeta;
  spec?: {
    maxRetry?: number;
    minAvailable?: number;
    minSuccess?: number;
    networkTopology?: {
      highestTierAllowed?: number;
      mode?: 'hard' | 'soft';
    };
    plugins?: {
      [key: string]: Array<string>;
    };
    policies?: Array<{
      action?: string;
      event?:
        | '*'
        | 'PodPending'
        | 'PodRunning'
        | 'PodFailed'
        | 'PodEvicted'
        | 'Unknown'
        | 'TaskCompleted'
        | 'OutOfSync'
        | 'CommandIssued'
        | 'JobUpdated'
        | 'TaskFailed';
      events?: Array<
        | '*'
        | 'PodPending'
        | 'PodRunning'
        | 'PodFailed'
        | 'PodEvicted'
        | 'Unknown'
        | 'TaskCompleted'
        | 'OutOfSync'
        | 'CommandIssued'
        | 'JobUpdated'
        | 'TaskFailed'
      >;
      exitCode?: number;
      timeout?: string;
    }>;
    priorityClassName?: string;
    queue?: string;
    runningEstimate?: string;
    schedulerName?: string;
    tasks?: Array<{
      dependsOn?: {
        iteration?: string;
        name?: Array<string>;
      };
      maxRetry?: number;
      minAvailable?: number;
      name?: string;
      policies?: Array<{
        action?: string;
        event?:
          | '*'
          | 'PodPending'
          | 'PodRunning'
          | 'PodFailed'
          | 'PodEvicted'
          | 'Unknown'
          | 'TaskCompleted'
          | 'OutOfSync'
          | 'CommandIssued'
          | 'JobUpdated'
          | 'TaskFailed';
        events?: Array<
          | '*'
          | 'PodPending'
          | 'PodRunning'
          | 'PodFailed'
          | 'PodEvicted'
          | 'Unknown'
          | 'TaskCompleted'
          | 'OutOfSync'
          | 'CommandIssued'
          | 'JobUpdated'
          | 'TaskFailed'
        >;
        exitCode?: number;
        timeout?: string;
      }>;
      replicas?: number;
      template?: {
        metadata?: {
          annotations?: {
            [key: string]: string;
          };
          finalizers?: Array<string>;
          labels?: {
            [key: string]: string;
          };
          name?: string;
          namespace?: string;
        };
        spec?: {
          activeDeadlineSeconds?: number;
          affinity?: {
            nodeAffinity?: {
              preferredDuringSchedulingIgnoredDuringExecution?: Array<{
                preference: {
                  matchExpressions?: Array<{
                    key: string;
                    operator: string;
                    values?: Array<string>;
                  }>;
                  matchFields?: Array<{
                    key: string;
                    operator: string;
                    values?: Array<string>;
                  }>;
                };
                weight: number;
              }>;
              requiredDuringSchedulingIgnoredDuringExecution?: {
                nodeSelectorTerms: Array<{
                  matchExpressions?: Array<{
                    key: string;
                    operator: string;
                    values?: Array<string>;
                  }>;
                  matchFields?: Array<{
                    key: string;
                    operator: string;
                    values?: Array<string>;
                  }>;
                }>;
              };
            };
            podAffinity?: {
              preferredDuringSchedulingIgnoredDuringExecution?: Array<{
                podAffinityTerm: {
                  labelSelector?: {
                    matchExpressions?: Array<{
                      key: string;
                      operator: string;
                      values?: Array<string>;
                    }>;
                    matchLabels?: {
                      [key: string]: string;
                    };
                  };
                  matchLabelKeys?: Array<string>;
                  mismatchLabelKeys?: Array<string>;
                  namespaceSelector?: {
                    matchExpressions?: Array<{
                      key: string;
                      operator: string;
                      values?: Array<string>;
                    }>;
                    matchLabels?: {
                      [key: string]: string;
                    };
                  };
                  namespaces?: Array<string>;
                  topologyKey: string;
                };
                weight: number;
              }>;
              requiredDuringSchedulingIgnoredDuringExecution?: Array<{
                labelSelector?: {
                  matchExpressions?: Array<{
                    key: string;
                    operator: string;
                    values?: Array<string>;
                  }>;
                  matchLabels?: {
                    [key: string]: string;
                  };
                };
                matchLabelKeys?: Array<string>;
                mismatchLabelKeys?: Array<string>;
                namespaceSelector?: {
                  matchExpressions?: Array<{
                    key: string;
                    operator: string;
                    values?: Array<string>;
                  }>;
                  matchLabels?: {
                    [key: string]: string;
                  };
                };
                namespaces?: Array<string>;
                topologyKey: string;
              }>;
            };
            podAntiAffinity?: {
              preferredDuringSchedulingIgnoredDuringExecution?: Array<{
                podAffinityTerm: {
                  labelSelector?: {
                    matchExpressions?: Array<{
                      key: string;
                      operator: string;
                      values?: Array<string>;
                    }>;
                    matchLabels?: {
                      [key: string]: string;
                    };
                  };
                  matchLabelKeys?: Array<string>;
                  mismatchLabelKeys?: Array<string>;
                  namespaceSelector?: {
                    matchExpressions?: Array<{
                      key: string;
                      operator: string;
                      values?: Array<string>;
                    }>;
                    matchLabels?: {
                      [key: string]: string;
                    };
                  };
                  namespaces?: Array<string>;
                  topologyKey: string;
                };
                weight: number;
              }>;
              requiredDuringSchedulingIgnoredDuringExecution?: Array<{
                labelSelector?: {
                  matchExpressions?: Array<{
                    key: string;
                    operator: string;
                    values?: Array<string>;
                  }>;
                  matchLabels?: {
                    [key: string]: string;
                  };
                };
                matchLabelKeys?: Array<string>;
                mismatchLabelKeys?: Array<string>;
                namespaceSelector?: {
                  matchExpressions?: Array<{
                    key: string;
                    operator: string;
                    values?: Array<string>;
                  }>;
                  matchLabels?: {
                    [key: string]: string;
                  };
                };
                namespaces?: Array<string>;
                topologyKey: string;
              }>;
            };
          };
          automountServiceAccountToken?: boolean;
          containers: Array<{
            args?: Array<string>;
            command?: Array<string>;
            env?: Array<{
              name: string;
              value?: string;
              valueFrom?: {
                configMapKeyRef?: {
                  key: string;
                  name?: string;
                  optional?: boolean;
                };
                fieldRef?: {
                  apiVersion?: string;
                  fieldPath: string;
                };
                resourceFieldRef?: {
                  containerName?: string;
                  divisor?: number | string;
                  resource: string;
                };
                secretKeyRef?: {
                  key: string;
                  name?: string;
                  optional?: boolean;
                };
              };
            }>;
            envFrom?: Array<{
              configMapRef?: {
                name?: string;
                optional?: boolean;
              };
              prefix?: string;
              secretRef?: {
                name?: string;
                optional?: boolean;
              };
            }>;
            image?: string;
            imagePullPolicy?: string;
            lifecycle?: {
              postStart?: {
                exec?: {
                  command?: Array<string>;
                };
                httpGet?: {
                  host?: string;
                  httpHeaders?: Array<{
                    name: string;
                    value: string;
                  }>;
                  path?: string;
                  port: number | string;
                  scheme?: string;
                };
                sleep?: {
                  seconds: number;
                };
                tcpSocket?: {
                  host?: string;
                  port: number | string;
                };
              };
              preStop?: {
                exec?: {
                  command?: Array<string>;
                };
                httpGet?: {
                  host?: string;
                  httpHeaders?: Array<{
                    name: string;
                    value: string;
                  }>;
                  path?: string;
                  port: number | string;
                  scheme?: string;
                };
                sleep?: {
                  seconds: number;
                };
                tcpSocket?: {
                  host?: string;
                  port: number | string;
                };
              };
              stopSignal?: string;
            };
            livenessProbe?: {
              exec?: {
                command?: Array<string>;
              };
              failureThreshold?: number;
              grpc?: {
                port: number;
                service?: string;
              };
              httpGet?: {
                host?: string;
                httpHeaders?: Array<{
                  name: string;
                  value: string;
                }>;
                path?: string;
                port: number | string;
                scheme?: string;
              };
              initialDelaySeconds?: number;
              periodSeconds?: number;
              successThreshold?: number;
              tcpSocket?: {
                host?: string;
                port: number | string;
              };
              terminationGracePeriodSeconds?: number;
              timeoutSeconds?: number;
            };
            name: string;
            ports?: Array<{
              containerPort: number;
              hostIP?: string;
              hostPort?: number;
              name?: string;
              protocol?: string;
            }>;
            readinessProbe?: {
              exec?: {
                command?: Array<string>;
              };
              failureThreshold?: number;
              grpc?: {
                port: number;
                service?: string;
              };
              httpGet?: {
                host?: string;
                httpHeaders?: Array<{
                  name: string;
                  value: string;
                }>;
                path?: string;
                port: number | string;
                scheme?: string;
              };
              initialDelaySeconds?: number;
              periodSeconds?: number;
              successThreshold?: number;
              tcpSocket?: {
                host?: string;
                port: number | string;
              };
              terminationGracePeriodSeconds?: number;
              timeoutSeconds?: number;
            };
            resizePolicy?: Array<{
              resourceName: string;
              restartPolicy: string;
            }>;
            resources?: {
              claims?: Array<{
                name: string;
                request?: string;
              }>;
              limits?: {
                [key: string]: number | string;
              };
              requests?: {
                [key: string]: number | string;
              };
            };
            restartPolicy?: string;
            securityContext?: {
              allowPrivilegeEscalation?: boolean;
              appArmorProfile?: {
                localhostProfile?: string;
                type: string;
              };
              capabilities?: {
                add?: Array<string>;
                drop?: Array<string>;
              };
              privileged?: boolean;
              procMount?: string;
              readOnlyRootFilesystem?: boolean;
              runAsGroup?: number;
              runAsNonRoot?: boolean;
              runAsUser?: number;
              seLinuxOptions?: {
                level?: string;
                role?: string;
                type?: string;
                user?: string;
              };
              seccompProfile?: {
                localhostProfile?: string;
                type: string;
              };
              windowsOptions?: {
                gmsaCredentialSpec?: string;
                gmsaCredentialSpecName?: string;
                hostProcess?: boolean;
                runAsUserName?: string;
              };
            };
            startupProbe?: {
              exec?: {
                command?: Array<string>;
              };
              failureThreshold?: number;
              grpc?: {
                port: number;
                service?: string;
              };
              httpGet?: {
                host?: string;
                httpHeaders?: Array<{
                  name: string;
                  value: string;
                }>;
                path?: string;
                port: number | string;
                scheme?: string;
              };
              initialDelaySeconds?: number;
              periodSeconds?: number;
              successThreshold?: number;
              tcpSocket?: {
                host?: string;
                port: number | string;
              };
              terminationGracePeriodSeconds?: number;
              timeoutSeconds?: number;
            };
            stdin?: boolean;
            stdinOnce?: boolean;
            terminationMessagePath?: string;
            terminationMessagePolicy?: string;
            tty?: boolean;
            volumeDevices?: Array<{
              devicePath: string;
              name: string;
            }>;
            volumeMounts?: Array<{
              mountPath: string;
              mountPropagation?: string;
              name: string;
              readOnly?: boolean;
              recursiveReadOnly?: string;
              subPath?: string;
              subPathExpr?: string;
            }>;
            workingDir?: string;
          }>;
          dnsConfig?: {
            nameservers?: Array<string>;
            options?: Array<{
              name?: string;
              value?: string;
            }>;
            searches?: Array<string>;
          };
          dnsPolicy?: string;
          enableServiceLinks?: boolean;
          ephemeralContainers?: Array<{
            args?: Array<string>;
            command?: Array<string>;
            env?: Array<{
              name: string;
              value?: string;
              valueFrom?: {
                configMapKeyRef?: {
                  key: string;
                  name?: string;
                  optional?: boolean;
                };
                fieldRef?: {
                  apiVersion?: string;
                  fieldPath: string;
                };
                resourceFieldRef?: {
                  containerName?: string;
                  divisor?: number | string;
                  resource: string;
                };
                secretKeyRef?: {
                  key: string;
                  name?: string;
                  optional?: boolean;
                };
              };
            }>;
            envFrom?: Array<{
              configMapRef?: {
                name?: string;
                optional?: boolean;
              };
              prefix?: string;
              secretRef?: {
                name?: string;
                optional?: boolean;
              };
            }>;
            image?: string;
            imagePullPolicy?: string;
            lifecycle?: {
              postStart?: {
                exec?: {
                  command?: Array<string>;
                };
                httpGet?: {
                  host?: string;
                  httpHeaders?: Array<{
                    name: string;
                    value: string;
                  }>;
                  path?: string;
                  port: number | string;
                  scheme?: string;
                };
                sleep?: {
                  seconds: number;
                };
                tcpSocket?: {
                  host?: string;
                  port: number | string;
                };
              };
              preStop?: {
                exec?: {
                  command?: Array<string>;
                };
                httpGet?: {
                  host?: string;
                  httpHeaders?: Array<{
                    name: string;
                    value: string;
                  }>;
                  path?: string;
                  port: number | string;
                  scheme?: string;
                };
                sleep?: {
                  seconds: number;
                };
                tcpSocket?: {
                  host?: string;
                  port: number | string;
                };
              };
              stopSignal?: string;
            };
            livenessProbe?: {
              exec?: {
                command?: Array<string>;
              };
              failureThreshold?: number;
              grpc?: {
                port: number;
                service?: string;
              };
              httpGet?: {
                host?: string;
                httpHeaders?: Array<{
                  name: string;
                  value: string;
                }>;
                path?: string;
                port: number | string;
                scheme?: string;
              };
              initialDelaySeconds?: number;
              periodSeconds?: number;
              successThreshold?: number;
              tcpSocket?: {
                host?: string;
                port: number | string;
              };
              terminationGracePeriodSeconds?: number;
              timeoutSeconds?: number;
            };
            name: string;
            ports?: Array<{
              containerPort: number;
              hostIP?: string;
              hostPort?: number;
              name?: string;
              protocol?: string;
            }>;
            readinessProbe?: {
              exec?: {
                command?: Array<string>;
              };
              failureThreshold?: number;
              grpc?: {
                port: number;
                service?: string;
              };
              httpGet?: {
                host?: string;
                httpHeaders?: Array<{
                  name: string;
                  value: string;
                }>;
                path?: string;
                port: number | string;
                scheme?: string;
              };
              initialDelaySeconds?: number;
              periodSeconds?: number;
              successThreshold?: number;
              tcpSocket?: {
                host?: string;
                port: number | string;
              };
              terminationGracePeriodSeconds?: number;
              timeoutSeconds?: number;
            };
            resizePolicy?: Array<{
              resourceName: string;
              restartPolicy: string;
            }>;
            resources?: {
              claims?: Array<{
                name: string;
                request?: string;
              }>;
              limits?: {
                [key: string]: number | string;
              };
              requests?: {
                [key: string]: number | string;
              };
            };
            restartPolicy?: string;
            securityContext?: {
              allowPrivilegeEscalation?: boolean;
              appArmorProfile?: {
                localhostProfile?: string;
                type: string;
              };
              capabilities?: {
                add?: Array<string>;
                drop?: Array<string>;
              };
              privileged?: boolean;
              procMount?: string;
              readOnlyRootFilesystem?: boolean;
              runAsGroup?: number;
              runAsNonRoot?: boolean;
              runAsUser?: number;
              seLinuxOptions?: {
                level?: string;
                role?: string;
                type?: string;
                user?: string;
              };
              seccompProfile?: {
                localhostProfile?: string;
                type: string;
              };
              windowsOptions?: {
                gmsaCredentialSpec?: string;
                gmsaCredentialSpecName?: string;
                hostProcess?: boolean;
                runAsUserName?: string;
              };
            };
            startupProbe?: {
              exec?: {
                command?: Array<string>;
              };
              failureThreshold?: number;
              grpc?: {
                port: number;
                service?: string;
              };
              httpGet?: {
                host?: string;
                httpHeaders?: Array<{
                  name: string;
                  value: string;
                }>;
                path?: string;
                port: number | string;
                scheme?: string;
              };
              initialDelaySeconds?: number;
              periodSeconds?: number;
              successThreshold?: number;
              tcpSocket?: {
                host?: string;
                port: number | string;
              };
              terminationGracePeriodSeconds?: number;
              timeoutSeconds?: number;
            };
            stdin?: boolean;
            stdinOnce?: boolean;
            targetContainerName?: string;
            terminationMessagePath?: string;
            terminationMessagePolicy?: string;
            tty?: boolean;
            volumeDevices?: Array<{
              devicePath: string;
              name: string;
            }>;
            volumeMounts?: Array<{
              mountPath: string;
              mountPropagation?: string;
              name: string;
              readOnly?: boolean;
              recursiveReadOnly?: string;
              subPath?: string;
              subPathExpr?: string;
            }>;
            workingDir?: string;
          }>;
          hostAliases?: Array<{
            hostnames?: Array<string>;
            ip: string;
          }>;
          hostIPC?: boolean;
          hostNetwork?: boolean;
          hostPID?: boolean;
          hostUsers?: boolean;
          hostname?: string;
          imagePullSecrets?: Array<{
            name?: string;
          }>;
          initContainers?: Array<{
            args?: Array<string>;
            command?: Array<string>;
            env?: Array<{
              name: string;
              value?: string;
              valueFrom?: {
                configMapKeyRef?: {
                  key: string;
                  name?: string;
                  optional?: boolean;
                };
                fieldRef?: {
                  apiVersion?: string;
                  fieldPath: string;
                };
                resourceFieldRef?: {
                  containerName?: string;
                  divisor?: number | string;
                  resource: string;
                };
                secretKeyRef?: {
                  key: string;
                  name?: string;
                  optional?: boolean;
                };
              };
            }>;
            envFrom?: Array<{
              configMapRef?: {
                name?: string;
                optional?: boolean;
              };
              prefix?: string;
              secretRef?: {
                name?: string;
                optional?: boolean;
              };
            }>;
            image?: string;
            imagePullPolicy?: string;
            lifecycle?: {
              postStart?: {
                exec?: {
                  command?: Array<string>;
                };
                httpGet?: {
                  host?: string;
                  httpHeaders?: Array<{
                    name: string;
                    value: string;
                  }>;
                  path?: string;
                  port: number | string;
                  scheme?: string;
                };
                sleep?: {
                  seconds: number;
                };
                tcpSocket?: {
                  host?: string;
                  port: number | string;
                };
              };
              preStop?: {
                exec?: {
                  command?: Array<string>;
                };
                httpGet?: {
                  host?: string;
                  httpHeaders?: Array<{
                    name: string;
                    value: string;
                  }>;
                  path?: string;
                  port: number | string;
                  scheme?: string;
                };
                sleep?: {
                  seconds: number;
                };
                tcpSocket?: {
                  host?: string;
                  port: number | string;
                };
              };
              stopSignal?: string;
            };
            livenessProbe?: {
              exec?: {
                command?: Array<string>;
              };
              failureThreshold?: number;
              grpc?: {
                port: number;
                service?: string;
              };
              httpGet?: {
                host?: string;
                httpHeaders?: Array<{
                  name: string;
                  value: string;
                }>;
                path?: string;
                port: number | string;
                scheme?: string;
              };
              initialDelaySeconds?: number;
              periodSeconds?: number;
              successThreshold?: number;
              tcpSocket?: {
                host?: string;
                port: number | string;
              };
              terminationGracePeriodSeconds?: number;
              timeoutSeconds?: number;
            };
            name: string;
            ports?: Array<{
              containerPort: number;
              hostIP?: string;
              hostPort?: number;
              name?: string;
              protocol?: string;
            }>;
            readinessProbe?: {
              exec?: {
                command?: Array<string>;
              };
              failureThreshold?: number;
              grpc?: {
                port: number;
                service?: string;
              };
              httpGet?: {
                host?: string;
                httpHeaders?: Array<{
                  name: string;
                  value: string;
                }>;
                path?: string;
                port: number | string;
                scheme?: string;
              };
              initialDelaySeconds?: number;
              periodSeconds?: number;
              successThreshold?: number;
              tcpSocket?: {
                host?: string;
                port: number | string;
              };
              terminationGracePeriodSeconds?: number;
              timeoutSeconds?: number;
            };
            resizePolicy?: Array<{
              resourceName: string;
              restartPolicy: string;
            }>;
            resources?: {
              claims?: Array<{
                name: string;
                request?: string;
              }>;
              limits?: {
                [key: string]: number | string;
              };
              requests?: {
                [key: string]: number | string;
              };
            };
            restartPolicy?: string;
            securityContext?: {
              allowPrivilegeEscalation?: boolean;
              appArmorProfile?: {
                localhostProfile?: string;
                type: string;
              };
              capabilities?: {
                add?: Array<string>;
                drop?: Array<string>;
              };
              privileged?: boolean;
              procMount?: string;
              readOnlyRootFilesystem?: boolean;
              runAsGroup?: number;
              runAsNonRoot?: boolean;
              runAsUser?: number;
              seLinuxOptions?: {
                level?: string;
                role?: string;
                type?: string;
                user?: string;
              };
              seccompProfile?: {
                localhostProfile?: string;
                type: string;
              };
              windowsOptions?: {
                gmsaCredentialSpec?: string;
                gmsaCredentialSpecName?: string;
                hostProcess?: boolean;
                runAsUserName?: string;
              };
            };
            startupProbe?: {
              exec?: {
                command?: Array<string>;
              };
              failureThreshold?: number;
              grpc?: {
                port: number;
                service?: string;
              };
              httpGet?: {
                host?: string;
                httpHeaders?: Array<{
                  name: string;
                  value: string;
                }>;
                path?: string;
                port: number | string;
                scheme?: string;
              };
              initialDelaySeconds?: number;
              periodSeconds?: number;
              successThreshold?: number;
              tcpSocket?: {
                host?: string;
                port: number | string;
              };
              terminationGracePeriodSeconds?: number;
              timeoutSeconds?: number;
            };
            stdin?: boolean;
            stdinOnce?: boolean;
            terminationMessagePath?: string;
            terminationMessagePolicy?: string;
            tty?: boolean;
            volumeDevices?: Array<{
              devicePath: string;
              name: string;
            }>;
            volumeMounts?: Array<{
              mountPath: string;
              mountPropagation?: string;
              name: string;
              readOnly?: boolean;
              recursiveReadOnly?: string;
              subPath?: string;
              subPathExpr?: string;
            }>;
            workingDir?: string;
          }>;
          nodeName?: string;
          nodeSelector?: {
            [key: string]: string;
          };
          os?: {
            name: string;
          };
          overhead?: {
            [key: string]: number | string;
          };
          preemptionPolicy?: string;
          priority?: number;
          priorityClassName?: string;
          readinessGates?: Array<{
            conditionType: string;
          }>;
          resourceClaims?: Array<{
            name: string;
            resourceClaimName?: string;
            resourceClaimTemplateName?: string;
          }>;
          resources?: {
            claims?: Array<{
              name: string;
              request?: string;
            }>;
            limits?: {
              [key: string]: number | string;
            };
            requests?: {
              [key: string]: number | string;
            };
          };
          restartPolicy?: string;
          runtimeClassName?: string;
          schedulerName?: string;
          schedulingGates?: Array<{
            name: string;
          }>;
          securityContext?: {
            appArmorProfile?: {
              localhostProfile?: string;
              type: string;
            };
            fsGroup?: number;
            fsGroupChangePolicy?: string;
            runAsGroup?: number;
            runAsNonRoot?: boolean;
            runAsUser?: number;
            seLinuxChangePolicy?: string;
            seLinuxOptions?: {
              level?: string;
              role?: string;
              type?: string;
              user?: string;
            };
            seccompProfile?: {
              localhostProfile?: string;
              type: string;
            };
            supplementalGroups?: Array<number>;
            supplementalGroupsPolicy?: string;
            sysctls?: Array<{
              name: string;
              value: string;
            }>;
            windowsOptions?: {
              gmsaCredentialSpec?: string;
              gmsaCredentialSpecName?: string;
              hostProcess?: boolean;
              runAsUserName?: string;
            };
          };
          serviceAccount?: string;
          serviceAccountName?: string;
          setHostnameAsFQDN?: boolean;
          shareProcessNamespace?: boolean;
          subdomain?: string;
          terminationGracePeriodSeconds?: number;
          tolerations?: Array<{
            effect?: string;
            key?: string;
            operator?: string;
            tolerationSeconds?: number;
            value?: string;
          }>;
          topologySpreadConstraints?: Array<{
            labelSelector?: {
              matchExpressions?: Array<{
                key: string;
                operator: string;
                values?: Array<string>;
              }>;
              matchLabels?: {
                [key: string]: string;
              };
            };
            matchLabelKeys?: Array<string>;
            maxSkew: number;
            minDomains?: number;
            nodeAffinityPolicy?: string;
            nodeTaintsPolicy?: string;
            topologyKey: string;
            whenUnsatisfiable: string;
          }>;
          volumes?: Array<{
            awsElasticBlockStore?: {
              fsType?: string;
              partition?: number;
              readOnly?: boolean;
              volumeID: string;
            };
            azureDisk?: {
              cachingMode?: string;
              diskName: string;
              diskURI: string;
              fsType?: string;
              kind?: string;
              readOnly?: boolean;
            };
            azureFile?: {
              readOnly?: boolean;
              secretName: string;
              shareName: string;
            };
            cephfs?: {
              monitors: Array<string>;
              path?: string;
              readOnly?: boolean;
              secretFile?: string;
              secretRef?: {
                name?: string;
              };
              user?: string;
            };
            cinder?: {
              fsType?: string;
              readOnly?: boolean;
              secretRef?: {
                name?: string;
              };
              volumeID: string;
            };
            configMap?: {
              defaultMode?: number;
              items?: Array<{
                key: string;
                mode?: number;
                path: string;
              }>;
              name?: string;
              optional?: boolean;
            };
            csi?: {
              driver: string;
              fsType?: string;
              nodePublishSecretRef?: {
                name?: string;
              };
              readOnly?: boolean;
              volumeAttributes?: {
                [key: string]: string;
              };
            };
            downwardAPI?: {
              defaultMode?: number;
              items?: Array<{
                fieldRef?: {
                  apiVersion?: string;
                  fieldPath: string;
                };
                mode?: number;
                path: string;
                resourceFieldRef?: {
                  containerName?: string;
                  divisor?: number | string;
                  resource: string;
                };
              }>;
            };
            emptyDir?: {
              medium?: string;
              sizeLimit?: number | string;
            };
            ephemeral?: {
              volumeClaimTemplate?: {
                metadata?: {
                  annotations?: {
                    [key: string]: string;
                  };
                  finalizers?: Array<string>;
                  labels?: {
                    [key: string]: string;
                  };
                  name?: string;
                  namespace?: string;
                };
                spec: {
                  accessModes?: Array<string>;
                  dataSource?: {
                    apiGroup?: string;
                    kind: string;
                    name: string;
                  };
                  dataSourceRef?: {
                    apiGroup?: string;
                    kind: string;
                    name: string;
                    namespace?: string;
                  };
                  resources?: {
                    limits?: {
                      [key: string]: number | string;
                    };
                    requests?: {
                      [key: string]: number | string;
                    };
                  };
                  selector?: {
                    matchExpressions?: Array<{
                      key: string;
                      operator: string;
                      values?: Array<string>;
                    }>;
                    matchLabels?: {
                      [key: string]: string;
                    };
                  };
                  storageClassName?: string;
                  volumeAttributesClassName?: string;
                  volumeMode?: string;
                  volumeName?: string;
                };
              };
            };
            fc?: {
              fsType?: string;
              lun?: number;
              readOnly?: boolean;
              targetWWNs?: Array<string>;
              wwids?: Array<string>;
            };
            flexVolume?: {
              driver: string;
              fsType?: string;
              options?: {
                [key: string]: string;
              };
              readOnly?: boolean;
              secretRef?: {
                name?: string;
              };
            };
            flocker?: {
              datasetName?: string;
              datasetUUID?: string;
            };
            gcePersistentDisk?: {
              fsType?: string;
              partition?: number;
              pdName: string;
              readOnly?: boolean;
            };
            gitRepo?: {
              directory?: string;
              repository: string;
              revision?: string;
            };
            glusterfs?: {
              endpoints: string;
              path: string;
              readOnly?: boolean;
            };
            hostPath?: {
              path: string;
              type?: string;
            };
            image?: {
              pullPolicy?: string;
              reference?: string;
            };
            iscsi?: {
              chapAuthDiscovery?: boolean;
              chapAuthSession?: boolean;
              fsType?: string;
              initiatorName?: string;
              iqn: string;
              iscsiInterface?: string;
              lun: number;
              portals?: Array<string>;
              readOnly?: boolean;
              secretRef?: {
                name?: string;
              };
              targetPortal: string;
            };
            name: string;
            nfs?: {
              path: string;
              readOnly?: boolean;
              server: string;
            };
            persistentVolumeClaim?: {
              claimName: string;
              readOnly?: boolean;
            };
            photonPersistentDisk?: {
              fsType?: string;
              pdID: string;
            };
            portworxVolume?: {
              fsType?: string;
              readOnly?: boolean;
              volumeID: string;
            };
            projected?: {
              defaultMode?: number;
              sources?: Array<{
                clusterTrustBundle?: {
                  labelSelector?: {
                    matchExpressions?: Array<{
                      key: string;
                      operator: string;
                      values?: Array<string>;
                    }>;
                    matchLabels?: {
                      [key: string]: string;
                    };
                  };
                  name?: string;
                  optional?: boolean;
                  path: string;
                  signerName?: string;
                };
                configMap?: {
                  items?: Array<{
                    key: string;
                    mode?: number;
                    path: string;
                  }>;
                  name?: string;
                  optional?: boolean;
                };
                downwardAPI?: {
                  items?: Array<{
                    fieldRef?: {
                      apiVersion?: string;
                      fieldPath: string;
                    };
                    mode?: number;
                    path: string;
                    resourceFieldRef?: {
                      containerName?: string;
                      divisor?: number | string;
                      resource: string;
                    };
                  }>;
                };
                secret?: {
                  items?: Array<{
                    key: string;
                    mode?: number;
                    path: string;
                  }>;
                  name?: string;
                  optional?: boolean;
                };
                serviceAccountToken?: {
                  audience?: string;
                  expirationSeconds?: number;
                  path: string;
                };
              }>;
            };
            quobyte?: {
              group?: string;
              readOnly?: boolean;
              registry: string;
              tenant?: string;
              user?: string;
              volume: string;
            };
            rbd?: {
              fsType?: string;
              image: string;
              keyring?: string;
              monitors: Array<string>;
              pool?: string;
              readOnly?: boolean;
              secretRef?: {
                name?: string;
              };
              user?: string;
            };
            scaleIO?: {
              fsType?: string;
              gateway: string;
              protectionDomain?: string;
              readOnly?: boolean;
              secretRef: {
                name?: string;
              };
              sslEnabled?: boolean;
              storageMode?: string;
              storagePool?: string;
              system: string;
              volumeName?: string;
            };
            secret?: {
              defaultMode?: number;
              items?: Array<{
                key: string;
                mode?: number;
                path: string;
              }>;
              optional?: boolean;
              secretName?: string;
            };
            storageos?: {
              fsType?: string;
              readOnly?: boolean;
              secretRef?: {
                name?: string;
              };
              volumeName?: string;
              volumeNamespace?: string;
            };
            vsphereVolume?: {
              fsType?: string;
              storagePolicyID?: string;
              storagePolicyName?: string;
              volumePath: string;
            };
          }>;
        };
      };
      topologyPolicy?:
        | 'none'
        | 'best-effort'
        | 'restricted'
        | 'single-numa-node';
    }>;
    ttlSecondsAfterFinished?: number;
    volumes?: Array<{
      mountPath: string;
      volumeClaim?: {
        accessModes?: Array<string>;
        dataSource?: {
          apiGroup?: string;
          kind: string;
          name: string;
        };
        dataSourceRef?: {
          apiGroup?: string;
          kind: string;
          name: string;
          namespace?: string;
        };
        resources?: {
          limits?: {
            [key: string]: number | string;
          };
          requests?: {
            [key: string]: number | string;
          };
        };
        selector?: {
          matchExpressions?: Array<{
            key: string;
            operator: string;
            values?: Array<string>;
          }>;
          matchLabels?: {
            [key: string]: string;
          };
        };
        storageClassName?: string;
        volumeAttributesClassName?: string;
        volumeMode?: string;
        volumeName?: string;
      };
      volumeClaimName?: string;
    }>;
  };
  status?: {
    jobDependsOnList?: Array<string>;
  };
}

export class JobTemplate extends Model<IJobTemplate> implements IJobTemplate {
  apiVersion: IJobTemplate['apiVersion'];
  kind: IJobTemplate['kind'];
  metadata?: IJobTemplate['metadata'];
  spec?: IJobTemplate['spec'];
  status?: IJobTemplate['status'];

  static apiVersion: IJobTemplate['apiVersion'] = 'flow.volcano.sh/v1alpha1';
  static kind: IJobTemplate['kind'] = 'JobTemplate';
  static is = createTypeMetaGuard<IJobTemplate>(JobTemplate);

  constructor(data?: ModelData<IJobTemplate>) {
    super();

    this.setDefinedProps({
      apiVersion: JobTemplate.apiVersion,
      kind: JobTemplate.kind,
      ...data,
    } as IJobTemplate);
  }
}

setValidateFunc(JobTemplate, validate as ValidateFunc<IJobTemplate>);

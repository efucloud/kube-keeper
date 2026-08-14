# kube-keeper

[English README](./README.md)

`kube-keeper` 是一个面向 Kubernetes 的多集群管理平台，提供多集群接入、RBAC、终端访问和 AI 辅助运维能力。

## 项目说明

本仓库包含：

- Go 后端服务
- `kube-keeper`、MySQL、Redis 的 Kubernetes 部署清单

## 部署说明

部署清单位于：

- [docs/mysql.yaml](/Users/cloudy/Documents/efucloud/kube-keeper/docs/mysql.yaml)
- [docs/redis.yaml](/Users/cloudy/Documents/efucloud/kube-keeper/docs/redis.yaml)
- [docs/kube-keeper.yaml](/Users/cloudy/Documents/efucloud/kube-keeper/docs/kube-keeper.yaml)

当前这些清单具备以下特点：

- 不包含 `Namespace` 资源
- 不包含 `Ingress`
- MySQL 和 Redis 以单机依赖方式部署

### 使用的镜像

部署清单当前使用以下镜像：

- `ghcr.io/efucloud/kube-keeper:latest`
- `registry.cn-shenzhen.aliyuncs.com/efucloud-public/mysql:9.5.0`
- `registry.cn-shenzhen.aliyuncs.com/efucloud-public/redis:7.2-alpine`

### 部署步骤

部署前请先修改 [docs/kube-keeper.yaml](/Users/cloudy/Documents/efucloud/kube-keeper/docs/kube-keeper.yaml) 中的关键配置，尤其是：

- `oidcConfig.clientId`
- `oidcConfig.clientSecret`
- `oidcConfig.issuer`
- `chatConfig.address`
- `chatConfig.apiKey`
- `chatConfig.model`
- `adminEmails`

然后按顺序执行：

```bash
kubectl apply -f docs/mysql.yaml
kubectl apply -f docs/redis.yaml
kubectl apply -f docs/kube-keeper.yaml
```

服务在集群内监听端口 `9002`。

## OIDC 认证对接

`kube-keeper` 通过运行时配置中的 `oidcConfig` 启用 OIDC 认证。

`kube-keeper` 可以使用 [efucloud/eauth](https://github.com/efucloud/eauth) 作为 OIDC 认证提供商。

`eauth` 的部署和 OIDC 提供方配置可参考：

- [efucloud/eauth](https://github.com/efucloud/eauth)

在 `eauth` 中创建好 OIDC 客户端后，将以下配置写入 [docs/kube-keeper.yaml](/Users/cloudy/Documents/efucloud/kube-keeper/docs/kube-keeper.yaml)：

- `issuer`
- `clientId`
- `clientSecret`

## 许可证

本项目采用 `GNU Affero General Public License v3.0`，详见 [LICENSE](/Users/cloudy/Documents/efucloud/kube-keeper/LICENSE)。

## 说明

- 当前 Kubernetes 清单中，MySQL 使用 `root` 账户以支持自动建表和初始化。
- Redis 当前为单机模式。

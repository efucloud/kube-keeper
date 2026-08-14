# kube-keeper

[中文说明](./README.zh-CN.md)

`kube-keeper` is a Kubernetes cluster management platform for multi-cluster access, RBAC, terminal access, and AI-assisted operations.

## Overview

This repository contains:

- A Go backend service
- Kubernetes deployment manifests for `kube-keeper`, MySQL, and Redis

## Deployment

Deployment manifests are available in:

- [docs/mysql.yaml](/Users/cloudy/Documents/efucloud/kube-keeper/docs/mysql.yaml)
- [docs/redis.yaml](/Users/cloudy/Documents/efucloud/kube-keeper/docs/redis.yaml)
- [docs/kube-keeper.yaml](/Users/cloudy/Documents/efucloud/kube-keeper/docs/kube-keeper.yaml)

These manifests currently:

- do not include `Namespace` resources
- do not include `Ingress`
- deploy MySQL and Redis as standalone dependencies

### Images

The manifests use these images:

- `ghcr.io/efucloud/kube-keeper:latest`
- `registry.cn-shenzhen.aliyuncs.com/efucloud-public/mysql:9.5.0`
- `registry.cn-shenzhen.aliyuncs.com/efucloud-public/redis:7.2-alpine`

### Apply manifests

Update the values in [docs/kube-keeper.yaml](/Users/cloudy/Documents/efucloud/kube-keeper/docs/kube-keeper.yaml) before deployment, especially:

- `oidcConfig.clientId`
- `oidcConfig.clientSecret`
- `oidcConfig.issuer`
- `chatConfig.address`
- `chatConfig.apiKey`
- `chatConfig.model`
- `adminEmails`

Then deploy in order:

```bash
kubectl apply -f docs/mysql.yaml
kubectl apply -f docs/redis.yaml
kubectl apply -f docs/kube-keeper.yaml
```

The service listens on port `9002` inside the cluster.

## OIDC Authentication

`kube-keeper` supports OIDC authentication through the `oidcConfig` section in the runtime configuration.

For `eauth` setup and OIDC provider details, see:

- [efucloud/eauth](https://github.com/efucloud/eauth)

After you prepare the OIDC client in `eauth`, copy the following values into [docs/kube-keeper.yaml](/Users/cloudy/Documents/efucloud/kube-keeper/docs/kube-keeper.yaml):

- `issuer`
- `clientId`
- `clientSecret`

## License

This project is licensed under the GNU Affero General Public License v3.0. See [LICENSE](/Users/cloudy/Documents/efucloud/kube-keeper/LICENSE).

## Notes

- The current Kubernetes manifests use MySQL `root` to initialize and migrate tables automatically.
- Redis is configured in standalone mode.

#!/usr/bin/env bash

set -euo pipefail

GIT_COMMIT=$(git log --pretty=oneline -1 | awk '{print $1}')
echo "Commit: $GIT_COMMIT"

BUILD_DATE=$(date +'%Y/%m/%d %H:%M:%S')
tag="v1.0.0.$(date +'%Y%m%d%H%M')"

echo "Building tag: $tag"

docker buildx build \
  --build-arg GIT_COMMIT="$GIT_COMMIT" \
  --build-arg BUILD_DATE="$BUILD_DATE" \
  --platform linux/amd64,linux/arm64 \
  -t "registry.cn-shenzhen.aliyuncs.com/efucloud-public/kube-keeper-console:$tag" \
  --provenance=false \
  --progress=plain \
  --push \
  .
echo "build image success registry.cn-shenzhen.aliyuncs.com/efucloud-public/kube-keeper-console:$tag"
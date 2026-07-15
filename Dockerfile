# 构建阶段
FROM golang:1.25.5 AS builder

ARG TARGETOS
ARG TARGETARCH
ARG GIT_COMMIT
ARG BUILD_DATE

WORKDIR /workspace
COPY . .

ENV GOPROXY='https://goproxy.cn,direct'
ENV GOSUMDB='off'

RUN case "$TARGETARCH" in \
        "amd64") GOARCH="amd64" ;; \
        "arm64") GOARCH="arm64" ;; \
        "arm") GOARCH="arm" ;; \
        *) echo "Unsupported TARGETARCH: $TARGETARCH"; exit 1 ;; \
    esac && \
    CGO_ENABLED=0 GOOS=$TARGETOS GOARCH=$GOARCH go build \
      -ldflags "-X 'github.com/efucloud/kube-keeper/pkg/config.GoVersion=1.25' \
                -X 'github.com/efucloud/kube-keeper/pkg/config.Commit=${GIT_COMMIT}' \
                -X 'github.com/efucloud/kube-keeper/pkg/config.BuildDate=${BUILD_DATE}' \
                -X 'github.com/efucloud/kube-keeper/pkg/config.Edition=community'" \
      -o ./output/kube-keeper-$TARGETOS-$TARGETARCH \
      ./cmd/start.go

FROM alpine:3.23.0

ARG TARGETOS
ARG TARGETARCH
ARG GIT_COMMIT
ARG BUILD_DATE

LABEL org.opencontainers.image.source=https://github.com/efucloud/kube-keeper
LABEL org.opencontainers.image.revision=${GIT_COMMIT}
LABEL org.opencontainers.image.created=${BUILD_DATE}
LABEL com.efucloud.build.commit=${GIT_COMMIT}
LABEL com.efucloud.build.date=${BUILD_DATE}

WORKDIR /efucloud

COPY --from=builder /workspace/output/kube-keeper-$TARGETOS-$TARGETARCH /usr/local/bin/kube-keeper

EXPOSE 9004

ENTRYPOINT ["/usr/local/bin/kube-keeper", "-c", "./config/config.yaml"]

FROM golang:1.26.4-alpine AS builder

ARG TARGETOS=linux
ARG TARGETARCH
ARG GIT_COMMIT=unknown
ARG BUILD_DATE=unknown

WORKDIR /workspace

RUN apk add --no-cache ca-certificates tzdata

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=${TARGETOS} GOARCH=${TARGETARCH} go build -mod=mod \
    -ldflags="-s -w \
      -X 'github.com/efucloud/kube-keeper/pkg/config.GoVersion=$(go version | awk '{print $3}')' \
      -X 'github.com/efucloud/kube-keeper/pkg/config.Commit=${GIT_COMMIT}' \
      -X 'github.com/efucloud/kube-keeper/pkg/config.BuildDate=${BUILD_DATE}'" \
    -o /workspace/output/kube-keeper ./cmd/start.go

FROM alpine:3.22

ARG GIT_COMMIT=unknown
ARG BUILD_DATE=unknown

RUN apk add --no-cache ca-certificates tzdata

WORKDIR /app

COPY --from=builder /workspace/output/kube-keeper /usr/local/bin/kube-keeper
COPY config/config.yaml /efucloud/config/config.yaml

EXPOSE 9002

LABEL com.efucloud.build.commit=${GIT_COMMIT}
LABEL com.efucloud.build.date=${BUILD_DATE}

ENTRYPOINT ["/usr/local/bin/kube-keeper"]
CMD ["server", "-c", "/efucloud/config/config.yaml"]

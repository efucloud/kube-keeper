SHELL := /bin/sh

.DEFAULT_GOAL := image

ROOT_DIR := $(abspath $(dir $(lastword $(MAKEFILE_LIST))))

DOCKER ?= docker
IMAGE_NAME ?= kube-keeper
IMAGE_TAG ?= latest
IMAGE ?= $(IMAGE_NAME):$(IMAGE_TAG)
PLATFORM ?= linux/amd64
DOCKER_BUILD_FLAGS ?=
GIT_COMMIT ?= $(shell git -C "$(ROOT_DIR)" rev-parse HEAD 2>/dev/null || printf unknown)
BUILD_DATE ?= $(shell date -u +%Y-%m-%dT%H:%M:%SZ)

.PHONY: help image

help:
	@printf '%s\n' \
		'make                Build the backend container image' \
		'make image          Build the backend container image' \
		'' \
		'Optional variables:' \
		'  IMAGE=repo/kube-keeper:tag' \
		'  PLATFORM=linux/amd64' \
		'  DOCKER_BUILD_FLAGS=--no-cache'

image:
	$(DOCKER) build \
		$(if $(strip $(PLATFORM)),--platform "$(PLATFORM)") \
		--build-arg GIT_COMMIT="$(GIT_COMMIT)" \
		--build-arg BUILD_DATE="$(BUILD_DATE)" \
		$(DOCKER_BUILD_FLAGS) \
		-t "$(IMAGE)" \
		"$(ROOT_DIR)"
	@printf 'Built image %s\n' "$(IMAGE)"

local:
	$(DOCKER) build \
		$(if $(strip $(PLATFORM)),--platform "$(PLATFORM)") \
		--build-arg GIT_COMMIT="$(GIT_COMMIT)" \
		--build-arg BUILD_DATE="$(BUILD_DATE)" \
		$(DOCKER_BUILD_FLAGS) \
		-f Dockerfile.local \
		-t "$(IMAGE)" \
		"$(ROOT_DIR)"
	@printf 'Built image %s\n' "$(IMAGE)"
#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR=$(cd "$(dirname "$0")/.." && pwd)
WEB_DIR="$ROOT_DIR/web"
EMBED_DIR="$ROOT_DIR/pkg/embeds/web"

if [ ! -d "$WEB_DIR" ]; then
  echo "web directory '$WEB_DIR' not found" >&2
  exit 1
fi

if ! command -v yarn >/dev/null 2>&1; then
  echo "yarn is required but not found" >&2
  exit 1
fi

cd "$WEB_DIR"
yarn install --frozen-lockfile
yarn build

if [ ! -d "$WEB_DIR/dist" ]; then
  echo "web build output '$WEB_DIR/dist' not found" >&2
  exit 1
fi

mkdir -p "$EMBED_DIR"
find "$EMBED_DIR" -mindepth 1 ! -name '.gitkeep' -exec rm -rf {} +
cp -R "$WEB_DIR/dist/." "$EMBED_DIR/"

if [ ! -f "$EMBED_DIR/index.html" ]; then
  echo "embedded index.html missing after copy" >&2
  exit 1
fi

echo "embedded web assets updated in $EMBED_DIR"

#!/usr/bin/env bash
# Build without gulp (Node 22 breaks gulp@3). Uses Hugo + plain asset copy.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

HUGO_BIN="${HUGO_BIN:-}"
if [[ -z "$HUGO_BIN" ]]; then
  if [[ -x ./node_modules/hugo-bin/vendor/hugo ]]; then
    HUGO_BIN=./node_modules/hugo-bin/vendor/hugo
  elif [[ -x ./node_modules/.bin/hugo ]]; then
    HUGO_BIN=./node_modules/.bin/hugo
  else
    echo "Hugo binary not found. Run npm install." >&2
    exit 1
  fi
fi

rm -rf dist
mkdir -p dist/css dist/js dist/img

"$HUGO_BIN" -d ../dist -s site
cp src/css/main.css dist/css/main.css
cp src/js/app.js dist/app.js
cp -a src/img/. dist/img/

echo "Built to dist/ with $HUGO_BIN"

#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
DIST="$ROOT/dist"
rm -rf "$DIST"
mkdir -p "$DIST"

# Plugin zip (WordPress expects the folder at zip root)
( cd "$ROOT/plugins" && zip -qr "$DIST/bville-menu.zip" bville-menu -x '*.DS_Store' )

# Theme zip
( cd "$ROOT/themes" && zip -qr "$DIST/bville-theme.zip" bville -x '*.DS_Store' )

# Full bundle
( cd "$ROOT" && zip -qr "$DIST/bville-wordpress.zip" \
  README.md INSTALL-GODADDY.md plugins themes exports \
  -x 'dist/*' -x '*.DS_Store' )

echo "Built:"
ls -lh "$DIST"

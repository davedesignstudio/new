#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
OUT="$ROOT/releases"
rm -rf "$OUT"
mkdir -p "$OUT"

# Plugin zip (WordPress expects the folder at zip root)
( cd "$ROOT/plugins" && zip -qr "$OUT/bville-menu.zip" bville-menu -x '*.DS_Store' )

# Theme zip
( cd "$ROOT/themes" && zip -qr "$OUT/bville-theme.zip" bville -x '*.DS_Store' )

# Full bundle (sources + docs)
( cd "$ROOT" && zip -qr "$OUT/bville-wordpress.zip" \
  README.md INSTALL-GODADDY.md plugins themes exports \
  -x 'releases/*' -x 'dist/*' -x '*.DS_Store' )

echo "Built:"
ls -lh "$OUT"

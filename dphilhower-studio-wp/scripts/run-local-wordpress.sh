#!/usr/bin/env bash
# Local D Philhower Studio WordPress (SQLite, PHP built-in server).
set -euo pipefail
ROOT="${DPS_WP_ROOT:-/tmp/dps-wordpress}"
THEME="/workspace/dphilhower-studio-wp/theme/dphilhower-studio"
PORT="${1:-8080}"
WP_CLI="${WP_CLI:-php /tmp/wp-cli.phar}"

if [[ ! -d "$ROOT/wp-admin" ]]; then
  echo "WordPress is not installed at $ROOT. Re-run the agent install, or:"
  echo "  php /tmp/wp-cli.phar core download --path=$ROOT"
  exit 1
fi

ln -sfn "$THEME" "$ROOT/wp-content/themes/dphilhower-studio"
cd "$ROOT"
$WP_CLI theme activate dphilhower-studio --allow-root --path="$ROOT" >/dev/null
$WP_CLI dps seed --allow-root --path="$ROOT" >/dev/null || true

cat > "$ROOT/router.php" <<'PHP'
<?php
$uri = urldecode( (string) parse_url( $_SERVER['REQUEST_URI'], PHP_URL_PATH ) );
if ( '/' !== $uri && file_exists( __DIR__ . $uri ) ) {
	return false;
}
require __DIR__ . '/index.php';
PHP

echo "D Philhower Studio WordPress → http://127.0.0.1:${PORT}/"
echo "Admin → http://127.0.0.1:${PORT}/wp-admin/  (studio / studio-local)"
exec php -S "127.0.0.1:${PORT}" -t "$ROOT" "$ROOT/router.php"

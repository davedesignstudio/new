#!/usr/bin/env bash
# Build theme zip and WordPress all-in-one zip for D Philhower Studio.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
THEME_DIR="$ROOT/theme/dphilhower-studio"
RELEASES="$ROOT/releases"
BUILD="$ROOT/.build"
WP_ZIP_URL="${WP_ZIP_URL:-https://wordpress.org/latest.zip}"

if [[ ! -f "$THEME_DIR/style.css" ]]; then
  echo "Theme not found at $THEME_DIR" >&2
  exit 1
fi

rm -rf "$BUILD"
mkdir -p "$RELEASES" "$BUILD"

echo "→ Theme zip"
rm -f "$RELEASES/dphilhower-studio-theme.zip"
(
  cd "$ROOT/theme"
  zip -qr -9 "$RELEASES/dphilhower-studio-theme.zip" dphilhower-studio \
    -x "*.DS_Store" -x "*/.git/*"
)

echo "→ HTML / CSS / JS zip"
HTML_SRC="$ROOT/preview"
if [[ ! -f "$HTML_SRC/index.html" ]]; then
  echo "HTML preview not found at $HTML_SRC" >&2
  exit 1
fi
HTML_STAGE="$BUILD/dphilhower-studio-html"
rm -rf "$HTML_STAGE"
mkdir -p "$HTML_STAGE"
cp -a "$HTML_SRC"/. "$HTML_STAGE"/
rm -f "$RELEASES/dphilhower-studio-html-css-js.zip"
(
  cd "$BUILD"
  zip -qr -9 "$RELEASES/dphilhower-studio-html-css-js.zip" dphilhower-studio-html \
    -x "*.DS_Store"
)

if [[ "${SKIP_WORDPRESS:-0}" == "1" ]]; then
  echo
  echo "Built (SKIP_WORDPRESS=1):"
  ls -lh "$RELEASES"
  exit 0
fi

echo "→ Download WordPress"
WP_ZIP="$BUILD/wordpress-latest.zip"
for attempt in 1 2 3 4; do
  if curl -fL --retry 3 --retry-delay 4 -o "$WP_ZIP" "$WP_ZIP_URL"; then
    break
  fi
  if [[ "$attempt" -eq 4 ]]; then
    echo "Failed to download WordPress" >&2
    exit 1
  fi
  sleep $((attempt * 4))
done

unzip -q "$WP_ZIP" -d "$BUILD"

PKG="$BUILD/dphilhower-studio-wordpress"
mkdir -p "$PKG"
mv "$BUILD/wordpress" "$PKG/wordpress"

echo "→ Install theme and defaults into WordPress"
rm -rf "$PKG/wordpress/wp-content/themes/dphilhower-studio"
cp -a "$THEME_DIR" "$PKG/wordpress/wp-content/themes/dphilhower-studio"
mkdir -p "$PKG/wordpress/wp-content/mu-plugins"
cp "$ROOT/mu-plugins/dps-default-theme.php" "$PKG/wordpress/wp-content/mu-plugins/dps-default-theme.php"

if ! grep -q "WP_DEFAULT_THEME" "$PKG/wordpress/wp-config-sample.php"; then
  printf '\n/* D Philhower Studio */\ndefine( '\''WP_DEFAULT_THEME'\'', '\''dphilhower-studio'\'' );\n' >> "$PKG/wordpress/wp-config-sample.php"
fi

cp "$ROOT/docker-compose.yml" "$PKG/docker-compose.yml"
cp "$ROOT/INSTALL.md" "$PKG/INSTALL.md"
cp "$ROOT/README.md" "$PKG/README.md"
cp "$RELEASES/dphilhower-studio-theme.zip" "$PKG/dphilhower-studio-theme.zip"

cat > "$PKG/START-HERE.txt" <<'TXT'
D Philhower Studio — all-in-one WordPress package
=================================================

For a new site on dphilhower.com:
  1. Read INSTALL.md
  2. Upload the contents of the wordpress/ folder to public_html
  3. Create a MySQL database at your host
  4. Visit the domain and finish the WordPress installer
  5. Activate the D Philhower Studio theme if pages are empty

Already have WordPress?
  Upload dphilhower-studio-theme.zip via Appearance → Themes → Upload Theme.

Local preview with Docker:
  docker compose up -d
  open http://localhost:8080
TXT

echo "→ All-in-one zip"
rm -f "$RELEASES/dphilhower-studio-wordpress-all-in-one.zip"
(
  cd "$BUILD"
  zip -qr -9 "$RELEASES/dphilhower-studio-wordpress-all-in-one.zip" dphilhower-studio-wordpress \
    -x "*.DS_Store"
)

echo
echo "Built:"
ls -lh "$RELEASES"
echo "Theme zip entries: $(unzip -l "$RELEASES/dphilhower-studio-theme.zip" | tail -1)"
echo "All-in-one zip entries: $(unzip -l "$RELEASES/dphilhower-studio-wordpress-all-in-one.zip" | tail -1)"

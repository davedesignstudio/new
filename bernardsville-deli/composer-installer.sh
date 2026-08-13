#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

echo "Installing Composer for Bernardsville Deli website..."
php composer-setup.php --install-dir=. --filename=composer.phar
php -r "unlink('composer-setup.php');"
echo "Done. Run: php composer.phar install"

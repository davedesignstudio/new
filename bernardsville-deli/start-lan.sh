#!/usr/bin/env bash
# Serve Bville on every network interface so phones/laptops on the same
# Wi-Fi can open the site (not just this machine's localhost).
set -euo pipefail
cd "$(dirname "$0")"
PORT="${PORT:-8080}"

LAN_IP="$(python3 - <<'PY'
import socket
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
try:
    s.connect(("8.8.8.8", 80))
    print(s.getsockname()[0])
except OSError:
    print("0.0.0.0")
finally:
    s.close()
PY
)"

echo "Bville on the local network"
echo "  this computer:  http://127.0.0.1:${PORT}/"
echo "  phones / LAN:   http://${LAN_IP}:${PORT}/"
echo "  menu:           http://${LAN_IP}:${PORT}/menu.php"
echo "  order:          http://${LAN_IP}:${PORT}/order/"
echo
exec env PHP_CLI_SERVER_WORKERS="${PHP_CLI_SERVER_WORKERS:-8}" \
  php -S "0.0.0.0:${PORT}" -t public

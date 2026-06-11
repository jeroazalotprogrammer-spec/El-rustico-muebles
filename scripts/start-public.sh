#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
export PATH="$HOME/.local/share/fnm:$HOME/.local/bin:$PATH"

if command -v fnm >/dev/null 2>&1; then
  eval "$(fnm env)"
fi

if [ ! -f "$HOME/.config/ngrok/ngrok.yml" ]; then
  echo "Falta configurar ngrok."
  echo "1. Creá cuenta gratis en https://dashboard.ngrok.com/signup"
  echo "2. Copiá tu token desde https://dashboard.ngrok.com/get-started/your-authtoken"
  echo "3. Ejecutá: ngrok config add-authtoken TU_TOKEN"
  exit 1
fi

cd "$ROOT"

if ! curl -s -o /dev/null http://127.0.0.1:4321; then
  echo "Iniciando servidor local en http://localhost:4321 ..."
  npm run dev -- --host 127.0.0.1 --port 4321 &
  DEV_PID=$!
  trap 'kill "$DEV_PID" 2>/dev/null || true' EXIT

  for _ in $(seq 1 30); do
    if curl -s -o /dev/null http://127.0.0.1:4321; then
      break
    fi
    sleep 1
  done
fi

echo ""
echo "Abriendo túnel público con ngrok..."
echo "Tu URL pública aparecerá abajo (Forwarding https://....ngrok-free.app)"
echo "Panel local de ngrok: http://127.0.0.1:4040"
echo "Para detener: Ctrl + C"
echo ""

ngrok http 4321

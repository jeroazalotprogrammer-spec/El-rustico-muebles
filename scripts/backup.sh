#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BACKUP_DIR="${BACKUP_DIR:-$HOME/backups/el-rustico}"
TIMESTAMP="$(date +%Y-%m-%d_%H-%M-%S)"
ARCHIVE_NAME="el-rustico_${TIMESTAMP}.tar.gz"
ARCHIVE_PATH="$BACKUP_DIR/$ARCHIVE_NAME"

mkdir -p "$BACKUP_DIR"

echo "Creando backup de El Rústico..."
echo "Origen:  $ROOT"
echo "Destino: $ARCHIVE_PATH"
echo ""

tar -czf "$ARCHIVE_PATH" \
  --exclude='node_modules' \
  --exclude='dist' \
  --exclude='.astro' \
  --exclude='.git' \
  --exclude='.env' \
  --exclude='*.log' \
  -C "$(dirname "$ROOT")" "$(basename "$ROOT")"

echo ""
echo "Backup listo:"
echo "  $ARCHIVE_PATH"
echo "  Tamaño: $(du -h "$ARCHIVE_PATH" | cut -f1)"
echo ""
echo "Para restaurar:"
echo "  mkdir -p ~/restaurado && tar -xzf \"$ARCHIVE_PATH\" -C ~/restaurado"

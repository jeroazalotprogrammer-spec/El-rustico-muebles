#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [ ! -d .git ]; then
  echo "No hay repositorio git en $ROOT"
  exit 1
fi

MSG="${1:-Backup automático $(date '+%Y-%m-%d %H:%M:%S')}"

echo "Guardando cambios en git..."
git add -A
git status --short

if git diff --cached --quiet; then
  echo "No hay cambios nuevos para commitear."
else
  GIT_AUTHOR_NAME="${GIT_AUTHOR_NAME:-jeronimo}" \
  GIT_AUTHOR_EMAIL="${GIT_AUTHOR_EMAIL:-jeronimo@users.noreply.github.com}" \
  GIT_COMMITTER_NAME="${GIT_COMMITTER_NAME:-jeronimo}" \
  GIT_COMMITTER_EMAIL="${GIT_COMMITTER_EMAIL:-jeronimo@users.noreply.github.com}" \
  git commit -m "$MSG"
  echo "Commit creado."
fi

if git remote get-url origin >/dev/null 2>&1; then
  echo "Subiendo a GitHub..."
  git push origin "$(git branch --show-current)"
  echo "Backup en GitHub completado."
else
  echo "No hay remoto configurado. Solo se hizo commit local."
fi

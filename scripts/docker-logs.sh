#!/usr/bin/env bash
set -euo pipefail

cleanup() {
  jobs -p | xargs -r kill 2>/dev/null || true
}
trap cleanup EXIT INT TERM

docker compose logs -f --no-color --no-log-prefix front | sed -u 's/^/[front] : /' &
docker compose logs -f --no-color --no-log-prefix back | sed -u 's/^/[back] : /' &

wait

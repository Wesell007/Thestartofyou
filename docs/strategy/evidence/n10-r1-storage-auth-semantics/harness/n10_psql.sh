#!/usr/bin/env bash
# N10.1 psql wrapper (direct endpoint, role postgres). Usage:
#   G3_EXPECT_REF=<ref> g3_psql.sh [--file <path> --sha256 <hex>] [--no-marker] [psql args...]
# --file runs the file as ONE transaction (-1) with ON_ERROR_STOP after a SHA-256 gate.
# Unless --no-marker is given, the session first asserts the G3 marker row equals the target.
set -euo pipefail
source "$(dirname "$0")/n10_guard.sh"
REF="$(g3_target)"
g3_scan_args "$REF" "$@"
FILE=""; SHA=""; MARKER=1; ARGS=()
while [ $# -gt 0 ]; do
  case "$1" in
    --file) FILE="$2"; shift 2;;
    --sha256) SHA="$2"; shift 2;;
    --no-marker) MARKER=0; shift;;
    *) ARGS+=("$1"); shift;;
  esac
done
PASS_FILE="$G3_DIR/n10r1.dbpass"
[ -s "$PASS_FILE" ] || g3_die "database password file missing"
HOST="db.${REF}.supabase.co"
[ "$HOST" = "db.${G3_EXPECT_REF}.supabase.co" ] || g3_die "host mismatch"
export PGPASSWORD; PGPASSWORD="$(tr -d '\r\n' < "$PASS_FILE")"
export PGCONNECT_TIMEOUT=15 PGAPPNAME="n10r1-rehearsal"
PSQL="${G3_PSQL_BIN:-/c/Program Files/PostgreSQL/17/bin/psql.exe}"
CONN="host=$HOST port=5432 dbname=postgres user=postgres sslmode=require"
if [ "$MARKER" = 1 ]; then
  got="$("$PSQL" "$CONN" -X -A -t -v ON_ERROR_STOP=1 -c "select project_ref from public.n10r1_rehearsal_marker" 2>/dev/null || true)"
  [ "$got" = "$REF" ] || g3_die "marker check failed (expected marker for target ref)"
fi
if [ -n "$FILE" ]; then
  [ -n "$SHA" ] || g3_die "--file requires --sha256"
  actual="$(sha256sum "$FILE" | cut -d' ' -f1)"
  [ "$actual" = "$SHA" ] || g3_die "SHA-256 mismatch for $FILE"
  exec "$PSQL" "$CONN" -X -1 -v ON_ERROR_STOP=1 -e -f "$FILE" "${ARGS[@]}"
fi
exec "$PSQL" "$CONN" -X -v ON_ERROR_STOP=1 "${ARGS[@]}"

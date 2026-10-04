#!/usr/bin/env bash
# C1 psql runner. Usage: c1_psql.sh <direct|pooler> <expected_sha256|-> <file.sql|-c "sql">
# One external transaction (-1), ON_ERROR_STOP=1, echo statements (-e). Password read from a file, never printed.
set -uo pipefail
C1="/c/Users/Administrator/.c1"; PSQL="/c/Program Files/PostgreSQL/17/bin/psql.exe"
TARGET="$(tr -d '[:space:]' < "$C1/target_ref.txt")"
[ "$TARGET" = "wwtcnbjhttjtklpxhrkd" ] || { echo "STOP: target_ref.txt is not Project 1"; exit 90; }
while read -r d; do [ -n "$d" ] && [ "$TARGET" = "$d" ] && { echo "STOP: target denylisted"; exit 91; }; done < "$C1/denylist.txt"
MODE="$1"; EXPECT="$2"; shift 2
case "$MODE" in
  direct) HOST="db.${TARGET}.supabase.co"; USERN="postgres";;
  pooler) HOST="aws-0-eu-west-2.pooler.supabase.com"; USERN="postgres.${TARGET}";;
  *) echo "STOP: mode must be direct|pooler"; exit 92;;
esac
case "$HOST" in *wogepxfipdipogyogced*|*dlftnirrnirlkhxpofoq*) echo "STOP: denylisted host"; exit 93;; esac
if [ "$1" = "-f" ]; then
  FILE="$2"; ACTUAL="$(sha256sum "$FILE" | cut -d' ' -f1)"
  [ "$EXPECT" = "-" ] || [ "$ACTUAL" = "$EXPECT" ] || { echo "STOP: hash mismatch for $FILE: $ACTUAL != $EXPECT"; exit 94; }
  echo "[c1_psql] file=$(basename "$FILE") sha256=$ACTUAL"
fi
echo "[c1_psql] mode=$MODE host=$HOST user=$USERN db=postgres port=5432 target=$TARGET"
export PGPASSWORD="$(tr -d '\r\n' < "$C1/run1.dbpass")"
export PGCONNECT_TIMEOUT=15
"$PSQL" -h "$HOST" -p 5432 -U "$USERN" -d postgres -w -X -1 -v ON_ERROR_STOP=1 -e "$@"
rc=$?
unset PGPASSWORD
echo "[c1_psql] exit=$rc"
exit $rc

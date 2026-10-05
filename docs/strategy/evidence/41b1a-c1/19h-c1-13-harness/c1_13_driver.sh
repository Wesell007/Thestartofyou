#!/usr/bin/env bash
# C1.13 driver helpers. Usage: c1_13_driver.sh <cmd> <label> [args]
#   cap <label>        capture the nine-section catalogue into c1_13/<label>/sec_*.txt (+ hashes.txt)
#   guards <label>     run the guard-state query set into c1_13/<label>.guards.log
#   rollback <label>   run the frozen rollback file (hash-gated, -1, ON_ERROR_STOP=1) into c1_13/<label>.rollback.log; prints exit
#   diff <pre> <post>  diff the two section sets; prints EMPTY or the differences
#   sql <label> <file> run an arbitrary SQL file as postgres (no -1; file controls transactions) into c1_13/<label>.log
set -uo pipefail
C1=/c/Users/Administrator/.c1; W=$C1/c1_13; mkdir -p "$W"
ROLLBACK_SHA=0d00895514b4e2dc623383436952fd534d5f879cdf4011024596dae303a36077
ROLLBACK_FILE=$C1/src-735a07e6/docs/strategy/migrations-pending/41b1a_family_entity_foundation_rollback.sql
cmd=$1; label=$2
case "$cmd" in
  cap)
    d="$W/$label"; mkdir -p "$d"
    sed "s#@DIR@#c1_13/$label#g" "$C1/c1_13_capture_template.sql" > "$d/capture.sql"
    ( cd "$C1" && ./c1_psql.sh direct - -q -f "$d/capture.sql" > "$d/capture.log" 2>&1 ); rc=$?
    for f in columns enums functions triggers rls policies constraints indexes grants; do
      n=$(grep -c . "$d/sec_$f.txt"); h=$(sort "$d/sec_$f.txt" | md5sum | cut -d' ' -f1); echo "$f $n $h"
    done | tee "$d/hashes.txt"
    echo "[cap $label] rc=$rc at $(date -u +%Y-%m-%dT%H:%M:%SZ)";;
  guards)
    ( cd "$C1" && ./c1_psql.sh direct - -q -f "$C1/c1_13_state.sql" > "$W/$label.guards.log" 2>&1 ); rc=$?
    grep -A2 'g1_episode_rows' "$W/$label.guards.log" | tail -1; echo "[guards $label] rc=$rc";;
  rollback)
    echo "START $(date -u +%Y-%m-%dT%H:%M:%S.%3NZ)" > "$W/$label.rollback.log"
    ( cd "$C1" && ./c1_psql.sh direct "$ROLLBACK_SHA" -f "$ROLLBACK_FILE" >> "$W/$label.rollback.log" 2>&1 ); rc=$?
    echo "END $(date -u +%Y-%m-%dT%H:%M:%S.%3NZ) rc=$rc" >> "$W/$label.rollback.log"
    echo "[rollback $label] exit=$rc"; grep -E 'ROLLBACK REFUSED|^psql:.*ERROR|^(DROP|ALTER TABLE|COMMIT|ROLLBACK)$' "$W/$label.rollback.log" | head -5;;
  diff)
    post=$3; out="$W/$label.vs.$post.diff.txt"; : > "$out"; empty=1
    for f in columns enums functions triggers rls policies constraints indexes grants; do
      if ! diff <(sort "$W/$label/sec_$f.txt") <(sort "$W/$post/sec_$f.txt") > "$W/tmp.diff" 2>&1; then empty=0; { echo "## $f"; cat "$W/tmp.diff"; } >> "$out"; fi
    done
    if [ $empty -eq 1 ]; then echo "EMPTY" > "$out"; echo "[diff $label vs $post] EMPTY"; else echo "[diff $label vs $post] DIFFERENCES:"; cat "$out"; fi;;
  sql)
    file=$3
    ( cd "$C1" && ./c1_psql_notx.sh direct - -f "$file" > "$W/$label.log" 2>&1 ); rc=$?
    echo "[sql $label] rc=$rc errors=$(grep -c 'ERROR' "$W/$label.log")";;
  *) echo "unknown cmd"; exit 2;;
esac

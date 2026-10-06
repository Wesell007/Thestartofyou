#!/usr/bin/env bash
# Project 2 (C1.17) driver helpers, mirror of c1_13_driver.sh using the Project 2 wrappers. Work dir: ~/.c1/c2
#   cap <label>        nine-section catalogue into c2/<label>/sec_*.txt (+ sec_functions_prosrc.txt, hashes.txt)
#   guards <label>     guard-state query set into c2/<label>.guards.log
#   rollback <label>   frozen rollback (hash-gated, -1, ON_ERROR_STOP=1) into c2/<label>.rollback.log
#   diff <pre> <post>  diff two section sets (nine sections)
#   sql <label> <file> run a SQL file as postgres (no -1) into c2/<label>.log
#   run <label> <sha> <file>  run a frozen file with -1 and the hash gate into c2/<label>.log (forward / validate)
set -uo pipefail
C1=/c/Users/Administrator/.c1; W=$C1/c2; mkdir -p "$W"
ROLLBACK_SHA=0d00895514b4e2dc623383436952fd534d5f879cdf4011024596dae303a36077
ROLLBACK_FILE=$C1/src2-735a07e6/docs/strategy/migrations-pending/41b1a_family_entity_foundation_rollback.sql
cmd=$1; label=$2
case "$cmd" in
  cap)
    d="$W/$label"; mkdir -p "$d"
    sed "s#@DIR@#c2/$label#g" "$C1/c1_13_capture_template.sql" > "$d/capture.sql"
    ( cd "$C1" && ./c2_psql.sh direct - -q -f "$d/capture.sql" > "$d/capture.log" 2>&1 ); rc=$?
    ( cd "$C1" && ./c2_psql.sh direct - -q -A -t -c "select p.proname || '|' || pg_get_function_identity_arguments(p.oid) || '|' || p.prosecdef::text || '|' || md5(p.prosrc) as line from pg_proc p join pg_namespace n on n.oid = p.pronamespace where n.nspname = 'public' order by 1;" 2>/dev/null | grep -vE '^\[c2_psql\]|^select ' | sed '/^$/d' > "$d/sec_functions_prosrc.txt" )
    for f in columns enums functions triggers rls policies constraints indexes grants; do
      n=$(grep -c . "$d/sec_$f.txt"); h=$(sort "$d/sec_$f.txt" | md5sum | cut -d' ' -f1); echo "$f $n $h"
    done | tee "$d/hashes.txt"
    echo "[cap $label] rc=$rc at $(date -u +%Y-%m-%dT%H:%M:%SZ)";;
  guards)
    ( cd "$C1" && ./c2_psql.sh direct - -q -f "$C1/c1_13_state.sql" > "$W/$label.guards.log" 2>&1 ); rc=$?
    grep -A2 'g1_episode_rows' "$W/$label.guards.log" | tail -1; echo "[guards $label] rc=$rc";;
  rollback)
    echo "START $(date -u +%Y-%m-%dT%H:%M:%S.%3NZ)" > "$W/$label.rollback.log"
    ( cd "$C1" && ./c2_psql.sh direct "$ROLLBACK_SHA" -f "$ROLLBACK_FILE" >> "$W/$label.rollback.log" 2>&1 ); rc=$?
    echo "END $(date -u +%Y-%m-%dT%H:%M:%S.%3NZ) rc=$rc" >> "$W/$label.rollback.log"
    echo "[rollback $label] exit=$rc"; grep -E 'ERROR:  ROLLBACK REFUSED' "$W/$label.rollback.log" | head -2;;
  run)
    sha=$3; file=$4
    echo "START $(date -u +%Y-%m-%dT%H:%M:%S.%3NZ)" > "$W/$label.log"
    ( cd "$C1" && ./c2_psql.sh direct "$sha" -f "$file" >> "$W/$label.log" 2>&1 ); rc=$?
    echo "END $(date -u +%Y-%m-%dT%H:%M:%S.%3NZ) rc=$rc" >> "$W/$label.log"
    echo "[run $label] exit=$rc ERROR=$(grep -c 'ERROR' "$W/$label.log") WARNING=$(grep -c WARNING "$W/$label.log") NOTICE=$(grep -c NOTICE "$W/$label.log")";;
  diff)
    post=$3; out="$W/$label.vs.$post.diff.txt"; : > "$out"; empty=1
    for f in columns enums functions triggers rls policies constraints indexes grants; do
      if ! diff <(sort "$W/$label/sec_$f.txt") <(sort "$W/$post/sec_$f.txt") > "$W/tmp.diff" 2>&1; then empty=0; { echo "## $f"; cat "$W/tmp.diff"; } >> "$out"; fi
    done
    if [ $empty -eq 1 ]; then echo "EMPTY" > "$out"; echo "[diff $label vs $post] EMPTY"; else echo "[diff $label vs $post] DIFFERENCES:"; cat "$out"; fi;;
  sql)
    file=$3
    ( cd "$C1" && ./c2_psql_notx.sh direct - -f "$file" > "$W/$label.log" 2>&1 ); rc=$?
    echo "[sql $label] rc=$rc errors=$(grep -c 'ERROR' "$W/$label.log")";;
  *) echo "unknown cmd"; exit 2;;
esac

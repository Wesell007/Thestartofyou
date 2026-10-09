#!/usr/bin/env bash
# G3 fail-closed target guard. Sourced by every G3 wrapper; never prints a credential.
# Allows exactly one target: the owner-confirmed G3 ref in target_ref.txt.
G3_DIR="${G3_DIR:-/c/Users/Administrator/.g3}"
G3_DENYLIST="wogepxfipdipogyogced wwtcnbjhttjtklpxhrkd dlftnirrnirlkhxpofoq"

g3_die() { echo "G3 GUARD REFUSED: $*" >&2; exit 97; }

g3_target() {
  local f="$G3_DIR/target_ref.txt"
  [ -s "$f" ] || g3_die "no owner-confirmed target_ref.txt"
  local ref
  ref="$(tr -d '\r\n[:space:]' < "$f")"
  [[ "$ref" =~ ^[a-z]{20}$ ]] || g3_die "target ref is not a 20-letter project ref"
  local d
  for d in $G3_DENYLIST; do
    [ "$ref" = "$d" ] && g3_die "target $ref is denylisted"
  done
  [ -n "${G3_EXPECT_REF:-}" ] || g3_die "G3_EXPECT_REF not set by caller"
  [ "$ref" = "$G3_EXPECT_REF" ] || g3_die "target mismatch (file vs caller expectation)"
  printf '%s' "$ref"
}

# Refuse any argument string that names a denylisted ref or any other 20-letter ref.
g3_scan_args() {
  local ref="$1"; shift
  local a d
  for a in "$@"; do
    for d in $G3_DENYLIST; do
      case "$a" in *"$d"*) g3_die "argument names denylisted ref $d";; esac
    done
    if [[ "$a" =~ (^|[^a-z])([a-z]{20})([^a-z]|$) ]] && [ "${BASH_REMATCH[2]}" != "$ref" ] \
       && [[ "$a" =~ supabase|db\.|ref ]]; then
      g3_die "argument names a non-G3 project ref"
    fi
  done
}

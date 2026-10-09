#!/usr/bin/env bash
# G3 HTTP wrapper for the Auth admin API. Usage:
#   G3_EXPECT_REF=<ref> g3_http.sh <METHOD> <path starting /auth/v1/> [curl args...]
# Builds the URL from the target ref only; the key is read from a protected file and passed
# through a header file, never on the command line or in output.
set -euo pipefail
source "$(dirname "$0")/g3_guard.sh"
REF="$(g3_target)"
g3_scan_args "$REF" "$@"
METHOD="$1"; PATH_PART="$2"; shift 2
[[ "$PATH_PART" =~ ^/auth/v1/ ]] || g3_die "only /auth/v1/ paths are allowed"
KEY_FILE="$G3_DIR/g3.service_key"
[ -s "$KEY_FILE" ] || g3_die "service key file missing"
HDR="$(mktemp "$G3_DIR/hdr.XXXXXX")"
trap 'rm -f "$HDR"' EXIT
chmod 600 "$HDR"
KEY="$(tr -d '\r\n' < "$KEY_FILE")"
printf 'apikey: %s\nAuthorization: Bearer %s\n' "$KEY" "$KEY" > "$HDR"
unset KEY
curl -sS -X "$METHOD" -H @"$HDR" -H "Content-Type: application/json" \
  "https://${REF}.supabase.co${PATH_PART}" "$@"

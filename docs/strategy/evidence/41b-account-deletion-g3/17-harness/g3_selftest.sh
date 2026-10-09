#!/usr/bin/env bash
# Offline self-test of the G3 wrappers. Uses a throwaway G3_DIR with fake credentials and
# stub psql / curl / npx.cmd binaries, so no network call is ever made.
set -u
W="$(cd "$(dirname "$0")" && pwd)"
T="$(mktemp -d)"
trap 'rm -rf "$T"' EXIT
mkdir -p "$T/bin" "$T/dir"
for b in psql curl npx.cmd; do
  printf '#!/usr/bin/env bash\necho "STUB %s reached: $*"\n' "$b" > "$T/bin/$b"; chmod +x "$T/bin/$b"
done
printf 'fake-db-pass' > "$T/dir/g3.dbpass"; printf 'fake-token' > "$T/dir/g3.pat"; printf 'fake-key' > "$T/dir/g3.service_key"
FAKE=qqqqqqqqqqqqqqqqqqqq
pass=0; fail=0
run() { # expect(refuse|reach) description target expect_ref command...
  local want="$1" desc="$2" tgt="$3" exp="$4"; shift 4
  if [ -z "$tgt" ]; then rm -f "$T/dir/target_ref.txt"; else printf '%s\n' "$tgt" > "$T/dir/target_ref.txt"; fi
  local out rc
  out="$(cd "$T" && PATH="$T/bin:$PATH" G3_PSQL_BIN="$T/bin/psql" G3_DIR="$T/dir" G3_EXPECT_REF="$exp" "$@" 2>&1)"; rc=$?
  local got="reach"; [ $rc -eq 97 ] && got="refuse"
  if [ "$got" = "$want" ]; then pass=$((pass+1)); echo "PASS [$want] $desc"; else fail=$((fail+1)); echo "FAIL [$want, got $got rc=$rc] $desc :: $out"; fi
  if printf '%s' "$out" | grep -q 'fake-db-pass\|fake-token\|fake-key'; then fail=$((fail+1)); echo "FAIL secret echoed in: $desc"; fi
}
P=wogepxfipdipogyogced; C1=wwtcnbjhttjtklpxhrkd; C2=dlftnirrnirlkhxpofoq
run refuse "psql: no target file"                 ""     "$FAKE" bash "$W/g3_psql.sh" --no-marker -c "select 1"
run refuse "psql: target = production"            "$P"   "$P"    bash "$W/g3_psql.sh" --no-marker -c "select 1"
run refuse "psql: target = C1 run1"               "$C1"  "$C1"   bash "$W/g3_psql.sh" --no-marker -c "select 1"
run refuse "psql: target = C1 run2"               "$C2"  "$C2"   bash "$W/g3_psql.sh" --no-marker -c "select 1"
run refuse "psql: malformed target"               "abc"  "abc"   bash "$W/g3_psql.sh" --no-marker -c "select 1"
run refuse "psql: caller expectation unset"       "$FAKE" ""     bash "$W/g3_psql.sh" --no-marker -c "select 1"
run refuse "psql: caller expects a different ref" "$FAKE" "rrrrrrrrrrrrrrrrrrrr" bash "$W/g3_psql.sh" --no-marker -c "select 1"
run refuse "psql: argument names production"      "$FAKE" "$FAKE" bash "$W/g3_psql.sh" --no-marker -c "select '$P'"
run refuse "psql: --file without --sha256"        "$FAKE" "$FAKE" bash "$W/g3_psql.sh" --no-marker --file "$W/g3_guard.sh"
run refuse "psql: --file hash mismatch"           "$FAKE" "$FAKE" bash "$W/g3_psql.sh" --no-marker --file "$W/g3_guard.sh" --sha256 0000
run reach  "psql: G3 target reaches psql stub"    "$FAKE" "$FAKE" bash "$W/g3_psql.sh" --no-marker -c "select 1"
run reach  "psql: hash-gated file reaches stub"   "$FAKE" "$FAKE" bash "$W/g3_psql.sh" --no-marker --file "$W/g3_guard.sh" --sha256 "$(sha256sum "$W/g3_guard.sh" | cut -d' ' -f1)"
run refuse "psql: marker check fails (stub returns no marker)" "$FAKE" "$FAKE" bash "$W/g3_psql.sh" -c "select 1"
run refuse "cli: projects delete production"      "$FAKE" "$FAKE" bash "$W/g3_cli.sh" projects delete "$P" --yes
run refuse "cli: projects delete without ref"     "$FAKE" "$FAKE" bash "$W/g3_cli.sh" projects delete --yes
run refuse "cli: projects delete other ref"       "$FAKE" "$FAKE" bash "$W/g3_cli.sh" projects delete rrrrrrrrrrrrrrrrrrrr --yes
run refuse "cli: api-keys without --project-ref"  "$FAKE" "$FAKE" bash "$W/g3_cli.sh" projects api-keys
run refuse "cli: api-keys for C1 ref"             "$FAKE" "$FAKE" bash "$W/g3_cli.sh" projects api-keys --project-ref "$C1"
run refuse "cli: unlisted command"                "$FAKE" "$FAKE" bash "$W/g3_cli.sh" db reset --project-ref "$FAKE"
run refuse "cli: --linked with no link file"      "$FAKE" "$FAKE" bash "$W/g3_cli.sh" db push --linked
run reach  "cli: --version reaches stub"        "$FAKE" "$FAKE" bash "$W/g3_cli.sh" --version
run refuse "cli: teardown without owner acceptance" "$FAKE" "$FAKE" bash "$W/g3_cli.sh" projects delete "$FAKE" --yes
run refuse "cli: link to another ref"         "$FAKE" "$FAKE" bash "$W/g3_cli.sh" link --project-ref rrrrrrrrrrrrrrrrrrrr
run refuse "http: non-auth path"                  "$FAKE" "$FAKE" bash "$W/g3_http.sh" GET /rest/v1/journeys
run refuse "http: target = production"            "$P"   "$P"    bash "$W/g3_http.sh" GET /auth/v1/admin/users
run reach  "http: G3 admin path reaches stub"     "$FAKE" "$FAKE" bash "$W/g3_http.sh" GET /auth/v1/admin/users
echo "SELFTEST: $pass passed, $fail failed"
[ $fail -eq 0 ]

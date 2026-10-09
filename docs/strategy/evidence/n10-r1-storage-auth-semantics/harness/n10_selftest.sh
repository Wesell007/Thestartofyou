#!/usr/bin/env bash
# Offline self-test of the N10.1 guard, psql wrapper and Python HTTP guard.
# Throwaway N10 dir with fake credentials, stub psql, and a Python monkeypatch so no network call is made.
set -u
W="$(cd "$(dirname "$0")" && pwd)"
WW="$(cygpath -w "$W")"
T="$(mktemp -d)"
trap 'rm -rf "$T"' EXIT
mkdir -p "$T/bin" "$T/dir"
printf '#!/usr/bin/env bash\necho "STUB psql reached: $*"\n' > "$T/bin/psql"; chmod +x "$T/bin/psql"
printf 'fake-db-pass' > "$T/dir/n10r1.dbpass"; printf 'fake-token' > "$T/dir/n10r1.pat"
printf 'fake-service' > "$T/dir/n10r1.service_key"; printf 'fake-anon' > "$T/dir/n10r1.anon_key"
FAKE=qqqqqqqqqqqqqqqqqqqq
P=wogepxfipdipogyogced; C1=wwtcnbjhttjtklpxhrkd; C2=dlftnirrnirlkhxpofoq; G3=czhopceorfqxdbfvlnap
pass=0; fail=0
check() { # want desc rc out
  local want="$1" desc="$2" rc="$3" out="$4" got="other"
  [ "$rc" -eq 97 ] && got="refuse"
  [ "$rc" -eq 0 ] && printf '%s' "$out" | grep -q "STUB" && got="reach"
  if [ "$got" = "$want" ]; then pass=$((pass+1)); echo "PASS [$want] $desc"; else fail=$((fail+1)); echo "FAIL [$want, got $got rc=$rc] $desc :: $out"; fi
  if printf '%s' "$out" | grep -q 'fake-db-pass\|fake-token\|fake-service\|fake-anon'; then fail=$((fail+1)); echo "FAIL secret echoed: $desc"; fi
}
settarget() { if [ -z "$1" ]; then rm -f "$T/dir/target_ref.txt"; else printf '%s\n' "$1" > "$T/dir/target_ref.txt"; fi; }
ps() { local want="$1" desc="$2" tgt="$3" exp="$4"; shift 4; settarget "$tgt"
  local out rc; out="$(PATH="$T/bin:$PATH" G3_PSQL_BIN="$T/bin/psql" G3_DIR="$T/dir" G3_EXPECT_REF="$exp" bash "$W/n10_psql.sh" "$@" 2>&1)"; rc=$?; check "$want" "$desc" "$rc" "$out"; }
py() { local want="$1" desc="$2" tgt="$3" exp="$4" code="$5"; settarget "$tgt"
  local out rc; out="$(N10_DIR="$(cygpath -w "$T/dir")" N10_EXPECT_REF="$exp" python -I -c "
import sys; sys.path.insert(0, r'$WW'); import n10lib
n10lib._http = lambda m, u, h, body=None, raw=None, timeout=60: (200, 'STUB reached ' + m + ' ' + u)
$code
print(r)" 2>&1)"; rc=$?; check "$want" "$desc" "$rc" "$out"; }
ps refuse "psql: no target file"              ""     "$FAKE" --no-marker -c "select 1"
ps refuse "psql: production"                  "$P"   "$P"    --no-marker -c "select 1"
ps refuse "psql: C1 run1"                     "$C1"  "$C1"   --no-marker -c "select 1"
ps refuse "psql: C1 run2"                     "$C2"  "$C2"   --no-marker -c "select 1"
ps refuse "psql: retired G3"                  "$G3"  "$G3"   --no-marker -c "select 1"
ps refuse "psql: malformed"                   "abc"  "abc"   --no-marker -c "select 1"
ps refuse "psql: caller expectation unset"    "$FAKE" ""     --no-marker -c "select 1"
ps refuse "psql: expectation mismatch"        "$FAKE" "rrrrrrrrrrrrrrrrrrrr" --no-marker -c "select 1"
ps refuse "psql: production named in args"    "$FAKE" "$FAKE" --no-marker -c "select '$P'"
ps refuse "psql: G3 ref named in args"        "$FAKE" "$FAKE" --no-marker -c "select 'db.$G3.supabase.co'"
ps refuse "psql: file hash mismatch"          "$FAKE" "$FAKE" --no-marker --file "$W/n10_guard.sh" --sha256 0000
ps refuse "psql: marker check fails"          "$FAKE" "$FAKE" -c "select 1"
ps reach  "psql: N10 target reaches stub"     "$FAKE" "$FAKE" --no-marker -c "select 1"
py refuse "py: production target"             "$P"   "$P"    "r = n10lib.project_call('GET', '/auth/v1/admin/users')"
py refuse "py: retired G3 target"             "$G3"  "$G3"   "r = n10lib.project_call('GET', '/auth/v1/admin/users')"
py refuse "py: expectation unset"             "$FAKE" ""     "r = n10lib.project_call('GET', '/auth/v1/admin/users')"
py refuse "py: non-auth/storage path"         "$FAKE" "$FAKE" "r = n10lib.project_call('GET', '/rest/v1/x')"
py refuse "py: mgmt path for another ref"     "$FAKE" "$FAKE" "r = n10lib.mgmt_get('/v1/projects/$P')"
py refuse "py: mgmt non-project path"         "$FAKE" "$FAKE" "r = n10lib.mgmt_get('/v1/organizations')"
py reach  "py: auth admin path reaches stub"  "$FAKE" "$FAKE" "r = n10lib.project_call('GET', '/auth/v1/admin/users')"
py reach  "py: storage path reaches stub"     "$FAKE" "$FAKE" "r = n10lib.project_call('POST', '/storage/v1/object/list/b', body={})"
py reach  "py: mgmt own project reaches stub" "$FAKE" "$FAKE" "r = n10lib.mgmt_get('/v1/projects/$FAKE')"
echo "SELFTEST: $pass passed, $fail failed"
[ $fail -eq 0 ]

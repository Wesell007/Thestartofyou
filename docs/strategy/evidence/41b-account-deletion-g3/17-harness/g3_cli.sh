#!/usr/bin/env bash
# G3 Supabase CLI wrapper. Runs only inside the 735a07e6 scratch clone, only for the G3 ref.
# Allowed: `link --project-ref <G3>`, `db push --linked [--dry-run]`, `migration list --linked`,
# `projects delete <G3> --yes` (teardown, only after owner acceptance), `--version`.
# Token and DB password reach the CLI only through this process's environment; never printed.
set -euo pipefail
source "$(dirname "$0")/g3_guard.sh"
REF="$(g3_target)"
g3_scan_args "$REF" "$@"
SCRATCH="${G3_SCRATCH:-$G3_DIR/src-735a07e6}"
[ -s "$G3_DIR/g3.pat" ] || g3_die "access token file missing"
joined=" $* "
case "$joined" in
  " link --project-ref $REF ") ;;
  " db push --linked "|" db push --linked --dry-run "|" migration list --linked ") ;;
  " projects delete $REF --yes ") [ -f "$G3_DIR/OWNER_ACCEPTED_TEARDOWN" ] || g3_die "teardown not authorised";;
  " --version ") ;;
  *) g3_die "CLI command not on the G3 allowlist";;
esac
if [ "$1" != "--version" ] && [ "$1" != "projects" ]; then
  [ "$(git -C "$SCRATCH" rev-parse HEAD)" = "735a07e68ec269ed48c10f4cffb859c3d126a8ee" ] || g3_die "scratch is not at 735a07e6"
  grep -q "^project_id = \"$REF\"$" "$SCRATCH/supabase/config.toml" || g3_die "scratch config.toml does not point at the G3 ref"
  ! grep -q "wogepxfipdipogyogced" "$SCRATCH/supabase/config.toml" || g3_die "production ref in scratch config"
  [ "$(ls "$SCRATCH"/supabase/migrations/*.sql | wc -l)" = "47" ] || g3_die "scratch does not hold exactly 47 migrations"
  ! ls "$SCRATCH/supabase/migrations" | grep -q 41b1a || g3_die "a 41B.1A file is inside the scratch migrations"
  if [[ "$joined" == *" --linked "* ]]; then
    linked="$(tr -d '\r\n' < "$SCRATCH/supabase/.temp/project-ref" 2>/dev/null || true)"
    [ "$linked" = "$REF" ] || g3_die "linked project is not the G3 ref"
  fi
fi
export SUPABASE_ACCESS_TOKEN; SUPABASE_ACCESS_TOKEN="$(tr -d '\r\n' < "$G3_DIR/g3.pat")"
export SUPABASE_DB_PASSWORD; SUPABASE_DB_PASSWORD="$(tr -d '\r\n' < "$G3_DIR/g3.dbpass")"
echo "[g3_cli] target=$REF scratch=735a07e6 migrations=47 cmd=supabase $*"
cd "$SCRATCH" && exec npx.cmd --yes supabase@2.120.0 "$@"

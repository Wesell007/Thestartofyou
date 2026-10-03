#!/usr/bin/env bash
# C1 rehearsal CLI wrapper. Asserts the target before any Supabase CLI command.
# Usage: c1_cli.sh <supabase subcommand and flags...>
set -euo pipefail
C1_HOME="/c/Users/Administrator/.c1"
SCRATCH="$C1_HOME/src-735a07e6"
TARGET="$(tr -d '[:space:]' < "$C1_HOME/target_ref.txt")"
[ "$TARGET" = "wwtcnbjhttjtklpxhrkd" ] || { echo "STOP: target_ref.txt is not the authorised Project 1 ref"; exit 90; }
while read -r denied; do
  [ -z "$denied" ] && continue
  [ "$TARGET" != "$denied" ] || { echo "STOP: target $TARGET is denylisted"; exit 91; }
  case " $* " in *"$denied"*) echo "STOP: a denylisted ref appears in the command arguments"; exit 92;; esac
done < "$C1_HOME/denylist.txt"
grep -q "^project_id = \"$TARGET\"" "$SCRATCH/supabase/config.toml" || { echo "STOP: scratch config.toml does not point at $TARGET"; exit 93; }
[ "$(git -C "$SCRATCH" rev-parse HEAD)" = "$(git -C "$SCRATCH" rev-parse 735a07e6)" ] || { echo "STOP: scratch is not at 735a07e6"; exit 94; }
[ "$(ls "$SCRATCH"/supabase/migrations/*.sql | wc -l)" = "47" ] || { echo "STOP: scratch does not hold exactly 47 migrations"; exit 95; }
ls "$SCRATCH"/supabase/migrations | grep -q 41b1a && { echo "STOP: a 41B.1A pending file is inside the scratch migrations folder"; exit 96; }
# credentials are read from files outside the repository and never echoed
[ -f "$C1_HOME/access_token" ] && export SUPABASE_ACCESS_TOKEN="$(tr -d '[:space:]' < "$C1_HOME/access_token")"
[ -f "$C1_HOME/run1.dbpass" ] && export SUPABASE_DB_PASSWORD="$(cat "$C1_HOME/run1.dbpass" | tr -d '\r\n')"
echo "[c1_cli] target=$TARGET scratch=735a07e6 migrations=47 cmd=supabase $*"
cd "$SCRATCH" && exec npx.cmd supabase "$@"

#!/usr/bin/env bash
# Compare two G3 capture directories section by section (sorted line sets).
a="$1"; b="$2"; rc=0
for f in sec_columns sec_enums sec_functions_def sec_functions_prosrc sec_triggers sec_rls sec_policies sec_constraints sec_indexes sec_grants sec_auth_users_fks; do
  d="$(diff <(sort "$a/$f.txt") <(sort "$b/$f.txt"))"
  if [ -z "$d" ]; then echo "$f: EMPTY ($(wc -l < "$b/$f.txt") lines)"; else echo "$f: DIFFERENCES"; echo "$d" | head -20; rc=1; fi
done
exit $rc

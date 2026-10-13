# N10.5 progress log (local, non-secret)
- 2026-10-13: docs check done (changelog: no Auth/pg_net/cron/Vault change since N10.3B; pg_net docs state net USAGE to PUBLIC, rely on NOLOGIN of anon/authenticated - custom LOGIN roles not covered; Auth docs still say a Storage-owning user cannot be deleted - conflicts with N10.1 hosted observation; auth.users trigger failure blocks the operation - intended for M6).
- repo HEAD=remote=945677ec clean; M1..M6 sha256 bc73c427/99c42be0/c2f34cb3/63348e3a/b6899e9a/9f9acf6f; M1-M3 identical to N10.3B-proven; M4@f3ccd453, M5@5edba8ae identical; 41B.1A hashes unchanged; 53 migrations.
- Project created via the claude.ai Supabase connector (org-level create only): tsoy-n10-5-rehearsal, ref mwlryyionkpjbecnbsiq, WesellProducts, eu-west-2, created 2026-10-13T20:41:10Z, ACTIVE_HEALTHY.
- .n105 guard (denylist prod + 5 retired refs incl toqeefrwnsjuhjmobodg), sealed src-945677ec clean, offline self-test 44/44.
- HOLD: awaiting owner DB password, scoped PAT, LOVABLE_API_KEY (for real e-mail delivery).

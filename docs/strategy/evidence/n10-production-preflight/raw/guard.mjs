// N10 production preflight guard (READ ONLY). Only production is allowed; every retired/disposable ref is denied.
export const ALLOWED_REF = "wogepxfipdipogyogced";
export const ALLOWED_LOVABLE_PROJECT = "0866c7d7-cd21-4987-8c95-85c85872650f";
export const DENYLIST = ["jjrhizafpikmyvfapcic", "mwlryyionkpjbecnbsiq", "toqeefrwnsjuhjmobodg", "gbhwpzofnswlryqjoumw", "czhopceorfqxdbfvlnap", "dlftnirrnirlkhxpofoq", "wwtcnbjhttjtklpxhrkd"];
export function assertTarget(text) {
  const s = String(text ?? "");
  for (const bad of DENYLIST) if (s.includes(bad)) throw new Error(`GUARD: denylisted ref ${bad}`);
  if (!s.includes(ALLOWED_REF) && !s.includes(ALLOWED_LOVABLE_PROJECT)) throw new Error("GUARD: target is not production");
  for (const r of s.match(/\b[a-z]{20}\b/g) ?? []) if (r !== ALLOWED_REF) throw new Error(`GUARD: unexpected ref-shaped token ${r}`);
  return true;
}
// Read-only SQL lint: one statement family only, no write/DDL/session-changing keyword, no secret-bearing columns.
const FORBIDDEN = /\b(insert|update|delete|merge|truncate|drop|alter|create|grant|revoke|comment|copy|call|do|vacuum|analyze|reindex|cluster|refresh|lock|listen|notify|security|set\s+role|set\s+session|reset|discard|prepare|execute|import|pg_read_file|pg_ls_dir|lo_import|dblink|http_post|http_get|net\.|cron\.schedule|cron\.unschedule|decrypted_secret|vault\.create|nextval|setval|pg_terminate|pg_cancel)\b/i;
export function assertReadOnlySql(sql) {
  const body = String(sql).replace(/--[^\n]*/g, "").replace(/'([^']|'')*'/g, "''");
  if (!/^\s*(select|with)\b/i.test(body)) throw new Error("GUARD: SQL must start with SELECT/WITH");
  if (FORBIDDEN.test(body)) throw new Error(`GUARD: forbidden keyword ${body.match(FORBIDDEN)[0]}`);
  if (/;\s*\S/.test(body)) throw new Error("GUARD: single statement only");
  return true;
}
if (process.argv[2] === "--self-test") {
  const t = (f, x, exp) => { let ok; try { ok = f(x); } catch { ok = false; } return ok === exp; };
  const cases = [
    [assertTarget, "https://wogepxfipdipogyogced.supabase.co", true], [assertTarget, "0866c7d7-cd21-4987-8c95-85c85872650f", true],
    [assertTarget, "", false], [assertTarget, "https://example.supabase.co", false], [assertTarget, "wogepxfipdipogyogced abcdefghijklmnopqrst", false],
    ...DENYLIST.flatMap((d) => [[assertTarget, d, false], [assertTarget, `wogepxfipdipogyogced ${d}`, false]]),
    [assertReadOnlySql, "select 1", true], [assertReadOnlySql, "with a as (select 1) select * from a", true],
    [assertReadOnlySql, "select count(*) from public.suppressed_emails", true],
    [assertReadOnlySql, "update public.x set a=1", false], [assertReadOnlySql, "select 1; delete from t", false],
    [assertReadOnlySql, "select decrypted_secret from vault.decrypted_secrets", false], [assertReadOnlySql, "select net.http_post('x')", false],
    [assertReadOnlySql, "select cron.schedule('a','* * * * *','select 1')", false], [assertReadOnlySql, "create table t()", false],
    [assertReadOnlySql, "select 'drop table' as label", true],
  ];
  const ok = cases.filter(([f, x, e]) => t(f, x, e)).length;
  console.log(`preflight guard self-test ${ok}/${cases.length}`); process.exit(ok === cases.length ? 0 : 1);
}

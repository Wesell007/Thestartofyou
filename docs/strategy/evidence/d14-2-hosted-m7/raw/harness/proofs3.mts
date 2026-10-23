// D14.2 P7 rerun for C (run-2 skipped C correctly: its analytics lease from run 1's stray claim was still live until 06:36:11).
import { N10, say, makeDeps, fixtures, snapshot, tokenWindow, writeLog, pg } from "./ctx.mts";
const results: string[] = [];
const check = (id: string, ok: boolean, detail = "") => { const t = `${ok ? "PASS" : "FAIL"} ${id}${detail ? " — " + detail : ""}`; results.push(t); say(t); };
const { deps, sql } = makeDeps();
const C = fixtures().C;
say(`[proofs3] start ${new Date().toISOString()}`);
const pre = await snapshot(C.requestId!);
say(`C before: analytics_lease_until=${pre.rest.analytics_lease_until} next_attempt_at=${pre.rest.next_attempt_at} final_sweep_after=${pre.rest.final_sweep_after}`);
const t0 = Date.now();
const a = await N10.runAnalyticsErasure(deps, async (id) => (id === C.userId ? { ok: true, personsFound: 1 } : { ok: false, failure: "transient" }), Date.now() + 20_000);
say(`P7 runAnalyticsErasure -> ${JSON.stringify(a)}`);
const s = await snapshot(C.requestId!);
const na = Date.parse(s.rest.next_attempt_at);
check("P7 C resolved, persons_found=1, error/attention cleared, next_attempt brought forward from the gate's +15m to ~now (= max(now, final_sweep_after))",
  a.resolved === 1 && a.failed === 0 && s.rest.analytics_status === "resolved" && s.rest.analytics_persons_found === 1 && s.rest.analytics_resolved_at !== null && s.rest.analytics_last_error === null && s.rest.analytics_attention_since === null &&
  Date.parse(pre.rest.next_attempt_at) > Date.now() + 60_000 && na <= Date.now() && na >= t0 - 5000 && s.status === "awaiting_final_sweep" && s.has_user,
  `next_attempt_at ${pre.rest.next_attempt_at} -> ${s.rest.next_attempt_at}`);
const w = await N10.runWorker(deps, { tokenWindow, retentionDays: null });
const s2 = await snapshot(C.requestId!);
check("P7/G next worker tick completes C (completed_at, anonymised_at set, user_id NULL)", s2.status === "completed" && !s2.has_user && s2.rest.completed_at !== null && s2.rest.anonymised_at !== null, `worker=${JSON.stringify(w.results)}`);
say(`SUMMARY ${results.filter((r) => r.startsWith("PASS")).length}/${results.length} PASS`);
writeLog("../raw/09c-proofs-p7-rerun.txt");
await sql.end(); await pg.end();

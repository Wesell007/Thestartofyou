// D14.2 corrective pass for the harness-defective checks of proofs.mts run 1 (raw/09-proofs-p2-p8.txt).
// Re-runs only: P2-A retention, P5 gate ticks (correct comparison), P5 direct-resolved refusal (E), P6 dual lease,
// P7 persons_found=1 (C), P8 persons_found=0 (F).
import { N10, say, makeDeps, fixtures, timeTravel, snapshot, tokenWindow, writeLog, pg } from "./ctx.mts";

const results: string[] = [];
const check = (id: string, ok: boolean, detail = "") => { const t = `${ok ? "PASS" : "FAIL"} ${id}${detail ? " — " + detail : ""}`; results.push(t); say(t); };
const { deps, sql } = makeDeps();
const fx = fixtures();
const F = fx.F, C = fx.C, E = fx.E, A = fx.A;
const eraserFor = (map: Record<string, N10.AnalyticsEraseResult>): N10.AnalyticsEraser => async (id) => map[id] ?? { ok: false, failure: "transient" };
const errOf = async (f: () => Promise<unknown>) => { try { await f(); return "no error"; } catch (e: any) { return `${e.code} ${e.message}`; } };
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
say(`[proofs2] start ${new Date().toISOString()}`);

// P2-A retention: cleanup keys on anonymised_at (run 1 shifted completed_at only).
{
  await timeTravel(A.requestId!, "completed_at = completed_at - interval '31 days', anonymised_at = anonymised_at - interval '31 days'");
  const before = await snapshot(A.requestId!);
  const n = await deps.db.cleanupCompleted(30);
  const left = (await pg.unsafe("select count(*)::int n from private.account_deletion_requests where id = $1", [A.requestId]))[0].n;
  check("P2 A (not_tracked, completed, never analytics-claimed) removed by 30-day retention cleanup", before.rest.analytics_status === "not_tracked" && before.rest.analytics_attempt_count === 0 && n === 1 && left === 0, `removed=${n}`);
}

// P5 direct resolved write while the Auth user still exists (E) -> refused.
{
  const msg = await errOf(() => pg.begin(async (tx) => {
    await tx.unsafe("update private.account_deletion_requests set analytics_status = 'resolved', analytics_resolved_at = now(), analytics_persons_found = 0 where id = $1", [E.requestId]);
    throw Object.assign(new Error("rollback: write was accepted"), { code: "ACCEPTED" });
  }));
  check("P5 direct analytics_status='resolved' while the Auth user exists (E) -> 23514", msg.startsWith("23514"), msg);
}

// P5 gate ticks on F with the correct comparison (pre-tick snapshot).
for (let i = 1; i <= 2; i++) {
  await timeTravel(F.requestId!, "next_attempt_at = now() - interval '1 minute', analytics_next_attempt_at = now() - interval '1 minute'");
  const a = await N10.runAnalyticsErasure(deps, eraserFor({}), Date.now() + 20_000);
  const pre = await snapshot(F.requestId!);
  const t0 = Date.now();
  const w = await N10.runWorker(deps, { tokenWindow, retentionDays: null });
  const post = await snapshot(F.requestId!);
  const nextMin = (Date.parse(post.rest.next_attempt_at) - t0) / 60000;
  check(`P5 F transient analytics failure + worker tick #${i} -> gate holds (awaiting_final_sweep, user kept, not completed, media columns unchanged, no attention <24h)`,
    pre.rest.analytics_last_error === "analytics_transient" && pre.rest.analytics_attention_since === null &&
    post.status === "awaiting_final_sweep" && post.has_user && post.rest.completed_at === null && post.rest.anonymised_at === null &&
    post.rest.objects_removed === pre.rest.objects_removed && post.rest.purge_empty_at === pre.rest.purge_empty_at && post.rest.sweep_objects_removed === pre.rest.sweep_objects_removed && post.media === 0 &&
    nextMin > 14 && nextMin < 16.5,
    `analytics=${JSON.stringify(a)} attempts=${pre.rest.analytics_attempt_count} worker=${JSON.stringify(w.results)} next_attempt≈+${nextMin.toFixed(1)}m`);
}

// P6 media lease + analytics lease on the same row at once (F; window already past).
{
  await timeTravel(F.requestId!, "next_attempt_at = now() - interval '1 minute', analytics_next_attempt_at = now() - interval '1 minute'");
  const ac = await deps.db.analyticsDue(10, 30);
  const mc = await deps.db.claimDue(5, 120);
  const s = await snapshot(F.requestId!);
  check("P6 media lease and analytics lease held on the same row at once", ac.some((x) => x.requestId === F.requestId) && mc.some((x) => x.requestId === F.requestId) && s.rest.lease_until !== null && s.rest.analytics_lease_until !== null,
    `analytics_claimed=${ac.length} media_claimed=${mc.length}`);
  for (const x of mc) await deps.db.releaseLease(x.requestId, x.lease);
  say("P6 media leases released; waiting 32 s for the 30 s analytics leases to expire");
  await sleep(32_000);
}

// P7 (C, persons_found=1) and P8 (F, persons_found=0) through the neutral boundary in one run.
{
  await timeTravel(C.requestId!, "analytics_next_attempt_at = now() - interval '1 minute'");
  await timeTravel(F.requestId!, "analytics_next_attempt_at = now() - interval '1 minute'");
  const t0 = Date.now();
  const a = await N10.runAnalyticsErasure(deps, eraserFor({ [C.userId]: { ok: true, personsFound: 1 }, [F.userId]: { ok: true, personsFound: 0 } }), Date.now() + 20_000);
  say(`P7/P8 runAnalyticsErasure -> ${JSON.stringify(a)}`);
  for (const [label, X, pf] of [["P7", C, 1], ["P8", F, 0]] as const) {
    const s = await snapshot(X.requestId!);
    const na = Date.parse(s.rest.next_attempt_at);
    check(`${label} ${X.label} resolved, persons_found=${pf}, error/attention cleared, next_attempt brought forward to <= max(now, final_sweep_after)`,
      s.rest.analytics_status === "resolved" && s.rest.analytics_persons_found === pf && s.rest.analytics_resolved_at !== null && s.rest.analytics_last_error === null && s.rest.analytics_attention_since === null && s.rest.analytics_lease_until === null && na <= Math.max(Date.now(), Date.parse(s.rest.final_sweep_after)) && na >= t0 - 5000 && s.status === "awaiting_final_sweep" && s.has_user,
      `attempts=${s.rest.analytics_attempt_count} next_attempt_at=${s.rest.next_attempt_at}`);
  }
  const again = await deps.db.analyticsDue(10, 30);
  check("P8 no further analytics claims for C or F", !again.some((x) => x.requestId === C.requestId || x.requestId === F.requestId), `other claims=${again.length}`);
  const w = await N10.runWorker(deps, { tokenWindow, retentionDays: null });
  for (const [label, X] of [["P7/G", C], ["P8", F]] as const) {
    const s = await snapshot(X.requestId!);
    check(`${label} next worker tick completes ${X.label} (completed_at, anonymised_at set, user_id NULL, analytics resolved)`, s.status === "completed" && !s.has_user && s.rest.completed_at !== null && s.rest.anonymised_at !== null && s.rest.analytics_status === "resolved", `worker=${JSON.stringify(w.results)}`);
  }
}

say(`[proofs2] end ${new Date().toISOString()}`);
say(`SUMMARY ${results.filter((r) => r.startsWith("PASS")).length}/${results.length} PASS`);
writeLog("../raw/09b-proofs-corrective.txt");
await sql.end(); await pg.end();

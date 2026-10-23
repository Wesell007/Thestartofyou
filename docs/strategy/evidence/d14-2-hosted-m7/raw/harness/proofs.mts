// D14.2 post-M7 hosted proofs P2, P4 (post), P5, P6, P7, P8 — real sealed module, worker over the pooler.
import postgres from "postgres";
import { N10, say, makeDeps, createUserWithMedia, saveFixture, fixtures, timeTravel, show, snapshot, tokenWindow, writeLog, pg, admin, keys } from "./ctx.mts";
// @ts-ignore
import { workerSql } from "./wdb.mjs";

const results: string[] = [];
const check = (id: string, ok: boolean, detail = "") => { const t = `${ok ? "PASS" : "FAIL"} ${id}${detail ? " — " + detail : ""}`; results.push(t); say(t); };
const { deps, sql } = makeDeps();
const fx = fixtures();
const reqOf = async (userId: string) => (await pg.unsafe("select id from private.account_deletion_requests where user_id = $1 and status not in ('completed','cancelled')", [userId]))[0].id as string;
/** Neutral-boundary analytics eraser (harness test double of the AnalyticsEraser contract; never production source). */
const eraserFor = (map: Record<string, N10.AnalyticsEraseResult>): N10.AnalyticsEraser => async (id) => map[id] ?? { ok: false, failure: "transient" };
const errOf = async (f: () => Promise<unknown>) => { try { await f(); return "no error"; } catch (e: any) { return `${e.code} ${e.message}`; } };
say(`[proofs] start ${new Date().toISOString()}`);

// ---------------- P4 (post-M7): worker login/pooler ----------------
{
  const [id] = await sql.unsafe("select current_user u");
  check("P4 worker current_user over pooler 6543 (prepare:false)", id.u === "account_deletion_worker", id.u);
  check("P4 worker table select refused", (await errOf(() => sql.unsafe("select 1 from private.account_deletion_requests limit 1"))).startsWith("42501"));
  check("P4 worker direct UPDATE refused", (await errOf(() => sql.unsafe("update private.account_deletion_requests set analytics_status = 'resolved'"))).startsWith("42501"));
}

// ---------------- P2: fixtures after M7 ----------------
{
  const due = await deps.db.analyticsDue(10, 120);
  check("P2/P6 nothing analytics-claimable yet (B,C < auth_deleted_at+15m; D requested; E auth_attention; A completed)", due.length === 0, `claimed=${due.length}`);
  const w = await N10.runWorker(deps, { tokenWindow, retentionDays: null });
  say(`P2 runWorker tick -> ${JSON.stringify(w)}`);
  const b = await snapshot(fx.B.requestId!);
  check("P2 B media purged with analytics pending -> awaiting_final_sweep", b.status === "awaiting_final_sweep" && b.media === 0 && b.rest.analytics_status === "pending" && b.has_user, `status=${b.status} media=${b.media} objects_removed=${b.rest.objects_removed} analytics=${b.rest.analytics_status}`);
  const d = await snapshot(fx.D.requestId!);
  check("P2 D processed by the media worker only (requested -> Auth deleted -> purged); analytics still pending", d.status === "awaiting_final_sweep" && d.auth_user === 0 && d.media === 0 && d.rest.analytics_status === "pending" && d.has_user, `status=${d.status}`);
  const e = await snapshot(fx.E.requestId!);
  check("P2 E untouched (auth_attention, Auth user present, media present, analytics pending)", e.status === "auth_attention" && e.auth_user === 1 && e.media === 2 && e.rest.analytics_status === "pending");
  // C: window passed (time-shift), analytics unresolved -> gate
  await timeTravel(fx.C.requestId!, "requested_at = requested_at - interval '2 hours', auth_deleted_at = auth_deleted_at - interval '2 hours', final_sweep_after = final_sweep_after - interval '2 hours', purge_empty_at = purge_empty_at - interval '2 hours', next_attempt_at = now() - interval '1 minute'");
  for (let i = 1; i <= 2; i++) {
    const t0 = Date.now();
    const r = await N10.runWorker(deps, { tokenWindow, retentionDays: null });
    const c = await snapshot(fx.C.requestId!);
    const nextMin = (Date.parse(c.rest.next_attempt_at) - t0) / 60000;
    check(`P2/P5 C final sweep #${i} past window with analytics pending -> gate holds`, c.status === "awaiting_final_sweep" && c.has_user && c.rest.completed_at === null && c.rest.anonymised_at === null && nextMin > 14 && nextMin < 16.5, `results=${JSON.stringify(r.results)} next_attempt≈+${nextMin.toFixed(1)}m`);
    if (i === 1) await timeTravel(fx.C.requestId!, "next_attempt_at = now() - interval '1 minute'");
  }
}

// ---------------- P6: claim / lease / concurrency ----------------
let G = fx.G;
{
  G = await createUserWithMedia("G", 2);
  const rg = await N10.runDeleteAccount(deps, { userId: G.userId, tokenWindowSeconds: tokenWindow.seconds });
  G.requestId = await pg.unsafe("select id from private.account_deletion_requests where user_id = $1", [G.userId]).then((r) => r[0].id);
  saveFixture(G);
  say(`G runDeleteAccount -> ${JSON.stringify(rg)}`);
  const early = await deps.db.analyticsDue(10, 120);
  check("P6 G not claimable immediately after Auth deletion", !early.some((x) => x.requestId === G.requestId), `claimed=${early.length}`);
  for (const x of early) say(`  (unexpected extra claim ${x.requestId})`);
  await timeTravel(G.requestId!, "auth_deleted_at = auth_deleted_at - interval '16 minutes'");
  const sql2 = workerSql();
  const deps2 = makeDeps(sql2).deps;
  const [c1, c2] = await Promise.all([deps.db.analyticsDue(10, 120), deps2.db.analyticsDue(10, 120)]);
  const gotG = [c1, c2].filter((c) => c.some((x) => x.requestId === G.requestId)).length;
  check("P6 two concurrent worker connections: exactly one receives G (SKIP LOCKED + lease)", gotG === 1, `conn1=${c1.length} conn2=${c2.length}`);
  const lease = [...c1, ...c2].find((x) => x.requestId === G.requestId)!.lease;
  await sql2.end();
  // media lease + analytics lease simultaneously
  await timeTravel(G.requestId!, "next_attempt_at = now() - interval '1 minute'");
  const mc = await deps.db.claimDue(5, 120);
  const mg = mc.find((x) => x.requestId === G.requestId);
  const gs = await snapshot(G.requestId!);
  check("P6 media lease and analytics lease held on the same row at once", !!mg && gs.rest.lease_until !== null && gs.rest.analytics_lease_until !== null, `media_claimed=${mc.length}`);
  for (const x of mc) await deps.db.releaseLease(x.requestId, x.lease);
  check("P6 wrong lease -> 55000", (await errOf(() => deps.db.recordAnalytics(G.requestId!, "2000-01-01 00:00:00+00", { resolved: true, personsFound: 0 }))).startsWith("55000"));
  // An Auth user with the same id re-appears (GoTrue admin create with explicit id) -> resolution refused.
  const re = await fetch(`https://${process.env.D142_REF ?? "jjrhizafpikmyvfapcic"}.supabase.co/auth/v1/admin/users`, {
    method: "POST", headers: { Authorization: `Bearer ${keys.service}`, apikey: keys.service, "Content-Type": "application/json" },
    body: JSON.stringify({ id: G.userId, email: `d142-g-reappear-${Date.now()}@example.invalid`, email_confirm: true }),
  });
  const reBody: any = await re.json().catch(() => ({}));
  const sameId = reBody?.id === G.userId;
  say(`P6 GoTrue admin create with the same id: status=${re.status} same_id=${sameId}`);
  const refused = await errOf(() => deps.db.recordAnalytics(G.requestId!, lease, { resolved: true, personsFound: 1 }));
  check("P6 resolution while an Auth user with the same id exists -> 23514", sameId && refused.startsWith("23514"), refused);
  const del = await admin.auth.admin.deleteUser(G.userId, false);
  say(`P6 re-appeared Auth user deleted: error=${del.error ? del.error.status : "none"}`);
  const ok = await deps.db.recordAnalytics(G.requestId!, lease, { resolved: true, personsFound: 1 });
  const g2 = await snapshot(G.requestId!);
  check("P6 valid lease -> resolved", ok === "resolved" && g2.rest.analytics_status === "resolved" && g2.rest.analytics_persons_found === 1, ok);
}

// ---------------- P5: media independence + gate (fresh user F) ----------------
let F = fx.F;
{
  F = await createUserWithMedia("F", 2);
  const rf = await N10.runDeleteAccount(deps, { userId: F.userId, tokenWindowSeconds: tokenWindow.seconds });
  F.requestId = await reqOf(F.userId);
  saveFixture(F);
  const f0 = await snapshot(F.requestId!);
  check("P5 delete-account 200, all media removed immediately, analytics pending", rf.httpStatus === 200 && (rf.body as any).cleanup === "removed" && f0.status === "awaiting_final_sweep" && f0.media === 0 && f0.rest.objects_removed === 2 && f0.rest.analytics_status === "pending", JSON.stringify(rf));
  await timeTravel(F.requestId!, "requested_at = requested_at - interval '2 hours', auth_deleted_at = auth_deleted_at - interval '2 hours', final_sweep_after = final_sweep_after - interval '2 hours', purge_empty_at = purge_empty_at - interval '2 hours', next_attempt_at = now() - interval '1 minute'");
  for (let i = 1; i <= 2; i++) {
    const a = await N10.runAnalyticsErasure(deps, eraserFor({}), Date.now() + 20_000); // every due item: transient
    const fa = await snapshot(F.requestId!);
    say(`P5 analytics transient #${i}: ${JSON.stringify(a)} F analytics=${fa.rest.analytics_status} attempts=${fa.rest.analytics_attempt_count} last_error=${fa.rest.analytics_last_error} attention=${fa.rest.analytics_attention_since}`);
    const w = await N10.runWorker(deps, { tokenWindow, retentionDays: null });
    const fw = await snapshot(F.requestId!);
    check(`P5 F tick #${i} after transient analytics failure -> still awaiting_final_sweep, user kept, not completed, media counters unchanged`,
      fw.status === "awaiting_final_sweep" && fw.has_user && fw.rest.completed_at === null && fw.rest.anonymised_at === null && fw.rest.objects_removed === 2 && fw.rest.purge_empty_at === f0.rest.purge_empty_at && fa.rest.analytics_last_error === "analytics_transient" && fa.rest.analytics_attention_since === null,
      `results=${JSON.stringify(w.results)}`);
    await timeTravel(F.requestId!, "next_attempt_at = now() - interval '1 minute', analytics_next_attempt_at = now() - interval '1 minute'");
  }
  // Direct forbidden writes as the table owner (all rolled back).
  const tryOwner = async (label: string, set: string, disableTriggers = false) => {
    const msg = await errOf(() => pg.begin(async (tx) => {
      if (disableTriggers) await tx.unsafe("alter table private.account_deletion_requests disable trigger user");
      await tx.unsafe(`update private.account_deletion_requests set ${set} where id = $1`, [F.requestId]);
      throw Object.assign(new Error("rollback: write was accepted"), { code: "ACCEPTED" });
    }));
    check(`P5 ${label} -> 23514`, msg.startsWith("23514"), msg);
  };
  await tryOwner("direct completion (triggers on: M7 guard)", "status = 'completed', completed_at = now(), user_id = null, anonymised_at = now()");
  await tryOwner("direct completion with user triggers disabled (CHECK layer)", "status = 'completed', completed_at = now(), user_id = null, anonymised_at = now()", true);
  await tryOwner("direct anonymisation without completion", "user_id = null, anonymised_at = now()");
  await tryOwner("direct analytics_status = 'not_tracked'", "analytics_status = 'not_tracked'");
  await tryOwner("direct analytics_status = 'resolved' (bypassing the function)", "analytics_status = 'resolved', analytics_resolved_at = now(), analytics_persons_found = 0");
  const fz = await snapshot(F.requestId!);
  check("P5 F unchanged by the refused writes", fz.status === "awaiting_final_sweep" && fz.has_user && fz.rest.analytics_status === "pending");
}

// ---------------- P7: persons_found = 1 (C) via the neutral boundary ----------------
{
  const C = fx.C;
  const t0 = Date.now();
  await timeTravel(C.requestId!, "analytics_next_attempt_at = null");
  const a = await N10.runAnalyticsErasure(deps, eraserFor({ [C.userId]: { ok: true, personsFound: 1 } }), Date.now() + 20_000);
  const c = await snapshot(C.requestId!);
  say(`P7 runAnalyticsErasure -> ${JSON.stringify(a)}`);
  check("P7 C resolved, persons_found=1, error/attention cleared, next_attempt brought forward to <= max(now, final_sweep_after)",
    c.rest.analytics_status === "resolved" && c.rest.analytics_persons_found === 1 && c.rest.analytics_resolved_at !== null && c.rest.analytics_last_error === null && c.rest.analytics_attention_since === null && Date.parse(c.rest.next_attempt_at) <= Math.max(Date.now(), Date.parse(c.rest.final_sweep_after)) && Date.parse(c.rest.next_attempt_at) >= t0 - 5000,
    `next_attempt_at=${c.rest.next_attempt_at}`);
  const w = await N10.runWorker(deps, { tokenWindow, retentionDays: null });
  const c2 = await snapshot(C.requestId!);
  check("P7/G next worker tick completes C (completed_at, anonymised_at set, user_id NULL)", c2.status === "completed" && !c2.has_user && c2.rest.completed_at !== null && c2.rest.anonymised_at !== null, `results=${JSON.stringify(w.results)}`);
}

// ---------------- P8: persons_found = 0 (F) ----------------
{
  const a = await N10.runAnalyticsErasure(deps, eraserFor({ [F.userId]: { ok: true, personsFound: 0 } }), Date.now() + 20_000);
  const f = await snapshot(F.requestId!);
  say(`P8 runAnalyticsErasure -> ${JSON.stringify(a)}`);
  check("P8 F resolved with persons_found=0", f.rest.analytics_status === "resolved" && f.rest.analytics_persons_found === 0 && f.rest.analytics_attempt_count === 3);
  const again = await deps.db.analyticsDue(10, 120);
  check("P8 no further analytics claim for F", !again.some((x) => x.requestId === F.requestId), `claimed=${again.length}`);
  for (const x of again) say(`  (other claim ${x.requestId}; lease left to expire)`);
  const w = await N10.runWorker(deps, { tokenWindow, retentionDays: null });
  const f2 = await snapshot(F.requestId!);
  check("P8 completion follows (completed, user_id NULL)", f2.status === "completed" && !f2.has_user, `results=${JSON.stringify(w.results)}`);
}

// ---------------- P2 (A): retention cleanup still deletes a not_tracked completed row ----------------
{
  await timeTravel(fx.A.requestId!, "completed_at = completed_at - interval '31 days'");
  const n = await deps.db.cleanupCompleted(30);
  const left = (await pg.unsafe("select count(*)::int n from private.account_deletion_requests where id = $1", [fx.A.requestId]))[0].n;
  check("P2 A (not_tracked, completed) never claimed and still removed by 30-day retention cleanup", n === 1 && left === 0, `removed=${n}`);
}

say(`[proofs] end ${new Date().toISOString()}`);
say(`SUMMARY ${results.filter((r) => r.startsWith("PASS")).length}/${results.length} PASS`);
writeLog("../raw/09-proofs-p2-p8.txt");
await sql.end(); await pg.end();

// D14.2 P9: the deployed real account-deletion-worker with NO POSTHOG_* secret -> analytics_config, attention at once.
import { N10, say, makeDeps, createUserWithMedia, saveFixture, fixtures, timeTravel, snapshot, tokenWindow, writeLog, pg, admin, REF } from "./ctx.mts";
// @ts-ignore
import { mgmt, secret, projectUrl } from "./lib.mjs";

const results: string[] = [];
const check = (id: string, ok: boolean, detail = "") => { const t = `${ok ? "PASS" : "FAIL"} ${id}${detail ? " — " + detail : ""}`; results.push(t); say(t); };
const { deps, sql } = makeDeps();
say(`[p9] start ${new Date().toISOString()}`);

const fn = await mgmt("/functions/account-deletion-worker");
say(`deployed function: status=${fn.json?.status} version=${fn.json?.version} verify_jwt=${fn.json?.verify_jwt}`);
const sec = await mgmt("/secrets");
const names: string[] = (sec.json ?? []).map((s: any) => s.name);
check("P9 no POSTHOG_* secret exists on the project", names.filter((n) => n.startsWith("POSTHOG")).length === 0, `secret names=${names.length}`);

// H: analytics due (Auth deleted 16 min ago, by time-shift).
const H = await createUserWithMedia("H", 2);
const rh = await N10.runDeleteAccount(deps, { userId: H.userId, tokenWindowSeconds: tokenWindow.seconds });
H.requestId = (await pg.unsafe("select id from private.account_deletion_requests where user_id = $1", [H.userId]))[0].id;
saveFixture(H);
say(`H runDeleteAccount -> ${JSON.stringify(rh)}`);
await timeTravel(H.requestId!, "auth_deleted_at = auth_deleted_at - interval '16 minutes'");

// I: purge_attention via a real owner-id/path anomaly (supported Storage API move keeps owner_id), as in N10.5.
const I = await createUserWithMedia("I", 2);
const mv = await admin.storage.from("weekly-photos").move(`${I.userId}/d142-0.png`, `misfiled/d142-${Date.now()}.png`);
say(`I Storage move canonical -> misfiled: error=${mv.error ? mv.error.message : "none"}`);
const ri = await N10.runDeleteAccount(deps, { userId: I.userId, tokenWindowSeconds: tokenWindow.seconds });
I.requestId = (await pg.unsafe("select id from private.account_deletion_requests where user_id = $1", [I.userId]))[0].id;
saveFixture(I);
const i0 = await snapshot(I.requestId!);
say(`I runDeleteAccount -> ${JSON.stringify(ri)}; status=${i0.status} last_error=${i0.rest.last_error_class} anomaly=${i0.rest.anomaly_count}`);
await timeTravel(I.requestId!, "auth_deleted_at = auth_deleted_at - interval '16 minutes'");

const before: Record<string, any> = {};
for (const l of ["B", "D", "H", "I"]) before[l] = await snapshot(fixtures()[l].requestId!);

// Negative: no token -> 401; then the real invocation.
const url = `${projectUrl}/functions/v1/account-deletion-worker`;
const neg = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" });
say(`invoke without token -> ${neg.status} ${await neg.text()}`);
const t0 = new Date();
const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json", "x-n10-worker-token": secret("d142.invoke") }, body: "{}" });
const body = await res.text();
const t1 = new Date();
say(`invoke ${t0.toISOString()} -> ${res.status} ${body} (${t1.getTime() - t0.getTime()} ms)`);
check("P9 hosted worker returns {\"ok\":true}", res.status === 200 && body.replace(/\s/g, "") === '{"ok":true}', `${res.status} ${body}`);

for (const l of ["H", "I", "B", "D"]) {
  const s = await snapshot(fixtures()[l].requestId!);
  const b = before[l];
  const due = Date.parse(b.rest.auth_deleted_at) + 15 * 60_000 <= t0.getTime();
  if (!due) { say(`P9 ${l} not yet analytics-due at invocation (auth_deleted_at+15m > now): analytics_attempt_count=${s.rest.analytics_attempt_count}`); continue; }
  const nextMin = (Date.parse(s.rest.analytics_next_attempt_at) - t0.getTime()) / 60000;
  check(`P9 ${l}: analytics_config recorded, attention set on first attempt, next ≈ +60m, status/media/user unchanged, not completed`,
    s.rest.analytics_last_error === "analytics_config" && s.rest.analytics_attention_since !== null && s.rest.analytics_attempt_count === b.rest.analytics_attempt_count + 1 &&
    nextMin > 59 && nextMin < 61.5 && s.rest.analytics_status === "pending" && s.status === b.status && s.has_user && s.rest.completed_at === null &&
    s.rest.objects_removed === b.rest.objects_removed && s.media === b.media,
    `status=${s.status} attempts=${s.rest.analytics_attempt_count} next≈+${nextMin.toFixed(1)}m`);
}
say(`[p9] invocation window ${t0.toISOString()} .. ${t1.toISOString()}`);
say(`SUMMARY ${results.filter((r) => r.startsWith("PASS")).length}/${results.length} PASS`);
writeLog("../raw/10-p9-hosted-worker.txt");
await sql.end(); await pg.end();

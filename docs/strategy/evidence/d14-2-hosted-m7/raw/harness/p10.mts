// D14.2 P10: M4 alert ledger with the M7 analytics key, as the real worker role over the pooler.
// Provider outcome is SIMULATED by the recorded outcome (delivered=true/false); no e-mail is sent or claimed.
import { say, makeDeps, fixtures, timeTravel, snapshot, writeLog, pg } from "./ctx.mts";
// @ts-ignore
import { workerSql } from "./wdb.mjs";

const results: string[] = [];
const check = (id: string, ok: boolean, detail = "") => { const t = `${ok ? "PASS" : "FAIL"} ${id}${detail ? " — " + detail : ""}`; results.push(t); say(t); };
const { deps, sql } = makeDeps();
const fx = fixtures();
const H = fx.H.requestId!, I = fx.I.requestId!, E = fx.E.requestId!;
const LEASE = 30;
const deletionCols = (s: any) => JSON.stringify({ status: s.status, has_user: s.has_user, media: s.media, ...Object.fromEntries(Object.entries(s.rest).filter(([k]) => !k.startsWith("alert_") && k !== "updated_at")) });
say(`[p10] start ${new Date().toISOString()}`);

const h0 = await snapshot(H);
check("P10 hosted worker left the ledger untouched (nothing falsely recorded as sent)", h0.rest.alert_key === null && h0.rest.alert_sent_at === null && h0.rest.alert_failure_count === 0, JSON.stringify({ k: h0.rest.alert_key, f: h0.rest.alert_failure_count }));
const pc0 = await deps.db.alertsPendingCount();
say(`pending count before = ${pc0}`);

// 1. first claim
const c1 = await deps.db.alertsDue(10, LEASE);
const byId = Object.fromEntries(c1.map((a) => [a.requestId, a]));
say(`claim 1: ${JSON.stringify(c1.map((a) => ({ id: a.requestId, kind: a.kind, key: a.alertKey, status: a.status, cls: a.errorClass, attempts: a.attemptCount })))}`);
check("P10 H returned once: kind attention, key analytics_attention:analytics_config, status = its media status", byId[H]?.kind === "attention" && byId[H]?.alertKey === "analytics_attention:analytics_config" && byId[H]?.status === "awaiting_final_sweep" && byId[H]?.errorClass === "analytics_config");
const iSnap = await snapshot(I);
check("P10 I (purge_attention with analytics attention also set) keeps purge_attention:<class> key", byId[I]?.alertKey === "purge_attention:owner_id_path_anomaly" && iSnap.rest.analytics_attention_since !== null);
check("P10 E keeps auth_attention:auth_permanent", byId[E]?.alertKey === "auth_attention:auth_permanent");
check("P10 claim 1 contains exactly E, H, I", c1.length === 3 && !!byId[H] && !!byId[I] && !!byId[E], `n=${c1.length}`);

// 2. concurrent second claim during the lease -> nothing
const sql2 = workerSql();
const d2 = makeDeps(sql2).deps;
const c2 = await d2.db.alertsDue(10, LEASE);
check("P10 second claim during the lease returns nothing", c2.length === 0, `n=${c2.length}`);

// 3. delivered=false -> failure 1, backoff ~+5m, no key
const t0 = Date.now();
const okF = await deps.db.recordAlert(H, byId[H].lease, "attention", byId[H].alertKey, false);
const h1 = await snapshot(H);
const back = (Date.parse(h1.rest.alert_next_attempt_at) - t0) / 60000;
check("P10 record(delivered=false) -> failure count 1, next ≈ +5m, no key, no sent_at", okF && h1.rest.alert_failure_count === 1 && h1.rest.alert_key === null && h1.rest.alert_sent_at === null && back > 4.5 && back < 5.5, `+${back.toFixed(2)}m`);
const c3 = await d2.db.alertsDue(10, LEASE);
check("P10 not claimable before the backoff", !c3.some((a) => a.requestId === H), `n=${c3.length}`);
await timeTravel(H, "alert_next_attempt_at = now() - interval '1 minute'");
const c4 = await deps.db.alertsDue(10, LEASE);
const a4 = c4.find((a) => a.requestId === H);
check("P10 claimable after the backoff (attention again)", a4?.kind === "attention" && a4?.alertKey === "analytics_attention:analytics_config");

// 4. delivered=true (ledger only) -> key + sent_at, failures reset; then dedup
const okT = await deps.db.recordAlert(H, a4!.lease, "attention", a4!.alertKey, true);
const h2 = await snapshot(H);
check("P10 record(delivered=true) -> key + sent_at, failures reset", okT && h2.rest.alert_key === "analytics_attention:analytics_config" && h2.rest.alert_sent_at !== null && h2.rest.alert_failure_count === 0 && h2.rest.alert_next_attempt_at === null);
let dup = 0;
for (let i = 0; i < 3; i++) dup += (await deps.db.alertsDue(10, LEASE)).filter((a) => a.requestId === H).length;
check("P10 three further claims return nothing for H (dedup)", dup === 0);
const pcH = (await pg.unsafe(`select count(*)::int n from private.account_deletion_requests r where r.id = $1 and r.alert_key is distinct from 'analytics_attention:' || coalesce(r.analytics_last_error, '-')`, [H]))[0].n;
const pc1 = await deps.db.alertsPendingCount();
check("P10 pending count drops by exactly H (E and I remain pending)", pc1 === pc0 - 1 && pcH === 0, `${pc0} -> ${pc1}`);

// 5. escalation after 24 h
await timeTravel(H, "alert_sent_at = alert_sent_at - interval '25 hours'");
const c5 = await deps.db.alertsDue(10, LEASE);
const esc = c5.filter((a) => a.requestId === H);
check("P10 sent_at shifted 25 h -> exactly one escalation", esc.length === 1 && esc[0].kind === "escalation" && esc[0].alertKey === "analytics_attention:analytics_config");
const okE = await deps.db.recordAlert(H, esc[0].lease, "escalation", esc[0].alertKey, true);
let after = 0;
for (let i = 0; i < 2; i++) after += (await deps.db.alertsDue(10, LEASE)).filter((a) => a.requestId === H).length;
const h3 = await snapshot(H);
check("P10 after the recorded escalation: silence", okE && after === 0 && h3.rest.alert_escalated_at !== null);
check("P10 deletion/analytics columns of H untouched by the ledger throughout", deletionCols(h0) === deletionCols(h3));
const [w] = await sql.unsafe("select current_user u");
check("P10 ran as the worker role", w.u === "account_deletion_worker");

await sql2.end();
say(`SUMMARY ${results.filter((r) => r.startsWith("PASS")).length}/${results.length} PASS`);
writeLog("../raw/12-p10-alert-ledger.txt");
await sql.end(); await pg.end();

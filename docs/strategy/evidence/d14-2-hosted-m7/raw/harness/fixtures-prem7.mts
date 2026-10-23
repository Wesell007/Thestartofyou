// Pre-M7 fixtures A–E through the real M1 surface (worker over the pooler) + real GoTrue/Storage.
import { N10, say, makeDeps, createUserWithMedia, saveFixture, timeTravel, show, tokenWindow, writeLog, pg } from "./ctx.mts";
const { deps, sql } = makeDeps();
const done = (await pg.unsafe("select count(*)::int n from private.account_deletion_requests"))[0].n;
if (done !== 0) throw new Error(`refusing: ${done} request rows already exist`);
say(`[pre-M7 fixtures] start ${new Date().toISOString()}`);

// A: completed (anonymised). Real delete-account flow, then the documented time-shift past the window, then a real worker tick.
const A = await createUserWithMedia("A", 2);
const ra = await N10.runDeleteAccount(deps, { userId: A.userId, tokenWindowSeconds: tokenWindow.seconds });
say(`A runDeleteAccount -> ${JSON.stringify(ra)}`);
const aReq = (await pg.unsafe("select id from private.account_deletion_requests where user_id = $1", [A.userId]))[0].id;
saveFixture({ ...A, requestId: aReq });
await show("A after delete-account", aReq);
await timeTravel(aReq, "requested_at = requested_at - interval '2 hours', auth_deleted_at = auth_deleted_at - interval '2 hours', final_sweep_after = final_sweep_after - interval '2 hours', purge_empty_at = purge_empty_at - interval '2 hours', next_attempt_at = now() - interval '1 minute'");
const wa = await N10.runWorker(deps, { tokenWindow, retentionDays: null });
say(`A runWorker -> ${JSON.stringify(wa)}`);
await show("A final", aReq);

// B: auth_deleted with media still present (Auth deleted + confirmed; first purge pass ran out of budget).
const B = await createUserWithMedia("B", 3);
const ob = await deps.db.openRequest(B.userId, N10.REQUEST_LEASE_SECONDS);
const authB = await N10.deleteAuthAndConfirm(deps, B.userId);
say(`B open=${ob.status} leaseAcquired=${ob.leaseAcquired} auth=${JSON.stringify(authB)}`);
say(`B confirmAuthDeleted -> ${await deps.db.confirmAuthDeleted(ob.requestId, ob.lease!, tokenWindow.seconds)}`);
say(`B purgeAndRecord(deadline=now, budget exhausted) -> ${await N10.purgeAndRecord(deps, { requestId: ob.requestId, userId: B.userId, lease: ob.lease!, status: "auth_deleted" }, Date.now())}`);
saveFixture({ ...B, requestId: ob.requestId });
await show("B final", ob.requestId);

// C: awaiting_final_sweep (real delete-account; window not reached).
const C = await createUserWithMedia("C", 2);
const rc = await N10.runDeleteAccount(deps, { userId: C.userId, tokenWindowSeconds: tokenWindow.seconds });
say(`C runDeleteAccount -> ${JSON.stringify(rc)}`);
const cReq = (await pg.unsafe("select id from private.account_deletion_requests where user_id = $1", [C.userId]))[0].id;
saveFixture({ ...C, requestId: cReq });
await show("C final", cReq);

// D: requested (freeze committed; Auth user still exists; lease released).
const Dx = await createUserWithMedia("D", 2);
const od = await deps.db.openRequest(Dx.userId, N10.REQUEST_LEASE_SECONDS);
say(`D open=${od.status} leaseAcquired=${od.leaseAcquired} release=${await deps.db.releaseLease(od.requestId, od.lease!)}`);
saveFixture({ ...Dx, requestId: od.requestId });
await show("D final", od.requestId);

// E: auth_attention (auth_permanent). INJECTED at the Auth adapter boundary only: GoTrue is not called and
// returns nothing; the database still confirms the Auth user exists and applies the transition.
const E = await createUserWithMedia("E", 2);
const injected = makeDeps(sql, { auth: { deleteUser: async () => ({ error: { status: 400, name: "AuthApiError", message: "d142 injected permanent failure" } }) } }).deps;
const re = await N10.runDeleteAccount(injected, { userId: E.userId, tokenWindowSeconds: tokenWindow.seconds });
say(`E runDeleteAccount (injected permanent Auth failure) -> ${JSON.stringify(re)}`);
const eReq = (await pg.unsafe("select id from private.account_deletion_requests where user_id = $1", [E.userId]))[0].id;
saveFixture({ ...E, requestId: eReq });
await show("E final", eReq);

say(`[pre-M7 fixtures] end ${new Date().toISOString()}`);
writeLog("../raw/05-fixtures-pre-m7.txt");
await sql.end(); await pg.end();

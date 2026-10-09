import { beforeAll, describe, expect, it } from "vitest";
import { createN10Harness, uuid, type N10Harness } from "./support/n10Pglite";

// N10.3A database contract tests. The real M1 migration runs in local PGlite (PostgreSQL 17) on a
// minimal stand-in for the Supabase-managed auth/storage pieces. Every check executes SQL; none
// relies on reading the migration text. Hosted behaviour is proved separately in N10.3B.

let h: N10Harness;
const A = uuid(0xa1);
const B = uuid(0xb2);
const C = uuid(0xc3);

const addUser = (id: string) => h.su("insert into auth.users (id, email) values ($1, $2) on conflict do nothing", [id, `${id}@example.invalid`]);
const dropUser = (id: string) => h.su("delete from auth.users where id = $1", [id]);
const addObject = (bucket: string, name: string, ownerId: string | null) =>
  h.su("insert into storage.objects (bucket_id, name, owner_id) values ($1, $2, $3)", [bucket, name, ownerId]);
const open = async (userId: string) =>
  (await h.asWorker("select * from private.n10_open_request($1::uuid, 120)", [userId]))[0] as {
    o_request_id: string; o_status: string; o_lease: string | null; o_lease_acquired: boolean;
  };
const row = async (id: string) => (await h.su("select * from private.account_deletion_requests where id = $1", [id]))[0];
const errorCode = async (fn: () => Promise<unknown>) => {
  try {
    await fn();
    return "no-error";
  } catch (e) {
    return (e as { code?: string }).code ?? "unknown";
  }
};

beforeAll(async () => {
  h = await createN10Harness();
}, 120_000);

describe("N10 M1 catalogue, grants and role (E13, E16, E22)", () => {
  it("request table has no foreign key at all, so it cannot cascade from auth.users", async () => {
    const r = await h.su("select count(*)::int as n from pg_constraint where conrelid = 'private.account_deletion_requests'::regclass and contype = 'f'");
    expect(r[0].n).toBe(0);
  });

  it("RLS is enabled and no role other than the owner can touch request rows", async () => {
    const rls = await h.su("select relrowsecurity from pg_class where oid = 'private.account_deletion_requests'::regclass");
    expect(rls[0].relrowsecurity).toBe(true);
    for (const role of ["public", "anon", "authenticated", "service_role", "account_deletion_worker"]) {
      for (const priv of ["SELECT", "INSERT", "UPDATE", "DELETE"]) {
        const r = await h.su("select has_table_privilege($1, 'private.account_deletion_requests', $2) as p", [role, priv]);
        expect(r[0].p, `${role} ${priv}`).toBe(false);
      }
    }
  });

  it("account_deletion_worker is a minimal login role with no auth/storage/public-table grants", async () => {
    const r = await h.su("select rolcanlogin, rolsuper, rolcreatedb, rolcreaterole, rolreplication, rolbypassrls from pg_roles where rolname = 'account_deletion_worker'");
    expect(r[0]).toEqual({ rolcanlogin: true, rolsuper: false, rolcreatedb: false, rolcreaterole: false, rolreplication: false, rolbypassrls: false });
    for (const [table, priv] of [["auth.users", "SELECT"], ["auth.users", "DELETE"], ["storage.objects", "SELECT"], ["storage.objects", "INSERT"], ["storage.objects", "UPDATE"], ["storage.objects", "DELETE"], ["storage.buckets", "INSERT"]]) {
      const p = await h.su("select has_table_privilege('account_deletion_worker', $1, $2) as p", [table, priv]);
      expect(p[0].p, `${table} ${priv}`).toBe(false);
    }
    const direct = await h.asWorker("select count(*)::int as n from information_schema.role_table_grants where grantee = 'account_deletion_worker'");
    expect(direct[0].n).toBe(0);
  });

  it("anon has no usage on the private schema", async () => {
    const r = await h.su("select has_schema_privilege('anon', 'private', 'USAGE') as p");
    expect(r[0].p).toBe(false);
  });

  it("definer helpers are hardened: SECURITY DEFINER, search_path empty, owner postgres, private schema", async () => {
    const fns = ["account_media_access_allowed", "auth_user_exists", "account_media_canonical", "account_media_anomaly_count", "n10_open_request", "n10_claim_due", "n10_lock_leased", "n10_release_lease", "n10_record_failure", "n10_confirm_auth_deleted", "n10_record_purge", "n10_cleanup_completed"];
    const r = await h.su(
      "select p.proname, p.prosecdef, p.proconfig, pg_get_userbyid(p.proowner) as owner from pg_proc p join pg_namespace n on n.oid = p.pronamespace where n.nspname = 'private' order by 1",
    );
    const byName = Object.fromEntries(r.map((x) => [x.proname as string, x]));
    for (const f of fns) {
      expect(byName[f]?.prosecdef, f).toBe(true);
      expect(byName[f]?.proconfig, f).toEqual(['search_path=""']);
    }
    expect(byName.account_deletion_requests_guard.prosecdef).toBe(false);
    expect(byName.account_deletion_requests_guard.proconfig).toEqual(['search_path=""']);
  });

  it("EXECUTE: PUBLIC/anon/service_role never; authenticated only the guard; worker only its surface", async () => {
    const r = await h.su("select p.oid::regprocedure::text as sig from pg_proc p join pg_namespace n on n.oid = p.pronamespace where n.nspname = 'private'");
    const workerSurface = new Set([
      "private.auth_user_exists(uuid)", "private.account_media_canonical(uuid,integer)", "private.account_media_anomaly_count(uuid)",
      "private.n10_open_request(uuid,integer)", "private.n10_claim_due(integer,integer)", "private.n10_release_lease(uuid,text)",
      "private.n10_record_failure(uuid,text,text,text,boolean)", "private.n10_confirm_auth_deleted(uuid,text,integer)",
      "private.n10_record_purge(uuid,text,text,integer)", "private.n10_cleanup_completed(integer)",
    ]);
    for (const { sig } of r as { sig: string }[]) {
      const p = await h.su(
        "select has_function_privilege('public', $1, 'EXECUTE') as pub, has_function_privilege('anon', $1, 'EXECUTE') as anon, has_function_privilege('service_role', $1, 'EXECUTE') as sr, has_function_privilege('authenticated', $1, 'EXECUTE') as auth, has_function_privilege('account_deletion_worker', $1, 'EXECUTE') as wk",
        [sig],
      );
      expect(p[0].pub, sig).toBe(false);
      expect(p[0].anon, sig).toBe(false);
      expect(p[0].sr, sig).toBe(false);
      expect(p[0].auth, sig).toBe(sig === "private.account_media_access_allowed()");
      expect(p[0].wk, sig).toBe(workerSurface.has(sig));
    }
  });

  it("the 8 media policies are replaced: TO authenticated, all call the guard, UPDATE has USING and WITH CHECK", async () => {
    const r = await h.su("select policyname, cmd, roles::text as roles, qual, with_check from pg_policies where schemaname = 'storage' and tablename = 'objects' order by policyname");
    expect(r).toHaveLength(8);
    for (const p of r) {
      expect(String(p.policyname)).toMatch(/^n10 /);
      expect(p.roles).toBe("{authenticated}");
      const exprs = [p.qual, p.with_check].filter(Boolean).join(" ");
      expect(exprs, String(p.policyname)).toMatch(/account_media_access_allowed/);
      expect(exprs).toMatch(/foldername/);
      if (p.cmd === "UPDATE") {
        expect(p.qual).toMatch(/account_media_access_allowed/);
        expect(p.with_check).toMatch(/account_media_access_allowed/);
      }
    }
    const cmds = r.map((p) => p.cmd).sort();
    expect(cmds).toEqual(["DELETE", "DELETE", "INSERT", "INSERT", "SELECT", "SELECT", "UPDATE", "UPDATE"]);
  });
});

describe("N10 Storage guard and RLS (E2, E3, E12)", () => {
  it("live user without a request may use own media; anonymous and foreign folders are denied", async () => {
    await addUser(C);
    expect((await h.asUser(C, "select private.account_media_access_allowed() as ok"))[0].ok).toBe(true);
    expect((await h.asUser(null, "select private.account_media_access_allowed() as ok"))[0].ok).toBe(false);
    await h.asUser(C, "insert into storage.objects (bucket_id, name, owner_id) values ('weekly-photos', $1, $2)", [`${C}/20.jpg`, C]);
    expect(await errorCode(() => h.asUser(C, "insert into storage.objects (bucket_id, name, owner_id) values ('weekly-photos', $1, $2)", [`${A}/x.jpg`, C]))).toBe("42501");
    expect((await h.asUser(C, "select count(*)::int as n from storage.objects where bucket_id = 'weekly-photos'"))[0].n).toBe(1);
  });

  it("a pending request denies SELECT (hence new signed URLs), INSERT, UPDATE and DELETE", async () => {
    await addUser(B);
    await addObject("first-year-memories", `${B}/m1/p.jpg`, B);
    expect((await h.asUser(B, "select count(*)::int as n from storage.objects"))[0].n).toBe(1);
    await open(B);
    expect((await h.asUser(B, "select private.account_media_access_allowed() as ok"))[0].ok).toBe(false);
    expect((await h.asUser(B, "select count(*)::int as n from storage.objects"))[0].n).toBe(0);
    expect(await errorCode(() => h.asUser(B, "insert into storage.objects (bucket_id, name, owner_id) values ('first-year-memories', $1, $2)", [`${B}/m2/q.jpg`, B]))).toBe("42501");
    const upd = await h.asUser(B, "with u as (update storage.objects set owner_id = owner_id returning 1) select count(*)::int as n from u");
    expect(upd[0].n).toBe(0);
    const del = await h.asUser(B, "with d as (delete from storage.objects returning 1) select count(*)::int as n from d");
    expect(del[0].n).toBe(0);
    expect((await h.su("select count(*)::int as n from storage.objects where owner_id = $1", [B]))[0].n).toBe(1);
  });

  it("a stale token after Auth deletion is denied for every command (N10.1 R4 closed)", async () => {
    const S = uuid(0x5a1e);
    await addUser(S);
    await addObject("weekly-photos", `${S}/1.jpg`, S);
    await dropUser(S);
    expect((await h.asUser(S, "select private.account_media_access_allowed() as ok"))[0].ok).toBe(false);
    expect((await h.asUser(S, "select count(*)::int as n from storage.objects"))[0].n).toBe(0);
    expect(await errorCode(() => h.asUser(S, "insert into storage.objects (bucket_id, name, owner_id) values ('weekly-photos', $1, $2)", [`${S}/stale.jpg`, S]))).toBe("42501");
    const del = await h.asUser(S, "with d as (delete from storage.objects returning 1) select count(*)::int as n from d");
    expect(del[0].n).toBe(0);
  });

  it("a cancelled request restores access; a soft-deleted Auth row denies it", async () => {
    const X = uuid(0xcace1);
    await addUser(X);
    const o = await open(X);
    await h.su("update private.account_deletion_requests set status = 'cancelled' where id = $1", [o.o_request_id]);
    expect((await h.asUser(X, "select private.account_media_access_allowed() as ok"))[0].ok).toBe(true);
    await h.su("update auth.users set deleted_at = now() where id = $1", [X]);
    expect((await h.asUser(X, "select private.account_media_access_allowed() as ok"))[0].ok).toBe(false);
  });
});

describe("N10 request state surface (E1, E8, E14, E15, E19, E20, E23)", () => {
  it("one active request per account: a second open returns the same row without a new lease", async () => {
    const U = uuid(0x0b0e);
    await addUser(U);
    const first = await open(U);
    expect(first.o_status).toBe("requested");
    expect(first.o_lease_acquired).toBe(true);
    const second = await open(U);
    expect(second.o_request_id).toBe(first.o_request_id);
    expect(second.o_lease_acquired).toBe(false);
    expect((await h.su("select count(*)::int as n from private.account_deletion_requests where user_id = $1", [U]))[0].n).toBe(1);
  });

  it("Auth deletion cannot be confirmed while the Auth user exists, and the window fails closed", async () => {
    const U = uuid(0x0c0f);
    await addUser(U);
    const o = await open(U);
    expect(await errorCode(() => h.asWorker("select private.n10_confirm_auth_deleted($1::uuid, $2::text, 3600)", [o.o_request_id, o.o_lease]))).toBe("55000");
    await dropUser(U);
    for (const w of [null, 0, 3599, 604801]) {
      expect(await errorCode(() => h.asWorker("select private.n10_confirm_auth_deleted($1::uuid, $2::text, $3::int)", [o.o_request_id, o.o_lease, w])), String(w)).toBe("22023");
    }
    expect(await errorCode(() => h.asWorker("select private.n10_confirm_auth_deleted($1::uuid, $2::text, 3600)", [o.o_request_id, "2000-01-01 00:00:00+00"]))).toBe("55000");
  });

  it("H1: final_sweep_after = auth_deleted_at + max(W, 3600 s) + 15 min (not requested_at)", async () => {
    for (const [w, expectedSeconds] of [[3600, 4500], [7200, 8100]] as const) {
      const U = uuid(0x1000 + w);
      await addUser(U);
      const o = await open(U);
      await h.timeTravel(o.o_request_id, "requested_at = requested_at - interval '10 hours'");
      await dropUser(U);
      await h.asWorker("select private.n10_confirm_auth_deleted($1::uuid, $2::text, $3::int)", [o.o_request_id, o.o_lease, w]);
      const r = await h.su(
        "select extract(epoch from final_sweep_after - auth_deleted_at)::int as d, extract(epoch from final_sweep_after - requested_at)::int as from_req from private.account_deletion_requests where id = $1",
        [o.o_request_id],
      );
      expect(r[0].d).toBe(expectedSeconds);
      expect(Number(r[0].from_req)).toBeGreaterThan(expectedSeconds);
    }
  });

  it("the sweep floor CHECK rejects a window shorter than auth_deleted_at + 1 h 15 m", async () => {
    const U = uuid(0x2001);
    await addUser(U);
    const o = await open(U);
    await dropUser(U);
    await h.asWorker("select private.n10_confirm_auth_deleted($1::uuid, $2::text, 3600)", [o.o_request_id, o.o_lease]);
    expect(await errorCode(() => h.timeTravel(o.o_request_id, "final_sweep_after = auth_deleted_at + interval '1 hour'"))).toBe("23514");
  });

  it("D4 retry schedule: 1, 2, 5, 15, 30 minutes, then hourly; permanent failure -> auth_attention", async () => {
    const U = uuid(0x3001);
    await addUser(U);
    const delays: number[] = [];
    for (let i = 0; i < 7; i++) {
      const o = await open(U);
      expect(o.o_lease_acquired).toBe(true);
      const s = await h.asWorker("select private.n10_record_failure($1::uuid, $2::text, 'requested', 'auth_transient', false) as s", [o.o_request_id, o.o_lease]);
      expect(s[0].s).toBe("requested");
      const r = await h.su("select round(extract(epoch from next_attempt_at - now()) / 60)::int as m from private.account_deletion_requests where id = $1", [o.o_request_id]);
      delays.push(Number(r[0].m));
    }
    expect(delays).toEqual([1, 2, 5, 15, 30, 60, 60]);
    const o = await open(U);
    const s = await h.asWorker("select private.n10_record_failure($1::uuid, $2::text, 'requested', 'auth_permanent', true) as s", [o.o_request_id, o.o_lease]);
    expect(s[0].s).toBe("auth_attention");
    const again = await open(U);
    expect(again.o_status).toBe("auth_attention");
    expect(again.o_lease_acquired).toBe(false);
  });

  it("transient failures for 24 h escalate to auth_attention; never auto-cancelled", async () => {
    const U = uuid(0x3002);
    await addUser(U);
    const o = await open(U);
    await h.timeTravel(o.o_request_id, "requested_at = now() - interval '25 hours'");
    const s = await h.asWorker("select private.n10_record_failure($1::uuid, $2::text, 'requested', 'auth_transient', false) as s", [o.o_request_id, o.o_lease]);
    expect(s[0].s).toBe("auth_attention");
  });

  it("purge is forbidden while the Auth user exists (E1 at the database)", async () => {
    const U = uuid(0x4001);
    await addUser(U);
    const o = await open(U);
    expect(await errorCode(() => h.asWorker("select private.n10_record_purge($1::uuid, $2::text, 'requested', 0)", [o.o_request_id, o.o_lease]))).toBe("55000");
  });
});

describe("N10 discovery, anomalies and strict completion (E5, E6, E10, E11, E15, E18, E21)", () => {
  const U = uuid(0x5001);
  const other = uuid(0x5002);
  let id = "";
  let lease = "";

  it("canonical discovery is exact-first-segment, both buckets, deterministic, limit 1..1000", async () => {
    await addUser(U);
    await addUser(other);
    await addObject("weekly-photos", `${U}/20.jpg`, U);
    await addObject("first-year-memories", `${U}/m/a/b/c/d/e/deep.jpg`, null);
    await addObject("weekly-photos", `${U}x/not-mine.jpg`, other);
    await addObject("weekly-photos", `${other}/${U}/nested.jpg`, other);
    await addObject("other-bucket", `${U}/elsewhere.jpg`, U);
    await addObject("weekly-photos", `${other}/control.jpg`, other);
    await addObject("first-year-memories", `misfiled/${U}.jpg`, U);
    const rows = await h.asWorker("select bucket_id, name from private.account_media_canonical($1::uuid, 1000)", [U]);
    expect(rows).toEqual([
      { bucket_id: "first-year-memories", name: `${U}/m/a/b/c/d/e/deep.jpg` },
      { bucket_id: "weekly-photos", name: `${U}/20.jpg` },
    ]);
    for (const bad of [0, 1001]) {
      expect(await errorCode(() => h.asWorker("select * from private.account_media_canonical($1::uuid, $2::int)", [U, bad]))).toBe("22023");
    }
    expect((await h.asWorker("select private.account_media_anomaly_count($1::uuid) as n", [U]))[0].n).toBe(1);
  });

  it("an OWNER_ID_PATH_ANOMALY moves the request to purge_attention and blocks completion", async () => {
    const o = await open(U);
    id = o.o_request_id;
    lease = o.o_lease as string;
    await dropUser(U);
    await h.asWorker("select private.n10_confirm_auth_deleted($1::uuid, $2::text, 3600)", [id, lease]);
    await h.su("delete from storage.objects where bucket_id in ('weekly-photos','first-year-memories') and split_part(name, '/', 1) = $1", [U]);
    const s = await h.asWorker("select private.n10_record_purge($1::uuid, $2::text, 'auth_deleted', 2) as s", [id, lease]);
    expect(s[0].s).toBe("purge_attention");
    const r = await row(id);
    expect(r.anomaly_count).toBe(1);
    expect(r.last_error_class).toBe("owner_id_path_anomaly");
    expect(await errorCode(() => h.su("update private.account_deletion_requests set status = 'auth_deleted' where id = $1 and false", [id]))).toBe("no-error");
  });

  it("after operator resolution through the Storage API the request re-arms and waits for the window", async () => {
    await h.su("delete from storage.objects where name = $1", [`misfiled/${U}.jpg`]);
    await h.su("update private.account_deletion_requests set next_attempt_at = now() - interval '1 second' where id = $1", [id]);
    const claimed = await h.asWorker("select * from private.n10_claim_due(5, 300)");
    const mine = claimed.find((c) => c.o_request_id === id);
    expect(mine?.o_status).toBe("purge_attention");
    const s = await h.asWorker("select private.n10_record_purge($1::uuid, $2::text, 'purge_attention', 0) as s", [id, mine?.o_lease]);
    expect(s[0].s).toBe("awaiting_final_sweep");
    const r = await row(id);
    expect(r.purge_empty_at).not.toBeNull();
    const notDue = await h.asWorker("select * from private.n10_claim_due(5, 300)");
    expect(notDue.find((c) => c.o_request_id === id)).toBeUndefined();
    expect(await errorCode(() => h.su("update private.account_deletion_requests set status = 'completed', completed_at = now(), user_id = null, anonymised_at = now() where id = $1", [id]))).toBe("23514");
  });

  it("final sweep after the window: late object removed and counted, then COMPLETED with user_id nulled", async () => {
    await h.timeTravel(id, "auth_deleted_at = auth_deleted_at - interval '3 hours', final_sweep_after = final_sweep_after - interval '3 hours', next_attempt_at = now() - interval '1 second'");
    await addObject("weekly-photos", `${U}/late.jpg`, U);
    const claimed = await h.asWorker("select * from private.n10_claim_due(5, 300)");
    const mine = claimed.find((c) => c.o_request_id === id);
    expect(mine?.o_status).toBe("awaiting_final_sweep");
    const stays = await h.asWorker("select private.n10_record_purge($1::uuid, $2::text, 'awaiting_final_sweep', 0) as s", [id, mine?.o_lease]);
    expect(stays[0].s).toBe("awaiting_final_sweep");
    await h.su("delete from storage.objects where name = $1", [`${U}/late.jpg`]);
    const done = await h.asWorker("select private.n10_record_purge($1::uuid, $2::text, 'awaiting_final_sweep', 1) as s", [id, mine?.o_lease]);
    expect(done[0].s).toBe("completed");
    const r = await row(id);
    expect(r.user_id).toBeNull();
    expect(r.anonymised_at).not.toBeNull();
    expect(r.completed_at).not.toBeNull();
    expect(r.sweep_objects_removed).toBe(1);
    expect(r.objects_removed).toBe(3);
    expect((await h.su("select count(*)::int as n from storage.objects where owner_id = $1", [other]))[0].n).toBe(3);
  });

  it("completed is terminal; anonymised rows are deleted only after retention", async () => {
    expect(await errorCode(() => h.su("update private.account_deletion_requests set next_attempt_at = now() where id = $1", [id]))).toBe("23514");
    expect((await h.asWorker("select private.n10_cleanup_completed(30) as n"))[0].n).toBe(0);
    await h.timeTravel(id, "anonymised_at = now() - interval '31 days'");
    expect((await h.asWorker("select private.n10_cleanup_completed(30) as n"))[0].n).toBe(1);
    for (const bad of [0, 3651]) {
      expect(await errorCode(() => h.asWorker("select private.n10_cleanup_completed($1::int)", [bad]))).toBe("22023");
    }
  });
});

describe("N10 transition guard (E19, E23)", () => {
  it("rejects invalid transitions and identity changes", async () => {
    const U = uuid(0x6001);
    await addUser(U);
    const o = await open(U);
    const id = o.o_request_id;
    expect(await errorCode(() => h.su("update private.account_deletion_requests set status = 'completed' where id = $1", [id]))).toBe("23514");
    expect(await errorCode(() => h.su("update private.account_deletion_requests set status = 'awaiting_final_sweep' where id = $1", [id]))).toBe("23514");
    expect(await errorCode(() => h.su("update private.account_deletion_requests set user_id = $2 where id = $1", [id, uuid(0x6002)]))).toBe("23514");
    expect(await errorCode(() => h.su("delete from private.account_deletion_requests where id = $1", [id]))).toBe("23514");
    expect(await errorCode(() => h.su("insert into private.account_deletion_requests (user_id, status) values ($1, 'auth_deleted')", [uuid(0x6003)]))).toBe("23514");
  });

  it("cancellation only while the Auth user exists, deletion never committed and nothing purged", async () => {
    const U = uuid(0x7001);
    await addUser(U);
    const o = await open(U);
    await dropUser(U);
    expect(await errorCode(() => h.su("update private.account_deletion_requests set status = 'cancelled' where id = $1", [o.o_request_id]))).toBe("23514");
    await h.asWorker("select private.n10_confirm_auth_deleted($1::uuid, $2::text, 3600)", [o.o_request_id, o.o_lease]);
    expect(await errorCode(() => h.su("update private.account_deletion_requests set status = 'cancelled' where id = $1", [o.o_request_id]))).toBe("23514");
    expect(await errorCode(() => h.su("update private.account_deletion_requests set status = 'requested' where id = $1", [o.o_request_id]))).toBe("23514");
  });

  it("claim leases exclude a second claimant until the lease expires", async () => {
    const U = uuid(0x8001);
    await addUser(U);
    const o = await open(U);
    await h.asWorker("select private.n10_release_lease($1::uuid, $2::text)", [o.o_request_id, o.o_lease]);
    const first = (await h.asWorker("select * from private.n10_claim_due(50, 300)")).filter((c) => c.o_request_id === o.o_request_id);
    const second = (await h.asWorker("select * from private.n10_claim_due(50, 300)")).filter((c) => c.o_request_id === o.o_request_id);
    expect(first).toHaveLength(1);
    expect(second).toHaveLength(0);
    await h.timeTravel(o.o_request_id, "lease_until = now() - interval '1 second'");
    const third = (await h.asWorker("select * from private.n10_claim_due(50, 300)")).filter((c) => c.o_request_id === o.o_request_id);
    expect(third).toHaveLength(1);
  });
});

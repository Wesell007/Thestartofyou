import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { PGlite } from "@electric-sql/pglite";
import { beforeAll, describe, expect, it } from "vitest";
import { checkQueueInvocation, EMAIL_QUEUE_TOKEN_HEADER, timingSafeEqualStrings } from "../../supabase/functions/_shared/queueInvocation";
import { createN10Db, readRetentionDays, runDeleteAccount, type N10Deps } from "../../supabase/functions/_shared/accountDeletion";
import { createN10Harness, n10MigrationFile, uuid, type N10Harness } from "./support/n10Pglite";

// N10.4: M5 (e-mail queue invocation hardening) and M6 (account-deletion privacy minimisation).

const root = process.cwd();
const read = (p: string) => readFileSync(resolve(root, p), "utf8");
const m5 = n10MigrationFile("_email_queue_invocation_hardening.sql");
const m6 = n10MigrationFile("_n10_privacy_minimisation.sql");
const SECRET = "eq_" + "Q1w2E3r4T5".repeat(5);
// Assembled at runtime: no credential-shaped literal in the repository.
const b64url = (o: object) => btoa(JSON.stringify(o)).replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");
const SERVICE_ROLE_FAKE = [b64url({ alg: "HS256", typ: "JWT" }), b64url({ role: "service_role", note: "test-fake" }), "sig"].join(".");

describe("process-email-queue invocation boundary", () => {
  it("POST only; fails closed without a strong secret; generic 401 for a missing, wrong or JWT-shaped token", () => {
    expect(checkQueueInvocation("GET", SECRET, SECRET)).toBe("method_not_allowed");
    expect(checkQueueInvocation("POST", SECRET, undefined)).toBe("misconfigured");
    expect(checkQueueInvocation("POST", "short", "short")).toBe("misconfigured");
    for (const token of [null, "", "wrong", SECRET.slice(0, -1), SECRET + "x", `Bearer ${SECRET}`, SERVICE_ROLE_FAKE]) {
      expect(checkQueueInvocation("POST", token, SECRET)).toBe("unauthorized");
    }
    expect(checkQueueInvocation("POST", SECRET, SECRET)).toBe("ok");
    expect(timingSafeEqualStrings("", "")).toBe(true);
    expect(EMAIL_QUEUE_TOKEN_HEADER).toBe("x-email-queue-token");
  });

  it("the function authenticates the token before any configuration or client, and no longer accepts a service-role bearer", () => {
    const src = read("supabase/functions/process-email-queue/index.ts");
    const check = src.indexOf("checkQueueInvocation(");
    expect(check).toBeGreaterThan(-1);
    for (const later of ["Deno.env.get('LOVABLE_API_KEY')", "createClient(", "read_email_batch"]) expect(src.indexOf(later)).toBeGreaterThan(check);
    expect(src).not.toMatch(/req\.headers\.get\('Authorization'\)|parseJwtClaims|claims\?\.role/);
    expect(src).toMatch(/Deno\.env\.get\('EMAIL_QUEUE_INVOKE_SECRET'\)/);
    expect(read("supabase/config.toml")).toMatch(/\[functions\.process-email-queue\]\r?\nverify_jwt = false/);
  });

  it("no migration's final definition sends a credential through pg_net", () => {
    const names = readdirSync(resolve(root, "supabase/migrations")).sort();
    const latestDispatch = names.filter((n) => /CREATE OR REPLACE FUNCTION public\.email_queue_dispatch/.test(read(`supabase/migrations/${n}`))).at(-1);
    expect(latestDispatch).toBe(m5.name);
    expect(names.indexOf(m5.name)).toBeGreaterThan(names.findIndex((n) => n.endsWith("_n10_worker_invocation_hardening.sql")));
  });
});

describe("M5 effective dispatcher and cron job (stand-in cron / Vault / pg_net / pgmq)", () => {
  const STUB = `
    create role anon nologin; create role authenticated nologin; create role service_role nologin;
    create schema cron;
    create table cron.job (jobid serial primary key, jobname text unique, schedule text, command text);
    create function cron.schedule(n text, s text, c text) returns bigint language sql as
      $$ insert into cron.job (jobname, schedule, command) values (n, s, c)
         on conflict (jobname) do update set schedule = excluded.schedule, command = excluded.command returning jobid::bigint $$;
    create function cron.unschedule(n text) returns boolean language sql as $$ delete from cron.job where jobname = n returning true $$;
    create schema vault;
    create table vault.decrypted_secrets (name text primary key, decrypted_secret text, created_at timestamptz default now());
    create schema net;
    create table net.captured (url text, headers jsonb, body jsonb);
    create function net.http_post(url text, body jsonb default '{}'::jsonb, params jsonb default '{}'::jsonb,
      headers jsonb default '{}'::jsonb, timeout_milliseconds integer default 5000) returns bigint language sql as
      $$ insert into net.captured values (url, headers, body) returning 1::bigint $$;
    create schema pgmq;
    create table pgmq.q_auth_emails (msg_id bigserial primary key, vt timestamptz not null default now(), message jsonb);
    create table pgmq.q_transactional_emails (msg_id bigserial primary key, vt timestamptz not null default now(), message jsonb);
    create table public.email_send_state (id int primary key default 1, retry_after_until timestamptz);
    insert into public.email_send_state (id) values (1);
  `;
  let db: PGlite;
  const fire = async () => {
    const cmd = (await db.query<{ command: string }>("select command from cron.job where jobname = 'process-email-queue'")).rows[0].command;
    await db.exec("delete from net.captured");
    await db.exec(cmd);
    return (await db.query<{ url: string; headers: Record<string, string>; body: unknown }>("select * from net.captured")).rows;
  };

  beforeAll(async () => {
    db = new PGlite();
    await db.exec(STUB);
    // The pre-M5 state: a Lovable-style job that sends the service-role key through pg_net.
    await db.query("select cron.schedule('process-email-queue', '5 seconds', $1)", [
      `select net.http_post(url := 'https://x.example.invalid/functions/v1/process-email-queue', headers := jsonb_build_object('Authorization', 'Bearer ' || (select decrypted_secret from vault.decrypted_secrets where name = 'email_queue_service_role_key'))) `,
    ]);
    await db.query("insert into vault.decrypted_secrets (name, decrypted_secret) values ('email_queue_service_role_key', $1)", [SERVICE_ROLE_FAKE]);
    await db.exec(m5.sql);
  }, 120_000);

  it("replaces the old job: one hardened job, no service-role reference, Authorization or Bearer", async () => {
    const jobs = (await db.query<{ schedule: string; command: string }>("select schedule, command from cron.job where jobname = 'process-email-queue'")).rows;
    expect(jobs).toHaveLength(1);
    expect(jobs[0].schedule).toBe("5 seconds");
    expect(jobs[0].command).not.toMatch(/service_role|Authorization|Bearer/i);
    const fn = (await db.query<{ d: string }>("select pg_get_functiondef('public.email_queue_dispatch()'::regprocedure) as d")).rows[0].d;
    expect(fn).not.toMatch(/service_role|Authorization|Bearer/i);
    expect(fn).toMatch(/X-Email-Queue-Token/);
  });

  it("is a no-op while the invoke secret is missing, even if the old service-role secret exists and mail is queued", async () => {
    await db.exec("insert into pgmq.q_auth_emails (message) values ('{}')");
    await db.query("insert into vault.decrypted_secrets (name, decrypted_secret) values ('email_queue_function_url', 'https://x.example.invalid/functions/v1/process-email-queue')");
    expect(await fire()).toHaveLength(0);
  });

  it("sends only URL, Content-Type, X-Email-Queue-Token and {} when configured and mail is waiting", async () => {
    await db.query("insert into vault.decrypted_secrets (name, decrypted_secret) values ('email_queue_invoke_secret', $1)", [SECRET]);
    const rows = await fire();
    expect(rows).toHaveLength(1);
    expect(Object.keys(rows[0].headers).sort()).toEqual(["Content-Type", "X-Email-Queue-Token"]);
    expect(rows[0].headers["X-Email-Queue-Token"]).toBe(SECRET);
    expect(rows[0].body).toEqual({});
    expect(JSON.stringify(rows)).not.toContain(SERVICE_ROLE_FAKE);
  });

  it("sends nothing during a provider cool-down or when both queues are empty", async () => {
    await db.exec("update public.email_send_state set retry_after_until = now() + interval '1 minute'");
    expect(await fire()).toHaveLength(0);
    await db.exec("update public.email_send_state set retry_after_until = null; delete from pgmq.q_auth_emails");
    expect(await fire()).toHaveLength(0);
    await db.exec("insert into pgmq.q_transactional_emails (message) values ('{}')");
    expect(await fire()).toHaveLength(1);
  });
});

describe("M6 privacy minimisation (real M1 + M4 + M6)", () => {
  let h: N10Harness;
  const deps = (): N10Deps => ({
    db: createN10Db((sql, params) => h.asWorker(sql, params)),
    auth: {
      async deleteUser(userId) {
        await h.su("delete from auth.users where id = $1", [userId]);
        return { error: null };
      },
    },
    storage: { remove: async () => ({ error: null }) },
    alert: async () => undefined,
    log: { info: () => undefined, error: () => undefined },
    now: () => Date.now(),
  });
  const count = async (sql: string, p: unknown[]) => Number((await h.su(sql, p))[0].n);

  beforeAll(async () => {
    h = await createN10Harness();
    await h.db.exec(`
      create table public.email_send_log (id uuid primary key default gen_random_uuid(), recipient_email text not null, template_name text not null default 't', status text not null default 'sent');
      create table public.email_unsubscribe_tokens (id uuid primary key default gen_random_uuid(), token text not null unique, email text not null unique);
      create table public.suppressed_emails (id uuid primary key default gen_random_uuid(), email text not null unique, reason text not null)`);
  }, 120_000);

  it("is additive and changes no earlier migration", () => {
    expect(m6.sql).toMatch(/CREATE TRIGGER n10_forget_email_records\s+AFTER DELETE ON auth\.users/);
    expect(m6.sql).not.toMatch(/suppressed_emails\s+\w*\s*WHERE|DELETE FROM public\.suppressed_emails/i);
    expect(m6.sql).not.toMatch(/\b(insert\s+into|update|delete\s+from)\s+storage\./i);
  });

  it("account deletion removes that address's e-mail log and unsubscribe token, keeps suppression and other users", async () => {
    const U = uuid(0x601), V = uuid(0x602);
    await h.su("insert into auth.users (id, email) values ($1, 'Person.One@Example.invalid'), ($2, 'other@example.invalid')", [U, V]);
    await h.su("insert into public.email_send_log (recipient_email) values ('person.one@example.invalid'), ('PERSON.ONE@example.invalid'), ('other@example.invalid')");
    await h.su("insert into public.email_unsubscribe_tokens (token, email) values ('t1', 'person.one@example.invalid'), ('t2', 'other@example.invalid')");
    await h.su("insert into public.suppressed_emails (email, reason) values ('person.one@example.invalid', 'unsubscribe')");
    const res = await runDeleteAccount(deps(), { userId: U, tokenWindowSeconds: 3600 });
    expect(res.httpStatus).toBe(200);
    expect(await count("select count(*)::int as n from public.email_send_log where lower(recipient_email) = 'person.one@example.invalid'", [])).toBe(0);
    expect(await count("select count(*)::int as n from public.email_unsubscribe_tokens where email = 'person.one@example.invalid'", [])).toBe(0);
    expect(await count("select count(*)::int as n from public.suppressed_emails where email = 'person.one@example.invalid'", [])).toBe(1);
    expect(await count("select count(*)::int as n from public.email_send_log where recipient_email = 'other@example.invalid'", [])).toBe(1);
    expect(await count("select count(*)::int as n from public.email_unsubscribe_tokens where email = 'other@example.invalid'", [])).toBe(1);
  });

  it("a failure inside the minimisation never blocks Auth deletion", async () => {
    const U = uuid(0x603);
    await h.su("insert into auth.users (id, email) values ($1, 'third@example.invalid')", [U]);
    await h.su("alter table public.email_unsubscribe_tokens rename to email_unsubscribe_tokens_away");
    try {
      await h.su("delete from auth.users where id = $1", [U]);
    } finally {
      await h.su("alter table public.email_unsubscribe_tokens_away rename to email_unsubscribe_tokens");
    }
    expect(await count("select count(*)::int as n from auth.users where id = $1", [U])).toBe(0);
  });

  it("retention option C: 0 days removes completed anonymised rows only; negative is rejected", async () => {
    const U = uuid(0x604);
    await h.su("insert into auth.users (id, email) values ($1, 'four@example.invalid')", [U]);
    await runDeleteAccount(deps(), { userId: U, tokenWindowSeconds: 3600 });
    const id = String((await h.su("select id from private.account_deletion_requests where user_id = $1", [U]))[0].id);
    await h.timeTravel(id, "status = 'completed', completed_at = now(), anonymised_at = now(), user_id = null");
    const active = await count("select count(*)::int as n from private.account_deletion_requests where status <> 'completed'", []);
    expect(await deps().db.cleanupCompleted(0)).toBeGreaterThanOrEqual(1);
    expect(await count("select count(*)::int as n from private.account_deletion_requests where id = $1", [id])).toBe(0);
    expect(await count("select count(*)::int as n from private.account_deletion_requests where status <> 'completed'", [])).toBe(active);
    await expect(h.asWorker("select private.n10_cleanup_completed(-1)")).rejects.toThrow(/invalid retention/);
    expect(readRetentionDays((k) => ({ N10_COMPLETED_ROW_RETENTION_DAYS: "0" })[k])).toBe(0);
  });
});

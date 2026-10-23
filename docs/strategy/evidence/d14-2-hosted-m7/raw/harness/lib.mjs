// D14.2 harness helpers. Secrets are read from files, never printed; all output passes redact().
import { readFileSync } from "node:fs";
import { assertTarget, ALLOWED_REF } from "./guard.mjs";

const D = "C:/Users/Administrator/.d142";
export const REF = ALLOWED_REF;
export const secret = (name) => readFileSync(`${D}/${name}`, "utf8").replace(/^\uFEFF/, "").trim();
const extra = new Set();
export const addSecret = (v) => { if (v && String(v).length >= 6) extra.add(String(v)); };

export function redact(text) {
  let s = String(text);
  const vals = [secret("d142.dbpass"), secret("d142.pat"), ...extra];
  for (const f of ["d142.workerpass", "d142.invoke"]) { try { vals.push(secret(f)); } catch { /* not yet */ } }
  try { const k = JSON.parse(secret("d142.keys.json")); vals.push(...Object.values(k)); } catch { /* not yet */ }
  for (const v of vals) if (v) { s = s.split(v).join("[REDACTED]"); s = s.split(encodeURIComponent(v)).join("[REDACTED]"); }
  return s
    .replace(/sbp_[A-Za-z0-9]+/g, "sbp_[REDACTED]")
    .replace(/sb_secret_[A-Za-z0-9_-]+/g, "sb_secret_[REDACTED]")
    .replace(/eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g, "[JWT]")
    .replace(/postgres(?:ql)?:\/\/[^\s"']+/g, "[DBURL]")
    .replace(/phx_[A-Za-z0-9_-]+/g, "phx_[REDACTED]");
}

export const POOLER_HOST = process.env.D142_POOLER_HOST || "aws-0-eu-west-2.pooler.supabase.com";

/** Session-pooler (5432) or transaction-pooler (6543) URL for a role. */
export function dbUrl({ user = "postgres", password = secret("d142.dbpass"), port = 5432 } = {}) {
  const u = `${user}.${REF}`;
  assertTarget(u);
  return `postgresql://${encodeURIComponent(u)}:${encodeURIComponent(password)}@${POOLER_HOST}:${port}/postgres`;
}

export async function mgmt(path, { method = "GET", body } = {}) {
  const url = `https://api.supabase.com/v1/projects/${REF}${path}`;
  assertTarget(url);
  const res = await fetch(url, {
    method,
    headers: { Authorization: `Bearer ${secret("d142.pat")}`, "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const text = await res.text();
  let json = null;
  try { json = JSON.parse(text); } catch { /* keep text */ }
  return { status: res.status, json, text };
}

export const projectUrl = `https://${REF}.supabase.co`;
assertTarget(projectUrl);

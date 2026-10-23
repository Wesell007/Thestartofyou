// tsoy-staging operational harness (outside Git). Secrets are read from files, never printed.
import { readFileSync } from "node:fs";
export const D = "C:/Users/Administrator/.tsoy-staging";
export const REPO = "C:/Users/Administrator/Desktop/Thestartofyou";
export const REF = "aeeprivmakalcbnefwwm";
export const secret = (n) => readFileSync(`${D}/${n}`, "utf8").replace(/^\uFEFF/, "").trim();
export function redact(text) {
  let s = String(text);
  for (const f of ["db.pass"]) { try { const v = secret(f); if (v) { s = s.split(v).join("[REDACTED]").split(encodeURIComponent(v)).join("[REDACTED]"); } } catch {} }
  return s.replace(/sbp_[A-Za-z0-9]+/g, "sbp_[REDACTED]").replace(/sb_secret_[A-Za-z0-9_-]+/g, "sb_secret_[REDACTED]")
    .replace(/eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g, "[JWT]").replace(/postgres(?:ql)?:\/\/[^\s"']+/g, "[DBURL]");
}

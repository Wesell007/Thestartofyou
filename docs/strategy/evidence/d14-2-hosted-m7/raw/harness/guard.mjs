// D14.2 target guard. Every harness script imports this before any remote call.
export const ALLOWED_REF = "jjrhizafpikmyvfapcic";
export const DENYLIST = [
  "wogepxfipdipogyogced", // production — never contacted in D14.2
  "wwtcnbjhttjtklpxhrkd",
  "dlftnirrnirlkhxpofoq",
  "czhopceorfqxdbfvlnap",
  "gbhwpzofnswlryqjoumw",
  "toqeefrwnsjuhjmobodg",
  "mwlryyionkpjbecnbsiq",
];

/** Throws unless `text` (a ref, URL, host or user name) names the allowed ref and no denylisted one. */
export function assertTarget(text) {
  const s = String(text ?? "");
  for (const bad of DENYLIST) if (s.includes(bad)) throw new Error(`GUARD: denylisted target ${bad}`);
  if (!s.includes(ALLOWED_REF)) throw new Error("GUARD: target does not name the D14.2 project");
  const refs = s.match(/\b[a-z]{20}\b/g) ?? [];
  for (const r of refs) if (r !== ALLOWED_REF && /^[a-z]{20}$/.test(r) && !["supabase", "pooler"].includes(r)) {
    // any other 20-letter ref-shaped token is refused
    throw new Error(`GUARD: unexpected ref-shaped token ${r}`);
  }
  return true;
}

if (process.argv[2] === "--self-test") {
  const cases = [
    [`https://${ALLOWED_REF}.supabase.co`, true],
    [`db.${ALLOWED_REF}.supabase.co`, true],
    [`account_deletion_worker.${ALLOWED_REF}`, true],
    [ALLOWED_REF, true],
    ["", false],
    ["https://example.supabase.co", false],
    ...DENYLIST.flatMap((d) => [[d, false], [`https://${d}.supabase.co`, false], [`${ALLOWED_REF} ${d}`, false]]),
    [`${ALLOWED_REF} abcdefghijklmnopqrst`, false],
  ];
  let ok = 0;
  for (const [input, expected] of cases) {
    let pass;
    try { pass = assertTarget(input); } catch { pass = false; }
    if (pass === expected) ok++; else console.log("FAIL", input);
  }
  console.log(`guard self-test ${ok}/${cases.length}`);
  process.exit(ok === cases.length ? 0 : 1);
}

import pathlib
p = pathlib.Path(r"C:\Users\Administrator\Desktop\Thestartofyou\docs\strategy\phase41b1a-c1-rehearsal-plan.md")
raw = p.read_bytes()
nl = b"\r\n" if b"\r\n" in raw else b"\n"
s = raw.decode("utf-8")
edits = [
 # C1.13 step 3: the safe-state transition is setup, recorded separately, not a rollback execution
 ("  3. Remove the fixture episode state as in C1.14 (unbind links and pointer or delete fixture rows, delete episodes) so that guards 1, 3 and 4 are false.",
  "  3. Safe-state transition (setup, not a rollback execution): remove the fixture episode state as in C1.14 (unbind links and pointer or delete fixture rows, delete episodes) so that guards 1, 3 and 4 are false. Recorded in its own transcript."),
 # C1.13 equality baseline: per-case pre-run snapshot, not the pre-validation C1.5 capture
 ("  Each run is followed by the full catalogue capture and a diff against the C1.5 capture, which must be empty apart from the scratch table deliberately present for that run.",
  "  Equality reference for every rollback execution (R1, combined-state, R2, R3): a deterministic per-case PRE-RUN snapshot of the current validated foundation, not the C1.5 capture. For each execution: (a) establish the exact intended setup, including any scratch table/FK for that case; (b) capture the full nine-section catalogue immediately before invoking the rollback; (c) run the frozen rollback file through the approved hash-gated transaction runner; (d) expect the specified `ROLLBACK REFUSED` guard message; (e) capture the full nine-section catalogue immediately after the failed rollback; (f) diff POST against that case's PRE snapshot; (g) require the diff to be EMPTY with no exceptions (the scratch structure, when part of the setup, is present in both snapshots). Only after the empty diff is proven is the plan-defined cleanup for that case performed. The C1.5 capture remains the historical post-forward reference only: after C1.7 the 13 ownership FKs are validated (`NOT VALID` suffix gone, see `13b-c1-7-constraints-diff-vs-c1-5.md`), so a literal empty diff against C1.5 is neither expected nor required, and validation is not undone to recreate it."),
 ("- Evidence: `14-rollback-refusals.log` with the five run transcripts and five diffs.",
  "- Evidence: `14-rollback-refusals.log` with four rollback-refusal transcripts (R1, combined-state, R2, R3), four per-case pre/post catalogue diffs (each empty), one separately recorded safe-state transition/setup transcript between the combined-state run and R2, and a final cleanup proof showing no `c1_scratch%` object remains. There are exactly four rollback executions in C1.13; the safe-state transition is not a fifth refusal."),
 ("- PASS: R1, R2 and R3 each abort with the expected message and an empty diff; the combined-state run aborts with the guard-1 message and an empty diff. STOP: any run proceeds past its guard, any wrong message, or any diff.",
  "- PASS: R1, R2 and R3 each abort with the expected message and an empty post-versus-pre diff; the combined-state run aborts with the guard-1 message and an empty post-versus-pre diff. STOP: any run proceeds past its guard, any wrong message, or any post-versus-pre difference."),
 # Section K wording
 ("Independently reachable refusal proofs (each as table owner, one transaction, followed by an empty catalogue diff):",
  "Independently reachable refusal proofs (each as table owner, one transaction, each preceded by a per-case pre-run nine-section catalogue snapshot and followed by an empty diff of the post-refusal catalogue against that same pre-run snapshot; three independent refusals R1, R2, R3 plus one combined-state proof = four rollback executions):"),
 ("proving that the earliest applicable guard wins in the frozen order. Empty diff required.",
  "proving that the earliest applicable guard wins in the frozen order. Empty post-versus-pre diff required (its own pre-run snapshot, taken after both scratch FKs are added)."),
]
for old, new in edits:
    assert s.count(old) == 1, ("not found exactly once", old[:80])
    s = s.replace(old, new)
p.write_bytes(s.encode("utf-8").replace(b"\r\n", b"\n").replace(b"\n", nl) if nl == b"\r\n" else s.encode("utf-8"))
print("plan edited:", len(edits), "replacements; line ending", nl)

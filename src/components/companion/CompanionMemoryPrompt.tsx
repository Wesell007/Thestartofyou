/**
 * AIC-3 — the confirmation surface for permissioned memory.
 *
 * Nothing is kept until someone presses "Keep this", and nothing is removed
 * until they press "Forget it". The candidate shown here lives in React state
 * for this moment only; declining leaves no trace anywhere.
 *
 * Used by both companion surfaces, so the wording and the guarantees are
 * identical in the panel and on the full page.
 */

import { Button } from "@/components/ui/button";
import type { MemoryInteractionState } from "@/lib/companion/memory/useCompanionMemoryInteraction";

interface CompanionMemoryPromptProps {
  state: MemoryInteractionState;
  busy: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  onDismiss: () => void;
}

export default function CompanionMemoryPrompt({
  state,
  busy,
  onConfirm,
  onCancel,
  onDismiss,
}: CompanionMemoryPromptProps) {
  if (state.kind === "idle") return null;

  const shell =
    "rounded-2xl border border-[hsl(var(--stage-ttc-sage-soft))] bg-[hsl(var(--card))] px-4 py-3 text-[15px] text-[hsl(var(--foreground))]";

  if (state.kind === "message") {
    return (
      <div className={shell} role="status" aria-live="polite">
        <p className="font-sans leading-relaxed">{state.text}</p>
        <Button variant="ghost" size="sm" className="mt-2 px-2" onClick={onDismiss}>
          Close
        </Button>
      </div>
    );
  }

  const isSave = state.kind === "pending_save";

  return (
    <div className={shell} role="group" aria-label="Confirm what your companion remembers">
      <p className="font-sans leading-relaxed">
        {isSave
          ? state.replaces
            ? "Shall I keep this instead of what I had before?"
            : "Would you like me to remember this?"
          : "Shall I forget this?"}
      </p>
      <p className="mt-2 rounded-xl bg-[hsl(var(--muted))] px-3 py-2 font-sans text-[15px] leading-relaxed">
        {isSave ? state.value : state.target.value}
      </p>
      {isSave && state.replaces ? (
        <p className="mt-2 font-sans text-[13px] text-[hsl(var(--muted-foreground))]">
          Replacing: {state.replaces.value}
        </p>
      ) : null}
      <div className="mt-3 flex flex-wrap gap-2">
        <Button size="sm" onClick={onConfirm} disabled={busy}>
          {busy ? "Saving\u2026" : isSave ? "Keep this" : "Forget it"}
        </Button>
        <Button size="sm" variant="outline" onClick={onCancel} disabled={busy}>
          Not now
        </Button>
      </div>
      <p className="mt-2 font-sans text-[13px] text-[hsl(var(--muted-foreground))]">
        You can change or remove anything kept for you in your account settings.
      </p>
    </div>
  );
}

import { useState } from "react";
import { Sparkles, Mic } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Phase = "idle" | "shaping" | "review" | "soft-error";

interface Props {
  /** Current note text (the "original"). */
  original: string;
  /** Week number for the shaping context. */
  week: number;
  /**
   * Whether the threshold has been met and the action should be offered.
   * Below the threshold the action is hidden, not disabled.
   */
  available: boolean;
  /**
   * Was the last input captured via voice? Switches the verb to
   * "Tidy what I said" instead of "Shape this gently".
   */
  lastInputWasVoice?: boolean;
  /**
   * Quieter entry register — used inside kept chapters.
   * Shows "Refine, keep my voice" below the note rather than inline.
   */
  register?: "live" | "kept";
  /**
   * Called when the user accepts the shaped draft (either as returned,
   * or after editing). The parent writes the new text into the note and
   * is responsible for preserving first-written snapshot.
   */
  onAccept: (shapedText: string) => void;
}

/**
 * Shaping suggestion surface.
 *
 * Behaviour:
 *   1. Original is never overwritten. It lives in the parent note above.
 *   2. One quiet pass. No regenerate loop. No streaming animation.
 *   3. Suggestion arrives as a whole, separated only by a hairline rule.
 *   4. Three actions, equal weight: Keep this · Edit · Leave it.
 *   5. Failures are calm and non-technical. Your words are still here.
 */
const NoteShapingSuggestion = ({
  original,
  week,
  available,
  lastInputWasVoice = false,
  register = "live",
  onAccept,
}: Props) => {
  const [phase, setPhase] = useState<Phase>("idle");
  const [draft, setDraft] = useState("");
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [softMessage, setSoftMessage] = useState("");

  const accent = "hsl(var(--stage-pregnancy-accent))";
  const accentSoft = (a: number) => `hsl(var(--stage-pregnancy-accent) / ${a})`;

  const actionLabel = lastInputWasVoice
    ? "Tidy what I said"
    : register === "kept"
      ? "Refine, keep my voice"
      : "Shape this gently";

  const runShaping = async () => {
    if (!original.trim()) return;
    setPhase("shaping");
    setSoftMessage("");
    try {
      const { data, error } = await supabase.functions.invoke("ai-reflect", {
        body: { rawThoughts: original.trim(), week },
      });
      if (error) throw error;
      const returned = (data as { draft?: string; error?: string })?.draft?.trim() ?? "";
      const apiError = (data as { draft?: string; error?: string })?.error;
      if (apiError) throw new Error(apiError);
      if (!returned) {
        setSoftMessage("Nothing to suggest this time. Your words are still here.");
        setPhase("soft-error");
        return;
      }
      setDraft(returned);
      setEditValue(returned);
      setPhase("review");
    } catch {
      setSoftMessage("The pass didn't come back this time. Your words are still here. Try again when you'd like.");
      setPhase("soft-error");
    }
  };

  const keepThis = () => {
    const toKeep = editing ? editValue.trim() : draft.trim();
    if (!toKeep) return;
    onAccept(toKeep);
    setPhase("idle");
    setDraft("");
    setEditValue("");
    setEditing(false);
  };

  const leaveIt = () => {
    setPhase("idle");
    setDraft("");
    setEditValue("");
    setEditing(false);
    setSoftMessage("");
  };

  // Phase: idle. Show the quiet action only if threshold met.
  if (phase === "idle") {
    if (!available) return null;
    return (
      <div
        className={
          register === "kept"
            ? "mt-4 flex items-center gap-3"
            : "flex items-center gap-3"
        }
      >
        <button
          type="button"
          onClick={runShaping}
          className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-sans text-[10.5px] font-medium tracking-[0.22em] uppercase transition-opacity hover:opacity-80"
          style={{
            color: accent,
            border: `1px solid ${accentSoft(0.32)}`,
            background: "transparent",
          }}
        >
          {lastInputWasVoice ? (
            <Mic size={11} strokeWidth={1.8} />
          ) : (
            <Sparkles size={11} strokeWidth={1.8} />
          )}
          {actionLabel}
        </button>
        <span className="font-serif italic text-[11.5px] text-foreground/50 leading-snug">
          {lastInputWasVoice
            ? "A quiet pass to gently shape what you spoke. Only you see the result."
            : "A quiet pass to gently shape your words. Only you see the result."}
        </span>
      </div>
    );
  }

  // Phase: shaping. Quiet status, no spinner overlay.
  if (phase === "shaping") {
    return (
      <div className="mt-4 flex items-center gap-3">
        <span
          aria-hidden="true"
          className="block w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ backgroundColor: accent }}
        />
        <span
          className="font-sans text-[10.5px] font-medium tracking-[0.22em] uppercase"
          style={{ color: accent }}
        >
          Shaping gently
        </span>
      </div>
    );
  }

  // Phase: soft-error. Calm fallback.
  if (phase === "soft-error") {
    return (
      <div className="mt-4 flex flex-col gap-2.5">
        <p className="font-serif italic text-[13px] text-foreground/60 leading-relaxed max-w-[52ch]">
          {softMessage}
        </p>
        <button
          type="button"
          onClick={leaveIt}
          className="self-start font-sans text-[10.5px] font-medium tracking-[0.22em] uppercase transition-opacity hover:opacity-80"
          style={{ color: accent }}
        >
          Close
        </button>
      </div>
    );
  }

  // Phase: review. Suggestion returned beneath original.
  return (
    <div className="mt-5">
      {/* Hairline rule with "a suggestion" label */}
      <div className="flex items-center gap-3 mb-4">
        <span
          aria-hidden="true"
          className="block flex-1 h-px"
          style={{ backgroundColor: accentSoft(0.22) }}
        />
        <span
          className="font-sans text-[10px] font-medium tracking-[0.28em] lowercase"
          style={{ color: accent, letterSpacing: "0.28em" }}
        >
          a suggestion
        </span>
        <span
          aria-hidden="true"
          className="block flex-1 h-px"
          style={{ backgroundColor: accentSoft(0.22) }}
        />
      </div>

      <p className="font-serif italic text-[12.5px] text-foreground/50 leading-relaxed mb-3 pl-4">
        A suggestion. Your original is still here.
      </p>

      {/* Shaped draft with the same typeface, slightly indented, softer ink */}
      <div className="pl-4">
        {editing ? (
          <textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            rows={6}
            aria-label="Edit the suggestion"
            className="w-full bg-transparent border-0 font-serif italic text-[16.5px] sm:text-[17px] text-foreground/85 resize-none focus:outline-none leading-[1.8] min-h-[140px]"
          />
        ) : (
          <p className="font-serif italic text-[16.5px] sm:text-[17px] text-foreground/80 leading-[1.8] whitespace-pre-wrap">
            {draft}
          </p>
        )}
      </div>

      {/* Three actions, equal weight */}
      <div className="flex flex-wrap items-center gap-5 mt-5 pl-4">
        <button
          type="button"
          onClick={keepThis}
          className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase transition-opacity hover:opacity-80"
          style={{ color: accent }}
        >
          Keep this
        </button>
        <span aria-hidden="true" className="text-foreground/25">·</span>
        <button
          type="button"
          onClick={() => setEditing((v) => !v)}
          className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-foreground/65 hover:text-foreground transition-colors"
        >
          {editing ? "Done editing" : "Edit"}
        </button>
        <span aria-hidden="true" className="text-foreground/25">·</span>
        <button
          type="button"
          onClick={leaveIt}
          className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-foreground/55 hover:text-foreground/80 transition-colors"
        >
          Leave it
        </button>
      </div>
    </div>
  );
};

export default NoteShapingSuggestion;

/**
 * Phase 29B — session-only message list for the companion panel.
 *
 * Assistant answers reuse the existing EditorialAnswer renderer. Backend
 * errors are never shown raw.
 */

import { useEffect, useRef } from "react";
import EditorialAnswer from "@/components/shared/EditorialAnswer";
import {
  APPROVED_SOURCES_TRUST_LINE,
  sanitiseAiAnswer,
  sanitiseStreamingAiAnswer,
} from "@/lib/aiAnswerSafety";
import { useCompanion } from "./CompanionProvider";
import { companionStyles } from "./companionStyles";

export const COMPANION_ERROR_COPY =
  "I could not answer that just now. You can try again or open the full Ask page.";
export const COMPANION_RATE_LIMIT_COPY =
  "You have asked a few questions quickly. Give it a moment, then try again.";

export default function CompanionMessageList() {
  const { turns, streamingAnswer, isLoading, error, isRateLimited, retry, send } = useCompanion();
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [turns.length, streamingAnswer, isLoading]);

  return (
    <div className="flex flex-col gap-4">
      {turns.map((turn) =>
        turn.role === "user" ? (
          <p key={turn.id} className={companionStyles.userBubble}>
            {turn.text}
          </p>
        ) : turn.clarification ? (
          <div key={turn.id} className={companionStyles.paperCard}>
            <p className="text-[14px] leading-relaxed text-[hsl(var(--stage-ttc-olive))]">
              {turn.clarification.question}
            </p>
            <div className="mt-3 flex flex-col gap-2">
              {turn.clarification.chips
                .filter((chip) => !chip.focusInput)
                .map((chip) => (
                  <button
                    key={chip.label}
                    type="button"
                    onClick={() => send(chip.question)}
                    className={companionStyles.chip}
                  >
                    {chip.label}
                  </button>
                ))}
            </div>
          </div>
        ) : (
          <div key={turn.id} className={companionStyles.assistantCard}>
            <EditorialAnswer markdown={sanitiseAiAnswer(turn.text)} disableLinks />
            <p className="mt-4 font-sans text-[11px] font-light text-muted-foreground/70">
              {APPROVED_SOURCES_TRUST_LINE}
            </p>
          </div>
        ),
      )}

      {streamingAnswer ? (
        <div className={companionStyles.assistantCard} aria-live="polite">
          <EditorialAnswer markdown={sanitiseStreamingAiAnswer(streamingAnswer)} disableLinks />
        </div>
      ) : null}

      {isLoading && !streamingAnswer ? (
        <p className={companionStyles.notice} role="status">
          Thinking this through…
        </p>
      ) : null}

      {error ? (
        <div className={companionStyles.notice} role="status">
          <p>{isRateLimited ? COMPANION_RATE_LIMIT_COPY : COMPANION_ERROR_COPY}</p>
          {!isRateLimited ? (
            <button type="button" onClick={retry} className={`${companionStyles.quietButton} mt-1 px-0 underline`}>
              Try again
            </button>
          ) : null}
        </div>
      ) : null}

      <div ref={endRef} />
    </div>
  );
}

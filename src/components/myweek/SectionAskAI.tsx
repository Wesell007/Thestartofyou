import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { useCompanionIdentity } from "@/hooks/useCompanionIdentity";
import { useAISearch } from "@/hooks/useAISearch";
import { toneLabel } from "@/lib/companion";
import {
  buildCompanionContext,
  COMPANION_CONTEXT_MAX_LENGTH,
} from "@/lib/companionContext";

import { navigateToAsk } from "@/lib/askNavigation";

interface Props {
  week: number;
  seed: string;
  dueDate?: Date | null;
}

const CHIPS = [
  "What should I remember about this week?",
  "Help me write a reflection for this week.",
  "What could I ask my midwife at this stage?",
];

const accent = "hsl(var(--stage-pregnancy-accent))";

/** Splits any trailing sources block off the streamed answer. */
const splitSources = (raw: string) => {
  const match = raw.match(/\n\s*(?:#+\s*)?(?:sources?|references?)\s*:?\s*\n/i);
  if (!match || match.index === undefined) return { body: raw, sources: "" };
  return {
    body: raw.slice(0, match.index).trim(),
    sources: raw.slice(match.index + match[0].length).trim(),
  };
};

/** Renders inline markdown emphasis and bullet markers as plain typography. */
const renderInline = (text: string) =>
  text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") && part.length > 4 ? (
      <strong key={i} className="font-medium text-foreground">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );

const renderAnswerLines = (body: string) =>
  body
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, i) => {
      const bullet = line.match(/^[*-]\s+(.*)$/);
      if (bullet) {
        return (
          <p key={i} className="pl-4 -indent-4">
            <span aria-hidden="true">• </span>
            {renderInline(bullet[1])}
          </p>
        );
      }
      return <p key={i}>{renderInline(line.replace(/^#+\s*/, ""))}</p>;
    });


/**
 * Inline AI companion card. Sends only the coarse stage context built by
 * buildCompanionContext — no name, reflection, media or memory data.
 */
const SectionAskAI = ({ week, seed, dueDate }: Props) => {
  const navigate = useNavigate();
  const { name, tone } = useCompanionIdentity();
  const { answer, isLoading, error, ask, reset } = useAISearch();
  const [question, setQuestion] = useState("");
  const [asked, setAsked] = useState("");

  const context = useMemo(
    () => buildCompanionContext({ week, dueDate, tone }),
    [week, dueDate, tone],
  );

  const eyebrow = name ? `Ask ${name} about this week` : "Ask AI about this week";
  const heading = name
    ? `Ask ${name} a quiet question about week ${week}.`
    : `Ask a quiet question about week ${week}.`;

  const submit = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;
    setAsked(trimmed);
    setQuestion(trimmed);
    ask(trimmed, context);
  };

  const askSomethingElse = () => {
    reset();
    setAsked("");
    setQuestion("");
  };

  const continueInAsk = () => {
    // The shared /ask function rejects context over 500 characters, so the
    // carried context is stage context first, then whatever answer fits.
    const room = COMPANION_CONTEXT_MAX_LENGTH - context.length - 20;
    const carried =
      answer && room > 60
        ? `${context}\n\nPrevious answer: ${answer.slice(0, room).trimEnd()}`
        : context;
    navigateToAsk(navigate, asked || question || seed, {
      stage: "pregnancy",
      context: carried.slice(0, COMPANION_CONTEXT_MAX_LENGTH).trimEnd(),
    });
  };


  const { body, sources } = splitSources(answer);

  return (
    <section className="relative pt-2 pb-11 sm:pb-12">
      <div className="flex items-center gap-3 mb-5">
        <span
          aria-hidden="true"
          className="block w-5 h-px"
          style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.55)" }}
        />
        <p
          className="font-sans text-[10.5px] font-medium tracking-[0.26em] uppercase"
          style={{ color: accent }}
        >
          {eyebrow}
        </p>
        {tone && (
          <span
            className="ml-1 inline-flex items-center rounded-full px-2 py-0.5 font-sans text-[9.5px] font-medium tracking-[0.2em] uppercase"
            style={{
              color: accent,
              backgroundColor: "hsl(var(--stage-pregnancy) / 0.45)",
              border: "1px solid hsl(var(--stage-pregnancy-accent) / 0.25)",
            }}
          >
            {toneLabel(tone)}
          </span>
        )}
      </div>

      <div
        className="relative rounded-[24px] keepsake-surface px-5 sm:px-9 py-7 sm:py-9"
        style={{
          borderColor: "hsl(var(--stage-pregnancy-accent) / 0.28)",
          background:
            "linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--stage-pregnancy) / 0.34) 100%)",
          boxShadow: "inset 0 0 0 1px hsl(var(--stage-pregnancy-accent) / 0.12)",
        }}
      >
        <div className="flex items-start gap-4 sm:gap-5">
          <span
            aria-hidden="true"
            className="mt-1 hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-full border"
            style={{
              background: "hsl(var(--stage-pregnancy) / 0.65)",
              borderColor: "hsl(var(--stage-pregnancy-accent) / 0.32)",
            }}
          >
            <Sparkles size={18} strokeWidth={1.7} style={{ color: accent }} />
          </span>

          <div className="flex-1 min-w-0">
            <h2 className="font-serif text-[1.35rem] sm:text-[1.55rem] text-foreground leading-[1.18] mb-3 max-w-[26ch]">
              {heading}
            </h2>
            <p className="font-sans text-[14.5px] sm:text-[15px] text-foreground/78 leading-[1.72] max-w-[46ch] mb-5">
              Ask one question here and get a short answer. It is not a
              substitute for medical care.
            </p>

            {!answer && !isLoading && (
              <div className="flex flex-wrap gap-2 mb-4">
                {CHIPS.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => submit(chip)}
                    className="rounded-full px-3.5 py-1.5 text-left font-sans text-[12.5px] leading-snug text-foreground/80 transition-colors hover:bg-[hsl(var(--stage-pregnancy-accent)/0.10)]"
                    style={{
                      border: "1px solid hsl(var(--stage-pregnancy-accent) / 0.28)",
                    }}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                submit(question);
              }}
              className="flex flex-col sm:flex-row gap-2.5"
            >
              <label className="sr-only" htmlFor="companion-question">
                Your question
              </label>
              <input
                id="companion-question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask something about this week"
                maxLength={300}
                className="flex-1 min-w-0 rounded-full bg-background/70 px-4 py-2.5 font-sans text-[14px] text-foreground placeholder:text-foreground/45 outline-none focus:ring-2"
                style={{
                  border: "1px solid hsl(var(--stage-pregnancy-accent) / 0.3)",
                }}
              />
              <button
                type="submit"
                disabled={isLoading || !question.trim()}
                className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 font-sans text-[11.5px] font-medium tracking-[0.2em] uppercase transition-colors disabled:opacity-50"
                style={{
                  color: accent,
                  border: "1px solid hsl(var(--stage-pregnancy-accent) / 0.42)",
                }}
              >
                {isLoading ? (
                  <Loader2 size={13} className="animate-spin" />
                ) : (
                  <ArrowRight size={13} strokeWidth={1.8} />
                )}
                {isLoading ? "Thinking" : "Ask"}
              </button>
            </form>

            <div aria-live="polite" className="mt-5">
              {isLoading && !answer && (
                <p className="font-sans text-[13.5px] text-foreground/60">
                  Finding a quiet answer…
                </p>
              )}

              {error && (
                <p className="font-sans text-[13.5px] text-foreground/75 leading-relaxed">
                  {error}. Your question is still here, so you can try again in a
                  moment.
                </p>
              )}

              {body && (
                <div className="rounded-[18px] bg-background/60 px-4 py-4 sm:px-5">
                  <div className="font-sans text-[14.5px] text-foreground/85 leading-[1.75] space-y-2">
                    {renderAnswerLines(body)}
                  </div>

                  {sources && (
                    <details className="mt-3">
                      <summary className="cursor-pointer font-sans text-[11px] tracking-[0.18em] uppercase text-foreground/45">
                        Sources
                      </summary>
                      <p className="mt-2 font-sans text-[12.5px] text-foreground/55 leading-relaxed whitespace-pre-line break-words">
                        {sources}
                      </p>
                    </details>
                  )}
                </div>
              )}

              {(answer || error) && !isLoading && (
                <div className="mt-4 flex flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={continueInAsk}
                    className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-sans text-[11.5px] font-medium tracking-[0.2em] uppercase"
                    style={{
                      color: accent,
                      border: "1px solid hsl(var(--stage-pregnancy-accent) / 0.42)",
                    }}
                  >
                    Continue in Ask
                    <ArrowRight size={13} strokeWidth={1.8} />
                  </button>
                  <button
                    type="button"
                    onClick={askSomethingElse}
                    className="rounded-full px-4 py-1.5 font-sans text-[11.5px] font-medium tracking-[0.2em] uppercase text-foreground/55 hover:text-foreground/80"
                    style={{ border: "1px solid hsl(var(--border))" }}
                  >
                    Ask something else
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionAskAI;

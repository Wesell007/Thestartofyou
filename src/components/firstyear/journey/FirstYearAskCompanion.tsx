import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";
import { useAISearch } from "@/hooks/useAISearch";
import { useCompanionIdentity } from "@/hooks/useCompanionIdentity";
import { toneLabel } from "@/lib/companion";
import {
  FIRST_YEAR_CONTEXT_MAX_LENGTH,
  buildFirstYearCompanionContext,
} from "@/lib/firstYearCompanionContext";
import { navigateToAsk } from "@/lib/askNavigation";
import {
  FY_FIELD_FOCUS_RING,
  FY_FOCUS_RING,
  FY_KICKER,
  FY_SHADOW_SOFT,
} from "./firstYearStyles";

type Props = {
  /** First baby's date of birth, used only for a coarse age band. */
  dateOfBirth?: string | null;
  babyCount: number;
};

/** Default companion name when the person did not choose one. */
const DEFAULT_COMPANION = "Cindy";

const CHIPS = [
  "What can I expect around this age?",
  "What could I ask at the next check-up?",
  "How do I look after myself this week?",
];



/** Splits any trailing sources block off the streamed answer. */
const splitSources = (raw: string) => {
  const match = raw.match(/\n\s*(?:#+\s*)?(?:sources?|references?)\s*:?\s*\n/i);
  if (!match || match.index === undefined) return { body: raw, sources: "" };
  return {
    body: raw.slice(0, match.index).trim(),
    sources: raw.slice(match.index + match[0].length).trim(),
  };
};

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
 * The companion card on the First Year home. Sends only the coarse context
 * built by buildFirstYearCompanionContext: never a name, a saved note, a
 * memory, a photo or anything from the kept pregnancy chapter.
 */
const FirstYearAskCompanion = ({ dateOfBirth, babyCount }: Props) => {
  const navigate = useNavigate();
  const { name, tone } = useCompanionIdentity();
  const { answer, isLoading, error, ask, reset } = useAISearch();
  const [question, setQuestion] = useState("");
  const [asked, setAsked] = useState("");

  const companion = name?.trim() || DEFAULT_COMPANION;

  const context = useMemo(
    () => buildFirstYearCompanionContext({ dateOfBirth, babyCount, tone }),
    [dateOfBirth, babyCount, tone],
  );

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
    const room = FIRST_YEAR_CONTEXT_MAX_LENGTH - context.length - 20;
    const carried =
      answer && room > 60
        ? `${context}\n\nPrevious answer: ${answer.slice(0, room).trimEnd()}`
        : context;
    navigateToAsk(navigate, asked || question || CHIPS[0], {
      stage: "first-year",
      context: carried.slice(0, FIRST_YEAR_CONTEXT_MAX_LENGTH).trimEnd(),
    });
  };

  const { body, sources } = splitSources(answer);

  return (
    <section className="pb-10" aria-labelledby="ask-companion">
      <div
        className="relative rounded-[26px] border px-5 sm:px-8 py-7 sm:py-8"
        style={{
          borderColor: "hsl(var(--sage) / 0.42)",
          background:
            "linear-gradient(152deg, hsl(var(--sage) / 0.22) 0%, hsl(var(--sage-bg)) 55%, hsl(var(--stage-firstyear-cream)) 100%)",
          boxShadow: FY_SHADOW_SOFT,
        }}
      >
        <div className="flex items-start gap-4 sm:gap-5">
          <span
            aria-hidden="true"
            className="mt-0.5 hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: "hsl(var(--sage))" }}
          >
            <Sparkles size={20} strokeWidth={1.8} style={{ color: "hsl(var(--parchment))" }} />
          </span>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span
                className={FY_KICKER}
                style={{
                  color: "hsl(var(--parchment))",
                  backgroundColor: "hsl(var(--sage))",
                }}
              >
                Ask {companion}
              </span>
              {tone && (
                <span
                  className="inline-flex items-center rounded-full px-2.5 py-1 font-sans text-[10.5px] font-semibold tracking-[0.16em] uppercase"
                  style={{
                    color: "hsl(var(--sage-muted))",
                    backgroundColor: "hsl(var(--sage-bg))",
                    border: "1px solid hsl(var(--sage) / 0.34)",
                  }}
                >
                  {toneLabel(tone)}
                </span>
              )}
            </div>

            <h2
              id="ask-companion"
              className="font-serif text-[1.5rem] sm:text-[1.7rem] leading-[1.16] text-foreground mb-2.5"
            >
              Ask {companion} about this stage
            </h2>
            <p className={`${FY_INTRO} max-w-[46ch] mb-5`}>
              Ask one question here and get a short answer. {companion} answers from
              general guidance only and does not read anything private you have saved.
            </p>


            {!answer && !isLoading && (
              <div className="flex flex-wrap gap-2 mb-4">
                {CHIPS.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => submit(chip)}
                    className={`rounded-full bg-background/50 px-3.5 py-1.5 text-left font-sans text-[13px] font-medium leading-snug text-foreground transition-colors hover:bg-background/80 ${FY_FOCUS_RING}`}
                    style={{ border: "1px solid hsl(var(--sage) / 0.28)" }}
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
              <label className="sr-only" htmlFor="first-year-companion-question">
                Your question
              </label>
              <input
                id="first-year-companion-question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={`Ask ${companion} something`}
                maxLength={300}
                className={`flex-1 min-w-0 rounded-full bg-background/70 px-4 py-2.5 font-sans text-[14px] text-foreground placeholder:text-foreground/60 ${FY_FIELD_FOCUS_RING}`}
                style={{ border: "1px solid hsl(var(--sage) / 0.3)" }}
              />
              <button
                type="submit"
                disabled={isLoading || !question.trim()}
                className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-pill px-5 py-2.5 font-sans text-sm font-medium shadow-cta transition-opacity disabled:opacity-50 ${FY_FOCUS_RING}`}
                style={{
                  backgroundColor: "hsl(var(--sage))",
                  color: "hsl(var(--parchment))",
                }}
              >
                {isLoading ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <ArrowRight size={14} strokeWidth={1.8} />
                )}
                {isLoading ? "Thinking" : "Ask"}
              </button>
            </form>

            <div aria-live="polite" className="mt-5">
              {isLoading && !answer && (
                <p className={FY_HELPER}>
                  Finding a quiet answer…
                </p>
              )}

              {error && (
                <p className={`${FY_HELPER} leading-relaxed`}>
                  {error} Your question is still here, so you can try again in a moment.
                </p>
              )}

              {body && (
                <div className="rounded-[18px] bg-background/65 px-4 py-4 sm:px-5">
                  <div className="font-sans text-[14.5px] text-foreground leading-[1.75] space-y-2">
                    {renderAnswerLines(body)}
                  </div>

                  {sources && (
                    <details className="mt-3">
                      <summary className="cursor-pointer font-sans text-[11px] tracking-[0.18em] uppercase text-[hsl(var(--stage-firstyear-text-soft))]">
                        Sources
                      </summary>
                      <p className="mt-2 font-sans text-[12.5px] text-[hsl(var(--stage-firstyear-text-soft))] leading-relaxed whitespace-pre-line break-words">
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
                    className={`inline-flex min-h-11 items-center gap-2 rounded-full px-4 py-1.5 font-sans text-[11.5px] font-medium tracking-[0.2em] uppercase ${FY_FOCUS_RING}`}
                    style={{
                      color: "hsl(var(--sage-muted))",
                      border: "1px solid hsl(var(--sage) / 0.42)",
                    }}
                  >
                    Continue in Ask
                    <ArrowRight size={13} strokeWidth={1.8} />
                  </button>
                  <button
                    type="button"
                    onClick={askSomethingElse}
                    className={`inline-flex min-h-11 items-center rounded-full px-4 py-1.5 font-sans text-[11.5px] font-medium tracking-[0.2em] uppercase text-foreground/60 hover:text-foreground/85 ${FY_FOCUS_RING}`}
                    style={{ border: "1px solid hsl(var(--border))" }}
                  >
                    Ask something else
                  </button>
                </div>
              )}
            </div>

            <p className="mt-5 font-sans text-[12.5px] leading-[1.65] text-foreground/60">
              {companion} does not replace your midwife, GP or health visitor.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FirstYearAskCompanion;

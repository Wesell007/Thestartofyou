import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";
import { useAISearch } from "@/hooks/useAISearch";
import { useCompanionIdentity } from "@/hooks/useCompanionIdentity";
import { navigateToAsk } from "@/lib/askNavigation";
import type { TTCStage } from "@/lib/ttcDerived";
import type { TTCSupportMoment } from "@/lib/ttcSupportMoment";
import {
  askButtonLabelFor,
  askHeadingFor,
  buildTTCAskContext,
  ttcAskChipsFor,
  ttcAskTopicFor,
  TTC_ASK_CONTEXT_MAX_LENGTH,
} from "@/lib/ttcAskContext";
import { TTCBotanicalLeaf, TTCBotanicalSprig } from "@/components/ttc/journey/TTCDecor";
import {
  TTC_CARD_BODY,
  TTC_CARD_PAD,
  TTC_EYEBROW,
  TTC_FOCUS_RING,
  TTC_HEADING,
  TTC_HELPER,
  TTC_INNER_RADIUS,
  TTC_OUTLINE_PILL,
  TTC_PAPER_CARD_WARM,
  TTC_SOFT_PILL,
} from "@/components/ttc/journey/ttcStyles";

interface Props {
  stage: TTCStage | null;
  cycleDay: number | null;
  moment: TTCSupportMoment | null;
  possibleTestDate?: Date | null;
  expectedPeriodDate?: Date | null;
  hasRecentUnclearOrNegativeTest?: boolean;
  hasRecentPeriodStarted?: boolean;
}

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
 * Phase 28F — the TTC Ask companion surface.
 *
 * Sends only the coarse context built by buildTTCAskContext: no note text,
 * no log rows, no names and no identifiers. The companion name is display
 * copy only and never reaches the backend or analytics.
 */
const TTCAskCompanionCard = ({
  stage,
  cycleDay,
  moment,
  possibleTestDate,
  expectedPeriodDate,
  hasRecentUnclearOrNegativeTest,
  hasRecentPeriodStarted,
}: Props) => {
  const navigate = useNavigate();
  const { name } = useCompanionIdentity();
  const { answer, isLoading, error, ask, reset } = useAISearch();
  const [question, setQuestion] = useState("");
  const [asked, setAsked] = useState("");

  const momentId = moment?.id ?? null;

  const context = useMemo(
    () =>
      buildTTCAskContext({
        stage,
        cycleDay,
        momentId,
        possibleTestDate,
        expectedPeriodDate,
        hasRecentUnclearOrNegativeTest,
        hasRecentPeriodStarted,
      }),
    [
      stage,
      cycleDay,
      momentId,
      possibleTestDate,
      expectedPeriodDate,
      hasRecentUnclearOrNegativeTest,
      hasRecentPeriodStarted,
    ],
  );

  const chips = useMemo(() => ttcAskChipsFor(stage, momentId), [stage, momentId]);
  const topic = useMemo(() => ttcAskTopicFor(stage, momentId), [stage, momentId]);

  const heading = askHeadingFor(name);
  const askLabel = askButtonLabelFor(name);

  const submit = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;
    setAsked(trimmed);
    setQuestion(trimmed);
    ask(trimmed, context, { mode: "ttc_companion" });
  };

  const askSomethingElse = () => {
    reset();
    setAsked("");
    setQuestion("");
  };

  const continueInAsk = () => {
    // The shared endpoint rejects context over 500 characters, so cycle
    // context comes first and only what fits of the answer is carried.
    const room = TTC_ASK_CONTEXT_MAX_LENGTH - context.length - 20;
    const carried =
      answer && room > 60
        ? `${context}\n\nPrevious answer: ${answer.slice(0, room).trimEnd()}`
        : context;
    navigateToAsk(navigate, asked || question || chips[0]?.question || "", {
      stage: "ttc",
      topic,
      context: carried.slice(0, TTC_ASK_CONTEXT_MAX_LENGTH).trimEnd(),
    });
  };

  const openFullAsk = () => {
    navigateToAsk(navigate, question.trim() || chips[0]?.question || "", {
      stage: "ttc",
      topic,
      context,
    });
  };

  const { body, sources } = splitSources(answer);

  return (
    <div
      className={`relative overflow-hidden ${TTC_PAPER_CARD_WARM} ${TTC_CARD_PAD}`}
    >
      <TTCBotanicalSprig className="-top-9 -left-8 w-[150px] -rotate-6" opacity={0.2} />
      <TTCBotanicalLeaf className="-bottom-10 -right-6 w-[150px]" opacity={0.26} />

      <div className="relative">
        <p className={`${TTC_EYEBROW} mb-3`}>
          {name ? `${name} is here` : "A quiet question"}
        </p>
        <h2 className={`${TTC_HEADING} text-[21px] sm:text-[23px] mb-2`}>{heading}</h2>
        <p className={`${TTC_CARD_BODY} mb-5`}>
          Ask about timing, testing, the wait or what may help next. Answers are
          general guidance, not a diagnosis or a substitute for a clinician.
        </p>

        {!answer && !isLoading && (
          <div className="flex flex-wrap gap-2 mb-5">
            {chips.map((chip) => (
              <button
                key={chip.label}
                type="button"
                onClick={() => submit(chip.question)}
                className={`inline-flex min-h-11 items-center rounded-pill border border-[hsl(var(--stage-ttc-olive)/0.24)] bg-[hsl(var(--stage-ttc-sage-tint)/0.7)] px-4 py-2.5 text-left font-sans text-[13px] leading-snug text-[hsl(var(--stage-ttc-olive))] transition-colors hover:bg-[hsl(var(--stage-ttc-sage))] ${TTC_FOCUS_RING}`}
              >
                {chip.label}
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
          <label className="sr-only" htmlFor="ttc-companion-question">
            Your question
          </label>
          <input
            id="ttc-companion-question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask about this part of your cycle"
            maxLength={300}
            className={`flex-1 min-h-11 min-w-0 rounded-pill border border-[hsl(var(--stage-ttc-olive)/0.28)] bg-[hsl(var(--stage-ttc-cream))] px-4 py-2.5 font-sans text-[14px] text-foreground placeholder:text-[hsl(var(--stage-ttc-text-soft))] outline-none ${TTC_FOCUS_RING}`}
          />
          <button
            type="submit"
            disabled={isLoading || !question.trim()}
            className={`${TTC_SOFT_PILL} disabled:opacity-55`}
          >
            {isLoading ? (
              <>
                <Loader2 size={14} className="animate-spin" aria-hidden="true" />
                Thinking
              </>
            ) : (
              <>
                <Sparkles size={14} aria-hidden="true" />
                {askLabel}
              </>
            )}
          </button>
        </form>

        <div aria-live="polite" className="mt-5">
          {isLoading && !answer && (
            <p className={TTC_HELPER}>Finding a calm answer…</p>
          )}

          {error && (
            <p className={TTC_HELPER}>
              {error}. Your question is still here, so you can try again in a
              moment.
            </p>
          )}

          {body && (
            <div
              className={`${TTC_INNER_RADIUS} border border-[hsl(var(--stage-ttc-olive)/0.16)] bg-[hsl(var(--stage-ttc-cream)/0.7)] px-4 py-4 sm:px-5`}
            >
              <div className="font-sans text-[14.5px] leading-[1.75] text-[hsl(var(--stage-ttc-text))] space-y-2">
                {renderAnswerLines(body)}
              </div>

              {sources && (
                <details className="mt-3">
                  <summary
                    className={`cursor-pointer font-sans text-[11px] tracking-[0.18em] uppercase text-[hsl(var(--stage-ttc-text-soft))] ${TTC_FOCUS_RING}`}
                  >
                    Sources
                  </summary>
                  <p className="mt-2 font-sans text-[12.5px] leading-relaxed text-[hsl(var(--stage-ttc-text-soft))] whitespace-pre-line break-words">
                    {sources}
                  </p>
                </details>
              )}
            </div>
          )}

          <div className="mt-5 flex flex-wrap gap-2.5">
            {(answer || error) && !isLoading ? (
              <>
                <button type="button" onClick={continueInAsk} className={TTC_OUTLINE_PILL}>
                  Continue in Ask <ArrowRight size={14} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={askSomethingElse}
                  className={TTC_OUTLINE_PILL}
                >
                  Ask something else
                </button>
              </>
            ) : (
              !isLoading && (
                <button type="button" onClick={openFullAsk} className={TTC_OUTLINE_PILL}>
                  Open the full Ask page <ArrowRight size={14} aria-hidden="true" />
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TTCAskCompanionCard;

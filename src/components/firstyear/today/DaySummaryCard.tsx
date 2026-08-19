import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { useAISearch } from "@/hooks/useAISearch";
import { useCompanionIdentity } from "@/hooks/useCompanionIdentity";
import {
  FY_CARD_RADIUS,
  FY_FOCUS_RING,
  FY_KICKER,
  FY_SHADOW_SOFT,
} from "@/components/firstyear/journey/firstYearStyles";
import {
  buildDayRhythmDigest,
  buildDaySummaryQuery,
} from "@/lib/firstYearDaySummaryPrompt";
import { buildFirstYearCompanionContext } from "@/lib/firstYearCompanionContext";
import type { CareEvent } from "@/lib/firstYearCareEventsSchema";

const DEFAULT_COMPANION = "Cindy";

type Props = {
  /** Today's care events, already scoped to the chosen baby where relevant. */
  events: CareEvent[];
  /** The selected day, as a plain date key. */
  day: string;
  /** Neutral labels only, such as Baby 1. Real names never leave the page. */
  babyLabels: Record<string, string>;
  /** First baby's date of birth, used only for a coarse age band. */
  dateOfBirth?: string | null;
  babyCount: number;
};

/** Strips any trailing sources block the shared answer format may add. */
const splitSources = (raw: string) => {
  const match = raw.match(/\n\s*(?:#+\s*)?(?:sources?|references?)\s*:?\s*\n/i);
  if (!match || match.index === undefined) return raw;
  return raw.slice(0, match.index).trim();
};

/**
 * The shared companion endpoint appends who to contact wording to every answer.
 * A day recap is a look back, so that wording is removed here and the fixed page
 * footer carries it instead.
 */
const CONTACT_WORDING = /\b(nhs 111|999|a&e|emergency services|call your (midwife|gp)|speak to your (midwife|gp|health visitor)|contact your (midwife|gp|health visitor|maternity))/i;

const stripContactWording = (body: string) =>
  body
    .split(/\n{2,}/)
    .map((block) =>
      block
        .split("\n")
        .filter((line) => !CONTACT_WORDING.test(line))
        .join("\n")
        .trim(),
    )
    .filter(Boolean)
    .join("\n\n")
    .trim();

const renderLines = (body: string) =>
  body
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, i) => (
      <p key={i}>
        {line.replace(/^#+\s*/, "").replace(/^[*-]\s+/, "• ").replace(/\*\*/g, "")}
      </p>
    ));

/**
 * The consent-based day recap. Nothing is built or sent until the parent taps
 * "Summarise today": there is no effect, no timer and no background call. The
 * payload carries only today's logged care events with neutral baby labels.
 */
const DaySummaryCard = ({ events, day, babyLabels, dateOfBirth, babyCount }: Props) => {
  const { name, tone } = useCompanionIdentity();
  const { answer, isLoading, error, ask } = useAISearch();
  const [generatedAt, setGeneratedAt] = useState<string | null>(null);

  const companion = name?.trim() || DEFAULT_COMPANION;
  const hasEvents = events.length > 0;

  const summarise = () => {
    if (!hasEvents || isLoading) return;
    const digest = buildDayRhythmDigest(events, day, { babyLabels });
    const query = buildDaySummaryQuery(digest);
    const context = buildFirstYearCompanionContext({
      dateOfBirth,
      babyCount,
      tone,
      pageHint: "The person is looking back over one logged day on their Today page.",
    });
    setGeneratedAt("Generated just now");
    ask(query, context);
  };

  const body = splitSources(answer);

  return (
    <section className="pb-8" aria-labelledby="fy-day-summary-heading">
      <div
        className={`${FY_CARD_RADIUS} border px-5 py-6 sm:px-6`}
        style={{
          borderColor: "hsl(var(--sage) / 0.34)",
          backgroundColor: "hsl(var(--sage-bg) / 0.7)",
          boxShadow: FY_SHADOW_SOFT,
        }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span
            className={FY_KICKER}
            style={{ color: "hsl(var(--parchment))", backgroundColor: "hsl(var(--sage))" }}
          >
            {companion}
          </span>
        </div>

        <h2
          id="fy-day-summary-heading"
          className="font-serif text-[1.28rem] leading-[1.25] text-foreground mb-2"
        >
          Look back with {companion}
        </h2>
        <p className="font-sans text-[13.5px] leading-[1.65] text-[hsl(var(--stage-firstyear-text))] mb-4 max-w-[54ch]">
          {companion} can use today's logged feeds, sleep, nappies and moments to write a short
          recap.
        </p>

        {!hasEvents ? (
          <p className="font-sans text-[13px] leading-[1.65] text-[hsl(var(--stage-firstyear-text-soft))]">
            Add a feed, sleep, nappy or moment first, then {companion} can help you look back.
          </p>
        ) : (
          <>
            <p className="font-sans text-[12.5px] leading-[1.6] text-[hsl(var(--stage-firstyear-text-soft))] mb-4">
              Nothing is sent until you ask.
            </p>
            <button
              type="button"
              onClick={summarise}
              disabled={isLoading}
              className={`inline-flex min-h-11 items-center gap-2 rounded-pill px-6 py-2.5 font-sans text-[14px] font-semibold transition-opacity hover:opacity-90 disabled:opacity-60 ${FY_FOCUS_RING}`}
              style={{ backgroundColor: "hsl(var(--sage))", color: "hsl(var(--parchment))" }}
            >
              {isLoading ? (
                <Loader2 size={15} strokeWidth={1.8} className="animate-spin" aria-hidden="true" />
              ) : (
                <Sparkles size={15} strokeWidth={1.8} aria-hidden="true" />
              )}
              {answer || error ? "Try again" : "Summarise today"}
            </button>
          </>
        )}

        <div aria-live="polite">
          {isLoading && !answer && (
            <p className="mt-4 font-sans text-[13.5px] leading-[1.65] text-[hsl(var(--stage-firstyear-text))]">
              {companion} is looking over today's rhythm…
            </p>
          )}

          {body && (
            <div
              className="mt-5 rounded-[18px] border px-4 py-4 sm:px-5"
              style={{
                borderColor: "hsl(var(--sage) / 0.28)",
                backgroundColor: "hsl(var(--stage-firstyear-cream))",
              }}
            >
              <p className="font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-[hsl(var(--stage-firstyear-text-soft))] mb-2">
                {companion}
              </p>
              <div className="space-y-2.5 font-sans text-[14px] leading-[1.7] text-[hsl(var(--stage-firstyear-text))]">
                {renderLines(body)}
              </div>
              {generatedAt && !isLoading && (
                <p className="mt-3 font-sans text-[12px] text-[hsl(var(--stage-firstyear-text-soft))]">
                  {generatedAt}
                </p>
              )}
            </div>
          )}

          {error && !isLoading && (
            <p className="mt-4 font-sans text-[13.5px] leading-[1.65] text-[hsl(var(--stage-firstyear-text))]">
              {companion} could not summarise today just now. Try again in a moment.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default DaySummaryCard;

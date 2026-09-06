/**
 * AIC-J4 — a contextual entry point into the one companion panel.
 *
 * This card no longer answers anything itself: no model call, no transcript,
 * no answer rendering. It hands the panel entry provenance (first year, this
 * stage) and presentation-only suggestions. Nothing is sent automatically, and
 * no private saved detail travels with the hand-off.
 */

import { Sparkles } from "lucide-react";
import { useCompanionIdentity } from "@/hooks/useCompanionIdentity";
import { toneLabel } from "@/lib/companion";
import {
  companionAskLabel,
  companionSentenceSubject,
} from "@/lib/companion/companionName";
import AskAboutThis from "@/components/companion/AskAboutThis";
import { FY_INTRO, FY_KICKER, FY_SHADOW_SOFT } from "./firstYearStyles";

type Props = {
  /** First baby's date of birth, used only for a coarse age band. */
  dateOfBirth?: string | null;
  babyCount: number;
};

const SUGGESTIONS = [
  "What can I expect around this age?",
  "What could I ask at the next check-up?",
  "How do I look after myself this week?",
];

const FirstYearAskCompanion = ({ dateOfBirth, babyCount }: Props) => {
  void dateOfBirth;
  void babyCount;
  const { name, tone } = useCompanionIdentity();

  const companion = companionSentenceSubject(name);
  const askLabel = companionAskLabel(name);

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
                {askLabel}
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
              {askLabel} about this stage
            </h2>
            <p className={`${FY_INTRO} max-w-[46ch] mb-5`}>
              {companion} opens beside this page and answers from general guidance
              only. Nothing private you have saved is read.
            </p>

            <AskAboutThis
              label={askLabel}
              entry={{ stage: "first-year", title: "First year" }}
              suggestions={SUGGESTIONS}
              description={`${companion} does not replace your midwife, GP or health visitor.`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FirstYearAskCompanion;

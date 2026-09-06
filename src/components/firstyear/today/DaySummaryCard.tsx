/**
 * AIC-J4 (closure) — the day recap is now an entry point, not an answer surface.
 *
 * Tapping "Look back over today" hands off to the one shared companion panel
 * with entry provenance for the Today page. This file calls no model, holds no
 * conversation state, renders no assistant answer and sends no hidden user
 * message. Logged care events never leave the page from here.
 */

import { MessageCircle } from "lucide-react";
import { useCompanionIdentity } from "@/hooks/useCompanionIdentity";
import { companionSentenceSubject } from "@/lib/companion/companionName";
import { useCompanionEntryHandoff } from "@/components/companion/useCompanionEntryHandoff";
import { useNavigate } from "react-router-dom";
import {
  FY_CARD_RADIUS,
  FY_FOCUS_RING,
  FY_KICKER,
  FY_SHADOW_SOFT,
} from "@/components/firstyear/journey/firstYearStyles";
import type { CareEvent } from "@/lib/firstYearCareEventsSchema";

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

/** Presentation-only starters. Never auto-sent, never persisted. */
const SUGGESTIONS = [
  "Help me look back over today",
  "Is this rhythm normal at this age?",
  "What might tonight look like?",
];

const DaySummaryCard = ({ events }: Props) => {
  const { name } = useCompanionIdentity();
  const handoff = useCompanionEntryHandoff();
  const navigate = useNavigate();

  const companion = companionSentenceSubject(name);
  const hasEvents = events.length > 0;

  const open = () => {
    const entry = {
      stage: "first-year",
      journey: "first_year",
      topic: "today",
      title: "Today",
    };
    if (handoff) {
      handoff({ entry, suggestions: SUGGESTIONS });
      return;
    }
    navigate("/ask?stage=first-year&topic=today");
  };

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
          Open {companion} here on the page when you want to talk through how today went.
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
              onClick={open}
              className={`inline-flex min-h-11 items-center gap-2 rounded-pill px-6 py-2.5 font-sans text-[14px] font-semibold transition-opacity hover:opacity-90 ${FY_FOCUS_RING}`}
              style={{ backgroundColor: "hsl(var(--sage))", color: "hsl(var(--parchment))" }}
            >
              <MessageCircle size={15} strokeWidth={1.8} aria-hidden="true" />
              Look back over today
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default DaySummaryCard;

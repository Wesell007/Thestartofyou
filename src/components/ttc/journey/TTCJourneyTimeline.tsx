import { format, isBefore, isSameDay } from "date-fns";
import type { ActiveTTCJourney } from "@/lib/savedTTCJourney";
import { parseDateOnly } from "@/lib/dateOnly";
import {
  TTC_EYEBROW,
  TTC_HELPER,
  TTC_INNER_RADIUS,
  TTC_PAPER_CARD,
} from "@/components/ttc/journey/ttcStyles";
import {
  TTCBotanicalSprig,
  TTCWatercolourWash,
} from "@/components/ttc/journey/TTCDecor";

/**
 * Phase 28C — the cycle path.
 *
 * A soft journey through the milestones already saved with the journey, rather
 * than a chart. Presentation only: no dates are calculated here and nothing
 * implies certainty.
 */

type Milestone = {
  key: string;
  label: string;
  dateIso: string | null;
};

type Props = { journey: ActiveTTCJourney };

const parse = (iso: string | null): Date | null => parseDateOnly(iso);
const dateLabel = (iso: string | null, pattern: string) => {
  const parsed = parse(iso);
  return parsed ? `around ${format(parsed, pattern)}` : "Not set yet";
};

const TTCJourneyTimeline = ({ journey }: Props) => {
  const milestones: Milestone[] = [
    { key: "period_started", label: "Period started", dateIso: journey.last_period_date },
    { key: "fertile_window", label: "Possible fertile window", dateIso: journey.fertile_window_start },
    { key: "ovulation", label: "Likely ovulation", dateIso: journey.likely_ovulation_date },
    { key: "two_week_wait", label: "Two-week wait", dateIso: journey.fertile_window_end },
    { key: "test_day", label: "Possible test day", dateIso: journey.possible_test_date },
    { key: "expected_period", label: "Expected period", dateIso: journey.expected_period_date },
  ];

  const anyDate = milestones.some((m) => m.dateIso);
  if (!anyDate) {
    return (
      <div
        className={`${TTC_INNER_RADIUS} border border-[hsl(var(--stage-ttc-edge))] bg-[hsl(var(--stage-ttc-cream-soft)/0.6)] px-5 py-5`}
      >
        <p className="font-serif italic text-[15px] leading-[1.6] text-[hsl(var(--stage-ttc-text-soft))]">
          Once your cycle details are saved, your path through this cycle will
          appear here as a gentle guide.
        </p>
      </div>
    );
  }

  const today = new Date();

  const passed = (iso: string | null) => {
    const d = parse(iso);
    return d ? isBefore(d, today) || isSameDay(d, today) : false;
  };

  // The last milestone whose date has already arrived is where the user may be
  // around now. Everything after it may still be ahead.
  let hereIndex = -1;
  milestones.forEach((m, i) => {
    if (m.dateIso && passed(m.dateIso)) hereIndex = i;
  });

  const state = (i: number): "behind" | "here" | "ahead" =>
    i === hereIndex ? "here" : i < hereIndex ? "behind" : "ahead";

  const dotStyle = (s: "behind" | "here" | "ahead") => ({
    background:
      s === "ahead"
        ? "hsl(var(--stage-ttc-olive) / 0.28)"
        : "hsl(var(--stage-ttc-olive))",
    boxShadow:
      s === "here" ? "0 0 0 5px hsl(var(--stage-ttc-olive) / 0.16)" : undefined,
  });

  return (
    <div className={`relative overflow-hidden ${TTC_PAPER_CARD} px-5 sm:px-7 py-6 sm:py-8`}>
      <TTCWatercolourWash className="-top-20 -right-16 w-[280px]" opacity={0.25} />
      <TTCBotanicalSprig className="-bottom-10 -left-8 w-[130px] -rotate-6" opacity={0.18} />

      <div className="relative">
        <p className={`${TTC_EYEBROW} mb-2`}>Your cycle path</p>
        <p className={`${TTC_HELPER} mb-6 max-w-[52ch]`}>
          A soft sense of where you may be and what may come next, based on the
          dates you saved.
        </p>

        {/* Desktop path */}
        <div className="hidden md:flex items-start gap-2">
          {milestones.map((m, idx) => {
            const s = state(idx);
            return (
              <div key={m.key} className="flex-1 min-w-0">
                <div className="flex items-center">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={dotStyle(s)}
                  />
                  {idx < milestones.length - 1 && (
                    <span
                      className="flex-1 h-px"
                      style={{
                        background:
                          s === "ahead"
                            ? "hsl(var(--stage-ttc-olive) / 0.16)"
                            : "hsl(var(--stage-ttc-olive) / 0.32)",
                      }}
                    />
                  )}
                </div>
                <div className="mt-3 pr-3">
                  {s === "here" && (
                    <p className="font-sans text-[9.5px] font-medium tracking-[0.2em] uppercase text-[hsl(var(--stage-ttc-olive))] mb-1">
                      You may be here
                    </p>
                  )}
                  <p
                    className={`font-sans text-[11px] leading-snug ${
                      s === "ahead"
                        ? "font-light text-[hsl(var(--stage-ttc-text-soft))]"
                        : "font-medium text-[hsl(var(--stage-ttc-text))]"
                    }`}
                  >
                    {m.label}
                  </p>
                  <p className="font-serif text-[13px] text-[hsl(var(--stage-ttc-text-soft))] mt-0.5">
                    {dateLabel(m.dateIso, "d MMM")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile path */}
        <ol className="relative md:hidden">
          <span
            aria-hidden="true"
            className="absolute left-[3.5px] top-2 bottom-2 w-px"
            style={{ background: "hsl(var(--stage-ttc-olive) / 0.2)" }}
          />
          {milestones.map((m, idx) => {
            const s = state(idx);
            return (
              <li key={m.key} className="relative flex items-start gap-3.5 pb-4 last:pb-0">
                <span
                  className="relative mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
                  style={dotStyle(s)}
                />
                <div className="flex-1 min-w-0">
                  {s === "here" && (
                    <p className="font-sans text-[9.5px] font-medium tracking-[0.2em] uppercase text-[hsl(var(--stage-ttc-olive))] mb-0.5">
                      You may be here
                    </p>
                  )}
                  <p
                    className={`font-sans text-[12.5px] leading-snug ${
                      s === "ahead"
                        ? "font-light text-[hsl(var(--stage-ttc-text-soft))]"
                        : "font-medium text-[hsl(var(--stage-ttc-text))]"
                    }`}
                  >
                    {m.label}
                  </p>
                  <p className="font-serif text-[13px] text-[hsl(var(--stage-ttc-text-soft))]">
                    {dateLabel(m.dateIso, "EEE d MMM")}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default TTCJourneyTimeline;

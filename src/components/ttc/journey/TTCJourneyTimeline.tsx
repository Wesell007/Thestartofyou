import { format, isAfter, isBefore } from "date-fns";
import type { ActiveTTCJourney } from "@/lib/savedTTCJourney";
import { parseDateOnly } from "@/lib/dateOnly";
import {
  TTC_EYEBROW,
  TTC_INNER_RADIUS,
  TTC_PAPER_CARD,
} from "@/components/ttc/journey/ttcStyles";
import { TTCWatercolourWash } from "@/components/ttc/journey/TTCDecor";

/**
 * A calm, non-clinical visual of the cycle milestones. Horizontal on
 * desktop, stacked on mobile. No day-by-day cells, no logging.
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
  return parsed ? format(parsed, pattern) : "Not set yet";
};

const TTCJourneyTimeline = ({ journey }: Props) => {
  const milestones: Milestone[] = [
    { key: "period_started", label: "Period started", dateIso: journey.last_period_date },
    { key: "fertile_window", label: "Possible fertile window", dateIso: journey.fertile_window_start },
    { key: "ovulation", label: "Likely ovulation", dateIso: journey.likely_ovulation_date },
    {
      key: "two_week_wait",
      label: "Two-week wait",
      dateIso: journey.fertile_window_end,
    },
    { key: "test_day", label: "Possible test day", dateIso: journey.possible_test_date },
    { key: "expected_period", label: "Expected period", dateIso: journey.expected_period_date },
  ];

  const anyDate = milestones.some((m) => m.dateIso);
  if (!anyDate) {
    return (
      <div className={`${TTC_INNER_RADIUS} border border-[hsl(var(--stage-ttc-edge))] bg-[hsl(var(--stage-ttc-cream-soft)/0.6)] px-5 py-5`}>
        <p className="font-serif italic text-[15px] leading-[1.6] text-[hsl(var(--stage-ttc-text-soft))]">
          Once your cycle details are saved, your key milestones will appear
          here as a gentle guide.
        </p>
      </div>
    );
  }

  const today = new Date();

  const isPast = (iso: string | null) => {
    const d = parse(iso);
    return d ? isBefore(d, today) : false;
  };
  const isFuture = (iso: string | null) => {
    const d = parse(iso);
    return d ? isAfter(d, today) : false;
  };

  return (
    <div className={`relative overflow-hidden ${TTC_PAPER_CARD} px-5 sm:px-7 py-6 sm:py-8`}>
      <TTCWatercolourWash className="-top-20 -right-16 w-[280px]" opacity={0.25} />
      <p className={`${TTC_EYEBROW} relative mb-5`}>Your cycle path</p>

      {/* Desktop horizontal */}
      <div className="relative hidden md:flex items-start gap-2">
        {milestones.map((m, idx) => {
          const past = isPast(m.dateIso);
          const future = isFuture(m.dateIso);
          const dot = past
            ? "hsl(var(--stage-ttc-olive))"
            : future
            ? "hsl(var(--stage-ttc-olive) / 0.35)"
            : "hsl(var(--stage-ttc-olive))";
          return (
            <div key={m.key} className="flex-1 min-w-0">
              <div className="flex items-center">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{
                    background: dot,
                    boxShadow: !past && !future ? "0 0 0 4px hsl(var(--stage-ttc-olive) / 0.15)" : undefined,
                  }}
                />
                {idx < milestones.length - 1 && (
                  <span
                    className="flex-1 h-px"
                    style={{ background: "hsl(var(--stage-ttc-olive) / 0.2)" }}
                  />
                )}
              </div>
              <div className="mt-3 pr-3">
                <p className="font-sans text-[11px] font-medium text-[hsl(var(--stage-ttc-text))] leading-snug">
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

      {/* Mobile stacked */}
      <ol className="relative md:hidden space-y-3.5">
        {milestones.map((m) => {
          const past = isPast(m.dateIso);
          return (
            <li key={m.key} className="flex items-start gap-3">
              <span
                className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
                style={{
                  background: past
                    ? "hsl(var(--stage-ttc-olive))"
                    : "hsl(var(--stage-ttc-olive) / 0.45)",
                }}
              />
              <div className="flex-1">
                <p className="font-sans text-[12.5px] font-medium text-[hsl(var(--stage-ttc-text))] leading-snug">
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
  );
};

export default TTCJourneyTimeline;

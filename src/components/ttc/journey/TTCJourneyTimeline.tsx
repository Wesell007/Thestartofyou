import { format, isAfter, isBefore } from "date-fns";
import type { ActiveTTCJourney } from "@/lib/savedTTCJourney";
import { parseDateOnly } from "@/lib/dateOnly";

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
      <div
        className="rounded-[18px] px-5 py-5 keepsake-surface"
        style={{ borderColor: "hsl(var(--stage-ttc-accent) / 0.16)" }}
      >
        <p className="font-serif italic text-foreground/68 text-[15px] leading-[1.6]">
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
    <div
      className="rounded-[20px] px-5 sm:px-6 py-6 sm:py-7 keepsake-surface"
      style={{ borderColor: "hsl(var(--stage-ttc-accent) / 0.16)" }}
    >
      <p
        className="font-sans text-[10px] font-medium tracking-[0.3em] uppercase mb-4"
        style={{ color: "hsl(var(--stage-ttc-accent))" }}
      >
        This cycle at a glance
      </p>

      {/* Desktop horizontal */}
      <div className="hidden md:flex items-start gap-2 relative">
        {milestones.map((m, idx) => {
          const past = isPast(m.dateIso);
          const future = isFuture(m.dateIso);
          const dot = past
            ? "hsl(var(--stage-ttc-accent))"
            : future
            ? "hsl(var(--stage-ttc-accent) / 0.35)"
            : "hsl(var(--stage-ttc-accent))";
          return (
            <div key={m.key} className="flex-1 min-w-0">
              <div className="flex items-center">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{
                    background: dot,
                    boxShadow: !past && !future ? "0 0 0 4px hsl(var(--stage-ttc-accent) / 0.15)" : undefined,
                  }}
                />
                {idx < milestones.length - 1 && (
                  <span
                    className="flex-1 h-px"
                    style={{ background: "hsl(var(--stage-ttc-accent) / 0.2)" }}
                  />
                )}
              </div>
              <div className="mt-3 pr-3">
                <p className="font-sans text-[11px] font-medium text-foreground/75 leading-snug">
                  {m.label}
                </p>
                <p className="font-serif text-[13px] text-foreground/60 mt-0.5">
                  {dateLabel(m.dateIso, "d MMM")}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile stacked */}
      <ol className="md:hidden space-y-3">
        {milestones.map((m) => {
          const past = isPast(m.dateIso);
          return (
            <li key={m.key} className="flex items-start gap-3">
              <span
                className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
                style={{
                  background: past
                    ? "hsl(var(--stage-ttc-accent))"
                    : "hsl(var(--stage-ttc-accent) / 0.45)",
                }}
              />
              <div className="flex-1">
                <p className="font-sans text-[12.5px] font-medium text-foreground/80 leading-snug">
                  {m.label}
                </p>
                <p className="font-serif text-[13px] text-foreground/60">
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

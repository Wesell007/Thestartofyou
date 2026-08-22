import { format } from "date-fns";
import { stageLabel, type TTCStage } from "@/lib/ttcDerived";
import type { ActiveTTCJourney } from "@/lib/savedTTCJourney";
import {
  TTC_EYEBROW,
  TTC_HELPER,
  TTC_INNER_RADIUS,
} from "@/components/ttc/journey/ttcStyles";

/**
 * Phase 28C — quiet cycle details.
 *
 * The same cycle-timing values as before, presented as supporting detail
 * beneath the Today card and cycle path rather than as the lead surface.
 * Only shows non-sensitive, cycle-timing values. Setup answers such as
 * treatment status, symptom tracking preferences and ovulation-test
 * preferences are deliberately not surfaced here.
 */

type Props = {
  journey: ActiveTTCJourney;
  cycleDay: number | null;
  stage: TTCStage | null;
};

const fmt = (iso: string | null): string => {
  if (!iso) return "Not set yet";
  try {
    return format(new Date(iso), "d MMM");
  } catch {
    return "Not set yet";
  }
};

const fmtRange = (a: string | null, b: string | null): string => {
  if (!a || !b) return "Not set yet";
  try {
    return `${format(new Date(a), "d MMM")} to ${format(new Date(b), "d MMM")}`;
  } catch {
    return "Not set yet";
  }
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-baseline justify-between gap-4 py-2.5 border-b border-[hsl(var(--stage-ttc-olive)/0.12)] last:border-b-0">
    <p className="font-sans text-[12.5px] font-light text-[hsl(var(--stage-ttc-text-soft))]">
      {label}
    </p>
    <p className="font-serif text-[14.5px] leading-snug text-[hsl(var(--stage-ttc-text))] text-right">
      {value}
    </p>
  </div>
);

const TTCJourneySummary = ({ journey, cycleDay, stage }: Props) => {
  return (
    <div
      className={`${TTC_INNER_RADIUS} border border-[hsl(var(--stage-ttc-edge)/0.7)] bg-[hsl(var(--stage-ttc-cream-soft)/0.45)] px-5 sm:px-6 py-5 sm:py-6`}
    >
      <p className={`${TTC_EYEBROW} mb-1`}>Cycle details</p>
      <p className={`${TTC_HELPER} mb-4 max-w-[52ch]`}>
        The dates you saved, if you want to look a little closer.
      </p>
      <div className="grid gap-x-8 sm:grid-cols-2">
        <div>
          <Row label="Cycle day" value={cycleDay ? String(cycleDay) : "Not set yet"} />
          <Row label="Where you may be" value={stageLabel(stage)} />
          <Row
            label="Possible fertile window"
            value={fmtRange(journey.fertile_window_start, journey.fertile_window_end)}
          />
        </div>
        <div>
          <Row label="Likely ovulation" value={fmt(journey.likely_ovulation_date)} />
          <Row label="Expected period" value={fmt(journey.expected_period_date)} />
          <Row label="Possible test day" value={fmt(journey.possible_test_date)} />
        </div>
      </div>
    </div>
  );
};

export default TTCJourneySummary;

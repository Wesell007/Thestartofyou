import { format } from "date-fns";
import { stageLabel, type TTCStage } from "@/lib/ttcDerived";
import type { ActiveTTCJourney } from "@/lib/savedTTCJourney";
import {
  TTC_EYEBROW,
  TTC_HELPER,
  TTC_INNER_RADIUS,
  TTC_PAPER_CARD,
} from "@/components/ttc/journey/ttcStyles";
import { TTCBotanicalSprig } from "@/components/ttc/journey/TTCDecor";

/**
 * Cycle overview tiles for the TTC journey.
 *
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

const Tile = ({ label, value }: { label: string; value: string }) => (
  <div
    className={`${TTC_INNER_RADIUS} border border-[hsl(var(--stage-ttc-edge)/0.75)] bg-[hsl(var(--stage-ttc-cream-soft)/0.55)] px-4 py-4 sm:px-5 sm:py-5`}
  >
    <p className="font-sans text-[10px] font-medium tracking-[0.24em] uppercase text-[hsl(var(--stage-ttc-olive))] mb-2">
      {label}
    </p>
    <p className="font-serif text-[16.5px] sm:text-[17.5px] leading-snug text-[hsl(var(--stage-ttc-text))]">
      {value}
    </p>
  </div>
);

const TTCJourneySummary = ({ journey, cycleDay, stage }: Props) => {
  return (
    <div className={`relative overflow-hidden ${TTC_PAPER_CARD} px-5 sm:px-7 py-7 sm:py-8`}>
      <TTCBotanicalSprig
        className="-top-6 -right-8 w-[150px] rotate-[8deg]"
        opacity={0.22}
      />
      <div className="relative">
        <p className={`${TTC_EYEBROW} mb-1`}>This cycle</p>
        <p className={`${TTC_HELPER} mb-5 max-w-[52ch]`}>
          A gentle picture of where you may be, based on the dates you saved.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          <Tile label="Cycle day" value={cycleDay ? String(cycleDay) : "Not set yet"} />
          <Tile label="Where you may be" value={stageLabel(stage)} />
          <Tile
            label="Possible fertile window"
            value={fmtRange(journey.fertile_window_start, journey.fertile_window_end)}
          />
          <Tile label="Likely ovulation" value={fmt(journey.likely_ovulation_date)} />
          <Tile label="Expected period" value={fmt(journey.expected_period_date)} />
          <Tile label="Possible test day" value={fmt(journey.possible_test_date)} />
        </div>
      </div>
    </div>
  );
};

export default TTCJourneySummary;

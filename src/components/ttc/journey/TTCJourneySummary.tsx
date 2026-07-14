import { format } from "date-fns";
import { stageLabel, type TTCStage } from "@/lib/ttcDerived";
import type { ActiveTTCJourney } from "@/lib/savedTTCJourney";

/**
 * Six-card summary grid for the TTC dashboard.
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

const Card = ({ label, value }: { label: string; value: string }) => (
  <div
    className="rounded-[18px] px-5 py-5 keepsake-surface"
    style={{ borderColor: "hsl(var(--stage-ttc-accent) / 0.16)" }}
  >
    <p
      className="font-sans text-[10px] font-medium tracking-[0.3em] uppercase mb-2"
      style={{ color: "hsl(var(--stage-ttc-accent))" }}
    >
      {label}
    </p>
    <p className="font-serif text-[17px] leading-snug text-foreground/85">
      {value}
    </p>
  </div>
);

const TTCJourneySummary = ({ journey, cycleDay, stage }: Props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
      <Card label="Cycle day" value={cycleDay ? String(cycleDay) : "Not set yet"} />
      <Card label="Current stage" value={stageLabel(stage)} />
      <Card
        label="Possible fertile window"
        value={fmtRange(journey.fertile_window_start, journey.fertile_window_end)}
      />
      <Card label="Likely ovulation" value={fmt(journey.likely_ovulation_date)} />
      <Card label="Expected period" value={fmt(journey.expected_period_date)} />
      <Card label="Possible test day" value={fmt(journey.possible_test_date)} />
    </div>
  );
};

export default TTCJourneySummary;

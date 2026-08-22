import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { differenceInCalendarDays, format } from "date-fns";
import type { TTCStage } from "@/lib/ttcDerived";
import type { ActiveTTCJourney } from "@/lib/savedTTCJourney";
import { parseDateOnly } from "@/lib/dateOnly";
import {
  TTC_CARD_PAD,
  TTC_EYEBROW,
  TTC_HEADING,
  TTC_PAPER_CARD_WARM,
  TTC_QUIET_LINK,
  TTC_SOFT_PILL,
} from "@/components/ttc/journey/ttcStyles";
import {
  TTCBotanicalLeaf,
  TTCWatercolourWash,
} from "@/components/ttc/journey/TTCDecor";

/**
 * Phase 28C — the Today-first lead surface for the signed-in TTC journey.
 *
 * Presentation only. Every value here comes from data the page has already
 * derived (stage, cycle day and the dates saved during setup). Nothing is
 * calculated, stored or interpreted here, and no wording implies certainty.
 */

type Action =
  | { kind: "note"; label: string }
  | { kind: "link"; label: string; href: string };

type StageCopy = {
  headline: string;
  support: string;
  action: Action;
  secondary: { label: string; href: string };
};

const STAGE_COPY: Record<TTCStage, StageCopy> = {
  before_ovulation: {
    headline: "You may be getting to know this cycle",
    support: "You do not need to work everything out today.",
    action: { kind: "note", label: "Add a note" },
    secondary: {
      label: "Read about cycle tracking",
      href: "/trying-to-conceive/cycle-tracking",
    },
  },
  fertile_window: {
    headline: "You may be near a possible fertile window",
    support: "Use what helps and leave the rest.",
    action: { kind: "note", label: "Add a note" },
    secondary: {
      label: "Read about ovulation",
      href: "/trying-to-conceive/ovulation",
    },
  },
  likely_ovulation: {
    headline: "Ovulation may be around now",
    support: "These dates are estimates, not certainties.",
    action: { kind: "note", label: "Add a note" },
    secondary: {
      label: "Read about ovulation signs",
      href: "/articles/ovulation-signs",
    },
  },
  two_week_wait: {
    headline: "You may be moving through the waiting part",
    support: "One useful note can be enough.",
    action: { kind: "note", label: "Add a note" },
    secondary: {
      label: "Ask what to do next",
      href: "/ask?stage=ttc&topic=two-week-wait",
    },
  },
  test_window: {
    headline: "You may be near a possible test day",
    support: "There is no rush. You can test when you feel ready.",
    action: {
      kind: "link",
      label: "Read test guidance",
      href: "/trying-to-conceive/pregnancy-tests",
    },
    secondary: {
      label: "Ask what to do next",
      href: "/ask?stage=ttc&topic=pregnancy-tests",
    },
  },
  expected_period: {
    headline: "Your period may be around now",
    support: "Whatever this cycle brings, you can take it slowly.",
    action: {
      kind: "link",
      label: "Update this cycle",
      href: "/setup/trying-to-conceive",
    },
    secondary: {
      label: "Read test guidance",
      href: "/trying-to-conceive/pregnancy-tests",
    },
  },
};

type Detail = { label: string; value: string };

const parse = (iso: string | null | undefined) => parseDateOnly(iso ?? null);

const buildDetails = (
  journey: ActiveTTCJourney,
  cycleDay: number | null,
): Detail[] => {
  const details: Detail[] = [];
  if (cycleDay) details.push({ label: "Cycle day", value: String(cycleDay) });

  const today = new Date();
  const upcoming: Array<{ label: string; iso: string | null }> = [
    { label: "possible fertile window", iso: journey.fertile_window_start },
    { label: "likely ovulation", iso: journey.likely_ovulation_date },
    { label: "possible test day", iso: journey.possible_test_date },
    { label: "expected period", iso: journey.expected_period_date },
  ];

  const next = upcoming
    .map((m) => ({ ...m, date: parse(m.iso) }))
    .filter((m) => m.date && differenceInCalendarDays(m.date as Date, today) >= 0)
    .sort((a, b) => (a.date as Date).getTime() - (b.date as Date).getTime())[0];

  if (next?.date) {
    const days = differenceInCalendarDays(next.date, today);
    details.push({
      label: `Next: ${next.label}`,
      value:
        days === 0
          ? "around today"
          : days === 1
          ? "around tomorrow"
          : `around ${format(next.date, "d MMM")}`,
    });
  }

  const lmp = parse(journey.last_period_date);
  if (lmp && details.length < 3) {
    details.push({ label: "Cycle started", value: format(lmp, "d MMM") });
  }

  return details.slice(0, 3);
};

type Props = {
  journey: ActiveTTCJourney;
  stage: TTCStage | null;
  cycleDay: number | null;
  onAddNote: () => void;
};

const TTCTodayCard = ({ journey, stage, cycleDay, onAddNote }: Props) => {
  const copy = STAGE_COPY[stage ?? "before_ovulation"];
  const details = buildDetails(journey, cycleDay);

  return (
    <section
      className={`relative overflow-hidden ${TTC_PAPER_CARD_WARM} ${TTC_CARD_PAD}`}
      aria-labelledby="ttc-today-heading"
    >
      <TTCWatercolourWash className="-top-24 -left-20 w-[320px]" opacity={0.3} />
      <TTCBotanicalLeaf className="-bottom-12 -right-8 w-[150px]" opacity={0.22} />

      <div className="relative">
        <p className={`${TTC_EYEBROW} mb-3`}>Today</p>
        <h2
          id="ttc-today-heading"
          className={`${TTC_HEADING} text-[25px] sm:text-[28px] mb-3 max-w-[22ch]`}
        >
          {copy.headline}
        </h2>
        <p className="font-serif italic text-[16px] sm:text-[17px] leading-[1.65] text-[hsl(var(--stage-ttc-text-soft))] max-w-[46ch] mb-6">
          {copy.support}
        </p>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mb-6">
          {copy.action.kind === "note" ? (
            <button type="button" onClick={onAddNote} className={TTC_SOFT_PILL}>
              {copy.action.label} <ArrowRight size={14} aria-hidden="true" />
            </button>
          ) : (
            <Link to={copy.action.href} className={TTC_SOFT_PILL}>
              {copy.action.label} <ArrowRight size={14} aria-hidden="true" />
            </Link>
          )}
          <Link to={copy.secondary.href} className={TTC_QUIET_LINK}>
            {copy.secondary.label}
          </Link>
        </div>

        {details.length > 0 && (
          <ul className="flex flex-wrap gap-x-7 gap-y-3 border-t border-[hsl(var(--stage-ttc-olive)/0.16)] pt-4">
            {details.map((d) => (
              <li key={d.label} className="min-w-0">
                <p className="font-sans text-[10px] font-medium tracking-[0.22em] uppercase text-[hsl(var(--stage-ttc-olive))]">
                  {d.label}
                </p>
                <p className="font-serif text-[15px] leading-snug text-[hsl(var(--stage-ttc-text))]">
                  {d.value}
                </p>
              </li>
            ))}
          </ul>
        )}

        <p className="font-sans text-[12.5px] leading-[1.6] text-[hsl(var(--stage-ttc-text-soft))] mt-4">
          Based on the dates you saved. Cycles can vary from month to month.
        </p>
      </div>
    </section>
  );
};

export default TTCTodayCard;

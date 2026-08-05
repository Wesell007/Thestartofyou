import { Link } from "react-router-dom";
import {
  babyAgeSentence,
  describeBabies,
  monthPageLabel,
  monthPagePath,
  type BabyForCopy,
} from "@/lib/firstYearCopy";
import { getFirstYearAge } from "@/lib/firstYearDates";

type Props = {
  babies: BabyForCopy[];
};

/**
 * Baby summary. Version one shows one shared summary for every baby, with
 * multiples acknowledged in the copy. No switcher, no per-baby dashboard.
 */
const BabySummaryCard = ({ babies }: Props) => {
  if (babies.length === 0) return null;
  const primary = babies[0];
  const age = getFirstYearAge(primary.date_of_birth);
  const monthIndex = age?.firstYearMonthIndex ?? 0;
  const subject = describeBabies(babies);

  return (
    <section className="pb-10">
      <div
        className="rounded-[22px] keepsake-surface px-6 sm:px-8 py-7 sm:py-8"
        style={{ borderColor: "hsl(var(--stage-firstyear-accent) / 0.2)" }}
      >
        <p
          className="font-sans text-[10.5px] font-medium tracking-[0.3em] uppercase mb-4"
          style={{ color: "hsl(var(--stage-firstyear-accent))" }}
        >
          {babies.length > 1 ? "Your babies" : "Your baby"}
        </p>
        <h2 className="font-serif text-[1.5rem] sm:text-[1.75rem] leading-[1.2] text-foreground/90 mb-2">
          {subject.charAt(0).toUpperCase() + subject.slice(1)}
        </h2>
        <p className="font-serif text-[15.5px] leading-[1.7] text-foreground/80 max-w-[48ch]">
          {babyAgeSentence(babies)}
        </p>
        {babies.length > 1 && (
          <p className="mt-3 font-sans text-[13px] leading-[1.6] text-foreground/60 max-w-[50ch]">
            Everything here is written for all {babies.length} of them.
          </p>
        )}
        <div className="mt-6">
          <Link
            to={monthPagePath(monthIndex)}
            className="inline-flex items-center rounded-pill border border-border/60 bg-parchment px-5 py-2.5 font-sans text-sm text-foreground/85 transition-colors hover:border-foreground/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            {monthPageLabel(monthIndex)}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BabySummaryCard;

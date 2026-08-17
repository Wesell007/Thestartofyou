import { Link } from "react-router-dom";
import {
  babyAgeSentence,
  describeBabies,
  monthPageLabel,
  monthPagePath,
  type BabyForCopy,
} from "@/lib/firstYearCopy";
import { getFirstYearAge } from "@/lib/firstYearDates";
import { FY_FOCUS_RING, FY_QUIET_LINK } from "./firstYearStyles";

type Props = {
  babies: BabyForCopy[];
  /** Companion name, already resolved with a fallback by the caller. */
  companionName: string;
};

/**
 * The top of the signed-in First Year home. One panel: who is here, how old
 * they are, and who is alongside you. The public hub link stays a quiet text
 * link so it cannot compete with today's note.
 */
const FirstYearHeroPanel = ({ babies, companionName }: Props) => {
  const subject = describeBabies(babies);
  const primary = babies[0];
  const monthIndex = primary
    ? getFirstYearAge(primary.date_of_birth)?.firstYearMonthIndex ?? 0
    : 0;

  return (
    <section className="pt-14 sm:pt-16 pb-8">
      <p
        className="font-sans text-[10.5px] font-medium tracking-[0.3em] uppercase mb-3"
        style={{ color: "hsl(var(--stage-firstyear-accent))" }}
      >
        Your first year
      </p>
      <h1 className="font-serif text-[1.9rem] sm:text-[2.4rem] leading-[1.14] text-foreground/90 mb-3">
        {subject.charAt(0).toUpperCase() + subject.slice(1)}
      </h1>
      {babies.length > 0 && (
        <p className="font-serif text-[16px] sm:text-[17px] leading-[1.7] text-foreground/80 max-w-[46ch]">
          {babyAgeSentence(babies)} You are in a new chapter too.
        </p>
      )}
      <p className="mt-3 font-sans text-[13.5px] leading-[1.7] text-foreground/65 max-w-[46ch]">
        {companionName} is here whenever you have a question.
      </p>
      {babies.length > 0 && (
        <p className="mt-1">
          <Link to={monthPagePath(monthIndex)} className={FY_QUIET_LINK}>
            {monthPageLabel(monthIndex)}
          </Link>
        </p>
      )}
      <p className="font-sans text-[13.5px] leading-[1.7] text-foreground/60">
        <Link
          to="/first-year"
          className={`inline-flex min-h-11 items-center rounded-sm underline underline-offset-4 decoration-border transition-colors hover:decoration-foreground/40 ${FY_FOCUS_RING}`}
        >
          Browse the First Year guide
        </Link>
      </p>
    </section>
  );
};

export default FirstYearHeroPanel;

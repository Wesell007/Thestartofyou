import { Link } from "react-router-dom";
import {
  babyAgeSentence,
  describeAge,
  describeBabies,
  monthPageLabel,
  monthPagePath,
  type BabyForCopy,
} from "@/lib/firstYearCopy";
import { getFirstYearAge } from "@/lib/firstYearDates";
import { FY_DISPLAY, FY_FOCUS_RING, FY_HELPER, FY_QUIET_LINK } from "./firstYearStyles";

type Props = {
  babies: BabyForCopy[];
  /** Companion name, already resolved with a fallback by the caller. */
  companionName: string;
};

/**
 * The top of the signed-in First Year home. A soft peach wash sits behind an
 * oversized serif name with the age set inline and smaller, so the page opens
 * as a personal app surface rather than an article header.
 */
const FirstYearHeroPanel = ({ babies, companionName }: Props) => {
  const subject = describeBabies(babies);
  const primary = babies[0];
  const monthIndex = primary
    ? getFirstYearAge(primary.date_of_birth)?.firstYearMonthIndex ?? 0
    : 0;
  const sharedAge = primary ? describeAge(primary.date_of_birth) : null;
  const showInlineAge = babies.length === 1 && Boolean(sharedAge);

  return (
    <section className="relative isolate mt-6 sm:mt-10 mb-2 rounded-[28px] px-5 sm:px-8 pt-16 sm:pt-20 pb-12 sm:pb-14">
      <FirstYearHeroDecor initial={primary?.name} />

      <div className="relative z-10 max-w-[34ch]">

        <p
          className="font-sans text-[10.5px] font-semibold tracking-[0.3em] uppercase mb-4"
          style={{ color: "hsl(var(--stage-firstyear-terracotta))" }}
        >
          Your first year
        </p>
        <h1 className={`${FY_DISPLAY} mb-3`}>
          {subject.charAt(0).toUpperCase() + subject.slice(1)}
          {showInlineAge && (
            <span
              className="ml-3 align-middle font-sans text-[14px] sm:text-[15px] font-medium tracking-normal"
              style={{ color: "hsl(var(--stage-firstyear-terracotta))" }}
            >
              {sharedAge}
            </span>
          )}
        </h1>
        {babies.length > 1 && (
          <p className="font-serif text-[16px] sm:text-[17px] leading-[1.7] text-foreground max-w-[46ch]">
            {babyAgeSentence(babies)}
          </p>
        )}
        <p className="font-serif text-[17px] sm:text-[18px] leading-[1.66] text-foreground max-w-[44ch]">
          You are in a new chapter too.
        </p>
        <p className={`mt-2.5 ${FY_HELPER} max-w-[46ch]`}>
          {companionName} is here whenever you have a question.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-5">
          {babies.length > 0 && (
            <Link to={monthPagePath(monthIndex)} className={FY_QUIET_LINK}>
              {monthPageLabel(monthIndex)}
            </Link>
          )}
          <Link
            to="/first-year"
            className={`inline-flex min-h-11 items-center rounded-sm font-sans text-[13.5px] font-medium text-[hsl(var(--stage-firstyear-text-soft))] underline underline-offset-4 decoration-[hsl(var(--stage-firstyear-text-soft)/0.5)] transition-colors hover:decoration-[hsl(var(--stage-firstyear-text))] ${FY_FOCUS_RING}`}
          >
            Browse the First Year guide
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FirstYearHeroPanel;

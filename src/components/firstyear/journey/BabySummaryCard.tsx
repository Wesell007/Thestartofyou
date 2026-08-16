import { Link } from "react-router-dom";
import {
  babyAgeSentence,
  describeBabies,
  monthPageLabel,
  monthPagePath,
  type BabyForCopy,
} from "@/lib/firstYearCopy";
import { getFirstYearAge } from "@/lib/firstYearDates";
import { FY_QUIET_LINK } from "./firstYearStyles";


type Props = {
  babies: BabyForCopy[];
};

/**
 * Baby summary. Version one shows one shared summary for every baby, with
 * multiples acknowledged in the copy. No switcher, no per-baby dashboard.
 * Lighter than the Today card on purpose, so the two read as a pairing with
 * today's note carrying the weight.
 */
const BabySummaryCard = ({ babies }: Props) => {
  if (babies.length === 0) return null;
  const primary = babies[0];
  const age = getFirstYearAge(primary.date_of_birth);
  const monthIndex = age?.firstYearMonthIndex ?? 0;
  const subject = describeBabies(babies);

  return (
    <section className="pb-6">
      <div
        className="rounded-[20px] border px-5 sm:px-7 py-5 sm:py-6"
        style={{
          borderColor: "hsl(var(--stage-firstyear-accent) / 0.16)",
          backgroundColor: "hsl(var(--stage-firstyear) / 0.45)",
        }}
      >
        <p
          className="font-sans text-[10.5px] font-medium tracking-[0.3em] uppercase mb-2.5"
          style={{ color: "hsl(var(--stage-firstyear-accent))" }}
        >
          {babies.length > 1 ? "Your babies" : "Your baby"}
        </p>
        <h2 className="font-serif text-[1.3rem] sm:text-[1.5rem] leading-[1.2] text-foreground/90 mb-1.5">
          {subject.charAt(0).toUpperCase() + subject.slice(1)}
        </h2>
        <p className="font-serif text-[15px] leading-[1.7] text-foreground/80 max-w-[48ch]">
          {babyAgeSentence(babies)}
        </p>
        <div className="mt-2">
          <Link
            to={monthPagePath(monthIndex)}
            className={FY_QUIET_LINK}
          >

            {monthPageLabel(monthIndex)}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BabySummaryCard;

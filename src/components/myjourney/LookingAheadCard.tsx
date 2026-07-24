import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getWeekIdentity } from "@/data/myWeekContent";
import { MAX_PREGNANCY_WEEK } from "@/data/weekData";

interface Props {
  currentWeek: number;
  /** Number of kept rows in the spine; used to tighten spacing in sparse states. */
  keptCount?: number;
}

const LookingAheadCard = ({ currentWeek, keptCount }: Props) => {
  const accent = "hsl(var(--stage-pregnancy-accent))";
  const nextWeek = currentWeek < MAX_PREGNANCY_WEEK ? currentWeek + 1 : null;
  const nextIdentity = nextWeek ? getWeekIdentity(nextWeek) : null;
  const sparse = (keptCount ?? 0) <= 1;

  return (
    <section
      className={`rounded-[24px] px-6 sm:px-8 py-7 sm:py-8 ${sparse ? "mt-3 sm:mt-4" : "mt-10"}`}
      style={{
        background:
          "linear-gradient(180deg, hsl(var(--card)) 0%, hsl(var(--stage-pregnancy) / 0.28) 100%)",
        border: "1px solid hsl(var(--stage-pregnancy-accent) / 0.16)",
      }}
    >
      <p
        className="font-sans text-[10px] font-medium tracking-[0.3em] uppercase mb-3"
        style={{ color: accent }}
      >
        Looking ahead
      </p>
      {nextIdentity && nextWeek ? (
        <p className="font-serif text-foreground/85 text-[15.5px] sm:text-[16px] leading-[1.55] mb-5 max-w-[44ch]">
          <span className="text-foreground">Week {nextWeek} · {nextIdentity.chapterTitle}</span>
          <span className="block font-serif text-foreground/72 text-[14px] mt-1.5">
            {nextIdentity.theme}
          </span>
        </p>
      ) : (
        <p className="font-serif text-foreground/80 text-[15.5px] leading-[1.55] mb-5 max-w-[44ch]">
          Your due date is near.
        </p>
      )}
      <Link
        to="/my-week"
        className="inline-flex items-center gap-2 font-sans text-[11.5px] font-medium tracking-[0.22em] uppercase text-foreground/80 hover:text-foreground transition-colors group"
      >
        Return to My Week
        <ArrowRight size={13} strokeWidth={1.7} className="transition-transform group-hover:translate-x-0.5" />
      </Link>
    </section>
  );
};

export default LookingAheadCard;

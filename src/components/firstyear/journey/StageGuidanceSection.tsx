import { Link } from "react-router-dom";
import { getStageGuidance } from "@/lib/firstYearStageGuidance";
import { FY_FOCUS_RING } from "./firstYearStyles";

type Props = {
  /** First baby's date of birth. Renders nothing when unusable. */
  dateOfBirth: string | null | undefined;
  babyCount: number;
};

/**
 * "For this stage" — a small, calm, age-aware group of links into existing
 * public First Year guidance. Purely navigational: no stage is ever stored.
 */
const StageGuidanceSection = ({ dateOfBirth, babyCount }: Props) => {
  const guidance = getStageGuidance(dateOfBirth, babyCount);
  if (!guidance) return null;

  return (
    <section className="pb-10" aria-labelledby="for-this-stage">
      <span
        className="inline-flex items-center rounded-full px-3 py-1 font-sans text-[10.5px] font-medium tracking-[0.26em] uppercase mb-3"
        style={{
          color: "hsl(var(--stage-firstyear-deep))",
          backgroundColor: "hsl(var(--stage-firstyear) / 0.8)",
          border: "1px solid hsl(var(--stage-firstyear-accent) / 0.22)",
        }}
      >
        {guidance.kicker}
      </span>
      <h2
        id="for-this-stage"
        className="font-serif text-[1.3rem] sm:text-[1.42rem] leading-[1.2] text-foreground/90 mb-2.5"
      >
        {guidance.heading}
      </h2>
      <p className="font-sans text-[14px] leading-[1.7] text-foreground/70 max-w-[52ch] mb-5">
        {guidance.intro}
      </p>


      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 list-none p-0 m-0">
        {guidance.cards.map((card) => (
          <li key={card.href}>
            <Link
              to={card.href}
              className={`group block h-full rounded-[18px] border px-5 py-5 transition-colors hover:border-foreground/25 ${FY_FOCUS_RING}`}
              style={{
                borderColor: "hsl(var(--stage-firstyear-accent) / 0.2)",
                backgroundColor: "hsl(var(--stage-firstyear) / 0.5)",
              }}
            >
              <span className="block font-serif text-[1.02rem] leading-snug text-foreground/90">
                {card.title}
              </span>
              <span className="mt-1.5 block font-sans text-[13px] leading-[1.6] text-foreground/65 break-words">
                {card.detail}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-4 font-sans text-[13.5px] leading-[1.7] text-foreground/65 max-w-[52ch]">
        {guidance.parentLine}{" "}
        <Link
          to={guidance.parentHref}
          className={`rounded-sm text-foreground/80 underline underline-offset-4 decoration-border transition-colors hover:decoration-foreground/40 ${FY_FOCUS_RING}`}
        >
          {guidance.parentLabel}
        </Link>
      </p>
    </section>
  );
};

export default StageGuidanceSection;

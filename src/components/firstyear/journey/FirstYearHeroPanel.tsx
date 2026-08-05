import { Link } from "react-router-dom";
import { heroSupportLine, type BabyForCopy } from "@/lib/firstYearCopy";

type Props = {
  babies: BabyForCopy[];
};

/**
 * Welcome hero for the signed-in First Year landing surface. Ages are derived,
 * never stored, and the exact date of birth is deliberately not shown here.
 */
const FirstYearHeroPanel = ({ babies }: Props) => (
  <section className="pt-20 sm:pt-24 pb-8">
    <p
      className="font-sans text-[10.5px] font-medium tracking-[0.3em] uppercase mb-4"
      style={{ color: "hsl(var(--stage-firstyear-accent))" }}
    >
      A new chapter
    </p>
    <h1 className="font-serif text-[2rem] sm:text-[2.6rem] leading-[1.12] text-foreground/90 mb-4">
      Your First Year journey has begun.
    </h1>
    <p className="font-serif text-[16px] sm:text-[17px] leading-[1.7] text-foreground/80 max-w-[46ch]">
      {heroSupportLine(babies)}
    </p>
    <p className="mt-5 font-sans text-[13.5px] leading-[1.7] text-foreground/65 max-w-[52ch]">
      Here is support for your baby, and support for you. Take what you need, and leave the
      rest for another day.
    </p>
    <div className="mt-7">
      <Link
        to="/first-year"
        className="inline-flex items-center justify-center rounded-pill px-5 py-2.5 font-sans text-sm font-medium text-white shadow-cta transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        style={{ backgroundColor: "hsl(var(--stage-firstyear-deep))" }}
      >
        Explore the First Year hub
      </Link>
    </div>
  </section>
);

export default FirstYearHeroPanel;

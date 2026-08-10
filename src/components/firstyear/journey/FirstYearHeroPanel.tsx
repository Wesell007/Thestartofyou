import { Link } from "react-router-dom";
import { type BabyForCopy } from "@/lib/firstYearCopy";

type Props = {
  babies: BabyForCopy[];
};

/**
 * Welcome hero for the signed-in First Year home. Deliberately short: the
 * baby's age lives in the summary card below, never here, and the public hub
 * link is a quiet text link so it cannot compete with today's note.
 */
const FirstYearHeroPanel = ({ babies }: Props) => (
  <section className="pt-16 sm:pt-20 pb-5">
    <p
      className="font-sans text-[10.5px] font-medium tracking-[0.3em] uppercase mb-3"
      style={{ color: "hsl(var(--stage-firstyear-accent))" }}
    >
      Your first year
    </p>
    <h1 className="font-serif text-[1.9rem] sm:text-[2.4rem] leading-[1.14] text-foreground/90 mb-3">
      Your First Year home
    </h1>
    <p className="font-serif text-[16px] sm:text-[17px] leading-[1.7] text-foreground/80 max-w-[46ch]">
      A gentle place for {babies.length > 1 ? "your babies" : "your baby"}, your recovery, and
      the notes you want to remember.
    </p>
    <p className="mt-3 font-sans text-[13.5px] leading-[1.7] text-foreground/60">
      <Link
        to="/first-year"
        className="inline-flex min-h-11 items-center rounded-sm underline underline-offset-4 decoration-border transition-colors hover:decoration-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      >
        Browse the First Year guide
      </Link>
    </p>
  </section>
);

export default FirstYearHeroPanel;

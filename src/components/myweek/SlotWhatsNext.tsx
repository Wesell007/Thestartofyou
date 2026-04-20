import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { MyWeekEntry } from "@/data/myWeekContent";

interface Props {
  content: MyWeekEntry;
  nextWeek: number | null;
  nextTheme?: string;
}

const SlotWhatsNext = ({ content, nextWeek, nextTheme }: Props) => {
  if (!nextWeek) return null;

  return (
    <section className="relative py-16 sm:py-20 md:py-26 border-t border-border/30">
      <div className="flex items-center gap-3 mb-7 sm:mb-8">
        <span
          aria-hidden="true"
          className="block w-6 h-px"
          style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.55)" }}
        />
        <p
          className="font-sans text-[10.5px] sm:text-[11px] font-light tracking-[0.24em] uppercase"
          style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
        >
          What's quietly ahead
        </p>
      </div>

      <h2 className="font-serif text-[1.55rem] sm:text-[1.8rem] md:text-[2rem] text-foreground leading-[1.18] mb-5 max-w-[28ch]">
        Looking toward week {nextWeek}
      </h2>

      {nextTheme && (
        <p className="font-serif italic text-[1rem] sm:text-[1.05rem] text-foreground/60 leading-snug mb-6 max-w-[34ch]">
          {nextTheme}
        </p>
      )}

      <p className="font-sans text-[15.5px] sm:text-[16px] font-light text-foreground/70 leading-[1.7] max-w-[52ch] mb-9">
        {content.nextPreview}
      </p>

      <Link
        to="/my-journey"
        className="inline-flex items-center gap-2 font-sans text-[12.5px] font-light tracking-[0.14em] uppercase text-foreground/65 hover:text-foreground transition-colors group"
      >
        See your journey so far
        <ArrowRight
          size={14}
          strokeWidth={1.5}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </Link>
    </section>
  );
};

export default SlotWhatsNext;

import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { MyWeekEntry } from "@/data/myWeekContent";

interface Props {
  content: MyWeekEntry;
  nextWeek: number | null;
  nextChapterTitle?: string;
  nextTheme?: string;
}

/**
 * Right-rail slot — The next chapter.
 *
 * Now functions as the closing note of the right ritual rail.
 * Tightened spacing, no double-border (the rail provides the dividing line).
 */
const SlotWhatsNext = ({ content, nextWeek, nextChapterTitle, nextTheme }: Props) => {
  if (!nextWeek) return null;

  return (
    <section className="relative pt-10 pb-2">
      <div className="flex items-center gap-3 mb-5">
        <span
          aria-hidden="true"
          className="block w-5 h-px"
          style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.55)" }}
        />
        <p
          className="font-sans text-[10.5px] font-light tracking-[0.24em] uppercase"
          style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
        >
          The next chapter
        </p>
      </div>

      <p className="font-sans text-[10px] font-medium tracking-[0.28em] uppercase mb-2.5 text-foreground/45">
        Week {nextWeek}
      </p>

      <h2 className="font-serif text-[1.45rem] sm:text-[1.6rem] text-foreground leading-[1.15] mb-3 max-w-[26ch]">
        {nextChapterTitle ?? `Looking toward week ${nextWeek}`}
      </h2>

      {nextTheme && (
        <p className="font-serif italic text-[1rem] sm:text-[1.05rem] text-foreground/65 leading-snug mb-5 max-w-[34ch]">
          {nextTheme}
        </p>
      )}

      <p className="font-sans text-[14.5px] sm:text-[15px] font-light text-foreground/68 leading-[1.75] max-w-[44ch] mb-6">
        {content.nextPreview}
      </p>

      <Link
        to="/my-journey"
        className="inline-flex items-center gap-2 font-sans text-[11.5px] font-medium tracking-[0.18em] uppercase text-foreground/65 hover:text-foreground transition-colors group"
      >
        See your journey so far
        <ArrowRight
          size={13}
          strokeWidth={1.5}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </Link>
    </section>
  );
};

export default SlotWhatsNext;

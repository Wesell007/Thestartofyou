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
 * Slot 4 — The next chapter.
 *
 * A quiet bridge to next week, framed as the next chapter waiting. Not a
 * preview card; a continuation cue.
 */
const SlotWhatsNext = ({ content, nextWeek, nextChapterTitle, nextTheme }: Props) => {
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
          The next chapter
        </p>
      </div>

      <p
        className="font-sans text-[10.5px] font-medium tracking-[0.28em] uppercase mb-3 text-foreground/45"
      >
        Chapter · Week {nextWeek}
      </p>

      <h2 className="font-serif text-[1.7rem] sm:text-[1.95rem] md:text-[2.2rem] text-foreground leading-[1.15] mb-5 max-w-[26ch]">
        {nextChapterTitle ?? `Looking toward week ${nextWeek}`}
      </h2>

      {nextTheme && (
        <p className="font-serif italic text-[1.05rem] sm:text-[1.15rem] text-foreground/65 leading-snug mb-6 max-w-[34ch]">
          {nextTheme}
        </p>
      )}

      <p className="font-sans text-[15.5px] sm:text-[16px] font-light text-foreground/68 leading-[1.75] max-w-[52ch] mb-9">
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

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface Props {
  nextWeek: number | null;
  nextChapterTitle?: string;
  nextTheme?: string;
  nextPreview: string;
}

/**
 * Small "Next chapter" preview card. Non-clickable as a whole — future
 * weeks aren't directly addressable in the companion, and we don't send
 * users into public week hub pages from here. A single low-emphasis link
 * routes to /my-journey so the card is still a useful navigation surface.
 */
const SectionNextChapter = ({ nextWeek, nextChapterTitle, nextTheme, nextPreview }: Props) => {
  if (!nextWeek) return null;

  return (
    <section className="relative pt-4 pb-14">
      <div className="flex items-center gap-3 mb-5">
        <span
          aria-hidden="true"
          className="block w-5 h-px"
          style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.55)" }}
        />
        <p
          className="font-sans text-[10.5px] font-medium tracking-[0.26em] uppercase"
          style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
        >
          Next chapter
        </p>
      </div>

      <div
        className="rounded-[22px] keepsake-surface px-6 sm:px-8 py-7 sm:py-8"
        style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.14)" }}
      >
        <p
          className="font-sans text-[10px] font-medium tracking-[0.28em] uppercase mb-2.5"
          style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
        >
          Week {nextWeek}
        </p>
        <h2 className="font-serif text-[1.35rem] sm:text-[1.5rem] text-foreground leading-[1.18] mb-2.5 max-w-[26ch]">
          {nextChapterTitle ?? `Looking toward week ${nextWeek}`}
        </h2>
        {nextTheme && (
          <p className="font-serif italic text-[15px] text-foreground/60 mb-4 max-w-[34ch]">
            {nextTheme}
          </p>
        )}
        <p className="font-sans text-[14.5px] font-light text-foreground/70 leading-[1.72] max-w-[52ch] mb-5">
          {nextPreview}
        </p>
        <Link
          to="/my-journey"
          className="group inline-flex items-center gap-2 font-sans text-[11.5px] font-medium tracking-[0.22em] uppercase transition-colors hover:opacity-80"
          style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
        >
          See your journey so far
          <ArrowRight size={13} strokeWidth={1.7} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
};

export default SectionNextChapter;

import { CalendarDays } from "lucide-react";

interface Props {
  greeting: string;
  firstName: string;
  trimesterLabel: string;
  week: number;
  chapterTitle: string;
  standfirst: string;
  dueDateLabel: string;
  weeksToGoLabel: string;
}

/**
 * My Week 2.0 — premium chapter hero.
 *
 * Greeting, trimester locator, chapter title, one-line standfirst, and
 * a due-date pill with weeks-to-go. Warm, serif, editorial. No side rail.
 */
const SectionHero = ({
  greeting,
  firstName,
  trimesterLabel,
  week,
  chapterTitle,
  standfirst,
  dueDateLabel,
  weeksToGoLabel,
}: Props) => {
  return (
    <section className="relative pt-20 sm:pt-24 pb-8 sm:pb-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -left-24 w-[560px] h-[440px] rounded-full blur-3xl -z-10"
        style={{
          background:
            "radial-gradient(closest-side, hsl(var(--stage-pregnancy-peach) / 0.8), hsl(var(--stage-pregnancy-cream) / 0.5) 55%, transparent 80%)",
          opacity: 0.9,
        }}
      />
      <p className="font-serif italic text-[13px] sm:text-[14px] text-foreground/55 tracking-wide mb-5 sm:mb-6">
        {greeting}, {firstName}.
      </p>
      <p
        className="font-sans text-[10.5px] sm:text-[11px] font-medium tracking-[0.3em] uppercase mb-4 sm:mb-5"
        style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
      >
        {trimesterLabel} · Week {week}
      </p>
      <h1
        className="font-serif font-medium text-foreground leading-[0.98] tracking-tight mb-5 sm:mb-6"
        style={{ fontSize: "clamp(2.4rem, 5.4vw, 4.2rem)" }}
      >
        {chapterTitle}
      </h1>
      <p className="font-serif italic text-[1.1rem] sm:text-[1.2rem] text-[hsl(var(--stage-pregnancy-text-soft))] leading-[1.45] max-w-[36ch] mb-7 sm:mb-8">
        {standfirst}
      </p>

      <div
        className="inline-flex items-center gap-3 rounded-full pregnancy-paper px-5 py-2.5"
      >
        <CalendarDays
          size={14}
          strokeWidth={1.7}
          style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
        />
        <span className="font-serif text-[15px] text-foreground/85">
          Due {dueDateLabel}
        </span>
        <span
          aria-hidden="true"
          className="block w-px h-4"
          style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.24)" }}
        />
        <span className="font-sans text-[12px] font-light text-foreground/60 tracking-wide">
          {weeksToGoLabel}
        </span>
      </div>
    </section>
  );
};

export default SectionHero;

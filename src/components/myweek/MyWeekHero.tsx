import WeekIllustration from "./WeekIllustration";

interface Props {
  greeting: string;
  firstName: string;
  week: number;
  dueDateLabel: string;
  trimesterLabel: string;
  chapterTitle: string;
  theme: string;
  developmentCue: string;
  babyNote: string;
}

/**
 * /my-week hero — the chapter frontispiece.
 *
 * Composed like the opening page of a printed chapter:
 *   - Whisper greeting (italic serif, set in the right-hand margin feel)
 *   - Top hairline rule with chapter-mark
 *   - The relational illustration on a warm atmospheric wash
 *   - Stage chip
 *   - Chapter mark + serif title (large, magnetic)
 *   - Held theme (italic serif lead)
 *   - Hairline divider
 *   - Baby note + development cue (paired, soft)
 *   - Due date as the closing colophon line
 */
const MyWeekHero = ({
  greeting,
  firstName,
  week,
  dueDateLabel,
  trimesterLabel,
  chapterTitle,
  theme,
  developmentCue,
  babyNote,
}: Props) => {
  return (
    <section className="relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20">
      {/* Warm atmospheric wash — extends past the column */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[680px] sm:w-[840px] md:w-[1020px] h-[460px] sm:h-[540px] md:h-[640px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, hsl(var(--stage-pregnancy) / 0.95), hsl(var(--stage-pregnancy) / 0.3) 55%, transparent 78%)",
          opacity: 0.92,
        }}
      />

      {/* Soft secondary wash — adds depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[120px] left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(closest-side, hsl(var(--stage-pregnancy-accent) / 0.14), transparent 70%)",
        }}
      />

      <div className="relative md:text-center md:flex md:flex-col md:items-center">
        {/* Whisper greeting */}
        <p className="font-serif italic text-[13px] sm:text-[14px] text-foreground/52 mb-7 sm:mb-8 tracking-wide">
          {greeting}, {firstName}.
        </p>

        {/* Top hairline + chapter-mark — opens the page */}
        <div className="flex items-center gap-3 mb-8 sm:mb-9 md:justify-center">
          <span
            aria-hidden="true"
            className="block h-px w-10 sm:w-14"
            style={{
              background:
                "linear-gradient(to right, transparent, hsl(var(--stage-pregnancy-accent) / 0.5), transparent)",
            }}
          />
          <span
            aria-hidden="true"
            className="block w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.7)" }}
          />
          <span
            aria-hidden="true"
            className="block h-px w-10 sm:w-14"
            style={{
              background:
                "linear-gradient(to left, transparent, hsl(var(--stage-pregnancy-accent) / 0.5), transparent)",
            }}
          />
        </div>

        {/* Relational illustration — the emotional centre */}
        <div className="mb-9 sm:mb-10 md:mb-11">
          <WeekIllustration
            week={week}
            size={210}
            className="sm:hidden mx-auto"
          />
          <WeekIllustration
            week={week}
            size={250}
            className="hidden sm:block md:hidden mx-auto"
          />
          <WeekIllustration
            week={week}
            size={290}
            className="hidden md:block mx-auto"
          />
        </div>

        {/* Stage chip — the locating signal */}
        <p
          className="font-sans text-[10.5px] sm:text-[11px] font-medium tracking-[0.28em] uppercase mb-6 sm:mb-7"
          style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
        >
          {trimesterLabel} · Pregnancy
        </p>

        {/* Chapter mark + title */}
        <div className="mb-6 sm:mb-7 md:flex md:flex-col md:items-center">
          <p
            className="font-sans text-[10.5px] sm:text-[11px] font-medium tracking-[0.32em] uppercase mb-4 md:mb-5 text-foreground/45"
          >
            <span className="serif-numeral italic font-normal text-foreground/55 normal-case tracking-normal text-[15px] mr-2">
              {String(week).padStart(2, "0")}
            </span>
            Chapter · Week {week}
          </p>
          <h1
            className="font-serif font-medium text-foreground leading-[0.96] tracking-tight"
            style={{ fontSize: "clamp(2.6rem, 8.6vw, 4.9rem)" }}
          >
            {chapterTitle}
          </h1>
        </div>

        {/* Held theme — editorial italic */}
        <p
          className="font-serif italic text-[1.1rem] sm:text-[1.2rem] md:text-[1.32rem] text-foreground/72 leading-[1.4] mb-7 sm:mb-8 max-w-[28ch] md:mx-auto"
        >
          {theme}
        </p>

        {/* Hairline divider */}
        <span
          aria-hidden="true"
          className="hidden md:block w-12 h-px my-3"
          style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.4)" }}
        />

        {/* Baby note + development cue */}
        <div className="space-y-2.5 mt-4 max-w-[36ch] md:mx-auto">
          <p className="font-sans text-[14px] sm:text-[14.5px] font-light text-foreground/70 leading-relaxed">
            {babyNote}
          </p>
          <p className="font-serif italic text-[13px] sm:text-[13.5px] text-foreground/48 leading-relaxed">
            {developmentCue}
          </p>
        </div>

        {/* Closing colophon */}
        <p className="font-sans text-[11.5px] sm:text-[12px] font-light text-foreground/38 mt-8 tracking-[0.2em] uppercase">
          Due {dueDateLabel}
        </p>
      </div>
    </section>
  );
};

export default MyWeekHero;

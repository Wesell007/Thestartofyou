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
 * /my-week hero — the chapter opener.
 *
 * Built around mum + baby relational form. Treats this week as a collectible
 * chapter, not a tracker readout. Hierarchy:
 *   - Greeting (small, personal)
 *   - Stage-aware illustration (the emotional centre)
 *   - Stage chip (trimester)
 *   - Chapter mark + title (CHAPTER · WEEK 18 / "First felt movements")
 *   - Held theme line (italic serif)
 *   - Baby note + development cue (softly stacked)
 *   - Due date (quiet, secondary)
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
    <section className="relative pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-10 sm:pb-14 md:pb-18">
      {/* Stage-coded botanical wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[760px] md:w-[920px] h-[400px] sm:h-[480px] md:h-[560px] rounded-full blur-3xl opacity-90"
        style={{
          background:
            "radial-gradient(closest-side, hsl(var(--stage-pregnancy) / 0.85), hsl(var(--stage-pregnancy) / 0) 72%)",
        }}
      />

      <div className="relative md:text-center md:flex md:flex-col md:items-center">
        {/* Greeting — quiet, personal */}
        <p className="font-sans text-[12.5px] sm:text-[13.5px] font-light text-foreground/55 mb-6 sm:mb-7">
          {greeting}, {firstName}.
        </p>

        {/* Stage-aware mum + baby illustration */}
        <div className="mb-7 sm:mb-8 md:mb-9">
          <WeekIllustration
            week={week}
            size={200}
            className="sm:hidden mx-auto"
          />
          <WeekIllustration
            week={week}
            size={230}
            className="hidden sm:block md:hidden mx-auto"
          />
          <WeekIllustration
            week={week}
            size={260}
            className="hidden md:block mx-auto"
          />
        </div>

        {/* Stage chip */}
        <p
          className="font-sans text-[10.5px] sm:text-[11px] font-light tracking-[0.26em] uppercase mb-5 sm:mb-6"
          style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
        >
          {trimesterLabel} · Pregnancy
        </p>

        {/* Chapter mark + title — collectible chapter identity */}
        <div className="mb-5 sm:mb-6 md:flex md:flex-col md:items-center">
          <p
            className="font-sans text-[10.5px] sm:text-[11px] font-medium tracking-[0.28em] uppercase mb-3 md:mb-4 text-foreground/45"
          >
            Chapter · Week {week}
          </p>
          <h1
            className="font-serif font-medium text-foreground leading-[0.98] tracking-tight"
            style={{ fontSize: "clamp(2.4rem, 8vw, 4.5rem)" }}
          >
            {chapterTitle}
          </h1>
        </div>

        {/* Weekly theme — the editorial moment */}
        <p
          className="font-serif italic text-[1.05rem] sm:text-[1.15rem] md:text-[1.25rem] text-foreground/72 leading-snug mb-6 sm:mb-7 max-w-[28ch] md:mx-auto"
        >
          {theme}
        </p>

        {/* Hairline */}
        <span
          aria-hidden="true"
          className="hidden md:block w-10 h-px my-2"
          style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.55)" }}
        />

        {/* Baby note + development cue — softly stacked */}
        <div className="space-y-2 mt-4 max-w-[36ch] md:mx-auto">
          <p className="font-sans text-[13.5px] sm:text-[14px] font-light text-foreground/68 leading-relaxed">
            {babyNote}
          </p>
          <p className="font-sans text-[12.5px] sm:text-[13px] font-light italic text-foreground/48">
            {developmentCue}
          </p>
        </div>

        {/* Due date — secondary */}
        <p className="font-sans text-[12px] sm:text-[12.5px] font-light text-foreground/40 mt-6 tracking-wide">
          Due {dueDateLabel}
        </p>
      </div>
    </section>
  );
};

export default MyWeekHero;

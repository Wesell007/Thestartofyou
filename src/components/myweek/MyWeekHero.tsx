import WeekIllustration from "./WeekIllustration";

interface Props {
  greeting: string;
  firstName: string;
  week: number;
  dueDateLabel: string;
  trimesterLabel: string;
  theme: string;
  developmentCue: string;
  babyNote: string;
}

const MyWeekHero = ({
  greeting,
  firstName,
  week,
  dueDateLabel,
  trimesterLabel,
  theme,
  developmentCue,
  babyNote,
}: Props) => {
  return (
    <section className="relative pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-10 sm:pb-14 md:pb-18">
      {/* Stage-coded botanical wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[560px] sm:w-[720px] md:w-[860px] h-[360px] sm:h-[440px] md:h-[520px] rounded-full blur-3xl opacity-80"
        style={{
          background:
            "radial-gradient(closest-side, hsl(var(--stage-pregnancy) / 0.7), hsl(var(--stage-pregnancy) / 0) 70%)",
        }}
      />

      <div className="relative md:text-center md:flex md:flex-col md:items-center">
        {/* Greeting — quiet, personal */}
        <p className="font-sans text-[12.5px] sm:text-[13.5px] font-light text-foreground/55 mb-6 sm:mb-7">
          {greeting}, {firstName}.
        </p>

        {/* Stage-aware illustration — emotional centre */}
        <div className="mb-7 sm:mb-8 md:mb-9">
          <WeekIllustration
            week={week}
            size={180}
            className="sm:hidden mx-auto"
          />
          <WeekIllustration
            week={week}
            size={210}
            className="hidden sm:block md:hidden mx-auto"
          />
          <WeekIllustration
            week={week}
            size={240}
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

        {/* Week as the held centre */}
        <h1 className="font-serif text-foreground leading-[0.95] tracking-tight mb-5 sm:mb-6">
          <span className="block text-[11px] sm:text-xs font-light tracking-[0.22em] uppercase text-foreground/40 mb-3 md:mb-4">
            You're in
          </span>
          <span
            className="block font-medium"
            style={{ fontSize: "clamp(2.75rem, 9vw, 5.25rem)" }}
          >
            Week {week}
          </span>
        </h1>

        {/* Weekly theme — the editorial moment */}
        <p
          className="font-serif italic text-[1.05rem] sm:text-[1.15rem] md:text-[1.25rem] text-foreground/75 leading-snug mb-6 sm:mb-7 max-w-[28ch] md:mx-auto"
        >
          {theme}
        </p>

        {/* Hairline */}
        <span
          aria-hidden="true"
          className="hidden md:block w-10 h-px my-2"
          style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.55)" }}
        />

        {/* Baby note + development cue — softly stacked, never tracker-ish */}
        <div className="space-y-2 mt-4 max-w-[36ch] md:mx-auto">
          <p className="font-sans text-[13.5px] sm:text-[14px] font-light text-foreground/65 leading-relaxed">
            {babyNote}
          </p>
          <p className="font-sans text-[12.5px] sm:text-[13px] font-light italic text-foreground/45">
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

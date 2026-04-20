interface Props {
  greeting: string;
  firstName: string;
  week: number;
  dueDateLabel: string;
  trimesterLabel: string;
}

const MyWeekHero = ({
  greeting,
  firstName,
  week,
  dueDateLabel,
  trimesterLabel,
}: Props) => {
  return (
    <section className="relative pt-20 sm:pt-24 md:pt-32 lg:pt-36 pb-10 sm:pb-12 md:pb-16">
      {/* Soft pregnancy-coded botanical wash, always centred behind the hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 w-[520px] sm:w-[640px] md:w-[760px] h-[300px] sm:h-[360px] md:h-[420px] rounded-full blur-3xl opacity-70"
        style={{
          background:
            "radial-gradient(closest-side, hsl(var(--stage-pregnancy) / 0.55), hsl(var(--stage-pregnancy) / 0) 70%)",
        }}
      />

      {/* Mobile/tablet: left-aligned editorial. Desktop (md+): centred, held opening. */}
      <div className="relative md:text-center md:flex md:flex-col md:items-center">
        {/* Stage label — quiet orientation, no countdown energy */}
        <p
          className="font-sans text-[10.5px] sm:text-[11px] font-light tracking-[0.24em] uppercase mb-5 sm:mb-6"
          style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
        >
          {trimesterLabel} · Pregnancy
        </p>

        <p className="font-sans text-[13px] sm:text-sm font-light text-foreground/55 mb-5 sm:mb-6 md:mb-8">
          {greeting}, {firstName}.
        </p>

        <h1 className="font-serif text-foreground leading-[0.95] tracking-tight mb-4 sm:mb-5 md:mb-6">
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

        {/* Hairline divider on desktop only — anchors the centred hero */}
        <span
          aria-hidden="true"
          className="hidden md:block w-10 h-px my-5"
          style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.55)" }}
        />

        {/* Due date — quietly secondary, no countdown */}
        <p className="font-sans text-[12px] sm:text-[13px] font-light text-foreground/45 mt-1.5">
          Due {dueDateLabel}
        </p>
      </div>
    </section>
  );
};

export default MyWeekHero;

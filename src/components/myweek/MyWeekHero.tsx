interface Props {
  greeting: string;
  firstName: string;
  week: number;
  dueDateLabel: string;
}

const MyWeekHero = ({ greeting, firstName, week, dueDateLabel }: Props) => {
  return (
    <section className="relative pt-20 sm:pt-24 md:pt-28 pb-10 sm:pb-12">
      {/* Soft pregnancy-coded botanical wash, centred behind the column */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 w-[480px] h-[280px] rounded-full blur-3xl opacity-60"
        style={{ backgroundColor: "hsl(var(--stage-pregnancy) / 0.55)" }}
      />

      <div className="relative">
        <p className="font-sans text-[13px] sm:text-sm font-light text-foreground/55 mb-6 sm:mb-8">
          {greeting}, {firstName}.
        </p>

        <h1 className="font-serif text-foreground leading-[0.95] tracking-tight mb-4 sm:mb-5">
          <span className="block text-[11px] sm:text-xs font-light tracking-[0.22em] uppercase text-foreground/40 mb-3">
            You're in
          </span>
          <span
            className="block font-medium"
            style={{ fontSize: "clamp(2.75rem, 9vw, 4.75rem)" }}
          >
            Week {week}
          </span>
        </h1>

        <p className="font-sans text-[13px] sm:text-sm font-light text-foreground/45">
          Due {dueDateLabel}
        </p>
      </div>
    </section>
  );
};

export default MyWeekHero;

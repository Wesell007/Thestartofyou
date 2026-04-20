interface Props {
  greeting: string;
  firstName: string;
  week: number;
  dueDateLabel: string;
}

const MyWeekHero = ({ greeting, firstName, week, dueDateLabel }: Props) => {
  return (
    <section className="relative pt-20 sm:pt-24 md:pt-28 pb-10 sm:pb-12 md:pb-16">
      {/* Soft botanical accent — pregnancy-coded */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-16 right-0 w-[180px] h-[180px] sm:w-[260px] sm:h-[260px] rounded-full blur-3xl opacity-50"
        style={{ backgroundColor: "hsl(var(--stage-pregnancy) / 0.7)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-24 right-8 w-2 h-2 rounded-full"
        style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.4)" }}
      />

      <div className="relative container mx-auto px-5 sm:px-6 md:px-10 max-w-2xl">
        <p className="font-sans text-[13px] sm:text-sm font-light text-sage-muted mb-5 sm:mb-7">
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

        <p className="font-sans text-[13px] sm:text-sm font-light text-muted-foreground/80">
          Due {dueDateLabel}
        </p>
      </div>
    </section>
  );
};

export default MyWeekHero;

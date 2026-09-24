const FamilyOrientation = () => {
  return (
    <section
      id="family-orientation"
      aria-labelledby="family-orientation-heading"
      className="bg-parchment py-12 sm:py-14 md:py-16"
    >
      <div className="container mx-auto max-w-5xl px-5 sm:px-8 md:px-10">
        <div
          className="grid gap-5 border-b pb-10 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] md:gap-12 md:pb-12"
          style={{ borderColor: "hsl(var(--stage-family-accent) / 0.22)" }}
        >
          <div className="flex items-start gap-3 pt-1">
            <span
              className="mt-2 h-px w-10 shrink-0"
              style={{ backgroundColor: "hsl(var(--stage-family-accent) / 0.55)" }}
              aria-hidden
            />
            <p
              className="font-sans text-[11px] font-light uppercase tracking-[0.28em]"
              style={{ color: "hsl(var(--stage-family-accent))" }}
            >
              What this hub covers
            </p>
          </div>

          <div>
            <h2
              id="family-orientation-heading"
              className="max-w-2xl font-serif text-[2rem] leading-tight sm:text-[2.25rem] md:text-[2.65rem]"
              style={{ color: "hsl(var(--stage-family-deep))" }}
            >
              Family life, beyond the milestones.
            </h2>
            <div
              className="mt-5 max-w-2xl space-y-4 font-sans text-[15px] font-light leading-[1.75]"
              style={{ color: "hsl(var(--stage-family-deep) / 0.74)" }}
            >
              <p>
                Parenting is only one part of family life. This space is here
                for the wider picture: relationships, routines, growing your
                family, practical decisions, health and safety, travel, play
                and the everyday work of staying connected.
              </p>
              <p>
                Family is not another saved stage after Toddler. It sits
                alongside every part of your journey. Come back whenever
                family life changes, feels complicated, or simply needs a
                little more support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FamilyOrientation;
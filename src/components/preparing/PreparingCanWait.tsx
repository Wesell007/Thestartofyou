const canWait = [
  "Items you're unsure about",
  "Products recommended but not immediately needed",
  "Things that depend on your baby's preferences",
];

const wontKnow = [
  "What your baby will prefer",
  "What will actually be useful day-to-day",
  "What your routine will look like",
];

const decisionFatigue = [
  "Spending too long researching",
  "Feeling unsure what to choose",
  "Worrying about making the \"right\" decision",
];

const PreparingCanWait = () => {
  return (
    <section className="bg-parchment py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="space-y-0">
          {/* What can wait */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-14 pb-10">
            <div className="flex flex-col gap-2 pt-1">
              <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted">
                Patience
              </p>
              <p className="font-serif text-lg text-foreground leading-snug">
                What can wait
              </p>
            </div>
            <div>
              <ul className="space-y-3 mb-6">
                {canWait.map((b, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="mt-2 w-1 h-1 rounded-full bg-sage-muted shrink-0" />
                    <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">{b}</p>
                  </li>
                ))}
              </ul>
              <div className="bg-sage-bg/40 border border-sage-light/30 rounded-md px-5 py-4">
                <p className="font-sans text-xs font-light tracking-[0.12em] uppercase text-sage-muted mb-1.5">
                  What this means
                </p>
                <p className="font-serif italic text-base text-foreground/70 leading-relaxed">
                  Not everything needs to be decided before your baby arrives.
                </p>
              </div>
            </div>
          </div>

          {/* What you won't know yet */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-14 py-10 border-t border-border/40">
            <div className="flex flex-col gap-2 pt-1">
              <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted">
                Reality
              </p>
              <p className="font-serif text-lg text-foreground leading-snug">
                What you won't know yet
              </p>
            </div>
            <div>
              <ul className="space-y-3 mb-6">
                {wontKnow.map((b, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="mt-2 w-1 h-1 rounded-full bg-sage-muted shrink-0" />
                    <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">{b}</p>
                  </li>
                ))}
              </ul>
              <div className="bg-sage-bg/40 border border-sage-light/30 rounded-md px-5 py-4">
                <p className="font-sans text-xs font-light tracking-[0.12em] uppercase text-sage-muted mb-1.5">
                  What this means
                </p>
                <p className="font-serif italic text-base text-foreground/70 leading-relaxed">
                  Some decisions can only be made once your baby is here.
                </p>
              </div>
            </div>
          </div>

          {/* Decision fatigue */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-14 py-10 border-t border-border/40">
            <div className="flex flex-col gap-2 pt-1">
              <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted">
                Decisions
              </p>
              <p className="font-serif text-lg text-foreground leading-snug">
                When decisions feel overwhelming
              </p>
            </div>
            <div>
              <ul className="space-y-3 mb-6">
                {decisionFatigue.map((b, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="mt-2 w-1 h-1 rounded-full bg-sage-muted shrink-0" />
                    <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">{b}</p>
                  </li>
                ))}
              </ul>
              <div className="bg-sage-bg/40 border border-sage-light/30 rounded-md px-5 py-4">
                <p className="font-sans text-xs font-light tracking-[0.12em] uppercase text-sage-muted mb-1.5">
                  What this means
                </p>
                <p className="font-serif italic text-base text-foreground/70 leading-relaxed">
                  There's rarely one perfect choice — simple and safe is often enough.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreparingCanWait;

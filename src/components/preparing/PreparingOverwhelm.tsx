const overwhelm = [
  "Too many product recommendations",
  "Conflicting advice",
  "Pressure to be fully prepared",
  "Not knowing what matters most",
];

const feelingReady = [
  "Wondering if you've done enough",
  "Feeling like there's something you might be missing",
  "Wanting everything to be in place before your baby arrives",
];

const pressure = [
  "Buying more to feel more prepared",
  "Adding items \"just in case\"",
  "Feeling like more preparation equals more control",
];

const PreparingOverwhelm = () => {
  return (
    <section className="bg-parchment-dark py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="space-y-0">
          {/* Why this can feel overwhelming */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-14 pb-10">
            <div className="flex flex-col gap-2 pt-1">
              <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted">
                Reality
              </p>
              <p className="font-serif text-lg text-foreground leading-snug">
                Why this can feel overwhelming
              </p>
            </div>
            <div>
              <ul className="space-y-3 mb-6">
                {overwhelm.map((b, j) => (
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
                  Feeling unsure doesn't mean you're unprepared, it means there's too much noise.
                </p>
              </div>
            </div>
          </div>

          {/* Feeling ready */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-14 py-10 border-t border-border/40">
            <div className="flex flex-col gap-2 pt-1">
              <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted">
                Emotionally
              </p>
              <p className="font-serif text-lg text-foreground leading-snug">
                Feeling ready
              </p>
            </div>
            <div>
              <ul className="space-y-3 mb-6">
                {feelingReady.map((b, j) => (
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
                  There's no clear moment where everything feels fully ready, and that's normal.
                </p>
              </div>
            </div>
          </div>

          {/* When preparation becomes pressure */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-14 py-10 border-t border-border/40">
            <div className="flex flex-col gap-2 pt-1">
              <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted">
                Pressure
              </p>
              <p className="font-serif text-lg text-foreground leading-snug">
                When preparation becomes pressure
              </p>
            </div>
            <div>
              <ul className="space-y-3 mb-6">
                {pressure.map((b, j) => (
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
                  Sometimes, doing more can increase pressure rather than reduce it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreparingOverwhelm;

const PreparingOverwhelm = () => {
  return (
    <section className="bg-parchment-dark py-20 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        {/* Section header */}
        <div className="mb-12 max-w-2xl">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
            Honesty
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight">
            Why preparation can feel harder than it should
          </h2>
        </div>

        {/* Two cards side-by-side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Reality card */}
          <div className="bg-card border border-border/40 rounded-2xl overflow-hidden shadow-card-brand"
            style={{ borderTopWidth: "3px", borderTopColor: "hsl(var(--stage-preparing-accent))" }}>
            <div className="p-7 md:p-8">
              <span className="font-sans text-[10px] font-light tracking-[0.2em] uppercase mb-4 block"
                style={{ color: "hsl(var(--stage-preparing-accent))" }}>
                The noise
              </span>
              <h3 className="font-serif text-xl text-foreground mb-5 leading-snug">What floods in</h3>
              <ul className="space-y-3">
                {[
                  "Too many product recommendations",
                  "Conflicting advice from every direction",
                  "Pressure to be fully prepared",
                  "Not knowing what matters most",
                ].map((item, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="mt-1.5 px-2 py-0.5 rounded text-[8px] font-sans font-light tracking-wider uppercase shrink-0"
                      style={{ backgroundColor: "hsl(var(--stage-preparing) / 0.7)", color: "hsl(var(--stage-preparing-accent))" }}>
                      noise
                    </span>
                    <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-7 md:px-8 py-5 border-t border-border/20"
              style={{ backgroundColor: "hsl(var(--stage-preparing) / 0.2)" }}>
              <p className="font-serif italic text-sm text-foreground/65 leading-relaxed">
                Feeling unsure doesn't mean you're unprepared — it means the signal-to-noise ratio is broken.
              </p>
            </div>
          </div>

          {/* Emotional card */}
          <div className="bg-card border border-border/40 rounded-2xl overflow-hidden shadow-card-brand">
            <div className="p-7 md:p-8">
              <span className="font-sans text-[10px] font-light tracking-[0.2em] uppercase mb-4 block"
                style={{ color: "hsl(var(--stage-preparing-accent))" }}>
                The pressure
              </span>
              <h3 className="font-serif text-xl text-foreground mb-5 leading-snug">What builds up</h3>
              <ul className="space-y-3">
                {[
                  "Wondering if you've done enough",
                  "Feeling like you're missing something",
                  "Buying more to feel more in control",
                  "Researching endlessly without resolution",
                ].map((item, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="mt-1.5 px-2 py-0.5 rounded text-[8px] font-sans font-light tracking-wider uppercase shrink-0 bg-parchment-dark text-muted-foreground">
                      pressure
                    </span>
                    <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-7 md:px-8 py-5 border-t border-border/20"
              style={{ backgroundColor: "hsl(var(--stage-preparing) / 0.15)" }}>
              <p className="font-serif italic text-sm text-foreground/65 leading-relaxed">
                There's no clear moment where everything feels fully ready — and that's normal. Not a failure.
              </p>
            </div>
          </div>
        </div>

        {/* Central insight — stronger than a pull-quote */}
        <div className="rounded-2xl px-7 py-6 text-center border border-border/30"
          style={{ backgroundColor: "hsl(var(--stage-preparing) / 0.35)" }}>
          <p className="font-serif text-lg md:text-xl text-foreground/80 leading-relaxed max-w-xl mx-auto">
            Sometimes, doing <span className="italic">less</span> research and buying <span className="italic">fewer</span> things is the most prepared you can be.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PreparingOverwhelm;

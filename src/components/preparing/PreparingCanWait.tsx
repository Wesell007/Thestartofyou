const canWait = [
  { text: "Items you're unsure about", chip: "Wait" },
  { text: "Products recommended but not immediately needed", chip: "Wait" },
  { text: "Things that depend on your baby's preferences", chip: "Wait" },
];

const wontKnow = [
  "What your baby will prefer",
  "What will actually be useful day-to-day",
  "What your routine will look like",
  "What the 'right' setup really is",
];

const PreparingCanWait = () => {
  return (
    <section className="py-20 md:py-32" style={{ backgroundColor: "hsl(var(--stage-preparing) / 0.3)" }}>
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {/* What can wait */}
          <div className="bg-card border border-border/40 rounded-2xl p-7 md:p-8 shadow-card-brand">
            <span className="font-sans text-[10px] font-light tracking-[0.2em] uppercase mb-4 block"
              style={{ color: "hsl(var(--stage-preparing-accent))" }}>
              Patience
            </span>
            <h3 className="font-serif text-2xl text-foreground mb-6 leading-snug">
              What can wait
            </h3>
            <ul className="space-y-4 mb-6">
              {canWait.map((b, j) => (
                <li key={j} className="flex items-start gap-3">
                  <span className="mt-1 px-2 py-0.5 rounded text-[9px] font-sans font-light tracking-wider uppercase shrink-0"
                    style={{ backgroundColor: "hsl(var(--stage-preparing) / 0.8)", color: "hsl(var(--stage-preparing-accent))" }}>
                    {b.chip}
                  </span>
                  <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">{b.text}</p>
                </li>
              ))}
            </ul>
            <div className="border-t border-border/30 pt-5">
              <p className="font-serif italic text-sm text-foreground/65 leading-relaxed">
                Not everything needs to be decided before your baby arrives.
              </p>
            </div>
          </div>

          {/* What you won't know yet */}
          <div className="bg-card border border-border/40 rounded-2xl p-7 md:p-8 shadow-card-brand">
            <span className="font-sans text-[10px] font-light tracking-[0.2em] uppercase mb-4 block"
              style={{ color: "hsl(var(--stage-preparing-accent))" }}>
              Permission
            </span>
            <h3 className="font-serif text-2xl text-foreground mb-6 leading-snug">
              What you won't know yet
            </h3>
            <ul className="space-y-4 mb-6">
              {wontKnow.map((b, j) => (
                <li key={j} className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: "hsl(var(--stage-preparing-accent))" }} />
                  <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">{b}</p>
                </li>
              ))}
            </ul>
            <div className="border-t border-border/30 pt-5">
              <p className="font-serif italic text-sm text-foreground/65 leading-relaxed">
                Some decisions can only be made once your baby is here — and that's completely okay.
              </p>
            </div>
          </div>
        </div>

        {/* Decision fatigue pull-quote */}
        <div className="mt-8 border-l-2 pl-6 py-3 max-w-2xl"
          style={{ borderColor: "hsl(var(--stage-preparing-accent))" }}>
          <p className="font-sans text-[10px] font-light tracking-[0.2em] uppercase text-sage-muted mb-2">Decision fatigue</p>
          <p className="font-serif italic text-base text-foreground/70 leading-relaxed">
            There's rarely one perfect choice. Simple and safe is often enough.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PreparingCanWait;

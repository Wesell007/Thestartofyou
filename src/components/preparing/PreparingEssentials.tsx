const essentials = [
  { label: "A safe place to sleep", why: "This is the single most important safety decision" },
  { label: "A way to feed", why: "Breast or bottle — one clear plan is enough to start" },
  { label: "Clothing for warmth and comfort", why: "Bodysuits and sleepsuits — nothing more needed" },
  { label: "Basic care items", why: "Nappies, wipes, a changing surface — that's the core" },
];

const PreparingEssentials = () => {
  return (
    <section className="py-20 md:py-32" style={{ backgroundColor: "hsl(var(--stage-preparing) / 0.4)" }}>
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        {/* Section header — full width, editorial */}
        <div className="mb-12 max-w-2xl">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase mb-5"
            style={{ color: "hsl(var(--stage-preparing-accent))" }}>
            The only list that matters
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-[2.6rem] text-foreground leading-tight mb-5">
            What you <span className="italic">actually</span> need
          </h2>
          <p className="font-sans text-base font-light text-muted-foreground leading-relaxed">
            Your baby needs four things. Everything else — every product, every recommendation, every "must-have" list — is additional. Not essential.
          </p>
        </div>

        {/* Essentials as horizontal cards with "why" */}
        <div className="space-y-4 mb-8">
          {essentials.map((item, i) => (
            <div key={i} className="bg-card border border-border/40 rounded-xl shadow-card-brand overflow-hidden"
              style={i === 0 ? { borderLeftWidth: "3px", borderLeftColor: "hsl(var(--stage-preparing-accent))" } : undefined}>
              <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_1.2fr] gap-4 md:gap-6 items-center px-6 py-5">
                <span className="w-10 h-10 rounded-full flex items-center justify-center font-serif text-sm font-medium shrink-0"
                  style={{ backgroundColor: "hsl(var(--stage-preparing) / 0.8)", color: "hsl(var(--stage-preparing-accent))" }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="font-serif text-lg text-foreground leading-snug">{item.label}</p>
                <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed md:border-l md:border-border/30 md:pl-6">
                  {item.why}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Meaning box — wider, stronger */}
        <div className="rounded-2xl px-7 py-6 border shadow-card-brand"
          style={{ backgroundColor: "hsl(var(--stage-preparing) / 0.6)", borderColor: "hsl(var(--stage-preparing-accent) / 0.25)" }}>
          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-5 items-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/40 bg-card/60">
              <span className="font-serif text-2xl font-medium" style={{ color: "hsl(var(--stage-preparing-accent))" }}>4</span>
              <span className="font-sans text-[10px] font-light tracking-widest uppercase text-muted-foreground">core needs</span>
            </div>
            <p className="font-serif italic text-base text-foreground/70 leading-relaxed">
              If these four things are covered, you're prepared. Everything else can come later — or not at all.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreparingEssentials;

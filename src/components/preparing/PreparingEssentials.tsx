const essentials = [
  { icon: "◯", label: "A safe place to sleep" },
  { icon: "◯", label: "A way to feed" },
  { icon: "◯", label: "Clothing for warmth and comfort" },
  { icon: "◯", label: "Basic care items" },
];

const PreparingEssentials = () => {
  return (
    <section className="py-20 md:py-32" style={{ backgroundColor: "hsl(var(--stage-preparing) / 0.35)" }}>
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-14 items-start">
          <div>
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase mb-5"
              style={{ color: "hsl(var(--stage-preparing-accent))" }}>
              Core Needs
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-6">
              What you <span className="italic">actually</span> need
            </h2>
            <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-6">
              At its core, your baby needs four things. Everything else is additional — not essential.
            </p>

            {/* Stat chip */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/40"
              style={{ backgroundColor: "hsl(var(--stage-preparing) / 0.7)" }}>
              <span className="font-serif text-lg font-medium" style={{ color: "hsl(var(--stage-preparing-accent))" }}>4</span>
              <span className="font-sans text-[10px] font-light tracking-widest uppercase text-muted-foreground">core needs</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {essentials.map((item, i) => (
              <div key={i} className="flex items-center gap-4 bg-card border border-border/40 rounded-xl px-6 py-4 shadow-card-brand">
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-serif font-medium shrink-0"
                  style={{ backgroundColor: "hsl(var(--stage-preparing) / 0.8)", color: "hsl(var(--stage-preparing-accent))" }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="font-sans text-base font-light text-foreground leading-relaxed">
                  {item.label}
                </p>
              </div>
            ))}

            {/* Meaning box */}
            <div className="rounded-xl px-6 py-5 mt-2 border"
              style={{ backgroundColor: "hsl(var(--stage-preparing) / 0.5)", borderColor: "hsl(var(--stage-preparing-accent) / 0.2)" }}>
              <p className="font-sans text-[10px] font-light tracking-[0.15em] uppercase mb-2"
                style={{ color: "hsl(var(--stage-preparing-accent))" }}>
                What this means
              </p>
              <p className="font-serif italic text-base text-foreground/70 leading-relaxed">
                What matters most is not how much you have — but knowing these four things are covered.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreparingEssentials;

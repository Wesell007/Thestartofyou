const canWait = [
  { text: "Items you're unsure about", reason: "If you're debating it, you don't need it yet" },
  { text: "Products that depend on preferences", reason: "You'll know what works once baby is here" },
  { text: "Upgrades and nice-to-haves", reason: "Start basic — upgrade only if needed" },
];

const wontKnow = [
  { text: "What your baby will prefer", icon: "?" },
  { text: "What will actually be useful", icon: "◇" },
  { text: "What your routine will look like", icon: "↻" },
  { text: "What the 'right' setup is", icon: "—" },
];

const PreparingCanWait = () => {
  return (
    <section id="preparing-can-wait" className="py-20 md:py-32 scroll-mt-24" style={{ backgroundColor: "hsl(var(--stage-preparing) / 0.3)" }}>
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase mb-5"
            style={{ color: "hsl(var(--stage-preparing-accent))" }}>
            Permission
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-5">
            What you don't need to decide yet
          </h2>
          <p className="font-sans text-base font-light text-muted-foreground leading-relaxed">
            Not everything needs a decision before baby arrives. Here's what can genuinely wait.
          </p>
        </div>

        {/* What can wait — horizontal cards */}
        <div className="space-y-3 mb-10">
          {canWait.map((b, j) => (
            <div key={j} className="bg-card border border-border/40 rounded-xl shadow-card-brand overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_1.2fr] gap-4 md:gap-0 items-center">
                <div className="px-5 py-4 md:py-0">
                  <span className="px-3 py-1 rounded-full text-[9px] font-sans font-light tracking-wider uppercase"
                    style={{ backgroundColor: "hsl(var(--stage-preparing) / 0.8)", color: "hsl(var(--stage-preparing-accent))" }}>
                    Can wait
                  </span>
                </div>
                <p className="px-5 md:px-4 py-2 md:py-4 font-sans text-sm font-light text-foreground leading-relaxed">{b.text}</p>
                <p className="px-5 md:px-4 py-3 md:py-4 font-sans text-sm font-light text-muted-foreground leading-relaxed md:border-l md:border-border/20 italic">{b.reason}</p>
              </div>
            </div>
          ))}
        </div>

        {/* What you won't know yet — 2x2 grid */}
        <div className="mb-8">
          <h3 className="font-serif text-xl text-foreground mb-5">What you won't know yet</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {wontKnow.map((b, j) => (
              <div key={j} className="flex items-center gap-4 bg-card border border-border/40 rounded-xl px-5 py-4 shadow-card-brand">
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0"
                  style={{ backgroundColor: "hsl(var(--stage-preparing) / 0.7)", color: "hsl(var(--stage-preparing-accent))" }}>
                  {b.icon}
                </span>
                <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Closing insight */}
        <div className="border-l-2 pl-6 py-3 max-w-2xl"
          style={{ borderColor: "hsl(var(--stage-preparing-accent))" }}>
          <p className="font-serif italic text-base text-foreground/70 leading-relaxed">
            Some decisions only make sense once your baby is here. Waiting isn't being unprepared — it's being realistic.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PreparingCanWait;

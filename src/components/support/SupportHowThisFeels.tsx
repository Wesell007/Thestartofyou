const feelings = [
  { text: "Something feels different, but you're not sure why", icon: "◇" },
  { text: "You're overthinking or second-guessing", icon: "⟳" },
  { text: "You feel unsettled without a clear reason", icon: "↕" },
  { text: "You want reassurance but don't know where to start", icon: "→" },
];

const SupportHowThisFeels = () => {
  return (
    <section className="bg-parchment-dark py-16 md:py-22">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-4">
          Recognition
        </p>
        <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-3 max-w-lg">
          How this can feel
        </h2>
        <p className="font-sans text-sm font-light text-muted-foreground mb-8 max-w-md">
          If any of these sound familiar, you're in the right place.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {feelings.map((f, i) => (
            <div key={i} className="bg-card border border-border/50 rounded-lg px-5 py-4 shadow-card-brand flex items-center gap-4 hover:border-[hsl(var(--stage-support-accent)/0.3)] transition-colors">
              <div className="w-9 h-9 rounded-full bg-[hsl(var(--stage-support)/0.4)] flex items-center justify-center flex-shrink-0">
                <span className="font-serif text-base text-[hsl(var(--stage-support-accent))]">{f.icon}</span>
              </div>
              <p className="font-sans text-sm font-light text-foreground/80 leading-snug">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportHowThisFeels;

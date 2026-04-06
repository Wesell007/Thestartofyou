const feelings = [
  { text: "Something feels different, but you're not sure why", icon: "◇" },
  { text: "You're overthinking or second-guessing", icon: "⟳" },
  { text: "You feel unsettled without a clear reason", icon: "↕" },
  { text: "You want reassurance but don't know where to start", icon: "→" },
];

const SupportHowThisFeels = () => {
  return (
    <section className="bg-parchment-dark py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-4">
          Recognition
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-4 max-w-lg">
          How this can feel
        </h2>
        <p className="font-sans text-sm font-light text-muted-foreground mb-10 max-w-md">
          If any of these sound familiar, you're in the right place.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {feelings.map((f, i) => (
            <div key={i} className="bg-card border border-border/50 rounded-lg px-6 py-5 shadow-card-brand flex items-start gap-4 hover:border-[hsl(var(--stage-support-accent)/0.3)] transition-colors">
              <span className="font-serif text-xl text-[hsl(var(--stage-support-accent))] mt-0.5 flex-shrink-0">{f.icon}</span>
              <p className="font-sans text-base font-light text-foreground leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportHowThisFeels;

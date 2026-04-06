const items = [
  { step: "Understanding what you're experiencing", detail: "Making sense of what feels off", icon: "◇" },
  { step: "Getting clarity on what's normal", detail: "Separating worry from genuine concern", icon: "◎" },
  { step: "Knowing when to seek help", detail: "Clear guidance without alarm", icon: "↕" },
  { step: "Taking small, manageable next steps", detail: "One thing at a time", icon: "→" },
];

const SupportWhatItLooksLike = () => {
  return (
    <section className="relative bg-parchment-dark py-16 md:py-24 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[250px] rounded-full blur-3xl pointer-events-none" style={{ background: 'hsl(260 22% 90% / 0.25)' }} />

      <div className="container mx-auto px-6 md:px-10 max-w-3xl relative z-10">
        <div className="text-center mb-10">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-3">
            Guidance
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-3">
            What support can look like
          </h2>
          <p className="font-sans text-sm font-light text-muted-foreground max-w-md mx-auto">
            A gentle progression from uncertainty to clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <div key={i} className="bg-card border border-border/50 rounded-xl p-6 shadow-card-brand flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[hsl(var(--stage-support)/0.4)] flex items-center justify-center flex-shrink-0">
                <span className="font-serif text-base text-[hsl(var(--stage-support-accent))]">{item.icon}</span>
              </div>
              <div>
                <p className="font-serif text-base text-foreground leading-snug mb-1">{item.step}</p>
                <p className="font-sans text-xs font-light text-muted-foreground">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportWhatItLooksLike;

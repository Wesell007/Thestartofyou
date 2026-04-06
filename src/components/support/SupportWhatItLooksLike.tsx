const items = [
  { step: "Understanding what you're experiencing", detail: "Making sense of what feels off" },
  { step: "Getting clarity on what's normal", detail: "Separating worry from genuine concern" },
  { step: "Knowing when to seek help", detail: "Clear guidance without alarm" },
  { step: "Taking small, manageable next steps", detail: "One thing at a time" },
];

const SupportWhatItLooksLike = () => {
  return (
    <section className="bg-parchment-dark py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <div className="flex items-center gap-4 mb-4">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted">
            Guidance
          </p>
          <div className="h-px flex-1 bg-border/60" />
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-10 max-w-lg">
          What support can look like
        </h2>
        <div className="space-y-0">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-5 py-5 border-b border-border/40 last:border-b-0">
              <div className="w-10 h-10 rounded-full bg-[hsl(var(--stage-support)/0.4)] flex items-center justify-center flex-shrink-0">
                <span className="font-serif text-sm text-[hsl(var(--stage-support-accent))]">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div>
                <p className="font-serif text-base text-foreground leading-snug mb-1">{item.step}</p>
                <p className="font-sans text-sm font-light text-muted-foreground">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportWhatItLooksLike;

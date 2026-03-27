const feelings = [
  "Something feels different, but you're not sure why",
  "You're overthinking or second-guessing",
  "You feel unsettled without a clear reason",
  "You want reassurance but don't know where to start",
];

const SupportHowThisFeels = () => {
  return (
    <section className="bg-parchment py-28 md:py-36">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
          Recognition
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-10 max-w-lg">
          How this can feel
        </h2>
        <div className="space-y-4">
          {feelings.map((f, i) => (
            <div key={i} className="bg-card border border-border/50 rounded-lg px-7 py-5 shadow-card-brand">
              <p className="font-sans text-base font-light text-foreground leading-relaxed">{f}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportHowThisFeels;

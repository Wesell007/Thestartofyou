const SupportSeekMore = () => {
  return (
    <section className="bg-parchment py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <div className="bg-card border-l-4 border-l-[hsl(var(--stage-support-accent)/0.6)] border border-[hsl(var(--stage-support-accent)/0.12)] rounded-xl p-7 md:p-10 shadow-card-brand">
          <div className="flex items-start gap-5">
            <div className="hidden sm:block w-12 h-12 rounded-full bg-[hsl(var(--stage-support)/0.4)] flex-shrink-0 flex items-center justify-center">
              <span className="font-serif text-lg text-[hsl(var(--stage-support-accent))]">♡</span>
            </div>
            <div>
              <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-[hsl(var(--stage-support-accent))] mb-3">
                When to seek more support
              </p>
              <h2 className="font-serif text-xl sm:text-2xl text-foreground leading-tight mb-5">
                If something feels intense, persistent, or difficult to manage
              </h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {["Intense", "Persistent", "Difficult to manage"].map((item, i) => (
                  <span key={i} className="font-sans text-xs font-light bg-[hsl(var(--stage-support)/0.35)] text-foreground/70 rounded-full px-4 py-1.5 border border-[hsl(var(--stage-support-accent)/0.1)]">
                    {item}
                  </span>
                ))}
              </div>
              <p className="font-serif italic text-base text-foreground/75 leading-relaxed">
                It may help to speak to a healthcare professional. Asking for support is a sign of strength, not weakness.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportSeekMore;

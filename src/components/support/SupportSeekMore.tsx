const SupportSeekMore = () => {
  return (
    <section className="bg-parchment py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <div className="bg-card border border-[hsl(var(--stage-support-accent)/0.2)] rounded-xl p-8 md:p-10 shadow-card-brand">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-4">
            Next steps
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-6">
            When to seek more support
          </h2>
          <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-6">
            If something feels:
          </p>
          <div className="grid grid-cols-3 gap-3 mb-8">
            {["Intense", "Persistent", "Difficult to manage"].map((item, i) => (
              <div key={i} className="bg-[hsl(var(--stage-support)/0.3)] rounded-lg py-3 px-4 text-center">
                <span className="font-serif text-sm text-foreground">{item}</span>
              </div>
            ))}
          </div>
          <div className="border-l-3 border-[hsl(var(--stage-support-accent)/0.5)] pl-6 bg-[hsl(var(--stage-support)/0.15)] rounded-r-lg py-4 pr-6">
            <p className="font-serif italic text-base text-foreground/80 leading-relaxed">
              It may help to speak to a healthcare professional. Asking for support is a sign of strength, not weakness.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportSeekMore;

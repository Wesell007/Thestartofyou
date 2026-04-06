const SupportNoRightWords = () => {
  return (
    <section className="bg-parchment py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <div className="bg-card border-t-2 border-t-[hsl(var(--stage-support-accent)/0.4)] border border-[hsl(var(--stage-support-accent)/0.15)] rounded-xl p-8 md:p-12 shadow-card-brand">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-[hsl(var(--stage-support-accent))] mb-5">
            Starting point
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-[2.5rem] text-foreground leading-tight mb-6">
            You don't need to explain this perfectly
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { icon: "◇", text: "You might not have the right words" },
              { icon: "⟳", text: "You might not know exactly what's wrong" },
              { icon: "→", text: "You might just have a feeling something isn't right" },
            ].map((p, i) => (
              <div key={i} className="bg-[hsl(var(--stage-support)/0.2)] rounded-lg px-5 py-4 text-center">
                <span className="font-serif text-lg text-[hsl(var(--stage-support-accent))] block mb-2">{p.icon}</span>
                <p className="font-sans text-sm font-light text-muted-foreground leading-snug">{p.text}</p>
              </div>
            ))}
          </div>
          <div className="border-l-3 border-[hsl(var(--stage-support-accent)/0.5)] pl-6 bg-[hsl(var(--stage-support)/0.15)] rounded-r-lg py-4 pr-6">
            <p className="font-serif italic text-base md:text-lg text-foreground/80 leading-relaxed">
              You can start from wherever you are, even if it's just a feeling.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportNoRightWords;

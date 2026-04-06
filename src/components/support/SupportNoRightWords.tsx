const points = [
  "You might not have the right words",
  "You might not know exactly what's wrong",
  "You might just have a feeling something isn't right",
];

const SupportNoRightWords = () => {
  return (
    <section className="bg-parchment py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <div className="bg-card border border-[hsl(var(--stage-support-accent)/0.2)] rounded-xl p-8 md:p-12 shadow-card-brand">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-[hsl(var(--stage-support-accent))] mb-5">
            Starting point
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground leading-tight mb-8">
            You don't need to explain this perfectly
          </h2>
          <div className="space-y-4 mb-8">
            {points.map((p, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[hsl(var(--stage-support)/0.5)] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="font-serif text-sm text-[hsl(var(--stage-support-accent))]">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <span className="font-sans text-base font-light text-muted-foreground leading-relaxed pt-1">{p}</span>
              </div>
            ))}
          </div>
          <div className="border-l-3 border-[hsl(var(--stage-support-accent)/0.4)] pl-6 bg-[hsl(var(--stage-support)/0.2)] rounded-r-lg py-4 pr-6">
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

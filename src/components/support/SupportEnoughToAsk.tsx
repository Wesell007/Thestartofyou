const SupportEnoughToAsk = () => {
  return (
    <section className="bg-parchment py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-10 items-start">
          <div className="md:col-span-3">
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-[hsl(var(--stage-support-accent))] mb-4">
              Permission
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-6">
              When you're not sure if it's "enough"
            </h2>
            <div className="space-y-3">
              {[
                { tag: "Doubt", text: "Wondering if you're overreacting" },
                { tag: "Delay", text: "Waiting to see if it goes away" },
                { tag: "Guilt", text: "Not wanting to waste someone's time" },
              ].map((p, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="font-sans text-[10px] font-light tracking-[0.15em] uppercase text-[hsl(var(--stage-support-accent))] bg-[hsl(var(--stage-support)/0.3)] rounded-full px-3 py-1 flex-shrink-0">
                    {p.tag}
                  </span>
                  <span className="font-sans text-sm font-light text-muted-foreground">{p.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="bg-card border-t-2 border-t-[hsl(var(--stage-support-accent)/0.4)] border border-[hsl(var(--stage-support-accent)/0.12)] rounded-xl p-6 shadow-card-brand">
              <p className="font-serif italic text-base md:text-lg text-foreground/80 leading-relaxed mb-3">
                If something is on your mind, it's valid to ask about it. Even if you're unsure.
              </p>
              <p className="font-sans text-xs font-light text-muted-foreground">
                You don't need certainty to deserve support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportEnoughToAsk;

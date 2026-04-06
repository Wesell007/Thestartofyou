const points = [
  "Wondering if you're overreacting",
  "Waiting to see if it goes away",
  "Not wanting to waste someone's time",
];

const SupportEnoughToAsk = () => {
  return (
    <section className="bg-parchment py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-start">
          <div className="md:col-span-3">
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-[hsl(var(--stage-support-accent))] mb-4">
              Permission
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-8">
              When you're not sure if it's "enough"
            </h2>
            <ul className="space-y-4">
              {points.map((p, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-[hsl(var(--stage-support)/0.4)] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="font-serif text-xs text-[hsl(var(--stage-support-accent))]">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <span className="font-sans text-base font-light text-muted-foreground leading-relaxed pt-0.5">{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <div className="bg-[hsl(var(--stage-support)/0.25)] border border-[hsl(var(--stage-support-accent)/0.15)] rounded-xl p-7">
              <div className="border-l-3 border-[hsl(var(--stage-support-accent)/0.4)] pl-5">
                <p className="font-serif italic text-base md:text-lg text-foreground/80 leading-relaxed mb-4">
                  If something is on your mind, it's valid to ask about it. Even if you're unsure.
                </p>
                <p className="font-sans text-xs font-light text-muted-foreground">
                  You don't need certainty to deserve support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportEnoughToAsk;

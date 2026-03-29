const essentials = [
  "A safe place to sleep",
  "A way to feed",
  "Clothing for warmth and comfort",
  "Basic care items",
];

const PreparingEssentials = () => {
  return (
    <section className="bg-parchment py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
          <div>
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
              Core Needs
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-6">
              What you actually need
            </h2>
            <p className="font-sans text-base font-light text-muted-foreground leading-relaxed">
              At its core, your baby needs:
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <ul className="space-y-4">
              {essentials.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-sage shrink-0" />
                  <p className="font-sans text-base font-light text-foreground leading-relaxed">
                    {item}
                  </p>
                </li>
              ))}
            </ul>

            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mt-2">
              Everything else is additional, not essential.
            </p>

            <div className="bg-sage-bg/40 border border-sage-light/30 rounded-md px-5 py-4 mt-2">
              <p className="font-sans text-xs font-light tracking-[0.12em] uppercase text-sage-muted mb-1.5">
                What this means
              </p>
              <p className="font-serif italic text-base text-foreground/70 leading-relaxed">
                What matters most is not how much you have, but how you use what you have.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreparingEssentials;

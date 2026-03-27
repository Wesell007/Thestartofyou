const SupportSeekMore = () => {
  return (
    <section className="bg-parchment-dark py-28 md:py-36">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
          Next steps
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-8 max-w-lg">
          When to seek more support
        </h2>
        <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-6">
          If something feels:
        </p>
        <ul className="space-y-3 mb-10">
          {["Intense", "Persistent", "Or difficult to manage"].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-sage mt-2.5 flex-shrink-0" />
              <span className="font-sans text-base font-light text-muted-foreground leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
        <div className="border-l-2 border-sage/30 pl-6">
          <p className="font-serif italic text-base text-foreground/70 leading-relaxed">
            It may help to speak to a healthcare professional.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SupportSeekMore;

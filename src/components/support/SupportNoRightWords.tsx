const points = [
  "You might not have the right words",
  "You might not know exactly what's wrong",
  "You might just have a feeling something isn't right",
];

const SupportNoRightWords = () => {
  return (
    <section className="bg-parchment-dark py-28 md:py-36">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
          Starting point
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-10 max-w-lg">
          You don't need to explain this perfectly
        </h2>
        <ul className="space-y-4 mb-10">
          {points.map((p, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-sage mt-2.5 flex-shrink-0" />
              <span className="font-sans text-base font-light text-muted-foreground leading-relaxed">{p}</span>
            </li>
          ))}
        </ul>
        <div className="border-l-2 border-sage/30 pl-6">
          <p className="font-serif italic text-base text-foreground/70 leading-relaxed">
            You can start from wherever you are, even if it's just a feeling.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SupportNoRightWords;

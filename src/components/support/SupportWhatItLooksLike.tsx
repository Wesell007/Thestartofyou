const items = [
  "Understanding what you're experiencing",
  "Getting clarity on what's normal",
  "Knowing when to seek help",
  "Taking small, manageable next steps",
];

const SupportWhatItLooksLike = () => {
  return (
    <section className="bg-parchment py-28 md:py-36">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
          Guidance
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-10 max-w-lg">
          What support can look like
        </h2>
        <div className="space-y-4">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <span className="font-serif text-sage/40 text-lg mt-0.5">{String(i + 1).padStart(2, "0")}</span>
              <p className="font-sans text-base font-light text-muted-foreground leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportWhatItLooksLike;

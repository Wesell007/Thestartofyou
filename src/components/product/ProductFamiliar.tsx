const items = [
  {
    thought: "Too much on your mind, but nowhere to put it",
    detail: "The mental load builds quietly",
  },
  {
    thought: "Things feel important, but easy to forget later",
    detail: "Weeks blur faster than you expect",
  },
  {
    thought: "You keep thinking 'I will remember this'",
    detail: "You probably will not, and that is normal",
  },
  {
    thought: "Some moments feel bigger than they look",
    detail: "But only if you capture them",
  },
];

const ProductFamiliar = () => {
  return (
    <section className="relative bg-card py-14 md:py-20 overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-14 items-start">
          {/* Left: heading */}
          <div className="md:col-span-2 text-center md:text-left md:sticky md:top-32">
            <div className="editorial-rule md:editorial-rule-left mb-5" />
            <h2 className="font-serif text-2xl sm:text-3xl md:text-[2rem] text-foreground leading-snug mb-3">
              This might feel familiar
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed max-w-sm mx-auto md:mx-0">
              The journal exists because of moments like these. Not dramatic ones. The quiet kind that shape how you remember this time.
            </p>
          </div>

          {/* Right: recognition cards with detail */}
          <div className="md:col-span-3 space-y-4">
            {items.map((item, i) => (
              <div
                key={i}
                className="bg-parchment/60 border border-border/30 rounded-2xl p-5 flex items-start gap-4"
              >
                <span className="font-serif text-lg text-sage/40 mt-0.5 shrink-0 w-6 text-center">{i + 1}</span>
                <div>
                  <p className="font-sans text-sm text-foreground leading-relaxed mb-1">{item.thought}</p>
                  <p className="font-sans text-xs font-light text-muted-foreground">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductFamiliar;

import { Check } from "lucide-react";

const items = [
  "You have a lot on your mind, but nowhere to put it",
  "Things feel important, but easy to forget later",
  "You keep thinking 'I will remember this' and then you do not",
  "Some moments feel bigger than they look",
];

const ProductFamiliar = () => {
  return (
    <section className="relative bg-card py-16 md:py-24 overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-14 items-center">
          {/* Left: heading */}
          <div className="md:col-span-2 text-center md:text-left">
            <div className="editorial-rule md:editorial-rule-left mb-6" />
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground leading-snug mb-4">
              This might feel familiar
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed max-w-sm mx-auto md:mx-0">
              The journal exists because of moments like these. Not dramatic ones, but the quiet kind that shape how you remember this time.
            </p>
          </div>

          {/* Right: recognition cards */}
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {items.map((item, i) => (
              <div
                key={i}
                className="bg-parchment/60 border border-border/30 rounded-2xl p-5 flex items-start gap-3"
              >
                <span className="w-5 h-5 rounded-full bg-sage/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={10} className="text-sage" />
                </span>
                <p className="font-sans text-sm font-light text-foreground leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductFamiliar;

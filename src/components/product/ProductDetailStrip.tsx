const details = [
  "Hardcover A5",
  "144 pages",
  "Weekly prompts",
  "Keepsake pocket",
  "Gift-ready",
  "Available on Amazon",
];

const ProductDetailStrip = () => {
  return (
    <section className="bg-parchment/60 py-8 md:py-10 border-y border-border/20">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          {details.map((d) => (
            <span
              key={d}
              className="bg-sage/8 border border-sage/15 rounded-pill px-3.5 py-1.5 font-sans text-[11px] sm:text-xs font-light text-foreground/70"
            >
              {d}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductDetailStrip;

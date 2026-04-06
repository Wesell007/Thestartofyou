import productMoment from "@/assets/product-moment.jpg";

const ProductMoment = () => {
  return (
    <section className="relative bg-parchment-dark py-14 md:py-20 overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] glow-sage opacity-40" />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-10 items-center">
          {/* Image — wider */}
          <div className="md:col-span-3">
            <img
              src={productMoment}
              alt="Hands writing gently in a journal"
              width={1280}
              height={800}
              loading="lazy"
              className="w-full rounded-2xl shadow-elevated object-cover"
            />
          </div>

          {/* Pull-quote */}
          <div className="md:col-span-2">
            <div className="border-l-2 pl-6" style={{ borderColor: 'hsl(var(--sage) / 0.3)' }}>
              <p className="font-serif text-xl sm:text-2xl italic text-foreground leading-snug mb-3">
                Some things are worth holding onto
              </p>
              <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-5">
                This is not about documenting everything. It is about noticing what matters and giving it somewhere to live, so you can return to it later and feel something again.
              </p>
              <p className="font-sans text-xs font-light text-muted-foreground/60 italic">
                The journal gives you permission to pause.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductMoment;

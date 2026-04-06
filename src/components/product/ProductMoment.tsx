import productMoment from "@/assets/product-moment.jpg";

const ProductMoment = () => {
  return (
    <section className="relative bg-card py-16 md:py-24 overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-center">
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
            <div className="border-l-2 border-sage/30 pl-6">
              <p className="font-serif text-xl sm:text-2xl italic text-foreground leading-snug mb-4">
                Some things are worth holding onto
              </p>
              <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                The journal gives you a small, protected moment to pause. Not to document everything, but to notice what matters and give it somewhere to live.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductMoment;

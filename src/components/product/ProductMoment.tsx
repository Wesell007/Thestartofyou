import journalFirstsPage from "@/assets/journal-firsts-page.jpg";

const ProductMoment = () => {
  return (
    <section className="relative bg-parchment-dark py-14 md:py-20 overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] glow-sage opacity-40" />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-10 items-center">
          {/* Image — firsts/milestone page */}
          <div className="md:col-span-3">
            <img
              src={journalFirstsPage}
              alt="Journal open to the Firsts milestone page with handwritten entries and pregnancy photos"
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
                Capture every precious moment from bump to baby
              </p>
              <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-5">
                The feelings shift, the weeks blur, and the details you thought you would always remember quietly fade. This journal gives them somewhere to live — so you can return to them later and feel something again.
              </p>
              <p className="font-sans text-xs font-light text-muted-foreground/60 italic">
                First kick. First scan. First time you felt like a mother. All of it, held.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductMoment;

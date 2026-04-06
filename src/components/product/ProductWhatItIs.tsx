import journalBook from "@/assets/journal-book.jpg";

const ProductWhatItIs = () => {
  return (
    <section className="relative bg-parchment py-16 md:py-24 overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
          {/* Image */}
          <div className="flex justify-center md:justify-start relative">
            <img
              src={journalBook}
              alt="The Start of You Journal"
              width={400}
              height={400}
              loading="lazy"
              className="w-56 sm:w-64 md:w-72 rounded-2xl shadow-elevated"
            />
          </div>

          {/* Copy */}
          <div>
            <div className="editorial-rule-left mb-6" />
            <p className="stage-label mb-3">What this is</p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-5 leading-snug">
              A guided journal for pregnancy and beyond
            </h2>
            <p className="font-sans text-sm sm:text-base font-light text-muted-foreground leading-relaxed mb-6 max-w-md">
              Part emotional companion, part keepsake, part practical support. The Start of You Journal gives you somewhere to capture thoughts, feelings, and reflections across every stage of your journey.
            </p>
            <div className="space-y-3">
              {[
                "Supportive without pressure",
                "Structured enough to guide, open enough to be yours",
                "Designed to sit alongside your digital journey",
              ].map((item) => (
                <p key={item} className="font-sans text-sm font-light text-foreground flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage mt-2 shrink-0" />
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductWhatItIs;

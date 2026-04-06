import editorialImg from "@/assets/guidance-editorial-3.jpg";

const GuidanceEditorialBreak = () => (
  <section className="relative bg-card/60 overflow-hidden">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="md:flex items-center gap-10 lg:gap-16 py-16 sm:py-20 md:py-24">
        {/* Image */}
        <div className="md:w-[40%] shrink-0 mb-8 md:mb-0">
          <div className="rounded-2xl overflow-hidden aspect-[4/3]">
            <img
              src={editorialImg}
              alt="Baby shoes and knitted blanket"
              loading="lazy"
              width={800}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Quote / editorial voice */}
        <div className="flex-1">
          <div className="editorial-rule-left mb-6" />
          <blockquote className="font-serif text-lg sm:text-xl md:text-2xl text-foreground leading-relaxed italic mb-5">
            "The early days of parenthood are full of questions you never expected to ask. This is what we're here for."
          </blockquote>
          <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed max-w-md">
            Every article in our guidance library is written with care, reviewed by medical professionals, and designed to meet you exactly where you are — no judgement, just clarity.
          </p>
          <div className="flex items-center gap-3 mt-6">
            <div className="w-8 h-[1px] bg-sage/30" />
            <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-sage/60">
              The Start of You editorial team
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default GuidanceEditorialBreak;

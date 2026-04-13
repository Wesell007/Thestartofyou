import journalFlatlay from "@/assets/journal-flatlay.jpg";
import { ExternalLink, BookOpen } from "lucide-react";

const ProductWhatItIs = () => {
  return (
    <section className="relative bg-parchment py-14 md:py-20 overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-14 items-center">
          {/* Image — 2 cols */}
          <div className="md:col-span-2 flex justify-center md:justify-start relative">
            <div className="relative">
              <img
                src={journalFlatlay}
                alt="The Start of You Journal"
                width={400}
                height={400}
                loading="lazy"
                className="w-52 sm:w-60 md:w-64 rounded-2xl shadow-elevated"
              />
              {/* Product spec badge */}
              <div className="absolute -bottom-3 -right-3 bg-card/90 backdrop-blur-sm rounded-xl px-3.5 py-2.5 border border-border/30 shadow-soft">
                <p className="font-sans text-[10px] font-light text-muted-foreground">200+ pages</p>
                <p className="font-sans text-[10px] font-light text-muted-foreground">Guided prompts</p>
              </div>
            </div>
          </div>

          {/* Copy — 3 cols */}
          <div className="md:col-span-3">
            <div className="editorial-rule-left mb-5" />
            <p className="stage-label mb-2">What this is</p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-[2rem] text-foreground mb-4 leading-snug">
              Not just a notebook. A companion.
            </h2>
            <p className="font-sans text-sm sm:text-base font-light text-muted-foreground leading-relaxed mb-6 max-w-md">
              Part emotional support, part keepsake, part practical guide. The Start of You Journal gives structure to the thoughts that would otherwise disappear, across every stage of pregnancy and beyond.
            </p>

            {/* Value chips */}
            <div className="flex flex-wrap gap-2.5 mb-7">
              {["Guided prompts", "Open reflection space", "Stage-by-stage structure", "Keepsake quality"].map((item) => (
                <span key={item} className="bg-sage/8 border border-sage/15 rounded-pill px-4 py-2 font-sans text-xs font-light text-foreground">
                  {item}
                </span>
              ))}
            </div>

            {/* Mid-page CTA */}
            <div className="flex flex-col sm:flex-row items-start gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[13px] font-medium shadow-cta hover:bg-terracotta-hover transition-all"
              >
                Get the journal
                <ExternalLink size={13} />
              </a>
              <span className="inline-flex items-center gap-1.5 font-sans text-xs font-light text-muted-foreground mt-1 sm:mt-2">
                <BookOpen size={11} className="text-sage" />
                Available on Amazon
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductWhatItIs;

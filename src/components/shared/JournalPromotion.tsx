import journalFlatlay from "@/assets/journal-flatlay.jpg";
import botanicalTr from "@/assets/botanical-branch-tr.png";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";

interface JournalPromotionProps {
  contextCopy?: string;
}

const JournalPromotion = ({
  contextCopy = "Capture your experiences alongside your weekly guidance. Keep a thoughtful, private record of your journey with The Start of You Journal.",
}: JournalPromotionProps) => {
  return (
    <section className="relative bg-parchment-dark overflow-hidden">
      {/* Botanical accent — top-right */}
      <img
        src={botanicalTr}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 w-[120px] md:w-[180px] opacity-20 select-none"
      />

      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Image — bleeds to edge on desktop for editorial feel */}
        <div className="relative h-[320px] sm:h-[380px] md:h-auto md:min-h-[440px] overflow-hidden">
          <img
            src={journalFlatlay}
            alt="The Start of You pregnancy journal styled with baby clothes and natural accessories"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          {/* Subtle inner shadow for depth */}
          <div className="absolute inset-0 shadow-[inset_-40px_0_60px_-20px_hsl(var(--parchment-dark))] hidden md:block" />
        </div>

        {/* Content — right side */}
        <div className="relative z-10 flex items-center py-10 sm:py-14 md:py-16 px-6 sm:px-8 md:px-12 lg:px-16">
          <div className="max-w-md">
            <div className="editorial-rule-left mb-5" />
            <p className="stage-label mb-2.5">Physical + Digital</p>
            <h2 className="font-serif text-[1.75rem] sm:text-3xl md:text-[2.25rem] text-foreground mb-4 leading-tight">
              A physical companion to your digital journey
            </h2>
            <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed mb-6 md:mb-8">
              {contextCopy}
            </p>

            <div className="grid grid-cols-2 gap-2.5 mb-6 md:mb-8">
              {[
                "Weekly reflection prompts",
                "Free-form entry space",
                "Private and personal",
                "A keepsake for life",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-sage/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={9} className="text-sage" />
                  </span>
                  <span className="font-sans text-sm font-light text-foreground leading-snug">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-3">
              <Link
                to="/product"
                className="inline-flex items-center gap-3 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[13px] font-medium shadow-cta hover:bg-terracotta-hover transition-all duration-300"
              >
                <span>Explore the journal</span>
                <ArrowRight size={15} />
              </Link>
              <span className="font-sans text-xs font-light text-muted-foreground self-center">
                Available on Amazon
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JournalPromotion;

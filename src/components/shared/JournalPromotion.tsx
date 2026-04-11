import homeJournalFlatlay from "@/assets/home-journal-flatlay.jpg";
import { ArrowRight, Star, Check } from "lucide-react";
import { Link } from "react-router-dom";

interface JournalPromotionProps {
  contextCopy?: string;
}

const JournalPromotion = ({
  contextCopy = "Capture your experiences alongside your weekly guidance. Keep a thoughtful, private record of your journey with The Start of You Journal.",
}: JournalPromotionProps) => {
  return (
    <section className="relative bg-parchment-dark section-spacing overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/4 right-0 w-[350px] h-[350px] glow-sage" />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
          {/* Image */}
          <div className="flex justify-center md:justify-start relative">
            <div className="relative group">
              <img
                src={homeJournalFlatlay}
                alt="The Start of You pregnancy journal on a linen surface with dried flowers and tea"
                width={1200}
                height={800}
                loading="lazy"
                className="w-full max-w-sm sm:max-w-md rounded-2xl shadow-elevated object-cover group-hover:shadow-card-hover transition-shadow duration-500"
              />
              {/* Floating badge */}
              <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-xl px-3.5 py-2.5 border border-border/30 shadow-soft">
                <div className="flex gap-0.5 mb-1">
                  {[1,2,3,4,5].map(i => <Star key={i} size={10} className="text-terracotta fill-terracotta" />)}
                </div>
                <p className="font-sans text-[9px] font-light text-muted-foreground/60">Available on Amazon</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="editorial-rule-left mb-5 md:mb-6" />
            <p className="stage-label mb-2.5">Physical + Digital</p>
            <h2 className="font-serif text-[1.75rem] sm:text-3xl md:text-[2.25rem] text-foreground mb-4 md:mb-5 leading-tight">
              A physical companion to your digital journey
            </h2>
            <p className="font-sans text-[15px] sm:text-base font-light text-muted-foreground leading-relaxed mb-6 md:mb-8 max-w-md">
              {contextCopy}
            </p>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mb-6 md:mb-8">
              {[
                "Weekly reflection prompts",
                "Free-form entry space",
                "Private and personal",
                "A keepsake for life",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5 bg-parchment/60 rounded-xl p-3 sm:p-3.5">
                  <span className="w-4 h-4 rounded-full bg-sage/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={9} className="text-sage" />
                  </span>
                  <span className="font-sans text-sm font-light text-foreground leading-snug">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              to="/product"
              className="inline-flex items-center justify-between gap-4 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[13px] font-medium shadow-cta hover:bg-terracotta-hover transition-all duration-300"
            >
              <span>Explore the journal</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JournalPromotion;

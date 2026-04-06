import homeJournalFlatlay from "@/assets/home-journal-flatlay.jpg";
import { ArrowRight, Star } from "lucide-react";
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
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] glow-sage" />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Image — editorial flatlay */}
          <div className="flex justify-center md:justify-start relative">
            <div className="relative">
              <img
                src={homeJournalFlatlay}
                alt="The Start of You pregnancy journal on a linen surface with dried flowers and tea"
                width={1200}
                height={800}
                loading="lazy"
                className="w-full max-w-sm sm:max-w-md rounded-2xl shadow-elevated object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="editorial-rule-left mb-6 md:mb-8" />
            <p className="stage-label mb-3">Physical + Digital</p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-4 md:mb-6 leading-tight">
              A physical companion to your digital journey
            </h2>
            <p className="font-sans text-sm sm:text-base font-light text-muted-foreground leading-relaxed mb-8 md:mb-10 max-w-md">
              {contextCopy}
            </p>

            <ul className="space-y-4 sm:space-y-5 mb-8 md:mb-10">
              {[
                "Weekly reflection prompts",
                "Free-form entry space",
                "Private and personal",
                "A keepsake to return to over time",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3.5 font-sans text-sm font-light text-foreground">
                  <span className="w-5 h-5 rounded-full bg-sage flex items-center justify-center shrink-0">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="space-y-3">
              <Link
                to="/product"
                className="flex items-center justify-between bg-terracotta text-terracotta-foreground rounded-pill px-6 sm:px-7 py-3.5 sm:py-4 font-sans text-[13px] font-medium shadow-cta hover:bg-terracotta-hover transition-all duration-300 max-w-xs"
              >
                <span>Explore the journal</span>
                <ArrowRight size={16} />
              </Link>
              <div className="flex items-center gap-2 pl-2">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(i => <Star key={i} size={10} className="text-terracotta fill-terracotta" />)}
                </div>
                <p className="font-sans text-xs font-light text-muted-foreground/70">
                  Available on Amazon
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JournalPromotion;

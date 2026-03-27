import journalBook from "@/assets/journal-book.jpg";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface JournalPromotionProps {
  /** Short contextual copy that adapts per page. Defaults to pregnancy copy. */
  contextCopy?: string;
}

const JournalPromotion = ({
  contextCopy = "Capture your experiences alongside your weekly guidance. Keep a thoughtful, private record of your journey with The Start of You journal.",
}: JournalPromotionProps) => {
  return (
    <section className="bg-parchment py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-5">
            A Physical Companion to Your Digital Journey
          </h2>
          <p className="font-sans text-base font-light text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {contextCopy}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Book image */}
          <div className="flex justify-center md:justify-start relative">
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-sage-bg rounded-full opacity-30 blur-2xl pointer-events-none" />
            <img
              src={journalBook}
              alt="The Start of You pregnancy journal book"
              width={400}
              height={400}
              loading="lazy"
              className="w-64 md:w-80 rounded-2xl shadow-soft relative z-10"
            />
          </div>

          {/* Features card */}
          <div className="bg-sage-bg rounded-2xl p-8 md:p-10">
            <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
              Keep Your Own Record
            </h3>
            <ul className="space-y-4 mb-8">
              {[
                "Weekly reflection prompts",
                "Free-form entry space",
                "Private and personal",
                "A keepsake to return to over time",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 font-sans text-sm font-light text-foreground">
                  <span className="w-5 h-5 rounded-full bg-sage flex items-center justify-center shrink-0">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="space-y-3">
              <Link
                to="/product"
                className="flex items-center justify-between bg-terracotta text-terracotta-foreground rounded-pill px-6 py-3.5 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
              >
                <span>Learn about the journal</span>
                <ArrowRight size={16} />
              </Link>
              <p className="font-sans text-xs font-light text-muted-foreground pl-2">
                Available on Amazon.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JournalPromotion;

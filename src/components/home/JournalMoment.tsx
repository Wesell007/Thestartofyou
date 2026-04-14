import journalFlatlay from "@/assets/journal-flatlay.jpg";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const JournalMoment = () => {
  return (
    <section className="bg-parchment overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-12 items-center py-14 md:py-20">
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden h-[280px] sm:h-[340px] md:h-[400px] mb-8 md:mb-0">
            <img
              src={journalFlatlay}
              alt="The Start of You pregnancy journal styled with baby clothes and natural accessories"
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </div>

          {/* Copy */}
          <div className="max-w-sm">
            <div className="h-px w-10 bg-sage/40 mb-5" />
            <p className="font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-sage mb-3">
              Physical + Digital
            </p>
            <h2 className="font-serif text-[1.5rem] sm:text-[1.75rem] text-foreground leading-tight mb-3">
              A companion you can hold
            </h2>
            <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed mb-6">
              Capture your experiences week by week. A private, thoughtful record of the journey, designed to sit alongside your digital guide.
            </p>
            <Link
              to="/product"
              className="inline-flex items-center gap-2.5 font-sans text-sm font-medium text-foreground hover:text-sage transition-colors"
            >
              Explore the journal
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JournalMoment;

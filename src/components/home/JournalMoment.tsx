import journalFlatlay from "@/assets/journal-flatlay.jpg";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const JournalMoment = () => {
  return (
    <section className="bg-parchment overflow-hidden">
      {/* Top divider */}
      <div className="section-divider" />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center py-16 md:py-24">
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-soft">
            <img
              src={journalFlatlay}
              alt="The Start of You pregnancy journal styled with baby clothes and natural accessories"
              className="w-full h-auto block rounded-2xl"
              loading="lazy"
            />
          </div>

          {/* Copy */}
          <div className="max-w-[22rem] mx-auto md:mx-0">
            <div className="h-px w-10 bg-sage/40 mb-6" />
            <p className="font-sans text-[10.5px] font-medium tracking-[0.22em] uppercase text-sage mb-4">
              Physical + Digital
            </p>
            <h2 className="font-serif text-[1.5rem] sm:text-[1.75rem] text-foreground leading-tight mb-4">
              A companion you can hold
            </h2>
            <p className="font-sans text-[14.5px] font-light text-muted-foreground leading-[1.75] mb-7">
              Capture your experiences week by week. A private, thoughtful record of the journey, designed to sit alongside your digital guide.
            </p>
            <Link
              to="/product"
              className="inline-flex items-center gap-2.5 font-sans text-[13px] font-medium text-foreground hover:text-sage transition-colors duration-300"
            >
              Explore the journal
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JournalMoment;

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
              Our pregnancy journal gives you a private place to capture the weeks in print, while your digital journey can begin before pregnancy and continue into your baby's first year.
            </p>
            <Link
              to="/journal"
              className="inline-flex items-center gap-2.5 font-sans text-[13px] font-medium text-foreground hover:text-sage transition-colors duration-300"
            >
              Explore the journal
              <ArrowRight size={13} />
            </Link>
            <p className="font-sans text-[13px] font-light text-muted-foreground leading-relaxed mt-5">
              Need something more personal?{" "}
              <Link
                to="/ask"
                className="text-foreground underline underline-offset-4 decoration-sage/40 hover:decoration-sage transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/40 rounded-sm"
              >
                Ask your companion
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JournalMoment;

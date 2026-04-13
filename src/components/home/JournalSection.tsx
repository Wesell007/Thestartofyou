import journalCover from "@/assets/journal-cover.jpg";
import botanicalBl from "@/assets/botanical-branch-bl.png";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const JournalSection = () => {
  return (
    <section className="relative bg-parchment py-28 md:py-36 overflow-hidden">
      {/* Botanical accent — bottom-left */}
      <img
        src={botanicalBl}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 w-[140px] md:w-[200px] opacity-25 select-none"
      />

      <div className="container mx-auto px-6 md:px-10 max-w-5xl relative z-10">
        <div className="text-center mb-20">
          <div className="editorial-rule mb-8" />
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-7">
            A Physical Companion to Your Digital Journey
          </h2>
          <p className="font-sans text-base font-light text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Capture your experiences alongside your weekly updates. Keep a thoughtful, private record of your journey using The Start of You one-year pregnancy journal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-16 items-center">
          {/* Book image — real journal cover */}
          <div className="flex justify-center md:justify-start relative">
            <div className="absolute -bottom-6 -left-6 w-36 h-36 bg-sage-bg rounded-full opacity-15 blur-3xl pointer-events-none" />
            <img
              src={journalCover}
              alt="The Start of You pregnancy journal — front cover with woodland watercolour illustration"
              width={400}
              height={400}
              loading="lazy"
              className="w-64 md:w-80 rounded-2xl shadow-elevated relative z-10 object-cover"
            />
          </div>

          {/* Features card */}
          <div className="bg-sage-bg/70 rounded-2xl p-10 md:p-12">
            <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
              Keep Your Own Record
            </h3>
            <ul className="space-y-5 mb-10">
              {[
                "Weekly reflection prompts",
                "Free-form entry space",
                "Private and secure",
                "Exportable timeline",
              ].map((item) => (
                <li key={item} className="flex items-center gap-4 font-sans text-sm font-light text-foreground">
                  <span className="w-5 h-5 rounded-full bg-sage flex items-center justify-center shrink-0">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="space-y-3">
              <Link
                to="/product"
                className="flex items-center justify-between bg-terracotta text-terracotta-foreground rounded-pill px-7 py-4 font-sans text-[13px] font-medium shadow-cta hover:bg-terracotta-hover transition-all duration-300"
              >
                <span>Explore the journal</span>
                <ArrowRight size={16} />
              </Link>
              <p className="font-sans text-xs font-light text-muted-foreground/70 pl-2">
                Available on Amazon.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JournalSection;

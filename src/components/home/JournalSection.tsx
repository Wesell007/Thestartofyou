import journalFlatlay from "@/assets/journal-flatlay.jpg";
import journalCover from "@/assets/journal-cover.jpg";
import botanicalBl from "@/assets/botanical-branch-bl.png";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const JournalSection = () => {
  return (
    <section className="relative bg-parchment overflow-hidden">
      {/* Botanical accent — bottom-left */}
      <img
        src={botanicalBl}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 w-[140px] md:w-[200px] opacity-20 select-none"
      />

      <div className="relative z-10">
        {/* Full-width hero image with overlay content */}
        <div className="relative">
          {/* Flatlay image — full width, cropped for cinematic ratio */}
          <div className="relative w-full h-[420px] sm:h-[480px] md:h-[540px] overflow-hidden">
            <img
              src={journalFlatlay}
              alt="The Start of You pregnancy journal styled with baby clothes and natural accessories"
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
            {/* Gradient overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-parchment/95 via-parchment/70 to-transparent md:from-parchment/90 md:via-parchment/50" />
            
            {/* Content overlaid on the image */}
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-6 md:px-10 max-w-5xl">
                <div className="max-w-md">
                  <div className="editorial-rule-left mb-5" />
                  <p className="stage-label mb-2.5">Physical + Digital</p>
                  <h2 className="font-serif text-[1.75rem] sm:text-3xl md:text-[2.5rem] text-foreground mb-4 leading-tight">
                    A physical companion to your digital journey
                  </h2>
                  <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed mb-6 max-w-sm">
                    Capture your experiences alongside your weekly updates. Keep a thoughtful, private record of your journey.
                  </p>
                  <Link
                    to="/product"
                    className="inline-flex items-center gap-3 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[13px] font-medium shadow-cta hover:bg-terracotta-hover transition-all duration-300"
                  >
                    <span>Explore the journal</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Supporting details strip below */}
        <div className="bg-card border-t border-border/40">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border/30">
              {[
                { label: "Weekly prompts", detail: "Guided reflection" },
                { label: "Open space", detail: "Free-form writing" },
                { label: "Private record", detail: "Your story, your words" },
                { label: "Keepsake", detail: "A gift to your future self" },
              ].map((item) => (
                <div key={item.label} className="py-5 md:py-6 px-4 md:px-6 text-center">
                  <p className="font-sans text-sm font-medium text-foreground mb-0.5">{item.label}</p>
                  <p className="font-sans text-xs font-light text-muted-foreground">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JournalSection;

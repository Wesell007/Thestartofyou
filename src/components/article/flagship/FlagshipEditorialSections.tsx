import { Info, Heart, AlertTriangle } from "lucide-react";
import type { EditorialSection } from "@/data/articleData";
import { resolveSectionImage, flagshipHeroMap } from "./flagshipImageMap";

interface Props {
  slug: string;
  sections: EditorialSection[];
}

const calloutStyles = {
  reassurance: {
    bg: "bg-sage-bg/25",
    border: "border-sage/15",
    icon: Heart,
    iconColor: "text-sage",
  },
  info: {
    bg: "bg-accent/5",
    border: "border-accent/15",
    icon: Info,
    iconColor: "text-accent-foreground/60",
  },
  "gentle-warning": {
    bg: "bg-terracotta/[0.05]",
    border: "border-terracotta/15",
    icon: AlertTriangle,
    iconColor: "text-terracotta/70",
  },
};

const FlagshipEditorialSections = ({ slug, sections }: Props) => {
  // Seed with the hero src so no section can duplicate the hero image.
  const usedSrcs = new Set<string>();
  const hero = flagshipHeroMap[slug];
  if (hero) usedSrcs.add(hero.src);

  return (
    <div>
      {sections.map((section, idx) => {
        const image = resolveSectionImage(slug, section.id, section.heading, usedSrcs);
        const isAlt = idx % 2 === 1;
        const bg = isAlt ? "bg-parchment-dark" : "bg-parchment";

        return (
          <section
            key={section.id}
            id={section.id}
            className={`${bg} py-16 sm:py-20 md:py-28 relative overflow-hidden`}
          >
            {/* Large faded numeral — desktop only, won't overlap content on tablet/mobile */}
            <div
              aria-hidden="true"
              className="hidden lg:block pointer-events-none absolute top-10 right-12 font-serif text-sage/[0.07] leading-none select-none text-[12rem]"
            >
              {String(idx + 1).padStart(2, "0")}
            </div>

            <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl relative">
              <div
                className={`grid grid-cols-1 ${
                  image ? "lg:grid-cols-12" : ""
                } gap-8 md:gap-10 lg:gap-16 items-start`}
              >
                {/* Image (alternating side on desktop only — stacked on mobile + tablet) */}
                {image && (
                  <div
                    className={`lg:col-span-5 ${
                      isAlt ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <div className="relative rounded-2xl overflow-hidden shadow-card-brand aspect-[4/3] lg:aspect-[4/5] lg:sticky lg:top-28">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                )}

                {/* Text */}
                <div
                  className={`${
                    image ? `lg:col-span-7 ${isAlt ? "lg:order-1" : "lg:order-2"}` : ""
                  } max-w-2xl`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-sans text-[11px] text-sage/50 tabular-nums">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="h-px w-8 bg-sage-light" />
                  </div>

                  <h2 className="font-serif text-foreground leading-[1.18] mb-5 sm:mb-6 text-[1.5rem] sm:text-[1.75rem] md:text-[2rem]">
                    {section.heading}
                  </h2>

                  {section.lead && (
                    <p className="font-sans text-[15px] sm:text-[16px] font-light text-foreground/85 leading-[1.85] mb-5 sm:mb-6">
                      {section.lead}
                    </p>
                  )}

                  {section.paragraphs && section.paragraphs.length > 0 && (
                    <div className="space-y-4 sm:space-y-5">
                      {section.paragraphs.map((p, i) => (
                        <p
                          key={i}
                          className="font-sans text-[14.5px] sm:text-[15px] font-light text-foreground/80 leading-[1.85]"
                        >
                          {p}
                        </p>
                      ))}
                    </div>
                  )}

                  {section.subsections && section.subsections.length > 0 && (
                    <div className="space-y-8 mt-8">
                      {section.subsections.map((sub, i) => (
                        <div key={i}>
                          <h3 className="font-serif text-lg md:text-xl text-foreground leading-snug mb-3">
                            {sub.subheading}
                          </h3>
                          <div className="space-y-3 sm:space-y-4">
                            {sub.paragraphs.map((para, j) => (
                              <p
                                key={j}
                                className="font-sans text-[14.5px] sm:text-[15px] font-light text-foreground/80 leading-[1.85]"
                              >
                                {para}
                              </p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.callout && (() => {
                    const style = calloutStyles[section.callout.tone];
                    const Icon = style.icon;
                    return (
                      <div
                        className={`mt-8 sm:mt-10 rounded-xl border ${style.bg} ${style.border} px-5 py-5 sm:px-6 sm:py-6`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-card/70 flex items-center justify-center shrink-0 mt-0.5">
                            <Icon className={`w-3 h-3 ${style.iconColor}`} />
                          </div>
                          <p className="font-sans text-[13.5px] sm:text-[14px] font-light text-foreground/80 leading-[1.8]">
                            {section.callout.text}
                          </p>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default FlagshipEditorialSections;

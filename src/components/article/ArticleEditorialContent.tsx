import { Info, Heart, AlertTriangle } from "lucide-react";
import type { EditorialSection } from "@/data/articleData";

interface Props {
  sections: EditorialSection[];
}

const calloutStyles = {
  reassurance: {
    bg: "bg-sage-bg/30",
    border: "border-sage/15",
    icon: Heart,
    iconColor: "text-sage",
  },
  info: {
    bg: "bg-accent/5",
    border: "border-accent/15",
    icon: Info,
    iconColor: "text-accent",
  },
  "gentle-warning": {
    bg: "bg-terracotta/5",
    border: "border-terracotta/15",
    icon: AlertTriangle,
    iconColor: "text-terracotta/70",
  },
};

const ArticleEditorialContent = ({ sections }: Props) => {
  return (
    <div className="space-y-0">
      {sections.map((section, sectionIdx) => (
        <section
          key={section.id}
          id={section.id}
          className={`py-12 sm:py-16 md:py-22 ${sectionIdx % 2 === 0 ? "bg-parchment" : "bg-parchment-dark"}`}
        >
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
            {/* Section heading */}
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="h-px w-8 sm:w-10 bg-sage-light" />
                <p className="font-sans text-[10px] font-light tracking-[0.25em] uppercase text-sage-muted">
                  {String(sectionIdx + 1).padStart(2, "0")}
                </p>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground leading-tight">
                {section.heading}
              </h2>
            </div>

            {/* Lead paragraph (slightly larger) */}
            {section.lead && (
              <p className="font-sans text-[15px] sm:text-base md:text-[17px] font-light text-foreground/90 leading-[1.85] mb-6 sm:mb-8">
                {section.lead}
              </p>
            )}

            {/* Body paragraphs */}
            {section.paragraphs && section.paragraphs.length > 0 && (
              <div className="space-y-4 sm:space-y-5 mb-6 sm:mb-8">
                {section.paragraphs.map((para, i) => (
                  <p
                    key={i}
                    className="font-sans text-[14px] sm:text-[15px] font-light text-foreground/85 leading-[1.85]"
                  >
                    {para}
                  </p>
                ))}
              </div>
            )}

            {/* Subsections */}
            {section.subsections && section.subsections.length > 0 && (
              <div className="space-y-8 sm:space-y-10 mt-8 sm:mt-10">
                {section.subsections.map((sub, i) => (
                  <div key={i}>
                    <h3 className="font-serif text-lg md:text-xl text-foreground leading-snug mb-3 sm:mb-4">
                      {sub.subheading}
                    </h3>
                    <div className="space-y-3 sm:space-y-4">
                      {sub.paragraphs.map((para, j) => (
                        <p
                          key={j}
                          className="font-sans text-[14px] sm:text-[15px] font-light text-foreground/85 leading-[1.85]"
                        >
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Callout */}
            {section.callout && (() => {
              const style = calloutStyles[section.callout.tone];
              const Icon = style.icon;
              return (
                <div className={`mt-8 sm:mt-10 rounded-xl sm:rounded-2xl border ${style.bg} ${style.border} px-5 py-5 sm:px-7 sm:py-6 md:px-9 md:py-8`}>
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/60 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${style.iconColor}`} />
                    </div>
                    <p className="font-sans text-[13px] sm:text-sm font-light text-foreground/85 leading-[1.8]">
                      {section.callout.text}
                    </p>
                  </div>
                </div>
              );
            })()}
          </div>
        </section>
      ))}
    </div>
  );
};

export default ArticleEditorialContent;

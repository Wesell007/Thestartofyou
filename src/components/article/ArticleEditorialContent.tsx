import { Info, Heart, AlertTriangle } from "lucide-react";
import type { EditorialSection } from "@/data/articleData";

interface Props {
  sections: EditorialSection[];
}

const calloutStyles = {
  reassurance: {
    bg: "bg-sage-bg/20",
    border: "border-sage/10",
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
    bg: "bg-terracotta/[0.04]",
    border: "border-terracotta/10",
    icon: AlertTriangle,
    iconColor: "text-terracotta/60",
  },
};

const ArticleEditorialContent = ({ sections }: Props) => {
  return (
    <div>
      {sections.map((section, sectionIdx) => (
        <section
          key={section.id}
          id={section.id}
          className={`py-14 sm:py-18 md:py-24 ${sectionIdx % 2 === 0 ? "bg-parchment" : "bg-parchment-dark"}`}
        >
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
            {/* Section heading with editorial numbering */}
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-sans text-[11px] text-sage/40 tabular-nums">
                  {String(sectionIdx + 1).padStart(2, "0")}
                </span>
                <div className="h-px w-6 bg-sage-light" />
              </div>
              <h2 className="font-serif text-xl sm:text-2xl md:text-[1.75rem] text-foreground leading-snug">
                {section.heading}
              </h2>
            </div>

            {/* Lead paragraph */}
            {section.lead && (
              <p className="font-sans text-[15px] sm:text-base font-light text-foreground/85 leading-[1.85] mb-6 sm:mb-8">
                {section.lead}
              </p>
            )}

            {/* Body paragraphs */}
            {section.paragraphs && section.paragraphs.length > 0 && (
              <div className="space-y-4 sm:space-y-5 mb-6 sm:mb-8">
                {section.paragraphs.map((para, i) => (
                  <p
                    key={i}
                    className="font-sans text-[14px] sm:text-[15px] font-light text-foreground/80 leading-[1.85]"
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
                    <h3 className="font-serif text-lg md:text-xl text-foreground leading-snug mb-3">
                      {sub.subheading}
                    </h3>
                    <div className="space-y-3 sm:space-y-4">
                      {sub.paragraphs.map((para, j) => (
                        <p
                          key={j}
                          className="font-sans text-[14px] sm:text-[15px] font-light text-foreground/80 leading-[1.85]"
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
                <div className={`mt-8 sm:mt-10 rounded-xl border ${style.bg} ${style.border} px-5 py-5 sm:px-7 sm:py-6`}>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-card/60 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className={`w-3 h-3 ${style.iconColor}`} />
                    </div>
                    <p className="font-sans text-[13px] sm:text-[14px] font-light text-foreground/80 leading-[1.8]">
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

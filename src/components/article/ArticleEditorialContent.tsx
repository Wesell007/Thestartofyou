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
          className={`py-16 md:py-22 ${sectionIdx % 2 === 0 ? "bg-parchment" : "bg-parchment-dark"}`}
        >
          <div className="container mx-auto px-6 md:px-10 max-w-3xl">
            {/* Section heading */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px w-10 bg-sage-light" />
                <p className="font-sans text-[10px] font-light tracking-[0.25em] uppercase text-sage-muted">
                  {String(sectionIdx + 1).padStart(2, "0")}
                </p>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight">
                {section.heading}
              </h2>
            </div>

            {/* Lead paragraph (slightly larger) */}
            {section.lead && (
              <p className="font-sans text-base md:text-[17px] font-light text-foreground/90 leading-[1.85] mb-8">
                {section.lead}
              </p>
            )}

            {/* Body paragraphs */}
            {section.paragraphs && section.paragraphs.length > 0 && (
              <div className="space-y-5 mb-8">
                {section.paragraphs.map((para, i) => (
                  <p
                    key={i}
                    className="font-sans text-[15px] font-light text-foreground/85 leading-[1.85]"
                  >
                    {para}
                  </p>
                ))}
              </div>
            )}

            {/* Subsections */}
            {section.subsections && section.subsections.length > 0 && (
              <div className="space-y-10 mt-10">
                {section.subsections.map((sub, i) => (
                  <div key={i}>
                    <h3 className="font-serif text-lg md:text-xl text-foreground leading-snug mb-4">
                      {sub.subheading}
                    </h3>
                    <div className="space-y-4">
                      {sub.paragraphs.map((para, j) => (
                        <p
                          key={j}
                          className="font-sans text-[15px] font-light text-foreground/85 leading-[1.85]"
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
                <div className={`mt-10 rounded-2xl border ${style.bg} ${style.border} px-7 py-6 md:px-9 md:py-8`}>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className={`w-4 h-4 ${style.iconColor}`} />
                    </div>
                    <p className="font-sans text-sm font-light text-foreground/85 leading-[1.8]">
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

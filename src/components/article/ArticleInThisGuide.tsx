import type { ArticleData } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

/** Lightweight "In this guide" section for short guidance pages. */
const ArticleInThisGuide = ({ data }: Props) => {
  // Build guide sections dynamically based on available data
  const sections: string[] = [];

  if (data.quickAnswer) sections.push("Quick answer");
  if (data.howThisFeels?.length) sections.push("How this can feel");
  if (data.whatHappening?.commonCauses?.length) sections.push("What's happening");
  if (data.timing?.whenStarts) sections.push("Timing");
  if (data.whatItFeelsLike?.length) sections.push("Real experience");
  if (data.whatThisMeans) sections.push("What this means");
  if (data.normal?.length) sections.push("Normal vs seek support");
  if (data.whatYouCanDo?.length) sections.push("What you can do");
  if (data.compare) sections.push("Understanding the difference");
  if (data.faq?.length) sections.push("Common questions");

  if (sections.length < 4) return null;

  return (
    <section className="bg-parchment py-8 sm:py-10 md:py-12">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="bg-card/60 backdrop-blur-sm border border-border/30 rounded-xl sm:rounded-2xl px-5 py-5 sm:px-7 sm:py-7 md:px-9 md:py-8">
          <p className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-sage mb-4 sm:mb-5">
            In this guide
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2 sm:gap-y-2.5">
            {sections.map((section, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <span className="w-1 h-1 rounded-full bg-sage/40 shrink-0" />
                <span className="font-sans text-[13px] font-light text-foreground/75 leading-snug">
                  {section}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleInThisGuide;

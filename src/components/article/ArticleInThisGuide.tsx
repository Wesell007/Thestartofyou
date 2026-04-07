import type { ArticleData } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

/** Lightweight "In this guide" anchor map for short guidance pages. */
const ArticleInThisGuide = ({ data }: Props) => {
  const sections: { label: string; id: string }[] = [];

  if (data.howThisFeels?.length) sections.push({ label: "How this can feel", id: "how-this-feels" });
  if (data.whatHappening?.commonCauses?.length) sections.push({ label: "What's happening", id: "whats-happening" });
  if (data.timing?.whenStarts) sections.push({ label: "Timing", id: "timing" });
  if (data.whatItFeelsLike?.length) sections.push({ label: "Real experience", id: "real-experience" });
  if (data.whatThisMeans) sections.push({ label: "What this means", id: "what-this-means" });
  if (data.normal?.length) sections.push({ label: "Normal vs seek support", id: "normal-vs-support" });
  if (data.whatYouCanDo?.length) sections.push({ label: "What you can do", id: "what-you-can-do" });
  if (data.compare) sections.push({ label: "Understanding the difference", id: "compare" });
  if (data.faq?.length) sections.push({ label: "Common questions", id: "faq" });

  if (sections.length < 3) return null;

  return (
    <section className="bg-parchment pt-10 pb-4 sm:pt-14 sm:pb-6 md:pt-16 md:pb-8">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <p className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-sage mb-4 sm:mb-5">
          In this guide
        </p>
        <div className="flex flex-wrap gap-2 sm:gap-2.5">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="font-sans text-[12px] sm:text-[13px] font-light text-foreground/60 hover:text-sage border border-border/30 hover:border-sage/30 rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2 transition-all"
            >
              {section.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticleInThisGuide;

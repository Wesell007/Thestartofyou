import { useEffect } from "react";
import type { ArticleData } from "@/data/articleData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Props {
  data: ArticleData;
  variant?: "legacy" | "calm";
}

const ArticleFAQ = ({ data, variant = "legacy" }: Props) => {
  const hasFaq = data.faq && data.faq.length > 0;
  const isCalm = variant === "calm";

  useEffect(() => {
    if (!hasFaq) return;
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: data.faq!.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    script.id = `faq-schema-${data.slug}`;
    document.head.appendChild(script);

    return () => {
      const existing = document.getElementById(`faq-schema-${data.slug}`);
      if (existing) existing.remove();
    };
  }, [data.slug, data.faq, hasFaq]);

  if (!hasFaq) return null;

  return (
    <section id="faq" className="bg-parchment py-10 sm:py-14 md:py-18">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-8 bg-sage-light" />
          <p className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-sage-muted">
            Common questions
          </p>
        </div>
        <h2 className="font-serif text-xl sm:text-2xl md:text-[1.75rem] text-foreground leading-snug mb-6 sm:mb-8">
          What people often ask
        </h2>

        <Accordion type="single" collapsible className={isCalm ? "w-full" : "w-full space-y-2"}>
          {data.faq!.map((item, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className={
                isCalm
                  ? "border-0 border-b border-border/30 last:border-b-0 data-[state=open]:border-sage/20 transition-colors"
                  : "bg-card/50 border border-border/25 rounded-lg sm:rounded-xl overflow-hidden data-[state=open]:border-sage/15 transition-colors"
              }
            >
              <AccordionTrigger
                className={
                  isCalm
                    ? "py-4 sm:py-5 text-left font-serif text-[15px] sm:text-base text-foreground leading-snug hover:no-underline hover:text-sage transition-colors [&[data-state=open]]:text-sage gap-3"
                    : "px-5 sm:px-6 py-4 text-left font-serif text-[15px] sm:text-base text-foreground leading-snug hover:no-underline hover:text-sage transition-colors [&[data-state=open]]:text-sage gap-3"
                }
              >
                {item.question}
              </AccordionTrigger>
              <AccordionContent className={isCalm ? "pb-5 pt-0" : "px-5 sm:px-6 pb-4 pt-0"}>
                <p className="font-sans text-[14px] sm:text-[15px] font-light leading-[1.85] text-foreground/75 max-w-2xl">
                  {item.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default ArticleFAQ;

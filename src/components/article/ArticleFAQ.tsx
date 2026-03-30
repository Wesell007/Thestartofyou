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
}

const ArticleFAQ = ({ data }: Props) => {
  const hasFaq = data.faq && data.faq.length > 0;

  // Inject FAQ JSON-LD schema for AEO
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

  const isDeep = data.isCornerstone;

  return (
    <section className="bg-parchment py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        {/* Section header */}
        <div className="mb-10 md:mb-14">
          <p className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-sage mb-4">
            Common questions
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-[2rem] text-foreground leading-tight">
            What people often ask
          </h2>
          {isDeep && (
            <p className="font-sans text-[15px] font-light text-muted-foreground mt-3 leading-relaxed max-w-xl">
              Answers to the questions that come up most around this topic.
            </p>
          )}
        </div>

        {/* Premium accordion */}
        <div className="bg-card/50 backdrop-blur-sm border border-border/25 rounded-2xl overflow-hidden">
          <Accordion type="single" collapsible className="w-full">
            {data.faq!.map((item, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className={`border-border/20 ${i === 0 ? "border-t-0" : ""} ${i === data.faq!.length - 1 ? "border-b-0" : ""}`}
              >
                <AccordionTrigger className="px-7 md:px-9 py-6 md:py-7 text-left font-serif text-[17px] sm:text-lg text-foreground leading-snug hover:no-underline hover:text-sage transition-colors [&[data-state=open]]:text-sage gap-4">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-7 md:px-9 pb-7 pt-0">
                  <p className="font-sans text-[15px] font-light leading-[1.85] text-muted-foreground max-w-2xl">
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

      </div>
    </section>
  );
};

export default ArticleFAQ;

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
  if (!data.faq || data.faq.length === 0) return null;

  // Inject FAQ JSON-LD schema
  useEffect(() => {
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
  }, [data.slug, data.faq]);

  return (
    <section className="bg-parchment py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        {/* Header */}
        <div className="mb-14">
          <p className="stage-label mb-5">Common questions</p>
          <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight max-w-lg">
            What people often ask
          </h2>
        </div>

        {/* Accordion */}
        <Accordion type="single" collapsible className="w-full">
          {data.faq.map((item, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border-b border-border/40"
            >
              <AccordionTrigger className="py-6 text-left font-serif text-lg sm:text-xl text-foreground leading-snug hover:no-underline hover:text-sage transition-colors [&[data-state=open]]:text-sage">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-6 pt-0">
                <p className="font-sans text-base font-light leading-relaxed text-muted-foreground max-w-2xl">
                  {item.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Cornerstone link */}
        {data.cornerstoneSlug && (
          <div className="mt-12 pt-8 border-t border-border/30">
            <p className="font-sans text-sm font-light text-muted-foreground mb-3">
              Want a more comprehensive guide?
            </p>
            <a
              href={`/articles/${data.cornerstoneSlug}`}
              className="inline-flex items-center gap-2 font-serif text-base text-sage hover:text-sage-dark transition-colors"
            >
              Read the complete guide
              <span className="text-lg">→</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default ArticleFAQ;

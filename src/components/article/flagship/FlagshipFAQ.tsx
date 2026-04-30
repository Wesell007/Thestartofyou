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

// Split layout: heading left, accordion right (desktop). Stacks on mobile.
const FlagshipFAQ = ({ data }: Props) => {
  const hasFaq = data.faq && data.faq.length > 0;

  useEffect(() => {
    if (!hasFaq) return;
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: data.faq!.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
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
    <section id="faq" className="bg-parchment-dark py-16 sm:py-20 md:py-24">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16">
          {/* HEADING */}
          <div className="md:col-span-4">
            <div className="md:sticky md:top-28">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-8 bg-sage-light" />
                <p className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-sage-muted">
                  Common questions
                </p>
              </div>
              <h2 className="font-serif text-foreground leading-[1.18] text-[1.5rem] sm:text-[1.75rem] md:text-[2rem]">
                What people often ask
              </h2>
              <p className="mt-4 font-serif italic text-foreground/60 text-[14.5px] leading-relaxed max-w-sm">
                The questions that come up most often when people read about this — answered plainly.
              </p>
            </div>
          </div>

          {/* ACCORDION */}
          <div className="md:col-span-8">
            <Accordion type="single" collapsible className="w-full">
              {data.faq!.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border-0 border-b border-border/40 last:border-b-0 data-[state=open]:border-sage/25 transition-colors"
                >
                  <AccordionTrigger
                    className="py-5 sm:py-6 text-left font-serif text-[16px] sm:text-[17px] text-foreground leading-snug hover:no-underline hover:text-sage transition-colors [&[data-state=open]]:text-sage gap-3"
                  >
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pt-0">
                    <p className="font-sans text-[14.5px] sm:text-[15px] font-light leading-[1.85] text-foreground/75 max-w-2xl">
                      {item.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlagshipFAQ;

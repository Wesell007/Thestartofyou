// ─── Tool Interpretation Template ───────────────────────────────────────
// Explains tool outputs clearly. Routes user into the right stage.
// NO related reads. NO journal. NO browse loops.

import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GuidanceCTAStack from "@/components/guidance/shared/GuidanceCTAStack";
import type { ToolInterpretationData } from "@/data/guidance/types";

interface Props {
  data: ToolInterpretationData;
}

const ToolInterpretationTemplate = ({ data }: Props) => {
  useEffect(() => {
    document.title = data.metaTitle;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", data.metaDescription);
    else {
      const el = document.createElement("meta");
      el.name = "description";
      el.content = data.metaDescription;
      document.head.appendChild(el);
    }
  }, [data]);

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />
      <main>
        {/* ── 1. Hero ── */}
        <section className="bg-parchment pt-28 pb-10 sm:pt-32 sm:pb-12">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-2xl">
            <p className="font-sans text-[10px] font-light tracking-[0.25em] uppercase text-sage-muted mb-4">
              Understanding your {data.toolName}
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-[2.75rem] text-foreground leading-[1.12]">
              {data.title}
            </h1>
          </div>
        </section>

        {/* ── 2. What this means (primary explanation) ── */}
        <section className="bg-parchment pb-8">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-2xl">
            <div className="bg-card border border-sage/15 rounded-2xl p-6 sm:p-8 shadow-soft">
              <p className="font-sans text-[15px] font-light text-foreground leading-[1.8]">
                {data.whatThisMeans}
              </p>
            </div>
          </div>
        </section>

        {/* ── 3. Key points (structured cards) ── */}
        <section className="bg-parchment-dark py-12 md:py-16">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-2xl">
            <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-6">
              Key things to know
            </h2>
            <div className="grid gap-4">
              {data.keyPoints.map((point, i) => (
                <div key={i} className="bg-card border border-border/40 rounded-xl p-5">
                  <p className="font-sans text-sm font-medium text-foreground mb-1.5">
                    {point.label}
                  </p>
                  <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                    {point.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. What to expect now ── */}
        <section className="bg-parchment py-12 md:py-16">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-2xl">
            <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-4">
              What to expect now
            </h2>
            <p className="font-sans text-[15px] font-light text-muted-foreground leading-[1.8]">
              {data.whatToExpectNow}
            </p>
          </div>
        </section>

        {/* ── 5. What not to worry about ── */}
        <section className="bg-parchment-dark py-12 md:py-16">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-2xl">
            <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-5">
              What you don't need to worry about
            </h2>
            <ul className="space-y-3">
              {data.whatNotToWorry.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="font-sans text-sage text-sm mt-0.5 shrink-0">✓</span>
                  <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── 6–8. CTA Stack ── */}
        <GuidanceCTAStack
          ai={data.ai}
          stageLinks={data.stageLinks}
          journeyCTA={data.journeyCTA}
        />
      </main>
      <Footer />
    </div>
  );
};

export default ToolInterpretationTemplate;

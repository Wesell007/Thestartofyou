// ─── Tool Interpretation Template ───────────────────────────────────────
// Explains tool outputs. Routes into the right stage.
// Personality: decisive, clear, personalised, next-step oriented.

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
        {/* ── Hero ── */}
        <section className="pt-28 pb-6 sm:pt-32 sm:pb-8">
          <div className="container mx-auto px-5 sm:px-6 max-w-xl">
            <p className="stage-label mb-5">
              Understanding your {data.toolName}
            </p>
            <h1 className="font-serif text-[1.75rem] sm:text-[2.125rem] text-foreground leading-[1.15]">
              {data.title}
            </h1>
          </div>
        </section>

        {/* ── What this means (primary explanation, border-left accent) ── */}
        <section className="pb-10 sm:pb-12">
          <div className="container mx-auto px-5 sm:px-6 max-w-xl">
            <div className="border-l-2 border-sage/30 pl-5 sm:pl-6">
              <p className="font-sans text-[15px] font-light text-foreground leading-[1.8]">
                {data.whatThisMeans}
              </p>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ── Key points ── */}
        <section className="py-10 sm:py-12">
          <div className="container mx-auto px-5 sm:px-6 max-w-xl">
            <h2 className="font-serif text-lg sm:text-xl text-foreground mb-5">
              Key things to know
            </h2>
            <div className="space-y-4">
              {data.keyPoints.map((point, i) => (
                <div key={i} className="border-l-2 border-border/50 pl-5">
                  <p className="font-sans text-sm font-medium text-foreground mb-1">
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

        <div className="section-divider" />

        {/* ── What to expect now ── */}
        <section className="py-10 sm:py-12">
          <div className="container mx-auto px-5 sm:px-6 max-w-xl">
            <h2 className="font-serif text-lg sm:text-xl text-foreground mb-3">
              What to expect now
            </h2>
            <p className="font-sans text-[15px] font-light text-muted-foreground leading-[1.8]">
              {data.whatToExpectNow}
            </p>
          </div>
        </section>

        {/* ── What not to worry about ── */}
        <section className="py-10 sm:py-12">
          <div className="container mx-auto px-5 sm:px-6 max-w-xl">
            <h2 className="font-serif text-lg sm:text-xl text-foreground mb-4">
              What you don't need to worry about
            </h2>
            <ul className="space-y-2">
              {data.whatNotToWorry.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-sage/60 text-sm mt-0.5 shrink-0">✓</span>
                  <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="section-divider" />

        {/* ── CTA Stack ── */}
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

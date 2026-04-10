// ─── Short Guidance Template ────────────────────────────────────────────
// Answer-first. Calm the user. Route them into the journey.
// NO related reads. NO browse loops. NO journal promotion.

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, AlertCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GuidanceCTAStack from "@/components/guidance/shared/GuidanceCTAStack";
import type { ShortGuidanceData } from "@/data/guidance/types";

interface Props {
  data: ShortGuidanceData;
}

const ShortGuidanceTemplate = ({ data }: Props) => {
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
        {/* ── 1. Hero: Title + Quick Answer (dominant) ── */}
        <section className="bg-parchment pt-28 pb-12 sm:pt-32 sm:pb-14">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-2xl">
            <p className="font-sans text-[10px] font-light tracking-[0.25em] uppercase text-sage-muted mb-4">
              Guidance · {data.journey === "pregnancy" ? "Pregnancy" : data.journey}
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-[2.75rem] text-foreground leading-[1.12] mb-0">
              {data.title}
            </h1>
          </div>
        </section>

        {/* ── 2. Quick Answer Card (visually prominent) ── */}
        <section className="bg-parchment pb-10">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-2xl">
            <div className="bg-card border border-sage/15 rounded-2xl p-6 sm:p-8 shadow-soft">
              <p className="font-sans text-[10px] font-light tracking-[0.2em] uppercase text-sage mb-3">
                Quick answer
              </p>
              <p className="font-sans text-[15px] font-light text-foreground leading-[1.8]">
                {data.quickAnswer}
              </p>
            </div>
          </div>
        </section>

        {/* ── 3. What's happening ── */}
        <section className="bg-parchment-dark py-12 md:py-16">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-2xl">
            <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-4">
              What's happening
            </h2>
            <p className="font-sans text-[15px] font-light text-muted-foreground leading-[1.8]">
              {data.whatIsHappening}
            </p>
          </div>
        </section>

        {/* ── 4. What this means ── */}
        <section className="bg-parchment py-12 md:py-16">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-2xl">
            <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-4">
              What this means
            </h2>
            <p className="font-sans text-[15px] font-light text-muted-foreground leading-[1.8]">
              {data.whatThisMeans}
            </p>
          </div>
        </section>

        {/* ── 5. Normal vs Seek Support (side by side on desktop) ── */}
        <section className="bg-parchment-dark py-12 md:py-16">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-2xl">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Normal */}
              <div className="bg-card border border-border/40 rounded-xl p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle size={16} className="text-sage" />
                  <p className="font-sans text-xs font-medium tracking-wide uppercase text-sage">
                    Normal
                  </p>
                </div>
                <ul className="space-y-2.5">
                  {data.normalItems.map((item, i) => (
                    <li key={i} className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Seek support */}
              <div className="bg-card border border-border/40 rounded-xl p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle size={16} className="text-terracotta" />
                  <p className="font-sans text-xs font-medium tracking-wide uppercase text-terracotta">
                    Seek support if
                  </p>
                </div>
                <ul className="space-y-2.5">
                  {data.seekSupport.map((item, i) => (
                    <li key={i} className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="font-sans text-[11px] font-light text-muted-foreground/70 mt-4 italic">
                  {data.disclaimer}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. What you can do ── */}
        <section className="bg-parchment py-12 md:py-16">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-2xl">
            <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-5">
              What you can do
            </h2>
            <ul className="space-y-3">
              {data.whatYouCanDo.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="font-sans text-sage text-sm mt-0.5 shrink-0">→</span>
                  <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── 7–9. CTA Stack (AI → Stage Links → Next-best → Journey CTA) ── */}
        <GuidanceCTAStack
          ai={data.ai}
          stageLinks={data.stageLinks}
          journeyCTA={data.journeyCTA}
          nextBestRoute={data.nextBestRoute}
        />
      </main>
      <Footer />
    </div>
  );
};

export default ShortGuidanceTemplate;

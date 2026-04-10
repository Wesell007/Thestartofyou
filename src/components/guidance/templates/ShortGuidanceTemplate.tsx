// ─── Short Guidance Template ────────────────────────────────────────────
// Answer-first. Calm. Focused. Routes into the journey system.
// Personality: clean, direct, reassuring — not editorial.

import { useEffect } from "react";
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

  const journeyLabel =
    data.journey === "pregnancy" ? "Pregnancy" :
    data.journey === "ivf" ? "IVF" :
    data.journey === "trying-to-conceive" ? "Trying to Conceive" :
    data.journey === "postpartum" ? "Postpartum" :
    data.journey === "first-year" ? "First Year" :
    data.journey === "preparing-for-baby" ? "Preparing for Baby" :
    "Support";

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />
      <main>
        {/* ── Hero: minimal, answer-oriented ── */}
        <section className="pt-28 pb-6 sm:pt-32 sm:pb-8">
          <div className="container mx-auto px-5 sm:px-6 max-w-xl">
            <p className="stage-label mb-5">
              Guidance · {journeyLabel}
            </p>
            <h1 className="font-serif text-[1.75rem] sm:text-[2.125rem] text-foreground leading-[1.15] mb-0">
              {data.title}
            </h1>
          </div>
        </section>

        {/* ── Quick Answer (visually dominant, the reason you're here) ── */}
        <section className="pb-10 sm:pb-12">
          <div className="container mx-auto px-5 sm:px-6 max-w-xl">
            <div className="border-l-2 border-sage/30 pl-5 sm:pl-6">
              <p className="font-sans text-[10px] font-light tracking-[0.2em] uppercase text-sage mb-2">
                Quick answer
              </p>
              <p className="font-sans text-[15px] font-light text-foreground leading-[1.8]">
                {data.quickAnswer}
              </p>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ── What's happening ── */}
        <section className="py-10 sm:py-12">
          <div className="container mx-auto px-5 sm:px-6 max-w-xl">
            <h2 className="font-serif text-lg sm:text-xl text-foreground mb-3">
              What's happening
            </h2>
            <p className="font-sans text-[15px] font-light text-muted-foreground leading-[1.8]">
              {data.whatIsHappening}
            </p>
          </div>
        </section>

        {/* ── What this means ── */}
        <section className="py-10 sm:py-12">
          <div className="container mx-auto px-5 sm:px-6 max-w-xl">
            <h2 className="font-serif text-lg sm:text-xl text-foreground mb-3">
              What this means
            </h2>
            <p className="font-sans text-[15px] font-light text-muted-foreground leading-[1.8]">
              {data.whatThisMeans}
            </p>
          </div>
        </section>

        <div className="section-divider" />

        {/* ── Normal vs Seek Support ── */}
        <section className="py-10 sm:py-12">
          <div className="container mx-auto px-5 sm:px-6 max-w-xl">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle size={14} className="text-sage" />
                  <p className="font-sans text-[10px] font-medium tracking-[0.15em] uppercase text-sage">
                    Normal
                  </p>
                </div>
                <ul className="space-y-2">
                  {data.normalItems.map((item, i) => (
                    <li key={i} className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle size={14} className="text-terracotta" />
                  <p className="font-sans text-[10px] font-medium tracking-[0.15em] uppercase text-terracotta">
                    Seek support if
                  </p>
                </div>
                <ul className="space-y-2">
                  {data.seekSupport.map((item, i) => (
                    <li key={i} className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="font-sans text-[11px] font-light text-muted-foreground/60 mt-3 italic">
                  {data.disclaimer}
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ── What you can do ── */}
        <section className="py-10 sm:py-12">
          <div className="container mx-auto px-5 sm:px-6 max-w-xl">
            <h2 className="font-serif text-lg sm:text-xl text-foreground mb-4">
              What you can do
            </h2>
            <ul className="space-y-2.5">
              {data.whatYouCanDo.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-sage/60 text-sm mt-0.5 shrink-0">→</span>
                  <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── CTA Stack ── */}
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

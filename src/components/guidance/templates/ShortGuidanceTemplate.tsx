// ─── Short Guidance Template ────────────────────────────────────────────
// Redesigned: premium, composed, answer-first, trust-building.
// Every section is visually distinct. The page reads as a designed experience.

import { useEffect } from "react";
import { Shield, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
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
    window.scrollTo(0, 0);
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

        {/* ══════════════════════════════════════════════════════════════
            HERO — Question framing. Confident, minimal, anchored.
           ══════════════════════════════════════════════════════════════ */}
        <section className="pt-28 pb-6 sm:pt-36 sm:pb-8">
          <div className="container mx-auto px-5 sm:px-6 max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-block w-8 h-px bg-sage/40" />
              <p className="font-sans text-[10px] font-medium tracking-[0.22em] uppercase text-sage-muted">
                Guidance · {journeyLabel}
              </p>
            </div>
            <h1 className="font-serif text-[2rem] sm:text-[2.5rem] text-foreground leading-[1.08] tracking-[-0.025em]">
              {data.title}
            </h1>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            QUICK ANSWER — The central trust-building block.
            Elevated, prominent, impossible to miss.
           ══════════════════════════════════════════════════════════════ */}
        <section className="pb-10 sm:pb-14">
          <div className="container mx-auto px-5 sm:px-6 max-w-2xl">
            <div
              className="relative rounded-xl px-6 py-6 sm:px-8 sm:py-8"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--parchment-dark)) 100%)',
                boxShadow: 'var(--shadow-soft)',
                border: '1px solid hsl(var(--border) / 0.5)',
              }}
            >
              {/* Accent bar */}
              <div
                className="absolute left-0 top-5 bottom-5 w-[3px] rounded-full"
                style={{ background: 'hsl(var(--sage))' }}
              />

              <div className="flex items-center gap-2 mb-3">
                <Shield size={13} className="text-sage" />
                <p className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase text-sage">
                  Quick answer
                </p>
              </div>
              <p className="font-serif text-[1.05rem] sm:text-[1.15rem] text-foreground leading-[1.7] font-normal">
                {data.quickAnswer}
              </p>
              <p className="font-sans text-[11px] text-muted-foreground/50 mt-4">
                ✔ Medically reviewed · Evidence-based guidance
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            UNDERSTANDING — What's happening + What this means.
            Two distinct blocks within a cohesive narrative section.
           ══════════════════════════════════════════════════════════════ */}
        <section
          className="py-10 sm:py-14"
          style={{ background: 'hsl(var(--parchment-dark))' }}
        >
          <div className="container mx-auto px-5 sm:px-6 max-w-2xl">
            {/* What's happening */}
            <div className="mb-10 sm:mb-12">
              <p className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase text-sage-muted mb-3">
                What's happening
              </p>
              <h2 className="font-serif text-xl sm:text-[1.4rem] text-foreground leading-[1.2] mb-3">
                Why you feel this way
              </h2>
              <p className="font-sans text-[15px] font-light text-muted-foreground leading-[1.85]">
                {data.whatIsHappening}
              </p>
            </div>

            <div className="w-16 h-px bg-sage-light/50 mb-10 sm:mb-12" />

            {/* What this means */}
            <div>
              <p className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase text-sage-muted mb-3">
                What this means
              </p>
              <h2 className="font-serif text-xl sm:text-[1.4rem] text-foreground leading-[1.2] mb-3">
                How to interpret what you're experiencing
              </h2>
              <p className="font-sans text-[15px] font-light text-muted-foreground leading-[1.85]">
                {data.whatThisMeans}
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            NORMAL vs SEEK SUPPORT — Clinical clarity, warm delivery.
            Visually distinct panels with clear signal hierarchy.
           ══════════════════════════════════════════════════════════════ */}
        <section className="py-10 sm:py-14">
          <div className="container mx-auto px-5 sm:px-6 max-w-2xl">
            <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">

              {/* Normal panel */}
              <div
                className="rounded-xl px-5 py-5 sm:px-6 sm:py-6"
                style={{
                  background: 'hsl(var(--sage-bg) / 0.5)',
                  border: '1px solid hsl(var(--sage-light) / 0.6)',
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 size={15} className="text-sage" />
                  <p className="font-sans text-[11px] font-semibold tracking-[0.15em] uppercase text-sage">
                    Normal
                  </p>
                </div>
                <ul className="space-y-2.5">
                  {data.normalItems.map((item, i) => (
                    <li key={i} className="flex gap-2.5">
                      <span className="text-sage/40 text-xs mt-0.5 shrink-0">—</span>
                      <p className="font-sans text-[13.5px] font-light text-foreground/80 leading-[1.6]">
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Seek support panel */}
              <div
                className="rounded-xl px-5 py-5 sm:px-6 sm:py-6"
                style={{
                  background: 'hsl(16 44% 58% / 0.04)',
                  border: '1px solid hsl(16 44% 58% / 0.15)',
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle size={14} className="text-terracotta" />
                  <p className="font-sans text-[11px] font-semibold tracking-[0.15em] uppercase text-terracotta">
                    Seek support if
                  </p>
                </div>
                <ul className="space-y-2.5">
                  {data.seekSupport.map((item, i) => (
                    <li key={i} className="flex gap-2.5">
                      <span className="text-terracotta/30 text-xs mt-0.5 shrink-0">—</span>
                      <p className="font-sans text-[13.5px] font-light text-foreground/80 leading-[1.6]">
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
                <p className="font-sans text-[11px] font-light text-muted-foreground/45 mt-4 leading-relaxed italic">
                  {data.disclaimer}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            WHAT YOU CAN DO — Actionable, structured, confident.
           ══════════════════════════════════════════════════════════════ */}
        <section
          className="py-10 sm:py-14"
          style={{ background: 'hsl(var(--parchment-dark))' }}
        >
          <div className="container mx-auto px-5 sm:px-6 max-w-2xl">
            <p className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase text-sage-muted mb-3">
              Practical steps
            </p>
            <h2 className="font-serif text-xl sm:text-[1.4rem] text-foreground leading-[1.2] mb-6">
              What you can do
            </h2>
            <div className="space-y-0">
              {data.whatYouCanDo.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 py-3.5 border-b last:border-b-0"
                  style={{ borderColor: 'hsl(var(--sage-light) / 0.4)' }}
                >
                  <span className="font-serif text-[1.1rem] text-sage/50 mt-px shrink-0 w-5 text-right tabular-nums">
                    {i + 1}
                  </span>
                  <p className="font-sans text-[14.5px] font-light text-foreground/85 leading-[1.65]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            CTA STACK — 3-tier hierarchy into journey system.
           ══════════════════════════════════════════════════════════════ */}
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

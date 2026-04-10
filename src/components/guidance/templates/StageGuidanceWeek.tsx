// ─── Stage-Guidance Template (Week) ─────────────────────────────────────
// Compressed product screen for individual pregnancy weeks.
// Personality: concise, structured, reassuring dashboard — not editorial.
// No journal promotion. No related reads. No browse loops.

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, AlertCircle, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AISearchBar from "@/components/shared/AISearchBar";
import type { WeekData } from "@/data/weekData";

interface Props {
  data: WeekData;
  prevWeek: number | null;
  nextWeek: number | null;
}

const StageGuidanceWeek = ({ data, prevWeek, nextWeek }: Props) => {
  useEffect(() => {
    document.title = `Week ${data.week} — The Start of You`;
    window.scrollTo(0, 0);
  }, [data.week]);

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />
      <main>
        {/* ── 1. Compact Hero ── */}
        <section className="pt-24 pb-6 sm:pt-28 sm:pb-8">
          <div className="container mx-auto px-5 sm:px-6 max-w-xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 mb-4" aria-label="breadcrumb">
              <Link to="/pregnancy" className="font-sans text-[11px] font-light text-muted-foreground hover:text-foreground transition-colors">
                Pregnancy
              </Link>
              <ChevronRight size={10} className="text-muted-foreground/40" />
              <Link to={data.trimesterPath} className="font-sans text-[11px] font-light text-muted-foreground hover:text-foreground transition-colors">
                {data.trimesterLabel}
              </Link>
              <ChevronRight size={10} className="text-muted-foreground/40" />
              <span className="font-sans text-[11px] font-light text-sage-muted">Week {data.week}</span>
            </nav>

            {/* Week nav + title */}
            <div className="flex items-center gap-3 mb-3">
              {prevWeek ? (
                <Link to={`/pregnancy/week/${prevWeek}`} className="border border-border/50 rounded-full p-1.5 hover:border-sage/30 transition-colors">
                  <ChevronLeft size={14} className="text-muted-foreground" />
                </Link>
              ) : <div className="w-8" />}
              <div className="flex-1">
                <p className="stage-label mb-1">
                  {data.trimesterLabel} · {data.keyFocus}
                </p>
                <h1 className="font-serif text-[1.75rem] sm:text-[2.125rem] text-foreground leading-[1.15]">
                  Week {data.week}
                </h1>
              </div>
              {nextWeek ? (
                <Link to={`/pregnancy/week/${nextWeek}`} className="border border-border/50 rounded-full p-1.5 hover:border-sage/30 transition-colors">
                  <ChevronRight size={14} className="text-muted-foreground" />
                </Link>
              ) : <div className="w-8" />}
            </div>

            <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed max-w-lg">
              {data.heroSubtitle}
            </p>

            {/* Baby size chip */}
            <div className="flex items-center gap-2 mt-4">
              <span className="font-sans text-[11px] font-light text-sage-muted tracking-wide">Baby size</span>
              <span className="font-serif text-sm font-medium text-foreground">{data.what.baby.size}</span>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ── 2. At a glance ── */}
        <section className="py-10 sm:py-12">
          <div className="container mx-auto px-5 sm:px-6 max-w-xl">
            <h2 className="font-serif text-lg sm:text-xl text-foreground mb-3">
              At a glance
            </h2>
            <p className="font-sans text-[15px] font-light text-muted-foreground leading-[1.8]">
              {data.atAGlance}
            </p>
          </div>
        </section>

        {/* ── 3. What's happening (Baby / Body / Emotional) ── */}
        <section className="py-10 sm:py-12">
          <div className="container mx-auto px-5 sm:px-6 max-w-xl">
            <h2 className="font-serif text-lg sm:text-xl text-foreground mb-5">
              What's happening
            </h2>
            <div className="space-y-4">
              {[
                { label: "Baby", item: data.what.baby },
                { label: "Your body", item: data.what.body },
                { label: "Emotionally", item: data.what.emotional },
              ].map(({ label, item }) => (
                <div key={label} className="border-l-2 border-sage/20 pl-5">
                  <p className="font-sans text-[10px] font-medium tracking-[0.15em] uppercase text-sage mb-1.5">
                    {label}
                  </p>
                  <p className="font-sans text-sm font-light text-foreground mb-1">{item.what}</p>
                  <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">{item.means}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ── 4. Symptoms ── */}
        {data.symptoms.length > 0 && (
          <section className="py-10 sm:py-12">
            <div className="container mx-auto px-5 sm:px-6 max-w-xl">
              <h2 className="font-serif text-lg sm:text-xl text-foreground mb-4">
                What you might feel
              </h2>
              <div className="space-y-3">
                {data.symptoms.map((s, i) => (
                  <div key={i} className="border-l-2 border-border/50 pl-4">
                    <p className="font-sans text-sm font-medium text-foreground">{s.name}</p>
                    <p className="font-sans text-[13px] font-light text-muted-foreground mt-0.5 leading-relaxed">{s.why}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── 5. What this means (interpretation) ── */}
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

        {/* ── 6. Normal vs Seek Support ── */}
        <section className="py-10 sm:py-12">
          <div className="container mx-auto px-5 sm:px-6 max-w-xl">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle size={14} className="text-sage" />
                  <p className="font-sans text-[10px] font-medium tracking-[0.15em] uppercase text-sage">Normal</p>
                </div>
                <ul className="space-y-2">
                  {data.normal.map((item, i) => (
                    <li key={i} className="font-sans text-sm font-light text-muted-foreground">{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle size={14} className="text-terracotta" />
                  <p className="font-sans text-[10px] font-medium tracking-[0.15em] uppercase text-terracotta">Seek support if</p>
                </div>
                <ul className="space-y-2">
                  {data.seekSupport.map((item, i) => (
                    <li key={i} className="font-sans text-sm font-light text-muted-foreground">{item}</li>
                  ))}
                </ul>
                <p className="font-sans text-[11px] font-light text-muted-foreground/60 mt-3 italic">{data.disclaimer}</p>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ── 7. Focus right now ── */}
        <section className="py-10 sm:py-12">
          <div className="container mx-auto px-5 sm:px-6 max-w-xl">
            <h2 className="font-serif text-lg sm:text-xl text-foreground mb-4">
              What to focus on right now
            </h2>
            <ul className="space-y-2">
              {data.focusPoints.map((fp, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-sage/60 text-sm mt-0.5 shrink-0">→</span>
                  <div>
                    <p className="font-sans text-sm font-medium text-foreground">{fp.action}</p>
                    <p className="font-sans text-[13px] font-light text-muted-foreground mt-0.5">{fp.reason}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── 8. Gentle reminder ── */}
        <section className="py-10 sm:py-12">
          <div className="container mx-auto px-5 sm:px-6 max-w-lg text-center">
            <div className="editorial-rule mb-5" />
            <p className="font-serif text-base sm:text-lg text-foreground leading-relaxed italic">
              {data.gentleReminder}
            </p>
          </div>
        </section>

        <div className="section-divider" />

        {/* ── 9. AI Support (Tier 3) ── */}
        <section className="py-10 sm:py-12">
          <div className="container mx-auto px-5 sm:px-6 max-w-xl text-center">
            <p className="stage-label mb-3">Ask anything</p>
            <p className="font-sans text-sm font-light text-muted-foreground mb-5">
              {data.aiContextPrompt}
            </p>
            <AISearchBar
              placeholder="What's on your mind?"
              suggestions={data.aiPrompts.slice(0, 3)}
              context={`Week ${data.week} of pregnancy`}
            />
          </div>
        </section>

        <div className="section-divider" />

        {/* ── 10. Journey CTA (Tier 1) ── */}
        <section className="py-14 sm:py-18">
          <div className="container mx-auto px-5 sm:px-6 max-w-lg text-center">
            <h2 className="font-serif text-xl sm:text-2xl text-foreground leading-tight mb-2">
              Continue your journey
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-6">
              Get week-by-week guidance tailored to your stage of pregnancy.
            </p>

            {/* Week navigation */}
            <div className="flex items-center justify-center gap-3 mb-6">
              {prevWeek && (
                <Link
                  to={`/pregnancy/week/${prevWeek}`}
                  className="border border-border/50 rounded-lg px-4 py-2 font-sans text-sm font-light text-foreground hover:border-sage/30 transition-all"
                >
                  ← Week {prevWeek}
                </Link>
              )}
              {nextWeek && (
                <Link
                  to={`/pregnancy/week/${nextWeek}`}
                  className="border border-border/50 rounded-lg px-4 py-2 font-sans text-sm font-light text-foreground hover:border-sage/30 transition-all"
                >
                  Week {nextWeek} →
                </Link>
              )}
            </div>

            <Link
              to="/pregnancy"
              className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-full px-7 py-3.5 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all duration-300"
            >
              Start your journey
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default StageGuidanceWeek;

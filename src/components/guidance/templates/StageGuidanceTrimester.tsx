// ─── Stage-Guidance Template (Compressed Product Screen) ────────────────
// Feels like product onboarding, NOT an article.
// Tight cards, clear sections, dominant CTA, no browse loops.
// Used for: First Trimester, Week 8, etc.

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, AlertCircle, ArrowRight, ChevronRight, Calendar } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AISearchBar from "@/components/shared/AISearchBar";
import type { TrimesterData } from "@/data/trimesterData";

interface Props {
  data: TrimesterData;
}

const StageGuidanceTrimester = ({ data }: Props) => {
  useEffect(() => {
    document.title = `${data.label} — The Start of You`;
  }, [data]);

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />
      <main>
        {/* ── 1. Compact Hero (product-screen feel) ── */}
        <section className="bg-parchment pt-24 pb-8 sm:pt-28 sm:pb-10">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-2xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 mb-5" aria-label="breadcrumb">
              <Link to="/pregnancy" className="font-sans text-xs font-light text-muted-foreground hover:text-foreground transition-colors">
                Pregnancy
              </Link>
              <ChevronRight size={11} className="text-muted-foreground/40" />
              <span className="font-sans text-xs font-light text-sage-muted">{data.label}</span>
            </nav>

            <p className="font-sans text-[10px] font-light tracking-[0.25em] uppercase text-sage-muted mb-3">
              {data.range} · {data.tagline}
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl text-foreground leading-[1.12] mb-3">
              {data.label}
            </h1>
            <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed max-w-xl">
              {data.heroSubtitle}
            </p>

            {/* Primary CTA inline in hero */}
            <div className="flex flex-wrap gap-3 mt-6">
              <Link
                to="/due-date-calculator"
                className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-full px-6 py-3 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
              >
                <Calendar size={14} />
                Calculate your due date
              </Link>
            </div>
          </div>
        </section>

        {/* ── 2. What this stage is (compact) ── */}
        <section className="bg-parchment-dark py-10 md:py-14">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-2xl">
            <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-4">
              {data.about.title}
            </h2>
            {data.about.paragraphs.map((p, i) => (
              <p key={i} className="font-sans text-[15px] font-light text-muted-foreground leading-[1.8] mb-3 last:mb-0">
                {p}
              </p>
            ))}
          </div>
        </section>

        {/* ── 3. What to focus on right now (action-first) ── */}
        <section className="bg-parchment py-10 md:py-14">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-2xl">
            <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-5">
              What to focus on right now
            </h2>
            <div className="grid gap-3">
              {data.focus.map((item, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="font-sans text-sage text-sm mt-0.5 shrink-0">→</span>
                  <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
            <p className="font-sans text-sm font-light text-sage-muted italic mt-5">
              {data.focusClosing}
            </p>
          </div>
        </section>

        {/* ── 4. What to expect (tabbed cards) ── */}
        <section className="bg-parchment-dark py-10 md:py-14">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-2xl">
            <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-6">
              What to expect
            </h2>
            <div className="grid gap-4">
              {data.expect.map((sub) => (
                <div key={sub.id} className="bg-card border border-border/40 rounded-xl p-5">
                  <p className="font-sans text-xs font-medium tracking-wide uppercase text-sage mb-3">
                    {sub.label}
                  </p>
                  <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-3">
                    {sub.intro}
                  </p>
                  <ul className="space-y-1.5 mb-3">
                    {sub.points.map((pt, i) => (
                      <li key={i} className="font-sans text-sm font-light text-muted-foreground leading-relaxed pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-sage-muted">
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <p className="font-sans text-sm font-light text-foreground/80 italic leading-relaxed border-t border-border/30 pt-3">
                    {sub.meaning}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. Normal vs Seek Support ── */}
        <section className="bg-parchment py-10 md:py-14">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-2xl">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-card border border-border/40 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle size={15} className="text-sage" />
                  <p className="font-sans text-xs font-medium tracking-wide uppercase text-sage">Normal</p>
                </div>
                <ul className="space-y-2">
                  {data.normal.normalItems.map((item, i) => (
                    <li key={i} className="font-sans text-sm font-light text-muted-foreground">{item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-card border border-border/40 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle size={15} className="text-terracotta" />
                  <p className="font-sans text-xs font-medium tracking-wide uppercase text-terracotta">Seek support if</p>
                </div>
                <ul className="space-y-2">
                  {data.normal.seekSupport.map((item, i) => (
                    <li key={i} className="font-sans text-sm font-light text-muted-foreground">{item}</li>
                  ))}
                </ul>
                <p className="font-sans text-[11px] font-light text-muted-foreground/70 mt-3 italic">{data.normal.disclaimer}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. Week-by-week navigation (compact grid) ── */}
        {data.weekGroups && (
          <section className="bg-parchment-dark py-10 md:py-14" id="week-by-week">
            <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-2xl">
              <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-6">
                Week by week
              </h2>
              {data.weekGroups.map((group) => (
                <div key={group.label} className="mb-5 last:mb-0">
                  <p className="font-sans text-xs font-light text-sage-muted tracking-wide mb-2.5">
                    {group.label}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.weeks.map((w) => (
                      <Link
                        key={w}
                        to={`/pregnancy/week/${w}`}
                        className="bg-card border border-border/40 rounded-lg px-4 py-2.5 font-sans text-sm font-light text-foreground hover:border-sage/40 hover:bg-sage-bg/20 transition-all"
                      >
                        Week {w}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── 7. Common questions (compact accordion-style) ── */}
        <section className="bg-parchment py-10 md:py-14">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-2xl">
            <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-5">
              Common questions
            </h2>
            <div className="grid gap-3">
              {data.questions.map((q, i) => (
                <div key={i} className="bg-card border border-border/40 rounded-xl px-5 py-4">
                  <p className="font-sans text-sm font-medium text-foreground">{q.q}</p>
                  <p className="font-sans text-xs font-light text-muted-foreground mt-1">{q.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 8. AI Support (Tier 3) ── */}
        <section className="bg-parchment-dark py-12 md:py-16">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-2xl text-center">
            <p className="font-sans text-[10px] font-light tracking-[0.2em] uppercase text-sage-muted mb-4">
              Ask anything
            </p>
            <p className="font-sans text-sm font-light text-muted-foreground mb-6">
              If something feels unclear during the {data.shortLabel.toLowerCase()} trimester, ask here.
            </p>
            <AISearchBar
              placeholder="What's on your mind?"
              suggestions={[
                "Is this normal right now?",
                "What should I expect next?",
                "Something feels different",
              ]}
              context={`${data.shortLabel} trimester of pregnancy`}
            />
          </div>
        </section>

        {/* ── 9. Emotional moment (brief) ── */}
        <section className="bg-parchment py-10 md:py-14">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-xl text-center">
            <p className="font-serif text-lg sm:text-xl text-foreground leading-relaxed italic mb-3">
              "{data.emotional.quote}"
            </p>
            <p className="font-sans text-sm font-light text-muted-foreground">
              {data.emotional.body}
            </p>
          </div>
        </section>

        {/* ── 10. Journey CTA (Tier 1, dominant) ── */}
        <section className="relative bg-parchment-dark py-16 sm:py-20 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[250px] bg-sage-bg/20 rounded-full blur-[80px] pointer-events-none" />
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-xl relative z-10 text-center">
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-3">
              Start your pregnancy journey
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-8">
              Get week-by-week guidance tailored to your stage of pregnancy.
            </p>
            <Link
              to="/pregnancy"
              className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-full px-8 py-4 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all duration-300"
            >
              Start your journey
              <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default StageGuidanceTrimester;

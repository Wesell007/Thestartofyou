// ─── Stage-Guidance Template (Trimester) ────────────────────────────────
// Product screen / guidance dashboard. NOT an article.
// Personality: structured, compressed, action-oriented, calm.

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
    window.scrollTo(0, 0);
  }, [data]);

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />
      <main>
        {/* ── Hero ── */}
        <section className="pt-24 pb-8 sm:pt-28 sm:pb-10">
          <div className="container mx-auto px-5 sm:px-6 max-w-xl">
            <nav className="flex items-center gap-1.5 mb-5" aria-label="breadcrumb">
              <Link to="/pregnancy" className="font-sans text-[11px] font-light text-muted-foreground hover:text-foreground transition-colors">
                Pregnancy
              </Link>
              <ChevronRight size={10} className="text-muted-foreground/40" />
              <span className="font-sans text-[11px] font-light text-sage-muted">{data.label}</span>
            </nav>

            <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase mb-3" style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}>
              {data.range}
            </p>
            <h1 className="font-serif text-[1.75rem] sm:text-[2rem] text-foreground leading-[1.15] mb-3">
              {data.label}
            </h1>
            <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed max-w-md">
              {data.heroSubtitle}
            </p>

            <Link
              to="/due-date-calculator"
              className="inline-flex items-center gap-2 mt-6 font-sans text-[13px] font-medium text-foreground border border-border/60 rounded-full px-5 py-2.5 hover:border-sage/40 transition-all"
            >
              <Calendar size={13} className="text-sage-muted" />
              Calculate your due date
            </Link>
          </div>
        </section>

        <div className="section-divider" />

        {/* ── What this stage is ── */}
        <section className="py-8 sm:py-10">
          <div className="container mx-auto px-5 sm:px-6 max-w-xl">
            <h2 className="font-serif text-lg text-foreground mb-3">
              {data.about.title}
            </h2>
            {data.about.paragraphs.map((p, i) => (
              <p key={i} className="font-sans text-sm font-light text-muted-foreground leading-[1.85] mb-2 last:mb-0">
                {p}
              </p>
            ))}
          </div>
        </section>

        {/* ── Focus ── */}
        <section className="py-8 sm:py-10">
          <div className="container mx-auto px-5 sm:px-6 max-w-xl">
            <h2 className="font-serif text-lg text-foreground mb-4">
              What to focus on right now
            </h2>
            <ul className="space-y-2.5">
              {data.focus.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-sm mt-0.5 shrink-0" style={{ color: 'hsl(var(--stage-pregnancy-accent) / 0.5)' }}>→</span>
                  <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
            {data.focusClosing && (
              <p className="font-sans text-[13px] font-light text-sage-muted italic mt-4">
                {data.focusClosing}
              </p>
            )}
          </div>
        </section>

        <div className="section-divider" />

        {/* ── What to expect ── */}
        <section className="py-8 sm:py-10">
          <div className="container mx-auto px-5 sm:px-6 max-w-xl">
            <h2 className="font-serif text-lg text-foreground mb-5">
              What to expect
            </h2>
            <div className="space-y-5">
              {data.expect.map((sub) => (
                <div key={sub.id} className="border-l-2 pl-5" style={{ borderColor: 'hsl(var(--stage-pregnancy-accent) / 0.25)' }}>
                  <p className="font-sans text-[10px] font-medium tracking-[0.15em] uppercase mb-2" style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}>
                    {sub.label}
                  </p>
                  <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-2">
                    {sub.intro}
                  </p>
                  <ul className="space-y-1 mb-2">
                    {sub.points.map((pt, i) => (
                      <li key={i} className="font-sans text-[13px] font-light text-muted-foreground leading-relaxed pl-3 relative before:content-['·'] before:absolute before:left-0 before:text-sage-muted">
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <p className="font-sans text-[13px] font-light text-foreground/60 italic leading-relaxed">
                    {sub.meaning}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ── Normal vs Seek Support ── */}
        <section className="py-8 sm:py-10">
          <div className="container mx-auto px-5 sm:px-6 max-w-xl">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle size={13} className="text-sage" />
                  <p className="font-sans text-[10px] font-medium tracking-[0.15em] uppercase text-sage">Normal</p>
                </div>
                <ul className="space-y-1.5">
                  {data.normal.normalItems.map((item, i) => (
                    <li key={i} className="font-sans text-[13px] font-light text-muted-foreground leading-relaxed">{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle size={13} className="text-terracotta" />
                  <p className="font-sans text-[10px] font-medium tracking-[0.15em] uppercase text-terracotta">Seek support if</p>
                </div>
                <ul className="space-y-1.5">
                  {data.normal.seekSupport.map((item, i) => (
                    <li key={i} className="font-sans text-[13px] font-light text-muted-foreground leading-relaxed">{item}</li>
                  ))}
                </ul>
                <p className="font-sans text-[11px] font-light text-muted-foreground/50 mt-3 italic">{data.normal.disclaimer}</p>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ── Week by week ── */}
        {data.weekGroups && (
          <section className="py-8 sm:py-10" id="week-by-week">
            <div className="container mx-auto px-5 sm:px-6 max-w-xl">
              <h2 className="font-serif text-lg text-foreground mb-4">
                Week by week
              </h2>
              {data.weekGroups.map((group) => (
                <div key={group.label} className="mb-3 last:mb-0">
                  <p className="font-sans text-[11px] font-light text-sage-muted tracking-wide mb-2">
                    {group.label}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {group.weeks.map((w) => (
                      <Link
                        key={w}
                        to={`/pregnancy/week/${w}`}
                        className="border border-border/40 rounded-md px-3 py-1.5 font-sans text-[13px] font-light text-muted-foreground hover:border-sage/40 hover:text-foreground transition-all"
                      >
                        {w}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="section-divider" />

        {/* ── Common questions ── */}
        <section className="py-8 sm:py-10">
          <div className="container mx-auto px-5 sm:px-6 max-w-xl">
            <h2 className="font-serif text-lg text-foreground mb-4">
              Common questions
            </h2>
            <div className="space-y-3">
              {data.questions.map((q, i) => (
                <div key={i} className="border-l-2 border-border/40 pl-4">
                  <p className="font-sans text-sm font-medium text-foreground">{q.q}</p>
                  <p className="font-sans text-[13px] font-light text-muted-foreground mt-0.5">{q.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ── AI Support (Tier 3) ── */}
        <section className="py-8 sm:py-10">
          <div className="container mx-auto px-5 sm:px-6 max-w-xl text-center">
            <p className="stage-label mb-3">Ask anything</p>
            <p className="font-sans text-[13px] font-light text-muted-foreground mb-5">
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

        {/* ── Emotional moment ── */}
        <section className="py-10 sm:py-12">
          <div className="container mx-auto px-5 sm:px-6 max-w-md text-center">
            <div className="w-8 h-px mx-auto mb-5" style={{ background: 'hsl(var(--stage-pregnancy-accent) / 0.3)' }} />
            <p className="font-serif text-base sm:text-lg text-foreground leading-relaxed italic mb-2">
              "{data.emotional.quote}"
            </p>
            <p className="font-sans text-[13px] font-light text-muted-foreground">
              {data.emotional.body}
            </p>
          </div>
        </section>

        <div className="section-divider" />

        {/* ── Journey CTA (Tier 1) ── */}
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-5 sm:px-6 max-w-md text-center">
            <h2 className="font-serif text-lg sm:text-xl text-foreground leading-tight mb-2">
              Start your pregnancy journey
            </h2>
            <p className="font-sans text-[13px] font-light text-muted-foreground leading-relaxed mb-6">
              Get week-by-week guidance tailored to your stage of pregnancy.
            </p>
            <Link
              to="/pregnancy"
              className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-full px-7 py-3 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all duration-300"
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

export default StageGuidanceTrimester;

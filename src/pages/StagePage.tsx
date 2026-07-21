import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MessageCircle, ArrowUpRight, ArrowDown, CheckCircle2 } from "lucide-react";
import JournalPromotion from "@/components/shared/JournalPromotion";
import PublicReflectionEditor from "@/components/shared/PublicReflectionEditor";
import SeoHead from "@/components/seo/SeoHead";
import { ttcStages, type StageData } from "@/data/stageData";
import { postpartumStages } from "@/data/postpartumStageData";
import { ivfStages } from "@/data/ivfStageData";
import { firstYearStages } from "@/data/firstYearStageData";
import NotFound from "@/pages/NotFound";
import AskLink from "@/components/shared/AskLink";

// Registry of all stage data by journey prefix
const stageRegistry: Record<string, Record<string, StageData>> = {
  "trying-to-conceive": ttcStages,
  postpartum: postpartumStages,
  ivf: ivfStages,
  "first-year": firstYearStages,
};

// Explicit SEO allowlist for wildcard StagePage routes. Only listed routes
// receive indexable route-aware metadata; every other stage route renders
// without SeoHead to avoid broad wildcard indexation.
const stageSeoAllowlist: Record<
  string,
  { title: string; description: string; canonical: string }
> = {
  "trying-to-conceive/understanding-your-cycle": {
    title: "Understanding Your Cycle When Trying to Conceive | The Start of You",
    description:
      "A calm guide to understanding your cycle, fertile window and ovulation timing when you are trying to conceive.",
    canonical: "https://thestartofyou.com/trying-to-conceive/understanding-your-cycle",
  },
  "trying-to-conceive/timing-and-tracking": {
    title: "Timing and Tracking When Trying to Conceive | The Start of You",
    description:
      "Gentle guidance on cycle tracking, ovulation timing and using estimates without pressure when trying to conceive.",
    canonical: "https://thestartofyou.com/trying-to-conceive/timing-and-tracking",
  },
  "trying-to-conceive/waiting-and-testing": {
    title: "Waiting and Testing When Trying to Conceive | The Start of You",
    description:
      "Supportive guidance for the two-week wait, pregnancy testing and managing uncertainty while trying to conceive.",
    canonical: "https://thestartofyou.com/trying-to-conceive/waiting-and-testing",
  },
};

const StagePage = () => {
  const { journey, stage } = useParams<{ journey: string; stage: string }>();
  const stageMap = journey ? stageRegistry[journey] : undefined;
  const data = stageMap && stage ? stageMap[stage] : undefined;

  if (!data) return <NotFound />;

  const seo = stageSeoAllowlist[`${journey}/${stage}`];

  return (
    <div className="min-h-screen font-sans">
      {seo ? (
        <SeoHead
          title={seo.title}
          description={seo.description}
          canonical={seo.canonical}
          ogUrl={seo.canonical}
        />
      ) : null}
      <Navbar />
      <main>
        {/* 1. HERO */}
        <section className="relative min-h-[70vh] bg-parchment overflow-hidden flex flex-col justify-center pt-24 pb-16">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-sage-bg/30 blur-3xl" />
          </div>
          <div className="container mx-auto px-6 md:px-10 max-w-4xl relative z-10 text-center">
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-4">
              {data.journeyLabel}
            </p>
            {data.stageIndicator && (
              <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted/60 mb-6">
                {data.stageIndicator}
              </p>
            )}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-foreground leading-[1.1] mb-6 animate-fade-up">
              {data.title}
            </h1>
            <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-12 max-w-2xl mx-auto animate-fade-up [animation-delay:0.1s]">
              {data.subtitle}
            </p>
            <button
              onClick={() => window.scrollTo({ top: window.innerHeight * 0.7, behavior: "smooth" })}
              className="flex items-center gap-2 border border-foreground/20 text-foreground rounded-pill px-7 py-3.5 font-sans text-sm font-light hover:bg-parchment-dark transition-all mx-auto animate-fade-up [animation-delay:0.2s]"
            >
              <ArrowDown size={15} />
              Begin this stage
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-parchment to-transparent pointer-events-none" />
        </section>

        {/* 2. WHAT THIS STAGE IS */}
        <section className="bg-parchment-dark py-24 md:py-32">
          <div className="container mx-auto px-6 md:px-10 max-w-4xl">
            <div className="max-w-2xl">
              <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
                This Stage
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-8 leading-tight">
                What this stage is
              </h2>
              <div className="space-y-5 font-sans text-base font-light text-muted-foreground leading-relaxed">
                {data.whatThisIs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. WHAT TO FOCUS ON RIGHT NOW */}
        <section className="bg-parchment py-24 md:py-32">
          <div className="container mx-auto px-6 md:px-10 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
              <div>
                <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
                  Right Now
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight">
                  What to focus on right now
                </h2>
              </div>
              <div className="space-y-5">
                {data.focusItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sage shrink-0" />
                    <p className="font-serif italic text-lg text-foreground leading-snug">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. WHAT TO DO RIGHT NOW (ACTION LAYER) */}
        <section className="bg-parchment-dark py-24 md:py-32">
          <div className="container mx-auto px-6 md:px-10 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
              <div>
                <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
                  Practical
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-5">
                  What to do right now
                </h2>
                <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                  Simple, clear actions, not a rigid plan. Do what feels manageable.
                </p>
              </div>
              <div className="space-y-4">
                {data.actionItems.map((item, i) => (
                  <div key={i} className="bg-card border border-border/50 rounded-lg px-6 py-5 shadow-card-brand">
                    <div className="flex items-start gap-4">
                      <span className="font-serif text-base text-sage-muted opacity-40 shrink-0 mt-0.5 select-none w-5">
                        {i + 1}
                      </span>
                      <p className="font-sans text-sm font-light text-foreground leading-relaxed">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. AM I DOING THIS RIGHT? (REASSURANCE) */}
        <section className="bg-parchment py-24 md:py-32">
          <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center">
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-6">
              Reassurance
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-10 leading-tight">
              Am I doing this right?
            </h2>
            <div className="bg-card border border-border/50 rounded-lg p-8 md:p-12 shadow-card-brand text-left max-w-lg mx-auto">
              <p className="font-sans text-sm font-light text-muted-foreground mb-6">
                If you have:
              </p>
              <div className="space-y-4 mb-8">
                {data.reassuranceBehaviours.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-sage mt-0.5 shrink-0" />
                    <p className="font-sans text-sm font-light text-foreground leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-border/40 pt-6">
                <p className="font-serif italic text-lg text-foreground leading-snug">
                  Then, {data.reassuranceClose}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. WHAT YOU DON'T NEED TO OVERTHINK */}
        <section className="bg-parchment-dark py-24 md:py-32">
          <div className="container mx-auto px-6 md:px-10 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
              <div>
                <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
                  Perspective
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight">
                  What you don't need to overthink
                </h2>
              </div>
              <div>
                <div className="space-y-4 mb-8">
                  {data.overthinkItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sage-muted shrink-0" />
                      <p className="font-sans text-sm font-light text-foreground leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-sage-bg/40 border border-sage-light/30 rounded-md px-5 py-4">
                  <p className="font-sans text-xs font-light tracking-[0.12em] uppercase text-sage-muted mb-1.5">
                    What this means
                  </p>
                  <p className="font-serif italic text-base text-foreground/70 leading-relaxed">
                    {data.overthinkMeaning}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. WHAT TO EXPECT */}
        <section className="bg-parchment py-24 md:py-32">
          <div className="container mx-auto px-6 md:px-10 max-w-4xl">
            <div className="mb-16">
              <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
                What to Expect
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight max-w-2xl">
                What to expect during this stage
              </h2>
            </div>
            <div className="space-y-12">
              {data.expectSections.map((s, i) => (
                <div
                  key={i}
                  className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-14 py-10 border-t border-border/40 first:border-0 first:pt-0"
                >
                  <div className="flex flex-col gap-2 pt-1">
                    <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted">
                      {s.tag}
                    </p>
                    <p className="font-serif text-lg text-foreground leading-snug">{s.title}</p>
                  </div>
                  <div>
                    <ul className="space-y-3 mb-6">
                      {s.bullets.map((b, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span className="mt-2 w-1 h-1 rounded-full bg-sage-muted shrink-0" />
                          <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">{b}</p>
                        </li>
                      ))}
                    </ul>
                    <div className="bg-sage-bg/40 border border-sage-light/30 rounded-md px-5 py-4">
                      <p className="font-sans text-xs font-light tracking-[0.12em] uppercase text-sage-muted mb-1.5">
                        What this means
                      </p>
                      <p className="font-serif italic text-base text-foreground/70 leading-relaxed">{s.meaning}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. WHAT CAN FEEL DIFFICULT */}
        <section className="bg-parchment-dark py-24 md:py-32">
          <div className="container mx-auto px-6 md:px-10 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
              <div>
                <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
                  Real Talk
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight">
                  What can feel difficult
                </h2>
              </div>
              <div className="space-y-5">
                {data.difficultItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sage shrink-0" />
                    <p className="font-serif italic text-lg text-foreground leading-snug">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 9. WHAT THIS MEANS */}
        <section className="bg-parchment py-24 md:py-32">
          <div className="container mx-auto px-6 md:px-10 max-w-3xl">
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
              Interpretation
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-8 leading-tight">
              What this means
            </h2>
            <div className="space-y-5 font-sans text-base font-light text-muted-foreground leading-relaxed">
              {data.interpretation.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* 10. WHAT'S NORMAL & WHEN TO SEEK SUPPORT */}
        <section className="bg-parchment-dark py-24 md:py-32">
          <div className="container mx-auto px-6 md:px-10 max-w-4xl">
            <div className="mb-14">
              <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
                Guidance
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight max-w-lg">
                What's normal, and when to seek support
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-card border border-border/50 rounded-lg p-8 shadow-card-brand">
                <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-6">
                  Normal
                </p>
                <div className="space-y-4">
                  {data.normalItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="mt-2 w-1 h-1 rounded-full bg-sage shrink-0" />
                      <p className="font-sans text-sm font-light text-foreground leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-card border border-border/50 rounded-lg p-8 shadow-card-brand">
                <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-6">
                  Seek support
                </p>
                <div className="space-y-4 mb-6">
                  {data.seekSupportItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="mt-2 w-1 h-1 rounded-full bg-terracotta/60 shrink-0" />
                      <p className="font-sans text-sm font-light text-foreground leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
                <p className="font-sans text-xs font-light text-sage-muted italic">
                  ✔ Medically reviewed by Jenny Joines
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 11. COMMON QUESTIONS */}
        <section className="bg-parchment py-24 md:py-32">
          <div className="container mx-auto px-6 md:px-10 max-w-4xl">
            <div className="mb-14">
              <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
                Guidance
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight max-w-lg">
                Common questions
              </h2>
            </div>
            <div className="divide-y divide-border/50">
              {data.questions.map((item, i) => (
                <AskLink
                  key={i}
                  question={item.q}
                  context={`${data.journeyLabel} · ${data.title}`}
                  stage={journey}
                  className="group flex items-center justify-between py-6 hover:pl-2 transition-all"
                >
                  <div className="flex flex-col gap-1">
                    <p className="font-serif text-xl text-foreground leading-snug group-hover:text-sage transition-colors">
                      {item.q}
                    </p>
                    <p className="font-sans text-sm font-light text-muted-foreground">{item.sub}</p>
                  </div>
                  <span className="text-muted-foreground/40 group-hover:text-sage transition-colors ml-6 shrink-0 font-serif text-2xl leading-none">
                    →
                  </span>
                </AskLink>
              ))}
            </div>
          </div>
        </section>

        {/* 12. AI SUPPORT */}
        <section className="bg-sage-bg/40 py-24 md:py-32">
          <div className="container mx-auto px-6 md:px-10 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
              <div>
                <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
                  AI Support
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-6">
                  Ask anything, whenever you need
                </h2>
                <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-8">
                  If something feels unclear, you can ask about what you're experiencing right now.
                </p>
                <Link
                  to="/ask"
                  className="flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all w-fit"
                >
                  <MessageCircle size={15} />
                  Ask now
                </Link>
              </div>
              <div className="bg-card border border-border/50 rounded-lg p-7 shadow-card-brand space-y-4">
                <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted">
                  Suggested questions
                </p>
                {data.aiPrompts.map((q, i) => (
                  <AskLink key={i} question={q} context={`${data.journeyLabel} · ${data.title}`} stage={journey} className="flex items-start gap-3 py-3 border-b border-border/40 last:border-0 hover:bg-parchment/50 transition-colors rounded px-2 -mx-2">
                    <MessageCircle size={14} className="text-sage mt-0.5 shrink-0" />
                    <p className="font-sans text-sm font-light text-foreground leading-relaxed">{q}</p>
                  </AskLink>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 13. EMOTIONAL SUPPORT */}
        <section className="bg-parchment-dark py-24 md:py-32">
          <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center">
            <div className="flex items-center gap-5 mb-10 justify-center">
              <div className="h-px w-16 bg-sage-light" />
              <span className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted">
                A small reminder
              </span>
              <div className="h-px w-16 bg-sage-light" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-7 leading-tight">
              {data.emotionalTitle}
            </h2>
            <p className="font-sans text-base font-light text-muted-foreground leading-relaxed max-w-lg mx-auto">
              {data.emotionalBody}
            </p>
          </div>
        </section>

        {/* 14. REFLECTION */}
        <section className="bg-parchment py-24 md:py-32">
          <div className="container mx-auto px-6 md:px-10 max-w-3xl">
            <div className="bg-card border border-border/50 rounded-lg p-10 md:p-14 shadow-card-brand text-center">
              <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-6">
                Take a moment
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-5 leading-snug max-w-md mx-auto">
                {data.reflectionPrompt}
              </h2>
              <div className="mt-4 text-left">
                <PublicReflectionEditor
                  storageKey={`tsoy:stage:${journey}:${stage}:reflection-draft`}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 15. JOURNAL (conditional) */}
        {data.includeJournal && (
          <JournalPromotion contextCopy={data.journalContext} />
        )}

        {/* 16. PATHWAYS */}
        <section className="bg-parchment-dark py-24 md:py-32">
          <div className="container mx-auto px-6 md:px-10 max-w-4xl">
            <div className="mb-14">
              <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
                Continue
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight max-w-lg">
                Where to go next
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {data.pathways.map((p, i) => (
                <Link
                  key={i}
                  to={p.href}
                  className="group bg-card border border-border/50 rounded-lg p-7 shadow-card-brand flex flex-col gap-3 hover:border-sage/40 hover:shadow-soft transition-all"
                >
                  <span className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted">
                    {p.label}
                  </span>
                  <h3 className="font-serif text-xl text-foreground group-hover:text-sage transition-colors">
                    {p.title}
                  </h3>
                  <p className="font-serif italic text-sm text-foreground/60 leading-snug">{p.sub}</p>
                  <span className="mt-auto pt-3 flex items-center gap-1 font-sans text-xs font-light text-sage opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore <ArrowUpRight size={12} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 17. FINAL CTA */}
        <section className="bg-parchment py-24 md:py-32 frame-corner">
          <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center">
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-6">
              Your Journey
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl text-foreground mb-5 leading-tight">
              {data.finalCtaTitle}
            </h2>
            <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-10 max-w-md mx-auto">
              {data.finalCtaSub}
            </p>
            <Link
              to={data.pathways[0]?.href || "/"}
              className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-8 py-4 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
            >
              Continue your journey
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default StagePage;

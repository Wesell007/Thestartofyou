import { useEffect, useState, useRef } from "react";
import { useSearchParams, Link, useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import EditorialAnswer from "@/components/shared/EditorialAnswer";
import { ArrowLeft, Loader2, Search, ChevronRight, Heart, BookOpen, Compass, Sparkles, Shield, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAISearch } from "@/hooks/useAISearch";
import { BotanicalAccent, StageGlow, SprigDivider, Sprig } from "@/components/shared/StageBotanical";
import { getAiStageStyle, stageColors } from "@/lib/aiStageStyles";
import SeoHead from "@/components/seo/SeoHead";
import { useCompanionIdentity } from "@/hooks/useCompanionIdentity";


const followUpPrompts = [
  "Can you explain that more?",
  "Is this still normal?",
  "What should I do next?",
];

const relatedLinks = [
  { label: "Pregnancy hub", href: "/pregnancy", icon: Heart, desc: "Week-by-week guidance" },
  { label: "Support hub", href: "/support", icon: BookOpen, desc: "Emotional & practical help" },
  { label: "Explore guidance", href: "/pregnancy", icon: Compass, desc: "Find what you need" },
];

interface IVFLastStage {
  slug: string;
  title: string;
  href: string;
}

interface AskNavigationState {
  question?: string;
  context?: string;
}

const FIRST_YEAR_TOPIC_SUGGESTIONS: Record<string, string[]> = {
  sleep: [
    "Why is my baby waking more than usual?",
    "How much sleep does my baby need at this age?",
    "When should I worry about my baby's sleep?",
    "How can I help my baby settle at night?",
  ],
  "recovery-bleeding": [
    "How do I know if bleeding after birth is normal?",
    "What changes in bleeding should I ask about?",
    "Can bleeding increase after doing too much?",
    "Who should I contact if bleeding worries me?",
  ],
  milestones: [
    "What if my baby reaches milestones at a different pace?",
    "When should I ask about my baby's development?",
    "How can I support my baby's development at home?",
    "What should I note before speaking to a health visitor?",
  ],
  "emotional-wellbeing": [
    "How do I know if I need more support after birth?",
    "Is it normal to feel overwhelmed after having a baby?",
    "Who can I talk to if my mood worries me?",
    "How can I explain how I feel to my GP or health visitor?",
  ],
  feeding: [
    "Why is my baby feeding more often than usual?",
    "What feeding changes should I ask about?",
    "How do nappies help show whether feeding is going well?",
    "When should I ask for feeding support?",
  ],
  "identity-recovery": [
    "Why do I feel different after having a baby?",
    "How long can it take to feel like myself again?",
    "What small things can help me feel more grounded?",
    "When should I ask for emotional support?",
  ],
};

const FAMILY_TOPIC_SUGGESTIONS: Record<string, string[]> = {
  "another-baby": [
    "How do we know if another baby is the right time for us?",
    "How can we prepare our older child for a new baby?",
    "What should we think about before growing our family?",
    "How can we talk about another baby as a couple?",
  ],
  "new-sibling": [
    "How can I help my child feel included when a new baby arrives?",
    "What if my child seems jealous of the baby?",
    "How do I prepare my child for becoming a sibling?",
    "What routines help after a new baby joins the family?",
  ],
  routines: [
    "How can we make mornings less stressful?",
    "What routines help family evenings feel calmer?",
    "How do I build a routine without making life too rigid?",
    "What small family habits make the biggest difference?",
  ],
  boundaries: [
    "How do I set boundaries without causing conflict?",
    "What should I say if relatives ignore our parenting choices?",
    "How do we agree boundaries as parents first?",
    "How can I keep family relationships warm but clear?",
  ],
  "money-stress": [
    "How can we talk about money without arguing?",
    "What helps when childcare costs feel overwhelming?",
    "How do we plan family spending more calmly?",
    "What small money habits help family life feel less stressful?",
  ],
  "family-overwhelm": [
    "How do I explain that the mental load feels too much?",
    "What can I do when family life feels overwhelming?",
    "How can we share the load more fairly?",
    "How do I stop feeling like everything is on me?",
  ],
};

const TODDLER_TOPIC_SUGGESTIONS: Record<string, string[]> = {
  tantrums: [
    "What should I do during a toddler tantrum?",
    "Why does my toddler melt down over small things?",
    "How can I stay calm when my toddler is upset?",
    "When should I ask for advice about toddler behaviour?",
  ],
  sleep: [
    "Why is my toddler suddenly waking at night?",
    "How do I make bedtime calmer?",
    "What if my toddler is dropping a nap?",
    "When should I ask for help with toddler sleep?",
  ],
  speech: [
    "What should I do if my toddler is not saying many words?",
    "How can I support speech at home?",
    "Could hearing affect my toddler's speech?",
    "Who should I ask about toddler speech concerns?",
  ],
  "picky-eating": [
    "Why is my toddler refusing food they used to eat?",
    "How do I make mealtimes less stressful?",
    "What if my toddler eats a very limited range?",
    "When should I ask for feeding support?",
  ],
  "potty-training": [
    "How do I know if my toddler is ready for potty training?",
    "What if potty training becomes stressful?",
    "Should we pause potty training if it is not working?",
    "How do we handle accidents without shame?",
  ],
  "parent-patience": [
    "How do I stay calm when my toddler pushes every boundary?",
    "What should I do after I lose my patience?",
    "How can I make toddler days feel less relentless?",
    "How do I ask for support when I feel overwhelmed?",
  ],
};

const TTC_TOPIC_SUGGESTIONS: Record<string, string[]> = {
  "fertile-window": [
    "How do I know when my fertile window is?",
    "What signs suggest ovulation is close?",
    "How many days before ovulation should we try?",
    "Can my fertile window change each cycle?",
  ],
  "cycle-tracking": [
    "What is the simplest way to track my cycle?",
    "How do I track ovulation without overthinking it?",
    "Which cycle signs are most useful when trying to conceive?",
    "When should I stop tracking for a while?",
  ],
  "pregnancy-tests": [
    "How early can I take a pregnancy test?",
    "What does a faint line mean?",
    "Can testing too early give a negative result?",
    "When should I test after ovulation?",
  ],
  "two-week-wait": [
    "How do I stop overthinking during the two-week wait?",
    "Are symptoms during the two-week wait reliable?",
    "When is the earliest I should test?",
    "How can I look after myself while waiting?",
  ],
  "when-to-ask-help": [
    "When should we speak to a GP about fertility?",
    "What should I mention at a fertility appointment?",
    "What if my cycles are irregular?",
    "What questions should we ask before fertility tests?",
  ],
  "ivf-next-step": [
    "How do we know if IVF might be the next step?",
    "What happens before starting IVF?",
    "How can we prepare emotionally for fertility treatment?",
    "Where should I start if IVF feels overwhelming?",
  ],
};

const PREGNANCY_TOPIC_SUGGESTIONS: Record<string, string[]> = {
  "early-symptoms": [
    "Which early pregnancy symptoms are common?",
    "Why do my symptoms come and go?",
    "When should I ask about cramps or bleeding?",
    "How can I describe my symptoms to a midwife or GP?",
  ],
  "baby-movement": [
    "When might I start feeling baby movements?",
    "What if my baby moves less than usual?",
    "Can movement feel different depending on the placenta?",
    "Who should I contact if movement worries me?",
  ],
  anxiety: [
    "Is anxiety common during pregnancy?",
    "How do I stop worrying between appointments?",
    "How can I explain pregnancy anxiety to my midwife?",
    "When should I ask for more emotional support?",
  ],
  "scans-appointments": [
    "What should I ask at my first pregnancy appointment?",
    "What happens at a pregnancy scan?",
    "How do I prepare for a midwife appointment?",
    "What if I feel nervous before a scan?",
  ],
  "birth-preparation": [
    "When should I start thinking about birth preferences?",
    "What should I include in a birth plan?",
    "How do I prepare without feeling overwhelmed?",
    "What questions should I ask my midwife about birth?",
  ],
  "when-to-ask-help": [
    "Who should I contact if something worries me in pregnancy?",
    "What symptoms should I ask my midwife about?",
    "How do I explain what I am feeling clearly?",
    "What if I feel silly asking for help?",
  ],
};




const AskPage = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigationState = location.state as AskNavigationState | null;
  const legacyQuery = searchParams.get("q") || "";
  const query = navigationState?.question || legacyQuery;
  const context = navigationState?.context || searchParams.get("ctx") || undefined;
  const stageKey = searchParams.get("stage");
  const topic = searchParams.get("topic");
  const stage = getAiStageStyle(stageKey);
  const sc = stageColors(stage);
  const { answer, isLoading, error, ask, reset } = useAISearch();
  const lastQueryRef = useRef("");
  const navigate = useNavigate();
  const isIVF = searchParams.get("journey") === "ivf";
  const { name: companionName } = useCompanionIdentity();

  const [newQuery, setNewQuery] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const [ivfStage, setIvfStage] = useState<IVFLastStage | null>(null);


  useEffect(() => {
    // Consume legacy query-string links without leaving private free text in
    // browser history. New in-app navigation uses location state below.
    if (!legacyQuery || navigationState?.question) return;
    const safeParams = new URLSearchParams(searchParams);
    safeParams.delete("q");
    const suffix = safeParams.toString();
    navigate(`/ask${suffix ? `?${suffix}` : ""}`, {
      replace: true,
      state: { question: legacyQuery, context },
    });
  }, [legacyQuery, navigationState, searchParams, navigate, context]);

  useEffect(() => {
    if (!isIVF) return;
    try {
      const raw = sessionStorage.getItem("ivf:lastStage");
      if (raw) {
        const parsed = JSON.parse(raw) as IVFLastStage;
        if (parsed && parsed.slug && parsed.title && parsed.href) setIvfStage(parsed);
      }
    } catch { /* ignore */ }
  }, [isIVF]);

  const tone = isIVF
    ? {
        glow: "ivf" as const,
        eyebrow: "text-lavender",
        eyebrowSoft: "text-lavender/80",
        chipBg: "bg-lavender-bg/70",
        chipText: "text-lavender-fg",
        chipRing: "ring-lavender/20",
        chipDot: "bg-lavender",
        sprigTone: "ivf" as const,
        accentText: "text-lavender",
        accentTextMuted: "text-lavender/70",
        accentBorder: "border-lavender/30",
        accentBorderHover: "hover:border-lavender/40",
        accentBgSoft: "bg-lavender-bg/50",
        accentBgSofter: "bg-lavender-bg/40",
        accentRing: "ring-lavender/15",
        accentFocusRing: "focus:ring-lavender/15",
      }
    : {
        glow: "sage" as const,
        eyebrow: "text-sage",
        eyebrowSoft: "text-sage/80",
        chipBg: "bg-sage-bg/70",
        chipText: "text-sage",
        chipRing: "ring-sage/15",
        chipDot: "bg-sage",
        sprigTone: "sage" as const,
        accentText: "text-sage",
        accentTextMuted: "text-sage-muted",
        accentBorder: "border-sage/30",
        accentBorderHover: "hover:border-sage/40",
        accentBgSoft: "bg-sage-bg/50",
        accentBgSofter: "bg-sage-bg/40",
        accentRing: "ring-sage/15",
        accentFocusRing: "focus:ring-sage/15",
      };

  const tailLinks = isIVF
    ? [
        ivfStage
          ? { label: `Back to ${ivfStage.title}`, href: ivfStage.href, icon: Compass, desc: "Return to your IVF stage" }
          : null,
        { label: "The IVF Journey", href: "/ivf", icon: Heart, desc: "Stage-by-stage guidance" },
        { label: "Support hub", href: "/support", icon: BookOpen, desc: "Emotional & practical help" },
      ].filter(Boolean) as typeof relatedLinks
    : relatedLinks;

  useEffect(() => {
    const requestKey = `${query}\u0000${context ?? ""}`;
    if (query && requestKey !== lastQueryRef.current) {
      lastQueryRef.current = requestKey;
      reset();
      ask(query, context);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [query, context, ask, reset]);

  const handleAskAgain = () => {
    if (!newQuery.trim()) return;
    const params = new URLSearchParams();
    if (isIVF) params.set("journey", "ivf");
    if (stageKey) params.set("stage", stageKey);
    const nextContext = [context, query ? `Previous question: ${query}` : null, answer ? `Previous answer: ${answer}` : null]
      .filter(Boolean)
      .join("\n\n");
    setNewQuery("");
    navigate(`/ask${params.toString() ? `?${params.toString()}` : ""}`, {
      state: { question: newQuery.trim(), context: nextContext || undefined },
    });
  };

  const handleSuggestion = (s: string) => {
    const params = new URLSearchParams();
    if (isIVF) params.set("journey", "ivf");
    if (stageKey) params.set("stage", stageKey);
    const nextContext = [context, query ? `Previous question: ${query}` : null, answer ? `Previous answer: ${answer}` : null]
      .filter(Boolean)
      .join("\n\n");
    navigate(`/ask${params.toString() ? `?${params.toString()}` : ""}`, {
      state: { question: s, context: nextContext || undefined },
    });
  };


  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleAskAgain();
  };

  const parseAnswer = (md: string) => {
    const lines = md.split("\n").filter(l => l.trim());
    let quickAnswer = "";
    let rest = md;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line.startsWith("#") && !line.startsWith("👉") && !line.startsWith("-") && !line.startsWith("*") && line.length > 40) {
        quickAnswer = line;
        rest = md.replace(line, "").trim();
        break;
      }
    }

    return { quickAnswer, rest };
  };

  const parsed = answer ? parseAnswer(answer) : null;
  const isDone = answer && !isLoading;
  const hasQuery = Boolean(query);

  // ── Welcome state (no query yet) ──
  if (!hasQuery) {
    const welcomeSuggestions = [
      "Is what I'm feeling normal at 8 weeks?",
      "When should I take a pregnancy test?",
      "How do I know if I'm ovulating?",
      "What should I expect after birth?",
    ];
    const hasStageContext = Boolean(stageKey);
    const topicSuggestions = topic
      ? (((stageKey === "first-year" || stageKey === "recovery") && FIRST_YEAR_TOPIC_SUGGESTIONS[topic])
          || (stageKey === "family" && FAMILY_TOPIC_SUGGESTIONS[topic])
          || (stageKey === "toddler" && TODDLER_TOPIC_SUGGESTIONS[topic])
          || (stageKey === "ttc" && TTC_TOPIC_SUGGESTIONS[topic])
          || (stageKey === "pregnancy" && PREGNANCY_TOPIC_SUGGESTIONS[topic])
          || null)
      : null;
    return (
      <div className="min-h-screen bg-parchment">
        <SeoHead title="Ask for guidance | The Start of You" description="Ask for calm, AI-generated guidance for your current stage." canonical="https://thestartofyou.com/ask" noindex />
        <Navbar />
        <main className="relative pt-24 pb-24 md:pt-32 md:pb-32 overflow-hidden">
          {/* Ambient art-direction layer */}
          {sc ? (
            <div
              className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-3xl pointer-events-none"
              style={{ background: sc.accentSoft }}
              aria-hidden
            />
          ) : (
            <StageGlow tone="sage" className="top-[-120px] left-1/2 -translate-x-1/2 w-[900px] h-[500px]" opacity={0.9} />
          )}
          <BotanicalAccent className="top-24 -left-20 md:top-16 md:-left-10 rotate-[-8deg]" opacity="opacity-[0.18]" size="w-[200px] md:w-[280px]" />
          <BotanicalAccent flip className="bottom-32 -right-16 md:-right-6 rotate-[12deg]" opacity="opacity-[0.16]" size="w-[200px] md:w-[260px]" />

          <div className="container mx-auto px-6 md:px-10 max-w-3xl relative z-10">
            <nav className="flex items-center gap-2 font-sans text-[11px] font-light tracking-wide text-muted-foreground mb-10 uppercase">
              <Link to="/pregnancy" className="hover:text-foreground transition-colors">Explore</Link>
              <ChevronRight size={10} className="text-border" />
              <span className="text-foreground/70">Ask</span>
            </nav>

            <div className="text-center mb-10">
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sage-bg/60 mb-5 ring-4 ring-sage-bg/30"
                style={sc ? { backgroundColor: sc.accentSoft, boxShadow: `0 0 0 4px ${sc.accentSofter}` } : undefined}
              >
                <Sparkles size={18} className="text-sage" style={sc ? { color: sc.accent } : undefined} />
              </div>
              <h1 className="font-serif text-[2rem] sm:text-[2.4rem] md:text-[2.75rem] text-foreground leading-[1.12] tracking-[-0.01em] mb-4">
                {companionName ? `Ask ${companionName}` : "What would you like to ask?"}
              </h1>
              <p className="font-sans text-[14.5px] font-light text-muted-foreground max-w-md mx-auto leading-relaxed">
                Private, calm, judgement-free guidance — for any stage of your journey.
              </p>
            </div>

            <div
              className={`relative bg-card border rounded-2xl px-5 py-4 md:px-6 md:py-5 flex items-center gap-4 transition-all duration-300 shadow-soft ${
                inputFocused ? (sc ? "" : "border-sage/40 ring-1 ring-sage/10") : "border-border/40"
              }`}
              style={sc && inputFocused ? { borderColor: sc.accentBorder, boxShadow: `0 0 0 1px ${sc.accentRing}` } : undefined}
            >
              <Search size={16} className="text-sage-muted/70 shrink-0" style={sc ? { color: sc.accent } : undefined} />
              <input
                type="text"
                value={newQuery}
                onChange={(e) => setNewQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                autoFocus
                placeholder="Ask anything…"
                className="flex-1 bg-transparent font-sans text-sm font-light text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
              />
              <button
                onClick={handleAskAgain}
                disabled={!newQuery.trim()}
                className="bg-terracotta text-terracotta-foreground rounded-full px-6 py-2.5 font-sans text-[13px] font-medium shadow-cta hover:bg-terracotta-hover transition-all duration-300 shrink-0 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
              >
                Ask
              </button>
            </div>

            {!hasStageContext && (
              <div className="mt-8">
                <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground/70 mb-4 text-center">
                  Try one of these
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {welcomeSuggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSuggestion(s)}
                      className="font-sans text-[12.5px] font-light text-foreground/75 bg-card border border-border/40 rounded-full px-4 py-2 hover:border-sage/40 hover:text-foreground hover:bg-card transition-all duration-200"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {topicSuggestions && (
              <div className="mt-8">
                <p
                  className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase mb-4 text-center"
                  style={sc ? { color: sc.accent } : undefined}
                >
                  You may also want to ask
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {topicSuggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSuggestion(s)}
                      className="font-sans text-[12.5px] font-light text-foreground/80 bg-card border rounded-full px-4 py-2 transition-all duration-200 hover:text-foreground"
                      style={
                        sc
                          ? { borderColor: sc.accentBorder }
                          : undefined
                      }
                      onMouseEnter={(e) => {
                        if (!sc) return;
                        e.currentTarget.style.backgroundColor = sc.accentSofter;
                      }}
                      onMouseLeave={(e) => {
                        if (!sc) return;
                        e.currentTarget.style.backgroundColor = "";
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-parchment">
      <SeoHead title="Your AI-generated guidance | The Start of You" description="AI-generated guidance for your question." canonical="https://thestartofyou.com/ask" noindex />
      <Navbar />

      <main className="relative pt-20 pb-24 md:pt-28 md:pb-32 overflow-hidden">

        {/* ─────────────────────────────────────────────
            ART-DIRECTED HERO BAND
            Soft tonal wash + botanical accents framing
            the question and quick answer.
            ───────────────────────────────────────────── */}
        <div className="absolute inset-x-0 top-0 h-[680px] md:h-[760px] pointer-events-none overflow-hidden">
          <div
            className={`absolute inset-0 bg-gradient-to-b ${isIVF ? "from-lavender-bg/35" : "from-sage-bg/35"} via-parchment/60 to-parchment`}
            style={sc ? { background: `linear-gradient(to bottom, ${sc.bgWash}, hsl(var(--parchment)) 60%, hsl(var(--parchment)) 100%)` } : undefined}
          />
          {sc ? (
            <div
              className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[1100px] h-[600px] rounded-full blur-3xl pointer-events-none"
              style={{ background: sc.accentSoft }}
              aria-hidden
            />
          ) : (
            <StageGlow tone={tone.glow} className="top-[-200px] left-1/2 -translate-x-1/2 w-[1100px] h-[600px]" opacity={1} />
          )}
          <BotanicalAccent
            className="top-24 -left-16 md:top-20 md:-left-6 rotate-[-10deg]"
            opacity="opacity-[0.22]"
            size="w-[200px] md:w-[300px]"
          />
          <BotanicalAccent
            flip
            className="top-40 -right-16 md:top-32 md:-right-4 rotate-[14deg]"
            opacity="opacity-[0.18]"
            size="w-[180px] md:w-[260px]"
          />
        </div>

        {/* ── Top frame: question context ── */}
        <div className="container mx-auto px-6 md:px-10 max-w-3xl relative z-10">

          {/* IVF orientation strip — only when arriving from an IVF stage */}
          {isIVF && (
            <nav
              aria-label="IVF journey context"
              className="flex items-center gap-2 font-sans text-[11px] font-light tracking-[0.18em] uppercase text-muted-foreground/70 flex-wrap mb-6"
            >
              <span className="text-foreground/55">IVF</span>
              {ivfStage && (
                <>
                  <span className="opacity-40" aria-hidden="true">·</span>
                  <Link to={ivfStage.href} className="hover:text-foreground transition-colors">
                    ← {ivfStage.title}
                  </Link>
                </>
              )}
              <span className="opacity-40" aria-hidden="true">·</span>
              <Link to="/ivf" className="hover:text-foreground transition-colors">
                ← IVF hub
              </Link>
            </nav>
          )}

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 font-sans text-[11px] font-light tracking-wide text-muted-foreground mb-10 uppercase">
            <Link to={isIVF ? "/ivf" : "/pregnancy"} className="hover:text-foreground transition-colors">
              {isIVF ? "IVF" : "Explore"}
            </Link>
            <ChevronRight size={10} className="text-border" />
            <span className="text-foreground/60">Your question</span>
          </nav>

          {/* Stage context chip */}
          {context && (
            <div className="mb-5">
              <span
                className={`inline-flex items-center gap-1.5 ${tone.chipBg} ${tone.chipText} font-sans text-[10px] font-medium tracking-widest uppercase px-3 py-1.5 rounded-full ring-1 ${tone.chipRing}`}
                style={sc ? { backgroundColor: sc.accentSoft, color: sc.deep, boxShadow: `inset 0 0 0 1px ${sc.accentRing}` } : undefined}
              >
                <span
                  className={`w-1 h-1 rounded-full ${tone.chipDot}`}
                  style={sc ? { backgroundColor: sc.accent } : undefined}
                />
                {context}
              </span>
            </div>
          )}

          {/* Question title, editorial */}
          <div className="mb-7">
            <p
              className={`font-sans text-[10px] font-medium tracking-[0.22em] uppercase ${tone.eyebrowSoft} mb-3`}
              style={sc ? { color: sc.accent } : undefined}
            >
              You asked
            </p>
            <h1 className="font-serif text-[1.75rem] sm:text-[2.1rem] md:text-[2.65rem] text-foreground leading-[1.1] tracking-[-0.012em]">
              {query}
            </h1>
          </div>

          {/* Trust bar */}
          <div className="flex items-center gap-4 mb-12">
            <div className="flex items-center gap-1.5 text-sage-muted">
              <Shield size={13} />
              <span className="font-sans text-[11px] font-light">AI-generated guidance</span>
            </div>
            <div className="w-px h-3 bg-border/40" />
            <span className="font-sans text-[11px] font-light text-muted-foreground/60">
              Check important health decisions with a qualified professional
            </span>
          </div>
        </div>

        {/* ── Loading state ── */}
        {isLoading && !answer && (
          <div className="container mx-auto px-6 md:px-10 max-w-3xl relative z-10">
            <div className="relative rounded-3xl overflow-hidden">
              <div
                className="absolute inset-0 bg-gradient-to-br from-sage-bg/40 via-card to-lavender-bg/15 pointer-events-none"
                style={sc ? { background: `linear-gradient(135deg, ${sc.bgWash}, hsl(var(--card)) 60%, ${sc.accentSofter})` } : undefined}
              />
              <div
                className="relative bg-card/85 backdrop-blur-sm border border-sage/15 rounded-3xl px-10 py-16 md:px-14 md:py-20 shadow-elevated"
                style={sc ? { borderColor: sc.accentBorder } : undefined}
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div
                    className="w-11 h-11 rounded-full bg-sage-bg/70 flex items-center justify-center ring-4 ring-sage-bg/40"
                    style={sc ? { backgroundColor: sc.accentSoft, boxShadow: `0 0 0 4px ${sc.accentSofter}` } : undefined}
                  >
                    <Loader2
                      size={18}
                      className="animate-spin text-sage"
                      style={sc ? { color: sc.accent } : undefined}
                    />
                  </div>
                  <div>
                    <p className="font-serif text-lg text-foreground mb-1.5">Finding your answer</p>
                    <p className="font-sans text-xs font-light text-muted-foreground">
                      We're putting together guidance tailored to your question…
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Error ── */}
        {error && (
          <div className="container mx-auto px-6 md:px-10 max-w-3xl relative z-10">
            <div className="bg-card border border-destructive/20 rounded-2xl p-8">
              <p className="font-sans text-sm font-light text-destructive">{error}</p>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════
            QUICK ANSWER, the hero moment — premium card
            ══════════════════════════════════════════════════ */}
        {parsed?.quickAnswer && (
          <div className="container mx-auto px-6 md:px-10 max-w-3xl mb-16 relative z-10">
            <div className="relative rounded-[2rem] overflow-hidden shadow-elevated">
              {/* Layered backgrounds */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-sage-bg/55 via-card to-lavender-bg/12 pointer-events-none"
                style={sc ? { background: `linear-gradient(135deg, ${sc.bgWash}, hsl(var(--card)) 60%, ${sc.accentSofter})` } : undefined}
              />
              <div
                className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-sage/[0.08] blur-3xl pointer-events-none"
                style={sc ? { background: sc.accentSoft } : undefined}
              />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-lavender/[0.06] blur-3xl pointer-events-none" />

              {/* Botanical mark in corner */}
              <Sprig tone={tone.sprigTone} className="absolute top-6 right-6 w-10 h-10 opacity-30" />

              <div
                className="relative border border-sage/20 rounded-[2rem] px-7 py-10 md:px-14 md:py-14"
                style={sc ? { borderColor: sc.accentBorder } : undefined}
              >
                {/* Label */}
                <div className="flex items-center gap-3 mb-7">
                  <div
                    className="w-9 h-9 rounded-full bg-sage/12 flex items-center justify-center ring-2 ring-sage/10"
                    style={sc ? { backgroundColor: sc.accentSoft, boxShadow: `0 0 0 2px ${sc.accentSofter}` } : undefined}
                  >
                    <Sparkles size={14} className={tone.eyebrow} style={sc ? { color: sc.accent } : undefined} />
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className={`font-sans text-[11px] font-medium tracking-[0.22em] uppercase ${tone.eyebrow}`} style={sc ? { color: sc.accent } : undefined}>
                      The short answer
                    </span>
                    <span className="h-px w-12 bg-sage/30" style={sc ? { backgroundColor: sc.accentRing } : undefined} />
                  </div>
                </div>

                {/* Editorial pull-quote treatment */}
                <p className="font-serif text-[1.25rem] md:text-[1.55rem] text-foreground leading-[1.55] max-w-2xl tracking-[-0.005em]">
                  <span className="font-medium">{parsed.quickAnswer.split(" ").slice(0, 8).join(" ")}</span>
                  {" "}
                  <span className="text-foreground/85">{parsed.quickAnswer.split(" ").slice(8).join(" ")}</span>
                </p>

                {/* Hairline detail */}
                <div className="mt-9 pt-5 border-t border-sage/15 flex items-center justify-between gap-4">
                  <span className="font-sans text-[11px] font-light text-sage-muted">
                    Continue reading for the full picture
                  </span>
                  <span className="font-sans text-[10px] font-light tracking-widest uppercase text-sage/60">
                    01 / 03
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════
            STRUCTURED ANSWER BODY
            ══════════════════════════════════════════════════ */}
        {parsed?.rest && (
          <div className="container mx-auto px-6 md:px-10 max-w-3xl mb-8 relative z-10">
            {/* Label above body */}
            <div className="flex items-center gap-3 mb-8">
              <span className="font-sans text-[10px] font-medium tracking-[0.22em] uppercase text-muted-foreground/70">
                The full picture
              </span>
              <span className="h-px flex-1 bg-border/30" />
              <span className="font-sans text-[10px] font-light tracking-widest uppercase text-muted-foreground/50">
                02 / 03
              </span>
            </div>

            <EditorialAnswer markdown={parsed.rest} />
          </div>
        )}

        {/* Streaming indicator */}
        {isLoading && answer && (
          <div className="container mx-auto px-6 md:px-10 max-w-3xl relative z-10">
            <div className="flex items-center gap-2.5 mt-2 mb-8">
              <Loader2 size={13} className={`animate-spin ${tone.accentText}`} style={sc ? { color: sc.accent } : undefined} />
              <span className={`font-sans text-[11px] font-light ${tone.accentTextMuted} tracking-wide`} style={sc ? { color: sc.deepSoft } : undefined}>Still writing…</span>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════
            POST-ANSWER SECTIONS (only when done)
            ══════════════════════════════════════════════════ */}
        {isDone && (
          <>
            {/* ── AI limitations signature ── */}
            <div className="container mx-auto px-6 md:px-10 max-w-3xl relative z-10">
              <div className="flex items-center gap-3 pt-10 pb-2">
                <div
                  className={`flex items-center gap-2 ${tone.accentBgSofter} rounded-full px-4 py-2 ring-1 ${tone.accentRing}`}
                  style={sc ? { backgroundColor: sc.accentSofter, boxShadow: `inset 0 0 0 1px ${sc.accentRing}` } : undefined}
                >
                  <Shield size={12} className={tone.accentText} style={sc ? { color: sc.accent } : undefined} />
                  <p className={`font-sans text-[11px] font-light ${tone.accentText} tracking-wide`} style={sc ? { color: sc.accent } : undefined}>
                    AI-generated, not individually medically reviewed
                  </p>
                </div>
              </div>
            </div>

            {/* ── Reassurance, editorial reminder block ── */}
            <div className="mt-16 mb-20 relative">
              <div
                className="relative bg-gradient-to-b from-sage-bg/20 via-parchment to-parchment overflow-hidden"
                style={sc ? { background: `linear-gradient(to bottom, ${sc.bgWashSoft}, hsl(var(--parchment)) 60%, hsl(var(--parchment)))` } : undefined}
              >
                {/* Soft botanical flanks */}
                <BotanicalAccent
                  className="top-1/2 -translate-y-1/2 -left-20 md:-left-6 rotate-[-15deg]"
                  opacity="opacity-[0.16]"
                  size="w-[180px] md:w-[240px]"
                />
                <BotanicalAccent
                  flip
                  className="top-1/2 -translate-y-1/2 -right-20 md:-right-6 rotate-[15deg]"
                  opacity="opacity-[0.16]"
                  size="w-[180px] md:w-[240px]"
                />

                <div className="container mx-auto px-6 md:px-10 max-w-3xl py-16 md:py-24 relative z-10">
                  <div className="max-w-lg mx-auto text-center">
                    <SprigDivider tone={tone.sprigTone} className="mb-6" />
                    <p className="font-sans text-[10px] font-medium tracking-[0.22em] uppercase text-terracotta/80 mb-5">
                      A small reminder
                    </p>
                    <p className="font-serif text-[1.4rem] md:text-[1.6rem] text-foreground leading-[1.4] mb-4 tracking-[-0.005em]">
                      Whatever you're going through, it's okay to ask.
                    </p>
                    <p className="font-sans text-[14px] font-light text-muted-foreground leading-[1.75] max-w-md mx-auto">
                      You're doing the right thing by looking for answers, and you don't need to have it all figured out. Trust yourself.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Follow-up prompts ── */}
            <div className="container mx-auto px-6 md:px-10 max-w-3xl mb-14 relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-sans text-[10px] font-medium tracking-[0.22em] uppercase text-muted-foreground/70">
                  Keep exploring
                </span>
                <span className="h-px flex-1 bg-border/25" />
                <span className="font-sans text-[10px] font-light tracking-widest uppercase text-muted-foreground/50">
                  03 / 03
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {followUpPrompts.map((p) => (
                  <button
                    key={p}
                    onClick={() => handleSuggestion(p)}
                    className={`group inline-flex items-center gap-2.5 font-sans text-[13px] font-light text-foreground/75
                      bg-card border border-border/40 rounded-full px-5 py-3
                      ${tone.accentBorderHover} hover:text-foreground hover:bg-card hover:shadow-soft
                      transition-all duration-300`}
                  >
                    {p}
                    <ChevronRight size={11} className={`text-border ${isIVF ? "group-hover:text-lavender" : "group-hover:text-sage"} group-hover:translate-x-0.5 transition-all`} />
                  </button>
                ))}
              </div>
            </div>

            {/* ── Continue your journey ── */}
            <div className="container mx-auto px-6 md:px-10 max-w-3xl mb-20 relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-sans text-[10px] font-medium tracking-[0.22em] uppercase text-muted-foreground/70">
                  Continue your journey
                </span>
                <span className="h-px flex-1 bg-border/25" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {tailLinks.map((l) => (
                  <Link
                    key={`${l.href}:${l.label}`}
                    to={l.href}
                    className={`group relative bg-card border border-border/40 rounded-2xl px-6 py-7
                      ${tone.accentBorderHover} hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-300 overflow-hidden`}
                  >
                    <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${isIVF ? "from-lavender-bg/40" : "from-sage-bg/40"} to-transparent rounded-bl-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
                    <div className="flex items-start justify-between mb-3.5">
                      <div className={`w-9 h-9 rounded-full ${tone.accentBgSoft} flex items-center justify-center ring-1 ${tone.accentRing} ${isIVF ? "group-hover:bg-lavender-bg/80" : "group-hover:bg-sage-bg/80"} transition-colors`}>
                        <l.icon size={15} className={tone.accentText} />
                      </div>
                      <ArrowUpRight size={14} className={`text-border ${isIVF ? "group-hover:text-lavender" : "group-hover:text-sage"} group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all`} />
                    </div>
                    <p className="font-serif text-[15px] text-foreground mb-1">{l.label}</p>
                    <p className="font-sans text-[11.5px] font-light text-muted-foreground leading-relaxed">{l.desc}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* ══════════════════════════════════════════════════
                ASK SOMETHING ELSE — premium continuation moment
                ══════════════════════════════════════════════════ */}
            <div className="relative mt-8">
              {/* Full-width premium wash */}
              <div
                className={`absolute inset-0 bg-gradient-to-b from-parchment ${isIVF ? "via-lavender-bg/15" : "via-sage-bg/15"} to-parchment pointer-events-none`}
                style={sc ? { background: `linear-gradient(to bottom, hsl(var(--parchment)), ${sc.bgWashSoft} 50%, hsl(var(--parchment)))` } : undefined}
              />
              {sc ? (
                <div
                  className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full blur-3xl pointer-events-none"
                  style={{ background: sc.accentSoft, opacity: 0.7 }}
                  aria-hidden
                />
              ) : (
                <StageGlow tone={tone.glow} className="top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[900px] h-[400px]" opacity={0.7} />
              )}

              <div className="relative container mx-auto px-6 md:px-10 max-w-3xl py-20 md:py-28">
                <div
                  className={`relative bg-card border ${isIVF ? "border-lavender/15" : "border-sage/15"} rounded-[2rem] px-7 py-12 md:px-14 md:py-16 shadow-elevated overflow-hidden`}
                  style={sc ? { borderColor: sc.accentBorder } : undefined}
                >
                  {/* Botanical art-direction */}
                  <BotanicalAccent
                    className="-top-10 -left-10 rotate-[-18deg]"
                    opacity="opacity-[0.14]"
                    size="w-[180px] md:w-[230px]"
                  />
                  <BotanicalAccent
                    flip
                    className="-bottom-10 -right-10 rotate-[18deg]"
                    opacity="opacity-[0.14]"
                    size="w-[180px] md:w-[230px]"
                  />
                  <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-sage/[0.06] blur-3xl pointer-events-none" />

                  <div className="relative text-center mb-9">
                    <SprigDivider tone={tone.sprigTone} className="mb-6" />
                  <p className={`font-sans text-[10px] font-medium tracking-[0.22em] uppercase ${tone.eyebrow} mb-4`} style={sc ? { color: sc.accent } : undefined}>
                      Your next question
                    </p>
                    <h2 className="font-serif text-[1.75rem] md:text-[2.1rem] text-foreground mb-3 leading-[1.2] tracking-[-0.01em]">
                      What else is on your mind?
                    </h2>
                    <p className="font-sans text-[14px] font-light text-muted-foreground max-w-md mx-auto leading-relaxed">
                      Keep going — we're here for every part of the journey, no question too small.
                    </p>
                  </div>

                  {/* Input */}
                  <div className="relative max-w-xl mx-auto">
                    <div
                      className={`relative bg-parchment border rounded-2xl px-5 py-4 md:px-6 md:py-5 flex items-center gap-4 transition-all duration-300 ${
                        inputFocused
                          ? `${isIVF ? "border-lavender/50 ring-2 ring-lavender/10" : "border-sage/50 ring-2 ring-sage/10"} shadow-soft`
                          : "border-border/50"
                      }`}
                      style={sc && inputFocused ? { borderColor: sc.accentBorderStrong, boxShadow: `0 0 0 4px ${sc.accentSofter}` } : undefined}
                    >
                      <Search size={16} className={`${isIVF ? "text-lavender/60" : "text-sage-muted/60"} shrink-0`} style={sc ? { color: sc.accent } : undefined} />
                      <input
                        type="text"
                        value={newQuery}
                        onChange={(e) => setNewQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setInputFocused(true)}
                        onBlur={() => setInputFocused(false)}
                        placeholder="Type your next question…"
                        className="flex-1 bg-transparent font-sans text-sm font-light text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
                      />
                      <button
                        onClick={handleAskAgain}
                        disabled={!newQuery.trim()}
                        className="bg-terracotta text-terracotta-foreground rounded-full px-6 py-2.5 font-sans text-[13px] font-medium shadow-cta
                          hover:bg-terracotta-hover transition-all duration-300 shrink-0
                          disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
                      >
                        Ask now
                      </button>
                    </div>

                    {/* Suggestion chips */}
                    <div className="flex flex-wrap gap-2 mt-6 justify-center">
                      {["Is it normal?", "What should I expect?", "I'm not sure what I'm feeling"].map((s) => (
                        <button
                          key={s}
                          onClick={() => handleSuggestion(s)}
                          className={`font-sans text-[12px] font-light text-muted-foreground bg-card/60 border border-border/40 rounded-full px-4 py-2
                            ${tone.accentBorderHover} hover:text-foreground hover:bg-card hover:shadow-soft transition-all duration-200`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AskPage;

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams, Link, useLocation, useNavigate } from "react-router-dom";
import EditorialAnswer from "@/components/shared/EditorialAnswer";
import { sanitiseAnswerForDisplay, APPROVED_SOURCES_TRUST_LINE } from "@/lib/aiAnswerSafety";
import { resolveAskClarification, type AskClarificationChip } from "@/lib/askClarification";
import { Loader2, ChevronRight, Heart, BookOpen, Compass, ArrowUpRight, ArrowLeft, ArrowUp } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCompanionConversation } from "@/lib/companion/conversation/useCompanionConversation";
import CompanionMemoryPrompt from "@/components/companion/CompanionMemoryPrompt";
import { useCompanionPersonalJourney } from "@/hooks/useCompanionPersonalJourney";
import { buildEntryContext, buildJourneyContext } from "@/lib/companion/journeyContext";
import { buildCompanionRequest, resolveAskMode } from "@/lib/companion/companionRequest";
import { BotanicalAccent, StageGlow, Sprig } from "@/components/shared/StageBotanical";
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
  /** Context sent to the model. May carry the earlier turn of the conversation. */
  context?: string;
  /** Short label shown to the reader. Never contains previous answer text. */
  contextLabel?: string;
  previousQuestion?: string;
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
  // AIC-2 — the same shared personal resolver the panel uses.
  const { ensurePersonalJourney } = useCompanionPersonalJourney();
  const lastQueryRef = useRef("");
  const navigate = useNavigate();
  const isIVF = searchParams.get("journey") === "ivf";
  // AIC-1 — mode comes only from the authoritative stage/journey parameters
  // written by askNavigation. No inference from question or answer text.
  const askMode = resolveAskMode({ stage: stageKey, journey: searchParams.get("journey") });
  const { name: companionName } = useCompanionIdentity();

  // AIC-2 — /ask carries entry provenance: where the question was asked from.
  // It never becomes a personal fact.
  const journeyParam = searchParams.get("journey");
  const contextLabel = navigationState?.contextLabel ?? null;
  const resolveJourneyContext = useCallback(async () => {
    const personal = await ensurePersonalJourney();
    return buildJourneyContext({
      personal,
      entry: buildEntryContext({
        stage: stageKey,
        journey: journeyParam,
        topic,
        title: contextLabel,
      }),
    });
  }, [contextLabel, ensurePersonalJourney, journeyParam, stageKey, topic]);

  // AIC-4 — /ask runs on the same shared conversation runtime as the panel:
  // same ordering, streaming, bounds, clarification and memory interception.
  const conversation = useCompanionConversation({
    mode: askMode,
    context,
    resolveJourneyContext,
  });
  const memory = conversation.memory;
  const { isLoading, error } = conversation;
  const sendRef = useRef(conversation.send);
  sendRef.current = conversation.send;

  // The current answer is the live stream, then the completed assistant turn.
  const answer = useMemo(() => {
    if (conversation.streamingAnswer) return conversation.streamingAnswer;
    if (isLoading) return "";
    const last = [...conversation.messages].reverse().find(
      (message) => message.role === "assistant" && !message.clarification,
    );
    return last?.content ?? "";
  }, [conversation.messages, conversation.streamingAnswer, isLoading]);

  // Everything said before the question now on screen, shown compactly so the
  // thread is visible rather than implied.
  const earlierTurns = useMemo(() => {
    let index = -1;
    conversation.messages.forEach((message, position) => {
      if (message.role === "user" && message.content === query) index = position;
    });
    return index > 0 ? conversation.messages.slice(0, index) : [];
  }, [conversation.messages, query]);

  const [newQuery, setNewQuery] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const [ivfStage, setIvfStage] = useState<IVFLastStage | null>(null);
  const followUpInputRef = useRef<HTMLInputElement | null>(null);


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

  // A short, broad, non-urgent question is met with a gentle clarification
  // instead of a generated answer. Anything with concern wording is never
  // clarified and flows to the model exactly as before.
  const clarification = query ? resolveAskClarification(query) : null;

  // Label shown to the reader. Conversation context carried for the model is
  // never displayed, so no previous answer text can leak into the page.
  const displayContext =
    navigationState?.contextLabel ??
    (context && !/Previous (question|answer):/.test(context) ? context : undefined);
  const previousQuestion = navigationState?.previousQuestion;

  useEffect(() => {
    const requestKey = `${query}\u0000${context ?? ""}\u0000${askMode}`;
    if (query && !clarification && requestKey !== lastQueryRef.current) {
      lastQueryRef.current = requestKey;
      // AIC-1/AIC-4 — one shared runtime owns the request, so /ask and the
      // panel send an identical body for an identical question.
      window.scrollTo({ top: 0, behavior: "smooth" });
      sendRef.current(query);
    }
  }, [query, context, clarification, askMode]);

  const goToQuestion = (question: string) => {
    const params = new URLSearchParams();
    if (isIVF) params.set("journey", "ivf");
    if (stageKey) params.set("stage", stageKey);
    // AIC-4 — continuity is the shared conversation, not a freeform
    // "Previous question/answer" string stitched into page context.
    navigate(`/ask${params.toString() ? `?${params.toString()}` : ""}`, {
      state: {
        question,
        context: context || undefined,
        contextLabel: displayContext,
        previousQuestion: query || undefined,
      },
    });
  };

  const handleAskAgain = () => {
    if (!newQuery.trim()) return;
    const next = newQuery.trim();
    setNewQuery("");
    goToQuestion(next);
  };

  const handleSuggestion = (s: string) => goToQuestion(s);

  /**
   * Clarification chips always submit a full question, so a chip can never
   * return the reader to the same clarification card. The concern chip opens
   * the input instead, so the person can describe what is happening.
   */
  const handleClarificationChip = (chip: AskClarificationChip) => {
    if (chip.focusInput) {
      setNewQuery(chip.question);
      followUpInputRef.current?.focus();
      return;
    }
    goToQuestion(chip.question);
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

  // Answers are cleaned before display: no internal retrieval wording, no
  // external source links and no raw URLs reach the reader.
  const safeAnswer = sanitiseAnswerForDisplay(answer, { isStreaming: isLoading });
  const parsed = safeAnswer ? parseAnswer(safeAnswer) : null;
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
        <main className="relative overflow-hidden pt-20 pb-16 md:pt-24 md:pb-24">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[320px] overflow-hidden md:h-[380px]">
            {sc ? (
              <div
                className="absolute top-[-160px] left-1/2 h-[360px] w-[720px] -translate-x-1/2 rounded-full blur-3xl"
                style={{ background: sc.accentSoft }}
                aria-hidden
              />
            ) : (
              <StageGlow tone="sage" className="top-[-160px] left-1/2 -translate-x-1/2 w-[720px] h-[360px]" opacity={0.85} />
            )}
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[46rem] space-y-5 px-5 md:space-y-7 md:px-8">
            <nav className="flex items-center gap-2 font-sans text-[11px] font-light uppercase tracking-wide text-muted-foreground">
              <Link to="/pregnancy" className="hover:text-foreground transition-colors">Explore</Link>
              <ChevronRight size={10} className="text-border" />
              <span className="text-foreground/70">Ask</span>
            </nav>

            <section className="relative overflow-hidden rounded-[22px] border border-border/40 bg-card px-5 py-8 text-center shadow-soft md:px-8 md:py-10">
              <Sprig tone="sage" className="mx-auto mb-3 h-10 w-10 opacity-60" />
              <p className="mb-2 font-sans text-[11px] font-light uppercase tracking-[0.2em] text-muted-foreground">
                Ask your companion
              </p>
              <h1 className="font-serif text-[1.6rem] leading-[1.2] tracking-[-0.01em] text-foreground md:text-[2rem]">
                {companionName ? `How can ${companionName} help you today?` : "How can I help you today?"}
              </h1>
              <p className="mx-auto mt-2 max-w-[46ch] font-sans text-[13.5px] font-light leading-relaxed text-muted-foreground">
                Ask anything about trying to conceive, pregnancy, birth or parenting.
              </p>

              <div className="mx-auto mt-6 flex max-w-[34rem] items-center gap-3 rounded-[16px] border border-border/50 bg-parchment px-4 py-2 text-left transition-all duration-300">
                <label htmlFor="ask-welcome-input" className="sr-only">Ask your question</label>
                <input
                  id="ask-welcome-input"
                  type="text"
                  value={newQuery}
                  onChange={(e) => setNewQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                  autoFocus
                  placeholder="Ask your question…"
                  className="min-h-[44px] flex-1 bg-transparent font-sans text-[14px] font-light text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                />
                <button
                  onClick={handleAskAgain}
                  disabled={!newQuery.trim()}
                  aria-label="Ask"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sage text-parchment transition-colors hover:bg-sage/90 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/40"
                >
                  <ArrowUp size={17} aria-hidden="true" />
                </button>
              </div>

              {!hasStageContext && (
                <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                  <span className="font-sans text-[12px] font-light text-muted-foreground/80">Examples:</span>
                  {welcomeSuggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSuggestion(s)}
                      className="inline-flex min-h-[44px] items-center rounded-full border border-border/40 bg-parchment px-4 font-sans text-[12.5px] font-light text-foreground/80 transition-colors hover:border-sage/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/40"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </section>

            {topicSuggestions && (
              <section className="relative overflow-hidden rounded-[22px] border border-border/40 bg-card px-5 py-6 shadow-soft md:px-8 md:py-8">
                <p
                  className="mb-3 font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground/70"
                  style={sc ? { color: sc.accent } : undefined}
                >
                  You may also want to ask
                </p>
                <div className="flex flex-wrap gap-2">
                  {topicSuggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSuggestion(s)}
                      className="inline-flex min-h-[44px] items-center rounded-full border border-border/40 bg-parchment px-4 font-sans text-[12.5px] font-light text-foreground/80 transition-colors hover:border-sage/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/40"
                      style={sc ? { borderColor: sc.accentBorder } : undefined}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </section>
            )}
          </div>
        </main>
        <Footer />
      </div>
    );
  }


  // ── Board-derived companion surface metrics (Phase 29B.2b) ──
  const columnClass = "relative z-10 mx-auto w-full max-w-[46rem] px-5 md:px-8";
  const cardClass =
    "relative overflow-hidden rounded-[22px] border border-border/40 bg-card shadow-soft";
  const cardPad = "px-5 py-6 md:px-8 md:py-8";
  const chipClass =
    "inline-flex min-h-[44px] items-center rounded-full border border-border/40 bg-parchment px-4 font-sans text-[13px] font-light text-foreground/80 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/40";
  const labelClass =
    "font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground/70";
  const inputRowClass =
    "flex items-center gap-3 rounded-[16px] border border-border/50 bg-parchment px-4 py-2 transition-all duration-300";
  const sendButtonClass =
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sage text-parchment transition-colors hover:bg-sage/90 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/40";

  return (
    <div className="min-h-screen bg-parchment">
      <SeoHead title="Your AI-generated guidance | The Start of You" description="AI-generated guidance for your question." canonical="https://thestartofyou.com/ask" noindex />
      <Navbar />

      <main className="relative overflow-hidden pt-20 pb-16 md:pt-24 md:pb-24">

        {/* Soft tonal wash framing the companion column */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[320px] overflow-hidden md:h-[380px]">
          <div
            className={`absolute inset-0 bg-gradient-to-b ${isIVF ? "from-lavender-bg/30" : "from-sage-bg/30"} via-parchment/70 to-parchment`}
            style={sc ? { background: `linear-gradient(to bottom, ${sc.bgWash}, hsl(var(--parchment)) 60%, hsl(var(--parchment)) 100%)` } : undefined}
          />
          {sc ? (
            <div
              className="absolute top-[-160px] left-1/2 h-[360px] w-[720px] -translate-x-1/2 rounded-full blur-3xl"
              style={{ background: sc.accentSoft }}
              aria-hidden
            />
          ) : (
            <StageGlow tone={tone.glow} className="top-[-160px] left-1/2 -translate-x-1/2 w-[720px] h-[360px]" opacity={0.85} />
          )}
        </div>

        <div className={`${columnClass} space-y-5 md:space-y-7`}>

          {/* IVF orientation strip — only when arriving from an IVF stage */}
          {isIVF && (
            <nav
              aria-label="IVF journey context"
              className="flex flex-wrap items-center gap-2 font-sans text-[11px] font-light uppercase tracking-[0.18em] text-muted-foreground/70"
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
          <nav className="flex items-center gap-2 font-sans text-[11px] font-light uppercase tracking-wide text-muted-foreground">
            <Link to={isIVF ? "/ivf" : "/pregnancy"} className="hover:text-foreground transition-colors">
              {isIVF ? "IVF" : "Explore"}
            </Link>
            <ChevronRight size={10} className="text-border" />
            <span className="text-foreground/60">Your question</span>
          </nav>

          {/* Stage context chip — display label only, never conversation text */}
          {displayContext && (
            <div>
              <span
                className={`inline-flex items-center gap-1.5 ${tone.chipBg} ${tone.chipText} font-sans text-[10px] font-medium uppercase tracking-widest px-3 py-1.5 rounded-full ring-1 ${tone.chipRing}`}
                style={sc ? { backgroundColor: sc.accentSoft, color: sc.deep, boxShadow: `inset 0 0 0 1px ${sc.accentRing}` } : undefined}
              >
                <span
                  className={`w-1 h-1 rounded-full ${tone.chipDot}`}
                  style={sc ? { backgroundColor: sc.accent } : undefined}
                />
                {displayContext}
              </span>
            </div>
          )}

          {/* AIC-4 — earlier turns in this conversation, shown quietly */}
          {earlierTurns.length > 0 && (
            <section aria-label="Earlier in this conversation" className="space-y-2">
              <h2 className="font-sans text-[12.5px] font-light uppercase tracking-[0.08em] text-muted-foreground">
                Earlier in this conversation
              </h2>
              <ol className="space-y-2">
                {earlierTurns.map((turn) => (
                  <li
                    key={turn.id}
                    className="rounded-[14px] border border-border/40 bg-card/60 px-3 py-2 font-sans text-[13.5px] font-light leading-relaxed text-muted-foreground"
                  >
                    <span className="mr-1.5 font-normal text-foreground/70">
                      {turn.role === "user" ? "You:" : "Companion:"}
                    </span>
                    {turn.content.length > 220 ? `${turn.content.slice(0, 217)}…` : turn.content}
                  </li>
                ))}
              </ol>
              <button
                type="button"
                onClick={conversation.newConversation}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full font-sans text-[12.5px] font-light text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/40"
              >
                Start a new conversation
              </button>
            </section>
          )}

          {/* Question bubble — compact, conversational */}

          <div className="flex items-start gap-3">
            <span
              className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sage-bg/60"
              style={sc ? { backgroundColor: sc.accentSoft } : undefined}
              aria-hidden="true"
            >
              <Sprig tone={tone.sprigTone} className="h-4 w-4 opacity-70" />
            </span>
            <h1 className="rounded-[16px] border border-border/40 bg-card px-4 py-3 font-sans text-[15px] font-light leading-relaxed text-foreground shadow-soft md:text-[16px]">
              {query}
            </h1>
          </div>

          {/* Quiet way back to the earlier turn — no snippet of the answer */}
          {previousQuestion && (
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full font-sans text-[12.5px] font-light text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/40"
            >
              <ArrowLeft size={13} aria-hidden="true" />
              Back to previous question
            </button>
          )}

          {/* ── Gentle clarification — broad, non-urgent question ── */}
          {clarification && (
            <section className={`${cardClass} ${cardPad} bg-blush-bg/40`}>
              <BotanicalAccent
                flip
                className="-bottom-6 -right-6 rotate-[12deg]"
                opacity="opacity-[0.14]"
                size="w-[120px] md:w-[170px]"
              />
              <div className="relative flex items-start gap-3">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blush-bg/80 font-serif text-[15px] text-foreground/70"
                  aria-hidden="true"
                >
                  ?
                </span>
                <div>
                  <h2 className="font-serif text-[1.15rem] leading-[1.3] text-foreground md:text-[1.3rem]">
                    Just to make sure I understand…
                  </h2>
                  <p className="mt-1.5 max-w-[52ch] font-sans text-[13.5px] font-light leading-relaxed text-muted-foreground">
                    {clarification.question}
                  </p>
                </div>
              </div>

              <div className="relative mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {clarification.chips.map((c) => (
                  <button
                    key={c.label}
                    type="button"
                    onClick={() => handleClarificationChip(c)}
                    className={`${chipClass} justify-center bg-card ${tone.accentBorderHover}`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              <p className="relative mt-5 font-sans text-[12.5px] font-light text-muted-foreground/85">
                Or you can rephrase your question.
              </p>

              <div className="relative mt-3">
                <label htmlFor="ask-clarify-input" className="sr-only">
                  Ask in your own words
                </label>
                <div className={`${inputRowClass} bg-card`}>
                  <input
                    id="ask-clarify-input"
                    ref={followUpInputRef}
                    type="text"
                    value={newQuery}
                    onChange={(e) => setNewQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask in your own words…"
                    className="min-h-[44px] flex-1 bg-transparent font-sans text-[14px] font-light text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAskAgain}
                    disabled={!newQuery.trim()}
                    aria-label="Ask"
                    className={sendButtonClass}
                  >
                    <ArrowUp size={17} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* ── AIC-3 memory confirmation ── */}
          {memory.state.kind !== "idle" && (
            <div className="mb-6">
              <CompanionMemoryPrompt
                state={memory.state}
                busy={memory.busy}
                onConfirm={() => void memory.confirm()}
                onCancel={memory.cancel}
                onDismiss={memory.dismiss}
              />
            </div>
          )}

          {/* ── Loading state ── */}
          {isLoading && !answer && (
            <section className={`${cardClass} ${cardPad}`}>
              <div className="flex items-center gap-3">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sage-bg/70"
                  style={sc ? { backgroundColor: sc.accentSoft } : undefined}
                >
                  <Loader2 size={16} className="animate-spin text-sage" style={sc ? { color: sc.accent } : undefined} />
                </span>
                <div>
                  <p className="font-serif text-[1.05rem] text-foreground">Thinking this through</p>
                  <p className="font-sans text-[13px] font-light text-muted-foreground">
                    One moment while I put this together…
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* ── Error ── */}
          {error && (
            <section className={`${cardClass} ${cardPad} border-destructive/25`}>
              <p className="font-sans text-sm font-light text-destructive">{error}</p>
            </section>
          )}

          {/* ── In brief — the short answer ── */}
          {parsed?.quickAnswer && (
            <section className={`${cardClass} ${cardPad} bg-sage-bg/25`}>
              <Sprig tone={tone.sprigTone} className="absolute right-4 top-4 h-9 w-9 opacity-25" />
              <div className="relative flex items-start gap-3">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-card"
                  aria-hidden="true"
                >
                  <Sprig tone={tone.sprigTone} className="h-4 w-4 opacity-70" />
                </span>
                <p className="max-w-[52ch] font-serif text-[1.05rem] leading-[1.55] tracking-[-0.005em] text-foreground md:text-[1.2rem]">
                  {parsed.quickAnswer}
                </p>
              </div>
            </section>
          )}

          {/* ── More on this — the fuller answer ── */}
          {parsed?.rest && (
            <section className={`${cardClass} ${cardPad}`}>
              <BotanicalAccent
                flip
                className="-bottom-8 -right-8 rotate-[14deg]"
                opacity="opacity-[0.14]"
                size="w-[120px] md:w-[170px]"
              />
              <div className="relative">
                <div className="mb-5 flex items-center gap-3">
                  <span className={labelClass}>More on this</span>
                  <span className="h-px flex-1 bg-border/30" />
                </div>

                <EditorialAnswer markdown={parsed.rest} disableLinks />

                {!isLoading && (
                  <div className="mt-7 border-t border-border/30 pt-5 text-center">
                    <Sprig tone={tone.sprigTone} className="mx-auto mb-2 h-5 w-5 opacity-50" />
                    <p className="mx-auto max-w-[56ch] font-sans text-[12px] font-light leading-relaxed text-muted-foreground">
                      {APPROVED_SOURCES_TRUST_LINE}
                    </p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Streaming indicator */}
          {isLoading && answer && (
            <div className="flex items-center gap-2.5">
              <Loader2 size={13} className={`animate-spin ${tone.accentText}`} style={sc ? { color: sc.accent } : undefined} />
              <span className={`font-sans text-[11px] font-light tracking-wide ${tone.accentTextMuted}`} style={sc ? { color: sc.deepSoft } : undefined}>Still writing…</span>
            </div>
          )}

          {/* ── Follow-up card ── */}
          {isDone && (
            <>
              <section className={`${cardClass} ${cardPad}`}>
                <Sprig tone={tone.sprigTone} className="absolute right-5 top-5 h-10 w-10 opacity-25" />
                <div className="relative">
                  <h2 className="font-serif text-[1.25rem] leading-[1.25] tracking-[-0.01em] text-foreground md:text-[1.45rem]">
                    What would you like to know next?
                  </h2>
                  <p className="mt-1.5 max-w-[46ch] font-sans text-[13.5px] font-light leading-relaxed text-muted-foreground">
                    Ask a follow-up or stay with this topic.
                  </p>

                  <div className={`${inputRowClass} mt-5`}
                    style={sc && inputFocused ? { borderColor: sc.accentBorderStrong } : undefined}
                  >
                    <label htmlFor="ask-follow-up-input" className="sr-only">
                      Ask another question
                    </label>
                    <input
                      id="ask-follow-up-input"
                      ref={followUpInputRef}
                      type="text"
                      value={newQuery}
                      onChange={(e) => setNewQuery(e.target.value)}
                      onKeyDown={handleKeyDown}
                      onFocus={() => setInputFocused(true)}
                      onBlur={() => setInputFocused(false)}
                      placeholder="Ask a follow-up question…"
                      className="min-h-[44px] flex-1 bg-transparent font-sans text-[14px] font-light text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
                    />
                    <button
                      onClick={handleAskAgain}
                      disabled={!newQuery.trim()}
                      aria-label="Ask"
                      className={sendButtonClass}
                    >
                      <ArrowUp size={17} aria-hidden="true" />
                    </button>
                  </div>

                  <div className="mt-6 border-t border-border/30 pt-5">
                    <p className={`${labelClass} mb-3`}>Suggested follow-ups</p>
                    <div className="flex flex-wrap gap-2">
                      {followUpPrompts.map((p) => (
                        <button
                          key={p}
                          onClick={() => handleSuggestion(p)}
                          className={`${chipClass} ${tone.accentBorderHover}`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* ── Continue your journey ── */}
              <section>
                <div className="mb-3 flex items-center gap-3">
                  <span className={labelClass}>Continue your journey</span>
                  <span className="h-px flex-1 bg-border/25" />
                </div>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                  {tailLinks.map((l) => (
                    <Link
                      key={`${l.href}:${l.label}`}
                      to={l.href}
                      className={`group rounded-[16px] border border-border/40 bg-card px-4 py-4 transition-colors ${tone.accentBorderHover}`}
                    >
                      <div className="mb-2 flex items-start justify-between">
                        <span className={`flex h-8 w-8 items-center justify-center rounded-full ${tone.accentBgSoft}`}>
                          <l.icon size={14} className={tone.accentText} />
                        </span>
                        <ArrowUpRight size={13} className="text-border transition-transform group-hover:-translate-y-0.5" />
                      </div>
                      <p className="font-serif text-[14.5px] text-foreground">{l.label}</p>
                      <p className="font-sans text-[11.5px] font-light leading-relaxed text-muted-foreground">{l.desc}</p>
                    </Link>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AskPage;

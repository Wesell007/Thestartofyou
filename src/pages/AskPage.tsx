import { useEffect, useState, useRef } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Loader2, Search, ChevronRight, Heart, BookOpen, Compass, Sparkles, Shield } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAISearch } from "@/hooks/useAISearch";

const followUpPrompts = [
  "Can you explain that more?",
  "Is this still normal?",
  "What should I do next?",
];

const relatedLinks = [
  { label: "Pregnancy hub", href: "/pregnancy", icon: Heart, desc: "Week-by-week guidance" },
  { label: "Support hub", href: "/support", icon: BookOpen, desc: "Emotional & practical help" },
  { label: "Explore guidance", href: "/explore", icon: Compass, desc: "Find what you need" },
];

const AskPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const context = searchParams.get("ctx") || undefined;
  const { answer, isLoading, error, ask, reset } = useAISearch();
  const lastQueryRef = useRef("");
  const navigate = useNavigate();

  const [newQuery, setNewQuery] = useState("");
  const [inputFocused, setInputFocused] = useState(false);

  useEffect(() => {
    if (query && query !== lastQueryRef.current) {
      lastQueryRef.current = query;
      reset();
      ask(query, context);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [query, context, ask, reset]);

  const handleAskAgain = () => {
    if (!newQuery.trim()) return;
    const params = new URLSearchParams({ q: newQuery.trim() });
    if (context) params.set("ctx", context);
    setNewQuery("");
    navigate(`/ask?${params.toString()}`);
  };

  const handleSuggestion = (s: string) => {
    const params = new URLSearchParams({ q: s });
    if (context) params.set("ctx", context);
    navigate(`/ask?${params.toString()}`);
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

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />

      <main className="pt-20 pb-24 md:pt-28 md:pb-32">

        {/* ── Top frame: question context ── */}
        <div className="container mx-auto px-6 md:px-10 max-w-3xl">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 font-sans text-[11px] font-light tracking-wide text-muted-foreground mb-12 uppercase">
            <Link to="/explore" className="hover:text-foreground transition-colors">
              Explore
            </Link>
            <ChevronRight size={10} className="text-border" />
            <span className="text-foreground/60">Your question</span>
          </nav>

          {/* Stage context chip */}
          {context && (
            <div className="mb-4">
              <span className="inline-flex items-center gap-1.5 bg-sage-bg/60 text-sage font-sans text-[10px] font-medium tracking-widest uppercase px-3 py-1 rounded-full">
                <span className="w-1 h-1 rounded-full bg-sage" />
                {context}
              </span>
            </div>
          )}

          {/* Question title — editorial */}
          <div className="mb-6">
            <h1 className="font-serif text-[1.75rem] sm:text-[2.1rem] md:text-[2.5rem] text-foreground leading-[1.12] tracking-[-0.01em]">
              {query}
            </h1>
          </div>

          {/* Trust bar */}
          <div className="flex items-center gap-4 mb-14 pb-8 border-b border-border/30">
            <div className="flex items-center gap-1.5 text-sage-muted">
              <Shield size={13} />
              <span className="font-sans text-[11px] font-light">Medically reviewed</span>
            </div>
            <div className="w-px h-3 bg-border/40" />
            <span className="font-sans text-[11px] font-light text-muted-foreground/60">
              AI-guided answer
            </span>
          </div>
        </div>

        {/* ── Loading state ── */}
        {isLoading && !answer && (
          <div className="container mx-auto px-6 md:px-10 max-w-3xl">
            <div className="relative rounded-3xl overflow-hidden">
              {/* Ambient glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-sage-bg/40 via-transparent to-lavender-bg/20 pointer-events-none" />
              <div className="relative bg-card/80 backdrop-blur-sm border border-border/30 rounded-3xl px-10 py-16 md:px-14 md:py-20">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-sage-bg/60 flex items-center justify-center">
                    <Loader2 size={18} className="animate-spin text-sage" />
                  </div>
                  <div>
                    <p className="font-serif text-lg text-foreground mb-1">Finding your answer</p>
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
          <div className="container mx-auto px-6 md:px-10 max-w-3xl">
            <div className="bg-card border border-destructive/20 rounded-2xl p-8">
              <p className="font-sans text-sm font-light text-destructive">{error}</p>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════
            QUICK ANSWER — the hero moment
            ══════════════════════════════════════════════════ */}
        {parsed?.quickAnswer && (
          <div className="container mx-auto px-6 md:px-10 max-w-3xl mb-16">
            <div className="relative rounded-3xl overflow-hidden">
              {/* Layered background */}
              <div className="absolute inset-0 bg-gradient-to-br from-sage-bg/50 via-card to-lavender-bg/15 pointer-events-none" />
              <div className="absolute top-0 right-0 w-40 h-40 bg-sage/[0.04] rounded-bl-[6rem] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-lavender/[0.04] rounded-tr-[5rem] pointer-events-none" />

              <div className="relative border border-sage/15 rounded-3xl px-8 py-10 md:px-12 md:py-14">
                {/* Label */}
                <div className="flex items-center gap-3 mb-7">
                  <div className="w-8 h-8 rounded-full bg-sage/10 flex items-center justify-center">
                    <Sparkles size={14} className="text-sage" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-[11px] font-medium tracking-widest uppercase text-sage">
                      Quick Answer
                    </span>
                    <span className="h-px w-12 bg-sage/25" />
                  </div>
                </div>

                {/* Answer text — larger, more dominant */}
                <p className="font-serif text-lg md:text-xl text-foreground leading-[1.6] max-w-2xl">
                  <span className="font-medium">{parsed.quickAnswer.split(" ").slice(0, 8).join(" ")}</span>
                  {" "}{parsed.quickAnswer.split(" ").slice(8).join(" ")}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════
            STRUCTURED ANSWER BODY
            ══════════════════════════════════════════════════ */}
        {parsed?.rest && (
          <div className="container mx-auto px-6 md:px-10 max-w-3xl mb-8">
            <div className="prose prose-sm max-w-none font-sans font-light text-foreground leading-relaxed
              prose-headings:font-serif prose-headings:text-foreground prose-headings:leading-tight
              prose-h2:text-[1.35rem] prose-h2:mb-5 prose-h2:mt-14 prose-h2:pt-10 prose-h2:border-t prose-h2:border-border/25
              prose-h3:text-base prose-h3:mt-10 prose-h3:mb-3 prose-h3:font-medium
              prose-p:text-[14.5px] prose-p:font-light prose-p:leading-[1.85] prose-p:text-muted-foreground prose-p:mb-5
              prose-strong:text-foreground prose-strong:font-medium
              prose-li:text-[14.5px] prose-li:text-muted-foreground prose-li:leading-[1.85] prose-li:mb-1
              prose-ul:my-5 prose-ol:my-5
              [&_blockquote]:relative [&_blockquote]:bg-sage-bg/20 [&_blockquote]:border-l-2 [&_blockquote]:border-sage/30
              [&_blockquote]:rounded-r-2xl [&_blockquote]:px-7 [&_blockquote]:py-6 [&_blockquote]:my-10
              [&_blockquote]:not-italic
              [&_blockquote_p]:text-foreground [&_blockquote_p]:font-serif [&_blockquote_p]:text-[15px] [&_blockquote_p]:leading-relaxed [&_blockquote_p]:mb-0
            ">
              <ReactMarkdown>{parsed.rest}</ReactMarkdown>
            </div>
          </div>
        )}

        {/* Streaming indicator */}
        {isLoading && answer && (
          <div className="container mx-auto px-6 md:px-10 max-w-3xl">
            <div className="flex items-center gap-2.5 mt-2 mb-8">
              <Loader2 size={13} className="animate-spin text-sage" />
              <span className="font-sans text-[11px] font-light text-sage-muted tracking-wide">Still writing…</span>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════
            POST-ANSWER SECTIONS (only when done)
            ══════════════════════════════════════════════════ */}
        {isDone && (
          <>
            {/* ── Medical trust ── */}
            <div className="container mx-auto px-6 md:px-10 max-w-3xl">
              <div className="flex items-center gap-3 pt-8 pb-4 border-t border-border/20">
                <Shield size={13} className="text-sage/60" />
                <p className="font-sans text-[11px] font-light text-sage-muted tracking-wide">
                  ✔ Medically reviewed by Jenny Joines
                </p>
              </div>
            </div>

            {/* ── Reassurance — emotionally designed ── */}
            <div className="mt-12 mb-16">
              <div className="relative bg-gradient-to-b from-sage-bg/15 via-parchment to-parchment">
                <div className="container mx-auto px-6 md:px-10 max-w-3xl py-14 md:py-20">
                  <div className="max-w-lg mx-auto text-center">
                    {/* Decorative flanking lines */}
                    <div className="flex items-center justify-center gap-4 mb-6">
                      <span className="h-px w-10 bg-terracotta/20" />
                      <span className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-terracotta/70">
                        A small reminder
                      </span>
                      <span className="h-px w-10 bg-terracotta/20" />
                    </div>

                    <p className="font-serif text-xl md:text-[1.4rem] text-foreground leading-[1.5] mb-4">
                      Whatever you're going through, it's okay to ask.
                    </p>
                    <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed max-w-md mx-auto">
                      You're doing the right thing by looking for answers — and you don't need to have it all figured out. Trust yourself.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Follow-up prompts ── */}
            <div className="container mx-auto px-6 md:px-10 max-w-3xl mb-16">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground/60">
                  Keep exploring
                </span>
                <span className="h-px flex-1 bg-border/25" />
              </div>
              <div className="flex flex-wrap gap-2.5">
                {followUpPrompts.map((p) => (
                  <button
                    key={p}
                    onClick={() => handleSuggestion(p)}
                    className="group inline-flex items-center gap-2.5 font-sans text-[13px] font-light text-muted-foreground 
                      bg-card/60 border border-border/40 rounded-full px-5 py-3 
                      hover:border-sage/30 hover:text-foreground hover:bg-card hover:shadow-soft 
                      transition-all duration-300"
                  >
                    {p}
                    <ChevronRight size={11} className="text-border group-hover:text-sage transition-colors" />
                  </button>
                ))}
              </div>
            </div>

            {/* ── Continue your journey ── */}
            <div className="container mx-auto px-6 md:px-10 max-w-3xl mb-20">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground/60">
                  Continue your journey
                </span>
                <span className="h-px flex-1 bg-border/25" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedLinks.map((l) => (
                  <Link
                    key={l.href}
                    to={l.href}
                    className="group relative bg-card/70 backdrop-blur-sm border border-border/30 rounded-2xl px-6 py-6 
                      hover:border-sage/25 hover:shadow-soft hover:bg-card transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-16 h-16 bg-sage-bg/20 rounded-bl-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <l.icon size={16} className="text-sage/70 mb-3.5" />
                    <p className="font-sans text-[13px] font-medium text-foreground mb-1">{l.label}</p>
                    <p className="font-sans text-[11px] font-light text-muted-foreground">{l.desc}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* ══════════════════════════════════════════════════
                ASK AGAIN — premium continuation module
                ══════════════════════════════════════════════════ */}
            <div className="relative">
              {/* Full-width background wash */}
              <div className="absolute inset-0 bg-gradient-to-b from-parchment via-sage-bg/10 to-parchment pointer-events-none" />

              <div className="relative container mx-auto px-6 md:px-10 max-w-3xl py-16 md:py-20">
                {/* Frame corner decoration */}
                <div className="relative bg-card border border-border/30 rounded-3xl px-8 py-12 md:px-12 md:py-14 shadow-elevated overflow-hidden">
                  {/* Subtle corner accents */}
                  <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-sage/10 rounded-tl-3xl pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-sage/10 rounded-br-3xl pointer-events-none" />

                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-sage-bg/50 mb-5">
                      <Search size={16} className="text-sage" />
                    </div>
                    <h2 className="font-serif text-xl md:text-2xl text-foreground mb-2">Ask Something Else</h2>
                    <p className="font-sans text-xs font-light text-muted-foreground max-w-sm mx-auto">
                      Still have questions? Keep going — we're here for every part of the journey.
                    </p>
                  </div>

                  {/* Input */}
                  <div
                    className={`relative bg-parchment border rounded-2xl px-5 py-4 md:px-6 md:py-5 flex items-center gap-4 transition-all duration-300 ${
                      inputFocused 
                        ? "border-sage/40 shadow-soft ring-1 ring-sage/10" 
                        : "border-border/40"
                    }`}
                  >
                    <Search size={16} className="text-sage-muted/60 shrink-0" />
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
                  <div className="flex flex-wrap gap-2 mt-5 justify-center">
                    {["Is it normal?", "What should I expect?", "I'm not sure what I'm feeling"].map((s) => (
                      <button
                        key={s}
                        onClick={() => handleSuggestion(s)}
                        className="font-sans text-[11px] font-light text-muted-foreground/70 border border-border/30 rounded-full px-4 py-2 
                          hover:border-sage/30 hover:text-foreground hover:bg-parchment transition-all duration-200"
                      >
                        {s}
                      </button>
                    ))}
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

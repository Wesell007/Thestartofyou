import { useEffect, useState, useRef } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Loader2, Search, ChevronRight, Heart, BookOpen, Compass } from "lucide-react";
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

  // Ask-again state
  const [newQuery, setNewQuery] = useState("");
  const [inputFocused, setInputFocused] = useState(false);

  // Trigger search when query param changes
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

  // Parse the markdown answer into sections for structured display
  const parseAnswer = (md: string) => {
    // Extract the first paragraph as the quick answer
    const lines = md.split("\n").filter(l => l.trim());
    let quickAnswer = "";
    let rest = md;

    // Find the first meaningful paragraph (not a heading)
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

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />

      <main className="pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="container mx-auto px-6 md:px-10 max-w-3xl">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 font-sans text-xs font-light text-muted-foreground mb-8">
            <Link to="/explore" className="hover:text-foreground transition-colors">
              Your Question
            </Link>
            <ChevronRight size={12} className="text-border" />
            <Link to="/explore" className="hover:text-foreground transition-colors inline-flex items-center gap-1.5">
              <ArrowLeft size={12} />
              Back to Explore
            </Link>
          </nav>

          {/* Question header */}
          <div className="mb-10">
            <p className="stage-label mb-3">Your question</p>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-[2.2rem] text-foreground leading-[1.15]">
              {query}
            </h1>
            {context && (
              <p className="font-sans text-xs font-light text-sage-muted mt-3 tracking-wide">
                {context}
              </p>
            )}
          </div>

          {/* Loading state */}
          {isLoading && !answer && (
            <div className="card-elevated rounded-2xl p-10 md:p-14 mb-10">
              <div className="flex items-center gap-3 text-sage-muted">
                <Loader2 size={18} className="animate-spin" />
                <p className="font-sans text-sm font-light">
                  Finding the best answer for you…
                </p>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="card-elevated rounded-2xl p-8 mb-10">
              <p className="font-sans text-sm font-light text-destructive">
                {error}
              </p>
            </div>
          )}

          {/* Quick Answer — hero card */}
          {parsed?.quickAnswer && (
            <div className="relative bg-card border border-border/40 rounded-2xl p-8 md:p-10 mb-8 shadow-elevated overflow-hidden">
              {/* Subtle corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-sage-bg/30 rounded-bl-[4rem] pointer-events-none" />
              
              <div className="relative z-10">
                <span className="inline-flex items-center gap-1.5 bg-sage-bg text-sage font-sans text-[11px] font-medium tracking-wide uppercase px-3 py-1.5 rounded-full mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                  Quick Answer
                </span>
                <p className="font-sans text-[15px] font-light text-foreground leading-relaxed max-w-2xl">
                  <span className="font-medium">{parsed.quickAnswer.split(" ").slice(0, 6).join(" ")}</span>
                  {" "}{parsed.quickAnswer.split(" ").slice(6).join(" ")}
                </p>
              </div>
            </div>
          )}

          {/* Structured answer body */}
          {parsed?.rest && (
            <div className="space-y-0">
              <div className="prose prose-sm max-w-none font-sans font-light text-foreground leading-relaxed
                prose-headings:font-serif prose-headings:text-foreground prose-headings:leading-tight
                prose-h2:text-xl prose-h2:mb-4 prose-h2:mt-10 prose-h2:pt-8 prose-h2:border-t prose-h2:border-border/30
                prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-[14px] prose-p:font-light prose-p:leading-[1.8] prose-p:text-muted-foreground
                prose-strong:text-foreground prose-strong:font-medium
                prose-li:text-[14px] prose-li:text-muted-foreground prose-li:leading-[1.8]
                prose-ul:my-4 prose-ol:my-4
                [&_blockquote]:bg-sage-bg/30 [&_blockquote]:border-l-2 [&_blockquote]:border-sage/40
                [&_blockquote]:rounded-r-xl [&_blockquote]:px-6 [&_blockquote]:py-5 [&_blockquote]:my-8
                [&_blockquote]:not-italic
                [&_blockquote_p]:text-foreground [&_blockquote_p]:font-serif [&_blockquote_p]:text-[15px] [&_blockquote_p]:leading-relaxed
              ">
                <ReactMarkdown>{parsed.rest}</ReactMarkdown>
              </div>
            </div>
          )}

          {/* Still streaming indicator */}
          {isLoading && answer && (
            <div className="flex items-center gap-2 mt-6 text-sage-muted">
              <Loader2 size={14} className="animate-spin" />
              <span className="font-sans text-xs font-light">Still writing…</span>
            </div>
          )}

          {/* Medical trust signal */}
          {answer && !isLoading && (
            <div className="mt-10 pt-6 border-t border-border/30">
              <p className="font-sans text-xs font-light text-sage-muted">
                ✔ Medically reviewed by Jenny Joines
              </p>
            </div>
          )}

          {/* Reassurance card */}
          {answer && !isLoading && (
            <div className="mt-10 bg-sage-bg/25 border border-sage/15 rounded-2xl px-8 py-7">
              <p className="font-serif text-base text-terracotta mb-2">A small reminder</p>
              <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                Whatever you're going through, it's okay to ask. You're doing the right thing by looking for answers — and you don't need to have it all figured out.
              </p>
            </div>
          )}

          {/* Follow-up prompts */}
          {answer && !isLoading && (
            <div className="mt-14">
              <h2 className="font-serif text-xl text-foreground mb-5">Need more help?</h2>
              <div className="flex flex-wrap gap-2.5">
                {followUpPrompts.map((p) => (
                  <button
                    key={p}
                    onClick={() => handleSuggestion(p)}
                    className="inline-flex items-center gap-2 font-sans text-[13px] font-light text-muted-foreground border border-border/50 rounded-full px-5 py-2.5 hover:border-sage/40 hover:text-foreground hover:bg-card/80 transition-all duration-200 bg-transparent group"
                  >
                    {p}
                    <ChevronRight size={12} className="text-border group-hover:text-sage transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Continue your journey */}
          {answer && !isLoading && (
            <div className="mt-16">
              <div className="section-divider mb-8" />
              <p className="stage-label mb-5">Continue your journey</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedLinks.map((l) => (
                  <Link
                    key={l.href}
                    to={l.href}
                    className="group bg-card border border-border/40 rounded-2xl px-5 py-5 hover:border-sage/30 hover:shadow-soft transition-all duration-300"
                  >
                    <l.icon size={18} className="text-sage mb-3" />
                    <p className="font-sans text-sm font-medium text-foreground mb-1">{l.label}</p>
                    <p className="font-sans text-xs font-light text-muted-foreground">{l.desc}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Ask something else — premium module */}
          {answer && !isLoading && (
            <div className="mt-16">
              <div className="section-divider mb-10" />
              <div className="bg-card border border-border/40 rounded-2xl px-8 py-10 shadow-card-brand">
                <h2 className="font-serif text-xl text-foreground mb-2 text-center">Ask Something Else</h2>
                <p className="font-sans text-xs font-light text-muted-foreground text-center mb-6">
                  Still have questions? Keep going — we're here.
                </p>

                {/* Search input */}
                <div
                  className={`relative bg-parchment border ${
                    inputFocused ? "border-sage/50 shadow-soft" : "border-border/50"
                  } rounded-xl px-5 py-4 flex items-center gap-4 transition-all duration-300`}
                >
                  <Search size={18} className="text-sage-muted shrink-0" />
                  <input
                    type="text"
                    value={newQuery}
                    onChange={(e) => setNewQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                    placeholder="Ask another question here…"
                    className="flex-1 bg-transparent font-sans text-sm font-light text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                  />
                  <button
                    onClick={handleAskAgain}
                    className="bg-terracotta text-terracotta-foreground rounded-full px-5 py-2.5 font-sans text-[13px] font-medium shadow-cta hover:bg-terracotta-hover transition-all duration-300 shrink-0"
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
                      className="font-sans text-xs font-light text-muted-foreground border border-border/50 rounded-full px-4 py-2 hover:border-sage/40 hover:text-foreground hover:bg-parchment transition-all duration-200"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AskPage;

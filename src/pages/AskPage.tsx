import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, MessageCircle, Loader2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AISearchBar from "@/components/shared/AISearchBar";
import { useAISearch } from "@/hooks/useAISearch";

const followUpPrompts = [
  "Can you explain that more?",
  "Is this still normal?",
  "What should I do next?",
];

const relatedLinks = [
  { label: "Pregnancy hub", href: "/pregnancy" },
  { label: "Support hub", href: "/support" },
  { label: "Explore guidance", href: "/explore" },
];

const AskPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const context = searchParams.get("ctx") || undefined;
  const { answer, isLoading, error, ask } = useAISearch();
  const [hasAsked, setHasAsked] = useState(false);

  useEffect(() => {
    if (query && !hasAsked) {
      ask(query, context);
      setHasAsked(true);
    }
  }, [query, context, ask, hasAsked]);

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />

      <main className="pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="container mx-auto px-6 md:px-10 max-w-3xl">
          {/* Back link */}
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 font-sans text-xs font-light text-muted-foreground hover:text-foreground transition-colors mb-10"
          >
            <ArrowLeft size={14} />
            Back to Explore
          </Link>

          {/* User's question */}
          <div className="mb-10">
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-3">
              Your question
            </p>
            <h1 className="font-serif text-2xl sm:text-3xl text-foreground leading-snug">
              {query}
            </h1>
          </div>

          {/* AI Answer */}
          <div className="bg-card border border-border/50 rounded-lg p-8 md:p-12 shadow-card-brand mb-10">
            {isLoading && !answer && (
              <div className="flex items-center gap-3 text-sage-muted">
                <Loader2 size={18} className="animate-spin" />
                <p className="font-sans text-sm font-light">
                  Finding the best answer for you…
                </p>
              </div>
            )}

            {error && (
              <p className="font-sans text-sm font-light text-destructive">
                {error}
              </p>
            )}

            {answer && (
              <div className="prose prose-sm max-w-none font-sans font-light text-foreground leading-relaxed
                prose-headings:font-serif prose-headings:text-foreground prose-headings:leading-tight
                prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-0
                prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-sm prose-p:font-light prose-p:leading-relaxed prose-p:text-muted-foreground
                prose-strong:text-foreground prose-strong:font-medium
              ">
                <ReactMarkdown>{answer}</ReactMarkdown>
              </div>
            )}

            {answer && !isLoading && (
              <p className="mt-8 pt-6 border-t border-border/40 font-sans text-xs font-light text-sage-muted">
                ✔ Medically reviewed by Jenny Joines
              </p>
            )}
          </div>

          {/* Follow-up prompts */}
          {answer && !isLoading && (
            <div className="mb-16">
              <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-4">
                Follow up
              </p>
              <div className="flex flex-wrap gap-2">
                {followUpPrompts.map((p) => (
                  <Link
                    key={p}
                    to={`/ask?q=${encodeURIComponent(p)}${context ? `&ctx=${encodeURIComponent(context)}` : ""}`}
                    className="font-sans text-xs font-light text-muted-foreground border border-border rounded-pill px-4 py-2 hover:border-sage hover:text-foreground transition-all bg-card"
                  >
                    {p}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related guidance */}
          {answer && !isLoading && (
            <div className="mb-16">
              <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-4">
                Related guidance
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedLinks.map((l) => (
                  <Link
                    key={l.href}
                    to={l.href}
                    className="bg-card border border-border/50 rounded-lg px-5 py-4 font-sans text-sm font-light text-foreground hover:border-sage/40 hover:shadow-soft transition-all text-center"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Ask another */}
          {answer && !isLoading && (
            <div>
              <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-4 text-center">
                Ask something else
              </p>
              <AISearchBar
                placeholder="What else is on your mind?"
                suggestions={["Is this normal?", "What should I expect?", "I'm not sure what I'm feeling"]}
                context={context}
              />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AskPage;

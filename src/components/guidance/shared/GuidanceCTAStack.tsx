// ─── Guidance CTA Stack ─────────────────────────────────────────────────
// Strict 3-tier hierarchy: AI (Tier 3) → Stage Links (Tier 2) → Journey CTA (Tier 1)
// Reused across all guidance page families.

import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import AISearchBar from "@/components/shared/AISearchBar";
import type { StageLink, JourneyCTA, AIConfig } from "@/data/guidance/types";

interface Props {
  ai: AIConfig;
  stageLinks: StageLink[];
  journeyCTA: JourneyCTA;
  nextBestRoute?: StageLink;
}

const GuidanceCTAStack = ({ ai, stageLinks, journeyCTA, nextBestRoute }: Props) => {
  const visibleLinks = stageLinks.slice(0, 3);

  return (
    <>
      {/* ── Tier 3: AI Support (contained, tertiary) ── */}
      <section className="bg-parchment-dark py-14 md:py-18">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-2xl text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MessageCircle size={14} className="text-sage-muted" />
            <p className="font-sans text-[10px] font-light tracking-[0.2em] uppercase text-sage-muted">
              Ask anything
            </p>
          </div>
          <p className="font-sans text-sm font-light text-muted-foreground mb-6">
            If something still feels unclear, you can ask a question and get guidance for your stage.
          </p>
          <AISearchBar
            placeholder="What's on your mind?"
            suggestions={[...ai.prompts]}
            context={ai.context}
          />
        </div>
      </section>

      {/* ── Tier 2: Stage Links (secondary routing) ── */}
      {visibleLinks.length > 0 && (
        <section className="bg-parchment py-12 md:py-16">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-2xl">
            <p className="font-sans text-[10px] font-light tracking-[0.2em] uppercase text-sage-muted text-center mb-6">
              Related stages
            </p>
            <div className="grid gap-3">
              {visibleLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="group flex items-center justify-between bg-card border border-border/40 rounded-xl px-5 py-4 hover:border-sage/30 hover:shadow-soft transition-all duration-200"
                >
                  <div>
                    <p className="font-sans text-sm font-medium text-foreground group-hover:text-sage transition-colors">
                      {link.label}
                    </p>
                    {link.description && (
                      <p className="font-sans text-xs font-light text-muted-foreground mt-0.5">
                        {link.description}
                      </p>
                    )}
                  </div>
                  <ArrowRight size={14} className="text-muted-foreground group-hover:text-sage shrink-0 transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Next-best route (optional, max 1, below stage links) ── */}
      {nextBestRoute && (
        <section className="bg-parchment pb-4">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-2xl">
            <Link
              to={nextBestRoute.href}
              className="group flex items-center justify-between border border-sage/20 bg-sage-bg/30 rounded-xl px-5 py-4 hover:border-sage/40 transition-all duration-200"
            >
              <div>
                <p className="font-sans text-sm font-medium text-foreground">
                  {nextBestRoute.label}
                </p>
                {nextBestRoute.description && (
                  <p className="font-sans text-xs font-light text-muted-foreground mt-0.5">
                    {nextBestRoute.description}
                  </p>
                )}
              </div>
              <ArrowRight size={14} className="text-sage-muted group-hover:text-sage shrink-0 transition-colors" />
            </Link>
          </div>
        </section>
      )}

      {/* ── Tier 1: Journey CTA (dominant, visually largest) ── */}
      <section className="relative bg-parchment-dark py-16 sm:py-20 md:py-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[250px] bg-sage-bg/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-xl relative z-10 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-3">
            Continue your journey
          </h2>
          <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-8">
            {journeyCTA.description}
          </p>
          <Link
            to={journeyCTA.href}
            className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-full px-8 py-4 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all duration-300"
          >
            {journeyCTA.label}
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
};

export default GuidanceCTAStack;

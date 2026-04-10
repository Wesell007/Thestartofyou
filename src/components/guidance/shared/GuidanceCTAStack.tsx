// ─── Guidance CTA Stack ─────────────────────────────────────────────────
// Strict 3-tier hierarchy: AI (Tier 3) → Stage Links (Tier 2) → Journey CTA (Tier 1)

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
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
      {/* ── Tier 3: AI Support ── */}
      <section className="py-8 sm:py-10">
        <div className="container mx-auto px-5 sm:px-6 max-w-xl text-center">
          <p className="stage-label mb-3">Ask anything</p>
          <p className="font-sans text-[13px] font-light text-muted-foreground mb-5">
            If something still feels unclear, you can ask here.
          </p>
          <AISearchBar
            placeholder="What's on your mind?"
            suggestions={[...ai.prompts]}
            context={ai.context}
          />
        </div>
      </section>

      <div className="section-divider" />

      {/* ── Tier 2: Stage Links ── */}
      {visibleLinks.length > 0 && (
        <section className="py-8 sm:py-10">
          <div className="container mx-auto px-5 sm:px-6 max-w-xl">
            <p className="stage-label text-center mb-4">Related stages</p>
            <div className="space-y-1.5">
              {visibleLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="group flex items-center justify-between border border-border/40 rounded-md px-4 py-2.5 hover:border-sage/30 transition-all duration-200"
                >
                  <div>
                    <p className="font-sans text-sm font-light text-foreground group-hover:text-sage transition-colors">
                      {link.label}
                    </p>
                    {link.description && (
                      <p className="font-sans text-[11px] font-light text-muted-foreground/70 mt-0.5">
                        {link.description}
                      </p>
                    )}
                  </div>
                  <ArrowRight size={12} className="text-muted-foreground/30 group-hover:text-sage shrink-0 transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Next-best route (optional, subordinate) ── */}
      {nextBestRoute && (
        <section className="pb-4">
          <div className="container mx-auto px-5 sm:px-6 max-w-xl">
            <Link
              to={nextBestRoute.href}
              className="group flex items-center justify-between border border-border/30 rounded-md px-4 py-2.5 hover:border-sage/25 transition-all duration-200"
            >
              <div>
                <p className="font-sans text-[13px] font-light text-muted-foreground group-hover:text-foreground transition-colors">
                  {nextBestRoute.label}
                </p>
                {nextBestRoute.description && (
                  <p className="font-sans text-[11px] font-light text-muted-foreground/60 mt-0.5">
                    {nextBestRoute.description}
                  </p>
                )}
              </div>
              <ArrowRight size={12} className="text-muted-foreground/25 group-hover:text-sage shrink-0 transition-colors" />
            </Link>
          </div>
        </section>
      )}

      <div className="section-divider" />

      {/* ── Tier 1: Journey CTA (dominant) ── */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-5 sm:px-6 max-w-md text-center">
          <h2 className="font-serif text-lg sm:text-xl text-foreground leading-tight mb-2">
            Continue your journey
          </h2>
          <p className="font-sans text-[13px] font-light text-muted-foreground leading-relaxed mb-6">
            {journeyCTA.description}
          </p>
          <Link
            to={journeyCTA.href}
            className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-full px-7 py-3 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all duration-300"
          >
            {journeyCTA.label}
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </>
  );
};

export default GuidanceCTAStack;

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/**
 * IVF pathway position strip.
 *
 * Lightweight visual cue placed between the Hero and WhatThisCovers
 * on the IVF landing page. Communicates the bridge model:
 *
 *   Trying to conceive  →  IVF (you are here)  →  Pregnancy
 *
 * IVF is neither buried inside TTC nor sealed off as a fourth ecosystem
 * — it is the active treatment pathway between the two.
 */
const IVFPathwayPosition = () => {
  return (
    <section className="bg-parchment-dark py-12 md:py-16">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div
          className="rounded-lg border bg-card px-5 py-6 sm:px-8 sm:py-8 flex flex-col gap-6"
          style={{ borderColor: 'hsl(var(--stage-ivf-accent) / 0.18)' }}
        >
          <div className="max-w-2xl">
            <p className="mb-3 font-sans text-[10px] font-light tracking-[0.22em] uppercase" style={{ color: 'hsl(var(--stage-ivf-accent))' }}>Where IVF sits</p>
            <h2 className="mb-3 font-serif text-2xl text-foreground sm:text-3xl">One treatment pathway, held in context</h2>
            <p className="font-sans text-sm font-light leading-relaxed text-muted-foreground">IVF has its own appointments, medication and decisions. This space keeps those details together while connecting you back to trying to conceive and forward into pregnancy care.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-sans text-[12.5px] font-light">
            <Link
              to="/trying-to-conceive"
              className="text-foreground/55 hover:text-foreground transition-colors"
            >
              Trying to conceive
            </Link>
            <ArrowRight size={12} className="text-foreground/30" />
            <span
              className="rounded-full px-3 py-1 font-medium"
              style={{
                backgroundColor: 'hsl(var(--stage-ivf) / 0.25)',
                color: 'hsl(var(--stage-ivf-accent))',
              }}
            >
              IVF — treatment pathway
            </span>
            <ArrowRight size={12} className="text-foreground/30" />
            <Link
              to="/pregnancy"
              className="text-foreground/55 hover:text-foreground transition-colors"
            >
              Pregnancy
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IVFPathwayPosition;

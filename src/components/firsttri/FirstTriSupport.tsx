import { Leaf, AlertCircle } from "lucide-react";
import botanicalBl from "@/assets/botanical-branch-bl.png";
import botanicalTr from "@/assets/botanical-branch-tr.png";

interface Props {
  normalItems: string[];
  seekSupport: string[];
  disclaimer: string;
}

const FirstTriSupport = ({ normalItems, seekSupport, disclaimer }: Props) => {
  return (
    <section id="support" className="relative bg-parchment section-spacing overflow-hidden">
      {/* Botanical corners */}
      <img
        src={botanicalBl}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 -left-4 w-[140px] md:w-[180px] opacity-25 select-none hidden md:block"
      />
      <img
        src={botanicalTr}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 -right-4 w-[140px] md:w-[180px] opacity-25 select-none hidden md:block"
      />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-14 max-w-2xl mx-auto">
          <p className="stage-label mb-3">Reassurance</p>
          <h2 className="font-serif text-[2rem] sm:text-[2.25rem] md:text-[2.6rem] text-foreground leading-[1.1] mb-4">
            What&rsquo;s normal, and when to seek support
          </h2>
          <p className="font-sans text-[15px] sm:text-[16px] text-foreground/72 leading-relaxed">
            One of the most common questions in pregnancy. Here&rsquo;s what tends
            to be part of this stage, and what&rsquo;s worth checking on.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Often part of this stage */}
          <article className="rounded-3xl p-7 md:p-9 bg-sage-bg/40 border border-sage/15 shadow-card-brand">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-card text-sage border border-sage/20">
                <Leaf size={16} strokeWidth={1.5} />
              </span>
              <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-sage">
                Often part of this stage
              </p>
            </div>
            <ul className="space-y-3">
              {normalItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-sage shrink-0" />
                  <span className="font-sans text-[15px] text-foreground/85 leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 pt-5 border-t border-sage/15 font-serif italic text-[14.5px] text-sage leading-relaxed">
              These can ebb and flow. None of them, on their own, signal that
              something is wrong.
            </p>
          </article>

          {/* When to seek support */}
          <article className="rounded-3xl p-7 md:p-9 bg-terracotta/5 border border-terracotta/15 shadow-card-brand">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-card text-terracotta border border-terracotta/20">
                <AlertCircle size={16} strokeWidth={1.5} />
              </span>
              <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-terracotta">
                When to seek support
              </p>
            </div>
            <ul className="space-y-3">
              {seekSupport.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-terracotta shrink-0" />
                  <span className="font-sans text-[15px] text-foreground/85 leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 pt-5 border-t border-terracotta/15 font-sans text-[14px] font-medium text-terracotta leading-relaxed">
              If something feels wrong, trust yourself. Contact your midwife
              or GP.
            </p>
          </article>
        </div>

        <p className="mt-8 font-sans text-[12.5px] text-foreground/60 text-center max-w-2xl mx-auto leading-relaxed">
          {disclaimer}
        </p>
      </div>
    </section>
  );
};

export default FirstTriSupport;

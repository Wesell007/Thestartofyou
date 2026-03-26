import { useState, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DueDateCalculatorForm from "@/components/shared/DueDateCalculatorForm";
import DueDateCalculatorResult from "@/components/shared/DueDateCalculatorResult";

const DueDateCalculator = () => {
  const [lmp, setLmp] = useState<Date | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleResult = (lmpDate: Date) => {
    setLmp(lmpDate);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  };

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">Tools</p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-foreground leading-tight mb-6 animate-fade-up">
            Pregnancy due date <span className="italic">calculator</span>
          </h1>
          <p className="font-sans text-base font-light text-muted-foreground leading-relaxed max-w-xl mx-auto animate-fade-up [animation-delay:0.1s]">
            Find your due date and understand what stage you're in — with guidance tailored to you.
          </p>
        </div>
      </section>

      {/* ── Calculator input ─────────────────────────────────────────────── */}
      <section className="pb-20 md:pb-24">
        <div className="container mx-auto px-6 md:px-10 max-w-xl">
          <div className="bg-card border border-border/60 rounded-2xl p-8 md:p-10 shadow-card-brand">
            <DueDateCalculatorForm onResult={handleResult} />
          </div>
        </div>
      </section>

      {/* ── Results ──────────────────────────────────────────────────────── */}
      {lmp ? (
        <div ref={resultsRef}>
          <DueDateCalculatorResult lmp={lmp} />
        </div>
      ) : (
        <section className="pb-32">
          <div className="container mx-auto px-6 md:px-10 max-w-xl text-center">
            <p className="font-sans text-sm font-light text-muted-foreground/60 leading-relaxed">
              Select your method and enter a date above to see your results.
            </p>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default DueDateCalculator;

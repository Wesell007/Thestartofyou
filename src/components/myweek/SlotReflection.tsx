import { useEffect, useRef, useState } from "react";
import type { MyWeekEntry } from "@/data/myWeekContent";

interface Props {
  content: MyWeekEntry;
}

const SlotReflection = ({ content }: Props) => {
  const [value, setValue] = useState("");
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [showSaved, setShowSaved] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Debounced autosave (mock — local only for now)
  useEffect(() => {
    if (!value) return;
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setSavedAt(Date.now());
      setShowSaved(true);
      window.setTimeout(() => setShowSaved(false), 1800);
    }, 800);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [value]);

  return (
    <section
      className="relative py-16 sm:py-20 md:py-28 border-t border-border/30"
    >
      {/* Soft botanical wash — the section itself feels held */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[-40px] sm:inset-x-[-80px] inset-y-0 -z-10 rounded-[40px]"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 30%, hsl(var(--stage-pregnancy) / 0.22), transparent 70%)",
        }}
      />

      <p
        className="font-sans text-[11px] font-light tracking-[0.22em] uppercase mb-6 sm:mb-7"
        style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
      >
        A moment for you
      </p>

      <h2 className="font-serif text-[1.5rem] sm:text-[1.75rem] md:text-[2rem] text-foreground leading-[1.2] mb-3 sm:mb-4 max-w-[26ch]">
        {content.reflection.prompt}
      </h2>

      <p className="font-sans text-[14px] sm:text-[14.5px] font-light italic text-foreground/55 leading-relaxed mb-8 sm:mb-10 max-w-[40ch]">
        {content.reflection.context}
      </p>

      {/* The reflection field — left-ruled, parchment-warm, journal-like */}
      <div className="relative pl-6 sm:pl-8">
        {/* Vertical pregnancy-accent rule — the "held" mark */}
        <span
          aria-hidden="true"
          className="absolute left-0 top-2 bottom-12 w-[2px] rounded-full"
          style={{
            background:
              "linear-gradient(to bottom, hsl(var(--stage-pregnancy-accent) / 0.55), hsl(var(--stage-pregnancy-accent) / 0.05))",
          }}
        />

        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={7}
          placeholder="Begin where you are."
          aria-label="Your weekly reflection"
          className="w-full bg-transparent border-0 px-0 py-2 font-serif text-[17px] sm:text-[18.5px] italic font-normal text-foreground placeholder:text-foreground/25 placeholder:italic resize-none focus:outline-none leading-[1.85] min-h-[200px] caret-[hsl(var(--stage-pregnancy-accent))]"
        />

        <div className="flex items-center justify-between pt-3 border-t border-[hsl(var(--stage-pregnancy-accent)/0.18)]">
          <span
            className={`font-sans text-[11px] font-light tracking-[0.12em] uppercase transition-opacity duration-500 ${
              showSaved ? "opacity-100" : "opacity-0"
            }`}
            style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
          >
            Saved
          </span>
          <span className="font-sans text-[11px] font-light text-foreground/35 tracking-wide italic">
            {savedAt ? "Held privately" : "Autosaves as you write · only you"}
          </span>
        </div>
      </div>
    </section>
  );
};

export default SlotReflection;

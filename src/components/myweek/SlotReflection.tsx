import { useEffect, useRef, useState } from "react";
import type { WeekData } from "@/data/weekData";

interface Props {
  data: WeekData;
}

const SlotReflection = ({ data }: Props) => {
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
    <section className="py-14 sm:py-20 md:py-24 bg-parchment-dark/60">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-2xl">
        <p
          className="font-sans text-[11px] font-light tracking-[0.22em] uppercase mb-5 sm:mb-6"
          style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
        >
          A moment for you
        </p>

        <h2 className="font-serif text-[1.4rem] sm:text-[1.6rem] md:text-[1.85rem] text-foreground leading-snug mb-3 sm:mb-4 max-w-lg">
          {data.reflectionPrompt}
        </h2>

        <p className="font-sans text-[14px] font-light text-muted-foreground/80 leading-relaxed mb-7 sm:mb-8 max-w-md">
          {data.reflectionContext}
        </p>

        <div
          className="relative rounded-2xl border bg-card/80 backdrop-blur-sm transition-all focus-within:shadow-card focus-within:border-[hsl(var(--stage-pregnancy-accent)/0.35)]"
          style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.18)" }}
        >
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={6}
            placeholder="Write whatever comes to mind. This stays with you."
            aria-label="Your weekly reflection"
            className="w-full bg-transparent rounded-2xl px-5 sm:px-7 py-5 sm:py-7 font-serif text-[16px] sm:text-[17px] italic font-normal text-foreground placeholder:text-muted-foreground/35 placeholder:italic resize-none focus:outline-none leading-[1.7] min-h-[180px]"
          />

          <div className="flex items-center justify-between px-5 sm:px-7 pb-4 pt-1">
            <span
              className={`font-sans text-[11px] font-light tracking-wide transition-opacity duration-500 ${
                showSaved ? "opacity-100 text-sage-muted" : "opacity-0"
              }`}
            >
              · Saved
            </span>
            <span className="font-sans text-[11px] font-light text-muted-foreground/40 tracking-wide">
              {savedAt ? "Autosaved" : "Autosaves as you write"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SlotReflection;

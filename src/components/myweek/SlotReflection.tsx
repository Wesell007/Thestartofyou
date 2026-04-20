import { useEffect, useRef, useState } from "react";
import { Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { MyWeekEntry } from "@/data/myWeekContent";

interface Props {
  content: MyWeekEntry;
  userId: string;
  week: number;
}

type SaveState = "idle" | "saving" | "saved" | "error";

const SlotReflection = ({ content, userId, week }: Props) => {
  const [value, setValue] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const initialRef = useRef<string>("");
  const debounceRef = useRef<number | null>(null);

  // Load existing reflection for this week
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("reflections")
        .select("content, updated_at")
        .eq("user_id", userId)
        .eq("week", week)
        .maybeSingle();
      if (cancelled) return;
      const existing = data?.content ?? "";
      setValue(existing);
      initialRef.current = existing;
      if (data?.updated_at) setSavedAt(new Date(data.updated_at));
      setLoaded(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [userId, week]);

  // Debounced autosave (upsert)
  useEffect(() => {
    if (!loaded) return;
    if (value === initialRef.current) return;
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    setSaveState("saving");
    debounceRef.current = window.setTimeout(async () => {
      const { error } = await supabase
        .from("reflections")
        .upsert(
          { user_id: userId, week, content: value },
          { onConflict: "user_id,week" }
        );
      if (error) {
        setSaveState("error");
      } else {
        initialRef.current = value;
        setSavedAt(new Date());
        setSaveState("saved");
        window.setTimeout(() => setSaveState((s) => (s === "saved" ? "idle" : s)), 2200);
      }
    }, 900);
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [value, loaded, userId, week]);

  const statusLabel =
    saveState === "saving"
      ? "Holding…"
      : saveState === "saved"
      ? "Held"
      : saveState === "error"
      ? "Couldn't save"
      : savedAt
      ? "Held privately"
      : "Autosaves as you write · only you";

  return (
    <section className="relative py-18 sm:py-22 md:py-28 border-t border-border/30">
      {/* Soft botanical envelope — the section itself feels held */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[-40px] sm:inset-x-[-80px] inset-y-2 -z-10 rounded-[44px]"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 30%, hsl(var(--stage-pregnancy) / 0.32), transparent 72%)",
        }}
      />

      <div className="flex items-center gap-3 mb-7 sm:mb-8">
        <span
          aria-hidden="true"
          className="block w-6 h-px"
          style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.55)" }}
        />
        <p
          className="font-sans text-[10.5px] sm:text-[11px] font-light tracking-[0.24em] uppercase"
          style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
        >
          A moment for you
        </p>
      </div>

      <h2 className="font-serif text-[1.55rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-[1.18] mb-4 sm:mb-5 max-w-[26ch]">
        {content.reflection.prompt}
      </h2>

      <p className="font-sans text-[14px] sm:text-[14.5px] font-light italic text-foreground/55 leading-relaxed mb-9 sm:mb-10 max-w-[40ch]">
        {content.reflection.context}
      </p>

      {/* Premium writing surface — parchment card, not an app textarea */}
      <div
        className="relative rounded-[28px] border bg-card/80 backdrop-blur-sm shadow-[0_2px_24px_-12px_hsl(var(--stage-pregnancy-accent)/0.18)] transition-shadow focus-within:shadow-[0_8px_40px_-16px_hsl(var(--stage-pregnancy-accent)/0.28)]"
        style={{
          borderColor: "hsl(var(--stage-pregnancy-accent) / 0.18)",
          background:
            "linear-gradient(180deg, hsl(var(--card)) 0%, hsl(var(--stage-pregnancy) / 0.18) 100%)",
        }}
      >
        {/* Privacy seal */}
        <div className="flex items-center gap-2 px-6 sm:px-8 pt-5 sm:pt-6">
          <Lock
            size={11}
            strokeWidth={1.6}
            style={{ color: "hsl(var(--stage-pregnancy-accent) / 0.7)" }}
          />
          <span
            className="font-sans text-[10.5px] font-light tracking-[0.18em] uppercase"
            style={{ color: "hsl(var(--stage-pregnancy-accent) / 0.85)" }}
          >
            Private to you
          </span>
        </div>

        {/* Left rule + textarea */}
        <div className="relative pl-7 sm:pl-9 pr-6 sm:pr-8 pt-4 pb-4">
          <span
            aria-hidden="true"
            className="absolute left-6 sm:left-8 top-4 bottom-16 w-[2px] rounded-full"
            style={{
              background:
                "linear-gradient(to bottom, hsl(var(--stage-pregnancy-accent) / 0.55), hsl(var(--stage-pregnancy-accent) / 0.05))",
            }}
          />
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={!loaded}
            rows={7}
            placeholder="Begin where you are."
            aria-label={`Your reflection for week ${week}`}
            className="w-full bg-transparent border-0 px-0 py-2 font-serif text-[17px] sm:text-[18.5px] italic font-normal text-foreground placeholder:text-foreground/40 placeholder:italic resize-none focus:outline-none leading-[1.85] min-h-[200px] caret-[hsl(var(--stage-pregnancy-accent))]"
          />
        </div>

        {/* Footer — status */}
        <div
          className="flex items-center justify-between px-6 sm:px-8 py-4 border-t"
          style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.16)" }}
        >
          <span
            className={`font-sans text-[10.5px] font-light tracking-[0.18em] uppercase transition-opacity duration-500 ${
              saveState === "saving" || saveState === "saved" ? "opacity-100" : "opacity-0"
            }`}
            style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
          >
            {saveState === "saving" ? "Holding…" : "Held"}
          </span>
          <span className="font-sans text-[11px] font-light text-foreground/45 tracking-wide italic">
            {statusLabel}
          </span>
        </div>
      </div>

      {/* Continuity hint */}
      <p className="font-sans text-[12.5px] font-light text-foreground/40 italic mt-5 sm:mt-6 max-w-[40ch]">
        Each week's reflection is kept on your journey, week by week.
      </p>
    </section>
  );
};

export default SlotReflection;

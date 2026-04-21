import { useEffect, useRef, useState } from "react";
import { Lock, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { MyWeekEntry } from "@/data/myWeekContent";
import SlotReflectionAssistant from "./SlotReflectionAssistant";

interface Props {
  content: MyWeekEntry;
  userId: string;
  week: number;
}

type SaveState = "idle" | "saving" | "saved" | "error";

/**
 * Slot — A moment for you (the reflection ritual).
 *
 * Designed as a heirloom writing surface, not a textarea:
 *   - Embossed seal at the top
 *   - Generous serif italic typography on a parchment field
 *   - A single ruled left margin like a notebook
 *   - Quiet "held" status that breathes in slowly
 *   - Continuity colophon below — the words live on the journey
 */
const SlotReflection = ({ content, userId, week }: Props) => {
  const [value, setValue] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const initialRef = useRef<string>("");
  const debounceRef = useRef<number | null>(null);

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
        window.setTimeout(() => setSaveState((s) => (s === "saved" ? "idle" : s)), 2400);
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
      : "Autosaves as you write";

  return (
    <section className="relative py-20 sm:py-24 md:py-32 border-t border-border/30">
      {/* Atmospheric envelope — the section itself feels held */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[-80px] sm:inset-x-[-140px] inset-y-4 -z-10 rounded-[64px]"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 30%, hsl(var(--stage-pregnancy) / 0.42), transparent 72%)",
        }}
      />

      {/* Section label */}
      <div className="flex items-center gap-3 mb-8 sm:mb-9">
        <span
          aria-hidden="true"
          className="block w-6 h-px"
          style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.55)" }}
        />
        <p
          className="font-sans text-[10.5px] sm:text-[11px] font-medium tracking-[0.26em] uppercase"
          style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
        >
          A moment for you
        </p>
      </div>

      <h2 className="font-serif text-[1.7rem] sm:text-[2rem] md:text-[2.3rem] text-foreground leading-[1.16] mb-4 sm:mb-5 max-w-[26ch]">
        {content.reflection.prompt}
      </h2>

      <p className="font-serif italic text-[15px] sm:text-[16px] text-foreground/55 leading-relaxed mb-10 sm:mb-12 max-w-[40ch]">
        {content.reflection.context}
      </p>

      {/* Heirloom writing surface — keepsake card */}
      <div
        className="relative rounded-[32px] keepsake-surface transition-shadow duration-500 focus-within:shadow-[0_32px_80px_-32px_hsl(var(--stage-pregnancy-accent)/0.32),0_8px_24px_-12px_hsl(222_14%_12%/0.1)]"
      >
        {/* Embossed seal — top centre */}
        <div className="flex flex-col items-center pt-7 sm:pt-8 pb-2">
          <div
            className="flex items-center gap-2 px-4 py-1.5 rounded-full"
            style={{
              background: "hsl(var(--stage-pregnancy) / 0.5)",
              border: "1px solid hsl(var(--stage-pregnancy-accent) / 0.18)",
            }}
          >
            <Lock
              size={10}
              strokeWidth={1.8}
              style={{ color: "hsl(var(--stage-pregnancy-accent) / 0.85)" }}
            />
            <span
              className="font-sans text-[10px] font-medium tracking-[0.22em] uppercase"
              style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
            >
              Private to you
            </span>
          </div>
        </div>

        {/* Writing field with ruled margin */}
        <div className="relative px-8 sm:px-12 pt-4 pb-2">
          <span
            aria-hidden="true"
            className="absolute left-7 sm:left-10 top-2 bottom-14 w-[1.5px] rounded-full"
            style={{
              background:
                "linear-gradient(to bottom, hsl(var(--stage-pregnancy-accent) / 0.6), hsl(var(--stage-pregnancy-accent) / 0.04))",
            }}
          />
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={!loaded}
            rows={8}
            placeholder="Begin where you are."
            aria-label={`Your reflection for week ${week}`}
            className="w-full bg-transparent border-0 pl-5 sm:pl-7 pr-0 py-3 font-serif text-[18px] sm:text-[19.5px] italic font-normal text-foreground placeholder:text-foreground/35 placeholder:italic resize-none focus:outline-none leading-[1.85] min-h-[220px] caret-[hsl(var(--stage-pregnancy-accent))]"
          />
        </div>

        {/* Footer — held status */}
        <div
          className="flex items-center justify-between px-7 sm:px-10 py-5 border-t gap-4"
          style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.16)" }}
        >
          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className={`block w-1.5 h-1.5 rounded-full transition-opacity duration-700 ${
                saveState === "saving" ? "animate-pulse opacity-100" : saveState === "saved" || savedAt ? "opacity-100" : "opacity-30"
              }`}
              style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent))" }}
            />
            <span
              className="font-sans text-[10.5px] font-medium tracking-[0.22em] uppercase"
              style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
            >
              {saveState === "saving" ? "Holding…" : "Held"}
            </span>
          </div>
          <span className="font-serif italic text-[12.5px] text-foreground/45 tracking-wide hidden sm:inline">
            {statusLabel}
          </span>
          {!assistantOpen && (
            <button
              type="button"
              onClick={() => setAssistantOpen(true)}
              className="inline-flex items-center gap-1.5 font-sans text-[11px] font-medium tracking-[0.18em] uppercase transition-opacity hover:opacity-80"
              style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
              aria-label="Open reflection assistant"
            >
              <Sparkles size={11} strokeWidth={1.8} />
              Speak it instead
            </button>
          )}
        </div>
      </div>

      {assistantOpen && (
        <SlotReflectionAssistant
          week={week}
          onAccept={(text) => {
            const next = value.trim().length > 0 ? `${value.trim()}\n\n${text}` : text;
            setValue(next);
            setAssistantOpen(false);
          }}
          onClose={() => setAssistantOpen(false)}
        />
      )}

      {/* Continuity colophon */}
      <p className="font-serif italic text-[13px] sm:text-[13.5px] text-foreground/45 mt-6 sm:mt-7 max-w-[42ch]">
        Each week's reflection is kept on your journey — a record of becoming, week by week.
      </p>
    </section>
  );
};

export default SlotReflection;

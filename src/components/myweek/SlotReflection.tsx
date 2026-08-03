import { useEffect, useRef, useState } from "react";
import { Lock, Mic, MicOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/lib/analytics";
import { EVENTS } from "@/lib/analyticsEvents";
import type { MyWeekEntry } from "@/data/myWeekContent";
import NoteShapingSuggestion from "./NoteShapingSuggestion";
import { useShapingThreshold } from "@/hooks/useShapingThreshold";

interface Props {
  content: MyWeekEntry;
  userId: string;
  week: number;
  onSaved?: () => void;
}

type SaveState = "idle" | "saving" | "saved" | "error";

// Minimal Web Speech API typing
type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((e: unknown) => void) | null;
  onerror: ((e: unknown) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

const getRecognition = (): SpeechRecognitionLike | null => {
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  };
  const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition;
  if (!Ctor) return null;
  const r = new Ctor();
  r.continuous = true;
  r.interimResults = true;
  r.lang = "en-GB";
  return r;
};

/**
 * Slot — A moment for you.
 *
 * Heirloom writing surface with restrained in-note voice and inline shaping.
 * Shaping only offers itself when the threshold is met (see useShapingThreshold).
 * First-written snapshot is captured on first shaping acceptance.
 */
const SlotReflection = ({ content, userId, week, onSaved }: Props) => {
  const [value, setValue] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [hasFirstWritten, setHasFirstWritten] = useState(false);
  const initialRef = useRef<string>("");
  const debounceRef = useRef<number | null>(null);
  const valueRef = useRef("");
  // Last successfully tracked saved content. Seeded on initial hydration so
  // opening an existing reflection does not fire `reflection_saved`.
  const lastTrackedRef = useRef<string>("");

  // Voice
  const [listening, setListening] = useState(false);
  const [voiceMessage, setVoiceMessage] = useState<string | null>(null);
  const [lastInputWasVoice, setLastInputWasVoice] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const baseTextRef = useRef<string>("");
  const speechSupported =
    typeof window !== "undefined" &&
    ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

  // Shaping availability — 40 chars, 8 words, 2s idle
  const threshold = useShapingThreshold(value);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoaded(false);
      setLoadError(null);
      const { data, error } = await supabase
        .from("reflections")
        .select("content, updated_at, first_written_content")
        .eq("user_id", userId)
        .eq("week", week)
        .maybeSingle();
      if (cancelled) return;
      if (error) {
        setLoadError("We couldn't load this reflection. Try again before writing so your saved words stay safe.");
        return;
      }
      const existing = data?.content ?? "";
      setValue(existing);
      valueRef.current = existing;
      initialRef.current = existing;
      // Seed the analytics dedupe ref so initial hydration of an existing
      // reflection does not fire `reflection_saved`.
      lastTrackedRef.current = existing;
      if (data?.updated_at) setSavedAt(new Date(data.updated_at));
      setHasFirstWritten(Boolean(data?.first_written_content));
      setLoaded(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [userId, week, loadAttempt]);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  // Start a final best-effort write when the page is being left. This closes
  // the debounce window without clearing or claiming success in the UI.
  useEffect(() => () => {
    flushLatest();
  // flushLatest intentionally reads refs and is stable for this identity.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, userId, week]);

  const flushLatest = () => {
    const latest = valueRef.current;
    if (!loaded || latest === initialRef.current) return;
    void supabase.from("reflections").upsert(
      { user_id: userId, week, content: latest },
      { onConflict: "user_id,week" },
    );
  };

  useEffect(() => {
    const onPageHide = () => flushLatest();
    window.addEventListener("pagehide", onPageHide);
    return () => window.removeEventListener("pagehide", onPageHide);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, userId, week]);

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
        // Save-action metric: fire only when the saved content is non-empty
        // and differs from the last tracked value. Identical re-saves of
        // the same string are deduped here.
        if (value.trim().length > 0 && value !== lastTrackedRef.current) {
          lastTrackedRef.current = value;
          trackEvent(EVENTS.REFLECTION_SAVED);
          onSaved?.();
        }
        window.setTimeout(() => setSaveState((s) => (s === "saved" ? "idle" : s)), 2400);
      }
    }, 900);
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [value, loaded, userId, week, onSaved]);

  useEffect(() => {
    return () => {
      try {
        recognitionRef.current?.stop();
      } catch {
        // ignore
      }
    };
  }, []);

  const startListening = () => {
    setVoiceMessage(null);
    if (!speechSupported) {
      setVoiceMessage("Voice isn't available in this browser. Typing works just as well.");
      return;
    }
    const rec = getRecognition();
    if (!rec) {
      setVoiceMessage("We couldn't hear you just now. You can try again, or type instead.");
      return;
    }
    recognitionRef.current = rec;
    baseTextRef.current = value ? value.trimEnd() + " " : "";
    rec.onresult = (e: unknown) => {
      const evt = e as { resultIndex: number; results: Array<Array<{ transcript: string }> & { isFinal: boolean }> };
      let interim = "";
      let final = "";
      for (let i = evt.resultIndex; i < evt.results.length; i++) {
        const r = evt.results[i];
        if (r.isFinal) final += r[0].transcript;
        else interim += r[0].transcript;
      }
      const next = (baseTextRef.current + final + interim).replace(/\s+/g, " ").trimStart();
      setValue(next);
      if (final) {
        baseTextRef.current = (baseTextRef.current + final + " ").replace(/\s+/g, " ");
        setLastInputWasVoice(true);
      }
    };
    rec.onerror = () => {
      setVoiceMessage("Some of that didn't come through. Your words are still here. You can speak again, or type the rest.");
      setListening(false);
    };
    rec.onend = () => setListening(false);
    try {
      rec.start();
      setListening(true);
    } catch {
      setVoiceMessage("We couldn't hear you just now. You can try again, or type instead.");
      setListening(false);
    }
  };

  const stopListening = () => {
    try {
      recognitionRef.current?.stop();
    } catch {
      // ignore
    }
    setListening(false);
  };

  const acceptShapedDraft = async (shaped: string) => {
    // Capture first-written snapshot if this is the first time a shape is accepted.
    const updates: Record<string, string | null> = { content: shaped };
    if (!hasFirstWritten && initialRef.current.trim().length > 0) {
      updates.first_written_content = initialRef.current;
      updates.first_written_at = new Date().toISOString();
    }
    const { error } = await supabase
      .from("reflections")
      .upsert(
        { user_id: userId, week, ...updates },
        { onConflict: "user_id,week" }
      );
    if (!error) {
      setValue(shaped);
      initialRef.current = shaped;
      setSavedAt(new Date());
      setSaveState("saved");
      if (!hasFirstWritten && updates.first_written_content) setHasFirstWritten(true);
      setLastInputWasVoice(false);
      // Save-action metric: a shaped accept is a real save. Same dedupe
      // rule as the debounced typing-save path.
      if (shaped.trim().length > 0 && shaped !== lastTrackedRef.current) {
        lastTrackedRef.current = shaped;
        trackEvent(EVENTS.REFLECTION_SAVED);
        onSaved?.();
      }
      window.setTimeout(() => setSaveState((s) => (s === "saved" ? "idle" : s)), 2400);
      return true;
    }
    setSaveState("error");
    return false;
  };

  const retrySave = async () => {
    setSaveState("saving");
    const { error } = await supabase.from("reflections").upsert(
      { user_id: userId, week, content: valueRef.current },
      { onConflict: "user_id,week" },
    );
    if (error) {
      setSaveState("error");
      return;
    }
    initialRef.current = valueRef.current;
    setSavedAt(new Date());
    setSaveState("saved");
  };

  const autosaveStatus =
    saveState === "saving"
      ? "Saving your words…"
      : saveState === "error"
      ? "Not saved yet. Your words remain on this screen."
      : saveState === "saved"
      ? "Saved to this week."
      : savedAt
      ? "Held privately."
      : "Autosaves as you write.";

  return (
    <section className="relative pt-10 pb-2">
      {/* Section label */}
      <div className="flex items-center gap-3 mb-5">
        <span
          aria-hidden="true"
          className="block w-5 h-px"
          style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.55)" }}
        />
        <p
          className="font-sans text-[10.5px] font-medium tracking-[0.26em] uppercase"
          style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
        >
          A moment for you
        </p>
      </div>

      <h2 className="font-serif text-[1.45rem] sm:text-[1.65rem] text-foreground leading-[1.18] mb-2.5 max-w-[26ch]">
        {content.reflection.prompt}
      </h2>

      <p className="font-serif italic text-[14px] sm:text-[14.5px] text-foreground/55 leading-relaxed mb-7 max-w-[40ch]">
        {content.reflection.context}
      </p>

      {/* Heirloom writing surface */}
      <div
        className="relative rounded-[32px] keepsake-surface transition-shadow duration-500 focus-within:shadow-[0_32px_80px_-32px_hsl(var(--stage-pregnancy-accent)/0.32),0_8px_24px_-12px_hsl(222_14%_12%/0.1)]"
      >
        {/* Embossed seal */}
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
          {loadError ? (
            <div className="py-10 pl-5 sm:pl-7" role="alert">
              <p className="font-serif italic text-[15px] text-destructive/85">{loadError}</p>
              <button type="button" onClick={() => setLoadAttempt((n) => n + 1)} className="mt-3 font-sans text-xs underline">
                Try loading again
              </button>
            </div>
          ) : <textarea
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setLastInputWasVoice(false);
            }}
            disabled={!loaded}
            rows={8}
            placeholder="Begin where you are."
            aria-label={`Your reflection for week ${week}`}
            className="w-full bg-transparent border-0 pl-5 sm:pl-7 pr-0 py-3 font-serif text-[18px] sm:text-[19.5px] italic font-normal text-foreground placeholder:text-foreground/35 placeholder:italic resize-none focus:outline-none leading-[1.85] min-h-[220px] caret-[hsl(var(--stage-pregnancy-accent))]"
          />}
        </div>

        {/* Voice row — restrained, inside the note */}
        <div
          className="px-7 sm:px-10 py-3 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-4"
          style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.12)" }}
        >
          <button
            type="button"
            onClick={listening ? stopListening : startListening}
            disabled={!speechSupported}
            aria-pressed={listening}
            className="self-start inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 transition-opacity disabled:opacity-40"
            style={{
              color: "hsl(var(--stage-pregnancy-accent))",
              border: `1px solid hsl(var(--stage-pregnancy-accent) / ${listening ? 0.45 : 0.28})`,
              background: listening ? "hsl(var(--stage-pregnancy-accent) / 0.1)" : "transparent",
            }}
          >
            {listening ? <MicOff size={11} strokeWidth={1.8} /> : <Mic size={11} strokeWidth={1.8} />}
            <span className="font-sans text-[10.5px] font-medium tracking-[0.22em] uppercase">
              {listening ? "Listening · tap to stop" : "Speak instead"}
            </span>
          </button>
          <span className="font-serif italic text-[11.5px] text-foreground/50 leading-snug sm:text-right">
            {voiceMessage
              ? voiceMessage
              : listening
              ? "Speak gently. Words appear as you go."
              : speechSupported
              ? "When you speak, we turn it into words so you can keep the note."
              : "Voice isn't available in this browser."}
          </span>
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
              {saveState === "saving" ? "Saving" : saveState === "error" ? "Not saved" : savedAt ? "Held" : "Ready"}
            </span>
          </div>
          <span className="font-serif italic text-[12.5px] text-foreground/45 tracking-wide hidden sm:inline">
            {autosaveStatus}
          </span>
        </div>
      </div>

      {saveState === "error" && (
        <button type="button" onClick={retrySave} className="mt-3 font-sans text-xs font-medium underline">
          Try saving again
        </button>
      )}

      {/* Inline shaping — appears only once threshold met */}
      <div className="mt-5 px-2 sm:px-4">
        <NoteShapingSuggestion
          original={value}
          week={week}
          available={threshold.available}
          lastInputWasVoice={lastInputWasVoice}
          register="live"
          onAccept={acceptShapedDraft}
        />
      </div>

      {/* Continuity colophon */}
      <p className="font-serif italic text-[12.5px] text-foreground/45 mt-5 max-w-[42ch]">
        Each week's reflection is kept on your journey. A record of becoming, week by week.
      </p>
    </section>
  );
};

export default SlotReflection;

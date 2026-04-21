import { useEffect, useRef, useState } from "react";
import { Mic, MicOff, Sparkles, Loader2, X, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  week: number;
  onAccept: (text: string) => void;
  onClose: () => void;
}

type Phase = "capture" | "shaping" | "review" | "error";

// Minimal Web Speech API typing
type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((e: any) => void) | null;
  onerror: ((e: any) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

const getRecognition = (): SpeechRecognitionLike | null => {
  const w = window as any;
  const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition;
  if (!Ctor) return null;
  const r = new Ctor() as SpeechRecognitionLike;
  r.continuous = true;
  r.interimResults = true;
  r.lang = "en-GB";
  return r;
};

/**
 * Slot 3 AI assistant — capture → shape → save.
 * Optional. Quiet. Private. Premium.
 *
 * - Capture: speak (Web Speech API) or type rough thoughts.
 * - Shape: a single calm draft is generated in her own voice.
 * - Review: she can edit, regenerate, accept (writes back to the reflection
 *   field) or close. Nothing is saved unless she accepts.
 */
const SlotReflectionAssistant = ({ week, onAccept, onClose }: Props) => {
  const [phase, setPhase] = useState<Phase>("capture");
  const [raw, setRaw] = useState("");
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const baseTextRef = useRef<string>("");

  const speechSupported = typeof window !== "undefined" && (("SpeechRecognition" in window) || ("webkitSpeechRecognition" in window));

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
    if (!speechSupported) return;
    const rec = getRecognition();
    if (!rec) return;
    recognitionRef.current = rec;
    baseTextRef.current = raw ? raw.trimEnd() + " " : "";
    rec.onresult = (e: any) => {
      let interim = "";
      let final = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) final += r[0].transcript;
        else interim += r[0].transcript;
      }
      setRaw((baseTextRef.current + final + interim).replace(/\s+/g, " ").trimStart());
      if (final) baseTextRef.current = (baseTextRef.current + final + " ").replace(/\s+/g, " ");
    };
    rec.onerror = () => {
      setListening(false);
    };
    rec.onend = () => {
      setListening(false);
    };
    try {
      rec.start();
      setListening(true);
    } catch {
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

  const shape = async () => {
    if (raw.trim().length < 2) return;
    if (listening) stopListening();
    setPhase("shaping");
    setError(null);
    try {
      const { data, error: fnErr } = await supabase.functions.invoke("ai-reflect", {
        body: { rawThoughts: raw.trim(), week },
      });
      if (fnErr) throw fnErr;
      const d = (data as { draft?: string; error?: string })?.draft?.trim();
      const e = (data as { draft?: string; error?: string })?.error;
      if (e) throw new Error(e);
      if (!d) throw new Error("No draft returned.");
      setDraft(d);
      setPhase("review");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not shape your reflection.");
      setPhase("error");
    }
  };

  const accept = () => {
    if (draft.trim().length === 0) return;
    onAccept(draft.trim());
  };

  const accentBg = "hsl(var(--stage-pregnancy) / 0.5)";
  const accentBorder = "hsl(var(--stage-pregnancy-accent) / 0.22)";
  const accentText = "hsl(var(--stage-pregnancy-accent))";

  return (
    <div
      className="relative mt-6 rounded-[24px] keepsake-surface overflow-hidden"
      style={{ border: `1px solid ${accentBorder}` }}
      role="region"
      aria-label="Reflection assistant"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 sm:px-7 py-4"
        style={{ background: accentBg, borderBottom: `1px solid ${accentBorder}` }}
      >
        <div className="flex items-center gap-2.5">
          <Sparkles size={12} strokeWidth={1.8} style={{ color: accentText }} />
          <span
            className="font-sans text-[10.5px] font-medium tracking-[0.24em] uppercase"
            style={{ color: accentText }}
          >
            {phase === "review" ? "Your reflection, shaped" : "Speak it. We'll shape it."}
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close assistant"
          className="text-foreground/50 hover:text-foreground/80 transition-colors"
        >
          <X size={14} strokeWidth={1.6} />
        </button>
      </div>

      <div className="px-6 sm:px-8 py-6 sm:py-7">
        {phase === "capture" && (
          <>
            <p className="font-serif italic text-[14px] sm:text-[14.5px] text-foreground/60 leading-relaxed mb-5 max-w-[44ch]">
              On the days you are too tired to write, just say it out loud or type a few rough words. We'll gently shape them into a reflection in your own voice — for you to edit and keep.
            </p>

            <div
              className="rounded-[16px] p-4 sm:p-5"
              style={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border) / 0.5)",
              }}
            >
              <textarea
                value={raw}
                onChange={(e) => setRaw(e.target.value)}
                rows={4}
                placeholder={listening ? "Listening… speak when you're ready." : "Type or speak your thoughts. Anything goes."}
                aria-label="Your rough thoughts"
                className="w-full bg-transparent border-0 font-serif text-[15.5px] sm:text-[16px] italic text-foreground placeholder:text-foreground/40 placeholder:italic resize-none focus:outline-none leading-[1.7] min-h-[100px]"
              />
              {listening && (
                <div className="flex items-center gap-2 mt-2">
                  <span
                    aria-hidden="true"
                    className="block w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ backgroundColor: accentText }}
                  />
                  <span
                    className="font-sans text-[10px] font-medium tracking-[0.22em] uppercase"
                    style={{ color: accentText }}
                  >
                    Listening
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-5">
              {speechSupported && (
                <button
                  type="button"
                  onClick={listening ? stopListening : startListening}
                  className="inline-flex items-center gap-2 rounded-pill px-4 py-2.5 font-sans text-[12.5px] font-medium tracking-[0.04em] transition-colors"
                  style={{
                    background: listening ? accentText : "transparent",
                    color: listening ? "white" : accentText,
                    border: `1px solid ${accentText}`,
                  }}
                >
                  {listening ? <MicOff size={13} strokeWidth={1.8} /> : <Mic size={13} strokeWidth={1.8} />}
                  {listening ? "Stop" : "Speak"}
                </button>
              )}
              <button
                type="button"
                onClick={shape}
                disabled={raw.trim().length < 2}
                className="inline-flex items-center gap-2 rounded-pill px-5 py-2.5 font-sans text-[12.5px] font-medium tracking-[0.04em] transition-opacity disabled:opacity-40"
                style={{
                  background: "hsl(var(--foreground))",
                  color: "hsl(var(--background))",
                }}
              >
                Shape this
                <ArrowRight size={13} strokeWidth={1.8} />
              </button>
              {!speechSupported && (
                <span className="font-serif italic text-[12px] text-foreground/45">
                  Voice isn't supported in this browser — typing works just as well.
                </span>
              )}
            </div>
          </>
        )}

        {phase === "shaping" && (
          <div className="py-10 flex flex-col items-center text-center">
            <Loader2 size={20} className="animate-spin mb-4" style={{ color: accentText }} />
            <p className="font-serif italic text-[14.5px] text-foreground/60">
              Shaping your words gently…
            </p>
          </div>
        )}

        {phase === "review" && (
          <>
            <p className="font-serif italic text-[13px] text-foreground/55 leading-relaxed mb-4">
              A draft in your voice. Edit anything that doesn't feel quite yours.
            </p>
            <div
              className="rounded-[16px] p-5 sm:p-6"
              style={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border) / 0.5)",
              }}
            >
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                rows={6}
                aria-label="Shaped reflection draft"
                className="w-full bg-transparent border-0 font-serif text-[16.5px] sm:text-[17.5px] italic text-foreground resize-none focus:outline-none leading-[1.8] min-h-[140px]"
              />
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-5">
              <button
                type="button"
                onClick={() => setPhase("capture")}
                className="font-sans text-[12px] font-medium tracking-[0.06em] text-foreground/55 hover:text-foreground transition-colors"
              >
                Start again
              </button>
              <button
                type="button"
                onClick={shape}
                className="inline-flex items-center gap-2 rounded-pill px-4 py-2.5 font-sans text-[12.5px] font-medium tracking-[0.04em] transition-colors"
                style={{
                  background: "transparent",
                  color: accentText,
                  border: `1px solid ${accentText}`,
                }}
              >
                <Sparkles size={12} strokeWidth={1.8} />
                Shape again
              </button>
              <div className="flex-1" />
              <button
                type="button"
                onClick={accept}
                disabled={draft.trim().length === 0}
                className="inline-flex items-center gap-2 rounded-pill px-5 py-2.5 font-sans text-[12.5px] font-medium tracking-[0.04em] transition-opacity disabled:opacity-40"
                style={{
                  background: "hsl(var(--foreground))",
                  color: "hsl(var(--background))",
                }}
              >
                Use this reflection
                <ArrowRight size={13} strokeWidth={1.8} />
              </button>
            </div>
          </>
        )}

        {phase === "error" && (
          <div className="py-6">
            <p className="font-serif italic text-[14px] text-foreground/65 mb-4">
              {error ?? "Something went quiet. Please try again."}
            </p>
            <button
              type="button"
              onClick={() => setPhase("capture")}
              className="inline-flex items-center gap-2 rounded-pill px-4 py-2.5 font-sans text-[12.5px] font-medium tracking-[0.04em]"
              style={{
                background: "transparent",
                color: accentText,
                border: `1px solid ${accentText}`,
              }}
            >
              Try again
            </button>
          </div>
        )}
      </div>

      <p
        className="px-6 sm:px-7 pb-4 font-serif italic text-[11.5px] text-foreground/40"
      >
        Private to you. Nothing is saved unless you choose to keep it.
      </p>
    </div>
  );
};

export default SlotReflectionAssistant;

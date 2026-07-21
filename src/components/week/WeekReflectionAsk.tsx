import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, MessageCircle, Check, LogIn } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getActivePregnancyJourney } from "@/lib/savedJourney";
import { slugifyTopic } from "@/data/weekSupportContent";

interface Props {
  week: number;
  reflectionPrompts: string[];
  askChips: string[];
  reflectionTitle?: string;
  askTitle?: string;
  askPlaceholder?: string;
}

type AuthMode = "loading" | "signed_out" | "no_journey" | "active_journey";
type SaveState = "idle" | "saving" | "saved" | "error";

/**
 * Shared reflection + ask cards for pregnancy week pages.
 *
 * Save behaviour mirrors SlotReflection: writes { user_id, week, content }
 * to the reflections table with onConflict "user_id,week". Only enabled when
 * the user is signed in AND has an active pregnancy journey. Otherwise the
 * CTA routes to the appropriate onboarding surface with honest copy.
 */
const WeekReflectionAsk = ({
  week,
  reflectionPrompts,
  askChips,
  reflectionTitle = "What does this week feel like for you?",
  askTitle = "A question on your mind?",
  askPlaceholder,
}: Props) => {
  const [mode, setMode] = useState<AuthMode>("loading");
  const [userId, setUserId] = useState<string | null>(null);
  const [value, setValue] = useState("");
  const [saveState, setSaveState] = useState<SaveState>("idle");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: sess } = await supabase.auth.getSession();
      const user = sess.session?.user;
      if (!user) {
        if (!cancelled) setMode("signed_out");
        return;
      }
      const journey = await getActivePregnancyJourney(user.id);
      if (cancelled) return;
      setUserId(user.id);
      if (!journey) {
        setMode("no_journey");
        return;
      }
      setMode("active_journey");
      // Hydrate any existing reflection for this week.
      const { data } = await supabase
        .from("reflections")
        .select("content")
        .eq("user_id", user.id)
        .eq("week", week)
        .maybeSingle();
      if (!cancelled && data?.content) {
        setValue(data.content);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [week]);

  const handleSave = async () => {
    if (mode !== "active_journey" || !userId) return;
    if (value.trim().length === 0) return;
    setSaveState("saving");
    const { error } = await supabase
      .from("reflections")
      .upsert({ user_id: userId, week, content: value }, { onConflict: "user_id,week" });
    if (error) {
      setSaveState("error");
      return;
    }
    setSaveState("saved");
  };

  const askQueryBase = `/ask?stage=pregnancy&week=${week}`;

  return (
    <section className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl pb-16 md:pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Reflection card */}
        <div className="bg-card rounded-3xl border border-border/40 border-t-2 border-t-sage/40 p-7 sm:p-8 md:p-9 shadow-card-brand">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-9 h-9 rounded-full bg-sage-bg flex items-center justify-center shrink-0">
              <Leaf size={14} className="text-sage" />
            </span>
            <div className="min-w-0">
              <p className="font-sans text-[10.5px] font-semibold tracking-[0.24em] uppercase text-sage">
                A moment for reflection
              </p>
              <h3 className="font-serif text-[1.3rem] sm:text-[1.35rem] text-foreground mt-0.5 leading-snug">
                {reflectionTitle}
              </h3>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {reflectionPrompts.map((p) => (
              <span
                key={p}
                className="font-sans text-[11.5px] font-medium bg-sage-bg/70 text-foreground/80 rounded-full px-3 py-1.5 border border-sage/20"
              >
                {p}
              </span>
            ))}
          </div>

          <textarea
            rows={4}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (saveState !== "idle") setSaveState("idle");
            }}
            placeholder="Write your thoughts here… this is just for you."
            aria-label={`Reflection for week ${week}`}
            className="w-full bg-parchment/80 border border-border/40 rounded-xl px-4 py-3.5 font-sans text-[13.5px] text-foreground placeholder:text-foreground/45 resize-none focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/30 transition-all leading-relaxed"
          />

          <div className="mt-4">
            {mode === "loading" && (
              <span className="font-sans text-[12px] text-foreground/50 italic">Loading…</span>
            )}

            {mode === "signed_out" && (
              <>
                <Link
                  to="/auth"
                  className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-5 py-2.5 font-sans text-[13px] font-medium hover:bg-terracotta-hover transition-colors"
                >
                  <LogIn size={12} /> Sign in to save this reflection
                </Link>
                <p className="font-sans text-[11.5px] text-foreground/55 mt-2.5 leading-relaxed">
                  Your words stay here on this page until you sign in.
                </p>
              </>
            )}

            {mode === "no_journey" && (
              <>
                <Link
                  to="/due-date-calculator"
                  className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-5 py-2.5 font-sans text-[13px] font-medium hover:bg-terracotta-hover transition-colors"
                >
                  Set up your pregnancy journey <ArrowRight size={12} />
                </Link>
                <p className="font-sans text-[11.5px] text-foreground/55 mt-2.5 leading-relaxed">
                  Once your journey is set up, reflections save against your current week.
                </p>
              </>
            )}

            {mode === "active_journey" && (
              <>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={saveState === "saving" || value.trim().length === 0}
                    className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-5 py-2.5 font-sans text-[13px] font-medium hover:bg-terracotta-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saveState === "saved" ? (
                      <>
                        <Check size={12} /> Saved to your pregnancy journey
                      </>
                    ) : saveState === "saving" ? (
                      <>Saving…</>
                    ) : (
                      <>
                        Save to my journey <ArrowRight size={12} />
                      </>
                    )}
                  </button>
                  {saveState === "saved" && (
                    <Link
                      to="/my-week"
                      className="font-sans text-[12.5px] font-medium text-sage hover:text-sage/80 underline underline-offset-4"
                    >
                      View in My Week
                    </Link>
                  )}
                </div>
                {saveState === "error" && (
                  <p className="font-sans text-[11.5px] text-foreground/70 mt-2.5 leading-relaxed">
                    Your words are still here. Please try saving again in a moment.
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        {/* Ask card */}
        <div className="bg-card rounded-3xl border border-border/40 border-t-2 border-t-lavender/50 p-7 sm:p-8 md:p-9 shadow-card-brand">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-9 h-9 rounded-full bg-lavender-bg flex items-center justify-center shrink-0">
              <MessageCircle size={14} className="text-lavender-foreground" />
            </span>
            <div className="min-w-0">
              <p className="font-sans text-[10.5px] font-semibold tracking-[0.24em] uppercase text-sage">
                Ask about week {week}
              </p>
              <h3 className="font-serif text-[1.3rem] sm:text-[1.35rem] text-foreground mt-0.5 leading-snug">
                {askTitle}
              </h3>
            </div>
          </div>
          <p className="font-sans text-[13px] text-foreground/70 leading-relaxed mb-4">
            Get a calm, evidence led answer tailored to where you are right now.
          </p>
          <Link
            to={askQueryBase}
            className="block w-full bg-parchment/80 border border-border/40 rounded-full px-5 py-3.5 font-sans text-[13.5px] text-foreground/60 hover:border-sage/50 hover:text-foreground transition-colors"
          >
            {askPlaceholder ?? `Ask a question about week ${week}`}
          </Link>
          <p className="font-sans text-[10.5px] font-semibold tracking-[0.22em] uppercase text-foreground/55 mt-5 mb-2.5">
            Popular at this stage
          </p>
          <div className="flex flex-wrap gap-2">
            {askChips.map((c) => (
              <Link
                key={c}
                to={`${askQueryBase}&topic=${slugifyTopic(c)}`}
                className="font-sans text-[12px] font-medium text-foreground/80 bg-parchment-dark/60 border border-border/40 hover:border-sage/50 hover:text-foreground px-3.5 py-1.5 rounded-full transition-colors"
              >
                {c}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeekReflectionAsk;

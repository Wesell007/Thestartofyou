import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import {
  BABY_ILLUSTRATION_STYLES,
  isBabyIllustrationStyle,
  type BabyIllustrationStyle,
} from "@/lib/myWeekBabyIllustrations";
import {
  defaultRealismAltForWeek,
  resolveRealismForWeek,
} from "@/lib/myWeekRealismIllustrations";

type Props = { userId: string };

const OPTION_LABELS: Record<BabyIllustrationStyle, string> = {
  default: "Use the default illustrations",
  light: "Lighter skin tone style",
  medium: "Medium skin tone style",
  deep: "Deeper skin tone style",
};

const STYLES = BABY_ILLUSTRATION_STYLES;
const PREVIEW_WEEK = 20;

const BabyIllustrationStyleField = ({ userId }: Props) => {
  const [selected, setSelected] = useState<BabyIllustrationStyle>("default");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [busy, setBusy] = useState<"save" | "reset" | null>(null);
  const buttonsRef = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("baby_illustration_style")
        .eq("user_id", userId)
        .maybeSingle();
      if (!active) return;
      if (error) {
        setLoadError(true);
        setLoading(false);
        return;
      }
      const value = data?.baby_illustration_style;
      setSelected(isBabyIllustrationStyle(value) ? value : "default");
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [userId]);

  const persist = async (value: BabyIllustrationStyle, mode: "save" | "reset") => {
    if (busy) return;
    setBusy(mode);
    const dbValue = value === "default" ? null : value;
    const { error } = await supabase
      .from("profiles")
      .upsert(
        { user_id: userId, baby_illustration_style: dbValue },
        { onConflict: "user_id" },
      );
    setBusy(null);
    if (error) {
      toast({
        title:
          mode === "reset"
            ? "Could not reset illustration style"
            : "Could not save illustration style",
        variant: "destructive",
      });
      return;
    }
    setSelected(value);
    toast({
      title: mode === "reset" ? "Reset to default" : "Illustration style updated.",
    });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (
      event.key !== "ArrowRight" &&
      event.key !== "ArrowLeft" &&
      event.key !== "ArrowDown" &&
      event.key !== "ArrowUp"
    ) {
      return;
    }
    event.preventDefault();
    const dir = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1;
    const next = (index + dir + STYLES.length) % STYLES.length;
    const nextStyle = STYLES[next];
    setSelected(nextStyle);
    buttonsRef.current[next]?.focus();
  };

  return (
    <section className="rounded-2xl border border-border/50 bg-card p-6">
      <h2 className="font-serif text-xl mb-2">Illustration style</h2>
      <p className="text-sm text-muted-foreground mb-1">
        Would you like your journey illustrations to feel more personalised?
      </p>
      <p className="text-sm text-muted-foreground mb-3">
        A gentle visual preference for the baby illustrations shown on your weekly page.
      </p>
      <p className="text-xs text-muted-foreground mb-4 rounded-lg border border-border/40 bg-parchment/60 px-3 py-2">
        We are upgrading My Week to a neutral week-by-week illustration set first. Your saved illustration preference is kept for the personalised version coming next.
      </p>

      {loadError && (
        <p className="text-xs text-muted-foreground mb-3">
          We couldn't load your saved preference. You can still choose an option below.
        </p>
      )}

      <div
        role="radiogroup"
        aria-label="Illustration style"
        className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-4"
      >
        {STYLES.map((style, index) => {
          const checked = selected === style;
          return (
            <button
              key={style}
              ref={(el) => {
                buttonsRef.current[index] = el;
              }}
              type="button"
              role="radio"
              aria-checked={checked}
              tabIndex={checked ? 0 : -1}
              disabled={loading || Boolean(busy)}
              onClick={() => setSelected(style)}
              onKeyDown={(e) => onKeyDown(e, index)}
              className={`flex flex-col items-center gap-2 rounded-2xl border p-3 text-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-60 ${
                checked
                  ? "border-terracotta bg-terracotta/5 shadow-sm"
                  : "border-border/60 bg-background hover:border-border"
              }`}
            >
              <img
                src={resolveBabyIllustration(style, "mid")}
                alt={babyIllustrationAlt(style)}
                className="h-16 w-16 rounded-full object-cover"
                loading="lazy"
              />
              <span className="text-xs font-medium leading-tight text-foreground">
                {OPTION_LABELS[style]}
              </span>
            </button>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground mb-5">
        These illustrations are symbolic and may not reflect exactly how your baby will look.
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => persist(selected, "save")}
          disabled={loading || Boolean(busy)}
          className="inline-flex items-center gap-2 rounded-pill bg-terracotta text-terracotta-foreground px-5 py-2.5 text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all disabled:opacity-50"
        >
          {busy === "save" ? "Saving…" : "Save illustration style"}
        </button>
        <button
          type="button"
          onClick={() => persist("default", "reset")}
          disabled={loading || Boolean(busy)}
          className="text-sm text-muted-foreground underline disabled:opacity-50"
        >
          Use the default illustrations
        </button>
      </div>
    </section>
  );
};

export default BabyIllustrationStyleField;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  resolveFirstYearCta,
  type FirstYearEntryState,
} from "@/lib/firstYearEntry";

type Props = {
  /** Hero sits on the video veil, final sits on the gradient block. */
  variant?: "hero" | "final";
  className?: string;
};

/**
 * Public First Year start CTA. The hub stays public and fast: the signed-out
 * form paints immediately and the lifecycle read happens lazily afterwards.
 * The button box is a fixed shape, so the swap does not shift layout.
 */
const FYStartFirstYearCTA = ({ variant = "hero", className }: Props) => {
  const [state, setState] = useState<FirstYearEntryState>({ kind: "signed_out" });

  useEffect(() => {
    let cancelled = false;
    // Deferred so the hub's first paint is never blocked by an auth round trip.
    const id = window.setTimeout(() => {
      (async () => {
        const { data } = await supabase.auth.getUser();
        if (cancelled) return;
        const user = data.user;
        if (!user) return;

        const { data: pointer } = await supabase
          .from("journeys")
          .select("lifecycle")
          .eq("user_id", user.id)
          .maybeSingle();
        if (cancelled) return;

        if (!pointer) {
          setState({ kind: "no_journey" });
          return;
        }
        if (pointer.lifecycle === "first_year") {
          setState({ kind: "first_year" });
          return;
        }
        if (pointer.lifecycle === "ttc") {
          setState({ kind: "ttc" });
          return;
        }
        if (pointer.lifecycle === "pregnancy") {
          const { data: pregnancy } = await supabase
            .from("pregnancy_journeys")
            .select("status")
            .eq("user_id", user.id)
            .maybeSingle();
          if (cancelled) return;
          setState({ kind: "pregnancy", status: pregnancy?.status ?? null });
          return;
        }
        setState({ kind: "no_journey" });
      })();
    }, 0);
    return () => {
      cancelled = true;
      window.clearTimeout(id);
    };
  }, []);

  const cta = resolveFirstYearCta(state);

  const buttonStyle =
    variant === "final"
      ? {
          backgroundColor: "hsl(var(--stage-firstyear-deep))",
          color: "hsl(var(--card))",
          boxShadow:
            "inset 0 1px 0 hsl(0 0% 100% / 0.14), 0 14px 34px -18px hsl(212 36% 20% / 0.55)",
        }
      : {
          backgroundColor: "hsl(var(--stage-firstyear-deep))",
          color: "hsl(var(--card))",
          boxShadow:
            "inset 0 1px 0 hsl(0 0% 100% / 0.14), 0 12px 30px -18px hsl(212 36% 20% / 0.5)",
        };

  const wrapper = variant === "final" ? "mt-6 text-center" : "mt-6";

  if (!cta.show) {
    return (
      <div className={`${wrapper} ${className ?? ""}`}>
        <Link
          to={cta.quietLink?.href ?? "/my-journey"}
          className="font-sans text-[13px] text-foreground/70 underline underline-offset-4 decoration-foreground/30 hover:text-foreground"
        >
          {cta.quietLink?.label ?? "Open your journey"}
        </Link>
      </div>
    );
  }

  const isExternalAuth = cta.href.startsWith("/auth");

  return (
    <div className={`${wrapper} ${className ?? ""}`}>
      <Link
        to={cta.href}
        {...(isExternalAuth ? { reloadDocument: false } : {})}
        className="inline-flex items-center gap-2 rounded-pill px-8 py-4 font-sans text-[13px] font-medium tracking-wide transition-all duration-300 hover:-translate-y-[1px] min-w-[240px] justify-center"
        style={buttonStyle}
      >
        {cta.label} <ArrowUpRight size={14} aria-hidden />
      </Link>
      {cta.note ? (
        <p className="mt-3 font-sans text-[13px] font-light text-muted-foreground">
          {cta.note}
        </p>
      ) : null}
    </div>
  );
};

export default FYStartFirstYearCTA;

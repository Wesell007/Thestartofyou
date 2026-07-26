import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  getActivePregnancyJourney,
  type PregnancyJourneyStatus,
} from "@/lib/savedJourney";
import { TOOLKIT_NOTES } from "@/lib/journeyStatusCopy";

const accent = "hsl(var(--stage-pregnancy-accent))";

/**
 * Small, self-contained notice mounted at the top of pregnancy toolkit
 * sub-pages. Renders nothing when journey is active. For non-active
 * statuses it shows a short calm line so cheerful preparation copy on the
 * page below doesn't stand alone. Never destructive.
 */
const PageStatusNotice = () => {
  const [status, setStatus] = useState<PregnancyJourneyStatus | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await supabase.auth.getSession();
        const user = data.session?.user;
        if (!user) return;
        const j = await getActivePregnancyJourney(user.id);
        if (cancelled) return;
        setStatus(j?.status ?? null);
      } catch {
        // silent — this notice is additive only
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!status || status === "active") return null;
  const note = TOOLKIT_NOTES[status];

  return (
    <div
      role="status"
      className="mb-6 rounded-[14px] border bg-parchment px-4 py-3"
      style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.22)" }}
    >
      <p
        className="font-sans text-[10.5px] font-medium tracking-[0.28em] uppercase mb-1"
        style={{ color: accent }}
      >
        Journey status
      </p>
      <p className="font-serif text-foreground/80 text-[14px] leading-[1.55]">
        {note}{" "}
        <Link
          to="/account-settings"
          className="underline underline-offset-4 decoration-foreground/25 hover:text-foreground"
        >
          Manage in Account Settings
        </Link>
        .
      </p>
    </div>
  );
};

export default PageStatusNotice;

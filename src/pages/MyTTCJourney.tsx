import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { ArrowRight, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  getActiveTTCJourney,
  type ActiveTTCJourney,
} from "@/lib/savedTTCJourney";
import {
  computeTTCStage,
  cycleDayFrom,
  deriveTTCDates,
  type TTCStage,
} from "@/lib/ttcDerived";
import { trackEvent } from "@/lib/analytics";
import { EVENTS } from "@/lib/analyticsEvents";
import { getRecentTTCLogs, type TTCLog } from "@/lib/ttcLogs";
import TTCJourneySummary from "@/components/ttc/journey/TTCJourneySummary";
import TTCJourneyTimeline from "@/components/ttc/journey/TTCJourneyTimeline";
import TTCJourneyFocusCard from "@/components/ttc/journey/TTCJourneyFocusCard";
import TTCJourneyGuidance from "@/components/ttc/journey/TTCJourneyGuidance";
import TTCJourneyCalendar from "@/components/ttc/journey/TTCJourneyCalendar";
import TTCLogEntryPanel from "@/components/ttc/journey/TTCLogEntryPanel";
import TTCLogList from "@/components/ttc/journey/TTCLogList";

type Status = "loading" | "empty" | "pregnancy_active" | "ready";

const todayIso = () => format(new Date(), "yyyy-MM-dd");

const MyTTCJourney = () => {
  const [status, setStatus] = useState<Status>("loading");
  const [journey, setJourney] = useState<ActiveTTCJourney | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [logs, setLogs] = useState<TTCLog[]>([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const [panelDate, setPanelDate] = useState<string>(todayIso());
  const [editing, setEditing] = useState<TTCLog | null>(null);
  const viewedRef = useRef(false);


  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase.auth.getSession();
      const user = data.session?.user;
      if (!user) return; // ProtectedRoute handles redirect.

      // Check pointer first to detect an active pregnancy journey we should
      // not overwrite or replace.
      const { data: pointer } = await supabase
        .from("journeys")
        .select("lifecycle")
        .eq("user_id", user.id)
        .maybeSingle();

      if (cancelled) return;

      if (pointer?.lifecycle === "pregnancy") {
        setStatus("pregnancy_active");
        return;
      }

      const row = await getActiveTTCJourney(user.id);
      if (cancelled) return;
      if (!row) {
        setStatus("empty");
        return;
      }
      setJourney(row);
      setUserId(user.id);
      setStatus("ready");
      try {
        const recent = await getRecentTTCLogs(user.id, row.id, 30);
        if (!cancelled) setLogs(recent);
      } catch { /* non-fatal */ }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (viewedRef.current || status !== "ready") return;
    viewedRef.current = true;
    trackEvent(EVENTS.TTC_JOURNEY_DASHBOARD_VIEWED);
  }, [status]);

  const derivedStage: TTCStage | null = useMemo(() => {
    if (!journey || !journey.last_period_date || !journey.cycle_length_days) {
      return (journey?.stage as TTCStage | null) ?? null;
    }
    try {
      const lmp = new Date(journey.last_period_date);
      const derived = deriveTTCDates(lmp, journey.cycle_length_days);
      return computeTTCStage(new Date(), derived);
    } catch {
      return (journey.stage as TTCStage | null) ?? null;
    }
  }, [journey]);

  const cycleDay = useMemo(() => {
    if (!journey?.last_period_date) return null;
    return cycleDayFrom(new Date(journey.last_period_date), new Date());
  }, [journey]);

  if (status === "loading") {
    return <div className="min-h-screen bg-parchment" />;
  }

  if (status === "pregnancy_active") {
    return (
      <div className="min-h-screen bg-parchment">
        <div className="container mx-auto px-5 sm:px-6 max-w-xl py-16 md:py-24 text-center">
          <p
            className="font-sans text-[10px] font-medium tracking-[0.3em] uppercase mb-3"
            style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
          >
            Pregnancy journey active
          </p>
          <h1 className="font-serif text-3xl md:text-[2.25rem] text-foreground leading-tight mb-3">
            Your pregnancy journey is already saved
          </h1>
          <p className="font-sans text-sm font-light text-muted-foreground/80 leading-relaxed max-w-md mx-auto mb-8">
            To keep things simple, we show one active journey at a time. Your
            TTC dashboard is paused while your pregnancy journey is active.
          </p>
          <Link
            to="/my-journey"
            className="inline-flex items-center gap-2 rounded-pill px-6 py-3 font-sans text-sm font-medium text-white shadow-cta hover:opacity-90 transition-opacity"
            style={{ background: "hsl(var(--stage-pregnancy-accent))" }}
          >
            Open my pregnancy journey <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  if (status === "empty") {
    return (
      <div className="min-h-screen bg-parchment">
        <div className="container mx-auto px-5 sm:px-6 max-w-xl py-16 md:py-24 text-center">
          <p
            className="font-sans text-[10px] font-medium tracking-[0.3em] uppercase mb-3"
            style={{ color: "hsl(var(--stage-ttc-accent))" }}
          >
            My TTC journey
          </p>
          <h1 className="font-serif text-3xl md:text-[2.25rem] text-foreground leading-tight mb-3">
            Let's set up your TTC journey
          </h1>
          <p className="font-sans text-sm font-light text-muted-foreground/80 leading-relaxed max-w-md mx-auto mb-8">
            Add your cycle details so we can gently show where you may be in
            your current cycle and what to focus on next.
          </p>
          <Link
            to="/setup/trying-to-conceive"
            className="inline-flex items-center gap-2 rounded-pill px-6 py-3 font-sans text-sm font-medium text-white shadow-cta hover:opacity-90 transition-opacity"
            style={{ background: "hsl(var(--stage-ttc-accent))" }}
          >
            Set up your TTC journey <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  if (!journey) return <div className="min-h-screen bg-parchment" />;

  return (
    <div className="min-h-screen bg-parchment-grain page-vignette relative">
      <main className="relative mx-auto w-full max-w-[880px] px-5 sm:px-8 md:px-10 pt-16 sm:pt-20 lg:pt-24 pb-20 sm:pb-24">
        {/* Header */}
        <header className="mb-10 sm:mb-12">
          <p
            className="font-sans text-[10px] font-medium tracking-[0.3em] uppercase mb-3"
            style={{ color: "hsl(var(--stage-ttc-accent))" }}
          >
            My TTC journey
          </p>
          <h1 className="font-serif text-3xl sm:text-[2.25rem] md:text-[2.5rem] text-foreground leading-tight mb-3">
            Today in your TTC journey
          </h1>
          <p className="font-serif italic text-[16px] sm:text-[17px] text-foreground/70 leading-[1.6] max-w-[58ch] mb-4">
            A calm view of where you may be in this cycle, what matters next
            and where to find support.
          </p>
          <p className="font-sans text-[12.5px] text-muted-foreground/85 max-w-[58ch] leading-relaxed">
            These dates are estimates, not guarantees. Cycles can vary from
            month to month.
          </p>
        </header>

        {/* Summary */}
        <section className="mb-10 sm:mb-12">
          <TTCJourneySummary journey={journey} cycleDay={cycleDay} stage={derivedStage} />
        </section>

        {/* Timeline */}
        <section className="mb-10 sm:mb-12">
          <TTCJourneyTimeline journey={journey} />
        </section>

        {/* Focus */}
        <section className="mb-10 sm:mb-12">
          <TTCJourneyFocusCard stage={derivedStage} />
        </section>

        {/* Guidance */}
        <section className="mb-10 sm:mb-12">
          <TTCJourneyGuidance stage={derivedStage} journey={journey} />
        </section>

        {/* Ask */}
        <section
          className="rounded-[20px] px-6 sm:px-7 py-7 keepsake-surface mb-10 sm:mb-12"
          style={{ borderColor: "hsl(var(--stage-ttc-accent) / 0.16)" }}
        >
          <p
            className="font-sans text-[10px] font-medium tracking-[0.3em] uppercase mb-3"
            style={{ color: "hsl(var(--stage-ttc-accent))" }}
          >
            Ask
          </p>
          <h2 className="font-serif text-[20px] sm:text-[22px] text-foreground mb-2">
            Ask about this part of your cycle
          </h2>
          <p className="font-serif italic text-foreground/68 text-[15px] leading-[1.6] mb-5 max-w-[52ch]">
            Ask a question about timing, testing, symptoms or what to do next.
          </p>
          <Link
            to={`/ask?stage=ttc&topic=${
              derivedStage === "fertile_window" || derivedStage === "likely_ovulation"
                ? "fertile-window"
                : derivedStage === "two_week_wait"
                ? "two-week-wait"
                : derivedStage === "test_window" || derivedStage === "expected_period"
                ? "pregnancy-tests"
                : "cycle-tracking"
            }`}
            className="inline-flex items-center gap-2 rounded-pill px-5 py-2.5 font-sans text-sm font-medium text-white shadow-cta hover:opacity-90 transition-opacity"
            style={{ background: "hsl(var(--stage-ttc-accent))" }}
          >
            Ask a TTC question <ArrowRight size={14} />
          </Link>
        </section>

        {/* Update setup */}
        <section
          className="rounded-[20px] px-6 sm:px-7 py-7 keepsake-surface mb-10 sm:mb-12"
          style={{ borderColor: "hsl(var(--stage-ttc-accent) / 0.16)" }}
        >
          <p
            className="font-sans text-[10px] font-medium tracking-[0.3em] uppercase mb-3"
            style={{ color: "hsl(var(--stage-ttc-accent))" }}
          >
            Keep it accurate
          </p>
          <h2 className="font-serif text-[20px] sm:text-[22px] text-foreground mb-2">
            Need to update your cycle?
          </h2>
          <p className="font-serif italic text-foreground/68 text-[15px] leading-[1.6] mb-5 max-w-[52ch]">
            If your period started, your cycle length changed or something no
            longer looks right, you can update your TTC setup.
          </p>
          <Link
            to="/setup/trying-to-conceive"
            className="inline-flex items-center gap-2 rounded-pill px-5 py-2.5 font-sans text-sm font-medium border transition-colors"
            style={{
              borderColor: "hsl(var(--stage-ttc-accent) / 0.4)",
              color: "hsl(var(--stage-ttc-accent))",
            }}
          >
            Update TTC setup <ArrowRight size={14} />
          </Link>
        </section>

        {/* Positive test soft handover */}
        <section
          className="rounded-[20px] px-6 sm:px-7 py-7 keepsake-surface"
          style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.18)" }}
        >
          <div className="flex items-start gap-3 mb-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "hsl(var(--stage-pregnancy-accent) / 0.14)" }}
            >
              <Sparkles size={15} style={{ color: "hsl(var(--stage-pregnancy-accent))" }} />
            </div>
            <div className="flex-1">
              <p
                className="font-sans text-[10px] font-medium tracking-[0.3em] uppercase mb-1"
                style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
              >
                If your news changes
              </p>
              <h2 className="font-serif text-[20px] sm:text-[22px] text-foreground mb-2 leading-snug">
                Got a positive test?
              </h2>
              <p className="font-serif italic text-foreground/68 text-[15px] leading-[1.6] mb-5 max-w-[52ch]">
                When you are ready, you can move into pregnancy guidance and
                estimate your due date.
              </p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                <Link
                  to="/due-date-calculator"
                  className="inline-flex items-center gap-2 rounded-pill px-5 py-2.5 font-sans text-sm font-medium text-white shadow-cta hover:opacity-90 transition-opacity"
                  style={{ background: "hsl(var(--stage-pregnancy-accent))" }}
                >
                  Use the due date calculator <ArrowRight size={14} />
                </Link>
                <Link
                  to="/pregnancy"
                  className="font-sans text-[13.5px] text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
                >
                  Explore pregnancy guidance
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MyTTCJourney;

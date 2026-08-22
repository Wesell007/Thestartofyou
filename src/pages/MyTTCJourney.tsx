import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import SeoHead from "@/components/seo/SeoHead";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  getActiveTTCJourney,
  deleteTTCJourney,
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
import { getAllTTCLogsForJourney, type TTCLog, type TTCLogType } from "@/lib/ttcLogs";
import { computeTTCInsights } from "@/lib/ttcInsights";
import TTCJourneySummary from "@/components/ttc/journey/TTCJourneySummary";
import TTCJourneyTimeline from "@/components/ttc/journey/TTCJourneyTimeline";
import TTCTodayCard from "@/components/ttc/journey/TTCTodayCard";
import TTCJourneyFocusCard from "@/components/ttc/journey/TTCJourneyFocusCard";
import TTCJourneyGuidance from "@/components/ttc/journey/TTCJourneyGuidance";
import TTCLogEntryPanel from "@/components/ttc/journey/TTCLogEntryPanel";
import TTCNotesSection from "@/components/ttc/journey/TTCNotesSection";

import TTCJourneyInsights from "@/components/ttc/journey/TTCJourneyInsights";
import TTCPregnancyHandover from "@/components/ttc/journey/TTCPregnancyHandover";
import TTCJourneyHeader from "@/components/ttc/journey/TTCJourneyHeader";
import PageLoadState from "@/components/shared/PageLoadState";
import { parseDateOnly } from "@/lib/dateOnly";
import { toast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  TTC_CARD_BODY,
  TTC_CARD_PAD,
  TTC_EYEBROW,
  TTC_FOCUS_RING,
  TTC_HEADING,
  TTC_HELPER,
  TTC_OLIVE_PILL,
  TTC_OUTLINE_PILL,
  TTC_PAPER_CARD,
  TTC_PAPER_CARD_WARM,
  TTC_SOFT_PILL,
} from "@/components/ttc/journey/ttcStyles";
import { TTCBotanicalSprig, TTCBotanicalLeaf } from "@/components/ttc/journey/TTCDecor";

type Status = "loading" | "error" | "empty" | "pregnancy_active" | "ready";


const todayIso = () => format(new Date(), "yyyy-MM-dd");

const MyTTCJourney = () => {
  const [status, setStatus] = useState<Status>("loading");
  const [journey, setJourney] = useState<ActiveTTCJourney | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [logs, setLogs] = useState<TTCLog[]>([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const [panelDate, setPanelDate] = useState<string>(todayIso());
  const [panelType, setPanelType] = useState<TTCLogType | undefined>(undefined);
  const [panelValue, setPanelValue] = useState<string | undefined>(undefined);
  const [editing, setEditing] = useState<TTCLog | null>(null);
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [logError, setLogError] = useState<string | null>(null);
  const [deletingJourney, setDeletingJourney] = useState(false);
  const viewedRef = useRef(false);


  useEffect(() => {
    let cancelled = false;
    (async () => {
      setStatus("loading");
      try {
      const { data, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;
      const user = data.session?.user;
      if (!user) return; // ProtectedRoute handles redirect.

      // Check pointer first to detect an active pregnancy journey we should
      // not overwrite or replace.
      const { data: pointer, error: pointerError } = await supabase
        .from("journeys")
        .select("lifecycle")
        .eq("user_id", user.id)
        .maybeSingle();
      if (pointerError) throw pointerError;

      if (cancelled) return;

      if (pointer?.lifecycle === "pregnancy") {
        setStatus("pregnancy_active");
        return;
      }

      const row = await getActiveTTCJourney(user.id, { throwOnError: true });
      if (cancelled) return;
      if (!row) {
        setStatus("empty");
        return;
      }
      setJourney(row);
      setUserId(user.id);
      const history = await getAllTTCLogsForJourney(user.id, row.id);
      if (!cancelled) {
        setLogs(history);
        setStatus("ready");
      }
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [loadAttempt]);

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
      const lmp = parseDateOnly(journey.last_period_date);
      if (!lmp) return (journey.stage as TTCStage | null) ?? null;
      const derived = deriveTTCDates(lmp, journey.cycle_length_days);
      return computeTTCStage(new Date(), derived);
    } catch {
      return (journey.stage as TTCStage | null) ?? null;
    }
  }, [journey]);

  const cycleDay = useMemo(() => {
    if (!journey?.last_period_date) return null;
    const lmp = parseDateOnly(journey.last_period_date);
    return lmp ? cycleDayFrom(lmp, new Date()) : null;
  }, [journey]);

  const refetchLogs = useCallback(async () => {
    if (!userId || !journey) return;
    setLogError(null);
    try {
      const history = await getAllTTCLogsForJourney(userId, journey.id);
      setLogs(history);
    } catch {
      setLogError("Your change was saved, but the log list could not be refreshed. Try again to update the view.");
    }
  }, [userId, journey]);

  const openPanelForDate = (dateIso: string) => {
    setEditing(null);
    setPanelType(undefined);
    setPanelValue(undefined);
    setPanelDate(dateIso);
    setPanelOpen(true);
  };

  const openPanelForQuickAdd = (type: TTCLogType, value?: string) => {
    setEditing(null);
    setPanelType(type);
    setPanelValue(value);
    setPanelDate(todayIso());
    setPanelOpen(true);
  };


  const openPanelForEdit = (log: TTCLog) => {
    setEditing(log);
    setPanelDate(log.log_date);
    setPanelOpen(true);
  };

  const handoverRef = useRef<HTMLElement | null>(null);
  const scrollToHandover = useCallback(() => {
    handoverRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const insights = useMemo(() => {
    if (!journey) return [];
    return computeTTCInsights({ stage: derivedStage, journey, logs });
  }, [journey, derivedStage, logs]);




  if (status === "loading") {
    return <PageLoadState message="Loading your TTC journey…" />;
  }

  if (status === "error") {
    return <PageLoadState error="We couldn't load your TTC journey. Your saved data has not been changed." onRetry={() => setLoadAttempt((n) => n + 1)} />;
  }

  if (status === "pregnancy_active") {
    return (
      <div className="min-h-screen ttc-app-surface">
        <TTCJourneyHeader />
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
      <div className="min-h-screen ttc-app-surface">
        <TTCJourneyHeader />
        <div className="container mx-auto px-5 sm:px-6 max-w-xl py-16 md:py-24 text-center">
          <p className={`${TTC_EYEBROW} mb-3`}>My TTC journey</p>
          <h1 className={`${TTC_HEADING} text-3xl md:text-[2.25rem] mb-3`}>
            Let's set up your TTC journey
          </h1>
          <p className={`${TTC_HELPER} mx-auto mb-8 max-w-md`}>
            Add your cycle details so we can gently show where you may be in
            your current cycle and what may be useful next.
          </p>
          <Link to="/setup/trying-to-conceive" className={TTC_OLIVE_PILL}>
            Set up your TTC journey <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    );
  }

  if (!journey) return <PageLoadState error="We couldn't prepare your TTC journey." onRetry={() => setLoadAttempt((n) => n + 1)} />;

  const removeJourney = async () => {
    if (!userId || deletingJourney) return;
    setDeletingJourney(true);
    try {
      await deleteTTCJourney(userId);
      setJourney(null);
      setLogs([]);
      setStatus("empty");
      toast({ title: "TTC journey removed" });
    } catch {
      toast({ title: "Could not remove journey", description: "Nothing was removed. Please try again.", variant: "destructive" });
    } finally {
      setDeletingJourney(false);
    }
  };

  return (
    <div className="relative min-h-screen ttc-app-surface">
      <TTCJourneyHeader />
      <SeoHead
        title="My TTC journey | The Start of You"
        description="Your saved trying to conceive journey."
        canonical="https://thestartofyou.com/my-ttc-journey"
        noindex
      />
      <main className="relative mx-auto w-full max-w-[880px] px-5 sm:px-8 md:px-10 pt-16 sm:pt-20 lg:pt-24 pb-20 sm:pb-24">
        {/* Header */}
        <header className={`relative overflow-hidden ${TTC_PAPER_CARD_WARM} ${TTC_CARD_PAD} mb-10 sm:mb-12`}>
          <TTCBotanicalSprig
            className="-top-8 -right-10 w-[170px] rotate-[10deg]"
            opacity={0.24}
          />
          <div className="relative">
            <p className={`${TTC_EYEBROW} mb-3`}>My TTC journey</p>
            <h1 className={`${TTC_HEADING} text-[30px] sm:text-[2.25rem] md:text-[2.5rem] mb-3`}>
              Your TTC journey
            </h1>
            <p className="font-serif italic text-[16px] sm:text-[17px] leading-[1.65] text-[hsl(var(--stage-ttc-text-soft))] max-w-[54ch]">
              A calm view of where you may be in this cycle, what may help next
              and where to find support.
            </p>
          </div>
        </header>

        {/* Today */}
        <section className="mb-10 sm:mb-12">
          <TTCTodayCard
            journey={journey}
            stage={derivedStage}
            cycleDay={cycleDay}
            onAddNote={() => openPanelForDate(todayIso())}
          />
        </section>

        {/* Cycle path */}
        <section className="mb-10 sm:mb-12">
          <TTCJourneyTimeline journey={journey} />
        </section>

        {/* What may be useful today */}
        <section className="mb-10 sm:mb-12">
          <TTCJourneyFocusCard stage={derivedStage} />
        </section>

        {/* Cycle details */}
        <section className="mb-10 sm:mb-12">
          <TTCJourneySummary journey={journey} cycleDay={cycleDay} stage={derivedStage} />
        </section>

        {/* Private cycle notes */}
        <section className="mb-10 sm:mb-12">
          <TTCNotesSection
            journey={journey}
            logs={logs}
            logError={logError}
            onRetry={refetchLogs}
            onQuickAdd={openPanelForQuickAdd}
            onSelectDate={openPanelForDate}
            onAddForToday={() => openPanelForDate(todayIso())}
            onEdit={openPanelForEdit}
            onDeleted={refetchLogs}
          />
        </section>


        {/* Gentle insights */}
        <section className="mb-10 sm:mb-12">
          <TTCJourneyInsights
            insights={insights}
            onOpenLogPanel={() => openPanelForDate(todayIso())}
            onScrollToHandover={scrollToHandover}
          />
        </section>




        {/* Guidance */}
        <section className="mb-10 sm:mb-12">
          <TTCJourneyGuidance stage={derivedStage} journey={journey} />
        </section>


        {/* Ask */}
        <section className={`relative overflow-hidden ${TTC_PAPER_CARD_WARM} ${TTC_CARD_PAD} mb-10 sm:mb-12`}>
          <TTCBotanicalLeaf className="-bottom-10 -right-6 w-[150px]" opacity={0.28} />
          <div className="relative">
            <p className={`${TTC_EYEBROW} mb-3`}>Ask Cindy</p>
            <h2 className={`${TTC_HEADING} text-[21px] sm:text-[23px] mb-2`}>
              Ask about this part of your cycle
            </h2>
            <p className={`${TTC_CARD_BODY} mb-5`}>
              Ask a question about timing, testing, what you have noticed or what
              may help next.
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
              className={TTC_SOFT_PILL}
            >
              Ask a TTC question <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </section>

        {/* Update setup */}
        <section className={`${TTC_PAPER_CARD} ${TTC_CARD_PAD} mb-10 sm:mb-12`}>
          <p className={`${TTC_EYEBROW} mb-3`}>Keep it current</p>
          <h2 className={`${TTC_HEADING} text-[21px] sm:text-[23px] mb-2`}>
            Need to update your cycle?
          </h2>
          <p className={`${TTC_CARD_BODY} mb-5`}>
            If your period started, your cycle length changed or something no
            longer looks right, you can update your TTC setup.
          </p>
          <Link
            to="/setup/trying-to-conceive"
            className={TTC_OUTLINE_PILL}
          >
            Update TTC setup <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </section>

        {/* Pregnancy handover */}
        <TTCPregnancyHandover ref={handoverRef} journey={journey} />

        <section className="mt-12 border-t border-[hsl(var(--stage-ttc-edge))] pt-6">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                type="button"
                disabled={deletingJourney}
                className={`inline-flex min-h-11 items-center rounded-sm font-sans text-sm text-destructive underline underline-offset-4 disabled:opacity-50 ${TTC_FOCUS_RING}`}
              >
                {deletingJourney ? "Removing journey…" : "Remove my TTC journey"}
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="font-serif">
                  Remove your TTC journey?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This removes your saved cycle details and every note you have
                  added. It cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Keep my journey</AlertDialogCancel>
                <AlertDialogAction onClick={removeJourney}>
                  Remove journey
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </section>

      </main>

      {userId && journey && (
        <TTCLogEntryPanel
          open={panelOpen}
          onOpenChange={(o) => {
            setPanelOpen(o);
            if (!o) setEditing(null);
          }}
          userId={userId}
          journeyId={journey.id}
          initialDate={panelDate}
          initialType={panelType}
          initialValue={panelValue}
          editing={editing}
          onSaved={refetchLogs}
        />
      )}
    </div>
  );
};


export default MyTTCJourney;

import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import SeoHead from "@/components/seo/SeoHead";
import MyWeekHeader from "@/components/myweek/MyWeekHeader";
import MyWeekFooter from "@/components/myweek/MyWeekFooter";
import PageLoadState from "@/components/shared/PageLoadState";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import NoteField from "@/components/firstyear/today/NoteField";
import BabySelector, { ALL_BABIES } from "@/components/firstyear/today/BabySelector";
import QuickAddRow from "@/components/firstyear/today/QuickAddRow";
import LogSheet from "@/components/firstyear/today/LogSheet";
import TodaySoFar from "@/components/firstyear/today/TodaySoFar";
import ActiveCard from "@/components/firstyear/today/ActiveCard";
import RhythmTimeline from "@/components/firstyear/today/RhythmTimeline";
import RecentDays from "@/components/firstyear/today/RecentDays";

import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  canEnterFirstYearSetup,
  getActiveFirstYearJourney,
  getBabies,
  type BabyRecord,
} from "@/lib/firstYearJourney";
import { FIRST_YEAR_SETUP_ROUTE } from "@/components/firstyear/setup/firstYearSetupConstants";
import { describeBabies } from "@/lib/firstYearCopy";
import { localDateKey, validateEntryDraft } from "@/lib/firstYearEntriesSchema";
import { getEntriesForDate, saveEntry, type FirstYearEntry } from "@/lib/firstYearEntries";
import BreastTimer from "@/components/firstyear/today/BreastTimer";
import {
  deleteCareEvent,
  endBreastFeed,
  getCareEventsForDay,
  getRecentCareEvents,
  getRunningFeeds,
  getRunningSleeps,
  pauseBreastFeed,
  resumeBreastFeed,
  saveCareEvent,
  startBreastFeed,
  startSleep,
  stopSleep,
  switchFeedSide,
  updateCareEvent,
} from "@/lib/firstYearCareEvents";
import {
  CARE_EVENT_LABELS,
  readAmountUnit,
  summariseDay,
  writeAmountUnit,
  type AmountUnit,
  type CareEvent,
  type CareEventPayload,
  type FeedSide,
  type QuickAddType,
} from "@/lib/firstYearCareEventsSchema";
import { parseDateOnly } from "@/lib/dateOnly";
import {
  FY_CARD_RADIUS,
  FY_FOCUS_RING,
  FY_SHADOW_SOFT,
} from "@/components/firstyear/journey/firstYearStyles";

/** Sensitive pregnancy states are never routed into a baby surface. */
const SENSITIVE_PREGNANCY_STATUSES = new Set(["pregnancy_loss", "no_longer_pregnant", "paused"]);

/**
 * The parent lane is a single optional note for the day. It is stored on the
 * existing daily check-in table, so notes saved before this page changed stay
 * exactly where they were.
 */
const DAY_NOTE_KIND = "wellbeing" as const;
const DAY_NOTE_FIELD_ID = "fy-day-note";

const SAVE_BUTTON_CLASS = `inline-flex min-h-11 items-center rounded-pill border border-border/60 bg-parchment px-5 py-2 font-sans text-[13px] text-foreground/85 transition-colors hover:border-foreground/25 disabled:opacity-60 ${FY_FOCUS_RING}`;

const INLINE_ACTION_CLASS = `inline-flex min-h-11 items-center rounded-sm font-sans text-[13px] text-foreground/65 underline underline-offset-4 hover:text-foreground ${FY_FOCUS_RING}`;

type Loaded = {
  userId: string;
  babies: BabyRecord[];
};

const FirstYearToday = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loaded, setLoaded] = useState<Loaded | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [target, setTarget] = useState<string>("");
  const [events, setEvents] = useState<CareEvent[]>([]);
  const [recentEvents, setRecentEvents] = useState<CareEvent[]>([]);
  const [runningSleeps, setRunningSleeps] = useState<CareEvent[]>([]);
  const [runningFeeds, setRunningFeeds] = useState<CareEvent[]>([]);
  const [unit, setUnit] = useState<AmountUnit>("ml");
  const [sheetType, setSheetType] = useState<QuickAddType | null>(null);
  const [feedBusy, setFeedBusy] = useState(false);
  const [editing, setEditing] = useState<CareEvent | null>(null);
  const [pendingDelete, setPendingDelete] = useState<CareEvent | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [stopping, setStopping] = useState(false);
  const [dayNote, setDayNote] = useState("");
  const [dayNoteSaved, setDayNoteSaved] = useState(false);
  const [savingNote, setSavingNote] = useState(false);
  const [status, setStatus] = useState("");

  const today = useMemo(() => localDateKey(), []);
  const retry = useCallback(() => setAttempt((a) => a + 1), []);

  useEffect(() => {
    setUnit(readAmountUnit());
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoadError(null);
      try {
        const { data: auth, error: authError } = await supabase.auth.getUser();
        if (authError || !auth.user) {
          navigate("/auth", { replace: true });
          return;
        }
        const userId = auth.user.id;

        const { data: pointer, error: pointerError } = await supabase
          .from("journeys")
          .select("lifecycle")
          .eq("user_id", userId)
          .maybeSingle();
        if (pointerError) throw pointerError;
        if (cancelled) return;

        if (!pointer) {
          navigate("/due-date-calculator", { replace: true });
          return;
        }
        if (pointer.lifecycle === "ttc") {
          navigate("/my-ttc-journey", { replace: true });
          return;
        }
        if (pointer.lifecycle === "pregnancy") {
          const { data: pregnancy, error: pregnancyError } = await supabase
            .from("pregnancy_journeys")
            .select("status")
            .eq("user_id", userId)
            .maybeSingle();
          if (pregnancyError) throw pregnancyError;
          if (cancelled) return;
          const status = pregnancy?.status ?? null;
          if (canEnterFirstYearSetup(status)) {
            navigate(FIRST_YEAR_SETUP_ROUTE, { replace: true });
          } else if (status && SENSITIVE_PREGNANCY_STATUSES.has(status)) {
            // A sensitive chapter is held gently on the journey page, never a
            // baby care surface.
            navigate("/my-journey", { replace: true });
          } else {
            navigate("/my-week", { replace: true });
          }
          return;
        }
        if (pointer.lifecycle !== "first_year") {
          navigate("/due-date-calculator", { replace: true });
          return;
        }

        const [journey, babies] = await Promise.all([
          getActiveFirstYearJourney(userId, { throwOnError: true }),
          getBabies(userId, { throwOnError: true }),
        ]);
        if (cancelled) return;
        if (!journey || babies.length === 0) {
          navigate(FIRST_YEAR_SETUP_ROUTE, { replace: true });
          return;
        }

        const [dayEvents, recent, running, feeds, entries] = await Promise.all([
          getCareEventsForDay(userId, today),
          getRecentCareEvents(userId, 7),
          getRunningSleeps(userId),
          getRunningFeeds(userId),
          getEntriesForDate(userId, today),
        ]);
        if (cancelled) return;

        const existingNote = entries.find(
          (entry) => entry.kind === DAY_NOTE_KIND && entry.baby_id === null,
        );
        setTarget(babies.length > 1 ? babies[0].id : babies[0].id);
        setEvents(dayEvents);
        setRecentEvents(recent);
        setRunningSleeps(running);
        setRunningFeeds(feeds);
        setDayNote(existingNote?.note ?? "");
        setDayNoteSaved(Boolean(existingNote));
        setLoaded({ userId, babies });
      } catch {
        if (!cancelled) setLoadError("We couldn't open today just now.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate, attempt, today]);

  const refresh = useCallback(
    async (userId: string) => {
      const [dayEvents, recent, running, feeds] = await Promise.all([
        getCareEventsForDay(userId, today),
        getRecentCareEvents(userId, 7),
        getRunningSleeps(userId),
        getRunningFeeds(userId),
      ]);
      setEvents(dayEvents);
      setRecentEvents(recent);
      setRunningSleeps(running);
      setRunningFeeds(feeds);
    },
    [today],
  );

  const babyName = useCallback(
    (babyId: string): string => {
      if (!loaded) return "Your baby";
      const index = loaded.babies.findIndex((baby) => baby.id === babyId);
      const baby = loaded.babies[index];
      if (!baby) return "Your baby";
      return baby.name?.trim() ? baby.name.trim() : `Baby ${baby.birth_order ?? index + 1}`;
    },
    [loaded],
  );

  const handleUnitChange = (next: AmountUnit) => {
    setUnit(next);
    writeAmountUnit(next);
  };

  const closeSheet = () => {
    setSheetType(null);
    setEditing(null);
  };

  const handleQuickAdd = (type: QuickAddType) => {
    setEditing(null);
    setSheetType(type);
  };

  const handleSubmit = async (payload: CareEventPayload) => {
    if (!loaded) return;
    try {
      if (editing) {
        await updateCareEvent(loaded.userId, editing.id, payload);
      } else {
        await saveCareEvent(loaded.userId, payload);
      }
      await refresh(loaded.userId);
      const label = CARE_EVENT_LABELS[payload.event_type];
      setStatus(`${label} saved`);
      toast({ title: editing ? `${label} updated` : `${label} saved` });
      closeSheet();
    } catch (error) {
      const message =
        typeof error === "object" && error && "code" in error && (error as { code: string }).code === "23505"
          ? "There is already a timer running for this baby."
          : "We couldn't save that just now. Please try again.";
      toast({ title: message });
    }
  };

  const handleStopSleep = async (event: CareEvent) => {
    if (!loaded || stopping) return;
    setStopping(true);
    try {
      await stopSleep(loaded.userId, event.id);
      await refresh(loaded.userId);
      setStatus("Sleep saved");
      toast({ title: "Sleep saved" });
    } catch {
      toast({ title: "We couldn't save that just now. Please try again." });
    } finally {
      setStopping(false);
    }
  };

  const handleStartSleep = async (babyId?: string) => {
    if (!loaded) return;
    const id = babyId || target || loaded.babies[0]?.id;
    if (!id) return;
    try {
      await startSleep(loaded.userId, id);
      await refresh(loaded.userId);
      setStatus("Sleep started");
      toast({ title: "Sleep started" });
      closeSheet();
    } catch (error) {
      const duplicate =
        typeof error === "object" && error && "code" in error && (error as { code: string }).code === "23505";
      toast({
        title: duplicate
          ? "There is already a sleep running for this baby."
          : "We couldn't start that just now. Please try again.",
      });
    }
  };

  const handleStartBreastFeed = async (babyId: string, side: FeedSide) => {
    if (!loaded) return;
    try {
      await startBreastFeed(loaded.userId, babyId, side);
      await refresh(loaded.userId);
      setStatus("Feed started");
      toast({ title: "Feed started" });
      closeSheet();
    } catch (error) {
      const duplicate =
        typeof error === "object" && error && "code" in error && (error as { code: string }).code === "23505";
      toast({
        title: duplicate
          ? "There is already a feed running for this baby."
          : "We couldn't start that just now. Please try again.",
      });
    }
  };

  const runFeedAction = async (
    action: () => Promise<unknown>,
    message: string,
  ) => {
    if (!loaded || feedBusy) return;
    setFeedBusy(true);
    try {
      await action();
      await refresh(loaded.userId);
      setStatus(message);
    } catch {
      toast({ title: "We couldn't save that just now. Please try again." });
    } finally {
      setFeedBusy(false);
    }
  };

  const confirmDelete = async () => {
    if (!loaded || !pendingDelete) return;
    setDeleting(true);
    try {
      await deleteCareEvent(loaded.userId, pendingDelete.id);
      await refresh(loaded.userId);
      toast({ title: "Removed" });
      setPendingDelete(null);
    } catch {
      toast({ title: "We couldn't remove that just now." });
    } finally {
      setDeleting(false);
    }
  };

  const handleSaveDayNote = async () => {
    if (!loaded || savingNote) return;
    const check = validateEntryDraft(
      { lane: "parent", kind: DAY_NOTE_KIND, babyId: null, entryDate: today, note: dayNote },
      { today },
    );
    if (check.ok !== true) {
      toast({ title: check.message });
      return;
    }
    setSavingNote(true);
    try {
      await saveEntry({
        userId: loaded.userId,
        kind: DAY_NOTE_KIND,
        babyId: null,
        entryDate: today,
        note: check.note,
      });
      setDayNoteSaved(true);
      setStatus("Note saved");
      toast({ title: "Note saved" });
    } catch {
      toast({ title: "We couldn't save that just now. Please try again." });
    } finally {
      setSavingNote(false);
    }
  };

  if (!loaded) {
    return (
      <PageLoadState
        message="Loading today…"
        error={loadError}
        onRetry={loadError ? retry : undefined}
      />
    );
  }

  const multiples = loaded.babies.length > 1;
  const scopedEvents = multiples && target !== ALL_BABIES
    ? events.filter((event) => event.baby_id === target)
    : events;
  const summary = summariseDay(scopedEvents);
  const runningSleep =
    runningSleeps.find((event) => !multiples || target === ALL_BABIES || event.baby_id === target) ??
    null;
  const runningFeed =
    runningFeeds.find((event) => !multiples || target === ALL_BABIES || event.baby_id === target) ??
    null;
  const latest = scopedEvents[0] ?? null;
  const scopeLabel = multiples
    ? target === ALL_BABIES
      ? "All babies"
      : babyName(target)
    : babyName(loaded.babies[0].id);

  const earlier = recentEvents.filter((event) => {
    const key = format(new Date(event.occurred_at), "yyyy-MM-dd");
    return key !== today;
  });
  const earlierByDate = earlier.reduce<Record<string, CareEvent[]>>((acc, event) => {
    const key = format(new Date(event.occurred_at), "yyyy-MM-dd");
    (acc[key] ||= []).push(event);
    return acc;
  }, {});
  const earlierDates = Object.keys(earlierByDate).sort().reverse();

  return (
    <div className="min-h-screen bg-fy-today">
      <SeoHead
        title="Today's rhythm | The Start of You"
        description="A private daily space to log feeds, sleep, nappies and moments through your first year."
        canonical="https://thestartofyou.com/my-first-year/today"
        noindex
      />
      <MyWeekHeader />
      <main className="relative mx-auto w-full max-w-[720px] px-4 sm:px-8 md:px-10 pt-16 sm:pt-20 pb-6">
        <div className="pb-6">
          <Link to="/my-first-year" className={INLINE_ACTION_CLASS}>
            Back to First Year
          </Link>
        </div>

        <header className="pb-8">
          <p
            className="font-sans text-[10.5px] font-medium tracking-[0.3em] uppercase mb-4"
            style={{ color: "hsl(var(--stage-firstyear-accent))" }}
          >
            {format(parseDateOnly(today) ?? new Date(), "EEEE d MMMM")}
          </p>
          <h1 className="font-serif text-[2rem] sm:text-[2.35rem] leading-[1.15] text-foreground mb-3">
            Today's rhythm
          </h1>
          <p className="font-sans text-[15px] leading-[1.75] text-[hsl(var(--stage-firstyear-text))] max-w-[54ch]">
            A private place to log how the day has gone for {describeBabies(loaded.babies)}. Log as
            much or as little as you like. This is just here to help you remember the day.
          </p>
        </header>

        {multiples && (
          <div className="pb-2">
            <BabySelector
              babies={loaded.babies}
              value={target}
              onChange={setTarget}
              legend="Whose day are you looking at?"
              hint="Switch between them at any time. Everything you log stays with the baby you chose."
            />

          </div>
        )}

        <p className="sr-only" role="status" aria-live="polite">
          {status}
        </p>

        <QuickAddRow onAdd={handleQuickAdd} />

        {!runningSleep && (
          <div className="pb-8 -mt-4">
            <button type="button" onClick={() => handleStartSleep()} className={INLINE_ACTION_CLASS}>
              Start a sleep now for {multiples && target === ALL_BABIES ? babyName(loaded.babies[0].id) : scopeLabel}
            </button>
          </div>
        )}

        <TodaySoFar summary={summary} unit={unit} scopeLabel={scopeLabel} />

        <ActiveCard
          runningSleep={runningSleep}
          latest={runningFeed ? null : latest}
          babyName={babyName}
          unit={unit}
          onStopSleep={handleStopSleep}
          stopping={stopping}
        />

        {runningFeed && (
          <BreastTimer
            feed={runningFeed}
            babyLabel={babyName(runningFeed.baby_id)}
            busy={feedBusy}
            onSwitch={(side) =>
              runFeedAction(() => switchFeedSide(loaded.userId, runningFeed, side), "Side switched")
            }
            onPause={() =>
              runFeedAction(() => pauseBreastFeed(loaded.userId, runningFeed), "Feed paused")
            }
            onResume={(side) =>
              runFeedAction(() => resumeBreastFeed(loaded.userId, runningFeed, side), "Feed resumed")
            }
            onEnd={() =>
              runFeedAction(() => endBreastFeed(loaded.userId, runningFeed), "Feed saved")
            }
          />
        )}

        <RhythmTimeline
          events={scopedEvents}
          babyName={babyName}
          showBabyName={multiples}
          unit={unit}
          onEdit={(event) => {
            setEditing(event);
            if (event.event_type !== "pump") setSheetType(event.event_type);
          }}
          onDelete={(event) => setPendingDelete(event)}
        />

        <section className="pb-8" aria-labelledby="fy-day-note-heading">
          <div
            className={`${FY_CARD_RADIUS} border px-5 py-6 sm:px-6`}
            style={{
              borderColor: "hsl(var(--stage-firstyear-accent) / 0.18)",
              backgroundColor: "hsl(var(--card) / 0.86)",
              boxShadow: FY_SHADOW_SOFT,
            }}
          >
            <h2
              id="fy-day-note-heading"
              className="font-serif text-[1.28rem] leading-[1.25] text-foreground mb-2"
            >
              A note for today
            </h2>
            <p className="font-sans text-[13.5px] leading-[1.65] text-[hsl(var(--stage-firstyear-text))] mb-4 max-w-[54ch]">
              Optional, and just for you. How the day felt, or anything you might want to mention at
              a check-up.
            </p>
            <NoteField
              fieldId={DAY_NOTE_FIELD_ID}
              label="Today in your words"
              placeholder="Steadier afternoon than yesterday…"
              value={dayNote}
              saved={dayNoteSaved}
              disabled={savingNote}
              onChange={setDayNote}
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSaveDayNote}
                disabled={savingNote}
                className={SAVE_BUTTON_CLASS}
              >
                {savingNote ? "Saving…" : dayNoteSaved ? "Update this note" : "Save this note"}
              </button>
            </div>
          </div>
        </section>


        <RecentDays byDate={earlierByDate} dates={earlierDates} />

        <div className="pb-4">
          <Link to="/my-first-year" className={INLINE_ACTION_CLASS}>
            Back to your First Year journey
          </Link>
        </div>
      </main>

      <MyWeekFooter contextual="What you log here is yours alone. If anything worries you about your baby or your own recovery, speak to your midwife, GP or health visitor." />

      <LogSheet
        open={sheetType !== null}
        eventType={sheetType ?? "note"}
        editing={editing}
        babies={loaded.babies}
        babyId={multiples ? (target === ALL_BABIES ? loaded.babies[0].id : target) : loaded.babies[0].id}
        unit={unit}
        onUnitChange={handleUnitChange}
        onClose={closeSheet}
        onSubmit={handleSubmit}
        onStartSleep={handleStartSleep}
        onStartBreastFeed={handleStartBreastFeed}
        runningSleepBabyIds={runningSleeps.map((event) => event.baby_id)}
        runningFeedBabyIds={runningFeeds.map((event) => event.baby_id)}
        onError={(message) => toast({ title: message })}
      />

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        onOpenChange={(open) => {
          if (!open) setPendingDelete(null);
        }}
        title="Remove this?"
        description="This removes the logged moment from today. You can add another whenever you like."
        confirmLabel="Remove"
        onConfirm={confirmDelete}
        busy={deleting}
      />
    </div>
  );
};

export default FirstYearToday;

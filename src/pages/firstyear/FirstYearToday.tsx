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
import {
  saveButtonLabel,
  saveConfirmation,
  targetChangeNotice,
  writingForLabel,
} from "@/components/firstyear/today/saveLabels";

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
import {
  BABY_KINDS,
  KIND_LABELS,
  PARENT_KINDS,
  laneForKind,
  localDateKey,
  validateEntryDraft,
  type BabyKind,
  type EntryKind,
  type ParentKind,
} from "@/lib/firstYearEntriesSchema";
import {
  deleteEntry,
  getEntriesForDate,
  getRecentEntries,
  saveEntry,
  saveEntryForBabies,
  type FirstYearEntry,
} from "@/lib/firstYearEntries";
import { parseDateOnly } from "@/lib/dateOnly";

/** Sensitive pregnancy states are never routed into a baby surface. */
const SENSITIVE_PREGNANCY_STATUSES = new Set(["pregnancy_loss", "no_longer_pregnant", "paused"]);

const BABY_FIELDS: { kind: BabyKind; hint: string; placeholder: string }[] = [
  {
    kind: "rhythm",
    hint: "How the day has felt overall. A sentence is plenty.",
    placeholder: "Calmer afternoon than yesterday…",
  },
  {
    kind: "feeding",
    hint: "However you are feeding, only what you want to remember.",
    placeholder: "Fed often this morning, settled after…",
  },
  {
    kind: "sleep",
    hint: "Naps, nights, or nothing at all.",
    placeholder: "Two longer naps, woke around…",
  },
  {
    kind: "nappies",
    hint: "Only if it is useful to you or to a health visitor.",
    placeholder: "Much like yesterday…",
  },
];

const PARENT_FIELDS: { kind: ParentKind; hint: string; placeholder: string }[] = [
  {
    kind: "recovery",
    hint: "How your body feels today, in your own words.",
    placeholder: "Moving a little more easily…",
  },
  {
    kind: "wellbeing",
    hint: "However you are feeling. There is no right answer here.",
    placeholder: "Tired, but steadier than last week…",
  },
  {
    kind: "rest_support",
    hint: "Rest you managed, or help you would like to ask for.",
    placeholder: "An hour while she slept…",
  },
  {
    kind: "question",
    hint: "Something to raise with your midwife, GP or health visitor.",
    placeholder: "Ask about feeding at the next check…",
  },
];

const fieldId = (kind: EntryKind) => `fy-note-${kind}`;

/** Shared button styling for the per-field save controls. */
const SAVE_BUTTON_CLASS =
  "inline-flex min-h-11 items-center rounded-pill border border-border/60 bg-parchment px-5 py-2 font-sans text-[13px] text-foreground/85 transition-colors hover:border-foreground/25 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const INLINE_ACTION_CLASS =
  "inline-flex min-h-11 items-center font-sans text-[12.5px] text-foreground/60 underline underline-offset-4 hover:text-foreground/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-background";


type Loaded = {
  userId: string;
  babies: BabyRecord[];
};

type Drafts = Record<string, string>;

const draftKey = (kind: EntryKind, babyId: string | null) => `${kind}:${babyId ?? "self"}`;

const FirstYearToday = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loaded, setLoaded] = useState<Loaded | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [target, setTarget] = useState<string>("");
  const [drafts, setDrafts] = useState<Drafts>({});
  const [todaysEntries, setTodaysEntries] = useState<FirstYearEntry[]>([]);
  const [recent, setRecent] = useState<FirstYearEntry[]>([]);
  const [savingKind, setSavingKind] = useState<EntryKind | null>(null);
  const [justSavedKind, setJustSavedKind] = useState<EntryKind | null>(null);
  const [pendingDelete, setPendingDelete] = useState<FirstYearEntry | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [babyStatus, setBabyStatus] = useState("");
  const [parentStatus, setParentStatus] = useState("");
  const [targetNotice, setTargetNotice] = useState("");

  const today = useMemo(() => localDateKey(), []);
  const retry = useCallback(() => setAttempt((a) => a + 1), []);


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
            // baby tracking surface.
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

        const [entries, recentEntries] = await Promise.all([
          getEntriesForDate(userId, today),
          getRecentEntries(userId, 7),
        ]);
        if (cancelled) return;

        const initialTarget = babies.length > 1 ? ALL_BABIES : babies[0].id;
        setTarget(initialTarget);
        setTodaysEntries(entries);
        setRecent(recentEntries);
        setDrafts(
          Object.fromEntries(
            entries.map((entry) => [draftKey(entry.kind, entry.baby_id), entry.note ?? ""]),
          ),
        );
        setLoaded({ userId, babies });
      } catch {
        if (!cancelled) setLoadError("We couldn't open today's notes just now.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate, attempt, today]);

  const earliestDob = useMemo(() => {
    if (!loaded) return null;
    return loaded.babies
      .map((baby) => baby.date_of_birth)
      .filter(Boolean)
      .sort()[0] ?? null;
  }, [loaded]);

  const babyIdsForTarget = useMemo(() => {
    if (!loaded) return [];
    if (loaded.babies.length < 2) return [loaded.babies[0]?.id].filter(Boolean) as string[];
    return target === ALL_BABIES ? loaded.babies.map((baby) => baby.id) : [target];
  }, [loaded, target]);

  const refresh = useCallback(async (userId: string) => {
    const [entries, recentEntries] = await Promise.all([
      getEntriesForDate(userId, today),
      getRecentEntries(userId, 7),
    ]);
    setTodaysEntries(entries);
    setRecent(recentEntries);
  }, [today]);

  const babyDraftKey = (kind: BabyKind) =>
    draftKey(kind, loaded && loaded.babies.length > 1 ? (target || ALL_BABIES) : babyIdsForTarget[0] ?? null);

  const nameForBaby = (babyId: string | null): string => {
    if (!babyId || !loaded) return "You";
    const index = loaded.babies.findIndex((baby) => baby.id === babyId);
    const baby = loaded.babies[index];
    if (!baby) return "Your baby";
    return baby.name?.trim() ? baby.name.trim() : `Baby ${baby.birth_order ?? index + 1}`;
  };

  /** True when a note is already stored today for this field and target. */
  const hasSavedFor = (kind: EntryKind): boolean => {
    const lane = laneForKind(kind);
    if (lane === "parent") {
      return todaysEntries.some((entry) => entry.kind === kind && entry.baby_id === null);
    }
    if (babyIdsForTarget.length === 0) return false;
    return babyIdsForTarget.every((babyId) =>
      todaysEntries.some((entry) => entry.kind === kind && entry.baby_id === babyId),
    );
  };

  const handleSave = async (kind: EntryKind) => {
    if (!loaded || savingKind) return;
    const lane = laneForKind(kind);
    const key = lane === "baby" ? babyDraftKey(kind as BabyKind) : draftKey(kind, null);
    const note = drafts[key] ?? "";
    const targets = lane === "baby" ? babyIdsForTarget : [null];
    const wasExisting = hasSavedFor(kind);

    const check = validateEntryDraft(
      {
        lane,
        kind,
        babyId: lane === "baby" ? targets[0] ?? null : null,
        entryDate: today,
        note,
      },
      { earliestDateOfBirth: earliestDob, today },
    );
    if (check.ok !== true) {
      toast({ title: check.message });
      return;
    }

    setSavingKind(kind);
    setJustSavedKind(null);
    try {
      if (lane === "baby") {
        await saveEntryForBabies({
          userId: loaded.userId,
          kind,
          entryDate: today,
          note: check.note,
          babyIds: targets as string[],
        });
      } else {
        await saveEntry({
          userId: loaded.userId,
          kind,
          babyId: null,
          entryDate: today,
          note: check.note,
        });
      }
      await refresh(loaded.userId);
      const confirmation = saveConfirmation({
        wasExisting,
        babyNames:
          lane === "baby" ? (targets as string[]).map((babyId) => nameForBaby(babyId)) : undefined,
      });
      const message = `${confirmation} · ${KIND_LABELS[kind]}`;
      setJustSavedKind(kind);
      if (lane === "baby") setBabyStatus(message);
      else setParentStatus(message);
      toast({ title: confirmation });
    } catch {
      toast({ title: "We couldn't save that just now. Please try again." });
    } finally {
      setSavingKind(null);
    }
  };

  /** Bring the matching field into view and focus it for editing. */
  const handleEdit = (entry: FirstYearEntry) => {
    if (entry.baby_id && loaded && loaded.babies.length > 1) setTarget(entry.baby_id);
    window.requestAnimationFrame(() => {
      const element = document.getElementById(fieldId(entry.kind));
      if (!element) return;
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      (element as HTMLTextAreaElement).focus({ preventScroll: true });
    });
  };


  const confirmDelete = async () => {
    if (!loaded || !pendingDelete) return;
    setDeleting(true);
    try {
      await deleteEntry(loaded.userId, pendingDelete.id);
      setDrafts((current) => ({
        ...current,
        [draftKey(pendingDelete.kind, pendingDelete.baby_id)]: "",
      }));
      await refresh(loaded.userId);
      toast({ title: "Note removed" });
      setPendingDelete(null);
    } catch {
      toast({ title: "We couldn't remove that just now." });
    } finally {
      setDeleting(false);
    }
  };

  if (!loaded) {
    return (
      <PageLoadState
        message="Loading today's notes…"
        error={loadError}
        onRetry={loadError ? retry : undefined}
      />
    );
  }

  const babyName = nameForBaby;

  const setDraft = (key: string, value: string) =>
    setDrafts((current) => ({ ...current, [key]: value }));

  const multiples = loaded.babies.length > 1;
  const allBabies = multiples && (target || ALL_BABIES) === ALL_BABIES;
  const currentBabyName = allBabies ? null : babyName(babyIdsForTarget[0] ?? null);

  const handleTargetChange = (next: string) => {
    setTarget(next);
    setJustSavedKind(null);
    setTargetNotice(
      targetChangeNotice({
        allBabies: next === ALL_BABIES,
        babyName: next === ALL_BABIES ? null : babyName(next),
      }),
    );
  };

  const earlierEntries = recent.filter((entry) => entry.entry_date !== today);
  const earlierByDate = earlierEntries.reduce<Record<string, FirstYearEntry[]>>((acc, entry) => {
    (acc[entry.entry_date] ||= []).push(entry);
    return acc;
  }, {});
  const earlierDates = Object.keys(earlierByDate).sort().reverse();


  return (
    <div
      className="min-h-screen bg-parchment-grain page-vignette"
      style={{ backgroundColor: "hsl(var(--stage-firstyear) / 0.35)" }}
    >
      <SeoHead
        title="Today's notes | The Start of You"
        description="A private, gentle daily note for your baby's rhythm and your own recovery."
        canonical="https://thestartofyou.com/my-first-year/today"
        noindex
      />
      <MyWeekHeader />
      <main className="relative mx-auto w-full max-w-[720px] px-4 sm:px-8 md:px-10 pb-6">
        <header className="pt-8 pb-8">
          <p
            className="font-sans text-[10.5px] font-medium tracking-[0.3em] uppercase mb-4"
            style={{ color: "hsl(var(--stage-firstyear-accent))" }}
          >
            {format(parseDateOnly(today) ?? new Date(), "EEEE d MMMM")}
          </p>
          <h1 className="font-serif text-[2rem] sm:text-[2.35rem] leading-[1.15] text-foreground/90 mb-3">
            Today
          </h1>
          <p className="font-serif text-[15.5px] leading-[1.75] text-foreground/80 max-w-[54ch]">
            A private space for how the day is going, for {describeBabies(loaded.babies)} and for
            you. Every field is optional. Nothing is measured, scored or compared, and it is never
            advice.
          </p>
          <Link
            to="/my-first-year"
            className={`mt-5 ${INLINE_ACTION_CLASS} text-[13px]`}
          >
            Back to your First Year journey
          </Link>
        </header>

        <section className="pb-10" aria-labelledby="lane-baby">
          <div
            className="rounded-[22px] keepsake-surface px-6 sm:px-8 py-7 sm:py-8"
            style={{ borderColor: "hsl(var(--stage-firstyear-accent) / 0.2)" }}
          >
            <h2
              id="lane-baby"
              className="font-serif text-[1.4rem] leading-[1.25] text-foreground/90 mb-2"
            >
              {multiples ? "For your babies" : "For your baby"}
            </h2>
            <p className="font-sans text-[13px] leading-[1.65] text-foreground/60 mb-6 max-w-[52ch]">
              Rhythm rather than routine. Write only what helps you remember or what you might want
              to mention at a check-up.
            </p>
            <BabySelector babies={loaded.babies} value={target} onChange={handleTargetChange} />
            {multiples && (
              <>
                <p className="font-sans text-[13px] font-medium text-foreground/75 mb-1">
                  {writingForLabel({ allBabies, babyName: currentBabyName })}
                </p>
                {targetNotice && (
                  <p className="font-sans text-[12.5px] leading-[1.6] text-foreground/55 mb-4">
                    {targetNotice}
                  </p>
                )}
              </>
            )}
            <p className="sr-only" role="status" aria-live="polite">
              {babyStatus}
            </p>
            {BABY_FIELDS.map((field) => {
              const key = babyDraftKey(field.kind);
              const saved = hasSavedFor(field.kind);
              return (
                <div key={field.kind}>
                  <NoteField
                    fieldId={fieldId(field.kind)}
                    label={KIND_LABELS[field.kind]}
                    hint={field.hint}
                    placeholder={field.placeholder}
                    value={drafts[key] ?? ""}
                    saved={saved}
                    disabled={savingKind === field.kind}
                    onChange={(value) => setDraft(key, value)}
                  />
                  <div className="-mt-2 mb-6">
                    <button
                      type="button"
                      onClick={() => handleSave(field.kind)}
                      disabled={savingKind === field.kind}
                      className={SAVE_BUTTON_CLASS}
                    >
                      {saveButtonLabel({
                        hasSaved: saved,
                        saving: savingKind === field.kind,
                        justSaved: justSavedKind === field.kind,
                      })}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="pb-10" aria-labelledby="lane-parent">
          <div
            className="rounded-[22px] keepsake-surface px-6 sm:px-8 py-7 sm:py-8"
            style={{ borderColor: "hsl(var(--stage-firstyear-accent) / 0.2)" }}
          >
            <h2
              id="lane-parent"
              className="font-serif text-[1.4rem] leading-[1.25] text-foreground/90 mb-2"
            >
              For you
            </h2>
            <p className="font-sans text-[13px] leading-[1.65] text-foreground/60 mb-6 max-w-[52ch]">
              Your recovery matters just as much. If anything worries you about how you are feeling
              physically or emotionally, speak to your midwife, GP or health visitor.
            </p>
            <p className="sr-only" role="status" aria-live="polite">
              {parentStatus}
            </p>
            {PARENT_FIELDS.map((field) => {
              const key = draftKey(field.kind, null);
              const saved = hasSavedFor(field.kind);
              return (
                <div key={field.kind}>
                  <NoteField
                    fieldId={fieldId(field.kind)}
                    label={KIND_LABELS[field.kind]}
                    hint={field.hint}
                    placeholder={field.placeholder}
                    value={drafts[key] ?? ""}
                    saved={saved}
                    disabled={savingKind === field.kind}
                    onChange={(value) => setDraft(key, value)}
                  />
                  <div className="-mt-2 mb-6">
                    <button
                      type="button"
                      onClick={() => handleSave(field.kind)}
                      disabled={savingKind === field.kind}
                      className={SAVE_BUTTON_CLASS}
                    >
                      {saveButtonLabel({
                        hasSaved: saved,
                        saving: savingKind === field.kind,
                        justSaved: justSavedKind === field.kind,
                      })}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="pb-10" aria-labelledby="saved-today">
          <div
            className="rounded-[22px] keepsake-surface px-6 sm:px-8 py-7 sm:py-8"
            style={{ borderColor: "hsl(var(--stage-firstyear-accent) / 0.2)" }}
          >
            <h2
              id="saved-today"
              className="font-serif text-[1.4rem] leading-[1.25] text-foreground/90 mb-4"
            >
              What you saved today
            </h2>
            {todaysEntries.length === 0 ? (
              <p className="font-serif text-[15px] leading-[1.7] text-foreground/70">
                Nothing saved yet today, and that is completely fine.
              </p>
            ) : (
              <ul className="space-y-4">
                {todaysEntries.map((entry) => (
                  <li key={entry.id} className="border-b border-border/40 pb-4 last:border-0 last:pb-0">
                    <p className="font-sans text-[12px] tracking-[0.12em] uppercase text-foreground/50 mb-1">
                      {KIND_LABELS[entry.kind]} · {babyName(entry.baby_id)}
                    </p>
                    <p className="font-serif text-[15px] leading-[1.7] text-foreground/85 whitespace-pre-wrap">
                      {entry.note}
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={() => handleEdit(entry)}
                        className={INLINE_ACTION_CLASS}
                      >
                        Edit this note
                      </button>
                      <button
                        type="button"
                        onClick={() => setPendingDelete(entry)}
                        className={INLINE_ACTION_CLASS}
                      >
                        Remove this note
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {earlierDates.length > 0 && (
          <section className="pb-10" aria-labelledby="recent-notes">
            <div
              className="rounded-[22px] keepsake-surface px-6 sm:px-8 py-7 sm:py-8"
              style={{ borderColor: "hsl(var(--stage-firstyear-accent) / 0.2)" }}
            >
              <h2
                id="recent-notes"
                className="font-serif text-[1.4rem] leading-[1.25] text-foreground/90 mb-2"
              >
                Recent days
              </h2>
              <p className="font-sans text-[13px] leading-[1.65] text-foreground/60 mb-5">
                The last few days you wrote something. Days with nothing written are just as fine.
              </p>
              <div className="space-y-6">
                {earlierDates.map((date) => (
                  <div key={date}>
                    <h3 className="font-sans text-[12px] tracking-[0.14em] uppercase text-foreground/55 mb-3">
                      {format(parseDateOnly(date) ?? new Date(), "EEEE d MMMM")}
                    </h3>
                    <ul className="space-y-4">
                      {earlierByDate[date].map((entry) => (
                        <li
                          key={entry.id}
                          className="border-b border-border/40 pb-4 last:border-0 last:pb-0"
                        >
                          <p className="font-sans text-[12px] tracking-[0.12em] uppercase text-foreground/50 mb-1">
                            {KIND_LABELS[entry.kind]} · {babyName(entry.baby_id)}
                          </p>
                          <p className="font-serif text-[15px] leading-[1.7] text-foreground/85 whitespace-pre-wrap">
                            {entry.note}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>
      <MyWeekFooter contextual="These notes are yours alone. If anything worries you about your baby or your own recovery, speak to your midwife, GP or health visitor." />
      <ConfirmDialog
        open={Boolean(pendingDelete)}
        onOpenChange={(open) => {
          if (!open) setPendingDelete(null);
        }}
        title="Remove this note?"
        description="This will delete the note from today. You can always write another one."
        confirmLabel="Remove note"
        busy={deleting}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default FirstYearToday;

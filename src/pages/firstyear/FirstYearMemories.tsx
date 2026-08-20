import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SeoHead from "@/components/seo/SeoHead";
import MyWeekHeader from "@/components/myweek/MyWeekHeader";
import MyWeekFooter from "@/components/myweek/MyWeekFooter";
import PageLoadState from "@/components/shared/PageLoadState";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import { type MemoryFormValues } from "@/components/firstyear/memories/MemoryForm";
import MemorySheet from "@/components/firstyear/memories/MemorySheet";
import MemoryHeroCard from "@/components/firstyear/memories/MemoryHeroCard";
import MemoryEmptyState from "@/components/firstyear/memories/MemoryEmptyState";
import MemoryList from "@/components/firstyear/memories/MemoryList";
import {
  FY_CHIP_BASE,
  FY_CHIP_IDLE,
  FY_CHIP_SELECTED,
  FY_EYEBROW,
  FY_FOCUS_RING,
} from "@/components/firstyear/journey/firstYearStyles";
import {
  FAMILY_VALUE,
  babyDisplayName,
  draftToScopeValue,
  scopeValueToDraft,
} from "@/components/firstyear/memories/MemoryScopeSelector";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  canEnterFirstYearSetup,
  getActiveFirstYearJourney,
  getBabies,
  type BabyRecord,
} from "@/lib/firstYearJourney";
import { FIRST_YEAR_SETUP_ROUTE } from "@/components/firstyear/setup/firstYearSetupConstants";
import {
  attachMemoryPhoto,
  clearMemoryPhoto,
  createMemory,
  deleteMemory,
  getMemories,
  getMemorySource,
  updateMemory,
  type FirstYearMemory,
} from "@/lib/firstYearMemories";
import { useMemoryPhotoUrls } from "@/hooks/useMemoryPhotoUrls";
import {
  MEMORY_PHOTO_ERROR_COPY,
  checkMemoryPhotoFile,
  prepareMemoryPhoto,
} from "@/lib/firstYearMemoryPhoto";
import MemoryPhotoViewer from "@/components/firstyear/memories/MemoryPhotoViewer";
import {
  localMemoryDateKey,
  validateMemoryDraft,
} from "@/lib/firstYearMemoriesSchema";

/** Sensitive pregnancy states are never routed into a baby surface. */
const SENSITIVE_PREGNANCY_STATUSES = new Set(["pregnancy_loss", "no_longer_pregnant", "paused"]);

type Loaded = {
  userId: string;
  babies: BabyRecord[];
};

/** Route state carries an id only. Note text never travels through the URL. */
type MemoriesLocationState = { sourceEntryId?: string } | null;

const FirstYearMemories = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const [loaded, setLoaded] = useState<Loaded | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [memories, setMemories] = useState<FirstYearMemory[]>([]);
  const [values, setValues] = useState<MemoryFormValues>({
    title: "",
    note: "",
    memoryDate: localMemoryDateKey(),
    scopeValue: FAMILY_VALUE,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [sourceEntryId, setSourceEntryId] = useState<string | null>(null);
  const [focusSignal, setFocusSignal] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<FirstYearMemory | null>(null);
  /** A newly chosen photo, held locally until the words are safely saved. */
  const [photoDraft, setPhotoDraft] = useState<{ file: File; previewUrl: string } | null>(null);
  /** The photo already kept on the memory being edited, if there is one. */
  const [existingPhoto, setExistingPhoto] = useState<{ path: string; url: string | null } | null>(null);
  const [photoRemoved, setPhotoRemoved] = useState(false);
  const [photoBusy, setPhotoBusy] = useState(false);
  /** Short-lived signed URLs for kept photos, keyed by stored path. */

  const [viewing, setViewing] = useState<FirstYearMemory | null>(null);
  /** The add or edit sheet. Keeping a memory is a deliberate act. */
  const [sheetOpen, setSheetOpen] = useState(false);
  /** A quiet client-side filter over the memories already loaded. */
  const [babyFilter, setBabyFilter] = useState<string>("all");
  const [deleting, setDeleting] = useState(false);
  const [status, setStatus] = useState("");

  const today = useMemo(() => localMemoryDateKey(), []);
  const retry = useCallback(() => setAttempt((a) => a + 1), []);

  /** Drop a local preview so a chosen photo never lingers in memory. */
  const releaseDraft = useCallback((draft: { previewUrl: string } | null) => {
    if (!draft) return;
    try {
      URL.revokeObjectURL(draft.previewUrl);
    } catch {
      /* ignore */
    }
  }, []);

  /**
   * Sign the photos we are about to show. Signed URLs are short-lived and are
   * never stored, exported or placed in a route. Paths that have been replaced
   * or removed are treated as an expected absence, not an error.
   */
  const { photoUrls, forgetPhotoPath } = useMemoryPhotoUrls(
    useMemo(() => memories.map((memory) => memory.photo_path), [memories]),
  );



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
          const pregnancyStatus = pregnancy?.status ?? null;
          if (canEnterFirstYearSetup(pregnancyStatus)) {
            navigate(FIRST_YEAR_SETUP_ROUTE, { replace: true });
          } else if (pregnancyStatus && SENSITIVE_PREGNANCY_STATUSES.has(pregnancyStatus)) {
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

        const saved = await getMemories(userId);
        if (cancelled) return;

        setMemories(saved);
        setValues((current) => ({
          ...current,
          scopeValue: babies.length > 1 ? FAMILY_VALUE : babies[0].id,
        }));
        setLoaded({ userId, babies });
      } catch {
        if (!cancelled) setLoadError("We couldn't open your memories just now.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate, attempt]);

  /**
   * A moment carried over from a daily note. Only the id travels; the words
   * are read back from the parent's own row and never from the URL.
   */
  useEffect(() => {
    const state = location.state as MemoriesLocationState;
    const entryId = state?.sourceEntryId;
    if (!loaded || !entryId) return;

    let cancelled = false;
    (async () => {
      try {
        const source = await getMemorySource(loaded.userId, entryId);
        if (cancelled || !source) return;
        setSourceEntryId(source.id);
        setEditingId(null);
        setValues({
          title: "",
          note: source.note,
          memoryDate: source.entry_date,
          scopeValue:
            loaded.babies.length > 1
              ? source.baby_id ?? FAMILY_VALUE
              : loaded.babies[0].id,
        });
        setFocusSignal(`source-${source.id}-${Date.now()}`);
        setSheetOpen(true);
      } catch {
        if (!cancelled) toast({ title: "We couldn't open that note just now." });
      } finally {
        if (!cancelled) navigate(location.pathname, { replace: true, state: null });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [loaded, location.state, location.pathname, navigate, toast]);

  const earliestDob = useMemo(() => {
    if (!loaded) return null;
    return (
      loaded.babies
        .map((baby) => baby.date_of_birth)
        .filter(Boolean)
        .sort()[0] ?? null
    );
  }, [loaded]);

  const resetForm = useCallback(() => {
    setEditingId(null);
    setSourceEntryId(null);
    releaseDraft(photoDraft);
    setPhotoDraft(null);
    setExistingPhoto(null);
    setPhotoRemoved(false);
    setValues({
      title: "",
      note: "",
      memoryDate: today,
      scopeValue: loaded && loaded.babies.length > 1 ? FAMILY_VALUE : loaded?.babies[0].id ?? FAMILY_VALUE,
    });
  }, [loaded, today, photoDraft, releaseDraft]);

  const handleSubmit = async () => {
    if (!loaded || saving) return;
    const { scope, babyId } = scopeValueToDraft(values.scopeValue);
    const check = validateMemoryDraft(
      { scope, babyId, memoryDate: values.memoryDate, title: values.title, note: values.note },
      { earliestDateOfBirth: earliestDob, today },
    );
    if (check.ok !== true) {
      toast({ title: check.message });
      return;
    }

    setSaving(true);
    try {
      let saved: FirstYearMemory;
      if (editingId) {
        saved = await updateMemory({
          id: editingId,
          userId: loaded.userId,
          scope: check.scope,
          babyId: check.babyId,
          memoryDate: values.memoryDate,
          title: check.title,
          note: check.note,
        });
      } else {
        saved = await createMemory({
          userId: loaded.userId,
          scope: check.scope,
          babyId: check.babyId,
          memoryDate: values.memoryDate,
          title: check.title,
          note: check.note,
          sourceEntryId,
        });
      }

      // The words are safe now. A photo problem from here never undoes them.
      let photoIssue: string | null = null;
      try {
        if (photoDraft) {
          const prepared = await prepareMemoryPhoto(photoDraft.file);
          // Forget the old path first, so the replaced object is never re-signed.
          forgetPhotoPath(saved.photo_path);
          await attachMemoryPhoto({
            userId: loaded.userId,
            memoryId: saved.id,
            prepared,
            previousPath: saved.photo_path,
          });
        } else if (photoRemoved && saved.photo_path) {
          forgetPhotoPath(saved.photo_path);
          await clearMemoryPhoto(loaded.userId, saved.id, saved.photo_path);
        }
      } catch {
        photoIssue = MEMORY_PHOTO_ERROR_COPY.uploadFailed;
      }

      const refreshed = await getMemories(loaded.userId);
      setMemories(refreshed);
      const message = editingId ? "Memory updated" : "Memory saved";
      setStatus(photoIssue ?? message);
      toast({ title: photoIssue ?? message });
      resetForm();
      setSheetOpen(false);
    } catch {
      toast({ title: "We couldn't save that just now. Please try again." });
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (memory: FirstYearMemory) => {
    setEditingId(memory.id);
    setSourceEntryId(null);
    releaseDraft(photoDraft);
    setPhotoDraft(null);
    setPhotoRemoved(false);
    setExistingPhoto(
      memory.photo_path
        ? { path: memory.photo_path, url: photoUrls[memory.photo_path] ?? null }
        : null,
    );
    setValues({
      title: memory.title ?? "",
      note: memory.note,
      memoryDate: memory.memory_date,
      scopeValue:
        loaded && loaded.babies.length > 1
          ? draftToScopeValue(memory.memory_scope, memory.baby_id)
          : loaded?.babies[0].id ?? FAMILY_VALUE,
    });
    setFocusSignal(`edit-${memory.id}-${Date.now()}`);
    setSheetOpen(true);
  };

  const handlePhotoSelect = (file: File) => {
    const check = checkMemoryPhotoFile(file);
    if (check.ok !== true) {
      toast({ title: check.message });
      return;
    }
    setPhotoBusy(true);
    try {
      releaseDraft(photoDraft);
      setPhotoDraft({ file, previewUrl: URL.createObjectURL(file) });
      setPhotoRemoved(false);
    } finally {
      setPhotoBusy(false);
    }
  };

  const handlePhotoRemove = () => {
    releaseDraft(photoDraft);
    setPhotoDraft(null);
    if (existingPhoto) setPhotoRemoved(true);
  };

  const confirmDelete = async () => {
    if (!loaded || !pendingDelete) return;
    setDeleting(true);
    try {
      const removedPath = pendingDelete.photo_path;
      await deleteMemory(loaded.userId, pendingDelete.id, removedPath);
      forgetPhotoPath(removedPath);

      if (editingId === pendingDelete.id) {
        resetForm();
        setSheetOpen(false);
      }
      const refreshed = await getMemories(loaded.userId);
      setMemories(refreshed);
      setStatus("Memory removed");
      toast({ title: "Memory removed" });
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
        message="Loading your memories…"
        error={loadError}
        onRetry={loadError ? retry : undefined}
      />
    );
  }

  const multiples = loaded.babies.length > 1;
  const scopeValue = multiples
    ? values.scopeValue === "" ? FAMILY_VALUE : values.scopeValue
    : loaded.babies[0].id;

  /** Open the sheet for a new memory, with nothing carried over. */
  const openNewMemory = () => {
    resetForm();
    setFocusSignal(null);
    setSheetOpen(true);
  };

  const closeSheet = () => {
    resetForm();
    setSheetOpen(false);
  };

  /**
   * A quiet filter over what is already on the page: memories about one baby,
   * plus the ones kept for all of them. No new queries.
   */
  const visibleMemories =
    !multiples || babyFilter === "all"
      ? memories
      : memories.filter(
          (memory) => memory.baby_id === babyFilter || memory.memory_scope === "all_babies",
        );

  const filterOptions = [
    { value: "all", label: "Everyone" },
    ...loaded.babies.map((baby, index) => ({
      value: baby.id,
      label: babyDisplayName(baby, index),
    })),
  ];

  return (
    <div
      className="min-h-screen bg-parchment-grain page-vignette"
      style={{ backgroundColor: "hsl(var(--stage-firstyear-cream))" }}
    >
      <SeoHead
        title="Memories | The Start of You"
        description="A private keepsake space for the small moments you want to look back on."
        canonical="https://thestartofyou.com/my-first-year/memories"
        noindex
      />
      <MyWeekHeader />
      <main className="relative mx-auto w-full max-w-[720px] px-4 sm:px-8 md:px-10 pt-16 sm:pt-20 pb-6">
        <div className="pb-6">
          <Link
            to="/my-first-year"
            className={`${FY_FOCUS_RING} inline-flex min-h-11 items-center rounded-sm font-sans text-[13.5px] text-[hsl(var(--stage-firstyear-text-soft))] underline underline-offset-4 transition-colors hover:text-foreground`}
          >
            Back to First Year
          </Link>
        </div>

        <header className="pb-8">
          <p
            className="font-sans text-[10.5px] font-medium tracking-[0.3em] uppercase mb-4"
            style={{ color: "hsl(var(--stage-firstyear-terracotta))" }}
          >
            Keepsakes
          </p>
          <h1 className="font-serif text-[2rem] sm:text-[2.35rem] leading-[1.15] text-foreground mb-3">
            Memories
          </h1>
          <p className="font-sans text-[15px] leading-[1.75] text-[hsl(var(--stage-firstyear-text))] max-w-[54ch]">
            Keep the small things you want to look back on. As many or as few as you like.
          </p>
        </header>

        <p className="sr-only" role="status" aria-live="polite">
          {status}
        </p>

        <section className="pb-10" aria-label="Keep a memory">
          <MemoryHeroCard onOpen={openNewMemory} />
        </section>

        {multiples && (
          <section className="pb-7" aria-label="Whose memories are you looking at?">
            <p className={`${FY_EYEBROW} mb-2.5`}>Whose memories are you looking at?</p>
            <div
              role="radiogroup"
              aria-label="Whose memories are you looking at?"
              className="flex flex-wrap gap-2"
            >
              {filterOptions.map((option) => {
                const selected = option.value === babyFilter;
                return (
                  <label
                    key={option.value}
                    className={`${FY_CHIP_BASE} ${selected ? FY_CHIP_SELECTED : FY_CHIP_IDLE}`}
                  >
                    <input
                      type="radio"
                      name="first-year-memory-filter"
                      className="sr-only"
                      value={option.value}
                      checked={selected}
                      onChange={() => setBabyFilter(option.value)}
                    />
                    {option.label}
                  </label>
                );
              })}
            </div>
          </section>
        )}

        <section className="pb-10" aria-labelledby="kept-moments">
          <h2 id="kept-moments" className="sr-only">
            What you have kept
          </h2>
          {visibleMemories.length === 0 ? (
            <MemoryEmptyState onOpen={openNewMemory} />
          ) : (
            <MemoryList
              memories={visibleMemories}
              babies={loaded.babies}
              onEdit={handleEdit}
              onRemove={setPendingDelete}
              photoUrls={photoUrls}
              onOpenPhoto={setViewing}
            />
          )}
        </section>

        <p className="pb-4 font-sans text-[12.5px] leading-[1.6] text-[hsl(var(--stage-firstyear-text-soft))]">
          Your memories stay private to you.
        </p>

        <MemorySheet
          open={sheetOpen}
          onOpenChange={(open) => {
            if (!open) closeSheet();
          }}
          babies={loaded.babies}
          values={{ ...values, scopeValue }}
          onChange={setValues}
          onSubmit={handleSubmit}
          onCancel={closeSheet}
          editing={Boolean(editingId)}
          saving={saving}
          maxDate={today}
          minDate={earliestDob}
          focusSignal={focusSignal}
          photo={{
            previewUrl: photoDraft
              ? photoDraft.previewUrl
              : photoRemoved
                ? null
                : existingPhoto
                  ? existingPhoto.url ?? (existingPhoto.path ? photoUrls[existingPhoto.path] ?? null : null)
                  : null,
            hasPhoto: Boolean(photoDraft) || (Boolean(existingPhoto) && !photoRemoved),
            busy: photoBusy,
            onSelect: handlePhotoSelect,
            onRemove: handlePhotoRemove,
          }}
        />
      </main>

      <MyWeekFooter contextual="These memories are yours alone. You can edit or remove any of them whenever you like." />
      <MemoryPhotoViewer
        open={Boolean(viewing)}
        onOpenChange={(open) => {
          if (!open) setViewing(null);
        }}
        url={viewing?.photo_path ? photoUrls[viewing.photo_path] ?? null : null}
        title={viewing?.title?.trim() || "A moment you kept"}
        hasTitle={Boolean(viewing?.title?.trim())}
      />
      <ConfirmDialog
        open={Boolean(pendingDelete)}
        onOpenChange={(open) => {
          if (!open) setPendingDelete(null);
        }}
        title="Remove this memory?"
        description={
          pendingDelete?.photo_path
            ? "This memory and its photo will be removed from your keepsakes."
            : "This memory will be removed from your keepsakes."
        }
        confirmLabel="Remove memory"
        busy={deleting}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default FirstYearMemories;

import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import SeoHead from "@/components/seo/SeoHead";
import MyWeekHeader from "@/components/myweek/MyWeekHeader";
import MyWeekFooter from "@/components/myweek/MyWeekFooter";
import PageLoadState from "@/components/shared/PageLoadState";
import AppointmentEditorForm from "@/components/pregnancy-toolkit/AppointmentEditorForm";
import { useAppointment } from "@/hooks/usePregnancyAppointments";
import {
  AppointmentDraft,
  EMPTY_DRAFT,
  appointmentToDraft,
  cleanDraft,
  isDraftEmpty,
  isWeekValid,
} from "@/lib/appointmentSchema";

const accent = "hsl(var(--stage-pregnancy-accent))";
const softBorder = "hsl(var(--stage-pregnancy-accent) / 0.16)";

const SaveStatePill = ({ state }: { state: "idle" | "saving" | "saved" | "error" }) => {
  if (state === "idle") return null;
  const label =
    state === "saving" ? "Saving…" : state === "saved" ? "Saved" : "Save failed";
  return (
    <span
      aria-live="polite"
      className="fixed bottom-5 right-5 rounded-full px-4 py-1.5 font-sans text-[11.5px] font-medium tracking-[0.18em] uppercase shadow-md"
      style={{
        background:
          state === "error"
            ? "hsl(0 65% 55%)"
            : state === "saving"
              ? "hsl(var(--stage-pregnancy) / 0.9)"
              : accent,
        color: state === "saving" ? "hsl(var(--foreground) / 0.75)" : "white",
      }}
    >
      {label}
    </span>
  );
};

const PregnancyToolkitAppointmentEditor = () => {
  const { id } = useParams<{ id: string }>();
  const isNew = !id;
  const navigate = useNavigate();

  const { loadState, saveState, row, errorMessage, create, update, remove, reload } =
    useAppointment(id);

  const [draft, setDraft] = useState<AppointmentDraft>(EMPTY_DRAFT);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (isNew) {
      setDraft(EMPTY_DRAFT);
      return;
    }
    if (row) setDraft(appointmentToDraft(row));
  }, [isNew, row]);

  const canSave = useMemo(() => {
    if (isDraftEmpty(draft)) return false;
    if (!isWeekValid(draft.week)) return false;
    return saveState !== "saving";
  }, [draft, saveState]);

  const onSave = async () => {
    setLocalError(null);
    if (!isWeekValid(draft.week)) {
      setLocalError("Pregnancy week must be blank or between 1 and 42.");
      return;
    }
    const cleaned = cleanDraft(draft);
    if (isNew) {
      const created = await create(cleaned);
      if (created) {
        navigate(`/pregnancy-toolkit/appointments/${created.id}`, { replace: true });
      }
      return;
    }
    if (!id) return;
    await update(id, cleaned);
  };

  const onDelete = async () => {
    if (!id) return;
    const ok = await remove(id);
    if (ok) navigate("/pregnancy-toolkit/appointments", { replace: true });
  };

  if (!isNew && loadState === "loading") {
    return <PageLoadState message="Opening your note…" />;
  }
  if (!isNew && loadState === "error") {
    return (
      <PageLoadState
        error={errorMessage ?? "We couldn't open this note."}
        onRetry={reload}
      />
    );
  }
  if (!isNew && loadState === "notfound") {
    return (
      <div className="min-h-screen bg-parchment-grain page-vignette relative">
        <SeoHead
          title="Appointment note not found | Pregnancy toolkit"
          description="Appointment note not found."
          canonical="https://thestartofyou.com/pregnancy-toolkit/appointments"
          noindex
        />
        <MyWeekHeader />
        <main className="mx-auto max-w-[620px] px-6 pt-28 pb-24 text-center">
          <h1 className="font-serif text-[1.8rem] text-foreground/85 mb-3">
            Note not found
          </h1>
          <p className="font-serif italic text-foreground/65 mb-6">
            This appointment note may have been deleted, or it belongs to a different account.
          </p>
          <Link
            to="/pregnancy-toolkit/appointments"
            className="inline-flex items-center gap-2 font-sans text-[12px] font-medium tracking-[0.22em] uppercase"
            style={{ color: accent }}
          >
            <ArrowLeft size={12} strokeWidth={1.8} />
            Back to appointments
          </Link>
        </main>
        <MyWeekFooter contextual={null} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-parchment-grain page-vignette relative">
      <SeoHead
        title={isNew ? "New appointment note | Pregnancy toolkit" : "Appointment note | Pregnancy toolkit"}
        description="Your private pregnancy appointment note."
        canonical={
          isNew
            ? "https://thestartofyou.com/pregnancy-toolkit/appointments/new"
            : `https://thestartofyou.com/pregnancy-toolkit/appointments/${id}`
        }
        noindex
      />
      <MyWeekHeader />
      <main className="relative mx-auto w-full max-w-[820px] px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 lg:pt-28 pb-20 sm:pb-24">
        <div className="mb-8">
          <Link
            to="/pregnancy-toolkit/appointments"
            className="group inline-flex items-center gap-2 font-sans text-[11.5px] font-medium tracking-[0.22em] uppercase"
            style={{ color: accent }}
          >
            <ArrowLeft
              size={12}
              strokeWidth={1.8}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            All appointments
          </Link>
        </div>

        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span
              aria-hidden="true"
              className="block w-6 h-px"
              style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.6)" }}
            />
            <p
              className="font-sans text-[10.5px] font-medium tracking-[0.28em] uppercase"
              style={{ color: accent }}
            >
              {isNew ? "New note" : "Edit note"}
            </p>
          </div>
          <h1 className="font-serif text-[1.7rem] sm:text-[2rem] leading-[1.15] text-foreground/90">
            {isNew ? "Start a new appointment note" : draft.appointment_type?.trim() || "Appointment note"}
          </h1>
        </section>

        <section
          className="rounded-[20px] keepsake-surface px-5 sm:px-7 py-6 sm:py-8"
          style={{ borderColor: softBorder }}
        >
          <AppointmentEditorForm
            draft={draft}
            onChange={setDraft}
            disabled={saveState === "saving"}
          />

          {(localError || errorMessage) && saveState !== "saving" ? (
            <p className="mt-5 font-sans text-[12.5px] text-[hsl(0_65%_45%)]">
              {localError ?? errorMessage}
            </p>
          ) : null}

          <div className="mt-8 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">
            {!isNew ? (
              confirmDelete ? (
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={onDelete}
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-sans text-[11.5px] font-medium tracking-[0.22em] uppercase"
                    style={{ background: "hsl(0 65% 55%)", color: "white" }}
                  >
                    <Trash2 size={13} strokeWidth={1.8} />
                    Confirm delete
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(false)}
                    className="font-sans text-[11.5px] tracking-[0.22em] uppercase text-foreground/60"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirmDelete(true)}
                  className="inline-flex items-center gap-2 font-sans text-[11.5px] font-medium tracking-[0.22em] uppercase text-foreground/55 hover:text-[hsl(0_65%_45%)]"
                >
                  <Trash2 size={13} strokeWidth={1.6} />
                  Delete note
                </button>
              )
            ) : (
              <span />
            )}

            <button
              type="button"
              onClick={onSave}
              disabled={!canSave}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-sans text-[11.5px] font-medium tracking-[0.22em] uppercase transition-shadow disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_12px_28px_-14px_hsl(var(--stage-pregnancy-accent)/0.55)]"
              style={{ background: accent, color: "white" }}
            >
              <Save size={13} strokeWidth={1.8} />
              {isNew ? "Save note" : "Save changes"}
            </button>
          </div>
        </section>
      </main>
      <SaveStatePill state={saveState} />
      <MyWeekFooter contextual={null} />
    </div>
  );
};

export default PregnancyToolkitAppointmentEditor;

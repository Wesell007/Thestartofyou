import { useState } from "react";
import { Pencil, Trash2, Check, RotateCcw, Flag } from "lucide-react";
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
  MidwifeQuestion,
  MidwifeQuestionDraft,
  categoryLabel,
  formatSavedDate,
  questionToDraft,
} from "@/lib/midwifeQuestionsSchema";
import type { OwnedAppointmentOption } from "@/hooks/useMidwifeQuestions";
import MidwifeQuestionForm from "./MidwifeQuestionForm";

const accent = "hsl(var(--stage-pregnancy-accent))";
const softBorder = "hsl(var(--stage-pregnancy-accent) / 0.16)";
const chipBg = "hsl(var(--stage-pregnancy) / 0.5)";

interface Props {
  question: MidwifeQuestion;
  appointments: OwnedAppointmentOption[];
  saving: boolean;
  onUpdate: (id: string, draft: MidwifeQuestionDraft) => Promise<unknown>;
  onDelete: (id: string) => Promise<unknown>;
  onToggleAnswered: (id: string, answered: boolean) => Promise<unknown>;
  onToggleFollowUp: (id: string, followUp: boolean) => Promise<unknown>;
  onUpdateAnswerNotes: (id: string, notes: string | null) => Promise<unknown>;
}

const MidwifeQuestionCard = ({
  question,
  appointments,
  saving,
  onUpdate,
  onDelete,
  onToggleAnswered,
  onToggleFollowUp,
  onUpdateAnswerNotes,
}: Props) => {
  const [editing, setEditing] = useState(false);
  const [editingNotes, setEditingNotes] = useState(false);
  const [notesDraft, setNotesDraft] = useState(question.answer_notes ?? "");

  if (editing) {
    return (
      <MidwifeQuestionForm
        initial={questionToDraft(question)}
        saving={saving}
        appointments={appointments}
        submitLabel="Save changes"
        onSubmit={async (draft) => {
          await onUpdate(question.id, draft);
          setEditing(false);
        }}
        onCancel={() => setEditing(false)}
      />
    );
  }

  const catText = categoryLabel(question.category);
  const apptText = question.appointment_id
    ? appointments.find((a) => a.id === question.appointment_id)?.label ?? null
    : null;

  return (
    <article
      className="rounded-[20px] keepsake-surface px-6 py-5 flex flex-col gap-3"
      style={{ borderColor: softBorder }}
    >
      <header className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <p
          className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase"
          style={{ color: accent }}
        >
          {formatSavedDate(question.created_at) ?? "Saved question"}
        </p>
        {catText ? (
          <span
            className="inline-block rounded-full px-3 py-0.5 font-sans text-[11px] text-foreground/75"
            style={{ background: chipBg, border: `1px solid ${softBorder}` }}
          >
            {catText}
          </span>
        ) : null}
        {question.answered ? (
          <span
            className="inline-block rounded-full px-3 py-0.5 font-sans text-[11px]"
            style={{
              background: "hsl(var(--stage-pregnancy-accent) / 0.14)",
              color: accent,
            }}
          >
            Answered
          </span>
        ) : (
          <span className="font-sans text-[11px] text-foreground/55">Open</span>
        )}
        {question.follow_up ? (
          <span className="inline-flex items-center gap-1 font-sans text-[11px] text-foreground/65">
            <Flag size={11} strokeWidth={1.8} /> Follow-up
          </span>
        ) : null}
      </header>

      <p className="font-serif text-[16px] leading-[1.6] text-foreground/88 whitespace-pre-wrap">
        {question.question}
      </p>

      {apptText ? (
        <p className="font-sans text-[12.5px] text-foreground/65">
          Linked to: {apptText}
        </p>
      ) : null}

      {editingNotes ? (
        <div className="flex flex-col gap-2">
          <label
            htmlFor={`notes-${question.id}`}
            className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase"
            style={{ color: accent }}
          >
            Answer notes
          </label>
          <textarea
            id={`notes-${question.id}`}
            value={notesDraft}
            onChange={(e) => setNotesDraft(e.target.value)}
            rows={3}
            placeholder="What was said, in your own words."
            className="w-full rounded-[12px] border bg-background/60 px-4 py-2.5 font-serif text-[15px] text-foreground/85 leading-[1.55] outline-none focus:ring-2 focus:ring-[hsl(var(--stage-pregnancy-accent)/0.35)]"
            style={{ borderColor: softBorder }}
          />
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={saving}
              onClick={async () => {
                await onUpdateAnswerNotes(question.id, notesDraft);
                setEditingNotes(false);
              }}
              className="inline-flex items-center rounded-full px-4 py-2 font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-background disabled:opacity-50"
              style={{ backgroundColor: accent }}
            >
              Save notes
            </button>
            <button
              type="button"
              onClick={() => {
                setNotesDraft(question.answer_notes ?? "");
                setEditingNotes(false);
              }}
              className="inline-flex items-center px-3 py-2 font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-foreground/60"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : question.answer_notes ? (
        <div>
          <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-foreground/55 mb-1">
            Answer notes
          </p>
          <p className="font-serif italic text-[14.5px] leading-[1.6] text-foreground/75 whitespace-pre-wrap">
            {question.answer_notes}
          </p>
        </div>
      ) : null}

      <footer className="flex flex-wrap items-center gap-2 pt-1">
        <button
          type="button"
          disabled={saving}
          onClick={() => onToggleAnswered(question.id, !question.answered)}
          className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-foreground/70 hover:text-foreground/90"
          style={{ borderColor: softBorder }}
        >
          {question.answered ? (
            <>
              <RotateCcw size={11} strokeWidth={1.8} /> Mark as open
            </>
          ) : (
            <>
              <Check size={11} strokeWidth={1.8} /> Mark as answered
            </>
          )}
        </button>
        <button
          type="button"
          disabled={saving}
          onClick={() => onToggleFollowUp(question.id, !question.follow_up)}
          className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-foreground/70 hover:text-foreground/90"
          style={{ borderColor: softBorder }}
        >
          <Flag size={11} strokeWidth={1.8} />
          {question.follow_up ? "Remove follow-up" : "Flag follow-up"}
        </button>
        <button
          type="button"
          onClick={() => {
            setNotesDraft(question.answer_notes ?? "");
            setEditingNotes((v) => !v);
          }}
          className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-foreground/70 hover:text-foreground/90"
          style={{ borderColor: softBorder }}
        >
          {question.answer_notes ? "Edit answer notes" : "Add answer notes"}
        </button>
        <div className="flex-1" />
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="inline-flex items-center gap-1.5 font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-foreground/60 hover:text-foreground/85"
        >
          <Pencil size={11} strokeWidth={1.8} /> Edit
        </button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-foreground/55 hover:text-foreground/80"
            >
              <Trash2 size={11} strokeWidth={1.8} /> Delete
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this question?</AlertDialogTitle>
              <AlertDialogDescription>
                This will remove the question and any answer notes. This cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep</AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  await onDelete(question.id);
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </footer>
    </article>
  );
};

export default MidwifeQuestionCard;

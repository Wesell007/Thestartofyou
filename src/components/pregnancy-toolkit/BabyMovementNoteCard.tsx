import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
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
  BabyMovementDraft,
  BabyMovementNote,
  formatMovementDate,
  noteToDraft,
} from "@/lib/babyMovementSchema";
import BabyMovementNoteForm from "./BabyMovementNoteForm";

const accent = "hsl(var(--stage-pregnancy-accent))";
const softBorder = "hsl(var(--stage-pregnancy-accent) / 0.16)";

interface Props {
  note: BabyMovementNote;
  saving: boolean;
  onUpdate: (id: string, draft: BabyMovementDraft) => Promise<unknown>;
  onDelete: (id: string) => Promise<unknown>;
}

const BabyMovementNoteCard = ({ note, saving, onUpdate, onDelete }: Props) => {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <BabyMovementNoteForm
        initial={noteToDraft(note)}
        saving={saving}
        submitLabel="Save changes"
        onSubmit={async (draft) => {
          await onUpdate(note.id, draft);
          setEditing(false);
        }}
        onCancel={() => setEditing(false)}
      />
    );
  }

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
          {formatMovementDate(note.noted_at) ?? "Recent note"}
        </p>
        {note.pattern_label ? (
          <span className="font-serif italic text-[14.5px] text-foreground/70">
            {note.pattern_label}
          </span>
        ) : null}
      </header>
      {note.notes ? (
        <p className="font-serif text-[15px] leading-[1.65] text-foreground/85 whitespace-pre-wrap">
          {note.notes}
        </p>
      ) : (
        <p className="font-serif italic text-[14px] text-foreground/50">
          No extra notes.
        </p>
      )}
      <footer className="flex items-center gap-2 pt-1">
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-sans text-[11px] tracking-[0.2em] uppercase text-foreground/65 hover:text-foreground/85"
        >
          <Pencil size={12} strokeWidth={1.8} />
          Edit
        </button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-sans text-[11px] tracking-[0.2em] uppercase text-foreground/55 hover:text-foreground/80"
            >
              <Trash2 size={12} strokeWidth={1.8} />
              Delete
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this note?</AlertDialogTitle>
              <AlertDialogDescription>
                This will remove the note from your record. This cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep note</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDelete(note.id)}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </footer>
    </article>
  );
};

export default BabyMovementNoteCard;

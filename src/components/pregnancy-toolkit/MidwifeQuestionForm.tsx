import { useEffect, useState } from "react";
import {
  CATEGORIES,
  MidwifeQuestionDraft,
  emptyDraft,
  isDraftSaveable,
} from "@/lib/midwifeQuestionsSchema";
import type { OwnedAppointmentOption } from "@/hooks/useMidwifeQuestions";

const accent = "hsl(var(--stage-pregnancy-accent))";
const softBorder = "hsl(var(--stage-pregnancy-accent) / 0.16)";

interface Props {
  initial?: MidwifeQuestionDraft;
  saving?: boolean;
  submitLabel?: string;
  appointments: OwnedAppointmentOption[];
  onSubmit: (draft: MidwifeQuestionDraft) => Promise<unknown> | void;
  onCancel?: () => void;
}

const inputCls =
  "w-full rounded-[12px] border bg-background/60 px-4 py-2.5 font-serif text-[15px] text-foreground/85 leading-[1.5] outline-none focus:ring-2 focus:ring-[hsl(var(--stage-pregnancy-accent)/0.35)]";

const MidwifeQuestionForm = ({
  initial,
  saving = false,
  submitLabel = "Save question",
  appointments,
  onSubmit,
  onCancel,
}: Props) => {
  const [draft, setDraft] = useState<MidwifeQuestionDraft>(
    initial ?? emptyDraft(),
  );

  useEffect(() => {
    if (initial) setDraft(initial);
  }, [initial]);

  const canSubmit = !saving && isDraftSaveable(draft);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    await onSubmit(draft);
    if (!initial) setDraft(emptyDraft());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[20px] keepsake-surface px-6 py-6 flex flex-col gap-5"
      style={{ borderColor: softBorder }}
    >
      <div className="flex flex-col gap-2">
        <label
          htmlFor="mq-question"
          className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase"
          style={{ color: accent }}
        >
          Your question
        </label>
        <textarea
          id="mq-question"
          value={draft.question}
          onChange={(e) =>
            setDraft((d) => ({ ...d, question: e.target.value }))
          }
          placeholder="What would you like to ask your midwife?"
          rows={3}
          className={inputCls}
          style={{ borderColor: softBorder }}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="mq-category"
          className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase"
          style={{ color: accent }}
        >
          Category
        </label>
        <select
          id="mq-category"
          value={draft.category ?? ""}
          onChange={(e) =>
            setDraft((d) => ({
              ...d,
              category: (e.target.value || null) as MidwifeQuestionDraft["category"],
            }))
          }
          className={inputCls}
          style={{ borderColor: softBorder }}
        >
          <option value="">Choose a category</option>
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {appointments.length > 0 ? (
        <div className="flex flex-col gap-2">
          <label
            htmlFor="mq-appointment"
            className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase"
            style={{ color: accent }}
          >
            Link to appointment (optional)
          </label>
          <select
            id="mq-appointment"
            value={draft.appointment_id ?? ""}
            onChange={(e) =>
              setDraft((d) => ({
                ...d,
                appointment_id: e.target.value || null,
              }))
            }
            className={inputCls}
            style={{ borderColor: softBorder }}
          >
            <option value="">No appointment</option>
            {appointments.map((a) => (
              <option key={a.id} value={a.id}>
                {a.label}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={draft.follow_up}
          onChange={(e) =>
            setDraft((d) => ({ ...d, follow_up: e.target.checked }))
          }
          className="mt-1 h-4 w-4 rounded border-[hsl(var(--stage-pregnancy-accent)/0.4)] accent-[hsl(var(--stage-pregnancy-accent))]"
        />
        <span className="font-serif text-[14.5px] text-foreground/80 leading-[1.55]">
          Flag for follow-up
        </span>
      </label>

      <div className="flex items-center gap-3 pt-1">
        <button
          type="submit"
          disabled={!canSubmit}
          className="inline-flex items-center rounded-full px-5 py-2.5 font-sans text-[12px] font-medium tracking-[0.22em] uppercase text-background disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: accent }}
        >
          {saving ? "Saving…" : submitLabel}
        </button>
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center px-3 py-2.5 font-sans text-[12px] font-medium tracking-[0.22em] uppercase text-foreground/60"
          >
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
};

export default MidwifeQuestionForm;

import { ChangeEvent } from "react";
import {
  APPOINTMENT_TYPE_SUGGESTIONS,
  AppointmentDraft,
  fromDatetimeLocalInput,
  toDatetimeLocalInput,
} from "@/lib/appointmentSchema";

const accent = "hsl(var(--stage-pregnancy-accent))";
const softBorder = "hsl(var(--stage-pregnancy-accent) / 0.16)";

interface Props {
  draft: AppointmentDraft;
  onChange: (next: AppointmentDraft) => void;
  disabled?: boolean;
}

const labelClass =
  "block font-sans text-[10.5px] font-medium tracking-[0.24em] uppercase text-foreground/60 mb-2";

const inputClass =
  "w-full rounded-[12px] border bg-white/70 px-3.5 py-2.5 font-serif text-[15px] text-foreground/85 leading-[1.5] focus:outline-none focus:ring-2 focus:ring-offset-0";

const textareaClass = `${inputClass} min-h-[110px] resize-y`;

const AppointmentEditorForm = ({ draft, onChange, disabled }: Props) => {
  const set = <K extends keyof AppointmentDraft>(key: K, value: AppointmentDraft[K]) =>
    onChange({ ...draft, [key]: value });

  const onWeek = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (raw === "") return set("week", null);
    const n = Number(raw);
    if (!Number.isFinite(n)) return;
    set("week", n);
  };

  const style = {
    borderColor: softBorder,
    boxShadow: "0 1px 0 hsl(var(--stage-pregnancy-accent) / 0.04) inset",
  } as const;

  return (
    <form
      className="grid grid-cols-1 sm:grid-cols-2 gap-5"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="sm:col-span-1">
        <label htmlFor="appointment-at" className={labelClass}>
          Date and time
        </label>
        <input
          id="appointment-at"
          type="datetime-local"
          className={inputClass}
          style={style}
          value={toDatetimeLocalInput(draft.appointment_at)}
          onChange={(e) => set("appointment_at", fromDatetimeLocalInput(e.target.value))}
          disabled={disabled}
        />
      </div>

      <div className="sm:col-span-1">
        <label htmlFor="appointment-week" className={labelClass}>
          Pregnancy week
        </label>
        <input
          id="appointment-week"
          type="number"
          inputMode="numeric"
          min={1}
          max={42}
          placeholder="e.g. 20"
          className={inputClass}
          style={style}
          value={draft.week ?? ""}
          onChange={onWeek}
          disabled={disabled}
        />
      </div>

      <div className="sm:col-span-1">
        <label htmlFor="appointment-type" className={labelClass}>
          Appointment type
        </label>
        <input
          id="appointment-type"
          type="text"
          list="appointment-type-suggestions"
          placeholder="e.g. Midwife appointment"
          className={inputClass}
          style={style}
          value={draft.appointment_type ?? ""}
          onChange={(e) => set("appointment_type", e.target.value)}
          disabled={disabled}
        />
        <datalist id="appointment-type-suggestions">
          {APPOINTMENT_TYPE_SUGGESTIONS.map((s) => (
            <option key={s} value={s} />
          ))}
        </datalist>
      </div>

      <div className="sm:col-span-1">
        <label htmlFor="appointment-location" className={labelClass}>
          Location
        </label>
        <input
          id="appointment-location"
          type="text"
          placeholder="Where is it?"
          className={inputClass}
          style={style}
          value={draft.location ?? ""}
          onChange={(e) => set("location", e.target.value)}
          disabled={disabled}
        />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="appointment-questions" className={labelClass}>
          Questions I want to ask
        </label>
        <textarea
          id="appointment-questions"
          className={textareaClass}
          style={style}
          placeholder="Anything on your mind you want to remember to ask."
          value={draft.questions ?? ""}
          onChange={(e) => set("questions", e.target.value)}
          disabled={disabled}
        />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="appointment-notes" className={labelClass}>
          Notes from the appointment
        </label>
        <textarea
          id="appointment-notes"
          className={textareaClass}
          style={style}
          placeholder="What was said, what you noticed, how you felt."
          value={draft.notes ?? ""}
          onChange={(e) => set("notes", e.target.value)}
          disabled={disabled}
        />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="appointment-follow-up" className={labelClass}>
          Follow up items
        </label>
        <textarea
          id="appointment-follow-up"
          className={textareaClass}
          style={style}
          placeholder="Anything to do or check next."
          value={draft.follow_up ?? ""}
          onChange={(e) => set("follow_up", e.target.value)}
          disabled={disabled}
        />
      </div>

      <p
        className="sm:col-span-2 font-sans text-[11.5px] text-foreground/50 leading-[1.55]"
        style={{ color: "hsl(var(--foreground) / 0.5)" }}
      >
        <span style={{ color: accent }}>Private notebook.</span> Nothing here is shared. For urgent concerns, contact your midwife, maternity unit, GP, NHS 111 or emergency services as appropriate.
      </p>
    </form>
  );
};

export default AppointmentEditorForm;

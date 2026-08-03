import { useEffect, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import {
  BirthPlanSection,
  BirthPlanSectionAnswer,
  answeredCount,
  emptyAnswer,
  isSectionAnswered,
} from "@/lib/birthPlanSchema";

interface Props {
  section: BirthPlanSection;
  value: BirthPlanSectionAnswer | undefined;
  onChange: (next: BirthPlanSectionAnswer) => void;
  disabled?: boolean;
  open: boolean;
  onToggle: () => void;
}

const accent = "hsl(var(--stage-pregnancy-accent))";
const softBorder = "hsl(var(--stage-pregnancy-accent) / 0.16)";
const chipBg = "hsl(var(--stage-pregnancy) / 0.4)";

const BirthPlanSectionCard = ({
  section,
  value,
  onChange,
  disabled,
  open,
  onToggle,
}: Props) => {
  const current = value ?? emptyAnswer();
  const [notes, setNotes] = useState(current.notes);

  useEffect(() => {
    setNotes(current.notes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value?.notes]);

  const answered = isSectionAnswered(value);
  const count = answeredCount(value);
  const statusLabel = answered
    ? count > 0
      ? `Answered · ${count} ${count === 1 ? "preference" : "preferences"}`
      : "Answered"
    : "Not yet";

  const toggleChoice = (choice: string) => {
    if (disabled) return;
    const has = current.choices.includes(choice);
    const nextChoices = has
      ? current.choices.filter((c) => c !== choice)
      : [...current.choices, choice];
    onChange({ ...current, choices: nextChoices });
  };

  const commitNotes = () => {
    if (disabled) return;
    if (notes === current.notes) return;
    onChange({ ...current, notes });
  };

  const bodyId = `birthplan-body-${section.key}`;

  return (
    <section
      className="rounded-[20px] keepsake-surface px-6 py-5"
      style={{ borderColor: softBorder }}
      aria-labelledby={`birthplan-${section.key}`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={bodyId}
        className="w-full flex items-start justify-between gap-4 text-left"
      >
        <span className="min-w-0">
          <span
            id={`birthplan-${section.key}`}
            className="block font-serif text-[1.15rem] sm:text-[1.25rem] text-foreground/90 leading-[1.25]"
          >
            {section.title}
          </span>
          <span
            className="mt-1.5 inline-block rounded-full px-2.5 py-0.5 font-sans text-[11px]"
            style={{
              background: answered ? "hsl(var(--stage-pregnancy-accent) / 0.12)" : chipBg,
              color: answered ? accent : "hsl(var(--foreground) / 0.6)",
            }}
          >
            {statusLabel}
          </span>
        </span>
        <ChevronDown
          size={16}
          strokeWidth={1.8}
          aria-hidden="true"
          className="mt-1 shrink-0 transition-transform"
          style={{
            color: accent,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>

      <div id={bodyId} hidden={!open}>
        <p className="font-serif italic text-foreground/60 text-[14px] leading-[1.65] mt-4 mb-5">
          {section.intro}
        </p>

        {section.choices.length > 0 && (
          <div
            className="flex flex-wrap gap-2 mb-5"
            role="group"
            aria-label={`${section.title} preferences`}
          >
            {section.choices.map((choice) => {
              const selected = current.choices.includes(choice);
              return (
                <button
                  key={choice}
                  type="button"
                  onClick={() => toggleChoice(choice)}
                  aria-pressed={selected}
                  disabled={disabled}
                  className="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-sans text-[12.5px] transition-colors"
                  style={{
                    background: selected ? accent : chipBg,
                    color: selected ? "white" : "hsl(var(--foreground) / 0.75)",
                    borderColor: selected ? accent : softBorder,
                  }}
                >
                  {selected && <Check size={12} strokeWidth={2.2} />}
                  {choice}
                </button>
              );
            })}
          </div>
        )}

        <label className="block">
          <span className="sr-only">Notes for {section.title}</span>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            onBlur={commitNotes}
            disabled={disabled}
            rows={3}
            placeholder={section.notesPlaceholder}
            className="w-full rounded-[14px] border bg-white/70 px-4 py-3 font-serif text-[14.5px] text-foreground/85 placeholder:text-foreground/40 placeholder:italic focus:outline-none focus:ring-2"
            style={{
              borderColor: softBorder,
            }}
          />
        </label>
      </div>
    </section>
  );
};

export default BirthPlanSectionCard;

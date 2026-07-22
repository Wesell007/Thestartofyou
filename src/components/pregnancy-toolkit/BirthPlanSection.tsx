import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import {
  BirthPlanSection,
  BirthPlanSectionAnswer,
  emptyAnswer,
} from "@/lib/birthPlanSchema";

interface Props {
  section: BirthPlanSection;
  value: BirthPlanSectionAnswer | undefined;
  onChange: (next: BirthPlanSectionAnswer) => void;
  disabled?: boolean;
}

const accent = "hsl(var(--stage-pregnancy-accent))";
const softBorder = "hsl(var(--stage-pregnancy-accent) / 0.16)";
const chipBg = "hsl(var(--stage-pregnancy) / 0.4)";

const BirthPlanSectionCard = ({ section, value, onChange, disabled }: Props) => {
  const current = value ?? emptyAnswer();
  const [notes, setNotes] = useState(current.notes);

  useEffect(() => {
    setNotes(current.notes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value?.notes]);

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

  return (
    <section
      className="rounded-[20px] keepsake-surface px-6 py-6"
      style={{ borderColor: softBorder }}
      aria-labelledby={`birthplan-${section.key}`}
    >
      <h2
        id={`birthplan-${section.key}`}
        className="font-serif text-[1.15rem] sm:text-[1.25rem] text-foreground/90 leading-[1.25] mb-2"
      >
        {section.title}
      </h2>
      <p className="font-serif italic text-foreground/60 text-[14px] leading-[1.65] mb-5">
        {section.intro}
      </p>

      {section.choices.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5" role="group" aria-label={`${section.title} preferences`}>
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
    </section>
  );
};

export default BirthPlanSectionCard;

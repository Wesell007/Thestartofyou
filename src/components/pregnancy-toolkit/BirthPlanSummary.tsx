import {
  BIRTH_PLAN_SECTIONS,
  BirthPlanAnswers,
  isSectionAnswered,
} from "@/lib/birthPlanSchema";

interface Props {
  answers: BirthPlanAnswers;
  completion: number;
  updatedAt: string | null;
}

const accent = "hsl(var(--stage-pregnancy-accent))";
const softBorder = "hsl(var(--stage-pregnancy-accent) / 0.16)";

const BirthPlanSummary = ({ answers, completion, updatedAt }: Props) => {
  const answeredSections = BIRTH_PLAN_SECTIONS.filter((s) => isSectionAnswered(answers[s.key]));
  const updated = updatedAt
    ? new Date(updatedAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <section
      className="rounded-[20px] keepsake-surface px-6 py-6"
      style={{ borderColor: softBorder }}
      aria-label="Your birth plan summary"
    >
      <div className="flex items-center gap-3 mb-4">
        <span
          aria-hidden="true"
          className="block w-5 h-px"
          style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.55)" }}
        />
        <p
          className="font-sans text-[10.5px] font-medium tracking-[0.26em] uppercase"
          style={{ color: accent }}
        >
          Your summary
        </p>
      </div>

      <p className="font-serif italic text-foreground/70 text-[14.5px] leading-[1.7] mb-5">
        {answeredSections.length === 0
          ? "Nothing saved yet. Add a preference or note above and it will appear here."
          : `You have added preferences to ${answeredSections.length} of ${BIRTH_PLAN_SECTIONS.length} sections.`}
      </p>

      {answeredSections.length > 0 && (
        <ul className="space-y-5">
          {answeredSections.map((section) => {
            const a = answers[section.key];
            if (!a) return null;
            return (
              <li key={section.key}>
                <p className="font-serif text-[15px] text-foreground/85 mb-1.5">
                  {section.title}
                </p>
                {a.choices.length > 0 && (
                  <p className="font-sans text-[13px] text-foreground/70 leading-[1.65]">
                    {a.choices.join(", ")}
                  </p>
                )}
                {a.notes && a.notes.trim().length > 0 && (
                  <p className="font-serif italic text-foreground/60 text-[13.5px] leading-[1.65] mt-1">
                    {a.notes}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      )}

      <div
        className="mt-6 pt-4 flex items-center justify-between gap-3 border-t"
        style={{ borderColor: softBorder }}
      >
        <p className="font-sans text-[11.5px] text-foreground/55">
          {completion}% complete
        </p>
        {updated && (
          <p className="font-sans text-[11.5px] text-foreground/55">
            Last saved {updated}
          </p>
        )}
      </div>
    </section>
  );
};

export default BirthPlanSummary;

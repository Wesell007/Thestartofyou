import { format } from "date-fns";
import {
  BIRTH_PLAN_SECTIONS,
  BirthPlanAnswers,
  isSectionAnswered,
} from "@/lib/birthPlanSchema";

interface BirthPlanPrintableProps {
  answers: BirthPlanAnswers;
  parentName: string | null;
  dueDate: Date | null;
}

const BirthPlanPrintable = ({ answers, parentName, dueDate }: BirthPlanPrintableProps) => {
  const completedSections = BIRTH_PLAN_SECTIONS.filter((s) => isSectionAnswered(answers[s.key]));
  const preparedOn = format(new Date(), "d MMMM yyyy");

  return (
    <div id="birth-plan-print" aria-hidden="true" className="birth-plan-printable">
      <header className="bpp-header">
        <p className="bpp-brand">The Start of You</p>
        <h1 className="bpp-title">Birth Plan</h1>
        <div className="bpp-meta">
          {parentName && <p>Prepared by {parentName}</p>}
          {dueDate && <p>Estimated due date: {format(dueDate, "d MMMM yyyy")}</p>}
        </div>
        <p className="bpp-intro">
          Your birth plan is a place to collect your preferences. Your care team can help you adapt it if things change.
        </p>
      </header>

      <div className="bpp-sections">
        {completedSections.map((section) => {
          const answer = answers[section.key];
          if (!answer) return null;
          return (
            <section key={section.key} className="bpp-section">
              <h2 className="bpp-section-title">{section.title}</h2>
              {answer.choices && answer.choices.length > 0 && (
                <ul className="bpp-choices">
                  {answer.choices.map((choice) => (
                    <li key={choice}>{choice}</li>
                  ))}
                </ul>
              )}
              {answer.notes && answer.notes.trim().length > 0 && (
                <div className="bpp-notes">
                  <p className="bpp-notes-label">Notes</p>
                  <p className="bpp-notes-body">{answer.notes}</p>
                </div>
              )}
            </section>
          );
        })}
      </div>

      <footer className="bpp-footer">
        <p>Prepared on {preparedOn}</p>
        <p>The Start of You &middot; thestartofyou.com</p>
      </footer>
    </div>
  );
};

export default BirthPlanPrintable;

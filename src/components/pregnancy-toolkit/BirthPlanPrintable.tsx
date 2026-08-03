import { format } from "date-fns";
import {
  BIRTH_PLAN_BANDS,
  BirthPlanAnswers,
  bandHasAnswers,
  isSectionAnswered,
  sectionsForBand,
} from "@/lib/birthPlanSchema";

interface BirthPlanPrintableProps {
  answers: BirthPlanAnswers;
  parentName: string | null;
  dueDate: Date | null;
}

const BirthPlanPrintable = ({ answers, parentName, dueDate }: BirthPlanPrintableProps) => {
  const preparedOn = format(new Date(), "d MMMM yyyy");
  const bands = BIRTH_PLAN_BANDS.filter((band) => bandHasAnswers(answers, band));

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
          These are preferences to discuss, not guarantees. Your care team can help you understand
          what is safest for you and your baby, and plans can change on the day.
        </p>
      </header>

      <div className="bpp-sections">
        {bands.map((band) => {
          const sections = sectionsForBand(band.id).filter((s) =>
            isSectionAnswered(answers[s.key])
          );
          return (
            <div key={band.id} className="bpp-band">
              <h2 className="bpp-band-title">{band.title}</h2>
              {sections.map((section) => {
                const answer = answers[section.key];
                if (!answer) return null;
                return (
                  <section key={section.key} className="bpp-section">
                    <h3 className="bpp-section-title">{section.title}</h3>
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
          );
        })}
      </div>

      <section className="bpp-care-notes">
        <h2 className="bpp-band-title">Notes from my care team</h2>
        <div className="bpp-rule" />
        <div className="bpp-rule" />
        <div className="bpp-rule" />
        <div className="bpp-rule" />
        <div className="bpp-rule" />
        <div className="bpp-rule" />
      </section>

      <footer className="bpp-footer">
        <p>Prepared on {preparedOn}</p>
        <p>The Start of You &middot; thestartofyou.com</p>
      </footer>
    </div>
  );
};

export default BirthPlanPrintable;

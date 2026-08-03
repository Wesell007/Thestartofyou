import { format } from "date-fns";
import {
  HOSPITAL_BAG_CATEGORIES,
  HospitalBagItemRow,
  sortItemsForDisplay,
} from "@/lib/hospitalBagSchema";

interface HospitalBagPrintableProps {
  rows: HospitalBagItemRow[];
  parentName: string | null;
  dueDate: Date | null;
}

const HospitalBagPrintable = ({
  rows,
  parentName,
  dueDate,
}: HospitalBagPrintableProps) => {
  const preparedOn = format(new Date(), "d MMMM yyyy");
  const groups = HOSPITAL_BAG_CATEGORIES.map((category) => ({
    category,
    items: sortItemsForDisplay(rows.filter((r) => r.category === category.key)),
  })).filter((g) => g.items.length > 0);

  return (
    <div id="hospital-bag-print" aria-hidden="true" className="hospital-bag-printable">
      <header className="hbp-header">
        <p className="hbp-brand">The Start of You</p>
        <h1 className="hbp-title">Hospital Bag Checklist</h1>
        <div className="hbp-meta">
          {parentName && <p>Prepared by {parentName}</p>}
          {dueDate && <p>Estimated due date: {format(dueDate, "d MMMM yyyy")}</p>}
        </div>
        <p className="hbp-intro">
          This is a guide, not a rule. Every birth and every hospital is different, so adapt it to what feels right for you and what your care team suggests.
        </p>
      </header>

      <div className="hbp-sections">
        {groups.map(({ category, items }) => (
          <section key={category.key} className="hbp-section">
            <h2 className="hbp-section-title">{category.label}</h2>
            <ul className="hbp-items">
              {items.map((item) => (
                <li key={item.id} className="hbp-item">
                  <span className="hbp-box">{item.packed_at ? "\u2713" : "\u25A2"}</span>
                  <span className={item.packed_at ? "hbp-label hbp-label-packed" : "hbp-label"}>
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <footer className="hbp-footer">
        <p>Prepared on {preparedOn}</p>
        <p>The Start of You &middot; thestartofyou.com</p>
      </footer>
    </div>
  );
};

export default HospitalBagPrintable;

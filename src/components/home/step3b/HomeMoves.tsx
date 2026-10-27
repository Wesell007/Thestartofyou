import { Link } from "react-router-dom";
import ChapterDots from "./ChapterDots";

const RIBBON = ["var(--ttc-mid)", "var(--preg-mid)", "var(--fy-mid)", "var(--tod-mid)", "var(--fam-mid)"];

export default function HomeMoves() {
  return (
    <section className="moves" aria-labelledby="moves-h">
      <div className="ribbon" aria-hidden="true">
        {RIBBON.map((colour) => (
          <i key={colour} style={{ background: colour }} />
        ))}
      </div>
      <div className="wrap split">
        <div>
          <h2 className="display-2" id="moves-h">
            One journey that moves with you
          </h2>
          <hr className="title-rule" />
          <p className="deck" style={{ marginTop: 16 }}>
            Start wherever you are. When one chapter ends, the next is already yours, in the same colours and the
            same calm, with everything you kept.
          </p>
          <div className="btn-row" style={{ marginTop: 28 }}>
            <Link className="btn btn-primary" to="/start-your-journey">
              Start your journey
            </Link>
            <Link className="btn btn-secondary" to="/journal">
              See the journal
            </Link>
          </div>
        </div>
        <div className="continuity" role="group" aria-label="What comes with you">
          <b>What comes with you, chapter to chapter</b>
          <ul>
            <li>Your guidance, reorganised around where you are now.</li>
            <li>Your Companion's context, within the limits you set.</li>
            <li>Your journal, in print and on screen, and every memory in it.</li>
            <li>Your tools: dates, notes, saved questions, appointments.</li>
            <li>One account, one family, one story.</li>
          </ul>
        </div>
      </div>
      <div className="wrap">
        <ChapterDots closing="Yours to keep." />
      </div>
    </section>
  );
}

import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCompanionOptional } from "@/components/companion/useCompanionOptional";

/**
 * The Companion, introduced by an example answer. The ask field is real: it hands the question to the one
 * shared Companion panel (nothing is put in the URL or sent to analytics). Where the panel is unavailable it
 * opens the full Companion page instead.
 */
export default function HomeCompanion() {
  const companion = useCompanionOptional();
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = question.trim();
    if (!companion || !companion.visible) {
      navigate("/ask");
      return;
    }
    companion.setOpen(true);
    if (trimmed) {
      companion.send(trimmed);
      setQuestion("");
    }
  };

  return (
    <section className="home-comp" aria-labelledby="comp-h">
      <div className="wrap">
        <div>
          <span className="label comp-eyebrow">
            <span className="comp-mark" aria-hidden="true" />
            The Companion
          </span>
          <h2 className="display-2" id="comp-h" style={{ marginTop: 12 }}>
            A Companion that answers carefully
          </h2>
          <hr className="title-rule" />
          <p className="deck" style={{ marginTop: 16 }}>
            Ask what you would ask a friend who happens to know the guidance. It answers in plain paragraphs for
            the chapter you are in, shows what it used and what it did not, and says so when something is outside
            what it can safely answer.
          </p>
          <form className="ask" style={{ marginTop: 26, maxWidth: 520 }} onSubmit={onSubmit}>
            <label className="visually-hidden" htmlFor="hq">
              Your question
            </label>
            <input
              id="hq"
              className="ask-field"
              type="text"
              placeholder="Is it normal to feel this tired?"
              autoComplete="off"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
            />
            <button className="btn btn-primary" type="submit">
              Ask
            </button>
          </form>
          <p className="meta" style={{ marginTop: 14 }}>
            Private to you. It knows your week only if you tell it, and never reads your journal, photos, videos or
            voice notes without permission. Never a substitute for your midwife, GP or emergency care.
          </p>
        </div>
        <div className="excerpt" role="group" aria-label="Example answer">
          <span className="label">You asked · Pregnancy · Week 12</span>
          <p className="q" style={{ marginTop: 10 }}>
            Is it normal to still feel sick at week 12?
          </p>
          <div className="answer">
            <p>
              Yes, very often. For many people nausea begins to ease between weeks 12 and 14, as the placenta takes
              over hormone production and hCG levels settle. That is an average, not a deadline.
            </p>
          </div>
          <div className="used">
            <b>What this answer used</b>
            <ul>
              <li>Your saved week</li>
              <li>
                The reviewed article <Link to="/articles/nausea-in-early-pregnancy">Nausea in early pregnancy</Link>
              </li>
              <li>It did not read your journal.</li>
            </ul>
          </div>
          <p className="quiet-link" style={{ marginTop: 14 }}>
            <Link to="/articles/nausea-in-early-pregnancy">See the full answer</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

import journalUltrasound from "@/assets/journal-ultrasound.jpg";
import journalCoupleUltrasound from "@/assets/journal-couple-ultrasound.jpg";

const VOICE_BARS = [6, 10, 16, 22, 14, 24, 18, 12, 20, 26, 16, 10, 14, 22, 18, 8, 12, 16, 10, 6, 14, 20, 12, 8];

/**
 * Four keepsake objects, shown as examples of what a week can hold. They are illustrations on the homepage,
 * so the play marks are drawn, not buttons.
 */
export default function HomeMemories() {
  return (
    <section className="memhome" id="memories" aria-labelledby="mem-h">
      <div className="wrap">
        <div className="section-head">
          <span className="label" style={{ color: "var(--preg-deep)" }}>
            Memories, in your own words
          </span>
          <h2 className="display-2" id="mem-h" style={{ marginTop: 12 }}>
            Things worth keeping
          </h2>
          <hr className="title-rule j" style={{ "--j-mid": "var(--preg-mid)" } as React.CSSProperties} />
          <p className="deck">
            A line, a photo, a few seconds of video, your own voice. Each week has a place for them, in print and on
            screen, and they stay yours: private, exportable, never shared unless you choose to.
          </p>
        </div>
        <div className="four" data-journey="pregnancy">
          <div className="written">
            <span className="label">Written · Week 12</span>
            <p className="prompt">What do you want to remember about these first 12 weeks?</p>
            <div className="ruled">
              <p className="hand">
                The room was darker than I expected and quieter. We held hands and didn't say anything until the
                heartbeat.
              </p>
            </div>
            <p className="meta" style={{ marginTop: 10 }}>
              Autosaved · Tuesday 21:14
            </p>
          </div>
          <figure className="mem-photo">
            <img
              src={journalUltrasound}
              alt="A scan photograph kept with the week"
              width={1920}
              height={1279}
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              <b>Scan photo</b>
              <span>Tuesday · Week 12</span>
            </figcaption>
          </figure>
          <figure className="mem-video">
            <div className="still">
              <img
                src={journalCoupleUltrasound}
                alt=""
                width={1279}
                height={1920}
                loading="lazy"
                decoding="async"
              />
              <span className="play" aria-hidden="true" />
              <span className="dur" aria-hidden="true">
                0:18
              </span>
            </div>
            <figcaption>
              <b>Video · after the scan</b>
              <span>Tuesday · Week 12</span>
              <span className="meta">Private keepsake.</span>
            </figcaption>
          </figure>
          <div className="paper-obj voice-obj mem-voice" role="group" aria-label="Voice note, 42 seconds">
            <span className="play" aria-hidden="true" />
            <div>
              <span className="label">Voice note · 0:42</span>
              <p>On the way home from the scan.</p>
            </div>
            <div className="bars" aria-hidden="true">
              {VOICE_BARS.map((height, index) => (
                <i key={index} style={{ height }} />
              ))}
            </div>
            <span className="meta">Tuesday · Week 12</span>
          </div>
        </div>
        <p className="privacy-line">
          <span>
            <b>Private to you.</b> Only you can see these. The Companion does not read your reflections, photos,
            videos or voice notes.
          </span>
        </p>
      </div>
    </section>
  );
}

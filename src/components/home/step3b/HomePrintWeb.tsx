import journalFirstsPage from "@/assets/journal-firsts-page.jpg";

export default function HomePrintWeb() {
  return (
    <section className="printweb" id="printweb" aria-labelledby="pw-h">
      <div className="wrap">
        <div className="section-head">
          <span className="label" style={{ color: "var(--preg-deep)" }}>
            In print, on the web, and soon in your pocket
          </span>
          <h2 className="display-2" id="pw-h" style={{ marginTop: 12 }}>
            The same page, wherever you keep it
          </h2>
          <hr className="title-rule j" style={{ "--j-mid": "var(--preg-mid)" } as React.CSSProperties} />
        </div>
        <div className="cols">
          <div>
            <p className="deck" style={{ marginTop: 16 }}>
              A printed journal for pregnancy and the first year, and a digital journal that follows it week by
              week. Tell us your week, your cycle day or your baby's age and every page knows where you are. Write
              in either, or both; nothing is copied between them unless you choose to.
            </p>
            <ul className="honest" aria-label="Where The Start of You is available">
              <li>
                <b>
                  In print <i className="now">Now</i>
                </b>
                <span>The One Year Pregnancy Journal, landscape, hardback; further chapters to follow.</span>
              </li>
              <li>
                <b>
                  On the web <i className="now">Now</i>
                </b>
                <span>Guidance, the Companion, your digital journal and your memories, on one account.</span>
              </li>
              <li>
                <b>
                  In your pocket <i>Later</i>
                </b>
                <span>The app follows the web, on the same account. We will say plainly when it is ready.</span>
              </li>
            </ul>
          </div>
          <div className="pair">
            <div>
              <figure>
                <img
                  src={journalFirstsPage}
                  alt="The Start of You One Year Pregnancy Journal open at its Firsts page, photographed"
                  width={1920}
                  height={1280}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>In print · from the existing product shoot</figcaption>
              </figure>
            </div>
            <div>
              <div className="screen" role="group" aria-label="The same week on screen">
                <span className="label">On screen · Pregnancy · Week 12</span>
                <h3>Week Twelve</h3>
                <p className="chap">The first turning</p>
                <div className="ruled" aria-hidden="true" />
                <p className="meta">
                  Memories and milestones, written here, stay in this week. Add a photo, a video or a voice note
                  instead of words.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

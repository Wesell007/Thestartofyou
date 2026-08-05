/**
 * Expectation setting for the first signed-in First Year surface. Nothing here
 * promises a date, and nothing implies the companion is reading private notes.
 */
const WhatComesNextCard = () => (
  <section className="pb-14">
    <div
      className="rounded-[22px] border px-6 sm:px-8 py-7 sm:py-8"
      style={{
        borderColor: "hsl(var(--stage-firstyear-accent) / 0.14)",
        backgroundColor: "hsl(var(--stage-firstyear) / 0.4)",
      }}
    >
      <h2 className="font-serif text-[1.35rem] sm:text-[1.5rem] leading-[1.2] text-foreground/90 mb-3">
        What comes next
      </h2>
      <ul className="space-y-2.5 font-sans text-[13.5px] leading-[1.7] text-foreground/70 max-w-[54ch]">
        <li>More First Year support is on the way, a little at a time.</li>
        <li>There is nothing to log or track here yet, and nothing you need to keep up with.</li>
        <li>
          Cindy is still here if you have a question. She answers from general guidance only
          and does not look at anything private you have written.
        </li>
      </ul>
    </div>
  </section>
);

export default WhatComesNextCard;

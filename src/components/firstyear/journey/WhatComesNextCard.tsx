/**
 * Expectation setting for the signed-in First Year home. Acknowledges the
 * daily notes that already exist, and keeps anything future deliberately soft.
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
        <li>
          Your daily notes are here whenever you want them, for your baby and for you. There is
          nothing to keep up with.
        </li>
        <li>More First Year support will arrive a little at a time.</li>
        <li>
          Cindy is still here if you have a question. She answers from general guidance only
          and does not look at anything private you have written.
        </li>
      </ul>
    </div>
  </section>
);

export default WhatComesNextCard;

/**
 * Expectation setting for the signed-in First Year home. Acknowledges the
 * daily notes that already exist, and keeps anything future deliberately soft.
 * The lightest block on the page by design: it closes the scroll rather than
 * asking for anything.
 */
const WhatComesNextCard = () => (
  <section className="pb-12">
    <div className="border-t border-border/50 pt-6">
      <h2 className="font-serif text-[1.15rem] leading-[1.3] text-foreground/85 mb-2.5">
        What comes next
      </h2>
      <ul className="space-y-2 font-sans text-[13px] leading-[1.7] text-foreground/60 max-w-[54ch]">
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

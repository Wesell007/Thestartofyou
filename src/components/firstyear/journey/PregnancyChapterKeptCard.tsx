import { Link } from "react-router-dom";

type Props = {
  /** True once the pregnancy chapter has been kept for this user. */
  hasKeptChapter: boolean;
};

/**
 * Warm reassurance that the pregnancy chapter is still theirs. Deliberately
 * free of archive, snapshot or lifecycle language.
 */
const PregnancyChapterKeptCard = ({ hasKeptChapter }: Props) => (
  <section className="pb-10">
    <div
      className="rounded-[22px] keepsake-surface px-6 sm:px-8 py-7 sm:py-8"
      style={{ borderColor: "hsl(var(--stage-postpartum-accent) / 0.16)" }}
    >
      <p
        className="font-sans text-[10.5px] font-medium tracking-[0.3em] uppercase mb-4"
        style={{ color: "hsl(var(--stage-postpartum-accent))" }}
      >
        Kept for you
      </p>
      <h2 className="font-serif text-[1.4rem] sm:text-[1.6rem] leading-[1.2] text-foreground/90 mb-3">
        Your pregnancy chapter is kept
      </h2>
      <p className="font-sans text-[14px] leading-[1.75] text-foreground/70 max-w-[52ch]">
        {hasKeptChapter
          ? "Nothing you wrote or saved has gone anywhere. Your weeks, photos, videos, voice notes and reflections are still yours to open whenever you want to look back."
          : "Anything you saved during pregnancy stays yours. You can look back on it whenever you want to."}
      </p>
      <div className="mt-6">
        <Link
          to="/my-journey"
          className="inline-flex items-center rounded-pill border border-border/60 bg-parchment px-5 py-2.5 font-sans text-sm text-foreground/85 transition-colors hover:border-foreground/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          Revisit your pregnancy memories
        </Link>
      </div>
    </div>
  </section>
);

export default PregnancyChapterKeptCard;

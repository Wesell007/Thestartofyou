import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

type Props = {
  /** True once the pregnancy chapter has been kept for this user. */
  hasKeptChapter: boolean;
};

/**
 * Warm reassurance that the pregnancy chapter is still theirs. Deliberately
 * free of archive, snapshot or lifecycle language. The link only appears when
 * there is a kept chapter to open, so it can never be a dead end.
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
      {hasKeptChapter && (
        <Link
          to="/my-pregnancy-chapter"
          className="group mt-6 inline-flex items-center gap-2 font-sans text-[13.5px] font-medium underline underline-offset-4 decoration-[hsl(var(--stage-postpartum-accent)/0.5)] hover:decoration-[hsl(var(--stage-postpartum-accent))] transition-colors"
          style={{ color: "hsl(var(--stage-postpartum-accent))" }}
        >
          Open your pregnancy chapter
          <ArrowRight
            size={14}
            strokeWidth={1.7}
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      )}
    </div>
  </section>
);

export default PregnancyChapterKeptCard;

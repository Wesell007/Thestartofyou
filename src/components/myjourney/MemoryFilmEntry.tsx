import { Film } from "lucide-react";
import { SmallSprig, WatercolourWash } from "@/components/myweek/PregnancyDecor";

interface Props {
  /** Weeks that hold at least one saved memory. */
  keptWeeksCount: number;
  /** True when at least one photo, video or voice note exists. */
  hasMedia: boolean;
  onOpen: () => void;
}

/** Minimum kept weeks before a film is worth watching. */
const FILM_MIN_KEPT_WEEKS = 3;

const isFilmReady = (keptWeeksCount: number, hasMedia: boolean) =>
  keptWeeksCount >= FILM_MIN_KEPT_WEEKS && hasMedia;

/**
 * Gentle entry point for the private pregnancy memory film.
 * The caller decides eligibility by journey status; this component only
 * handles the sparse-journey disabled state.
 */
const MemoryFilmEntry = ({ keptWeeksCount, hasMedia, onOpen }: Props) => {
  const accent = "hsl(var(--stage-pregnancy-accent))";
  const ready = isFilmReady(keptWeeksCount, hasMedia);

  return (
    <section
      className="relative overflow-hidden rounded-[22px] pregnancy-paper px-6 sm:px-8 py-6 sm:py-7 mb-12 sm:mb-14"
      style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.16)" }}
    >
      <WatercolourWash tone="sage" opacity={0.32} className="!absolute" />
      <SmallSprig className="right-4 -bottom-5 w-[96px] rotate-6" opacity={0.32} />
      <p
        className="relative font-sans text-[10px] font-medium tracking-[0.3em] uppercase mb-4"
        style={{ color: accent }}
      >
        Your journey, as a film
      </p>

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-[46ch]">
          <h2 className="font-serif text-foreground text-[1.45rem] sm:text-[1.6rem] leading-snug mb-2">
            Create your pregnancy film
          </h2>
          <p className="font-sans text-[15px] font-light leading-7 text-muted-foreground">
            Turn your saved photos, videos, voice notes and reflections into a private memory film.
            It stays here with you, and nothing is shared.
          </p>
        </div>

        {ready ? (
          <button
            type="button"
            onClick={onOpen}
            className="inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-3 font-sans text-[13px] font-medium tracking-[0.06em] text-background transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{ background: accent }}
          >
            <Film className="h-4 w-4" aria-hidden />
            Preview my film
          </button>
        ) : (
          <p className="shrink-0 font-sans text-[13px] font-light leading-6 text-foreground/60 sm:max-w-[22ch]">
            Keep a few more memories to create your film.
          </p>
        )}
      </div>
    </section>
  );
};

export default MemoryFilmEntry;

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
  const ready = isFilmReady(keptWeeksCount, hasMedia);

  return (
    <section className="relative mb-12 overflow-hidden rounded-[22px] border-[hsl(var(--stage-pregnancy-edge))] pregnancy-paper px-6 py-6 sm:mb-14 sm:px-8 sm:py-7">
      <WatercolourWash tone="sage" opacity={0.32} className="!absolute" />
      <SmallSprig className="right-4 -bottom-5 w-[96px] rotate-6" opacity={0.32} />
      <p className="relative mb-4 font-sans text-[10px] font-medium tracking-[0.3em] uppercase text-[hsl(var(--stage-pregnancy-accent))]">
        Your journey, as a film
      </p>

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex max-w-[46ch] items-start gap-4">
          <span
            aria-hidden="true"
            className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[hsl(var(--stage-pregnancy-edge))] bg-[hsl(var(--stage-pregnancy-cream)/0.8)] text-[hsl(var(--stage-pregnancy-accent))] sm:inline-flex"
          >
            <Film className="h-4 w-4" />
          </span>
          <div>
            <h2 className="mb-2 font-serif text-[1.45rem] leading-snug text-foreground sm:text-[1.6rem]">
              Create your pregnancy film
            </h2>
            <p className="font-sans text-[15px] font-light leading-7 text-muted-foreground">
              Turn your saved photos, videos, voice notes and reflections into a private memory film.
              It stays here with you, and nothing is shared.
            </p>
          </div>
        </div>

        {ready ? (
          <button
            type="button"
            onClick={onOpen}
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-pill bg-[hsl(var(--stage-pregnancy-accent))] px-5 py-3 font-sans text-[13px] font-medium tracking-[0.06em] text-[hsl(var(--stage-pregnancy-cream))] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <Film className="h-4 w-4" aria-hidden />
            Preview my film
          </button>
        ) : (
          <p className="shrink-0 font-sans text-[13px] font-light leading-6 text-[hsl(var(--stage-pregnancy-text-soft))] sm:max-w-[22ch]">
            Keep a few more memories to create your film.
          </p>
        )}
      </div>
    </section>
  );
};

export default MemoryFilmEntry;

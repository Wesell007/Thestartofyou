import {
  defaultRealismAltForWeek,
  normaliseRealismTone,
  resolveRealismForWeek,
} from "@/lib/myWeekRealismIllustrations";
import { useBabyIllustrationStyle } from "@/hooks/useBabyIllustrationStyle";
import BabyIllustration from "./BabyIllustration";
import { SmallSprig, WatercolourWash } from "./PregnancyDecor";

interface Props {
  week: number;
  developmentCue: string;
  babyNote: string;
  whatThisMeans: string;
  /** Optional slug matching src/assets/size-cues/{slug}.png. Falls back to a
   *  parchment monogram when the asset is not present. */
  sizeComparisonSlug?: string;
}

// Resolve all size-cue asset pointers at build time. Missing slugs simply
// don't appear in the lookup and the component falls back gracefully.
const sizeCueModules = import.meta.glob<{ url: string }>(
  "../../assets/size-cues/*.png.asset.json",
  { eager: true, import: "default" },
);

const sizeCueUrlBySlug: Record<string, string> = (() => {
  const out: Record<string, string> = {};
  for (const [key, mod] of Object.entries(sizeCueModules)) {
    const file = key.split("/").pop() ?? "";
    const slug = file.replace(/\.png\.asset\.json$/, "");
    if (slug && mod && typeof (mod as { url?: string }).url === "string") {
      out[slug] = (mod as { url: string }).url;
    }
  }
  return out;
})();

const slugToMonogram = (slug?: string): string => {
  if (!slug) return "·";
  const first = slug.replace(/[^a-z]/gi, "").charAt(0);
  return first ? first.toUpperCase() : "·";
};

const SizeCue = ({ slug }: { slug?: string }) => {
  const url = slug ? sizeCueUrlBySlug[slug] : undefined;
  const baseStyle = {
    background:
      "radial-gradient(120% 90% at 50% 40%, hsl(var(--card)), hsl(var(--stage-pregnancy) / 0.35))",
    borderColor: "hsl(var(--stage-pregnancy-accent) / 0.22)",
  } as const;
  if (url) {
    return (
      <span
        aria-hidden="true"
        className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border overflow-hidden"
        style={baseStyle}
      >
        <img
          src={url}
          alt=""
          width={64}
          height={64}
          loading="lazy"
          className="h-[42px] w-[42px] object-contain select-none"
        />
      </span>
    );
  }
  return (
    <span
      aria-hidden="true"
      className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border font-serif text-[1.35rem] leading-none"
      style={{ ...baseStyle, color: "hsl(var(--stage-pregnancy-accent))" }}
    >
      {slugToMonogram(slug)}
    </span>
  );
};

/**
 * Baby this week — the visual centre of My Week 2.0.
 */
const SectionBabyThisWeek = ({
  week,
  developmentCue,
  babyNote,
  whatThisMeans,
  sizeComparisonSlug,
}: Props) => {
  const { style } = useBabyIllustrationStyle();
  const tone = normaliseRealismTone(style);
  const resolved = resolveRealismForWeek(week, tone);
  return (
    <section className="relative pt-4 pb-12 sm:pb-14">
      <div className="flex items-center gap-3 mb-5">
        <span
          aria-hidden="true"
          className="block w-5 h-px"
          style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.55)" }}
        />
        <p
          className="font-sans text-[10.5px] font-medium tracking-[0.26em] uppercase"
          style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
        >
          Baby this week
        </p>
      </div>

      <figure
        className="relative grid sm:grid-cols-12 gap-0 rounded-[24px] sm:rounded-[28px] overflow-hidden keepsake-surface shadow-elevated"
        style={{
          borderColor: "hsl(var(--stage-pregnancy-accent) / 0.16)",
          background:
            "linear-gradient(135deg, hsl(var(--card)), hsl(var(--stage-pregnancy) / 0.2))",
        }}
      >
        <div
          className="sm:col-span-6 px-6 sm:px-8 py-10 sm:py-12 flex items-center justify-center"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 45%, hsl(var(--stage-pregnancy) / 0.6), transparent 78%)",
          }}
        >
          <div className="relative mx-auto aspect-[13/16] w-full max-w-[280px] sm:max-w-[320px]">
            <span
              aria-hidden="true"
              className="absolute inset-[10%] rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, hsl(var(--stage-pregnancy-accent) / 0.24), transparent 74%)",
              }}
            />
            <span
              aria-hidden="true"
              className="absolute inset-[5%] rounded-full border"
              style={{ borderColor: "hsl(var(--card) / 0.55)" }}
            />
            <div className="relative z-10 h-full w-full" data-baby-week={week}>
              <img
                src={resolved.src}
                alt={defaultRealismAltForWeek(week)}
                loading="eager"
                decoding="async"
                className="h-full w-full object-contain select-none"
              />
            </div>
          </div>
        </div>

        <figcaption className="sm:col-span-6 px-6 sm:px-9 py-9 sm:py-12 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <SizeCue slug={sizeComparisonSlug} />
            <p
              className="font-sans text-[10px] font-medium tracking-[0.28em] uppercase"
              style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
            >
              About this size
            </p>
          </div>
          <p className="font-serif text-[1.35rem] sm:text-[1.55rem] text-foreground leading-[1.22] tracking-tight mb-6 max-w-[26ch]">
            {developmentCue}
          </p>
          <span
            aria-hidden="true"
            className="block w-12 h-px mb-5"
            style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.5)" }}
          />
          <p className="font-sans text-[14.5px] sm:text-[15px] font-normal text-foreground/80 leading-[1.75] mb-4">
            {babyNote}
          </p>
          <p className="font-serif italic text-[14px] sm:text-[14.5px] text-foreground/72 leading-[1.65] max-w-[36ch]">
            {whatThisMeans}
          </p>
        </figcaption>
      </figure>
    </section>
  );
};

export default SectionBabyThisWeek;

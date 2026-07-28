import { describe, expect, it } from "vitest";
import {
  FILM_HARD_CAP_SECONDS,
  buildFilmTimeline,
  reflectionExcerpt,
  trimesterForWeek,
  weekMemoryChips,
  type WeekMemory,
} from "./memoryFilm";

const photo = (n: number) => ({ url: `photo-${n}`, caption: `Caption ${n}` });

const baseInput = (weeks: WeekMemory[], selectedWeeks?: number[]) => ({
  firstName: "Ada",
  currentWeek: 30,
  dueLabel: "12 March",
  weeks,
  selectedWeeks,
});

describe("trimesterForWeek", () => {
  it("maps week ranges to trimesters", () => {
    expect(trimesterForWeek(1)).toBe(1);
    expect(trimesterForWeek(12)).toBe(1);
    expect(trimesterForWeek(13)).toBe(2);
    expect(trimesterForWeek(27)).toBe(2);
    expect(trimesterForWeek(28)).toBe(3);
    expect(trimesterForWeek(42)).toBe(3);
  });
});

describe("reflectionExcerpt", () => {
  it("prefers the first sentence", () => {
    expect(reflectionExcerpt("Felt a kick today. Then another one later on.")).toBe(
      "Felt a kick today.",
    );
  });

  it("trims long text at a word boundary", () => {
    const long = "word ".repeat(60);
    const out = reflectionExcerpt(long);
    expect(out.length).toBeLessThanOrEqual(121);
    expect(out.endsWith("…")).toBe(true);
  });

  it("collapses whitespace and returns empty for blank text", () => {
    expect(reflectionExcerpt("  a\n\n b ")).toBe("a b");
    expect(reflectionExcerpt("   ")).toBe("");
  });
});

describe("weekMemoryChips", () => {
  it("lists what a week contains", () => {
    expect(
      weekMemoryChips({ week: 5, photo: photo(5), reflection: "Hi", voice: { url: "v" } }),
    ).toEqual(["Photo", "Voice", "Reflection"]);
  });
});

describe("buildFilmTimeline", () => {
  it("returns an empty timeline when nothing is selected", () => {
    const t = buildFilmTimeline(baseInput([{ week: 5, photo: photo(5) }], []));
    expect(t.beats).toHaveLength(0);
    expect(t.totalSeconds).toBe(0);
    expect(t.sparse).toBe(true);
  });

  it("excludes weeks with no saved memory", () => {
    const t = buildFilmTimeline(
      baseInput([
        { week: 4, photo: photo(4) },
        { week: 6 },
        { week: 8, reflection: "   " },
      ]),
    );
    expect(t.includedWeeks).toEqual([4]);
  });

  it("sorts memories by week regardless of input order", () => {
    const t = buildFilmTimeline(
      baseInput([
        { week: 20, photo: photo(20) },
        { week: 6, photo: photo(6) },
        { week: 30, photo: photo(30) },
      ]),
    );
    expect(t.includedWeeks).toEqual([6, 20, 30]);
    const weekOrder = t.beats.filter((b) => b.week !== null).map((b) => b.week);
    expect(weekOrder).toEqual([6, 20, 30]);
  });

  it("opens with a cover beat and closes with an ending beat", () => {
    const t = buildFilmTimeline(baseInput([{ week: 9, photo: photo(9) }]));
    expect(t.beats[0].kind).toBe("cover");
    expect(t.beats[t.beats.length - 1].kind).toBe("ending");
  });

  it("inserts a chapter card when the trimester changes", () => {
    const t = buildFilmTimeline(
      baseInput([
        { week: 8, photo: photo(8) },
        { week: 10, photo: photo(10) },
        { week: 20, photo: photo(20) },
        { week: 32, photo: photo(32) },
      ]),
    );
    const chapters = t.beats.filter((b) => b.kind === "chapter");
    expect(chapters).toHaveLength(3);
    expect(chapters.map((c) => (c.kind === "chapter" ? c.trimester : null))).toEqual([1, 2, 3]);
  });

  it("honours the selected weeks", () => {
    const weeks: WeekMemory[] = [
      { week: 5, photo: photo(5) },
      { week: 15, photo: photo(15) },
      { week: 25, photo: photo(25) },
    ];
    const t = buildFilmTimeline(baseInput(weeks, [5, 25]));
    expect(t.includedWeeks).toEqual([5, 25]);
  });

  it("gives beats contiguous start times matching the total", () => {
    const t = buildFilmTimeline(
      baseInput([
        { week: 6, photo: photo(6), reflection: "A quiet week." },
        { week: 14, video: { url: "v14", durationSeconds: 40 } },
        { week: 30, voice: { url: "a30", durationSeconds: 120 } },
      ]),
    );
    let cursor = 0;
    t.beats.forEach((b) => {
      expect(b.startSeconds).toBeCloseTo(cursor, 5);
      cursor += b.durationSeconds;
    });
    expect(t.totalSeconds).toBeCloseTo(cursor, 5);
  });

  it("caps long clips and long voice notes", () => {
    const t = buildFilmTimeline(
      baseInput([
        { week: 14, video: { url: "v", durationSeconds: 60 } },
        { week: 15, voice: { url: "a", durationSeconds: 180 } },
      ]),
    );
    const video = t.beats.find((b) => b.kind === "video");
    const voice = t.beats.find((b) => b.kind === "voice");
    expect(video?.durationSeconds).toBe(6);
    expect(voice?.durationSeconds).toBe(10);
  });

  it("falls back to default durations when media duration is unknown", () => {
    const t = buildFilmTimeline(
      baseInput([
        { week: 14, video: { url: "v", durationSeconds: null } },
        { week: 15, voice: { url: "a" } },
      ]),
    );
    expect(t.beats.find((b) => b.kind === "video")?.durationSeconds).toBe(5);
    expect(t.beats.find((b) => b.kind === "voice")?.durationSeconds).toBe(8);
  });

  it("never exceeds the hard cap, even for a very full journey", () => {
    const weeks: WeekMemory[] = [];
    for (let w = 4; w <= 40; w++) {
      weeks.push({
        week: w,
        photo: photo(w),
        video: { url: `v${w}`, durationSeconds: 30 },
        voice: { url: `a${w}`, durationSeconds: 60 },
        reflection: `Reflection for week ${w}. More text after.`,
      });
    }
    const t = buildFilmTimeline(baseInput(weeks));
    expect(t.totalSeconds).toBeLessThanOrEqual(FILM_HARD_CAP_SECONDS);
    expect(t.excludedForCap.length).toBeGreaterThan(0);
    expect(t.includedWeeks).toContain(4);
    expect(t.includedWeeks).toContain(40);
  });

  it("flags sparse journeys", () => {
    const sparse = buildFilmTimeline(baseInput([{ week: 7, photo: photo(7) }]));
    expect(sparse.sparse).toBe(true);
  });

  it("keeps a standalone week label only when the week does not open on a photo", () => {
    const t = buildFilmTimeline(
      baseInput([
        { week: 9, photo: photo(9) },
        { week: 10, voice: { url: "a10", durationSeconds: 9 } },
      ]),
    );
    const labels = t.beats.filter((b) => b.kind === "weekLabel");
    expect(labels).toHaveLength(1);
    expect(labels[0].week).toBe(10);
  });

  it("is deterministic for the same input", () => {
    const weeks: WeekMemory[] = [
      { week: 6, photo: photo(6), reflection: "First signs." },
      { week: 21, video: { url: "v21", durationSeconds: 12 } },
      { week: 33, voice: { url: "a33", durationSeconds: 22 }, photo: photo(33) },
    ];
    const a = buildFilmTimeline(baseInput(weeks));
    const b = buildFilmTimeline(baseInput(weeks));
    expect(JSON.stringify(a)).toBe(JSON.stringify(b));
  });
});

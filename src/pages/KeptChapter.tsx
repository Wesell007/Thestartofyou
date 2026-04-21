import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { differenceInDays } from "date-fns";
import { ArrowLeft, ArrowRight, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { MAX_PREGNANCY_WEEK } from "@/data/weekData";
import { getMyWeekContent, getWeekIdentity } from "@/data/myWeekContent";
import MyWeekHeader from "@/components/myweek/MyWeekHeader";
import MyWeekFooter from "@/components/myweek/MyWeekFooter";
import WeekIllustration from "@/components/myweek/WeekIllustration";

/**
 * /my-week/:week — A KEPT CHAPTER.
 *
 * The past-week view. Distinct in hierarchy and tone from the live
 * /my-week page:
 *   - Memory-led: photo + reflection lead the page
 *   - Single composed column (no two-zone rail, no "what's next" CTA stack)
 *   - Editable: reflection and photo can be revisited; guidance is fixed
 *   - Calm, preserved, revisitable — never a dead archive
 *
 * Navigation: back to /my-journey, between adjacent kept weeks, or
 * forward to the live /my-week.
 */

type Loaded = {
  userId: string;
  firstName: string;
  currentWeek: number;
  reflection: string;
  reflectionUpdatedAt: string | null;
  photoUrl: string | null;
};

const computeWeek = (lmp: Date) => {
  const days = differenceInDays(new Date(), lmp);
  return Math.min(Math.max(Math.floor(days / 7) + 1, 1), MAX_PREGNANCY_WEEK);
};

const formatDate = (d: Date) =>
  d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

const KeptChapter = () => {
  const { week: weekParam } = useParams();
  const navigate = useNavigate();
  const week = Number(weekParam);
  const [state, setState] = useState<Loaded | null>(null);
  const [reflection, setReflection] = useState("");
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");
  const initialRef = useRef("");
  const debounceRef = useRef<number | null>(null);

  const validWeek = Number.isFinite(week) && week >= 1 && week <= MAX_PREGNANCY_WEEK;

  useEffect(() => {
    if (!validWeek) {
      navigate("/my-journey", { replace: true });
      return;
    }
    let cancelled = false;
    (async () => {
      const { data: sess } = await supabase.auth.getSession();
      const user = sess.session?.user;
      if (!user) {
        navigate("/auth", { replace: true });
        return;
      }
      const [{ data: profile }, { data: journey }, { data: refl }, { data: photo }] = await Promise.all([
        supabase.from("profiles").select("first_name").eq("user_id", user.id).maybeSingle(),
        supabase.from("saved_journeys").select("lmp_date").eq("user_id", user.id).maybeSingle(),
        supabase.from("reflections").select("content, updated_at").eq("user_id", user.id).eq("week", week).maybeSingle(),
        supabase.from("week_photos").select("storage_path").eq("user_id", user.id).eq("week", week).maybeSingle(),
      ]);
      if (cancelled) return;
      if (!journey) {
        navigate("/due-date-calculator", { replace: true });
        return;
      }
      if (!profile?.first_name) {
        navigate("/setup", { replace: true });
        return;
      }
      const currentWeek = computeWeek(new Date(journey.lmp_date));

      // Guard: if the requested week is the live week or future, redirect.
      if (week >= currentWeek) {
        navigate(week === currentWeek ? "/my-week" : "/my-journey", { replace: true });
        return;
      }

      let photoUrl: string | null = null;
      if (photo?.storage_path) {
        const { data: urlData } = await supabase.storage
          .from("weekly-photos")
          .createSignedUrl(photo.storage_path, 60 * 60);
        photoUrl = urlData?.signedUrl ?? null;
      }

      const reflContent = refl?.content ?? "";
      initialRef.current = reflContent;
      setReflection(reflContent);
      setSavedAt(refl?.updated_at ? new Date(refl.updated_at) : null);

      setState({
        userId: user.id,
        firstName: profile.first_name,
        currentWeek,
        reflection: reflContent,
        reflectionUpdatedAt: refl?.updated_at ?? null,
        photoUrl,
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [week, validWeek, navigate]);

  // Editable reflection — debounced autosave, same model as live week.
  useEffect(() => {
    if (!state) return;
    if (reflection === initialRef.current) return;
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    setSaveState("saving");
    debounceRef.current = window.setTimeout(async () => {
      const { error } = await supabase
        .from("reflections")
        .upsert(
          { user_id: state.userId, week, content: reflection },
          { onConflict: "user_id,week" }
        );
      if (!error) {
        initialRef.current = reflection;
        setSavedAt(new Date());
        setSaveState("saved");
        window.setTimeout(() => setSaveState((s) => (s === "saved" ? "idle" : s)), 2000);
      }
    }, 900);
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [reflection, state, week]);

  const content = useMemo(() => (validWeek ? getMyWeekContent(week) : null), [week, validWeek]);
  const identity = useMemo(() => (validWeek ? getWeekIdentity(week) : null), [week, validWeek]);

  if (!state || !content || !identity) {
    return <div className="min-h-screen bg-parchment" />;
  }

  const { firstName, currentWeek, photoUrl } = state;
  const trimesterLabel =
    week <= 12 ? "First trimester" : week <= 27 ? "Second trimester" : week <= 40 ? "Third trimester" : "Past your due date";
  const weeksAgo = currentWeek - week;
  const prevWeek = week > 1 ? week - 1 : null;
  const nextWeek = week < currentWeek - 1 ? week + 1 : null;

  return (
    <div className="min-h-screen bg-parchment-grain page-vignette relative">
      {/* Atmospheric — kept chapters live in a deeper, settled wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[680px] -z-10"
        style={{
          background:
            "radial-gradient(70% 60% at 50% 0%, hsl(var(--stage-pregnancy) / 0.5), transparent 70%)",
        }}
      />
      <MyWeekHeader />

      <main className="relative mx-auto w-full max-w-[760px] px-5 sm:px-8 md:px-10 pt-16 sm:pt-20 lg:pt-24 pb-20">
        {/* Quiet return cue — back to journey */}
        <div className="mb-10 sm:mb-12">
          <Link
            to="/my-journey"
            className="inline-flex items-center gap-2 font-sans text-[10.5px] font-medium tracking-[0.24em] uppercase text-foreground/55 hover:text-foreground/85 transition-colors group"
          >
            <ArrowLeft size={12} strokeWidth={1.6} className="transition-transform group-hover:-translate-x-0.5" />
            Your journey
          </Link>
        </div>

        {/* Frontispiece — distinct "Kept chapter" eyebrow */}
        <header className="mb-12 sm:mb-14">
          <div className="flex items-center gap-3 mb-6">
            <span
              aria-hidden="true"
              className="block w-6 h-px"
              style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.55)" }}
            />
            <p
              className="font-sans text-[10.5px] font-medium tracking-[0.32em] uppercase"
              style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
            >
              A kept chapter · {weeksAgo} {weeksAgo === 1 ? "week" : "weeks"} ago
            </p>
          </div>

          <p className="font-sans text-[10.5px] font-medium tracking-[0.28em] uppercase text-foreground/45 mb-4">
            {trimesterLabel} · Week {week}
          </p>
          <h1
            className="font-serif font-medium text-foreground leading-[0.98] tracking-tight mb-5"
            style={{ fontSize: "clamp(2.4rem, 5.4vw, 3.9rem)" }}
          >
            {identity.chapterTitle}
          </h1>
          <p className="font-serif italic text-[1.15rem] sm:text-[1.25rem] text-foreground/65 leading-[1.45] max-w-[34ch]">
            {identity.theme}
          </p>
        </header>

        {/* Memory band — photo + small relational illustration paired */}
        <section className="mb-14 sm:mb-16">
          {photoUrl ? (
            <figure className="relative rounded-[28px] overflow-hidden held-image bg-card">
              <img
                src={photoUrl}
                alt={`Week ${week} — ${identity.chapterTitle}`}
                className="w-full max-h-[560px] object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{ boxShadow: "inset 0 0 100px hsl(222 14% 12% / 0.1)" }}
              />
              <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 rounded-full bg-foreground/40 backdrop-blur-md text-background/95">
                <Lock size={10} strokeWidth={1.8} />
                <span className="font-sans text-[10px] font-medium tracking-[0.22em] uppercase">
                  Kept · Private
                </span>
              </div>
              <figcaption
                className="px-6 py-4 border-t font-serif italic text-[13px] text-foreground/62 flex items-center justify-between gap-4"
                style={{
                  borderColor: "hsl(var(--stage-pregnancy-accent) / 0.16)",
                  background: "hsl(var(--stage-pregnancy) / 0.18)",
                }}
              >
                <span>A frame from week {week} — {identity.chapterTitle.toLowerCase()}.</span>
                {savedAt && (
                  <span className="font-sans not-italic text-[10px] font-medium tracking-[0.22em] uppercase text-foreground/48 shrink-0">
                    Kept · {formatDate(savedAt)}
                  </span>
                )}
              </figcaption>
            </figure>
          ) : (
            // No photo was kept for this week — a quiet "frame remembered empty"
            // state. Not an upload prompt; the moment has passed but the chapter
            // is still kept.
            <div
              className="relative rounded-[28px] keepsake-surface px-8 sm:px-10 py-12 flex flex-col items-center text-center"
              style={{
                background:
                  "radial-gradient(120% 80% at 50% 35%, hsl(var(--stage-pregnancy) / 0.45), hsl(var(--card)) 78%)",
              }}
            >
              <WeekIllustration week={week} size={200} className="mx-auto" />
              <p className="font-serif italic text-[14px] text-foreground/55 mt-6 max-w-[30ch] leading-snug">
                No frame was kept this week — only the words and the chapter remain.
              </p>
              <p className="font-sans text-[10px] font-medium tracking-[0.24em] uppercase text-foreground/38 mt-4">
                Week {week} · Held without an image
              </p>
            </div>
          )}
        </section>

        {/* Reflection — editable, the heart of the kept chapter */}
        <section className="mb-14 sm:mb-16">
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
              What you wrote
            </p>
          </div>
          <p className="font-serif italic text-[14.5px] text-foreground/55 mb-6 max-w-[40ch]">
            {initialRef.current.trim().length > 0
              ? "Still yours to revise — words held this week can be tended again."
              : "Nothing was written this week. You can still set something down, even now."}
          </p>

          <div className="relative rounded-[28px] keepsake-surface">
            <div className="relative px-7 sm:px-10 pt-9 pb-2">
              <span
                aria-hidden="true"
                className="absolute left-6 sm:left-9 top-9 bottom-12 w-[1.5px] rounded-full"
                style={{
                  background:
                    "linear-gradient(to bottom, hsl(var(--stage-pregnancy-accent) / 0.55), hsl(var(--stage-pregnancy-accent) / 0.04))",
                }}
              />
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                rows={6}
                placeholder={
                  initialRef.current.length === 0
                    ? "Set down what you remember of this week."
                    : ""
                }
                aria-label={`Your reflection for week ${week}`}
                className="w-full bg-transparent border-0 pl-5 sm:pl-6 pr-0 py-2 font-serif text-[17.5px] sm:text-[18.5px] italic font-normal text-foreground placeholder:text-foreground/35 placeholder:italic resize-none focus:outline-none leading-[1.85] min-h-[180px] caret-[hsl(var(--stage-pregnancy-accent))]"
              />
            </div>
            <div
              className="flex items-center justify-between px-7 sm:px-10 py-4 border-t gap-4"
              style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.16)" }}
            >
              <span
                className="font-sans text-[10.5px] font-medium tracking-[0.22em] uppercase"
                style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
              >
                {saveState === "saving" ? "Holding…" : "Held"}
              </span>
              <span className="font-serif italic text-[12.5px] text-foreground/45 hidden sm:inline">
                {savedAt ? `Last tended ${formatDate(savedAt)}` : "Autosaves as you write"}
              </span>
            </div>
          </div>
        </section>

        {/* Fixed chapter content — what mattered then. Past-tense, retrospective. */}
        <section className="mb-14 sm:mb-16">
          <div className="flex items-center gap-3 mb-7">
            <span
              aria-hidden="true"
              className="block w-5 h-px"
              style={{ backgroundColor: "hsl(var(--stage-pregnancy-accent) / 0.55)" }}
            />
            <p
              className="font-sans text-[10.5px] font-medium tracking-[0.26em] uppercase"
              style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
            >
              What mattered then
            </p>
          </div>

          <p className="font-serif italic text-[13.5px] text-foreground/55 mb-7 max-w-[44ch] leading-relaxed">
            This was the shape of week {week} — what was quietly true of your body, your baby, and the feeling underneath.
          </p>

          <p className="font-serif text-[1.4rem] sm:text-[1.55rem] text-foreground/85 leading-[1.25] mb-9 max-w-[28ch]">
            {content.lead}
          </p>

          <ol className="space-y-5">
            {content.matters.map((p, i) => (
              <li key={i} className="relative pl-6 border-l-[1.5px]" style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.32)" }}>
                <p
                  className="font-sans text-[10px] font-medium tracking-[0.26em] uppercase mb-2"
                  style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
                >
                  {p.title} · then
                </p>
                <p className="font-sans text-[14.5px] font-light text-foreground/68 leading-[1.7] max-w-[52ch]">
                  {p.body}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-10 pt-8 border-t" style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.16)" }}>
            <p
              className="font-sans text-[10px] font-medium tracking-[0.26em] uppercase mb-3"
              style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
            >
              What you were holding
            </p>
            <p className="font-serif italic text-[1.1rem] text-foreground/70 leading-[1.45] max-w-[36ch]">
              {content.focus.headline}
            </p>
          </div>
        </section>

        {/* Place in the journey — adjacent kept chapters + return to live */}
        <nav
          aria-label="Move between kept chapters"
          className="border-t pt-10 mt-12"
          style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.18)" }}
        >
          <p
            className="font-sans text-[10px] font-medium tracking-[0.32em] uppercase text-center text-foreground/48 mb-2"
          >
            Where this sits in your journey
          </p>
          <p className="font-serif italic text-[12.5px] text-foreground/48 text-center mb-7 max-w-[40ch] mx-auto">
            Move between kept chapters, or step back into the week you're living now.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 items-stretch">
            <div className="sm:text-left text-center">
              {prevWeek ? (
                <Link
                  to={`/my-week/${prevWeek}`}
                  className="group block rounded-[18px] px-5 py-4 transition-colors hover:bg-[hsl(var(--stage-pregnancy)/0.18)]"
                >
                  <span className="font-sans text-[10px] font-medium tracking-[0.24em] uppercase text-foreground/45 flex items-center gap-1.5 sm:justify-start justify-center mb-1.5">
                    <ArrowLeft size={11} strokeWidth={1.6} className="transition-transform group-hover:-translate-x-0.5" />
                    Earlier · Week {prevWeek}
                  </span>
                  <span className="font-serif italic text-[14.5px] text-foreground/68">
                    {getWeekIdentity(prevWeek).chapterTitle}
                  </span>
                </Link>
              ) : (
                <div className="px-5 py-4 opacity-40">
                  <span className="font-sans text-[10px] font-medium tracking-[0.24em] uppercase text-foreground/45">
                    The beginning
                  </span>
                </div>
              )}
            </div>

            <Link
              to="/my-week"
              className="text-center rounded-[18px] px-5 py-4 transition-colors hover:bg-[hsl(var(--stage-pregnancy)/0.22)]"
              style={{ background: "hsl(var(--stage-pregnancy) / 0.12)" }}
            >
              <span
                className="font-sans text-[10px] font-medium tracking-[0.24em] uppercase mb-1.5 block"
                style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
              >
                The live chapter · Week {currentWeek}
              </span>
              <span className="font-serif italic text-[14.5px] text-foreground/72">
                Return to this week
              </span>
            </Link>

            <div className="sm:text-right text-center">
              {nextWeek ? (
                <Link
                  to={`/my-week/${nextWeek}`}
                  className="group block rounded-[18px] px-5 py-4 transition-colors hover:bg-[hsl(var(--stage-pregnancy)/0.18)]"
                >
                  <span className="font-sans text-[10px] font-medium tracking-[0.24em] uppercase text-foreground/45 flex items-center gap-1.5 sm:justify-end justify-center mb-1.5">
                    Later · Week {nextWeek}
                    <ArrowRight size={11} strokeWidth={1.6} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                  <span className="font-serif italic text-[14.5px] text-foreground/68">
                    {getWeekIdentity(nextWeek).chapterTitle}
                  </span>
                </Link>
              ) : (
                <div className="px-5 py-4 opacity-40">
                  <span className="font-sans text-[10px] font-medium tracking-[0.24em] uppercase text-foreground/45">
                    Closest to now
                  </span>
                </div>
              )}
            </div>
          </div>

          <p className="text-center font-serif italic text-[12.5px] text-foreground/45 mt-8 max-w-[36ch] mx-auto">
            {firstName}, this chapter is kept. You can revisit it any time.
          </p>
        </nav>
      </main>

      <MyWeekFooter contextual={null} />
    </div>
  );
};

export default KeptChapter;

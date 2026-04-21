import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { differenceInDays } from "date-fns";
import { ArrowLeft, ArrowRight, Lock, BookOpen, Mic, MicOff, Feather } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { MAX_PREGNANCY_WEEK } from "@/data/weekData";
import { getMyWeekContent, getWeekIdentity } from "@/data/myWeekContent";
import MyWeekHeader from "@/components/myweek/MyWeekHeader";
import MyWeekFooter from "@/components/myweek/MyWeekFooter";
import WeekIllustration from "@/components/myweek/WeekIllustration";
import NoteShapingSuggestion from "@/components/myweek/NoteShapingSuggestion";
import { useShapingThreshold } from "@/hooks/useShapingThreshold";

/**
 * /my-week/:week — A KEPT CHAPTER.
 *
 * Two-zone preserved chapter object:
 *   LEFT  — chapter context: eyebrow, what this chapter holds (index),
 *           adjacent kept chapters as objects, return to live week
 *   RIGHT — the kept chapter itself: title + theme, memory band, what you
 *           wrote, what mattered then, what you were holding
 *
 * Memory-led, retrospective, revisitable. Reflection editable; guidance fixed.
 */

type Loaded = {
  userId: string;
  firstName: string;
  currentWeek: number;
  reflection: string;
  reflectionUpdatedAt: string | null;
  photoUrl: string | null;
  firstWrittenContent: string | null;
  firstWrittenAt: string | null;
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
  const recognitionRef = useRef<any>(null);
  const interimRef = useRef("");
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [lastInputWasVoice, setLastInputWasVoice] = useState(false);
  const [showFirstWritten, setShowFirstWritten] = useState(false);

  useEffect(() => {
    const SR =
      typeof window !== "undefined" &&
      ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
    setVoiceSupported(Boolean(SR));
  }, []);

  const startListening = () => {
    setVoiceError(null);
    const SR =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      setVoiceError("Voice isn't available in this browser.");
      return;
    }
    try {
      const rec = new SR();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = "en-GB";
      interimRef.current = "";
      rec.onresult = (event: any) => {
        let finalChunk = "";
        let interim = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const r = event.results[i];
          if (r.isFinal) finalChunk += r[0].transcript;
          else interim += r[0].transcript;
        }
        if (finalChunk) {
          setReflection((prev) => {
            const sep = prev && !prev.endsWith(" ") && !prev.endsWith("\n") ? " " : "";
            return prev + sep + finalChunk.trim();
          });
          setLastInputWasVoice(true);
        }
        interimRef.current = interim;
      };
      rec.onerror = (e: any) => {
        if (e?.error === "not-allowed") setVoiceError("We couldn't hear you just now. You can try again, or type instead.");
        else if (e?.error === "no-speech") setVoiceError("Some of that didn't come through. Your words are still here — you can speak again, or type the rest.");
        else setVoiceError("Some of that didn't come through. Your words are still here.");
        setIsListening(false);
      };
      rec.onend = () => setIsListening(false);
      rec.start();
      recognitionRef.current = rec;
      setIsListening(true);
    } catch {
      setVoiceError("We couldn't hear you just now. You can try again, or type instead.");
    }
  };

  const stopListening = () => {
    try {
      recognitionRef.current?.stop();
    } catch {
      /* noop */
    }
    setIsListening(false);
  };

  useEffect(() => {
    return () => {
      try {
        recognitionRef.current?.abort?.();
      } catch {
        /* noop */
      }
    };
  }, []);

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
        supabase
          .from("reflections")
          .select("content, updated_at, first_written_content, first_written_at")
          .eq("user_id", user.id)
          .eq("week", week)
          .maybeSingle(),
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
        firstWrittenContent: refl?.first_written_content ?? null,
        firstWrittenAt: refl?.first_written_at ?? null,
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [week, validWeek, navigate]);

  // Threshold for shaping availability on the kept note.
  const keptThreshold = useShapingThreshold(reflection);

  const acceptShapedDraft = async (shaped: string) => {
    if (!state) return;
    const captureFirstWritten =
      !state.firstWrittenContent && initialRef.current.trim().length > 0;
    const updates: Record<string, string | null> = { content: shaped };
    if (captureFirstWritten) {
      updates.first_written_content = initialRef.current;
      updates.first_written_at = new Date().toISOString();
    }
    const { error } = await supabase
      .from("reflections")
      .upsert(
        { user_id: state.userId, week, ...updates },
        { onConflict: "user_id,week" }
      );
    if (!error) {
      setReflection(shaped);
      initialRef.current = shaped;
      setSavedAt(new Date());
      setSaveState("saved");
      if (captureFirstWritten) {
        setState((s) =>
          s
            ? {
                ...s,
                firstWrittenContent: initialRef.current,
                firstWrittenAt: new Date().toISOString(),
              }
            : s
        );
      }
      setLastInputWasVoice(false);
      window.setTimeout(() => setSaveState((s) => (s === "saved" ? "idle" : s)), 2000);
    }
  };

  const restoreFirstWritten = async () => {
    if (!state?.firstWrittenContent) return;
    const { error } = await supabase
      .from("reflections")
      .upsert(
        { user_id: state.userId, week, content: state.firstWrittenContent },
        { onConflict: "user_id,week" }
      );
    if (!error) {
      setReflection(state.firstWrittenContent);
      initialRef.current = state.firstWrittenContent;
      setSavedAt(new Date());
      setSaveState("saved");
      setShowFirstWritten(false);
      window.setTimeout(() => setSaveState((s) => (s === "saved" ? "idle" : s)), 2000);
    }
  };

  // Editable reflection — debounced autosave.
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
  const hasReflection = initialRef.current.trim().length > 0;

  // What this chapter holds — a small index of what's preserved on this page.
  const chapterHolds: { label: string }[] = [
    { label: hasReflection ? "Your note from that week" : "Space to revise your note" },
    { label: photoUrl ? "One remembered image" : "A frame remembered empty" },
    { label: "What mattered then" },
    { label: "The focus you were holding" },
  ];

  const accent = "hsl(var(--stage-pregnancy-accent))";
  const accentSoft = (a: number) => `hsl(var(--stage-pregnancy-accent) / ${a})`;
  const tint = (a: number) => `hsl(var(--stage-pregnancy) / ${a})`;

  return (
    <div className="min-h-screen bg-parchment-grain page-vignette relative">
      {/* Atmospheric — kept chapters live in a deeper, settled wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[760px] -z-10"
        style={{
          background:
            "radial-gradient(72% 60% at 50% 0%, hsl(var(--stage-pregnancy) / 0.55), transparent 72%)",
        }}
      />
      <MyWeekHeader />

      <main className="relative mx-auto w-full max-w-[680px] md:max-w-[1040px] lg:max-w-[1240px] xl:max-w-[1320px] px-5 sm:px-8 md:px-10 lg:px-14 pt-12 sm:pt-16 lg:pt-20 pb-20">
        {/* Quiet return cue */}
        <div className="mb-8 sm:mb-10">
          <Link
            to="/my-journey"
            className="inline-flex items-center gap-2 font-sans text-[10.5px] font-medium tracking-[0.24em] uppercase text-foreground/55 hover:text-foreground/85 transition-colors group"
          >
            <ArrowLeft size={12} strokeWidth={1.6} className="transition-transform group-hover:-translate-x-0.5" />
            Your journey
          </Link>
        </div>

        {/* Two-zone preserved chapter object — desktop only.
            Tablet & mobile unfold as a single composed chapter. */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 xl:gap-20 lg:items-start">
          {/* ============== LEFT — chapter context rail (lg+ only) ============== */}
          <aside className="hidden lg:block lg:col-span-4 lg:sticky lg:top-24 lg:self-start space-y-5">
            {/* Frontispiece */}
            <div>
              <p
                className="font-sans text-[10px] font-medium tracking-[0.32em] uppercase mb-4"
                style={{ color: accent }}
              >
                A kept chapter
              </p>
              <h1
                className="font-serif font-medium text-foreground leading-[0.98] tracking-tight mb-4"
                style={{ fontSize: "clamp(2rem, 3.4vw, 2.8rem)" }}
              >
                Week {week},<br />still held.
              </h1>
              <p className="font-serif text-[13.5px] text-foreground/60 leading-[1.55] max-w-[34ch]">
                Not the live week anymore. A preserved chapter you can revisit, revise, and place back inside the wider shape of your pregnancy.
              </p>
            </div>

            {/* What this chapter holds — small index */}
            <div
              className="rounded-[20px] keepsake-surface px-5 py-5"
              style={{ borderColor: accentSoft(0.16) }}
            >
              <div className="flex items-center gap-2 mb-3">
                <BookOpen size={11} strokeWidth={1.6} style={{ color: accent }} />
                <p
                  className="font-sans text-[9.5px] font-medium tracking-[0.28em] uppercase"
                  style={{ color: accent }}
                >
                  This chapter holds
                </p>
              </div>
              <ul className="space-y-2">
                {chapterHolds.map((h, i) => (
                  <li
                    key={i}
                    className="font-serif text-[13px] text-foreground/68 leading-[1.45] pl-3 border-l"
                    style={{ borderColor: accentSoft(0.32) }}
                  >
                    {h.label}
                  </li>
                ))}
              </ul>
            </div>

            {/* Adjacent kept chapters — chapter objects, not links */}
            <div className="space-y-3">
              {prevWeek && (
                <Link
                  to={`/my-week/${prevWeek}`}
                  className="group block rounded-[18px] keepsake-surface px-5 py-4 transition-all hover:translate-x-[-2px]"
                  style={{ borderColor: accentSoft(0.14) }}
                >
                  <span
                    className="font-sans text-[9.5px] font-medium tracking-[0.26em] uppercase mb-1.5 flex items-center gap-1.5 text-foreground/50"
                  >
                    <ArrowLeft size={10} strokeWidth={1.6} className="transition-transform group-hover:-translate-x-0.5" />
                    Previous kept chapter
                  </span>
                  <p className="font-serif font-medium text-[15px] text-foreground/85 leading-tight">
                    Week {prevWeek}
                  </p>
                  <p className="font-serif italic text-[12.5px] text-foreground/55 mt-0.5">
                    {getWeekIdentity(prevWeek).theme}
                  </p>
                </Link>
              )}

              <Link
                to="/my-week"
                className="block rounded-[18px] px-5 py-4 transition-colors"
                style={{
                  background: tint(0.22),
                  border: `1px solid ${accentSoft(0.22)}`,
                }}
              >
                <span
                  className="font-sans text-[9.5px] font-medium tracking-[0.26em] uppercase mb-1.5 block"
                  style={{ color: accent }}
                >
                  The live week
                </span>
                <p className="font-serif font-medium text-[15px] text-foreground/85 leading-tight">
                  This week
                </p>
                <p className="font-serif italic text-[12.5px] text-foreground/60 mt-0.5">
                  Week {currentWeek} · being lived now
                </p>
              </Link>

              {nextWeek && (
                <Link
                  to={`/my-week/${nextWeek}`}
                  className="group block rounded-[18px] keepsake-surface px-5 py-4 transition-all hover:translate-x-[2px]"
                  style={{ borderColor: accentSoft(0.14) }}
                >
                  <span
                    className="font-sans text-[9.5px] font-medium tracking-[0.26em] uppercase mb-1.5 flex items-center gap-1.5 text-foreground/50"
                  >
                    Next kept chapter
                    <ArrowRight size={10} strokeWidth={1.6} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                  <p className="font-serif font-medium text-[15px] text-foreground/85 leading-tight">
                    Week {nextWeek}
                  </p>
                  <p className="font-serif italic text-[12.5px] text-foreground/55 mt-0.5">
                    {getWeekIdentity(nextWeek).theme}
                  </p>
                </Link>
              )}
            </div>
          </aside>

          {/* ============== RIGHT — the kept chapter itself ============== */}
          <article className="lg:col-span-8 mt-0 space-y-10 sm:space-y-12 lg:space-y-14">
            {/* ---------- Title block ----------
                Tablet & mobile: this is the single composed frontispiece.
                One eyebrow, one paired title, one held theme, one quiet
                descriptor, then a slim "this chapter holds" ribbon. The
                duplicated "Week X, still held" h1 + early card has been
                removed so the opening reads as one unfolding object.
                Lg+: the left rail owns the kept-chapter framing. */}
            <header>
              {/* Desktop-only kept-chapter eyebrow */}
              <p
                className="font-sans text-[10.5px] font-medium tracking-[0.30em] uppercase mb-4 hidden lg:block"
                style={{ color: accent }}
              >
                A kept chapter · {weeksAgo} {weeksAgo === 1 ? "week" : "weeks"} ago
              </p>
              {/* Tablet/mobile-only unified eyebrow */}
              <p
                className="lg:hidden font-sans text-[10px] font-medium tracking-[0.32em] uppercase mb-3"
                style={{ color: accent }}
              >
                A kept chapter · {weeksAgo} {weeksAgo === 1 ? "week" : "weeks"} ago
              </p>
              <p className="font-sans text-[10.5px] font-medium tracking-[0.26em] uppercase text-foreground/45 mb-4 sm:mb-5">
                {trimesterLabel} · Week {week}
              </p>
              <h1
                className="font-serif font-medium text-foreground leading-[0.96] tracking-tight mb-4 sm:mb-5"
                style={{ fontSize: "clamp(2.1rem, 5.4vw, 4.2rem)" }}
              >
                {identity.chapterTitle}
              </h1>
              <p className="font-serif italic text-[1.1rem] sm:text-[1.25rem] lg:text-[1.3rem] text-foreground/65 leading-[1.4] max-w-[36ch] mb-5 sm:mb-7">
                {identity.theme}
              </p>
              <p className="font-serif text-[14.5px] sm:text-[15px] text-foreground/72 leading-[1.7] max-w-[52ch]">
                A preserved chapter — still revisable. The week was lived; what follows is what was kept of it.
              </p>

              {/* Slim "this chapter holds" ribbon — tablet & mobile only.
                  Hairline + italic list, sitting *after* the title block as
                  marginalia rather than a card that interrupts the opening. */}
              <div className="lg:hidden mt-7 sm:mt-8 relative pl-5 sm:pl-6">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1.5 bottom-1.5 w-px"
                  style={{ background: `linear-gradient(to bottom, ${accentSoft(0.5)}, ${accentSoft(0.05)})` }}
                />
                <div className="flex items-center gap-2 mb-2.5">
                  <BookOpen size={11} strokeWidth={1.6} style={{ color: accent }} />
                  <p
                    className="font-sans text-[9.5px] font-medium tracking-[0.28em] uppercase"
                    style={{ color: accent }}
                  >
                    This chapter holds
                  </p>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-1.5">
                  {chapterHolds.map((h, i) => (
                    <li
                      key={i}
                      className="font-serif italic text-[13px] sm:text-[13.5px] text-foreground/62 leading-[1.5]"
                    >
                      {h.label}
                    </li>
                  ))}
                </ul>
              </div>
            </header>

            {/* Memory band — photo + relational caption side-by-side on md+ */}
            <section>
              {photoUrl ? (
                <figure
                  className="relative grid sm:grid-cols-12 gap-0 rounded-[28px] overflow-hidden held-image bg-card"
                  style={{ borderColor: accentSoft(0.16) }}
                >
                  <div className="sm:col-span-7 relative">
                    <img
                      src={photoUrl}
                      alt={`Week ${week} — ${identity.chapterTitle}`}
                      className="w-full h-full max-h-[520px] object-cover"
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
                  </div>
                  <figcaption
                    className="sm:col-span-5 px-6 sm:px-7 py-6 sm:py-9 flex flex-col justify-between gap-4"
                    style={{ background: tint(0.20), borderLeft: `1px solid ${accentSoft(0.16)}` }}
                  >
                    <div>
                      <p
                        className="font-sans text-[10px] font-medium tracking-[0.26em] uppercase mb-3"
                        style={{ color: accent }}
                      >
                        What this week held
                      </p>
                      <p className="font-serif text-[1.5rem] sm:text-[1.65rem] text-foreground/85 leading-[1.15] tracking-tight">
                        A frame from {identity.chapterTitle.toLowerCase()}.
                      </p>
                      <p className="font-serif italic text-[13px] text-foreground/58 mt-3 leading-relaxed">
                        Kept here so the feeling of week {week} stays close, not lost to the wider arc.
                      </p>
                    </div>
                    {savedAt && (
                      <p className="font-sans text-[10px] font-medium tracking-[0.22em] uppercase text-foreground/45">
                        Week {week} · kept {formatDate(savedAt)}
                      </p>
                    )}
                  </figcaption>
                </figure>
              ) : (
                <figure
                  className="relative grid sm:grid-cols-12 gap-0 rounded-[28px] overflow-hidden keepsake-surface"
                  style={{ borderColor: accentSoft(0.16) }}
                >
                  <div
                    className="sm:col-span-7 relative px-6 sm:px-8 py-11 sm:py-16 flex flex-col items-center justify-center text-center"
                    style={{
                      background:
                        "radial-gradient(120% 80% at 50% 40%, hsl(var(--stage-pregnancy) / 0.55), transparent 75%)",
                    }}
                  >
                    {/* Pressed botanical / preserved frame — emotionally held, not absent */}
                    <div className="relative">
                      <div
                        aria-hidden="true"
                        className="absolute -inset-6 rounded-full"
                        style={{
                          background:
                            "radial-gradient(circle, hsl(var(--stage-pregnancy) / 0.45), transparent 70%)",
                        }}
                      />
                      <WeekIllustration week={week} size={140} className="relative mx-auto opacity-90 sm:scale-[1.2]" />
                    </div>
                    <div className="flex items-center gap-2 mt-6">
                      <Lock size={10} strokeWidth={1.8} style={{ color: accent }} />
                      <p
                        className="font-sans text-[10px] font-medium tracking-[0.26em] uppercase"
                        style={{ color: accent }}
                      >
                        Held in words · Week {week}
                      </p>
                    </div>
                  </div>
                  <figcaption
                    className="sm:col-span-5 px-6 sm:px-7 py-7 sm:py-9 flex flex-col justify-between gap-4"
                    style={{ background: tint(0.18), borderLeft: `1px solid ${accentSoft(0.16)}` }}
                  >
                    <div>
                      <p
                        className="font-sans text-[10px] font-medium tracking-[0.26em] uppercase mb-3"
                        style={{ color: accent }}
                      >
                        What this week held
                      </p>
                      <p className="font-serif text-[1.5rem] sm:text-[1.6rem] text-foreground/85 leading-[1.15] tracking-tight">
                        Some weeks are remembered in words, not pictures.
                      </p>
                      <p className="font-serif italic text-[13px] text-foreground/58 mt-3 leading-relaxed">
                        No image was kept from week {week}, and the chapter is no thinner for it. The shape of it is still here, in what you wrote and what you were holding.
                      </p>
                    </div>
                    <p className="font-sans text-[10px] font-medium tracking-[0.22em] uppercase text-foreground/45">
                      A chapter, kept regardless
                    </p>
                  </figcaption>
                </figure>
              )}
            </section>

            {/* What you wrote + Where this sits — side by side on md+ */}
            <section className="grid md:grid-cols-12 gap-6 md:gap-8 items-start">
              {/* What you wrote — given gravity */}
              <div className="md:col-span-7">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span aria-hidden="true" className="block w-5 h-px" style={{ backgroundColor: accentSoft(0.55) }} />
                    <p
                      className="font-sans text-[10px] font-medium tracking-[0.28em] uppercase"
                      style={{ color: accent }}
                    >
                      What you wrote
                    </p>
                  </div>
                  <span
                    className="font-sans text-[9.5px] font-medium tracking-[0.22em] uppercase px-2.5 py-1 rounded-full"
                    style={{ background: tint(0.22), color: accent }}
                  >
                    Autosave
                  </span>
                </div>
                <h3
                  className="font-serif font-medium text-foreground leading-[1.05] tracking-tight mb-5"
                  style={{ fontSize: "clamp(1.5rem, 2.3vw, 1.9rem)" }}
                >
                  {hasReflection ? "Still yours to revise." : "Nothing was written then."}
                </h3>

                <div
                  className="relative rounded-[24px] keepsake-surface overflow-hidden"
                  style={{ borderColor: accentSoft(0.18) }}
                >
                  {/* Quiet preserved-note header — wax-seal cue, not a chrome bar */}
                  <div
                    className="flex items-center justify-between gap-3 px-6 sm:px-8 pt-5 pb-3"
                    style={{
                      background: `linear-gradient(180deg, ${tint(0.18)}, transparent)`,
                    }}
                  >
                    <div className="flex items-center gap-2.5">
                      <Feather size={12} strokeWidth={1.6} style={{ color: accent }} />
                      <span
                        className="font-sans text-[9.5px] font-medium tracking-[0.26em] uppercase"
                        style={{ color: accent }}
                      >
                        Note from week {week}
                      </span>
                    </div>
                    <span
                      className="font-serif italic text-[11.5px] text-foreground/50"
                    >
                      Preserved · still revisable
                    </span>
                  </div>

                  <div className="relative px-6 sm:px-8 pt-3 pb-2">
                    <span
                      aria-hidden="true"
                      className="absolute left-5 sm:left-7 top-3 bottom-12 w-[1.5px] rounded-full"
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
                        hasReflection
                          ? ""
                          : "It does not have to be everything. A line of what you remember of this week is enough."
                      }
                      aria-label={`Your reflection for week ${week}`}
                      className="w-full bg-transparent border-0 pl-5 sm:pl-6 pr-0 py-2 font-serif text-[16.5px] sm:text-[17.5px] italic font-normal text-foreground placeholder:text-foreground/35 placeholder:italic resize-none focus:outline-none leading-[1.85] min-h-[170px] caret-[hsl(var(--stage-pregnancy-accent))]"
                    />
                    {isListening && interimRef.current && (
                      <p className="pl-5 sm:pl-6 -mt-1 mb-2 font-serif italic text-[14.5px] text-foreground/40 leading-[1.65]">
                        {interimRef.current}
                      </p>
                    )}
                  </div>

                  {/* Voice path — restrained, inside the note */}
                  <div
                    className="px-5 sm:px-8 py-3 sm:py-3 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-4"
                    style={{
                      borderColor: accentSoft(0.14),
                      background: tint(0.08),
                    }}
                  >
                    <button
                      type="button"
                      onClick={isListening ? stopListening : startListening}
                      disabled={!voiceSupported}
                      aria-pressed={isListening}
                      className="group inline-flex items-center justify-center gap-2.5 rounded-full px-3.5 py-2 sm:py-1.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed self-start"
                      style={{
                        background: isListening ? accentSoft(0.14) : "hsl(var(--card))",
                        border: `1px solid ${accentSoft(isListening ? 0.45 : 0.22)}`,
                        color: accent,
                      }}
                      title={
                        voiceSupported
                          ? isListening
                            ? "Tap to stop"
                            : "Speak this week out loud"
                          : "Voice isn't available in this browser"
                      }
                    >
                      <span className="relative flex items-center justify-center w-4 h-4">
                        {isListening ? (
                          <>
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 rounded-full animate-ping"
                              style={{ background: accentSoft(0.4) }}
                            />
                            <MicOff size={12} strokeWidth={1.8} className="relative" />
                          </>
                        ) : (
                          <Mic size={12} strokeWidth={1.8} />
                        )}
                      </span>
                      <span className="font-sans text-[10.5px] font-medium tracking-[0.22em] uppercase whitespace-nowrap">
                        {isListening ? "Listening · tap to stop" : "Speak instead"}
                      </span>
                    </button>
                    <span className="font-serif italic text-[12px] sm:text-[11.5px] text-foreground/50 sm:text-foreground/45 leading-snug sm:text-right">
                      {voiceError
                        ? voiceError
                        : isListening
                          ? "Speak gently. Words appear as you go."
                          : voiceSupported
                            ? "If typing isn't easy, say what you remember."
                            : "Typing only in this browser."}
                    </span>
                  </div>

                  <div
                    className="flex items-center justify-between px-6 sm:px-8 py-3 border-t gap-4"
                    style={{ borderColor: accentSoft(0.14) }}
                  >
                    <span
                      className="font-sans text-[10px] font-medium tracking-[0.22em] uppercase"
                      style={{ color: accent }}
                    >
                      {saveState === "saving" ? "Holding…" : "Held"}
                    </span>
                    <span className="font-serif italic text-[12px] text-foreground/45 hidden sm:inline">
                      {savedAt ? `Last tended ${formatDate(savedAt)}` : "Autosaves as you write"}
                    </span>
                  </div>
                </div>

                <p className="font-serif italic text-[12.5px] text-foreground/48 mt-3 pl-1">
                  Type or speak — both are kept the same way. You can still refine this note if the words come more clearly now.
                </p>
              </div>

              {/* Where this sits — small relational object */}
              <aside className="md:col-span-5 md:mt-0">
                <div className="flex items-center gap-3 mb-4">
                  <span aria-hidden="true" className="block w-5 h-px" style={{ backgroundColor: accentSoft(0.55) }} />
                  <p
                    className="font-sans text-[10px] font-medium tracking-[0.28em] uppercase"
                    style={{ color: accent }}
                  >
                    Where this sits
                  </p>
                </div>
                <div
                  className="rounded-[24px] keepsake-surface px-6 py-7 space-y-5"
                  style={{ borderColor: accentSoft(0.16) }}
                >
                  {prevWeek ? (
                    <div>
                      <p className="font-sans text-[9.5px] font-medium tracking-[0.26em] uppercase text-foreground/45 mb-1.5">
                        Before this
                      </p>
                      <p className="font-serif font-medium text-[18px] text-foreground/85 leading-tight">
                        Week {prevWeek}
                      </p>
                      <p className="font-serif italic text-[13px] text-foreground/55 mt-1">
                        {getWeekIdentity(prevWeek).theme}
                      </p>
                    </div>
                  ) : null}
                  {nextWeek ? (
                    <div>
                      <p className="font-sans text-[9.5px] font-medium tracking-[0.26em] uppercase text-foreground/45 mb-1.5">
                        After this
                      </p>
                      <p className="font-serif font-medium text-[18px] text-foreground/85 leading-tight">
                        Week {nextWeek}
                      </p>
                      <p className="font-serif italic text-[13px] text-foreground/55 mt-1">
                        {getWeekIdentity(nextWeek).theme}
                      </p>
                    </div>
                  ) : null}
                  <div className="pt-4 border-t" style={{ borderColor: accentSoft(0.14) }}>
                    <p className="font-serif italic text-[13px] text-foreground/60 leading-relaxed">
                      This was one of the weeks where the middle of pregnancy began to feel more physical than imagined.
                    </p>
                  </div>
                </div>
              </aside>
            </section>

            {/* What mattered then — substantial chapter-like section */}
            <section
              className="rounded-[28px] keepsake-surface px-6 sm:px-10 py-9 sm:py-12"
              style={{ borderColor: accentSoft(0.16) }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span aria-hidden="true" className="block w-5 h-px" style={{ backgroundColor: accentSoft(0.55) }} />
                <p
                  className="font-sans text-[10px] font-medium tracking-[0.28em] uppercase"
                  style={{ color: accent }}
                >
                  What mattered then
                </p>
              </div>

              <p
                className="font-serif italic text-foreground/82 leading-[1.25] mb-9 max-w-[36ch]"
                style={{ fontSize: "clamp(1.3rem, 2.1vw, 1.65rem)" }}
              >
                {content.lead}
              </p>

              <ol className="space-y-6">
                {content.matters.map((p, i) => (
                  <li
                    key={i}
                    className="relative pl-6 border-l-[1.5px]"
                    style={{ borderColor: accentSoft(0.32) }}
                  >
                    <p
                      className="font-sans text-[10px] font-medium tracking-[0.26em] uppercase mb-2"
                      style={{ color: accent }}
                    >
                      {p.title} · then
                    </p>
                    <p className="font-sans text-[14.5px] font-light text-foreground/70 leading-[1.7] max-w-[58ch]">
                      {p.body}
                    </p>
                  </li>
                ))}
              </ol>
            </section>

            {/* What you were holding + return to live — closing band */}
            <section
              className="rounded-[28px] px-6 sm:px-10 py-8 sm:py-10 grid md:grid-cols-12 gap-6 items-end"
              style={{
                background: `linear-gradient(135deg, ${tint(0.32)}, ${tint(0.14)})`,
                border: `1px solid ${accentSoft(0.18)}`,
              }}
            >
              <div className="md:col-span-7">
                <p
                  className="font-sans text-[10px] font-medium tracking-[0.28em] uppercase mb-3"
                  style={{ color: accent }}
                >
                  What you were holding
                </p>
                <p
                  className="font-serif text-foreground leading-[1.1] tracking-tight"
                  style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.1rem)" }}
                >
                  {content.focus.headline}
                </p>
              </div>
              <div className="md:col-span-5 md:text-right">
                <p
                  className="font-sans text-[9.5px] font-medium tracking-[0.28em] uppercase mb-2"
                  style={{ color: accent }}
                >
                  Where this sits in your journey
                </p>
                <p className="font-serif italic text-[14px] text-foreground/68 leading-relaxed mb-4">
                  {firstName}, this chapter is still yours to return to.
                </p>
                <Link
                  to="/my-week"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 transition-colors group"
                  style={{
                    background: "hsl(var(--card))",
                    border: `1px solid ${accentSoft(0.32)}`,
                    color: accent,
                  }}
                >
                  <span className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase whitespace-nowrap">
                    Return to the live week
                  </span>
                  <ArrowRight size={12} strokeWidth={1.8} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </section>

            {/* Adjacent kept chapters — tablet & mobile only.
                On lg+ this lives inside the left rail as chapter objects. */}
            {(prevWeek || nextWeek) && (
              <nav
                aria-label="Adjacent kept chapters"
                className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
              >
                {prevWeek && (
                  <Link
                    to={`/my-week/${prevWeek}`}
                    className="group block rounded-[20px] keepsake-surface px-5 py-4 sm:py-5 transition-all hover:-translate-y-0.5"
                    style={{ borderColor: accentSoft(0.16) }}
                  >
                    <span className="font-sans text-[9.5px] font-medium tracking-[0.26em] uppercase mb-1.5 flex items-center gap-1.5 text-foreground/50">
                      <ArrowLeft size={10} strokeWidth={1.6} className="transition-transform group-hover:-translate-x-0.5" />
                      Previous kept chapter
                    </span>
                    <p className="font-serif font-medium text-[15.5px] text-foreground/85 leading-tight">
                      Week {prevWeek}
                    </p>
                    <p className="font-serif italic text-[12.5px] text-foreground/55 mt-0.5">
                      {getWeekIdentity(prevWeek).theme}
                    </p>
                  </Link>
                )}
                {nextWeek && (
                  <Link
                    to={`/my-week/${nextWeek}`}
                    className="group block rounded-[20px] keepsake-surface px-5 py-4 sm:py-5 transition-all hover:-translate-y-0.5 sm:text-right"
                    style={{ borderColor: accentSoft(0.16) }}
                  >
                    <span className="font-sans text-[9.5px] font-medium tracking-[0.26em] uppercase mb-1.5 flex items-center sm:justify-end gap-1.5 text-foreground/50">
                      Next kept chapter
                      <ArrowRight size={10} strokeWidth={1.6} className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                    <p className="font-serif font-medium text-[15.5px] text-foreground/85 leading-tight">
                      Week {nextWeek}
                    </p>
                    <p className="font-serif italic text-[12.5px] text-foreground/55 mt-0.5">
                      {getWeekIdentity(nextWeek).theme}
                    </p>
                  </Link>
                )}
              </nav>
            )}
          </article>
        </div>
      </main>

      <MyWeekFooter contextual={null} />
    </div>
  );
};

export default KeptChapter;

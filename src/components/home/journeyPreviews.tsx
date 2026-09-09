import { BookOpen, CalendarDays, Heart, NotebookPen, Sparkles } from "lucide-react";

import {
  TTC_EYEBROW,
  TTC_HELPER,
  TTC_INNER_RADIUS,
  TTC_PAPER_CARD,
} from "@/components/ttc/journey/ttcStyles";
import {
  FY_CARD_BODY,
  FY_CARD_RADIUS,
  FY_CHIP,
  FY_INNER_RADIUS,
  FY_KICKER,
} from "@/components/firstyear/journey/firstYearStyles";

/**
 * Static product compositions shared by the homepage preview section and the
 * public Start your journey page. Demonstration content only: no journey,
 * journal, baby or TTC data is read, and no protected component is mounted.
 */

const cyclePath = [
  { label: "Period started", state: "behind" },
  { label: "Possible fertile window", state: "behind" },
  { label: "Likely ovulation", state: "here" },
  { label: "Two-week wait", state: "ahead" },
  { label: "Possible test day", state: "ahead" },
] as const;

export const TtcPreview = () => (
  <article className={`${TTC_PAPER_CARD} overflow-hidden px-5 py-7 sm:px-9 sm:py-10`}>
    <header className="border-b border-[hsl(var(--stage-ttc-edge))] pb-7">
      <p className={TTC_EYEBROW}>My TTC journey</p>
      <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><h3 className="font-serif text-[2rem] leading-tight text-[hsl(var(--stage-ttc-text))] sm:text-[2.6rem]">Today</h3><p className={`${TTC_HELPER} mt-2`}>A gentle view of this cycle, based on the dates you saved.</p></div>
        <span className="self-start rounded-full border border-[hsl(var(--stage-ttc-edge))] bg-[hsl(var(--stage-ttc-sage-tint))] px-4 py-2 font-sans text-[12px] text-[hsl(var(--stage-ttc-olive))]">Current cycle</span>
      </div>
    </header>
    <div className="grid gap-5 py-7 lg:grid-cols-[1.1fr_0.9fr]">
      <section className={`${TTC_INNER_RADIUS} border border-[hsl(var(--stage-ttc-edge))] bg-[hsl(var(--stage-ttc-cream-soft)/0.68)] p-5`} aria-label="TTC cycle path preview">
        <p className={`${TTC_EYEBROW} mb-4`}>Your cycle path</p>
        <ol className="space-y-3.5">
          {cyclePath.map(({ label, state }) => <li key={label} className="flex items-center gap-3"><span className={`h-2.5 w-2.5 shrink-0 rounded-full ${state === "ahead" ? "bg-[hsl(var(--stage-ttc-olive)/0.25)]" : "bg-[hsl(var(--stage-ttc-olive))]"}`} /><span className="font-serif text-[15px] leading-[1.5] text-[hsl(var(--stage-ttc-text))]">{label}</span>{state === "here" && <span className="ml-auto font-sans text-[10px] uppercase text-[hsl(var(--stage-ttc-accent))]">Around now</span>}</li>)}
        </ol>
      </section>
      <section className="border-l-0 border-[hsl(var(--stage-ttc-edge))] lg:border-l lg:pl-6" aria-label="TTC guidance preview">
        <p className={TTC_EYEBROW}>What matters now</p>
        <h4 className="mt-3 font-serif text-[1.45rem] text-[hsl(var(--stage-ttc-text))]">Notice without pressure</h4>
        <p className={`${TTC_HELPER} mt-3`}>Cycle signs can offer context, but no single sign confirms ovulation. Keep only what helps.</p>
        <div className="mt-5 flex items-center gap-3 border-t border-[hsl(var(--stage-ttc-edge))] pt-4"><CalendarDays size={17} aria-hidden="true" className="text-stage-ttc-accent" /><span className="font-sans text-[12px] text-[hsl(var(--stage-ttc-text-soft))]">A possible fertile window is an estimate</span></div>
      </section>
    </div>
    <div className="grid gap-4 border-t border-[hsl(var(--stage-ttc-edge))] pt-6 sm:grid-cols-2">
      <div className={`${TTC_INNER_RADIUS} bg-[hsl(var(--stage-ttc-sage-tint))] p-5`}><NotebookPen size={18} aria-hidden="true" className="text-stage-ttc-accent" /><p className="mt-3 font-serif text-[1.15rem] text-[hsl(var(--stage-ttc-text))]">Your private cycle notes</p><p className={`${TTC_HELPER} mt-2`}>A quiet place for symptoms, tests, feelings or a simple note.</p></div>
      <div className={`${TTC_INNER_RADIUS} border border-[hsl(var(--stage-ttc-edge))] p-5`}><BookOpen size={18} aria-hidden="true" className="text-stage-ttc-accent" /><p className="mt-3 font-serif text-[1.15rem] text-[hsl(var(--stage-ttc-text))]">Guidance for this point</p><p className={`${TTC_HELPER} mt-2`}>Clear reading for the questions that often come with waiting.</p></div>
    </div>
  </article>
);

export const PregnancyPreview = () => (
  <article className="pregnancy-paper overflow-hidden rounded-[26px] border border-[hsl(var(--stage-pregnancy-edge))] px-5 py-7 shadow-soft sm:px-9 sm:py-10">
    <header className="border-b border-[hsl(var(--stage-pregnancy-edge))] pb-7"><p className="font-sans text-[10.5px] font-medium uppercase text-stage-pregnancy-accent">My week</p><div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><h3 className="font-serif text-[2rem] leading-tight text-foreground sm:text-[2.7rem]">Week 24</h3><p className="mt-2 font-serif italic text-[16px] text-[hsl(var(--stage-pregnancy-text-soft))]">Second trimester · A steadier stretch</p></div><span className="self-start rounded-full bg-background/75 px-4 py-2 font-sans text-[12px] text-foreground/65">16 weeks to go</span></div></header>
    <section className="grid gap-6 py-7 md:grid-cols-[1.15fr_0.85fr]" aria-label="Pregnancy weekly guidance preview"><div><p className="font-sans text-[10.5px] font-medium uppercase text-stage-pregnancy-accent">This week</p><h4 className="mt-3 font-serif text-[1.55rem] text-foreground">Movement becomes more familiar</h4><p className="mt-3 font-sans text-[14px] font-light leading-[1.75] text-muted-foreground">Your baby is growing steadily. You may notice clearer patterns of movement as the days pass.</p><div className="mt-5 flex items-center gap-3 border-t border-[hsl(var(--stage-pregnancy-edge))] pt-4"><CalendarDays size={17} aria-hidden="true" className="text-stage-pregnancy-accent" /><span className="font-sans text-[12px] text-muted-foreground">Your next routine appointment comes into view</span></div></div><div className="rounded-[16px] border border-[hsl(var(--stage-pregnancy-edge))] bg-background/65 p-5"><p className="font-sans text-[10.5px] font-medium uppercase text-stage-pregnancy-accent">Current focus</p><p className="mt-3 font-serif text-[1.2rem] text-foreground">Getting to know your pattern</p><p className="mt-2 font-sans text-[13px] font-light leading-relaxed text-muted-foreground">There is no set number of movements. What matters is becoming familiar with what is usual for you.</p></div></section>
    <div className="grid gap-4 border-t border-[hsl(var(--stage-pregnancy-edge))] pt-6 sm:grid-cols-2"><div className="rounded-[16px] bg-background/65 p-5"><Heart size={18} aria-hidden="true" className="text-stage-pregnancy-accent" /><p className="mt-3 font-serif text-[1.15rem] text-foreground">A meaningful moment</p><p className="mt-2 font-sans text-[13px] font-light leading-relaxed text-muted-foreground">Keep a thought, a photograph or something you want to remember.</p></div><div className="rounded-[16px] border border-[hsl(var(--stage-pregnancy-edge))] p-5"><BookOpen size={18} aria-hidden="true" className="text-stage-pregnancy-accent" /><p className="mt-3 font-serif text-[1.15rem] text-foreground">Supporting this week</p><p className="mt-2 font-sans text-[13px] font-light leading-relaxed text-muted-foreground">Appointments, your body and practical preparation in one calm place.</p></div></div>
  </article>
);

export const FirstYearPreview = () => {
  const chip = {
    color: "hsl(var(--stage-firstyear-ink))",
    backgroundColor: "hsl(var(--stage-firstyear-cream))",
    border: "1px solid hsl(var(--stage-firstyear-accent) / 0.28)",
  };

  return (
    <article
      className={`${FY_CARD_RADIUS} border px-6 py-8 sm:px-9 sm:py-10`}
      style={{
        borderColor: "hsl(var(--stage-firstyear-accent) / 0.45)",
        background:
          "linear-gradient(158deg, hsl(var(--stage-firstyear-soft)) 0%, hsl(var(--stage-firstyear)) 58%, hsl(var(--stage-firstyear-cream)) 100%)",
      }}
    >
      <header className="border-b border-[hsl(var(--stage-firstyear-accent)/0.22)] pb-7"><p className={FY_KICKER} style={{ color: "hsl(var(--stage-firstyear-ink))" }}>My first year</p><div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><h3 className="font-serif text-[2rem] leading-tight text-foreground sm:text-[2.6rem]">Today</h3><p className="mt-2 font-serif italic text-[16px] text-muted-foreground">A calm place for baby and for you</p></div><span className={FY_CHIP} style={chip}>Four months old</span></div></header>
      <div className="mt-5 grid gap-5 md:grid-cols-[1.1fr_0.9fr]"><section><p className={FY_KICKER}>Today's orientation</p><p className="mt-3 font-serif text-[1.55rem] leading-tight text-foreground">More reaching, rolling and conversation</p><p className={`${FY_CARD_BODY} mt-3`}>At this age, everyday play and familiar voices support connection. Development is individual, never a race.</p></section><section className={`${FY_INNER_RADIUS} px-5 py-5`} style={{ backgroundColor: "hsl(var(--stage-firstyear-cream))", border: "1px solid hsl(var(--stage-firstyear-accent) / 0.2)" }}><p className={FY_KICKER}>For baby and parent</p><div className="mt-4 space-y-3 font-sans text-[13px] text-muted-foreground"><p>Feeding and sleep rhythms</p><p>Development and play</p><p>Your recovery and wellbeing</p></div></section></div>
      <div className="mt-6 grid gap-4 border-t border-[hsl(var(--stage-firstyear-accent)/0.22)] pt-6 sm:grid-cols-2"><div
        className={`${FY_INNER_RADIUS} px-5 py-5`}
        style={{
          backgroundColor: "hsl(var(--stage-firstyear-cream))",
          border: "1px solid hsl(var(--stage-firstyear-accent) / 0.2)",
        }}
      >
        <NotebookPen size={18} aria-hidden="true" className="text-stage-firstyear-accent" /><p className="mt-3 font-serif text-[1.15rem] text-foreground">A note for today</p><p className={`${FY_CARD_BODY} mt-2`}>Something you noticed, how the day is going or a question to remember.</p>
      </div><div className={`${FY_INNER_RADIUS} border border-[hsl(var(--stage-firstyear-accent)/0.22)] px-5 py-5`}><Sparkles size={18} aria-hidden="true" className="text-stage-firstyear-accent" /><p className="mt-3 font-serif text-[1.15rem] text-foreground">A memory to keep</p><p className={`${FY_CARD_BODY} mt-2`}>Hold onto one small moment, without anything to keep up with.</p></div></div>
    </article>
  );
};

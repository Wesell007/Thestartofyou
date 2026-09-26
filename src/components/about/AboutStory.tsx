import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import journalFlatlay from "@/assets/journal-flatlay.jpg";

const Eyebrow = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`flex items-center gap-3 mb-5 ${className}`}>
    <div className="h-px w-8 bg-current opacity-30" aria-hidden="true" />
    <p className="font-sans text-[11px] tracking-[0.22em] uppercase">{children}</p>
  </div>
);

const Section = ({ id, className = "", children, labelledBy }: { id?: string; className?: string; children: React.ReactNode; labelledBy: string }) => (
  <section id={id} aria-labelledby={labelledBy} className={`relative py-16 md:py-24 ${className}`}>
    <div className="container mx-auto px-6 md:px-10 max-w-5xl">{children}</div>
  </section>
);

export const AboutHero = () => (
  <section aria-labelledby="about-hero" className="relative bg-parchment pt-28 pb-16 md:pt-36 md:pb-24">
    <div className="container mx-auto px-6 md:px-10 max-w-5xl animate-fade-up">
      <Eyebrow className="text-muted-foreground">Our story</Eyebrow>
      <h1 id="about-hero" className="font-serif text-4xl sm:text-5xl md:text-6xl text-foreground leading-[1.06] max-w-3xl mb-7">
        Support that changes as family life changes.
      </h1>
      <div className="max-w-[62ch] space-y-4 font-sans text-base md:text-lg font-light text-muted-foreground leading-relaxed mb-9">
        <p>
          The Start of You is a calmer place for the questions, decisions and moments that come with trying to conceive, pregnancy, the first year, toddler life and the wider family around it.
        </p>
        <p>
          Guidance, practical tools, a context-aware Companion and space to reflect, designed to work together without making parenthood feel like another thing to manage.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
        <Link
          to="/start-your-journey"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-6 py-3 min-h-[44px] font-sans text-sm hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Start where you are <ArrowRight size={15} aria-hidden="true" />
        </Link>
        <a
          href="#why-we-exist"
          className="inline-flex items-center justify-center min-h-[44px] px-4 font-sans text-sm text-foreground/80 underline underline-offset-4 decoration-border hover:decoration-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
        >
          Why we built this
        </a>
      </div>
    </div>
  </section>
);

export const AboutWhy = () => (
  <Section id="why-we-exist" labelledBy="about-why" className="bg-card scroll-mt-24">
    <div className="grid md:grid-cols-12 gap-10">
      <div className="md:col-span-5 text-muted-foreground">
        <Eyebrow>Why we exist</Eyebrow>
        <h2 id="about-why" className="font-serif text-3xl md:text-4xl text-foreground leading-snug">
          Parenthood is not short of information. It is short of continuity.
        </h2>
      </div>
      <div className="md:col-span-7 max-w-[62ch] space-y-4 font-sans text-[15px] md:text-base font-light text-muted-foreground leading-relaxed">
        <p>The answer may already exist.</p>
        <p>The problem is that it is often scattered across searches, apps, trackers, articles and stages that know very little about what came before.</p>
        <p className="font-serif italic text-lg text-foreground/80 leading-relaxed">
          A pregnancy question becomes a recovery question. Feeding can affect sleep. A new baby changes relationships, routines and an older child's world.
        </p>
        <p>Real family life does not happen in neat tabs.</p>
        <p className="text-foreground/80">We think support should feel more joined up, without asking you to hand over more of your life than you want to.</p>
      </div>
    </div>
  </Section>
);

const pillars = [
  { title: "Guidance", body: "Guidance across trying to conceive, pregnancy, the first year, toddler life and wider family life, with dedicated IVF and preparing for baby support where relevant." },
  { title: "Companion", body: "A context-aware Companion that can use your saved journey and the part of the site you're in to make support more relevant." },
  { title: "Tools", body: "Practical calculators and tools, such as the due date and ovulation calculators, for moments when reading alone is not enough." },
  { title: "Journal", body: "A private place to reflect, record and keep parts of the journey that matter to you." },
];

export const AboutToday = () => (
  <Section labelledBy="about-today" className="bg-parchment">
    <div className="text-muted-foreground max-w-2xl mb-12">
      <Eyebrow>The Start of You today</Eyebrow>
      <h2 id="about-today" className="font-serif text-3xl md:text-4xl text-foreground leading-snug mb-4">One place for the part you're in now.</h2>
      <p className="max-w-[62ch] font-sans text-[15px] md:text-base font-light leading-relaxed">
        Today, The Start of You brings together editorial guidance, practical tools, a live Companion and private space to reflect across the parts of parenthood we currently support.
      </p>
    </div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 border-t border-border/60 pt-10">
      {pillars.map((p) => (
        <div key={p.title}>
          <h3 className="font-serif text-xl text-foreground mb-3">{p.title}</h3>
          <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">{p.body}</p>
        </div>
      ))}
    </div>
  </Section>
);

const principles = [
  { title: "Context before cleverness", body: "Support should respond to where you are, rather than giving the same answer to everyone. It should also be honest about what it does and does not know." },
  { title: "Trust before automation", body: "AI should not become more confident simply because it can answer quickly. Important questions need appropriate sources, clear limits and a route to human help when an app is not enough." },
  { title: "Track only when it gives something back", body: "Not every feed, sleep, feeling or family moment needs to become another thing to log. Tracking should earn the effort it asks from a parent." },
  { title: "Technology should know when to step aside", body: "Sometimes what helps is guidance. Sometimes it is a tool. Sometimes it is another person. And sometimes the right thing is to close the app." },
];

export const AboutPhilosophy = () => (
  <Section labelledBy="about-philosophy" className="bg-card">
    <div className="grid md:grid-cols-12 gap-10">
      <div className="md:col-span-4 text-muted-foreground">
        <Eyebrow>How we think about technology</Eyebrow>
        <h2 id="about-philosophy" className="font-serif text-3xl md:text-4xl text-foreground leading-snug mb-4">Helpful should not mean more to manage.</h2>
        <p className="font-sans text-[15px] font-light leading-relaxed">We are not trying to turn family life into another dashboard.</p>
      </div>
      <ol className="md:col-span-8 divide-y divide-border/60">
        {principles.map((p, i) => (
          <li key={p.title} className="flex gap-5 py-6 first:pt-0">
            <span className="font-serif text-lg text-sage/70 leading-none mt-1 select-none" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <div className="max-w-[60ch]">
              <h3 className="font-serif text-xl text-foreground mb-2">{p.title}</h3>
              <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed">{p.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </Section>
);

export const AboutSystem = () => (
  <Section labelledBy="about-system" className="bg-parchment-dark">
    <div className="max-w-3xl mx-auto text-center text-muted-foreground">
      <Eyebrow className="justify-center">More than a collection of features</Eyebrow>
      <h2 id="about-system" className="font-serif text-3xl md:text-4xl text-foreground leading-snug mb-8">The value is in how the pieces meet.</h2>
      <div className="font-serif text-lg md:text-xl italic text-foreground/80 leading-relaxed space-y-1 mb-8">
        <p>A guide can answer a question.</p>
        <p>A calculator can help with a number.</p>
        <p>A Companion can help you think through something less straightforward.</p>
        <p>A journal can help you keep what mattered.</p>
      </div>
      <div className="max-w-[60ch] mx-auto space-y-4 font-sans text-[15px] font-light leading-relaxed">
        <p>What we're interested in is what happens when those parts stop feeling like separate products.</p>
        <p>The aim is not to put more technology into parenthood. It is to make the technology that is there feel more useful, more connected and less demanding.</p>
      </div>
    </div>
  </Section>
);

const futures = [
  { title: "Clearer trust", body: "Important answers that are more transparent about what informed them and where appropriate guidance comes from." },
  { title: "Useful next steps", body: "Support that can move from \u201chere is the information\u201d to \u201chere is something useful you can do with it.\u201d" },
  { title: "Continuity with permission", body: "Context that can move with you through major transitions, only when you choose for it to." },
  { title: "Memory that belongs to you", body: "A closer relationship between reflection, memory and the support around your journey, with clear control over what is kept." },
];

export const AboutFuture = () => (
  <section
    aria-labelledby="about-future"
    data-testid="about-future-direction"
    className="relative py-16 md:py-24 bg-[hsl(var(--stage-recovery-deep))] text-[hsl(var(--parchment))]"
  >
    <div className="container mx-auto px-6 md:px-10 max-w-5xl">
      <div className="max-w-3xl mb-12 opacity-95">
        <Eyebrow>What we're building toward</Eyebrow>
        <h2 id="about-future" className="font-serif text-3xl md:text-5xl leading-tight mb-6">One relationship with support that evolves with your family.</h2>
        <p className="max-w-[64ch] font-sans text-[15px] md:text-base font-light leading-relaxed opacity-85">
          We are building toward a product that can carry the context you choose from one part of the journey into the next, show you more clearly what important answers are based on, help useful guidance become a practical next step, and keep reflection and memory closer to the support that helped you through the moment.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8 border-t border-[hsl(var(--parchment)/0.2)] pt-10 mb-12">
        {futures.map((f) => (
          <div key={f.title}>
            <h3 className="font-serif text-xl mb-2">{f.title}</h3>
            <p className="font-sans text-sm font-light leading-relaxed opacity-80 max-w-[52ch]">{f.body}</p>
          </div>
        ))}
      </div>
      <p className="font-serif italic text-lg max-w-[60ch] opacity-90">
        Not all of this is live today. We would rather be clear about what we are building toward than pretend the future is already here.
      </p>
    </div>
  </section>
);

export const AboutJournal = () => (
  <Section labelledBy="about-journal" className="bg-card">
    <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
      <img
        src={journalFlatlay}
        alt="The Start of You pregnancy journal styled with baby clothes and natural accessories"
        className="w-full aspect-[4/3] object-cover rounded-2xl"
        loading="lazy"
      />
      <div className="text-muted-foreground">
        <Eyebrow>Some things are for keeping</Eyebrow>
        <h2 id="about-journal" className="font-serif text-3xl md:text-4xl text-foreground leading-snug mb-5">
          Guidance helps you through the moment. Reflection helps you keep it.
        </h2>
        <div className="max-w-[60ch] space-y-4 font-sans text-[15px] font-light leading-relaxed mb-6">
          <p>Alongside The Start of You platform, we make a physical pregnancy journal for the parts of the journey that deserve somewhere away from a screen.</p>
          <p>The physical and digital experiences are separate today, but they share the same belief:</p>
          <p className="font-serif italic text-lg text-foreground/80">some moments are for solving; some are for understanding; and some are simply worth remembering.</p>
        </div>
        <Link to="/journal" className="inline-flex items-center gap-2 min-h-[44px] font-sans text-sm text-foreground border-b border-border hover:border-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">
          View the journal <ArrowRight size={14} className="text-sage" aria-hidden="true" />
        </Link>
      </div>
    </div>
  </Section>
);

export const AboutLimits = () => (
  <Section labelledBy="about-limits" className="bg-parchment">
    <div className="max-w-3xl text-muted-foreground">
      <Eyebrow>Knowing the limits</Eyebrow>
      <h2 id="about-limits" className="font-serif text-3xl md:text-4xl text-foreground leading-snug mb-6">Sometimes the right next step is another person.</h2>
      <div className="max-w-[62ch] space-y-4 font-sans text-[15px] md:text-base font-light leading-relaxed">
        <p>Some questions need a midwife, GP, health visitor, emergency service or other qualified professional.</p>
        <p>Some decisions need a conversation with your partner or family.</p>
        <p>And some moments need time away from a screen.</p>
        <p className="text-foreground/85">The Start of You is here to support your judgement, not replace it.</p>
      </div>
    </div>
  </Section>
);

const promises = [
  "We will not make you track for the sake of tracking.",
  "We will not pretend AI knows more than it does.",
  "We will not confuse more features with better support.",
  "We will keep working toward support that feels more connected, with your control at the centre.",
];

export const AboutPromise = () => (
  <Section labelledBy="about-promise" className="bg-card">
    <div className="text-muted-foreground max-w-3xl mb-10">
      <Eyebrow>What we want to protect</Eyebrow>
      <h2 id="about-promise" className="font-serif text-3xl md:text-4xl text-foreground leading-snug">Parenthood does not need another source of pressure.</h2>
    </div>
    <ul className="grid sm:grid-cols-2 gap-x-10 border-t border-border/60">
      {promises.map((p) => (
        <li key={p} className="py-5 border-b border-border/60 font-serif text-lg text-foreground/85 leading-snug">{p}</li>
      ))}
    </ul>
  </Section>
);

export const AboutFinalCTA = () => (
  <section aria-labelledby="about-cta" className="page-ending">
    <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center">
      <h2 id="about-cta" className="font-serif text-3xl md:text-4xl text-foreground leading-snug mb-4">Start where you are.</h2>
      <p className="max-w-[56ch] mx-auto font-sans text-[15px] md:text-base font-light text-muted-foreground leading-relaxed mb-8">
        You do not need to have everything figured out. Choose the part of the journey that feels most relevant today and begin there.
      </p>
      <Link
        to="/start-your-journey"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-6 py-3 min-h-[44px] font-sans text-sm hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Start your journey <ArrowRight size={15} aria-hidden="true" />
      </Link>
    </div>
  </section>
);

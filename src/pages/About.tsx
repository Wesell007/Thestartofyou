import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowRight, Calculator } from "lucide-react";
import { Link } from "react-router-dom";

const stages = [
  "Trying to conceive",
  "IVF",
  "Pregnancy",
  "Postpartum",
  "First year",
];

const supportingLayers = [
  "Preparing for your baby",
  "Support when things feel harder",
];

const differentiators = [
  { title: "Guidance, not overload", desc: "We focus on what matters now — not everything at once." },
  { title: "Built around real experiences", desc: "Not just timelines, but how each stage actually feels." },
  { title: "Support when it matters most", desc: "Including the moments that are often overlooked." },
  { title: "A system, not just content", desc: "Everything connects — from tools to guidance to support." },
];

const missionValues = ["clear", "calm", "human"];

const About = () => {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main>
        {/* ── HERO ── */}
        <section className="bg-parchment pt-28 pb-20 md:pt-36 md:pb-28">
          <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center">
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage mb-4">
              About
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-foreground leading-[1.1] mb-6 animate-fade-up">
              The start of something different
            </h1>
            <p className="font-sans text-base md:text-lg font-light text-muted-foreground leading-relaxed max-w-xl mx-auto animate-fade-up [animation-delay:0.1s]">
              We're here to guide you through one of the most important journeys of your life — clearly, calmly, and without overwhelm.
            </p>
          </div>
        </section>

        {/* ── THE PROBLEM ── */}
        <section className="bg-card py-20 md:py-28 border-t border-border/40">
          <div className="container mx-auto px-6 md:px-10 max-w-2xl">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-6 text-center leading-snug">
              Most journeys don't feel guided
            </h2>
            <p className="font-sans text-base font-light text-muted-foreground leading-relaxed text-center mb-8 max-w-lg mx-auto">
              From trying to conceive to your baby's first year, there's no shortage of information. But most of it feels:
            </p>
            <ul className="flex flex-col items-center gap-2 mb-10">
              {["Overwhelming", "Disconnected", "Hard to trust"].map((item) => (
                <li key={item} className="font-sans text-sm font-light text-muted-foreground">
                  {item}
                </li>
              ))}
            </ul>
            <p className="font-sans text-sm font-light text-muted-foreground text-center leading-relaxed max-w-md mx-auto mb-3">
              You search, scroll, compare — and still feel unsure what actually matters.
            </p>
            <div className="text-center space-y-1.5 mt-8">
              <p className="font-serif text-sm italic text-foreground/80">
                The problem isn't a lack of information.
              </p>
              <p className="font-serif text-sm italic text-foreground/80">
                It's a lack of clear guidance.
              </p>
            </div>
          </div>
        </section>

        {/* ── OUR APPROACH ── */}
        <section className="bg-parchment py-20 md:py-28 border-t border-border/40">
          <div className="container mx-auto px-6 md:px-10 max-w-2xl text-center">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-6 leading-snug">
              So we built something different
            </h2>
            <p className="font-sans text-base font-light text-muted-foreground leading-relaxed max-w-lg mx-auto mb-10">
              Instead of endless content, we've created a structured system that guides you through each stage — step by step.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto text-left">
              {[
                "Meet you where you are",
                "Focus on what actually matters right now",
                "Reduce noise and unnecessary decisions",
                "Support you emotionally as well as practically",
              ].map((point) => (
                <p key={point} className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                  — {point}
                </p>
              ))}
            </div>
            <div className="mt-12 space-y-1.5">
              <p className="font-serif text-sm italic text-foreground/80">
                You don't need more information.
              </p>
              <p className="font-serif text-sm italic text-foreground/80">
                You need the right guidance, at the right time.
              </p>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="bg-card py-20 md:py-28 border-t border-border/40">
          <div className="container mx-auto px-6 md:px-10 max-w-2xl text-center">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-10 leading-snug">
              A journey that grows with you
            </h2>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {stages.map((s) => (
                <span
                  key={s}
                  className="font-sans text-xs font-light tracking-wide text-foreground border border-border rounded-pill px-4 py-2 bg-parchment"
                >
                  {s}
                </span>
              ))}
            </div>
            <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage mb-3">
              Supporting layers
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {supportingLayers.map((s) => (
                <span
                  key={s}
                  className="font-sans text-xs font-light text-muted-foreground border border-border/60 rounded-pill px-4 py-2"
                >
                  {s}
                </span>
              ))}
            </div>
            <p className="font-serif text-sm italic text-foreground/80 max-w-sm mx-auto">
              Each stage connects — so you're never starting over, just moving forward.
            </p>
          </div>
        </section>

        {/* ── WHAT MAKES THIS DIFFERENT ── */}
        <section className="bg-parchment py-20 md:py-28 border-t border-border/40">
          <div className="container mx-auto px-6 md:px-10 max-w-3xl">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-12 text-center leading-snug">
              Designed differently
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
              {differentiators.map((d) => (
                <div key={d.title}>
                  <h3 className="font-serif text-lg text-foreground mb-2">{d.title}</h3>
                  <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                    {d.desc}
                  </p>
                </div>
              ))}
            </div>
            <div className="text-center mt-14 space-y-1.5">
              <p className="font-serif text-sm italic text-foreground/80">
                This is not another content platform.
              </p>
              <p className="font-serif text-sm italic text-foreground/80">
                It's a guided experience.
              </p>
            </div>
          </div>
        </section>

        {/* ── AI + PERSONALISATION ── */}
        <section className="bg-card py-20 md:py-28 border-t border-border/40">
          <div className="container mx-auto px-6 md:px-10 max-w-2xl text-center">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-6 leading-snug">
              Support that adapts to you
            </h2>
            <p className="font-sans text-base font-light text-muted-foreground leading-relaxed max-w-lg mx-auto mb-4">
              As you move through your journey, the experience adapts with you — helping you understand what's happening, what to expect, and what matters next.
            </p>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed max-w-md mx-auto">
              You can ask questions, explore your stage, and get guidance that reflects where you are.
            </p>
            <p className="font-serif text-sm italic text-foreground/80 mt-10">
              Simple, helpful, and always relevant.
            </p>
          </div>
        </section>

        {/* ── TRUST ── */}
        <section className="bg-parchment py-16 md:py-20 border-t border-border/40">
          <div className="container mx-auto px-6 md:px-10 max-w-2xl text-center">
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-5 leading-snug">
              Built with care and clarity
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed max-w-lg mx-auto mb-3">
              Our content is designed to be clear, supportive, and grounded in reliable information. Where relevant, guidance is reviewed by qualified healthcare professionals.
            </p>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed max-w-md mx-auto">
              This platform is here to support you — not replace professional medical advice.
            </p>
          </div>
        </section>

        {/* ── BUILT WITH CARE ── */}
        <section className="bg-card py-16 md:py-20 border-t border-border/40">
          <div className="container mx-auto px-6 md:px-10 max-w-2xl text-center">
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-5 leading-snug">
              Built with care
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed max-w-lg mx-auto mb-3">
              This platform was created with a clear goal — to make this journey feel more guided, less overwhelming, and easier to navigate.
            </p>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed max-w-md mx-auto">
              It brings together real experiences, thoughtful design, and reliable guidance to support you at every stage.
            </p>
          </div>
        </section>

        {/* ── BRAND MISSION ── */}
        <section className="bg-parchment py-20 md:py-28 border-t border-border/40">
          <div className="container mx-auto px-6 md:px-10 max-w-2xl text-center">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-6 leading-snug">
              Why this exists
            </h2>
            <p className="font-sans text-base font-light text-muted-foreground leading-relaxed max-w-md mx-auto mb-8">
              Because this journey isn't just about what happens — it's about how it feels along the way.
            </p>
            <p className="font-sans text-sm font-light text-muted-foreground mb-4">
              We believe support should feel:
            </p>
            <div className="flex justify-center gap-6">
              {missionValues.map((v) => (
                <span key={v} className="font-serif text-lg italic text-foreground/80">
                  {v}
                </span>
              ))}
            </div>
            <p className="font-sans text-xs font-light text-muted-foreground mt-4">
              At every stage.
            </p>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="bg-card py-20 md:py-28 border-t border-border/40">
          <div className="container mx-auto px-6 md:px-10 max-w-xl text-center">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-8 leading-snug">
              Start your journey
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/explore"
                className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
              >
                Explore your journey
                <ArrowRight size={15} />
              </Link>
              <Link
                to="/due-date-calculator"
                className="inline-flex items-center gap-2 font-sans text-sm font-light text-muted-foreground border-b border-border hover:text-foreground hover:border-foreground transition-all pb-0.5"
              >
                <Calculator size={14} className="text-sage" />
                Calculate your due date
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;

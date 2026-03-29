import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import productHero from "@/assets/product-hero.jpg";
import productMoment from "@/assets/product-moment.jpg";

const stages = [
  { label: "Early pregnancy", desc: "Capturing first thoughts, uncertainty, and change" },
  { label: "Mid-pregnancy", desc: "Reflecting as things begin to feel more real" },
  { label: "Late pregnancy", desc: "Slowing down and preparing" },
  { label: "After birth", desc: "Processing, adjusting, and remembering" },
];

const insideItems = [
  "Thoughtful prompts for each stage",
  "Space to write freely",
  "Gentle structure without pressure",
  "A format you can return to over time",
];

const familiarItems = [
  "You have a lot on your mind, but nowhere to put it",
  "Things feel important, but easy to forget later",
  "You keep thinking \u201cI'll remember this\u201d \u2014 but don't",
  "Some moments feel bigger than they look",
];

const Product = () => {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main>
        {/* ── HERO ── */}
        <section className="relative bg-parchment overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
          <div className="absolute top-1/3 right-0 w-[500px] h-[400px] glow-sage" />
          <div className="container mx-auto px-6 md:px-10 max-w-6xl relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-12 items-center">
              {/* Left: copy */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-xl mx-auto md:mx-0">
                <p className="stage-label mb-5 animate-fade-up">The Start of You</p>
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[1.08] mb-6 animate-fade-up [animation-delay:0.05s]">
                  Capture your journey,{" "}
                  <span className="italic">as it happens</span>
                </h1>
                <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-10 animate-fade-up [animation-delay:0.1s] max-w-md">
                  From the first weeks of pregnancy to life after birth, this is a time you'll never experience in the same way again.
                </p>
                <div className="animate-fade-up [animation-delay:0.2s] flex flex-col items-center md:items-start gap-2.5">
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-8 py-4 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
                  >
                    Get the journal
                    <ExternalLink size={14} />
                  </a>
                  <span className="font-sans text-xs font-light text-muted-foreground">
                    Available on Amazon
                  </span>
                </div>
              </div>

              {/* Right: image */}
              <div className="flex justify-center md:justify-end">
                <div className="max-w-sm md:max-w-md w-full">
                  <img
                    src={productHero}
                    alt="A pregnant woman writing in a journal by the window"
                    width={1280}
                    height={960}
                    className="w-full rounded-2xl shadow-elevated object-cover"
                  />
                  <p className="font-serif text-sm italic text-muted-foreground mt-4 text-center">
                  , A space for what you're feeling right now
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── THIS WILL FEEL FAMILIAR ── */}
        <section className="relative bg-card section-spacing-sm overflow-hidden">
          <div className="section-divider absolute top-0 left-0 right-0" />
          <div className="container mx-auto px-6 md:px-10 max-w-2xl text-center">
            <div className="editorial-rule mb-8" />
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-12 leading-snug">
              This might feel familiar
            </h2>
            <div className="flex flex-col gap-6 max-w-md mx-auto text-left">
              {familiarItems.map((item) => (
                <p key={item} className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHAT THIS IS ── */}
        <section className="relative bg-parchment section-spacing-sm overflow-hidden">
          <div className="section-divider absolute top-0 left-0 right-0" />
          <div className="container mx-auto px-6 md:px-10 max-w-2xl text-center">
            <div className="editorial-rule mb-8" />
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-7 leading-snug">
              What is The Start of You?
            </h2>
            <p className="font-sans text-base font-light text-muted-foreground leading-relaxed max-w-lg mx-auto">
              A guided journal designed to support you through pregnancy and beyond, helping you capture your thoughts, experiences, and moments as they happen.
            </p>
          </div>
        </section>

        {/* ── HOW IT FITS ── */}
        <section className="relative bg-card section-spacing-sm overflow-hidden">
          <div className="section-divider absolute top-0 left-0 right-0" />
          <div className="container mx-auto px-6 md:px-10 max-w-3xl">
            <div className="editorial-rule mb-8" />
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-14 text-center leading-snug">
              Designed to support you at every stage
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {stages.map((s) => (
                <div key={s.label} className="card-elevated p-6">
                  <h3 className="font-serif text-lg text-foreground mb-3">{s.label}</h3>
                  <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHAT YOU'LL FIND INSIDE ── */}
        <section className="relative bg-parchment section-spacing-sm overflow-hidden">
          <div className="section-divider absolute top-0 left-0 right-0" />
          <div className="container mx-auto px-6 md:px-10 max-w-2xl text-center">
            <div className="editorial-rule mb-8" />
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-12 leading-snug">
              What you'll find inside
            </h2>
            <div className="flex flex-col gap-5 max-w-sm mx-auto text-left">
              {insideItems.map((item) => (
                <p key={item} className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                , {item}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* ── REAL MOMENT ── */}
        <section className="relative bg-card section-spacing-sm overflow-hidden">
          <div className="section-divider absolute top-0 left-0 right-0" />
          <div className="container mx-auto px-6 md:px-10 max-w-xl text-center">
            <div className="editorial-rule mb-8" />
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-10 leading-snug">
              A moment, just for you
            </h2>
            <img
              src={productMoment}
              alt="Hands writing gently in a journal"
              width={1280}
              height={800}
              loading="lazy"
              className="w-full rounded-2xl shadow-elevated object-cover"
            />
            <p className="font-serif text-sm italic text-muted-foreground mt-5">
            , Some things are worth holding onto
            </p>
          </div>
        </section>

        {/* ── PART OF YOUR JOURNEY ── */}
        <section className="relative bg-parchment section-spacing-sm overflow-hidden">
          <div className="section-divider absolute top-0 left-0 right-0" />
          <div className="container mx-auto px-6 md:px-10 max-w-2xl text-center">
            <div className="editorial-rule mb-8" />
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-7 leading-snug">
              Part of your journey, not separate from it
            </h2>
            <p className="font-sans text-base font-light text-muted-foreground leading-relaxed max-w-lg mx-auto mb-10">
              This isn't something separate to figure out. It fits alongside your journey, a place to capture what you're experiencing as you move through each stage.
            </p>
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 font-sans text-sm font-light text-muted-foreground border-b border-border hover:text-foreground hover:border-foreground transition-all pb-0.5"
            >
              Explore your journey
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="page-ending frame-corner overflow-hidden">
          <div className="container mx-auto px-6 md:px-10 max-w-2xl text-center">
            <div className="editorial-rule mb-10" />
            <p className="stage-label mb-6">Your Journey</p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-7 leading-snug">
              A place to come back to
            </h2>
            <p className="font-sans text-base font-light text-muted-foreground leading-relaxed max-w-lg mx-auto mb-10">
              This journey can feel like a lot to hold in your head. Having somewhere to put it can make it feel a little clearer.
            </p>
            <div className="flex flex-col items-center gap-2.5">
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-8 py-4 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
              >
                Get the journal
                <ExternalLink size={14} />
              </a>
              <span className="font-sans text-xs font-light text-muted-foreground">
                Available on Amazon
              </span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Product;

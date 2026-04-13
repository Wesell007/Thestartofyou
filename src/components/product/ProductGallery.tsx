import journalWriting from "@/assets/journal-writing.jpg";
import journalKeepsakes from "@/assets/journal-keepsakes.jpg";
import journalFirstsPage from "@/assets/journal-firsts-page.jpg";
import journalBabyShower from "@/assets/journal-baby-shower.jpg";
import journalNursery from "@/assets/journal-nursery-planning.jpg";
import journalCouple from "@/assets/journal-couple.jpg";
import journalFirstSeasons from "@/assets/journal-first-seasons.jpg";

const ProductGallery = () => {
  return (
    <section className="relative bg-parchment py-16 md:py-24 overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-10 md:mb-14">
          <div className="editorial-rule mb-5" />
          <p className="stage-label mb-2.5">See inside the journal</p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-[2.25rem] text-foreground mb-3 leading-snug">
            More than a notebook. A place for everything.
          </h2>
          <p className="font-sans text-sm sm:text-base font-light text-muted-foreground leading-relaxed max-w-lg mx-auto">
            Guided prompts, keepsake pockets, milestone pages, and space for the moments that matter most.
          </p>
        </div>

        {/* Row 1 — Hero pair: Writing + Keepsakes */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-5 mb-4 md:mb-5">
          <div className="md:col-span-3 relative rounded-2xl overflow-hidden shadow-elevated group aspect-[4/3]">
            <img
              src={journalWriting}
              alt="Pregnant woman writing reflections in The Start of You journal"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent p-5 md:p-7">
              <p className="font-sans text-[10px] font-medium tracking-widest uppercase text-white/70 mb-1">
                Writing & reflection
              </p>
              <p className="font-serif text-sm sm:text-base text-white leading-snug max-w-sm">
                Guided prompts for weekly reflection — designed to feel calm, personal, and never like homework
              </p>
            </div>
          </div>

          <div className="md:col-span-2 relative rounded-2xl overflow-hidden shadow-elevated group aspect-[4/3] md:aspect-auto">
            <img
              src={journalKeepsakes}
              alt="Journal open to Memories and Keepsakes envelope page with scan photos"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent p-5">
              <p className="font-sans text-[10px] font-medium tracking-widest uppercase text-white/70 mb-1">
                Keepsake pocket
              </p>
              <p className="font-serif text-sm text-white leading-snug">
                Built-in pocket for scan photos, cards, and treasured mementos
              </p>
            </div>
          </div>
        </div>

        {/* Row 2 — Interior spreads: Firsts, Baby Shower, Nursery */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 mb-4 md:mb-5">
          <div className="relative rounded-2xl overflow-hidden shadow-soft group aspect-[4/3]">
            <img
              src={journalFirstsPage}
              alt="Journal open to the Firsts milestone page with handwritten entries"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/45 to-transparent p-4">
              <p className="font-sans text-[9px] font-medium tracking-widest uppercase text-white/70 mb-0.5">
                Milestone pages
              </p>
              <p className="font-serif text-xs sm:text-sm text-white leading-snug">
                Track every precious first
              </p>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-soft group aspect-[4/3]">
            <img
              src={journalBabyShower}
              alt="Journal open to Baby Shower Photos and Gift Log pages"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/45 to-transparent p-4">
              <p className="font-sans text-[9px] font-medium tracking-widest uppercase text-white/70 mb-0.5">
                Baby shower
              </p>
              <p className="font-serif text-xs sm:text-sm text-white leading-snug">
                Photo space and gift log
              </p>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-soft group aspect-[4/3] col-span-2 md:col-span-1">
            <img
              src={journalNursery}
              alt="Journal open to Planning Your Nursery page with mood board and handwritten notes"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/45 to-transparent p-4">
              <p className="font-sans text-[9px] font-medium tracking-widest uppercase text-white/70 mb-0.5">
                Nursery planning
              </p>
              <p className="font-serif text-xs sm:text-sm text-white leading-snug">
                Themes, colours, and inspiration
              </p>
            </div>
          </div>
        </div>

        {/* Row 3 — Lifestyle / Emotional: Couple + First Seasons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          <div className="relative rounded-2xl overflow-hidden shadow-soft group aspect-[16/10]">
            <img
              src={journalCouple}
              alt="Expecting couple reading through The Start of You journal together"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/45 to-transparent p-5">
              <p className="font-sans text-[9px] font-medium tracking-widest uppercase text-white/70 mb-0.5">
                A shared experience
              </p>
              <p className="font-serif text-sm text-white leading-snug">
                Reading back through the journey together
              </p>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-soft group aspect-[16/10]">
            <img
              src={journalFirstSeasons}
              alt="Journal open to First Summer and First Autumn seasonal memory pages with baby photo"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/45 to-transparent p-5">
              <p className="font-sans text-[9px] font-medium tracking-widest uppercase text-white/70 mb-0.5">
                First seasons
              </p>
              <p className="font-serif text-sm text-white leading-snug">
                Capture every season of baby's first year
              </p>
            </div>
          </div>
        </div>

        {/* Value strip below gallery */}
        <div className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "144 pages", detail: "Hardback A5 format" },
            { label: "Guided prompts", detail: "Week-by-week reflection" },
            { label: "Keepsake pockets", detail: "For scans, photos & memories" },
            { label: "Gift-ready", detail: "A meaningful gift for expecting mums" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-card/70 border border-border/20 rounded-xl p-4 text-center"
            >
              <p className="font-serif text-sm text-foreground mb-0.5">{item.label}</p>
              <p className="font-sans text-[11px] font-light text-muted-foreground">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGallery;

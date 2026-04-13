import { useState } from "react";
import journalFlatlay from "@/assets/journal-flatlay.jpg";
import journalWriting from "@/assets/journal-writing.jpg";
import journalUltrasound from "@/assets/journal-ultrasound.jpg";
import journalCloseup from "@/assets/journal-closeup.jpg";
import journalFirstsPage from "@/assets/journal-firsts-page.jpg";
import journalCoverHand from "@/assets/journal-cover-hand.jpg";
import journalKeepsakes from "@/assets/journal-keepsakes.jpg";
import journalNursery from "@/assets/journal-nursery-planning.jpg";
import journalBabyShower from "@/assets/journal-baby-shower.jpg";
import journalFirstSeasons from "@/assets/journal-first-seasons.jpg";
import journalNamesPlanning from "@/assets/journal-names-planning.jpg";
import productMoment from "@/assets/product-moment.jpg";

const galleryItems = [
  {
    src: journalFlatlay,
    alt: "The Start of You journal styled with baby clothes and keepsakes",
    caption: "A premium guided journal designed for pregnancy and beyond",
    category: "The journal",
  },
  {
    src: journalFirstsPage,
    alt: "Journal open to the Firsts milestone page with handwritten entries",
    caption: "Track every precious first — from hearing the heartbeat to feeling the first kick",
    category: "Milestone pages",
  },
  {
    src: journalKeepsakes,
    alt: "Journal open to Memories and Keepsakes envelope page with scan photos",
    caption: "A built-in keepsake pocket for scan photos, cards, and treasured mementos",
    category: "Keepsake pocket",
  },
  {
    src: journalCoverHand,
    alt: "Hands holding The Start of You journal with pen ready to write",
    caption: "Beautiful botanical hardback design — a gift-worthy keepsake you will treasure",
    category: "In your hands",
  },
  {
    src: journalWriting,
    alt: "Pregnant woman writing reflections in The Start of You journal",
    caption: "Guided prompts for weekly reflection and emotional processing",
    category: "Writing prompts",
  },
  {
    src: journalUltrasound,
    alt: "Journal open with ultrasound photo and handwritten notes",
    caption: "Space for scan photos, milestones, and words of wisdom",
    category: "Scan pages",
  },
  {
    src: journalCloseup,
    alt: "Close-up of handwritten journal entries with ultrasound nearby",
    caption: "Free-form space to write what matters most to you",
    category: "Open reflection",
  },
  {
    src: journalNursery,
    alt: "Journal open to Planning Your Nursery page with mood board and handwritten notes",
    caption: "Nursery planning pages with space for themes, colours, and inspiration photos",
    category: "Nursery planning",
  },
  {
    src: journalBabyShower,
    alt: "Journal open to Baby Shower Photos and Gift Log pages",
    caption: "Dedicated baby shower pages — photo space and a gift log to remember who gave what",
    category: "Baby shower",
  },
  {
    src: journalFirstSeasons,
    alt: "Journal open to First Summer and First Autumn seasonal memory pages with baby photo",
    caption: "Seasonal memory pages — capture what you did, where you went, and your most memorable moments",
    category: "First seasons",
  },
  {
    src: journalNamesPlanning,
    alt: "Journal open to baby name planning page and Planning & Organising section with scan photo",
    caption: "Baby name shortlists, planning pages, and a beautiful woodland-illustrated organising section",
    category: "Names & planning",
  },
  {
    src: productMoment,
    alt: "Hands gently writing in a journal",
    caption: "Designed to feel calm, personal, and never like homework",
    category: "How it feels",
  },
];

const ProductGallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative bg-parchment py-16 md:py-24 overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-10 md:mb-14">
          <div className="editorial-rule mb-5" />
          <p className="stage-label mb-2.5">A closer look inside</p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-[2.25rem] text-foreground mb-3 leading-snug">
            More than a notebook. See what's inside.
          </h2>
          <p className="font-sans text-sm sm:text-base font-light text-muted-foreground leading-relaxed max-w-lg mx-auto">
            144 pages of guided prompts, keepsake pockets, milestone tracking, and space for the moments that matter most.
          </p>
        </div>

        {/* Gallery layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
          {/* Main image — large */}
          <div className="lg:col-span-3">
            <div className="relative rounded-2xl overflow-hidden shadow-elevated group aspect-[4/3]">
              <img
                src={galleryItems[activeIndex].src}
                alt={galleryItems[activeIndex].alt}
                className="w-full h-full object-cover transition-all duration-500"
              />
              {/* Caption overlay */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent p-5 md:p-7">
                <p className="font-sans text-[10px] font-medium tracking-widest uppercase text-white/70 mb-1">
                  {galleryItems[activeIndex].category}
                </p>
                <p className="font-serif text-sm sm:text-base text-white leading-snug max-w-md">
                  {galleryItems[activeIndex].caption}
                </p>
              </div>
            </div>
          </div>

          {/* Thumbnail grid — right side */}
          <div className="lg:col-span-2 grid grid-cols-5 lg:grid-cols-2 gap-2 lg:gap-2.5">
            {galleryItems.map((item, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`relative rounded-xl overflow-hidden aspect-square transition-all duration-300 group/thumb ${
                  i === activeIndex
                    ? "ring-2 ring-sage shadow-soft"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className={`absolute inset-0 flex items-end p-1.5 lg:p-2 transition-opacity duration-200 ${
                  i === activeIndex ? "bg-sage/10" : "bg-black/0 group-hover/thumb:bg-black/20"
                }`}>
                  <span className="font-sans text-[8px] lg:text-[9px] font-medium tracking-wide uppercase text-white opacity-0 group-hover/thumb:opacity-100 transition-opacity">
                    {item.category}
                  </span>
                </div>
              </button>
            ))}
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

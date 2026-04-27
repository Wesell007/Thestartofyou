interface Item {
  id: string;
  label: string;
}

const items: Item[] = [
  { id: "what-it-is", label: "What it is" },
  { id: "expect", label: "What to expect" },
  { id: "big-changes", label: "Big changes" },
  { id: "difficult", label: "Difficult feelings" },
  { id: "support", label: "Support" },
  { id: "focus", label: "Focus areas" },
  { id: "week-by-week", label: "Week guide" },
  { id: "guidance", label: "Guides & articles" },
  { id: "faqs", label: "FAQs" },
];

const FirstTriOnThisPage = () => {
  return (
    <nav
      aria-label="On this page"
      className="bg-parchment border-y border-border/30 sticky-anchor"
    >
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl py-4">
        <div className="flex items-center gap-4">
          <span className="hidden md:inline font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-sage-muted shrink-0">
            On this page
          </span>
          <span className="hidden md:block h-px w-6 bg-sage-light shrink-0" />
          <ul className="flex gap-x-5 lg:gap-x-7 overflow-x-auto lg:flex-wrap scrollbar-none -mx-1 px-1 py-1">
            {items.map((item) => (
              <li key={item.id} className="shrink-0">
                <a
                  href={`#${item.id}`}
                  className="font-sans text-[12px] lg:text-[12.5px] font-light text-muted-foreground hover:text-sage transition-colors whitespace-nowrap py-1 inline-block"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default FirstTriOnThisPage;

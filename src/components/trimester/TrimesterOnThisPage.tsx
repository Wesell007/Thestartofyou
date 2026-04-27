interface OnThisPageItem {
  id: string;
  label: string;
}

interface Props {
  items?: OnThisPageItem[];
  bg?: string;
}

const defaultItems: OnThisPageItem[] = [
  { id: "about", label: "What this stage is" },
  { id: "expect", label: "What to expect" },
  { id: "big-changes", label: "The big changes" },
  { id: "difficulties", label: "What can feel hard" },
  { id: "normal", label: "What's normal" },
  { id: "focus", label: "What to focus on" },
  { id: "week-by-week", label: "Week by week" },
  { id: "questions", label: "Common questions" },
];

const TrimesterOnThisPage = ({ items = defaultItems, bg = "bg-parchment" }: Props) => {
  return (
    <nav
      aria-label="On this page"
      className={`${bg} border-y border-border/30`}
    >
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-4 sm:py-5">
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="hidden sm:inline font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-sage-muted shrink-0">
            On this page
          </span>
          <span className="hidden sm:block h-px w-6 bg-sage-light shrink-0" />
          <ul className="flex gap-x-5 gap-y-2 overflow-x-auto sm:flex-wrap scrollbar-none -mx-1 px-1">
            {items.map((item) => (
              <li key={item.id} className="shrink-0">
                <a
                  href={`#${item.id}`}
                  className="font-sans text-[12px] sm:text-[12.5px] font-light text-muted-foreground hover:text-sage transition-colors whitespace-nowrap"
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

export default TrimesterOnThisPage;

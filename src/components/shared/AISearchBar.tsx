import { useId, useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { navigateToAsk } from "@/lib/askNavigation";

interface AISearchBarProps {
  placeholder?: string;
  suggestions?: string[];
  context?: string;
  variant?: "hero" | "section";
  /** CSS custom property name for stage accent, e.g. "--stage-toddler-accent". When set, focus/active/loading states use this colour. */
  stageAccent?: string;
  /** Stage key (e.g. "toddler"). When set, appended as &stage=... so /ask re-tones to match. */
  stage?: string;
  /**
   * Programmatic name for the free-text field. A placeholder is not an
   * accessible name, so this is rendered as a visually hidden label.
   */
  inputLabel?: string;
}

const AISearchBar = ({
  placeholder = "What's on your mind today?",
  suggestions = [
    "Is this normal?",
    "What should I expect this week?",
    "I feel overwhelmed",
  ],
  context,
  variant = "section",
  stageAccent,
  stage,
  inputLabel = "Ask a question",
}: AISearchBarProps) => {
  const inputId = useId();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [searching, setSearching] = useState(false);
  const navigate = useNavigate();

  const handleAsk = () => {
    if (!query.trim()) return;
    setSearching(true);
    navigateToAsk(navigate, query, { context, stage });
  };

  const handleSuggestion = (s: string) => {
    setSearching(true);
    navigateToAsk(navigate, s, { context, stage });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleAsk();
  };

  const isHero = variant === "hero";

  const accentColor = stageAccent ? `hsl(var(${stageAccent}))` : undefined;
  const accentBorderFocused = stageAccent ? `hsl(var(${stageAccent}) / 0.5)` : undefined;
  const accentRing = stageAccent ? `0 0 0 4px hsl(var(${stageAccent}) / 0.14)` : undefined;
  const accentChipHoverBorder = stageAccent ? `hsl(var(${stageAccent}) / 0.45)` : undefined;
  const accentChipHoverBg = stageAccent ? `hsl(var(${stageAccent}) / 0.08)` : undefined;

  const focusStyle =
    stageAccent && focused
      ? { borderColor: accentBorderFocused, boxShadow: accentRing }
      : undefined;

  const buttonStyle = stageAccent
    ? {
        backgroundColor: accentColor,
        color: "hsl(var(--parchment))",
      }
    : undefined;

  return (
    <div className={isHero ? "" : "max-w-xl mx-auto"}>
      <div
        className={`relative bg-card border ${
          stageAccent
            ? "border-border/40"
            : focused
            ? "border-sage/50 shadow-soft"
            : "border-border/50 shadow-card-brand"
        } ${
          isHero ? "rounded-[2rem]" : "rounded-2xl sm:rounded-xl"
        } px-4 py-3 sm:px-6 sm:py-4.5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 transition-all duration-300`}
        style={focusStyle}
      >
        <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
          <Search
            size={18}
            className={stageAccent ? "shrink-0" : "text-sage-muted shrink-0"}
            style={stageAccent ? { color: accentColor } : undefined}
          />
          <label htmlFor={inputId} className="sr-only">
            {inputLabel}
          </label>
          <input
            id={inputId}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholder}
            className="min-w-0 flex-1 bg-transparent font-sans text-sm font-light text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
          />
        </div>
        <button
          onClick={handleAsk}
          disabled={searching}
          className={`rounded-pill px-5 py-2.5 font-sans text-[13px] font-medium shadow-cta transition-all duration-300 shrink-0 w-full sm:w-auto inline-flex items-center justify-center gap-2 ${
            stageAccent
              ? "hover:brightness-95 disabled:opacity-90"
              : "bg-terracotta text-terracotta-foreground hover:bg-terracotta-hover"
          }`}
          style={buttonStyle}
        >
          {searching ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Searching
            </>
          ) : (
            "Ask now"
          )}
        </button>
      </div>

      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2 sm:gap-2.5 mt-4 sm:mt-5 justify-center">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => handleSuggestion(s)}
              className={`font-sans text-[12px] sm:text-[13px] rounded-pill px-4 py-2 sm:py-2.5 transition-all duration-200 cursor-pointer ${
                stageAccent
                  ? "font-light text-foreground/80 border border-border/50 bg-transparent hover:text-foreground"
                  : isHero
                  ? "font-medium text-foreground/80 border border-foreground/15 bg-card/60 backdrop-blur-sm shadow-sm hover:bg-card/90 hover:border-foreground/25 hover:text-foreground hover:shadow-md"
                  : "font-light text-muted-foreground border border-border/50 bg-transparent hover:border-sage/40 hover:text-foreground hover:bg-card/80"
              }`}
              onMouseEnter={(e) => {
                if (!stageAccent) return;
                const el = e.currentTarget as HTMLButtonElement;
                el.style.borderColor = accentChipHoverBorder!;
                el.style.backgroundColor = accentChipHoverBg!;
              }}
              onMouseLeave={(e) => {
                if (!stageAccent) return;
                const el = e.currentTarget as HTMLButtonElement;
                el.style.borderColor = "";
                el.style.backgroundColor = "";
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AISearchBar;

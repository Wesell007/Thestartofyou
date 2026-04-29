import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AISearchBarProps {
  placeholder?: string;
  suggestions?: string[];
  context?: string;
  variant?: "hero" | "section";
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
}: AISearchBarProps) => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();

  const handleAsk = () => {
    if (!query.trim()) return;
    const params = new URLSearchParams({ q: query.trim() });
    if (context) params.set("ctx", context);
    navigate(`/ask?${params.toString()}`);
  };

  const handleSuggestion = (s: string) => {
    const params = new URLSearchParams({ q: s });
    if (context) params.set("ctx", context);
    navigate(`/ask?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleAsk();
  };

  const isHero = variant === "hero";

  return (
    <div className={isHero ? "" : "max-w-xl mx-auto"}>
      {/* Search input — stacks on mobile, inline from sm */}
      <div
        className={`relative bg-card border ${
          focused ? "border-sage/50 shadow-soft" : "border-border/50 shadow-card-brand"
        } ${
          isHero ? "rounded-[2rem]" : "rounded-2xl sm:rounded-xl"
        } px-4 py-3 sm:px-6 sm:py-4.5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 transition-all duration-300`}
      >
        <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
          <Search size={18} className="text-sage-muted shrink-0" />
          <input
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
          className="bg-terracotta text-terracotta-foreground rounded-pill px-5 py-2.5 font-sans text-[13px] font-medium shadow-cta hover:bg-terracotta-hover transition-all duration-300 shrink-0 w-full sm:w-auto"
        >
          Ask now
        </button>
      </div>

      {/* Suggestion chips */}
      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2 sm:gap-2.5 mt-4 sm:mt-5 justify-center">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => handleSuggestion(s)}
              className={`font-sans text-[12px] sm:text-[13px] rounded-pill px-4 py-2 sm:py-2.5 transition-all duration-200 cursor-pointer ${
                isHero
                  ? "font-medium text-foreground/80 border border-foreground/15 bg-card/60 backdrop-blur-sm shadow-sm hover:bg-card/90 hover:border-foreground/25 hover:text-foreground hover:shadow-md"
                  : "font-light text-muted-foreground border border-border/50 bg-transparent hover:border-sage/40 hover:text-foreground hover:bg-card/80"
              }`}
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

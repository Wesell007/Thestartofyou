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
      {/* Search input */}
      <div
        className={`relative bg-card border ${
          focused ? "border-sage/50 shadow-soft" : "border-border/50 shadow-card-brand"
        } ${
          isHero ? "rounded-[2rem]" : "rounded-xl"
        } px-6 py-4.5 flex items-center gap-4 transition-all duration-300`}
      >
        <Search size={18} className="text-sage-muted shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className="flex-1 bg-transparent font-sans text-sm font-light text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
        />
        <button
          onClick={handleAsk}
          className="bg-terracotta text-terracotta-foreground rounded-pill px-5 py-2.5 font-sans text-[13px] font-medium shadow-cta hover:bg-terracotta-hover transition-all duration-300 shrink-0"
        >
          Ask now
        </button>
      </div>

      {/* Suggestion chips */}
      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2.5 mt-5 justify-center">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => handleSuggestion(s)}
              className={`font-sans text-[12px] rounded-pill px-4 py-2 transition-all duration-200 ${
                isHero
                  ? "font-normal text-white/90 border border-white/25 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white/40 hover:text-white"
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

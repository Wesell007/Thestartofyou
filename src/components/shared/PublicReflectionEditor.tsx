import { useState } from "react";
import { PenLine } from "lucide-react";

interface PublicReflectionEditorProps {
  storageKey: string;
  suggestions?: string[];
  placeholder?: string;
}

const readDraft = (storageKey: string) => {
  try {
    return window.localStorage.getItem(storageKey) ?? "";
  } catch {
    return "";
  }
};

const PublicReflectionEditor = ({
  storageKey,
  suggestions = [],
  placeholder = "Write your thoughts here…",
}: PublicReflectionEditorProps) => {
  const [value, setValue] = useState(() => readDraft(storageKey));
  const [message, setMessage] = useState("");

  const save = () => {
    if (!value.trim()) {
      setMessage("Write something before saving your draft.");
      return;
    }
    try {
      window.localStorage.setItem(storageKey, value.trim());
      setMessage("Draft saved on this device.");
    } catch {
      setMessage("This browser could not save the draft. Copy it before leaving the page.");
    }
  };

  return (
    <div>
      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => setValue((current) => current || suggestion)}
              className="px-3 py-1.5 rounded-full text-[11px] font-sans font-light border border-border/50 hover:border-sage/50 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
      <label className="sr-only" htmlFor={`${storageKey}-input`}>Private reflection</label>
      <textarea
        id={`${storageKey}-input`}
        rows={5}
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          setMessage("");
        }}
        placeholder={placeholder}
        className="w-full bg-background border border-border rounded-xl px-5 py-4 font-sans text-sm font-light text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none focus:ring-1 focus:ring-sage/40 transition-all leading-relaxed"
      />
      <button
        type="button"
        onClick={save}
        className="mt-4 inline-flex items-center gap-2 rounded-pill px-6 py-3 font-sans text-sm font-light border border-foreground/20 hover:bg-parchment-dark transition-all"
      >
        <PenLine size={14} /> Save draft on this device
      </button>
      {message && <p role="status" className="mt-3 font-sans text-xs text-muted-foreground">{message}</p>}
    </div>
  );
};

export default PublicReflectionEditor;

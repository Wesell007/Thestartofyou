import { useId, useRef } from "react";
import { MEMORY_PHOTO_ACCEPT_ATTR } from "@/lib/firstYearMemoryPhoto";

export type MemoryPhotoFieldProps = {
  /** A local preview of a newly chosen photo, or a signed URL for a kept one. */
  previewUrl: string | null;
  /** True while a photo is attached to this draft, kept or newly chosen. */
  hasPhoto: boolean;
  busy: boolean;
  disabled?: boolean;
  onSelect: (file: File) => void;
  onRemove: () => void;
};

const ACTION_CLASS =
  "inline-flex min-h-11 items-center font-sans text-[12.5px] text-foreground/60 underline underline-offset-4 hover:text-foreground/85 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/**
 * One optional photo beside the words.
 *
 * Adding a photo is never asked for and never nudged: the words stand alone,
 * and this sits quietly underneath them.
 */
const MemoryPhotoField = ({
  previewUrl,
  hasPhoto,
  busy,
  disabled,
  onSelect,
  onRemove,
}: MemoryPhotoFieldProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const describedBy = useId();

  return (
    <div className="mb-6">
      <p className="font-sans text-[13px] font-medium text-foreground/80 mb-1.5">
        Photo (optional)
      </p>

      {hasPhoto ? (
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-[14px] border border-border/60 bg-parchment">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="The photo kept with this memory"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <span className="sr-only">Photo attached</span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={busy || disabled}
              className={ACTION_CLASS}
            >
              Change photo
            </button>
            <button
              type="button"
              onClick={onRemove}
              disabled={busy || disabled}
              className={ACTION_CLASS}
            >
              Remove photo
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy || disabled}
          aria-describedby={describedBy}
          className="inline-flex min-h-11 items-center rounded-pill border border-border/60 bg-background px-5 py-2 font-sans text-[13px] text-foreground/80 transition-colors hover:border-foreground/25 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {busy ? "Adding…" : "Add a photo"}
        </button>
      )}

      <p id={describedBy} className="mt-1.5 font-sans text-[12.5px] leading-[1.6] text-foreground/55">
        Private to you. One photo, if you want one.
      </p>

      <input
        ref={inputRef}
        type="file"
        accept={MEMORY_PHOTO_ACCEPT_ATTR}
        className="sr-only"
        tabIndex={-1}
        onChange={(event) => {
          const file = event.target.files?.[0];
          event.target.value = "";
          if (file) onSelect(file);
        }}
      />
    </div>
  );
};

export default MemoryPhotoField;

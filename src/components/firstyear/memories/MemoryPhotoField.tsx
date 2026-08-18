import { useId, useRef } from "react";
import { MEMORY_PHOTO_ACCEPT_ATTR } from "@/lib/firstYearMemoryPhoto";
import {
  FY_FOCUS_RING,
  FY_SHEET_LEGEND,
  FY_SHEET_LINK,
} from "@/components/firstyear/journey/firstYearStyles";

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
      <p className={FY_SHEET_LEGEND}>Photo (optional)</p>

      {hasPhoto ? (
        <div className="flex items-center gap-4">
          <div
            className="h-20 w-20 shrink-0 overflow-hidden rounded-[14px] border bg-parchment p-1"
            style={{ borderColor: "hsl(var(--stage-firstyear-peach-soft))" }}
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="The photo kept with this memory"
                className="h-full w-full rounded-[10px] object-cover"
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
              className={`${FY_SHEET_LINK} disabled:opacity-60`}
            >
              Change photo
            </button>
            <button
              type="button"
              onClick={onRemove}
              disabled={busy || disabled}
              className={`${FY_SHEET_LINK} disabled:opacity-60`}
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
          className={`${FY_FOCUS_RING} inline-flex min-h-11 items-center rounded-pill border border-border/60 bg-parchment px-5 py-2 font-sans text-[13.5px] font-medium text-[hsl(var(--stage-firstyear-text))] transition-colors hover:border-foreground/25 disabled:opacity-60`}
        >
          {busy ? "Adding…" : "Add a photo"}
        </button>
      )}

      <p
        id={describedBy}
        className="mt-1.5 font-sans text-[12.5px] leading-[1.6] text-[hsl(var(--stage-firstyear-text-soft))]"
      >
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

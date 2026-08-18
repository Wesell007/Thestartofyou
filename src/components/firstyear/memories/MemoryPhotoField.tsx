import { useId, useRef } from "react";
import { Camera } from "lucide-react";
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
            className="h-24 w-24 shrink-0 overflow-hidden rounded-[14px] border p-1.5"
            style={{
              backgroundColor: "hsl(var(--background))",
              borderColor: "hsl(var(--stage-firstyear-peach-soft) / 0.8)",
            }}
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="The photo kept with this memory"
                className="h-full w-full rounded-[9px] object-cover"
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
              Replace photo
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
          className={`${FY_FOCUS_RING} flex h-[104px] w-[104px] flex-col items-center justify-center gap-1.5 rounded-[16px] border font-sans text-[13px] font-medium text-[hsl(var(--stage-firstyear-text))] transition-colors hover:border-foreground/20 disabled:opacity-60`}
          style={{
            backgroundColor: "hsl(var(--background))",
            borderColor: "hsl(var(--stage-firstyear-peach-soft) / 0.9)",
          }}
        >
          <Camera
            aria-hidden="true"
            className="h-5 w-5"
            style={{ color: "hsl(var(--stage-firstyear-terracotta))" }}
            strokeWidth={1.5}
          />
          {busy ? "Adding…" : "Add photo"}
        </button>
      )}

      <p
        id={describedBy}
        className="mt-1.5 font-sans text-[12.5px] leading-[1.6] text-[hsl(var(--stage-firstyear-text-soft))]"
      >
        One photo, if you want one.
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

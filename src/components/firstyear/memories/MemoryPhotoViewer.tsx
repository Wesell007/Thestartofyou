import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  url: string | null;
  /** The memory's own title, or a calm stand-in when it has none. */
  title: string;
  /** True when `title` is the parent's own words rather than a stand-in. */
  hasTitle?: boolean;
};

/**
 * A single photo, opened on purpose. There is no gallery, no swiping and no
 * next photo: a parent looks at the one moment they chose to open.
 *
 * The alt text uses the memory title, which is already shown in the heading.
 * Note text is never used, so nothing private is added to the image.
 */
const MemoryPhotoViewer = ({ open, onOpenChange, url, title, hasTitle = false }: Props) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent
      className="max-w-[560px] rounded-[26px] border px-6 py-7"
      style={{
        backgroundColor: "hsl(var(--stage-firstyear-cream))",
        borderColor: "hsl(var(--stage-firstyear-peach-soft) / 0.8)",
      }}
    >
      <DialogHeader>
        <DialogTitle className="font-serif text-[1.35rem] leading-[1.25] text-foreground">
          {title}
        </DialogTitle>
      </DialogHeader>
      {url ? (
        <img
          src={url}
          alt={hasTitle ? `Photo for memory: ${title}` : "Photo saved with this memory"}
          className="max-h-[70vh] w-full rounded-[16px] border p-3 object-contain"
          style={{
            backgroundColor: "hsl(var(--background))",
            borderColor: "hsl(var(--stage-firstyear-peach-soft) / 0.8)",
          }}
        />
      ) : (
        <p className="font-serif text-[15px] leading-[1.7] text-foreground/75">
          We couldn't open this photo just now.
        </p>
      )}
    </DialogContent>
  </Dialog>
);

export default MemoryPhotoViewer;

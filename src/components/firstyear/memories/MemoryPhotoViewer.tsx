import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  url: string | null;
  title: string;
  caption: string;
};

/**
 * A single photo, opened on purpose. There is no gallery, no swiping and no
 * next photo: a parent looks at the one moment they chose to open.
 */
const MemoryPhotoViewer = ({ open, onOpenChange, url, title, caption }: Props) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-[560px]">
      <DialogHeader>
        <DialogTitle className="font-serif text-[1.25rem] leading-[1.3] text-foreground/90">
          {title}
        </DialogTitle>
      </DialogHeader>
      {url ? (
        <img
          src={url}
          alt={caption}
          className="max-h-[70vh] w-full rounded-[16px] border border-border/50 bg-parchment p-1.5 object-contain"
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

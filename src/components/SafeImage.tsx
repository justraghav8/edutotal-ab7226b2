import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string | null;
  alt: string;
  fallbackSeed?: string;
  fallbackClassName?: string;
}

/**
 * SafeImage renders an image, falling back to a deterministic Unsplash hero photo
 * (based on a seed) and finally a placeholder graphic if both fail.
 */
export function SafeImage({
  src,
  alt,
  fallbackSeed,
  className,
  fallbackClassName,
  ...rest
}: SafeImageProps) {
  const seed = encodeURIComponent(fallbackSeed || alt || "edutotal");
  const fallback = `https://source.unsplash.com/featured/1200x800?${seed}`;
  const initial = src && src.trim() ? src : fallback;
  const [current, setCurrent] = useState(initial);
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-muted text-muted-foreground",
          className,
          fallbackClassName,
        )}
        aria-label={alt}
      >
        <ImageIcon className="h-8 w-8 opacity-40" />
      </div>
    );
  }

  return (
    <img
      {...rest}
      src={current}
      alt={alt}
      className={className}
      onError={() => {
        if (current !== fallback) {
          setCurrent(fallback);
        } else {
          setErrored(true);
        }
      }}
    />
  );
}

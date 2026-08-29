import { useEffect, useState } from "react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { buildSrcSet, optimizedImageUrl } from "@/lib/image";

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string | null;
  alt: string;
  fallbackSeed?: string;
  fallbackClassName?: string;
  /** Intended rendered width in CSS px, used to request a right-sized image. */
  targetWidth?: number;
  /** Marks this image as the LCP candidate: eager + high priority. */
  priority?: boolean;
}

/**
 * SafeImage renders an image and shows a clean placeholder graphic if the
 * source is missing or fails to load.
 */
export function SafeImage({
  src,
  alt,
  fallbackSeed: _fallbackSeed,
  className,
  fallbackClassName,
  targetWidth,
  priority = false,
  sizes,
  ...rest
}: SafeImageProps) {
  const initial = src && src.trim() ? src : "";
  const [current, setCurrent] = useState(initial);
  const [errored, setErrored] = useState(!initial);

  useEffect(() => {
    const next = src && src.trim() ? src : "";
    setCurrent(next);
    setErrored(!next);
  }, [src]);

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

  const srcSet = buildSrcSet(current);

  return (
    <img
      {...rest}
      src={optimizedImageUrl(current, { width: targetWidth })}
      srcSet={srcSet || undefined}
      sizes={sizes ?? (srcSet ? "(max-width: 768px) 100vw, 50vw" : undefined)}
      alt={alt}
      loading={rest.loading ?? (priority ? "eager" : "lazy")}
      decoding={rest.decoding ?? (priority ? "sync" : "async")}
      fetchPriority={rest.fetchPriority ?? (priority ? "high" : "auto")}
      referrerPolicy={rest.referrerPolicy ?? "no-referrer"}
      className={className}
      onError={() => setErrored(true)}
    />
  );
}

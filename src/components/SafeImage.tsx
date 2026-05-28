import { useEffect, useState } from "react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string | null;
  alt: string;
  fallbackSeed?: string;
  fallbackClassName?: string;
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

  return (
    <img
      {...rest}
      src={current}
      alt={alt}
      loading={rest.loading ?? "lazy"}
      referrerPolicy={rest.referrerPolicy ?? "no-referrer"}
      className={className}
      onError={() => setErrored(true)}
    />
  );
}

/**
 * Image delivery helpers.
 *
 * Rewrites known image CDN URLs so they are served in modern formats
 * (AVIF/WebP via content negotiation) at the size actually needed,
 * instead of shipping full-resolution JPEG/PNG originals.
 */

const UNSPLASH_HOSTS = ["images.unsplash.com", "plus.unsplash.com"];

export interface OptimizeOptions {
  /** Intended rendered width in CSS px (before DPR). */
  width?: number;
  /** 1-100, defaults to 75. */
  quality?: number;
}

export function optimizedImageUrl(
  src?: string | null,
  { width, quality = 75 }: OptimizeOptions = {},
): string {
  if (!src || !src.trim()) return "";
  const value = src.trim();

  // Only absolute http(s) URLs can be rewritten safely.
  if (!/^https?:\/\//i.test(value)) return value;

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return value;
  }

  if (UNSPLASH_HOSTS.includes(url.hostname)) {
    // `auto=format` lets Unsplash serve AVIF/WebP to supporting browsers.
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", url.searchParams.get("fit") ?? "crop");
    url.searchParams.set("q", String(quality));
    if (width) url.searchParams.set("w", String(width));
    url.searchParams.delete("h");
    return url.toString();
  }

  return url.toString();
}

/** Returns true when the URL supports on-the-fly resizing. */
export function isResizable(src?: string | null): boolean {
  if (!src) return false;
  try {
    return UNSPLASH_HOSTS.includes(new URL(src).hostname);
  } catch {
    return false;
  }
}

const DEFAULT_WIDTHS = [480, 768, 1024, 1440, 1920];

/** Builds a responsive srcset for resizable sources; empty string otherwise. */
export function buildSrcSet(
  src?: string | null,
  widths: number[] = DEFAULT_WIDTHS,
  quality = 75,
): string {
  if (!isResizable(src)) return "";
  return widths
    .map((w) => `${optimizedImageUrl(src, { width: w, quality })} ${w}w`)
    .join(", ");
}

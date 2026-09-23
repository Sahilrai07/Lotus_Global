/**
 * Utility functions for responsive image optimization (specifically for Unsplash URLs)
 */

export function isUnsplashUrl(url: string): boolean {
  return typeof url === "string" && url.includes("images.unsplash.com");
}

export function getUnsplashUrl(url: string, width: number, quality = 80): string {
  if (!isUnsplashUrl(url)) return url;
  try {
    const urlObj = new URL(url);
    urlObj.searchParams.set("auto", "format");
    urlObj.searchParams.set("fit", "crop");
    urlObj.searchParams.set("w", String(width));
    urlObj.searchParams.set("q", String(quality));
    return urlObj.toString();
  } catch {
    return url.replace(/w=\d+/, `w=${width}`);
  }
}

export function getResponsiveUnsplashProps(
  url: string,
  options: {
    widths?: number[];
    defaultWidth?: number;
    sizes?: string;
    quality?: number;
  } = {}
): { src: string; srcSet?: string; sizes?: string } {
  if (!url) return { src: "" };
  if (!isUnsplashUrl(url)) return { src: url };

  const widths = options.widths || [360, 480, 640, 768, 1024, 1280];
  const defaultWidth = options.defaultWidth || 768;
  const quality = options.quality ?? 80;

  const src = getUnsplashUrl(url, defaultWidth, quality);
  const srcSet = widths
    .map((w) => `${getUnsplashUrl(url, w, quality)} ${w}w`)
    .join(", ");

  return {
    src,
    srcSet,
    sizes: options.sizes,
  };
}

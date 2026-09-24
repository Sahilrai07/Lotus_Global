import React, { useState } from "react";
import { Image as ImageIcon, ShieldCheck } from "lucide-react";

interface AutoFitImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: "16/9" | "4/3" | "1/1" | "3/2" | "auto";
  fitMode?: "cover" | "smart" | "contain";
  showAmbientGlow?: boolean;
}

/**
 * AutoFitImage Component
 * 
 * Guarantees that any image uploaded via CMS auto-fits cleanly into its designated frame
 * without stretching, distortion, or quality loss.
 * 
 * Features:
 * 1. "smart" mode: For mismatched aspect ratios (e.g. portrait photo in landscape banner),
 *    renders a subtle blurred ambient backdrop while displaying the crisp original photo centered.
 * 2. Graceful Error Fallback: Replaces dead/broken image links with an institutional school crest card.
 * 3. Smooth Fade-in: Elegant transition once the image is decoded by the browser.
 */
export const AutoFitImage: React.FC<AutoFitImageProps> = ({
  src,
  alt,
  className = "",
  containerClassName = "",
  aspectRatio = "auto",
  fitMode = "cover",
  showAmbientGlow = false,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Map aspect ratio string to CSS aspect-ratio classes
  const aspectClassMap = {
    "16/9": "aspect-[16/9]",
    "4/3": "aspect-[4/3]",
    "1/1": "aspect-square",
    "3/2": "aspect-[3/2]",
    auto: "",
  };

  const aspectClass = aspectClassMap[aspectRatio] || "";

  // If no source provided or error loading
  if (!src || hasError) {
    return (
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 flex flex-col items-center justify-center p-4 text-center border border-slate-200 select-none ${aspectClass} ${containerClassName}`}
      >
        <div className="w-10 h-10 rounded-full bg-[#2F5187]/10 flex items-center justify-center mb-1 text-[#2F5187]">
          <ShieldCheck className="w-5 h-5 text-[#E87737]" />
        </div>
        <span className="text-[11px] font-bold text-[#2F5187] tracking-wide">Lotus Global School</span>
        <span className="text-[9px] text-slate-400 mt-0.5 max-w-[140px] truncate">{alt}</span>
      </div>
    );
  }

  // SMART MODE: Ambient blurred fill with centered crisp photo
  if (fitMode === "smart") {
    return (
      <div className={`relative overflow-hidden bg-slate-950 flex items-center justify-center ${aspectClass} ${containerClassName}`}>
        {/* Ambient blurred backdrop layer that fills letterbox gaps smoothly */}
        <img
          src={src}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover filter blur-xl scale-125 opacity-40 pointer-events-none"
        />

        {/* Crisp foreground auto-fitted image */}
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`relative z-10 max-w-full max-h-full object-contain transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          } ${className}`}
          {...props}
        />
      </div>
    );
  }

  // COVER MODE: Proportionally scales and fills frame with optimal center alignment
  return (
    <div className={`relative overflow-hidden bg-slate-100 ${aspectClass} ${containerClassName}`}>
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover object-center transition-all duration-500 ${
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
        } ${className}`}
        {...props}
      />
    </div>
  );
};

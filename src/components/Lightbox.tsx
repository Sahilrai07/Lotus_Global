import React, { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  caption: string;
}

interface LightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ item, onClose, onNext, onPrev }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && onNext) onNext();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrev]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[#071126]/90 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full bg-[#0B1B3D] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-white/10 text-white">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#E86A2C]">
              {item.category}
            </span>
            <h3 className="font-display text-lg font-bold text-white tracking-tight">
              {item.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image Display */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-black/50 flex items-center justify-center overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-contain"
          />

          {onPrev && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 text-white hover:bg-black/75 transition-colors border border-white/10"
              aria-label="Previous item"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {onNext && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 text-white hover:bg-black/75 transition-colors border border-white/10"
              aria-label="Next item"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Caption */}
        <div className="p-4 px-6 bg-[#071126] border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <p>{item.caption}</p>
          <span className="font-mono text-[10px] uppercase text-slate-500">
            Lotus Global School Digital Exhibition
          </span>
        </div>
      </div>
    </div>
  );
};

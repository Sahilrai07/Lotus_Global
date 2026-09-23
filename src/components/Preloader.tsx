import React, { useState, useEffect } from "react";

export const Preloader: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Reveal website content promptly once critical DOM application is ready
    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;

    const dismissPreloader = () => {
      // Allow brief 250ms animation to display cleanly, then transition out
      t1 = setTimeout(() => {
        setFadeOut(true);
      }, 250);

      t2 = setTimeout(() => {
        setLoading(false);
      }, 600);
    };

    if (document.readyState === "complete") {
      dismissPreloader();
    } else {
      window.addEventListener("load", dismissPreloader, { once: true });
      const safetyFallback = setTimeout(dismissPreloader, 600);
      return () => {
        window.removeEventListener("load", dismissPreloader);
        clearTimeout(safetyFallback);
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#142540] text-white transition-opacity duration-350 ease-out ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      role="status"
      aria-live="polite"
      aria-label="Loading Lotus Global School"
    >
      {/* Ambient Institutional Radial Scrim */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(47,81,135,0.5)_0%,transparent_70%)] pointer-events-none" />

      {/* Preloader Main Stage */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-sm mx-auto">
        {/* Crest Logo with smooth zoom-in scale */}
        <div className="relative mb-5 animate-preloader-zoom">
          {/* Subtle warm amber radial aura */}
          <div className="absolute -inset-4 bg-[#E87737]/25 rounded-full blur-xl animate-pulse" />
          
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white/10 p-3 backdrop-blur-md border border-white/20 shadow-2xl flex items-center justify-center">
            <picture>
              <source srcSet="/assets/logo.webp" type="image/webp" />
              <img
                src="/assets/logo.png"
                alt="Lotus Global School Crest"
                width="88"
                height="111"
                decoding="async"
                className="w-full h-full object-contain filter drop-shadow-md"
              />
            </picture>
          </div>
        </div>

        {/* Institution Brand Text with Fade-Up */}
        <div className="space-y-1 animate-preloader-fade-up">
          <h1 className="font-display font-extrabold text-xl sm:text-2xl tracking-wider text-white uppercase drop-shadow-sm">
            Lotus Global School
          </h1>
          <p className="text-[10px] sm:text-xs font-semibold tracking-widest text-[#E87737] uppercase">
            Vatar, Vapi, Gujarat
          </p>
          <p className="text-[10px] sm:text-[11px] text-slate-300 italic pt-1 font-medium">
            Dedication · Diligence · Discipline
          </p>
        </div>

        {/* Sleek Institutional Loading Meter */}
        <div className="w-36 sm:w-44 h-1 bg-white/15 rounded-full overflow-hidden mt-6 shadow-inner">
          <div className="h-full w-full bg-gradient-to-r from-[#E87737] via-[#F7A8D2] to-[#E87737] rounded-full animate-preloader-bar" />
        </div>
      </div>
    </div>
  );
};

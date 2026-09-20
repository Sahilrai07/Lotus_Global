import React, { useState, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Compass, ShieldCheck, Award, BookOpen, MapPin, Sparkles } from "lucide-react";
import { getSiteData, subscribeSiteData, HeroSlide } from "../data/siteDataService";

interface HeroProps {
  onNavigate: (pageId: string) => void;
  onOpenInquiry: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenInquiry }) => {
  const [slides, setSlides] = useState<HeroSlide[]>(getSiteData().heroSlides);
  const [ticker, setTicker] = useState(getSiteData().ticker);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    return subscribeSiteData((newData) => {
      setSlides(newData.heroSlides);
      setTicker(newData.ticker);
    });
  }, []);

  // Auto-slide effect every 5 seconds unless paused
  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const activeSlide = slides[currentSlideIndex] || slides[0];

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleCtaClick = (link: string) => {
    if (link === "admissions-inquiry" || link === "inquiry") {
      onOpenInquiry();
    } else {
      onNavigate(link);
    }
  };

  return (
    <div className="w-full">
      {/* 1. HERO SLIDER BANNER (Reference .slider-front structure) */}
      <section
        className="relative bg-[#142540] text-white min-h-[460px] sm:min-h-[520px] md:min-h-[560px] flex items-center overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        role="region"
        aria-label="Lotus Global School Featured Showcase"
      >
        {/* Background Image Carousel with Institutional Dark Overlay */}
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlideIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-[6000ms] ease-out"
            />
            {/* Multi-stage institutional gradient scrim to ensure text legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#142540]/95 via-[#1E375F]/85 to-[#2F5187]/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#142540] via-transparent to-transparent opacity-80" />
          </div>
        ))}

        {/* Content Container */}
        <div className="relative z-20 wrap py-14 sm:py-20">
          <div className="max-w-3xl space-y-5 animate-in fade-in slide-in-from-bottom-3 duration-500 key={activeSlide.id}">
            {/* Tagline / Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E87737]/20 border border-[#E87737]/40 text-xs font-bold uppercase tracking-wider text-[#E87737]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{activeSlide.tagline || "Lotus Global School · Vatar, Vapi"}</span>
            </div>

            {/* Main Title */}
            <h1 className="font-display font-extrabold text-2.5xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
              {activeSlide.title}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-slate-200 font-normal leading-relaxed max-w-2xl">
              {activeSlide.subtitle}
            </p>

            {/* Motto Badge Strip */}
            <div className="inline-flex items-center gap-2 py-1.5 px-3 rounded bg-[#2F5187]/90 border-l-4 border-[#E87737] text-xs sm:text-sm font-semibold text-slate-100 shadow-sm">
              <span>Motto:</span>
              <span className="text-[#E87737] font-bold">Dedication</span>
              <span>·</span>
              <span className="text-white font-bold">Diligence</span>
              <span>·</span>
              <span className="text-[#F7A8D2] font-bold">Discipline</span>
            </div>

            {/* CTA Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={() => handleCtaClick(activeSlide.ctaLink || "admissions-inquiry")}
                className="px-6 py-3 rounded bg-[#E87737] text-white font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#D26425] transition-all shadow-lg flex items-center gap-2"
              >
                <span>{activeSlide.ctaText || "Admissions Inquiry"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleCtaClick(activeSlide.secondaryCtaLink || "academics")}
                className="px-6 py-3 rounded bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider border border-white/30 transition-all flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-[#E87737]" />
                <span>{activeSlide.secondaryCtaText || "Explore Academics"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Previous / Next Arrow Controls */}
        {slides.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/30 hover:bg-[#E87737] text-white transition-colors focus:outline-none"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/30 hover:bg-[#E87737] text-white transition-colors focus:outline-none"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Carousel Pagination Dots */}
        {slides.length > 1 && (
          <div className="absolute bottom-4 inset-x-0 z-30 flex items-center justify-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`transition-all rounded-full ${
                  idx === currentSlideIndex
                    ? "w-8 h-2 bg-[#E87737]"
                    : "w-2.5 h-2 bg-white/50 hover:bg-white"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </section>

      {/* 2. INSTITUTIONAL TICKER / MARQUEE BANNER (Reference section.section-scroll) */}
      {ticker && ticker.active && (
        <section className="bg-[#2F5187] text-white py-3 px-4 border-b-2 border-[#E87737] overflow-hidden shadow-inner">
          <div className="wrap flex items-center gap-4">
            <span className="shrink-0 text-xs font-extrabold uppercase tracking-widest px-2.5 py-1 rounded bg-[#E87737] text-white">
              Announcements
            </span>
            <div className="flex-1 overflow-hidden whitespace-nowrap">
              <div className="inline-block animate-marquee text-xs sm:text-sm font-medium tracking-wide">
                {ticker.text} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ★ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {ticker.text}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

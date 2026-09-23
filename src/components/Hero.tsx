import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Compass,
  Sparkles,
  Eye,
  EyeOff,
  LayoutGrid,
  Layers,
  Columns2,
  Check,
} from "lucide-react";
import { getSiteData, subscribeSiteData, HeroSlide } from "../data/siteDataService";

interface HeroProps {
  onNavigate: (pageId: string) => void;
  onOpenInquiry: () => void;
}

type DesignMode = "split" | "glass" | "tray";

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenInquiry }) => {
  const initialSiteData = getSiteData();
  const [slides, setSlides] = useState<HeroSlide[]>(initialSiteData.heroSlides);
  const [ticker, setTicker] = useState(initialSiteData.ticker);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Active hero layout design mode - controlled dynamically from Local Admin CMS (default: 'split')
  const [designMode, setDesignMode] = useState<DesignMode>(
    ((initialSiteData as any).heroDesignMode as DesignMode) || "split"
  );
  const [isGlassCardHidden, setIsGlassCardHidden] = useState(false);

  useEffect(() => {
    return subscribeSiteData((newData) => {
      setSlides(newData.heroSlides);
      setTicker(newData.ticker);
      if ((newData as any).heroDesignMode) {
        setDesignMode((newData as any).heroDesignMode as DesignMode);
      }
    });
  }, []);

  // Auto-slide effect every 5.5 seconds unless paused
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

  const renderPhotoCard = (isMobile = false) => (
    <div
      className={`relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/15 group aspect-[16/10] sm:aspect-[16/9] bg-slate-900 ${
        isMobile ? "my-3 sm:my-4" : ""
      }`}
    >
      {/* Clean School Photo Carousel - NO dark blue wash! */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            idx === currentSlideIndex
              ? "opacity-100 z-10"
              : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
        </div>
      ))}

      {/* Top Floating Badge on Photo */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 pointer-events-none">
        <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-semibold text-white tracking-wide flex items-center gap-1.5 shadow-md">
          <span className="w-2 h-2 rounded-full bg-[#E87737] animate-pulse" />
          <span>School Showcase · Photo {currentSlideIndex + 1} of {slides.length}</span>
        </span>
      </div>

      {/* Previous / Next Arrow Controls directly on Photo Card */}
      <button
        onClick={handlePrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-black/50 hover:bg-[#E87737] text-white backdrop-blur-sm transition-all shadow-lg focus:outline-none"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-black/50 hover:bg-[#E87737] text-white backdrop-blur-sm transition-all shadow-lg focus:outline-none"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Bottom subtle photo caption tag */}
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3 sm:p-4 z-20 flex items-center justify-between">
        <span className="text-xs text-white/95 font-medium truncate max-w-[85%] hidden sm:inline">
          {activeSlide.title}
        </span>
        <span className="text-[10px] text-[#E87737] font-bold uppercase tracking-wider hidden sm:inline">
          100% Clear View
        </span>
      </div>
    </div>
  );

  return (
    <div className="w-full relative">

      {/* =========================================================================
          DESIGN OPTION 1: SPLIT INSTITUTIONAL SHOWCASE (RECOMMENDED)
          - Left: Solid Lotus Navy container with headline, subtitle, motto, buttons.
          - Right: 100% unobstructed, vibrant school photo showcase (NO text covering).
         ========================================================================= */}
      {designMode === "split" && (
        <section
          className="relative bg-gradient-to-br from-[#142540] via-[#1E375F] to-[#142540] text-white min-h-[520px] lg:min-h-[560px] flex items-center overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          role="region"
          aria-label="Lotus Global School Featured Showcase - Split Layout"
        >
          {/* Subtle decorative background ambient glow */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#2F5187]/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 right-1/3 w-96 h-96 bg-[#E87737]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="wrap py-6 sm:py-14 w-full relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Left Column: Value Proposition & Text (5 cols on lg) */}
              <div className="lg:col-span-5 space-y-3 sm:space-y-5">
                {/* Tagline / Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E87737]/20 border border-[#E87737]/40 text-xs font-bold uppercase tracking-wider text-[#E87737] max-w-full">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{activeSlide.tagline || "Lotus Global School · Vatar, Vapi"}</span>
                </div>

                {/* Main Title */}
                <h1 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight leading-snug">
                  {activeSlide.title}
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed">
                  {activeSlide.subtitle}
                </p>

                {/* Mobile-Only Photo-Forward Showcase (Option 2): displays photo directly under title on mobile */}
                <div className="block lg:hidden">
                  {renderPhotoCard(true)}
                </div>

                {/* Motto Badge Strip */}
                <div className="inline-flex flex-wrap items-center gap-1.5 sm:gap-2 py-1.5 px-3 rounded bg-[#2F5187]/90 border-l-4 border-[#E87737] text-xs sm:text-sm font-semibold text-slate-100 shadow-sm max-w-full">
                  <span>Motto:</span>
                  <span className="text-[#E87737] font-bold">Dedication</span>
                  <span>·</span>
                  <span className="text-white font-bold">Diligence</span>
                  <span>·</span>
                  <span className="text-[#F7A8D2] font-bold">Discipline</span>
                </div>

                {/* CTA Buttons */}
                <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                  <button
                    onClick={() => handleCtaClick(activeSlide.ctaLink || "admissions-inquiry")}
                    className="w-full sm:w-auto px-6 py-2.5 sm:py-3 rounded bg-[#E87737] text-white font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#D26425] transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <span>{activeSlide.ctaText || "Admissions Inquiry"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleCtaClick(activeSlide.secondaryCtaLink || "academics")}
                    className="w-full sm:w-auto px-6 py-2.5 sm:py-3 rounded bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider border border-white/30 transition-all flex items-center justify-center gap-2"
                  >
                    <Compass className="w-4 h-4 text-[#E87737]" />
                    <span>{activeSlide.secondaryCtaText || "Explore Academics"}</span>
                  </button>
                </div>

                {/* Slide Counter & Dots in Text Panel */}
                <div className="pt-1 flex items-center gap-4 text-xs text-slate-300">
                  <span className="font-mono text-[#E87737] font-bold tracking-wider">
                    0{currentSlideIndex + 1} / 0{slides.length}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {slides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlideIndex(idx)}
                        className={`transition-all rounded-full h-1.5 ${
                          idx === currentSlideIndex
                            ? "w-7 bg-[#E87737]"
                            : "w-2 bg-white/30 hover:bg-white/60"
                        }`}
                        aria-label={`Slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: 100% Unobstructed School Photo Showcase (7 cols on lg, hidden on mobile) */}
              <div className="hidden lg:block lg:col-span-7">
                {renderPhotoCard(false)}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          DESIGN OPTION 2: FLOATING FROSTED-GLASS CARD
          - Background: Full-width clear photo with subtle natural light.
          - Text: Grouped into a compact, frosted glass card docked to bottom-left.
          - 70%+ of photo is completely uncovered.
          - Includes toggle button to hide card and view 100% full photo.
         ========================================================================= */}
      {designMode === "glass" && (
        <section
          className="relative bg-slate-900 text-white min-h-[500px] sm:min-h-[560px] md:min-h-[600px] flex items-center overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          role="region"
          aria-label="Lotus Global School Featured Showcase - Glass Card Layout"
        >
          {/* Full-width School Photo - NO dark blue wash, natural colors */}
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
                className="w-full h-full object-cover object-center"
              />
              {/* Very gentle subtle dark tint only to give card contrast */}
              <div className="absolute inset-0 bg-black/25" />
            </div>
          ))}

          {/* Floating Frosted Glass Card Container */}
          <div className="relative z-20 wrap py-12 sm:py-16 w-full flex items-center">
            <div
              className={`transition-all duration-500 transform ${
                isGlassCardHidden
                  ? "opacity-0 translate-y-6 pointer-events-none"
                  : "opacity-100 translate-y-0"
              }`}
            >
              <div className="max-w-xl bg-[#142540]/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20 text-white shadow-2xl space-y-4">
                {/* Tagline / Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E87737]/20 border border-[#E87737]/40 text-xs font-bold uppercase tracking-wider text-[#E87737] max-w-full">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{activeSlide.tagline || "Lotus Global School · Vatar, Vapi"}</span>
                </div>

                {/* Main Title */}
                <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-tight">
                  {activeSlide.title}
                </h1>

                {/* Subtitle */}
                <p className="text-sm text-slate-200 font-normal leading-relaxed">
                  {activeSlide.subtitle}
                </p>

                {/* Motto Badge Strip */}
                <div className="inline-flex flex-wrap items-center gap-1.5 sm:gap-2 py-1.5 px-3 rounded bg-[#2F5187]/90 border-l-4 border-[#E87737] text-xs sm:text-sm font-semibold text-slate-100 shadow-sm max-w-full">
                  <span>Motto:</span>
                  <span className="text-[#E87737] font-bold">Dedication</span>
                  <span>·</span>
                  <span className="text-white font-bold">Diligence</span>
                  <span>·</span>
                  <span className="text-[#F7A8D2] font-bold">Discipline</span>
                </div>

                {/* CTA Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    onClick={() => handleCtaClick(activeSlide.ctaLink || "admissions-inquiry")}
                    className="w-full sm:w-auto px-5 py-2.5 rounded bg-[#E87737] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#D26425] transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <span>{activeSlide.ctaText || "Admissions Inquiry"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleCtaClick(activeSlide.secondaryCtaLink || "academics")}
                    className="w-full sm:w-auto px-5 py-2.5 rounded bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider border border-white/30 transition-all flex items-center justify-center gap-2"
                  >
                    <Compass className="w-4 h-4 text-[#E87737]" />
                    <span>{activeSlide.secondaryCtaText || "Explore Academics"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Toggle Full Photo View button (Bottom-right) */}
          <button
            onClick={() => setIsGlassCardHidden(!isGlassCardHidden)}
            className="absolute bottom-4 right-4 z-30 px-3.5 py-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-xs font-medium text-white transition-all flex items-center gap-2 shadow-lg"
          >
            {isGlassCardHidden ? <Eye className="w-4 h-4 text-[#E87737]" /> : <EyeOff className="w-4 h-4 text-slate-300" />}
            <span>{isGlassCardHidden ? "Show Card" : "View Full Photo"}</span>
          </button>

          {/* Arrows */}
          <button
            onClick={handlePrev}
            className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/40 hover:bg-[#E87737] text-white transition-colors"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/40 hover:bg-[#E87737] text-white transition-colors"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Pagination Dots */}
          <div className="absolute bottom-4 inset-x-0 z-30 flex items-center justify-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`transition-all rounded-full ${
                  idx === currentSlideIndex ? "w-8 h-2 bg-[#E87737]" : "w-2.5 h-2 bg-white/50 hover:bg-white"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </section>
      )}

      {/* =========================================================================
          DESIGN OPTION 3: FULL PHOTO WITH BOTTOM TRAY
          - Top: 100% full-width unobstructed photo showcase.
          - Bottom: Integrated institutional action tray with title, motto & CTAs.
         ========================================================================= */}
      {designMode === "tray" && (
        <section
          className="relative bg-slate-900 text-white overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          role="region"
          aria-label="Lotus Global School Featured Showcase - Bottom Tray Layout"
        >
          {/* Top Unobstructed Photo Slider */}
          <div className="relative w-full h-[380px] sm:h-[440px] md:h-[480px] bg-slate-900 overflow-hidden">
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
                  className="w-full h-full object-cover object-center"
                />
              </div>
            ))}

            {/* Slide badge floating on photo */}
            <div className="absolute top-4 left-4 z-20">
              <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-semibold text-white tracking-wide flex items-center gap-1.5 shadow">
                <span className="w-2 h-2 rounded-full bg-[#E87737] animate-pulse" />
                <span>Facility Photo {currentSlideIndex + 1} of {slides.length}</span>
              </span>
            </div>

            {/* Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 hover:bg-[#E87737] text-white transition-colors"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 hover:bg-[#E87737] text-white transition-colors"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 inset-x-0 z-20 flex items-center justify-center gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`transition-all rounded-full ${
                    idx === currentSlideIndex ? "w-8 h-2 bg-[#E87737]" : "w-2.5 h-2 bg-white/50 hover:bg-white"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Bottom Institutional Content Tray */}
          <div className="bg-[#142540] text-white py-6 sm:py-8 border-t-4 border-[#E87737] shadow-xl">
            <div className="wrap">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Left: Tagline, Title, Subtitle */}
                <div className="lg:col-span-7 space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E87737]/20 border border-[#E87737]/40 text-xs font-bold uppercase tracking-wider text-[#E87737]">
                    <Sparkles className="w-3 h-3" />
                    <span>{activeSlide.tagline || "Lotus Global School · Vatar, Vapi"}</span>
                  </div>

                  <h2 className="font-display font-extrabold text-xl sm:text-2xl md:text-3xl text-white tracking-tight">
                    {activeSlide.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                    {activeSlide.subtitle}
                  </p>
                </div>

                {/* Right: Motto & Buttons */}
                <div className="lg:col-span-5 flex flex-col items-start lg:items-end gap-3.5">
                  <div className="inline-flex flex-wrap items-center gap-1.5 py-1 px-2.5 rounded bg-[#2F5187]/90 border-l-4 border-[#E87737] text-xs font-semibold text-slate-100 shadow-sm">
                    <span>Motto:</span>
                    <span className="text-[#E87737] font-bold">Dedication</span>
                    <span>·</span>
                    <span className="text-white font-bold">Diligence</span>
                    <span>·</span>
                    <span className="text-[#F7A8D2] font-bold">Discipline</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => handleCtaClick(activeSlide.ctaLink || "admissions-inquiry")}
                      className="px-5 py-2.5 rounded bg-[#E87737] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#D26425] transition-all shadow-md flex items-center gap-2"
                    >
                      <span>{activeSlide.ctaText || "Admissions Inquiry"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleCtaClick(activeSlide.secondaryCtaLink || "academics")}
                      className="px-5 py-2.5 rounded bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider border border-white/30 transition-all flex items-center gap-2"
                    >
                      <Compass className="w-3.5 h-3.5 text-[#E87737]" />
                      <span>{activeSlide.secondaryCtaText || "Explore"}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          ANNOUNCEMENTS TICKER MARQUEE (PRESERVED AS IN EXISTING DESIGN)
         ========================================================================= */}
      {ticker && ticker.active && (
        <section className="bg-[#2F5187] text-white py-2 sm:py-3 px-3 sm:px-4 border-b-2 border-[#E87737] overflow-hidden shadow-inner">
          <div className="wrap flex items-center gap-2.5 sm:gap-4">
            <span className="shrink-0 text-[10px] sm:text-xs font-bold uppercase tracking-tight sm:tracking-wider px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-[#E87737] text-white shadow-sm">
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

